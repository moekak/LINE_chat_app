<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlockChatUser extends Model
{
    use HasFactory;

    /**
     * ユーザーが現在ブロックされているかチェック
     *
     * @param int $userId
     * @return bool
     */
    public static function isUserBlocked($userId)
    {
        return self::where("chat_user_id", $userId)
            ->where("is_blocked", "1")
            ->exists();
    }


        /**
     * ユーザーのブロック履歴を取得
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public static function getUserBlockHistory($userId)
    {
        return self::where("chat_user_id", $userId)
            ->select("created_at", "updated_at", "is_blocked")
            ->get();
    }

    /**
     * ユーザーの最新のブロック状態を取得
     *
     * @param int $userId
     * @return BlockChatUser|null
     */
    public static function getLatestBlockStatus($userId)
    {
        return self::where("chat_user_id", $userId)
            ->where("is_blocked", "1")
            ->orderBy("created_at", "desc")
            ->first();
    }

    
}
