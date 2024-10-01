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
const { userIdsOperation} = require('./util/database.js');
const { broadcastMessageToSockets, broadcastImagesToSockets, broadcastBroadcastingMessageToSockets } = require('./util/socketBroadcast.js');
const { sendNotificationToLine } = require('./util/lineApi.js');
require('dotenv').config();





const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const client = new Client(config);


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
        console.log(`User ${sender_id} connected`);
    });


    // メッセージの受信とブロードキャスト
    socket.on('chat message', (data) => {
        const {msg, actual_receiver_id, actual_sender_id, sender_type, time, message_id, admin_login_id} = data
        console.log(` Recipient ID: ${actual_receiver_id}, senderID: ${actual_sender_id}`);

        // 受信者、送信者、管理者のソケットを取得
        const msgData = { msg, actual_sender_id, sender_type, time, actual_receiver_id, message_id, admin_login_id } ;
        broadcastMessageToSockets(userSockets, msgData)

        // LINEへメッセージ受信通知をする
        if(sender_type == "admin" && userSockets.get(actual_receiver_id) == undefined){
            sendNotificationToLine(actual_receiver_id, actual_sender_id, client)
        }
    });
    

    // メッセージ画像のブロードキャスト
    socket.on("send_image", (data)=>{
        const {resizedImage, receiver_id, sender_id, sender_type, time, message_id,admin_login_id} = data

        // 受信者、送信者、管理者のソケットを取得
        const msgData = { sender_type, sender_id, time, receiver_id, message_id, resizedImage,admin_login_id } ;
        broadcastImagesToSockets(userSockets, msgData)
        
        // LINEへメッセージ受信通知をする
        if(sender_type == "admin" && userSockets.get(receiver_id) == undefined){
            sendNotificationToLine(receiver_id, sender_id, client)
        }
    })

    // 一斉送信のブロードキャスト
    socket.on("broadcast message", async (data)=>{
        const { formatted_body, admin_account_id, created_at} = data
        // ユーザーと管理者のuuidを取得
        const uuids = await userIdsOperation(admin_account_id)
        if(uuids){
            const userUuids = uuids[0]
            const adminUuid = uuids[1]

            const msgData = { formatted_body,  created_at, userUuids, adminUuid} ;
            broadcastBroadcastingMessageToSockets(userSockets, msgData)
        }
        
        
    })

    // ソケットの切断処理
    socket.on('disconnect', (reason) => {
        console.log(`User ${socket.userId} disconnected due to ${reason}`);
        // クライアントに切断理由を送信
        socket.broadcast.emit('userDisconnected', { userId: socket.userId, reason });
        userSockets.delete(socket.userId);
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
