<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ChatUser;
use App\Models\UserMessage;
use Illuminate\Http\Request;

class ChatUserController extends Controller
{

    // チャットユーザーのデータを取得するAPI
    public function getUserData($id, $admin_id){
        try{
            $data = ChatUser::findOrFail($id);

            $totalMessageCount = UserMessage::where("user_id", $id)->where("admin_id", $admin_id)->count();
            return response()->json(["userInfo" => $data, "totalCount" => $totalMessageCount]);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
