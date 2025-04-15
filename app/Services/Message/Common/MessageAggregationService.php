<?php

namespace App\Services\Message\Common;


use App\Models\AdminMessageRead;
use App\Models\ChatUser;
use App\Models\UserMessageRead;
use App\Services\Message\Common\MessageService;
use Illuminate\Support\Facades\Log;

class MessageAggregationService{

    public function getUnifiedSortedMessages(int $userId, int $adminId, string $user_type, $start)
    {   
        $messageService = new MessageService();
        $messageRepository = new MessageRepository();

        $line_user_id = ChatUser::where("id", $userId)->value("user_id");
        // 同じLINEユーザーIDのユーザーの管理者IDをchat Identitiesから取得する
        $user_ids = ChatUser::where("user_id", $line_user_id)->pluck("id");

        // $block_history =  $messageService->hasUserBlockHistroy($userId);
        $block_history =  $messageService->hasUserBlockHistroy($user_ids);

        $unreadCount = $user_type === "user" ? AdminMessageRead::where("chat_user_id", $userId)->where("admin_account_id", $adminId)->value("unread_count"): UserMessageRead::where("chat_user_id", $userId)->where("admin_account_id", $adminId)->value("unread_count");
        if($block_history > 0){
            if($user_type == "admin"){
                return $messageRepository->unionAllQueryForAdmin($userId, $adminId, $block_history, "admin", $start, $unreadCount);
            }else if($user_type == "user"){
                return $messageRepository->unionAllQueryForAdmin($userId, $adminId, $block_history, "user", $start, $unreadCount);
            }
        }else{
            return $messageRepository->unionAllQueryForAdmin($userId, $adminId, $block_history, "withNoBlock", $start, $unreadCount);
        }
    }
}