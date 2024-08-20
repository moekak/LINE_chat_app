<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminMessage;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\UserMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id, $account_id)
    {   
        // 最新のメッセージを保持する配列
        $latestMessages = [];
        $admin_info= LineAccount::where("id", $id)->first();
        $users_info = ChatUser::where("account_id", $id)->get();

        foreach($users_info as $user){
            $userMessages = UserMessage::where("user_id", $user->id)->where("admin_id", $id)->get();
            $adminMessages = AdminMessage::where("user_id", $user->id)->where("admin_id", $id)->get();
    
 

            if(count($userMessages) > 0 || count($adminMessages) > 0){
                $allMessages = $userMessages->merge($adminMessages)->sortByDesc('created_at');
                $latestMessages[] = $allMessages->first();
            }
            
        
        }

        $mergedData = [];


        if(count($latestMessages) > 0){
              // 最新のメッセージを最新順にソート
            $latestMessages = collect($latestMessages)->filter()->sortByDesc(function($message) {
                return $message->created_at;
            });
            foreach($latestMessages as $index => $message){
                $mergedData[$index]["user_info"] = ChatUser::where("id", $message->user_id)->first();
                $mergedData[$index]["message"] = $message->content;
            }
        }

        $adminMessages = AdminMessage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $account_id)->get();
        $userMessages = UserMessage::orderBy("created_at")->where("admin_id", $id)->where("user_id", $account_id)->get();
    

        $messages = $adminMessages->merge($userMessages)->sortBy("created_at");
        $group_message = $this->formatMessage($messages);
        return view("admin.chat", ["admin_info"=> $admin_info, "mergedData" => $mergedData, "user_id" => $account_id, "group_message" => $group_message]);
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
