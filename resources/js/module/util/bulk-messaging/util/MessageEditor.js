import { API_ENDPOINTS } from "../../../../config/apiEndPoints";
import FromController from "../../../component/ui/FormController";
import ModalController from "../../../component/ui/ModalController";
import { handleImageProcessingFlow } from "../../fileOperation/imageFileOperator";
import UIController from "../component/ui/UIController";
import { createMessageHtml, createMessageImageHtml, createPreviewHtml, createPreviewImageHtml } from "../template/createHtml";
import Utility from "./Utility";

class MessageEditor{
    constructor(socket) {
        this.messageList = document.querySelector('#js_message-list');
        this.previewWrapper = document.querySelector(".chat_wrapper")
        this.img = document.querySelector(".chat_users-icon").src
        this.textarea = null
        this.url = API_ENDPOINTS.ADMIN_MESSAGES_STORE
        this.index = ""
        this.clickCount = 0
        this.socket = socket
        this.sender_id = document.getElementById("js_sender_id").value
        this.receiver_id = document.getElementById("js_receiver_id").value
        
        // 初期化を行う
        this.#removeExistingListeners();
        this.bindEvents();
        this.#inputMessageHanlder();
        
        // 初期化完了のフラグを設定
        document.body.dataset.messageEditorInitialized = "true";
        
    }


    #removeExistingListeners() {
        // 既存のイベントリスナーを削除するためのクローン置換テクニック
        const addTextBtn = document.getElementById('add-text');
        const addImageBtn = document.getElementById('add-image');
        
        if (addTextBtn) {
            const newTextBtn = addTextBtn.cloneNode(true);
            addTextBtn.parentNode.replaceChild(newTextBtn, addTextBtn);
        }
        
        if (addImageBtn) {
            const newImageBtn = addImageBtn.cloneNode(true);
            addImageBtn.parentNode.replaceChild(newImageBtn, addImageBtn);
        }
    }


    bindEvents() {
        document.getElementById('add-text').addEventListener('click', () => this.#addTextMessageElement());
        document.getElementById('add-image').addEventListener('click', () => this.#addImageMessageElement());
    }

    // メッセージを入力する際の処理


    #inputMessageHanlder(){
        document.querySelectorAll(".js_textarea").forEach((textarea)=>{
            textarea.addEventListener("input", (e)=>{
                const text = e.target.value
                this.index = textarea.dataset.number
                // textareaと対のpreview_message要素を取得。なかったらundefinedを返す。undefinedの場合は、新たなに新しいpreview要素を追加し、ある場合はinnerHTMLを更新
                const targetElement = [...document.querySelectorAll(".js_preview_message")].find(el => el.dataset.number == this.index);
                if(text.length > 0){
                    this.#addPreviewMessage(text, targetElement)
                }else{
                    if(targetElement !== undefined){
                        this.previewWrapper.removeChild(targetElement.parentElement)
                    }
                }
                
            })
        })
    }





    #setupImageUploadHandler(addedElement){
        const fileInput = document.querySelector(`#fileUpload_${addedElement.dataset.number}`)

        fileInput.addEventListener("change", async()=>{
            // エラーメッセージを非表示にする
            const errorElement = document.querySelector(".js_image_error");
            errorElement.innerHTML = ""
            errorElement.classList.add("hidden")
            
            const file = fileInput.files[0] //選択されたファイルを取得
            const fileURL = URL.createObjectURL(file); // ファイルをURLに変換
            // cropper編集の初期化(inputをすべて空にするなど)
            FromController.resetCropperUIElements()

            // cropperの処理をして、cropArea, URLを返す
            const imageData = await handleImageProcessingFlow(this.socket, this.sender_id, this.url,"admin", file, addedElement.dataset.number, true, fileInput)
            fileInput.dataset.cropArea = imageData["cropArea"]
            fileInput.dataset.url = imageData["url"]

            // 画像をアップロード画面に表示する処理
            UIController.displayUploadedImage(addedElement, fileURL)
            this.#addPreviewImage(addedElement.dataset.number, fileURL)
        })
    }


    #addPreviewMessage(text, targetElement){
        const previewText = text.replace(/\n/g, '<br>');

        if(targetElement !== undefined){
            targetElement.innerHTML = previewText
        }else{
            const currentTime = Utility.getCurrentTimeFormatted()
            const previewHtml = createPreviewHtml(previewText, currentTime, this.img, this.index)
            const allMessages = [...this.previewWrapper.children];
            //this.index` より大きい `data-number` を持つ最初の要素を探す
            const targetElement = allMessages.find(el => parseInt(el.dataset.number, 10) > this.index);


            // `previewHtml` を要素に変換
            const tempContainer = document.createElement("div");
            tempContainer.innerHTML = previewHtml;
            const newElement = tempContainer.firstElementChild;

            if (targetElement) {
                // `targetElement` の前に挿入（this.previewWrapper 内で）
                this.previewWrapper.insertBefore(newElement, targetElement);
            } else {
                // すべての `data-number` より大きい場合は末尾に追加
                this.previewWrapper.appendChild(newElement);
            }

            // 挿入した要素（最後の子要素）を取得
            const insertedElement = this.previewWrapper.lastElementChild;
            // その中からtextareaを検索して返す
            this.textarea = insertedElement.querySelector('.js_chat_message')
            
        }
    }

    #addPreviewImage(index, src){
        const currentTime = Utility.getCurrentTimeFormatted()
        const previewHtml = createPreviewImageHtml(src, currentTime, this.img, index)
        const allMessages = [...this.previewWrapper.children];
        //this.index` より大きい `data-number` を持つ最初の要素を探す
        const targetElement = allMessages.find(el => parseInt(el.dataset.number, 10) > index);


        // `previewHtml` を要素に変換
        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = previewHtml;
        const newElement = tempContainer.firstElementChild;

        if (targetElement) {
            // `targetElement` の前に挿入（this.previewWrapper 内で）
            this.previewWrapper.insertBefore(newElement, targetElement);
        } else {
            // すべての `data-number` より大きい場合は末尾に追加
            this.previewWrapper.appendChild(newElement);
        }
    }


    #addTextMessageElement() {
        this.clickCount ++
        const newMessageHtml = createMessageHtml(this.clickCount);
        this.messageList.insertAdjacentHTML('beforeend', newMessageHtml);
        this.#inputMessageHanlder()
        this.#setupDeleteHandlers();
    }

    #addImageMessageElement() {
        this.clickCount ++
        const newImageHtml = createMessageImageHtml(this.clickCount);
        this.messageList.insertAdjacentHTML('beforeend', newImageHtml);
        const addedElement = this.messageList.lastElementChild;
        this.#setupImageUploadHandler(addedElement)
        this.#setupDeleteHandlers();
    }

    // 削除ボタンのイベントハンドラをセットアップ
    #setupDeleteHandlers() {
        const deleteBtns = document.querySelectorAll(".message-delete");
        deleteBtns.forEach((btn) => {
            // イベントの重複登録を防ぐために一度削除
            btn.removeEventListener("click", this.#handleDeleteValue);
            // イベントを追加
            btn.addEventListener("click", (e) => this.#handleDeleteValue(e));
        });
    }

    // 削除処理（textareaの削除）
    #handleDeleteValue(event) {
        const btn = event.currentTarget;
        this.#handleDeletePreview(btn)
        const messageItem = btn.closest('.message-item');

        if(this.messageList.contains(messageItem)){
            this.messageList.removeChild(messageItem); 
        }
    }

    // 削除処理（previewからの削除）
    #handleDeletePreview(btn){
        const index = btn.dataset.number
        const previewElements = document.querySelectorAll(".js_preview_message")

        previewElements.forEach((element)=>{
            if(element.dataset.number === index){
                this.previewWrapper.removeChild(element.parentElement)
            }
        })
    }

    submitMessages(){
        try{
            const submitBtn = document.getElementById("submit-messages")
            // 既存のイベントリスナーを削除
            const newSubmitButton = submitBtn.cloneNode(true);
            submitBtn.replaceWith(newSubmitButton);

            const formData = new FormData();
            
            newSubmitButton.addEventListener("click", async ()=>{

                if(document.querySelectorAll(".js_preview_message").length <= 0){
                    alert("メッセージを一つ以上入力してください。")
                    return
                }

            
                document.getElementById("js_messageSetting_modal").classList.add("hidden")
                document.querySelector(".template_bg").classList.add("hidden")
                ModalController.open_loader()
                const messagesElements = document.querySelectorAll(".message-item");
                let messageCounter = 0; // テキストメッセージ用カウンター
                
                messagesElements.forEach((element)=>{
                    if(element.dataset.type === "text" && element.querySelector(".js_textarea").value.length > 0){

                        const textMessage = element.querySelector(".js_textarea").value
                         // オブジェクトをJSON文字列に変換してから追加
                        const item = {
                            "adminUuid": this.sender_id, 
                            "userUuid": this.receiver_id, 
                            "resource": textMessage
                        };
                        formData.append(`messages[${messageCounter}]`, JSON.stringify(item));
                        messageCounter++;
        
                    }else if(element.dataset.type === "image" ){
                        const fileInput = element.querySelector(".js_file_upload");
                        if(fileInput.files && fileInput.files.length > 0){
                            // ファイルはそのまま追加
                            if(fileInput.files && fileInput.files[0]) {
                                formData.append(`images[${messageCounter}][file]`, fileInput.files[0]);
                            }
                            
                            // その他のメタデータを個別に追加
                            formData.append(`images[${messageCounter}][adminUuid]`, this.sender_id);
                            formData.append(`images[${messageCounter}][userUuid]`, this.receiver_id);
                            
                            if(fileInput.dataset.url && fileInput.dataset.url !== "null"){
                                formData.append(`images[${messageCounter}][url]`, fileInput.dataset.url);
                                formData.append(`images[${messageCounter}][cropArea]`, fileInput.dataset.cropArea);
                            } 
                            messageCounter++;
                        }
                    }
                })
    
    
                const hasData = formData.entries().next().done === false;
    
                if(hasData){
                    const response = await fetch(this.url, {
                        method: "POST",
                        body: formData,
                    });
                    if (!response.ok) {
                            throw new Error("サーバーからエラー応答が返されました。");
                    }
    
                    const res = await response.json();


                    console.log(res);
                    
                    this.socket.emit("send_messages", {
                            data: res["data"],
                            adminUuid: res["data"][0]["adminUuid"],
                            userUuid: res["data"][0]["userUuid"],
                    });
                }
                
            })
        }catch(error){
            alert("メッセージ送信でエラーが発生しました。再度実行してください。")
        }
        

        
    }


}

export default MessageEditor;