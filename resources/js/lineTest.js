import config from "./config/config.js";
import ChatMessageController from "./module/component/chat/ChatMessageController.js";
import ChatUIHelper from "./module/component/chat/ChatUIHelper.js";
import ModalController from "./module/component/ui/ModalController.js";
import BrowserAndDeviceDetector from './module/util/BrowserAndDeviceDetector.js';
import SocketService from "./module/util/socket/SocketService.js";

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


// // 画像を拡大する
ModalController.open_image_modal()


// socket通信処理
// グローバル変数
//!! sender_id = ユーザーID!!
const sender_id = document.getElementById("js_user_id").value
// socketServiceの初期化
const socketService = new SocketService(config.SOCKET_URL, sender_id)
// 30秒ごとにハートビートを送信
setInterval(socketService.sendHeartbeat(), 10000);
const socket  = socketService.getSocket()



// サーバーからのメッセージを受信
socket.on('test message',async ( sendingDatatoBackEnd, created_at, userIdsArray) => {
      sendingDatatoBackEnd.forEach((data)=>{
            let args = {
                  messageType: data["type"],
                  position: "beforeend",
                  time: created_at,
                  className: "js_append_user",
                  senderType: "admin",
                  content: data["resource"],
                  fileName: "user",
                  senderId: "",
                  cropArea : 
                        {
                              "url": data["cropArea"]["url"],
                              "width_percent": data["cropArea"]["width_percent"],
                              "height_percent": data["cropArea"]["height_percent"],
                              "x_percent": data["cropArea"]["x_percent"],
                              "y_percent": data["cropArea"]["y_percent"],

                        },
                  url: data["cropArea"]["url"]
            }


            const chatMessageController = new ChatMessageController(args)
            // チャットメッセージを表示
		chatMessageController.displayChatMessage()
            ChatUIHelper.scrollToBottom()
      })
      

});