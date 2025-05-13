<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\LineTest\LineTestMessage;
use Illuminate\Http\Request;

class TestSenderController extends Controller
{
    public function index($user_id){
        $testMessages = LineTestMessage::getTestMessages($user_id);


        return view("test.test_chat", compact("testMessages"));
    }
}
