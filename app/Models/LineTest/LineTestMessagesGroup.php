<?php

namespace App\Models\LineTest;

use Illuminate\Database\Eloquent\Model;

class LineTestMessagesGroup extends Model
{
    public function lineTestMessages()
    {
        return $this->hasMany(LineTestMessage::class, "test_message_group_id", "id");
    }
}
