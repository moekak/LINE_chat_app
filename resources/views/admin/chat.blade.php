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
            <div class="chat__users-list-container">
                       @foreach ($mergedData as $data)
                              <div class="chat__users-list-wraper" style="margin-top: 0">
                                    <img src="{{$data["user_info"]->user_picture}}" alt="" class="chat_users-icon"> 
                                    <div class="chat_users-list-flex">
                                          <div class="chat_users-list-box"> 
                                                <p class="chat_name_txt">{{$data["user_info"]->line_name}}</p>
                                                <small class="chat_time">12:30</small>
                                          </div>  
                                          <div class="chat__users-list-msg">
                                                <small class="chat_message">{{$data["message"]}}</small>
                                                <div class="message_count">12</div>
                                          </div>
                                    </div>
                              </div>
                        @endforeach
              
                 
            </div>
      </div>
</section> 
@endsection
@section('icon')
      <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
      <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon-message" id="icon_msg"> 
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
<div class="chat__message-main">
      <small class="chat__message-main-time">November 11.2018</small>
      <div class="chat__message-wrapper js_append_admin">
           @foreach ($group_message as $date => $messages)

                  <h3>{{ $date }}</h3>
                  
                  @foreach ($messages as $message)

                        @if ($message->type == "user")
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