/**
 * ModalController
 * 各モーダルの表示切替のロジックを管理するクラス
 */
class ModalController{

    /**
     * モーダルを開く
     * @param {HTMLElement} modal - モーダル要素
     */
    static open_modal(modal){
        document.querySelector(".bg").classList.remove("hidden")
        modal.classList.remove("hidden")
    }

    
    static open_management_modal(modal){
        document.querySelector(".template_bg").classList.remove("hidden")
        modal.classList.remove("hidden")
    }

    static close_modal(){
        const modals = document.querySelectorAll(".js_modal")
        const bg = document.querySelector(".bg")
        const loader = document.querySelector(".js_loader")
        bg.addEventListener("click", ()=>{
            modals.forEach((modal)=>{
                modal.classList.add("hidden")
                bg.classList.add("hidden")
                loader.classList.add("hidden")
            })
        })
    }

    // ローダーを表示する処理
    static open_loader(){
        document.querySelector(".bg").classList.remove("hidden")
        document.querySelector(".loader").classList.remove("hidden")
    }
    
    // ローダーを閉じる処理
    static close_loader(){
        document.querySelector(".bg").classList.add("hidden")
        document.querySelector(".loader").classList.add("hidden")
    }

    static open_image_modal(isAdmin = false){
        const images = document.querySelectorAll(".chat_image");
        const image_modal = document.querySelector(".js_image_src")
        const bg = document.querySelector(".black_bg")
        const close_button = document.querySelector(".close_button")

        images.forEach((img)=>{
            if(img.parentElement.getAttribute("data-crop") == null ||img.parentElement.getAttribute("data-crop") == "null"){
                img.addEventListener("click", (e)=>{
                    let target_img = e.currentTarget.src
                    
                    bg.classList.remove("hidden")
                    image_modal.classList.remove("hidden")
                    close_button.classList.remove("hidden")
    
                    document.querySelector(".js_image_src").src = target_img
                    
                })
            }
            
        })

        close_button.addEventListener("click", ()=>{
            ModalController.close_image()
        })

        if(isAdmin){
            image_modal.addEventListener("click", ()=>{
                ModalController.close_image()
            }) 
        }
        
    }

    static close_image_by_key(){
        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape" && document.querySelector(".js_image_src").classList.contains("hidden") == false) {
                ModalController.close_image()
            }
        });
    }

    static close_image(){
        const image_modal = document.querySelector(".js_image_src")
        const bg = document.querySelector(".black_bg")
        const close_button = document.querySelector(".close_button")
        bg.classList.add("hidden")
        image_modal.classList.add("hidden")
        close_button.classList.add("hidden")
    }

    // cropper編集と、template作成モーダルを閉じる処理
    static close_management_modal(){
        const bg = document.querySelector(".template_bg")
        const imageEditModal = document.querySelector(".image_edit_modal")
        const confirm_modal = document.getElementById("js_bulk_confirm_modal")
        const templateModal = document.getElementById("js_messageSetting_modal")
        const cancelBtn = document.getElementById("js_cancel_btn")
        const closeBtn = document.querySelector(".js_close_modal_btn")

        bg.addEventListener("click", ()=>{

            // cropper編集モーダルを閉じる処理
            if(!imageEditModal.classList.contains("hidden")){
                // cropper編集モーダルを閉じた際に、対するfileInputの中身を空にする処理
                const bg =  document.querySelector(".template_bg")
                const imageIndex = bg.dataset.number
                const fileInput = document.getElementById(`fileUpload_${imageIndex}`)
                fileInput.value = ""
                bg.dataset.number = ""
                imageEditModal.classList.add("hidden")
            }else{

                // メッセージ生成モーダルを閉じる処理
                confirm_modal.classList.remove("hidden")
                templateModal.style.zIndex = "997"

                cancelBtn.addEventListener("click", ()=>{
                    confirm_modal.classList.add("hidden")
                    templateModal.style.zIndex = "998"
                })

                closeBtn.addEventListener("click", ()=>{
                    window.location.reload()
                })
                
            }
            
        })
    }
    
}

export default ModalController;