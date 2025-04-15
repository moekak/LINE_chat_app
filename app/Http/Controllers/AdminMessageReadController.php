<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminMessageReadRequest;
use App\Services\Message\Admin\AdminMessageReadManager;
use App\Services\Util\EntityUuidResolver;

class AdminMessageReadController extends Controller
{
        // 既読管理のテーブルに最新のメッセージIDを挿入する
        public function store(AdminMessageReadRequest $request){
            try{
                $validated = $request->validated();
    
                $admin_id = EntityUuidResolver::getAdminID($validated["admin_id"]);
                $chat_user_id = EntityUuidResolver::getUserID($validated["chat_user_id"]);
    
                // 既に未読管理テーブルにデータがあるか確認
                 // 既読管理の処理
                 // 0はチャットIDを入れる必要がないから、0に指定
                AdminMessageReadManager::updateOrCreateAdminReadStatus($chat_user_id, $admin_id, 0, "text", 0);
                return response()->noContent();
    
            }catch (\Exception $e){
                return response()->json(['error' => $e->getMessage()]);
            }
        }


}
