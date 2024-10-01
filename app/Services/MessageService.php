<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\ChatUser;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;

class MessageService{

    //取得したメッセージを日付順にグループ化する(最新順)
    public function groupMessagesByDate($messages){
        $groupMessages = $messages->groupBy(function($message){
            $JapaneseDateFormatter = new JapaneseDateFormatter();
            return $JapaneseDateFormatter->formatDate($message["created_at"]);
        });
    
        return $groupMessages;
    }


    // ユーザーの最新のメッセージIDを取得
    public function getLatesetUserMessageID($user_id, $admin_id){
        $current_message_id = UserMessage::where("user_id", $user_id)->where("admin_id", $admin_id)->orderBy("created_at", "desc")->value("message_id");
        $current_message_image_id = UserMessageImage::where("user_id", $user_id)->where("admin_id", $admin_id)->orderBy("created_at", "desc")->value("message_id");
        $latest_message_id = 0;

        if ($current_message_id !== null && $current_message_image_id !== null) {
            // 両方の値がある場合、大きい方を取得
            $latest_message_id = max($current_message_id, $current_message_image_id);
        } elseif ($current_message_id !== null) {
            // `UserMessage`のIDがある場合、それを採用
            $latest_message_id = $current_message_id;
        } elseif ($current_message_image_id !== null) {
            // `UserMessageImage`のIDがある場合、それを採用
            $latest_message_id = $current_message_image_id;
        }

        return $latest_message_id;
    }

     // 管理者の最新のメッセージIDを取得
    public function getLatesetAdminMessageID($user_id, $admin_id){
        $current_message_id = AdminMessage::where("user_id", $user_id)->where("admin_id", $admin_id)->orderBy("created_at", "desc")->value("message_id");
        $current_message_image_id = AdminMessageImage::where("user_id", $user_id)->where("admin_id", $admin_id)->orderBy("created_at", "desc")->value("message_id");
        $latest_message_id = 0;

        if ($current_message_id !== null && $current_message_image_id !== null) {
            // 両方の値がある場合、大きい方を取得
            $latest_message_id = max($current_message_id, $current_message_image_id);
        } elseif ($current_message_id !== null) {
            // `UserMessage`のIDがある場合、それを採用
            $latest_message_id = $current_message_id;
        } elseif ($current_message_image_id !== null) {
            // `UserMessageImage`のIDがある場合、それを採用
            $latest_message_id = $current_message_image_id;
        }

        return $latest_message_id;
    }


    // 全ての未読メッセージも数を取得する
    public function selectTotalMessageCount($admin_id, $user_id){
        $message_read       = MessageReadUser::where("admin_id", $admin_id)->where("chat_user_id", $user_id)->orderBy("created_at", "desc")->first(["message_id"]);
        $latest_message_id = $this->getLatesetUserMessageID($user_id, $admin_id);
        $count = 0;
        if($message_read== null){
            $count = UserMessage::where("user_id", $user_id)->where("admin_id", $admin_id)->count() + UserMessageImage::where("user_id", $user_id)->where("admin_id", $admin_id)->count();
        }else if($message_read->message_id == $latest_message_id){
            $count = 0;
        }else{
            $count = UserMessage::where("user_id", $user_id)->where("admin_id", $admin_id)->where('message_id', '>', $message_read->message_id)->count() + UserMessageImage::where("user_id", $user_id)->where("admin_id", $admin_id)->where('message_id', '>', $message_read->message_id)->count() ;
        }

        return $count;
    }


    // 管理者、ユーザー、一斉送信を含めた一番最新のデータを取得する("id, content, created_at, type)
    public function retrieveLatestMessage(int $userId, int $adminId)
    {
        $messageAggregationService = new MessageAggregationService();

        // 各テーブルのクエリの呼び出し
        $adminMessages              = $messageAggregationService->getAdminMessages($userId, $adminId);
        $adminMessageImages         = $messageAggregationService->getAdminMessageImages($userId, $adminId);
        $adminBroadcastingMessages  = $messageAggregationService->getAdminBroadcastingMessages($adminId);
        $userMessages               = $messageAggregationService->getUserMessages($userId, $adminId);
        $userMessageImages          = $messageAggregationService->getUserMessageImages($userId, $adminId);

        $latestRecord = $adminMessages->union($adminMessageImages)
            ->union($adminBroadcastingMessages)
            ->union($userMessages)
            ->union($userMessageImages)
            ->latest('created_at')
            ->first();

        return $latestRecord;
    }

    public function getMergedData($admin_id, $mergedData){
        $userEntityService = new UserEntityService();
        $japaneseDateFormatter = new JapaneseDateFormatter();

        // 各チャットユーザーの最新のメッセージを取得する
        foreach($mergedData as $data){
            $data["latest_message"] = $this->retrieveLatestMessage($data->id, $admin_id);
            $data["formatted_date"] = $japaneseDateFormatter->formatTime($data["latest_message"]["created_at"]);
            $data["totalCount"]     = $this->selectTotalMessageCount($admin_id, $data->id);
            $data["userUuid"]       = $userEntityService->getUserUuid($data->id);
        }
        return collect($mergedData)->sortBy([
                ['totalCount', 'desc'],
                ['created_at', 'asc']
            ])->values()->all();
    }

}