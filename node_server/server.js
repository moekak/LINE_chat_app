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
const socketIo = require('socket.io');
const cors = require('cors');

// アプリケーションの初期化
const app = express();

//リクエストを送信する際に許可するオリジン（ドメイン）を指定
app.use(cors({
    origin: 'https://line-chat.tokyo',
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
        origin: 'https://line-chat.tokyo',
        methods: ['GET', 'POST']
    }
});


// 静的ファイルの提供
app.use(express.static('public'));

const userSockets = new Map(); // ユーザーIDとソケットのマッピング

// ソケットの接続処理
io.on('connection', (socket) => {


    socket.on("register", (sender_id)=>{
        socket.userId = sender_id;// ソケットにユーザーIDを保存
        userSockets.set(sender_id, socket);
        console.log(`User ${sender_id} connected`);
    })
    // メッセージの受信とブロードキャスト
    socket.on('chat message', (data) => {


        const {msg, receiver_id} = data
        console.log(`Message: ${msg}, Recipient ID: ${receiver_id}`);
        const recipientSocket  = userSockets.get(receiver_id);
        if(recipientSocket){
            recipientSocket.emit("chat message", msg)
        }

    });
   

    // ソケットの切断処理
    socket.on('disconnect', () => {
        console.log('User disconnected');
        userSockets.delete(socket.userId); 
    });
});

// サーバーの起動
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





app.get('/test', (req, res) => {
      res.send('Hello World!');
  });
  