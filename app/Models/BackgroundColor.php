<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BackgroundColor extends Model
{
    protected $fillable = [
        "hex",
        "r",
        "g",
        "b",
        "line_account_id"
    ];
    
    
}
