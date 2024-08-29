import io from 'socket.io-client';
import { appendDiv, increateMessageCount, displayMessage, adjustMesageLength } from './module/component/append.js';
import { fetchPostOperation } from './module/util/fetch.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';



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
          console.log("ページがアクティブです。Socket.IO接続を確認または再接続します。");
          checkOrReconnectSocket();
      }
  });
  
  function checkOrReconnectSocket() {
      if (!socket.connected) {
          console.log("Socket.IOは接続されていません。再接続を試みます。");
          socket.connect();
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
      if (reason === 'io server disconnect') {
          // サーバー側で接続が強制切断された場合
          console.log('Disconnected by the server');
      } else {
          // その他の理由で切断された場合
          console.log('Disconnected:', reason);
      }
  });
  

const sender_id = document.getElementById("js_sender_id").value
registerUser(sender_id)
// メッセージをサーバーに送信
function sendMessage(msg, sender_id, receiver_id, sender_type, msg2) {
      socket.emit('chat message', {msg, receiver_id,sender_id, sender_type});
      const data = {
            content:msg2,
            admin_id: sender_id,
            user_id: receiver_id
      }

      fetch("/api/messages", {
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
            console.log(data);
      })
  }


  function registerUser(sender_id){
      socket.emit("register", sender_id)

  }
  
  // サーバーからのメッセージを受信
  socket.on('chat message', function (msg, sender_type, sender_id) {
      console.log({
            "msg" : msg,
            "sender_type": sender_type,
            "sender_id" : sender_id
      });
      appendDiv("js_append_admin", sender_type, msg, "admin", sender_id)
      displayMessage(sender_id, msg)
      increateMessageCount(sender_id, sender_type)
  });


//   formからメッセージを送信する
document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
      console.log("submit!");
      e.preventDefault();
      
      
      document.getElementById('js_msg').style.height = "19px"
      const msg = document.getElementById("js_msg").value
      const formattedMsg = msg.replace(/\n/g, '<br>'); // 改行文字を <br> タグに置き換える
      const receiver_id = document.getElementById("js_receiver_id").value
      const sender_id = document.getElementById("js_sender_id").value
      const sender_type = document.getElementById("js_sender_type").value
      
      document.querySelector(".chat__form-submit").classList.add("disable_btn")


    
      sendMessage(formattedMsg, sender_id, receiver_id, sender_type, msg)
      document.getElementById("js_msg").value = "";
})


adjustMesageLength()
changeTextareaHeight()
disableSubmitBtn()

// 選択してチャットを開くユーザーの切り替えをする

const chat_btns = document.querySelectorAll(".js_chat_wrapper")

chat_btns.forEach((btn)=>{
      btn.addEventListener("click", (e)=>{
            let id = e.currentTarget.getAttribute("data-id")
            let admin_id = e.currentTarget.getAttribute("data-admin-id")
            window.location.href = `/${admin_id}/${id}`
            
      })
})