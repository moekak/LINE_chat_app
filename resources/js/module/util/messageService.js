
import { createDivForSearch, displayChatMessage, displayMessage, increaseMessageCount, updateChatUserList, updateMessageTime } from '../component/chatController.js';
import { createChatUserContainer } from '../component/elementTemplate.js';
import { chatNavigator } from '../component/uiController.js';
import { fetchGetOperation, fetchPostOperation } from './fetch.js';
import { playNotificationSound } from './notificationSound.js';

// ##################################################################
//                  サーバーへデータを送信する処理
// ###################################################################

export const prepareMessageData = () => {
  // スタイル変更
  document.getElementById('js_msg').style.height = "19px";
  document.querySelector(".chat__form-submit").classList.add("disable_btn");

  // サーバーに送信するデータをすべて取得する
  const msg = document.getElementById("js_msg").value;
  const formattedMsg = msg.replace(/\n/g, '<br>'); // 改行文字を <br> タグに置き換える
  const receiver_id = document.getElementById("js_receiver_id").value;
  const sender_type = document.getElementById("js_sender_type").value;

  return { msg, formattedMsg, receiver_id, sender_type };
};

// メッセージをサーバーに送信
export const sendMessage = (socket, msg, sender_id, receiver_id, sender_type, msg2) => {

      console.log(`formattedMsg: ${msg}`);
      
      const data = {
            content:msg2,
            admin_id: sender_id,
            user_id: receiver_id
      }

      // 管理者メッセージをデータベースに格納
      fetchPostOperation(data, "/api/admin/messages")
      .then((res)=>{
        const time            = res["created_at"]
        const message_id      = res["message_id"]
        const admin_login_id  = res["admin_login_id"]
        
        socket.emit('chat message', {msg, receiver_id, sender_id,sender_type, time, message_id, admin_login_id});
        document.getElementById("js_msg").value = "";
      })
  }


  // ##################################################################
//                  メッセージ受信処理
// ###################################################################

  // メッセージ受信時の処理
export const handleReceivedMessage = (isON, is_searching, sender_type, sender_id, time, receiver_id, message_id, content, message_type) =>{
      if (isON["isSoundOn"]) playNotificationSound();

      // チャットを画面に表示する処理
      displayChatMessage("js_append_admin", sender_type, content, "admin", sender_id, time, message_type);
  
      // チャットリストのリアルタイムでデータを表示する処理
      updateMessageTime(time, sender_id, sender_type, receiver_id);
      displayMessage(sender_id, message_type === "text" ? content : "", sender_type, receiver_id, message_type);
      updateChatUserList(receiver_id, content, sender_id, message_type, sender_type, is_searching);
  
      if (sender_type === "user") {
        // 通知表示
        increaseMessageCount(sender_id);
      }
  
      // メッセージ送信者と開いてるチャットユーザーが同じだったら、メッセージを既読にするため、データベースに既読を格納する
      const data = {
        "message_id": message_id,
        "admin_id": sender_id,
        "chat_user_id": receiver_id
      };
  
      if (sender_id == document.getElementById("js_chatuser_id").value) {
        fetchPostOperation(data, "/api/user/messages/read");
      }
}

// debounce関数を作成
export const debounce =(func, delay) =>{
      let timer;
      return function(...args) {
        clearTimeout(timer); // 前のタイマーをクリア
        timer = setTimeout(() => {
          func.apply(this, args); // 一定時間後に関数を実行
        }, delay);
      };
}


// ##################################################################
//                      検索バーの処理
// ###################################################################

// 検索バーの入力処理
export const handleSearchInput = (is_searching, value, sender_id) => {
  const data = {
    admin_id: sender_id,
    text: value
  };

  // 検索欄に何かしら入力があった場合
  if (value.length > 0) {
    createDivForSearch(data);
  } else {
    is_searching.flag = false;
    fetchAndDisplayAllMessages(sender_id);
  }
};


// 全ユーザーのメッセージを取得し、表示する処理
export const fetchAndDisplayAllMessages = (admin_id) => {
  fetchGetOperation(`/api/users/messages/lineAccounts/${admin_id}`)
    .then((res) => {
      const parentElement = document.getElementById("js_chatUser_wrapper");
      parentElement.innerHTML = "";

      // データを作成日時の降順にソート
      const sortedData = Object.entries(res["mergedData"]).sort(([, a], [, b]) => {
        return new Date(b.message.created_at) - new Date(a.message.created_at);
      });

      // ソートされたデータをチャットリストに表示
      sortedData.forEach(([key, res]) => {
        let message_type = res["message"]["content"] ? "text" : "image";
        parentElement.innerHTML += createChatUserContainer(res["uuid"], res, res["message"]["content"], message_type);
      });

      chatNavigator();
    });
};