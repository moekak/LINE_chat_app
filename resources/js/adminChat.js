

import { debounce, handleReceivedBroadcastingMessage, handleReceivedMessage, handleSearchInput, prepareMessageData, sendMessage } from './module/util/messaging/messageService.js';
import config from './config/config.js';
import SocketService from './module/util/socket/SocketService.js';
import InfiniteScroll from './module/util/scrolling/InfiniteScroll.js';
import InfiniteScrollForList from './module/util/scrolling/InfiniteScrollForList.js';
import ChatUIHelper from './module/component/chat/ChatUIHelper.js';
import FromController from './module/component/ui/FormController.js';
import ModalController from './module/component/ui/ModalController.js';
import { handleImageProcessingFlow } from './module/util/fileOperation/imageFileOperator.js';
import MessageEditor from './module/util/bulk-messaging/util/MessageEditor.js';
import MessageFormController from './module/util/bulk-messaging/component/forms/MessageFormController.js';
import UpdateTemplateView from './module/component/messageTemplates/UpdateTemplateView.js';
import MessageTemplate from './module/component/messageTemplates/MessageTemplate.js';
import Fetch from './module/util/api/Fetch.js';
import { API_ENDPOINTS } from './config/apiEndPoints.js';
import InitializeTemplate from './module/component/messageTemplates/InitializeTemplate.js';
import FormatText from './module/util/FormatText.js';
import { isON } from './dataManager.js';


document.addEventListener("DOMContentLoaded", ()=>{


	
	// チャット表示の無限スクロール

	const element = document.querySelector(".chat__message-main")
	const adminUuid = document.getElementById("js_sender_id").value 
	const userUuid = document.getElementById("js_receiver_id").value
	const infiniteScrollInstance = new InfiniteScroll(element, adminUuid, userUuid, "admin", true)

	FromController.changeTextareaHeight()
	FromController.disableSubmitBtn()
	ModalController.close_modal()
	ModalController.close_management_modal()
	// // 画像を拡大する
	ModalController.open_image_modal(true)
	ModalController.close_image_by_key()

	// グローバル変数
	let is_searching  = {flag: false}
	const sender_id   = document.getElementById("js_sender_id").value

	const socketService = new SocketService(config.SOCKET_URL, sender_id)

	// 30秒ごとにハートビートを送信
	setInterval(socketService.sendHeartbeat(), 10000);
	const socket  = socketService.getSocket()


	// 着信音処理
	// document.querySelector(".js_bell").addEventListener("click", function(){

	// 	if(this.classList.contains("on")){
	// 		isON["isSoundOn"] = confirm("着信音をオフにしますか？") ? false : true
	// 	}else{
	// 		isON["isSoundOn"] = confirm("着信音をオンにしますか？") ? true : false
	// 	}
	// 	this.classList.toggle("on")

		
		
	// })


	// メッセージテンプレート機能のモーダルを表示
	const messageSettingBtn = document.getElementById("js_template_btn")
	const messageSettingModal = document.getElementById("js_messageSetting_modal")
	messageSettingBtn.addEventListener("click", ()=>{
		const messageFormController = new MessageFormController()
		
		//テキストエリアを空にする
		messageFormController.clearTextarea()
		ModalController.open_management_modal(messageSettingModal)

		const messageEditor = new MessageEditor(socket)
		messageEditor.submitMessages()
	})



	// メッセージテンプレート選択
	{
		const selectBtn = document.getElementById("js_select_btn")
		selectBtn.addEventListener("click", ()=>{
			InitializeTemplate.initialize()
			document.querySelector(".bg").classList.remove("hidden")
			document.querySelector(".message-template-container").classList.remove("hidden")
		})
	}


	// クライアントからソケットサーバーへメッセージを送信する
	document.querySelector(".chat__form-submit").addEventListener("click", (e)=>{
		e.preventDefault();
		sendMessageToServer()

	})

	// クライアントからソケットサーバーへメッセージを送信する(Enter + shift)
	document.getElementById("js_msg").addEventListener('keydown', function(e) {
		if (e.key === 'Enter' && e.shiftKey) {
			e.preventDefault(); // 改行を防止
			sendMessageToServer();
		}
	});

	const sendMessageToServer = () =>{
		const { msg, formattedMsg, receiver_id, sender_type } = prepareMessageData();
		// メッセージをサーバーに送信する
		sendMessage(socket, formattedMsg, sender_id, receiver_id, sender_type, msg, "/api/admin/messages")
	}


	// サーバーからのメッセージを受信
	socket.on('chat message', async (msg, sender_type, actual_sender_id, time, actual_receiver_id)=> {

		await handleReceivedMessage(isON,is_searching, sender_type, actual_sender_id, time, actual_receiver_id, msg, "text")
		if(ChatUIHelper.isCurrentUser(actual_sender_id) || ChatUIHelper.isCurrentAmdin(actual_sender_id, actual_receiver_id)){
			ChatUIHelper.scrollToBottom()
		}
		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();
		
	});

	// サーバーからの画像を受信
	socket.on("send_image", async (sender_type, sender_id, time, receiver_id, resizedImage, cropArea)=>{
		ModalController.close_loader()
		ModalController.open_image_modal(true)
		ModalController.close_image_by_key()
		await handleReceivedMessage(isON, is_searching, sender_type, sender_id, time, receiver_id,  resizedImage, "image", cropArea);
		if(ChatUIHelper.isCurrentUser(sender_id) || ChatUIHelper.isCurrentAmdin(sender_id, receiver_id)){
			ChatUIHelper.scrollToBottom()
		}

		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();
	})

	socket.on('send_messages', async (res) => {
		ModalController.close_loader()
		ModalController.open_image_modal(true)
		ModalController.close_image_by_key()

		res["data"].forEach(async (data)=>{
			if(data["type"] === "text"){
				await handleReceivedMessage(isON, is_searching, "admin", data["adminUuid"], data["created_at"], data["userUuid"], data["resource"], "text")
			}else if(data["type"] === "image"){
				await handleReceivedMessage(isON, is_searching, "admin", data["adminUuid"], data["created_at"], data["userUuid"],  data["resource"], "image", data["cropArea"]);
			}
			
		})

		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();

		if(ChatUIHelper.isCurrentUser(res["adminUuid"]) || ChatUIHelper.isCurrentAmdin(res["adminUuid"], res["userUuid"])){
			ChatUIHelper.scrollToBottom()
		}

	});


	socket.on("broadcast message", async (sendingDatatoBackEnd, created_at, userUuids, adminUuid,ids)=>{
		handleReceivedBroadcastingMessage(adminUuid, created_at, sendingDatatoBackEnd, ids)
		ChatUIHelper.scrollToBottom()

		// InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
		await infiniteScrollInstance.updateMessageCount();
	})


	const elements = document.querySelectorAll(".js_chatMessage_elment");
	elements.forEach((element) => {
		element.innerHTML = ChatUIHelper.adjustMesageLength(element.innerHTML)
	});

	// 画像の処理

	const fileInput = document.getElementById("fileInput")
	fileInput.addEventListener("change", async()=>{
		document.querySelector(".js_image_error").classList.add("hidden")
		FromController.resetCropperUIElements()
		await handleImageProcessingFlow(socket, sender_id, "/api/admin/messages/image","admin", fileInput.files[0])
		fileInput.value = "";
	})


	// チャット画面検索機能
	const message_input = document.querySelector(".js_message_input")
	message_input.addEventListener("input", debounce(async (e) => {
		let value = e.target.value;
		is_searching["flag"] = true;

		await handleSearchInput(is_searching, value, sender_id);
	  }, 500)); // 500ミリ秒の間隔を指定


		// チャットユーザーリストの無限スクロール
	{
		const element = document.querySelector(".chat__users-list-area")
		const adminId = document.getElementById("js_admin_id").value
		new InfiniteScrollForList(element, adminId)
	}

	{
		new MessageTemplate()
		const updateTemplateView = UpdateTemplateView.getInstance();

		const form = document.getElementById("template_form")
		form.addEventListener("submit", async(e)=>{
			e.preventDefault()
			document.querySelector(".loader").classList.remove("hidden")
			document.querySelector(".message-template-container").classList.add("hidden")
			updateTemplateView.resetIndex()

			// 入力欄の前後の空白を削除
			const inputs = form.querySelectorAll("input, textarea");
			inputs.forEach((el) => {
				
				if (el.value) el.value = el.value.trim();
			});

			const formData = new FormData(form)
			const textareas = document.querySelectorAll(".template_textarea")
			let hasValue = true

			textareas.forEach((textarea)=>{
				if(textarea.value.trim().length <= 0){
					hasValue = false
				}
			})

			if(!hasValue){
				alert("テンプレートメッセージは空白にできません。")
				document.querySelector(".loader").classList.add("hidden")
				document.querySelector(".message-template-container").classList.remove("hidden")
				return
			}

			const response = await fetch(API_ENDPOINTS.TEMPLATE_SELECT, {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				throw new Error("サーバーからエラー応答が返されました。");
			}

			const res = await response.json();
			socket.emit("send_messages", {
					data: res["data"],
					adminUuid: res["data"][0]["adminUuid"],
					userUuid: res["data"][0]["userUuid"],
			});
			
		})
	}
})



