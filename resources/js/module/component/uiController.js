import { fetchPostOperation } from "../util/fetch";


// 特定のチャットユーザー画面を開く
export const chatNavigator = () =>{
    const chat_btns = document.querySelectorAll(".js_chat_wrapper");

    chat_btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let id = e.currentTarget.getAttribute("data-id");
            let admin_id = e.currentTarget.getAttribute("data-admin-id");
            window.location.href = `/${admin_id}/${id}`;
        });
    });
}


export const scrollToBottom = () => {
    setTimeout(() => {
        const scroll_el = document.querySelector(".chat__message-main");
        console.log(scroll_el.scrollHeight);
        
        if (scroll_el) {
            scroll_el.scrollTo({
                top: scroll_el.scrollHeight,
                behavior: 'auto'
            });
        }
    }, 300);
};


export const fileOperation = (socket, sender_id, url, sender_type)=>{
    const file = fileInput.files[0]
    const reader = new FileReader();
    const maxSizeMB = 5;

    if(file.size > maxSizeMB * 1024 *1024){
        alert("ファイルサイズは5MBにしてください。")
        return
    }

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function() {
            const resizedImage = e.target.result; 
            // 呼び出し元のファイルがユーザーの場合 => ユーザーID
            // 呼び出し元のファイルが管理者の場合   => 管理者ID
            const receiver_id = document.getElementById("js_receiver_id").value

            let data = {}

            if(sender_type == "user"){
                data = {
                    "user_id" :  sender_id,
                    "admin_id":receiver_id,
                    "type" : sender_type,
                    "image":resizedImage
                }
            }else if(sender_type == "admin"){

                data = {
                    "user_id" :  receiver_id,
                    "admin_id":sender_id,
                    "type" : sender_type,
                    "image":resizedImage
                }
            }
            
            fetchPostOperation(data, url)
            .then((res)=>{

                const time = res["created_at"]
                const message_id = res["message_id"]
                const admin_login_id = res["admin_login_id"];
                // // ここでサーバーに送信
                socket.emit('send_image', {resizedImage, receiver_id, sender_id, sender_type, time, message_id, admin_login_id});
            })
        };
    };
    reader.readAsDataURL(file);
}


