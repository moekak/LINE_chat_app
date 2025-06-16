import { API_ENDPOINTS } from "../../../config/apiEndPoints"
import Fetch from "../../util/api/Fetch"
import { createLeftMessageContainer, createRightMessageContainer } from "../templates/elementTemplate"
import ModalController from "../ui/ModalController"
import ChatUIHelper from "./ChatUIHelper"

/**
 * ChatMessageController
 * チャット画面にメッセージを表示するロジックを管理するクラス
 * 
 * このクラスは、受け取ったメッセージ情報を元にチャット画面にメッセージを追加し、
 * 必要に応じて画像の切り取り領域 (cropArea) をオーバーレイ表示する
 * 
 */
class ChatMessageController{
      /**
       * @param {string} messageType - メッセージの種類 (text, image など)
       * @param {object} cropArea - 画像の切り取り領域
       * @param {string} position - メッセージ挿入位置 (afterbegin, beforeend など)
       * @param {string} time - メッセージの送信時刻
       * @param {string} className - 挿入対象の DOM クラス名
       * @param {string} senderType - 送信者のタイプ (admin, user など)
       * @param {string} content - メッセージ内容
       * @param {string} fileName - ファイルの名前
       * @param {string} senderId - 送信者の ID
       */

      constructor({messageType, cropArea, position, time, className, senderType, content, fileName, senderId,type, ids = []}){
                  this.messageType = messageType
                  this.cropArea = cropArea
                  this.position = position
                  this.time = time
                  this.className = className
                  this.senderType = senderType
                  this.content = content
                  this.fileName = fileName
                  this.parentElement = document.querySelector(`.${this.className}`)
                  this.senderId = senderId
                  this.ids = ids
                  this.type = type
      }

      displayChatMessage(id = null){

            if(this.ids.includes(this.parentElement.getAttribute("data-id"))) return 
            const shouldAddRightMessage = this.#isRightAlignedMessage();
            this.#addChatMessage(shouldAddRightMessage, id ?? null);

      }

      /**
       * メッセージを右側または左側に表示するべきかを判定
       * @returns {boolean} - メッセージが右側に表示される場合は true、それ以外は false
       */
      #isRightAlignedMessage() {
            const { senderType, fileName} = this;
            return (
                  (senderType === "admin" && fileName === "admin") ||
                  (senderType === "user" && fileName === "user") 
            );
      }

      /**
       * メッセージを画面に追加する
       * @param {boolean} isRight - メッセージを右側に追加する場合は true、それ以外は false
       */
      #addChatMessage(isRight, id = null) {

            const validPositions = ["afterbegin", "beforeend"];
            const validPosition = validPositions.includes(this.position) ? this.position : "beforeend";
            // メッセージHTMLを生成して挿入
            const messageHTML = isRight ? createRightMessageContainer(this.messageType, this.time, this.content, this.cropArea, this.type, id): createLeftMessageContainer(this.messageType, this.time, this.content, this.cropArea, this.type, id);
            this.parentElement.insertAdjacentHTML(validPosition, messageHTML);

            // this.cropAreaがある場合は処理を適用

            if (this.cropArea && Object.entries(this.cropArea).length > 0) {
                  this.#applyCropArea();
            }
      }

      /**
     * 画像の切り取り領域をオーバーレイ表示
     */
      #applyCropArea() {
            const containers = document.querySelectorAll(".image-container[data-crop]");
            containers.forEach((container) => {
                  // チャット画面に表示した画像を取得
                  const targetImage = container.querySelector(".overlay-target");
                  const overlay = container.querySelector(".overlay");
      
                  targetImage.onload = () => this.#updateOverlayStyles(container, overlay);
            });
      }
      
      /**
     * 切り取り領域に基づいてオーバーレイのスタイルを更新
     * @param {HTMLElement} container - 対象画像のコンテナ
     * @param {HTMLElement} overlay - オーバーレイ要素
     */
      #updateOverlayStyles (container, overlay) {
            const imageRect = container.querySelector(".overlay-target").getBoundingClientRect();
            let cropData = JSON.parse(container.dataset.crop);


            if(typeof(cropData) === "string"){
                  cropData = JSON.parse(cropData)
            }
            
            overlay.style.left = `${(cropData.x_percent / 100) * imageRect.width}px`;
            overlay.style.top = `${(cropData.y_percent / 100) * imageRect.height}px`;
            overlay.style.width = `${(cropData.width_percent / 100) * imageRect.width}px`;
            overlay.style.height = `${(cropData.height_percent / 100) * imageRect.height}px`;

            overlay.style.display = "inline-block";
      }

      static updateChatDisplay(response, userUuid){
            const default_message = document.querySelector(".chat_default-area") ?? null
            const parentElement =  document.querySelector(".js_append_admin");
            parentElement.dataset.id = userUuid
            parentElement.innerHTML = ""
            Object.entries(response).forEach(([index, dateGroup]) => {
                  Object.entries(dateGroup).reverse().forEach(([date, messages]) => {
                        const new_date_el = document.createElement("small");
                        new_date_el.classList.add("chat__message-main-time", "js_chat_message_date");
                        new_date_el.dataset.dateName = date
                        new_date_el.innerHTML = date

                        if (default_message) {
                              parentElement.removeChild(default_message);
                        }

                        messages.slice().reverse().forEach((message) => {
                              const date = new Date(message.created_at);
                              const time = date.toLocaleTimeString("ja-JP", {
                                    timeZone: "Asia/Tokyo",
                                    hour: "2-digit",
                                    minute: "2-digit",
                              });


                              const parsedData = JSON.parse(message.crop_data);
                              // 共通の args を作成
                              let args = {
                                    messageType: message.type,
                                    cropArea :parsedData ? {
                                          x_percent: parsedData.x_percent,
                                          y_percent: parsedData.y_percent,
                                          width_percent: parsedData.width_percent,
                                          height_percent: parsedData.height_percent,
                                          url: message.url
                                    } : [],
                                    position: "afterbegin",
                                    time: time,
                                    className: "js_append_admin",
                                    senderType: message.sender_type,
                                    content: message.content,
                                    fileName: "admin",
                                    senderId: ""
                              };

                              // `ChatMessageController` のインスタンスを作成
                              const chatMessageController = new ChatMessageController(args);
                              
                              chatMessageController.displayChatMessage(message.id, message.type);
                        });

                        parentElement.insertAdjacentElement("afterbegin",new_date_el);
                        if (default_message) {
                              parentElement.insertAdjacentElement("afterbegin", default_message);
                        }

                  });
            });
      }

      static changeChatUser(infiniteScrollInstance){
            const btns = document.querySelectorAll(".js_user_btn")

		btns.forEach((btn)=>{
                  const newBtn = btn.cloneNode(true)
                  btn.replaceWith(newBtn)
			newBtn.addEventListener("click", async (e)=>{
				const userId = e.currentTarget.dataset.id
				const adminId = e.currentTarget.dataset.adminId
				const userUuid = e.currentTarget.dataset.uuid
                        const adminUuid = document.getElementById("js_uuid").value
				const src = e.currentTarget.querySelector(".chat_users-icon").src
				const name = e.currentTarget.querySelector(".simplebar-content").innerHTML
                        try{
                              const response = await Fetch.fetchGetOperation(`${API_ENDPOINTS.GET_USER_CHATS}/${userId}/${adminId}`)
                              const chatLatesetData = await Fetch.fetchGetOperation(`${API_ENDPOINTS.FETCH_LATEST_MESSAGE}/${userId}/${adminId}`)
                              ChatMessageController.updateChatDisplay(response, userUuid)
                              ChatUIHelper.updateUserInfo(userUuid, src, name)
                              ChatMessageController.displayUnreadMessage(chatLatesetData["last_unread_message_id"], chatLatesetData["last_message_type"], chatLatesetData["unread_count"])
                              infiniteScrollInstance.updateElement(userUuid)

                              const data = {
                                    "admin_id": adminUuid,
                                    "chat_user_id": userUuid
                              };

                              if (userUuid == document.getElementById("js_chatuser_id").value) {
                                    const target = newBtn.querySelector(".message_count");

                                    if (target) {
                                          target.style.display = "none";
                                          target.innerHTML = 0
                                    }
                                    Fetch.fetchPostOperation(data, API_ENDPOINTS.USER_MESSAGE_READ);
                              }
                        }catch(e){
                              console.error(e);
                        }
			})
		})
      }


      static displayUnreadMessage(lastMessageId, lastMessageType, unreadCount){
            const messagesElements = document.querySelectorAll(".js_chat_message")
            let hasUnreadMessage = false

            messagesElements.forEach((el)=>{
                  if(el.getAttribute("data-id") == lastMessageId && el.getAttribute("data-type") == lastMessageType && unreadCount > 0){
                        const parentElement = el.parentElement.parentElement

                        const newElement = document.createElement("p")
                        newElement.classList.add("unread_message-description")
                        newElement.innerHTML = "ここから未読メッセージ"

                        parentElement.insertAdjacentElement('beforebegin', newElement);

                        hasUnreadMessage = true
                        setTimeout(() => {
                              const container = document.querySelector('.chat__message-main'); // スクロール対象のコンテナ
                              if (container) {
                                    const containerRect = container.getBoundingClientRect();
                                    const elemRect = newElement.getBoundingClientRect();
                                    const offsetTop = elemRect.top - containerRect.top;
                                    

                                    container.scrollTo({
                                          top: offsetTop - 100,
                                          behavior: 'instant'
                                    });
                              }
                        }, 100);
                  }
            })

            if(!hasUnreadMessage){
                  setTimeout(() => {
                        const scroll_el = document.querySelector(".chat__message-main");
                        if (scroll_el) {
                              // 一番下までスクロール
                              scroll_el.scrollTo({
                                    top: scroll_el.scrollHeight - scroll_el.clientHeight,
                                    behavior: 'instant'  // または 'auto'
                              });
                        }
                  }, 100);
            }
      }
}

export default ChatMessageController;