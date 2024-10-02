<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchChatUsersRequest;
use App\Models\ChatUser;
use App\Models\UserMessage;
use App\Services\JapaneseDateFormatter;
use App\Services\MergedData;
use App\Services\MessageAggregationService;
use App\Services\MessageService;
use App\Services\UserEntityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ChatUserController extends Controller
{

    // チャットユーザーのデータを取得するAPI
    public function getUserData($id, $admin_id){
        try{
        
            $messageService = new MessageService();
            $userEntityService = new UserEntityService();

            $admin_id = $userEntityService->getAdminID($admin_id);
            $user_id = $userEntityService->getUserID($id);


            $data = ChatUser::where("id", $user_id)->get();
            $mergedData = $messageService->getMergedData($admin_id, $data);

            return response()->json(["userInfo" => $mergedData]);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserDataBySearch(SearchChatUsersRequest $request){
        try{
            $messageService = new MessageService();
            $userEntityService = new UserEntityService();

            $validated  = $request->validated();
            $query      = $validated["text"];

            $admin_id = $userEntityService->getAdminID($validated["admin_id"]);
            
            $results = ChatUser::where("line_name", "LIKE", "%{$query}%")->where("account_id", $admin_id)->get();
            $mergedData = $messageService->getMergedData($admin_id, $results);

            return response()->json(["userInfo" => $mergedData]);
        }catch (\Exception $e){
            return response()->json(['errorrrr' => $e->getMessage()]);
        }
        
    }
}
