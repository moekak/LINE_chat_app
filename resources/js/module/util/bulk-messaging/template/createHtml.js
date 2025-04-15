// メッセージアイテムを作成
export const createMessageHtml = (index) =>{
    return `
            <div class="message-item" data-type="text">
                <div class="message-header">
                    <div>
                        <span class="message-type-icon">T</span>
                        <span>テキストメッセージ</span>   
                    </div>
                    <div class="message-actions">
                        <button class="message-delete" data-number=${index}>×</button>
                    </div>
                </div>
                <div class="message-content">
                    <textarea placeholder="メッセージを入力" style="width: -webkit-fill-available;" class="js_textarea" maxlength="1000" data-number=${index}></textarea>
                </div>
            </div>
    `
}

// 画像アイテムを作成
export const createMessageImageHtml = (index) =>{
    return `
        <div class="message-item" data-type="image" data-number=${index}>
            <div class="message-header">
                    <div style="display: flex; gap: 7px;">
                        <span class="icon">🖼️</span>
                        <span>画像</span>   
                    </div>
                    <div class="message-actions">
                        <button class="message-delete" data-number=${index}>×</button>
                    </div>
            </div>
            <div class="dropzone dz-clickable">
                    <img src="" alt="" class="js_upload_img">
                    <label for="fileUpload_${index}" class="file_upload">
                        <img src="/img/icons8-plus-50.png" alt="" >
                        <p>ファイルの選択</p>
                    </label>
                    <input type="file" id="fileUpload_${index}" class="js_file_upload" hidden>
            </div>
        </div>
    `
}


export const createPreviewHtml = (text, time, img, index) =>{
    return `
        <div class="chat__message-container-left" style="display: flex; gap: 6px; margin: 0 4px; width: 95%;" data-number=${index}>
            <img src=${img} alt=""  class="chat_users-icon-message preview_user-icon" id="icon_msg"> 
            <div class="chat__message-box-left chat-margin5 js_preview_message " style="border-radius: 10px;" data-number=${index}>${text}</div>
            <div class="chat__message-time-txt" style="font-size: 6px;">${time}</div>
        </div>
    `
}

export const createPreviewImageHtml = (srcUrl, time, img, index) =>{
    return `
        <div class="chat__message-container-left" style="display: flex; gap: 6px; margin: 0 4px;" data-number=${index}>
            <img src=${img} alt=""  class="chat_users-icon-message preview_user-icon" id="icon_msg"> 
            <img src="${srcUrl}" class="chat-margin5 chat_image js_preview_message" data-number=${index}>
            <div class="chat__message-time-txt" style="font-size: 6px;">${time}</div>
        </div> 
    `
}