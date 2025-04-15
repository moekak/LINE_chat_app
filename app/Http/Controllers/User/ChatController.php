<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AdminMessageRead;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\LineDisplayText;
use App\Models\PageTitle;
use App\Models\UserEntity;
use App\Services\Message\Admin\AdminMessageReadManager;
use App\Services\Message\Common\MessageAggregationService;
use App\Services\Message\Common\MessageService;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function index($adminId, $userId)
    {
        
        // インスタンスの作成
        $messageService = new MessageService();
        $messageAggregationService = new MessageAggregationService();
        $second_account_url = "";
    

        // 管理者アカウント情報を取得する
        $admin_info = LineAccount::leftJoin("second_accounts", "second_accounts.current_account_id", "=", "line_accounts.id")
                        ->where("line_accounts.account_id", $adminId)
                        ->select(
                            "line_accounts.id as line_account_id",
                            "line_accounts.*",
                            "second_accounts.*"
                        )->first();

        if($admin_info == null){
            return response()->view('errors.403');
        }

        if($admin_info->second_account_id){
            $second_account_url = LineAccount::where("id", $admin_info->second_account_id)->value("account_url");  
        }
        
        // ユーザーアカウント情報を取得する
        $user_id = ChatUser::where("user_id", $userId)->where("account_id", $admin_info["line_account_id"])->first();
        $lineDisplayText = LineDisplayText::where("admin_id", $admin_info["line_account_id"])->where("is_show", "1")->value("text");

        // user_idがないときは404エラーを表示させる
        if (!$user_id) {
            return response()->view('errors.403');
        }

        // 未読数を取得する
        $unread_message_data = AdminMessageRead::where("admin_account_id", $admin_info["line_account_id"])->where("chat_user_id", $user_id["id"])->select("last_unread_message_id", "last_message_type", "unread_count")->first();

        $messages = $messageAggregationService->getUnifiedSortedMessages($user_id["id"], $admin_info["line_account_id"], "user", 0);
        $group_message  = $messageService->groupMessagesByDate($messages);

        // 既読管理の処理
        // 0はチャットIDを入れる必要がないから、0に指定
        AdminMessageReadManager::updateOrCreateAdminReadStatus($user_id["id"], $admin_info["line_account_id"], 0, "text", 0);

        // uuidを取得する
        $uuid_admin = UserEntity::where("entity_type", "admin")->where("related_id", $admin_info["line_account_id"])->value("entity_uuid");
        $uuid_user  = UserEntity::where("entity_type", "user")->where("related_id", $user_id["id"])->value("entity_uuid");
        $title = PageTitle::where("admin_id", $admin_info["line_account_id"])->value("title");

        return view("user.chat", ["line_display_text" => $lineDisplayText,"title" => $title, "admin_info" => $admin_info, "user_id" => $user_id, "group_message" => $group_message, "uuid_user"=>  $uuid_user, "uuid_admin" => $uuid_admin, "second_account_url" => $second_account_url, "unread_message_id" =>  $unread_message_data->last_unread_message_id ?? null, "last_message_type" =>  $unread_message_data->last_message_type ?? null,"unread_count" => $unread_message_data->unread_count ?? 0 ]);
    }

    public function fetchChatMessageByScroll($start, $userUuid, $adminUuid){
        try{

            // // インスタンスの作成
            $messageService = new MessageService();
            $messageAggregationService = new MessageAggregationService();

            // ユーザーアカウント情報を取得する
            $user_id  = UserEntity::where("entity_type", "user")->where("entity_uuid", $userUuid)->value("related_id");
            $admin_id  = UserEntity::where("entity_type", "admin")->where("entity_uuid", $adminUuid)->value("related_id");
            $messages = $messageAggregationService->getUnifiedSortedMessages($user_id, $admin_id, "user", $start);
            $group_message  = $messageService->groupMessagesByDate($messages);

              // 正しいJSON形式でレスポンスを返す
        return response()->json([$group_message]);
        }catch (\Exception $e){
        }
    }
}
