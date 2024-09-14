<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserMessageImageRequest;
use App\Http\Requests\UserMessageRequest;
use App\Models\LineAccount;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use App\Services\ImageService;
use App\Services\MessageService;
use Illuminate\Support\Facades\Log;

class UserMessageController extends Controller
{

    public function store(UserMessageRequest $request)
    {

        try {
            $messageService = new MessageService();
            $validated = $request->validated();

            $validated["type"]= "user";
            $validated["message_id"] = $messageService->getLatesetUserMessageID($validated["user_id"], $validated["admin_id"]) + 1;
            $userMessage = UserMessage::create($validated);
            $createdAt = $userMessage->created_at->format('H:i');
            $message_id = $userMessage->message_id;

            $admin_login_id = LineAccount::where("id", $validated["admin_id"])->value("user_id");


            return response()->json(['created_at' => $createdAt, "message_id"=> $message_id, "admin_login_id" => $admin_login_id], 200);
        } catch (\Exception $e) {
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // 画像をデータベースに保存する
    public function storeImage(UserMessageImageRequest $request){
        try{

            $messageService = new MessageService();
            $imageService   = new ImageService();
            
            $validated      = $request->validated();
            $base64Image    = $validated["image"];
            $imageName      = $imageService ->saveBase64Image($base64Image);


            // エラーが起きたら早期リターンさせる
            if(isset($imageName["error"])){
                return response()->json(["error" => $imageName["error"]]);
            }
           
            $data = [
                "user_id" => $validated["user_id"],
                "admin_id" => $validated["admin_id"],
                "message_id" => $messageService->getLatesetUserMessageID($validated["user_id"], $validated["admin_id"]) + 1,
                "type" => "user",
                "image" => $imageName
            ];
            
            // ユーザーチャット画像をデーターベースに保存する
            $userMessageImage = UserMessageImage::create($data);
            $createdAt = $userMessageImage->created_at->format('H:i');
            $message_id = $userMessageImage->message_id;

            $admin_login_id = LineAccount::where("id", $validated["admin_id"])->value("user_id");
    
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
