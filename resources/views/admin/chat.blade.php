@extends('layout.common')
@section('title')
      <title>チャットシステム</title>
@endsection
@section('style')
      <link rel="stylesheet" href="{{asset("css/admin/message-template.css")}}">
@endsection

@section('panel')
      @include('components.panel')
@endsection

{{-- チャット画面左側のチャットユーザー一覧 --}}
@section('user-list')
<input type="hidden" id="js_uuid" value={{$uuid_admin}}>
<input type="hidden" id="js_admin_id" value={{$admin_info->id}}>
<section class="chat__users-list">
      <div class="chat__users-list-box">
            {{-- 管理者アカウントの情報を表示 --}}
            <div class="chat__users-list-top">
                  <a href="{{ url('/logout-and-redirect/' . $admin_info->id) }}">
                        @if ($admin_info->user_picture )
                              <img src="{{ $admin_info->user_picture }}" alt="" class="chat_users-icon">
                        @else
                              <img src="{{ asset("img/user-icon.png") }}" alt="" class="chat_users-icon">
                        @endif
                  </a> 
                  <div class="chat__users-list-top-detail">
                        <p class="user_name_txt">{{$admin_info->account_name}}</p>
                        <small class="user_id_txt">{{$admin_info->account_id}}</small>
                  </div> 
                  
                  <!-- コントロールボタンエリア -->
                  <div class="control-buttons-container">
                        <!-- 統合設定ボタン -->
                        <button class="control-btn js_settings_toggle" title="設定">
                              <i class="fas fa-cog control-icon"></i>
                        </button>
                  </div>
            </div>
      {{-- チャットユーザーアカウントのリアルタイム表示 --}}
            <div class="chat__users-list-area">
                  <div class="chat__users-list-area-input-box">
                        <input type="text" class="chat__users-list-area-input js_message_input" placeholder="Search" maxlength="50">    
                  </div>
                  <div class="chat__users-list-wrapper">
                        <div class="chat__users-list-container" id="js_chatUser_wrapper">

                              @foreach ($mergedData as $data)
                                    @if (isset($data["latest_message_date"]))
                                          <div class="chat__users-list-wraper js_chat_wrapper js_user_btn" style="margin-top: 0" data-uuid={{$data["entity_uuid"]}} data-id={{$data->id}} data-admin-id={{$admin_info->id}}>
                                                <img src="{{ $data->user_picture }}" alt="" onerror="this.onerror=null; this.src='{{ asset('img/user-icon.png') }}';" class="chat_users-icon">
                                                <div class="chat_users-list-flex">
                                                      <div class="chat_users-list-box"> 
                                                            <p class="chat_name_txt" data-simplebar>{{$data->line_name}}</p>
                                                            <small class="chat_time js_update_message_time"  data-id={{$data["entity_uuid"]}}>{{$data["latest_message_date"]}}</small>
                                                      </div>  
                                                      <div class="chat__users-list-msg">
                                                            <small class="chat_message js_chatMessage_elment" data-id={{$data["entity_uuid"]}}>{{$data["latest_all_message"]}}</small>
                                                            @php
                                                                  $count_style = $data["unread_count"] <= 0 ? "none": "flex";
                                                            @endphp
                                                            <div class="message_count js_mesage_count" data-id={{$data["entity_uuid"]}} style="display:{{$count_style}}">{{$data["unread_count"]}}</div>
                                                      </div>
                                                </div>
                                          </div>
                                    @endif   
                              @endforeach
                        </div>  
                        <div class="loader-container">
                              <div class="loader2 js_loader hidden"></div>
                        </div>
                  </div>
                  
            </div>
      </div>
</section> 
@endsection

@section('icon-msg')
      <img src={{$chat_user->user_picture}} alt="" onerror="this.onerror=null; this.src='{{ asset('img/user-icon.png') }}';" class="chat_users-icon-message" id="icon_msg"> 
@endsection
@section('send_data')
      <input type="hidden" name="admin_id" value={{$uuid_admin}} id="js_sender_id">
      <input type="hidden" name="user_id" value={{$uuid_user}} id="js_receiver_id">
      <input type="hidden" name="sender" value="admin" id="js_sender_type">
@endsection



@section('chat-message')
<div class="chat__message-top">
      <div class="chat__message-top-info">
            <input type="hidden" value={{$uuid_user}} id="js_chatuser_id">
            <input type="hidden" value={{$chat_user->user_picture}} id="js_user_icon_img">
            <img src={{$chat_user->user_picture}} alt=""  onerror="this.onerror=null; this.src='{{ asset('img/user-icon.png') }}';" class="chat_users-icon js_user_icon"> 
            <p class="chat_message_name">{{$chat_user->line_name}}</p>
      </div>
      <button class="view-user-info-btn">顧客情報を見る</button>
</div>
<div class="chat__message-main">
      <div class="chat__message-wrapper js_append_admin" data-id={{$uuid_user}}>
            @foreach ($group_message as $date => $messages)
                  <small class="chat__message-main-time js_chat_message_date" data-date-name={{ $date }}>{{ $date }}</small>
                  @foreach ($messages as $message)
                        @if ($message['sender_type'] == "user")
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
                                          <div class="chat__message-box-left chat-margin5 js_chat_message" data-id={{$message["id"]}} data-type="text">{!! $formattedMessage !!}</div>
                                    @elseif($message["type"] =="image" || $message["type"] == "broadcast_img" || $message["type"] == "greeting_img")
                                          <img src="{{ Storage::disk('s3')->url('images/' . $message['content']) }}" class="chat-margin5 chat_image js_chat_message" data-id={{$message["id"]}} data-type="image">
                                    @endif
                                    <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                              </div> 
                        </div>
                        @else
                              <div class="chat__message-container-right">
                                    <div class="chat__mesgae-main-right">
                                          <div class="chat__message-time-txt">{{$message["created_at"]->format('H:i')}}</div>
                                          @if ($message["type"] == "text" || $message["type"] == "broadcast_text" || $message["type"] == "greeting_text")
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
                                                <div class="chat__message-box-right chat-margin5 js_chat_message"> {!! $formattedMessage !!}</div>
                                          @elseif($message["type"] == "image" || $message["type"] == "broadcast_img" || $message["type"] == "greeting_img")
                                          <x-overlay-image
                                                :src="Storage::disk('s3')->url('images/' . $message['content'])" 
                                                :link="$message['url']"
                                                :cropData="json_decode($message['crop_data'], true)"
                                                :message="$message"
                                          />
                                          @endif
                                          
                                    </div>
                              </div>
                        @endif
                  @endforeach
            @endforeach 
      </div>
</div>

<div class="chat__form">
      <div class="chat__form-flex" id="js_chat_form">
            <div class="attachment_container relative">
                  <div class="message_icon_box">
                        <label for="fileInput" style="display: flex; order: 1;">
                              <i class="fa-solid fa-paperclip js_attachment_icon operation-icon"></i>
                        </label>
                        <button class="operation-icon-btn" title="複数メッセージ一括送信"><i class="fa-solid fa-pen-to-square operation-icon" id="js_template_btn"></i></button>
                        <button class="operation-icon-btn" title="テンプレート" style="order: 3;"><i class="fa-solid fa-comment-dots operation-icon"  id="js_select_btn"></i></button>
                        {{-- <img src="{{asset("img/icons8-create-24.png")}}" alt="" class="template_icon" id="js_template_btn"> --}}
                  </div>
                  
                  <input type="file" name="image" class="hidden" accept="image/*" id="fileInput" style="display: none">
            </div>
            <textarea type="text" placeholder="メッセージを入力（Enterで改行、Shift+Enterで送信）" id="js_msg" rows="1" maxlength="1000"></textarea>
            @yield('send_data')
            <button class="chat__form-submit disabled_btn" type="button"><img src="{{asset("img/icons8-send-48.png")}}" alt="" class="submit-icon"></button>
      </div>
</div>




<!-- 統合設定モーダル -->
<section class="settings_modal js_modal hidden">
      <div class="settings_modal-container">
            <div class="settings_modal-header">
                  <h3>設定</h3>
                  <button class="settings_modal-close js_close_settings_modal">
                        <i class="fas fa-times"></i>
                  </button>
            </div>
            
            <div class="settings_content">
                  <!-- 音声設定セクション -->
                  <div class="setting_section">
                        <div class="setting_section-header">
                              <div class="setting_icon-wrapper">
                                    <i class="fas fa-volume-up setting_section-icon"></i>
                              </div>
                              <div class="setting_info">
                                    <h4>音声通知</h4>
                                    <p>メッセージ受信時の音声通知を設定</p>
                              </div>
                              <div class="setting_toggle">
                                    <input type="checkbox" id="voice_toggle" class="toggle_checkbox js_voice_checkbox">
                                    <label for="voice_toggle" class="toggle_label">
                                          <span class="toggle_slider"></span>
                                    </label>
                              </div>
                        </div>
                  </div>
                  
                  <!-- 背景テーマ設定セクション -->
                  <div class="setting_section">
                        <div class="setting_section-header">
                              <div class="setting_icon-wrapper">
                                    <i class="fas fa-palette setting_section-icon"></i>
                              </div>
                              <div class="setting_info">
                                    <h4>背景テーマ</h4>
                                    <p>チャット画面の背景テーマを選択</p>
                              </div>
                        </div>
                        
                        <!-- カスタムカラー設定パネル -->
                        <div class="custom_color_panel" id="custom_color_panel">
                              <div class="color_picker_header">
                                    <h5>🎨 カスタムカラー設定</h5>
                                    <p>スライダーを動かして好みの色を作成してください</p>
                              </div>
                              
                              <div class="color_controls">
                                    <div class="color_preview_large" id="color_preview_large"></div>
                                    
                                    <div class="rgb_controls">
                                          <div class="rgb_slider_group">
                                                <label class="rgb_label">
                                                      <span class="rgb_name" style="color: #e74c3c;">🔴 Red</span>
                                                      <span class="rgb_value" id="red_value">245</span>
                                                </label>
                                                <input type="range" class="rgb_slider red_slider" id="red_slider" min="0" max="255" value="245">
                                          </div>
                                          
                                          <div class="rgb_slider_group">
                                                <label class="rgb_label">
                                                      <span class="rgb_name" style="color: #27ae60;">🟢 Green</span>
                                                      <span class="rgb_value" id="green_value">246</span>
                                                </label>
                                                <input type="range" class="rgb_slider green_slider" id="green_slider" min="0" max="255" value="246">
                                          </div>
                                          
                                          <div class="rgb_slider_group">
                                                <label class="rgb_label">
                                                      <span class="rgb_name" style="color: #3498db;">🔵 Blue</span>
                                                      <span class="rgb_value" id="blue_value">250</span>
                                                </label>
                                                <input type="range" class="rgb_slider blue_slider" id="blue_slider" min="0" max="255" value="250">
                                          </div>
                                    </div>
                              </div>
                              
                              <div class="color_info">
                                    <div class="color_code_display">
                                          <div class="color_code_item">
                                                <strong>RGB:</strong>
                                                <input id="rgb_display" type="text" value="rgb(245, 246, 250)">
                                          </div>
                                          <div class="color_code_item">
                                                <strong>HEX:</strong>
                                                <input id="hex_display" type="text" value="#f5f6fa">
                                          </div>
                                    </div>
                                    <small id="js_error" class="hidden" style="color: red; font-size: 12px;">正しい形式を入力してください</small>
                              </div>
                              
                              <div class="preset_colors">
                                    <p class="preset_title">プリセットカラー</p>
                                    <div class="preset_grid">
                                          <div class="preset_color" data-rgb="255,182,193" style="background-color: rgb(255,182,193);" title="ピンク"></div>
                                          <div class="preset_color" data-rgb="255,218,185" style="background-color: rgb(255,218,185);" title="ピーチ"></div>
                                          <div class="preset_color" data-rgb="221,160,221" style="background-color: rgb(221,160,221);" title="プラム"></div>
                                          <div class="preset_color" data-rgb="173,216,230" style="background-color: rgb(173,216,230);" title="ライトブルー"></div>
                                          <div class="preset_color" data-rgb="144,238,144" style="background-color: rgb(144,238,144);" title="ライトグリーン"></div>
                                          <div class="preset_color" data-rgb="255,255,224" style="background-color: rgb(255,255,224);" title="ライトイエロー"></div>
                                          <div class="preset_color" data-rgb="230,230,250" style="background-color: rgb(230,230,250);" title="ラベンダー"></div>
                                          <div class="preset_color" data-rgb="245,245,220" style="background-color: rgb(245,245,220);" title="ベージュ"></div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
            
            <div class="settings_modal-footer">
                  <button class="settings_save_btn js_save_settings">
                        <span class="js_saving_txt">保存</span>
                        <i class="fas fa-sync fa-spin hidden js_spinning_btn"></i>
                  </button>
            </div>
      </div>
</section>

{{-- 画像のURL編集モーダル --}}
<section class="image_edit_modal js_modal hidden">
      <div class="preview_box">
            <div class="preview_box-top">
                  <p>プレビュー</p>
                  <small>※送信時に画像が劣化する場合があります。</small>
            </div>
            <div class="prview_box-area">
                  <div class="crop_bg hidden"></div>
                  <div class="crop_loader hidden"></div>
                  <div class="preview_box-img" id="image-container">
                        <img src="{{asset("img/user-icon.png")}}" alt="" id="image">
                  </div> 
            </div>
            <div class="preview_box-desc">
                  <div>対応形式: .png/.jpg</div>
                  <div>最大データ容量: 5MBまで</div>
            </div>
      </div>
      <div class="url_setting_area">
            <p class="url_setting_txt">タップ時アクションの利用</p>
            <div class="radio_btn">
                  <div class="form-check">
                        <input class="form-check-input" value="off" type="radio" name="choice" id="flexRadioDefault1" checked>
                        <label class="form-check-label" for="flexRadioDefault1">利用しない</label>
                  </div>
                  <div class="form-check">
                        <input class="form-check-input" value="on" type="radio" name="choice" id="flexRadioDefault2">
                        <label class="form-check-label" for="flexRadioDefault2">利用する</label>
                  </div> 
            </div>
            <div class="url_setting_wrapper" id="js_url_setting">
                  <div style="margin-top: 20px;"></div>
                  <p class="url_setting_txt">URL設定</p>
                  <input type="url" name="url" id="js_url_input" class="url_input" placeholder="https://example.com" maxlength="2048">
                  <small class="hidden js_url_error" style="color: red; font-size: 12px; padding-top: 14px;">URLの形式にしてください</small><br>
                  <small class="hidden js_image_error" style="color: red; font-size: 12px; padding-top: 14px;"></small>
                  <div class="btn_area">
                        <button id="js_changeImg_btn"><label for="fileInput" class="change_img">画像変更</label></button>
                        <button id="js_change_area" class="">選択範囲確定</button>
                  </div>
                  <small style="color: gray;font-size: 12px;">※画像を変更する際は、タップ時アクションが設定されている場合設定が解除されます。</small><br>
                  <div style="margin-top: 10px;"></div>
                  <small style="color: gray; font-size: 12px; margin-top: 3px;">※範囲を選択してから「選択範囲確定」ボタンを押してください。</small><br>
                  <div style="margin-top: 10px;"></div>
                  <small style="color: gray;  font-size: 12px; margin-top: 3px;">※再度範囲を選択したい場合は、「選択範囲変更」ボタンを押してください。</small>  
            </div>
            
            <div style="margin-top: 40px;">
                  <button class="preview_submit_btn disabled_btn" id="js_preview_submit_btn">送信</button>
            </div>
            
      </div>
</section>

{{-- 画像モーダル --}}
<div class="image_display_modal">
      <p class="close_button hidden">×<span class="close_button-txt">閉じる</span></p>
      <img src="" alt="" class="js_image_src js_modal hidden image_display">   
</div>

{{-- メッセージ配信モーダル --}}
<section class="js_modal bulk_message_modal hidden"  id="js_messageSetting_modal" >
      <div class="message-editor-container">
            <div class="editor-header">
                  <h2 style="font-size: 17px;">複数メッセージ一括送信</h2>
            </div>
            <div class="message-list" id="js_message-list">
                  <!-- メッセージアイテム -->

            </div>
            
            <div class="editor-controls">
                  <button class="control-button" id="add-text">
                        <span class="icon">T</span>テキスト追加
                  </button>
                  <button class="control-button" id="add-image">
                        <span class="icon">🖼️</span>画像追加
                  </button>
                  <button class="control-button primary" id="submit-messages">送信</button>
            </div>
      </div>


      {{-- preview --}}
      <div class="preview_area relative">
            <img src="{{asset("img/1702-portrait.png")}}" alt="" style="width: 100%;">
            <div class="preview_wrapper absolute">
                  <div class="chat__message_header-item js_header_item" style="background: #fff; width: -webkit-fill-available; display: block; margin: 0; padding: 5px 10px;">
                        <i class="far fa-comment header-icon preview_icon"></i>
                        <p class="chat__message_header-item-text preview_icon-txt">サポート</p>
                  </div>
                  <div class="preview_chat_area">
                        <div class="chat_wrapper" style="margin-top: 17px;"></div>   
                  </div>
                  
            </div>
      </div>
</section>

{{-- 一斉配信モーダル閉じる前の確認 --}}
<section class="modal__container  js_modal hidden bulk_confirm_modal" id="js_bulk_confirm_modal" style="width: 500px;">
      <h2 class="modal__container-ttl" style="color: red; font-weight: bold; font-size:20px; ">メッセージ作成画面を閉じてよろしいですか？</h2>
      <p>メッセージ作成画面を閉じてよろしいですか？閉じると、作成した全てのデータが完全に消去され、元に戻すことはできません。</p>
      <div class="delete_account-btn-container">
            <div class="btn-box">
                  <button id="js_cancel_btn" readonly style="width: 100%;">キャンセル</button>
            </div>
            <div class="cancel-btn btn-box  delete-btn js_close_modal_btn">
                  <button style="color: #fff;width: 100%;" readonly >閉じる</button>
            </div>
      </div>
</section>

{{-- メッセージテンプレート --}}
@include('components.messae-template')
@endsection

@section('script')
<script src="{{mix('js/adminChat.js')}}"></script>
<script src="{{mix('js/setting.js')}}"></script>
<script>
      document.addEventListener("DOMContentLoaded", () => {
            // 背景色設定
            const backgroundColor = @json($background_color);
            
            if(backgroundColor){
                  document.querySelector(".main").style.backgroundColor = backgroundColor["hex"]
                  document.getElementById("red_slider").value = backgroundColor["r"]
                  document.getElementById("green_slider").value = backgroundColor["g"]
                  document.getElementById("blue_slider").value = backgroundColor["b"]

                  document.getElementById("red_value").innerHTML = backgroundColor["r"]
                  document.getElementById("green_value").innerHTML = backgroundColor["g"]
                  document.getElementById("blue_value").innerHTML = backgroundColor["b"]

                  document.getElementById("rgb_display").value = `rgb(${backgroundColor["r"]}, ${backgroundColor["g"]}, ${backgroundColor["b"]})`
                  document.getElementById("hex_display").value = backgroundColor["hex"]
                  document.getElementById("color_preview_large").style.backgroundColor = backgroundColor["hex"]
            }else{
                  document.querySelector(".main").style.backgroundColor = "#f5f6fa"
                  document.getElementById("color_preview_large").style.backgroundColor = "#f5f6fa"
            }
            

            const lastMessageId = @json($unread_message_id);  
            const lastMessageType= @json($last_message_type); 
            const unreadCount= @json($unread_count); 
            const messagesElements = document.querySelectorAll(".js_chat_message")
            let hasUnreadMessage = false

            messagesElements.forEach((el)=>{
                  
                  if(el.getAttribute("data-id") == lastMessageId && el.getAttribute("data-type") == lastMessageType && unreadCount > 0){
                        const parentElement = el.parentElement.parentElement

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

@endsection