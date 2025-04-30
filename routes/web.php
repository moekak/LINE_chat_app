<?php

use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\User\ChatController as UserChatController;
use Illuminate\Support\Facades\Route;

// Route::middleware(['check.referrer'])->group(function () {
    // システムBの全ルート
    Route::get("/admin/chat/{userId}/{adminId}", [ChatController::class, "index"])->name("admin.chat");
// });
Route::get("/chat/{adminId}/{userId}", [UserChatController::class, "index"])->name("chat");
Route::get('/healthcheck', function () {
    return response('OK', 200);
});



Route::get('/welcome', function () {
    return view("welcome");
});

