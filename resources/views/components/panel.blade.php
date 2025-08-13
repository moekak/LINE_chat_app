<style>
    .chat-layout {
        display: flex;
        height: 100vh;
    }


    .chat-info-panel {
        background: #fff;
        border-left: 1px solid #e0e0e0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
        margin-left: 30px;
        width: 300px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
    }

    /* チャット情報パネルのヘッダー */
    .info-panel-header {
        padding: 16px 20px;
        border-bottom: 1px solid #e8e8e8;
        background: #fafafa;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info-panel-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
    }

    .panel-toggle-btn {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        font-size: 18px;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .panel-toggle-btn:hover {
        background: #e8e8e8;
        color: #333;
    }

    /* 情報セクション共通スタイル */
    .info-section {
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
    }

    .info-section:last-child {
        border-bottom: none;
    }

    .info-section-title {
        font-size: 14px;
        font-weight: 600;
        color: #666;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .section-icon {
        font-size: 16px;
        color: #4a90e2;
    }

    /* 顧客情報セクション */
    .customer-info {
        background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
    }

    .customer-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: #fff;
        border: 1px solid #e0e8ff;
        border-radius: 8px;
        margin-bottom: 8px;
    }

    .code-label {
        font-size: 13px;
        color: #666;
        font-weight: 500;
    }

    .code-value {
        font-size: 14px;
        font-weight: 600;
        color: #2c5aa0;
        font-family: 'Courier New', monospace;
    }

    .copy-btn {
        background: none;
        border: none;
        color: #4a90e2;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .copy-btn:hover {
        background: #e8f2ff;
        color: #2c5aa0;
    }

    /* 広告情報セクション */
    .ad-info {
        background: linear-gradient(135deg, #fff8f0 0%, #fef4e6 100%);
    }

    .ad-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: #fff;
        border: 1px solid #ffe0b8;
        border-radius: 8px;
        margin-bottom: 8px;
    }

    .ad-code .code-value {
        color: #d97706;
    }

    .ad-code .copy-btn:hover {
        background: #fef3e6;
        color: #b45309;
    }

    /* タグセクション */
    .tags-info {
        background: linear-gradient(135deg, #f0fff4 0%, #e6f7ed 100%);
    }

    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag-item {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        background: #fff;
        border: 1px solid #d1fae5;
        border-radius: 20px;
        font-size: 13px;
        color: #065f46;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .tag-icon {
        font-size: 10px;
        margin-right: 6px;
    }

    .tag-remove {
        margin-left: 6px;
        color: #9ca3af;
        cursor: pointer;
        font-size: 12px;
        transition: color 0.2s ease;
    }

    .tag-remove:hover {
        color: #ef4444;
    }

    .add-tag-btn {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        background: #f9fafb;
        border: 2px dashed #d1d5db;
        border-radius: 20px;
        font-size: 13px;
        color: #6b7280;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .add-tag-btn:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
        color: #374151;
    }

    .add-tag-icon {
        font-size: 12px;
        margin-right: 6px;
    }

    /* 空の状態 */
    .empty-state {
        text-align: center;
        padding: 20px;
        color: #9ca3af;
        font-size: 14px;
    }

    .empty-icon {
        font-size: 24px;
        margin-bottom: 8px;
        opacity: 0.5;
    }

    /* レスポンシブ対応 */
    @media (max-width: 768px) {
        .chat-info-panel {
            position: fixed;
            right: -320px;
            top: 0;
            height: 100vh;
            z-index: 1000;
            transition: right 0.3s ease;
            box-shadow: -2px 0 10px rgba(0,0,0,0.1);
        }

        .chat-info-panel.active {
            right: 0;
        }

        .panel-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .panel-overlay.active {
            opacity: 1;
            visibility: visible;
        }
    }

    /* トースト通知 */
    .toast {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }

    .toast.show {
        transform: translateX(0);
    }
    .close-info-panel-btn {
        background: none;
        border: none;
        font-size: 20px;
        font-weight: bold;
        color: #888;
        cursor: pointer;
        margin-left: auto;
        padding: 4px 8px;
        transition: color 0.2s ease;
        display:none;
    }

.close-info-panel-btn:hover {
    color: #000;
}

    @media (max-width: 1573px){
        .chat-info-panel{
            display: none;
        }
        .close-info-panel-btn{
            display: block;
        }
    }
</style>


<div class="chat-info-panel" id="infoPanelDesktop">
    <!-- パネルヘッダー -->
    <div class="info-panel-header">
        <h3 class="info-panel-title">
                <i class="fas fa-info-circle" style="margin-right: 8px; color: #4a90e2;"></i>
                顧客情報
        </h3>
        <button class="close-info-panel-btn">×</button>
    </div>

    <!-- 顧客情報セクション -->
    <div class="info-section customer-info">
        <h4 class="info-section-title">
                <i class="fas fa-user section-icon"></i>
                顧客コード
        </h4>
        <div class="customer-code">
            <div>
                <div class="code-value" id="customerCode">{{$userDetail["client_code"] ?? "なし"}}</div>
            </div>
        </div>
    </div>

    <!-- 広告情報セクション -->
    <div class="info-section ad-info">
        <h4 class="info-section-title">
                <i class="fas fa-bullhorn section-icon"></i>
                広告コード
        </h4>
        <div class="ad-code">
                <div>
                    <div class="code-value" id="adCode">{{$userDetail["ad_code"] ?? "なし"}}</div>
                </div>
        </div>
    </div>

    <!-- タグ情報セクション -->
    <div class="info-section tags-info">
        <h4 class="info-section-title">
                <i class="fas fa-tags section-icon"></i>
                タグ情報({{count($userDetail) > 0 ? count($userDetail["chat_user"]["tag_users"]) : 0}})
        </h4>
        <div class="tags-container" id="tagsContainer">
            @if (count($userDetail) > 0)
                @foreach ($userDetail["chat_user"]["tag_users"] as $tag)
                    <span class="tag-item">
                        <i class="fas fa-circle tag-icon" style="color: {{$tag["tag"]["tag_color"]}};"></i>
                            {{$tag["tag"]["tag_name"]}}
                    </span>
                @endforeach
            @endif
        </div>
    </div>
</div>

