import { fetchGetOperation, fetchPostOperation } from "../util/fetch";
import { createDiv } from "./createDiv.js";
import { chatNavigator } from "./uiController.js";

export const appendDiv = (
    className,
    type,
    msg,
    file_name,
    sender_id,
    time,
    message_type
) => {
    const parentElement = document.querySelector(`.${className}`);

    if (type == "admin") {
        if (file_name == "user") {
            appendLeft(msg, parentElement, time, message_type);
        } else if (file_name == "admin") {
            appendRight(msg, parentElement, time, message_type);
        }
    }

    if (type == "user") {
        if (file_name == "user") {
            appendRight(msg, parentElement, time, message_type);
        } else if (
            file_name == "admin" &&
            sender_id == parentElement.getAttribute("data-id")
        ) {
            console.log("ey");
            appendLeft(msg, parentElement, time, message_type);
        }
    }
};

const appendRight = (msg, parentElement, time, message_type) => {
    console.log("appendright");

    const newFirstDiv = document.createElement("div");
    newFirstDiv.classList.add("chat__message-container-right");

    const newSecondDiv = document.createElement("div");
    newSecondDiv.classList.add("chat__mesgae-main-right");

    const newThirdDiv = document.createElement("div");
    newThirdDiv.classList.add("chat-margin5");

    if (message_type == "text") {
        newThirdDiv.classList.add("chat__message-box-right");
        
        const formattedMsg = msg.replace(/\n/g, "<br>");
        newThirdDiv.innerHTML = formattedMsg;
    } else {
        const img = document.createElement("img");
        img.setAttribute("src", msg);
        img.setAttribute("alt", "");
        newThirdDiv.appendChild(img);
    }

    const newTimeDiv = document.createElement("div");
    newTimeDiv.classList.add("chat__message-time-txt");
    newTimeDiv.innerHTML = time;

    newSecondDiv.appendChild(newTimeDiv);
    newSecondDiv.appendChild(newThirdDiv);

    newFirstDiv.appendChild(newSecondDiv);
    parentElement.appendChild(newFirstDiv);

    const scroll_el = document.querySelector(".chat__message-main");
    scroll_el.scrollTop = scroll_el.scrollHeight;
};
const appendLeft = (msg, parentElement, time, message_type) => {
    const newFirstDiv = document.createElement("div");
    newFirstDiv.classList.add("chat__message-container-left");

    const newSecondDiv = document.createElement("div");
    newSecondDiv.classList.add("chat__mesgae-main-left");

    let iconMsg;
    if (document.getElementById("icon_msg") !== null) {
        iconMsg = document.getElementById("icon_msg").cloneNode(true);

        

    } else {
        iconMsg = document.createElement("img");
        // 画像のURLとその他の属性を設定
        const src = document.getElementById("js_user_icon_img").value;
        iconMsg.setAttribute("src", src);
        iconMsg.setAttribute("alt", "");
        iconMsg.setAttribute("class", "chat_users-icon-message");
        iconMsg.setAttribute("id", "icon_msg");
    }

    const newThirdDiv = document.createElement("div");
    newThirdDiv.classList.add("chat-margin5");

    if (message_type == "text") {
        newThirdDiv.classList.add("chat__message-box-left");
        const formattedMsg = msg.replace(/\n/g, "<br>");
        newThirdDiv.innerHTML = formattedMsg;
    } else {
        const img = document.createElement("img");
        img.setAttribute("src", msg);
        img.setAttribute("alt", "");
        newThirdDiv.appendChild(img);
    }

    const newTimeDiv = document.createElement("div");
    newTimeDiv.classList.add("chat__message-time-txt");
    newTimeDiv.innerHTML = time;

    newSecondDiv.appendChild(iconMsg);
    newSecondDiv.appendChild(newThirdDiv);
    newSecondDiv.appendChild(newTimeDiv);
    newFirstDiv.appendChild(newSecondDiv);
    parentElement.appendChild(newFirstDiv);

    const scroll_el = document.querySelector(".chat__message-main");
    scroll_el.scrollTop = scroll_el.scrollHeight;
};

export const increateMessageCount = (sender_id, type) => {
    if (type == "user") {
        // const parentElement = document.querySelector(".js_append_admin")

        const count_elements = document.querySelectorAll(".js_mesage_count");
        const chat_user_id = document.getElementById("js_chatuser_id").value;
        count_elements.forEach((count) => {
            let id = count.getAttribute("data-id");

            if (
                Number(id) == Number(sender_id) &&
                Number(id) !== Number(chat_user_id)
            ) {
                let currentCount = Number(count.innerHTML) || 0;

                if (currentCount == 0) count.style.display = "flex";
                count.innerHTML = `${currentCount + 1}`;
                console.log(count);
            }
        });
    }
};

export const displayMessage = (
    sender_id,
    msg,
    sender_type,
    receiver_id,
    message_type
) => {

    console.log(msg + "message");
    
    const elements = document.querySelectorAll(".js_chatMessage_elment");
    elements.forEach((element) => {
        let id = element.getAttribute("data-id");
        if (sender_type == "user") {
            if (id == sender_id) {
                if (message_type == "text") element.innerHTML = msg;
                if (message_type == "image")
                    element.innerHTML = "画像が送信されました";
            }
            // 管理者からメッセージが送信された場合
        } else {
            if (id == receiver_id) {
                if (message_type == "text") element.innerHTML = msg;
                if (message_type == "image")
                    element.innerHTML = "画像を送信しました";
            }
        }
    });
};

export const adjustMesageLength = () => {
    const elements = document.querySelectorAll(".js_chatMessage_elment");
    elements.forEach((element) => {
        if (element.innerHTML.length >= 40) {
            element.innerHTML = element.innerHTML.substring(0, 40) + "...";
        }
    });
};

// 管理者用チャット画面の左側の各メッセージの時間を更新する
export const updateMessageTime = (
    time,
    sender_id,
    sender_type,
    receiver_id
) => {
    const elements = document.querySelectorAll(".js_update_message_time");

    elements.forEach((element) => {
        let id = element.getAttribute("data-id");

        // ユーザーからメッセージが送信された場合
        if (sender_type == "user") {
            if (id == sender_id) {
                element.innerHTML = time;
            }
            // 管理者からメッセージが送信された場合
        } else {
            if (id == receiver_id) {
                element.innerHTML = time;
            }
        }
    });
};

const createDivElement = (
    receiver_id,
    msg,
    sender_id,
    message_type
) => {

    return new Promise((resolve) => {
        const parentNewDiv = document.createElement("div");
        parentNewDiv.classList.add("chat__users-list-wraper");
        parentNewDiv.classList.add("js_chat_wrapper");
        parentNewDiv.setAttribute("data-id", sender_id);
        parentNewDiv.setAttribute("data-admin-id", receiver_id);
        parentNewDiv.style.marginTop = "0";

        fetchGetOperation(`/api/users/${sender_id}/${receiver_id}`)
            .then((res) => {
                console.log(res);
                
                
                const newDiv = createDiv(parentNewDiv, res["userInfo"]["user_picture"], res["userInfo"]["line_name"], sender_id, msg, message_type, res["totalCount"], res["formatted_date"])
                resolve(newDiv)

            }
            
        );
    });
};


export const createDivForSearch = (data, sender_id) =>{

        let chat_wrapper = document.getElementById("js_chatUser_wrapper");
        

        fetchPostOperation(data, "/api/search/users")
            .then(
                (res) => {
                    console.log(res);
                    

                    chat_wrapper.innerHTML = "";

                    
                    res["userData"].forEach((res)=>{
                        let message_type;
                        if(res["message"]["content"]){
                            message_type = "text"
                        }else{
                            message_type = "image"
                        }
                        const parentNewDiv = document.createElement("div");
                        parentNewDiv.classList.add("chat__users-list-wraper");
                        parentNewDiv.classList.add("js_chat_wrapper");
                        parentNewDiv.setAttribute("data-id", res["userData"]["id"]);
                        parentNewDiv.setAttribute("data-admin-id", sender_id);
                        parentNewDiv.style.marginTop = "0";
                        let firstChild = chat_wrapper.firstChild;
                         const newDiv = createDiv(parentNewDiv, res["userData"]["user_picture"], res["userData"]["line_name"], res["userData"]["id"], res["message"]["content"], message_type, res["count"], res["formattedData"]) 
        
                        
                         if(firstChild == undefined){
                            chat_wrapper.appendChild(newDiv)
                         }else{
                            chat_wrapper.insertBefore(newDiv, firstChild);
                         }
                         
                        chatNavigator();
                            
                        })
                            
                   
                }
            );
    
}

export const updateUserDataElement = (
    receiver_id,
    msg,
    sender_id,
    message_type,
    sender_type,
    is_searching
) => {


    


    
    const wrappers = document.querySelectorAll(".js_chat_wrapper");
    const chat_wrapper = document.getElementById("js_chatUser_wrapper");
    let firstChild = chat_wrapper.firstChild;
    let hasDiv = false;


   if(document.getElementById("js_chatuser_id").value == sender_id){
    return;
   }
    
    wrappers.forEach((wrapper) => {
  
        
        let user_id = wrapper.getAttribute("data-id");
        if(!is_searching["flag"]){
            if (sender_type == "admin") {
                if (receiver_id == user_id && Array.from(wrappers.length > 0)) {
                    hasDiv = true;

                    const newDiv = wrapper.cloneNode(true);

                    chat_wrapper.insertBefore(newDiv, firstChild);
                    if (wrapper.parentNode == chat_wrapper) {
                        chat_wrapper.removeChild(wrapper);
                    }
                }
            }else{
 
                if (sender_id == user_id && Array.from(wrappers.length > 0)) {
                    hasDiv = true;

                    const newDiv = wrapper.cloneNode(true);

                    chat_wrapper.insertBefore(newDiv, firstChild);
                    
                    if (wrapper.parentNode == chat_wrapper) {
                        chat_wrapper.removeChild(wrapper);
                    }
                }
            }
            chatNavigator();
        }
    
        

       
    });

    if (!hasDiv && firstChild !== undefined && !is_searching["flag"]) {

        
        createDivElement(
            receiver_id,
            msg,
            sender_id,
            message_type
        )
            .then((wrapper) => {
                chat_wrapper.insertBefore(wrapper, firstChild);
                chatNavigator();
            })
            .catch((error) =>
                console.error("Failed to create element:", error)
            );
    }
};



