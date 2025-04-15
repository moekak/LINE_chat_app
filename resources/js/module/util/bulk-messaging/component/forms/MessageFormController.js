class MessageFormController{
      constructor(){
            this.messageList = document.getElementById("js_message-list")
            this.textareas = document.querySelectorAll(".js_textarea")
            this.fileUploads = document.querySelectorAll(".js_file_upload")
            this.previewWrapper = document.querySelector(".chat_wrapper")
      }

      clearTextarea(){
            this.messageList.innerHTML = ""
            this.textareas.forEach((textarea)=>{
                  textarea.value = ""
            })

            this.fileUploads.forEach((upload)=>{
                  upload.value = ""
            })

            this.previewWrapper.innerHTML = ""
      }
}

export default MessageFormController;