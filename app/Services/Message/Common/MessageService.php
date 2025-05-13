<?php

namespace App\Services\Message\Common;

use App\Models\AdminMessage;
use App\Models\BlockChatUser;
use App\Models\ChatIdentity;
use App\Models\ChatUser;
use App\Models\LineAccount;
use App\Models\SecondAccount;
use App\Models\UserMessage;
use App\Models\UserMessageRead;
use App\Services\Util\EntityUuidResolver;
use App\Services\Util\JapaneseDateFormatter;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MessageService{

    const MESSAGES_PER_PAGE = 20;

    //取得したメッセージを日付順にグループ化する(最新順)
    public function groupMessagesByDate($messages){
        $groupMessages = collect($messages)->groupBy(function($message){
            return JapaneseDateFormatter::formatDate($message["created_at"]);
        });// これを追加して日付の逆順にソート

        return $groupMessages;
    }

    // ユーザー未読メッセージの数を取得する(メッセージと画像を含む)
    public function selectTotalMessageCount($admin_id, $user_id){
        $unread_count = UserMessageRead::where("chat_user_id", $user_id)->where("admin_account_id", $admin_id)->value("unread_count");
        return $unread_count;
    }


    public function getMergedData($admin_id, $start, $searchTxt = null,$user_id = null, $userList = []){

        $japaneseDateFormatter = new JapaneseDateFormatter();
        $query = ChatUser::whereNotIn("id", function($query){
                $query->select("chat_user_id")
                    ->from("block_chat_users")
                    ->where("is_blocked", '1');
                })
            ->whereNotIn('chat_users.id', $userList)
            ->where("account_id", $admin_id)
            ->select([
                'chat_users.account_id',
                'chat_users.created_at', 
                'chat_users.line_name',
                'chat_users.id',
                'chat_users.user_picture',
            ]);
    
        // 検索テキストが指定されている場合のみ検索条件を追加
        if ($searchTxt) {
            $query->where("line_name", "LIKE", "%{$searchTxt}%");
        }
        // 特定のユーザーIDが指定されている場合、そのユーザーのみに絞り込む
        if ($user_id) {
            $query->where("id", $user_id);
        }
    
        $users = $query->selectSub(
                DB::table('user_entities')
                    ->select('entity_uuid')
                    ->whereColumn('related_id', 'chat_users.id')
                    ->where('entity_type', 'user')
                    ->limit(1),
                'entity_uuid'
            )
            ->selectSub(
                DB::table('user_message_reads')
                    ->select(DB::raw('COALESCE(unread_count, 0)'))
                    ->whereColumn('chat_user_id', 'chat_users.id')
                    ->limit(1),
                'unread_count'
            )
            ->selectSub(
                DB::table('message_summaries')
                    ->select(DB::raw('DATE_FORMAT(latest_all_message_date, "%Y-%m-%d %H:%i")'))
                    ->where('admin_id', $admin_id)
                    ->whereColumn('user_id', 'chat_users.id')
                    ->whereNotNull('latest_all_message_date'),
                'latest_message_date'
            )
            ->selectSub(
                DB::table('message_summaries')
                    ->select('latest_all_message')
                    ->where('admin_id', $admin_id)
                    ->whereColumn('user_id', 'chat_users.id')
                    ->whereNotNull('latest_all_message'),
                'latest_all_message'
            )
            ->orderByRaw('CASE WHEN unread_count > 0 THEN 0 ELSE 1 END')
            ->orderByRaw('CASE WHEN unread_count > 0 THEN COALESCE(latest_message_date, created_at) END DESC')
            ->orderByRaw('CASE WHEN unread_count = 0 THEN COALESCE(latest_message_date, created_at) END DESC')
            ->skip($start)
            ->take(self::MESSAGES_PER_PAGE)
            ->get()
            ->map(function ($row) use ($japaneseDateFormatter) {
                if ($row->latest_message_date) {
                    $createdAt = Carbon::parse($row->latest_message_date);
                    $row->latest_message_date = $japaneseDateFormatter->formatTime($createdAt);
                }
                return $row;
            });

            return $users;
    }
    

    public function hasUserBlockHistroy($user_ids){
        $block_periods = [];
        // ユーザーのラインアカウントIDを取得する
        $line_user_id = ChatUser::whereIn("id", $user_ids)->value("user_id");
        // $current_user_id = 
        foreach($user_ids as $user_id){
            // ブロックしていた期間を取得する(ブロック日とブロック解除日)
            $block_history = BlockChatUser::getUserBlockHistory($user_id);
            if($block_history->isEmpty()){
                continue;
            }

            $periods = [];

            foreach($block_history as $history){

                if($history->is_blocked == '1'){
                    $periods[] = [
                        "start" => Carbon::parse($history->created_at),
                        "end" => Carbon::now() ,
                        "is_blocked" => 1
                    ];
                }else{
                    $periods[] = [
                        'start' => Carbon::parse($history->created_at),
                        'end' => Carbon::parse($history->updated_at),
                        "is_blocked" => 0
                    ];  
                }
                
            }

            $block_periods[$user_id] = $periods;
        }
        return $block_periods;
    }

    public function getAccountSwitchTimestamp($user_id, $line_user_id){
        // ユーザーごとの管理者IDを取得する
        $admin_id = ChatUser::where("id", $user_id)->value("account_id");
        // 管理者アカウントの予備アカウントを取得する
        $second_account_id = SecondAccount::where("current_account_id", $admin_id)->value("second_account_id");
        // ユーザーが予備アカウントを追加した時刻を取得する(それがバンされたアカウントが切り替えられた時刻になるので、ブロック終了期間)
        $banned_end_date= ChatIdentity::where("original_admin_id", $second_account_id)->where("chat_user_id", $line_user_id)->value("created_at");

        return $banned_end_date;
}

    public function createMessage(array $validatedData, string $senderType)
    {

        $adminId = EntityUuidResolver::getAdminID($validatedData["admin_id"]);
        $userId = EntityUuidResolver::getUserID($validatedData["user_id"]);
        
        // chat identityのidを取得
        $chatIdentityId = ChatIdentity::getIdentityId($adminId, $userId);
        $adminLoginId = LineAccount::where("id", $adminId)->value("user_id");
        
        $messageData = [
            "user_id" => $userId,
            "admin_id" => $adminId,
            "chat_identity_id" => $chatIdentityId,
            "content" => $validatedData["content"],
        ];
        
        // 送信者タイプに基づいて適切なモデルを使用
        $messageModel = $senderType === 'admin' ? AdminMessage::class : UserMessage::class;
        $message = $messageModel::create($messageData);

        
        return [
            'message' => $message,
            'created_at' => $message->created_at,
            'admin_id' => $adminId,
            "admin_login_id" => $adminLoginId,
            'user_id' => $userId
        ];
    }

}