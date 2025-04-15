import { API_ENDPOINTS } from "../../../config/apiEndPoints";
import config from "../../../config/config";
import Fetch from "../../util/api/Fetch";


const MAX_HEIGHT = "200px"
/**
 * FromController
 * formの処理に関するロジックをまとめたクラス
 */
class FromController{

    /**
     * inputタグの高さを文字の長さにあわせて変更する処理
     */
    static changeTextareaHeight (){
        const textarea = document.getElementById('js_msg');
        const height = textarea.clientHeight
        textarea.addEventListener('input', autoResize, false);
        
        function autoResize() {
            if(this.scrollHeight > height){
                this.style.height = 'auto'; // 高さをリセット
                this.style.maxHeight = MAX_HEIGHT
                this.style.height = this.scrollHeight + 'px'; // 内容に合わせて高さを設定
                document.querySelector(".chat__form-flex").style.alignItems = "end"
            }else{
                document.querySelector(".chat__form-flex").style.alignItems = "center"
            }
        }
    }

    /**
     * ユーザーから入力があったか否かで、ボタンのスタイルを変更
     */
    static disableSubmitBtn(){
        const field = document.getElementById("js_msg")
        const btn = document.querySelector(".chat__form-submit")
    
        field.addEventListener("input", (e)=>{
            let value = e.currentTarget.value
    
            if(value.length > 0){
                btn.classList.remove("disabled_btn")
            }else{
                btn.classList.add("disabled_btn")
            }
        })
    }

    /**
     * 指定された情報を基にフォームを生成してリダイレクトを実行
     *
     * @param {string} adminId - 管理者ID
     * @param {string} userId - ユーザーID
     */
    async submitRedirectForm(adminId, userId){
        const token = await Fetch.fetchGetOperation(API_ENDPOINTS.GENERATE_TOKEN);
        const form = document.createElement("form");
        form.method = "POST";
        form.action = config.CHAT_URL;
        form.style.visibility = "hidden";
        form.enctype = "application/x-www-form-urlencoded";
    
        form.appendChild(this.#createHiddenInput("token", token));
        form.appendChild(this.#createHiddenInput("admin_id", adminId));
        form.appendChild(this.#createHiddenInput("user_id", userId));
    
        document.body.appendChild(form);
        form.submit();
    };
    
    /**
     * ユーティリティ関数: 隠し input 要素を作成
     * @param {string} name - input 名称
     * @param {string} value - input 値
     * @returns {HTMLElement} - 作成された input 要素
     */
    #createHiddenInput(name, value){
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        return input;
    };


    /**
     * 画像リンク作成モーダルで毎回開いたときの初期化
     */
    static resetCropperUIElements(){
        const urlInput = document.getElementById("js_url_input")
        const selectBtn = document.getElementById("js_change_area")
        const previewBtn = document.getElementById("js_preview_submit_btn")
        const choices = document.getElementsByName('choice');
        const setting = document.getElementById("js_url_setting")

        choices.forEach((choice)=>{
            if(choice.value == "off") choice.checked = true
        })

        setting.classList.add("hidden")
        urlInput.value = "";
        selectBtn.innerHTML = "選択範囲確定"
        selectBtn.style.backgroundColor = "#fff"
        selectBtn.classList.add("disabled_btn")
        previewBtn.classList.remove("disabled_btn")
    }

    static showCropperSetting(){
        const setting = document.getElementById("js_url_setting")
        setting.classList.remove("hidden")
        document.getElementById("js_preview_submit_btn").classList.add("disabled_btn")

        const checkOff = document.getElementById("flexRadioDefault1")
        const checkOn = document.getElementById("flexRadioDefault2")

        checkOff.checked = false
        checkOn.checked = true

    }
}

export default FromController;