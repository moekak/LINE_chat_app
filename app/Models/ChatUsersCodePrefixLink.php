<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatUsersCodePrefixLink extends Model
{
    protected $table = 'chat_users_code_prefix_link';

    public function ChatUserCodePrefix(){
        return $this->belongsTo(ChatUsersCodePrefix::class, "chat_users_code_prefix_id", "id");
    }

    public function scopeWithRelations($query){
        return $query->with(["chatUserCodePrefix:id,prefix"]);
    }

    static public function getPrefix($account_id){
        return static::withRelations()->where("account_id", $account_id)->first(['id', 'account_id', 'chat_users_code_prefix_id']);
    }

}
