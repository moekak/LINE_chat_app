<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\BroadcastMessage;
use App\Models\ChatUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use Illuminate\Support\Carbon;

class MessageAggregationService{

    public function getAdminMessages(int $userId, int $adminId)
    {
        return AdminMessage::where("user_id", $userId)
            ->where("admin_id", $adminId)
            ->selectRaw("id, content, created_at, 'text' as type");
    }

    public function getAdminMessageImages(int $userId, int $adminId)
    {
        return AdminMessageImage::where("admin_id", $adminId)
            ->where("user_id", $userId)
            ->selectRaw("id, image as content, created_at, 'image' as type");
    }

    public function getAdminBroadcastingMessages(int $adminId)
    {
        return BroadcastMessage::where("admin_id", $adminId)
            ->select('id', 'resource', 'created_at', 'resource_type as type');
    }

    public function getUserMessages(int $userId, int $adminId)
    {
        return UserMessage::where("user_id", $userId)
            ->where("admin_id", $adminId)
            ->selectRaw("id, content, created_at, 'text' as type");
    }

    public function getUserMessageImages(int $userId, int $adminId)
    {
        return UserMessageImage::where("admin_id", $adminId)
            ->where("user_id", $userId)
            ->selectRaw("id, image as content, created_at, 'image' as type");
    }





    public function getUnifiedSortedMessages(int $userId, int $adminId)
    {
        $adminMessages = AdminMessage::where('user_id', $userId)
            ->where('admin_id', $adminId)
            ->get()
            ->map(function ($message) {
                return $this->formatMessage($message, 'text', "admin");
            });

        $adminMessageImages = AdminMessageImage::where('user_id', $userId)
            ->where('admin_id', $adminId)
            ->get()
            ->map(function ($message) {
                return $this->formatMessage($message, 'image', "admin");
            });


        $userMessages = UserMessage::where('user_id', $userId)
            ->where('admin_id', $adminId)
            ->get()
            ->map(function ($message) {
                return $this->formatMessage($message, 'text', "user");
            });

        $userMessageImages = UserMessageImage::where('user_id', $userId)
            ->where('admin_id', $adminId)
            ->get()
            ->map(function ($message) {
                return $this->formatMessage($message, 'image', "user");
            });

        // 指定された管理者IDに関連するブロードキャストメッセージを取得
        $broadcastMessages = BroadcastMessage::where('admin_id', $adminId)
            ->get()
            ->map(function ($message) use ($userId) {
                // 各メッセージをフォーマット
                return $this->formatMessage($message, $message->resource_type, "admin", $userId);
            });

        

        // ユーザーに表示するブロードキャストメッセージを格納する配列
        $broadcastMessagesAll = [];

        // ユーザーの作成日時を取得
        $user_createdAt = ChatUser::where("id", $userId)->value("created_at");

        // 各ブロードキャストメッセージをチェック
        foreach($broadcastMessages as $message){
            $messge_createdAt = $message["created_at"];

            // ユーザーの作成日時よりも後に作成されたメッセージのみを表示対象とする
            if($user_createdAt < $messge_createdAt){
                $broadcastMessagesAll[] = $message;
            }
        }

        $allSortedMessages = $adminMessages->concat($adminMessageImages)
            ->concat($userMessages)
            ->concat($userMessageImages)
            ->concat($broadcastMessagesAll)
            ->sortBy('created_at')
            ->values();

        return $allSortedMessages;
        
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