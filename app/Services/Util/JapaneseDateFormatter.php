<?php

namespace App\Services\Util;

use Illuminate\Support\Carbon;

class JapaneseDateFormatter{
    public function formatDate($createdAt){
        // Carbonインスタンスを作成
        $date = Carbon::parse($createdAt);
        $date->locale('ja'); // 日本語のロケールを設定

        // 現在の日時を取得
        $now = Carbon::now();

        // 今日の場合
        if ($date->isSameDay($now)) {
            return '今日';
        }

        // 1年以内の場合
        if ($date->isSameYear($now)) {
            return $date->isoFormat('M/D(ddd)'); // 例: 12/17（月）
        }

        // それ以外（1年以上前の場合）
        return $date->isoFormat('YYYY/M/D(ddd)'); // 例: 2023/12/17（月）
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
}