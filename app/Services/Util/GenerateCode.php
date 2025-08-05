<?php

namespace App\Services\Util;

use App\Models\AdminCropArea;
use App\Models\AdminMessageImage;
use App\Models\ChatIdentity;
use App\Models\ChatUsersCodePrefix;
use App\Models\LineAccount;
use App\Models\UserMessageImage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class GenerateCode
{

      static public function generateClientCode($account_id){
            $prefix = ChatUsersCodePrefix::getPrefix($account_id);
            print_r($prefix);
            exit;
            $fixedCode = "C1";
            $randomNumber = substr(str_shuffle('0123456789'), 0, 11);

            return $prefix + $fixedCode + $randomNumber;
      }

}
