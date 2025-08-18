<?php

namespace App\Services\Util;

use App\Models\ChatUserDetail;
use App\Models\ChatUsersCodePrefixLink;
use App\Models\InflowAction;
use App\Models\LineAccount;

class GenerateInheritedUrl
{

      static public function generateURL($admin_info, $user_id){ 
            $url = "";
            if($admin_info->second_account_id){
                  $second_account_url = LineAccount::where("id", $admin_info->second_account_id)->value("account_url");  
                  $inflowActionId = ChatUserDetail::where("user_id", $user_id)->value("inflow_action_id");
                  $inflowActionUuid = InflowAction::where("id", $inflowActionId)->value("inflow_action_uuid");
                  $url = config('services.api') ."/" . $inflowActionUuid;
            }

            return $url;

      }

}
