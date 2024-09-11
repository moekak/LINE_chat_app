<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\UserMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use App\Services\MessageService;

class ChatController extends Controller
{
    public function index($adminId, $userId)
    {
        // メッセージサービスクラスの初期化
        $messageService = new MessageService();
        // 管理者アカウント情報を取得する
        $admin_info = LineAccount::where("account_id", $adminId)->first();
        // ユーザーアカウント情報を取得する
        $user_id = ChatUser::where("user_id", $userId)->first();

        $messages = $messageService->fetchAdminAndUserMessages($admin_info["id"], $user_id["id"]);
        $group_message = $messageService->formatMessage($messages);

        return view("user.chat", ["admin_info" => $admin_info, "user_id" => $user_id, "group_message" => $group_message]);
    }


}
