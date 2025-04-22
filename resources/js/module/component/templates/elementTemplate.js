import { linkifyContent } from '../../util/messaging/messageService.js';
import config from '../../../config/config.js';


export const createRightMessageContainer = (message_type, time, content, cropArea) =>{

      if(typeof(cropArea) === "string"){
            cropArea = JSON.parse(cropArea)
      }

      let rawHtml = "";
      if (Object.entries(cropArea).length > 0) {
            rawHtml = `
            <div class="image-container" style="position: relative; display: inline-block; margin: 5px 0;" data-crop='${JSON.stringify(cropArea)}'>
                  <img src="${config.S3_URL}/${content}" alt="Image" class="chat-margin5 chat_image overlay-target js_chat_message" style="margin: 0;"/>
                  <a class="overlay" href="${cropArea.url}" style="display: none;"></a>
            </div>
            `;
      } else {
            
            rawHtml = `
                  <div class="image-container" style="position: relative; display: inline-block; margin: 5px 0;" >
                        <img src="${config.S3_URL}/${content}" alt="Image" class="chat-margin5 chat_image js_chat_message" style="margin: 0;"/>
                  </div>
            `;
      }
      

      // テキストに含まれてるURLをaタグに変換する
      const linkedMessage = linkifyContent(content)

      return `
            <div class="chat__message-container-right">
                  <div class="chat__mesgae-main-right">
                        <div class="chat__message-time-txt">${time}</div>
                        ${message_type === "text" || message_type === "broadcast_text" || message_type === "greeting_text" ? 
                        `<div class="chat__message-box-right chat-margin5 js_chat_message">${linkedMessage.replace(/\n/g, "<br>")}</div>` 
                        : 
                        `${rawHtml}`
                        }
                  </div>
            </div>
      `
}
export const createLeftMessageContainer = (message_type, time, content, cropArea) =>{
      const src = document.getElementById("js_user_icon_img").value;
      const icon_src = src === "" ? "/img/user-icon.png" : src

      // テキストに含まれてるURLをaタグに変換する
      const linkedMessage = linkifyContent(content)

      let rawHtml = "";

      if (Object.entries(cropArea).length > 0) {
            rawHtml = `
            <div class="image-container" style="position: relative; display: inline-block; margin: 5px 0;" data-crop='${JSON.stringify(cropArea)}'>
                  <img src="${config.S3_URL}/${content}" alt="Image" class="chat-margin5 chat_image overlay-target js_chat_message" style="margin: 0;"/>
                  <a class="overlay" href="${cropArea.url}" style="display: none;"></a>
            </div>
            `;
      } else {
            rawHtml = `
            <div class="image-container" style="position: relative; display: inline-block; margin: 5px 0;" >
                  <img src="${config.S3_URL}/${content}" alt="Image" class="chat-margin5 chat_image js_chat_message" style="margin: 0;"/>
            </div>
            `;
      }

      return `
            <div class="chat__message-container-left">
                  <div class="chat__mesgae-main-left">
                        <img src=${icon_src} alt="" class="chat_users-icon-message" onerror="this.onerror=null; this.src='/img/user-icon.png';" id="icon_msg"> 
                        ${message_type === "text" || message_type === "broadcast_text" || message_type === "greeting_text" ? 
                        `<div class="chat__message-box-left chat-margin5 js_chat_message">${linkedMessage.replace(/\n/g, "<br>")}</div>` 
                        : 
                        `${rawHtml}`
                        }
                        <div class="chat__message-time-txt">${time}</div>
                  </div> 
            </div>
      `
}

export const createChatUserContainer = (sender_id, res) =>{
      const countDivStyle = document.getElementById("js_chatuser_id").value == sender_id || (res["unread_count"] == null || res["unread_count"] === 0) ? "none" : "flex";
      const countinnerHTML = document.getElementById("js_chatuser_id").value == sender_id || (res["unread_count"] == null || res["unread_count"] === 0) ? 0 : res["unread_count"];

      return `
            <a href="${config.CHAT_URL}/${res["id"]}/${document.getElementById("js_admin_id").value}" class="chat__users-list-wraper js_chat_wrapper" style="margin-top: 0" data-uuid="${sender_id}" data-id="${res["id"]}" data-admin-id="${document.getElementById("js_admin_id").value}">
                  <input type="hidden" name="admin_id" class="js_admin_el">
                  <input type="hidden" name="user_id" class="js_user_el">
                  <input type="hidden" name="token" class="js_token">
                  <img src=${res["user_picture"]} alt="" onerror="this.onerror=null; this.src='/img/user-icon.png';" class="chat_users-icon"> 
                  <div class="chat_users-list-flex">
                        <div class="chat_users-list-box" > 
                              <p class="chat_name_txt" data-simplebar>${res["line_name"]}</p>
                              <small class="chat_time js_update_message_time" data-id="${sender_id}">${res["latest_message_date"]}</small>
                        </div>  
                        <div class="chat__users-list-msg">
                              <small class="chat_message js_chatMessage_elment" data-id="${sender_id}">${res["latest_all_message"]}</small>
                              <div class="message_count js_mesage_count" data-id="${sender_id}" style="display:${countDivStyle}">${countinnerHTML}</div>
                        </div>
                  </div>
            </a>
      `
}
