<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatIdentity extends Model
{
    use HasFactory;

    protected $fillable = [
        "original_admin_id",
        "chat_user_id"
    ];

    /**
     * 管理者IDとユーザーIDからChatIdentityのIDを取得する
     *
     * @param int $adminId
     * @param int $userId
     * @return int|null
     */
    public static function getIdentityId($adminId, $userId)
    {
        return self::where("original_admin_id", $adminId)
            ->join("chat_users", "chat_users.user_id", "=", "chat_identities.chat_user_id")
            ->where("chat_users.id", "=", $userId)
            ->value("chat_identities.id");
    }
}
