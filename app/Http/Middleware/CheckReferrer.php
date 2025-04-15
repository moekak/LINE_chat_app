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
        
        // システムAのURLパターンを定義
        $allowedReferer = 'https://manager.line-chat-system-dev.tokyo';
        
        // システムAからの遷移でない場合はリダイレクトまたはエラーを返す
        if (!$referer || !str_starts_with($referer, $allowedReferer)) {
            // アクセス拒否時の処理（リダイレクトまたは403エラーなど）
            return response()->view('errors.403');
        }
        
        return $next($request);
    }
}
