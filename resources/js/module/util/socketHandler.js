import io from 'socket.io-client';

let socket;

// Socket.IOサーバーへの接続を初期化
export const initSocket = (url, sender_id) => {
  socket = io(url, {
    reconnection: true,         // 自動再接続を有効にする
    reconnectionDelay: 1000,    // 再接続の遅延時間 (ミリ秒)
    reconnectionDelayMax: 5000, // 再接続の最大遅延時間 (ミリ秒)
    reconnectionAttempts: Infinity // 再接続の試行回数 (無限に設定)
  });

  // ページの可視性が変更されたときのイベントリスナー
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
      checkOrReconnectSocket(sender_id);
    }
  });

  // 再接続試行イベント
  socket.on('reconnect_attempt', () => {
    console.log('Attempting to reconnect');
  });

  // 再接続エラーイベント
  socket.on('reconnect_error', (error) => {
    console.log('Reconnection failed:', error);
  });

  // サーバーから切断されたときのイベント
  socket.on('disconnect', (reason) => {
    console.log(`Disconnected from the server due to ${reason}`);
    socket.connect();
    registerUser(sender_id);  // 切断時にユーザーを再登録
  });
};

// ソケットの接続状態を確認し、必要に応じて再接続
export const checkOrReconnectSocket = (sender_id) => {
  if (!socket.connected) {
    console.log("Socket.IOは接続されていません。再接続を試みます。");
    registerUser(sender_id);
    socket.connect();
  } else {
    registerUser(sender_id);
  }
};

// ユーザーをサーバーに登録する関数
export const registerUser = (sender_id) => {
  if (socket && sender_id) {
    socket.emit('register', sender_id);
    console.log(`User ${sender_id} is registered.`);
  }
};

// ハートビートを送信する関数
export const sendHeartbeat = () =>{
      console.log('Sending heartbeat');
      socket.emit('heartbeat');
}

// ソケットを外部で使用できるようにエクスポート
export const getSocket = () => socket;
