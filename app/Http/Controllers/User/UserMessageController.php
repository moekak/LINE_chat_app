<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserMessageRequest;
use App\Models\BlockChatUser;
use App\Services\Message\Common\MessageService;
use App\Services\Message\Common\MessageSummaryService;
use App\Services\Message\User\UserMessageReadManager;
use App\Services\Util\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserMessageController extends Controller
{

    public function store(UserMessageRequest $request)
    {

        try {
            DB::beginTransaction();
            $messageService = new MessageService();
            $result = $messageService->createMessage($request->validated(), 'user');

            // ブロックユーザーの場合は、未読数を更新しない
            $is_block_user = BlockChatUser::isUserBlocked($result["user_id"]);
            if(!$is_block_user){
                UserMessageReadManager::updateOrCreateUserReadStatus($result["user_id"], $result["admin_id"], $result["message"]->id, "text",1, true);
            }
            // 最新メッセージ管理テーブルの更新
            MessageSummaryService::updateLatestMessage($result["user_id"], $result["admin_id"],  $result["message"]->content, $result["created_at"], "user_txt", true);
            
            DB::commit();
            return response()->json(['created_at' => $result["created_at"]->format('H:i'), "admin_login_id" => $result["admin_login_id"]], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // 画像をデータベースに保存する
    public function storeImage(Request $request){
        try{
    
            DB::beginTransaction();
            $imageService = new ImageService();

            $result = $imageService->validateAndExtractImageData($request);
            $savedData = $imageService->saveImageMessage($result, "user");

            // ブロックユーザーの場合は、未読数を更新しない
            $is_block_user = BlockChatUser::isUserBlocked($result["user_id"]);
            if(!$is_block_user){
                UserMessageReadManager::updateOrCreateUserReadStatus($result["user_id"], $result["admin_id"], $savedData["id"], "image", 1, true);
            }

            // 最新メッセージ管理テーブルの更新
            MessageSummaryService::updateLatestMessage($result["user_id"], $result["admin_id"],"画像が送信されました",  $savedData["created_at"], "user_img", true);
            DB::commit();

            return response()->json(['created_at' => $savedData["created_at"]->format('H:i'), "admin_login_id" => $savedData["admin_login_id"], "imageName" => $result["imageName"]], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(["error" => "Upload failed"], 500);
        }


    }
}
