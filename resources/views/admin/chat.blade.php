@extends('layout.common')

@section('user-list')
<section class="chat__users-list">
      <div class="chat__users-list-top">
         
               <img src="<?= $admin_info["user_picture"]?>" alt="" class="chat_users-icon">  
                  <div class="chat__users-list-top-detail">
                        
                        <p class="user_name_txt"><?= $admin_info["account_name"]?></p>
                        <small class="user_id_txt"><?= $admin_info["account_id"]?></small>
                  </div> 
      
          
      </div>
      <div class="chat__users-list-area">
            <input type="text" class="chat__users-list-area-input" placeholder="Search">
            <div class="chat__users-list-container">
                  <div class="chat__users-list-wraper" style="margin-top: 0">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
                  <div class="chat__users-list-wraper">
                        <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
                        <div class="chat_users-list-flex">
                              <div class="chat_users-list-box"> 
                                    <p class="chat_name_txt">Moeka Kido</p>
                                    <small class="chat_time">12:30</small>
                              </div>  
                              <div class="chat__users-list-msg">
                                    <small class="chat_message">Hello, how are you?</small>
                                    <div class="message_count">12</div>
                              </div>
                        </div>
                  </div>
                 
            </div>
      </div>
</section> 
@endsection
@section('icon')
      <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
      <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon-message"> 
@endsection
@section('script')
    <script src="{{mix("js/websocket.js")}}"></script>
@endsection
 
@section('send_data')
      <input type="hidden" name="admin_id" value="<?=$admin_info["id"]?>" id="js_sender_id">
      <input type="hidden" name="user_id" value="<?=$user_id?>" id="js_receiver_id">
@endsection


