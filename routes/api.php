<?php

use App\Http\Controllers\Admin\AdminMessageController;
use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\User\ChatUserController;
use App\Http\Controllers\User\MessageReadUserController;
use App\Http\Controllers\User\UserMessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YourController;

// ルート定義の例

// 管理者のメッセージをデータースに保存する
Route::post('/admin/messages', [AdminMessageController::class, 'store']);
// ユーザーのメッセージをデータースに保存する
Route::post("/user/messages", [UserMessageController::class, "store"]);
// ユーザーのメッセージに既読をつける
Route::post("/user/messages/read", [MessageReadUserController::class, "store"]);
// 特定のユーザー情報を取得する
Route::get("/users/{user_id}/{receiver_id}", [ChatUserController::class, "getUserData"]);