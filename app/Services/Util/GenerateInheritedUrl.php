<?php

namespace App\Services\Util;

use App\Models\ChatUserDetail;
use App\Models\ChatUsersCodePrefixLink;
use App\Models\InflowAction;
use App\Models\InflowActionUrl;
use App\Models\Liff;
use App\Models\LineAccount;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GenerateInheritedUrl
{

      static public function generateURL($admin_info, $user_id){ 
            $url = "";
            if($admin_info->second_account_id){
                  $inflowActionId = ChatUserDetail::where("user_id", $user_id)->value("inflow_action_id");

                  if($inflowActionId){
                        $inflowActionUuid = InflowAction::where("id", $inflowActionId)->value("inflow_action_uuid");
                        $url = config('services.api') ."/" . $inflowActionUuid;  
                  }else{

                        $liff = Liff::where("account_id", $admin_info->second_account_id)->value("liff_id");
                        if($liff){
                              $inflowActionUuid = DB::table("inflow_actions as ia")
                                    ->join('inflow_action_links as ial', 'ial.inflow_action_id', '=', 'ia.id')
                                    ->where('ial.account_id', $admin_info->second_account_id)
                                    ->value("ia.inflow_action_uuid");

                              Log::debug($inflowActionUuid);
                              $url = static::generateDirectURL($inflowActionUuid); 
                        }else{
                              $url = LineAccount::where("id", $admin_info->second_account_id)->value("account_url");  
                        }
                        
                  }
                  
            }
            Log::debug($url);

            return $url;

      }

      static public function generateDirectURL(string $uuid){
            $inflowActionId = InflowAction::where("inflow_action_uuid", $uuid)->value("id");
            $currentAccountId = InflowActionUrl::where("inflow_action_id", $inflowActionId)->value("current_account_id");
            $newLiffId = Liff::where("account_id", $currentAccountId)->value("liff_id");
            $newUrl = LineAccount::where("id", $currentAccountId)->value("account_url");

            $params = [
                  'id' => $uuid,
                  'account' => $currentAccountId,
                  'liff' => $newLiffId,  // 正しいLIFF IDを渡す
                  'url' => $newUrl
            ];

            $liffUrl = "https://liff.line.me/$newLiffId?". http_build_query($params);
            return $liffUrl;
      }

}
