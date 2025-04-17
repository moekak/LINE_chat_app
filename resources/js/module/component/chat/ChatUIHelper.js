import FromController from "../ui/FormController.js";


const DELAY_TIME = 500
const MAX_LENGTH = 30

/**
 * ChatUIHelper
 * チャット機能の関連するUIの更新を管理するクラス
 */
class ChatUIHelper{
    /**
     * チャット画面を開いたときに一番下までスクロールする
     */
    static scrollToBottom(){
        setTimeout(() => {
            const scroll_el = document.querySelector(".chat__message-main");
            if (scroll_el) {
                scroll_el.scrollTo({
                    top: scroll_el.scrollHeight,
                    behavior: 'auto'
                });
            }
        }, DELAY_TIME);
    };



    /**
     * メッセージの長さ制限処理
     * 指定した文字数以上の場合は省略記号 "..." を付ける
     * @param {String} text - 省略記法を適応する文字列
     * @returns {String} -　フォーマットした文字列を返す
     */
    static adjustMesageLength(text){

        const formattedText = text.replace(/[\n\r]|<br>/g, '');
        if (formattedText.length >= MAX_LENGTH) {
            return formattedText.substring(0, MAX_LENGTH) + "...";
        }else{
            return formattedText
        }
    };

    /**
     * 現在のユーザーが指定したUUIDと一致するかを判定
     * @param {string} sender_uuid - 判定対象のユーザーUUID(例：00bd10de-18dc-4d00-be56-02e5d12b03b2)
     * @returns {boolean} 一致する場合はtrue、それ以外はfalse
     */
    static isCurrentUser(sender_uuid) {
        const user_uuid = document.getElementById("js_chatuser_id")?.value || null;
        return user_uuid === sender_uuid;
    }

    static isCurrentAmdin(sender_uuid, receiver_uuid){
        const admin_uuid = document.getElementById("js_uuid")?.value || null;
        const user_uuid = document.getElementById("js_chatuser_id")?.value || null
        return (admin_uuid === sender_uuid && user_uuid === receiver_uuid);
    }
}

export default ChatUIHelper;