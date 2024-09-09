<!DOCTYPE html>
<html lang="en">
<head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="{{asset("css/admin/common.css")}}">
      <script src="https://kit.fontawesome.com/49c418fc8e.js" crossorigin="anonymous"></script>
      <title>Document</title>
      @yield('style')
</head>
<body>
      <div class="contents">
            <main>
                  @yield('user-list')
                  <section class="chat__message-area">
                        @yield('chat-message')
                  </section>
            </main>
            
      </div>
     
      @yield('script')

</body>
</html>


