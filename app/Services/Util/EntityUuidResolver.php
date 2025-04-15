<?php

namespace App\Services\Util;

use App\Models\UserEntity;

class EntityUuidResolver{

    // 管理者のentityを取得する
    public static function getAdminEntity($admin_id){
        return UserEntity::where("entity_type", "admin")->where("related_id", $admin_id)->value("entity_uuid");
    }

    //ユーザーのentityを取得する
    public static function getUserEntity($user_id){
        return UserEntity::where("entity_type", "user")->where("related_id", $user_id)->value("entity_uuid");
    }

    // 管理者のIDを取得する
    static public function getAdminID($admin_id){
        return UserEntity::where("entity_uuid", $admin_id)->where("entity_type", "admin")->value("related_id");
    }

    //ユーザーのIDを取得する
    static public function getUserID($user_id){
            return UserEntity::where("entity_uuid", $user_id)->where("entity_type", "user")->value("related_id");
    }
}