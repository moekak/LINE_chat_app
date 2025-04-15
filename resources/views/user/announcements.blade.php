@extends('layout.common')
@section('style')
<link rel="stylesheet" href="{{asset("css/user/common.css")}}">
@endsection

@section('chat-message')
<div class="chat__message_header">
      {{-- <div class="chat__message_header-item js_header_item active">
            <a href="{{route("announcements", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><i class="far fa-envelope header-icon active_font"></i></a>
            <a href="{{route("announcements", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><p class="chat__message_header-item-text active_font">メッセージ</p></a>
      </div> --}}
      <div class="chat__message_header-item js_header_item">
            <a href="{{route("chat", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><i class="far fa-comment header-icon"></i></a>
            <a href="{{route("chat", ["adminId"=> Route::current()->parameter('adminId'), "userId" => Route::current()->parameter("userId")])}}"><p class="chat__message_header-item-text">サポート</p></a>
      </div>
</div>

{{-- お知らせが一つもない場合 --}}
<div class="annoucement_wrapper">
     <p class="hidden">お知らせはありません</p>

     <div class="announcement_container">
      <div class="announcement_container-left">
            <img src="https://i.pravatar.cc/300" alt="" class="announcement_container-left-icon">
      </div>
      <div class="announcement_container-right">
            <p class="announcement_container-right-message">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
            <small class="announcement_container-right-date">2時間前</small>
      </div>
     </div>
     <div class="announcement_container">
      <div class="announcement_container-left">
            <img src="https://i.pravatar.cc/300" alt="" class="announcement_container-left-icon">
      </div>
      <div class="announcement_container-right">
            <p class="announcement_container-right-message">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
            <small class="announcement_container-right-date">2時間前</small>
      </div>
     </div>
     <div class="announcement_container">
      <div class="announcement_container-left">
            <img src="https://i.pravatar.cc/300" alt="" class="announcement_container-left-icon">
      </div>
      <div class="announcement_container-right">
            <p class="announcement_container-right-message">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
            <small class="announcement_container-right-date">2時間前</small>
      </div>
     </div>
     <div class="announcement_container">
      <div class="announcement_container-left">
            <img src="https://i.pravatar.cc/300" alt="" class="announcement_container-left-icon">
      </div>
      <div class="announcement_container-right">
            <p class="announcement_container-right-message">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
            <small class="announcement_container-right-date">2時間前</small>
      </div>
     </div>
</div>
@endsection