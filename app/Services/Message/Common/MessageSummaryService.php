<?php

namespace App\Services\Message\Common;

use App\Models\BlockChatUser;
use App\Models\MessageSummary;
use Illuminate\Support\Facades\Log;

class MessageSummaryService{

    public static function updateLatestMessage($userId, $adminId, $content, $date, $type, $isUserMessage = false) {
        $block_history = BlockChatUser::getLatestBlockStatus($userId);
        if($block_history){
            return;
        }
        $messageSummary = MessageSummary::where("user_id", $userId)
            ->where("admin_id", $adminId)
            ->first();

        
        $data = [
            "latest_all_message" => $content,
            "latest_all_message_date" => $date,
            "latest_all_message_type" => $type
        ];
        
        // ユーザーメッセージの場合のみ latest_user_message_date を更新
        if ($isUserMessage) {
            $data["latest_user_message_date"] = $date;
        }
    
        if ($messageSummary) {
            $messageSummary->update($data);
        } else {
            $data["user_id"] = $userId;
            $data["admin_id"] = $adminId;
            MessageSummary::create($data);
        }
    }
}