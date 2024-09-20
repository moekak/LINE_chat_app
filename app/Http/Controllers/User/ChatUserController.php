<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchChatUsersRequest;
use App\Models\ChatUser;
use App\Models\UserMessage;
use App\Services\MessageService;
use App\Services\UserEntityService;
use Illuminate\Http\Request;

class ChatUserController extends Controller
{

    // チャットユーザーのデータを取得するAPI
    public function getUserData($id, $admin_id){
        try{
        
            $messageService = new MessageService();
            $userEntityService = new UserEntityService();

            $admin_id = $userEntityService->getAdminID($admin_id);
            $user_id = $userEntityService->getUserID($id);

            $data = ChatUser::findOrFail($user_id);
            $totalMessageCount = UserMessage::where("user_id", $user_id)->where("admin_id", $admin_id)->count();
            $chatMessages       = $messageService->fetchAdminAndUserMessages($admin_id, $user_id);
            $latesetMessage     = $chatMessages->sortByDesc("created_at")->first();
            $formatted_date = $messageService->formatTime($latesetMessage->created_at);

            $totalMessageCount  = $messageService->selectTotalMessageCount($admin_id, $user_id);
            return response()->json(["userInfo" => $data, "totalCount" => $totalMessageCount, "formatted_date" => $formatted_date]);

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
            $mergedData = [];

            $admin_id = $userEntityService->getAdminID($validated["admin_id"]);
            

            $results = ChatUser::where("line_name", "LIKE", "%{$query}%")->where("account_id", $admin_id)->get();

            foreach($results as $index => $result){
                $chatMessages       = $messageService->fetchAdminAndUserMessages($result->account_id, $result->id);
                $latesetMessage     = $chatMessages->sortByDesc("created_at")->first();
                $totalMessageCount  = $messageService->selectTotalMessageCount($result->account_id, $result->id);

                $mergedData[$index]["userInfo"]         = $result;
                $mergedData[$index]["message"]          = $latesetMessage;
                $mergedData[$index]["formatted_date"]    = $messageService->formatTime($latesetMessage->created_at);
                $mergedData[$index]["totalCount"]            = $totalMessageCount;
                $mergedData[$index]["uuid"]            = $userEntityService->getUserUuid($result->id);
                
            }



            return response()->json(["userInfo" => $mergedData]);
        }catch (\Exception $e){
            return response()->json(['errorrrr' => $e->getMessage()]);
        }
        
    }
}
