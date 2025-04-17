export default class InitializeTemplate{
      static initialize(){
            document.querySelectorAll(".template-card").forEach((card)=> card.classList.remove("selected"))
            document.querySelectorAll(".select-btn").forEach((card)=> card.classList.remove("selected"))
            document.querySelectorAll(".select-btn").forEach((card)=> card.innerHTML = "選択")
            document.querySelector(".selected-templates-chat").style.dispay = "none"
            document.querySelector(".selected-templates-messages").innerHTML = ""
            document.querySelector(".use-all-templates-btn").innerHTML = "選択したテンプレートを使用 (0)"
            document.querySelector(".use-all-templates-btn").disabled = true
      }
}