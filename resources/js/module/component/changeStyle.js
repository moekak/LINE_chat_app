export const changeTextareaHeight = () =>{
    const textarea = document.getElementById('js_msg');
    const height = textarea.clientHeight
    textarea.addEventListener('input', autoResize, false);
    
    function autoResize() {

        
        if(this.scrollHeight > height){
            console.log(this.scrollHeight);
                    
        this.style.height = 'auto'; // 高さをリセット
        this.style.height = this.scrollHeight + 'px'; // 内容に合わせて高さを設定
            
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
