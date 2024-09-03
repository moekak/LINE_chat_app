<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageReadUser extends Model
{
    use HasFactory;


    protected $fillable = [
        "message_id",
        "chat_user_id",
        "admin_id",
        "read_at"
    ];
}
