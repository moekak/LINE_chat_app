import { API_ENDPOINTS } from "../../../config/apiEndPoints";
import Fetch from "../../util/api/Fetch";
import { createChatUserContainer } from "../templates/elementTemplate";
import ChatUIHelper from "./ChatUIHelper";

/**
 * ChatSearchController
 * チャット画面で検索をするさいのロジックを管理するクラス
 */
class ChatSearchController{
    /**
     * ユーザー検索処理
     * 
     * 指定されたデータを基にユーザー検索 API を呼び出し、結果を DOM に表示。
     * 
     * @param {object} data - 検索リクエスト用データ (例: { admin_id: string, text: string })
     *   - admin_id: 検索を実行する管理者の ID
     *   - text: 検索対象のユーザー名
     * 
     * @returns {Promise<void>} - 非同期処理のため Promise を返します。
    */
    static async createDivForSearch(data){

        const response = await Fetch.fetchPostOperation(data, API_ENDPOINTS.SEARCH_USERS)
        const parentElement = document.getElementById("js_chatUser_wrapper");

        if(response.length > 0){
            parentElement.innerHTML = ""
            response.forEach((res)=>{ 
                if(res["latest_all_message"] !== null){
                    parentElement.innerHTML += createChatUserContainer(res["entity_uuid"], res)
                }
                
            })
            ChatUIHelper.chatNavigator()
        }else{
            parentElement.innerHTML = '<p class="text_info">ユーザーが見つかりませんでした</p>'
        }
    }
}


export default ChatSearchController;