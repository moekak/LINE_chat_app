
import Fetch from "../../util/api/Fetch";
import userStateManager from "../../util/state/UserStateManager";
import { createChatUserContainer } from "../templates/elementTemplate";
import ChatUIHelper from "./ChatUIHelper";

//チャットユーザーリストの管理ロジック
class ChatUserListController{
    /**
     * @param {string} senderId - メッセージ送信者のuuid(例：00bd10de-18dc-4d00-be56-02e5d12b03b2)
     * @param {string} receiverId - メッセージ受信者のuuid(例：219f5d1a-c9e2-48c4-8a0b-59f5fe971b9a)
     * @param {string} senderType - メッセージ送信者のタイプ (admin, user)
     * @param {boolean} isSearching - 検索中かをtrue false
     * @param {string} content - メッセージ内容
     * @param {string} messageType - メッセージタイプ(text, imageなど)
     * @param {string} time - メッセージ送信日
    */

    constructor({senderId, receiverId, senderType, isSearching, content, messageType, time}){
        this.senderId = senderId
        this.receiverId = receiverId
        this.senderType = senderType
        this.isSearching = isSearching
        this.content = content
        this.messageType = messageType
        this.time = time
    }

    /**
     * メッセージを受信したら未読数をカウントアップさせる処理
     * 条件:
     *  - メッセージ送信してきたユーザーのチャットを開いている場合は除外
     *  - ブロックされているユーザーは除外
     */
    increaseMessageCount(){
        const count_elements    = document.querySelectorAll(".js_mesage_count");
        const chat_user_id      = document.getElementById("js_chatuser_id").value;

        count_elements.forEach((count) => {
            let id = count.getAttribute("data-id");

            // 未読カウントを増加させる条件:
            // - メッセージ送信者と一致する
            // - 現在開いているチャットユーザーとは異なる
            if (id == this.senderId && id !== chat_user_id) {
                let currentCount = Number(count.innerHTML) || 0;
                if (currentCount == 0) count.style.display = "flex"; // 初回表示
                count.innerHTML = `${currentCount + 1}`;
            }
        }); 
    };

    /**
     * チャットユーザーリストを更新する処理
     * 条件:
     *  - メッセージ送信してきたユーザーのチャットを開いている場合は除外
     *  - ブロックされているユーザーは除外
     */
    async updateChatUserList(){

        const wrappers      = document.querySelectorAll(".js_chat_wrapper");
        const chatWrapper   = document.getElementById("js_chatUser_wrapper");
        const currentChatUserId = document.getElementById("js_chatuser_id")?.value; // DOM 要素が見つからない場合は undefined を返す

        // 現在開いているチャットユーザーと一致する場合、または検索中の場合は処理を終了
        if (currentChatUserId === this.senderId || this.isSearching.flag) return;

        const chatUserId = this.senderType === "admin" ? this.receiverId : this.senderId;
        // 既存のリストから送信者のリストを検索
        const existingWrapper = Array.from(wrappers).find((wrapper) => 
            wrapper.getAttribute("data-uuid") === chatUserId
        );

        
        if (existingWrapper) {
            this.#moveToTop(existingWrapper, chatWrapper) // 要素をトップに移動;
        } else {
            // 送信者のリストが存在しない場合、新規要素を作成
            await this.#createNewDivElement();
        }
    };

    /**
     * 要素をリストのトップに移動
     * 
     * @param {HTMLElement} element - 移動対象の要素
     * @param {HTMLElement} parent - 親要素
     */
    #moveToTop(element, parent) {
        const firstChild = parent.firstChild;
        if (!firstChild) return;

        const newElement = element.cloneNode(true);
        parent.insertBefore(newElement, firstChild); // 最初に挿入
        if (element.parentNode === parent) parent.removeChild(element); // 元の要素を削除
    }

    /**
     * チャットユーザー一覧に新しいユーザーを追加
     * 
     * 指定された senderId と receiverId に基づいてユーザー情報を取得し、
     * ユーザーリストに新しい要素を挿入します。
     */
    async #createNewDivElement(){
        const response = await Fetch.fetchGetOperation(`/api/users/${this.senderId}/${this.receiverId}`)
        const parentElement = document.getElementById("js_chatUser_wrapper");
        const firstChild    = parentElement.firstChild; // 最初の子要素を取得

        if(!response || response.length === 0) return;
        
        response.forEach((res)=>{
            userStateManager.setState(res["id"]);
            const template = createChatUserContainer(res["entity_uuid"], res)
            if(firstChild){
                // 最初の子要素の前に直接HTMLを挿入
                parentElement.insertAdjacentHTML('afterbegin', template);
            }else{
                parentElement.innerHTML += template  // 最初の子要素がない場合、末尾に追加
            }
        })
    };

    /**
     * チャットユーザーリストのメッセージを更新
     * 
     * 管理者から一斉メッセージが送信された際、ブロックユーザー以外の
     * チャットユーザーのメッセージを更新
     * 
     * @param {Array} blockedIds - ブロックされているユーザーの UUID の配列
     * 例: ["00bd10de-18dc-4d00-be56-02e5d12b03b2", "219f5d1a-c9e2-48c4-8a0b-59f5fe971b9a"]
     */
    updateUserListMessage(blockedIds){
        const message_wrappers = document.querySelectorAll(".js_chatMessage_elment")

        message_wrappers.forEach((wrapper)=>{
            let id = wrapper.getAttribute("data-id")

            if(!blockedIds.includes(id)){
                wrapper.innerHTML = "一斉メッセージを送信しました"
            }
        })
    }

    /**
     * チャットユーザーリストのメッセージを更新
     * 
     * メッセージの送受信が行われた際に、送信者タイプで文言を変更し、
     * チャットユーザーのメッセージを更新
     */
    displayMessage() {
        const elements = document.querySelectorAll(".js_chatMessage_elment");
        elements.forEach((element) => {
            // チャットユーザー一覧からチャットユーザーIDを取得
            const id = element.getAttribute("data-id");
            const chatUserId = this.senderType == "user" ? this.senderId : this.receiverId
            const txt = this.messageType == "image" ? (this.senderType == "user" ? "画像が送信されました" : "画像を送信しました") : this.content

            if (id == chatUserId) element.innerHTML = ChatUIHelper.adjustMesageLength(txt)
        });
    };

    /**
     * 新しいメッセージの時間をリアルタイムでチャットユーザーリストの時間箇所に表示
     * 
     * @param {Array} blockedIds - ブロックされているユーザーの UUID の配列
     * 例: ["00bd10de-18dc-4d00-be56-02e5d12b03b2", "219f5d1a-c9e2-48c4-8a0b-59f5fe971b9a"]
     */
    updateMessageTime(blockedIds = []) {
        const elements = document.querySelectorAll(".js_update_message_time");
    
        elements.forEach((element) => {
            const id = element.getAttribute("data-id");
    
            // ブロックされているユーザーをスキップ
            if (blockedIds.includes(id)) return;
    
            // 時間を更新
            const chatUserId = this.senderType === "user" ? this.senderId : this.receiverId;
            element.innerHTML = id === chatUserId ? this.time : element.innerHTML;
        });
    }
}

export default ChatUserListController;