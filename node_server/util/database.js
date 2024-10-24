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
        const [rows] = await connection.query(select_accountId_query, [entity_uuid, entity_type]);
        return rows[0].related_id
    }catch(error){
        throw error
    }
}

const selectUserId = async (connection, entity_uuid) => {
    const select_userId_query = "SELECT user_id FROM chat_users WHERE id = ?";
    try{
        // 1. ユーザーuuidから実際にユーザーIDを取得
        const user_id = await selectRelatedId(connection, entity_uuid, "user");

        console.log(user_id + "userID");
        
        // 2. ユーザーアカウントIDを取得する(13文字)
        const [rows] = await connection.query(select_userId_query, [user_id]);
        
        return rows[0].user_id
    }catch(error){
        throw error
    }
}

const selectAdminId = async(connection, entity_uuid) =>{
    const select_accountID_query = "SELECT account_id FROM line_accounts WHERE id = ?";
    try{
        // 1. 管理者uuidから実際に管理者IDを取得
        const admin_user_id = await selectRelatedId(connection, entity_uuid, "admin");

        // 2. 管理者アカウントIDを取得する(13文字)
        const [accountIds] = await connection.query(select_accountID_query, [admin_user_id]);
        return accountIds[0]["account_id"]
    }catch(error){
        throw error
    }
}

const selectAdminUUid = async(connection, admin_id) =>{
    const select_user_uuids = "SELECT entity_uuid FROM user_entities WHERE related_id = ? AND entity_type = 'admin'";
    const [rows] = await connection.query(select_user_uuids, [admin_id]);
    return rows[0]
}


const selectUserIds = async (connection, admin_account_id) =>{
        const select_user_ids = "SELECT id FROM chat_users WHERE account_id = ?";
        //id の値だけを抽出した配列を作成
        const [rows] = await connection.query(select_user_ids, [admin_account_id])
        return rows.map(row => row.id);
}

const selectUserUuids = async (connection, userIds) => {
    //指定した値のリストの中に列の値が存在するかどうかをチェック
    if (!userIds || userIds.length === 0) {
        return [];
    }
    const select_user_uuids = "SELECT entity_uuid FROM user_entities WHERE related_id IN (?) AND entity_type = 'user'";
    try {
        const [rows] = await connection.query(select_user_uuids, [userIds]);
        //entity_uuid の値だけを抽出した配列を作成
        return rows.map(row => row.entity_uuid);
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}


const userIdsOperation = async(admin_account_id)=>{
    let connection;
    let useruuids = [];
    try{
        // DB接続を確立
        connection = await createDbConnection()
        const userIds = await selectUserIds(connection, admin_account_id)
        if (userIds && userIds.length > 0) {
            useruuids = await selectUserUuids(connection, userIds)
            const adminuuid = await selectAdminUUid(connection, admin_account_id)

            return [useruuids, adminuuid["entity_uuid"]]
        }else{
            return []
        }
    }catch(error){
        throw error
    }
}


const selectBlockUser = async() =>{
    const select_blockUserID_query = "SELECT chat_user_id FROM block_chat_users WHERE is_blocked = '1'";
    let connection;
    try{
        // 1. ブロックユーザーを取得する
        connection = await createDbConnection()
        const [accountIds] = await connection.query(select_blockUserID_query);
        //entity_uuid の値だけを抽出した配列を作成
        return selectUserUuids(connection, accountIds.map(accountId => accountId.chat_user_id))
    }catch(error){
        throw error
    }
}



module.exports = {
    selectUserId,
    selectAdminId,
    userIdsOperation,
    createDbConnection,
    selectBlockUser
};
