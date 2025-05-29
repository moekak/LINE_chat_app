<?php

namespace App\Models\LineTest;

use Illuminate\Database\Eloquent\Model;

class LineTestCropArea extends Model
{
    public function lineTestMessage()
    {
        return $this->belongsTo(LineTestMessage::class, "test_image_id", "id");
    }
}
