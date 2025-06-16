
import SocketService from './module/util/socket/SocketService.js';
import { prepareMessageData, sendMessage } from './module/util/messaging/messageService.js';
import config from './config/config.js';
import VisibilityManager from './module/util/state/VisibilityManager.js';
import InfiniteScroll from './module/util/scrolling/InfiniteScroll.js';
import BrowserAndDeviceDetector from './module/util/BrowserAndDeviceDetector.js';
import ChatMessageController from './module/component/chat/ChatMessageController.js';
import ModalController from './module/component/ui/ModalController.js';
import { handleImageProcessingFlow } from './module/util/fileOperation/imageFileOperator.js';
import ChatUIHelper from './module/component/chat/ChatUIHelper.js';
import FromController from './module/component/ui/FormController.js';
import Fetch from './module/util/api/Fetch.js';
import { API_ENDPOINTS } from './config/apiEndPoints.js';


document.addEventListener("DOMContentLoaded", ()=>{
	// チャット表示の無限スクロール
	const element = document.querySelector(".chat__message-main")
	const adminUuid = document.getElementById("js_receiver_id").value 
	const userUuid = document.getElementById("js_sender_id").value
	const infiniteScrollInstance = new InfiniteScroll(element, adminUuid, userUuid, "user")



	// グローバル変数
	//!! sender_id = ユーザーID!!
	const sender_id = document.getElementById("js_sender_id").value
	// socketServiceの初期化
	const socketService = new SocketService(config.SOCKET_URL, sender_id)
	// 30秒ごとにハートビートを送信
	setInterval(socketService.sendHeartbeat(), 10000);
	const socket  = socketService.getSocket()

	FromController.changeTextareaHeight()
	FromController.disableSubmitBtn()


	new VisibilityManager(socket, sender_id)

	// クライアントからソケットサーバーへメッセージを送信する
	document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
		e.preventDefault();
		const { msg, formattedMsg, receiver_id, sender_type } = prepareMessageData();

		// メッセージをサーバーに送信する
		sendMessage(socket, formattedMsg, receiver_id, sender_id, sender_type, msg, "/api/user/messages")
	})


	// サーバーからのメッセージを受信
	socket.on('chat message',async ( msg, sender_type, actual_sender_id, time, actual_receiver_id) => {


		// 必要なデータをオブジェクトで準備
		const data = {
			messageType: "text",
			cropArea: [],
			position: "beforeend",
			time: time,
			className: "js_append_user",
			senderType: sender_type,
			content: msg,
			fileName: "user",
			senderId: ""
		}

		
		// `ChatMessageController` のインスタンスを作成
		const chatMessageController = new ChatMessageController(data)

		// チャットメッセージを表示
		chatMessageController.displayChatMessage()

		// チャットをユーザーが開いていたら全て既読にする
		const sendingData = {
			"admin_id": actual_sender_id,
			"chat_user_id": actual_receiver_id
		};

		if (actual_receiver_id == document.getElementById("js_uuid").value && document.visibilityState == "visible") {
			Fetch.fetchPostOperation(sendingData, API_ENDPOINTS.ADMIN_MESSAGE_READ);
		}

		// ボタンを無効化
		document.querySelector(".chat__form-submit").classList.add("disabled_btn");

		// チャット画面を最下部にスクロール
		ChatUIHelper.scrollToBottom()
		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();
	});

	socket.on("send_image", async (sender_type, sender_id, time, receiver_id, resizedImage, cropArea)=>{

		// ローダーを非表示にする
		ModalController.close_loader()

		// 必要なデータをオブジェクトで準備
		const data = {
			messageType: "image",
			cropArea: cropArea,
			position: "beforeend",
			time: time,
			className: "js_append_user",
			senderType: sender_type,
			content: resizedImage,
			fileName: "user",
			senderId: ""
		}
		// `ChatMessageController` のインスタンスを作成
		const chatMessageController = new ChatMessageController(data)

		// チャット画像を表示
		chatMessageController.displayChatMessage()

		// チャットをユーザーが開いていたら全て既読にする
		const sendingData = {
			"admin_id": sender_id,
			"chat_user_id": receiver_id
		};

		if (receiver_id == document.getElementById("js_uuid").value && document.visibilityState == "visible") {
			Fetch.fetchPostOperation(sendingData, API_ENDPOINTS.ADMIN_MESSAGE_READ);
		}
		ModalController.open_image_modal()

		// チャット画面を最下部にスクロール
		ChatUIHelper.scrollToBottom()

		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();
	})

	socket.on('send_messages', async (res) => {
		ModalController.close_loader()
		ModalController.open_image_modal(true)
		ModalController.close_image_by_key()

		res["data"].forEach(async (data)=>{
			if(data["type"] === "text"){
					// 必要なデータをオブジェクトで準備
				const messageData = {
					messageType: "text",
					cropArea: [],
					position: "beforeend",
					time: data["created_at"],
					className: "js_append_user",
					senderType: "admin",
					content: data["resource"],
					fileName: "user",
					senderId: ""
				}

				
				// `ChatMessageController` のインスタンスを作成
				const chatMessageController = new ChatMessageController(messageData)

				// チャットメッセージを表示
				chatMessageController.displayChatMessage()

				// チャットをユーザーが開いていたら全て既読にする
				const sendingData = {
					"admin_id": data["adminUuid"],
					"chat_user_id": data["userUuid"]
				};

				if (data["userUuid"] == document.getElementById("js_uuid").value && document.visibilityState == "visible") {
					Fetch.fetchPostOperation(sendingData, API_ENDPOINTS.ADMIN_MESSAGE_READ);
				}

				// ボタンを無効化
				document.querySelector(".chat__form-submit").classList.add("disabled_btn");

				// チャット画面を最下部にスクロール
				ChatUIHelper.scrollToBottom()
			}else if(data["type"] === "image"){
				// ローダーを非表示にする
				ModalController.close_loader()

				// 必要なデータをオブジェクトで準備
				const messageData = {
					messageType: "image",
					cropArea: data["cropArea"],
					position: "beforeend",
					time: data["created_at"],
					className: "js_append_user",
					senderType: "admin",
					content: data["resource"],
					fileName: "user",
					senderId: ""
				}
				// `ChatMessageController` のインスタンスを作成
				const chatMessageController = new ChatMessageController(messageData)

				// チャット画像を表示
				chatMessageController.displayChatMessage()

				// チャットをユーザーが開いていたら全て既読にする
				const sendingData = {
					"admin_id": data["adminUuid"],
					"chat_user_id": data["userUuid"]
				};

				if (data["userUuid"] == document.getElementById("js_uuid").value && document.visibilityState == "visible") {
					Fetch.fetchPostOperation(sendingData, API_ENDPOINTS.ADMIN_MESSAGE_READ);
				}
				ModalController.open_image_modal()

				// チャット画面を最下部にスクロール
				ChatUIHelper.scrollToBottom()
			}
					
		})
		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();

	});

	socket.on("broadcast message", async(sendingDatatoBackEnd, created_at, userUuids, adminUuid)=>{
		// 受信データを order プロパティを基準に昇順で並び替え
		let orderedData = sendingDatatoBackEnd.sort((a, b) => a.order - b.order);

		let args = {
			messageType: "",
			position: "beforeend",
			time: created_at,
			className: "js_append_user",
			senderType: "admin",
			content: "",
			fileName: "user",
			senderId: ""
		}

		
		let lastMessage = {}

		
		orderedData.forEach((data, index)=>{

			let content = data["resource"];
			let type = data["type"]
			let cropArea = data["cropArea"]
			let url = data["url"]
			let id = data["id"]

			// 一斉メッセージの最後のメッセージのデータを取得
			if(index + 1 === orderedData.length){
				lastMessage["resource"] = data["resource"]
				lastMessage["message_type"] = data["type"]
				lastMessage["message_id"] = data["id"]
				
			}
	
			 // 必要なデータを新しいオブジェクトで作成
			const messageArgs = {
				...args, // 基本の値を引き継ぐ
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

		// // チャットを開いていないユーザーを取得
		const userUUid = userUuids.find((uuid) => uuid == document.getElementById("js_uuid").value)
		const sendingData = {
			"admin_id": adminUuid,
			"chat_user_id": userUUid
		};

		if(userUUid && document.visibilityState == "visible"){
			Fetch.fetchPostOperation(sendingData, API_ENDPOINTS.ADMIN_MESSAGE_READ);
		}


		ChatUIHelper.scrollToBottom()
		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();
	})

	// 画像の処理
	const fileInput = document.getElementById("fileInput")
	fileInput.addEventListener("change" ,async ()=>{
		await handleImageProcessingFlow(socket, sender_id, "/api/user/messages/image", "user", fileInput.files[0])
		fileInput.value = "";
	})

	// チャット画面上部をクリックした際のスタイル変更処理
	const items = document.querySelectorAll(".js_header_item");
	items.forEach((item) => {
		item.addEventListener("click", () => {
			// すべてのアイテムからactiveクラスを削除
			items.forEach((otherItem) => {
				otherItem.classList.remove("active");
				otherItem.querySelector(".header-icon").classList.remove("active_font");
				otherItem.querySelector(".chat__message_header-item-text").classList.remove("active_font");
			});
			// クリックされたアイテムにクラスを追加
			item.classList.add("active");
			item.querySelector(".header-icon").classList.add("active_font");
			item.querySelector(".chat__message_header-item-text").classList.add("active_font");
		});
	});


})

// バン誘導モーダル削除
const bg 		= document.querySelector(".bg")
const modal 	= document.querySelector(".js_modal")
const close_btn 	= document.querySelector(".js_close")

bg.addEventListener("click", ()=>{
	bg.classList.add("hidden")
	modal.classList.add("hidden")
})


close_btn.addEventListener("click", ()=>{
	bg.classList.add("hidden")
	modal.classList.add("hidden")
})





// ユーザーチャット画面の表示(ブラウザや端末ごとで変わるので)
document.addEventListener('DOMContentLoaded', () => {
	const element =document.querySelector(".chat__message-main")
	const isSafariIOS = BrowserAndDeviceDetector.isSafari() && BrowserAndDeviceDetector.isIOS();
	const isAndroidFirefox = BrowserAndDeviceDetector.isAndroid() && BrowserAndDeviceDetector.isFirefox();

	if(isAndroidFirefox){
		element.style.height = "73vh"; // 元の高さに戻す
	}else if(isSafariIOS){
		element.style.height = "calc(100vh - 210px)"; // 元の高さに戻す
	
	}else{
		const mediaQuery = window.matchMedia('(min-width: 641px)');
		if(mediaQuery.matches){
			element.style.height = "81vh"; // 元の高さに戻す
		}else{
			element.style.height = "calc(100dvh - 115px)"; // 元の高さに戻す
		}
	}
});

// {
// 	// 画像を拡大する
// // 画像を拡大する
ModalController.open_image_modal()



