export const changeTextareaHeight = () =>{
    const textarea = document.getElementById('js_msg');
    const height = textarea.clientHeight
    textarea.addEventListener('input', autoResize, false);
    
    function autoResize() {
        if(this.scrollHeight > height){
            this.style.height = 'auto'; // 高さをリセット
            this.style.maxHeight = "200px"
            this.style.height = this.scrollHeight + 'px'; // 内容に合わせて高さを設定
            document.querySelector(".chat__form-flex").style.alignItems = "end"
        }else{
            document.querySelector(".chat__form-flex").style.alignItems = "center"
        }
    }
}


export const disableSubmitBtn = () =>{
    const field = document.getElementById("js_msg")
    const btn = document.querySelector(".chat__form-submit")

    field.addEventListener("input", (e)=>{
        let value = e.currentTarget.value

        if(value.length > 0){
            btn.classList.remove("disable_btn")
        }else{
            btn.classList.add("disable_btn")
        }
    })
}
