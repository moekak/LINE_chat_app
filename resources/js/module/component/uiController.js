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

export const fileOperation = (socket, sender_id, url, user_type)=>{
   const fileInput = document.getElementById("fileInput")
   fileInput.addEventListener("change", (e)=>{

    console.log("moeka");
    
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
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 画像のサイズを制御する。例えば幅を500pxにリサイズ。
            const maxWidth = 160;
            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 圧縮した画像をBase64に変換
            const resizedImage = canvas.toDataURL('image/jpeg', 0.7); // JPEG形式で圧縮率70%
            

            const receiver_id = document.getElementById("js_receiver_id").value
            const sender_type = document.getElementById("js_sender_type").value
            let data = {}

            if(user_type == "user"){
                data = {
                    "user_id" :  sender_id,
                    "admin_id":receiver_id,
                    "type" : sender_type,
                    "image":resizedImage
                }
            }else if(user_type == "admin"){
                data = {
                    "user_id" :  receiver_id,
                    "admin_id":sender_id,
                    "type" : sender_type,
                    "image":resizedImage
                }
            }
            console.log(url);
            
            fetchPostOperation(data, url)
            .then((res)=>{

                console.log(res);
                
                const time = res["created_at"]
                const message_id = res["message_id"]
                // // ここでサーバーに送信
                socket.emit('send_image', {resizedImage, receiver_id, sender_id, sender_type, time, message_id});
            })
         
        };
    };

    reader.readAsDataURL(file);
        
   })
}


