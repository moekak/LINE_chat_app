<!DOCTYPE html>
<html lang="en">
<head>
      @yield('title')
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      {{-- <link rel="stylesheet" href="{{asset("css/user/common.css")}}"> --}}
      <link rel="stylesheet" href="{{asset("css/admin/common.css")}}">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      {{-- <link rel="stylesheet" type="text/css" href="https://unpkg.com/pell/dist/pell.min.css"> --}}
      <link rel="shortcut icon" href="{{asset("img/icons8-chat-32.png")}}">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.css"/>
      <script src="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.min.js"></script>

      @yield('style')
</head>

<body>
      <div class="contents">
            <div class="bg hidden"></div>
            <div class="black_bg hidden"></div>
            <div class="template_bg hidden"></div>
            <div class="loader js_loader hidden"></div>
            <main class="main">
                  @yield('user-list')
                  @yield('header')
                  <section class="chat__message-area">
                        @yield('chat-message')
                  </section>
            </main>
            
      </div>
      @yield('script')

</body>
</html>


