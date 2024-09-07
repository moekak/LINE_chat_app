<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use Illuminate\Support\Carbon;


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

            $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();
            $userMessageImages = UserMessageImage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();

           

            $mergedUserMessages =  $userMessages->merge($userMessageImages);
            $sortedUserMessages = $mergedUserMessages->sortByDesc("created_at");

            $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();

            return $adminMessages->merge($sortedUserMessages)->sortBy("created_at");
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

}