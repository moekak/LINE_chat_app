export default class FormatText{
      /**
       * エスケープ処理
       * @param {string} - エスケープする前の文字列
       * @return {string} - エスケープされた文字列
       */
      static escapeHtml(str) {
            return str
            .replace(/&/g, "&amp;")  // & は最初に変換
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

      }
}