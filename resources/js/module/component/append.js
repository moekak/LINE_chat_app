export const appendDiv = (className, type, msg, file_name, sender_id) =>{
    const parentElement = document.querySelector(`.${className}`)

<<<<<<< HEAD
=======



>>>>>>> c31d8813c9d90b9691a8cbbe8608a6b52398b8d4
    if(type == "admin"){
        if(file_name == "user"){
            appendLeft(msg, parentElement)
        }else if(file_name == "admin"){
            appendRight(msg, parentElement)
        }
    }

    if(type == "user"){
        if(file_name == "user"){
            appendRight(msg, parentElement)
        }else if(file_name == "admin" && sender_id == parentElement.getAttribute("data-id")){
            console.log("ey");
            appendLeft(msg, parentElement)
        }
    }
}



const appendRight = (msg, parentElement) =>{
    const newFirstDiv = document.createElement("div")
    newFirstDiv.classList.add("chat__message-container-right")

    const newSecondDiv = document.createElement("div")
    newSecondDiv.classList.add("chat__mesgae-main-right")

    const newThirdDiv = document.createElement("div");
    newThirdDiv.classList.add("chat__message-box-right")
    newThirdDiv.classList.add("chat-margin5")

    const formattedMsg = msg.replace(/\n/g, '<br>'); 
    newThirdDiv.innerHTML = formattedMsg

    newSecondDiv.appendChild(newThirdDiv);
    newFirstDiv.appendChild(newSecondDiv)
    parentElement.appendChild(newFirstDiv);

    const scroll_el = document.querySelector(".chat__message-main")
   scroll_el.scrollTop = scroll_el.scrollHeight

}
const appendLeft = (msg, parentElement) =>{
    const newFirstDiv = document.createElement("div")
    newFirstDiv.classList.add("chat__message-container-left")

    const newSecondDiv = document.createElement("div")
    newSecondDiv.classList.add("chat__mesgae-main-left")

    const iconMsg = document.getElementById("icon_msg").cloneNode(true)



    const newThirdDiv = document.createElement("div");
    newThirdDiv.classList.add("chat__message-box-left")
    newThirdDiv.classList.add("chat-margin5")

    const formattedMsg = msg.replace(/\n/g, '<br>'); 
    newThirdDiv.innerHTML = formattedMsg
    newSecondDiv.appendChild(iconMsg)
    newSecondDiv.appendChild(newThirdDiv);
    newFirstDiv.appendChild(newSecondDiv)
    parentElement.appendChild(newFirstDiv);


    const scroll_el = document.querySelector(".chat__message-main")
   scroll_el.scrollTop = scroll_el.scrollHeight
}



export const increateMessageCount = (sender_id, type) =>{

    if(type == "user") {
<<<<<<< HEAD
        // const parentElement = document.querySelector(".js_append_admin")
=======
        const parentElement = document.querySelector(".js_append_admin")
>>>>>>> c31d8813c9d90b9691a8cbbe8608a6b52398b8d4

        const count_elements =document.querySelectorAll(".js_mesage_count")
        count_elements.forEach((count)=>{
            let id = count.getAttribute("data-id");
            console.log(`id: ${id}`);
            console.log(`sender_id: ${sender_id}`);
            console.log(Number(id) == Number(sender_id));

            if(Number(id) == Number(sender_id)){
                let currentCount = Number(count.innerHTML) || 0

                if(currentCount == 0) count.style.display = "flex"
                count.innerHTML = `${currentCount + 1}`;
                console.log(count);
            }
        })
    }
  
<<<<<<< HEAD
}


export const displayMessage = (sender_id, msg) =>{

        const elements = document.querySelectorAll(".js_chatMessage_elment")
        elements.forEach((element)=>{
            let id = element.getAttribute("data-id")

            if (id == sender_id){

                element.innerHTML = msg
            }
        })

}


export const adjustMesageLength = () =>{
    const elements = document.querySelectorAll(".js_chatMessage_elment")
    elements.forEach((element)=>{
        if(element.innerHTML.length >= 40){
            element.innerHTML = element.innerHTML.substring(0, 40) + "..."
        }
    })
=======
>>>>>>> c31d8813c9d90b9691a8cbbe8608a6b52398b8d4
}