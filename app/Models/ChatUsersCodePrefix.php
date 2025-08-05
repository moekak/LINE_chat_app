<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatUsersCodePrefix extends Model
{


    public function chatUsersCodePrefixLink(){
        return $this->belongsTo(ChatUsersCodePrefixLink::class, "chat_users_code_prefix_id", "id");
    }
    // static public function getPrefix($account_id){
    //     return static::with(["chatUsersCodePrefixLink"])->where("chatUsersCodePrefixLink.account_id", $account_id)->value("prefix");
    //     // return static::with("chatUsersCodePrefixLink")->get();
    // }

    static public function getPrefix($account_id){
        return static::whereHas('chatUsersCodePrefixLink', function($query) use ($account_id) {
            $query->where('account_id', $account_id);
        })->value('prefix');
    }
}
