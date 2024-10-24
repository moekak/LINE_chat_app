<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\BlockChatUser;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use Illuminate\Support\Carbon;

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
        $messageService = new MessageService();

        $message_read       = MessageReadUser::where("admin_id", $admin_id)->where("chat_user_id", $user_id)->orderBy("created_at", "desc")->first(["message_id"]);
        $latest_message_id = $this->getLatesetUserMessageID($user_id, $admin_id);
        $count = 0;
        $block_history =  $messageService->hasUserBlockHistroy($user_id);

        if($message_read== null){
            $query = UserMessage::where("user_id", $user_id)
                ->where("admin_id", $admin_id);
        
            if($block_history){
                $query->where(function($q) use($block_history){
                    foreach($block_history as $history){
                        $q->whereNotBetween("created_at", [
                            $history["start"],
                            $history["end"]
                        ]);
                    }
                });
            }
            $userMessageCount = $query->count();

            $query = UserMessageImage::where("user_id", $user_id)
                ->where("admin_id", $admin_id);
                
            if($block_history){
                $query->where(function($q) use($block_history){
                    foreach($block_history as $history){
                        $q->whereNotBetween("created_at", [
                            $history["start"],
                            $history["end"]
                        ]);
                    }
                });
            }
                
            $userMessageImageCount = $query->count();

            $count = $userMessageCount + $userMessageImageCount;
        }else if($message_read->message_id == $latest_message_id){
            $count = 0;
        }else{
            $query= UserMessage::where("user_id", $user_id)
                ->where("admin_id", $admin_id)
                ->where('message_id', '>', $message_read->message_id);

                if($block_history){
                    $query->where(function($q) use($block_history){
                        foreach($block_history as $history){
                            $q->whereNotBetween("created_at", [
                                $history["start"],
                                $history["end"]
                            ]);
                        }
                    });
                }
                $userMessageCount = $query->count();

            $query = UserMessageImage::where("user_id", $user_id)
                ->where("admin_id", $admin_id)
                ->where('message_id', '>', $message_read->message_id);

            if($block_history){
                $query->where(function($q) use($block_history){
                    foreach($block_history as $history){
                        $q->whereNotBetween("created_at", [
                            $history["start"],
                            $history["end"]
                        ]);
                    }
                });
            }
            $userMessageImageCount = $query->count();

            $count = $userMessageCount + $userMessageImageCount;
        }
        return $count;
    }

    // 管理者、ユーザー、一斉送信を含めた一番最新のデータを取得する("id, content, created_at, type)
    public function retrieveLatestMessage(int $userId, int $adminId)
    {
        $messageAggregationService = new MessageAggregationService();
        $messageService = new MessageService();

        $block_history =  $messageService->hasUserBlockHistroy($userId);


        // 各テーブルのクエリの呼び出し
        $adminMessages              = $messageAggregationService->getAdminMessages($userId, $adminId, $block_history);
        $adminMessageImages         = $messageAggregationService->getAdminMessageImages($userId, $adminId, $block_history);
        $adminBroadcastingMessages  = $messageAggregationService->getAdminBroadcastingMessages($adminId, $block_history);
        $userMessages               = $messageAggregationService->getUserMessages($userId, $adminId, $block_history);
        $userMessageImages          = $messageAggregationService->getUserMessageImages($userId, $adminId, $block_history);

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
            // 最新のメッセージの時刻を取得し、ユーザー作成日時よりも前の場合は、最新メッセージを空にする
            $latest_message = $this->retrieveLatestMessage($data->id, $admin_id);
            $user_createdAt = $data->created_at;
            $latest_message_createdAt = $latest_message->created_at;

            $data["latest_message"] = $latest_message_createdAt >= $user_createdAt ?  $this->retrieveLatestMessage($data->id, $admin_id) : "";
            $data["formatted_date"] = $data["latest_message"] ? $japaneseDateFormatter->formatTime($data["latest_message"]["created_at"]) : "";
            $data["totalCount"]     = $this->selectTotalMessageCount($admin_id, $data->id);
            $data["userUuid"]       = $userEntityService->getUserUuid($data->id);
        }
        return collect($mergedData)->sortBy([
                ['totalCount', 'desc'],
                ['created_at', 'asc']
            ])->values()->all();
    }


    public function hasUserBlockHistroy($user_id){
        // ブロックしていた期間を取得する(ブロック日とブロック解除日)
        $block_history = BlockChatUser::where("chat_user_id", $user_id)->select("created_at", "updated_at", "is_blocked")->get();
        if($block_history->isEmpty()){
            return False;
        }

        $periods = [];

        foreach($block_history as $history){

            if($history->is_blocked == '1'){
                $periods[] = [
                    "start" => Carbon::parse($history->created_at),
                    "end" => Carbon::now()
                ];
            }else{
                $periods[] = [
                    'start' => Carbon::parse($history->created_at),
                    'end' => Carbon::parse($history->updated_at)
                ];  
            }
            
        }
        return $periods;
    }

}