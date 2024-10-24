<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\BroadcastMessage;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use App\Services\MessageRepository;

class MessageAggregationService{

    public function getAdminMessages(int $userId, int $adminId, $periods)
    {

        $query = AdminMessage::where("user_id", $userId)
            ->where("admin_id", $adminId)
            ->selectRaw("id, content, created_at, 'text' as type");

        if($periods){
            $query->where(function($q) use($periods){
                foreach($periods as $period){
                    $q->whereNotBetween("created_at", [
                        $period["start"],
                        $period["end"]
                    ]);
                }
            });
        }

        return $query;
    }

    public function getAdminMessageImages(int $userId, int $adminId, $periods)
    {
        $query = AdminMessageImage::where("admin_id", $adminId)
            ->where("user_id", $userId)
            ->selectRaw("id, image as content, created_at, 'image' as type");

        if($periods){
            $query->where(function($q) use($periods){
                foreach($periods as $period){
                    $q->whereNotBetween("created_at", [
                        $period["start"],
                        $period["end"]
                    ]);
                }
            });
        }

        return $query;
    }

    public function getAdminBroadcastingMessages(int $adminId, $periods)
    {
        $query = BroadcastMessage::where("admin_id", $adminId)
            ->select('id', 'resource', 'created_at', 'resource_type as type');

        if($periods){
            $query->where(function($q) use($periods){
                foreach($periods as $period){
                    $q->whereNotBetween("created_at", [
                        $period["start"],
                        $period["end"]
                    ]);
                }
            });
        }

        return $query;
    }

    public function getUserMessages(int $userId, int $adminId, $periods)
    {
        $query = UserMessage::where("user_id", $userId)
            ->where("admin_id", $adminId)
            ->selectRaw("id, content, created_at, 'text' as type");

        if($periods){
            $query->where(function($q) use($periods){
                foreach($periods as $period){
                    $q->whereNotBetween("created_at", [
                        $period["start"],
                        $period["end"]
                    ]);
                }
            });
        }

        return $query;
    }

    public function getUserMessageImages(int $userId, int $adminId, $periods)
    {
        $query = UserMessageImage::where("admin_id", $adminId)
            ->where("user_id", $userId)
            ->selectRaw("id, image as content, created_at, 'image' as type");


        if($periods){
            $query->where(function($q) use($periods){
                foreach($periods as $period){
                    $q->whereNotBetween("created_at", [
                        $period["start"],
                        $period["end"]
                    ]);
                }
            });
        }

        return $query;
    }


    public function getUnifiedSortedMessages(int $userId, int $adminId, string $user_type)
    {   
        $messageService = new MessageService();
        $messageRepository = new MessageRepository();
        $block_history =  $messageService->hasUserBlockHistroy($userId);

        if($block_history){
            if($user_type == "admin"){
                $adminMessages = $messageRepository->getMessages(AdminMessage::class, $userId, $adminId, "text", "admin", $block_history);
                $adminMessageImages  = $messageRepository->getMessages(AdminMessageImage::class, $userId, $adminId, "text", "admin", $block_history);
                $userMessages  = $messageRepository->getMessages(UserMessage::class, $userId, $adminId, "text", "user", $block_history);
                $userMessageImages  = $messageRepository->getMessages(UserMessageImage::class, $userId, $adminId, "image", "user", $block_history);
                $broadcastMessagesAll = $messageRepository->getBroadcastMessages($userId, $adminId, $block_history);
            }else if($user_type == "user"){
                $adminMessages = $messageRepository->getMessages(AdminMessage::class, $userId, $adminId, "text", "admin", $block_history);
                $adminMessageImages  = $messageRepository->getMessages(AdminMessageImage::class, $userId, $adminId, "text", "admin", $block_history);
                $userMessages  = $messageRepository->getMessages(UserMessage::class, $userId, $adminId, "text", "user");
                $userMessageImages  = $messageRepository->getMessages(UserMessageImage::class, $userId, $adminId, "image", "user");
                $broadcastMessagesAll = $messageRepository->getBroadcastMessages($userId, $adminId, $block_history);
            }
        }else{
            $adminMessages = $messageRepository->getMessages(AdminMessage::class, $userId, $adminId, "text", "admin");
            $adminMessageImages  = $messageRepository->getMessages(AdminMessageImage::class, $userId, $adminId, "text", "admin");
            $userMessages  = $messageRepository->getMessages(UserMessage::class, $userId, $adminId, "text", "user");
            $userMessageImages  = $messageRepository->getMessages(UserMessageImage::class, $userId, $adminId, "image", "user");
            $broadcastMessagesAll = $messageRepository->getBroadcastMessages($userId, $adminId);
        }

        $allSortedMessages = $adminMessages->concat($adminMessageImages)
            ->concat($userMessages)
            ->concat($userMessageImages)
            ->concat($broadcastMessagesAll)
            ->sortBy('created_at')
            ->values();

        return $allSortedMessages;
    }
}