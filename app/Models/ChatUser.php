<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatUser extends Model
{
    use HasFactory;

    public function userMessage(){
        return $this->hasMany(UserMessage::class, "sender_id");
    }
    

    public function chatUserDetails(){
        return $this->hasMany(ChatUserDetail::class, "user_id", "id");
    }

    public function tagUsers(){
        return $this->hasMany(TagUser::class, "user_id", "id");
    }

}
