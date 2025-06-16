<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckReferrer
{
        /**
     * システムAからの遷移かどうかを確認する
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        // リファラーを取得
        $referer = $request->headers->get('referer');
        
        // 許可するリファラーを配列で定義
        $allowedReferers = [

            // 開発
            'https://manager.line-chat-system-dev.tokyo',
            'https://chat.line-chat-system-dev.tokyo/',

            // 本番
            // 'https://chat-manager.info/',
            // 'https://chat-system.info/'
            // 必要に応じて他のドメインを追加
        ];
        
        // いずれかの許可されたリファラーから来ているか確認
        $isAllowed = false;
        if ($referer) {
            foreach ($allowedReferers as $allowedReferer) {
                if (str_starts_with($referer, $allowedReferer)) {
                    $isAllowed = true;
                    break;
                }
            }
        }
        
        // 許可されたリファラーからの遷移でない場合はエラーを返す
        if (!$isAllowed) {
            // アクセス拒否時の処理（リダイレクトまたは403エラーなど）
            return response()->view('errors.403');
        }
        
        return $next($request);
    }
}
