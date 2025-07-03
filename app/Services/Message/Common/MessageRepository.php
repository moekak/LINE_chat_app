<?php


namespace App\Services\Message\Common;

use App\Models\AdminMessage;
use App\Models\AdminMessageImage;
use App\Models\BroadcastMessage;
use App\Models\ChatIdentity;
use App\Models\ChatUser;
use App\Models\GreetingMessage;
use App\Models\UserMessage;
use App\Models\UserMessageImage;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MessageRepository{
      const MESSAGES_PER_PAGE = 20;

      public function getAdminMessage($userId, $adminId, $periods){
            // chat_identity_id が adminId の場合に NULL かチェック
            $isChatIdentityExists = DB::table('chat_identities')
                  ->where('original_admin_id', $adminId)
                  ->where("chat_user_id", function ($q) use ($userId) {
                        $q->select("chat_users.user_id")
                              ->from("chat_users")
                              ->where("chat_users.id", "=", $userId);
                        })
                  ->exists();


            if($isChatIdentityExists){
                  $adminMessageQuery = AdminMessage::select(
                        'id',
                        'content as content',
                        'created_at',
                        "user_id",
                        DB::raw("'text' as type"),
                        DB::raw("'admin' as sender_type"),
                        DB::raw("NULL as crop_data"),
                        DB::raw("NULL as url")
                  );
      

                  $adminMessageQuery->where(function ($query) use ($userId, $adminId) {
                        $query->whereNotNull('chat_identity_id')
                              ->whereIn('chat_identity_id', function ($subquery) use ($userId, $adminId) {
                                    $adminCreatedAt = DB::table('chat_identities')
                                          ->where('original_admin_id', '=', $adminId)
                                          ->where("chat_user_id", function ($q) use ($userId) {
                                                $q->select("chat_users.user_id")
                                                ->from("chat_users")
                                                ->where("chat_users.id", "=", $userId);
                                          })
                                          ->value('created_at');
                        
                                    $subquery->select('chat_identities.id')
                                          ->from('chat_identities')
                                          ->join('chat_users', 'chat_identities.chat_user_id', '=', 'chat_users.user_id')
                                          ->where('chat_users.id', '=', $userId)
                                          ->when($adminCreatedAt !== null, function ($q) use ($adminCreatedAt) {
                                                return $q->where('chat_identities.created_at', '<=', $adminCreatedAt);
                                          });
                                    });
                  });
            }else{
                  $adminMessageQuery = AdminMessage::select(
                        'id',
                        'content as content',
                        'created_at',
                        "user_id",
                        DB::raw("'text' as type"),
                        DB::raw("'admin' as sender_type"),
                        DB::raw("NULL as crop_data"),
                        DB::raw("NULL as url")
                  );
                  $adminMessageQuery->where('admin_id', '=', $adminId)->where("user_id", "=", $userId); // ✅ NULL の場合の追加条件
            }



            $userIds = ChatUser::where("user_id", function($query) use($userId){
                  $query->select("user_id")
                  ->from("chat_users")
                  ->where("id", $userId);
            })->pluck('id')->unique();
            $excludedMessageIds = []; // 除外するメッセージのIDを一時保存

            foreach ($userIds as $userId) {
                  if (!isset($periods[$userId])) {
                        continue;
                  }
                  foreach ($periods[$userId] as $period) {
                        if (!isset($period['start']) || !isset($period['end'])) {
                              continue;
                        }

                        // **Tokyo時間をそのまま適用**
                        $start = Carbon::parse($period['start'], 'Asia/Tokyo');
                        $end = Carbon::parse($period['end'], 'Asia/Tokyo');

                        // **取得したメッセージの ID を取得**
                        $matchingMessageIds = AdminMessage::where('user_id', $userId)
                              ->whereBetween('created_at', [$start, $end])
                              ->pluck('id') // `id` の配列だけ取得
                              ->toArray(); // 配列に変換


                        // **除外リストに追加**
                        $excludedMessageIds = array_merge($excludedMessageIds, $matchingMessageIds);
                  }
            }

            $excludedMessageIds = array_map('intval', array_values($excludedMessageIds));

            // **除外するメッセージを `adminMessageQuery` に適用**
            if (!empty($excludedMessageIds)) {
                  // **単一の要素でも `whereIn()` を適切に処理できるようにする**
                  if (count($excludedMessageIds) === 1) {
                        $adminMessageQuery->where('id', '!=', $excludedMessageIds[0]);
                  } else {
                        $adminMessageQuery->whereNotIn('id', $excludedMessageIds);
                  }
            } 

            return $adminMessageQuery;
      }

      public function getAdminMessageImage($userId, $adminId, $periods = null){
            $isChatIdentityExists = DB::table('chat_identities')
                  ->where('original_admin_id', $adminId)
                  ->where("chat_user_id", function ($q) use ($userId) {
                        $q->select("chat_users.user_id")
                              ->from("chat_users")
                              ->where("chat_users.id", $userId);
                        })
                  ->exists();

            if($isChatIdentityExists){
                  // AdminMessageImage クエリ
                  $adminImageQuery = AdminMessageImage::select(
                        'id',
                        'image as content',
                        'created_at',
                        'user_id',
                        DB::raw("'image' as type"),
                        DB::raw("'admin' as sender_type")
                  );


                  $adminImageQuery->where(function ($query) use ($userId, $adminId) {
                        $query->whereNotNull('chat_identity_id')
                              ->whereIn('chat_identity_id', function ($subquery) use ($userId, $adminId) {
                                    $adminCreatedAt = DB::table('chat_identities')
                                          ->where('original_admin_id', '=', $adminId)
                                          ->where("chat_user_id", function ($q) use ($userId) {
                                                $q->select("chat_users.user_id")
                                                ->from("chat_users")
                                                ->where("chat_users.id", "=", $userId);
                                          })
                                          ->value('created_at');
                        
                                    $subquery->select('chat_identities.id')
                                          ->from('chat_identities')
                                          ->join('chat_users', 'chat_identities.chat_user_id', '=', 'chat_users.user_id')
                                          ->where('chat_users.id', '=', $userId)
                                          ->when($adminCreatedAt !== null, function ($q) use ($adminCreatedAt) {
                                                return $q->where('chat_identities.created_at', '<=', $adminCreatedAt);
                                          });
                                    });
                        });
                  $adminImageQuery->selectSub(
                        DB::table('admin_crop_areas')
                              ->selectRaw("JSON_OBJECT(
                                    'x_percent', x_percent,
                                    'y_percent', y_percent,
                                    'width_percent', width_percent,
                                    'height_percent', height_percent
                              )")
                              ->whereColumn('admin_message_id', 'admin_message_images.id'),
                              'crop_data' // サブクエリ結果をまとめた名前
                  )->selectSub(
                        DB::table('admin_crop_areas')
                              ->select('url') // URLを別に取得
                              ->whereColumn('admin_message_id', 'admin_message_images.id')
                              ->limit(1), // 必要に応じて制限
                              'url' // サブクエリ結果のエイリアス
                  );
            }else{
                  // AdminMessageImage クエリ
                  $adminImageQuery = AdminMessageImage::select(
                        'id',
                        'image as content',
                        'created_at',
                        'user_id',
                        DB::raw("'image' as type"),
                        DB::raw("'admin' as sender_type")
                  );
                  $adminImageQuery->selectSub(
                        DB::table('admin_crop_areas')
                              ->selectRaw("JSON_OBJECT(
                                    'x_percent', x_percent,
                                    'y_percent', y_percent,
                                    'width_percent', width_percent,
                                    'height_percent', height_percent
                              )")
                              ->whereColumn('admin_message_id', 'admin_message_images.id'),
                              'crop_data' // サブクエリ結果をまとめた名前
                  )->selectSub(
                        DB::table('admin_crop_areas')
                              ->select('url') // URLを別に取得
                              ->whereColumn('admin_message_id', 'admin_message_images.id')
                              ->limit(1), // 必要に応じて制限
                              'url' // サブクエリ結果のエイリアス
                  )->where("admin_id", $adminId)->where("user_id", $userId);
            }


            // 取得したメッセージの user_id を取得
            $userIds = $adminImageQuery->pluck('user_id')->unique();
            $excludedMessageIds = []; // 除外するメッセージのIDを一時保存

            foreach ($userIds as $userId) {
                  if (!isset($periods[$userId])) {
                        continue;
                  }
                  foreach ($periods[$userId] as $period) {
                        if (!isset($period['start']) || !isset($period['end'])) {
                              continue;
                        }

                        // **Tokyo時間をそのまま適用**
                        $start = Carbon::parse($period['start'], 'Asia/Tokyo');
                        $end = Carbon::parse($period['end'], 'Asia/Tokyo');

                        // **取得したメッセージの ID を取得**
                        $matchingMessageIds = AdminMessageImage::where('user_id', $userId)
                              ->whereBetween('created_at', [$start, $end])
                              ->pluck('id') // `id` の配列だけ取得
                              ->toArray(); // 配列に変換


                        // **除外リストに追加**
                        $excludedMessageIds = array_merge($excludedMessageIds, $matchingMessageIds);
                  }
            }


            $excludedMessageIds = array_map('intval', array_values($excludedMessageIds));

            // **除外するメッセージを `adminMessageQuery` に適用**
            if (!empty($excludedMessageIds)) {
                  // **単一の要素でも `whereIn()` を適切に処理できるようにする**
                  if (count($excludedMessageIds) === 1) {
                        $adminImageQuery->where('id', '!=', $excludedMessageIds[0]);
                  } else {
                        $adminImageQuery->whereNotIn('id', $excludedMessageIds);
                  }
            } 

            return $adminImageQuery;
      }


      public function getUserMessage($userId, $adminId, $periods = null){
            // chat_identity_id が adminId の場合に NULL かチェック
            $isChatIdentityExists = DB::table('chat_identities')
                  ->where('original_admin_id', $adminId)
                  ->where("chat_user_id", function ($q) use ($userId) {
                        $q->select("chat_users.user_id")
                              ->from("chat_users")
                              ->where("chat_users.id", "=", $userId);
                        })
                  ->exists();

            if($isChatIdentityExists){
                  // UserMessage クエリ
                  $userMessageQuery = UserMessage::select(
                        'id',
                        'content as content',
                        'created_at',
                        'user_id',
                        DB::raw("'text' as type"),
                        DB::raw("'user' as sender_type"),
                        DB::raw("NULL as crop_data"),
                        DB::raw("NULL as url")
                  );
                        
                  $userMessageQuery->where(function ($query) use ($userId, $adminId) {
                        $query->whereNotNull('chat_identity_id')
                              ->whereIn('chat_identity_id', function ($subquery) use ($userId, $adminId) {
                                    $adminCreatedAt = DB::table('chat_identities')
                                          ->where('original_admin_id', '=', $adminId)
                                          ->where("chat_user_id", function ($q) use ($userId) {
                                                $q->select("chat_users.user_id")
                                                ->from("chat_users")
                                                ->where("chat_users.id", "=", $userId);
                                          })
                                          ->value('created_at');
                        
                                    $subquery->select('chat_identities.id')
                                          ->from('chat_identities')
                                          ->join('chat_users', 'chat_identities.chat_user_id', '=', 'chat_users.user_id')
                                          ->where('chat_users.id', '=', $userId)
                                          ->when($adminCreatedAt !== null, function ($q) use ($adminCreatedAt) {
                                                return $q->where('chat_identities.created_at', '<=', $adminCreatedAt);
                                          });
                                    });
                        });

            }else{
                  // UserMessage クエリ
                  $userMessageQuery = UserMessage::select(
                        'id',
                        'content as content',
                        'created_at',
                        'user_id',
                        DB::raw("'text' as type"),
                        DB::raw("'user' as sender_type"),
                        DB::raw("NULL as crop_data"),
                        DB::raw("NULL as url")
                  );
                        
                  $userMessageQuery->where("admin_id", $adminId)->where("user_id", $userId);
            }


            // 取得したメッセージの user_id を取得
            $userIds = $userMessageQuery->pluck('user_id')->unique();
            $excludedMessageIds = []; // 除外するメッセージのIDを一時保存

            foreach ($userIds as $userId) {
                  if (!isset($periods[$userId])) {
                        continue;
                  }
                  foreach ($periods[$userId] as $period) {
                        if (!isset($period['start']) || !isset($period['end'])) {
                              continue;
                        }

                        // **Tokyo時間をそのまま適用**
                        $start = Carbon::parse($period['start'], 'Asia/Tokyo');
                        $end = Carbon::parse($period['end'], 'Asia/Tokyo');

                        // **取得したメッセージの ID を取得**
                        $matchingMessageIds = UserMessage::where('user_id', $userId)
                              ->whereBetween('created_at', [$start, $end])
                              ->pluck('id') // `id` の配列だけ取得
                              ->toArray(); // 配列に変換


                        // **除外リストに追加**
                        $excludedMessageIds = array_merge($excludedMessageIds, $matchingMessageIds);
                  }
            }


            $excludedMessageIds = array_map('intval', array_values($excludedMessageIds));

            // **除外するメッセージを `adminMessageQuery` に適用**
            if (!empty($excludedMessageIds)) {
                  // **単一の要素でも `whereIn()` を適切に処理できるようにする**
                  if (count($excludedMessageIds) === 1) {
                        $userMessageQuery->where('id', '!=', $excludedMessageIds[0]);
                  } else {
                        $userMessageQuery->whereNotIn('id', $excludedMessageIds);
                  }
            };

            return $userMessageQuery;
      }

      public function getUserMessageImage($userId, $adminId, $periods = null){

            // chat_identity_id が adminId の場合に NULL かチェック
            $isChatIdentityExists = DB::table('chat_identities')
                  ->where('original_admin_id', $adminId)
                  ->where("chat_user_id", function ($q) use ($userId) {
                        $q->select("chat_users.user_id")
                              ->from("chat_users")
                              ->where("chat_users.id", "=", $userId);
                        })
                  ->exists();

            if($isChatIdentityExists){
                  // UserMessageImage クエリ
                  $userImageQuery = UserMessageImage::select(
                        'id',
                        'image as content',
                        'created_at',
                        'user_id',
                        DB::raw("'image' as type"),
                        DB::raw("'user' as sender_type"),
                        DB::raw("NULL as crop_data"),
                        DB::raw("NULL as url")
                  );


                  $userImageQuery->where(function ($query) use ($userId, $adminId) {
                        $query->whereNotNull('chat_identity_id')
                              ->whereIn('chat_identity_id', function ($subquery) use ($userId, $adminId) {
                                    $adminCreatedAt = DB::table('chat_identities')
                                          ->where('original_admin_id', '=', $adminId)
                                          ->where("chat_user_id", function ($q) use ($userId) {
                                                $q->select("chat_users.user_id")
                                                ->from("chat_users")
                                                ->where("chat_users.id", "=", $userId);
                                          })
                                          ->value('created_at');
                        
                                    $subquery->select('chat_identities.id')
                                          ->from('chat_identities')
                                          ->join('chat_users', 'chat_identities.chat_user_id', '=', 'chat_users.user_id')
                                          ->where('chat_users.id', '=', $userId)
                                          ->when($adminCreatedAt !== null, function ($q) use ($adminCreatedAt) {
                                                return $q->where('chat_identities.created_at', '<=', $adminCreatedAt);
                                          });
                                    });
                  });
            }else{
                  // UserMessageImage クエリ
                  $userImageQuery = UserMessageImage::select(
                        'id',
                        'image as content',
                        'created_at',
                        'user_id',
                        DB::raw("'image' as type"),
                        DB::raw("'user' as sender_type"),
                        DB::raw("NULL as crop_data"),
                        DB::raw("NULL as url")
                  );


                  $userImageQuery->where("admin_id", $adminId)->where("user_id", $userId);
            }

            


            // 取得したメッセージの user_id を取得
            $userIds = $userImageQuery->pluck('user_id')->unique();
            $excludedMessageIds = []; // 除外するメッセージのIDを一時保存

            foreach ($userIds as $userId) {
                  if (!isset($periods[$userId])) {
                        continue;
                  }
                  foreach ($periods[$userId] as $period) {
                        if (!isset($period['start']) || !isset($period['end'])) {
                              continue;
                        }

                        // **Tokyo時間をそのまま適用**
                        $start = Carbon::parse($period['start'], 'Asia/Tokyo');
                        $end = Carbon::parse($period['end'], 'Asia/Tokyo');

                        // **取得したメッセージの ID を取得**
                        $matchingMessageIds = UserMessageImage::where('user_id', $userId)
                              ->whereBetween('created_at', [$start, $end])
                              ->pluck('id') // `id` の配列だけ取得
                              ->toArray(); // 配列に変換


                        // **除外リストに追加**
                        $excludedMessageIds = array_merge($excludedMessageIds, $matchingMessageIds);
                  }
            }


            $excludedMessageIds = array_map('intval', array_values($excludedMessageIds));


            // **除外するメッセージを `adminMessageQuery` に適用**
            if (!empty($excludedMessageIds)) {
                  // **単一の要素でも `whereIn()` を適切に処理できるようにする**
                  if (count($excludedMessageIds) === 1) {
                        $userImageQuery->where('id', '!=', $excludedMessageIds[0]);
                  } else {
                        $userImageQuery->whereNotIn('id', $excludedMessageIds);
                  }
            };

            
            return $userImageQuery;
      }

      public function getBroadcastMessages($userId, $adminId, $periods = null){

            // ユーザーのLINEユーザーIDをDBから取得する
            $line_user_id = ChatUser::where("id", $userId)->value("user_id");
            // 同じLINEユーザーIDのユーザーの管理者IDをchat Identitiesから取得する
            $admin_ids = ChatIdentity::where("chat_user_id", $line_user_id)->where("chat_identities.created_at", "<=", function($query) use ($adminId, $line_user_id){
                  $query->select("created_at")
                  ->from("chat_identities")
                  ->where("original_admin_id", $adminId)
                  ->where("chat_user_id", $line_user_id);
            })
            ->pluck("original_admin_id");

            if(count($admin_ids) == 0){
                  $admin_ids = [$adminId];
            }

            // 各admin_idに対応するユーザー作成日時のマッピングを取得
            $adminUserCreatedAtMap = ChatUser::whereIn('account_id', $admin_ids)->where("user_id", $line_user_id)
                  ->select('account_id', 'created_at')
                  ->get()
                  ->pluck('created_at', 'account_id')
                  ->toArray();


            // 各admin_idに対して、対応するユーザー作成日時より後のメッセージを取得
            $broadcastQuery = BroadcastMessage::select(
                  'id',
                  'resource as content',
                  'created_at',
                  DB::raw("NULL as user_id"),
                  DB::raw("resource_type as type"),
                  DB::raw("'admin' as sender_type")
            )
            ->where(function($query) use ($adminUserCreatedAtMap, $adminId) {
                  if (!empty($adminUserCreatedAtMap)) {
                      // $adminUserCreatedAtMap がある場合
                        foreach ($adminUserCreatedAtMap as $adminId => $createdAt) {
                              $query->orWhere(function($q) use ($adminId, $createdAt) {
                                    $q->where('admin_id', $adminId)
                                    ->where('created_at', '>', $createdAt);
                              });
                        }
                  } else {
                        // $adminUserCreatedAtMap がない場合
                        $query->where('admin_id', $adminId);
                  }
            })
            ->selectSub(
                  DB::table('broadcast_images_crop_areas')
                        ->selectRaw("JSON_OBJECT(
                              'x_percent', x_percent,
                              'y_percent', y_percent,
                              'width_percent', width_percent,
                              'height_percent', height_percent
                        )")
                        ->whereColumn('broadcast_message_id', 'broadcast_messages.id'),
                        'crop_data' // サブクエリ結果をまとめた名前
            )->selectSub(
                  DB::table('broadcast_images_crop_areas')
                        ->select('url') // URLを別に取得
                        ->whereColumn('broadcast_message_id', 'broadcast_messages.id')
                        ->limit(1), // 必要に応じて制限
                        'url' // サブクエリ結果のエイリアス
                  );


            // 取得したメッセージの user_id を取得
            // $userIds = $adminMessageQuery->pluck('user_id')->unique();
            $userIds = ChatUser::where("user_id", function($query) use($userId){
                  $query->select("user_id")
                  ->from("chat_users")
                  ->where("id", $userId);
            })->pluck('id')->unique();
            $excludedMessageIds = []; // 除外するメッセージのIDを一時保存

            foreach ($userIds as $userId) {
                  if (!isset($periods[$userId])) {
                        continue;
                  }
                  foreach ($periods[$userId] as $period) {
                        if (!isset($period['start']) || !isset($period['end'])) {
                              continue;
                        }

                        // **Tokyo時間をそのまま適用**
                        $start = Carbon::parse($period['start'], 'Asia/Tokyo');
                        $end = Carbon::parse($period['end'], 'Asia/Tokyo');

                        // **取得したメッセージの ID を取得**
                        $matchingMessageIds = BroadcastMessage::where('admin_id', function($query) use($userId){
                              $query->select("account_id")
                              ->from("chat_users")
                              ->where("id", $userId);
                        })
                        ->whereBetween('created_at', [$start, $end])
                        ->pluck('id') // `id` の配列だけ取得
                        ->toArray(); // 配列に変換

                        // **除外リストに追加**
                        $excludedMessageIds = array_merge($excludedMessageIds, $matchingMessageIds);
                  }
            }

            $excludedMessageIds = array_map('intval', array_values($excludedMessageIds));

            // **除外するメッセージを `adminMessageQuery` に適用**
            if (!empty($excludedMessageIds)) {
                  // **単一の要素でも `whereIn()` を適切に処理できるようにする**
                  if (count($excludedMessageIds) === 1) {
                        $broadcastQuery->where('id', '!=', $excludedMessageIds[0]);
                  } else {
                        $broadcastQuery->whereNotIn('id', $excludedMessageIds);
                  }
            } 

            return $broadcastQuery;
      }


      public function unionAllQueryForAdmin($userId, $adminId, $periods, $type, $start, $unreadCount){

            $query = $this->getAdminMessage($userId, $adminId, $type === "withNoBlock" ? [] : $periods)
                  ->union($this->getAdminMessageImage($userId, $adminId,  $type == "withNoBlock" ? [] : $periods))
                  ->union($this->getUserMessage($userId, $adminId, $type === "admin" ? $periods : []))
                  ->union($this->getUserMessageImage($userId, $adminId, $type === "admin" ? $periods : []))
                  ->union($this->getBroadcastMessages($userId, $adminId, $type === "withNoBlock" ? [] :$periods));


            // 取得件数を決定（未読メッセージが20件より多い場合はその数を使用）
            $messagesLimit = self::MESSAGES_PER_PAGE < $unreadCount ? $unreadCount : self::MESSAGES_PER_PAGE;
            $messages = DB::query()
                  ->fromSub($query, 'combined_messages')
                  ->orderBy('created_at', 'desc')
                  ->orderBy('id', 'desc')
                  ->skip($start)
                  ->take($messagesLimit)
                  ->get()
                  ->map(function($message) {
                        return [
                              'id' => $message->id,
                              'content' => $message->content,
                              'created_at' =>  Carbon::parse($message->created_at),
                              'type' => $message->type,
                              'sender_type' => $message->sender_type,
                              "crop_data" => $message->crop_data,
                              "url" => $message->url
                        ];
                  })
                  ->reverse();  // ここで順序を逆転させる

      
            $first_messages = DB::query()
            ->fromSub($query, 'combined_messages')
            ->orderBy('created_at', 'desc')
            ->orderBy('id', 'desc')
            ->skip($start)
            ->take($messagesLimit + 1)
            ->get()
            ->map(function($message) {
                  return [
                        'id' => $message->id,
                        'content' => $message->content,
                        'created_at' =>  Carbon::parse($message->created_at),
                        'type' => $message->type,
                        'sender_type' => $message->sender_type,
                        "crop_data" => $message->crop_data,
                        "url" => $message->url
                  ];
            })
            ->reverse();  // ここで順序を逆転させる

            // 取得したメッセージが最後のデータだった場合、もしくはメッセージがない場合、２０件未満の場合は初回挨拶メッセージを取得する
            if((count($first_messages) <= 20 && count($first_messages) > 0) || ($start === 0 && (count($messages) === 0 || (count($messages) === count($first_messages))) )){
                  $greetingMessages = $this->getGreetingMessages($userId, $adminId);
                  $messages = array_merge($greetingMessages->toArray(), $messages->toArray());
            }

            return $messages;
      }


      public function getGreetingMessages($user_id, $admin_id){
            $line_user_id = ChatUser::where("id", $user_id)->value("user_id");
            // 同じLINEユーザーIDのユーザーの管理者IDをchat Identitiesから取得する
            $original_admin_id = ChatIdentity::where("chat_user_id", $line_user_id)->oldest()->value('original_admin_id');

            if($original_admin_id == null){
                  $original_admin_id = $admin_id;
            }

            // ユーザーに表示する初回メッセージメッセージを格納する配列
            $greetingMessagesAll = [];
            // resource_typeを削除し、他のクエリと同じ構造にする
            $query = GreetingMessage::select(
                  'id',
                  'resource as content',  // messageカラムをcontentとしてエイリアス
                  'created_at',
                  'greeting_message_group_id',
                  'resource_type'
            )
            ->where('admin_id', $original_admin_id)
            ->selectSub(
                  DB::table('greeting_images_crop_areas')
                        ->selectRaw("JSON_OBJECT(
                              'x_percent', x_percent,
                              'y_percent', y_percent,
                              'width_percent', width_percent,
                              'height_percent', height_percent
                        )")
                        ->whereColumn('greeting_message_id', 'greeting_messages.id'),
                        'crop_data' // サブクエリ結果をまとめた名前
            )->selectSub(
                  DB::table('greeting_images_crop_areas')
                        ->select('url') // URLを別に取得
                        ->whereColumn('greeting_message_id', 'greeting_messages.id')
                        ->limit(1), // 必要に応じて制限
                        'url' // サブクエリ結果のエイリアス
                  );


            $user = ChatUser::where("account_id", $original_admin_id)->where("user_id", $line_user_id)->first();
            $user_createdAt = $user->created_at;
            $line_name = $user->line_name;

            $greetingMessages = $query->get();
            $latestMessage = null;
            $latestCreatedAt = null;
            $messageGroupId = null;

                // 各ブロードキャストメッセージをチェック
            foreach($greetingMessages as $message){
                  $messge_createdAt = $message["created_at"];
                  // ユーザーの作成日時よりも先に作成されたメッセージのみを表示対象とする
                  if($user_createdAt > $messge_createdAt){
                        // 時間差を計算
                         // 現在のメッセージが既存の最新メッセージよりも新しい場合
                        if($latestCreatedAt === null || $messge_createdAt > $latestCreatedAt) {
                              $latestCreatedAt = $messge_createdAt;
                              $latestMessage = $message;
                              $messageGroupId = $message["greeting_message_group_id"];  // グループIDを保存
                        }
                  }
            }
           // 最新のメッセージが見つかった場合、それを追加
            if($latestMessage) {
                  foreach($greetingMessages as $message) {
                        if($message["greeting_message_group_id"] == $messageGroupId) {
                              if($message->resource_type === "greeting_text"){
                                    // 名前を入力して挨拶メッセージを送信する場合、ユーザーの名前に変換する
                                    if(mb_strpos($message->content, '{名前}') !== false){
                                          $message->content = str_replace("{名前}", $line_name, $message->content);
                                    }
                              };
                              $greetingMessagesAll[] = $message;
                        }
                  }
            }

            // 配列をCollectionに変換してから処理
            $greetingMessagesAll = collect($greetingMessagesAll)->map(function ($message) use ($user_id, $user_createdAt) {
                  return $this->formatMessage($message, $message["resource_type"], "admin", $user_createdAt, $message["crop_data"], $message["url"]);
            });


            return $greetingMessagesAll;
      }


       // メッセージを共通のフォーマットに変換する
      private function formatMessage($message, string $type, string $sender_type, $date, $cropData, $url): array
      {
            return [
                  'id' => $message->id,
                  'content' => $message->resource ?? $message->content ??  $message->image ?? '',
                  'created_at' => $date,
                  'type' => $type,
                  "sender_type" => $sender_type,
                  "crop_data" => $cropData,
                  "url" => $url
            ];
      }


}