<?php

namespace App\Models\LineTest;

use App\Services\Util\JapaneseDateFormatter;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class LineTestMessage extends Model
{
    public function lineMessagesGroup()
    {
        return $this->belongsTo(LineTestMessagesGroup::class, "test_message_group_id", "id");
    }

    public function lineTestCropAreas()
    {
        return $this->hasMany(LineTestCropArea::class, "test_image_id", "id");
    }

    public function scopeWithTables($query, $user_id){
        return $query->whereJsonContains('user_id', $user_id)
            ->with(["lineMessagesGroup", "lineTestCropAreas"]);
    }

    public function scopeWithSelect($query){
        return $query->select("id", "test_message_group_id", "resource", "resource_type", "message_order", "created_at");
    }


    static public function getTestMessages($user_id){
       // ベースクエリ: ユーザーIDでフィルタリングし、必要なリレーションをロード
        $messages = self::withTables($user_id)
            ->withSelect()
            ->orderBy('created_at', 'asc')
            ->get();
        
        // 日付ごとにグループ化
        $messagesByDate = $messages->groupBy(function ($message) {
            return JapaneseDateFormatter::formatDate($message->created_at);
        });
        
        // 各日付内でさらにグループIDでグループ化
        $result = [];
        foreach ($messagesByDate as $date => $messagesOnDate) {
            // 日付キーで初期化
            $result[$date] = $messagesOnDate->groupBy('lineMessagesGroup.id')->toArray();
        }
        
        return $result;
    }
}
