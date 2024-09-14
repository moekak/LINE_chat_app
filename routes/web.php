<?php

use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\User\AnnouncementsController;
use App\Http\Controllers\User\ChatController as UserChatController;
use Illuminate\Support\Facades\Route;



// 管理者用チャット画面
Route::get("/{id}/{account_id}", [ChatController::class, "index"])->name("admin.chat");

// ユーザー用チャット画面
Route::get("/chat/{adminId}/{userId}", [UserChatController::class, "index"])->name("chat");
Route::get("/chat/announcements/{adminId}/{userId}", [AnnouncementsController::class, "index"])->name("announcements");
