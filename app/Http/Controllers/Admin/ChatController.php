<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use App\Services\MessageService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id, $account_id)
    {   

        // メッセージサービスクラスの初期化
        $messageService = new MessageService();
        // ユーザーの最新のメッセージIDを取得する
        $latest_message_id = $messageService->getLatesetUserMessageID($account_id, $id);

        // 開いているメッセージを既読にするため、データベースに保存
        if($latest_message_id !== null){
              $message_read_data = [
                "message_id"=> $latest_message_id,
                "chat_user_id" => $account_id,
                "admin_id" => $id,
                "read_at" => Carbon::now()
            ];

            MessageReadUser::create($message_read_data);
        }
    
        // 特定のユーザー情報を取り出す
        $chat_user = ChatUser::where("id", $account_id)->first();
        $admin_info= LineAccount::where("id", $id)->first();
        $users_info = ChatUser::where("account_id", $id)->get();

        // 最新のメッセージを保持する配列
        $latestMessages = [];
        $mergedData = [];

        // 各チャットユーザーの最新のメッセージを取得する
        foreach($users_info as $user){
            $userMessages = UserMessage::where("user_id", $user->id)->where("admin_id", $id)->orderBy("created_at", "desc")->get();
            $userMessageImages = UserMessageImage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $user->id)->get();
            $mergedUserMessages =  $userMessages->merge($userMessageImages);
            $sortedUserMessages = $mergedUserMessages->sortByDesc("created_at");

            $adminMessages = AdminMessage::where("user_id", $user->id)->where("admin_id", $id)->get();
    
            $adminMessageImages = AdminMessageImage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $user->id)->get();
            $mergedAdminMessages =  $adminMessages->merge($adminMessageImages);
            $sortedAdminMessages = $mergedAdminMessages->sortByDesc("created_at");

       

            if(count($sortedUserMessages) > 0 || count($sortedAdminMessages) > 0){
                $allMessages = $sortedUserMessages->merge($sortedAdminMessages)->sortByDesc('created_at');
                $latestMessages[] = $allMessages->first();
            }
            
        }

        // 最新メッセージの時間のフォーマット
        foreach($latestMessages as $message){
            $message["time"] = $messageService->formatTime($message->created_at);
        }


        if(count($latestMessages) > 0){
              // 最新のメッセージを最新順にソート
            $latestMessages = collect($latestMessages)->filter()->sortByDesc(function($message) {
                return $message->created_at;
            });
            foreach($latestMessages as $index => $message){
                $totalMessageCount = $messageService->selectTotalMessageCount($message->admin_id, $message->user_id);
                $mergedData[$index]["user_info"] = ChatUser::where("id", $message->user_id)->first();
                $mergedData[$index]["message"] = $message;
                $mergedData[$index]["formatted_time"] = $message->time;
                $mergedData[$index]["count"] = $totalMessageCount;

            }

        }

        $messages = $messageService->fetchAdminAndUserMessages($id, $account_id);
        $group_message = $messageService->formatMessage($messages);
        return view("admin.chat", ["admin_info"=> $admin_info, "mergedData" => $mergedData, "user_id" => $account_id, "group_message" => $group_message, "chat_user" => $chat_user]);
    }

}
