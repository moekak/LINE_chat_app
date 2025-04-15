class Utility{
      // 現在の時間を取得し、〇〇:〇〇の形にする
      static getCurrentTimeFormatted(){
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
      }

}

export default Utility;