<div class="message-template-container hidden js_modal">
    <h1>テンプレート</h1>
    
    <!-- フィルターUI -->
    <div class="filter-container">
        <div class="filter-title">カテゴリーでフィルター</div>
        <div class="filter-buttons">
            @foreach ($template_categories as $category)
                <button class="filter-button" type="button" data-id="{{$category["id"]}}" data-tag="{{$category["category_name"]}}">{{mb_strlen($category["category_name"]) > 20 ? mb_substr($category["category_name"], 0, 20) . '...' : $category["category_name"]}}</button> 
            @endforeach
        </div>
        <div class="filter-actions">
            <button class="clear-filter">すべて表示</button>
        </div>
    </div>
    
    <!-- 検索結果なしメッセージ -->
    <div class="no-results">
        <p>選択したカテゴリーに一致するテンプレートはありません。</p>
        <p>別のカテゴリーを選択するか、「すべて表示」をクリックしてください。</p>
    </div>
    
    <div class="templates-grid">
        <!-- テンプレート1 -->
        @foreach ($templates_data as $template)
        @php
            $title = strlen($template["template_name"]) > 30
                ? substr($template["template_name"], 0, 30) . '...'
                : $template["template_name"];

            $preview = '';
            if ($template["contents"][0]["content_type"] === "text") {
                $text = $template["contents"][0]["content_text"];
                $preview = strlen($text) > 200
                    ? substr($text, 0, 200) . '...'
                    : $text;
            }
        @endphp

            <div class="template-card" data-template-id="{{$template["template_id"]}}" data-tags="{{$template["category_name"]}}" data-order="{{$template["display_order"]}}">
                <div class="selection-indicator">✓</div>
                <div class="template-header">
                    <div class="template-title">{!! $title !!}</div>
                </div>
                <div class="template-preview-text">
                    @if ($template["contents"][0]["content_type"] === "text")
                    <p>{!! $preview !!}</p>
                    @else
                        <p>画像</p>
                    @endif
                    
                </div>

                <div class="template-content">
                    <div class="template-tags">
                        <span class="template-tag">{{$template["category_name"]}}</span>
                    </div>
                    @foreach ($template["contents"] as $content)
                        <div class="chat-message">
                            @if ($content["content_type"] === "text")
                                <p class="template-message" data-order="{{$content["display_order"]}}">{!!$content["content_text"]!!}</p>
                            @elseif($content["content_type"] === "image")
                                <img src="{{ Storage::disk('s3')->url('images/' . $content['image_path']) }}" class="template-image" data-crop-area="{{$content["cropArea"]}}"  data-order="{{$content["display_order"]}}">

                            @endif
                        </div>
                    @endforeach
                </div>
                <div class="template-actions">
                    <button class="expand-btn">
                        詳細を表示
                        <span class="expand-icon">▼</span>
                    </button>
                    <button class="select-btn">選択</button>
                </div>
            </div>
        @endforeach
    </div>
    <!-- 選択されたテンプレートの表示エリア -->
    <form id="template_form">
        <div class="selected-template-display"></div>
    </form>
</div>