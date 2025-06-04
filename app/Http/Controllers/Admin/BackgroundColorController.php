<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BackgroundColor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BackgroundColorController extends Controller
{
    public function store(Request $request){
        try {
            $data = [
                "hex" => $request->input("hex"),
                "line_account_id" => $request->input("line_account_id"),
                "r" => $request->input("rgb")["r"],
                "g" => $request->input("rgb")["g"],
                "b" => $request->input("rgb")["b"],
            ];
            $existingData = BackgroundColor::where("line_account_id", $request->input("line_account_id"))->first();

            if($existingData){
                $existingData->update($data);
            }else{
                BackgroundColor::create($data);
            }
            

            return response()->json(["status" => 200, "hex" => $request->input("hex")], 200);
        } catch (\Exception $e) {
            // 例外が発生したときの処理
            Log::debug('エラー: ' . $e->getMessage());
            return response()->json(["status" => 501, "message" => $e->getMessage()]);
        }

    }
}
