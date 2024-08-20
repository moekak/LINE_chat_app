<?php

use App\Http\Controllers\Admin\AdminMessageController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\User\UserMessageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\YourController;

// ルート定義の例
Route::post('/messages', [AdminMessageController::class, 'update']);
Route::post("/user/messages", [UserMessageController::class, "update"]);