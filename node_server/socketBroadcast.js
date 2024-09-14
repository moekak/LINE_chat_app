const { selectUserID, selectAdminID } = require("./database.js");

const broadcastMessageToSockets = (userSockets, msgData) =>{

      const { msg, sender_id, sender_type, time, receiver_id, message_id, admin_login_id } = msgData;
      const recipientSockets  = userSockets.get(receiver_id);
      const senderSockets     = userSockets.get(sender_id);
      const adminSockets      = userSockets.get(`admin${receiver_id}`);
      const adminUserSockets  = userSockets.get(`user${admin_login_id}`);


      // メッセージを送信する関数（重複した処理をまとめる）
    const broadcastMessage = (sockets,isAdmin = false, isAdminUser = false) => {
        if (sockets) {
            sockets.forEach((socket) => {
                if (isAdmin) {
                    // 管理者には異なるメッセージを送信
                    socket.emit("chat message", sender_id, receiver_id, sender_type);
                } else if(isAdminUser){
                    socket.emit("chat message", sender_id, receiver_id, sender_type, admin_login_id);
                }else {
                    //  受信者または送信者には通常のメッセージを送信
                    socket.emit("chat message", msg, sender_type, sender_id, time, receiver_id, message_id);
                }
            });
        }
    };

    // 受信者、送信者、管理者のソケットにメッセージを送信
    broadcastMessage(recipientSockets);
    broadcastMessage(senderSockets);
    broadcastMessage(adminSockets, true);
    broadcastMessage(adminUserSockets, false, true);
}
const broadcastImagesToSockets = (userSockets, msgData) =>{

    const { sender_type, sender_id, time, receiver_id, message_id, resizedImage, admin_login_id} = msgData;

    const recipientSockets  = userSockets.get(receiver_id);
    const senderSockets     = userSockets.get(sender_id);
    const adminSockets      = userSockets.get(`admin${receiver_id}`);
    const adminUserSockets  = userSockets.get(`user${admin_login_id}`);

      // メッセージを送信する関数（重複した処理をまとめる）
    const broadcastMessage = (sockets, isAdmin = false, isAdminUser = false) => {
        if (sockets) {
            sockets.forEach((socket) => {
                if (isAdmin) {
                    // 管理者には異なるメッセージを送信
                    socket.emit("send_image", sender_id,receiver_id, sender_type);
                } else if(isAdminUser){
                    socket.emit("send_image", sender_id, receiver_id, sender_type, admin_login_id);
                }else {
                    // 受信者または送信者には通常のメッセージを送信
                    socket.emit("send_image", sender_type, sender_id, time, receiver_id, message_id, resizedImage);
                }
            });
        }
    };

    // 受信者、送信者、管理者のソケットにメッセージを送信
    broadcastMessage(recipientSockets);
    broadcastMessage(senderSockets);
    broadcastMessage(adminSockets, true);
    broadcastMessage(adminUserSockets, false, true);
      
}


const sendNotificationToLine = (receiver_id, sender_id, client) =>{
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

                    
            //  pushMessageを使用してプッシュ通知を送信
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

module.exports ={
      broadcastMessageToSockets, broadcastImagesToSockets,sendNotificationToLine
}