@extends('layout.common')
@section('style')
<link rel="stylesheet" href="{{asset("css/user/common.css")}}">
@endsection


@section('icon')
      <img src="<?= $admin_info["user_picture"]?>" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
      <img src="<?=$admin_info["user_picture"]?>" alt="" class="chat_users-icon-message" id="icon_msg"> 
@endsection
@section('script')
      <script src="{{mix("js/userChat.js")}}"></script>

      @if ($admin_info["is_active"] == "0" && $admin_info["account_url"])
      
            <script>
                  document.querySelector(".js_modal").classList.remove("hidden")
                  document.querySelector(".bg").classList.remove("hidden")

                  const link = document.querySelector(".js_ban_link")
                   // PHP変数をJavaScriptに渡す
                  const accountUrl = @json($admin_info["account_url"]);
                  link.href = accountUrl
            </script>
      @endif

      
      <script>
            
      </script>
@endsection

@section('send_data')
      <input type="hidden" name="admin_id" value="{{$uuid_user}}" id="js_sender_id">
      <input type="hidden" name="user_id" value="{{$uuid_admin}}" id="js_receiver_id">
      <input type="hidden" value="user" id="js_sender_type">
@endsection


@section('chat-message')

<input type="hidden" id="js_uuid" value="{{$uuid_user}}">
<div class="chat__message_header">
      <div class="chat__message_header-item js_header_item">
            <a href="{{route("announcements", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><i class="far fa-envelope header-icon"></i></a>
            <a href="{{route("announcements", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><p class="chat__message_header-item-text">メッセージ</p></a>
      </div>
      <div class="chat__message_header-item js_header_item active">
            <a href="{{route("chat", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><i class="far fa-comment header-icon active_font"></i></a>
            <a href="{{route("chat", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><p class="chat__message_header-item-text active_font">サポート</p></a>
      </div>
</div>
<input type="hidden" value="{{$admin_info->user_picture}}" id="js_user_icon_img">
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_user">
            <div class="chat_default-area">
                  <small class="chat_default-txt">どうぞお気軽にご連絡くださいね♪</small>
            </div>
            @foreach ($group_message as $date => $messages)

            <small class="chat__message-main-time">{{ $date }}</small>
                  @foreach ($messages as $message)
                        @if ($message["sender_type"] == "admin")
                              <div class="chat__message-container-left">
                                    <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          @if ($message["type"] == "text")
                                                <div class="chat__message-box-left chat-margin5">{!! nl2br(e($message["content"])) !!}</div>
                                          @elseif($message["type"] == "image")
                                                <img src="{{ asset('storage/images/' . $message["content"]) }}" alt="" class="chat-margin5">
                                          @endif
                                                <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                                    </div> 
                              </div>
                        @else
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                                          @if ($message["type"] == "text")
                                                <div class="chat__message-box-right chat-margin5">{!! nl2br(e($message["content"])) !!}</div>
                                          @elseif($message["type"] == "image")
                                                <img src="{{ asset('storage/images/' . $message["content"]) }}" alt="" class="chat-margin5">

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
            <textarea type="text" placeholder="Type a message" id="js_msg" rows="1"></textarea>
            @yield('send_data')
            <button class="chat__form-submit disable_btn" type="submit"><img src="{{asset("img/icons8-send-48.png")}}" alt="" class="submit-icon"></button>

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

@endsection


