
import { adjustMesageLength} from './module/component/chatController.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';
import { fileOperation, scrollToBottom } from './module/component/uiController.js';
import { getSocket, initSocket, sendHeartbeat } from './module/util/socketHandler.js';
import { debounce, handleReceivedBroadcastingMessage, handleReceivedMessage, handleSearchInput, prepareMessageData, sendMessage } from './module/util/messageService.js';


document.addEventListener("DOMContentLoaded", ()=>{

	// グローバル変数
	let is_searching  = {flag: false}
	let isON          = {isSoundOn : false}
	const sender_id   = document.getElementById("js_sender_id").value

	// サーバーへの接続を初期化
	initSocket('https://line-chat.tokyo:3000', sender_id)
	// 30秒ごとにハートビートを送信
	setInterval(sendHeartbeat, 10000);
	const socket      = getSocket()


	// 着信音処理
	document.querySelector(".js_bell").addEventListener("click", ()=>{
		isON["isSoundOn"] = confirm("着信音をオンにしますか？") ? true : false
	})


	// クライアントからソケットサーバーへメッセージを送信する
	document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
		e.preventDefault();
		const { msg, formattedMsg, receiver_id, sender_type } = prepareMessageData();
		// メッセージをサーバーに送信する
		sendMessage(socket, formattedMsg, sender_id, receiver_id, sender_type, msg, "/api/admin/messages")
	})


	// サーバーからのメッセージを受信
	socket.on('chat message', (msg, sender_type, actual_sender_id, time, actual_receiver_id, message_id)=> {
		handleReceivedMessage(isON,is_searching, sender_type, actual_sender_id, time, actual_receiver_id, message_id, msg, "text")
		scrollToBottom()
	});

	// サーバーからの画像を受信
	socket.on("send_image", (sender_type, sender_id, time, receiver_id, message_id, resizedImage)=>{
		handleReceivedMessage(isON, is_searching, sender_type, sender_id, time, receiver_id, message_id, resizedImage, "image");
		scrollToBottom()
	})


	socket.on("broadcast message", (sendingDatatoBackEnd, created_at, userUuids, adminUuid, ids)=>{
		handleReceivedBroadcastingMessage(is_searching, adminUuid, created_at, sendingDatatoBackEnd, ids)
		scrollToBottom()
	})

	// 選択してチャットを開くユーザーの切り替えをする
	const chat_btns = document.querySelectorAll(".js_chat_wrapper")
	chat_btns.forEach((btn)=>{
		btn.addEventListener("click", (e)=>{
			let id = e.currentTarget.getAttribute("data-id")
			let admin_id = e.currentTarget.getAttribute("data-admin-id")
			window.location.href = `/${admin_id}/${id}`
		})
	})


	scrollToBottom()
	adjustMesageLength()
	changeTextareaHeight()
	disableSubmitBtn()




	// 画像の処理

	const fileInput = document.getElementById("fileInput")
	fileInput.addEventListener("change", ()=>{
		fileOperation(socket, sender_id, "/api/admin/messages/image","admin")
		fileInput.value = "";
	})


	// チャット画面検索機能
	const message_input = document.querySelector(".js_message_input")
	message_input.addEventListener("input", debounce((e) => {
		let value             = e.target.value
		is_searching["flag"]  = true

		handleSearchInput(is_searching, value, sender_id)
	}, 500)); // 1000ミリ秒（1秒）の間隔を指定
})






// 画像を拡大する
const images = document.querySelectorAll(".chat_image");
const image_modal = document.querySelector(".js_image_modal")
const bg = document.querySelector(".bg")
const close_btn = document.querySelector(".js_close_image_btn")

images.forEach((img)=>{
	img.addEventListener("click", (e)=>{
		let target_img = e.currentTarget.src
		bg.classList.remove("hidden")
		image_modal.classList.remove("hidden")

		document.querySelector(".js_image_src").src = target_img
		
	})
})

bg.addEventListener("click", ()=>{
	bg.classList.add("hidden")
	image_modal.classList.add("hidden")
})
close_btn.addEventListener("click", ()=>{
	bg.classList.add("hidden")
	image_modal.classList.add("hidden")
})