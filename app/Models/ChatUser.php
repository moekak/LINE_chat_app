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
}
