const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',    // データベースホスト
  user: 'laravel-project',         // データベースユーザー
  password: 'AhdhfnYhZp5YMn8H', // データベースパスワード
  database: 'laravel-project'      // データベース名
});

// データベースに接続
connection.connect((err) => {
  if (err) {
    console.error('データベース接続に失敗しました:', err);
    return;
  }
  console.log('データベースに接続しました');
});

const selectUserID = (user_id, account_id) => {
      return new Promise((resolve, reject) => {
            const select_query = 'SELECT user_id FROM chat_users WHERE id = ? AND account_id = ?';
          connection.query(select_query, [user_id, account_id], (err, results) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(results[0]["user_id"])

          });
      });
}

const selectAdminID = (account_id) => {
      return new Promise((resolve, reject) => {
            const select_query = 'SELECT account_id FROM line_accounts WHERE id = ?';
          connection.query(select_query, [account_id], (err, results) => {
              if (err) {
                  reject(err);
                  return;
              }
              resolve(results[0]["account_id"])

          });
      });
}
    
    
    
module.exports = {
      selectUserID,
      selectAdminID
};