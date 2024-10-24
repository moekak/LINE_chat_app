const { selectBlockUser} = require("./database");

const broadcastMessageToSockets = async (userSockets, msgData) =>{
    // ブロックしているユーザーのuuidsをすべて取得する
    const ids = await selectBlockUser()
    
    const { msg, actual_sender_id, sender_type, time, actual_receiver_id, message_id, admin_login_id } = msgData;
    const recipientSockets  = Object.values(ids).includes(actual_receiver_id) == false &&  Object.values(ids).includes(actual_sender_id) == false ? userSockets.get(actual_receiver_id) : undefined;
    const senderSockets     = userSockets.get(actual_sender_id);
    const adminSockets      = Object.values(ids).includes(actual_sender_id) == false ? userSockets.get(`admin${actual_receiver_id}`) : undefined; //詳細の場合はadmin_accountID
    const adminUserSockets  = Object.values(ids).includes(actual_sender_id) == false ? userSockets.get(`user${admin_login_id}`)  : undefined;  //ダッシュボードの場合はloginID

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


const broadcastImagesToSockets = async(userSockets, msgData) =>{
    const ids = await selectBlockUser()
    const { sender_type, sender_id, time, receiver_id, message_id, resizedImage, admin_login_id} = msgData;
    const recipientSockets  = Object.values(ids).includes(receiver_id) == false &&  Object.values(ids).includes(sender_id) == false ? userSockets.get(receiver_id) : undefined;
    const senderSockets     = userSockets.get(sender_id);
    const adminSockets      = Object.values(ids).includes(sender_id) == false ? userSockets.get(`admin${receiver_id}`) : undefined; //詳細の場合はadmin_accountID
    const adminUserSockets  = Object.values(ids).includes(sender_id) == false ? userSockets.get(`user${admin_login_id}`)  : undefined;  //ダッシュボードの場合はloginID

    
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

const broadcastBroadcastingMessageToSockets = async(userSockets, msgData) => {
    const { sendingDatatoBackEnd, created_at, userUuids, adminUuid } = msgData;
    let recipientSockets = [];
    const ids = await selectBlockUser()

    // 複数のuserUuidsに対応するソケットを取得
    // userUuuidsがnullまたはundefinedではないか、配列であるかどうかを確認
    if(userUuids && Array.isArray(userUuids)){
        userUuids.forEach((uuid) => {
            
            // 各uuidに対応するソケットを userSockets から取得
            const socketSet = userSockets.get(uuid);
            if (socketSet !== undefined && Object.values(ids).includes(uuid) == false) {
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
                console.log("blocked acccount!!!!!!!!!!!!");
            }
        });
    }
    const senderSockets   = userSockets.get(adminUuid);
    
    // メッセージを送信する関数（重複した処理をまとめる）
    const broadcastMessage = (sockets) => {
        if(sockets){
            sockets.forEach((socket) => {
                socket.emit("broadcast message", sendingDatatoBackEnd, created_at, userUuids, adminUuid);
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