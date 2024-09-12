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
        origin: ['https://line-chat.tokyo', "http://127.0.0.1:8000"],
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
        socket.userId = sender_id;// ソケットにユーザーIDを保存
        userSockets.set(sender_id, socket);
        console.log(`User ${sender_id} connected`);
    })
    // メッセージの受信とブロードキャスト
    socket.on('chat message', (data) => {
        const {msg, receiver_id, sender_id, sender_type, time, message_id} = data

        console.log(`Message: ${msg}, Recipient ID: ${receiver_id}, senderType: ${sender_type}, message_id: ${message_id}`);
        const recipientSocket  = userSockets.get(receiver_id);
        const senderSocket = userSockets.get(sender_id);
        // 受信者のソケットが存在する場合
        if(recipientSocket){
            recipientSocket.emit("chat message", msg, sender_type, sender_id, time, receiver_id, message_id)
        }
         // 送信者のソケットが存在する場合
         if (senderSocket) {
            senderSocket.emit("chat message", msg, sender_type, sender_id, time, receiver_id, message_id);
        }

        if(sender_type == "admin" && userSockets.get(receiver_id) == undefined){
            console.log("userID" + receiver_id);
            
            selectUserID(receiver_id, sender_id)
            .then((userId)=>{
                selectAdminID(sender_id)
                .then((adminId)=>{
                    console.log(userId);
      
                    const templateMessage = {
                        type: 'template',
                        altText: 'チャットメッセージを受信しました',
                        template: {
                          type: 'buttons',
                          text: 'チャットメッセージを受信しました',
                          actions: [
                            {
                              type: 'uri',
                              label: 'チャットを確認',
                              uri: `https://line-chat.tokyo/chat/${adminId}/${userId}`
                            }
                          ]
                        }
                      };
                      
                          
                        // pushMessageを使用してプッシュ通知を送信

                        // 第一引数にユーザーID、第二引数にメッセージの配列を渡す
                        client.pushMessage(userId, templateMessage)
                        .then(() => {
                            console.log('メッセージが送信されました');
                        })
                        .catch((err) => {
                            console.error('メッセージ送信エラー:', err);
                        });

                })
            })
            
      
                      
           
        }
        

    });
    



   
    // メッセージ画像のブロードキャスト
    socket.on("send_image", (data)=>{
        const {resizedImage, receiver_id, sender_id, sender_type, time, message_id} = data
        const recipientSocket  = userSockets.get(receiver_id);
        const senderSocket = userSockets.get(sender_id);

        // 受信者のソケットが存在する場合
        if(recipientSocket){
            recipientSocket.emit("send_image", sender_type, sender_id, time, receiver_id, message_id, resizedImage)
        }
         // 送信者のソケットが存在する場合
         if (senderSocket) {
            senderSocket.emit("send_image", sender_type, sender_id, time, receiver_id, message_id, resizedImage)
        }

        if(sender_type == "admin"){
            console.log("userID" + receiver_id);
            
            selectUserID(receiver_id, sender_id)
            .then((userId)=>{
                selectAdminID(sender_id)
                .then((adminId)=>{
                    console.log(userId);
      
                    const templateMessage = {
                        type: 'template',
                        altText: 'チャットメッセージを受信しました',
                        template: {
                          type: 'buttons',
                          text: 'チャットメッセージを受信しました',
                          actions: [
                            {
                              type: 'uri',
                              label: 'チャットを確認',
                              uri: `https://line-chat.tokyo/chat/${adminId}/${userId}`
                            }
                          ]
                        }
                      };
                      
                          
                        // pushMessageを使用してプッシュ通知を送信

                        // 第一引数にユーザーID、第二引数にメッセージの配列を渡す
                        client.pushMessage(userId, templateMessage)
                        .then(() => {
                            console.log('メッセージが送信されました');
                        })
                        .catch((err) => {
                            console.error('メッセージ送信エラー:', err);
                        });

                })
            })
            
      
                      
           
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
  