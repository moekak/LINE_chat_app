// js/module/services/SocketService.js
import io from 'socket.io-client';
import BrowserAndDeviceDetector from '../BrowserAndDeviceDetector.js';

class SocketService {
	constructor(url, senderId) {
		this.socket = io(url, {
			reconnection: true,
			reconnectionDelay: 1000,
			reconnectionDelayMax: 5000,
			reconnectionAttempts: Infinity
		});

		if(BrowserAndDeviceDetector.isAndroid() || BrowserAndDeviceDetector.isIOS){
			if(document.visibilityState == "visible"){
				this.socket.emit('userVisibility', {
					visibilityState: document.visibilityState,
					user_id: senderId,
					is_visible: true
				});
			}
			
		}

		this.socket.on('connect', () => {
			this.registerUser(senderId);
		});

		this.socket.on('disconnect', () => {
			// 接続が切れた場合の処理を記述
			window.location.reload();
		});
	}

	registerUser(senderId) {
		if (this.socket && senderId) {
		this.socket.emit('register', senderId);
		}
	}

	sendHeartbeat() {
		if (this.socket) {
			this.socket.emit('heartbeat');
		}
	}

	getSocket() {
		return this.socket;
	}
}

export default SocketService;