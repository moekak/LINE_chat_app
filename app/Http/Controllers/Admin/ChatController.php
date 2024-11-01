<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\MessageReadUser;
use App\Models\UserEntity;
use App\Services\MessageAggregationService;
use App\Services\MessageService;
use App\Services\UserEntityService;
use Carbon\Carbon;


class ChatController extends Controller
{

    public function index($id, $account_id)
    {   

        // インスタンスの作成
        $messageService             = new MessageService();
        $messageAggregationService  = new MessageAggregationService();

        // ユーザーの最新のメッセージIDを取得する
        $latest_message_id = $messageService->getLatesetUserMessageID($account_id, $id);

        // // 開いているメッセージを既読にするため、データベースに保存
        if($latest_message_id !== null){
            $message_read_data = [
                "message_id"    => $latest_message_id,
                "chat_user_id"  => $account_id,
                "admin_id"      => $id,
                "read_at"       => Carbon::now()
            ];
            // 既読を管理するデータベースに保存
            MessageReadUser::create($message_read_data);
        }

        // 管理者とユーザーのuuidを取得
        $uuid_admin = UserEntity::where("entity_type", "admin")->where("related_id", $id)->value("entity_uuid");
        $uuid_user  = UserEntity::where("entity_type", "user")->where("related_id", $account_id)->value("entity_uuid");
    
        // 特定のユーザー情報を取り出す
        $chat_user  = ChatUser::where("id", $account_id)->first();
        $admin_info = LineAccount::where("id", $id)->first();

        // ブロックされていないユーザーを取得
        $userData = ChatUser::whereNotIn("id", function($query){
            $query->select("chat_user_id")
                ->from("block_chat_users")
                ->where("is_blocked", '1');
        })
        ->where("account_id", $id)
        ->get();

        $mergedData = $messageService->getMergedData($id, $userData);
        $messages= $messageAggregationService->getUnifiedSortedMessages($account_id, $id, "admin");
        $group_message  = $messageService->groupMessagesByDate($messages);

        return view("admin.chat", ["admin_info"=> $admin_info, "mergedData" => $mergedData, "user_id" => $account_id, "group_message" => $group_message, "chat_user" => $chat_user, "uuid_admin" => $uuid_admin, "uuid_user"=>$uuid_user]);
    }

    public function getMergedDataAPI($admin_uuid){
        try{
            
            $messageService = new MessageService();
            $userEntityService = new UserEntityService();
            
            $admin_id = $userEntityService->getAdminID($admin_uuid);
            $userData = ChatUser::where("account_id", $admin_id)->get();

            $mergedData = $messageService->getMergedData($admin_id, $userData);
            return response()->json(["mergedData" => $mergedData]);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
