<?php

namespace App\Services\Util;
use App\Models\ChatUsersCodePrefixLink;

class GenerateCode
{

      static public function generateClientCode($account_id){
            $prefix = ChatUsersCodePrefixLink::getPrefix($account_id)->chatUserCodePrefix->prefix;
            $fixedCode = "C1";
            $randomNumber = substr(str_shuffle('0123456789'), 0, 11);

            return $prefix . $fixedCode . $randomNumber;
      }

}
