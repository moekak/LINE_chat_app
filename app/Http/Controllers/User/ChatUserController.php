<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ChatUser;
use Illuminate\Http\Request;

class ChatUserController extends Controller
{
    public function getUserData($id){
        try{
            $data = ChatUser::findOrFail($id);
            return response()->json($data);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
