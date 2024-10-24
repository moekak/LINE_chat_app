<?php


namespace App\Services;

use App\Models\BroadcastMessage;
use App\Models\ChatUser;

class MessageRepository{
      public function getMessages($model, $user_id, $admin_id, $message_type, $user_type, $periods= null){
            $query = $model::where("user_id", $user_id)
            ->where('admin_id', $admin_id);

            if($periods){
                  $query = $this->addPeriodConditions($query, $periods);
            }

            return $query->get()->map(function ($message) use ($message_type, $user_type) {
                  return $this->formatMessage($message, $message_type, $user_type);
            });
      }

      public function getBroadcastMessages($user_id, $admin_id, $periods= null){
            $query = BroadcastMessage::where('admin_id', $admin_id);

            if($periods){
                  $query = $this->addPeriodConditions($query, $periods);
            }

            $broadcastMessages = $query->get()->map(function ($message) use ($user_id) {
                  return $this->formatMessage($message, $message->resource_type, "admin", $user_id);
            });

            // ユーザーに表示するブロードキャストメッセージを格納する配列
            $broadcastMessagesAll = [];
            // ユーザーの作成日時を取得
            $user_createdAt = ChatUser::where("id", $user_id)->value("created_at");

            // 各ブロードキャストメッセージをチェック
            foreach($broadcastMessages as $message){
                  $messge_createdAt = $message["created_at"];
                  // ユーザーの作成日時よりも後に作成されたメッセージのみを表示対象とする
                  if($user_createdAt < $messge_createdAt){
                  $broadcastMessagesAll[] = $message;
                  }
            }

            return $broadcastMessagesAll;
      }


      public function addPeriodConditions($query, $periods){
            return $query->where(function($q) use ($periods){
                  foreach($periods as $period){
                        $q->whereNotBetween("created_at", [
                              $period["start"],
                              $period["end"]
                        ]);
                  }
            });
      }

       // メッセージを共通のフォーマットに変換する
      private function formatMessage($message, string $type, string $sender_type, ?int $userId = null): array
      {
            return [
                  'id' => $message->id,
                  'content' => $message->resource ?? $message->content ??  $message->image ?? '',
                  'created_at' => $message->created_at,
                  'type' => $type,
                  'user_id' => $userId ?? $message->user_id ?? null,
                  'admin_id' => $message->admin_id,
                  "sender_type" => $sender_type
            ];
      }
}