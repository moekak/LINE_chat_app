class BrowserAndDeviceDetector{
      static isBrave() {
            const userAgent = navigator.userAgent.toLowerCase();
            // Braveの固有のチェック
            if (navigator.brave && typeof navigator.brave.isBrave === "function") {
                  return true;
            }
            // ユーザーエージェントに "brave" が含まれている場合
            if (userAgent.includes("brave")) {
                  return true;
            }
            return false;
      }

      static isEdge(){
            const userAgent = navigator.userAgent.toLowerCase();
            // Edgeの特定
            return userAgent.includes("edg") && !userAgent.includes("edgehtml");
      }

      static isOpera() {
            const userAgent = navigator.userAgent.toLowerCase();
            // Operaの固有の識別
            return userAgent.includes("opera") || userAgent.includes("opr");
      }

      static isSafari(){
            return  !BrowserAndDeviceDetector.isOpera && !BrowserAndDeviceDetector.isBrave() && !BrowserAndDeviceDetector.isEdge && /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) && !navigator.userAgent.includes('Chrome');
      }
      static isChrome() {
            return navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg');
      }

      static isFirefox() {
            const userAgent = navigator.userAgent.toLowerCase();
            return userAgent.includes("firefox") && !userAgent.includes("seamonkey");
      }

      static isIOS(){
            return (/iPad|iPhone|iPod/.test(navigator.userAgent) ||(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) && !window.MSStream;
      }
      static isAndroid() {
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return /android/i.test(userAgent) && !window.MSStream;
      }
}

export default BrowserAndDeviceDetector; // ESモジュール形式でエクスポート
