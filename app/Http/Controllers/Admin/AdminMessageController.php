<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminMessageImageRequest;
use App\Http\Requests\AdminMessageRequest;
use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\LineAccount;
use App\Models\UserEntity;
use App\Services\ImageService;
use App\Services\MessageService;
use App\Services\UserEntityService;

class AdminMessageController extends Controller
{

    // 管理者メッセージをデータベースに保存し、作成日時とmessage_idを返すAPI
    // リクエストで受け取ったデータをバリデート後、管理者メッセージとして保存
    public function store(AdminMessageRequest $request)
    {
        try {
            
            $messageService = new MessageService();
            $userEntityService = new UserEntityService();

            $validated = $request->validated();
            $validated["type"]= "admin";

            $admin_id = $userEntityService->getAdminID($validated["admin_id"]);
            $user_id = $userEntityService->getUserID($validated["user_id"]);
 

            $latestMessageID = $messageService->getLatesetAdminMessageID($user_id, $admin_id);
            $validated["message_id"] = $latestMessageID + 1;
            

            $message_data = [
                "message_id"=> $validated["message_id"],
                "user_id" => $user_id,
                "admin_id" => $admin_id,
                "content" => $validated["content"],
                "type" => "admin"
            ];

          
            $adminMessage = AdminMessage::create($message_data);
            $createdAt = $adminMessage->created_at->format('H:i');
            $message_id = $adminMessage->message_id;

            $admin_login_id = LineAccount::where("id", $admin_id)->value("user_id");
    
            return response()->json(['created_at' => $createdAt, "message_id"=> $message_id,"admin_login_id" => $admin_login_id], 200);

        } catch (\Exception $e) {
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // 画像をデータベースに保存する
    public function storeImage(AdminMessageImageRequest $request){
        try{
            
            $messageService = new MessageService();
            $userEntityService = new UserEntityService();
            $imageService   = new ImageService();
            
            $validated      = $request->validated();
            $base64Image    = $validated["image"];
            $imageName      = $imageService ->saveBase64Image($base64Image);

            $admin_id = $userEntityService->getAdminID($validated["admin_id"]);
            $user_id = $userEntityService->getUserID($validated["user_id"]);



            
            $data = [
                "user_id" => $user_id,
                "admin_id" => $admin_id,
                "message_id" => $messageService->getLatesetAdminMessageID($user_id, $admin_id) + 1,
                "type" => "admin",
                "image" => $imageName
            ];

            
            // ユーザーチャット画像をデーターベースに保存する
            $adminMessageImage = AdminMessageImage::create($data);
            $createdAt = $adminMessageImage->created_at->format('H:i');
            $message_id = $adminMessageImage->message_id;
            $admin_login_id = LineAccount::where("id", $admin_id)->value("user_id");
    
            return response()->json(['created_at' => $createdAt, "message_id"=> $message_id, "admin_login_id" => $admin_login_id], 200);

            
        } catch (\Exception $e) {

            // エラーが発生した場合にエラーメッセージを返す
            return response()->json([
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()  // スタックトレースの文字列
            ], 500);
        }
    }
}
