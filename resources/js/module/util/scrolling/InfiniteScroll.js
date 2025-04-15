import ChatMessageController from "../../component/chat/ChatMessageController";
import ModalController from "../../component/ui/ModalController";
import Fetch from "../api/Fetch";
const MESSAGES_PER_PAGE = 20;


class InfiniteScroll {
      constructor(element, adminUuid, userUuid, fileType, isAdmin = false) {
            
            this.element = element;
            this.hasNoValue = false;
            this.isFetchFlag = false;
            this.dataCount = document.querySelectorAll(".js_chat_message").length;
            this.new_date_el = null;
            this.parentElement = null;
            this.hasDate = false;
            this.adminUuid = adminUuid;
            this.userUuid = userUuid;
            this.fileType = fileType;
            this.default_message = document.querySelector(".chat_default-area") ?? null;
            this.scrollEndTid = null; // デバウンス用
            this.isAdmin = isAdmin

            // スクロールイベントリスナーを登録
            this.element.addEventListener("scroll", this.onScroll.bind(this));
            this.element.addEventListener("touchmove", this.onScroll.bind(this)); // iOS Safari用
      }


      //メッセージカウントを更新
      async updateMessageCount() {
            this.dataCount = document.querySelectorAll(".js_chat_message").length;
      }

      async handleScroll() {
            if (this.hasNoValue || this.isFetchFlag) return;

            // スクロール位置の取得
            const scrollThreshold = 20; // スクロール位置の閾値
            const beforeUpdatingScrollTop = this.element.scrollTop;

            // スクロール位置が先頭に近い場合データをロード
            if (beforeUpdatingScrollTop <= scrollThreshold) {
                  this.isFetchFlag = true;

                  // スクロール補正のための初期高さを非同期で取得
                  const oldScrollHeight = this.element.scrollHeight;

                  // this.dataCount = document.querySelectorAll(".js_chat_message").length;

                  const url = `/api/users/messages/fetch/${this.dataCount}/${this.userUuid}/${this.adminUuid}`;
                  try {
                        const response = await Fetch.fetchGetOperation(url);


                        if (response.length === 0) {
                              this.hasNoValue = true;
                              return;
                        }

                        const dates_elements = document.querySelectorAll(".js_chat_message_date");
                        Object.entries(response).forEach(([index, dateGroup]) => {
                              Object.entries(dateGroup).reverse().forEach(([date, messages]) => {
                                    this.parentElement = this.fileType === "user" ? document.querySelector(".js_append_user") : document.querySelector(".js_append_admin");
                                    this.new_date_el = dates_elements[0].cloneNode(true);
                                    this.new_date_el.innerHTML = date;
                                    this.new_date_el.setAttribute("data-date-name", date);

                                    if (this.default_message) {
                                          this.parentElement.removeChild(this.default_message);
                                    }

                                    const existingDateElement = Array.from(dates_elements).find((el) => el.getAttribute("data-date-name") === date);

                                    if (existingDateElement) {
                                          this.parentElement.removeChild(existingDateElement);
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
                                                className: this.fileType === "user" ? "js_append_user" : "js_append_admin",
                                                senderType: message.sender_type,
                                                content: message.content,
                                                fileName: this.fileType,
                                                senderId: this.fileType === "user" ? "" : this.userUuid
                                          };

                                          // `ChatMessageController` のインスタンスを作成
                                          const chatMessageController = new ChatMessageController(args);
                                          
                                          // チャットメッセージを表示
                                          chatMessageController.displayChatMessage();
                                    });

                                    this.parentElement.insertAdjacentElement("afterbegin", this.new_date_el);
                                    if (this.default_message) {
                                          this.parentElement.insertAdjacentElement("afterbegin", this.default_message);
                                    }
                  
                              });
                        });
                        // // 画像を拡大する
                        ModalController.open_image_modal(this.isAdmin)
                        if(this.isAdmin){
                              ModalController.close_image_by_key()  
                        }
                        
                        

                        // スクロール位置の補正
                        requestAnimationFrame(() => {
                              const newScrollHeight = this.element.scrollHeight;
                              this.element.scrollTop = newScrollHeight - oldScrollHeight;
                        });

                  } catch (error) {
                        console.error("Failed to fetch data:", error);
                  } finally {
                        this.isFetchFlag = false;
                        this.dataCount += MESSAGES_PER_PAGE;
                  }
            }
      }

      onScroll() {
            if (this.isFetchFlag) return;
            clearTimeout(this.scrollEndTid);
            this.scrollEndTid = setTimeout(() => {
                  this.handleScroll();
            }, 200); // デバウンス時間を調整
      }
}

export default InfiniteScroll; // ESモジュール形式でエクスポート
