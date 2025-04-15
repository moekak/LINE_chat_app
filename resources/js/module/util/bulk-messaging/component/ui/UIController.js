class UIController{

      // 画像をアップロード画面に表示する処理
      static displayUploadedImage(addedElement, fileURL){
            const label = addedElement.querySelector(".file_upload")
            const uploadImgElement = addedElement.querySelector(".js_upload_img")
            uploadImgElement.src = fileURL
            label.classList.add("hidden")
      }
}


export default UIController;