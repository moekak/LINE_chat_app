@extends('layout.common')

{{-- チャット画面左側のチャットユーザー一覧 --}}
@section('user-list')
<input type="hidden" id="js_uuid" value="{{$uuid_admin}}">
<input type="hidden" id="js_admin_id" value="{{$admin_info->id}}">
<section class="chat__users-list">
      {{-- 管理者アカウントの情報を表示 --}}
      <div class="chat__users-list-top">
            <a href="https://twitter-clone.click/account/show/{{Route::current()->parameter('id')}}">
                  <img src="{{ $admin_info->user_picture }}" alt="" class="chat_users-icon">
            </a> 
            <div class="chat__users-list-top-detail">
                  <p class="user_name_txt">{{$admin_info->account_name}}</p>
                  <small class="user_id_txt">{{$admin_info->account_id}}</small>
            </div> 
            <img src="{{asset("img/icons8-bell-30.png")}}" alt="" class="notification_bell js_bell">
      </div>
      {{-- チャットユーザーアカウントのリアルタイム表示 --}}
      <div class="chat__users-list-area">
            <input type="text" class="chat__users-list-area-input js_message_input" placeholder="Search">
            <div class="chat__users-list-container" id="js_chatUser_wrapper">

                  @foreach ($mergedData as $data)
                        @if (isset($data["latest_message"]["content"]))
                              <div class="chat__users-list-wraper js_chat_wrapper" style="margin-top: 0" data-uuid="{{$data["userUuid"]}}" data-id="{{$data->id}}" data-admin-id="{{$admin_info->id}}">
                                    <img src="{{$data->user_picture}}" alt="" class="chat_users-icon"> 
                                    <div class="chat_users-list-flex">
                                          <div class="chat_users-list-box"> 
                                                <p class="chat_name_txt">{{$data->line_name}}</p>
                                                <small class="chat_time js_update_message_time"  data-id="{{$data["userUuid"]}}">{{$data["formatted_date"]}}</small>
                                          </div>  
                                          <div class="chat__users-list-msg">
                                                <small class="chat_message js_chatMessage_elment" data-id="{{$data["userUuid"]}}">{{ $data["latest_message"]["type"] == "text"  ? $data["latest_message"]["content"] : ($data["latest_message"]["type"] == "broadcast_text" || $data["latest_message"]["type"] == "broadcast_img" ? "一斉メッセージを送信しました" : "画像が送信されました")}}</small>
                                                @php
                                                      $count_style = $data["totalCount"] <= 0 ? "none": "flex";
                                                @endphp
                                                <div class="message_count js_mesage_count" data-id="{{$data["userUuid"]}}" style="display:{{$count_style}}">{{$data["totalCount"]}}</div>
                                          </div>
                                    </div>
                              </div>
                        @endif   
                  @endforeach
            </div>
      </div>
</section> 
@endsection

@section('icon-msg')
      <img src="{{$chat_user->user_picture}}" alt="" class="chat_users-icon-message" id="icon_msg"> 
@endsection
@section('script')
      <script src="{{mix("js/adminChat.js")}}"></script>
@endsection
 
@section('send_data')
      <input type="hidden" name="admin_id" value="{{$uuid_admin}}" id="js_sender_id">
      <input type="hidden" name="user_id" value="{{$uuid_user}}" id="js_receiver_id">
      <input type="hidden" name="sender" value="admin" id="js_sender_type">
@endsection



@section('chat-message')
<div class="chat__message-top">
      <input type="hidden" value="{{$uuid_user}}" id="js_chatuser_id">
      <input type="hidden" value="{{$chat_user->user_picture}}" id="js_user_icon_img">
      <img src="{{$chat_user->user_picture}}" alt="" class="chat_users-icon"> 
      <p class="chat_message_name">{{$chat_user->line_name}}</p>
</div>
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_admin" data-id="{{$uuid_user}}">
      @foreach ($group_message as $date => $messages)
                  <small class="chat__message-main-time">{{ $date }}</small>
                  @foreach ($messages as $message)


                        @if ($message['sender_type'] == "user")
                        <div class="chat__message-container-left">
                              <div class="chat__mesgae-main-left">
                                    @yield('icon-msg')
                                    @if ($message["type"]== "text")
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
                                          <div class="chat__message-box-left chat-margin5">{!! $formattedMessage !!}</div>
                                    @elseif($message["type"] =="image")
                                          <img src="{{ Storage::disk('s3')->url($message["content"]);}}" class="chat-margin5">
                                    @endif
                                    <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                              </div> 
                        </div>
                        @else
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                                          @if ($message["type"] == "text" || $message["type"] == "broadcast_text")
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
                                                <div class="chat__message-box-right chat-margin5"> {!! $formattedMessage !!}</div>
                                          @elseif($message["type"] == "image" || $message["type"] == "broadcast_img")
                                                <img src="{{ Storage::disk('s3')->url($message["content"]);}}" class="chat-margin5">
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
@endsection


