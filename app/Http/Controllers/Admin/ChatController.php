<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BackgroundColor;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\MessageTemplateContent;
use App\Models\MessageTemplatesCategory;
use App\Models\UserMessageRead;
use App\Services\Message\Common\MessageAggregationService;
use App\Services\Message\Common\MessageService;
use App\Services\Message\User\UserMessageReadManager;
use App\Services\Util\EntityUuidResolver;
use Illuminate\Http\Request;


class ChatController extends Controller
{

    public function index($userId, $adminId)
    {   

        if (session()->has('userID')) {
            $userId = session('userID');
            $url = config('services.chat') . "/admin/chat/{$userId}/{$adminId}";
            return redirect($url);
        }
        // インスタンスの作成
        $messageService             = new MessageService();
        $messageAggregationService  = new MessageAggregationService();

        // 特定のユーザー情報を取り出す
        $admin_info = LineAccount::findOrFail($adminId);
        $chat_user = ChatUser::findOrFail($userId);

        // 未読数を取得する
        $unread_message_data = UserMessageRead::where("admin_account_id", $adminId)->where("chat_user_id", $userId)->select("last_unread_message_id", "last_message_type", "unread_count")->first();

        $templates_data = MessageTemplateContent::getMessageTemplatesForAdmin($adminId);
        $template_categories = MessageTemplatesCategory::select("category_name", "id")->where("admin_id", $adminId)->get();

        // 管理者とユーザーのuuidを取得
        $uuid_admin =  EntityUuidResolver::getAdminEntity($adminId);
        $uuid_user  = EntityUuidResolver::getUserEntity($userId);

        if(!$uuid_admin || !$uuid_user){
            throw new \Exception("必要なUUIDが見つかりません");
        }

        $messages= $messageAggregationService->getUnifiedSortedMessages($userId, $adminId, "admin", 0);
        // 既読管理の処理
        // 0はチャットIDを入れる必要がないから、0に指定
        UserMessageReadManager::updateOrCreateUserReadStatus($userId, $adminId, 0, "text", 0);

        $mergedData = $messageService->getMergedData($adminId, 0);
        $group_message  = $messageService->groupMessagesByDate($messages);

        $backgroundColor = BackgroundColor::where("line_account_id",  $adminId)->first();
        return view("admin.chat", [
            "background_color" => $backgroundColor,
            "admin_info"=> $admin_info, 
            "mergedData" => $mergedData, 
            "user_id" => $userId, 
            "group_message" => $group_message, 
            "chat_user" => $chat_user, 
            "uuid_admin" => $uuid_admin, 
            "uuid_user"=>$uuid_user,
            "unread_message_id" =>  $unread_message_data->last_unread_message_id ?? null,
            "last_message_type" =>  $unread_message_data->last_message_type ?? null,
            "unread_count" => $unread_message_data->unread_count ?? 0,
            "templates_data" => $templates_data,
            "template_categories" => $template_categories
        ]);
    }


    public function getMergedDataAPI($admin_uuid){
        try{
            $messageService = new MessageService();
            
            $admin_id = EntityUuidResolver::getAdminID($admin_uuid);
            $mergedData = $messageService->getMergedData($admin_id, 0);
            return response()->json($mergedData);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
