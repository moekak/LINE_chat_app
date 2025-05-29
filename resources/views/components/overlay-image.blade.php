<div class="image-container" style="position: relative; display: inline-block; margin: 5px 0; "data-crop="{{ json_encode($cropData) }}">
      <img src="{{ $src }}" alt="Image" class="chat-margin5 chat_image overlay-target js_chat_message" style="margin: 0;" data-id={{$message["id"]}} data-type={{$message["type"] ?? $message["resource_type"]}}>
      <a class="overlay" href="{{ $link }}" style="display: none;"></a>
</div>

@if($cropData)
      <script>
            window.addEventListener("load", () => {

                  const containers = document.querySelectorAll('[data-crop]'); // 全ての対象コンテナを取得
                  containers.forEach((container) => {
                        const targetImage = container.querySelector('.overlay-target');
                        const overlay = container.querySelector('.overlay');
            
                        const imageRect = targetImage.getBoundingClientRect();
                        const cropData = JSON.parse(container.dataset.crop); // data-crop 属性から JSON を取得
                        if(cropData == null) return
                        
                        // オーバーレイのスタイルを設定
                        overlay.style.left = `${(cropData.x_percent / 100) * imageRect.width}px`;
                        overlay.style.top = `${(cropData.y_percent / 100) * imageRect.height}px`;
                        overlay.style.width = `${(cropData.width_percent / 100) * imageRect.width}px`;
                        overlay.style.height = `${(cropData.height_percent / 100) * imageRect.height}px`;
                        overlay.style.display = "inline-block";
                  });
            });
      </script>
@endif
