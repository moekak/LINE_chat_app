@extends('layout.common')
@section('title')
      <title>{{ $title ?? "チャット"}}</title>
@endsection

@section('style')
<link rel="stylesheet" href="{{asset("css/user/common.css")}}">
@endsection


@section('icon')
      <img src="<?= $admin_info["user_picture"]?>" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
@if ($admin_info["user_picture"])
      <img src="<?=$admin_info["user_picture"]?>" alt="" class="chat_users-icon-message" id="icon_msg">  
@else
      <img src="{{ asset("img/user-icon.png") }}" alt="" class="chat_users-icon-message">
@endif
      
@endsection

@section('send_data')
      <input type="hidden" name="admin_id" value="{{$uuid_user}}" id="js_sender_id">
      <input type="hidden" name="user_id" value="{{$uuid_admin}}" id="js_receiver_id">
      <input type="hidden" value="user" id="js_sender_type">
@endsection

@section('header')
<div class="chat__message_header">
      {{-- <div class="chat__message_header-item js_header_item">
            <a href="{{route("announcements", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><i class="far fa-envelope header-icon"></i></a>
            <a href="{{route("announcements", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><p class="chat__message_header-item-text">メッセージ</p></a>
      </div> --}}
      <div class="chat__message_header-item js_header_item active">
            <a href="{{route("chat", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><i class="far fa-comment header-icon active_font"></i></a>
            <a href="{{route("chat", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><p class="chat__message_header-item-text active_font">サポート</p></a>
      </div>
</div>
@endsection
@section('chat-message')

<input type="hidden" id="js_uuid" value="{{$uuid_user}}">
<input type="hidden" value="{{$admin_info->user_picture}}" id="js_user_icon_img">
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_user">
            @if (isset($line_display_text))
                  <div class="chat_default-area">
                        <small class="chat_default-txt">{{$line_display_text}}</small>
                  </div>
            @endif
            @foreach ($group_message as $date => $messages)

            <small class="chat__message-main-time js_chat_message_date" data-date-name={{ $date }}>{{ $date }}</small>
                  @foreach ($messages as $message)
                        @if ($message["sender_type"] == "admin")
                              <div class="chat__message-container-left">
                                    <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          @if ($message["type"] == "text"|| $message["type"] == "broadcast_text" || $message["type"] == "greeting_text")
                                                @php
                                                      // Step 1: エスケープ
                                                      $escapedMessage = e($message["content"]);
                                                      
                                                      // Step 2: URLをリンクに変換
                                                      $pattern = '/\b(?:https?:\/\/|www\.)\S+\b/i';
                                                      $replacement = '<a href="$0" target="_blank" rel="noopener noreferrer">$0</a>';
                                                      $linkedMessage = preg_replace($pattern, $replacement, $escapedMessage);
                                                      
                                                      // Step 3: 改行をHTMLの<br>タグに変換
                                                      $formattedMessage = nl2br($linkedMessage);
                                                @endphp
                                                <div class="chat__message-box-left chat-margin5 js_chat_message" data-id={{$message["id"]}} data-type={{$message["type"]}}>{!! $formattedMessage !!}</div>
                                          @elseif($message["type"] == "image" || $message["type"] == "broadcast_img" || $message["type"] == "greeting_img")

                                                <x-overlay-image
                                                      :src="Storage::disk('s3')->url('images/' . $message['content'])" 
                                                      :link="$message['url']"
                                                      :cropData="json_decode($message['crop_data'], true)"
                                                      :message="$message"
                                                />
                                          @endif
                                                <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                                    </div> 
                              </div>
                        @else
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                                          @if ($message["type"] == "text"|| $message["type"] == "broadcast_text" || $message["type"] == "greeting_text")
                                                @php
                                                      // Step 1: エスケープ
                                                      $escapedMessage = e($message["content"]);
                                                      
                                                      // Step 2: URLをリンクに変換
                                                      $pattern = '/\b(?:https?:\/\/|www\.)\S+\b/i';
                                                      $replacement = '<a href="$0" target="_blank" rel="noopener noreferrer">$0</a>';
                                                      $linkedMessage = preg_replace($pattern, $replacement, $escapedMessage);
                                                      
                                                      // Step 3: 改行をHTMLの<br>タグに変換
                                                      $formattedMessage = nl2br($linkedMessage);
                                                @endphp
                                                <div class="chat__message-box-right chat-margin5 js_chat_message">{!! $formattedMessage!!}</div>
                                          @elseif($message["type"] == "image" || $message["type"] == "broadcast_img" || $message["v"] == "greeting_img")
                                                <img src="{{ Storage::disk('s3')->url('images/' . $message['content']) }}"alt="" class="chat-margin5 chat_image js_chat_message">

                                          @endif
                                                
                                                
                                    </div>
                              </div>
                        @endif
                  @endforeach
            @endforeach
      </div>
</div>
<div class="chat__form">
      <form class="chat__form-flex" id="js_chat_form">
            <div class="attachment_container relative">
                  <label for="fileInput"><img src="{{asset("img/icons8-attachment-30.png")}}" alt="" class="attachemnt-icon js_attachment_icon"></label>
                  <input type="file" name="image" class="hidden" accept="image/*" id="fileInput" style="display: none">
            </div>
            <textarea type="text" placeholder="Type a message" id="js_msg" rows="1" maxlength="1000"></textarea>
            @yield('send_data')
            <button class="chat__form-submit disabled_btn" type="submit"><img src="{{asset("img/icons8-send-48.png")}}" alt="" class="submit-icon"></button>

      </form>
</div>


{{-- バン誘導モーダル --}}
<div class="modal__container js_modal hidden">
      <p>公式アカウントが変更されました。<br>新しく友達追加をしてください。</p>
      <div class="line__btn-container">
            <button class="line-btn"><a href="" class="js_ban_link"><img src="{{asset("img/icons8-line-48.png")}}" alt=""> 友達追加</a></button>
            <p class="close_btn js_close">閉じる</p>
      </div>
</div>


{{-- 画像モーダル --}}
<div class="image_display_modal">
      <p class="close_button hidden">×<span class="close_button-txt">閉じる</span></p>
      <img src="" alt="" class="js_image_src js_modal hidden image_display">   
</div>

@endsection


@section('script')
<script src="{{mix("js/userChat.js")}}"></script>
      <script>
            document.addEventListener("DOMContentLoaded", () => {
                  const lastMessageId = @json($unread_message_id);  // セミコロンを追加
                  const lastMessageType= @json($last_message_type);  // セミコロンを追加
                  const unreadCount= @json($unread_count);  // セミコロンを追加
                  const messagesElements = document.querySelectorAll(".js_chat_message")
                  let hasUnreadMessage = false

                  messagesElements.forEach((el)=>{
                        if(el.getAttribute("data-id") == lastMessageId && el.getAttribute("data-type") == lastMessageType && unreadCount > 0){
                              
                              const parentElement = (lastMessageType === "text" || lastMessageType === "broadcast_text") ? el.parentElement.parentElement : el.parentElement.parentElement.parentElement
                              const newElement = document.createElement("p")
                              newElement.classList.add("unread_message-description")
                              newElement.innerHTML = "ここから未読メッセージ"
                              parentElement.insertAdjacentElement('beforebegin', newElement);
                              hasUnreadMessage = true
                              

                              setTimeout(() => {
                                    const container = document.querySelector('.chat__message-main'); // スクロール対象のコンテナ
                                    if (container) {
                                          const containerRect = container.getBoundingClientRect();
                                          const elemRect = newElement.getBoundingClientRect();
                                          const offsetTop = elemRect.top - containerRect.top;
                                          
      
                                          container.scrollTo({
                                                top: offsetTop - 100,
                                                behavior: 'instant'
                                          });
                                    }
                              }, 100);
                        }
                  })

                  if(!hasUnreadMessage){
                        setTimeout(() => {
                              const scroll_el = document.querySelector(".chat__message-main");
                              if (scroll_el) {
                                    // 一番下までスクロール
                                    scroll_el.scrollTo({
                                          top: scroll_el.scrollHeight - scroll_el.clientHeight,
                                          behavior: 'instant'  // または 'auto'
                                    });
                              }
                        }, 100);
                  }
            });
      </script>


      @if ($admin_info["account_status"] !== 1 && $admin_info["second_account_id"])
      
            <script>
                  document.querySelector(".js_modal").classList.remove("hidden")
                  document.querySelector(".bg").classList.remove("hidden")

                  const link = document.querySelector(".js_ban_link")
                   // PHP変数をJavaScriptに渡す
                  const accountUrl = @json($second_account_url);
                  link.href = accountUrl
            </script>
      @endif
@endsection