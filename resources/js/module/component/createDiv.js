export const createDiv = (parentNewDiv, userPicture, userName, sender_id, msg, message_type, totalCount, time)=>{
      
      // アイコンの作成
      const img = document.createElement("img");
      img.classList.add("chat_users-icon");
      img.setAttribute("src", userPicture);
      img.setAttribute("alt", "");

      //メッセージ箇所作成
      const chileDiv = document.createElement("div");
      chileDiv.classList.add("chat_users-list-flex");
      const grandChildDiv1 = document.createElement("div");
      grandChildDiv1.classList.add("chat_users-list-box");

      // チャットユーザーの名前の作成
      const p = document.createElement("p");
      p.innerHTML = userName;
      p.classList.add("chat_name_txt");

      // チャットメッセージ時間の作成
      const small = document.createElement("small");
      small.classList.add("chat_time");
      small.classList.add("js_update_message_time");
      small.setAttribute("data-id", sender_id);
      small.innerHTML = time;

      // append
      grandChildDiv1.appendChild(p);
      grandChildDiv1.appendChild(small);

      // #################
      const grandChildDiv2 = document.createElement("div");
      grandChildDiv2.classList.add("chat__users-list-msg");

      const smalltag = document.createElement("small");
      smalltag.classList.add("chat_message");
      smalltag.classList.add("js_chatMessage_elment");
      smalltag.setAttribute("data-id", sender_id);
      if (message_type == "text") smalltag.innerHTML = msg;
      if (message_type == "image")
          smalltag.innerHTML = "画像が送信されました";

      const countDiv = document.createElement("div");
      countDiv.classList.add("message_count");
      countDiv.classList.add("js_mesage_count");
      countDiv.setAttribute("data-id", sender_id);
      if (document.getElementById("js_chatuser_id").value == sender_id || totalCount == 0) {
          countDiv.style.display = "none";
          countDiv.innerHTML = 0;
      } else {
          countDiv.style.display = "flex";
          countDiv.innerHTML = totalCount;
      }

      // append
      grandChildDiv2.appendChild(smalltag);
      grandChildDiv2.appendChild(countDiv);

      chileDiv.appendChild(grandChildDiv1);
      chileDiv.appendChild(grandChildDiv2);

      parentNewDiv.appendChild(img);
      parentNewDiv.appendChild(chileDiv);

      console.log(parentNewDiv);
      


      return parentNewDiv
}