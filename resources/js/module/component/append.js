import { fetchGetOperation, fetchPostOperation } from "../util/fetch";

export const appendDiv = (className, type, msg, file_name, sender_id, time) => {
    const parentElement = document.querySelector(`.${className}`);

    if (type == "admin") {
        if (file_name == "user") {
            appendLeft(msg, parentElement, time);
        } else if (file_name == "admin") {
            appendRight(msg, parentElement, time);
        }
    }

    if (type == "user") {
        if (file_name == "user") {
            appendRight(msg, parentElement, time);
        } else if (
            file_name == "admin" &&
            sender_id == parentElement.getAttribute("data-id")
        ) {
            console.log("ey");
            appendLeft(msg, parentElement, time);
        }
    }
};

const appendRight = (msg, parentElement, time) => {
    const newFirstDiv = document.createElement("div");
    newFirstDiv.classList.add("chat__message-container-right");

    const newSecondDiv = document.createElement("div");
    newSecondDiv.classList.add("chat__mesgae-main-right");

    const newThirdDiv = document.createElement("div");
    newThirdDiv.classList.add("chat__message-box-right");
    newThirdDiv.classList.add("chat-margin5");

    const formattedMsg = msg.replace(/\n/g, "<br>");
    newThirdDiv.innerHTML = formattedMsg;

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
const appendLeft = (msg, parentElement, time) => {
    const newFirstDiv = document.createElement("div");
    newFirstDiv.classList.add("chat__message-container-left");

    const newSecondDiv = document.createElement("div");
    newSecondDiv.classList.add("chat__mesgae-main-left");

    let iconMsg;
    if (document.getElementById("icon_msg") !== null) {
        iconMsg = document.getElementById("icon_msg").cloneNode(true);
        console.log(iconMsg);
        console.log(typeof iconMsg);
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
    newThirdDiv.classList.add("chat__message-box-left");
    newThirdDiv.classList.add("chat-margin5");

    const newTimeDiv = document.createElement("div");
    newTimeDiv.classList.add("chat__message-time-txt");
    newTimeDiv.innerHTML = time;

    const formattedMsg = msg.replace(/\n/g, "<br>");
    newThirdDiv.innerHTML = formattedMsg;
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

export const displayMessage = (sender_id, msg, sender_type, receiver_id) => {
    const elements = document.querySelectorAll(".js_chatMessage_elment");
    elements.forEach((element) => {
        let id = element.getAttribute("data-id");
        if (sender_type == "user") {
            if (id == sender_id) {
                element.innerHTML = msg;
            }
            // 管理者からメッセージが送信された場合
        } else {
            if (id == receiver_id) {
                element.innerHTML = msg;
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

const createDivElement = (id,receiver_id,msg,time,message_id,sender_id) => {
    return new Promise((resolve) => {
        console.log(sender_id);

        const parentNewDiv = document.createElement("div");
        parentNewDiv.classList.add("chat__users-list-wraper");
        parentNewDiv.classList.add("js_chat_wrapper");
        parentNewDiv.setAttribute("data-id", id);
        parentNewDiv.setAttribute("data-admin-id", receiver_id);
        parentNewDiv.style.marginTop = "0";

        fetchGetOperation(`/api/users/${sender_id}`).then((res) => {
            console.log(res);
            // アイコン
            const img = document.createElement("img");
            img.classList.add("chat_users-icon");
            img.setAttribute("src", res["user_picture"]);
            img.setAttribute("alt", "");

            //
            const chileDiv = document.createElement("div");
            chileDiv.classList.add("chat_users-list-flex");

            const grandChildDiv1 = document.createElement("div");
            grandChildDiv1.classList.add("chat_users-list-box");

            const p = document.createElement("p");
            p.innerHTML = res["line_name"];
            p.classList.add("chat_name_txt");

            const small = document.createElement("small");
            small.classList.add("chat_time");
            small.classList.add("js_update_message_time");
            small.setAttribute("data-id", id);
            small.innerHTML = "17:20";

            // append
            grandChildDiv1.appendChild(p);
            grandChildDiv1.appendChild(small);

            // #################
            const grandChildDiv2 = document.createElement("div");
            grandChildDiv2.classList.add("chat__users-list-msg");

            const smalltag = document.createElement("small");
            smalltag.classList.add("chat_message");
            smalltag.classList.add("js_chatMessage_elment");
            smalltag.setAttribute("data-id", id);
            smalltag.innerHTML = msg;

            const countDiv = document.createElement("div");
            countDiv.classList.add("message_count");
            countDiv.classList.add("js_mesage_count");
            countDiv.setAttribute("data-id", id);
            countDiv.style.display = "none";
            countDiv.innerHTML = 0;

            // append
            grandChildDiv2.appendChild(smalltag);
            grandChildDiv2.appendChild(countDiv);

            chileDiv.appendChild(grandChildDiv1);
            chileDiv.appendChild(grandChildDiv2);

            parentNewDiv.appendChild(img);
            parentNewDiv.appendChild(chileDiv);

            resolve(parentNewDiv);
        });
    });
};

export const updateUserDataElement = (
    id,
    receiver_id,
    msg,
    time,
    message_id,
    sender_id
) => {
    console.log(sender_id);

    const wrappers = document.querySelectorAll(".js_chat_wrapper");
    const chat_wrapper = document.getElementById("js_chatUser_wrapper");
    let firstChild = chat_wrapper.firstChild;

    console.log(firstChild);

    

    // createDivElement(id, receiver_id, msg, time, message_id, sender_id)
    //     .then((wrapper) => {
    //         if (firstChild) {
    //             chat_wrapper.insertBefore(wrapper, firstChild);
    //         } else {
    //             chat_wrapper.appendChild(wrapper);
    //         }
    //     })
    //     .catch(error => console.error("Failed to create element:", error));
 

    let hasDiv = false;
    wrappers.forEach((wrapper) => {
        let user_id = wrapper.getAttribute("data-id");

        if (id == user_id && Array.from(wrappers.length > 0)) {
            hasDiv = true;

            const newDiv = wrapper.cloneNode(true);

            chat_wrapper.insertBefore(newDiv, firstChild);
            if (wrapper.parentNode == chat_wrapper) {
                chat_wrapper.removeChild(wrapper);
            }
        }

        const chat_btns = document.querySelectorAll(".js_chat_wrapper");

        chat_btns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                let id = e.currentTarget.getAttribute("data-id");
                let admin_id = e.currentTarget.getAttribute("data-admin-id");
                window.location.href = `/${admin_id}/${id}`;
            });
        });
    });

    console.log(hasDiv);

    if (!hasDiv && firstChild !== undefined) {
        createDivElement(id, receiver_id, msg, time, message_id, sender_id)
        .then((wrapper) => {
         
            chat_wrapper.insertBefore(wrapper, firstChild);
           
        })
        .catch(error => console.error("Failed to create element:", error));
    }
};
