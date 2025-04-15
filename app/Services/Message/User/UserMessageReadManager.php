<?php

namespace App\Services\Message\User;

use App\Models\UserMessageRead;
use Exception;
use Illuminate\Support\Facades\Log;

class UserMessageReadManager{

    // 未読を管理するテーブルのデータを更新
    public static function updateOrCreateUserReadStatus(int $chatUserId, int $adminAccountId, int $messageId, string $message_type, int $messageCount, $updateunreadCount = false): void
    {
        
        // 既に未読管理テーブルにデータがあるか確認
        $userMessageRead = UserMessageRead::findByUserAndAccount($chatUserId, $adminAccountId);
        if (!$userMessageRead) {
            UserMessageRead::create([
                "chat_user_id" => $chatUserId,
                "admin_account_id" => $adminAccountId,
                "unread_count" => $messageCount,
                "last_unread_message_id" => $messageId,
                "last_message_type" => $message_type
            ]);
        } else {
            $newCount = $updateunreadCount == false ? $messageCount : $userMessageRead->unread_count + $messageCount;


                // 最初の未読メッセージIDを挿入。連続で未読メッセージがある場合は、最初のみmessage idを挿入します。
                if($userMessageRead["last_unread_message_id"] === 0){
                    $userMessageRead->update([
                            "last_unread_message_id" => $messageId,
                            "last_message_type" => $message_type,
                            "unread_count" => (int)$newCount,
                        ]);
                }else{
                        $userMessageRead->update([
                            "unread_count" => (int)$newCount,
                        ]);

                        if($messageId === 0){
                            $userMessageRead->update([
                                    "last_unread_message_id" => $messageId,
                                    "unread_count" => (int)$newCount,
                            ]); 
                        }
                }
        }
    }
}