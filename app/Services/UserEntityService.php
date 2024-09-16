<?php


namespace App\Services;

use App\Models\UserEntity;

class UserEntityService{
      public function getAdminID($admin_id){
            return UserEntity::where("entity_uuid", $admin_id)->where("entity_type", "admin")->value("related_id");
      }
      public function getUserID($user_id){
            return UserEntity::where("entity_uuid", $user_id)->where("entity_type", "user")->value("related_id");
      }

      public function getUserUuid($user_id){
            return UserEntity::where("related_id", $user_id)->where("entity_type", "user")->value("entity_uuid");
      }
}