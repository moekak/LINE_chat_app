// // http
// // import axios from 'axios';
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors'); // 追加


// // アプリケーションの初期化
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//       cors: {
//           origin: "*", // 必要に応じて、特定のオリジンを指定することもできます
//       },
//   });

//   app.use(cors());


// // ソケットの接続処理
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // メッセージの受信とブロードキャスト
//     socket.on('chat message', (msg) => {
//             io.emit('chat message', msg);
        
//     });

//     // ソケットの切断処理
//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

// // サーバーの起動
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


// https
const express = require('express');
const https = require('https');
const fs = require('fs');
const { Client } = require('@line/bot-sdk');
const socketIo = require('socket.io');
const { userIdsOperation, getChannelTokenAndSecretToekn } = require('./util/database.js');
const { broadcastMessageToSockets, broadcastImagesToSockets, broadcastBroadcastingMessageToSockets } = require('./util/socketBroadcast.js');
const { sendNotificationToLine } = require('./util/lineApi.js');
const { decryptLaravelData } = require('./util/decryptor.js');
require('dotenv').config();


// const config = {
//     channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
//     channelSecret: process.env.CHANNEL_SECRET
// };

// チャネルアクセストークンとチャネルシークレットを復号化する
// (async () => {
// 	try {
// 		const tokens = await getChannelTokenAndSecretToekn(mysql);
// 		const decryptedData = await decryptLaravelData(tokens);
//         configs = decryptedData
// 	} catch (error) {
// 		console.error('Error fetching tokens:', error);
// 	}
// })();


let client;


// アプリケーションの初期化
const app = express();

//サーバーへのリクエストを送信できるドメインを指定(http通信を使用する際は必要)
// app.use(cors({
//     origin: ['https://line-chat.tokyo', "http://127.0.0.1:8000"],
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type']
//   }));

// SSL/TLS 証明書の読み込み
const options = {
    key: fs.readFileSync("/www/server/panel/vhost/letsencrypt/line-chat.tokyo/privkey.pem"),
    cert: fs.readFileSync("/www/server/panel/vhost/letsencrypt/line-chat.tokyo/fullchain.pem"),
};

// HTTPS サーバーの作成
const server = https.createServer(options, app);
//指定されたドメインのみが WebSocket 経由で通信できるようにする
// WebSocket プロトコルの性質上、別途 Socket.IO 側でも CORS 設定（必須ではない）
const io = socketIo(server, {
    cors: {
        origin: ['https://line-chat.tokyo', "http://127.0.0.1:8000", "https://twitter-clone.click"],
        methods: ['GET', 'POST']
    },
});

// // 静的ファイルの提供
// app.use(express.static('public'));

const userSockets = new Map(); // ユーザーIDとソケットのマッピング


// ソケットの接続処理
io.on('connection', (socket) => {
    socket.on('heartbeat', () => {
        console.log('Heartbeat received');
    });


   // ソケットの登録
   //一人のユーザーが複数の接続を持つ可能性があるためSetを使用
    socket.on("register", (sender_id) => {
        if (userSockets.has(sender_id)) {
            // Setにソケットを追加（重複なし）
            userSockets.get(sender_id).add(socket);
        } else {
            // 新しいユーザーIDの場合、Setを作成してソケットを保存
            userSockets.set(sender_id, new Set([socket]));
        }
        console.log(`User ${sender_id} connected socketID: ${socket.id}`);
        
    });


    // メッセージの受信とブロードキャスト
    socket.on('chat message', async (data) => {
        const {msg, actual_receiver_id, actual_sender_id, sender_type, time, message_id, admin_login_id} = data
        // 受信者、送信者、管理者のソケットを取得
        const msgData = { msg, actual_sender_id, sender_type, time, actual_receiver_id, message_id, admin_login_id } ;
        broadcastMessageToSockets(userSockets, msgData)

        console.log(sender_type);
        console.log(userSockets.get(actual_receiver_id));
        
        // LINEへメッセージ受信通知をする);
        if(sender_type == "admin" && userSockets.get(actual_receiver_id) == undefined){

            const ids = await getChannelTokenAndSecretToekn(actual_sender_id)
            const decryptedData = await decryptLaravelData(ids);

            let config = decryptedData[0]
            let client = new Client(config)

            console.log(config);
            
            
            sendNotificationToLine(actual_receiver_id, actual_sender_id, client)
        }
    });
    

    // メッセージ画像のブロードキャスト
    socket.on("send_image", (data)=>{
        console.log("メッセージが送信されました");
        
        const {resizedImage, receiver_id, sender_id, sender_type, time, message_id,admin_login_id} = data

        // 受信者、送信者、管理者のソケットを取得
        const msgData = { sender_type, sender_id, time, receiver_id, message_id, resizedImage,admin_login_id } ;
        broadcastImagesToSockets(userSockets, msgData)
        
        // LINEへメッセージ受信通知をする
        
        if(sender_type == "admin" && userSockets.get(receiver_id) == undefined){
            // sendNotificationToLine(receiver_id, sender_id, client)
        }
    })

    // 一斉送信のブロードキャスト
    socket.on("broadcast message", async (data)=>{
        const { sendingDatatoBackEnd, admin_account_id, created_at} = data
        // ユーザーと管理者のuuidを取得
        const uuids = await userIdsOperation(admin_account_id)
        if(uuids){
            const userUuids = uuids[0]
            const adminUuid = uuids[1]

            const msgData = { sendingDatatoBackEnd,  created_at, userUuids, adminUuid} ;
            broadcastBroadcastingMessageToSockets(userSockets, msgData)

            userUuids.forEach((uuid)=>{
                if(userSockets.get(uuid) == undefined){
                    // sendNotificationToLine(uuid, adminUuid, client)
                }
            })
        }
    })


    socket.on("disconnectHandler", ()=>{
        socket.disconnect(true);
        
    })

    // ソケットを削除し、必要に応じてユーザーエントリーも削除する関数
    function removeSocket(sender_id, socketToRemove) {
        if (userSockets.has(sender_id)) {
            const sockets = userSockets.get(sender_id);
            const removed = sockets.delete(socketToRemove);
    
            if (sockets.size === 0) {
                userSockets.delete(sender_id);
            }
            
            return removed;
        }
        return false;
    }


    // socket.id を使用してソケットを見つけ、削除する関数
    function removeSocketById(socketId) {
        for (const [sender_id, sockets] of userSockets.entries()) {
            for (const socket of sockets) {
                if (socket.id === socketId) {
                    return removeSocket(sender_id, socket);
                }
            }
        }
        return false;
    }
    socket.on('disconnect', (reason, sender_id) => {
        const removed = removeSocketById(socket.id);
    });

});




// サーバーの起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


server.setTimeout(0);  // タイムアウトを無効化

app.get('/test', (req, res) => {
    res.send('Hello World!');
});

//リクエストボディをJSONフォーマットとして解析するための設定
app.use(express.json());
// URL-encodedボディパーサーも追加
app.use(express.urlencoded({ extended: true }));

app.post("/notify", (req, res)=>{
    const { channel_access_token, channel_secret } = req.body;
    // configs.push({
    //     channelAccessToken: channel_access_token,
    //     channelSecret: channel_secret
    // })

    console.log("Channel Access Token:", channel_access_token);
    console.log("Channel Secret:", channel_secret);
    res.json({ message: "Received", data: req.body });
})
