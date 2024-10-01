
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

const broadcastBroadcastingMessageToSockets = (userSockets, msgData) => {
    const { formatted_body, created_at, userUuids, adminUuid } = msgData;

    let recipientSockets = [];

    // 複数のuserUuidsに対応するソケットを取得
    // userUuuidsがnullまたはundefinedではないか、配列であるかどうかを確認
    if(userUuids && Array.isArray(userUuids)){
        userUuids.forEach((uuid) => {
            // 各uuidに対応するソケットを userSockets から取得
            const socketSet = userSockets.get(uuid);
            if (socketSet) {
                // 取得したソケットが Set オブジェクトである場合の処理
                if (socketSet instanceof Set) {
                    // 複数のソケットがある場合（Setオブジェクト）
                    socketSet.forEach(socket => {
                        if (socket && typeof socket.emit === 'function') {
                            recipientSockets.push(socket);
                        }
                    });
                } else if (typeof socketSet.emit === 'function') {
                    // 単一のソケットオブジェクトの場合
                    recipientSockets.push(socketSet);
                }
            } else {
                console.log(`No socket found for UUID: ${uuid}`);
            }
        });
    }
    const senderSockets   = userSockets.get(adminUuid);
    
    // メッセージを送信する関数（重複した処理をまとめる）
    const broadcastMessage = (sockets) => {
        if(sockets){
            sockets.forEach((socket) => {
                console.log(socket.id);
                
                socket.emit("broadcast message", formatted_body, created_at, userUuids, adminUuid);
            });
        }
    };

    // 受信者、送信者のソケットにメッセージを送信
    if(recipientSockets){
        broadcastMessage(recipientSockets);
    }
    if(senderSockets){
        broadcastMessage(senderSockets);
    }
    
}


module.exports ={
    broadcastMessageToSockets, broadcastImagesToSockets, broadcastBroadcastingMessageToSockets
}