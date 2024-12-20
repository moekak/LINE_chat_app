
import { createDivForSearch, displayChatMessage, displayMessage, increaseMessageCount, updateChatUserList, updateMessageTime, updateUserListMessage } from '../component/chatController.js';
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
export const sendMessage = (socket, msg, sender_id, receiver_id, sender_type, msg2, url) => {

  	// sender_typeに基づいて送信者・受信者を自動設定
	let actual_sender_id, actual_receiver_id, data;

	if(sender_type == "admin"){
		actual_sender_id = sender_id; // 管理者が送信者(管理者ID)
		actual_receiver_id = receiver_id // ユーザーが受信者(ユーザーID)

		data = {
			content:msg2,
			admin_id: actual_sender_id,
			user_id: actual_receiver_id
		}
	}else if(sender_type == "user"){
		actual_sender_id = receiver_id; // ユーザーが送信者(ユーザーID)
		actual_receiver_id = sender_id // 管理者が受信者(管理者ID)

		data = {
			content:msg2,
			admin_id: actual_receiver_id,
			user_id: actual_sender_id
		}
	}

  fetchPostOperation(data, url)
	.then((res)=>{
		const time            = res["created_at"]
		const message_id      = res["message_id"]
		const admin_login_id  = res["admin_login_id"]


		socket.emit('chat message', {msg, actual_receiver_id, actual_sender_id, sender_type, time, message_id, admin_login_id});
		document.getElementById("js_msg").value = "";
	})
}


  // ##################################################################
//                  メッセージ受信処理
// ###################################################################

  // メッセージ受信時の処理
export const handleReceivedMessage = (isON, is_searching, sender_type, sender_id, time, receiver_id, message_id, content, message_type) =>{
    if (isON["isSoundOn"]) playNotificationSound();
    let current_chat_id = document.getElementById("js_chatuser_id").value

    if(current_chat_id == receiver_id || current_chat_id == sender_id){
      displayChatMessage("js_append_admin", sender_type, content, "admin", sender_id, time, message_type);
    }

		// チャットリストのリアルタイムでデータを表示する処理
		updateMessageTime(time, sender_id, sender_type, receiver_id, []);
		displayMessage(sender_id, message_type === "text" ? content : "", sender_type, receiver_id, message_type);
		updateChatUserList(receiver_id, content, sender_id, message_type, sender_type, is_searching);

	if (sender_type === "user") {
		// 通知表示
		increaseMessageCount(sender_id);
	}

	// メッセージ送信者と開いてるチャットユーザーが同じだったら、メッセージを既読にするため、データベースに既読を格納する
	const data = {
		"message_id": message_id,
		"admin_id": receiver_id,
		"chat_user_id": sender_id
	};

	if (sender_id == document.getElementById("js_chatuser_id").value) {
		fetchPostOperation(data, "/api/user/messages/read");
	}
}

export const handleReceivedBroadcastingMessage = (is_searching, sender_id, time, sendingDatatoBackEnd, ids) =>{
  // チャットを画面に表示する処理
  for(let data in sendingDatatoBackEnd){
      let content = sendingDatatoBackEnd[data]["data"];
      let type = sendingDatatoBackEnd[data]["type"]
      displayChatMessage("js_append_admin", "admin", content, "admin", sender_id, time, type, ids);
  }
  
  updateMessageTime(time, sender_id, "admin", null, ids);
  updateUserListMessage(ids)
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

      console.log(res);
      
      const parentElement = document.getElementById("js_chatUser_wrapper");
      parentElement.innerHTML = "";

      // データを作成日時の降順にソート

      console.log(res["mergedData"]);
      
      const sortedData = Object.entries(res["mergedData"]).sort(([, a], [, b]) => {
        return new Date(b.latest_message.created_at) - new Date(a.latest_message.created_at);
      });

      // ソートされたデータをチャットリストに表示
      sortedData.forEach(([key, res]) => {
        let message_type = res["latest_message"]["content"] ? "text" : "image";
        parentElement.innerHTML += createChatUserContainer(res["userUuid"], res, res["latest_message"]["content"], message_type);
      });

      chatNavigator();
    });
};