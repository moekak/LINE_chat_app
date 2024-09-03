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

    
    /**
     * Display a listing of the resource.
     */
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
