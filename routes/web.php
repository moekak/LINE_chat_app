<?php

use App\Http\Controllers\Admin\ChatController;
use App\Http\Controllers\User\ChatController as UserChatController;
use Illuminate\Support\Facades\Route;

Route::get('/{id}', function () {
    return view('welcome');
});


Route::get("/{id}/{account_id}", [ChatController::class, "index"])->name("admin.chat");


// user
Route::get("/chat/{adminId}/{userId}", [UserChatController::class, "index"]);
