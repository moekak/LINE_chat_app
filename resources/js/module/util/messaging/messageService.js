
import ChatMessageController from '../../component/chat/ChatMessageController.js';
import ChatSearchController from '../../component/chat/ChatSearchController.js';
import ChatUIHelper from '../../component/chat/ChatUIHelper.js';
import ChatUserListController from '../../component/chat/ChatUserListController.js';
import { createChatUserContainer } from '../../component/templates/elementTemplate.js';
import Fetch from '../api/Fetch.js';
import InfiniteScrollForList from '../scrolling/InfiniteScrollForList.js';
import { playNotificationSound } from './notificationSound.js';

// ##################################################################
//                  サーバーへデータを送信する処理
// ###################################################################

export const prepareMessageData = () => {
	// スタイル変更
	document.getElementById('js_msg').style.height = "19px";
	document.querySelector(".chat__form-submit").classList.add("disabled_btn");
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

	

	Fetch.fetchPostOperation(data, url)
		.then((res)=>{
			const time            = res["created_at"]
			const admin_login_id  = res["admin_login_id"]

			socket.emit('chat message', {msg, actual_receiver_id, actual_sender_id, sender_type, time, admin_login_id});
			document.getElementById("js_msg").value = "";
	})
}


  // ##################################################################
//                  メッセージ受信処理
// ###################################################################

  // メッセージ受信時の処理
export const handleReceivedMessage = async (isON, is_searching, sender_type, sender_id, time, receiver_id, content, message_type, cropArea = []) =>{
	if (isON["isSoundOn"]) playNotificationSound();
	let current_chat_id = document.getElementById("js_chatuser_id").value

	if(current_chat_id == receiver_id || current_chat_id == sender_id){

		// 必要なデータをオブジェクトで準備
		const data = {
			messageType: message_type,
			cropArea: cropArea,
			position: "beforeend",
			time: time,
			className: "js_append_admin",
			senderType: sender_type,
			content: content,
			fileName: "admin",
			senderId: sender_id
		}
		// `ChatMessageController` のインスタンスを作成
		const chatMessageController = new ChatMessageController(data)

		// チャット画像を表示
		chatMessageController.displayChatMessage()
	}

	const args = {
		senderId: sender_id,
		receiverId: receiver_id,
		senderType: sender_type,
		isSearching: is_searching,
		content: content,
		messageType: message_type,
		time: time
	}

	const chatUserListController = new ChatUserListController(args)

	// チャットリストのリアルタイムでデータを表示する処理
	chatUserListController.updateMessageTime()
	chatUserListController.displayMessage()
	chatUserListController.increaseMessageCount()
	await chatUserListController.updateChatUserList()

	// メッセージ送信者と開いてるチャットユーザーが同じだったら、メッセージを既読にするため、データベースに既読を格納する
	const data = {
		"admin_id": receiver_id,
		"chat_user_id": sender_id
	};

	if (sender_id == document.getElementById("js_chatuser_id").value) {
		Fetch.fetchPostOperation(data, "/api/user/messages/read");
	}
}

export const handleReceivedBroadcastingMessage = (sender_id, time, sendingDatatoBackEnd, ids) =>{
	let orderedData = sendingDatatoBackEnd.sort((a, b) => a.order - b.order);

	const argsForMessage = {
		position: "beforeend",
		time: time,
		className: "js_append_admin",
		senderType: "admin",
		fileName: "admin",
		senderId: sender_id,
		ids: ids
	}
	orderedData.forEach((data)=>{
		let content = data["resource"];
		let type = data["type"]
		let cropArea = data["cropArea"]
		let url = data["url"]

		 // 必要なデータを新しいオブジェクトで作成
		const messageArgs = {
			...argsForMessage, // 基本の値を引き継ぐ
			messageType: type,
			content: content,
			cropArea : cropArea,
			url: url
		};

		// `ChatMessageController` のインスタンスを作成
		const chatMessageController = new ChatMessageController(messageArgs)

		// チャットメッセージを表示
		chatMessageController.displayChatMessage()
	})

	const argsForUserList = {
		senderId: sender_id,
		receiverId: null,
		senderType: "admin",
		isSearching: false,
		content: "",
		messageType:"",
		time: time
	}

	const chatUserListController = new ChatUserListController(argsForUserList)

	// チャットリストのリアルタイムでデータを表示する処理
	chatUserListController.updateMessageTime()
	chatUserListController.updateUserListMessage(ids)
}

// debounce関数を作成
export const debounce = (func, delay) => {
	let timer;
	return function (...args) {
		clearTimeout(timer);
		return new Promise((resolve) => {
			timer = setTimeout(async () => {
				try {
					const result = await func.apply(this, args);
					resolve(result);
				} catch (error) {
					console.error('Debounce error:', error);
				}
			}, delay);
		});
	};
};


// ##################################################################
//                      検索バーの処理
// ###################################################################

// 検索バーの入力処理
export const handleSearchInput = async (is_searching, value, sender_id) => {
	const data = {
		admin_id: sender_id,
		text: value
	};

	// 検索欄に何かしら入力があった場合
	if (value.length > 0) {
		await ChatSearchController.createDivForSearch(data)
	} else {
		is_searching.flag = false;
		await fetchAndDisplayAllMessages(sender_id);
	}

	// メッセージの長さ制限処理
	const elements = document.querySelectorAll(".js_chatMessage_elment");
	elements.forEach((element) => {
		element.innerHTML = ChatUIHelper.adjustMesageLength(element.innerHTML)
	});
};


// 全ユーザーのメッセージを取得し、表示する処理
export const fetchAndDisplayAllMessages = async (admin_id) => {
	const response = await Fetch.fetchGetOperation(`/api/users/messages/lineAccounts/${admin_id}`)
	
	const parentElement = document.getElementById("js_chatUser_wrapper");
	parentElement.innerHTML = "";
	response.forEach((res)=>{
		if(res["latest_all_message"] !== null){
			parentElement.innerHTML += createChatUserContainer(res["entity_uuid"], res);
		}
		
	})

	// チャットユーザーリストの無限スクロール
	const element = document.querySelector(".chat__users-list-area")
	const adminId = document.getElementById("js_admin_id").value
	new InfiniteScrollForList(element, adminId)



	// チャットナビゲーションを更新
	ChatUIHelper.chatNavigator()
};

// テキストに含まれてるURLをaタグに変換する
export const linkifyContent = (content) =>{
	const cleanContent = content.replace(/<br>/g, '\n');
      const pattern = /((?:https?:\/\/|www\.)[^\s<>]+)/gi;
      const replacement = '<a href="$1" openExternalBrowser=1>$1</a>';

	return cleanContent.replace(pattern, replacement)
}