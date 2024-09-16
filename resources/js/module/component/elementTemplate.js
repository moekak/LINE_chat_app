export const createRightMessageContainer = (message_type, time, content) =>{
      return `
         <div class="chat__message-container-right">
            <div class="chat__mesgae-main-right">
                  <div class="chat__message-time-txt">${time}</div>
                  ${message_type === "text" ? 
                  `<div class="chat__message-box-right chat-margin5">${content.replace(/\n/g, "<br>")}</div>` 
                  : 
                  `<img src="${content}" class="chat-margin5">`
                  }
            </div>
      </div>
      `
}
export const createLeftMessageContainer = (message_type, time, content) =>{
      const src = document.getElementById("js_user_icon_img").value;
      return `
         <div class="chat__message-container-left">
            <div class="chat__mesgae-main-left">
                  <img src="${src}" alt="" class="chat_users-icon-message" id="icon_msg"> 
                  ${message_type === "text" ? 
                  `<div class="chat__message-box-left chat-margin5">${content.replace(/\n/g, "<br>")}</div>` 
                  : 
                  `<img src="${content}" class="chat-margin5">`
                  }
                  <div class="chat__message-time-txt">${time}</div>
            </div> 
      </div>
      `
}

export const createChatUserContainer = (sender_id, res, msg, message_type) =>{
      const countDivStyle = document.getElementById("js_chatuser_id").value == sender_id || res["totalCount"] == 0 ? "none" : "flex";
      const countinnerHTML = document.getElementById("js_chatuser_id").value == sender_id || res["totalCount"] == 0 ? 0 : res["totalCount"];

      return `
            <div class="chat__users-list-wraper js_chat_wrapper" style="margin-top: 0" data-uuid="${sender_id}" data-id="${res["userInfo"]["id"]}" data-admin-id="${document.getElementById("js_admin_id").value}">
                  <img src="${res["userInfo"]["user_picture"]}" alt="" class="chat_users-icon"> 
                  <div class="chat_users-list-flex">
                        <div class="chat_users-list-box"> 
                              <p class="chat_name_txt">${res["userInfo"]["line_name"]}</p>
                              <small class="chat_time js_update_message_time" data-id="${sender_id}">${res["formatted_date"]}</small>
                        </div>  
                        <div class="chat__users-list-msg">
                              <small class="chat_message js_chatMessage_elment" data-id="${sender_id}">${message_type == "text" ? msg : "画像が送信されました"}</small>
                              <div class="message_count js_mesage_count" data-id="${sender_id}" style="display:${countDivStyle}">${countinnerHTML}</div>
                        </div>
                  </div>
            </div>
      `
}
