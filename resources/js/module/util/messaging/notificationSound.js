export const playNotificationSound = () => {
        // WAVファイルのパスを指定
        const audio = new Audio('/img/sound.wav');
        audio.play();
}
