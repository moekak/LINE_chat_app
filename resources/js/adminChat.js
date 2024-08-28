import io from 'socket.io-client';
import { appendDiv, increateMessageCount, displayMessage, adjustMesageLength } from './module/component/append.js';
import { fetchPostOperation } from './module/util/fetch.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';

const socket = io('https://line-chat.tokyo:3000', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
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