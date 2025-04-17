<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\AdminMessageRequest;
use App\Models\AdminCropArea;
use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\ChatIdentity;
use App\Models\LineAccount;
use App\Services\Message\Admin\AdminMessageReadManager;
use App\Services\Message\Admin\GenerateMessageData;
use App\Services\Message\Common\MessageService;
use App\Services\Message\Common\MessageSummaryService;
use App\Services\Util\EntityUuidResolver;
use App\Services\Util\ImageService;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AdminMessageController extends Controller
{

    // 管理者メッセージをデータベースに保存し、作成日時とmessage_idを返すAPI
    // リクエストで受け取ったデータをバリデート後、管理者メッセージとして保存
    public function store(AdminMessageRequest $request)
    {
        try {
            DB::beginTransaction();
            $messageService = new MessageService();
            $result = $messageService->createMessage($request->validated(), 'admin');

            // 最新メッセージ管理テーブルの更新
            MessageSummaryService::updateLatestMessage($result["user_id"], $result["admin_id"], $result["message"]->content, $result["created_at"], "admin_txt");
            AdminMessageReadManager::updateOrCreateAdminReadStatus($result["user_id"], $result["admin_id"], $result["message"]->id, "text", 1, true);

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
            $savedData = $imageService->saveImageMessage($result, "admin");

            // 未読管理テーブルにデータを挿入
            AdminMessageReadManager::updateOrCreateAdminReadStatus($result["user_id"], $result["admin_id"], $savedData["id"], "image", 1, true);
            // 最新メッセージ管理テーブルの更新
            MessageSummaryService::updateLatestMessage($result["user_id"], $result["admin_id"], "画像を送信しました", $savedData["created_at"], "admin_img");
            DB::commit();
    
            return response()->json(['created_at' => $savedData["created_at"]->format('H:i'), "admin_login_id" => $savedData["admin_login_id"], "imageName" => $result["imageName"], "cropArea" => $savedData["cropArea"]], 200);

            
        } catch (\Exception $e) {
            Log::debug($e);
            DB::rollBack();
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(["error" => "Upload failed"], 500);
        }
    }

    public function storeMessages(Request $request){
        //クライアントに返すデータを格納
        $responseData = [];
        // 順序付きのデータを保持する配列を作成
        $orderedItems = [];

        try{
            DB::beginTransaction();
            // messagesのデータを順序付き配列に追加
            if (isset($request->messages) && is_array($request->messages)) {
                foreach ($request->messages as $index => $messageJson) {
                    $messageData = json_decode($messageJson, true);
    
                    $orderedItems[$index] = [
                        'type' => 'message',
                        'content' => $messageData["resource"],
                        "adminUuid" => $messageData["adminUuid"],
                        "userUuid" => $messageData["userUuid"],
                    ];
                }
            }
    
            if (isset($request->images) && is_array($request->images)) {
                $imageService = new ImageService();
                foreach ($request->images as $index => $imageData) {
                    $fileName = $imageService->saveImage($imageData["file"]);
                    $cropData = [];
    
                    if(isset($imageData["url"])){
                        $cropArea = json_decode($imageData["cropArea"]);
                        $cropData = [
                            "url" => $imageData["url"],
                            "x_percent" => $cropArea->xPercent,
                            "y_percent" => $cropArea->yPercent,
                            "width_percent" => $cropArea->widthPercent,
                            "height_percent" => $cropArea->heightPercent,
                        ];
                    }
                    $orderedItems[$index] = [
                        'type' => 'image',
                        'content' => $fileName,
                        "cropArea" => $cropData,
                        "adminUuid" => $imageData["adminUuid"],
                        "userUuid" => $imageData["userUuid"],
                    ];
                }
            }
    
            // キーでソートして順序を保持
            ksort($orderedItems);

            $userId = EntityUuidResolver::getUserID($orderedItems[0]["userUuid"]);
            $adminId = EntityUuidResolver::getAdminID($orderedItems[0]["adminUuid"]);
             // chat identityのidを取得する(データがなかったらnullを返す)
            $chatIdentityId = ChatIdentity::getIdentityId($adminId, $userId);

            foreach ($orderedItems as $index => $item){
                if($index > 0){
                    sleep(1);//1秒待つ
                }
                
                if ($item['type'] === 'message') {
                    // メッセージをDBに保存
    
                    $insertData= [
                        "user_id" => $userId,
                        "admin_id" => $adminId,
                        "chat_identity_id" => $chatIdentityId,
                        "content" => $item["content"]
                    ];
    
                    $amdinMessage = AdminMessage::create($insertData);
    
                    // クライアントに返すデータを格納
                    $responseData[$index] = [
                        "resource" => $amdinMessage["content"], 
                        "type" => "text",
                        "userUuid" => $item["userUuid"],
                        "adminUuid" => $item["adminUuid"],
                        "created_at" => $amdinMessage["created_at"]->format('H:i'),
                    ];
    
                } elseif ($item['type'] === 'image') {
                    // 画像ファイルを保存
    
                    $insertData= [
                        "user_id" => $userId,
                        "admin_id" => $adminId,
                        "chat_identity_id" => $chatIdentityId,
                        "image" => $item["content"]
                    ];
    
                    $adminMessageImage = AdminMessageImage::create($insertData);
    
                    if(count($item["cropArea"]) > 0){
                        $insertCropdata =[
                            "admin_message_id" => $adminMessageImage->id,
                            "url" => $item["cropArea"]["url"],
                            "x_percent" =>$item["cropArea"]["x_percent"],
                            "y_percent" => $item["cropArea"]["y_percent"],
                            "width_percent" =>$item["cropArea"]["width_percent"],
                            "height_percent" => $item["cropArea"]["height_percent"]
                        ];
    
                        $cropArea = AdminCropArea::create($insertCropdata);
                    }
    
                    $responseData[$index] = [
                        "resource" => $adminMessageImage["image"], 
                        "type" => "image",
                        "userUuid" => $item["userUuid"],
                        "adminUuid" => $item["adminUuid"],
                        "created_at" => $adminMessageImage["created_at"]->format('H:i'),
                        "cropArea" => $item["cropArea"],
                    ];


                }

                if($index === 0){
                    // 未読管理テーブルにデータを挿入
                    if($item["type"] === "message"){
                        AdminMessageReadManager::updateOrCreateAdminReadStatus($userId, $adminId, $amdinMessage->id, "text", count($orderedItems), true);
                    }else if($item["type"] === "image"){
                        AdminMessageReadManager::updateOrCreateAdminReadStatus($userId, $adminId, $adminMessageImage->id, "image",count($orderedItems), true);
                    }
            
                };

                if($index + 1 === count($orderedItems)){
                      // 未読管理テーブルにデータを挿入
                    if($item["type"] === "message"){
                        // 最新メッセージ管理テーブルの更新
                        MessageSummaryService::updateLatestMessage($userId, $adminId, $amdinMessage->content, $amdinMessage->created_at, "admin_txt");
                    }else if($item["type"] === "image"){
                        // 最新メッセージ管理テーブルの更新
                        MessageSummaryService::updateLatestMessage($userId, $adminId, "画像を送信しました", $adminMessageImage->created_at, "admin_img");
                    }
                }
            }
            DB::commit();
            return response()->json(["data" =>$responseData]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::debug($e);
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(["error" => "Upload failed"], 500);
        }
    }


    public function insertTemplateData(Request $request){
        try{
            //クライアントに返すデータを格納
            DB::beginTransaction();
            $responseData = [];
            $admin_id = EntityUuidResolver::getAdminID($request->input("admin_uuid"));
            $user_id = EntityUuidResolver::getUserID($request->input("user_uuid"));
            $messages = $request->input("contents");
            $formattedMessages = [];

            foreach($messages as $message){
        
                if(isset($message)){
                    array_push($formattedMessages, $message);
                }
            }
            Log::debug($formattedMessages);
            $generateMessageData = new GenerateMessageData($admin_id, $user_id);

            foreach($formattedMessages as $index => $message){
                if($message["type"] === "text"){
                    $insertingData = $generateMessageData->generateMessageData($message["content"]);
                    $adminMessage = AdminMessage::create($insertingData);

                    // クライアントに返すデータを格納
                    $responseData[$index] = [
                        "resource" => $adminMessage["content"], 
                        "type" => "text",
                        "userUuid" => $request->input("user_uuid"),
                        "adminUuid" => $request->input("admin_uuid"),
                        "created_at" => $adminMessage["created_at"]->format('H:i'),
                    ];

                }else if($message["type"] === "image"){
                    $insertingData = $generateMessageData->generateImageData(basename($message["image_path"]));
                    $adminMessageImage = AdminMessageImage::create($insertingData);
                    if(isset($message["cropArea"]) && $message["cropArea"] !== "") {
                        $insertingCropData = GenerateMessageData::generateImageCropData($adminMessageImage->id, $message["cropArea"]);
                        AdminCropArea::create($insertingCropData);
                    }


                    $responseData[$index] = [
                        "resource" => $adminMessageImage["image"], 
                        "type" => "image",
                        "userUuid" => $request->input("user_uuid"),
                        "adminUuid" => $request->input("admin_uuid"),
                        "created_at" => $adminMessageImage["created_at"]->format('H:i'),
                        "cropArea" => $message["cropArea"] ?? [],
                    ];
                }

                if($index === 0){
                    // 未読管理テーブルにデータを挿入
                    if($message["type"] === "text"){
                        AdminMessageReadManager::updateOrCreateAdminReadStatus($user_id, $admin_id, $adminMessage->id, "text", count($formattedMessages), true);
                    }else if($message["type"] === "image"){
                        AdminMessageReadManager::updateOrCreateAdminReadStatus($user_id, $admin_id, $adminMessageImage->id, "image",count($formattedMessages), true);
                    }
            
                };
    
                if($index + 1 === count($formattedMessages)){
                      // 未読管理テーブルにデータを挿入
                    if($message["type"] === "text"){
                        // 最新メッセージ管理テーブルの更新
                        MessageSummaryService::updateLatestMessage($user_id, $admin_id, $adminMessage->content, $adminMessage->created_at, "admin_txt");
                    }else if($message["type"] === "image"){
                        // 最新メッセージ管理テーブルの更新
                        MessageSummaryService::updateLatestMessage($user_id, $admin_id, "画像を送信しました", $adminMessageImage->created_at, "admin_img");
                    }
                }

                
                sleep(1);
            }


            DB::commit();
            // Log::debug($responseData);
            return response()->json(["data" =>$responseData]);
        }catch(\Exception $e){
            DB::rollBack();
            Log::debug($e);
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(["error" => "Upload failed"], 500);
        }
        
    }
}
    
