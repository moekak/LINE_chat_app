<?php

namespace App\Services;

use App\Models\AdminMessage;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use Illuminate\Support\Carbon;
use Symfony\Component\VarDumper\Caster\ClassStub;

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



      //   管理者メッセージとユーザーメッセーを取り出し、一つの配列に統合して、created_at 日付で昇順でソートする
      public function fetchAdminAndUserMessages($admin_id, $user_id) {
            $adminMessages = AdminMessage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();
            $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $admin_id)->where("user_id", $user_id)->get();

            return $adminMessages->merge($userMessages)->sortBy("created_at");
      }


      public function formatMessage($messages){
            $groupMessages = $messages->groupBy(function($message){
                return $this->formatDate($message->created_at);
            });
        
            return $groupMessages;
      }


}