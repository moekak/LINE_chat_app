<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Services\MessageService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Number;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id, $account_id)
    {   

        // メッセージサービスクラスの初期化
        $messageService = new MessageService();
        // ユーザーの最新のメッセージを取得する
        $latestMessage = UserMessage::OrderBy("created_at", "desc")->where("user_id", $account_id)->where("admin_id", $id)->first();

        // 開いているメッセージを既読にするため、データベースに保存
        if($latestMessage !== null){
              $message_read_data = [
                "message_id"=> $latestMessage->id,
                "chat_user_id" => $account_id,
                "admin_id" => $id,
                "read_at" => Carbon::now()
            ];

            MessageReadUser::create($message_read_data);
        }
      

    
        
        // 特定のユーザー情報を取り出す
        $chat_user = ChatUser::where("id", $account_id)->first();
        // 最新のメッセージを保持する配列
        $latestMessages = [];
        $admin_info= LineAccount::where("id", $id)->first();
        $users_info = ChatUser::where("account_id", $id)->get();

        foreach($users_info as $user){
            $userMessages = UserMessage::where("user_id", $user->id)->where("admin_id", $id)->orderBy("created_at", "desc")->get();
            $adminMessages = AdminMessage::where("user_id", $user->id)->where("admin_id", $id)->get();

            if(count($userMessages) > 0 || count($adminMessages) > 0){
                $allMessages = $userMessages->merge($adminMessages)->sortByDesc('created_at');
                $latestMessages[] = $allMessages->first();

            }
            
        }

        // 最新メッセージの時間のフォーマット
        foreach($latestMessages as $message){
            $message["time"] = $messageService->formatTime($message->created_at);
        }

        $mergedData = [];


        if(count($latestMessages) > 0){
              // 最新のメッセージを最新順にソート
            $latestMessages = collect($latestMessages)->filter()->sortByDesc(function($message) {
                return $message->created_at;
            });
            foreach($latestMessages as $index => $message){
                $mergedData[$index]["user_info"] = ChatUser::where("id", $message->user_id)->first();
                $mergedData[$index]["message"] = $message;
                $mergedData[$index]["formatted_time"] = $message->time;

                $message_read = MessageReadUser::where("admin_id", $message->admin_id)->where("chat_user_id", $message->user_id)->orderBy("created_at", "desc")->first(["message_id"]);
        
                if($message_read== null){
  
                    $mergedData[$index]["count"] = UserMessage::where("user_id", $message->user_id)->where("admin_id", $message->admin_id)->count();
                }else if($message_read->message_id == $message->id){
                    $mergedData[$index]["count"] = 0;
                }else{
                    $mergedData[$index]["count"] = UserMessage::where("user_id", $message->user_id)->where("admin_id", $message->admin_id)->where('id', '>', $message_read->message_id)->count();
                }
     
            }
   
        }


        $messages = $messageService->fetchAdminAndUserMessages($id, $account_id);
        $group_message = $messageService->formatMessage($messages);
        return view("admin.chat", ["admin_info"=> $admin_info, "mergedData" => $mergedData, "user_id" => $account_id, "group_message" => $group_message, "chat_user" => $chat_user]);
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
