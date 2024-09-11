<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\SearchChatUsersRequest;
use App\Models\ChatUser;
use App\Models\UserMessage;
use App\Services\MessageService;
use Illuminate\Http\Request;

class ChatUserController extends Controller
{

    // チャットユーザーのデータを取得するAPI
    public function getUserData($id, $admin_id){
        try{
            $messageService = new MessageService();
            $data = ChatUser::findOrFail($id);

            $totalMessageCount = UserMessage::where("user_id", $id)->where("admin_id", $admin_id)->count();
            $chatMessages       = $messageService->fetchAdminAndUserMessages($admin_id, $id);
            $latesetMessage     = $chatMessages->sortByDesc("created_at")->first();
            $formatted_date = $messageService->formatTime($latesetMessage->created_at);

            $totalMessageCount  = $messageService->selectTotalMessageCount($admin_id, $id);
            return response()->json(["userInfo" => $data, "totalCount" => $totalMessageCount, "formatted_date" => $formatted_date]);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getUserDataBySearch(SearchChatUsersRequest $request){
        try{
            $messageService = new MessageService();
            $validated  = $request->validated();
            $query      = $validated["text"];
            $mergedData = [];

            $results = ChatUser::where("line_name", "LIKE", "%{$query}%")->where("account_id", $validated["admin_id"])->get();

            foreach($results as $index => $result){
                $chatMessages       = $messageService->fetchAdminAndUserMessages($result->account_id, $result->id);
                $latesetMessage     = $chatMessages->sortByDesc("created_at")->first();
                $totalMessageCount  = $messageService->selectTotalMessageCount($result->account_id, $result->id);

                $mergedData[$index]["userData"]         = $result;
                $mergedData[$index]["message"]          = $latesetMessage;
                $mergedData[$index]["formattedData"]    = $messageService->formatTime($latesetMessage->created_at);
                $mergedData[$index]["count"]            = $totalMessageCount;
                
            }



            return response()->json(["userData" => $mergedData]);
        }catch (\Exception $e){
            return response()->json(['errorrrr' => $e->getMessage()]);
        }
        
    }
}
