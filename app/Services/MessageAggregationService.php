<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\BroadcastMessage;
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
            ->selectRaw("id, content, created_at, 'broadcast' as type");
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

        $adminMessageImages = UserMessageImage::where('user_id', $userId)
            ->where('admin_id', $adminId)
            ->get()
            ->map(function ($message) {
                return $this->formatMessage($message, 'image', "user");
            });

        $broadcastMessages = BroadcastMessage::where('admin_id', $adminId)
            ->get()
            ->map(function ($message) use ($userId) {
                return $this->formatMessage($message, 'text', "admin", $userId);
            });

        $allSortedMessages = $adminMessages->concat($adminMessageImages)
            ->concat($userMessages)
            ->concat($broadcastMessages)
            ->sortBy('created_at')
            ->values();

        return $allSortedMessages;
        
    }

    // メッセージを共通のフォーマットに変換する
    private function formatMessage($message, string $type, string $sender_type, ?int $userId = null): array
    {
        return [
            'id' => $message->id,
            'content' => $message->content ??  $message->image ?? '',
            'created_at' => $message->created_at,
            'type' => $type,
            'user_id' => $userId ?? $message->user_id ?? null,
            'admin_id' => $message->admin_id,
            "sender_type" => $sender_type
        ];
    }

}