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

	// 接続が確立された時点で'register'イベントを送信
	socket.on('connect', () => {
		console.log("connecting!");
		
		registerUser(socket, sender_id); // 接続後に'registerUser'を呼び出す

	});

	//サーバーから切断されたときのイベント
	// 非同期にしないとだめ！！！！！！！！！！！！！！！！！！！！！！
	socket.on('disconnect', () => {
		// alertダイアログを表示し、OKを押したら自動的にページをリロード
		// alert("接続が切れました。ページを再リロードします。");
		// ページをリロード
		// if (/Android/i.test(navigator.userAgent)){
		// 	return
		// }
		window.location.reload();
	});


	
	

	

};


// ユーザーをサーバーに登録する関数
export const registerUser = (socket, sender_id) => {
	if (socket && sender_id) {
		socket.emit('register', sender_id);
	}
};

// ハートビートを送信する関数
export const sendHeartbeat = () =>{
	socket.emit('heartbeat');
}

// ソケットを外部で使用できるようにエクスポート
export const getSocket = () => socket;
