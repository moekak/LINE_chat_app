<?php

namespace App\Services\Util;

use App\Models\AdminCropArea;
use App\Models\AdminMessageImage;
use App\Models\ChatIdentity;
use App\Models\LineAccount;
use App\Models\UserMessageImage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class ImageService
{
      public function saveImage($imageData){
            try {
                  $fileName = uniqid() . '.' . $imageData->getClientOriginalExtension();
                  $path = 'images/' . $fileName;
                  
                  // S3に画像を保存
                  Storage::disk('s3')->put($path, file_get_contents($imageData->getRealPath()));
                  
                  return $fileName;
      
            } catch (\Exception $e) {
                  Log::error('Image save error: ' . $e->getMessage());
                  return ['error' => 'Failed to save image'];
            }
      }


      /**
     * リクエストから画像データと関連情報を取得する
     *
     * @param Request $request
     * @return array|null 画像データと情報、バリデーションエラー時はnull
     */
      public function validateAndExtractImageData($request){
            // 画像ファイルのチェック
            if (!$request->hasFile('image')) {
                  return null;
            }

            // 基本情報の取得
            $data = [
                  'admin_id' => EntityUuidResolver::getAdminID($request->input('admin_id')),
                  'user_id' => EntityUuidResolver::getUserID($request->input('user_id')),
                  'imageName' => $this->saveImage($request->file('image'))
            ];

            $data["chatIdentityId"] = ChatIdentity::getIdentityId($data["admin_id"], $data["user_id"]);

            // 切り抜き領域とURLが存在する場合のみ追加（管理者画像の場合など）
            if ($request->has('cropArea')) {
                  $data['crop_area'] = json_decode($request->input('cropArea'), true);
            }

            if ($request->has('url')) {
                  $data['url'] = $request->input('url');
            }

            return $data;

      }

      public function saveImageMessage(array $data, string $senderType){
            $insertingCropData = [];
            $insertingData =  [
                  "user_id" => $data["user_id"],
                  "admin_id" => $data["admin_id"],
                  "chat_identity_id" => $data["chatIdentityId"],
                  "image" => $data["imageName"]
            ];

            // 送信者タイプに基づいて適切なモデルを使用
            $messageModel = $senderType === 'admin' ? AdminMessageImage::class : UserMessageImage::class;
            $messageImage = $messageModel::create($insertingData);

            if($senderType === "admin" && $data["crop_area"]){
                  // 画像の指定アリアをDBに保存する
                  $cropAreaData = [
                        "admin_message_id" => $messageImage->id,
                        "x_percent" => $data["crop_area"]["xPercent"],
                        "y_percent" => $data["crop_area"]["yPercent"],
                        "width_percent" => $data["crop_area"]["widthPercent"],
                        "height_percent" => $data["crop_area"]["heightPercent"],
                        "url" => $data["url"]
                  ];

                  $cropArea = AdminCropArea::create($cropAreaData);
                  $insertingCropData = [
                        "x_percent" => $cropArea["x_percent"],
                        "y_percent" => $cropArea["y_percent"],
                        "width_percent" => $cropArea["width_percent"],
                        "height_percent" => $cropArea["height_percent"],
                        "url" => $cropArea["url"]
                  ];
            }

            return [
                  "created_at" => $messageImage->created_at,
                  "id" => $messageImage->id,
                  "admin_login_id" => LineAccount::where("id", $data["admin_id"])->value("user_id"),
                  "cropArea" => $insertingCropData
            ];
      }

}
