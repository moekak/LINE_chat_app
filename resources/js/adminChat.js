import io from 'socket.io-client';
import { appendDiv, increateMessageCount, displayMessage, adjustMesageLength, updateMessageTime, updateUserDataElement, createDivForSearch } from './module/component/append.js';
import { fetchGetOperation, fetchPostOperation } from './module/util/fetch.js';
import { changeTextareaHeight, disableSubmitBtn } from './module/component/changeStyle.js';
import { chatNavigator, fileOperation } from './module/component/uiController.js';
import { createDiv } from './module/component/createDiv.js';



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
        console.log("Socket.IOの現在の接続状態:", socket.connected);
        const sender_id = document.getElementById("js_sender_id").value
      if (!socket.connected) {
          console.log("Socket.IOは接続されていません。再接続を試みます。");
          console.log(sender_id + "sender_id, reconnecting websocket")
          registerUser(sender_id)
          socket.connect();
      }else{
        registerUser(sender_id)
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
      const data = {
            content:msg2,
            admin_id: sender_id,
            user_id: receiver_id
      }

      fetch("/api/admin/messages", {
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
        socket.emit('chat message', {msg, receiver_id, sender_id,sender_type, time, message_id});
      })
  }


  function registerUser(sender_id){
      socket.emit("register", sender_id)

  }

  
  // サーバーからのメッセージを受信
  socket.on('chat message', function (msg, sender_type, sender_id, time, receiver_id, message_id) {
      appendDiv("js_append_admin", sender_type, msg, "admin", sender_id, time, "text")
      updateMessageTime(time, sender_id, sender_type, receiver_id)

      if(sender_type == "user"){
        updateUserDataElement(receiver_id, msg, sender_id, "text", sender_type, is_searching)
      }
      
      
      displayMessage(sender_id, msg, sender_type, receiver_id, "text")
      increateMessageCount(sender_id, sender_type)

      const data = {
        "message_id": message_id,
        "admin_id": receiver_id,
        "chat_user_id": sender_id
      }


      if(sender_id == document.getElementById("js_chatuser_id").value){
        fetchPostOperation(data, "/api/user/messages/read")
      }
      

  });

  socket.on("send_image", (sender_type, sender_id, time, receiver_id, message_id, resizedImage)=>{
    appendDiv("js_append_admin", sender_type, resizedImage, "admin", sender_id, time, "image")
    updateMessageTime(time, sender_id, sender_type, receiver_id)
    displayMessage(sender_id, "", sender_type, receiver_id, "image")
    increateMessageCount(sender_id, sender_type)
    updateUserDataElement(receiver_id, resizedImage, sender_id, "image", sender_type, is_searching)

    
    const data = {
      "message_id": message_id,
      "admin_id": receiver_id,
      "chat_user_id": sender_id
    }


    if(sender_id == document.getElementById("js_chatuser_id").value){
      fetchPostOperation(data, "/api/user/messages/read")
    }
      
  })

//   formからメッセージを送信する
document.getElementById("js_chat_form").addEventListener("submit", (e)=>{

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
const user_type= "admin"
fileOperation(socket, sender_id, "/api/admin/messages/image", user_type)


// debounce関数を作成
const debounce =(func, delay) =>{
  let timer;
  return function(...args) {
    clearTimeout(timer); // 前のタイマーをクリア
    timer = setTimeout(() => {
      func.apply(this, args); // 一定時間後に関数を実行
    }, delay);
  };
}

// チャット画面検索機能

const message_input = document.querySelector(".js_message_input")

let is_searching ={
  flag: false
}

message_input.addEventListener("input", debounce((e) => {
  let value = e.target.value
  is_searching["flag"] = true

  const data = {
    admin_id : sender_id,
    text: value
  }

  if(value.length > 0){
    createDivForSearch(data, sender_id)
  }else{
    is_searching["flag"] = false

    let admin_id = sender_id
    fetchGetOperation(`/api/users/messages/lineAccounts/${admin_id}`)
    .then((res)=>{
      
      // なぜかフロント側だと最新順ではなくなってしまうため
        // Object.entriesでオブジェクトを配列に変換し、sortでcreated_atの降順にソート
      const sortedData = Object.entries(res["mergedData"]).sort(([, a], [, b]) => {
        return new Date(b.message.created_at) - new Date(a.message.created_at);
      });
      let chat_wrapper = document.getElementById("js_chatUser_wrapper");
      chat_wrapper.innerHTML = ""

      // ソートされたデータを処理
      sortedData.reverse().forEach(([key, value]) => {
        let message_type;
        if(value["message"]["content"]){
            message_type = "text"
        }else{
            message_type = "image"
        }
        const parentNewDiv = document.createElement("div");
        parentNewDiv.classList.add("chat__users-list-wraper");
        parentNewDiv.classList.add("js_chat_wrapper");
        parentNewDiv.setAttribute("data-id", value["user_info"]["id"]);
        parentNewDiv.setAttribute("data-admin-id", sender_id);
        parentNewDiv.style.marginTop = "0";
        

        let firstChild = chat_wrapper.firstChild;

         const newDiv = createDiv(parentNewDiv, value["user_info"]["user_picture"], value["user_info"]["line_name"], value["user_info"]["id"], value["message"]["content"], message_type, value["count"], value["formatted_time"]) 

        
         if(firstChild == undefined){
            chat_wrapper.appendChild(newDiv)
         }else{
            chat_wrapper.insertBefore(newDiv, firstChild);
         }
      });
  
        chatNavigator();
    })
  }
  
  
}, 500)); // 1000ミリ秒（1秒）の間隔を指定