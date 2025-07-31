<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ChatUserDetail extends Model
{
    protected $fillable = [
        "ad_code",
        "access_count",
        "last_accessed_at",
        "user_id"
    ];

    public function chatUser(){
        return $this->belongsTo(ChatUser::class, "user_id", "id");
    }


    static public function updateAccessData($user_id){
        $chatUserDetail = static::where("user_id", $user_id)->first();

        if($chatUserDetail){
            $chatUserDetail->update([
                "access_count" => $chatUserDetail->access_count+ 1,
                "last_accessed_at" => Carbon::now()
            ]);
        }else{
            ChatUserDetail::create([
                "access_count" => 1,
                "last_accessed_at" => Carbon::now(),
                "user_id" => $user_id // ← 必要に応じて追加
            ]);
        }
    }

    public function scopeWithRelations($query){
        return $query->with("chatUser", "chatUser.tagUsers");
    }

    
    static public function getUserDetails($user_id){
        return  static::withRelations()->where("user_id", $user_id)->first();
}

}
