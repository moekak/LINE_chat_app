import { isAllowedType, isCorrectSize, processImageUpload } from "./imageFileOperator"
import CropperImage from "../cropper/CropperImage"
import ModalController from "../../component/ui/ModalController"
import CropperEventHandler from "../cropper/CropperEventHandler"
import ButtonController from "../../component/ui/ButtonController"
import FromController from "../../component/ui/FormController"


class FileUploader{
      constructor(socket, sender_id, url, sender_type, file, imageElement, isTemplate, index, fileInput){
            this.socket = socket
            this.sender_id = sender_id
            this.url = url
            this.sender_type = sender_type
            this.file = file
            this.receiver_id = document.getElementById("js_receiver_id").value;
            this.cropper = null
            this.imageElement = imageElement
            this.hasUrl = false
            this.isConfirmed = false
            this.isTemplate = isTemplate
            this.actionUrl = ""
            this.imageIndex = index
            this.fileInput = fileInput
            this.sendingData = {}
      }

      initializeEvents() {
            this.changeImageBtn = document.getElementById("js_changeImg_btn")
            this.newChangeImageBtn = this.changeImageBtn.cloneNode(true)
            this.changeImageBtn.parentNode.replaceChild(this.newChangeImageBtn, this.changeImageBtn)
            this.newChangeImageBtn.addEventListener("click", this.handleDisplayClick.bind(this));

      }

      handleDisplayClick(){
            FromController.initializeFileUpload()
      }

      getSendingData(){
            return this.sendingData
      }


      async validateAndProcessFile(){
            try{
                  if(!this.validateFile()) return
                  if(this.sender_type == "admin"){
                        if(document.querySelector(".image_edit_modal").classList.contains("hidden")){
                              this.#toggleLoader(true)   
                        }else{
                              this.#toggleLoaderforChangeImg(true)
                        }
                        await this.handleAdminFileUpload()
                  }else{
                        await this.handleUserFileUpload()
                  }
            }catch(error){
                  console.error("エラーが発生しました:", error);
                  alert("エラーが発生しました。再試行してください。");
            }
      }

      validateFile(){

            let hasModal = true
            if(document.querySelector(".image_edit_modal")?.classList.contains("hidden")) hasModal = false

            
            if(!isAllowedType(this.file.type)){
                  if (this.fileInput) {
                        this.fileInput.value = "";
                  }
                  if(this.sender_type == "admin"){
                       // cropperページから画像を切り替えた場合の処理
                        if(document.querySelector(".change_img").id == "fileInputEdit"){
                              FromController.showCropperSetting()
                        }
                  }
                  
                  return this.#validationError("許可されているファイル形式は JPG, PNGのみです。", hasModal)
            }
            if(!isCorrectSize(this.file.size)){
                  if (this.fileInput) {
                        this.fileInput.value = "";
                  }

                  if(this.sender_type === "admin"){
                       // cropperページから画像を切り替えた場合の処理
                        if(document.querySelector(".change_img").id == "fileInputEdit"){
                              FromController.showCropperSetting()
                        } 
                  }
                  

                  return this.#validationError("ファイルサイズは5MB以下にしてください。", hasModal)
            }

            return true
      }

      #validationError(txt, hasModal){
            const errorElement = document.querySelector(".js_image_error");
            if(hasModal && errorElement){
                  errorElement.classList.remove("hidden");
                  errorElement.innerHTML = txt;
            }else{
                  alert(txt)
            }

            return false
      }

      async handleAdminFileUpload() {

            if (!this.imageElement)  {
                  
                  throw new Error("画像の要素が見つかりません。");
            }

            const newImage = this.#createImageElement(this.file);
            
            newImage.onload = async () => {
                  try{

                        const newImageButton = ButtonController.replaceButton("js_change_area")
                        this.cropper = new CropperImage(this.imageElement, newImageButton)

                        const cropperHandler = new CropperEventHandler(newImageButton,this.cropper)
                        cropperHandler.changeBtnEvent()
                        // 新しい画像要素を Cropper に更新
                        this.cropper.updateImage(newImage);
                  

                        // 古い画像を置き換え
                        const container = document.getElementById("image-container");
                        container.innerHTML = ""; // 古い画像を削除
                        container.appendChild(newImage); // 新しい画像を追加

                        this.#toggleLoaderforChangeImg(false)
                        this.#toggleLoader(false)
                        const imageEditModal = document.querySelector(".image_edit_modal")

                        document.querySelector(".change_img").id = "fileInputEdit";
                        if(this.isTemplate){

                              // imageEditモーダルを閉じた時に対するfileInputを空にするために番号をふる
                              if(this.imageIndex){
                                    document.querySelector(".template_bg").dataset.number = this.imageIndex
                              }

                              document.querySelector(".change_img").setAttribute("for", this.fileInput.id);
                              

                              ModalController.open_management_modal(imageEditModal)
                        }else{
                              ModalController.open_modal(imageEditModal)
                              document.querySelector(".change_img").setAttribute("for", "fileInput");
                        }
                        

                        this.#changeSubmitBtn()


                  }catch(error){
                        console.error("画像処理中にエラーが発生しました:", error);
                        alert("画像の処理に失敗しました。");
                  }
            }

      }
      async handleUserFileUpload(){
            ModalController.open_loader();

            try {
                  const formData = await processImageUpload(this.file, this.sender_id, this.receiver_id, this.sender_type);
                  const response = await fetch(this.url, {
                        method: "POST",
                        body: formData,
                  });

                  if (!response.ok) {
                        throw new Error("サーバーからエラー応答が返されました。");
                  }

                  const res = await response.json();
                  const { created_at: time, admin_login_id, imageName: resizedImage } = res;

                  this.socket.emit("send_image", {
                        resizedImage,
                        receiver_id: this.receiver_id,
                        sender_id: this.sender_id,
                        sender_type: this.sender_type,
                        time,
                        admin_login_id,
                        cropArea : []
                  });
            } catch (error) {
                  console.error("ユーザー用ファイルアップロード中にエラーが発生しました:", error);
                  alert("ファイルのアップロードに失敗しました。");
            }
      }

      // 新しい画像要素を作成
      #createImageElement(){
            const newImage = document.createElement("img");
            newImage.src = URL.createObjectURL(this.file);
            newImage.id = "image"; // IDを付加
            return newImage;
      };

      #toggleLoader(isLoading){

            const messageModal = document.querySelector(".image_edit_modal")
            const loader = document.querySelector(".loader")

            if(isLoading){
                  messageModal.style.zIndex = 0
                  loader.classList.remove("hidden")
            }else{
                  messageModal.style.zIndex = 999
                  loader.classList.remove("add")
            }

      }

      // 送信ボタンの色を変更する
        // 送信ボタンの色を変更する
      #changeSubmitBtn() {
            const choices = document.querySelectorAll('input[name="choice"]');
            const urlInput = document.getElementById("js_url_input");
            const submitBtn = document.getElementById("js_preview_submit_btn");
            const confirmBtn = document.getElementById("js_change_area");
            const urlError = document.querySelector(".js_url_error")
      
            // ボタンの状態を更新する関数
            const updateButtonState = () => {
                  const isChoiceOn = [...choices].some(choice => choice.checked && choice.value === "on");
                  const hasUrl = urlInput.value.length > 0;
                  const isConfirmed = confirmBtn.innerHTML !== "選択範囲確定";
            
                  if(isChoiceOn){
                        if (hasUrl && isConfirmed) {
                              submitBtn.classList.remove("disabled_btn");
                        } else {
                              submitBtn.classList.add("disabled_btn");
                        }
                  }else{
                        submitBtn.classList.remove("disabled_btn");
                  }
            };
      
            // 各イベントリスナーでボタン状態を更新
            choices.forEach(choice => {
                  choice.addEventListener("change", updateButtonState);
            });
      
            urlInput.addEventListener("input", () => {
                  urlError.classList.add("hidden")
                  this.actionUrl = urlInput.value;
                  updateButtonState();
            });
      
            confirmBtn.addEventListener("click", () => {
                  // 確定状態をトグル
                  this.isConfirmed = confirmBtn.innerHTML !== "選択範囲確定";
                  updateButtonState();
            });
      }

      setupMessageSubmitButton() {
            const submitButton = document.getElementById("js_preview_submit_btn");
            if (!submitButton) {
                  throw new Error("送信ボタンが見つかりません。");
            }

            // 既存のイベントリスナーを削除
            const newSubmitButton = submitButton.cloneNode(true);
            submitButton.replaceWith(newSubmitButton);


            // this.#changeSubmitBtn()
            // 新しいイベントリスナーを登録
            newSubmitButton.addEventListener("click", async () => {
                  try {

                        const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?.*)?$/;
                        const urlInput= document.getElementById("js_url_input")
                        const selectedValue = document.querySelector('input[name="choice"]:checked').value;

                        if(selectedValue === "on" && !regex.test(urlInput.value)){
                              const urlError = document.querySelector(".js_url_error")
                              urlError.classList.remove("hidden")
                              return 
                        }

                        const modal = document.querySelector(".image_edit_modal")
                        modal.classList.add("hidden")
                        ModalController.open_loader()

                  
                        const formData = await processImageUpload(this.file, this.sender_id, this.receiver_id, this.sender_type);
                        if(selectedValue === "on"){
                              const cropperState = this.cropper.getCropperState();
                  
                              if (!cropperState) {
                                    throw new Error("CropperStateが初期化されていません。");
                              }
                  
                              formData.append("cropArea", JSON.stringify(cropperState.getState()))
                              formData.append("url", this.actionUrl);
                        }else{
                              formData.append("cropArea", []);
                              formData.append("url", null);
                        }
                        
                        
                        const response = await fetch(this.url, {
                              method: "POST",
                              body: formData,
                        });
      
                        if (!response.ok) {
                              throw new Error("サーバーからエラー応答が返されました。");
                        }
      
                        const res = await response.json();
                        
                        const { created_at: time, admin_login_id, imageName: resizedImage, cropArea: cropArea } = res;
      
                        this.socket.emit("send_image", {
                              resizedImage,
                              receiver_id: this.receiver_id,
                              sender_id: this.sender_id,
                              sender_type: this.sender_type,
                              time,
                              admin_login_id,
                              cropArea
                        });
                  } catch (error) {
                        console.error("送信処理中にエラーが発生しました:", error);
                  }
            });
      }
      
      setupMessagesTemplateSubmitButton() {
            const submitButton = document.getElementById("js_preview_submit_btn");
            if (!submitButton) {
                  throw new Error("送信ボタンが見つかりません。");
            }

            // 既存のイベントリスナーを削除
            const newSubmitButton = submitButton.cloneNode(true);
            submitButton.replaceWith(newSubmitButton);


            // 新しいイベントリスナーを登録
            return new Promise((resolve)=>{
                  newSubmitButton.addEventListener("click", async () => {
                        try {
                              const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?.*)?$/;
                              const urlInput= document.getElementById("js_url_input")
                              const selectedValue = document.querySelector('input[name="choice"]:checked').value;
      
                              if(selectedValue === "on" && !regex.test(urlInput.value)){
                                    const urlError = document.querySelector(".js_url_error")
                                    urlError.classList.remove("hidden")
                                    return 
                              }
      
                              const modal = document.querySelector(".image_edit_modal")
                              modal.classList.add("hidden")

                              if(selectedValue === "on"){
                                    const cropperState = this.cropper.getCropperState();
                        
                                    if (!cropperState) {
                                          throw new Error("CropperStateが初期化されていません。");
                                    }
      
                                    this.sendingData = {"cropArea": JSON.stringify(cropperState.getState()), "url" : this.actionUrl}
                              }else{
                                    this.sendingData = {"cropArea": [], "url" : null}
                              }
                              // Promise を解決
                              resolve(this.sendingData);
                              
                              
                        } catch (error) {
                              console.error("送信処理中にエラーが発生しました:", error);
                        }
                  });
            })
            
      }

      #toggleLoaderforChangeImg(isLoading){
            const bg = document.querySelector(".crop_bg")
            const loader = document.querySelector(".crop_loader")

            if(isLoading){
                  bg.classList.remove("hidden")
                  loader.classList.remove("hidden")
            }else{
                  bg.classList.add("hidden")
                  loader.classList.add("hidden")
            }
      }

}



export default FileUploader;