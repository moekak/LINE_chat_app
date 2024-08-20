<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\UserMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id, $account_id)
    {   


        // ユーザー情報を取り出す
        $chat_user = ChatUser::where("id", $account_id)->first();
        // 最新のメッセージを保持する配列
        $latestMessages = [];
        $admin_info= LineAccount::where("id", $id)->first();
        $users_info = ChatUser::where("account_id", $id)->get();

        foreach($users_info as $user){
            $userMessages = UserMessage::where("user_id", $user->id)->where("admin_id", $id)->get();
            $adminMessages = AdminMessage::where("user_id", $user->id)->where("admin_id", $id)->get();

            if(count($userMessages) > 0 || count($adminMessages) > 0){
                $allMessages = $userMessages->merge($adminMessages)->sortByDesc('created_at');
                $latestMessages[] = $allMessages->first();
            }
            
        }

        $mergedData = [];


        if(count($latestMessages) > 0){
              // 最新のメッセージを最新順にソート
            $latestMessages = collect($latestMessages)->filter()->sortByDesc(function($message) {
                return $message->created_at;
            });
            foreach($latestMessages as $index => $message){
                $mergedData[$index]["user_info"] = ChatUser::where("id", $message->user_id)->first();
                $mergedData[$index]["message"] = $message->content;
            }
        }

        $adminMessages = AdminMessage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $account_id)->get();
        $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $account_id)->get();
    

        $messages = $adminMessages->merge($userMessages)->sortBy("created_at");
        $group_message = $this->formatMessage($messages);
        return view("admin.chat", ["admin_info"=> $admin_info, "mergedData" => $mergedData, "user_id" => $account_id, "group_message" => $group_message, "chat_user" => $chat_user]);
    }

    public function formatMessage($messages){
        $groupMessages = $messages->groupBy(function($message){
            return $this->formatDate($message->created_at);
        });

        return $groupMessages;
    }

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
