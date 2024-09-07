<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageReadUserRequest;
use App\Models\MessageReadUser;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class MessageReadUserController extends Controller
{

    // 既読管理のテーブルに最新のメッセージIDを挿入する
    public function store(MessageReadUserRequest $request){
        try{
            $validated = $request->validated();
            $validated["read_at"] = Carbon::now();
            MessageReadUser::create($validated);
            return response()->noContent();

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
