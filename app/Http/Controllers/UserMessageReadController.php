<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserMessageReadRequest;
use App\Services\Message\User\UserMessageReadManager;
use App\Services\Util\EntityUuidResolver;

class UserMessageReadController extends Controller
{
    // 既読管理のテーブルに最新のメッセージIDを挿入する
    public function store(UserMessageReadRequest $request){
        try{
            

            $validated = $request->validated();

            $admin_id = EntityUuidResolver::getAdminID($validated["admin_id"]);
            $chat_user_id = EntityUuidResolver::getUserID($validated["chat_user_id"]);

            // 既に未読管理テーブルにデータがあるか確認
             // 既読管理の処理
             // 0はチャットIDを入れる必要がないから、0に指定
            UserMessageReadManager::updateOrCreateUserReadStatus($chat_user_id, $admin_id, 0, "text", 0);
            return response()->noContent();  // 204 No Content

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
