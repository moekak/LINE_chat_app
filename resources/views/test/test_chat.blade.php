@extends('layout.common')
@section('title')
      <title>{{ $title ?? "チャット"}}</title>
@endsection

@section('style')
<link rel="stylesheet" href="{{asset("css/user/common.css")}}">
@endsection


@section('icon')
      <img src="{{asset("img/user.png")}}" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
      <img src="{{asset("img/user.png")}}" alt="" class="chat_users-icon-message">   
@endsection

@section('header')
<div class="chat__message_header">
      <div class="chat__message_header-item js_header_item active">
            <i class="far fa-comment header-icon active_font"></i>
            <p class="chat__message_header-item-text active_font">サポート</p>
      </div>
</div>
@endsection
@section('chat-message')

<input type="hidden" value="{{Route::current()->parameter('userId')}}" id="js_user_id">
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_user">
            @foreach ($testMessages as $date => $messages)
                  <small class="chat__message-main-time js_chat_message_date" data-date-name={{ $date }}>{{ $date }}</small>
                  @foreach ($messages as $message)
                        @foreach ($message as $message)
                              <div class="chat__message-container-left">
                                    <div class="chat__mesgae-main-left">
                                          @yield('icon-msg')
                                          @if ($message["resource_type"] == "test_txt")
                                                @php
                                                      // Step 1: エスケープ
                                                      $escapedMessage = e($message["resource"]);
                                                      
                                                      // Step 2: URLをリンクに変換
                                                      $pattern = '/\b(?:https?:\/\/|www\.)\S+\b/i';
                                                      $replacement = '<a href="$0" target="_blank" rel="noopener noreferrer">$0</a>';
                                                      $linkedMessage = preg_replace($pattern, $replacement, $escapedMessage);
                                                      
                                                      // Step 3: 改行をHTMLの<br>タグに変換
                                                      $formattedMessage = nl2br($linkedMessage);
                                                @endphp
                                                <div class="chat__message-box-left chat-margin5 js_chat_message" data-id={{$message["id"]}} data-type={{$message["resource_type"]}}>{!! $formattedMessage !!}</div>
                                          @elseif($message["resource_type"] == "test_img")

                                          <x-overlay-image
                                                :src="Storage::disk('s3')->url('images/' . $message['resource'])" 
                                                :link="isset($message['line_test_crop_areas']['0']['url']) ? $message['line_test_crop_areas']['0']['url'] : '#'"
                                                :cropData="isset($message['line_test_crop_areas']['0']) && 
                                                            isset($message['line_test_crop_areas']['0']['x_percent']) && 
                                                            isset($message['line_test_crop_areas']['0']['y_percent']) && 
                                                            isset($message['line_test_crop_areas']['0']['width_percent']) && 
                                                            isset($message['line_test_crop_areas']['0']['height_percent']) 
                                                            ? [
                                                                  'x_percent' => $message['line_test_crop_areas']['0']['x_percent'], 
                                                                  'y_percent' => $message['line_test_crop_areas']['0']['y_percent'], 
                                                                  'width_percent' => $message['line_test_crop_areas']['0']['width_percent'], 
                                                                  'height_percent' => $message['line_test_crop_areas']['0']['height_percent']
                                                            ] 
                                                            : null"
                                                :message="$message"
                                          />
                                          @endif
                                          <div class="chat__message-time-txt">{{ date('H:i', strtotime($message["created_at"])) }}</div>
                                    </div> 
                              </div>
                        @endforeach
                        
                  @endforeach
            @endforeach
      </div>
</div>
<div class="chat__form">
      <form class="chat__form-flex" id="js_chat_form">
            <div class="attachment_container relative">
                  <label for="fileInput" style="display: flex;"><img src="{{asset("img/icons8-attachment-30.png")}}" alt="" class="attachemnt-icon js_attachment_icon"></label>
                  <input type="file" name="image" class="hidden" accept="image/*" id="fileInput" style="display: none">
            </div>
            <textarea type="text" placeholder="メッセージは送信できません" id="js_msg" rows="1" maxlength="1000"></textarea>
            @yield('send_data')
            <button class="chat__form-submit disabled_btn" type="submit"><img src="{{asset("img/icons8-send-48.png")}}" alt="" class="submit-icon"></button>

      </form>
</div>


{{-- 画像モーダル --}}
<div class="image_display_modal">
      <p class="close_button hidden">×<span class="close_button-txt">閉じる</span></p>
      <img src="" alt="" class="js_image_src js_modal hidden image_display">   
</div>

@endsection


@section('script')
<script src="{{mix("js/lineTest.js")}}"></script>
<script>
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
</script>

@endsection