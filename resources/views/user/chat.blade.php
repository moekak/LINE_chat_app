@extends('layout.common')


@section('script')
    <script src="{{mix("js/websocket.js")}}"></script>
@endsection
 
@section('icon')
    {{-- <img src="<?//= $admin_info["user_picture"]?>" alt="" class="chat_users-icon">  --}}
    <img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon"> 
@endsection
@section('icon-msg')
<img src="https://i.pravatar.cc/300" alt="" class="chat_users-icon-message"> 
      {{-- <img src="<?//=$admin_info["user_picture"]?>" alt="" class="chat_users-icon-message">  --}}
@endsection


@section('send_data')
      <input type="hidden" name="admin_id" value="<?=$user_id["id"]?>" id="js_sender_id">
      <input type="hidden" name="user_id" value="<?=$admin_info["id"]?>" id="js_receiver_id">
@endsection
