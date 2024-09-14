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
const cors = require('cors');
const { selectUserID, selectAdminID } = require('./database.js');
const axios = require('axios');
const { broadcastMessageToSockets, broadcastImagesToSockets, sendNotificationToLine } = require('./socketBroadcast.js');



const config = {
    channelAccessToken: 'BNB/7weqbM+rh+/DQOR64lvtlwe1zXBBKviMj5wIrtV2NW4eAo1xe0qC8Tja5UewIEUCnjTzVfKMeZlzK76Wk9T/Wgl47pfWeCFCopsX3WABCkmVn0EX3JPXhmwtU6qXxGlaNOeccX/OYHgYI0GqlwdB04t89/1O/w1cDnyilFU=',
    channelSecret: '02c50e03d6127523ab592c18c9444ce8'
};

const client = new Client(config);





// アプリケーションの初期化
const app = express();

//リクエストを送信する際に許可するオリジン（ドメイン）を指定
app.use(cors({
    origin: ['https://line-chat.tokyo', "http://127.0.0.1:8000"],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));

// SSL/TLS 証明書の読み込み
const options = {
    key: fs.readFileSync("/www/server/panel/vhost/letsencrypt/line-chat.tokyo/privkey.pem"),
    cert: fs.readFileSync("/www/server/panel/vhost/letsencrypt/line-chat.tokyo/fullchain.pem"),
};

// HTTPS サーバーの作成
const server = https.createServer(options, app);
// WebSocket 接続を許可するオリジン（ドメイン）を指定
const io = socketIo(server, {
    cors: {
        origin: ['https://line-chat.tokyo', "http://127.0.0.1:8000", "https://twitter-clone.click"],
        methods: ['GET', 'POST']
    },
});


// 静的ファイルの提供
app.use(express.static('public'));

const userSockets = new Map(); // ユーザーIDとソケットのマッピング

// ソケットの接続処理
io.on('connection', (socket) => {

    socket.on('heartbeat', () => {
        console.log('Heartbeat received');
    });


    socket.on("register", (sender_id)=>{
        // もしこのユーザーIDがすでに存在する場合は、既存のソケットリストに追加
        if (userSockets.has(sender_id)) {
            userSockets.get(sender_id).push(socket);
        } else {
            // 新しいユーザーIDの場合、新しい配列を作成してソケットを保存
            userSockets.set(sender_id, [socket]);
        }
        console.log(`User ${sender_id} connected`);
    })
    // メッセージの受信とブロードキャスト
    socket.on('chat message', (data) => {
        const {msg, receiver_id, sender_id, sender_type, time, message_id, admin_login_id} = data
        console.log(`admin_login_id${admin_login_id}`);
        console.log(" ")

        console.log(`Message: ${msg}, Recipient ID: ${receiver_id}, senderType: ${sender_type}, message_id: ${message_id}`);

        // 受信者、送信者、管理者のソケットを取得
        const msgData = { msg, sender_id, sender_type, time, receiver_id, message_id, admin_login_id } ;
        broadcastMessageToSockets(userSockets, msgData)

        // LINEへメッセージ受信通知をする
        if(sender_type == "admin" && userSockets.get(receiver_id) == undefined){
            console.log("userID" + receiver_id);
            
            sendNotificationToLine(receiver_id, sender_id, client)
        }
    });
    



   
    // メッセージ画像のブロードキャスト
    socket.on("send_image", (data)=>{
        const {resizedImage, receiver_id, sender_id, sender_type, time, message_id,admin_login_id} = data

        console.log(`admin_login_id${admin_login_id}`);
        console.log(" ")
        console.log(`resizedImage: ${resizedImage}, Recipient ID: ${receiver_id}, senderType: ${sender_type}, message_id: ${message_id}`);
        // 受信者、送信者、管理者のソケットを取得
        const msgData = { sender_type, sender_id, time, receiver_id, message_id, resizedImage,admin_login_id } ;
        broadcastImagesToSockets(userSockets, msgData)
        

        // LINEへメッセージ受信通知をする
        if(sender_type == "admin" && userSockets.get(receiver_id) == undefined){
            sendNotificationToLine(receiver_id, sender_id, client)
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


server.setTimeout(0);  // これでタイムアウトを無効化します




app.get('/test', (req, res) => {
      res.send('Hello World!');
  });
  