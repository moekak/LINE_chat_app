import { fetchGetOperation, fetchPostOperation } from "../util/fetch.js";
import { createChatUserContainer, createLeftMessageContainer, createRightMessageContainer } from "./elementTemplate.js";
import { chatNavigator, scrollToBottom } from "./uiController.js";

// #####################################################################
//                メッセージをチャット画面に表示させる処理
// #####################################################################

//メッセージをチャット画面に表示する
// file_name = 呼び出し元ファイル
export const displayChatMessage = (className, type, msg, file_name, actual_sender_id, time, message_type, ids = []) => {
    const parentElement = document.querySelector(`.${className}`);
    const isSenderAdmin = type === "admin";
    const isFileFromUser = file_name === "user";
    const isSenderUser = type === "user";
    // 関数呼び出し元ファイルがadminでなおかつメッセージ送信者がユーザーの場合
    const isCorrectAdminMessage = file_name === "admin" && actual_sender_id === parentElement.getAttribute("data-id") //このdata-idはユーザーIDが入っている
    
    if(ids.includes(parentElement.getAttribute("data-id"))){
        return
    }
    
    if (isSenderAdmin && isFileFromUser) {
        addLeftChatMessage(msg, parentElement, time, message_type, ids);
    } else if (isSenderAdmin || (isSenderUser && isFileFromUser)) {
        addRightChatMessage(msg, parentElement, time, message_type, ids);
    } else if (isCorrectAdminMessage) {
        addLeftChatMessage(msg, parentElement, time, message_type, ids);
    }
};

// チャット画面右側(青)にメッセージを表示する処理
const addRightChatMessage = (content, parentElement, time, message_type) => {
    parentElement.innerHTML += createRightMessageContainer(message_type, time, content)
    scrollToBottom()

};
// チャット画面右側(白)にメッセージを表示する処理
const addLeftChatMessage = (content, parentElement, time, message_type) => {
    parentElement.innerHTML += createLeftMessageContainer(message_type, time, content)
    scrollToBottom()
};

// #####################################################################
//                               END
// #####################################################################


// #####################################################################
//                チャットユーザーリストの表示処理
// #####################################################################

// ユーザーからメッセージを受信したらリアルタイムで通知を増やし表示する処理
// そのユーザーのチャットを開いてる場合は除く
export const increaseMessageCount = (sender_id) => {

    const count_elements    = document.querySelectorAll(".js_mesage_count");
    const chat_user_id      = document.getElementById("js_chatuser_id").value;


    
    
    count_elements.forEach((count) => {
        let id = count.getAttribute("data-id");
      
        // メッセージを送信したユーザーが一覧に表示されて、なおかつそのゆざーのチャット画面を開いていない場合
        if (id == sender_id && id !== chat_user_id) {
            let currentCount = Number(count.innerHTML) || 0;
            if (currentCount == 0) count.style.display = "flex";
            count.innerHTML = `${currentCount + 1}`;
        }
    });
    
};

// 新しいメッセージをリアルタイムでチャットユーザーリストのメッセージ箇所に表示する
export const displayMessage = (sender_id,msg,sender_type,receiver_id,message_type) => {

    const elements = document.querySelectorAll(".js_chatMessage_elment");

    elements.forEach((element) => {
        // チャットユーザー一覧からチャットユーザーIDを取得
        let id = element.getAttribute("data-id");
        let chat_user_id = sender_type == "user" ? sender_id : receiver_id
        let txt = message_type == "image" ? (sender_type == "user" ? "画像が送信されました" : "画像を送信しました") : msg

        if (id == chat_user_id) element.innerHTML = txt

    });
};

// チャットユーザー一覧表示のメッセージ長さ制限処理
// 40文字以上だったら"..."にする
export const adjustMesageLength = () => {
    const elements = document.querySelectorAll(".js_chatMessage_elment");
    elements.forEach((element) => {
        if (element.innerHTML.length >= 40) {
            element.innerHTML = element.innerHTML.substring(0, 40) + "...";
        }
    });
};

// 新しいメッセージの時間をリアルタイムでチャットユーザーリストの時間箇所に表示する
export const updateMessageTime = (time,sender_id,sender_type,receiver_id, ids) => {
    const elements = document.querySelectorAll(".js_update_message_time");

    for(let element of elements){
        let id = element.getAttribute("data-id");
        if(ids.includes(id)) continue
        if(receiver_id){
            let chat_user_id = sender_type == "user" ? sender_id : receiver_id

            if (id == chat_user_id) element.innerHTML = time;
        }else{
            element.innerHTML = time;
        }
    }
};

// チャットユーザー一覧(左側)にユーザーがいなかったときに新しくdivタグを作りparentタグの一番最初に挿入する
const createNewDivElement = (receiver_id, sender_id, msg, message_type ) => {
    fetchGetOperation(`/api/users/${sender_id}/${receiver_id}`)
        .then((res) => {


            const parentElement = document.getElementById("js_chatUser_wrapper");
            const firstChild    = parentElement.firstChild; // 最初の子要素を取得
            if(res["userInfo"].length > 0){
                res["userInfo"].forEach((res)=>{

                    console.log(res);
                    
                    const template      = createChatUserContainer(sender_id, res, msg, message_type)

                    if(firstChild){
                        // 最初の子要素の前に直接HTMLを挿入
                        parentElement.insertAdjacentHTML('afterbegin', template);
                    }else{
                        parentElement.innerHTML += template  // 最初の子要素がない場合、末尾に追加
                    }
                })
            }


            chatNavigator();
        }
        
    );
};


// ユーザー検索処理
export const createDivForSearch = (data) =>{
    console.log(data);
    
    fetchPostOperation(data, "/api/search/users")
        .then((res) => {
            
            const parentElement = document.getElementById("js_chatUser_wrapper");
            parentElement.innerHTML = ""
            if(res["userInfo"].length > 0){
                res["userInfo"].forEach((res)=>{ 
                    let message_type = res["latest_message"]["content"] ? "text" : "image"
                    parentElement.innerHTML += createChatUserContainer(res["userUuid"], res, res["latest_message"]["content"], message_type)
                })
            
                chatNavigator();
            }

        });
}

export const updateUserListMessage = (ids) =>{
    const message_wrappers = document.querySelectorAll(".js_chatMessage_elment")

    message_wrappers.forEach((wrapper)=>{
        let id = wrapper.getAttribute("data-id")
        if(!ids.includes(id)){
            wrapper.innerHTML = "一斉メッセージを送信しました"
        }
    })

}


// チャットユーザーリストを更新
export const updateChatUserList = (receiver_id,msg,sender_id,message_type,sender_type,is_searching) => {

    const wrappers      = document.querySelectorAll(".js_chat_wrapper");
    const chat_wrapper  = document.getElementById("js_chatUser_wrapper");

    let firstChild = chat_wrapper.firstChild;
    let hasDiv = false;

    // 開いているチャットユーザーが送信者と同じ場合は処理を中止
    if(document.getElementById("js_chatuser_id").value == sender_id){
        return;
    }
    
    // 検索中でない場合の処理
    if (!is_searching.flag) {
        // 既にチャットリストに送信者のリストがある場合の処理
        for (let wrapper of wrappers) {
            let user_id = wrapper.getAttribute("data-uuid");
            let chat_user_id = sender_type === "admin" ? receiver_id : sender_id;

            if (chat_user_id === user_id && wrappers.length > 0) {
                
                hasDiv = true;

                // div要素をcloneして親要素の一番最初に挿入
                const newDiv = wrapper.cloneNode(true);
                chat_wrapper.insertBefore(newDiv, firstChild);

                // 元の要素を削除
                if (wrapper.parentNode == chat_wrapper) {
                    chat_wrapper.removeChild(wrapper);
                }
                break; // 早期リターン
            }
        }

        // 新しい要素が必要な場合
        if (!hasDiv && firstChild) {
            createNewDivElement(receiver_id, sender_id, msg, message_type);
        }
    }

    // チャットナビゲーションを更新
    chatNavigator();
};



