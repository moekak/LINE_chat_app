<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatUsersCodePrefixLink extends Model
{
    protected $table = 'chat_users_code_prefix_link';

    public function chatUsersCodePrefixes(){
        return $this->hasMany(ChatUsersCodePrefix::class, "chat_users_code_prefix_id", "id");
    }
}
