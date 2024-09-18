/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/module/component/changeStyle.js":
/*!******************************************************!*\
  !*** ./resources/js/module/component/changeStyle.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   changeTextareaHeight: () => (/* binding */ changeTextareaHeight),
/* harmony export */   disableSubmitBtn: () => (/* binding */ disableSubmitBtn)
/* harmony export */ });
var changeTextareaHeight = function changeTextareaHeight() {
  var textarea = document.getElementById('js_msg');
  var height = textarea.clientHeight;
  textarea.addEventListener('input', autoResize, false);
  function autoResize() {
    if (this.scrollHeight > height) {
      console.log(this.scrollHeight);
      this.style.height = 'auto'; // 高さをリセット
      this.style.height = this.scrollHeight + 'px'; // 内容に合わせて高さを設定
    }
  }
};
var disableSubmitBtn = function disableSubmitBtn() {
  var field = document.getElementById("js_msg");
  var btn = document.querySelector(".chat__form-submit");
  field.addEventListener("input", function (e) {
    var value = e.currentTarget.value;
    if (value.length > 0) {
      btn.classList.remove("disable_btn");
    } else {
      btn.classList.add("disable_btn");
    }
  });
};

/***/ }),

/***/ "./resources/js/module/component/chatController.js":
/*!*********************************************************!*\
  !*** ./resources/js/module/component/chatController.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adjustMesageLength: () => (/* binding */ adjustMesageLength),
/* harmony export */   createDivForSearch: () => (/* binding */ createDivForSearch),
/* harmony export */   displayChatMessage: () => (/* binding */ displayChatMessage),
/* harmony export */   displayMessage: () => (/* binding */ displayMessage),
/* harmony export */   increaseMessageCount: () => (/* binding */ increaseMessageCount),
/* harmony export */   updateChatUserList: () => (/* binding */ updateChatUserList),
/* harmony export */   updateMessageTime: () => (/* binding */ updateMessageTime)
/* harmony export */ });
/* harmony import */ var _util_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/fetch.js */ "./resources/js/module/util/fetch.js");
/* harmony import */ var _elementTemplate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elementTemplate.js */ "./resources/js/module/component/elementTemplate.js");
/* harmony import */ var _uiController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uiController.js */ "./resources/js/module/component/uiController.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }




// #####################################################################
//                メッセージをチャット画面に表示させる処理
// #####################################################################

//メッセージをチャット画面に表示する
var displayChatMessage = function displayChatMessage(className, type, msg, file_name, sender_id, time, message_type) {
  var parentElement = document.querySelector(".".concat(className));
  var isSenderAdmin = type === "admin";
  var isFileFromUser = file_name === "user";
  var isSenderUser = type === "user";
  var isCorrectAdminMessage = file_name === "admin" && sender_id === parentElement.getAttribute("data-id");
  if (isSenderAdmin && isFileFromUser) {
    addLeftChatMessage(msg, parentElement, time, message_type);
  } else if (isSenderAdmin || isSenderUser && isFileFromUser) {
    addRightChatMessage(msg, parentElement, time, message_type);
  } else if (isCorrectAdminMessage) {
    addLeftChatMessage(msg, parentElement, time, message_type);
  }
};

// チャット画面右側(青)にメッセージを表示する処理
var addRightChatMessage = function addRightChatMessage(content, parentElement, time, message_type) {
  parentElement.innerHTML += (0,_elementTemplate_js__WEBPACK_IMPORTED_MODULE_1__.createRightMessageContainer)(message_type, time, content);
  (0,_uiController_js__WEBPACK_IMPORTED_MODULE_2__.scrollToBottom)();
};
// チャット画面右側(白)にメッセージを表示する処理
var addLeftChatMessage = function addLeftChatMessage(content, parentElement, time, message_type) {
  parentElement.innerHTML += (0,_elementTemplate_js__WEBPACK_IMPORTED_MODULE_1__.createLeftMessageContainer)(message_type, time, content);
  (0,_uiController_js__WEBPACK_IMPORTED_MODULE_2__.scrollToBottom)();
};

// #####################################################################
//                               END
// #####################################################################

// #####################################################################
//                チャットユーザーリストの表示処理
// #####################################################################

// ユーザーからメッセージを受信したらリアルタイムで通知を増やし表示する処理
// そのユーザーのチャットを開いてる場合は除く
var increaseMessageCount = function increaseMessageCount(sender_id) {
  var count_elements = document.querySelectorAll(".js_mesage_count");
  var chat_user_id = document.getElementById("js_chatuser_id").value;
  console.log("senderID: ".concat(sender_id));
  count_elements.forEach(function (count) {
    var id = count.getAttribute("data-id");
    console.log(id);

    // メッセージを送信したユーザーが一覧に表示されて、なおかつそのゆざーのチャット画面を開いていない場合
    if (id == sender_id && id !== chat_user_id) {
      var currentCount = Number(count.innerHTML) || 0;
      if (currentCount == 0) count.style.display = "flex";
      count.innerHTML = "".concat(currentCount + 1);
    }
  });
};

// 新しいメッセージをリアルタイムでチャットユーザーリストのメッセージ箇所に表示する
var displayMessage = function displayMessage(sender_id, msg, sender_type, receiver_id, message_type) {
  var elements = document.querySelectorAll(".js_chatMessage_elment");
  elements.forEach(function (element) {
    // チャットユーザー一覧からチャットユーザーIDを取得
    var id = element.getAttribute("data-id");
    var chat_user_id = sender_type == "user" ? sender_id : receiver_id;
    var txt = message_type == "image" ? sender_type == "user" ? "画像が送信されました" : "画像を送信しました" : msg;
    if (id == chat_user_id) element.innerHTML = txt;
  });
};

// チャットユーザー一覧表示のメッセージ長さ制限処理
// 40文字以上だったら"..."にする
var adjustMesageLength = function adjustMesageLength() {
  var elements = document.querySelectorAll(".js_chatMessage_elment");
  elements.forEach(function (element) {
    if (element.innerHTML.length >= 40) {
      element.innerHTML = element.innerHTML.substring(0, 40) + "...";
    }
  });
};

// 新しいメッセージの時間をリアルタイムでチャットユーザーリストの時間箇所に表示する
var updateMessageTime = function updateMessageTime(time, sender_id, sender_type, receiver_id) {
  var elements = document.querySelectorAll(".js_update_message_time");
  elements.forEach(function (element) {
    var id = element.getAttribute("data-id");
    var chat_user_id = sender_type == "user" ? sender_id : receiver_id;
    if (id == chat_user_id) element.innerHTML = time;
  });
};

// チャットユーザー一覧(左側)にユーザーがいなかったときに新しくdivタグを作りparentタグの一番最初に挿入する
var createNewDivElement = function createNewDivElement(receiver_id, sender_id, msg, message_type) {
  (0,_util_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchGetOperation)("/api/users/".concat(receiver_id, "/").concat(sender_id)).then(function (res) {
    console.log(res);
    var template = (0,_elementTemplate_js__WEBPACK_IMPORTED_MODULE_1__.createChatUserContainer)(receiver_id, res, msg, message_type);
    var parentElement = document.getElementById("js_chatUser_wrapper");
    var firstChild = parentElement.firstChild; // 最初の子要素を取得

    if (firstChild) {
      var newDiv = document.createElement('div');
      newDiv.innerHTML = template;
      parentElement.insertBefore(newDiv, firstChild);
    } else {
      parentElement.innerHTML += template; // 最初の子要素がない場合、末尾に追加
    }
    (0,_uiController_js__WEBPACK_IMPORTED_MODULE_2__.chatNavigator)();
  });
};

// ユーザー検索処理
var createDivForSearch = function createDivForSearch(data) {
  (0,_util_fetch_js__WEBPACK_IMPORTED_MODULE_0__.fetchPostOperation)(data, "/api/search/users").then(function (res) {
    var parentElement = document.getElementById("js_chatUser_wrapper");
    parentElement.innerHTML = "";
    if (res["userInfo"].length > 0) {
      res["userInfo"].forEach(function (res) {
        console.log(res);
        var message_type = res["message"]["content"] ? "text" : "image";
        parentElement.innerHTML += (0,_elementTemplate_js__WEBPACK_IMPORTED_MODULE_1__.createChatUserContainer)(res["uuid"], res, res["message"]["content"], message_type);
      });
      (0,_uiController_js__WEBPACK_IMPORTED_MODULE_2__.chatNavigator)();
    }
  });
};

// チャットユーザーリストを更新
var updateChatUserList = function updateChatUserList(receiver_id, msg, sender_id, message_type, sender_type, is_searching) {
  var wrappers = document.querySelectorAll(".js_chat_wrapper");
  var chat_wrapper = document.getElementById("js_chatUser_wrapper");
  var firstChild = chat_wrapper.firstChild;
  var hasDiv = false;

  // 開いているチャットユーザーが送信者と同じ場合は処理を中止
  if (document.getElementById("js_chatuser_id").value == sender_id) {
    return;
  }

  // 検索中でない場合の処理
  if (!is_searching.flag) {
    // 既にチャットリストに送信者のリストがある場合の処理
    var _iterator = _createForOfIteratorHelper(wrappers),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var wrapper = _step.value;
        var user_id = wrapper.getAttribute("data-uuid");
        var chat_user_id = sender_type === "admin" ? receiver_id : sender_id;
        if (chat_user_id === user_id && wrappers.length > 0) {
          hasDiv = true;

          // div要素をcloneして親要素の一番最初に挿入
          var newDiv = wrapper.cloneNode(true);
          chat_wrapper.insertBefore(newDiv, firstChild);

          // 元の要素を削除
          if (wrapper.parentNode === chat_wrapper) {
            chat_wrapper.removeChild(wrapper);
          }
          break; // 早期リターン
        }
      }

      // 新しい要素が必要な場合
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (!hasDiv && firstChild) {
      createNewDivElement(receiver_id, sender_id, msg, message_type);
    }
  }

  // チャットナビゲーションを更新
  (0,_uiController_js__WEBPACK_IMPORTED_MODULE_2__.chatNavigator)();
};

/***/ }),

/***/ "./resources/js/module/component/elementTemplate.js":
/*!**********************************************************!*\
  !*** ./resources/js/module/component/elementTemplate.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createChatUserContainer: () => (/* binding */ createChatUserContainer),
/* harmony export */   createLeftMessageContainer: () => (/* binding */ createLeftMessageContainer),
/* harmony export */   createRightMessageContainer: () => (/* binding */ createRightMessageContainer)
/* harmony export */ });
var createRightMessageContainer = function createRightMessageContainer(message_type, time, content) {
  return "\n         <div class=\"chat__message-container-right\">\n            <div class=\"chat__mesgae-main-right\">\n                  <div class=\"chat__message-time-txt\">".concat(time, "</div>\n                  ").concat(message_type === "text" ? "<div class=\"chat__message-box-right chat-margin5\">".concat(content.replace(/\n/g, "<br>"), "</div>") : "<img src=\"".concat(content, "\" class=\"chat-margin5\">"), "\n            </div>\n      </div>\n      ");
};
var createLeftMessageContainer = function createLeftMessageContainer(message_type, time, content) {
  var src = document.getElementById("js_user_icon_img").value;
  return "\n         <div class=\"chat__message-container-left\">\n            <div class=\"chat__mesgae-main-left\">\n                  <img src=\"".concat(src, "\" alt=\"\" class=\"chat_users-icon-message\" id=\"icon_msg\"> \n                  ").concat(message_type === "text" ? "<div class=\"chat__message-box-left chat-margin5\">".concat(content.replace(/\n/g, "<br>"), "</div>") : "<img src=\"".concat(content, "\" class=\"chat-margin5\">"), "\n                  <div class=\"chat__message-time-txt\">").concat(time, "</div>\n            </div> \n      </div>\n      ");
};
var createChatUserContainer = function createChatUserContainer(sender_id, res, msg, message_type) {
  var countDivStyle = document.getElementById("js_chatuser_id").value == sender_id || res["totalCount"] == 0 ? "none" : "flex";
  var countinnerHTML = document.getElementById("js_chatuser_id").value == sender_id || res["totalCount"] == 0 ? 0 : res["totalCount"];
  return "\n            <div class=\"chat__users-list-wraper js_chat_wrapper\" style=\"margin-top: 0\" data-uuid=\"".concat(sender_id, "\" data-id=\"").concat(res["userInfo"]["id"], "\" data-admin-id=\"").concat(document.getElementById("js_admin_id").value, "\">\n                  <img src=\"").concat(res["userInfo"]["user_picture"], "\" alt=\"\" class=\"chat_users-icon\"> \n                  <div class=\"chat_users-list-flex\">\n                        <div class=\"chat_users-list-box\"> \n                              <p class=\"chat_name_txt\">").concat(res["userInfo"]["line_name"], "</p>\n                              <small class=\"chat_time js_update_message_time\" data-id=\"").concat(sender_id, "\">").concat(res["formatted_date"], "</small>\n                        </div>  \n                        <div class=\"chat__users-list-msg\">\n                              <small class=\"chat_message js_chatMessage_elment\" data-id=\"").concat(sender_id, "\">").concat(message_type == "text" ? msg : "画像が送信されました", "</small>\n                              <div class=\"message_count js_mesage_count\" data-id=\"").concat(sender_id, "\" style=\"display:").concat(countDivStyle, "\">").concat(countinnerHTML, "</div>\n                        </div>\n                  </div>\n            </div>\n      ");
};

/***/ }),

/***/ "./resources/js/module/component/uiController.js":
/*!*******************************************************!*\
  !*** ./resources/js/module/component/uiController.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chatNavigator: () => (/* binding */ chatNavigator),
/* harmony export */   fileOperation: () => (/* binding */ fileOperation),
/* harmony export */   scrollToBottom: () => (/* binding */ scrollToBottom)
/* harmony export */ });
/* harmony import */ var _util_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/fetch */ "./resources/js/module/util/fetch.js");


// 特定のチャットユーザー画面を開く
var chatNavigator = function chatNavigator() {
  var chat_btns = document.querySelectorAll(".js_chat_wrapper");
  chat_btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var id = e.currentTarget.getAttribute("data-id");
      var admin_id = e.currentTarget.getAttribute("data-admin-id");
      window.location.href = "/".concat(admin_id, "/").concat(id);
    });
  });
};
var scrollToBottom = function scrollToBottom() {
  var scroll_el = document.querySelector(".chat__message-main");
  if (scroll_el) {
    scroll_el.scrollTop = scroll_el.scrollHeight;
  }
};
var fileOperation = function fileOperation(socket, sender_id, url, user_type) {
  var file = fileInput.files[0];
  var reader = new FileReader();
  var maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    alert("ファイルサイズは5MBにしてください。");
    return;
  }
  reader.onload = function (e) {
    var img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // 画像のサイズを制御する。例えば幅を500pxにリサイズ。
      var maxWidth = 160;
      var scaleSize = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleSize;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 圧縮した画像をBase64に変換
      var resizedImage = canvas.toDataURL('image/jpeg', 0.7); // JPEG形式で圧縮率70%

      var receiver_id = document.getElementById("js_receiver_id").value;
      var sender_type = document.getElementById("js_sender_type").value;
      var data = {};
      if (user_type == "user") {
        data = {
          "user_id": sender_id,
          "admin_id": receiver_id,
          "type": sender_type,
          "image": resizedImage
        };
      } else if (user_type == "admin") {
        data = {
          "user_id": receiver_id,
          "admin_id": sender_id,
          "type": sender_type,
          "image": resizedImage
        };
      }
      (0,_util_fetch__WEBPACK_IMPORTED_MODULE_0__.fetchPostOperation)(data, url).then(function (res) {
        console.log(res);
        var time = res["created_at"];
        var message_id = res["message_id"];
        var admin_login_id = res["admin_login_id"];
        // // ここでサーバーに送信
        socket.emit('send_image', {
          resizedImage: resizedImage,
          receiver_id: receiver_id,
          sender_id: sender_id,
          sender_type: sender_type,
          time: time,
          message_id: message_id,
          admin_login_id: admin_login_id
        });
      });
    };
  };
  reader.readAsDataURL(file);
};

/***/ }),

/***/ "./resources/js/module/util/fetch.js":
/*!*******************************************!*\
  !*** ./resources/js/module/util/fetch.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchGetOperation: () => (/* binding */ fetchGetOperation),
/* harmony export */   fetchPostOperation: () => (/* binding */ fetchPostOperation)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var fetchPostOperation = function fetchPostOperation(data, url) {
  return fetch("".concat(url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
      var errorMessage;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(response.status === 204)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            if (response.ok) {
              _context.next = 7;
              break;
            }
            _context.next = 5;
            return response.text();
          case 5:
            errorMessage = _context.sent;
            throw new Error("\u30B5\u30FC\u30D0\u30FC\u30A8\u30E9\u30FC: ".concat(response.status, " - ").concat(errorMessage));
          case 7:
            return _context.abrupt("return", response.json());
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }())["catch"](function (error) {
    console.log(error);
  });
};
var fetchGetOperation = function fetchGetOperation(url) {
  return fetch("".concat(url), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {
      var errorMessage;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(response.status === 204)) {
              _context2.next = 2;
              break;
            }
            return _context2.abrupt("return");
          case 2:
            if (response.ok) {
              _context2.next = 7;
              break;
            }
            _context2.next = 5;
            return response.text();
          case 5:
            errorMessage = _context2.sent;
            throw new Error("\u30B5\u30FC\u30D0\u30FC\u30A8\u30E9\u30FC: ".concat(response.status, " - ").concat(errorMessage));
          case 7:
            return _context2.abrupt("return", response.json());
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }()).then(function (data) {
    return data;
  })["catch"](function (error) {
    console.error("エラーが発生しました:", error.message);
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./resources/js/userChat.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_component_chatController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/component/chatController.js */ "./resources/js/module/component/chatController.js");
/* harmony import */ var _module_component_changeStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/component/changeStyle.js */ "./resources/js/module/component/changeStyle.js");
/* harmony import */ var _module_component_uiController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/component/uiController.js */ "./resources/js/module/component/uiController.js");



document.addEventListener("DOMContentLoaded", function () {
  // グローバル変数
  var sender_id = document.getElementById("js_sender_id").value;

  // サーバーへの接続を初期化
  initSocket('https://line-chat.tokyo:3000', sender_id);
  // ユーザーをソケットサーバーに登録する
  registerUser(sender_id);
  // 30秒ごとにハートビートを送信
  setInterval(sendHeartbeat, 10000);
  var socket = getSocket();
  (0,_module_component_changeStyle_js__WEBPACK_IMPORTED_MODULE_1__.changeTextareaHeight)();
  (0,_module_component_changeStyle_js__WEBPACK_IMPORTED_MODULE_1__.disableSubmitBtn)();
  (0,_module_component_uiController_js__WEBPACK_IMPORTED_MODULE_2__.scrollToBottom)();

  // クライアントからソケットサーバーへメッセージを送信する
  document.getElementById("js_chat_form").addEventListener("submit", function (e) {
    e.preventDefault();
    var _prepareMessageData = prepareMessageData(),
      msg = _prepareMessageData.msg,
      formattedMsg = _prepareMessageData.formattedMsg,
      receiver_id = _prepareMessageData.receiver_id,
      sender_type = _prepareMessageData.sender_type;
    // メッセージをサーバーに送信する
    sendMessage(socket, formattedMsg, sender_id, receiver_id, sender_type, msg, "/api/user/messages");
  });

  // サーバーからのメッセージを受信
  socket.on('chat message', function (msg, sender_type, time) {
    (0,_module_component_chatController_js__WEBPACK_IMPORTED_MODULE_0__.displayChatMessage)("js_append_user", sender_type, msg, "user", "", time, "text");
  });
  socket.on("send_image", function (sender_type, time, resizedImage) {
    (0,_module_component_chatController_js__WEBPACK_IMPORTED_MODULE_0__.displayChatMessage)("js_append_user", sender_type, resizedImage, "user", "", time, "image");
  });

  // 画像の処理
  var user_type = "user";
  var fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", function () {
    (0,_module_component_uiController_js__WEBPACK_IMPORTED_MODULE_2__.fileOperation)(socket, sender_id, "/api/user/messages/image", user_type);
    fileInput.value = "";
  });

  // チャット画面上部をクリックした際のスタイル変更処理
  var items = document.querySelectorAll(".js_header_item");
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      // すべてのアイテムからactiveクラスを削除
      items.forEach(function (otherItem) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".header-icon").classList.remove("active_font");
        otherItem.querySelector(".chat__message_header-item-text").classList.remove("active_font");
      });

      // クリックされたアイテムにクラスを追加
      item.classList.add("active");
      item.querySelector(".header-icon").classList.add("active_font");
      item.querySelector(".chat__message_header-item-text").classList.add("active_font");
    });
  });
});
/******/ })()
;