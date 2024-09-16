<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageReadUserRequest;
use App\Models\MessageReadUser;
use App\Services\UserEntityService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MessageReadUserController extends Controller
{

    // 既読管理のテーブルに最新のメッセージIDを挿入する
    public function store(MessageReadUserRequest $request){
        try{
            

            $userEntityService = new UserEntityService();
            $validated = $request->validated();

            

            $admin_id = $userEntityService->getAdminID($validated["admin_id"]);
            $chat_user_id = $userEntityService->getUserID($validated["chat_user_id"]);


            $message_read_data = [
                "message_id" => $validated["message_id"],
                "chat_user_id"=> $chat_user_id,
                "admin_id" => $admin_id,
                "read_at" => Carbon::now()
            ];

            MessageReadUser::create($message_read_data);

            return response()->noContent();  // 204 No Content
   
        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
