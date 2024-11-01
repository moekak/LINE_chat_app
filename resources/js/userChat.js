import { displayChatMessage } from './module/component/chatController.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';
import { fileOperation, scrollToBottom } from './module/component/uiController.js';
import { getSocket, initSocket, sendHeartbeat } from './module/util/socketHandler.js';
import { prepareMessageData, sendMessage } from './module/util/messageService.js';

document.addEventListener("DOMContentLoaded", ()=>{
	scrollToBottom()
	// グローバル変数
	//!! sender_id = ユーザーID!!
	const sender_id = document.getElementById("js_sender_id").value

	// サーバーへの接続を初期化
	initSocket('https://line-chat.tokyo:3000', sender_id)
	// 30秒ごとにハートビートを送信
	setInterval(sendHeartbeat, 10000);
	const socket      = getSocket()

	changeTextareaHeight()
	disableSubmitBtn()
	
	// クライアントからソケットサーバーへメッセージを送信する
	document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
		e.preventDefault();
		
		const { msg, formattedMsg, receiver_id, sender_type } = prepareMessageData();
		// メッセージをサーバーに送信する
		sendMessage(socket, formattedMsg, receiver_id, sender_id, sender_type, msg, "/api/user/messages")
	})

	// サーバーからのメッセージを受信
	socket.on('chat message',( msg, sender_type, actual_sender_id, time, actual_receiver_id, message_id) => {
		displayChatMessage("js_append_user", sender_type, msg, "user", "", time, "text")
		document.querySelector(".chat__form-submit").classList.add("disable_btn");
		scrollToBottom()
	});

	socket.on("send_image", (sender_type, sender_id, time, receiver_id, message_id, resizedImage)=>{
		displayChatMessage("js_append_user", sender_type, resizedImage, "user", "", time, "image")
		scrollToBottom()
	})

	socket.on("broadcast message", (sendingDatatoBackEnd, created_at, userUuids, adminUuid )=>{
		for(let data in sendingDatatoBackEnd){
			let content = sendingDatatoBackEnd[data]["data"];
			let type = sendingDatatoBackEnd[data]["type"]
			displayChatMessage("js_append_user", "admin", content, "user", "", created_at, type)
		}
		scrollToBottom()
	})

	// 画像の処理
	const fileInput = document.getElementById("fileInput")
	fileInput.addEventListener("change", ()=>{
		fileOperation(socket, sender_id, "/api/user/messages/image", "user")
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

	const isIOS = (
		/iPad|iPhone|iPod/.test(navigator.userAgent) ||
		(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
	) && !window.MSStream;
	
	const isSafari = /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) && !navigator.userAgent.includes('Chrome');
	const isIOSSafari = isIOS && isSafari;

	// サファリかつIOSだった場合
	if(isIOSSafari){
		element.style.height = "calc(100vh - 210px)"; // 元の高さに戻す
		// header.style.position = "absolute"
		// header.style.top = "0px"
		// input.addEventListener("focusin", ()=>{
		// 	element.style.height = "calc(100vh - 210px)"
		// })
	
		// input.addEventListener("focusout", () => {
		// 	element.style.height = "calc(100vh - 210px)"; // 元の高さに戻す
		// 	header.style.position = "fixed"
		// 	header.style.top = "0px"
		// });
	
	}else{
		const mediaQuery = window.matchMedia('(min-width: 641px)');
		if(mediaQuery.matches){
			element.style.height = "81vh"; // 元の高さに戻す
		}else{
			element.style.height = "calc(100dvh - 115px)"; // 元の高さに戻す
		}
		
		// input.addEventListener("focusin", ()=>{
		// 	element.style.height = "calc(100dvh - 115px)"
		// })
	
		// input.addEventListener("focusout", () => {
		// 	element.style.height = "calc(100dvh - 115px)"; // 元の高さに戻す
		// });
	
	}
});

{
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
}

