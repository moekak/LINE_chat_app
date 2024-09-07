<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageReadUserRequest;
use App\Http\Requests\UserMessageImageRequest;
use App\Http\Requests\UserMessageRequest;
use App\Models\ChatUser;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserMessageRequest $request)
    {
        try {
            $validated = $request->validated();
            $validated["type"]= "user";

            $current_message_id = UserMessage::where("user_id", $validated["user_id"])->where("admin_id", $validated["admin_id"])->orderBy("created_at", "desc")->value("message_id");
            $current_message_image_id = UserMessageImage::where("user_id", $validated["user_id"])->where("admin_id", $validated["admin_id"])->orderBy("created_at", "desc")->value("message_id");
            $latest_message_id = 0;

            if ($current_message_id !== null && $current_message_image_id !== null) {
                // 両方の値がある場合、大きい方を取得
                $latest_message_id = max($current_message_id, $current_message_image_id);
            } elseif ($current_message_id !== null) {
                // `UserMessage`のIDがある場合、それを採用
                $latest_message_id = $current_message_id;
            } elseif ($current_message_image_id !== null) {
                // `UserMessageImage`のIDがある場合、それを採用
                $latest_message_id = $current_message_image_id;
            }

            $validated["message_id"] = $latest_message_id + 1;
            $userMessage = UserMessage::create($validated);
            $createdAt = $userMessage->created_at->format('H:i');
            $message_id = $userMessage->mesage_id;
    
            return response()->json(['created_at' => $createdAt, "message_id"=> $message_id], 200);
        } catch (\Exception $e) {
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function storeImage(UserMessageImageRequest $request){
        try{
            
            $validated = $request->validated();

            $base64Image = $validated["image"];
          

            if (preg_match('/^data:image\/(\w+);base64,/', $base64Image, $type)){
                // ファイル形式を取得（例：jpeg, png）
                
                $imageType = strtolower($type[1]); // jpeg, pngなど
           

                // フォーマットが適切か確認
                if (!in_array($imageType, ['jpg', 'jpeg', 'png', 'gif'])) {
                    return response()->json(['error' => 'Invalid image type'], 400);
                }
                // Base64のデータ部分を取り出す

              

                // Base64をデコードしてバイナリデータに変換
                $base64Image = substr($base64Image, strpos($base64Image, ',') + 1);  // プレフィックスを削除
               
         
           
                // return response()->json(['created_at' => $imageData], 200);

                // 画像を保存するパス（例えば、storage/app/public/imagesに保存）
                $imageName = uniqid() . '.' . $imageType;
                $path = storage_path('app/public/images/' . $imageName);
                

                // 画像データをファイルに保存
                file_put_contents($path, base64_decode($base64Image));

          

                $current_message_id = UserMessage::where("user_id", $validated["user_id"])->where("admin_id", $validated["admin_id"])->orderBy("created_at", "desc")->value("message_id");
                $current_message_image_id = UserMessageImage::where("user_id", $validated["user_id"])->where("admin_id", $validated["admin_id"])->orderBy("created_at", "desc")->value("message_id");
                $latest_message_id = 0;
    
                if ($current_message_id !== null && $current_message_image_id !== null) {
                    // 両方の値がある場合、大きい方を取得
                    $latest_message_id = max($current_message_id, $current_message_image_id);
                } elseif ($current_message_id !== null) {
                    // `UserMessage`のIDがある場合、それを採用
                    $latest_message_id = $current_message_id;
                } elseif ($current_message_image_id !== null) {
                    // `UserMessageImage`のIDがある場合、それを採用
                    $latest_message_id = $current_message_image_id;
                }

                $data = [
                    "user_id" => $validated["user_id"],
                    "admin_id" => $validated["admin_id"],
                    "message_id" => $latest_message_id + 1,
                    "type" => "user",
                    "image" => $imageName
                ];
                

                $userMessageImage = UserMessageImage::create($data);

                $createdAt = $userMessageImage->created_at->format('H:i');
                $message_id = $userMessageImage->message_id;
        
                return response()->json(['created_at' => $createdAt, "message_id"=> $message_id], 200);

            }else{
                return response()->json(['error' => 'Invalid image data'], 400);
            }
        } catch (\Exception $e) {
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(['error' => $e->getMessage()]);
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
