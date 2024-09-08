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
@endsection

@section('send_data')
      <input type="hidden" name="admin_id" value="<?=$user_id["id"]?>" id="js_sender_id">
      <input type="hidden" name="user_id" value="<?=$admin_info["id"]?>" id="js_receiver_id">
      <input type="hidden" value="user" id="js_sender_type">
@endsection


@section('chat-message')
<input type="hidden" value="{{$admin_info->user_picture}}" id="js_user_icon_img">
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_user">
            @foreach ($group_message as $date => $messages)

            <small class="chat__message-main-time">{{ $date }}</small>
                    
                    @foreach ($messages as $message)

                        @if ($message->type == "admin")
                              <div class="chat__message-container-left">
                                    <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          @if ($message->content)
                                                <div class="chat__message-box-left chat-margin5">{!! nl2br(e($message->content)) !!}</div>
                                          @elseif($message->image)
                                                <img src="{{ asset('storage/images/' . $message->image) }}" alt="" class="chat-margin5">
                                          @endif
                                                <div class="chat__message-time-txt">{{$message->created_at->format('H:i')}}</div>
                                    </div> 
                              </div>
                        @else
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-time-txt">{{$message->created_at->format('H:i')}}</div>
                                          @if ($message->content)
                                                <div class="chat__message-box-right chat-margin5">{!! nl2br(e($message->content)) !!}</div>
                                          @elseif($message->image)
                                                <img src="{{ asset('storage/images/' . $message->image) }}" alt="" class="chat-margin5">

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


{{-- test --}}

@endsection