<?php


use App\Http\Controllers\Admin\AdminMessageController;
use App\Http\Controllers\Admin\BackgroundColorController;
use App\Http\Controllers\Admin\ChatController as AdminChatController;
use App\Http\Controllers\AdminMessageReadController;
use App\Http\Controllers\User\ChatController as UserChatController;
use App\Http\Controllers\User\ChatUserController;
use App\Http\Controllers\User\UserMessageController;
use App\Http\Controllers\UserMessageReadController;
use Illuminate\Support\Facades\Route;

// ルート定義の例

// 管理者のメッセージをデータースに保存する
// 管理者用チャット画面
// ユーザー用チャット画面
Route::post('/admin/messages', [AdminMessageController::class, 'store']);
Route::post("/admin/messages/image", [AdminMessageController::class, "storeImage"]);
Route::post("/admin/messages/store", [AdminMessageController::class, "storeMessages"]);
// ユーザーのメッセージをデータースに保存する
Route::post("/user/messages", [UserMessageController::class, "store"]);
Route::post("/user/messages/image", [UserMessageController::class, "storeImage"]);
// 管理者のメッセージに既読をつける
Route::post("/admin/messages/read", [AdminMessageReadController::class, "store"]);
// ユーザーのメッセージに既読をつける
Route::post("/user/messages/read", [UserMessageReadController::class, "store"]);

// スクロールでユーザーリストを取得する
Route::post("/users/list", [ChatUserController::class, "fetchUserListByScroll"]);
// 特定のユーザー情報を取得する
Route::get("/users/{user_id}/{receiver_id}", [ChatUserController::class, "getUserData"]);
// 検索されたユーザー情報を取り出す。
Route::post("/search/users", [ChatUserController::class, "getUserDataBySearch"]);
Route::get("/users/messages/lineAccounts/{admin_id}", [AdminChatController::class, "getMergedDataAPI"]);
Route::get("/users/messages/fetch/{start}/{userUuid}/{adminUuid}", [UserChatController::class, "fetchChatMessageByScroll"]);


Route::post("/template/select", [AdminMessageController::class, "insertTemplateData"]);


Route::post("/update/bgColor", [BackgroundColorController::class, "store"]);
Route::get("/get/messages/{userId}/{adminId}", [UserChatController::class, "fetchChatMessages"]);