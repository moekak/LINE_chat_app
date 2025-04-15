<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LineAccount extends Model
{
    use HasFactory;

    public function adminMessage(){
        return $this->hasMany(AdminMessage::class, "sender_id");
    }
}
