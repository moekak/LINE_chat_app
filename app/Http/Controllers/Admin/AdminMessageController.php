<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminMessageImageRequest;
use App\Http\Requests\AdminMessageRequest;
use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\LineAccount;
use App\Services\ImageService;
use App\Services\MessageService;
use Illuminate\Support\Facades\Log;

class AdminMessageController extends Controller
{

    // 管理者メッセージをデータベースに保存し、作成日時とmessage_idを返すAPI
    // リクエストで受け取ったデータをバリデート後、管理者メッセージとして保存
    public function store(AdminMessageRequest $request)
    {
        try {

            $messageService = new MessageService();
            $validated = $request->validated();
            $validated["type"]= "admin";
            $latestMessageID = $messageService->getLatesetAdminMessageID($validated["user_id"], $validated["admin_id"]);
            $validated["message_id"] = $latestMessageID + 1;
    
            $adminMessage = AdminMessage::create($validated);
            $createdAt = $adminMessage->created_at->format('H:i');
            $message_id = $adminMessage->message_id;

            $admin_login_id = LineAccount::where("id", $validated["admin_id"])->value("user_id");
    
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
            $imageService   = new ImageService();
            
            $validated      = $request->validated();
            $base64Image    = $validated["image"];
            $imageName      = $imageService ->saveBase64Image($base64Image);


            // エラーが起きたら早期リターンさせる
            // if(isset($imageName["error"])){
            //     return response()->json(["error" => $imageName["error"]]);
            // }
           
            
            $data = [
                "user_id" => $validated["user_id"],
                "admin_id" => $validated["admin_id"],
                "message_id" => $messageService->getLatesetAdminMessageID($validated["user_id"], $validated["admin_id"]) + 1,
                "type" => "admin",
                "image" => $imageName
            ];

            
            // ユーザーチャット画像をデーターベースに保存する
            $adminMessageImage = AdminMessageImage::create($data);
            $createdAt = $adminMessageImage->created_at->format('H:i');
            $message_id = $adminMessageImage->message_id;
            $admin_login_id = LineAccount::where("id", $validated["admin_id"])->value("user_id");
    
            return response()->json(['created_at' => $createdAt, "message_id"=> $message_id, "admin_login_id" => $admin_login_id], 200);

            
        } catch (\Exception $e) {
            Log::debug("aa");
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
