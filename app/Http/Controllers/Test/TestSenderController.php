<?php

namespace App\Http\Controllers\Test;

use App\Http\Controllers\Controller;
use App\Models\LineTest\LineTestMessage;
use App\Models\LineTestSender;
use Illuminate\Http\Request;

class TestSenderController extends Controller
{
    public function index($user_id){
        $testMessages = LineTestMessage::getTestMessages($user_id);
        $lineName = LineTestSender::where("user_id", $user_id)->value("account_name");

        return view("test.test_chat", compact("testMessages", "lineName"));
    }
}
