<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminCropArea extends Model
{
    use HasFactory;

    protected $fillable = [
        "admin_message_id",
        "x_percent",
        "y_percent",
        "width_percent",
        "height_percent",
        "url"
    ];
}
