<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\UserMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($adminId, $userId)
    {
        
        $admin_info = LineAccount::where("account_id", $adminId)->first();
        $user_id = ChatUser::where("user_id", $userId)->first();
        $adminMessages = AdminMessage::orderBy("created_at")->where("admin_id", $admin_info["id"])->where("user_id", $user_id["id"])->get();
        $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $admin_info["id"])->where("user_id", $user_id["id"])->get();
    
        $messages = $adminMessages->merge($userMessages)->sortBy("created_at");
        $group_message = $this->formatMessage($messages);

        return view("user.chat", ["admin_info" => $admin_info, "user_id" => $user_id, "group_message" => $group_message]);
    }

    public function formatMessage($messages){
        $groupMessages = $messages->groupBy(function($message){
            return Carbon::parse($message->created_at)->format("Y-m-d");
        });

        return $groupMessages;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
