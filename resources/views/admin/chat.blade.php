@extends('layout.common')

@section('user-list')
<section class="chat__users-list">
      <div class="chat__users-list-top">
            
            <img src="{{$admin_info->user_picture}}" alt="" class="chat_users-icon">  
            <div class="chat__users-list-top-detail">
                  <p class="user_name_txt">{{$admin_info->account_name}}</p>
                  <small class="user_id_txt">{{$admin_info->account_id}}</small>
            </div> 
         
      </div>
      <div class="chat__users-list-area">
            <input type="text" class="chat__users-list-area-input" placeholder="Search">
            <div class="chat__users-list-container" id="js_chatUser_wrapper">
                       @foreach ($mergedData as $data)
                              <div class="chat__users-list-wraper js_chat_wrapper" style="margin-top: 0" data-id="{{$data["user_info"]->id}}" data-admin-id="{{$admin_info->id}}">
                                    <img src="{{$data["user_info"]->user_picture}}" alt="" class="chat_users-icon"> 
                                    <div class="chat_users-list-flex">
                                          <div class="chat_users-list-box"> 
                                                <p class="chat_name_txt">{{$data["user_info"]->line_name}}</p>
                                                <small class="chat_time js_update_message_time"  data-id="{{$data["user_info"]->id}}">{{$data["formatted_time"]}}</small>
                                          </div>  
                                          <div class="chat__users-list-msg">
                                                <small class="chat_message js_chatMessage_elment" data-id="{{$data["user_info"]->id}}">{{$data["message"]->content ?? "画像が送信されました"}}</small>
                                                @php
                                                    $count_style = $data["count"] <= 0 ? "none": "flex";
                                                @endphp
                                                <div class="message_count js_mesage_count" data-id="{{$data["user_info"]->id}}" style="display:{{$count_style}}">{{$data["count"]}}</div>
                                          </div>
                                    </div>
                              </div>
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
      <input type="hidden" name="admin_id" value="<?=$admin_info["id"]?>" id="js_sender_id">
      <input type="hidden" name="user_id" value="<?=$user_id?>" id="js_receiver_id">
      <input type="hidden" name="sender" value="admin" id="js_sender_type">
@endsection



@section('chat-message')
<div class="chat__message-top">
      <input type="hidden" value="{{$chat_user->id}}" id="js_chatuser_id">
      <input type="hidden" value="{{$chat_user->user_picture}}" id="js_user_icon_img">
      <img src="{{$chat_user->user_picture}}" alt="" class="chat_users-icon"> 
      <p class="chat_message_name">{{$chat_user->line_name}}</p>
</div>
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_admin" data-id="{{$chat_user->id}}">
           @foreach ($group_message as $date => $messages)
                  <small class="chat__message-main-time">{{ $date }}</small>
                  @foreach ($messages as $message)

                        @if ($message->type == "user")
                        <div class="chat__message-container-left">
                              <div class="chat__mesgae-main-left">
                                    @yield('icon-msg')
                                    @if ($message->content)
                                          <div class="chat__message-box-left chat-margin5" data-message-id="{{$message->message_id}}">{!! nl2br(e($message->content)) !!}</div>
                                    @elseif($message->image)
                                          <div class="chat__message-box-left chat-margin5" data-message-id="{{$message->message_id}}">
                                                <img src="{{ asset('storage/images/' . $message->image) }}">
                                          </div>
                                          

                                    @endif
                                    <div class="chat__message-time-txt">{{$message->created_at->format('H:i')}}</div>
                              </div> 
                        </div>
                        @else
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-time-txt">{{$message->created_at->format('H:i')}}</div>
                                          <div class="chat__message-box-right chat-margin5" >{!! nl2br(e($message->content)) !!}</div>
                                          
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
                  <input type="file" name="image"  class="image" accept="image/*" capture="environment">
                  <img src="{{asset("img/icons8-attachment-30.png")}}" alt="" class="attachemnt-icon">
            </div>
            
            <textarea type="text" placeholder="Type a message" id="js_msg" rows="1"></textarea>
            @yield('send_data')
          
            <button class="chat__form-submit disable_btn" type="submit"><img src="{{asset("img/icons8-send-48.png")}}" alt="" class="submit-icon"></button>

      </form>
      
      
</div>
@endsection