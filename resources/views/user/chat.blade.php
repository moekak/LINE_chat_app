@extends('layout.common')


@section('icon')
    {{-- <img src="<?//= $admin_info["user_picture"]?>" alt="" class="chat_users-icon">  --}}
    <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
<img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon-message" id="icon_msg"> 
      {{-- <img src="<?//=$admin_info["user_picture"]?>" alt="" class="chat_users-icon-message">  --}}
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
<div class="chat__message-main">
      <small class="chat__message-main-time">November 11.2018</small>
      <div class="chat__message-wrapper js_append_user">
            @foreach ($group_message as $date => $messages)

                    <h3>{{ $date }}</h3>
                    
                    @foreach ($messages as $message)

                        @if ($message->type == "admin")
                        <div class="chat__message-container-left">
                                <div class="chat__mesgae-main-left">
                                    @yield('icon-msg')
                                    
                                    <div class="chat__message-box-left chat-margin5">{{$message->content}}</div>
                                </div> 
                        </div>
                        @else
                                <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                            <div class="chat__message-box-right chat-margin5">{{$message->content}}</div>
                                    </div>
                                </div>
                        @endif
                    
                    @endforeach
            @endforeach
      </div>

</div>
<div class="chat__form">
      <form class="chat__form-flex" id="js_chat_form">
            <img src="{{asset("img/icons8-attachment-30.png")}}" alt="" class="attachemnt-icon">
            <input type="text" placeholder="Type a message" id="js_msg">   
            @yield('send_data')
          
            <button class="chat__form-submit" type="submit"><img src="{{asset("img/icons8-send-48.png")}}" alt="" class="submit-icon"></button>

      </form>
      
      
</div>
@endsection