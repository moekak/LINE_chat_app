<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TagUser extends Model
{
    public function tag(){
        return $this->belongsTo(Tag::class, "tag_id", "id");
    }
}
