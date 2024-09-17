const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost", // データベースホスト
    user: "laravel-project", // データベースユーザー
    password: "AhdhfnYhZp5YMn8H", // データベースパスワード
    database: "laravel-project", // データベース名
    reconnect: true,
});

// データベースに接続
connection.connect((err) => {
    if (err) {
        console.error("データベース接続に失敗しました:", err);
        return;
    }
    console.log("データベースに接続しました");
});

const selectUserID = (user_id) => {
    return new Promise((resolve, reject) => {
        const select_query = "SELECT related_id FROM user_entities WHERE entity_uuid = ? AND entity_type = ?";
            connection.query(select_query, [user_id, "user"], (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            const chatUserId = results[0]["related_id"];

            const select_query =
                "SELECT user_id FROM chat_users WHERE id = ?";
            connection.query(select_query,[chatUserId],(err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(results[0]["user_id"]);
                }
            );
        });
    });
};

const selectAdminID = (account_id) => {
    return new Promise((resolve, reject) => {

      const select_query_id = "SELECT related_id FROM user_entities WHERE entity_uuid = ? AND entity_type = ?";
      connection.query(select_query_id, [account_id, "admin"], (err, results) => {
      if (err) {
          reject(err);
          return;
      }

      const adminUserId = results[0]["related_id"];

      const select_query = "SELECT account_id FROM line_accounts WHERE id = ?";
      connection.query(select_query,[adminUserId],(err, results) => {
          if (err) {
              reject(err);
              return;
          }

          resolve(results[0]["account_id"]);
      }
    );
  });

  });
};

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
    selectUserID,
    selectAdminID,
    selectUserIds
};
