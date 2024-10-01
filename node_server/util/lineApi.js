
const { generateNotificationMessage } = require('./template.js');
const { createDbConnection, selectUserId, selectAdminId } = require('./database.js');

const sendNotificationToLine = async (actual_receiver_id, actual_sender_id, client) =>{
    let connection;
    try{
        // DB接続を確立
        connection = await createDbConnection()
        // ユーザーLINEアカウントIDを取得
        const user_id = await selectUserId(connection, actual_receiver_id)
        // 管理者LINEアカウントIDを取得
        const admin_id = await selectAdminId(connection, actual_sender_id)
        // LINEへ送信する際のメッセージテンプレート
        const templateMessage = generateNotificationMessage(admin_id, user_id)

        console.log("メッセージを送ります");
        
        // await client.pushMessage(user_id, templateMessage)
    }catch(error){
        console.log(`LINEへメッセージ通知に失敗しました: ${error}`);
        throw error
    }
    finally {
        if (connection) {
            await connection.end();  // DB接続を確実に閉じる
        }
    }
}

module.exports ={
    sendNotificationToLine
}