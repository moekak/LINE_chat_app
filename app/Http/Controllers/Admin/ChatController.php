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
use Illuminate\Support\Facades\Log;

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
        $mergedData = $messageService->getMergedData($id);

        // echo '<pre>';
        // print_r($mergedData);
        // echo '<pre>';

        $messages = $messageService->fetchAdminAndUserMessages($id, $account_id);
   
        $group_message = $messageService->formatMessage($messages);
        // echo '<pre>';
        // print_r($group_message ->toArray());
        // echo '<pre>';
       
        return view("admin.chat", ["admin_info"=> $admin_info, "mergedData" => $mergedData, "user_id" => $account_id, "group_message" => $group_message, "chat_user" => $chat_user]);
    }

    public function getMergedDataAPI($admin_id){
        try{
            
            $messageService = new MessageService();
            $mergedData = $messageService->getMergedData($admin_id);

            foreach($mergedData as $data){
                Log::debug($data["message"]->created_at);

            }

            
            return response()->json(["mergedData" => $mergedData]);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }

}
