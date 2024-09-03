<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageReadUserRequest;
use App\Http\Requests\UserMessageRequest;
use App\Models\ChatUser;
use App\Models\MessageReadUser;
use App\Models\UserMessage;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function update(UserMessageRequest $request)
    {
        try {
            $validated = $request->validated();
            $validated["type"]= "user";
    
            $userMessage = UserMessage::create($validated);
            $createdAt = $userMessage->created_at->format('H:i');
            $message_id = $userMessage->id;
    
            return response()->json(['created_at' => $createdAt, "message_id"=> $message_id], 200);
        } catch (\Exception $e) {
            // エラーが発生した場合にエラーメッセージを返す
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateMessageRead(MessageReadUserRequest $request){
        try{
            $validated = $request->validated();
            $validated["read_at"] = Carbon::now();
            MessageReadUser::create($validated);
            return response()->noContent();

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
           
    }

    public function getUserData($id){
        try{
            $data = ChatUser::findOrFail($id);
            return response()->json($data);

        }catch (\Exception $e){
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
