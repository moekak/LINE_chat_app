import io from 'socket.io-client';


const socket = io('https://line-chat.tokyo:3000');
const sender_id = document.getElementById("js_sender_id").value
registerUser(sender_id)
// メッセージをサーバーに送信
function sendMessage(msg, receiver_id) {
      socket.emit('chat message', {msg, receiver_id});
      // const data = {
      //       content:msg,
      //       admin_id: admin_id,
      //       user_id: user_id
      // }
      // fetch(`/api/messages`, {
      //       method: "POST",
      //       headers: {
      //             'Content-Type': 'application/json',// リクエストボディが JSON フォーマットであることを示す
      //             'Accept': 'application/json'// レスポンスが JSON フォーマットであることを期待する
      //       },
      //       body: JSON.stringify(data)
      // })
      // .then((response)=>{
      //       if (!response.ok) {
      //             return response.json().then(errorData => {
      //                 throw new Error(errorData.error || 'An unknown error occurred');
      //             });
      //         }
      //         //return response.json(): 成功した場合（response.ok が true）、レスポンスボディを JSON として解析し、その結果を次の then チェーンに渡す
      //         return response.json();
      // })
      // .then((data)=>{
      //       console.log(data);
      // })
  }


  function registerUser(sender_id){
      socket.emit("register", sender_id)
  }
  
  // サーバーからのメッセージを受信
  socket.on('chat message', function (msg) {
      console.log(msg);
  });


//   formからメッセージを送信する
document.getElementById("js_chat_form").addEventListener("submit", (e)=>{
      e.preventDefault();
      const msg = document.getElementById("js_msg").value
      const receiver_id = document.getElementById("js_receiver_id").value

    
      sendMessage(msg, receiver_id)
      document.getElementById("js_msg").value = "";
})