
const broadcastMessageToSockets = (userSockets, msgData) =>{

    const { msg, actual_sender_id, sender_type, time, actual_receiver_id, message_id, admin_login_id } = msgData;
    const recipientSockets  = userSockets.get(actual_receiver_id);
    const senderSockets     = userSockets.get(actual_sender_id);
    const adminSockets      = userSockets.get(`admin${actual_receiver_id}`);
    const adminUserSockets  = userSockets.get(`user${admin_login_id}`);

    // メッセージを送信する関数（重複した処理をまとめる）
    const broadcastMessage = (sockets,isAdmin = false, isAdminUser = false) => {
        if (sockets) {
            sockets.forEach((socket) => {
                if (isAdmin) {
                    // 管理者には異なるメッセージを送信
                    socket.emit("chat message", actual_sender_id, actual_receiver_id, sender_type);
                } else if(isAdminUser){
                    socket.emit("chat message", actual_sender_id, actual_receiver_id, sender_type, admin_login_id);
                }else {
                    //  受信者または送信者には通常のメッセージを送信
                    socket.emit("chat message", msg, sender_type, actual_sender_id, time, actual_receiver_id, message_id);
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
    const adminSockets      = userSockets.get(`admin${receiver_id}`) //詳細の場合はadmin_accountID
    const adminUserSockets  = userSockets.get(`user${admin_login_id}`) //ダッシュボードの場合はloginID

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



module.exports ={
    broadcastMessageToSockets, broadcastImagesToSockets
}