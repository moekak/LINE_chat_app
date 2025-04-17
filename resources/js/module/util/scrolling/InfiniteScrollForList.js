import ChatUIHelper from "../../component/chat/ChatUIHelper"
import { createChatUserContainer } from "../../component/templates/elementTemplate"
import Fetch from "../api/Fetch"
import userStateManager from "../state/UserStateManager"
const MESSAGES_PER_PAGE = 20

class InfiniteScrollForList{
      constructor(element, adminId){
            this.element = element
            this.hasNoValue = false
            this.isFetchFlag = false
            this.dataCount = 20
            this.new_date_el = null
            this.parentElement = null
            this.hasDate = false
            this.adminId = adminId
            this.loader = document.querySelector(".js_loader")
            this.userList = userStateManager.getState()
            // コンストラクタで定義された this を使用するメソッドをイベントリスナーやコールバックとして使用する場合、bind(this) が必要
            this.element.addEventListener("scroll", this.handleScroll.bind(this))
      }


      async handleScroll(){
            if(!this.hasNoValue && !this.isFetchFlag){
                  
                  const {scrollTop, scrollHeight, clientHeight} = this.element
                  // 一番下までスクロールしたかを判定
                  if (scrollTop + clientHeight + 50 >= scrollHeight) {

                        this.loader.classList.remove("hidden")
                        this.isFetchFlag = true

                        const url = `/api/users/list`

                        const data ={
                              "adminId": this.adminId,
                              "dataCount" : this.dataCount,
                              "userList" : this.userList
                        }
                        try {
                              const response = await Fetch.fetchPostOperation(data, url);

                              if(response.length === 0){
                                    this.hasNoValue = true
                              }

                              this.loader.classList.add("hidden")
                              response.forEach((res)=>{
                                    const parentEl = document.querySelector(".chat__users-list-container")
                                    if(res["latest_all_message"] !== null){
                                          parentEl.insertAdjacentHTML("beforeend",createChatUserContainer(res["entity_uuid"], res)); 
                                    }
                                    
                              })


                              const elements = document.querySelectorAll(".js_chatMessage_elment");
                              elements.forEach((element) => {
                                    element.innerHTML = ChatUIHelper.adjustMesageLength(element.innerHTML)
                              });

                        } catch (error) {
                              console.error("Failed to fetch data:", error);
                        } finally {
                              this.isFetchFlag = false;
                              this.dataCount = this.dataCount + MESSAGES_PER_PAGE
                        }
                  }
            }
      }
}

export default InfiniteScrollForList; // ESモジュール形式でエクスポート