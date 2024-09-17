import { displayChatMessage } from './module/component/chatController.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';
import { fileOperation, scrollToBottom } from './module/component/uiController.js';


document.addEventListener("DOMContentLoaded", ()=>{
  // グローバル変数
  const sender_id = document.getElementById("js_sender_id").value

  // サーバーへの接続を初期化
  initSocket('https://line-chat.tokyo:3000', sender_id)
  // ユーザーをソケットサーバーに登録する
  registerUser(sender_id)
  // 30秒ごとにハートビートを送信
  setInterval(sendHeartbeat, 10000);
  const socket      = getSocket()

  changeTextareaHeight()
  disableSubmitBtn()
  scrollToBottom()


  // クライアントからソケットサーバーへメッセージを送信する
  document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
    e.preventDefault();
    const { msg, formattedMsg, receiver_id, sender_type } = prepareMessageData();
    // メッセージをサーバーに送信する
    sendMessage(formattedMsg, sender_id, receiver_id, sender_type, msg, "/api/user/messages")
  })


  // サーバーからのメッセージを受信
  socket.on('chat message',(msg, sender_type, time) => {
      displayChatMessage("js_append_user", sender_type, msg, "user", "", time, "text")
  });


  socket.on("send_image", (sender_type, time, resizedImage)=>{
    displayChatMessage("js_append_user", sender_type, resizedImage, "user", "", time, "image")
  })


  // 画像の処理
  const user_type= "user"
  const fileInput = document.getElementById("fileInput")
  fileInput.addEventListener("change", ()=>{
    fileOperation(socket, sender_id, "/api/user/messages/image", user_type)
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


















