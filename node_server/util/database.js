const mysql = require('mysql2/promise'); // promiseベースでmysqlを使う
require('dotenv').config();

const createDbConnection= async () =>{
    // DB接続を確立
    return await mysql.createConnection({
        host: process.env.DB_HOST,      // データベースホスト
        user: process.env.DB_USER,      // データベースユーザー
        password: process.env.DB_PASS, 	// データベースパスワード
        database: process.env.DB_NAME,  // データベース名
    });
}

const selectRelatedId = async (connection, entity_uuid, entity_type) =>{
    // 引数で受け取ったuuidから実際のidを取得する
    const select_accountId_query = "SELECT related_id FROM user_entities WHERE entity_uuid = ? AND entity_type = ?";
    try{
        const [accountIds] = await connection.query(select_accountId_query, [entity_uuid, entity_type]);
        return accountIds[0]["related_id"]
    }catch(error){
        throw error
    }
}

const selectUserId = async (connection, entity_uuid) => {
    const select_userId_query = "SELECT user_id FROM chat_users WHERE id = ?";
    try{
        // 1. ユーザーuuidから実際にユーザーIDを取得
        const user_id = await selectRelatedId(entity_uuid, "user");

        // 2. ユーザーアカウントIDを取得する(13文字)
        const [accountIds] = await connection.query(select_userId_query, [user_id]);
        return accountIds[0]["account_id"]
    }catch(error){
        throw error
    }
}

const selectAdminId = async(connection, entity_uuid) =>{
    const select_accountID_query = "SELECT account_id FROM line_accounts WHERE id = ?";
    try{
        // 1. 管理者uuidから実際に管理者IDを取得
        const admin_user_id = await selectRelatedId(entity_uuid, "admin");

        // 2. 管理者アカウントIDを取得する(13文字)
        const [accountIds] = await connection.query(select_accountID_query, [admin_user_id]);
        return accountIds[0]["account_id"]
    }catch(error){
        throw error
    }
}


const selectUserIds = (admin_account_id) =>{
    return new Promise(()=>{
        const select_user_ids = "SELECT id FROM chat_users WHERE account_id = ?";
        connection.query(select_user_ids, [admin_account_id], (err, results) =>{
            if(err){
                reject(err)
                return
            }

            results.forEach((res)=>{
                console.log(res);
            })
        })
    })
}

module.exports = {
    selectUserId,
    selectAdminId,
    selectUserIds,
    createDbConnection
};
