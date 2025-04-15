<?php

namespace App\Services\Message\Admin;

use App\Models\AdminMessageRead;

class AdminMessageReadManager{

    // 未読を管理するテーブルのデータを更新
      public static function updateOrCreateAdminReadStatus(int $chatUserId, int $adminAccountId, int $messageId, string $message_type, int $messageCount, $updateunreadCount = false): void
      {
            
            // 既に未読管理テーブルにデータがあるか確認
            $adminMessageRead = AdminMessageRead::findByUserAndAccount($chatUserId, $adminAccountId);
            if (!$adminMessageRead) {
                  AdminMessageRead::create([
                        "chat_user_id" => $chatUserId,
                        "admin_account_id" => $adminAccountId,
                        "unread_count" => $messageCount,
                        "last_unread_message_id" => $messageId,
                        "last_message_type" => $message_type
                  ]);
            } else {
                  $newCount = $updateunreadCount == false ? $messageCount : $adminMessageRead->unread_count + $messageCount;

                  // 最初の未読メッセージIDを挿入。連続で未読メッセージがある場合は、最初のみmessage idを挿入します。
                  if($adminMessageRead["last_unread_message_id"] === 0){
                        $adminMessageRead->update([
                              "last_unread_message_id" => $messageId,
                              "last_message_type" => $message_type,
                              "unread_count" => (int)$newCount,
                        ]);
                  }else{
                        $adminMessageRead->update([
                              "unread_count" => (int)$newCount,
                        ]);

                        if($messageId === 0){
                              $adminMessageRead->update([
                                    "last_unread_message_id" => $messageId,
                                    "unread_count" => (int)$newCount,
                              ]); 
                        }
                  }


            }
      }
}