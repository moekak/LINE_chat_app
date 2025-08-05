<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatUsersCodePrefix extends Model
{


    public function ChatUsersCodePrefixLinks(){
        return $this->hasMany(ChatUsersCodePrefixLink::class,  "chat_users_code_prefix_id", "id");
    }

}
