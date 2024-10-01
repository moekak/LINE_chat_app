<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\BroadcastMessage;
use App\Models\ChatUser;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class MessageService{
    public function formatDate($createdAt){
        //Carbonインスタンスを作成
        $date = Carbon::parse($createdAt);
        //現在の日時と時刻を取得して Carbon インスタンスに格納
        $now = Carbon::now();
        $oneWeekAgo = $now->copy()->subWeek();
        $yesterday = $now->copy()->subDay();


        if ($date->isSameDay($now)) {
            return '今日';
        }

        if ($date->isSameDay($yesterday)) {
            return '昨日';
        }
            // 一週間以内のチェック
        if ($date->isBetween($oneWeekAgo, $now, 'day')) {
            $daysOfWeek = [
                'Monday'    => '月曜日',
                'Tuesday'   => '火曜日',
                'Wednesday' => '水曜日',
                'Thursday'  => '木曜日',
                'Friday'    => '金曜日',
                'Saturday'  => '土曜日',
                'Sunday'    => '日曜日',
            ];
    
            // 曜日の英語名を取得
            $dayOfWeekEnglish = $date->format('l');
    
            // 曜日の日本語名に変換
            return $daysOfWeek[$dayOfWeekEnglish] ?? $dayOfWeekEnglish;
        }
        // 1年以内のチェック
        if ($date->isSameYear($now)) {
            return $date->format('Y年n月j日'); // 例: 2024年8月20日 火曜日
        }
        // それ以外
        return $date->format('Y年n月j日'); // 例: 2023年8月20日

    }
    public function formatTime($createdAt){
        //Carbonインスタンスを作成
        $date = Carbon::parse($createdAt);
        //現在の日時と時刻を取得して Carbon インスタンスに格納
        $now = Carbon::now();
        $oneWeekAgo = $now->copy()->subWeek();
        $yesterday = $now->copy()->subDay();


        if ($date->isSameDay($now)) {
            return $createdAt->format("H:i")
            ;
        }

        if ($date->isSameDay($yesterday)) {
            return '昨日';
        }
            // 一週間以内のチェック
        if ($date->isBetween($oneWeekAgo, $now, 'day')) {
            $daysOfWeek = [
                'Monday'    => '月曜日',
                'Tuesday'   => '火曜日',
                'Wednesday' => '水曜日',
                'Thursday'  => '木曜日',
                'Friday'    => '金曜日',
                'Saturday'  => '土曜日',
                'Sunday'    => '日曜日',
            ];
    
            // 曜日の英語名を取得
            $dayOfWeekEnglish = $date->format('l');
    
            // 曜日の日本語名に変換
            return $daysOfWeek[$dayOfWeekEnglish] ?? $dayOfWeekEnglish;
        }
        // 1年以内のチェック
        if ($date->isSameYear($now)) {
            return $date->format('n月j日'); // 例: 2024年8月20日 火曜日
        }
        // それ以外
        return $date->format('Y年n月j日'); // 例: 2023年8月20日
    }



      //管理者メッセージとユーザーメッセーを取り出し、一つの配列に統合して、created_at 日付で昇順でソートする
    public function fetchAdminAndUserMessages($admin_id, $user_id) {
        $adminMessages = AdminMessage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();
        $adminMessageImages = AdminMessageImage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();

        $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();
        $userMessageImages = UserMessageImage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();


        $mergedUserMessages =  $userMessages->merge($userMessageImages);
        $mergedAdminMessages =  $adminMessages->merge($adminMessageImages);
        
        $allSortedMessages = $mergedUserMessages->concat($mergedAdminMessages)
        ->map(function ($message) {
            // created_at を東京時間に変換
            $message->created_at = Carbon::parse($message->created_at)->setTimezone('Asia/Tokyo');
            return $message;
        })->sortBy("created_at");


        return $allSortedMessages;
    }


    //取得したメッセージを日付順にグループ化する(最新順)
    public function formatMessage($messages){
        $groupMessages = $messages->groupBy(function($message){
            return $this->formatDate($message->created_at);
        });
    
        return $groupMessages;
    }


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


    public function selectTotalMessageCount($admin_id, $user_id){
        $message_read = MessageReadUser::where("admin_id", $admin_id)->where("chat_user_id", $user_id)->orderBy("created_at", "desc")->first(["message_id"]);
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


    public function getMergedData($id){
        $users_info = ChatUser::where("account_id", $id)->get();

        // 最新のメッセージを保持する配列
        $latestMessages = [];
        $mergedData = [];

        // 各チャットユーザーの最新のメッセージを取得する
        foreach($users_info as $user){
            $userMessages = UserMessage::where("user_id", $user->id)->where("admin_id", $id)->orderBy("created_at", "desc")->get();

            $userMessageImages = UserMessageImage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $user->id)->get();
            $mergedUserMessages =  $userMessages->merge($userMessageImages);
            $sortedUserMessages = $mergedUserMessages->map(function($message) {
                // created_at を東京時間に変換
                $message->created_at = Carbon::parse($message->created_at)->setTimezone('Asia/Tokyo');
                return $message;
            })->sortByDesc("created_at");

            $adminMessages              = AdminMessage::where("user_id", $user->id)->where("admin_id", $id)->get();
            $adminMessageImages         = AdminMessageImage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $user->id)->get();
            $adminBroadcastingMessages  = BroadcastMessage::orderBy("created_at")->where("admin_id", $id)->get();


            foreach($adminBroadcastingMessages as $message){
                $message["message_id"] = "";
                $message["user_id"] = "";
                $message["type"] = "";
            }


            $mergedAdminMessages    =  $adminMessages->merge($adminMessageImages);
            $mergedAllAdminMessages = $mergedAdminMessages->merge($adminBroadcastingMessages);

            // echo "<pre>";
            // print_r($mergedAllAdminMessages->toArray());
            // echo "<pre>";
    
            // exit;
            

            $sortedAdminMessages    = $mergedAllAdminMessages->map(function($message) {
                // created_at を東京時間に変換
                $message->created_at = Carbon::parse($message->created_at)->setTimezone('Asia/Tokyo');
                return $message;
            })->sortByDesc("created_at");


        
            if(count($sortedUserMessages) > 0 || count($sortedAdminMessages) > 0){

                $allMessages = $sortedUserMessages->merge($sortedAdminMessages)
                ->map(function($message) {
                    // created_at を東京時間に変換
                    $message->created_at = Carbon::parse($message->created_at)->setTimezone('Asia/Tokyo');
                    return $message;
                })->sortByDesc('created_at');

                $latestMessages[] = $allMessages;
            }

            // echo "<pre>";
            // print_r($latestMessages-<to);
            // echo "<pre>";
    
            // exit;



        }

        // 最新メッセージの時間のフォーマット
        foreach($latestMessages as $message){
            foreach($message as $msg){
                $msg["time"] =$this->formatTime($msg["created_at"]);
            }
    
        
        }



       

        $userEntityService = new UserEntityService();


        if(count($latestMessages) > 0){
              // 最新のメッセージを最新順にソート
            // $latestMessages = collect($latestMessages)->filter()->sortByDesc(function($message) {
            //     return Carbon::parse($message->created_at)->setTimezone('Asia/Tokyo');
            // });

            foreach($latestMessages as  $message){
                foreach($message as $index => $msg){
                    $totalMessageCount =$this->selectTotalMessageCount($msg->admin_id, $msg->user_id);
                    $mergedData[$index]["userInfo"] = ChatUser::where("id", $msg->user_id)->first();
                    $mergedData[$index]["message"] = $msg;
                    $mergedData[$index]["formatted_date"] = $msg->time;
                    $mergedData[$index]["totalCount"] = $totalMessageCount;
                    $mergedData[$index]["uuid"] = $userEntityService->getUserUuid($msg->user_id);
                }
              


            }

        }

        echo "<pre>";
        print_r($mergedData);
        echo "<pre>";


        exit;

        return $mergedData;
    }

}