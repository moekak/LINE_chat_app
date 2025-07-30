import { API_ENDPOINTS } from "./config/apiEndPoints";
import Fetch from "./module/util/api/Fetch";

// 統合設定管理システム
document.addEventListener("DOMContentLoaded", () => {
      const SettingsManager = {
            // 設定データ
            settings: {
                  voice: {
                        enabled: true
                  },
                  theme: {
                        current: 'default',
                        customColor: {
                              r: document.getElementById("red_value").value ?? 245,
                              g: document.getElementById("green_value").value ?? 246,
                              b: document.getElementById("blue_value").value ?? 250
                        },
                        hex: document.getElementById("hex_display").value ?? "#f5f6fa"
                  },
                  isCorrectData : true,
            },
            
            // DOM要素
            elements: {
                  settingsButton: null,
                  settingsModal: null,
                  closeButton: null,
                  backgroundLayer: null,
                  voiceCheckbox: null,
                  themeCards: null,
                  saveButton: null,
                  customColorPanel: null,
                  rgbSliders: {
                        red: null,
                        green: null,
                        blue: null
                  },
                  rgbValues: {
                        red: null,
                        green: null,
                        blue: null
                  },
                  colorPreview: null,
                  rgbDisplay: null,
                  hexDisplay: null,
                  presetColors: null
            },
            
            // 初期化
            init() {
                  this.initElements();
                  this.bindEvents();
                  this.loadSettings();
                  this.updateUI();
            },
            
            // DOM要素の取得
            initElements() {
                  this.elements.settingsButton = document.querySelector('.js_settings_toggle');
                  this.elements.settingsModal = document.querySelector('.settings_modal');
                  this.elements.closeButton = document.querySelector('.js_close_settings_modal');
                  this.elements.backgroundLayer = document.querySelector('.bg') || this.createBackgroundLayer();
                  this.elements.voiceCheckbox = document.querySelector('.js_voice_checkbox');
                  this.elements.themeCards = document.querySelectorAll('.theme_card');
                  this.elements.saveButton = document.querySelector('.js_save_settings');
                  this.elements.customColorPanel = document.getElementById('custom_color_panel');
                  
                  // RGB関連要素
                  this.elements.rgbSliders.red = document.getElementById('red_slider');
                  this.elements.rgbSliders.green = document.getElementById('green_slider');
                  this.elements.rgbSliders.blue = document.getElementById('blue_slider');
                  this.elements.rgbValues.red = document.getElementById('red_value');
                  this.elements.rgbValues.green = document.getElementById('green_value');
                  this.elements.rgbValues.blue = document.getElementById('blue_value');
                  this.elements.colorPreview = document.getElementById('color_preview_large');
                  this.elements.rgbDisplay = document.getElementById('rgb_display');
                  this.elements.hexDisplay = document.getElementById('hex_display');
                  this.elements.presetColors = document.querySelectorAll('.preset_color');
            },
            
            // 背景レイヤーの作成
            createBackgroundLayer() {
                  const bg = document.createElement('div');
                  bg.className = 'bg hidden';
                  document.body.appendChild(bg);
                  return bg;
            },
            
            // イベントリスナーの設定
            bindEvents() {
                  // 設定ボタンクリック
                  if (this.elements.settingsButton) {
                        this.elements.settingsButton.addEventListener('click', () => {
                              this.openSettings();
                        });
                  }

                  if(this.elements.hexDisplay){
                        this.elements.hexDisplay.addEventListener("input", (e)=>{
                              const hex = e.target.value
                              this.settings.theme.hex = hex
                              const rgb = this.hexToRgb(hex)
                              this.settings.isCorrectData = this.validatorForHex(hex) && this.validatorForRgb(rgb["r"], rgb["g"], rgb["b"])
                              this.settings.theme.customColor.r = rgb["r"]
                              this.settings.theme.customColor.g = rgb["g"]
                              this.settings.theme.customColor.b = rgb["b"]
                              this.setCustomColor(rgb["r"], rgb["g"], rgb["b"], true);

                        })
                  }
                  if(this.elements.rgbDisplay){
                        this.elements.rgbDisplay.addEventListener("input", (e)=>{
                              const rgb = e.target.value
                              const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);

                              if (match) {
                                    const r = parseInt(match[1]);
                                    const g = parseInt(match[2]);
                                    const b = parseInt(match[3]);
                                    const hex = this.rgbToHex(r, g, b)
                                    this.settings.theme.hex = hex
                                    this.settings.theme.customColor.r = r
                                    this.settings.theme.customColor.g = g
                                    this.settings.theme.customColor.b = b
                                    this.setCustomColor(r, g, b);

                                    this.settings.isCorrectData = this.validatorForHex(hex) && this.validatorForRgb(r, g, b)
                                    
                              }else{
                                    this.settings.isCorrectData = false
                              }

                        })
                  }

                  
                  // モーダル閉じるボタン
                  if (this.elements.closeButton) {
                        this.elements.closeButton.addEventListener('click', () => {
                              this.closeSettings();
                        });
                  }
                  
                  // 背景クリックで閉じる
                  if (this.elements.backgroundLayer) {
                        this.elements.backgroundLayer.addEventListener('click', () => {
                              this.closeSettings();
                        });
                  }
                  
                  // 音声設定の変更
                  if (this.elements.voiceCheckbox) {
                        this.elements.voiceCheckbox.addEventListener('change', (e) => {
                              window.isON["isSoundOn"] = e.target.checked;
                              this.showVoiceToggleFeedback();
                        });
                  }
                  
                  // テーマカード選択
                  this.elements.themeCards.forEach(card => {
                        card.addEventListener('click', () => {
                              this.selectTheme(card.dataset.theme);
                        });
                  });
                  
                  // RGB スライダー
                  Object.keys(this.elements.rgbSliders).forEach(color => {
                        const slider = this.elements.rgbSliders[color];
                        if (slider) {
                              slider.addEventListener('input', () => {
                                    this.updateCustomColor();
                                    this.settings.isCorrectData = true
                              });
                        }
                  });
                  
                  // プリセットカラー
                  this.elements.presetColors.forEach(preset => {
                        preset.addEventListener('click', () => {
                              const rgb = preset.dataset.rgb.split(',').map(Number);
                              this.setCustomColor(rgb[0], rgb[1], rgb[2]);
                              this.settings.isCorrectData = true
                        });
                  });
                  

                  
                  // 保存ボタン
                  if (this.elements.saveButton) {
                        this.elements.saveButton.addEventListener('click', () => {
                              this.saveSettings();
                        });
                  }
                  
                  // ESCキーで閉じる
                  document.addEventListener('keydown', (e) => {
                        if (e.key === 'Escape' && !this.elements.settingsModal.classList.contains('hidden')) {
                              this.closeSettings();
                        }
                  });
            },
            
            // 設定モーダルを開く
            openSettings() {
                  // 設定ボタンにアニメーション
                  this.elements.settingsButton.classList.add('active');
                  setTimeout(() => {
                        this.elements.settingsButton.classList.remove('active');
                  }, 600);
                  
                  // モーダルを表示
                  this.elements.backgroundLayer.classList.remove('hidden');
                  this.elements.settingsModal.classList.remove('hidden');
                  
                  // 現在の設定をUIに反映
                  this.updateModalUI();
            },
            
            // 設定モーダルを閉じる
            closeSettings() {
                  this.elements.backgroundLayer.classList.add('hidden');
                  this.elements.settingsModal.classList.add('hidden');
            },
            
            // モーダル内のUIを更新
            updateModalUI() {
                  // 音声設定の反映
                  if (this.elements.voiceCheckbox) {
                        this.elements.voiceCheckbox.checked = window.isON["isSoundOn"];
                  }
                  
                  // テーマ選択の反映
                  this.updateThemeSelection();
            
            },

            // カスタムカラーの更新
            updateCustomColor() {
                  const r = parseInt(this.elements.rgbSliders.red.value);
                  const g = parseInt(this.elements.rgbSliders.green.value);
                  const b = parseInt(this.elements.rgbSliders.blue.value);
                  
                  this.settings.theme.customColor = { r, g, b };
                  this.updateCustomColorUI();
            },
            
            // カスタムカラーの設定
            setCustomColor(r, g, b, isHex = false) {
                  this.settings.theme.customColor = { r, g, b };
                  
                  // スライダーの値を更新
                  this.elements.rgbSliders.red.value = r;
                  this.elements.rgbSliders.green.value = g;
                  this.elements.rgbSliders.blue.value = b;
                  
                  this.updateCustomColorUI(isHex);
            },
            
            // カスタムカラーUIの更新
            updateCustomColorUI(isHex = false) {
                  const { r, g, b } = this.settings.theme.customColor;
                  
                  // 値の表示を更新
                  this.elements.rgbValues.red.textContent = r;
                  this.elements.rgbValues.green.textContent = g;
                  this.elements.rgbValues.blue.textContent = b;
                  
                  // カラープレビューを更新
                  const rgbColor = `rgb(${r}, ${g}, ${b})`;
                  if (this.elements.colorPreview) {
                        this.elements.colorPreview.style.background = rgbColor;
                  }
                  
                  // カスタムテーマプレビューを更新
                  const customPreview = document.getElementById('custom_preview');
                  if (customPreview) {
                        customPreview.style.background = rgbColor;
                  }
                  
                  // // RGB/HEX表示を更新
                  if (this.elements.rgbDisplay) {
                        this.elements.rgbDisplay.value = rgbColor;
                  }
                  
                  if (!isHex && this.elements.hexDisplay) {
                        const hex = this.rgbToHex(r, g, b);
                        this.settings.theme.hex = hex

                        this.settings.theme.customColor.r = r
                        this.settings.theme.customColor.g = g
                        this.settings.theme.customColor.b = b
                        this.elements.hexDisplay.value = hex;
                  }
                  
                  // スライダーの背景を更新
                  this.updateSliderBackgrounds();
            },
            
            // スライダー背景の更新
            updateSliderBackgrounds() {
                  const { r, g, b } = this.settings.theme.customColor;
                  
                  // 赤スライダー
                  if (this.elements.rgbSliders.red) {
                        this.elements.rgbSliders.red.style.background = `linear-gradient(to right, rgb(0,${g},${b}) 0%, rgb(255,${g},${b}) 100%)`;
                  }
                  
                  // 緑スライダー
                  if (this.elements.rgbSliders.green) {
                        this.elements.rgbSliders.green.style.background =  `linear-gradient(to right, rgb(${r},0,${b}) 0%, rgb(${r},255,${b}) 100%)`;
                  }
                  
                  // 青スライダー
                  if (this.elements.rgbSliders.blue) {
                  this.elements.rgbSliders.blue.style.background = `linear-gradient(to right, rgb(${r},${g},0) 0%, rgb(${r},${g},255) 100%)`;
                  }
            },

            validatorForHex(hex) {
                  return /^#[0-9A-Fa-f]{6}$/.test(hex);
            },
            validatorForRgb(r, g, b) {
                  const isValidValue = (n) => !isNaN(n) && n >= 0 && n <= 255;
                  return isValidValue(r) && isValidValue(g) && isValidValue(b);
            },

            
            // RGBからHEXへの変換
            rgbToHex(r, g, b) {
                  const componentToHex = (c) => {
                        const hex = c.toString(16);
                        return hex.length == 1 ? "0" + hex : hex;
                  };
                        
                  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
            },

            hexToRgb(hex) {
                  // #を除去し、大文字に変換
                  hex = hex.replace('#', '').toUpperCase();
                  if (!/^[0-9A-F]{6}$/.test(hex)) return { r: NaN, g: NaN, b: NaN };
                  
                  // 16進数を10進数に変換
                  const r = parseInt(hex.substring(0, 2), 16);
                  const g = parseInt(hex.substring(2, 4), 16);
                  const b = parseInt(hex.substring(4, 6), 16);
                  
                  return { r, g, b };
            },
                              
            
            // テーマ選択UIの更新
            updateThemeSelection() {
                  this.elements.themeCards.forEach(card => {
                        if (card.dataset.theme === this.settings.theme.current) {
                              card.classList.add('active');
                        } else {
                              card.classList.remove('active');
                        }
                  });
            },
            
            // 音声切り替えフィードバック
            showVoiceToggleFeedback() {
                  const message = window.isON["isSoundOn"] ? 
                  '🔊 音声通知がオンになりました' : 
                  '🔇 音声通知がオフになりました';
                  this.showToast(message, window.isON["isSoundOn"] ? '#27ae60' : '#e74c3c');
            },
            
            // 設定の保存
            async saveSettings() {
                  if(!this.settings.isCorrectData){
                        document.getElementById("js_error").classList.remove("hidden")
                        return
                  }else{
                        document.getElementById("js_error").classList.add("hidden")
                  }

                  document.querySelector(".js_saving_txt").classList.add("hidden")
                  document.querySelector(".js_spinning_btn").classList.remove("hidden")
                  const data = {
                        "hex" : this.settings.theme.hex,
                        "rgb" : this.settings.theme.customColor,
                        "line_account_id" : document.getElementById("js_admin_id").value
                  }


                  const response = await Fetch.fetchPostOperation(data, API_ENDPOINTS.UPDATE_BACKGROUND_COLOLR)
      
                  if(response["status"] === 200){
                        document.querySelector(".js_spinning_btn").classList.add("hidden")
                        document.querySelector(".js_saving_txt").classList.remove("hidden")
                        document.querySelector(".main").style.backgroundColor = response["hex"]
                  }else{
                        document.querySelector(".js_spinning_btn").classList.add("hidden")
                        document.querySelector(".js_saving_txt").classList.remove("hidden")
                        alert("背景色の設定に失敗しました。お手数ですがもう一度お試しください。")
                  }
                  

                  // // テーマの適用
                  // this.applyTheme();
                  
                  // // メモリに保存
                  // this.saveToMemory();
                  
                  // 保存完了のフィードバック
                  this.showSaveSuccess();
                  
                  // モーダルを閉じる
                  setTimeout(() => {
                        this.closeSettings();
                  }, 1000);
            },
            
            // テーマの適用
            applyTheme() {
                  const body = document.body;
                  const contents = document.querySelector('.contents');
                  
                  // 既存のテーマクラスを削除
                  body.className = body.className.replace(/theme-\w+/g, '');
                  if (contents) {
                        contents.className = contents.className.replace(/theme-\w+/g, '');
                        contents.classList.add('theme-transition');
                  }
                  
                  // 新しいテーマクラスを追加
                  if (this.settings.theme.current !== 'default') {
                        body.classList.add(`theme-${this.settings.theme.current}`);
                        if (contents) {
                              contents.classList.add(`theme-${this.settings.theme.current}`);
                        }
                  }
                  
                  // カスタムテーマの場合は背景色を直接適用
                  if (this.settings.theme.current === 'custom') {
                        const { r, g, b } = this.settings.theme.customColor;
                        const customColor = `rgb(${r}, ${g}, ${b})`;
                        const lightColor = `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`;
                        
                        if (contents) {
                              contents.style.background = `linear-gradient(135deg, ${customColor} 0%, ${lightColor} 100%)`;
                        }
                        body.style.backgroundColor = customColor;
                  } else {
                        // カスタムテーマでない場合はインラインスタイルをリセット
                        if (contents) {
                              contents.style.background = '';
                        }
                        body.style.backgroundColor = '';
                  }
                  
                  // トランジション効果を削除
                  setTimeout(() => {
                        if (contents) {
                              contents.classList.remove('theme-transition');
                        }
                  }, 500);
            },
            
            // メモリに設定を保存
            saveToMemory() {
                  window.chatSettings = {
                        voice: { ...this.settings.voice },
                        theme: { ...this.settings.theme }
                  };
            },
            
            // 設定の読み込み
            loadSettings() {
                  if (window.chatSettings) {
                        this.settings = {
                              voice: { ...window.chatSettings.voice },
                              theme: { ...window.chatSettings.theme }
                        };
                  }
            },
            
            // UIの更新
            updateUI() {
                  this.applyTheme();
            },
            
            // 保存成功のフィードバック
            showSaveSuccess() {
                  const button = this.elements.saveButton;
                  const originalText = button.querySelector(".js_saving_txt").textContent;
                  
                  button.querySelector(".js_saving_txt").textContent = '✓ 保存しました';
                  button.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
                  
                  setTimeout(() => {
                        button.querySelector(".js_saving_txt").textContent = originalText;
                        button.style.background = 'linear-gradient(135deg, #1a7aea 0%, #2196f3 100%)';
                  }, 2000);
                  
                  let themeName = this.getThemeDisplayName(this.settings.theme.current);
                  if (this.settings.theme.current === 'custom') {
                        const { r, g, b } = this.settings.theme.customColor;
                        themeName += ` (RGB: ${r}, ${g}, ${b})`;
                  }
                  this.showToast(`設定を保存しました`, '#27ae60');
            },
            
            // テーマ表示名の取得
            getThemeDisplayName(theme) {
                  const names = {
                        'default': 'デフォルト',
                        'dark': 'ダーク',
                        'blue': 'ブルー',
                        'green': 'グリーン',
                        'purple': 'パープル',
                        'warm': 'ウォーム',
                        'custom': 'カスタム'
                  };
                  return names[theme] || 'デフォルト';
            },
            
            // トースト通知の表示
            showToast(message, backgroundColor = '#1a7aea') {
                  // 既存のトーストがあれば削除
                  const existingToast = document.querySelector('.settings-toast');
                  if (existingToast) {
                        existingToast.remove();
                  }
                  
                  const toast = document.createElement('div');
                  toast.className = 'settings-toast';
                  toast.textContent = message;
                  toast.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background-color: ${backgroundColor};
                        color: white;
                        padding: 12px 20px;
                        border-radius: 10px;
                        z-index: 1001;
                        font-size: 14px;
                        font-weight: 500;
                        box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                        transform: translateX(100%);
                        transition: transform 0.3s ease;
                        max-width: 300px;
                        word-wrap: break-word;
                  `;
                  
                  document.body.appendChild(toast);
                  
                  // アニメーション
                  setTimeout(() => {
                        toast.style.transform = 'translateX(0)';
                  }, 100);
                  
                  setTimeout(() => {
                        toast.style.transform = 'translateX(100%)';
                        setTimeout(() => {
                              if (toast.parentNode) {
                                    toast.parentNode.removeChild(toast);
                              }
                        }, 300);
                  }, 3500);
            },
            
            // 音声通知の再生（外部から呼び出し可能）
            playNotificationSound() {
                  if (this.settings.voice.enabled) {
                        try {
                              // 実際の音声ファイルのパスを設定してください
                              const audio = new Audio('/path/to/notification.mp3');
                              audio.volume = 0.5;
                              audio.play().catch(e => {

                                    // 代替として簡単なビープ音
                                    this.playBeepSound();
                              });
                        } catch (e) {

                              this.playBeepSound();
                        }
                  }
            },
            
            // 代替ビープ音
            playBeepSound() {
                  if (this.settings.voice.enabled) {
                        try {
                              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                              const oscillator = audioContext.createOscillator();
                              const gainNode = audioContext.createGain();
                              
                              oscillator.connect(gainNode);
                              gainNode.connect(audioContext.destination);
                              
                              oscillator.frequency.value = 800;
                              oscillator.type = 'sine';
                              
                              gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                              
                              oscillator.start(audioContext.currentTime);
                              oscillator.stop(audioContext.currentTime + 0.1);
                        } catch (e) {
                              console.log('ビープ音の再生に失敗:', e);
                        }
                  }
            }

            
      };
      
      // 初期化
      SettingsManager.init();
      
      // グローバルに音声通知機能を公開
      window.playNotificationSound = function() {
            SettingsManager.playNotificationSound();
      };
      
      // グローバルに設定オブジェクトを公開（デバッグ用）
      window.SettingsManager = SettingsManager;

      
});