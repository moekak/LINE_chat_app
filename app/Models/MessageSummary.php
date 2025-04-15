<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageSummary extends Model
{
    use HasFactory;
    protected $fillable = [
        "user_id",
        "admin_id",
        "latest_all_message",
        "latest_all_message_date",
        "latest_all_message_type",
        "latest_user_message_date"
    ];
}
