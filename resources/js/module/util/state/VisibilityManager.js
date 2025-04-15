import BrowserAndDeviceDetector from "../BrowserAndDeviceDetector.js"

export default class VisibilityManager{
    constructor(socket, senderId){
        this.VISIBILITY_CHANGE_DEBOUNCE_TIME = 1000
        this.isVisible = !document.hidden
        this.lastVisibilityChangeTime = 0
        this.socket = socket
        this.senderId = senderId
        this.wasHidden =false

        // Androidのみ、visibilitychangeイベントを監視する
        if (BrowserAndDeviceDetector.isAndroid()) {
            // ブラウザバックの検知(Androidのみ)
            // リンクを開いてチャットが更新されるように
            const entries = performance.getEntriesByType('navigation');
            entries.forEach((entry) => {
                if (entry.type === 'back_forward') {
                    this.notifyServerOfVisibilityChange(true);
                    window.location.reload()
                }
            });

            this.setupEventListener();
        }

        if(BrowserAndDeviceDetector.isIOS()){
            document.addEventListener("visibilitychange", ()=> {
                const isVisible = !document.hidden;
    
                if (isVisible) {
                    // 画面が表示された時
        
                    this.socket.emit('userVisibility', {
                        user_id: this.senderId,
                        is_visible: true
                    });
                } else {
                    // 画面が非表示になった時
                    this.socket.emit('userVisibility', {
                        user_id: this.senderId,
                        is_visible: false
                    });
                }

                
            })
        }
    }

    setupEventListener(){
        document.addEventListener("visibilitychange", ()=> this.handleVisibilityChange())
    }


    handleVisibilityChange(){
        const newVisibleState = !document.hidden;
        const currentTime = Date.now();

        if (currentTime - this.lastVisibilityChangeTime < this.VISIBILITY_CHANGE_DEBOUNCE_TIME) {
            return;
        }

        // WebSocketを使ってサーバーに状態を通知
        this.notifyServerOfVisibilityChange(newVisibleState);

        this.isVisible = newVisibleState;
        this.lastVisibilityChangeTime = currentTime;
    }

    notifyServerOfVisibilityChange(isVisible) {
        this.socket.emit('userVisibility', {
            user_id: this.senderId,
            is_visible: isVisible
        });
    }
}