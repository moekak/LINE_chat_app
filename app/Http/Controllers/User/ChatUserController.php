<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchChatUsersRequest;
use App\Services\Message\Common\MessageService;
use App\Services\Util\EntityUuidResolver;
use Illuminate\Http\Request;


class ChatUserController extends Controller
{

    // チャットユーザーのデータを取得するAPI
    public function getUserData($id, $admin_id){
        try{
        
            $messageService = new MessageService();

            $admin_id = EntityUuidResolver::getAdminID($admin_id);
            $user_id = EntityUuidResolver::getUserID($id);
            $mergedData = $messageService->getMergedData($admin_id, 0, null, $user_id);

            return response()->json($mergedData);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserDataBySearch(SearchChatUsersRequest $request){
        try{
            $messageService = new MessageService();
            $validated  = $request->validated();
            $searchTxt      = $validated["text"];

            $admin_id = EntityUuidResolver::getAdminID($validated["admin_id"]);
            $mergedData = $messageService->getMergedData($admin_id, 0, $searchTxt);

            return response()->json($mergedData);
        }catch (\Exception $e){
            return response()->json(['errorrrr' => $e->getMessage()]);
        }
        
    }

    public function fetchUserListByScroll(Request $request){
        try{
            // インスタンスの作成
            $adminId = $request->input("adminId");
            $start = $request->input("dataCount");
            $userList = $request->input("userList");

            $messageService = new MessageService();
            $mergedData = $messageService->getMergedData($adminId, $start, null, null, $userList);
            return response()->json($mergedData);

        }catch (\Exception $e){
        }
    }
}
