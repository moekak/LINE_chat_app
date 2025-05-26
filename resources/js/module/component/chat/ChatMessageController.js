import { createLeftMessageContainer, createRightMessageContainer } from "../templates/elementTemplate"
import ModalController from "../ui/ModalController"

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

    displayChatMessage(){
        if(this.ids.includes(this.parentElement.getAttribute("data-id"))) return 
        const shouldAddRightMessage = this.#isRightAlignedMessage();
        this.#addChatMessage(shouldAddRightMessage);

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
    #addChatMessage(isRight) {

        const validPositions = ["afterbegin", "beforeend"];
        const validPosition = validPositions.includes(this.position) ? this.position : "beforeend";
        // メッセージHTMLを生成して挿入
        const messageHTML = isRight ? createRightMessageContainer(this.messageType, this.time, this.content, this.cropArea, this.type): createLeftMessageContainer(this.messageType, this.time, this.content, this.cropArea, this.type);
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
}

export default ChatMessageController;