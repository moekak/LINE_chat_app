<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminMessageImage extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "admin_id",
        "message_id",
        "type",
        "image"
    ];
}
