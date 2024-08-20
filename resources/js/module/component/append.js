export const appendDiv = (className, type, msg, file_name) =>{
    const parentElement = document.querySelector(`.${className}`)

    console.log(`タイプは${type}`);



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
        }else if(file_name == "admin"){
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

    newThirdDiv.innerHTML = msg

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

    newThirdDiv.innerHTML = msg
    newSecondDiv.appendChild(iconMsg)
    newSecondDiv.appendChild(newThirdDiv);
    newFirstDiv.appendChild(newSecondDiv)
    parentElement.appendChild(newFirstDiv);


    const scroll_el = document.querySelector(".chat__message-main")
   scroll_el.scrollTop = scroll_el.scrollHeight
}
