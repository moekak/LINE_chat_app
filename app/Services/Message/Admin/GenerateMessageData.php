<?php

namespace App\Services\Message\Admin;


use App\Models\ChatIdentity;
use App\Models\ChatUser;
use Illuminate\Support\Facades\Log;

class GenerateMessageData{
      protected $user_id;
      protected $admin_id;
      protected $userLineID;
      protected $chatIdentityId;

      public function __construct($admin_id, $user_id)
      {
            $this->user_id = $user_id;
            $this->admin_id = $admin_id;
            $this->userLineID = ChatUser::where("id", $user_id)->value("user_id");
            Log::debug($this->admin_id);
            Log::debug($user_id);
            log::debug($this->userLineID);
            $this->chatIdentityId = ChatIdentity::where("original_admin_id", $this->admin_id)->where("chat_user_id", $this->userLineID)->value("id");
            Log::debug("chstIdentityId:$this->chatIdentityId");

      }

      // admin_messagesテーブルに挿入するデータを成型
      public function generateMessageData($content): array{
            return [
                  "user_id" => $this->user_id,
                  "admin_id" => $this->admin_id,
                  "chat_identity_id" => $this->chatIdentityId,
                  "content" => $content
            ];
      }

      // admin_messages_imagesテーブルに挿入するデータを成型
      public  function generateImageData($image): array{
            return [
                  "user_id" => $this->user_id,
                  "admin_id" => $this->admin_id,
                  "chat_identity_id" => $this->chatIdentityId,
                  "image" => $image
            ];
      }

      // admin_messages_imagesテーブルに挿入するデータを成型
      public static function generateImageCropData($adminMessageId, $cropData): array{

            $cropData = json_decode($cropData, true);
            return [
                  "admin_message_id" => $adminMessageId,
                  "url" => $cropData["url"],
                  "x_percent" => $cropData["x_percent"],
                  "y_percent" => $cropData["y_percent"],
                  "width_percent" => $cropData["width_percent"],
                  "height_percent" => $cropData["height_percent"],

            ];
      }
}