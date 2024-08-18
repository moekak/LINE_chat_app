<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="{{asset("css/admin/common.css")}}">
      <title>Document</title>
</head>
<body>
      <div class="contents">
            <main>
                  @yield('user-list')
                  <section class="chat__message-area">
                        <div class="chat__message-top">
                              @yield('icon')
                              <p class="chat_message_name">Moeka Kido</p>
                        </div>
                        <div class="chat__message-main">
                              <small class="chat__message-main-time">November 11.2018</small>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
                              </div>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
                              </div>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
                              </div>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
                              </div>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
                              </div>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg') 
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
                              </div>
                              <div class="chat__message-container-left">
                                     <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          <div class="chat__message-box-left chat-margin5">Hi, how are you doing?</div>
                                    </div> 
                              </div>
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                          <div class="chat__message-box-right chat-margin5">Hi, i am fine!</div>
                                    </div>
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
                  </section>
            </main>
            
      </div>
     
      @yield('script')
      <script src="{{mix("js/websocket.js")}}"></script>
</body>
</html>


