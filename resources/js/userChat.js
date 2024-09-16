import io from 'socket.io-client';
import { displayChatMessage } from './module/component/chatController.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';
import { fileOperation } from './module/component/uiController.js';


// Socket.IOサーバーへの接続を設定
let socket = io('https://line-chat.tokyo:3000', {
      reconnection: true,         // 自動再接続を有効にする
      reconnectionDelay: 1000,    // 再接続の遅延時間 (ミリ秒)
      reconnectionDelayMax : 5000, // 再接続の最大遅延時間 (ミリ秒)
      reconnectionAttempts: Infinity // 再接続の試行回数 (無限に設定)
  });



// ページの可視性が変更されたときのイベントリスナー
document.addEventListener("visibilitychange", function() {
      if (document.visibilityState === 'visible') {
            // alert("ページがアクティブです。Socket.IO接続を確認または再接続します。")
            // console.log("ページがアクティブです。Socket.IO接続を確認または再接続します。");
            checkOrReconnectSocket();
      }
  });
  
  function checkOrReconnectSocket() {
    // alert(`Socket.IOの現在の接続状態:",${socket.connected} `);
   
      if (!socket.connected) {
            // alert("Socket.IOは接続されていません。再接続を試みます。")
            // alert(sender_id)
            registerUser()
          // console.log("Socket.IOは接続されていません。再接続を試みます。");
          socket.connect();
      }else{
        registerUser()
      }
  }
    

  // 再接続試行イベント
socket.on('reconnect_attempt', () => {
      console.log('Attempting to reconnect');
  });
  
  // 再接続エラーイベント
  socket.on('reconnect_error', (error) => {
      console.log('Reconnection failed:', error);
  });
  
  // サーバーから切断されたときのイベント
  socket.on('disconnect', (reason) => {
    // alert(`Disconnected from the server due to ${reason}`);
    // ここで接続状態を更新
    // 再接続を試みる
    socket.connect();
    registerUser()
});

socket.on('userDisconnected', (data) => {
    // alert(`User ${data.userId} disconnected due to ${data.reason}`);
    if (data.userId === socket.id) {
        // 自分自身の切断処理
        // alert('This is me, updating my connection status.');
    }
});

const uuid = document.getElementById("js_uuid").value
const sender_id = document.getElementById("js_sender_id").value
registerUser()
// メッセージをサーバーに送信
function sendMessage(msg, sender_id, receiver_id, sender_type, msg2) {
      const data = {
            content:msg2,
            user_id: sender_id,
            admin_id: receiver_id,

      }

      console.log(data);
      
      
      
      fetch("/api/user/messages", {
            method: "POST",
            headers: {
                  'Content-Type': 'application/json',// リクエストボディが JSON フォーマットであることを示す
                  'Accept': 'application/json'// レスポンスが JSON フォーマットであることを期待する
            },
            body: JSON.stringify(data)
      })
      .then((response)=>{
        console.log(response);
            if (!response.ok) {
                  return response.json().then(errorData => {
                      throw new Error(errorData.error || 'An unknown error occurred');
                  });
              }
              //return response.json(): 成功した場合（response.ok が true）、レスポンスボディを JSON として解析し、その結果を次の then チェーンに渡す
              return response.json();
      })
      .then((data)=>{
        
        

            const time = data["created_at"]
            const message_id = data["message_id"]
            const admin_login_id = data["admin_login_id"]
    
            
            socket.emit('chat message', {msg, receiver_id, sender_id,sender_type, time, message_id, admin_login_id});

      })
  }


  function registerUser(){
      const uuid = document.getElementById("js_uuid").value
     socket.emit("register", uuid)
 }
  // サーバーからのメッセージを受信
  socket.on('chat message', function (msg, sender_type, sender_id, time) {
      displayChatMessage("js_append_user", sender_type, msg, "user", "", time, "text")
  });


  socket.on("send_image", (sender_type, sender_id, time, receiver_id, message_id, resizedImage)=>{
    console.log(sender_type, sender_id, time, receiver_id, message_id, resizedImage);
    
    displayChatMessage("js_append_user", sender_type, resizedImage, "user", "", time, "image")
      
  })


//   formからメッセージを送信する
document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
      e.preventDefault();
      document.getElementById('js_msg').style.height = "19px"
      const msg = document.getElementById("js_msg").value
      const formattedMsg = msg.replace(/\n/g, '<br>');
      const receiver_id = document.getElementById("js_receiver_id").value
      const sender_type = document.getElementById("js_sender_type").value

      
      document.querySelector(".chat__form-submit").classList.add("disable_btn")

      sendMessage(formattedMsg, sender_id, receiver_id, sender_type, msg)
      document.getElementById("js_msg").value = "";
})



changeTextareaHeight()
disableSubmitBtn()




// チャットを開いたときに一番下までスクロールさせる
// チャットを開いたときに一番下までスクロールさせる
document.addEventListener("DOMContentLoaded", ()=>{
  const scroll_el = document.querySelector(".chat__message-main")

console.log(scroll_el);

scroll_el.scrollTop = scroll_el.scrollHeight
})



// ハートビートを送信する関数
function sendHeartbeat() {
    console.log('Sending heartbeat');
    socket.emit('heartbeat');
}

// 30秒ごとにハートビートを送信
setInterval(sendHeartbeat, 10000);

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

