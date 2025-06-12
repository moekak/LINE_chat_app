/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@socket.io/component-emitter/lib/esm/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/@socket.io/component-emitter/lib/esm/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Emitter: () => (/* binding */ Emitter)
/* harmony export */ });
/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

// alias used for reserved events (protected method)
Emitter.prototype.emitReserved = Emitter.prototype.emit;

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/browser-image-compression/dist/browser-image-compression.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/browser-image-compression/dist/browser-image-compression.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ imageCompression)
/* harmony export */ });
/**
 * Browser Image Compression
 * v2.0.2
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

function _mergeNamespaces(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(r){if("default"!==r&&!(r in e)){var i=Object.getOwnPropertyDescriptor(t,r);Object.defineProperty(e,r,i.get?i:{enumerable:!0,get:function(){return t[r]}})}}))})),Object.freeze(e)}function copyExifWithoutOrientation(e,t){return new Promise((function(r,i){let o;return getApp1Segment(e).then((function(e){try{return o=e,r(new Blob([t.slice(0,2),o,t.slice(2)],{type:"image/jpeg"}))}catch(e){return i(e)}}),i)}))}const getApp1Segment=e=>new Promise(((t,r)=>{const i=new FileReader;i.addEventListener("load",(({target:{result:e}})=>{const i=new DataView(e);let o=0;if(65496!==i.getUint16(o))return r("not a valid JPEG");for(o+=2;;){const a=i.getUint16(o);if(65498===a)break;const s=i.getUint16(o+2);if(65505===a&&1165519206===i.getUint32(o+4)){const a=o+10;let f;switch(i.getUint16(a)){case 18761:f=!0;break;case 19789:f=!1;break;default:return r("TIFF header contains invalid endian")}if(42!==i.getUint16(a+2,f))return r("TIFF header contains invalid version");const l=i.getUint32(a+4,f),c=a+l+2+12*i.getUint16(a+l,f);for(let e=a+l+2;e<c;e+=12){if(274==i.getUint16(e,f)){if(3!==i.getUint16(e+2,f))return r("Orientation data type is invalid");if(1!==i.getUint32(e+4,f))return r("Orientation data count is invalid");i.setUint16(e+8,1,f);break}}return t(e.slice(o,o+2+s))}o+=2+s}return t(new Blob)})),i.readAsArrayBuffer(e)}));var e={},t={get exports(){return e},set exports(t){e=t}};!function(e){var r,i,UZIP={};t.exports=UZIP,UZIP.parse=function(e,t){for(var r=UZIP.bin.readUshort,i=UZIP.bin.readUint,o=0,a={},s=new Uint8Array(e),f=s.length-4;101010256!=i(s,f);)f--;o=f;o+=4;var l=r(s,o+=4);r(s,o+=2);var c=i(s,o+=2),u=i(s,o+=4);o+=4,o=u;for(var h=0;h<l;h++){i(s,o),o+=4,o+=4,o+=4,i(s,o+=4);c=i(s,o+=4);var d=i(s,o+=4),A=r(s,o+=4),g=r(s,o+2),p=r(s,o+4);o+=6;var m=i(s,o+=8);o+=4,o+=A+g+p,UZIP._readLocal(s,m,a,c,d,t)}return a},UZIP._readLocal=function(e,t,r,i,o,a){var s=UZIP.bin.readUshort,f=UZIP.bin.readUint;f(e,t),s(e,t+=4),s(e,t+=2);var l=s(e,t+=2);f(e,t+=2),f(e,t+=4),t+=4;var c=s(e,t+=8),u=s(e,t+=2);t+=2;var h=UZIP.bin.readUTF8(e,t,c);if(t+=c,t+=u,a)r[h]={size:o,csize:i};else{var d=new Uint8Array(e.buffer,t);if(0==l)r[h]=new Uint8Array(d.buffer.slice(t,t+i));else{if(8!=l)throw"unknown compression method: "+l;var A=new Uint8Array(o);UZIP.inflateRaw(d,A),r[h]=A}}},UZIP.inflateRaw=function(e,t){return UZIP.F.inflate(e,t)},UZIP.inflate=function(e,t){return e[0],e[1],UZIP.inflateRaw(new Uint8Array(e.buffer,e.byteOffset+2,e.length-6),t)},UZIP.deflate=function(e,t){null==t&&(t={level:6});var r=0,i=new Uint8Array(50+Math.floor(1.1*e.length));i[r]=120,i[r+1]=156,r+=2,r=UZIP.F.deflateRaw(e,i,r,t.level);var o=UZIP.adler(e,0,e.length);return i[r+0]=o>>>24&255,i[r+1]=o>>>16&255,i[r+2]=o>>>8&255,i[r+3]=o>>>0&255,new Uint8Array(i.buffer,0,r+4)},UZIP.deflateRaw=function(e,t){null==t&&(t={level:6});var r=new Uint8Array(50+Math.floor(1.1*e.length)),i=UZIP.F.deflateRaw(e,r,i,t.level);return new Uint8Array(r.buffer,0,i)},UZIP.encode=function(e,t){null==t&&(t=!1);var r=0,i=UZIP.bin.writeUint,o=UZIP.bin.writeUshort,a={};for(var s in e){var f=!UZIP._noNeed(s)&&!t,l=e[s],c=UZIP.crc.crc(l,0,l.length);a[s]={cpr:f,usize:l.length,crc:c,file:f?UZIP.deflateRaw(l):l}}for(var s in a)r+=a[s].file.length+30+46+2*UZIP.bin.sizeUTF8(s);r+=22;var u=new Uint8Array(r),h=0,d=[];for(var s in a){var A=a[s];d.push(h),h=UZIP._writeHeader(u,h,s,A,0)}var g=0,p=h;for(var s in a){A=a[s];d.push(h),h=UZIP._writeHeader(u,h,s,A,1,d[g++])}var m=h-p;return i(u,h,101010256),h+=4,o(u,h+=4,g),o(u,h+=2,g),i(u,h+=2,m),i(u,h+=4,p),h+=4,h+=2,u.buffer},UZIP._noNeed=function(e){var t=e.split(".").pop().toLowerCase();return-1!="png,jpg,jpeg,zip".indexOf(t)},UZIP._writeHeader=function(e,t,r,i,o,a){var s=UZIP.bin.writeUint,f=UZIP.bin.writeUshort,l=i.file;return s(e,t,0==o?67324752:33639248),t+=4,1==o&&(t+=2),f(e,t,20),f(e,t+=2,0),f(e,t+=2,i.cpr?8:0),s(e,t+=2,0),s(e,t+=4,i.crc),s(e,t+=4,l.length),s(e,t+=4,i.usize),f(e,t+=4,UZIP.bin.sizeUTF8(r)),f(e,t+=2,0),t+=2,1==o&&(t+=2,t+=2,s(e,t+=6,a),t+=4),t+=UZIP.bin.writeUTF8(e,t,r),0==o&&(e.set(l,t),t+=l.length),t},UZIP.crc={table:function(){for(var e=new Uint32Array(256),t=0;t<256;t++){for(var r=t,i=0;i<8;i++)1&r?r=3988292384^r>>>1:r>>>=1;e[t]=r}return e}(),update:function(e,t,r,i){for(var o=0;o<i;o++)e=UZIP.crc.table[255&(e^t[r+o])]^e>>>8;return e},crc:function(e,t,r){return 4294967295^UZIP.crc.update(4294967295,e,t,r)}},UZIP.adler=function(e,t,r){for(var i=1,o=0,a=t,s=t+r;a<s;){for(var f=Math.min(a+5552,s);a<f;)o+=i+=e[a++];i%=65521,o%=65521}return o<<16|i},UZIP.bin={readUshort:function(e,t){return e[t]|e[t+1]<<8},writeUshort:function(e,t,r){e[t]=255&r,e[t+1]=r>>8&255},readUint:function(e,t){return 16777216*e[t+3]+(e[t+2]<<16|e[t+1]<<8|e[t])},writeUint:function(e,t,r){e[t]=255&r,e[t+1]=r>>8&255,e[t+2]=r>>16&255,e[t+3]=r>>24&255},readASCII:function(e,t,r){for(var i="",o=0;o<r;o++)i+=String.fromCharCode(e[t+o]);return i},writeASCII:function(e,t,r){for(var i=0;i<r.length;i++)e[t+i]=r.charCodeAt(i)},pad:function(e){return e.length<2?"0"+e:e},readUTF8:function(e,t,r){for(var i,o="",a=0;a<r;a++)o+="%"+UZIP.bin.pad(e[t+a].toString(16));try{i=decodeURIComponent(o)}catch(i){return UZIP.bin.readASCII(e,t,r)}return i},writeUTF8:function(e,t,r){for(var i=r.length,o=0,a=0;a<i;a++){var s=r.charCodeAt(a);if(0==(4294967168&s))e[t+o]=s,o++;else if(0==(4294965248&s))e[t+o]=192|s>>6,e[t+o+1]=128|s>>0&63,o+=2;else if(0==(4294901760&s))e[t+o]=224|s>>12,e[t+o+1]=128|s>>6&63,e[t+o+2]=128|s>>0&63,o+=3;else{if(0!=(4292870144&s))throw"e";e[t+o]=240|s>>18,e[t+o+1]=128|s>>12&63,e[t+o+2]=128|s>>6&63,e[t+o+3]=128|s>>0&63,o+=4}}return o},sizeUTF8:function(e){for(var t=e.length,r=0,i=0;i<t;i++){var o=e.charCodeAt(i);if(0==(4294967168&o))r++;else if(0==(4294965248&o))r+=2;else if(0==(4294901760&o))r+=3;else{if(0!=(4292870144&o))throw"e";r+=4}}return r}},UZIP.F={},UZIP.F.deflateRaw=function(e,t,r,i){var o=[[0,0,0,0,0],[4,4,8,4,0],[4,5,16,8,0],[4,6,16,16,0],[4,10,16,32,0],[8,16,32,32,0],[8,16,128,128,0],[8,32,128,256,0],[32,128,258,1024,1],[32,258,258,4096,1]][i],a=UZIP.F.U,s=UZIP.F._goodIndex;UZIP.F._hash;var f=UZIP.F._putsE,l=0,c=r<<3,u=0,h=e.length;if(0==i){for(;l<h;){f(t,c,l+(_=Math.min(65535,h-l))==h?1:0),c=UZIP.F._copyExact(e,l,_,t,c+8),l+=_}return c>>>3}var d=a.lits,A=a.strt,g=a.prev,p=0,m=0,w=0,v=0,b=0,y=0;for(h>2&&(A[y=UZIP.F._hash(e,0)]=0),l=0;l<h;l++){if(b=y,l+1<h-2){y=UZIP.F._hash(e,l+1);var E=l+1&32767;g[E]=A[y],A[y]=E}if(u<=l){(p>14e3||m>26697)&&h-l>100&&(u<l&&(d[p]=l-u,p+=2,u=l),c=UZIP.F._writeBlock(l==h-1||u==h?1:0,d,p,v,e,w,l-w,t,c),p=m=v=0,w=l);var F=0;l<h-2&&(F=UZIP.F._bestMatch(e,l,g,b,Math.min(o[2],h-l),o[3]));var _=F>>>16,B=65535&F;if(0!=F){B=65535&F;var U=s(_=F>>>16,a.of0);a.lhst[257+U]++;var C=s(B,a.df0);a.dhst[C]++,v+=a.exb[U]+a.dxb[C],d[p]=_<<23|l-u,d[p+1]=B<<16|U<<8|C,p+=2,u=l+_}else a.lhst[e[l]]++;m++}}for(w==l&&0!=e.length||(u<l&&(d[p]=l-u,p+=2,u=l),c=UZIP.F._writeBlock(1,d,p,v,e,w,l-w,t,c),p=0,m=0,p=m=v=0,w=l);0!=(7&c);)c++;return c>>>3},UZIP.F._bestMatch=function(e,t,r,i,o,a){var s=32767&t,f=r[s],l=s-f+32768&32767;if(f==s||i!=UZIP.F._hash(e,t-l))return 0;for(var c=0,u=0,h=Math.min(32767,t);l<=h&&0!=--a&&f!=s;){if(0==c||e[t+c]==e[t+c-l]){var d=UZIP.F._howLong(e,t,l);if(d>c){if(u=l,(c=d)>=o)break;l+2<d&&(d=l+2);for(var A=0,g=0;g<d-2;g++){var p=t-l+g+32768&32767,m=p-r[p]+32768&32767;m>A&&(A=m,f=p)}}}l+=(s=f)-(f=r[s])+32768&32767}return c<<16|u},UZIP.F._howLong=function(e,t,r){if(e[t]!=e[t-r]||e[t+1]!=e[t+1-r]||e[t+2]!=e[t+2-r])return 0;var i=t,o=Math.min(e.length,t+258);for(t+=3;t<o&&e[t]==e[t-r];)t++;return t-i},UZIP.F._hash=function(e,t){return(e[t]<<8|e[t+1])+(e[t+2]<<4)&65535},UZIP.saved=0,UZIP.F._writeBlock=function(e,t,r,i,o,a,s,f,l){var c,u,h,d,A,g,p,m,w,v=UZIP.F.U,b=UZIP.F._putsF,y=UZIP.F._putsE;v.lhst[256]++,u=(c=UZIP.F.getTrees())[0],h=c[1],d=c[2],A=c[3],g=c[4],p=c[5],m=c[6],w=c[7];var E=32+(0==(l+3&7)?0:8-(l+3&7))+(s<<3),F=i+UZIP.F.contSize(v.fltree,v.lhst)+UZIP.F.contSize(v.fdtree,v.dhst),_=i+UZIP.F.contSize(v.ltree,v.lhst)+UZIP.F.contSize(v.dtree,v.dhst);_+=14+3*p+UZIP.F.contSize(v.itree,v.ihst)+(2*v.ihst[16]+3*v.ihst[17]+7*v.ihst[18]);for(var B=0;B<286;B++)v.lhst[B]=0;for(B=0;B<30;B++)v.dhst[B]=0;for(B=0;B<19;B++)v.ihst[B]=0;var U=E<F&&E<_?0:F<_?1:2;if(b(f,l,e),b(f,l+1,U),l+=3,0==U){for(;0!=(7&l);)l++;l=UZIP.F._copyExact(o,a,s,f,l)}else{var C,I;if(1==U&&(C=v.fltree,I=v.fdtree),2==U){UZIP.F.makeCodes(v.ltree,u),UZIP.F.revCodes(v.ltree,u),UZIP.F.makeCodes(v.dtree,h),UZIP.F.revCodes(v.dtree,h),UZIP.F.makeCodes(v.itree,d),UZIP.F.revCodes(v.itree,d),C=v.ltree,I=v.dtree,y(f,l,A-257),y(f,l+=5,g-1),y(f,l+=5,p-4),l+=4;for(var Q=0;Q<p;Q++)y(f,l+3*Q,v.itree[1+(v.ordr[Q]<<1)]);l+=3*p,l=UZIP.F._codeTiny(m,v.itree,f,l),l=UZIP.F._codeTiny(w,v.itree,f,l)}for(var M=a,x=0;x<r;x+=2){for(var S=t[x],R=S>>>23,T=M+(8388607&S);M<T;)l=UZIP.F._writeLit(o[M++],C,f,l);if(0!=R){var O=t[x+1],P=O>>16,H=O>>8&255,L=255&O;y(f,l=UZIP.F._writeLit(257+H,C,f,l),R-v.of0[H]),l+=v.exb[H],b(f,l=UZIP.F._writeLit(L,I,f,l),P-v.df0[L]),l+=v.dxb[L],M+=R}}l=UZIP.F._writeLit(256,C,f,l)}return l},UZIP.F._copyExact=function(e,t,r,i,o){var a=o>>>3;return i[a]=r,i[a+1]=r>>>8,i[a+2]=255-i[a],i[a+3]=255-i[a+1],a+=4,i.set(new Uint8Array(e.buffer,t,r),a),o+(r+4<<3)},UZIP.F.getTrees=function(){for(var e=UZIP.F.U,t=UZIP.F._hufTree(e.lhst,e.ltree,15),r=UZIP.F._hufTree(e.dhst,e.dtree,15),i=[],o=UZIP.F._lenCodes(e.ltree,i),a=[],s=UZIP.F._lenCodes(e.dtree,a),f=0;f<i.length;f+=2)e.ihst[i[f]]++;for(f=0;f<a.length;f+=2)e.ihst[a[f]]++;for(var l=UZIP.F._hufTree(e.ihst,e.itree,7),c=19;c>4&&0==e.itree[1+(e.ordr[c-1]<<1)];)c--;return[t,r,l,o,s,c,i,a]},UZIP.F.getSecond=function(e){for(var t=[],r=0;r<e.length;r+=2)t.push(e[r+1]);return t},UZIP.F.nonZero=function(e){for(var t="",r=0;r<e.length;r+=2)0!=e[r+1]&&(t+=(r>>1)+",");return t},UZIP.F.contSize=function(e,t){for(var r=0,i=0;i<t.length;i++)r+=t[i]*e[1+(i<<1)];return r},UZIP.F._codeTiny=function(e,t,r,i){for(var o=0;o<e.length;o+=2){var a=e[o],s=e[o+1];i=UZIP.F._writeLit(a,t,r,i);var f=16==a?2:17==a?3:7;a>15&&(UZIP.F._putsE(r,i,s,f),i+=f)}return i},UZIP.F._lenCodes=function(e,t){for(var r=e.length;2!=r&&0==e[r-1];)r-=2;for(var i=0;i<r;i+=2){var o=e[i+1],a=i+3<r?e[i+3]:-1,s=i+5<r?e[i+5]:-1,f=0==i?-1:e[i-1];if(0==o&&a==o&&s==o){for(var l=i+5;l+2<r&&e[l+2]==o;)l+=2;(c=Math.min(l+1-i>>>1,138))<11?t.push(17,c-3):t.push(18,c-11),i+=2*c-2}else if(o==f&&a==o&&s==o){for(l=i+5;l+2<r&&e[l+2]==o;)l+=2;var c=Math.min(l+1-i>>>1,6);t.push(16,c-3),i+=2*c-2}else t.push(o,0)}return r>>>1},UZIP.F._hufTree=function(e,t,r){var i=[],o=e.length,a=t.length,s=0;for(s=0;s<a;s+=2)t[s]=0,t[s+1]=0;for(s=0;s<o;s++)0!=e[s]&&i.push({lit:s,f:e[s]});var f=i.length,l=i.slice(0);if(0==f)return 0;if(1==f){var c=i[0].lit;l=0==c?1:0;return t[1+(c<<1)]=1,t[1+(l<<1)]=1,1}i.sort((function(e,t){return e.f-t.f}));var u=i[0],h=i[1],d=0,A=1,g=2;for(i[0]={lit:-1,f:u.f+h.f,l:u,r:h,d:0};A!=f-1;)u=d!=A&&(g==f||i[d].f<i[g].f)?i[d++]:i[g++],h=d!=A&&(g==f||i[d].f<i[g].f)?i[d++]:i[g++],i[A++]={lit:-1,f:u.f+h.f,l:u,r:h};var p=UZIP.F.setDepth(i[A-1],0);for(p>r&&(UZIP.F.restrictDepth(l,r,p),p=r),s=0;s<f;s++)t[1+(l[s].lit<<1)]=l[s].d;return p},UZIP.F.setDepth=function(e,t){return-1!=e.lit?(e.d=t,t):Math.max(UZIP.F.setDepth(e.l,t+1),UZIP.F.setDepth(e.r,t+1))},UZIP.F.restrictDepth=function(e,t,r){var i=0,o=1<<r-t,a=0;for(e.sort((function(e,t){return t.d==e.d?e.f-t.f:t.d-e.d})),i=0;i<e.length&&e[i].d>t;i++){var s=e[i].d;e[i].d=t,a+=o-(1<<r-s)}for(a>>>=r-t;a>0;){(s=e[i].d)<t?(e[i].d++,a-=1<<t-s-1):i++}for(;i>=0;i--)e[i].d==t&&a<0&&(e[i].d--,a++);0!=a&&console.log("debt left")},UZIP.F._goodIndex=function(e,t){var r=0;return t[16|r]<=e&&(r|=16),t[8|r]<=e&&(r|=8),t[4|r]<=e&&(r|=4),t[2|r]<=e&&(r|=2),t[1|r]<=e&&(r|=1),r},UZIP.F._writeLit=function(e,t,r,i){return UZIP.F._putsF(r,i,t[e<<1]),i+t[1+(e<<1)]},UZIP.F.inflate=function(e,t){var r=Uint8Array;if(3==e[0]&&0==e[1])return t||new r(0);var i=UZIP.F,o=i._bitsF,a=i._bitsE,s=i._decodeTiny,f=i.makeCodes,l=i.codes2map,c=i._get17,u=i.U,h=null==t;h&&(t=new r(e.length>>>2<<3));for(var d,A,g=0,p=0,m=0,w=0,v=0,b=0,y=0,E=0,F=0;0==g;)if(g=o(e,F,1),p=o(e,F+1,2),F+=3,0!=p){if(h&&(t=UZIP.F._check(t,E+(1<<17))),1==p&&(d=u.flmap,A=u.fdmap,b=511,y=31),2==p){m=a(e,F,5)+257,w=a(e,F+5,5)+1,v=a(e,F+10,4)+4,F+=14;for(var _=0;_<38;_+=2)u.itree[_]=0,u.itree[_+1]=0;var B=1;for(_=0;_<v;_++){var U=a(e,F+3*_,3);u.itree[1+(u.ordr[_]<<1)]=U,U>B&&(B=U)}F+=3*v,f(u.itree,B),l(u.itree,B,u.imap),d=u.lmap,A=u.dmap,F=s(u.imap,(1<<B)-1,m+w,e,F,u.ttree);var C=i._copyOut(u.ttree,0,m,u.ltree);b=(1<<C)-1;var I=i._copyOut(u.ttree,m,w,u.dtree);y=(1<<I)-1,f(u.ltree,C),l(u.ltree,C,d),f(u.dtree,I),l(u.dtree,I,A)}for(;;){var Q=d[c(e,F)&b];F+=15&Q;var M=Q>>>4;if(M>>>8==0)t[E++]=M;else{if(256==M)break;var x=E+M-254;if(M>264){var S=u.ldef[M-257];x=E+(S>>>3)+a(e,F,7&S),F+=7&S}var R=A[c(e,F)&y];F+=15&R;var T=R>>>4,O=u.ddef[T],P=(O>>>4)+o(e,F,15&O);for(F+=15&O,h&&(t=UZIP.F._check(t,E+(1<<17)));E<x;)t[E]=t[E++-P],t[E]=t[E++-P],t[E]=t[E++-P],t[E]=t[E++-P];E=x}}}else{0!=(7&F)&&(F+=8-(7&F));var H=4+(F>>>3),L=e[H-4]|e[H-3]<<8;h&&(t=UZIP.F._check(t,E+L)),t.set(new r(e.buffer,e.byteOffset+H,L),E),F=H+L<<3,E+=L}return t.length==E?t:t.slice(0,E)},UZIP.F._check=function(e,t){var r=e.length;if(t<=r)return e;var i=new Uint8Array(Math.max(r<<1,t));return i.set(e,0),i},UZIP.F._decodeTiny=function(e,t,r,i,o,a){for(var s=UZIP.F._bitsE,f=UZIP.F._get17,l=0;l<r;){var c=e[f(i,o)&t];o+=15&c;var u=c>>>4;if(u<=15)a[l]=u,l++;else{var h=0,d=0;16==u?(d=3+s(i,o,2),o+=2,h=a[l-1]):17==u?(d=3+s(i,o,3),o+=3):18==u&&(d=11+s(i,o,7),o+=7);for(var A=l+d;l<A;)a[l]=h,l++}}return o},UZIP.F._copyOut=function(e,t,r,i){for(var o=0,a=0,s=i.length>>>1;a<r;){var f=e[a+t];i[a<<1]=0,i[1+(a<<1)]=f,f>o&&(o=f),a++}for(;a<s;)i[a<<1]=0,i[1+(a<<1)]=0,a++;return o},UZIP.F.makeCodes=function(e,t){for(var r,i,o,a,s=UZIP.F.U,f=e.length,l=s.bl_count,c=0;c<=t;c++)l[c]=0;for(c=1;c<f;c+=2)l[e[c]]++;var u=s.next_code;for(r=0,l[0]=0,i=1;i<=t;i++)r=r+l[i-1]<<1,u[i]=r;for(o=0;o<f;o+=2)0!=(a=e[o+1])&&(e[o]=u[a],u[a]++)},UZIP.F.codes2map=function(e,t,r){for(var i=e.length,o=UZIP.F.U.rev15,a=0;a<i;a+=2)if(0!=e[a+1])for(var s=a>>1,f=e[a+1],l=s<<4|f,c=t-f,u=e[a]<<c,h=u+(1<<c);u!=h;){r[o[u]>>>15-t]=l,u++}},UZIP.F.revCodes=function(e,t){for(var r=UZIP.F.U.rev15,i=15-t,o=0;o<e.length;o+=2){var a=e[o]<<t-e[o+1];e[o]=r[a]>>>i}},UZIP.F._putsE=function(e,t,r){r<<=7&t;var i=t>>>3;e[i]|=r,e[i+1]|=r>>>8},UZIP.F._putsF=function(e,t,r){r<<=7&t;var i=t>>>3;e[i]|=r,e[i+1]|=r>>>8,e[i+2]|=r>>>16},UZIP.F._bitsE=function(e,t,r){return(e[t>>>3]|e[1+(t>>>3)]<<8)>>>(7&t)&(1<<r)-1},UZIP.F._bitsF=function(e,t,r){return(e[t>>>3]|e[1+(t>>>3)]<<8|e[2+(t>>>3)]<<16)>>>(7&t)&(1<<r)-1},UZIP.F._get17=function(e,t){return(e[t>>>3]|e[1+(t>>>3)]<<8|e[2+(t>>>3)]<<16)>>>(7&t)},UZIP.F._get25=function(e,t){return(e[t>>>3]|e[1+(t>>>3)]<<8|e[2+(t>>>3)]<<16|e[3+(t>>>3)]<<24)>>>(7&t)},UZIP.F.U=(r=Uint16Array,i=Uint32Array,{next_code:new r(16),bl_count:new r(16),ordr:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],of0:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],exb:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],ldef:new r(32),df0:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],dxb:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],ddef:new i(32),flmap:new r(512),fltree:[],fdmap:new r(32),fdtree:[],lmap:new r(32768),ltree:[],ttree:[],dmap:new r(32768),dtree:[],imap:new r(512),itree:[],rev15:new r(32768),lhst:new i(286),dhst:new i(30),ihst:new i(19),lits:new i(15e3),strt:new r(65536),prev:new r(32768)}),function(){for(var e=UZIP.F.U,t=0;t<32768;t++){var r=t;r=(4278255360&(r=(4042322160&(r=(3435973836&(r=(2863311530&r)>>>1|(1431655765&r)<<1))>>>2|(858993459&r)<<2))>>>4|(252645135&r)<<4))>>>8|(16711935&r)<<8,e.rev15[t]=(r>>>16|r<<16)>>>17}function pushV(e,t,r){for(;0!=t--;)e.push(0,r)}for(t=0;t<32;t++)e.ldef[t]=e.of0[t]<<3|e.exb[t],e.ddef[t]=e.df0[t]<<4|e.dxb[t];pushV(e.fltree,144,8),pushV(e.fltree,112,9),pushV(e.fltree,24,7),pushV(e.fltree,8,8),UZIP.F.makeCodes(e.fltree,9),UZIP.F.codes2map(e.fltree,9,e.flmap),UZIP.F.revCodes(e.fltree,9),pushV(e.fdtree,32,5),UZIP.F.makeCodes(e.fdtree,5),UZIP.F.codes2map(e.fdtree,5,e.fdmap),UZIP.F.revCodes(e.fdtree,5),pushV(e.itree,19,0),pushV(e.ltree,286,0),pushV(e.dtree,30,0),pushV(e.ttree,320,0)}()}();var UZIP=_mergeNamespaces({__proto__:null,default:e},[e]);const UPNG=function(){var e={nextZero(e,t){for(;0!=e[t];)t++;return t},readUshort:(e,t)=>e[t]<<8|e[t+1],writeUshort(e,t,r){e[t]=r>>8&255,e[t+1]=255&r},readUint:(e,t)=>16777216*e[t]+(e[t+1]<<16|e[t+2]<<8|e[t+3]),writeUint(e,t,r){e[t]=r>>24&255,e[t+1]=r>>16&255,e[t+2]=r>>8&255,e[t+3]=255&r},readASCII(e,t,r){let i="";for(let o=0;o<r;o++)i+=String.fromCharCode(e[t+o]);return i},writeASCII(e,t,r){for(let i=0;i<r.length;i++)e[t+i]=r.charCodeAt(i)},readBytes(e,t,r){const i=[];for(let o=0;o<r;o++)i.push(e[t+o]);return i},pad:e=>e.length<2?`0${e}`:e,readUTF8(t,r,i){let o,a="";for(let o=0;o<i;o++)a+=`%${e.pad(t[r+o].toString(16))}`;try{o=decodeURIComponent(a)}catch(o){return e.readASCII(t,r,i)}return o}};function decodeImage(t,r,i,o){const a=r*i,s=_getBPP(o),f=Math.ceil(r*s/8),l=new Uint8Array(4*a),c=new Uint32Array(l.buffer),{ctype:u}=o,{depth:h}=o,d=e.readUshort;if(6==u){const e=a<<2;if(8==h)for(var A=0;A<e;A+=4)l[A]=t[A],l[A+1]=t[A+1],l[A+2]=t[A+2],l[A+3]=t[A+3];if(16==h)for(A=0;A<e;A++)l[A]=t[A<<1]}else if(2==u){const e=o.tabs.tRNS;if(null==e){if(8==h)for(A=0;A<a;A++){var g=3*A;c[A]=255<<24|t[g+2]<<16|t[g+1]<<8|t[g]}if(16==h)for(A=0;A<a;A++){g=6*A;c[A]=255<<24|t[g+4]<<16|t[g+2]<<8|t[g]}}else{var p=e[0];const r=e[1],i=e[2];if(8==h)for(A=0;A<a;A++){var m=A<<2;g=3*A;c[A]=255<<24|t[g+2]<<16|t[g+1]<<8|t[g],t[g]==p&&t[g+1]==r&&t[g+2]==i&&(l[m+3]=0)}if(16==h)for(A=0;A<a;A++){m=A<<2,g=6*A;c[A]=255<<24|t[g+4]<<16|t[g+2]<<8|t[g],d(t,g)==p&&d(t,g+2)==r&&d(t,g+4)==i&&(l[m+3]=0)}}}else if(3==u){const e=o.tabs.PLTE,s=o.tabs.tRNS,c=s?s.length:0;if(1==h)for(var w=0;w<i;w++){var v=w*f,b=w*r;for(A=0;A<r;A++){m=b+A<<2;var y=3*(E=t[v+(A>>3)]>>7-((7&A)<<0)&1);l[m]=e[y],l[m+1]=e[y+1],l[m+2]=e[y+2],l[m+3]=E<c?s[E]:255}}if(2==h)for(w=0;w<i;w++)for(v=w*f,b=w*r,A=0;A<r;A++){m=b+A<<2,y=3*(E=t[v+(A>>2)]>>6-((3&A)<<1)&3);l[m]=e[y],l[m+1]=e[y+1],l[m+2]=e[y+2],l[m+3]=E<c?s[E]:255}if(4==h)for(w=0;w<i;w++)for(v=w*f,b=w*r,A=0;A<r;A++){m=b+A<<2,y=3*(E=t[v+(A>>1)]>>4-((1&A)<<2)&15);l[m]=e[y],l[m+1]=e[y+1],l[m+2]=e[y+2],l[m+3]=E<c?s[E]:255}if(8==h)for(A=0;A<a;A++){var E;m=A<<2,y=3*(E=t[A]);l[m]=e[y],l[m+1]=e[y+1],l[m+2]=e[y+2],l[m+3]=E<c?s[E]:255}}else if(4==u){if(8==h)for(A=0;A<a;A++){m=A<<2;var F=t[_=A<<1];l[m]=F,l[m+1]=F,l[m+2]=F,l[m+3]=t[_+1]}if(16==h)for(A=0;A<a;A++){var _;m=A<<2,F=t[_=A<<2];l[m]=F,l[m+1]=F,l[m+2]=F,l[m+3]=t[_+2]}}else if(0==u)for(p=o.tabs.tRNS?o.tabs.tRNS:-1,w=0;w<i;w++){const e=w*f,i=w*r;if(1==h)for(var B=0;B<r;B++){var U=(F=255*(t[e+(B>>>3)]>>>7-(7&B)&1))==255*p?0:255;c[i+B]=U<<24|F<<16|F<<8|F}else if(2==h)for(B=0;B<r;B++){U=(F=85*(t[e+(B>>>2)]>>>6-((3&B)<<1)&3))==85*p?0:255;c[i+B]=U<<24|F<<16|F<<8|F}else if(4==h)for(B=0;B<r;B++){U=(F=17*(t[e+(B>>>1)]>>>4-((1&B)<<2)&15))==17*p?0:255;c[i+B]=U<<24|F<<16|F<<8|F}else if(8==h)for(B=0;B<r;B++){U=(F=t[e+B])==p?0:255;c[i+B]=U<<24|F<<16|F<<8|F}else if(16==h)for(B=0;B<r;B++){F=t[e+(B<<1)],U=d(t,e+(B<<1))==p?0:255;c[i+B]=U<<24|F<<16|F<<8|F}}return l}function _decompress(e,r,i,o){const a=_getBPP(e),s=Math.ceil(i*a/8),f=new Uint8Array((s+1+e.interlace)*o);return r=e.tabs.CgBI?t(r,f):_inflate(r,f),0==e.interlace?r=_filterZero(r,e,0,i,o):1==e.interlace&&(r=function _readInterlace(e,t){const r=t.width,i=t.height,o=_getBPP(t),a=o>>3,s=Math.ceil(r*o/8),f=new Uint8Array(i*s);let l=0;const c=[0,0,4,0,2,0,1],u=[0,4,0,2,0,1,0],h=[8,8,8,4,4,2,2],d=[8,8,4,4,2,2,1];let A=0;for(;A<7;){const p=h[A],m=d[A];let w=0,v=0,b=c[A];for(;b<i;)b+=p,v++;let y=u[A];for(;y<r;)y+=m,w++;const E=Math.ceil(w*o/8);_filterZero(e,t,l,w,v);let F=0,_=c[A];for(;_<i;){let t=u[A],i=l+F*E<<3;for(;t<r;){var g;if(1==o)g=(g=e[i>>3])>>7-(7&i)&1,f[_*s+(t>>3)]|=g<<7-((7&t)<<0);if(2==o)g=(g=e[i>>3])>>6-(7&i)&3,f[_*s+(t>>2)]|=g<<6-((3&t)<<1);if(4==o)g=(g=e[i>>3])>>4-(7&i)&15,f[_*s+(t>>1)]|=g<<4-((1&t)<<2);if(o>=8){const r=_*s+t*a;for(let t=0;t<a;t++)f[r+t]=e[(i>>3)+t]}i+=o,t+=m}F++,_+=p}w*v!=0&&(l+=v*(1+E)),A+=1}return f}(r,e)),r}function _inflate(e,r){return t(new Uint8Array(e.buffer,2,e.length-6),r)}var t=function(){const e={H:{}};return e.H.N=function(t,r){const i=Uint8Array;let o,a,s=0,f=0,l=0,c=0,u=0,h=0,d=0,A=0,g=0;if(3==t[0]&&0==t[1])return r||new i(0);const p=e.H,m=p.b,w=p.e,v=p.R,b=p.n,y=p.A,E=p.Z,F=p.m,_=null==r;for(_&&(r=new i(t.length>>>2<<5));0==s;)if(s=m(t,g,1),f=m(t,g+1,2),g+=3,0!=f){if(_&&(r=e.H.W(r,A+(1<<17))),1==f&&(o=F.J,a=F.h,h=511,d=31),2==f){l=w(t,g,5)+257,c=w(t,g+5,5)+1,u=w(t,g+10,4)+4,g+=14;let e=1;for(var B=0;B<38;B+=2)F.Q[B]=0,F.Q[B+1]=0;for(B=0;B<u;B++){const r=w(t,g+3*B,3);F.Q[1+(F.X[B]<<1)]=r,r>e&&(e=r)}g+=3*u,b(F.Q,e),y(F.Q,e,F.u),o=F.w,a=F.d,g=v(F.u,(1<<e)-1,l+c,t,g,F.v);const r=p.V(F.v,0,l,F.C);h=(1<<r)-1;const i=p.V(F.v,l,c,F.D);d=(1<<i)-1,b(F.C,r),y(F.C,r,o),b(F.D,i),y(F.D,i,a)}for(;;){const e=o[E(t,g)&h];g+=15&e;const i=e>>>4;if(i>>>8==0)r[A++]=i;else{if(256==i)break;{let e=A+i-254;if(i>264){const r=F.q[i-257];e=A+(r>>>3)+w(t,g,7&r),g+=7&r}const o=a[E(t,g)&d];g+=15&o;const s=o>>>4,f=F.c[s],l=(f>>>4)+m(t,g,15&f);for(g+=15&f;A<e;)r[A]=r[A++-l],r[A]=r[A++-l],r[A]=r[A++-l],r[A]=r[A++-l];A=e}}}}else{0!=(7&g)&&(g+=8-(7&g));const o=4+(g>>>3),a=t[o-4]|t[o-3]<<8;_&&(r=e.H.W(r,A+a)),r.set(new i(t.buffer,t.byteOffset+o,a),A),g=o+a<<3,A+=a}return r.length==A?r:r.slice(0,A)},e.H.W=function(e,t){const r=e.length;if(t<=r)return e;const i=new Uint8Array(r<<1);return i.set(e,0),i},e.H.R=function(t,r,i,o,a,s){const f=e.H.e,l=e.H.Z;let c=0;for(;c<i;){const e=t[l(o,a)&r];a+=15&e;const i=e>>>4;if(i<=15)s[c]=i,c++;else{let e=0,t=0;16==i?(t=3+f(o,a,2),a+=2,e=s[c-1]):17==i?(t=3+f(o,a,3),a+=3):18==i&&(t=11+f(o,a,7),a+=7);const r=c+t;for(;c<r;)s[c]=e,c++}}return a},e.H.V=function(e,t,r,i){let o=0,a=0;const s=i.length>>>1;for(;a<r;){const r=e[a+t];i[a<<1]=0,i[1+(a<<1)]=r,r>o&&(o=r),a++}for(;a<s;)i[a<<1]=0,i[1+(a<<1)]=0,a++;return o},e.H.n=function(t,r){const i=e.H.m,o=t.length;let a,s,f;let l;const c=i.j;for(var u=0;u<=r;u++)c[u]=0;for(u=1;u<o;u+=2)c[t[u]]++;const h=i.K;for(a=0,c[0]=0,s=1;s<=r;s++)a=a+c[s-1]<<1,h[s]=a;for(f=0;f<o;f+=2)l=t[f+1],0!=l&&(t[f]=h[l],h[l]++)},e.H.A=function(t,r,i){const o=t.length,a=e.H.m.r;for(let e=0;e<o;e+=2)if(0!=t[e+1]){const o=e>>1,s=t[e+1],f=o<<4|s,l=r-s;let c=t[e]<<l;const u=c+(1<<l);for(;c!=u;){i[a[c]>>>15-r]=f,c++}}},e.H.l=function(t,r){const i=e.H.m.r,o=15-r;for(let e=0;e<t.length;e+=2){const a=t[e]<<r-t[e+1];t[e]=i[a]>>>o}},e.H.M=function(e,t,r){r<<=7&t;const i=t>>>3;e[i]|=r,e[i+1]|=r>>>8},e.H.I=function(e,t,r){r<<=7&t;const i=t>>>3;e[i]|=r,e[i+1]|=r>>>8,e[i+2]|=r>>>16},e.H.e=function(e,t,r){return(e[t>>>3]|e[1+(t>>>3)]<<8)>>>(7&t)&(1<<r)-1},e.H.b=function(e,t,r){return(e[t>>>3]|e[1+(t>>>3)]<<8|e[2+(t>>>3)]<<16)>>>(7&t)&(1<<r)-1},e.H.Z=function(e,t){return(e[t>>>3]|e[1+(t>>>3)]<<8|e[2+(t>>>3)]<<16)>>>(7&t)},e.H.i=function(e,t){return(e[t>>>3]|e[1+(t>>>3)]<<8|e[2+(t>>>3)]<<16|e[3+(t>>>3)]<<24)>>>(7&t)},e.H.m=function(){const e=Uint16Array,t=Uint32Array;return{K:new e(16),j:new e(16),X:[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],S:[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,999,999,999],T:[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0],q:new e(32),p:[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,65535,65535],z:[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0],c:new t(32),J:new e(512),_:[],h:new e(32),$:[],w:new e(32768),C:[],v:[],d:new e(32768),D:[],u:new e(512),Q:[],r:new e(32768),s:new t(286),Y:new t(30),a:new t(19),t:new t(15e3),k:new e(65536),g:new e(32768)}}(),function(){const t=e.H.m;for(var r=0;r<32768;r++){let e=r;e=(2863311530&e)>>>1|(1431655765&e)<<1,e=(3435973836&e)>>>2|(858993459&e)<<2,e=(4042322160&e)>>>4|(252645135&e)<<4,e=(4278255360&e)>>>8|(16711935&e)<<8,t.r[r]=(e>>>16|e<<16)>>>17}function n(e,t,r){for(;0!=t--;)e.push(0,r)}for(r=0;r<32;r++)t.q[r]=t.S[r]<<3|t.T[r],t.c[r]=t.p[r]<<4|t.z[r];n(t._,144,8),n(t._,112,9),n(t._,24,7),n(t._,8,8),e.H.n(t._,9),e.H.A(t._,9,t.J),e.H.l(t._,9),n(t.$,32,5),e.H.n(t.$,5),e.H.A(t.$,5,t.h),e.H.l(t.$,5),n(t.Q,19,0),n(t.C,286,0),n(t.D,30,0),n(t.v,320,0)}(),e.H.N}();function _getBPP(e){return[1,null,3,1,2,null,4][e.ctype]*e.depth}function _filterZero(e,t,r,i,o){let a=_getBPP(t);const s=Math.ceil(i*a/8);let f,l;a=Math.ceil(a/8);let c=e[r],u=0;if(c>1&&(e[r]=[0,0,1][c-2]),3==c)for(u=a;u<s;u++)e[u+1]=e[u+1]+(e[u+1-a]>>>1)&255;for(let t=0;t<o;t++)if(f=r+t*s,l=f+t+1,c=e[l-1],u=0,0==c)for(;u<s;u++)e[f+u]=e[l+u];else if(1==c){for(;u<a;u++)e[f+u]=e[l+u];for(;u<s;u++)e[f+u]=e[l+u]+e[f+u-a]}else if(2==c)for(;u<s;u++)e[f+u]=e[l+u]+e[f+u-s];else if(3==c){for(;u<a;u++)e[f+u]=e[l+u]+(e[f+u-s]>>>1);for(;u<s;u++)e[f+u]=e[l+u]+(e[f+u-s]+e[f+u-a]>>>1)}else{for(;u<a;u++)e[f+u]=e[l+u]+_paeth(0,e[f+u-s],0);for(;u<s;u++)e[f+u]=e[l+u]+_paeth(e[f+u-a],e[f+u-s],e[f+u-a-s])}return e}function _paeth(e,t,r){const i=e+t-r,o=i-e,a=i-t,s=i-r;return o*o<=a*a&&o*o<=s*s?e:a*a<=s*s?t:r}function _IHDR(t,r,i){i.width=e.readUint(t,r),r+=4,i.height=e.readUint(t,r),r+=4,i.depth=t[r],r++,i.ctype=t[r],r++,i.compress=t[r],r++,i.filter=t[r],r++,i.interlace=t[r],r++}function _copyTile(e,t,r,i,o,a,s,f,l){const c=Math.min(t,o),u=Math.min(r,a);let h=0,d=0;for(let r=0;r<u;r++)for(let a=0;a<c;a++)if(s>=0&&f>=0?(h=r*t+a<<2,d=(f+r)*o+s+a<<2):(h=(-f+r)*t-s+a<<2,d=r*o+a<<2),0==l)i[d]=e[h],i[d+1]=e[h+1],i[d+2]=e[h+2],i[d+3]=e[h+3];else if(1==l){var A=e[h+3]*(1/255),g=e[h]*A,p=e[h+1]*A,m=e[h+2]*A,w=i[d+3]*(1/255),v=i[d]*w,b=i[d+1]*w,y=i[d+2]*w;const t=1-A,r=A+w*t,o=0==r?0:1/r;i[d+3]=255*r,i[d+0]=(g+v*t)*o,i[d+1]=(p+b*t)*o,i[d+2]=(m+y*t)*o}else if(2==l){A=e[h+3],g=e[h],p=e[h+1],m=e[h+2],w=i[d+3],v=i[d],b=i[d+1],y=i[d+2];A==w&&g==v&&p==b&&m==y?(i[d]=0,i[d+1]=0,i[d+2]=0,i[d+3]=0):(i[d]=g,i[d+1]=p,i[d+2]=m,i[d+3]=A)}else if(3==l){A=e[h+3],g=e[h],p=e[h+1],m=e[h+2],w=i[d+3],v=i[d],b=i[d+1],y=i[d+2];if(A==w&&g==v&&p==b&&m==y)continue;if(A<220&&w>20)return!1}return!0}return{decode:function decode(r){const i=new Uint8Array(r);let o=8;const a=e,s=a.readUshort,f=a.readUint,l={tabs:{},frames:[]},c=new Uint8Array(i.length);let u,h=0,d=0;const A=[137,80,78,71,13,10,26,10];for(var g=0;g<8;g++)if(i[g]!=A[g])throw"The input is not a PNG file!";for(;o<i.length;){const e=a.readUint(i,o);o+=4;const r=a.readASCII(i,o,4);if(o+=4,"IHDR"==r)_IHDR(i,o,l);else if("iCCP"==r){for(var p=o;0!=i[p];)p++;a.readASCII(i,o,p-o),i[p+1];const s=i.slice(p+2,o+e);let f=null;try{f=_inflate(s)}catch(e){f=t(s)}l.tabs[r]=f}else if("CgBI"==r)l.tabs[r]=i.slice(o,o+4);else if("IDAT"==r){for(g=0;g<e;g++)c[h+g]=i[o+g];h+=e}else if("acTL"==r)l.tabs[r]={num_frames:f(i,o),num_plays:f(i,o+4)},u=new Uint8Array(i.length);else if("fcTL"==r){if(0!=d)(E=l.frames[l.frames.length-1]).data=_decompress(l,u.slice(0,d),E.rect.width,E.rect.height),d=0;const e={x:f(i,o+12),y:f(i,o+16),width:f(i,o+4),height:f(i,o+8)};let t=s(i,o+22);t=s(i,o+20)/(0==t?100:t);const r={rect:e,delay:Math.round(1e3*t),dispose:i[o+24],blend:i[o+25]};l.frames.push(r)}else if("fdAT"==r){for(g=0;g<e-4;g++)u[d+g]=i[o+g+4];d+=e-4}else if("pHYs"==r)l.tabs[r]=[a.readUint(i,o),a.readUint(i,o+4),i[o+8]];else if("cHRM"==r){l.tabs[r]=[];for(g=0;g<8;g++)l.tabs[r].push(a.readUint(i,o+4*g))}else if("tEXt"==r||"zTXt"==r){null==l.tabs[r]&&(l.tabs[r]={});var m=a.nextZero(i,o),w=a.readASCII(i,o,m-o),v=o+e-m-1;if("tEXt"==r)y=a.readASCII(i,m+1,v);else{var b=_inflate(i.slice(m+2,m+2+v));y=a.readUTF8(b,0,b.length)}l.tabs[r][w]=y}else if("iTXt"==r){null==l.tabs[r]&&(l.tabs[r]={});m=0,p=o;m=a.nextZero(i,p);w=a.readASCII(i,p,m-p);const t=i[p=m+1];var y;i[p+1],p+=2,m=a.nextZero(i,p),a.readASCII(i,p,m-p),p=m+1,m=a.nextZero(i,p),a.readUTF8(i,p,m-p);v=e-((p=m+1)-o);if(0==t)y=a.readUTF8(i,p,v);else{b=_inflate(i.slice(p,p+v));y=a.readUTF8(b,0,b.length)}l.tabs[r][w]=y}else if("PLTE"==r)l.tabs[r]=a.readBytes(i,o,e);else if("hIST"==r){const e=l.tabs.PLTE.length/3;l.tabs[r]=[];for(g=0;g<e;g++)l.tabs[r].push(s(i,o+2*g))}else if("tRNS"==r)3==l.ctype?l.tabs[r]=a.readBytes(i,o,e):0==l.ctype?l.tabs[r]=s(i,o):2==l.ctype&&(l.tabs[r]=[s(i,o),s(i,o+2),s(i,o+4)]);else if("gAMA"==r)l.tabs[r]=a.readUint(i,o)/1e5;else if("sRGB"==r)l.tabs[r]=i[o];else if("bKGD"==r)0==l.ctype||4==l.ctype?l.tabs[r]=[s(i,o)]:2==l.ctype||6==l.ctype?l.tabs[r]=[s(i,o),s(i,o+2),s(i,o+4)]:3==l.ctype&&(l.tabs[r]=i[o]);else if("IEND"==r)break;o+=e,a.readUint(i,o),o+=4}var E;return 0!=d&&((E=l.frames[l.frames.length-1]).data=_decompress(l,u.slice(0,d),E.rect.width,E.rect.height)),l.data=_decompress(l,c,l.width,l.height),delete l.compress,delete l.interlace,delete l.filter,l},toRGBA8:function toRGBA8(e){const t=e.width,r=e.height;if(null==e.tabs.acTL)return[decodeImage(e.data,t,r,e).buffer];const i=[];null==e.frames[0].data&&(e.frames[0].data=e.data);const o=t*r*4,a=new Uint8Array(o),s=new Uint8Array(o),f=new Uint8Array(o);for(let c=0;c<e.frames.length;c++){const u=e.frames[c],h=u.rect.x,d=u.rect.y,A=u.rect.width,g=u.rect.height,p=decodeImage(u.data,A,g,e);if(0!=c)for(var l=0;l<o;l++)f[l]=a[l];if(0==u.blend?_copyTile(p,A,g,a,t,r,h,d,0):1==u.blend&&_copyTile(p,A,g,a,t,r,h,d,1),i.push(a.buffer.slice(0)),0==u.dispose);else if(1==u.dispose)_copyTile(s,A,g,a,t,r,h,d,0);else if(2==u.dispose)for(l=0;l<o;l++)a[l]=f[l]}return i},_paeth:_paeth,_copyTile:_copyTile,_bin:e}}();!function(){const{_copyTile:e}=UPNG,{_bin:t}=UPNG,r=UPNG._paeth;var i={table:function(){const e=new Uint32Array(256);for(let t=0;t<256;t++){let r=t;for(let e=0;e<8;e++)1&r?r=3988292384^r>>>1:r>>>=1;e[t]=r}return e}(),update(e,t,r,o){for(let a=0;a<o;a++)e=i.table[255&(e^t[r+a])]^e>>>8;return e},crc:(e,t,r)=>4294967295^i.update(4294967295,e,t,r)};function addErr(e,t,r,i){t[r]+=e[0]*i>>4,t[r+1]+=e[1]*i>>4,t[r+2]+=e[2]*i>>4,t[r+3]+=e[3]*i>>4}function N(e){return Math.max(0,Math.min(255,e))}function D(e,t){const r=e[0]-t[0],i=e[1]-t[1],o=e[2]-t[2],a=e[3]-t[3];return r*r+i*i+o*o+a*a}function dither(e,t,r,i,o,a,s){null==s&&(s=1);const f=i.length,l=[];for(var c=0;c<f;c++){const e=i[c];l.push([e>>>0&255,e>>>8&255,e>>>16&255,e>>>24&255])}for(c=0;c<f;c++){let e=4294967295;for(var u=0,h=0;h<f;h++){var d=D(l[c],l[h]);h!=c&&d<e&&(e=d,u=h)}}const A=new Uint32Array(o.buffer),g=new Int16Array(t*r*4),p=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];for(c=0;c<p.length;c++)p[c]=255*((p[c]+.5)/16-.5);for(let o=0;o<r;o++)for(let w=0;w<t;w++){var m;c=4*(o*t+w);if(2!=s)m=[N(e[c]+g[c]),N(e[c+1]+g[c+1]),N(e[c+2]+g[c+2]),N(e[c+3]+g[c+3])];else{d=p[4*(3&o)+(3&w)];m=[N(e[c]+d),N(e[c+1]+d),N(e[c+2]+d),N(e[c+3]+d)]}u=0;let v=16777215;for(h=0;h<f;h++){const e=D(m,l[h]);e<v&&(v=e,u=h)}const b=l[u],y=[m[0]-b[0],m[1]-b[1],m[2]-b[2],m[3]-b[3]];1==s&&(w!=t-1&&addErr(y,g,c+4,7),o!=r-1&&(0!=w&&addErr(y,g,c+4*t-4,3),addErr(y,g,c+4*t,5),w!=t-1&&addErr(y,g,c+4*t+4,1))),a[c>>2]=u,A[c>>2]=i[u]}}function _main(e,r,o,a,s){null==s&&(s={});const{crc:f}=i,l=t.writeUint,c=t.writeUshort,u=t.writeASCII;let h=8;const d=e.frames.length>1;let A,g=!1,p=33+(d?20:0);if(null!=s.sRGB&&(p+=13),null!=s.pHYs&&(p+=21),null!=s.iCCP&&(A=pako.deflate(s.iCCP),p+=21+A.length+4),3==e.ctype){for(var m=e.plte.length,w=0;w<m;w++)e.plte[w]>>>24!=255&&(g=!0);p+=8+3*m+4+(g?8+1*m+4:0)}for(var v=0;v<e.frames.length;v++){d&&(p+=38),p+=(F=e.frames[v]).cimg.length+12,0!=v&&(p+=4)}p+=12;const b=new Uint8Array(p),y=[137,80,78,71,13,10,26,10];for(w=0;w<8;w++)b[w]=y[w];if(l(b,h,13),h+=4,u(b,h,"IHDR"),h+=4,l(b,h,r),h+=4,l(b,h,o),h+=4,b[h]=e.depth,h++,b[h]=e.ctype,h++,b[h]=0,h++,b[h]=0,h++,b[h]=0,h++,l(b,h,f(b,h-17,17)),h+=4,null!=s.sRGB&&(l(b,h,1),h+=4,u(b,h,"sRGB"),h+=4,b[h]=s.sRGB,h++,l(b,h,f(b,h-5,5)),h+=4),null!=s.iCCP){const e=13+A.length;l(b,h,e),h+=4,u(b,h,"iCCP"),h+=4,u(b,h,"ICC profile"),h+=11,h+=2,b.set(A,h),h+=A.length,l(b,h,f(b,h-(e+4),e+4)),h+=4}if(null!=s.pHYs&&(l(b,h,9),h+=4,u(b,h,"pHYs"),h+=4,l(b,h,s.pHYs[0]),h+=4,l(b,h,s.pHYs[1]),h+=4,b[h]=s.pHYs[2],h++,l(b,h,f(b,h-13,13)),h+=4),d&&(l(b,h,8),h+=4,u(b,h,"acTL"),h+=4,l(b,h,e.frames.length),h+=4,l(b,h,null!=s.loop?s.loop:0),h+=4,l(b,h,f(b,h-12,12)),h+=4),3==e.ctype){l(b,h,3*(m=e.plte.length)),h+=4,u(b,h,"PLTE"),h+=4;for(w=0;w<m;w++){const t=3*w,r=e.plte[w],i=255&r,o=r>>>8&255,a=r>>>16&255;b[h+t+0]=i,b[h+t+1]=o,b[h+t+2]=a}if(h+=3*m,l(b,h,f(b,h-3*m-4,3*m+4)),h+=4,g){l(b,h,m),h+=4,u(b,h,"tRNS"),h+=4;for(w=0;w<m;w++)b[h+w]=e.plte[w]>>>24&255;h+=m,l(b,h,f(b,h-m-4,m+4)),h+=4}}let E=0;for(v=0;v<e.frames.length;v++){var F=e.frames[v];d&&(l(b,h,26),h+=4,u(b,h,"fcTL"),h+=4,l(b,h,E++),h+=4,l(b,h,F.rect.width),h+=4,l(b,h,F.rect.height),h+=4,l(b,h,F.rect.x),h+=4,l(b,h,F.rect.y),h+=4,c(b,h,a[v]),h+=2,c(b,h,1e3),h+=2,b[h]=F.dispose,h++,b[h]=F.blend,h++,l(b,h,f(b,h-30,30)),h+=4);const t=F.cimg;l(b,h,(m=t.length)+(0==v?0:4)),h+=4;const r=h;u(b,h,0==v?"IDAT":"fdAT"),h+=4,0!=v&&(l(b,h,E++),h+=4),b.set(t,h),h+=m,l(b,h,f(b,r,h-r)),h+=4}return l(b,h,0),h+=4,u(b,h,"IEND"),h+=4,l(b,h,f(b,h-4,4)),h+=4,b.buffer}function compressPNG(e,t,r){for(let i=0;i<e.frames.length;i++){const o=e.frames[i];o.rect.width;const a=o.rect.height,s=new Uint8Array(a*o.bpl+a);o.cimg=_filterZero(o.img,a,o.bpp,o.bpl,s,t,r)}}function compress(t,r,i,o,a){const s=a[0],f=a[1],l=a[2],c=a[3],u=a[4],h=a[5];let d=6,A=8,g=255;for(var p=0;p<t.length;p++){const e=new Uint8Array(t[p]);for(var m=e.length,w=0;w<m;w+=4)g&=e[w+3]}const v=255!=g,b=function framize(t,r,i,o,a,s){const f=[];for(var l=0;l<t.length;l++){const h=new Uint8Array(t[l]),A=new Uint32Array(h.buffer);var c;let g=0,p=0,m=r,w=i,v=o?1:0;if(0!=l){const b=s||o||1==l||0!=f[l-2].dispose?1:2;let y=0,E=1e9;for(let e=0;e<b;e++){var u=new Uint8Array(t[l-1-e]);const o=new Uint32Array(t[l-1-e]);let s=r,f=i,c=-1,h=-1;for(let e=0;e<i;e++)for(let t=0;t<r;t++){A[d=e*r+t]!=o[d]&&(t<s&&(s=t),t>c&&(c=t),e<f&&(f=e),e>h&&(h=e))}-1==c&&(s=f=c=h=0),a&&(1==(1&s)&&s--,1==(1&f)&&f--);const v=(c-s+1)*(h-f+1);v<E&&(E=v,y=e,g=s,p=f,m=c-s+1,w=h-f+1)}u=new Uint8Array(t[l-1-y]);1==y&&(f[l-1].dispose=2),c=new Uint8Array(m*w*4),e(u,r,i,c,m,w,-g,-p,0),v=e(h,r,i,c,m,w,-g,-p,3)?1:0,1==v?_prepareDiff(h,r,i,c,{x:g,y:p,width:m,height:w}):e(h,r,i,c,m,w,-g,-p,0)}else c=h.slice(0);f.push({rect:{x:g,y:p,width:m,height:w},img:c,blend:v,dispose:0})}if(o)for(l=0;l<f.length;l++){if(1==(A=f[l]).blend)continue;const e=A.rect,o=f[l-1].rect,s=Math.min(e.x,o.x),c=Math.min(e.y,o.y),u={x:s,y:c,width:Math.max(e.x+e.width,o.x+o.width)-s,height:Math.max(e.y+e.height,o.y+o.height)-c};f[l-1].dispose=1,l-1!=0&&_updateFrame(t,r,i,f,l-1,u,a),_updateFrame(t,r,i,f,l,u,a)}let h=0;if(1!=t.length)for(var d=0;d<f.length;d++){var A;h+=(A=f[d]).rect.width*A.rect.height}return f}(t,r,i,s,f,l),y={},E=[],F=[];if(0!=o){const e=[];for(w=0;w<b.length;w++)e.push(b[w].img.buffer);const t=function concatRGBA(e){let t=0;for(var r=0;r<e.length;r++)t+=e[r].byteLength;const i=new Uint8Array(t);let o=0;for(r=0;r<e.length;r++){const t=new Uint8Array(e[r]),a=t.length;for(let e=0;e<a;e+=4){let r=t[e],a=t[e+1],s=t[e+2];const f=t[e+3];0==f&&(r=a=s=0),i[o+e]=r,i[o+e+1]=a,i[o+e+2]=s,i[o+e+3]=f}o+=a}return i.buffer}(e),r=quantize(t,o);for(w=0;w<r.plte.length;w++)E.push(r.plte[w].est.rgba);let i=0;for(w=0;w<b.length;w++){const e=(B=b[w]).img.length;var _=new Uint8Array(r.inds.buffer,i>>2,e>>2);F.push(_);const t=new Uint8Array(r.abuf,i,e);h&&dither(B.img,B.rect.width,B.rect.height,E,t,_),B.img.set(t),i+=e}}else for(p=0;p<b.length;p++){var B=b[p];const e=new Uint32Array(B.img.buffer);var U=B.rect.width;m=e.length,_=new Uint8Array(m);F.push(_);for(w=0;w<m;w++){const t=e[w];if(0!=w&&t==e[w-1])_[w]=_[w-1];else if(w>U&&t==e[w-U])_[w]=_[w-U];else{let e=y[t];if(null==e&&(y[t]=e=E.length,E.push(t),E.length>=300))break;_[w]=e}}}const C=E.length;C<=256&&0==u&&(A=C<=2?1:C<=4?2:C<=16?4:8,A=Math.max(A,c));for(p=0;p<b.length;p++){(B=b[p]).rect.x,B.rect.y;U=B.rect.width;const e=B.rect.height;let t=B.img;new Uint32Array(t.buffer);let r=4*U,i=4;if(C<=256&&0==u){r=Math.ceil(A*U/8);var I=new Uint8Array(r*e);const o=F[p];for(let t=0;t<e;t++){w=t*r;const e=t*U;if(8==A)for(var Q=0;Q<U;Q++)I[w+Q]=o[e+Q];else if(4==A)for(Q=0;Q<U;Q++)I[w+(Q>>1)]|=o[e+Q]<<4-4*(1&Q);else if(2==A)for(Q=0;Q<U;Q++)I[w+(Q>>2)]|=o[e+Q]<<6-2*(3&Q);else if(1==A)for(Q=0;Q<U;Q++)I[w+(Q>>3)]|=o[e+Q]<<7-1*(7&Q)}t=I,d=3,i=1}else if(0==v&&1==b.length){I=new Uint8Array(U*e*3);const o=U*e;for(w=0;w<o;w++){const e=3*w,r=4*w;I[e]=t[r],I[e+1]=t[r+1],I[e+2]=t[r+2]}t=I,d=2,i=3,r=3*U}B.img=t,B.bpl=r,B.bpp=i}return{ctype:d,depth:A,plte:E,frames:b}}function _updateFrame(t,r,i,o,a,s,f){const l=Uint8Array,c=Uint32Array,u=new l(t[a-1]),h=new c(t[a-1]),d=a+1<t.length?new l(t[a+1]):null,A=new l(t[a]),g=new c(A.buffer);let p=r,m=i,w=-1,v=-1;for(let e=0;e<s.height;e++)for(let t=0;t<s.width;t++){const i=s.x+t,f=s.y+e,l=f*r+i,c=g[l];0==c||0==o[a-1].dispose&&h[l]==c&&(null==d||0!=d[4*l+3])||(i<p&&(p=i),i>w&&(w=i),f<m&&(m=f),f>v&&(v=f))}-1==w&&(p=m=w=v=0),f&&(1==(1&p)&&p--,1==(1&m)&&m--),s={x:p,y:m,width:w-p+1,height:v-m+1};const b=o[a];b.rect=s,b.blend=1,b.img=new Uint8Array(s.width*s.height*4),0==o[a-1].dispose?(e(u,r,i,b.img,s.width,s.height,-s.x,-s.y,0),_prepareDiff(A,r,i,b.img,s)):e(A,r,i,b.img,s.width,s.height,-s.x,-s.y,0)}function _prepareDiff(t,r,i,o,a){e(t,r,i,o,a.width,a.height,-a.x,-a.y,2)}function _filterZero(e,t,r,i,o,a,s){const f=[];let l,c=[0,1,2,3,4];-1!=a?c=[a]:(t*i>5e5||1==r)&&(c=[0]),s&&(l={level:0});const u=UZIP;for(var h=0;h<c.length;h++){for(let a=0;a<t;a++)_filterLine(o,e,a,i,r,c[h]);f.push(u.deflate(o,l))}let d,A=1e9;for(h=0;h<f.length;h++)f[h].length<A&&(d=h,A=f[h].length);return f[d]}function _filterLine(e,t,i,o,a,s){const f=i*o;let l=f+i;if(e[l]=s,l++,0==s)if(o<500)for(var c=0;c<o;c++)e[l+c]=t[f+c];else e.set(new Uint8Array(t.buffer,f,o),l);else if(1==s){for(c=0;c<a;c++)e[l+c]=t[f+c];for(c=a;c<o;c++)e[l+c]=t[f+c]-t[f+c-a]+256&255}else if(0==i){for(c=0;c<a;c++)e[l+c]=t[f+c];if(2==s)for(c=a;c<o;c++)e[l+c]=t[f+c];if(3==s)for(c=a;c<o;c++)e[l+c]=t[f+c]-(t[f+c-a]>>1)+256&255;if(4==s)for(c=a;c<o;c++)e[l+c]=t[f+c]-r(t[f+c-a],0,0)+256&255}else{if(2==s)for(c=0;c<o;c++)e[l+c]=t[f+c]+256-t[f+c-o]&255;if(3==s){for(c=0;c<a;c++)e[l+c]=t[f+c]+256-(t[f+c-o]>>1)&255;for(c=a;c<o;c++)e[l+c]=t[f+c]+256-(t[f+c-o]+t[f+c-a]>>1)&255}if(4==s){for(c=0;c<a;c++)e[l+c]=t[f+c]+256-r(0,t[f+c-o],0)&255;for(c=a;c<o;c++)e[l+c]=t[f+c]+256-r(t[f+c-a],t[f+c-o],t[f+c-a-o])&255}}}function quantize(e,t){const r=new Uint8Array(e),i=r.slice(0),o=new Uint32Array(i.buffer),a=getKDtree(i,t),s=a[0],f=a[1],l=r.length,c=new Uint8Array(l>>2);let u;if(r.length<2e7)for(var h=0;h<l;h+=4){u=getNearest(s,d=r[h]*(1/255),A=r[h+1]*(1/255),g=r[h+2]*(1/255),p=r[h+3]*(1/255)),c[h>>2]=u.ind,o[h>>2]=u.est.rgba}else for(h=0;h<l;h+=4){var d=r[h]*(1/255),A=r[h+1]*(1/255),g=r[h+2]*(1/255),p=r[h+3]*(1/255);for(u=s;u.left;)u=planeDst(u.est,d,A,g,p)<=0?u.left:u.right;c[h>>2]=u.ind,o[h>>2]=u.est.rgba}return{abuf:i.buffer,inds:c,plte:f}}function getKDtree(e,t,r){null==r&&(r=1e-4);const i=new Uint32Array(e.buffer),o={i0:0,i1:e.length,bst:null,est:null,tdst:0,left:null,right:null};o.bst=stats(e,o.i0,o.i1),o.est=estats(o.bst);const a=[o];for(;a.length<t;){let t=0,o=0;for(var s=0;s<a.length;s++)a[s].est.L>t&&(t=a[s].est.L,o=s);if(t<r)break;const f=a[o],l=splitPixels(e,i,f.i0,f.i1,f.est.e,f.est.eMq255);if(f.i0>=l||f.i1<=l){f.est.L=0;continue}const c={i0:f.i0,i1:l,bst:null,est:null,tdst:0,left:null,right:null};c.bst=stats(e,c.i0,c.i1),c.est=estats(c.bst);const u={i0:l,i1:f.i1,bst:null,est:null,tdst:0,left:null,right:null};u.bst={R:[],m:[],N:f.bst.N-c.bst.N};for(s=0;s<16;s++)u.bst.R[s]=f.bst.R[s]-c.bst.R[s];for(s=0;s<4;s++)u.bst.m[s]=f.bst.m[s]-c.bst.m[s];u.est=estats(u.bst),f.left=c,f.right=u,a[o]=c,a.push(u)}a.sort(((e,t)=>t.bst.N-e.bst.N));for(s=0;s<a.length;s++)a[s].ind=s;return[o,a]}function getNearest(e,t,r,i,o){if(null==e.left)return e.tdst=function dist(e,t,r,i,o){const a=t-e[0],s=r-e[1],f=i-e[2],l=o-e[3];return a*a+s*s+f*f+l*l}(e.est.q,t,r,i,o),e;const a=planeDst(e.est,t,r,i,o);let s=e.left,f=e.right;a>0&&(s=e.right,f=e.left);const l=getNearest(s,t,r,i,o);if(l.tdst<=a*a)return l;const c=getNearest(f,t,r,i,o);return c.tdst<l.tdst?c:l}function planeDst(e,t,r,i,o){const{e:a}=e;return a[0]*t+a[1]*r+a[2]*i+a[3]*o-e.eMq}function splitPixels(e,t,r,i,o,a){for(i-=4;r<i;){for(;vecDot(e,r,o)<=a;)r+=4;for(;vecDot(e,i,o)>a;)i-=4;if(r>=i)break;const s=t[r>>2];t[r>>2]=t[i>>2],t[i>>2]=s,r+=4,i-=4}for(;vecDot(e,r,o)>a;)r-=4;return r+4}function vecDot(e,t,r){return e[t]*r[0]+e[t+1]*r[1]+e[t+2]*r[2]+e[t+3]*r[3]}function stats(e,t,r){const i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],o=[0,0,0,0],a=r-t>>2;for(let a=t;a<r;a+=4){const t=e[a]*(1/255),r=e[a+1]*(1/255),s=e[a+2]*(1/255),f=e[a+3]*(1/255);o[0]+=t,o[1]+=r,o[2]+=s,o[3]+=f,i[0]+=t*t,i[1]+=t*r,i[2]+=t*s,i[3]+=t*f,i[5]+=r*r,i[6]+=r*s,i[7]+=r*f,i[10]+=s*s,i[11]+=s*f,i[15]+=f*f}return i[4]=i[1],i[8]=i[2],i[9]=i[6],i[12]=i[3],i[13]=i[7],i[14]=i[11],{R:i,m:o,N:a}}function estats(e){const{R:t}=e,{m:r}=e,{N:i}=e,a=r[0],s=r[1],f=r[2],l=r[3],c=0==i?0:1/i,u=[t[0]-a*a*c,t[1]-a*s*c,t[2]-a*f*c,t[3]-a*l*c,t[4]-s*a*c,t[5]-s*s*c,t[6]-s*f*c,t[7]-s*l*c,t[8]-f*a*c,t[9]-f*s*c,t[10]-f*f*c,t[11]-f*l*c,t[12]-l*a*c,t[13]-l*s*c,t[14]-l*f*c,t[15]-l*l*c],h=u,d=o;let A=[Math.random(),Math.random(),Math.random(),Math.random()],g=0,p=0;if(0!=i)for(let e=0;e<16&&(A=d.multVec(h,A),p=Math.sqrt(d.dot(A,A)),A=d.sml(1/p,A),!(0!=e&&Math.abs(p-g)<1e-9));e++)g=p;const m=[a*c,s*c,f*c,l*c];return{Cov:u,q:m,e:A,L:g,eMq255:d.dot(d.sml(255,m),A),eMq:d.dot(A,m),rgba:(Math.round(255*m[3])<<24|Math.round(255*m[2])<<16|Math.round(255*m[1])<<8|Math.round(255*m[0])<<0)>>>0}}var o={multVec:(e,t)=>[e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3],e[4]*t[0]+e[5]*t[1]+e[6]*t[2]+e[7]*t[3],e[8]*t[0]+e[9]*t[1]+e[10]*t[2]+e[11]*t[3],e[12]*t[0]+e[13]*t[1]+e[14]*t[2]+e[15]*t[3]],dot:(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3],sml:(e,t)=>[e*t[0],e*t[1],e*t[2],e*t[3]]};UPNG.encode=function encode(e,t,r,i,o,a,s){null==i&&(i=0),null==s&&(s=!1);const f=compress(e,t,r,i,[!1,!1,!1,0,s,!1]);return compressPNG(f,-1),_main(f,t,r,o,a)},UPNG.encodeLL=function encodeLL(e,t,r,i,o,a,s,f){const l={ctype:0+(1==i?0:2)+(0==o?0:4),depth:a,frames:[]},c=(i+o)*a,u=c*t;for(let i=0;i<e.length;i++)l.frames.push({rect:{x:0,y:0,width:t,height:r},img:new Uint8Array(e[i]),blend:0,dispose:1,bpp:Math.ceil(c/8),bpl:Math.ceil(u/8)});return compressPNG(l,0,!0),_main(l,t,r,s,f)},UPNG.encode.compress=compress,UPNG.encode.dither=dither,UPNG.quantize=quantize,UPNG.quantize.getKDtree=getKDtree,UPNG.quantize.getNearest=getNearest}();const r={toArrayBuffer(e,t){const i=e.width,o=e.height,a=i<<2,s=e.getContext("2d").getImageData(0,0,i,o),f=new Uint32Array(s.data.buffer),l=(32*i+31)/32<<2,c=l*o,u=122+c,h=new ArrayBuffer(u),d=new DataView(h),A=1<<20;let g,p,m,w,v=A,b=0,y=0,E=0;function set16(e){d.setUint16(y,e,!0),y+=2}function set32(e){d.setUint32(y,e,!0),y+=4}function seek(e){y+=e}set16(19778),set32(u),seek(4),set32(122),set32(108),set32(i),set32(-o>>>0),set16(1),set16(32),set32(3),set32(c),set32(2835),set32(2835),seek(8),set32(16711680),set32(65280),set32(255),set32(4278190080),set32(1466527264),function convert(){for(;b<o&&v>0;){for(w=122+b*l,g=0;g<a;)v--,p=f[E++],m=p>>>24,d.setUint32(w+g,p<<8|m),g+=4;b++}E<f.length?(v=A,setTimeout(convert,r._dly)):t(h)}()},toBlob(e,t){this.toArrayBuffer(e,(e=>{t(new Blob([e],{type:"image/bmp"}))}))},_dly:9};var i={CHROME:"CHROME",FIREFOX:"FIREFOX",DESKTOP_SAFARI:"DESKTOP_SAFARI",IE:"IE",IOS:"IOS",ETC:"ETC"},o={[i.CHROME]:16384,[i.FIREFOX]:11180,[i.DESKTOP_SAFARI]:16384,[i.IE]:8192,[i.IOS]:4096,[i.ETC]:8192};const a="undefined"!=typeof window,s="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,f=a&&window.cordova&&window.cordova.require&&window.cordova.require("cordova/modulemapper"),CustomFile=(a||s)&&(f&&f.getOriginalSymbol(window,"File")||"undefined"!=typeof File&&File),CustomFileReader=(a||s)&&(f&&f.getOriginalSymbol(window,"FileReader")||"undefined"!=typeof FileReader&&FileReader);function getFilefromDataUrl(e,t,r=Date.now()){return new Promise((i=>{const o=e.split(","),a=o[0].match(/:(.*?);/)[1],s=globalThis.atob(o[1]);let f=s.length;const l=new Uint8Array(f);for(;f--;)l[f]=s.charCodeAt(f);const c=new Blob([l],{type:a});c.name=t,c.lastModified=r,i(c)}))}function getDataUrlFromFile(e){return new Promise(((t,r)=>{const i=new CustomFileReader;i.onload=()=>t(i.result),i.onerror=e=>r(e),i.readAsDataURL(e)}))}function loadImage(e){return new Promise(((t,r)=>{const i=new Image;i.onload=()=>t(i),i.onerror=e=>r(e),i.src=e}))}function getBrowserName(){if(void 0!==getBrowserName.cachedResult)return getBrowserName.cachedResult;let e=i.ETC;const{userAgent:t}=navigator;return/Chrom(e|ium)/i.test(t)?e=i.CHROME:/iP(ad|od|hone)/i.test(t)&&/WebKit/i.test(t)?e=i.IOS:/Safari/i.test(t)?e=i.DESKTOP_SAFARI:/Firefox/i.test(t)?e=i.FIREFOX:(/MSIE/i.test(t)||!0==!!document.documentMode)&&(e=i.IE),getBrowserName.cachedResult=e,getBrowserName.cachedResult}function approximateBelowMaximumCanvasSizeOfBrowser(e,t){const r=getBrowserName(),i=o[r];let a=e,s=t,f=a*s;const l=a>s?s/a:a/s;for(;f>i*i;){const e=(i+a)/2,t=(i+s)/2;e<t?(s=t,a=t*l):(s=e*l,a=e),f=a*s}return{width:a,height:s}}function getNewCanvasAndCtx(e,t){let r,i;try{if(r=new OffscreenCanvas(e,t),i=r.getContext("2d"),null===i)throw new Error("getContext of OffscreenCanvas returns null")}catch(e){r=document.createElement("canvas"),i=r.getContext("2d")}return r.width=e,r.height=t,[r,i]}function drawImageInCanvas(e,t){const{width:r,height:i}=approximateBelowMaximumCanvasSizeOfBrowser(e.width,e.height),[o,a]=getNewCanvasAndCtx(r,i);return t&&/jpe?g/.test(t)&&(a.fillStyle="white",a.fillRect(0,0,o.width,o.height)),a.drawImage(e,0,0,o.width,o.height),o}function isIOS(){return void 0!==isIOS.cachedResult||(isIOS.cachedResult=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"undefined"!=typeof document&&"ontouchend"in document),isIOS.cachedResult}function drawFileInCanvas(e,t={}){return new Promise((function(r,o){let a,s;var $Try_2_Post=function(){try{return s=drawImageInCanvas(a,t.fileType||e.type),r([a,s])}catch(e){return o(e)}},$Try_2_Catch=function(t){try{0;var $Try_3_Catch=function(e){try{throw e}catch(e){return o(e)}};try{let t;return getDataUrlFromFile(e).then((function(e){try{return t=e,loadImage(t).then((function(e){try{return a=e,function(){try{return $Try_2_Post()}catch(e){return o(e)}}()}catch(e){return $Try_3_Catch(e)}}),$Try_3_Catch)}catch(e){return $Try_3_Catch(e)}}),$Try_3_Catch)}catch(e){$Try_3_Catch(e)}}catch(e){return o(e)}};try{if(isIOS()||[i.DESKTOP_SAFARI,i.MOBILE_SAFARI].includes(getBrowserName()))throw new Error("Skip createImageBitmap on IOS and Safari");return createImageBitmap(e).then((function(e){try{return a=e,$Try_2_Post()}catch(e){return $Try_2_Catch()}}),$Try_2_Catch)}catch(e){$Try_2_Catch()}}))}function canvasToFile(e,t,i,o,a=1){return new Promise((function(s,f){let l;if("image/png"===t){let c,u,h;return c=e.getContext("2d"),({data:u}=c.getImageData(0,0,e.width,e.height)),h=UPNG.encode([u.buffer],e.width,e.height,4096*a),l=new Blob([h],{type:t}),l.name=i,l.lastModified=o,$If_4.call(this)}{if("image/bmp"===t)return new Promise((t=>r.toBlob(e,t))).then(function(e){try{return l=e,l.name=i,l.lastModified=o,$If_5.call(this)}catch(e){return f(e)}}.bind(this),f);{if("function"==typeof OffscreenCanvas&&e instanceof OffscreenCanvas)return e.convertToBlob({type:t,quality:a}).then(function(e){try{return l=e,l.name=i,l.lastModified=o,$If_6.call(this)}catch(e){return f(e)}}.bind(this),f);{let d;return d=e.toDataURL(t,a),getFilefromDataUrl(d,i,o).then(function(e){try{return l=e,$If_6.call(this)}catch(e){return f(e)}}.bind(this),f)}function $If_6(){return $If_5.call(this)}}function $If_5(){return $If_4.call(this)}}function $If_4(){return s(l)}}))}function cleanupCanvasMemory(e){e.width=0,e.height=0}function isAutoOrientationInBrowser(){return new Promise((function(e,t){let r,i,o,a,s;return void 0!==isAutoOrientationInBrowser.cachedResult?e(isAutoOrientationInBrowser.cachedResult):(r="data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==",getFilefromDataUrl("data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q==","test.jpg",Date.now()).then((function(r){try{return i=r,drawFileInCanvas(i).then((function(r){try{return o=r[1],canvasToFile(o,i.type,i.name,i.lastModified).then((function(r){try{return a=r,cleanupCanvasMemory(o),drawFileInCanvas(a).then((function(r){try{return s=r[0],isAutoOrientationInBrowser.cachedResult=1===s.width&&2===s.height,e(isAutoOrientationInBrowser.cachedResult)}catch(e){return t(e)}}),t)}catch(e){return t(e)}}),t)}catch(e){return t(e)}}),t)}catch(e){return t(e)}}),t))}))}function getExifOrientation(e){return new Promise(((t,r)=>{const i=new CustomFileReader;i.onload=e=>{const r=new DataView(e.target.result);if(65496!=r.getUint16(0,!1))return t(-2);const i=r.byteLength;let o=2;for(;o<i;){if(r.getUint16(o+2,!1)<=8)return t(-1);const e=r.getUint16(o,!1);if(o+=2,65505==e){if(1165519206!=r.getUint32(o+=2,!1))return t(-1);const e=18761==r.getUint16(o+=6,!1);o+=r.getUint32(o+4,e);const i=r.getUint16(o,e);o+=2;for(let a=0;a<i;a++)if(274==r.getUint16(o+12*a,e))return t(r.getUint16(o+12*a+8,e))}else{if(65280!=(65280&e))break;o+=r.getUint16(o,!1)}}return t(-1)},i.onerror=e=>r(e),i.readAsArrayBuffer(e)}))}function handleMaxWidthOrHeight(e,t){const{width:r}=e,{height:i}=e,{maxWidthOrHeight:o}=t;let a,s=e;return isFinite(o)&&(r>o||i>o)&&([s,a]=getNewCanvasAndCtx(r,i),r>i?(s.width=o,s.height=i/r*o):(s.width=r/i*o,s.height=o),a.drawImage(e,0,0,s.width,s.height),cleanupCanvasMemory(e)),s}function followExifOrientation(e,t){const{width:r}=e,{height:i}=e,[o,a]=getNewCanvasAndCtx(r,i);switch(t>4&&t<9?(o.width=i,o.height=r):(o.width=r,o.height=i),t){case 2:a.transform(-1,0,0,1,r,0);break;case 3:a.transform(-1,0,0,-1,r,i);break;case 4:a.transform(1,0,0,-1,0,i);break;case 5:a.transform(0,1,1,0,0,0);break;case 6:a.transform(0,1,-1,0,i,0);break;case 7:a.transform(0,-1,-1,0,i,r);break;case 8:a.transform(0,-1,1,0,0,r)}return a.drawImage(e,0,0,r,i),cleanupCanvasMemory(e),o}function compress(e,t,r=0){return new Promise((function(i,o){let a,s,f,l,c,u,h,d,A,g,p,m,w,v,b,y,E,F,_,B;function incProgress(e=5){if(t.signal&&t.signal.aborted)throw t.signal.reason;a+=e,t.onProgress(Math.min(a,100))}function setProgress(e){if(t.signal&&t.signal.aborted)throw t.signal.reason;a=Math.min(Math.max(e,a),100),t.onProgress(a)}return a=r,s=t.maxIteration||10,f=1024*t.maxSizeMB*1024,incProgress(),drawFileInCanvas(e,t).then(function(r){try{return[,l]=r,incProgress(),c=handleMaxWidthOrHeight(l,t),incProgress(),new Promise((function(r,i){var o;if(!(o=t.exifOrientation))return getExifOrientation(e).then(function(e){try{return o=e,$If_2.call(this)}catch(e){return i(e)}}.bind(this),i);function $If_2(){return r(o)}return $If_2.call(this)})).then(function(r){try{return u=r,incProgress(),isAutoOrientationInBrowser().then(function(r){try{return h=r?c:followExifOrientation(c,u),incProgress(),d=t.initialQuality||1,A=t.fileType||e.type,canvasToFile(h,A,e.name,e.lastModified,d).then(function(r){try{{if(g=r,incProgress(),p=g.size>f,m=g.size>e.size,!p&&!m)return setProgress(100),i(g);var a;function $Loop_3(){if(s--&&(b>f||b>w)){let t,r;return t=B?.95*_.width:_.width,r=B?.95*_.height:_.height,[E,F]=getNewCanvasAndCtx(t,r),F.drawImage(_,0,0,t,r),d*="image/png"===A?.85:.95,canvasToFile(E,A,e.name,e.lastModified,d).then((function(e){try{return y=e,cleanupCanvasMemory(_),_=E,b=y.size,setProgress(Math.min(99,Math.floor((v-b)/(v-f)*100))),$Loop_3}catch(e){return o(e)}}),o)}return[1]}return w=e.size,v=g.size,b=v,_=h,B=!t.alwaysKeepResolution&&p,(a=function(e){for(;e;){if(e.then)return void e.then(a,o);try{if(e.pop){if(e.length)return e.pop()?$Loop_3_exit.call(this):e;e=$Loop_3}else e=e.call(this)}catch(e){return o(e)}}}.bind(this))($Loop_3);function $Loop_3_exit(){return cleanupCanvasMemory(_),cleanupCanvasMemory(E),cleanupCanvasMemory(c),cleanupCanvasMemory(h),cleanupCanvasMemory(l),setProgress(100),i(y)}}}catch(u){return o(u)}}.bind(this),o)}catch(e){return o(e)}}.bind(this),o)}catch(e){return o(e)}}.bind(this),o)}catch(e){return o(e)}}.bind(this),o)}))}const l="\nlet scriptImported = false\nself.addEventListener('message', async (e) => {\n  const { file, id, imageCompressionLibUrl, options } = e.data\n  options.onProgress = (progress) => self.postMessage({ progress, id })\n  try {\n    if (!scriptImported) {\n      // console.log('[worker] importScripts', imageCompressionLibUrl)\n      self.importScripts(imageCompressionLibUrl)\n      scriptImported = true\n    }\n    // console.log('[worker] self', self)\n    const compressedFile = await imageCompression(file, options)\n    self.postMessage({ file: compressedFile, id })\n  } catch (e) {\n    // console.error('[worker] error', e)\n    self.postMessage({ error: e.message + '\\n' + e.stack, id })\n  }\n})\n";let c;function compressOnWebWorker(e,t){return new Promise(((r,i)=>{c||(c=function createWorkerScriptURL(e){const t=[];return"function"==typeof e?t.push(`(${e})()`):t.push(e),URL.createObjectURL(new Blob(t))}(l));const o=new Worker(c);o.addEventListener("message",(function handler(e){if(t.signal&&t.signal.aborted)o.terminate();else if(void 0===e.data.progress){if(e.data.error)return i(new Error(e.data.error)),void o.terminate();r(e.data.file),o.terminate()}else t.onProgress(e.data.progress)})),o.addEventListener("error",i),t.signal&&t.signal.addEventListener("abort",(()=>{i(t.signal.reason),o.terminate()})),o.postMessage({file:e,imageCompressionLibUrl:t.libURL,options:{...t,onProgress:void 0,signal:void 0}})}))}function imageCompression(e,t){return new Promise((function(r,i){let o,a,s,f,l,c;if(o={...t},s=0,({onProgress:f}=o),o.maxSizeMB=o.maxSizeMB||Number.POSITIVE_INFINITY,l="boolean"!=typeof o.useWebWorker||o.useWebWorker,delete o.useWebWorker,o.onProgress=e=>{s=e,"function"==typeof f&&f(s)},!(e instanceof Blob||e instanceof CustomFile))return i(new Error("The file given is not an instance of Blob or File"));if(!/^image/.test(e.type))return i(new Error("The file given is not an image"));if(c="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,!l||"function"!=typeof Worker||c)return compress(e,o).then(function(e){try{return a=e,$If_4.call(this)}catch(e){return i(e)}}.bind(this),i);var u=function(){try{return $If_4.call(this)}catch(e){return i(e)}}.bind(this),$Try_1_Catch=function(t){try{return compress(e,o).then((function(e){try{return a=e,u()}catch(e){return i(e)}}),i)}catch(e){return i(e)}};try{return o.libURL=o.libURL||"https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js",compressOnWebWorker(e,o).then((function(e){try{return a=e,u()}catch(e){return $Try_1_Catch()}}),$Try_1_Catch)}catch(e){$Try_1_Catch()}function $If_4(){try{a.name=e.name,a.lastModified=e.lastModified}catch(e){}try{o.preserveExif&&"image/jpeg"===e.type&&(!o.fileType||o.fileType&&o.fileType===e.type)&&(a=copyExifWithoutOrientation(e,a))}catch(e){}return r(a)}}))}imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation,imageCompression.cleanupCanvasMemory=cleanupCanvasMemory,imageCompression.isAutoOrientationInBrowser=isAutoOrientationInBrowser,imageCompression.approximateBelowMaximumCanvasSizeOfBrowser=approximateBelowMaximumCanvasSizeOfBrowser,imageCompression.copyExifWithoutOrientation=copyExifWithoutOrientation,imageCompression.getBrowserName=getBrowserName,imageCompression.version="2.0.2";
//# sourceMappingURL=browser-image-compression.mjs.map


/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.css":
/*!*************************************************!*\
  !*** ./node_modules/cropperjs/dist/cropper.css ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_2_cropper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!../../postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./cropper.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./node_modules/cropperjs/dist/cropper.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_2_cropper_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_1_postcss_loader_dist_cjs_js_ruleSet_1_rules_5_oneOf_1_use_2_cropper_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.js":
/*!************************************************!*\
  !*** ./node_modules/cropperjs/dist/cropper.js ***!
  \************************************************/
/***/ (function(module) {

/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:05.335Z
 */

(function (global, factory) {
   true ? module.exports = factory() :
  0;
})(this, (function () { 'use strict';

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'cropper';

  // Actions
  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw';

  // Classes
  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move");

  // Data keys
  var DATA_ACTION = "".concat(NAMESPACE, "Action");
  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");

  // Drag modes
  var DRAG_MODE_CROP = 'crop';
  var DRAG_MODE_MOVE = 'move';
  var DRAG_MODE_NONE = 'none';

  // Events
  var EVENT_CROP = 'crop';
  var EVENT_CROP_END = 'cropend';
  var EVENT_CROP_MOVE = 'cropmove';
  var EVENT_CROP_START = 'cropstart';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom';

  // Mime types
  var MIME_TYPE_JPEG = 'image/jpeg';

  // RegExps
  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
  var REGEXP_DATA_URL = /^data:/;
  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
  var REGEXP_TAG_NAME = /^img|canvas$/i;

  // Misc
  // Inspired by the default width and height of a canvas element.
  var MIN_CONTAINER_WIDTH = 200;
  var MIN_CONTAINER_HEIGHT = 100;

  var DEFAULTS = {
    // Define the view mode of the cropper
    viewMode: 0,
    // 0, 1, 2, 3

    // Define the dragging mode of the cropper
    dragMode: DRAG_MODE_CROP,
    // 'crop', 'move' or 'none'

    // Define the initial aspect ratio of the crop box
    initialAspectRatio: NaN,
    // Define the aspect ratio of the crop box
    aspectRatio: NaN,
    // An object with the previous cropping result data
    data: null,
    // A selector for adding extra containers to preview
    preview: '',
    // Re-render the cropper when resize the window
    responsive: true,
    // Restore the cropped area after resize the window
    restore: true,
    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,
    // Check the current image's Exif Orientation information
    checkOrientation: true,
    // Show the black modal
    modal: true,
    // Show the dashed lines for guiding
    guides: true,
    // Show the center indicator for guiding
    center: true,
    // Show the white modal to highlight the crop box
    highlight: true,
    // Show the grid background
    background: true,
    // Enable to crop the image automatically when initialize
    autoCrop: true,
    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,
    // Enable to move the image
    movable: true,
    // Enable to rotate the image
    rotatable: true,
    // Enable to scale the image
    scalable: true,
    // Enable to zoom the image
    zoomable: true,
    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,
    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,
    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,
    // Enable to move the crop box
    cropBoxMovable: true,
    // Enable to resize the crop box
    cropBoxResizable: true,
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: MIN_CONTAINER_WIDTH,
    minContainerHeight: MIN_CONTAINER_HEIGHT,
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

  /**
   * Check if the given value is not a number.
   */
  var isNaN = Number.isNaN || WINDOW.isNaN;

  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */
  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */
  var isPositiveNumber = function isPositiveNumber(value) {
    return value > 0 && value < Infinity;
  };

  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */
  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */
  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */
  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }
    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */
  function isFunction(value) {
    return typeof value === 'function';
  }
  var slice = Array.prototype.slice;

  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */
  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }

  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */
  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length) /* array-like */) {
        toArray(data).forEach(function (value, key) {
          callback.call(data, value, key, data);
        });
      } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }
    return data;
  }

  /**
   * Extend the given object.
   * @param {*} target - The target object to extend.
   * @param {*} args - The rest objects for merging to the target object.
   * @returns {Object} The extended object.
   */
  var assign = Object.assign || function assign(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (isObject(target) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            target[key] = arg[key];
          });
        }
      });
    }
    return target;
  };
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;

  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */
  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }
  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;

  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */
  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value = "".concat(value, "px");
      }
      style[property] = value;
    });
  }

  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */
  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }

  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */
  function addClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.add(value);
      return;
    }
    var className = element.className.trim();
    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }

  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */
  function removeClass(element, value) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }
    if (element.classList) {
      element.classList.remove(value);
      return;
    }
    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }

  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */
  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }
    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    }

    // IE10-11 doesn't support the second parameter of `classList.toggle`
    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;

  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */
  function toParamCase(value) {
    return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
  }

  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */
  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }
    if (element.dataset) {
      return element.dataset[name];
    }
    return element.getAttribute("data-".concat(toParamCase(name)));
  }

  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */
  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(toParamCase(name)), data);
    }
  }

  /**
   * Remove data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to remove.
   */
  function removeData(element, name) {
    if (isObject(element[name])) {
      try {
        delete element[name];
      } catch (error) {
        element[name] = undefined;
      }
    } else if (element.dataset) {
      // #128 Safari not allows to delete dataset property
      try {
        delete element.dataset[name];
      } catch (error) {
        element.dataset[name] = undefined;
      }
    } else {
      element.removeAttribute("data-".concat(toParamCase(name)));
    }
  }
  var REGEXP_SPACES = /\s\s*/;
  var onceSupported = function () {
    var supported = false;
    if (IS_BROWSER) {
      var once = false;
      var listener = function listener() {};
      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },
        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }
    return supported;
  }();

  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */
  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;
        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];
          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }
          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }
      element.removeEventListener(event, handler, options);
    });
  }

  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */
  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;
        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          listener.apply(element, args);
        };
        if (!listeners[event]) {
          listeners[event] = {};
        }
        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }
        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }
      element.addEventListener(event, _handler, options);
    });
  }

  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */
  function dispatchEvent(element, type, data) {
    var event;

    // Event and CustomEvent on IE9-11 are global objects, not constructors
    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }
    return element.dispatchEvent(event);
  }

  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */
  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  var location = WINDOW.location;
  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;

  /**
   * Check if the given URL is a cross origin URL.
   * @param {string} url - The target URL.
   * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
   */
  function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }

  /**
   * Add timestamp to the given URL.
   * @param {string} url - The target URL.
   * @returns {string} The result URL.
   */
  function addTimestamp(url) {
    var timestamp = "timestamp=".concat(new Date().getTime());
    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
  }

  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */
  function getTransforms(_ref) {
    var rotate = _ref.rotate,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      translateX = _ref.translateX,
      translateY = _ref.translateY;
    var values = [];
    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }
    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    }

    // Rotate should come first before scale to match orientation transform
    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }
    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }
    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }
    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }

  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */
  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);
    var maxRatio = 0;
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;
        if (Math.abs(ratio) > Math.abs(maxRatio)) {
          maxRatio = ratio;
        }
      });
    });
    return maxRatio;
  }

  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */
  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
      pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      startX: pageX,
      startY: pageY
    }, end);
  }

  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */
  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
        startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }

  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */
  function getAdjustedSizes(_ref4) {
    var aspectRatio = _ref4.aspectRatio,
      height = _ref4.height,
      width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);
    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;
      if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }
    return {
      width: width,
      height: height
    };
  }

  /**
   * Get the new sizes of a rectangle after rotated.
   * @param {Object} data - The original sizes.
   * @returns {Object} The result sizes.
   */
  function getRotatedSizes(_ref5) {
    var width = _ref5.width,
      height = _ref5.height,
      degree = _ref5.degree;
    degree = Math.abs(degree) % 180;
    if (degree === 90) {
      return {
        width: height,
        height: width
      };
    }
    var arc = degree % 90 * Math.PI / 180;
    var sinArc = Math.sin(arc);
    var cosArc = Math.cos(arc);
    var newWidth = width * cosArc + height * sinArc;
    var newHeight = width * sinArc + height * cosArc;
    return degree > 90 ? {
      width: newHeight,
      height: newWidth
    } : {
      width: newWidth,
      height: newHeight
    };
  }

  /**
   * Get a canvas which drew the given image.
   * @param {HTMLImageElement} image - The image for drawing.
   * @param {Object} imageData - The image data.
   * @param {Object} canvasData - The canvas data.
   * @param {Object} options - The options.
   * @returns {HTMLCanvasElement} The result canvas.
   */
  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
    var imageAspectRatio = _ref6.aspectRatio,
      imageNaturalWidth = _ref6.naturalWidth,
      imageNaturalHeight = _ref6.naturalHeight,
      _ref6$rotate = _ref6.rotate,
      rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
      _ref6$scaleX = _ref6.scaleX,
      scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
      _ref6$scaleY = _ref6.scaleY,
      scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
    var aspectRatio = _ref7.aspectRatio,
      naturalWidth = _ref7.naturalWidth,
      naturalHeight = _ref7.naturalHeight;
    var _ref8$fillColor = _ref8.fillColor,
      fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
      _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
      imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
      _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
      imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
      _ref8$maxWidth = _ref8.maxWidth,
      maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
      _ref8$maxHeight = _ref8.maxHeight,
      maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
      _ref8$minWidth = _ref8.minWidth,
      minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
      _ref8$minHeight = _ref8.minHeight,
      minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maxSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var minSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));

    // Note: should always use image's natural sizes for drawing as
    // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90
    var destMaxSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var destMinSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.scale(scaleX, scaleY);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
    context.imageSmoothingQuality = imageSmoothingQuality;
    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    context.restore();
    return canvas;
  }
  var fromCharCode = String.fromCharCode;

  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */
  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    length += start;
    for (var i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }
    return str;
  }
  var REGEXP_DATA_URL_HEAD = /^data:.*,/;

  /**
   * Transform Data URL to array buffer.
   * @param {string} dataURL - The Data URL to transform.
   * @returns {ArrayBuffer} The result array buffer.
   */
  function dataURLToArrayBuffer(dataURL) {
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    forEach(uint8, function (value, i) {
      uint8[i] = binary.charCodeAt(i);
    });
    return arrayBuffer;
  }

  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */
  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = [];

    // Chunk Typed Array for better performance (#435)
    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);
    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }
    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }

  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */
  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation;

    // Ignores range error when the image does not have correct Exif information
    try {
      var littleEndian;
      var app1Start;
      var ifdStart;

      // Only handle JPEG image (start by 0xFFD8)
      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;
        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }
          offset += 1;
        }
      }
      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;
        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;
          if (littleEndian || endianness === 0x4D4D /* bigEndian */) {
            if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
              var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
              if (firstIFDOffset >= 0x00000008) {
                ifdStart = tiffOffset + firstIFDOffset;
              }
            }
          }
        }
      }
      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);
        var _offset;
        var i;
        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;
          if (dataView.getUint16(_offset, littleEndian) === 0x0112 /* Orientation */) {
            // 8 is the offset of the current tag's value
            _offset += 8;

            // Get the original orientation value
            orientation = dataView.getUint16(_offset, littleEndian);

            // Override the orientation with its default value
            dataView.setUint16(_offset, 1, littleEndian);
            break;
          }
        }
      }
    } catch (error) {
      orientation = 1;
    }
    return orientation;
  }

  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */
  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;
    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;

      // Rotate left 180°
      case 3:
        rotate = -180;
        break;

      // Flip vertical
      case 4:
        scaleY = -1;
        break;

      // Flip vertical and rotate right 90°
      case 5:
        rotate = 90;
        scaleY = -1;
        break;

      // Rotate right 90°
      case 6:
        rotate = 90;
        break;

      // Flip horizontal and rotate right 90°
      case 7:
        rotate = 90;
        scaleX = -1;
        break;

      // Rotate left 90°
      case 8:
        rotate = -90;
        break;
    }
    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();
      this.renderCanvas();
      if (this.cropped) {
        this.renderCropBox();
      }
    },
    initContainer: function initContainer() {
      var element = this.element,
        options = this.options,
        container = this.container,
        cropper = this.cropper;
      var minWidth = Number(options.minContainerWidth);
      var minHeight = Number(options.minContainerHeight);
      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);
      var containerData = {
        width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
        height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
      };
      this.containerData = containerData;
      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });
      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },
    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var containerData = this.containerData,
        imageData = this.imageData;
      var viewMode = this.options.viewMode;
      var rotated = Math.abs(imageData.rotate) % 180 === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;
      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else if (viewMode === 3) {
        canvasHeight = containerData.width / aspectRatio;
      } else {
        canvasWidth = containerData.height * aspectRatio;
      }
      var canvasData = {
        aspectRatio: aspectRatio,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        width: canvasWidth,
        height: canvasHeight
      };
      this.canvasData = canvasData;
      this.limited = viewMode === 1 || viewMode === 2;
      this.limitCanvas(true, true);
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      canvasData.left = (containerData.width - canvasData.width) / 2;
      canvasData.top = (containerData.height - canvasData.height) / 2;
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      this.initialCanvasData = assign({}, canvasData);
    },
    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
      var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var viewMode = options.viewMode;
      var aspectRatio = canvasData.aspectRatio;
      var cropped = this.cropped && cropBoxData;
      if (sizeLimited) {
        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
        var minCanvasHeight = Number(options.minCanvasHeight) || 0;
        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
          } else if (minCanvasHeight) {
            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
          } else if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        }
        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: minCanvasWidth,
          height: minCanvasHeight
        });
        minCanvasWidth = _getAdjustedSizes.width;
        minCanvasHeight = _getAdjustedSizes.height;
        canvasData.minWidth = minCanvasWidth;
        canvasData.minHeight = minCanvasHeight;
        canvasData.maxWidth = Infinity;
        canvasData.maxHeight = Infinity;
      }
      if (positionLimited) {
        if (viewMode > (cropped ? 0 : 1)) {
          var newCanvasLeft = containerData.width - canvasData.width;
          var newCanvasTop = containerData.height - canvasData.height;
          canvasData.minLeft = Math.min(0, newCanvasLeft);
          canvasData.minTop = Math.min(0, newCanvasTop);
          canvasData.maxLeft = Math.max(0, newCanvasLeft);
          canvasData.maxTop = Math.max(0, newCanvasTop);
          if (cropped && this.limited) {
            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;
            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
              }
              if (canvasData.height >= containerData.height) {
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxTop = Math.max(0, newCanvasTop);
              }
            }
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerData.width;
          canvasData.maxTop = containerData.height;
        }
      }
    },
    renderCanvas: function renderCanvas(changed, transformed) {
      var canvasData = this.canvasData,
        imageData = this.imageData;
      if (transformed) {
        var _getRotatedSizes = getRotatedSizes({
            width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
            height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
            degree: imageData.rotate || 0
          }),
          naturalWidth = _getRotatedSizes.width,
          naturalHeight = _getRotatedSizes.height;
        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        canvasData.aspectRatio = naturalWidth / naturalHeight;
        canvasData.naturalWidth = naturalWidth;
        canvasData.naturalHeight = naturalHeight;
        this.limitCanvas(true, false);
      }
      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }
      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      this.limitCanvas(false, true);
      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      setStyle(this.canvas, assign({
        width: canvasData.width,
        height: canvasData.height
      }, getTransforms({
        translateX: canvasData.left,
        translateY: canvasData.top
      })));
      this.renderImage(changed);
      if (this.cropped && this.limited) {
        this.limitCropBox(true, true);
      }
    },
    renderImage: function renderImage(changed) {
      var canvasData = this.canvasData,
        imageData = this.imageData;
      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
      assign(imageData, {
        width: width,
        height: height,
        left: (canvasData.width - width) / 2,
        top: (canvasData.height - height) / 2
      });
      setStyle(this.image, assign({
        width: imageData.width,
        height: imageData.height
      }, getTransforms(assign({
        translateX: imageData.left,
        translateY: imageData.top
      }, imageData))));
      if (changed) {
        this.output();
      }
    },
    initCropBox: function initCropBox() {
      var options = this.options,
        canvasData = this.canvasData;
      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var cropBoxData = {
        width: canvasData.width,
        height: canvasData.height
      };
      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }
      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);

      // The width/height of auto crop area must large than "minWidth/Height"
      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      this.initialCropBoxData = assign({}, cropBoxData);
    },
    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
      var options = this.options,
        containerData = this.containerData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData,
        limited = this.limited;
      var aspectRatio = options.aspectRatio;
      if (sizeLimited) {
        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;

        // The min/maxCropBoxWidth/Height must be less than container's width/height
        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
        if (aspectRatio) {
          if (minCropBoxWidth && minCropBoxHeight) {
            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
              minCropBoxHeight = minCropBoxWidth / aspectRatio;
            } else {
              minCropBoxWidth = minCropBoxHeight * aspectRatio;
            }
          } else if (minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else if (minCropBoxHeight) {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }
          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
          } else {
            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
          }
        }

        // The minWidth/Height must be less than maxWidth/Height
        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }
      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = Math.max(0, canvasData.left);
          cropBoxData.minTop = Math.max(0, canvasData.top);
          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },
    renderCropBox: function renderCropBox() {
      var options = this.options,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData;
      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }
      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }
      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      this.limitCropBox(false, true);
      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      if (options.movable && options.cropBoxMovable) {
        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
      }
      setStyle(this.cropBox, assign({
        width: cropBoxData.width,
        height: cropBoxData.height
      }, getTransforms({
        translateX: cropBoxData.left,
        translateY: cropBoxData.top
      })));
      if (this.cropped && this.limited) {
        this.limitCanvas(true, true);
      }
      if (!this.disabled) {
        this.output();
      }
    },
    output: function output() {
      this.preview();
      dispatchEvent(this.element, EVENT_CROP, this.getData());
    }
  };

  var preview = {
    initPreview: function initPreview() {
      var element = this.element,
        crossOrigin = this.crossOrigin;
      var preview = this.options.preview;
      var url = crossOrigin ? this.crossOriginUrl : this.url;
      var alt = element.alt || 'The image to preview';
      var image = document.createElement('img');
      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }
      image.src = url;
      image.alt = alt;
      this.viewBox.appendChild(image);
      this.viewBoxImage = image;
      if (!preview) {
        return;
      }
      var previews = preview;
      if (typeof preview === 'string') {
        previews = element.ownerDocument.querySelectorAll(preview);
      } else if (preview.querySelector) {
        previews = [preview];
      }
      this.previews = previews;
      forEach(previews, function (el) {
        var img = document.createElement('img');

        // Save the original size for recover
        setData(el, DATA_PREVIEW, {
          width: el.offsetWidth,
          height: el.offsetHeight,
          html: el.innerHTML
        });
        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }
        img.src = url;
        img.alt = alt;

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */
        img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
        el.innerHTML = '';
        el.appendChild(img);
      });
    },
    resetPreview: function resetPreview() {
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        setStyle(element, {
          width: data.width,
          height: data.height
        });
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },
    preview: function preview() {
      var imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width,
        cropBoxHeight = cropBoxData.height;
      var width = imageData.width,
        height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;
      if (!this.cropped || this.disabled) {
        return;
      }
      setStyle(this.viewBoxImage, assign({
        width: width,
        height: height
      }, getTransforms(assign({
        translateX: -left,
        translateY: -top
      }, imageData))));
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;
        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }
        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }
        setStyle(element, {
          width: newWidth,
          height: newHeight
        });
        setStyle(element.getElementsByTagName('img')[0], assign({
          width: width * ratio,
          height: height * ratio
        }, getTransforms(assign({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, imageData))));
      });
    }
  };

  var events = {
    bind: function bind() {
      var element = this.element,
        options = this.options,
        cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }
      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }
      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
      if (options.responsive) {
        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
      }
    },
    unbind: function unbind() {
      var element = this.element,
        options = this.options,
        cropper = this.cropper;
      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }
      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }
      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }
      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }
      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }
      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }
      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
      }
      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this.onResize);
      }
    }
  };

  var handlers = {
    resize: function resize() {
      if (this.disabled) {
        return;
      }
      var options = this.options,
        container = this.container,
        containerData = this.containerData;
      var ratioX = container.offsetWidth / containerData.width;
      var ratioY = container.offsetHeight / containerData.height;
      var ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY;

      // Resize when width changed or height changed
      if (ratio !== 1) {
        var canvasData;
        var cropBoxData;
        if (options.restore) {
          canvasData = this.getCanvasData();
          cropBoxData = this.getCropBoxData();
        }
        this.render();
        if (options.restore) {
          this.setCanvasData(forEach(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          this.setCropBoxData(forEach(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },
    dblclick: function dblclick() {
      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
        return;
      }
      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
    },
    wheel: function wheel(event) {
      var _this = this;
      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;
      if (this.disabled) {
        return;
      }
      event.preventDefault();

      // Limit wheel speed to prevent zoom too fast (#21)
      if (this.wheeling) {
        return;
      }
      this.wheeling = true;
      setTimeout(function () {
        _this.wheeling = false;
      }, 50);
      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }
      this.zoom(-delta * ratio, event);
    },
    cropStart: function cropStart(event) {
      var buttons = event.buttons,
        button = event.button;
      if (this.disabled

      // Handle mouse event and pointer event and ignore touch event
      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && (
      // No primary button (Usually the left button)
      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0

      // Open context menu
      || event.ctrlKey)) {
        return;
      }
      var options = this.options,
        pointers = this.pointers;
      var action;
      if (event.changedTouches) {
        // Handle touch event
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        // Handle mouse event and pointer event
        pointers[event.pointerId || 0] = getPointer(event);
      }
      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
        action = ACTION_ZOOM;
      } else {
        action = getData(event.target, DATA_ACTION);
      }
      if (!REGEXP_ACTIONS.test(action)) {
        return;
      }
      if (dispatchEvent(this.element, EVENT_CROP_START, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }

      // This line is required for preventing page zooming in iOS browsers
      event.preventDefault();
      this.action = action;
      this.cropping = false;
      if (action === ACTION_CROP) {
        this.cropping = true;
        addClass(this.dragBox, CLASS_MODAL);
      }
    },
    cropMove: function cropMove(event) {
      var action = this.action;
      if (this.disabled || !action) {
        return;
      }
      var pointers = this.pointers;
      event.preventDefault();
      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }
      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          // The first parameter should not be undefined (#432)
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }
      this.change(event);
    },
    cropEnd: function cropEnd(event) {
      if (this.disabled) {
        return;
      }
      var action = this.action,
        pointers = this.pointers;
      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          delete pointers[touch.identifier];
        });
      } else {
        delete pointers[event.pointerId || 0];
      }
      if (!action) {
        return;
      }
      event.preventDefault();
      if (!Object.keys(pointers).length) {
        this.action = '';
      }
      if (this.cropping) {
        this.cropping = false;
        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
      }
      dispatchEvent(this.element, EVENT_CROP_END, {
        originalEvent: event,
        action: action
      });
    }
  };

  var change = {
    change: function change(event) {
      var options = this.options,
        canvasData = this.canvasData,
        containerData = this.containerData,
        cropBoxData = this.cropBoxData,
        pointers = this.pointers;
      var action = this.action;
      var aspectRatio = options.aspectRatio;
      var left = cropBoxData.left,
        top = cropBoxData.top,
        width = cropBoxData.width,
        height = cropBoxData.height;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = containerData.width;
      var maxHeight = containerData.height;
      var renderable = true;
      var offset;

      // Locking aspect ratio in "free mode" by holding shift key
      if (!aspectRatio && event.shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }
      if (this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
      }
      var pointer = pointers[Object.keys(pointers)[0]];
      var range = {
        x: pointer.endX - pointer.startX,
        y: pointer.endY - pointer.startY
      };
      var check = function check(side) {
        switch (side) {
          case ACTION_EAST:
            if (right + range.x > maxWidth) {
              range.x = maxWidth - right;
            }
            break;
          case ACTION_WEST:
            if (left + range.x < minLeft) {
              range.x = minLeft - left;
            }
            break;
          case ACTION_NORTH:
            if (top + range.y < minTop) {
              range.y = minTop - top;
            }
            break;
          case ACTION_SOUTH:
            if (bottom + range.y > maxHeight) {
              range.y = maxHeight - bottom;
            }
            break;
        }
      };
      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;

        // Resize crop box
        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_EAST);
          width += range.x;
          if (width < 0) {
            action = ACTION_WEST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;
          if (height < 0) {
            action = ACTION_SOUTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }
          check(ACTION_WEST);
          width -= range.x;
          left += range.x;
          if (width < 0) {
            action = ACTION_EAST;
            width = -width;
            left -= width;
          }
          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }
          break;
        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }
          check(ACTION_SOUTH);
          height += range.y;
          if (height < 0) {
            action = ACTION_NORTH;
            height = -height;
            top -= height;
          }
          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }
          break;
        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            check(ACTION_NORTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }
            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += cropBoxData.width - width;
          } else {
            check(ACTION_NORTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_WEST);
            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_WEST);
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            top -= height;
          }
          break;
        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }
            check(ACTION_EAST);
            width += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_EAST);
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }
            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }
          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            top -= height;
          }
          break;

        // Move canvas
        case ACTION_MOVE:
          this.move(range.x, range.y);
          renderable = false;
          break;

        // Zoom canvas
        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), event);
          renderable = false;
          break;

        // Create crop box
        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }
          offset = getOffset(this.cropper);
          left = pointer.startX - offset.left;
          top = pointer.startY - offset.top;
          width = cropBoxData.minWidth;
          height = cropBoxData.minHeight;
          if (range.x > 0) {
            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
          } else if (range.x < 0) {
            left -= width;
            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
          }
          if (range.y < 0) {
            top -= height;
          }

          // Show the crop box if is hidden
          if (!this.cropped) {
            removeClass(this.cropBox, CLASS_HIDDEN);
            this.cropped = true;
            if (this.limited) {
              this.limitCropBox(true, true);
            }
          }
          break;
      }
      if (renderable) {
        cropBoxData.width = width;
        cropBoxData.height = height;
        cropBoxData.left = left;
        cropBoxData.top = top;
        this.action = action;
        this.renderCropBox();
      }

      // Override
      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    }
  };

  var methods = {
    // Show the crop box manually
    crop: function crop() {
      if (this.ready && !this.cropped && !this.disabled) {
        this.cropped = true;
        this.limitCropBox(true, true);
        if (this.options.modal) {
          addClass(this.dragBox, CLASS_MODAL);
        }
        removeClass(this.cropBox, CLASS_HIDDEN);
        this.setCropBoxData(this.initialCropBoxData);
      }
      return this;
    },
    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (this.ready && !this.disabled) {
        this.imageData = assign({}, this.initialImageData);
        this.canvasData = assign({}, this.initialCanvasData);
        this.cropBoxData = assign({}, this.initialCropBoxData);
        this.renderCanvas();
        if (this.cropped) {
          this.renderCropBox();
        }
      }
      return this;
    },
    // Clear the crop box
    clear: function clear() {
      if (this.cropped && !this.disabled) {
        assign(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });
        this.cropped = false;
        this.renderCropBox();
        this.limitCanvas(true, true);

        // Render canvas after crop box rendered
        this.renderCanvas();
        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }
      return this;
    },
    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
     * @returns {Cropper} this
     */
    replace: function replace(url) {
      var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.disabled && url) {
        if (this.isImg) {
          this.element.src = url;
        }
        if (hasSameSize) {
          this.url = url;
          this.image.src = url;
          if (this.ready) {
            this.viewBoxImage.src = url;
            forEach(this.previews, function (element) {
              element.getElementsByTagName('img')[0].src = url;
            });
          }
        } else {
          if (this.isImg) {
            this.replaced = true;
          }
          this.options.data = null;
          this.uncreate();
          this.load(url);
        }
      }
      return this;
    },
    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.ready && this.disabled) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.ready && !this.disabled) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }
      return this;
    },
    /**
     * Destroy the cropper and remove the instance from the image
     * @returns {Cropper} this
     */
    destroy: function destroy() {
      var element = this.element;
      if (!element[NAMESPACE]) {
        return this;
      }
      element[NAMESPACE] = undefined;
      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }
      this.uncreate();
      return this;
    },
    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
     * @returns {Cropper} this
     */
    move: function move(offsetX) {
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
      var _this$canvasData = this.canvasData,
        left = _this$canvasData.left,
        top = _this$canvasData.top;
      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
    },
    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Cropper} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var canvasData = this.canvasData;
      var changed = false;
      x = Number(x);
      y = Number(y);
      if (this.ready && !this.disabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }
        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }
        if (changed) {
          this.renderCanvas(true);
        }
      }
      return this;
    },
    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvasData = this.canvasData;
      ratio = Number(ratio);
      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }
      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
    },
    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Object} pivot - The zoom pivot point coordinate.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
      var options = this.options,
        canvasData = this.canvasData;
      var width = canvasData.width,
        height = canvasData.height,
        naturalWidth = canvasData.naturalWidth,
        naturalHeight = canvasData.naturalHeight;
      ratio = Number(ratio);
      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;
        if (dispatchEvent(this.element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: width / naturalWidth,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }
        if (_originalEvent) {
          var pointers = this.pointers;
          var offset = getOffset(this.cropper);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          };

          // Zoom from the triggering point of the event
          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
        } else {
          // Zoom from the center of the canvas
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }
        canvasData.width = newWidth;
        canvasData.height = newHeight;
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotate: function rotate(degree) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    },
    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotateTo: function rotateTo(degree) {
      degree = Number(degree);
      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.renderCanvas(true, true);
      }
      return this;
    },
    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Cropper} this
     */
    scaleX: function scaleX(_scaleX) {
      var scaleY = this.imageData.scaleY;
      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
    },
    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scaleY: function scaleY(_scaleY) {
      var scaleX = this.imageData.scaleX;
      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
    },
    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      var transformed = false;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);
      if (this.ready && !this.disabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          transformed = true;
        }
        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          transformed = true;
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
      }
      return this;
    },
    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData: function getData() {
      var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData,
        cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
        var ratio = imageData.width / imageData.naturalWidth;
        forEach(data, function (n, i) {
          data[i] = n / ratio;
        });
        if (rounded) {
          // In case rounding off leads to extra 1px in right or bottom border
          // we should round the top-left corner and the dimension (#343).
          var bottom = Math.round(data.y + data.height);
          var right = Math.round(data.x + data.width);
          data.x = Math.round(data.x);
          data.y = Math.round(data.y);
          data.width = right - data.x;
          data.height = bottom - data.y;
        }
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (options.rotatable) {
        data.rotate = imageData.rotate || 0;
      }
      if (options.scalable) {
        data.scaleX = imageData.scaleX || 1;
        data.scaleY = imageData.scaleY || 1;
      }
      return data;
    },
    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Cropper} this
     */
    setData: function setData(data) {
      var options = this.options,
        imageData = this.imageData,
        canvasData = this.canvasData;
      var cropBoxData = {};
      if (this.ready && !this.disabled && isPlainObject(data)) {
        var transformed = false;
        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            transformed = true;
          }
        }
        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            transformed = true;
          }
          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            transformed = true;
          }
        }
        if (transformed) {
          this.renderCanvas(true, true);
        }
        var ratio = imageData.width / imageData.naturalWidth;
        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }
        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }
        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }
        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }
        this.setCropBoxData(cropBoxData);
      }
      return this;
    },
    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData: function getContainerData() {
      return this.ready ? assign({}, this.containerData) : {};
    },
    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData: function getImageData() {
      return this.sized ? assign({}, this.imageData) : {};
    },
    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData: function getCanvasData() {
      var canvasData = this.canvasData;
      var data = {};
      if (this.ready) {
        forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
          data[n] = canvasData[n];
        });
      }
      return data;
    },
    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Cropper} this
     */
    setCanvasData: function setCanvasData(data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;
      if (this.ready && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }
        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }
        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }
        this.renderCanvas(true);
      }
      return this;
    },
    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData: function getCropBoxData() {
      var cropBoxData = this.cropBoxData;
      var data;
      if (this.ready && this.cropped) {
        data = {
          left: cropBoxData.left,
          top: cropBoxData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
      }
      return data || {};
    },
    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Cropper} this
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;
      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }
        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }
        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }
        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          heightChanged = true;
          cropBoxData.height = data.height;
        }
        if (aspectRatio) {
          if (widthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (heightChanged) {
            cropBoxData.width = cropBoxData.height * aspectRatio;
          }
        }
        this.renderCropBox();
      }
      return this;
    },
    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas: function getCroppedCanvas() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.ready || !window.HTMLCanvasElement) {
        return null;
      }
      var canvasData = this.canvasData;
      var source = getSourceCanvas(this.image, this.imageData, canvasData, options);

      // Returns the source canvas if it is not cropped.
      if (!this.cropped) {
        return source;
      }
      var _this$getData = this.getData(options.rounded),
        initialX = _this$getData.x,
        initialY = _this$getData.y,
        initialWidth = _this$getData.width,
        initialHeight = _this$getData.height;
      var ratio = source.width / Math.floor(canvasData.naturalWidth);
      if (ratio !== 1) {
        initialX *= ratio;
        initialY *= ratio;
        initialWidth *= ratio;
        initialHeight *= ratio;
      }
      var aspectRatio = initialWidth / initialHeight;
      var maxSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.maxWidth || Infinity,
        height: options.maxHeight || Infinity
      });
      var minSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.minWidth || 0,
        height: options.minHeight || 0
      }, 'cover');
      var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: options.width || (ratio !== 1 ? source.width : initialWidth),
          height: options.height || (ratio !== 1 ? source.height : initialHeight)
        }),
        width = _getAdjustedSizes.width,
        height = _getAdjustedSizes.height;
      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = normalizeDecimalNumber(width);
      canvas.height = normalizeDecimalNumber(height);
      context.fillStyle = options.fillColor || 'transparent';
      context.fillRect(0, 0, width, height);
      var _options$imageSmoothi = options.imageSmoothingEnabled,
        imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
        imageSmoothingQuality = options.imageSmoothingQuality;
      context.imageSmoothingEnabled = imageSmoothingEnabled;
      if (imageSmoothingQuality) {
        context.imageSmoothingQuality = imageSmoothingQuality;
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
      var sourceWidth = source.width;
      var sourceHeight = source.height;

      // Source canvas parameters
      var srcX = initialX;
      var srcY = initialY;
      var srcWidth;
      var srcHeight;

      // Destination canvas parameters
      var dstX;
      var dstY;
      var dstWidth;
      var dstHeight;
      if (srcX <= -initialWidth || srcX > sourceWidth) {
        srcX = 0;
        srcWidth = 0;
        dstX = 0;
        dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
        dstWidth = srcWidth;
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
        dstWidth = srcWidth;
      }
      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
        srcY = 0;
        srcHeight = 0;
        dstY = 0;
        dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
        dstHeight = srcHeight;
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
        dstHeight = srcHeight;
      }
      var params = [srcX, srcY, srcWidth, srcHeight];

      // Avoid "IndexSizeError"
      if (dstWidth > 0 && dstHeight > 0) {
        var scale = width / initialWidth;
        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
      }

      // All the numerical parameters should be integer for `drawImage`
      // https://github.com/fengyuanchen/cropper/issues/476
      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
        return Math.floor(normalizeDecimalNumber(param));
      }))));
      return canvas;
    },
    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Cropper} this
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;
      if (!this.disabled && !isUndefined(aspectRatio)) {
        // 0 -> NaN
        options.aspectRatio = Math.max(0, aspectRatio) || NaN;
        if (this.ready) {
          this.initCropBox();
          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }
      return this;
    },
    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Cropper} this
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options,
        dragBox = this.dragBox,
        face = this.face;
      if (this.ready && !this.disabled) {
        var croppable = mode === DRAG_MODE_CROP;
        var movable = options.movable && mode === DRAG_MODE_MOVE;
        mode = croppable || movable ? mode : DRAG_MODE_NONE;
        options.dragMode = mode;
        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);
        if (!options.cropBoxMovable) {
          // Sync drag mode to crop box when it is not movable
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }
      return this;
    }
  };

  var AnotherCropper = WINDOW.Cropper;
  var Cropper = /*#__PURE__*/function () {
    /**
     * Create a new Cropper.
     * @param {Element} element - The target element for cropping.
     * @param {Object} [options={}] - The configuration options.
     */
    function Cropper(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Cropper);
      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
        throw new Error('The first argument is required and must be an <img> or <canvas> element.');
      }
      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.cropped = false;
      this.disabled = false;
      this.pointers = {};
      this.ready = false;
      this.reloading = false;
      this.replaced = false;
      this.sized = false;
      this.sizing = false;
      this.init();
    }
    return _createClass(Cropper, [{
      key: "init",
      value: function init() {
        var element = this.element;
        var tagName = element.tagName.toLowerCase();
        var url;
        if (element[NAMESPACE]) {
          return;
        }
        element[NAMESPACE] = this;
        if (tagName === 'img') {
          this.isImg = true;

          // e.g.: "img/picture.jpg"
          url = element.getAttribute('src') || '';
          this.originalUrl = url;

          // Stop when it's a blank image
          if (!url) {
            return;
          }

          // e.g.: "https://example.com/img/picture.jpg"
          url = element.src;
        } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
          url = element.toDataURL();
        }
        this.load(url);
      }
    }, {
      key: "load",
      value: function load(url) {
        var _this = this;
        if (!url) {
          return;
        }
        this.url = url;
        this.imageData = {};
        var element = this.element,
          options = this.options;
        if (!options.rotatable && !options.scalable) {
          options.checkOrientation = false;
        }

        // Only IE10+ supports Typed Arrays
        if (!options.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }

        // Detect the mime type of the image directly if it is a Data URL
        if (REGEXP_DATA_URL.test(url)) {
          // Read ArrayBuffer from Data URL of JPEG images directly for better performance
          if (REGEXP_DATA_URL_JPEG.test(url)) {
            this.read(dataURLToArrayBuffer(url));
          } else {
            // Only a JPEG image may contains Exif Orientation information,
            // the rest types of Data URLs are not necessary to check orientation at all.
            this.clone();
          }
          return;
        }

        // 1. Detect the mime type of the image by a XMLHttpRequest.
        // 2. Load the image as ArrayBuffer for reading orientation if its a JPEG image.
        var xhr = new XMLHttpRequest();
        var clone = this.clone.bind(this);
        this.reloading = true;
        this.xhr = xhr;

        // 1. Cross origin requests are only supported for protocol schemes:
        // http, https, data, chrome, chrome-extension.
        // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
        // in some browsers as IE11 and Safari.
        xhr.onabort = clone;
        xhr.onerror = clone;
        xhr.ontimeout = clone;
        xhr.onprogress = function () {
          // Abort the request directly if it not a JPEG image for better performance
          if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
            xhr.abort();
          }
        };
        xhr.onload = function () {
          _this.read(xhr.response);
        };
        xhr.onloadend = function () {
          _this.reloading = false;
          _this.xhr = null;
        };

        // Bust cache when there is a "crossOrigin" property to avoid browser cache error
        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
          url = addTimestamp(url);
        }

        // The third parameter is required for avoiding side-effect (#682)
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = element.crossOrigin === 'use-credentials';
        xhr.send();
      }
    }, {
      key: "read",
      value: function read(arrayBuffer) {
        var options = this.options,
          imageData = this.imageData;

        // Reset the orientation value to its default value 1
        // as some iOS browsers will render image with its orientation
        var orientation = resetAndGetOrientation(arrayBuffer);
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;
        if (orientation > 1) {
          // Generate a new URL which has the default orientation value
          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
          var _parseOrientation = parseOrientation(orientation);
          rotate = _parseOrientation.rotate;
          scaleX = _parseOrientation.scaleX;
          scaleY = _parseOrientation.scaleY;
        }
        if (options.rotatable) {
          imageData.rotate = rotate;
        }
        if (options.scalable) {
          imageData.scaleX = scaleX;
          imageData.scaleY = scaleY;
        }
        this.clone();
      }
    }, {
      key: "clone",
      value: function clone() {
        var element = this.element,
          url = this.url;
        var crossOrigin = element.crossOrigin;
        var crossOriginUrl = url;
        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
          if (!crossOrigin) {
            crossOrigin = 'anonymous';
          }

          // Bust cache when there is not a "crossOrigin" property (#519)
          crossOriginUrl = addTimestamp(url);
        }
        this.crossOrigin = crossOrigin;
        this.crossOriginUrl = crossOriginUrl;
        var image = document.createElement('img');
        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }
        image.src = crossOriginUrl || url;
        image.alt = element.alt || 'The image to crop';
        this.image = image;
        image.onload = this.start.bind(this);
        image.onerror = this.stop.bind(this);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        this.sizing = true;

        // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.
        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
        var done = function done(naturalWidth, naturalHeight) {
          assign(_this2.imageData, {
            naturalWidth: naturalWidth,
            naturalHeight: naturalHeight,
            aspectRatio: naturalWidth / naturalHeight
          });
          _this2.initialImageData = assign({}, _this2.imageData);
          _this2.sizing = false;
          _this2.sized = true;
          _this2.build();
        };

        // Most modern browsers (excepts iOS WebKit)
        if (image.naturalWidth && !isIOSWebKit) {
          done(image.naturalWidth, image.naturalHeight);
          return;
        }
        var sizingImage = document.createElement('img');
        var body = document.body || document.documentElement;
        this.sizingImage = sizingImage;
        sizingImage.onload = function () {
          done(sizingImage.width, sizingImage.height);
          if (!isIOSWebKit) {
            body.removeChild(sizingImage);
          }
        };
        sizingImage.src = image.src;

        // iOS WebKit will convert the image automatically
        // with its orientation once append it into DOM (#279)
        if (!isIOSWebKit) {
          sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
          body.appendChild(sizingImage);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        image.parentNode.removeChild(image);
        this.image = null;
      }
    }, {
      key: "build",
      value: function build() {
        if (!this.sized || this.ready) {
          return;
        }
        var element = this.element,
          options = this.options,
          image = this.image;

        // Create cropper elements
        var container = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
        this.container = container;
        this.cropper = cropper;
        this.canvas = canvas;
        this.dragBox = dragBox;
        this.cropBox = cropBox;
        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
        this.face = face;
        canvas.appendChild(image);

        // Hide the original image
        addClass(element, CLASS_HIDDEN);

        // Inserts the cropper after to the current image
        container.insertBefore(cropper, element.nextSibling);

        // Show the hidden image
        removeClass(image, CLASS_HIDE);
        this.initPreview();
        this.bind();
        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
        addClass(cropBox, CLASS_HIDDEN);
        if (!options.guides) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
        }
        if (!options.center) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
        }
        if (options.background) {
          addClass(cropper, "".concat(NAMESPACE, "-bg"));
        }
        if (!options.highlight) {
          addClass(face, CLASS_INVISIBLE);
        }
        if (options.cropBoxMovable) {
          addClass(face, CLASS_MOVE);
          setData(face, DATA_ACTION, ACTION_ALL);
        }
        if (!options.cropBoxResizable) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
        }
        this.render();
        this.ready = true;
        this.setDragMode(options.dragMode);
        if (options.autoCrop) {
          this.crop();
        }
        this.setData(options.data);
        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }
        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: "unbuild",
      value: function unbuild() {
        if (!this.ready) {
          return;
        }
        this.ready = false;
        this.unbind();
        this.resetPreview();
        var parentNode = this.cropper.parentNode;
        if (parentNode) {
          parentNode.removeChild(this.cropper);
        }
        removeClass(this.element, CLASS_HIDDEN);
      }
    }, {
      key: "uncreate",
      value: function uncreate() {
        if (this.ready) {
          this.unbuild();
          this.ready = false;
          this.cropped = false;
        } else if (this.sizing) {
          this.sizingImage.onload = null;
          this.sizing = false;
          this.sized = false;
        } else if (this.reloading) {
          this.xhr.onabort = null;
          this.xhr.abort();
        } else if (this.image) {
          this.stop();
        }
      }

      /**
       * Get the no conflict cropper class.
       * @returns {Cropper} The cropper class.
       */
    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Cropper = AnotherCropper;
        return Cropper;
      }

      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */
    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);
  }();
  assign(Cropper.prototype, render, preview, events, handlers, change, methods);

  return Cropper;

}));


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./node_modules/cropperjs/dist/cropper.css":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[1]!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[5].oneOf[1].use[2]!./node_modules/cropperjs/dist/cropper.css ***!
  \***********************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*!\n * Cropper.js v1.6.2\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2024-04-21T07:43:02.731Z\n */\n\n.cropper-container {\n  direction: ltr;\n  font-size: 0;\n  line-height: 0;\n  position: relative;\n  touch-action: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n\n.cropper-container img {\n    backface-visibility: hidden;\n    display: block;\n    height: 100%;\n    image-orientation: 0deg;\n    max-height: none !important;\n    max-width: none !important;\n    min-height: 0 !important;\n    min-width: 0 !important;\n    width: 100%;\n  }\n\n.cropper-wrap-box,\n.cropper-canvas,\n.cropper-drag-box,\n.cropper-crop-box,\n.cropper-modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.cropper-wrap-box,\n.cropper-canvas {\n  overflow: hidden;\n}\n\n.cropper-drag-box {\n  background-color: #fff;\n  opacity: 0;\n}\n\n.cropper-modal {\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.cropper-view-box {\n  display: block;\n  height: 100%;\n  outline: 1px solid #39f;\n  outline-color: rgba(51, 153, 255, 0.75);\n  overflow: hidden;\n  width: 100%;\n}\n\n.cropper-dashed {\n  border: 0 dashed #eee;\n  display: block;\n  opacity: 0.5;\n  position: absolute;\n}\n\n.cropper-dashed.dashed-h {\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    height: calc(100% / 3);\n    left: 0;\n    top: calc(100% / 3);\n    width: 100%;\n  }\n\n.cropper-dashed.dashed-v {\n    border-left-width: 1px;\n    border-right-width: 1px;\n    height: 100%;\n    left: calc(100% / 3);\n    top: 0;\n    width: calc(100% / 3);\n  }\n\n.cropper-center {\n  display: block;\n  height: 0;\n  left: 50%;\n  opacity: 0.75;\n  position: absolute;\n  top: 50%;\n  width: 0;\n}\n\n.cropper-center::before,\n  .cropper-center::after {\n    background-color: #eee;\n    content: ' ';\n    display: block;\n    position: absolute;\n  }\n\n.cropper-center::before {\n    height: 1px;\n    left: -3px;\n    top: 0;\n    width: 7px;\n  }\n\n.cropper-center::after {\n    height: 7px;\n    left: 0;\n    top: -3px;\n    width: 1px;\n  }\n\n.cropper-face,\n.cropper-line,\n.cropper-point {\n  display: block;\n  height: 100%;\n  opacity: 0.1;\n  position: absolute;\n  width: 100%;\n}\n\n.cropper-face {\n  background-color: #fff;\n  left: 0;\n  top: 0;\n}\n\n.cropper-line {\n  background-color: #39f;\n}\n\n.cropper-line.line-e {\n    cursor: ew-resize;\n    right: -3px;\n    top: 0;\n    width: 5px;\n  }\n\n.cropper-line.line-n {\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n    top: -3px;\n  }\n\n.cropper-line.line-w {\n    cursor: ew-resize;\n    left: -3px;\n    top: 0;\n    width: 5px;\n  }\n\n.cropper-line.line-s {\n    bottom: -3px;\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n  }\n\n.cropper-point {\n  background-color: #39f;\n  height: 5px;\n  opacity: 0.75;\n  width: 5px;\n}\n\n.cropper-point.point-e {\n    cursor: ew-resize;\n    margin-top: -3px;\n    right: -3px;\n    top: 50%;\n  }\n\n.cropper-point.point-n {\n    cursor: ns-resize;\n    left: 50%;\n    margin-left: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-w {\n    cursor: ew-resize;\n    left: -3px;\n    margin-top: -3px;\n    top: 50%;\n  }\n\n.cropper-point.point-s {\n    bottom: -3px;\n    cursor: s-resize;\n    left: 50%;\n    margin-left: -3px;\n  }\n\n.cropper-point.point-ne {\n    cursor: nesw-resize;\n    right: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-nw {\n    cursor: nwse-resize;\n    left: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-sw {\n    bottom: -3px;\n    cursor: nesw-resize;\n    left: -3px;\n  }\n\n.cropper-point.point-se {\n    bottom: -3px;\n    cursor: nwse-resize;\n    height: 20px;\n    opacity: 1;\n    right: -3px;\n    width: 20px;\n  }\n\n@media (min-width: 768px) {\n\n.cropper-point.point-se {\n      height: 15px;\n      width: 15px;\n  }\n    }\n\n@media (min-width: 992px) {\n\n.cropper-point.point-se {\n      height: 10px;\n      width: 10px;\n  }\n    }\n\n@media (min-width: 1200px) {\n\n.cropper-point.point-se {\n      height: 5px;\n      opacity: 0.75;\n      width: 5px;\n  }\n    }\n\n.cropper-point.point-se::before {\n    background-color: #39f;\n    bottom: -50%;\n    content: ' ';\n    display: block;\n    height: 200%;\n    opacity: 0;\n    position: absolute;\n    right: -50%;\n    width: 200%;\n  }\n\n.cropper-invisible {\n  opacity: 0;\n}\n\n.cropper-bg {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n\n.cropper-hide {\n  display: block;\n  height: 0;\n  position: absolute;\n  width: 0;\n}\n\n.cropper-hidden {\n  display: none !important;\n}\n\n.cropper-move {\n  cursor: move;\n}\n\n.cropper-crop {\n  cursor: crosshair;\n}\n\n.cropper-disabled .cropper-drag-box,\n.cropper-disabled .cropper-face,\n.cropper-disabled .cropper-line,\n.cropper-disabled .cropper-point {\n  cursor: not-allowed;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/cropperjs/dist/cropper.css"],"names":[],"mappings":"AAAA;;;;;;;;EAQE;;AAEF;EACE,cAAc;EACd,YAAY;EACZ,cAAc;EACd,kBAAkB;EAEd,kBAAkB;EACtB,2BAA2B;EAC3B,yBAAyB;KACtB,sBAAsB;UAEjB,iBAAiB;AAC3B;;AAEA;IACI,2BAA2B;IAC3B,cAAc;IACd,YAAY;IACZ,uBAAuB;IACvB,2BAA2B;IAC3B,0BAA0B;IAC1B,wBAAwB;IACxB,uBAAuB;IACvB,WAAW;EACb;;AAEF;;;;;EAKE,SAAS;EACT,OAAO;EACP,kBAAkB;EAClB,QAAQ;EACR,MAAM;AACR;;AAEA;;EAEE,gBAAgB;AAClB;;AAEA;EACE,sBAAsB;EACtB,UAAU;AACZ;;AAEA;EACE,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,cAAc;EACd,YAAY;EACZ,uBAAuB;EACvB,uCAAuC;EACvC,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,cAAc;EACd,YAAY;EACZ,kBAAkB;AACpB;;AAEA;IACI,wBAAwB;IACxB,qBAAqB;IACrB,sBAAsB;IACtB,OAAO;IACP,mBAAmB;IACnB,WAAW;EACb;;AAEF;IACI,sBAAsB;IACtB,uBAAuB;IACvB,YAAY;IACZ,oBAAoB;IACpB,MAAM;IACN,qBAAqB;EACvB;;AAEF;EACE,cAAc;EACd,SAAS;EACT,SAAS;EACT,aAAa;EACb,kBAAkB;EAClB,QAAQ;EACR,QAAQ;AACV;;AAEA;;IAEI,sBAAsB;IACtB,YAAY;IACZ,cAAc;IACd,kBAAkB;EACpB;;AAEF;IACI,WAAW;IACX,UAAU;IACV,MAAM;IACN,UAAU;EACZ;;AAEF;IACI,WAAW;IACX,OAAO;IACP,SAAS;IACT,UAAU;EACZ;;AAEF;;;EAGE,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,sBAAsB;EACtB,OAAO;EACP,MAAM;AACR;;AAEA;EACE,sBAAsB;AACxB;;AAEA;IACI,iBAAiB;IACjB,WAAW;IACX,MAAM;IACN,UAAU;EACZ;;AAEF;IACI,iBAAiB;IACjB,WAAW;IACX,OAAO;IACP,SAAS;EACX;;AAEF;IACI,iBAAiB;IACjB,UAAU;IACV,MAAM;IACN,UAAU;EACZ;;AAEF;IACI,YAAY;IACZ,iBAAiB;IACjB,WAAW;IACX,OAAO;EACT;;AAEF;EACE,sBAAsB;EACtB,WAAW;EACX,aAAa;EACb,UAAU;AACZ;;AAEA;IACI,iBAAiB;IACjB,gBAAgB;IAChB,WAAW;IACX,QAAQ;EACV;;AAEF;IACI,iBAAiB;IACjB,SAAS;IACT,iBAAiB;IACjB,SAAS;EACX;;AAEF;IACI,iBAAiB;IACjB,UAAU;IACV,gBAAgB;IAChB,QAAQ;EACV;;AAEF;IACI,YAAY;IACZ,gBAAgB;IAChB,SAAS;IACT,iBAAiB;EACnB;;AAEF;IACI,mBAAmB;IACnB,WAAW;IACX,SAAS;EACX;;AAEF;IACI,mBAAmB;IACnB,UAAU;IACV,SAAS;EACX;;AAEF;IACI,YAAY;IACZ,mBAAmB;IACnB,UAAU;EACZ;;AAEF;IACI,YAAY;IACZ,mBAAmB;IACnB,YAAY;IACZ,UAAU;IACV,WAAW;IACX,WAAW;EACb;;AAEF;;AAEA;MACM,YAAY;MACZ,WAAW;EACf;IACE;;AAEJ;;AAEA;MACM,YAAY;MACZ,WAAW;EACf;IACE;;AAEJ;;AAEA;MACM,WAAW;MACX,aAAa;MACb,UAAU;EACd;IACE;;AAEJ;IACI,sBAAsB;IACtB,YAAY;IACZ,YAAY;IACZ,cAAc;IACd,YAAY;IACZ,UAAU;IACV,kBAAkB;IAClB,WAAW;IACX,WAAW;EACb;;AAEF;EACE,UAAU;AACZ;;AAEA;EACE,+QAA+Q;AACjR;;AAEA;EACE,cAAc;EACd,SAAS;EACT,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;AACnB;;AAEA;;;;EAIE,mBAAmB;AACrB","sourcesContent":["/*!\n * Cropper.js v1.6.2\n * https://fengyuanchen.github.io/cropperjs\n *\n * Copyright 2015-present Chen Fengyuan\n * Released under the MIT license\n *\n * Date: 2024-04-21T07:43:02.731Z\n */\n\n.cropper-container {\n  direction: ltr;\n  font-size: 0;\n  line-height: 0;\n  position: relative;\n  -ms-touch-action: none;\n      touch-action: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.cropper-container img {\n    backface-visibility: hidden;\n    display: block;\n    height: 100%;\n    image-orientation: 0deg;\n    max-height: none !important;\n    max-width: none !important;\n    min-height: 0 !important;\n    min-width: 0 !important;\n    width: 100%;\n  }\n\n.cropper-wrap-box,\n.cropper-canvas,\n.cropper-drag-box,\n.cropper-crop-box,\n.cropper-modal {\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.cropper-wrap-box,\n.cropper-canvas {\n  overflow: hidden;\n}\n\n.cropper-drag-box {\n  background-color: #fff;\n  opacity: 0;\n}\n\n.cropper-modal {\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.cropper-view-box {\n  display: block;\n  height: 100%;\n  outline: 1px solid #39f;\n  outline-color: rgba(51, 153, 255, 0.75);\n  overflow: hidden;\n  width: 100%;\n}\n\n.cropper-dashed {\n  border: 0 dashed #eee;\n  display: block;\n  opacity: 0.5;\n  position: absolute;\n}\n\n.cropper-dashed.dashed-h {\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    height: calc(100% / 3);\n    left: 0;\n    top: calc(100% / 3);\n    width: 100%;\n  }\n\n.cropper-dashed.dashed-v {\n    border-left-width: 1px;\n    border-right-width: 1px;\n    height: 100%;\n    left: calc(100% / 3);\n    top: 0;\n    width: calc(100% / 3);\n  }\n\n.cropper-center {\n  display: block;\n  height: 0;\n  left: 50%;\n  opacity: 0.75;\n  position: absolute;\n  top: 50%;\n  width: 0;\n}\n\n.cropper-center::before,\n  .cropper-center::after {\n    background-color: #eee;\n    content: ' ';\n    display: block;\n    position: absolute;\n  }\n\n.cropper-center::before {\n    height: 1px;\n    left: -3px;\n    top: 0;\n    width: 7px;\n  }\n\n.cropper-center::after {\n    height: 7px;\n    left: 0;\n    top: -3px;\n    width: 1px;\n  }\n\n.cropper-face,\n.cropper-line,\n.cropper-point {\n  display: block;\n  height: 100%;\n  opacity: 0.1;\n  position: absolute;\n  width: 100%;\n}\n\n.cropper-face {\n  background-color: #fff;\n  left: 0;\n  top: 0;\n}\n\n.cropper-line {\n  background-color: #39f;\n}\n\n.cropper-line.line-e {\n    cursor: ew-resize;\n    right: -3px;\n    top: 0;\n    width: 5px;\n  }\n\n.cropper-line.line-n {\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n    top: -3px;\n  }\n\n.cropper-line.line-w {\n    cursor: ew-resize;\n    left: -3px;\n    top: 0;\n    width: 5px;\n  }\n\n.cropper-line.line-s {\n    bottom: -3px;\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n  }\n\n.cropper-point {\n  background-color: #39f;\n  height: 5px;\n  opacity: 0.75;\n  width: 5px;\n}\n\n.cropper-point.point-e {\n    cursor: ew-resize;\n    margin-top: -3px;\n    right: -3px;\n    top: 50%;\n  }\n\n.cropper-point.point-n {\n    cursor: ns-resize;\n    left: 50%;\n    margin-left: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-w {\n    cursor: ew-resize;\n    left: -3px;\n    margin-top: -3px;\n    top: 50%;\n  }\n\n.cropper-point.point-s {\n    bottom: -3px;\n    cursor: s-resize;\n    left: 50%;\n    margin-left: -3px;\n  }\n\n.cropper-point.point-ne {\n    cursor: nesw-resize;\n    right: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-nw {\n    cursor: nwse-resize;\n    left: -3px;\n    top: -3px;\n  }\n\n.cropper-point.point-sw {\n    bottom: -3px;\n    cursor: nesw-resize;\n    left: -3px;\n  }\n\n.cropper-point.point-se {\n    bottom: -3px;\n    cursor: nwse-resize;\n    height: 20px;\n    opacity: 1;\n    right: -3px;\n    width: 20px;\n  }\n\n@media (min-width: 768px) {\n\n.cropper-point.point-se {\n      height: 15px;\n      width: 15px;\n  }\n    }\n\n@media (min-width: 992px) {\n\n.cropper-point.point-se {\n      height: 10px;\n      width: 10px;\n  }\n    }\n\n@media (min-width: 1200px) {\n\n.cropper-point.point-se {\n      height: 5px;\n      opacity: 0.75;\n      width: 5px;\n  }\n    }\n\n.cropper-point.point-se::before {\n    background-color: #39f;\n    bottom: -50%;\n    content: ' ';\n    display: block;\n    height: 200%;\n    opacity: 0;\n    position: absolute;\n    right: -50%;\n    width: 200%;\n  }\n\n.cropper-invisible {\n  opacity: 0;\n}\n\n.cropper-bg {\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n}\n\n.cropper-hide {\n  display: block;\n  height: 0;\n  position: absolute;\n  width: 0;\n}\n\n.cropper-hidden {\n  display: none !important;\n}\n\n.cropper-move {\n  cursor: move;\n}\n\n.cropper-crop {\n  cursor: crosshair;\n}\n\n.cropper-disabled .cropper-drag-box,\n.cropper-disabled .cropper-face,\n.cropper-disabled .cropper-line,\n.cropper-disabled .cropper-point {\n  cursor: not-allowed;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/has-cors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/has-cors.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasCORS: () => (/* binding */ hasCORS)
/* harmony export */ });
// imported from https://github.com/component/has-cors
let value = false;
try {
    value = typeof XMLHttpRequest !== 'undefined' &&
        'withCredentials' in new XMLHttpRequest();
}
catch (err) {
    // if XMLHttp support is disabled in IE then it will throw
    // when trying to create
}
const hasCORS = value;


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js":
/*!********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseqs.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/galkn/querystring
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */
function encode(obj) {
    let str = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (str.length)
                str += '&';
            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
        }
    }
    return str;
}
/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */
function decode(qs) {
    let qry = {};
    let pairs = qs.split('&');
    for (let i = 0, l = pairs.length; i < l; i++) {
        let pair = pairs[i].split('=');
        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/contrib/parseuri.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse)
/* harmony export */ });
// imported from https://github.com/galkn/parseuri
/**
 * Parses a URI
 *
 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
 *
 * See:
 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
 * - https://caniuse.com/url
 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
 *
 * History of the parse() method:
 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];
function parse(str) {
    if (str.length > 8000) {
        throw "URI too long";
    }
    const src = str, b = str.indexOf('['), e = str.indexOf(']');
    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }
    let m = re.exec(str || ''), uri = {}, i = 14;
    while (i--) {
        uri[parts[i]] = m[i] || '';
    }
    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri['path']);
    uri.queryKey = queryKey(uri, uri['query']);
    return uri;
}
function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == '/' || path.length === 0) {
        names.splice(0, 1);
    }
    if (path.slice(-1) == '/') {
        names.splice(names.length - 1, 1);
    }
    return names;
}
function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
        if ($1) {
            data[$1] = $2;
        }
    });
    return data;
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/globals.js":
/*!************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/globals.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCookieJar: () => (/* binding */ createCookieJar),
/* harmony export */   defaultBinaryType: () => (/* binding */ defaultBinaryType),
/* harmony export */   globalThisShim: () => (/* binding */ globalThisShim),
/* harmony export */   nextTick: () => (/* binding */ nextTick)
/* harmony export */ });
const nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
        return (cb) => Promise.resolve().then(cb);
    }
    else {
        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
})();
const globalThisShim = (() => {
    if (typeof self !== "undefined") {
        return self;
    }
    else if (typeof window !== "undefined") {
        return window;
    }
    else {
        return Function("return this")();
    }
})();
const defaultBinaryType = "arraybuffer";
function createCookieJar() { }


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fetch: () => (/* reexport safe */ _transports_polling_fetch_js__WEBPACK_IMPORTED_MODULE_6__.Fetch),
/* harmony export */   NodeWebSocket: () => (/* reexport safe */ _transports_websocket_node_js__WEBPACK_IMPORTED_MODULE_8__.WS),
/* harmony export */   NodeXHR: () => (/* reexport safe */ _transports_polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_7__.XHR),
/* harmony export */   Socket: () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket),
/* harmony export */   SocketWithUpgrade: () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.SocketWithUpgrade),
/* harmony export */   SocketWithoutUpgrade: () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_0__.SocketWithoutUpgrade),
/* harmony export */   Transport: () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.Transport),
/* harmony export */   TransportError: () => (/* reexport safe */ _transport_js__WEBPACK_IMPORTED_MODULE_1__.TransportError),
/* harmony export */   WebSocket: () => (/* reexport safe */ _transports_websocket_node_js__WEBPACK_IMPORTED_MODULE_8__.WS),
/* harmony export */   WebTransport: () => (/* reexport safe */ _transports_webtransport_js__WEBPACK_IMPORTED_MODULE_9__.WT),
/* harmony export */   XHR: () => (/* reexport safe */ _transports_polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_7__.XHR),
/* harmony export */   installTimerFunctions: () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_3__.installTimerFunctions),
/* harmony export */   nextTick: () => (/* reexport safe */ _globals_node_js__WEBPACK_IMPORTED_MODULE_5__.nextTick),
/* harmony export */   parse: () => (/* reexport safe */ _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__.parse),
/* harmony export */   protocol: () => (/* binding */ protocol),
/* harmony export */   transports: () => (/* reexport safe */ _transports_index_js__WEBPACK_IMPORTED_MODULE_2__.transports)
/* harmony export */ });
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./socket.js */ "./node_modules/engine.io-client/build/esm/socket.js");
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/esm/transports/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/parseuri.js */ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");
/* harmony import */ var _transports_polling_fetch_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transports/polling-fetch.js */ "./node_modules/engine.io-client/build/esm/transports/polling-fetch.js");
/* harmony import */ var _transports_polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transports/polling-xhr.js */ "./node_modules/engine.io-client/build/esm/transports/polling-xhr.js");
/* harmony import */ var _transports_websocket_node_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transports/websocket.js */ "./node_modules/engine.io-client/build/esm/transports/websocket.js");
/* harmony import */ var _transports_webtransport_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./transports/webtransport.js */ "./node_modules/engine.io-client/build/esm/transports/webtransport.js");



const protocol = _socket_js__WEBPACK_IMPORTED_MODULE_0__.Socket.protocol;













/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/socket.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Socket: () => (/* binding */ Socket),
/* harmony export */   SocketWithUpgrade: () => (/* binding */ SocketWithUpgrade),
/* harmony export */   SocketWithoutUpgrade: () => (/* binding */ SocketWithoutUpgrade)
/* harmony export */ });
/* harmony import */ var _transports_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transports/index.js */ "./node_modules/engine.io-client/build/esm/transports/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contrib/parseqs.js */ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js");
/* harmony import */ var _contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseuri.js */ "./node_modules/engine.io-client/build/esm/contrib/parseuri.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");







const withEventListeners = typeof addEventListener === "function" &&
    typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) {
    // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
    // script, so we create one single event listener here which will forward the event to the socket instances
    addEventListener("offline", () => {
        OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
    }, false);
}
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
 *
 * This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
 * successfully establishes the connection.
 *
 * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
 *
 * @example
 * import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
 *
 * const socket = new SocketWithoutUpgrade({
 *   transports: [WebSocket]
 * });
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 * @see SocketWithUpgrade
 * @see Socket
 */
class SocketWithoutUpgrade extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_4__.Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts) {
        super();
        this.binaryType = _globals_node_js__WEBPACK_IMPORTED_MODULE_6__.defaultBinaryType;
        this.writeBuffer = [];
        this._prevBufferLen = 0;
        this._pingInterval = -1;
        this._pingTimeout = -1;
        this._maxPayload = -1;
        /**
         * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
         * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
         */
        this._pingTimeoutTime = Infinity;
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = null;
        }
        if (uri) {
            const parsedUri = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(uri);
            opts.hostname = parsedUri.host;
            opts.secure =
                parsedUri.protocol === "https" || parsedUri.protocol === "wss";
            opts.port = parsedUri.port;
            if (parsedUri.query)
                opts.query = parsedUri.query;
        }
        else if (opts.host) {
            opts.hostname = (0,_contrib_parseuri_js__WEBPACK_IMPORTED_MODULE_3__.parse)(opts.host).host;
        }
        (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.installTimerFunctions)(this, opts);
        this.secure =
            null != opts.secure
                ? opts.secure
                : typeof location !== "undefined" && "https:" === location.protocol;
        if (opts.hostname && !opts.port) {
            // if no port is specified manually, use the protocol default
            opts.port = this.secure ? "443" : "80";
        }
        this.hostname =
            opts.hostname ||
                (typeof location !== "undefined" ? location.hostname : "localhost");
        this.port =
            opts.port ||
                (typeof location !== "undefined" && location.port
                    ? location.port
                    : this.secure
                        ? "443"
                        : "80");
        this.transports = [];
        this._transportsByName = {};
        opts.transports.forEach((t) => {
            const transportName = t.prototype.name;
            this.transports.push(transportName);
            this._transportsByName[transportName] = t;
        });
        this.opts = Object.assign({
            path: "/engine.io",
            agent: false,
            withCredentials: false,
            upgrade: true,
            timestampParam: "t",
            rememberUpgrade: false,
            addTrailingSlash: true,
            rejectUnauthorized: true,
            perMessageDeflate: {
                threshold: 1024,
            },
            transportOptions: {},
            closeOnBeforeunload: false,
        }, opts);
        this.opts.path =
            this.opts.path.replace(/\/$/, "") +
                (this.opts.addTrailingSlash ? "/" : "");
        if (typeof this.opts.query === "string") {
            this.opts.query = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_2__.decode)(this.opts.query);
        }
        if (withEventListeners) {
            if (this.opts.closeOnBeforeunload) {
                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
                // closed/reloaded)
                this._beforeunloadEventListener = () => {
                    if (this.transport) {
                        // silently close the transport
                        this.transport.removeAllListeners();
                        this.transport.close();
                    }
                };
                addEventListener("beforeunload", this._beforeunloadEventListener, false);
            }
            if (this.hostname !== "localhost") {
                this._offlineEventListener = () => {
                    this._onClose("transport close", {
                        description: "network connection lost",
                    });
                };
                OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
            }
        }
        if (this.opts.withCredentials) {
            this._cookieJar = (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_6__.createCookieJar)();
        }
        this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
        const query = Object.assign({}, this.opts.query);
        // append engine.io protocol identifier
        query.EIO = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
        // transport name
        query.transport = name;
        // session id if we already have one
        if (this.id)
            query.sid = this.id;
        const opts = Object.assign({}, this.opts, {
            query,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port,
        }, this.opts.transportOptions[name]);
        return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    _open() {
        if (this.transports.length === 0) {
            // Emit error on next tick so it can be listened to
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
            }, 0);
            return;
        }
        const transportName = this.opts.rememberUpgrade &&
            SocketWithoutUpgrade.priorWebsocketSuccess &&
            this.transports.indexOf("websocket") !== -1
            ? "websocket"
            : this.transports[0];
        this.readyState = "opening";
        const transport = this.createTransport(transportName);
        transport.open();
        this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
        if (this.transport) {
            this.transport.removeAllListeners();
        }
        // set up transport
        this.transport = transport;
        // set up transport listeners
        transport
            .on("drain", this._onDrain.bind(this))
            .on("packet", this._onPacket.bind(this))
            .on("error", this._onError.bind(this))
            .on("close", (reason) => this._onClose("transport close", reason));
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
        this.readyState = "open";
        SocketWithoutUpgrade.priorWebsocketSuccess =
            "websocket" === this.transport.name;
        this.emitReserved("open");
        this.flush();
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    _onPacket(packet) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            this.emitReserved("packet", packet);
            // Socket is live - any packet counts
            this.emitReserved("heartbeat");
            switch (packet.type) {
                case "open":
                    this.onHandshake(JSON.parse(packet.data));
                    break;
                case "ping":
                    this._sendPacket("pong");
                    this.emitReserved("ping");
                    this.emitReserved("pong");
                    this._resetPingTimeout();
                    break;
                case "error":
                    const err = new Error("server error");
                    // @ts-ignore
                    err.code = packet.data;
                    this._onError(err);
                    break;
                case "message":
                    this.emitReserved("data", packet.data);
                    this.emitReserved("message", packet.data);
                    break;
            }
        }
        else {
        }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
        this.emitReserved("handshake", data);
        this.id = data.sid;
        this.transport.query.sid = data.sid;
        this._pingInterval = data.pingInterval;
        this._pingTimeout = data.pingTimeout;
        this._maxPayload = data.maxPayload;
        this.onOpen();
        // In case open handler closes socket
        if ("closed" === this.readyState)
            return;
        this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    _resetPingTimeout() {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        const delay = this._pingInterval + this._pingTimeout;
        this._pingTimeoutTime = Date.now() + delay;
        this._pingTimeoutTimer = this.setTimeoutFn(() => {
            this._onClose("ping timeout");
        }, delay);
        if (this.opts.autoUnref) {
            this._pingTimeoutTimer.unref();
        }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    _onDrain() {
        this.writeBuffer.splice(0, this._prevBufferLen);
        // setting prevBufferLen = 0 is very important
        // for example, when upgrading, upgrade packet is sent over,
        // and a nonzero prevBufferLen could cause problems on `drain`
        this._prevBufferLen = 0;
        if (0 === this.writeBuffer.length) {
            this.emitReserved("drain");
        }
        else {
            this.flush();
        }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
        if ("closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length) {
            const packets = this._getWritablePackets();
            this.transport.send(packets);
            // keep track of current length of writeBuffer
            // splice writeBuffer and callbackBuffer on `drain`
            this._prevBufferLen = packets.length;
            this.emitReserved("flush");
        }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    _getWritablePackets() {
        const shouldCheckPayloadSize = this._maxPayload &&
            this.transport.name === "polling" &&
            this.writeBuffer.length > 1;
        if (!shouldCheckPayloadSize) {
            return this.writeBuffer;
        }
        let payloadSize = 1; // first packet type
        for (let i = 0; i < this.writeBuffer.length; i++) {
            const data = this.writeBuffer[i].data;
            if (data) {
                payloadSize += (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.byteLength)(data);
            }
            if (i > 0 && payloadSize > this._maxPayload) {
                return this.writeBuffer.slice(0, i);
            }
            payloadSize += 2; // separator + packet type
        }
        return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */
    /* private */ _hasPingExpired() {
        if (!this._pingTimeoutTime)
            return true;
        const hasExpired = Date.now() > this._pingTimeoutTime;
        if (hasExpired) {
            this._pingTimeoutTime = 0;
            (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_6__.nextTick)(() => {
                this._onClose("ping timeout");
            }, this.setTimeoutFn);
        }
        return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    send(msg, options, fn) {
        this._sendPacket("message", msg, options, fn);
        return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    _sendPacket(type, data, options, fn) {
        if ("function" === typeof data) {
            fn = data;
            data = undefined;
        }
        if ("function" === typeof options) {
            fn = options;
            options = null;
        }
        if ("closing" === this.readyState || "closed" === this.readyState) {
            return;
        }
        options = options || {};
        options.compress = false !== options.compress;
        const packet = {
            type: type,
            data: data,
            options: options,
        };
        this.emitReserved("packetCreate", packet);
        this.writeBuffer.push(packet);
        if (fn)
            this.once("flush", fn);
        this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
        const close = () => {
            this._onClose("forced close");
            this.transport.close();
        };
        const cleanupAndClose = () => {
            this.off("upgrade", cleanupAndClose);
            this.off("upgradeError", cleanupAndClose);
            close();
        };
        const waitForUpgrade = () => {
            // wait for upgrade to finish since we can't send packets while pausing a transport
            this.once("upgrade", cleanupAndClose);
            this.once("upgradeError", cleanupAndClose);
        };
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            if (this.writeBuffer.length) {
                this.once("drain", () => {
                    if (this.upgrading) {
                        waitForUpgrade();
                    }
                    else {
                        close();
                    }
                });
            }
            else if (this.upgrading) {
                waitForUpgrade();
            }
            else {
                close();
            }
        }
        return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    _onError(err) {
        SocketWithoutUpgrade.priorWebsocketSuccess = false;
        if (this.opts.tryAllTransports &&
            this.transports.length > 1 &&
            this.readyState === "opening") {
            this.transports.shift();
            return this._open();
        }
        this.emitReserved("error", err);
        this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    _onClose(reason, description) {
        if ("opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState) {
            // clear timers
            this.clearTimeoutFn(this._pingTimeoutTimer);
            // stop event from firing again for transport
            this.transport.removeAllListeners("close");
            // ensure transport won't stay open
            this.transport.close();
            // ignore further transport communication
            this.transport.removeAllListeners();
            if (withEventListeners) {
                if (this._beforeunloadEventListener) {
                    removeEventListener("beforeunload", this._beforeunloadEventListener, false);
                }
                if (this._offlineEventListener) {
                    const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
                    if (i !== -1) {
                        OFFLINE_EVENT_LISTENERS.splice(i, 1);
                    }
                }
            }
            // set ready state
            this.readyState = "closed";
            // clear session id
            this.id = null;
            // emit close event
            this.emitReserved("close", reason, description);
            // clean buffers after, so users can still
            // grab the buffers on `close` event
            this.writeBuffer = [];
            this._prevBufferLen = 0;
        }
    }
}
SocketWithoutUpgrade.protocol = engine_io_parser__WEBPACK_IMPORTED_MODULE_5__.protocol;
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
 *
 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
 * low-level transport, it will try to upgrade to a better transport.
 *
 * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
 *
 * @example
 * import { SocketWithUpgrade, WebSocket } from "engine.io-client";
 *
 * const socket = new SocketWithUpgrade({
 *   transports: [WebSocket]
 * });
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 * @see SocketWithoutUpgrade
 * @see Socket
 */
class SocketWithUpgrade extends SocketWithoutUpgrade {
    constructor() {
        super(...arguments);
        this._upgrades = [];
    }
    onOpen() {
        super.onOpen();
        if ("open" === this.readyState && this.opts.upgrade) {
            for (let i = 0; i < this._upgrades.length; i++) {
                this._probe(this._upgrades[i]);
            }
        }
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    _probe(name) {
        let transport = this.createTransport(name);
        let failed = false;
        SocketWithoutUpgrade.priorWebsocketSuccess = false;
        const onTransportOpen = () => {
            if (failed)
                return;
            transport.send([{ type: "ping", data: "probe" }]);
            transport.once("packet", (msg) => {
                if (failed)
                    return;
                if ("pong" === msg.type && "probe" === msg.data) {
                    this.upgrading = true;
                    this.emitReserved("upgrading", transport);
                    if (!transport)
                        return;
                    SocketWithoutUpgrade.priorWebsocketSuccess =
                        "websocket" === transport.name;
                    this.transport.pause(() => {
                        if (failed)
                            return;
                        if ("closed" === this.readyState)
                            return;
                        cleanup();
                        this.setTransport(transport);
                        transport.send([{ type: "upgrade" }]);
                        this.emitReserved("upgrade", transport);
                        transport = null;
                        this.upgrading = false;
                        this.flush();
                    });
                }
                else {
                    const err = new Error("probe error");
                    // @ts-ignore
                    err.transport = transport.name;
                    this.emitReserved("upgradeError", err);
                }
            });
        };
        function freezeTransport() {
            if (failed)
                return;
            // Any callback called by transport should be ignored since now
            failed = true;
            cleanup();
            transport.close();
            transport = null;
        }
        // Handle any error that happens while probing
        const onerror = (err) => {
            const error = new Error("probe error: " + err);
            // @ts-ignore
            error.transport = transport.name;
            freezeTransport();
            this.emitReserved("upgradeError", error);
        };
        function onTransportClose() {
            onerror("transport closed");
        }
        // When the socket is closed while we're probing
        function onclose() {
            onerror("socket closed");
        }
        // When the socket is upgraded while we're probing
        function onupgrade(to) {
            if (transport && to.name !== transport.name) {
                freezeTransport();
            }
        }
        // Remove all listeners on the transport and on self
        const cleanup = () => {
            transport.removeListener("open", onTransportOpen);
            transport.removeListener("error", onerror);
            transport.removeListener("close", onTransportClose);
            this.off("close", onclose);
            this.off("upgrading", onupgrade);
        };
        transport.once("open", onTransportOpen);
        transport.once("error", onerror);
        transport.once("close", onTransportClose);
        this.once("close", onclose);
        this.once("upgrading", onupgrade);
        if (this._upgrades.indexOf("webtransport") !== -1 &&
            name !== "webtransport") {
            // favor WebTransport
            this.setTimeoutFn(() => {
                if (!failed) {
                    transport.open();
                }
            }, 200);
        }
        else {
            transport.open();
        }
    }
    onHandshake(data) {
        this._upgrades = this._filterUpgrades(data.upgrades);
        super.onHandshake(data);
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    _filterUpgrades(upgrades) {
        const filteredUpgrades = [];
        for (let i = 0; i < upgrades.length; i++) {
            if (~this.transports.indexOf(upgrades[i]))
                filteredUpgrades.push(upgrades[i]);
        }
        return filteredUpgrades;
    }
}
/**
 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
 *
 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
 * low-level transport, it will try to upgrade to a better transport.
 *
 * @example
 * import { Socket } from "engine.io-client";
 *
 * const socket = new Socket();
 *
 * socket.on("open", () => {
 *   socket.send("hello");
 * });
 *
 * @see SocketWithoutUpgrade
 * @see SocketWithUpgrade
 */
class Socket extends SocketWithUpgrade {
    constructor(uri, opts = {}) {
        const o = typeof uri === "object" ? uri : opts;
        if (!o.transports ||
            (o.transports && typeof o.transports[0] === "string")) {
            o.transports = (o.transports || ["polling", "websocket", "webtransport"])
                .map((transportName) => _transports_index_js__WEBPACK_IMPORTED_MODULE_0__.transports[transportName])
                .filter((t) => !!t);
        }
        super(uri, o);
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transport.js":
/*!**************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transport.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transport: () => (/* binding */ Transport),
/* harmony export */   TransportError: () => (/* binding */ TransportError)
/* harmony export */ });
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contrib/parseqs.js */ "./node_modules/engine.io-client/build/esm/contrib/parseqs.js");




class TransportError extends Error {
    constructor(reason, description, context) {
        super(reason);
        this.description = description;
        this.context = context;
        this.type = "TransportError";
    }
}
class Transport extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
        super();
        this.writable = false;
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this.opts = opts;
        this.query = opts.query;
        this.socket = opts.socket;
        this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
        super.emitReserved("error", new TransportError(reason, description, context));
        return this;
    }
    /**
     * Opens the transport.
     */
    open() {
        this.readyState = "opening";
        this.doOpen();
        return this;
    }
    /**
     * Closes the transport.
     */
    close() {
        if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
        }
        return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
        if (this.readyState === "open") {
            this.write(packets);
        }
        else {
            // this might happen if the transport was silently closed in the beforeunload event handler
        }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
        this.readyState = "open";
        this.writable = true;
        super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
        const packet = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_0__.decodePacket)(data, this.socket.binaryType);
        this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
        super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
        this.readyState = "closed";
        super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) { }
    createUri(schema, query = {}) {
        return (schema +
            "://" +
            this._hostname() +
            this._port() +
            this.opts.path +
            this._query(query));
    }
    _hostname() {
        const hostname = this.opts.hostname;
        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
        if (this.opts.port &&
            ((this.opts.secure && Number(this.opts.port !== 443)) ||
                (!this.opts.secure && Number(this.opts.port) !== 80))) {
            return ":" + this.opts.port;
        }
        else {
            return "";
        }
    }
    _query(query) {
        const encodedQuery = (0,_contrib_parseqs_js__WEBPACK_IMPORTED_MODULE_3__.encode)(query);
        return encodedQuery.length ? "?" + encodedQuery : "";
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transports: () => (/* binding */ transports)
/* harmony export */ });
/* harmony import */ var _polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling-xhr.node.js */ "./node_modules/engine.io-client/build/esm/transports/polling-xhr.js");
/* harmony import */ var _websocket_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./websocket.node.js */ "./node_modules/engine.io-client/build/esm/transports/websocket.js");
/* harmony import */ var _webtransport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./webtransport.js */ "./node_modules/engine.io-client/build/esm/transports/webtransport.js");



const transports = {
    websocket: _websocket_node_js__WEBPACK_IMPORTED_MODULE_1__.WS,
    webtransport: _webtransport_js__WEBPACK_IMPORTED_MODULE_2__.WT,
    polling: _polling_xhr_node_js__WEBPACK_IMPORTED_MODULE_0__.XHR,
};


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/polling-fetch.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling-fetch.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fetch: () => (/* binding */ Fetch)
/* harmony export */ });
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/esm/transports/polling.js");

/**
 * HTTP long-polling based on the built-in `fetch()` method.
 *
 * Usage: browser, Node.js (since v18), Deno, Bun
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * @see https://caniuse.com/fetch
 * @see https://nodejs.org/api/globals.html#fetch
 */
class Fetch extends _polling_js__WEBPACK_IMPORTED_MODULE_0__.Polling {
    doPoll() {
        this._fetch()
            .then((res) => {
            if (!res.ok) {
                return this.onError("fetch read error", res.status, res);
            }
            res.text().then((data) => this.onData(data));
        })
            .catch((err) => {
            this.onError("fetch read error", err);
        });
    }
    doWrite(data, callback) {
        this._fetch(data)
            .then((res) => {
            if (!res.ok) {
                return this.onError("fetch write error", res.status, res);
            }
            callback();
        })
            .catch((err) => {
            this.onError("fetch write error", err);
        });
    }
    _fetch(data) {
        var _a;
        const isPost = data !== undefined;
        const headers = new Headers(this.opts.extraHeaders);
        if (isPost) {
            headers.set("content-type", "text/plain;charset=UTF-8");
        }
        (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
        return fetch(this.uri(), {
            method: isPost ? "POST" : "GET",
            body: isPost ? data : null,
            headers,
            credentials: this.opts.withCredentials ? "include" : "omit",
        }).then((res) => {
            var _a;
            // @ts-ignore getSetCookie() was added in Node.js v19.7.0
            (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(res.headers.getSetCookie());
            return res;
        });
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/polling-xhr.js":
/*!***************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling-xhr.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseXHR: () => (/* binding */ BaseXHR),
/* harmony export */   Request: () => (/* binding */ Request),
/* harmony export */   XHR: () => (/* binding */ XHR)
/* harmony export */ });
/* harmony import */ var _polling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polling.js */ "./node_modules/engine.io-client/build/esm/transports/polling.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");
/* harmony import */ var _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contrib/has-cors.js */ "./node_modules/engine.io-client/build/esm/contrib/has-cors.js");





function empty() { }
class BaseXHR extends _polling_js__WEBPACK_IMPORTED_MODULE_0__.Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
        super(opts);
        if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port;
            // some user agents have empty `location.port`
            if (!port) {
                port = isSSL ? "443" : "80";
            }
            this.xd =
                (typeof location !== "undefined" &&
                    opts.hostname !== location.hostname) ||
                    port !== opts.port;
        }
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
        const req = this.request({
            method: "POST",
            data: data,
        });
        req.on("success", fn);
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
        });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
        const req = this.request();
        req.on("data", this.onData.bind(this));
        req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
        });
        this.pollXhr = req;
    }
}
class Request extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_1__.Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(createRequest, uri, opts) {
        super();
        this.createRequest = createRequest;
        (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.installTimerFunctions)(this, opts);
        this._opts = opts;
        this._method = opts.method || "GET";
        this._uri = uri;
        this._data = undefined !== opts.data ? opts.data : null;
        this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    _create() {
        var _a;
        const opts = (0,_util_js__WEBPACK_IMPORTED_MODULE_2__.pick)(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        opts.xdomain = !!this._opts.xd;
        const xhr = (this._xhr = this.createRequest(opts));
        try {
            xhr.open(this._method, this._uri, true);
            try {
                if (this._opts.extraHeaders) {
                    // @ts-ignore
                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
                    for (let i in this._opts.extraHeaders) {
                        if (this._opts.extraHeaders.hasOwnProperty(i)) {
                            xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
                        }
                    }
                }
            }
            catch (e) { }
            if ("POST" === this._method) {
                try {
                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                }
                catch (e) { }
            }
            try {
                xhr.setRequestHeader("Accept", "*/*");
            }
            catch (e) { }
            (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
            // ie6 check
            if ("withCredentials" in xhr) {
                xhr.withCredentials = this._opts.withCredentials;
            }
            if (this._opts.requestTimeout) {
                xhr.timeout = this._opts.requestTimeout;
            }
            xhr.onreadystatechange = () => {
                var _a;
                if (xhr.readyState === 3) {
                    (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(
                    // @ts-ignore
                    xhr.getResponseHeader("set-cookie"));
                }
                if (4 !== xhr.readyState)
                    return;
                if (200 === xhr.status || 1223 === xhr.status) {
                    this._onLoad();
                }
                else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    this.setTimeoutFn(() => {
                        this._onError(typeof xhr.status === "number" ? xhr.status : 0);
                    }, 0);
                }
            };
            xhr.send(this._data);
        }
        catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
                this._onError(e);
            }, 0);
            return;
        }
        if (typeof document !== "undefined") {
            this._index = Request.requestsCount++;
            Request.requests[this._index] = this;
        }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    _onError(err) {
        this.emitReserved("error", err, this._xhr);
        this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    _cleanup(fromError) {
        if ("undefined" === typeof this._xhr || null === this._xhr) {
            return;
        }
        this._xhr.onreadystatechange = empty;
        if (fromError) {
            try {
                this._xhr.abort();
            }
            catch (e) { }
        }
        if (typeof document !== "undefined") {
            delete Request.requests[this._index];
        }
        this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    _onLoad() {
        const data = this._xhr.responseText;
        if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");
            this._cleanup();
        }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
        this._cleanup();
    }
}
Request.requestsCount = 0;
Request.requests = {};
/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */
if (typeof document !== "undefined") {
    // @ts-ignore
    if (typeof attachEvent === "function") {
        // @ts-ignore
        attachEvent("onunload", unloadHandler);
    }
    else if (typeof addEventListener === "function") {
        const terminationEvent = "onpagehide" in _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim ? "pagehide" : "unload";
        addEventListener(terminationEvent, unloadHandler, false);
    }
}
function unloadHandler() {
    for (let i in Request.requests) {
        if (Request.requests.hasOwnProperty(i)) {
            Request.requests[i].abort();
        }
    }
}
const hasXHR2 = (function () {
    const xhr = newRequest({
        xdomain: false,
    });
    return xhr && xhr.responseType !== null;
})();
/**
 * HTTP long-polling based on the built-in `XMLHttpRequest` object.
 *
 * Usage: browser
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 */
class XHR extends BaseXHR {
    constructor(opts) {
        super(opts);
        const forceBase64 = opts && opts.forceBase64;
        this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
        Object.assign(opts, { xd: this.xd }, this.opts);
        return new Request(newRequest, this.uri(), opts);
    }
}
function newRequest(opts) {
    const xdomain = opts.xdomain;
    // XMLHttpRequest can be disabled on IE
    try {
        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || _contrib_has_cors_js__WEBPACK_IMPORTED_MODULE_4__.hasCORS)) {
            return new XMLHttpRequest();
        }
    }
    catch (e) { }
    if (!xdomain) {
        try {
            return new _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
        }
        catch (e) { }
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/polling.js":
/*!***********************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/polling.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Polling: () => (/* binding */ Polling)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");



class Polling extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    constructor() {
        super(...arguments);
        this._polling = false;
    }
    get name() {
        return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
        this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
        this.readyState = "pausing";
        const pause = () => {
            this.readyState = "paused";
            onPause();
        };
        if (this._polling || !this.writable) {
            let total = 0;
            if (this._polling) {
                total++;
                this.once("pollComplete", function () {
                    --total || pause();
                });
            }
            if (!this.writable) {
                total++;
                this.once("drain", function () {
                    --total || pause();
                });
            }
        }
        else {
            pause();
        }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    _poll() {
        this._polling = true;
        this.doPoll();
        this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
        const callback = (packet) => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
                this.onOpen();
            }
            // if its a close packet, we close the ongoing requests
            if ("close" === packet.type) {
                this.onClose({ description: "transport closed by the server" });
                return false;
            }
            // otherwise bypass onData and handle the message
            this.onPacket(packet);
        };
        // decode payload
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.decodePayload)(data, this.socket.binaryType).forEach(callback);
        // if an event did not trigger closing
        if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this._polling = false;
            this.emitReserved("pollComplete");
            if ("open" === this.readyState) {
                this._poll();
            }
            else {
            }
        }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
        const close = () => {
            this.write([{ type: "close" }]);
        };
        if ("open" === this.readyState) {
            close();
        }
        else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
        }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
        this.writable = false;
        (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePayload)(packets, (data) => {
            this.doWrite(data, () => {
                this.writable = true;
                this.emitReserved("drain");
            });
        });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "https" : "http";
        const query = this.query || {};
        // cache busting is forced
        if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.randomString)();
        }
        if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/websocket.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/websocket.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseWS: () => (/* binding */ BaseWS),
/* harmony export */   WS: () => (/* binding */ WS)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util.js */ "./node_modules/engine.io-client/build/esm/util.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");




// detect ReactNative environment
const isReactNative = typeof navigator !== "undefined" &&
    typeof navigator.product === "string" &&
    navigator.product.toLowerCase() === "reactnative";
class BaseWS extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    get name() {
        return "websocket";
    }
    doOpen() {
        const uri = this.uri();
        const protocols = this.opts.protocols;
        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
        const opts = isReactNative
            ? {}
            : (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        if (this.opts.extraHeaders) {
            opts.headers = this.opts.extraHeaders;
        }
        try {
            this.ws = this.createSocket(uri, protocols, opts);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this.ws.binaryType = this.socket.binaryType;
        this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
        this.ws.onopen = () => {
            if (this.opts.autoUnref) {
                this.ws._socket.unref();
            }
            this.onOpen();
        };
        this.ws.onclose = (closeEvent) => this.onClose({
            description: "websocket connection closed",
            context: closeEvent,
        });
        this.ws.onmessage = (ev) => this.onData(ev.data);
        this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
        this.writable = false;
        // encodePacket efficient as it uses WS framing
        // no need for encodePayload
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.encodePacket)(packet, this.supportsBinary, (data) => {
                // Sometimes the websocket has already been closed but the browser didn't
                // have a chance of informing us about it yet, in that case send will
                // throw an error
                try {
                    this.doWrite(packet, data);
                }
                catch (e) {
                }
                if (lastPacket) {
                    // fake drain
                    // defer to next tick to allow Socket to clear writeBuffer
                    (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_3__.nextTick)(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        if (typeof this.ws !== "undefined") {
            this.ws.onerror = () => { };
            this.ws.close();
            this.ws = null;
        }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
        const schema = this.opts.secure ? "wss" : "ws";
        const query = this.query || {};
        // append timestamp to URI
        if (this.opts.timestampRequests) {
            query[this.opts.timestampParam] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.randomString)();
        }
        // communicate binary support capabilities
        if (!this.supportsBinary) {
            query.b64 = 1;
        }
        return this.createUri(schema, query);
    }
}
const WebSocketCtor = _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim.WebSocket || _globals_node_js__WEBPACK_IMPORTED_MODULE_3__.globalThisShim.MozWebSocket;
/**
 * WebSocket transport based on the built-in `WebSocket` object.
 *
 * Usage: browser, Node.js (since v21), Deno, Bun
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @see https://caniuse.com/mdn-api_websocket
 * @see https://nodejs.org/api/globals.html#websocket
 */
class WS extends BaseWS {
    createSocket(uri, protocols, opts) {
        return !isReactNative
            ? protocols
                ? new WebSocketCtor(uri, protocols)
                : new WebSocketCtor(uri)
            : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
        this.ws.send(data);
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/transports/webtransport.js":
/*!****************************************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/transports/webtransport.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WT: () => (/* binding */ WT)
/* harmony export */ });
/* harmony import */ var _transport_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transport.js */ "./node_modules/engine.io-client/build/esm/transport.js");
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");
/* harmony import */ var engine_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! engine.io-parser */ "./node_modules/engine.io-parser/build/esm/index.js");



/**
 * WebTransport transport based on the built-in `WebTransport` object.
 *
 * Usage: browser, Node.js (with the `@fails-components/webtransport` package)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
 * @see https://caniuse.com/webtransport
 */
class WT extends _transport_js__WEBPACK_IMPORTED_MODULE_0__.Transport {
    get name() {
        return "webtransport";
    }
    doOpen() {
        try {
            // @ts-ignore
            this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
        }
        catch (err) {
            return this.emitReserved("error", err);
        }
        this._transport.closed
            .then(() => {
            this.onClose();
        })
            .catch((err) => {
            this.onError("webtransport error", err);
        });
        // note: we could have used async/await, but that would require some additional polyfills
        this._transport.ready.then(() => {
            this._transport.createBidirectionalStream().then((stream) => {
                const decoderStream = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.createPacketDecoderStream)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
                const reader = stream.readable.pipeThrough(decoderStream).getReader();
                const encoderStream = (0,engine_io_parser__WEBPACK_IMPORTED_MODULE_2__.createPacketEncoderStream)();
                encoderStream.readable.pipeTo(stream.writable);
                this._writer = encoderStream.writable.getWriter();
                const read = () => {
                    reader
                        .read()
                        .then(({ done, value }) => {
                        if (done) {
                            return;
                        }
                        this.onPacket(value);
                        read();
                    })
                        .catch((err) => {
                    });
                };
                read();
                const packet = { type: "open" };
                if (this.query.sid) {
                    packet.data = `{"sid":"${this.query.sid}"}`;
                }
                this._writer.write(packet).then(() => this.onOpen());
            });
        });
    }
    write(packets) {
        this.writable = false;
        for (let i = 0; i < packets.length; i++) {
            const packet = packets[i];
            const lastPacket = i === packets.length - 1;
            this._writer.write(packet).then(() => {
                if (lastPacket) {
                    (0,_globals_node_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
                        this.writable = true;
                        this.emitReserved("drain");
                    }, this.setTimeoutFn);
                }
            });
        }
    }
    doClose() {
        var _a;
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
    }
}


/***/ }),

/***/ "./node_modules/engine.io-client/build/esm/util.js":
/*!*********************************************************!*\
  !*** ./node_modules/engine.io-client/build/esm/util.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   byteLength: () => (/* binding */ byteLength),
/* harmony export */   installTimerFunctions: () => (/* binding */ installTimerFunctions),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   randomString: () => (/* binding */ randomString)
/* harmony export */ });
/* harmony import */ var _globals_node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.node.js */ "./node_modules/engine.io-client/build/esm/globals.js");

function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
        if (obj.hasOwnProperty(k)) {
            acc[k] = obj[k];
        }
        return acc;
    }, {});
}
// Keep a reference to the real timeout functions so they can be used when overridden
const NATIVE_SET_TIMEOUT = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    }
    else {
        obj.setTimeoutFn = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.setTimeout.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
        obj.clearTimeoutFn = _globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim.clearTimeout.bind(_globals_node_js__WEBPACK_IMPORTED_MODULE_0__.globalThisShim);
    }
}
// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
const BASE64_OVERHEAD = 1.33;
// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
function byteLength(obj) {
    if (typeof obj === "string") {
        return utf8Length(obj);
    }
    // arraybuffer or blob
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}
/**
 * Generates a random 8-characters string.
 */
function randomString() {
    return (Date.now().toString(36).substring(3) +
        Math.random().toString(36).substring(2, 5));
}


/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/commons.js":
/*!************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/commons.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ERROR_PACKET: () => (/* binding */ ERROR_PACKET),
/* harmony export */   PACKET_TYPES: () => (/* binding */ PACKET_TYPES),
/* harmony export */   PACKET_TYPES_REVERSE: () => (/* binding */ PACKET_TYPES_REVERSE)
/* harmony export */ });
const PACKET_TYPES = Object.create(null); // no Map = no polyfill
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = { type: "error", data: "parser error" };



/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
// imported from https://github.com/socketio/base64-arraybuffer
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
const encode = (arraybuffer) => {
    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};
const decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }
    return arraybuffer;
};


/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/decodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/decodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decodePacket: () => (/* binding */ decodePacket)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");
/* harmony import */ var _contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contrib/base64-arraybuffer.js */ "./node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js");


const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
        return {
            type: "message",
            data: mapBinary(encodedPacket, binaryType),
        };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
        return {
            type: "message",
            data: decodeBase64Packet(encodedPacket.substring(1), binaryType),
        };
    }
    const packetType = _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type];
    if (!packetType) {
        return _commons_js__WEBPACK_IMPORTED_MODULE_0__.ERROR_PACKET;
    }
    return encodedPacket.length > 1
        ? {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
            data: encodedPacket.substring(1),
        }
        : {
            type: _commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES_REVERSE[type],
        };
};
const decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer) {
        const decoded = (0,_contrib_base64_arraybuffer_js__WEBPACK_IMPORTED_MODULE_1__.decode)(data);
        return mapBinary(decoded, binaryType);
    }
    else {
        return { base64: true, data }; // fallback for old browsers
    }
};
const mapBinary = (data, binaryType) => {
    switch (binaryType) {
        case "blob":
            if (data instanceof Blob) {
                // from WebSocket + binaryType "blob"
                return data;
            }
            else {
                // from HTTP long-polling or WebTransport
                return new Blob([data]);
            }
        case "arraybuffer":
        default:
            if (data instanceof ArrayBuffer) {
                // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
                return data;
            }
            else {
                // from WebTransport (Uint8Array)
                return data.buffer;
            }
    }
};


/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/encodePacket.browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/encodePacket.browser.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   encodePacket: () => (/* binding */ encodePacket),
/* harmony export */   encodePacketToBinary: () => (/* binding */ encodePacketToBinary)
/* harmony export */ });
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");

const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
// ArrayBuffer.isView method is not defined in IE10
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(data, callback);
        }
    }
    else if (withNativeArrayBuffer &&
        (data instanceof ArrayBuffer || isView(data))) {
        if (supportsBinary) {
            return callback(data);
        }
        else {
            return encodeBlobAsBase64(new Blob([data]), callback);
        }
    }
    // plain string
    return callback(_commons_js__WEBPACK_IMPORTED_MODULE_0__.PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const content = fileReader.result.split(",")[1];
        callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
};
function toArray(data) {
    if (data instanceof Uint8Array) {
        return data;
    }
    else if (data instanceof ArrayBuffer) {
        return new Uint8Array(data);
    }
    else {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
        return packet.data.arrayBuffer().then(toArray).then(callback);
    }
    else if (withNativeArrayBuffer &&
        (packet.data instanceof ArrayBuffer || isView(packet.data))) {
        return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded) => {
        if (!TEXT_ENCODER) {
            TEXT_ENCODER = new TextEncoder();
        }
        callback(TEXT_ENCODER.encode(encoded));
    });
}



/***/ }),

/***/ "./node_modules/engine.io-parser/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/engine.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPacketDecoderStream: () => (/* binding */ createPacketDecoderStream),
/* harmony export */   createPacketEncoderStream: () => (/* binding */ createPacketEncoderStream),
/* harmony export */   decodePacket: () => (/* reexport safe */ _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket),
/* harmony export */   decodePayload: () => (/* binding */ decodePayload),
/* harmony export */   encodePacket: () => (/* reexport safe */ _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket),
/* harmony export */   encodePayload: () => (/* binding */ encodePayload),
/* harmony export */   protocol: () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _encodePacket_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./encodePacket.js */ "./node_modules/engine.io-parser/build/esm/encodePacket.browser.js");
/* harmony import */ var _decodePacket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./decodePacket.js */ "./node_modules/engine.io-parser/build/esm/decodePacket.browser.js");
/* harmony import */ var _commons_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./commons.js */ "./node_modules/engine.io-parser/build/esm/commons.js");



const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
const encodePayload = (packets, callback) => {
    // some packets may be added to the array while encoding, so the initial length must be saved
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
        // force base64 encoding for binary packets
        (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacket)(packet, false, (encodedPacket) => {
            encodedPackets[i] = encodedPacket;
            if (++count === length) {
                callback(encodedPackets.join(SEPARATOR));
            }
        });
    });
};
const decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
        const decodedPacket = (0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(encodedPackets[i], binaryType);
        packets.push(decodedPacket);
        if (decodedPacket.type === "error") {
            break;
        }
    }
    return packets;
};
function createPacketEncoderStream() {
    return new TransformStream({
        transform(packet, controller) {
            (0,_encodePacket_js__WEBPACK_IMPORTED_MODULE_0__.encodePacketToBinary)(packet, (encodedPacket) => {
                const payloadLength = encodedPacket.length;
                let header;
                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
                if (payloadLength < 126) {
                    header = new Uint8Array(1);
                    new DataView(header.buffer).setUint8(0, payloadLength);
                }
                else if (payloadLength < 65536) {
                    header = new Uint8Array(3);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 126);
                    view.setUint16(1, payloadLength);
                }
                else {
                    header = new Uint8Array(9);
                    const view = new DataView(header.buffer);
                    view.setUint8(0, 127);
                    view.setBigUint64(1, BigInt(payloadLength));
                }
                // first bit indicates whether the payload is plain text (0) or binary (1)
                if (packet.data && typeof packet.data !== "string") {
                    header[0] |= 0x80;
                }
                controller.enqueue(header);
                controller.enqueue(encodedPacket);
            });
        },
    });
}
let TEXT_DECODER;
function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
        return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i = 0; i < size; i++) {
        buffer[i] = chunks[0][j++];
        if (j === chunks[0].length) {
            chunks.shift();
            j = 0;
        }
    }
    if (chunks.length && j < chunks[0].length) {
        chunks[0] = chunks[0].slice(j);
    }
    return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
        TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0 /* State.READ_HEADER */;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
        transform(chunk, controller) {
            chunks.push(chunk);
            while (true) {
                if (state === 0 /* State.READ_HEADER */) {
                    if (totalLength(chunks) < 1) {
                        break;
                    }
                    const header = concatChunks(chunks, 1);
                    isBinary = (header[0] & 0x80) === 0x80;
                    expectedLength = header[0] & 0x7f;
                    if (expectedLength < 126) {
                        state = 3 /* State.READ_PAYLOAD */;
                    }
                    else if (expectedLength === 126) {
                        state = 1 /* State.READ_EXTENDED_LENGTH_16 */;
                    }
                    else {
                        state = 2 /* State.READ_EXTENDED_LENGTH_64 */;
                    }
                }
                else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */) {
                    if (totalLength(chunks) < 2) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 2);
                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
                    state = 3 /* State.READ_PAYLOAD */;
                }
                else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */) {
                    if (totalLength(chunks) < 8) {
                        break;
                    }
                    const headerArray = concatChunks(chunks, 8);
                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
                    const n = view.getUint32(0);
                    if (n > Math.pow(2, 53 - 32) - 1) {
                        // the maximum safe integer in JavaScript is 2^53 - 1
                        controller.enqueue(_commons_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_PACKET);
                        break;
                    }
                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
                    state = 3 /* State.READ_PAYLOAD */;
                }
                else {
                    if (totalLength(chunks) < expectedLength) {
                        break;
                    }
                    const data = concatChunks(chunks, expectedLength);
                    controller.enqueue((0,_decodePacket_js__WEBPACK_IMPORTED_MODULE_1__.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
                    state = 0 /* State.READ_HEADER */;
                }
                if (expectedLength === 0 || expectedLength > maxPayload) {
                    controller.enqueue(_commons_js__WEBPACK_IMPORTED_MODULE_2__.ERROR_PACKET);
                    break;
                }
            }
        },
    });
}
const protocol = 4;



/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/contrib/backo2.js":
/*!*******************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/contrib/backo2.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Backoff: () => (/* binding */ Backoff)
/* harmony export */ });
/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */
function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
}
/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */
Backoff.prototype.duration = function () {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var rand = Math.random();
        var deviation = Math.floor(rand * this.jitter * ms);
        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
};
/**
 * Reset the number of attempts.
 *
 * @api public
 */
Backoff.prototype.reset = function () {
    this.attempts = 0;
};
/**
 * Set the minimum duration
 *
 * @api public
 */
Backoff.prototype.setMin = function (min) {
    this.ms = min;
};
/**
 * Set the maximum duration
 *
 * @api public
 */
Backoff.prototype.setMax = function (max) {
    this.max = max;
};
/**
 * Set the jitter
 *
 * @api public
 */
Backoff.prototype.setJitter = function (jitter) {
    this.jitter = jitter;
};


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fetch: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.Fetch),
/* harmony export */   Manager: () => (/* reexport safe */ _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager),
/* harmony export */   NodeWebSocket: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.NodeWebSocket),
/* harmony export */   NodeXHR: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.NodeXHR),
/* harmony export */   Socket: () => (/* reexport safe */ _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket),
/* harmony export */   WebSocket: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.WebSocket),
/* harmony export */   WebTransport: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.WebTransport),
/* harmony export */   XHR: () => (/* reexport safe */ engine_io_client__WEBPACK_IMPORTED_MODULE_4__.XHR),
/* harmony export */   connect: () => (/* binding */ lookup),
/* harmony export */   "default": () => (/* binding */ lookup),
/* harmony export */   io: () => (/* binding */ lookup),
/* harmony export */   protocol: () => (/* reexport safe */ socket_io_parser__WEBPACK_IMPORTED_MODULE_3__.protocol)
/* harmony export */ });
/* harmony import */ var _url_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url.js */ "./node_modules/socket.io-client/build/esm/url.js");
/* harmony import */ var _manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manager.js */ "./node_modules/socket.io-client/build/esm/manager.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/esm/socket.js");
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm/index.js");
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");



/**
 * Managers cache.
 */
const cache = {};
function lookup(uri, opts) {
    if (typeof uri === "object") {
        opts = uri;
        uri = undefined;
    }
    opts = opts || {};
    const parsed = (0,_url_js__WEBPACK_IMPORTED_MODULE_0__.url)(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew ||
        opts["force new connection"] ||
        false === opts.multiplex ||
        sameNamespace;
    let io;
    if (newConnection) {
        io = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
    }
    else {
        if (!cache[id]) {
            cache[id] = new _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager(source, opts);
        }
        io = cache[id];
    }
    if (parsed.query && !opts.query) {
        opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
}
// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
// namespace (e.g. `io.connect(...)`), for backward compatibility
Object.assign(lookup, {
    Manager: _manager_js__WEBPACK_IMPORTED_MODULE_1__.Manager,
    Socket: _socket_js__WEBPACK_IMPORTED_MODULE_2__.Socket,
    io: lookup,
    connect: lookup,
});
/**
 * Protocol version.
 *
 * @public
 */

/**
 * Expose constructors for standalone build.
 *
 * @public
 */




/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/manager.js":
/*!************************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/manager.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Manager: () => (/* binding */ Manager)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");
/* harmony import */ var _socket_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.js */ "./node_modules/socket.io-client/build/esm/socket.js");
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm/index.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/esm/on.js");
/* harmony import */ var _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contrib/backo2.js */ "./node_modules/socket.io-client/build/esm/contrib/backo2.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");






class Manager extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_5__.Emitter {
    constructor(uri, opts) {
        var _a;
        super();
        this.nsps = {};
        this.subs = [];
        if (uri && "object" === typeof uri) {
            opts = uri;
            uri = undefined;
        }
        opts = opts || {};
        opts.path = opts.path || "/socket.io";
        this.opts = opts;
        (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.installTimerFunctions)(this, opts);
        this.reconnection(opts.reconnection !== false);
        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
        this.reconnectionDelay(opts.reconnectionDelay || 1000);
        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
        this.backoff = new _contrib_backo2_js__WEBPACK_IMPORTED_MODULE_4__.Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor(),
        });
        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
        this._readyState = "closed";
        this.uri = uri;
        const _parser = opts.parser || socket_io_parser__WEBPACK_IMPORTED_MODULE_2__;
        this.encoder = new _parser.Encoder();
        this.decoder = new _parser.Decoder();
        this._autoConnect = opts.autoConnect !== false;
        if (this._autoConnect)
            this.open();
    }
    reconnection(v) {
        if (!arguments.length)
            return this._reconnection;
        this._reconnection = !!v;
        if (!v) {
            this.skipReconnect = true;
        }
        return this;
    }
    reconnectionAttempts(v) {
        if (v === undefined)
            return this._reconnectionAttempts;
        this._reconnectionAttempts = v;
        return this;
    }
    reconnectionDelay(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelay;
        this._reconnectionDelay = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
        return this;
    }
    randomizationFactor(v) {
        var _a;
        if (v === undefined)
            return this._randomizationFactor;
        this._randomizationFactor = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
        return this;
    }
    reconnectionDelayMax(v) {
        var _a;
        if (v === undefined)
            return this._reconnectionDelayMax;
        this._reconnectionDelayMax = v;
        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
        return this;
    }
    timeout(v) {
        if (!arguments.length)
            return this._timeout;
        this._timeout = v;
        return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
        // Only try to reconnect if it's the first time we're connecting
        if (!this._reconnecting &&
            this._reconnection &&
            this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
        }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
        if (~this._readyState.indexOf("open"))
            return this;
        this.engine = new engine_io_client__WEBPACK_IMPORTED_MODULE_0__.Socket(this.uri, this.opts);
        const socket = this.engine;
        const self = this;
        this._readyState = "opening";
        this.skipReconnect = false;
        // emit `open`
        const openSubDestroy = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "open", function () {
            self.onopen();
            fn && fn();
        });
        const onError = (err) => {
            this.cleanup();
            this._readyState = "closed";
            this.emitReserved("error", err);
            if (fn) {
                fn(err);
            }
            else {
                // Only do this if there is no fn to handle the error
                this.maybeReconnectOnOpen();
            }
        };
        // emit `error`
        const errorSub = (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", onError);
        if (false !== this._timeout) {
            const timeout = this._timeout;
            // set timer
            const timer = this.setTimeoutFn(() => {
                openSubDestroy();
                onError(new Error("timeout"));
                socket.close();
            }, timeout);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
        this.subs.push(openSubDestroy);
        this.subs.push(errorSub);
        return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
        return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
        // clear old subs
        this.cleanup();
        // mark as open
        this._readyState = "open";
        this.emitReserved("open");
        // add new subs
        const socket = this.engine;
        this.subs.push((0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "ping", this.onping.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "data", this.ondata.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "error", this.onerror.bind(this)), (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(socket, "close", this.onclose.bind(this)), 
        // @ts-ignore
        (0,_on_js__WEBPACK_IMPORTED_MODULE_3__.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
        this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
        try {
            this.decoder.add(data);
        }
        catch (e) {
            this.onclose("parse error", e);
        }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
        (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
            this.emitReserved("packet", packet);
        }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
        this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
        let socket = this.nsps[nsp];
        if (!socket) {
            socket = new _socket_js__WEBPACK_IMPORTED_MODULE_1__.Socket(this, nsp, opts);
            this.nsps[nsp] = socket;
        }
        else if (this._autoConnect && !socket.active) {
            socket.connect();
        }
        return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
        const nsps = Object.keys(this.nsps);
        for (const nsp of nsps) {
            const socket = this.nsps[nsp];
            if (socket.active) {
                return;
            }
        }
        this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
        const encodedPackets = this.encoder.encode(packet);
        for (let i = 0; i < encodedPackets.length; i++) {
            this.engine.write(encodedPackets[i], packet.options);
        }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs.length = 0;
        this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
        this.skipReconnect = true;
        this._reconnecting = false;
        this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
        return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */
    onclose(reason, description) {
        var _a;
        this.cleanup();
        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
        this.backoff.reset();
        this._readyState = "closed";
        this.emitReserved("close", reason, description);
        if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
        }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
        if (this._reconnecting || this.skipReconnect)
            return this;
        const self = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) {
            this.backoff.reset();
            this.emitReserved("reconnect_failed");
            this._reconnecting = false;
        }
        else {
            const delay = this.backoff.duration();
            this._reconnecting = true;
            const timer = this.setTimeoutFn(() => {
                if (self.skipReconnect)
                    return;
                this.emitReserved("reconnect_attempt", self.backoff.attempts);
                // check again for the case socket closed in above events
                if (self.skipReconnect)
                    return;
                self.open((err) => {
                    if (err) {
                        self._reconnecting = false;
                        self.reconnect();
                        this.emitReserved("reconnect_error", err);
                    }
                    else {
                        self.onreconnect();
                    }
                });
            }, delay);
            if (this.opts.autoUnref) {
                timer.unref();
            }
            this.subs.push(() => {
                this.clearTimeoutFn(timer);
            });
        }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
        const attempt = this.backoff.attempts;
        this._reconnecting = false;
        this.backoff.reset();
        this.emitReserved("reconnect", attempt);
    }
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   on: () => (/* binding */ on)
/* harmony export */ });
function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
        obj.off(ev, fn);
    };
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/socket.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/socket.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Socket: () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var socket_io_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-parser */ "./node_modules/socket.io-parser/build/esm/index.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./on.js */ "./node_modules/socket.io-client/build/esm/on.js");
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");



/**
 * Internal events.
 * These events can't be emitted by the user.
 */
const RESERVED_EVENTS = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1,
});
/**
 * A Socket is the fundamental class for interacting with the server.
 *
 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
 *
 * @example
 * const socket = io();
 *
 * socket.on("connect", () => {
 *   console.log("connected");
 * });
 *
 * // send an event to the server
 * socket.emit("foo", "bar");
 *
 * socket.on("foobar", () => {
 *   // an event was received from the server
 * });
 *
 * // upon disconnection
 * socket.on("disconnect", (reason) => {
 *   console.log(`disconnected due to ${reason}`);
 * });
 */
class Socket extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_2__.Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
        super();
        /**
         * Whether the socket is currently connected to the server.
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.connected); // true
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.connected); // false
         * });
         */
        this.connected = false;
        /**
         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
         * be transmitted by the server.
         */
        this.recovered = false;
        /**
         * Buffer for packets received before the CONNECT packet
         */
        this.receiveBuffer = [];
        /**
         * Buffer for packets that will be sent once the socket is connected
         */
        this.sendBuffer = [];
        /**
         * The queue of packets to be sent with retry in case of failure.
         *
         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
         * @private
         */
        this._queue = [];
        /**
         * A sequence to generate the ID of the {@link QueuedPacket}.
         * @private
         */
        this._queueSeq = 0;
        this.ids = 0;
        /**
         * A map containing acknowledgement handlers.
         *
         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
         *
         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
         * - `const value = await socket.emitWithAck("test")`
         *
         * From those that don't:
         *
         * - `socket.emit("test", (value) => { ... });`
         *
         * In the first case, the handlers will be called with an error when:
         *
         * - the timeout is reached
         * - the socket gets disconnected
         *
         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
         * an acknowledgement from the server.
         *
         * @private
         */
        this.acks = {};
        this.flags = {};
        this.io = io;
        this.nsp = nsp;
        if (opts && opts.auth) {
            this.auth = opts.auth;
        }
        this._opts = Object.assign({}, opts);
        if (this.io._autoConnect)
            this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
        return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
        if (this.subs)
            return;
        const io = this.io;
        this.subs = [
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "open", this.onopen.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "packet", this.onpacket.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "error", this.onerror.bind(this)),
            (0,_on_js__WEBPACK_IMPORTED_MODULE_1__.on)(io, "close", this.onclose.bind(this)),
        ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
        return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
        if (this.connected)
            return this;
        this.subEvents();
        if (!this.io["_reconnecting"])
            this.io.open(); // ensure open
        if ("open" === this.io._readyState)
            this.onopen();
        return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
        return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
        args.unshift("message");
        this.emit.apply(this, args);
        return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
        var _a, _b, _c;
        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
        }
        args.unshift(ev);
        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);
            return this;
        }
        const packet = {
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT,
            data: args,
        };
        packet.options = {};
        packet.options.compress = this.flags.compress !== false;
        // event ack callback
        if ("function" === typeof args[args.length - 1]) {
            const id = this.ids++;
            const ack = args.pop();
            this._registerAckCallback(id, ack);
            packet.id = id;
        }
        const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
        const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
        const discardPacket = this.flags.volatile && !isTransportWritable;
        if (discardPacket) {
        }
        else if (isConnected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        }
        else {
            this.sendBuffer.push(packet);
        }
        this.flags = {};
        return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
        var _a;
        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
        if (timeout === undefined) {
            this.acks[id] = ack;
            return;
        }
        // @ts-ignore
        const timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];
            for (let i = 0; i < this.sendBuffer.length; i++) {
                if (this.sendBuffer[i].id === id) {
                    this.sendBuffer.splice(i, 1);
                }
            }
            ack.call(this, new Error("operation has timed out"));
        }, timeout);
        const fn = (...args) => {
            // @ts-ignore
            this.io.clearTimeoutFn(timer);
            ack.apply(this, args);
        };
        fn.withError = true;
        this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
        return new Promise((resolve, reject) => {
            const fn = (arg1, arg2) => {
                return arg1 ? reject(arg1) : resolve(arg2);
            };
            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
        });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
        let ack;
        if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
        }
        const packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({ fromQueue: true }, this.flags),
        };
        args.push((err, ...responseArgs) => {
            if (packet !== this._queue[0]) {
                // the packet has already been acknowledged
                return;
            }
            const hasError = err !== null;
            if (hasError) {
                if (packet.tryCount > this._opts.retries) {
                    this._queue.shift();
                    if (ack) {
                        ack(err);
                    }
                }
            }
            else {
                this._queue.shift();
                if (ack) {
                    ack(null, ...responseArgs);
                }
            }
            packet.pending = false;
            return this._drainQueue();
        });
        this._queue.push(packet);
        this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
        if (!this.connected || this._queue.length === 0) {
            return;
        }
        const packet = this._queue[0];
        if (packet.pending && !force) {
            return;
        }
        packet.pending = true;
        packet.tryCount++;
        this.flags = packet.flags;
        this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
        packet.nsp = this.nsp;
        this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
        if (typeof this.auth == "function") {
            this.auth((data) => {
                this._sendConnectPacket(data);
            });
        }
        else {
            this._sendConnectPacket(this.auth);
        }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
        this.packet({
            type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT,
            data: this._pid
                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
                : data,
        });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
        if (!this.connected) {
            this.emitReserved("connect_error", err);
        }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
        this.connected = false;
        delete this.id;
        this.emitReserved("disconnect", reason, description);
        this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */
    _clearAcks() {
        Object.keys(this.acks).forEach((id) => {
            const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
            if (!isBuffered) {
                // note: handlers that do not accept an error as first argument are ignored here
                const ack = this.acks[id];
                delete this.acks[id];
                if (ack.withError) {
                    ack.call(this, new Error("socket has been disconnected"));
                }
            }
        });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
        const sameNamespace = packet.nsp === this.nsp;
        if (!sameNamespace)
            return;
        switch (packet.type) {
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT:
                if (packet.data && packet.data.sid) {
                    this.onconnect(packet.data.sid, packet.data.pid);
                }
                else {
                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                }
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.EVENT:
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_EVENT:
                this.onevent(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK:
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.BINARY_ACK:
                this.onack(packet);
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT:
                this.ondisconnect();
                break;
            case socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.CONNECT_ERROR:
                this.destroy();
                const err = new Error(packet.data.message);
                // @ts-ignore
                err.data = packet.data.data;
                this.emitReserved("connect_error", err);
                break;
        }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
        const args = packet.data || [];
        if (null != packet.id) {
            args.push(this.ack(packet.id));
        }
        if (this.connected) {
            this.emitEvent(args);
        }
        else {
            this.receiveBuffer.push(Object.freeze(args));
        }
    }
    emitEvent(args) {
        if (this._anyListeners && this._anyListeners.length) {
            const listeners = this._anyListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, args);
            }
        }
        super.emit.apply(this, args);
        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
        }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
        const self = this;
        let sent = false;
        return function (...args) {
            // prevent double callbacks
            if (sent)
                return;
            sent = true;
            self.packet({
                type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.ACK,
                id: id,
                data: args,
            });
        };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
        const ack = this.acks[packet.id];
        if (typeof ack !== "function") {
            return;
        }
        delete this.acks[packet.id];
        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
        if (ack.withError) {
            packet.data.unshift(null);
        }
        // @ts-ignore
        ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
        this.id = id;
        this.recovered = pid && this._pid === pid;
        this._pid = pid; // defined only if connection state recovery is enabled
        this.connected = true;
        this.emitBuffered();
        this.emitReserved("connect");
        this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
        this.receiveBuffer.forEach((args) => this.emitEvent(args));
        this.receiveBuffer = [];
        this.sendBuffer.forEach((packet) => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
        });
        this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
        this.destroy();
        this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
        if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach((subDestroy) => subDestroy());
            this.subs = undefined;
        }
        this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
        if (this.connected) {
            this.packet({ type: socket_io_parser__WEBPACK_IMPORTED_MODULE_0__.PacketType.DISCONNECT });
        }
        // remove socket from pool
        this.destroy();
        if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
        }
        return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
        return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
        this.flags.compress = compress;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
        this.flags.volatile = true;
        return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
        this.flags.timeout = timeout;
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
        this._anyListeners = this._anyListeners || [];
        this._anyListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
        if (!this._anyListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
        return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.push(listener);
        return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
        this._anyOutgoingListeners.unshift(listener);
        return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
        if (!this._anyOutgoingListeners) {
            return this;
        }
        if (listener) {
            const listeners = this._anyOutgoingListeners;
            for (let i = 0; i < listeners.length; i++) {
                if (listener === listeners[i]) {
                    listeners.splice(i, 1);
                    return this;
                }
            }
        }
        else {
            this._anyOutgoingListeners = [];
        }
        return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const listeners = this._anyOutgoingListeners.slice();
            for (const listener of listeners) {
                listener.apply(this, packet.data);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/socket.io-client/build/esm/url.js":
/*!********************************************************!*\
  !*** ./node_modules/socket.io-client/build/esm/url.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   url: () => (/* binding */ url)
/* harmony export */ });
/* harmony import */ var engine_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! engine.io-client */ "./node_modules/engine.io-client/build/esm/index.js");

/**
 * URL parser.
 *
 * @param uri - url
 * @param path - the request path of the connection
 * @param loc - An object meant to mimic window.location.
 *        Defaults to window.location.
 * @public
 */
function url(uri, path = "", loc) {
    let obj = uri;
    // default to window.location
    loc = loc || (typeof location !== "undefined" && location);
    if (null == uri)
        uri = loc.protocol + "//" + loc.host;
    // relative path support
    if (typeof uri === "string") {
        if ("/" === uri.charAt(0)) {
            if ("/" === uri.charAt(1)) {
                uri = loc.protocol + uri;
            }
            else {
                uri = loc.host + uri;
            }
        }
        if (!/^(https?|wss?):\/\//.test(uri)) {
            if ("undefined" !== typeof loc) {
                uri = loc.protocol + "//" + uri;
            }
            else {
                uri = "https://" + uri;
            }
        }
        // parse
        obj = (0,engine_io_client__WEBPACK_IMPORTED_MODULE_0__.parse)(uri);
    }
    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
        if (/^(http|ws)$/.test(obj.protocol)) {
            obj.port = "80";
        }
        else if (/^(http|ws)s$/.test(obj.protocol)) {
            obj.port = "443";
        }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    // define unique id
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    // define href
    obj.href =
        obj.protocol +
            "://" +
            host +
            (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/esm/binary.js":
/*!***********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/binary.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deconstructPacket: () => (/* binding */ deconstructPacket),
/* harmony export */   reconstructPacket: () => (/* binding */ reconstructPacket)
/* harmony export */ });
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/esm/is-binary.js");

/**
 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @public
 */
function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return { packet: pack, buffers: buffers };
}
function _deconstructPacket(data, buffers) {
    if (!data)
        return data;
    if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_0__.isBinary)(data)) {
        const placeholder = { _placeholder: true, num: buffers.length };
        buffers.push(data);
        return placeholder;
    }
    else if (Array.isArray(data)) {
        const newData = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            newData[i] = _deconstructPacket(data[i], buffers);
        }
        return newData;
    }
    else if (typeof data === "object" && !(data instanceof Date)) {
        const newData = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                newData[key] = _deconstructPacket(data[key], buffers);
            }
        }
        return newData;
    }
    return data;
}
/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @public
 */
function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments; // no longer useful
    return packet;
}
function _reconstructPacket(data, buffers) {
    if (!data)
        return data;
    if (data && data._placeholder === true) {
        const isIndexValid = typeof data.num === "number" &&
            data.num >= 0 &&
            data.num < buffers.length;
        if (isIndexValid) {
            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
        }
        else {
            throw new Error("illegal attachments");
        }
    }
    else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            data[i] = _reconstructPacket(data[i], buffers);
        }
    }
    else if (typeof data === "object") {
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                data[key] = _reconstructPacket(data[key], buffers);
            }
        }
    }
    return data;
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Decoder: () => (/* binding */ Decoder),
/* harmony export */   Encoder: () => (/* binding */ Encoder),
/* harmony export */   PacketType: () => (/* binding */ PacketType),
/* harmony export */   protocol: () => (/* binding */ protocol)
/* harmony export */ });
/* harmony import */ var _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @socket.io/component-emitter */ "./node_modules/@socket.io/component-emitter/lib/esm/index.js");
/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./binary.js */ "./node_modules/socket.io-parser/build/esm/binary.js");
/* harmony import */ var _is_binary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-binary.js */ "./node_modules/socket.io-parser/build/esm/is-binary.js");



/**
 * These strings must not be used as event names, as they have a special meaning.
 */
const RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener", // used by the Node.js EventEmitter
];
/**
 * Protocol version.
 *
 * @public
 */
const protocol = 5;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType[PacketType["EVENT"] = 2] = "EVENT";
    PacketType[PacketType["ACK"] = 3] = "ACK";
    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
 * A socket.io Encoder instance
 */
class Encoder {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
        this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
            if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.hasBinary)(obj)) {
                return this.encodeAsBinary({
                    type: obj.type === PacketType.EVENT
                        ? PacketType.BINARY_EVENT
                        : PacketType.BINARY_ACK,
                    nsp: obj.nsp,
                    data: obj.data,
                    id: obj.id,
                });
            }
        }
        return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
        // first is type
        let str = "" + obj.type;
        // attachments if we have them
        if (obj.type === PacketType.BINARY_EVENT ||
            obj.type === PacketType.BINARY_ACK) {
            str += obj.attachments + "-";
        }
        // if we have a namespace other than `/`
        // we append it followed by a comma `,`
        if (obj.nsp && "/" !== obj.nsp) {
            str += obj.nsp + ",";
        }
        // immediately followed by the id
        if (null != obj.id) {
            str += obj.id;
        }
        // json data
        if (null != obj.data) {
            str += JSON.stringify(obj.data, this.replacer);
        }
        return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
        const deconstruction = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.deconstructPacket)(obj);
        const pack = this.encodeAsString(deconstruction.packet);
        const buffers = deconstruction.buffers;
        buffers.unshift(pack); // add packet info to beginning of data list
        return buffers; // write all the buffers
    }
}
// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
}
/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 */
class Decoder extends _socket_io_component_emitter__WEBPACK_IMPORTED_MODULE_0__.Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
        super();
        this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
        let packet;
        if (typeof obj === "string") {
            if (this.reconstructor) {
                throw new Error("got plaintext data when reconstructing a packet");
            }
            packet = this.decodeString(obj);
            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
                // binary packet's json
                this.reconstructor = new BinaryReconstructor(packet);
                // no attachments, labeled binary but no binary data to follow
                if (packet.attachments === 0) {
                    super.emitReserved("decoded", packet);
                }
            }
            else {
                // non-binary full packet
                super.emitReserved("decoded", packet);
            }
        }
        else if ((0,_is_binary_js__WEBPACK_IMPORTED_MODULE_2__.isBinary)(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
                throw new Error("got binary data when not reconstructing a packet");
            }
            else {
                packet = this.reconstructor.takeBinaryData(obj);
                if (packet) {
                    // received final buffer
                    this.reconstructor = null;
                    super.emitReserved("decoded", packet);
                }
            }
        }
        else {
            throw new Error("Unknown type: " + obj);
        }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
        let i = 0;
        // look up type
        const p = {
            type: Number(str.charAt(0)),
        };
        if (PacketType[p.type] === undefined) {
            throw new Error("unknown packet type " + p.type);
        }
        // look up attachments if type binary
        if (p.type === PacketType.BINARY_EVENT ||
            p.type === PacketType.BINARY_ACK) {
            const start = i + 1;
            while (str.charAt(++i) !== "-" && i != str.length) { }
            const buf = str.substring(start, i);
            if (buf != Number(buf) || str.charAt(i) !== "-") {
                throw new Error("Illegal attachments");
            }
            p.attachments = Number(buf);
        }
        // look up namespace (if any)
        if ("/" === str.charAt(i + 1)) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if ("," === c)
                    break;
                if (i === str.length)
                    break;
            }
            p.nsp = str.substring(start, i);
        }
        else {
            p.nsp = "/";
        }
        // look up id
        const next = str.charAt(i + 1);
        if ("" !== next && Number(next) == next) {
            const start = i + 1;
            while (++i) {
                const c = str.charAt(i);
                if (null == c || Number(c) != c) {
                    --i;
                    break;
                }
                if (i === str.length)
                    break;
            }
            p.id = Number(str.substring(start, i + 1));
        }
        // look up json data
        if (str.charAt(++i)) {
            const payload = this.tryParse(str.substr(i));
            if (Decoder.isPayloadValid(p.type, payload)) {
                p.data = payload;
            }
            else {
                throw new Error("invalid payload");
            }
        }
        return p;
    }
    tryParse(str) {
        try {
            return JSON.parse(str, this.reviver);
        }
        catch (e) {
            return false;
        }
    }
    static isPayloadValid(type, payload) {
        switch (type) {
            case PacketType.CONNECT:
                return isObject(payload);
            case PacketType.DISCONNECT:
                return payload === undefined;
            case PacketType.CONNECT_ERROR:
                return typeof payload === "string" || isObject(payload);
            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
                return (Array.isArray(payload) &&
                    (typeof payload[0] === "number" ||
                        (typeof payload[0] === "string" &&
                            RESERVED_EVENTS.indexOf(payload[0]) === -1)));
            case PacketType.ACK:
            case PacketType.BINARY_ACK:
                return Array.isArray(payload);
        }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
        if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
            this.reconstructor = null;
        }
    }
}
/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 */
class BinaryReconstructor {
    constructor(packet) {
        this.packet = packet;
        this.buffers = [];
        this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
        this.buffers.push(binData);
        if (this.buffers.length === this.reconPack.attachments) {
            // done with buffer list
            const packet = (0,_binary_js__WEBPACK_IMPORTED_MODULE_1__.reconstructPacket)(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
        }
        return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
        this.reconPack = null;
        this.buffers = [];
    }
}


/***/ }),

/***/ "./node_modules/socket.io-parser/build/esm/is-binary.js":
/*!**************************************************************!*\
  !*** ./node_modules/socket.io-parser/build/esm/is-binary.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBinary: () => (/* binding */ hasBinary),
/* harmony export */   isBinary: () => (/* binding */ isBinary)
/* harmony export */ });
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
    return typeof ArrayBuffer.isView === "function"
        ? ArrayBuffer.isView(obj)
        : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" ||
    (typeof Blob !== "undefined" &&
        toString.call(Blob) === "[object BlobConstructor]");
const withNativeFile = typeof File === "function" ||
    (typeof File !== "undefined" &&
        toString.call(File) === "[object FileConstructor]");
/**
 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
 *
 * @private
 */
function isBinary(obj) {
    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
        (withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File));
}
function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
        return false;
    }
    if (Array.isArray(obj)) {
        for (let i = 0, l = obj.length; i < l; i++) {
            if (hasBinary(obj[i])) {
                return true;
            }
        }
        return false;
    }
    if (isBinary(obj)) {
        return true;
    }
    if (obj.toJSON &&
        typeof obj.toJSON === "function" &&
        arguments.length === 1) {
        return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
            return true;
        }
    }
    return false;
}


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./resources/js/config/apiEndPoints.js":
/*!*********************************************!*\
  !*** ./resources/js/config/apiEndPoints.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_ENDPOINTS: () => (/* binding */ API_ENDPOINTS)
/* harmony export */ });
var API_ENDPOINTS = {
  SEARCH_USERS: "/api/search/users",
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  FETCH_MESSAGES: "/api/messages/fetch",
  GENERATE_TOKEN: "/api/token/generate",
  ADMIN_MESSAGES_STORE: "/api/admin/messages/store",
  TEMPLATE_SELECT: "/api/template/select",
  UPDATE_BACKGROUND_COLOLR: "/api/update/bgColor",
  GET_USER_CHATS: "/api/get/messages"
};

/***/ }),

/***/ "./resources/js/config/config.js":
/*!***************************************!*\
  !*** ./resources/js/config/config.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// 本番用

// export default {
//     SOCKET_URL: 'https://chat-socket.info:3000',
//     S3_URL: "https://line-chat-app.s3.ap-northeast-1.amazonaws.com/images",
//     CHAT_URL: "https://chat-system.info/admin/chat"
// };

// 開発用
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  SOCKET_URL: 'https://socket.line-chat-system-dev.tokyo:3000',
  S3_URL: "https://line-chat-app-dev.s3.ap-northeast-1.amazonaws.com/images",
  CHAT_URL: "https://chat.line-chat-system-dev.tokyo/admin/chat"
});

/***/ }),

/***/ "./resources/js/module/component/chat/ChatMessageController.js":
/*!*********************************************************************!*\
  !*** ./resources/js/module/component/chat/ChatMessageController.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _templates_elementTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/elementTemplate */ "./resources/js/module/component/templates/elementTemplate.js");
/* harmony import */ var _ui_ModalController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/ModalController */ "./resources/js/module/component/ui/ModalController.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



/**
 * ChatMessageController
 * チャット画面にメッセージを表示するロジックを管理するクラス
 * 
 * このクラスは、受け取ったメッセージ情報を元にチャット画面にメッセージを追加し、
 * 必要に応じて画像の切り取り領域 (cropArea) をオーバーレイ表示する
 * 
 */
var _ChatMessageController_brand = /*#__PURE__*/new WeakSet();
var ChatMessageController = /*#__PURE__*/function () {
  /**
   * @param {string} messageType - メッセージの種類 (text, image など)
   * @param {object} cropArea - 画像の切り取り領域
   * @param {string} position - メッセージ挿入位置 (afterbegin, beforeend など)
   * @param {string} time - メッセージの送信時刻
   * @param {string} className - 挿入対象の DOM クラス名
   * @param {string} senderType - 送信者のタイプ (admin, user など)
   * @param {string} content - メッセージ内容
   * @param {string} fileName - ファイルの名前
   * @param {string} senderId - 送信者の ID
  */

  function ChatMessageController(_ref) {
    var messageType = _ref.messageType,
      cropArea = _ref.cropArea,
      position = _ref.position,
      time = _ref.time,
      className = _ref.className,
      _senderType = _ref.senderType,
      content = _ref.content,
      _fileName = _ref.fileName,
      senderId = _ref.senderId,
      type = _ref.type,
      _ref$ids = _ref.ids,
      ids = _ref$ids === void 0 ? [] : _ref$ids;
    _classCallCheck(this, ChatMessageController);
    /**
     * メッセージを右側または左側に表示するべきかを判定
     * @returns {boolean} - メッセージが右側に表示される場合は true、それ以外は false
     */
    _classPrivateMethodInitSpec(this, _ChatMessageController_brand);
    this.messageType = messageType;
    this.cropArea = cropArea;
    this.position = position;
    this.time = time;
    this.className = className;
    this.senderType = _senderType;
    this.content = content;
    this.fileName = _fileName;
    this.parentElement = document.querySelector(".".concat(this.className));
    this.senderId = senderId;
    this.ids = ids;
    this.type = type;
  }
  return _createClass(ChatMessageController, [{
    key: "displayChatMessage",
    value: function displayChatMessage() {
      if (this.ids.includes(this.parentElement.getAttribute("data-id"))) return;
      var shouldAddRightMessage = _assertClassBrand(_ChatMessageController_brand, this, _isRightAlignedMessage).call(this);
      _assertClassBrand(_ChatMessageController_brand, this, _addChatMessage).call(this, shouldAddRightMessage);
    }
  }]);
}();
function _isRightAlignedMessage() {
  var senderType = this.senderType,
    fileName = this.fileName;
  return senderType === "admin" && fileName === "admin" || senderType === "user" && fileName === "user";
}
/**
 * メッセージを画面に追加する
 * @param {boolean} isRight - メッセージを右側に追加する場合は true、それ以外は false
 */
function _addChatMessage(isRight) {
  var validPositions = ["afterbegin", "beforeend"];
  var validPosition = validPositions.includes(this.position) ? this.position : "beforeend";
  // メッセージHTMLを生成して挿入
  var messageHTML = isRight ? (0,_templates_elementTemplate__WEBPACK_IMPORTED_MODULE_0__.createRightMessageContainer)(this.messageType, this.time, this.content, this.cropArea, this.type) : (0,_templates_elementTemplate__WEBPACK_IMPORTED_MODULE_0__.createLeftMessageContainer)(this.messageType, this.time, this.content, this.cropArea, this.type);
  this.parentElement.insertAdjacentHTML(validPosition, messageHTML);

  // this.cropAreaがある場合は処理を適用

  if (this.cropArea && Object.entries(this.cropArea).length > 0) {
    _assertClassBrand(_ChatMessageController_brand, this, _applyCropArea).call(this);
  }
}
/**
 * 画像の切り取り領域をオーバーレイ表示
 */
function _applyCropArea() {
  var _this = this;
  var containers = document.querySelectorAll(".image-container[data-crop]");
  containers.forEach(function (container) {
    // チャット画面に表示した画像を取得
    var targetImage = container.querySelector(".overlay-target");
    var overlay = container.querySelector(".overlay");
    targetImage.onload = function () {
      return _assertClassBrand(_ChatMessageController_brand, _this, _updateOverlayStyles).call(_this, container, overlay);
    };
  });
}
/**
 * 切り取り領域に基づいてオーバーレイのスタイルを更新
 * @param {HTMLElement} container - 対象画像のコンテナ
 * @param {HTMLElement} overlay - オーバーレイ要素
 */
function _updateOverlayStyles(container, overlay) {
  var imageRect = container.querySelector(".overlay-target").getBoundingClientRect();
  var cropData = JSON.parse(container.dataset.crop);
  if (typeof cropData === "string") {
    cropData = JSON.parse(cropData);
  }
  overlay.style.left = "".concat(cropData.x_percent / 100 * imageRect.width, "px");
  overlay.style.top = "".concat(cropData.y_percent / 100 * imageRect.height, "px");
  overlay.style.width = "".concat(cropData.width_percent / 100 * imageRect.width, "px");
  overlay.style.height = "".concat(cropData.height_percent / 100 * imageRect.height, "px");
  overlay.style.display = "inline-block";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatMessageController);

/***/ }),

/***/ "./resources/js/module/component/chat/ChatSearchController.js":
/*!********************************************************************!*\
  !*** ./resources/js/module/component/chat/ChatSearchController.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/apiEndPoints */ "./resources/js/config/apiEndPoints.js");
/* harmony import */ var _util_api_Fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/api/Fetch */ "./resources/js/module/util/api/Fetch.js");
/* harmony import */ var _templates_elementTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/elementTemplate */ "./resources/js/module/component/templates/elementTemplate.js");
/* harmony import */ var _ChatUIHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ChatUIHelper */ "./resources/js/module/component/chat/ChatUIHelper.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





/**
 * ChatSearchController
 * チャット画面で検索をするさいのロジックを管理するクラス
 */
var ChatSearchController = /*#__PURE__*/function () {
  function ChatSearchController() {
    _classCallCheck(this, ChatSearchController);
  }
  return _createClass(ChatSearchController, null, [{
    key: "createDivForSearch",
    value: (
    /**
     * ユーザー検索処理
     * 
     * 指定されたデータを基にユーザー検索 API を呼び出し、結果を DOM に表示。
     * 
     * @param {object} data - 検索リクエスト用データ (例: { admin_id: string, text: string })
     *   - admin_id: 検索を実行する管理者の ID
     *   - text: 検索対象のユーザー名
     * 
     * @returns {Promise<void>} - 非同期処理のため Promise を返します。
    */
    function () {
      var _createDivForSearch = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
        var response, parentElement;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _util_api_Fetch__WEBPACK_IMPORTED_MODULE_1__["default"].fetchPostOperation(data, _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__.API_ENDPOINTS.SEARCH_USERS);
            case 2:
              response = _context.sent;
              parentElement = document.getElementById("js_chatUser_wrapper");
              if (response.length > 0) {
                parentElement.innerHTML = "";
                response.forEach(function (res) {
                  if (res["latest_all_message"] !== null) {
                    parentElement.innerHTML += (0,_templates_elementTemplate__WEBPACK_IMPORTED_MODULE_2__.createChatUserContainer)(res["entity_uuid"], res);
                  }
                });
              } else {
                parentElement.innerHTML = '<p class="text_info">ユーザーが見つかりませんでした</p>';
              }
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function createDivForSearch(_x) {
        return _createDivForSearch.apply(this, arguments);
      }
      return createDivForSearch;
    }())
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatSearchController);

/***/ }),

/***/ "./resources/js/module/component/chat/ChatUIHelper.js":
/*!************************************************************!*\
  !*** ./resources/js/module/component/chat/ChatUIHelper.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_FormatText_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/FormatText.js */ "./resources/js/module/util/FormatText.js");
/* harmony import */ var _ui_FormController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/FormController.js */ "./resources/js/module/component/ui/FormController.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


var DELAY_TIME = 500;
var MAX_LENGTH = 30;

/**
 * ChatUIHelper
 * チャット機能の関連するUIの更新を管理するクラス
 */
var ChatUIHelper = /*#__PURE__*/function () {
  function ChatUIHelper() {
    _classCallCheck(this, ChatUIHelper);
  }
  return _createClass(ChatUIHelper, null, [{
    key: "scrollToBottom",
    value:
    /**
     * チャット画面を開いたときに一番下までスクロールする
     */
    function scrollToBottom() {
      setTimeout(function () {
        var scroll_el = document.querySelector(".chat__message-main");
        if (scroll_el) {
          scroll_el.scrollTo({
            top: scroll_el.scrollHeight,
            behavior: 'auto'
          });
        }
      }, DELAY_TIME);
    }
  }, {
    key: "adjustMesageLength",
    value:
    /**
     * メッセージの長さ制限処理
     * 指定した文字数以上の場合は省略記号 "..." を付ける
     * @param {String} text - 省略記法を適応する文字列
     * @returns {String} -　フォーマットした文字列を返す
     */
    function adjustMesageLength(text) {
      var formattedText = text.split('\n')[0];
      if (formattedText.length >= MAX_LENGTH) {
        return formattedText.substring(0, MAX_LENGTH) + "...";
      } else {
        return formattedText;
      }
    }
  }, {
    key: "isCurrentUser",
    value:
    /**
     * 現在のユーザーが指定したUUIDと一致するかを判定
     * @param {string} sender_uuid - 判定対象のユーザーUUID(例：00bd10de-18dc-4d00-be56-02e5d12b03b2)
     * @returns {boolean} 一致する場合はtrue、それ以外はfalse
     */
    function isCurrentUser(sender_uuid) {
      var _document$getElementB;
      var user_uuid = ((_document$getElementB = document.getElementById("js_chatuser_id")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || null;
      return user_uuid === sender_uuid;
    }
  }, {
    key: "isCurrentAmdin",
    value: function isCurrentAmdin(sender_uuid, receiver_uuid) {
      var _document$getElementB2, _document$getElementB3;
      var admin_uuid = ((_document$getElementB2 = document.getElementById("js_uuid")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value) || null;
      var user_uuid = ((_document$getElementB3 = document.getElementById("js_chatuser_id")) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value) || null;
      return admin_uuid === sender_uuid && user_uuid === receiver_uuid;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatUIHelper);

/***/ }),

/***/ "./resources/js/module/component/chat/ChatUserListController.js":
/*!**********************************************************************!*\
  !*** ./resources/js/module/component/chat/ChatUserListController.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util_api_Fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/api/Fetch */ "./resources/js/module/util/api/Fetch.js");
/* harmony import */ var _util_FormatText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/FormatText */ "./resources/js/module/util/FormatText.js");
/* harmony import */ var _util_state_UserStateManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/state/UserStateManager */ "./resources/js/module/util/state/UserStateManager.js");
/* harmony import */ var _templates_elementTemplate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../templates/elementTemplate */ "./resources/js/module/component/templates/elementTemplate.js");
/* harmony import */ var _ChatUIHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ChatUIHelper */ "./resources/js/module/component/chat/ChatUIHelper.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






//チャットユーザーリストの管理ロジック
var _ChatUserListController_brand = /*#__PURE__*/new WeakSet();
var ChatUserListController = /*#__PURE__*/function () {
  /**
   * @param {string} senderId - メッセージ送信者のuuid(例：00bd10de-18dc-4d00-be56-02e5d12b03b2)
   * @param {string} receiverId - メッセージ受信者のuuid(例：219f5d1a-c9e2-48c4-8a0b-59f5fe971b9a)
   * @param {string} senderType - メッセージ送信者のタイプ (admin, user)
   * @param {boolean} isSearching - 検索中かをtrue false
   * @param {string} content - メッセージ内容
   * @param {string} messageType - メッセージタイプ(text, imageなど)
   * @param {string} time - メッセージ送信日
  */

  function ChatUserListController(_ref) {
    var senderId = _ref.senderId,
      receiverId = _ref.receiverId,
      senderType = _ref.senderType,
      isSearching = _ref.isSearching,
      content = _ref.content,
      messageType = _ref.messageType,
      time = _ref.time;
    _classCallCheck(this, ChatUserListController);
    /**
     * 要素をリストのトップに移動
     * 
     * @param {HTMLElement} element - 移動対象の要素
     * @param {HTMLElement} parent - 親要素
     */
    _classPrivateMethodInitSpec(this, _ChatUserListController_brand);
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.senderType = senderType;
    this.isSearching = isSearching;
    this.content = content;
    this.messageType = messageType;
    this.time = time;
  }

  /**
   * メッセージを受信したら未読数をカウントアップさせる処理
   * 条件:
   *  - メッセージ送信してきたユーザーのチャットを開いている場合は除外
   *  - ブロックされているユーザーは除外
   */
  return _createClass(ChatUserListController, [{
    key: "increaseMessageCount",
    value: function increaseMessageCount() {
      var _this = this;
      var count_elements = document.querySelectorAll(".js_mesage_count");
      var chat_user_id = document.getElementById("js_chatuser_id").value;
      count_elements.forEach(function (count) {
        var id = count.getAttribute("data-id");

        // 未読カウントを増加させる条件:
        // - メッセージ送信者と一致する
        // - 現在開いているチャットユーザーとは異なる
        if (id == _this.senderId && id !== chat_user_id) {
          var currentCount = Number(count.innerHTML) || 0;
          if (currentCount == 0) count.style.display = "flex"; // 初回表示
          count.innerHTML = "".concat(currentCount + 1);
        }
      });
    }
  }, {
    key: "updateChatUserList",
    value: (
    /**
     * チャットユーザーリストを更新する処理
     * 条件:
     *  - メッセージ送信してきたユーザーのチャットを開いている場合は除外
     *  - ブロックされているユーザーは除外
     */
    function () {
      var _updateChatUserList = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _document$getElementB;
        var wrappers, chatWrapper, currentChatUserId, chatUserId, existingWrapper;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              wrappers = document.querySelectorAll(".js_chat_wrapper");
              chatWrapper = document.getElementById("js_chatUser_wrapper");
              currentChatUserId = (_document$getElementB = document.getElementById("js_chatuser_id")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value; // DOM 要素が見つからない場合は undefined を返す
              // 現在開いているチャットユーザーと一致する場合、または検索中の場合は処理を終了
              if (!(currentChatUserId === this.senderId || this.isSearching.flag)) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return");
            case 5:
              chatUserId = this.senderType === "admin" ? this.receiverId : this.senderId; // 既存のリストから送信者のリストを検索
              existingWrapper = Array.from(wrappers).find(function (wrapper) {
                return wrapper.getAttribute("data-uuid") === chatUserId;
              });
              if (!existingWrapper) {
                _context.next = 11;
                break;
              }
              _assertClassBrand(_ChatUserListController_brand, this, _moveToTop).call(this, existingWrapper, chatWrapper); // 要素をトップに移動;
              _context.next = 13;
              break;
            case 11:
              _context.next = 13;
              return _assertClassBrand(_ChatUserListController_brand, this, _createNewDivElement).call(this);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function updateChatUserList() {
        return _updateChatUserList.apply(this, arguments);
      }
      return updateChatUserList;
    }())
  }, {
    key: "updateUserListMessage",
    value:
    /**
     * チャットユーザーリストのメッセージを更新
     * 
     * 管理者から一斉メッセージが送信された際、ブロックユーザー以外の
     * チャットユーザーのメッセージを更新
     * 
     * @param {Array} blockedIds - ブロックされているユーザーの UUID の配列
     * 例: ["00bd10de-18dc-4d00-be56-02e5d12b03b2", "219f5d1a-c9e2-48c4-8a0b-59f5fe971b9a"]
     */
    function updateUserListMessage(blockedIds) {
      var message_wrappers = document.querySelectorAll(".js_chatMessage_elment");
      message_wrappers.forEach(function (wrapper) {
        var id = wrapper.getAttribute("data-id");
        if (!blockedIds.includes(id)) {
          wrapper.innerHTML = "一斉メッセージを送信しました";
        }
      });
    }

    /**
     * チャットユーザーリストのメッセージを更新
     * 
     * メッセージの送受信が行われた際に、送信者タイプで文言を変更し、
     * チャットユーザーのメッセージを更新
     */
  }, {
    key: "displayMessage",
    value: function displayMessage() {
      var _this2 = this;
      var elements = document.querySelectorAll(".js_chatMessage_elment");
      elements.forEach(function (element) {
        // チャットユーザー一覧からチャットユーザーIDを取得
        var id = element.getAttribute("data-id");
        var chatUserId = _this2.senderType == "user" ? _this2.senderId : _this2.receiverId;
        var txt = _this2.messageType == "image" ? _this2.senderType == "user" ? "画像が送信されました" : "画像を送信しました" : _this2.content;
        if (id == chatUserId) element.textContent = _ChatUIHelper__WEBPACK_IMPORTED_MODULE_4__["default"].adjustMesageLength(txt);
      });
    }
  }, {
    key: "updateMessageTime",
    value:
    /**
     * 新しいメッセージの時間をリアルタイムでチャットユーザーリストの時間箇所に表示
     * 
     * @param {Array} blockedIds - ブロックされているユーザーの UUID の配列
     * 例: ["00bd10de-18dc-4d00-be56-02e5d12b03b2", "219f5d1a-c9e2-48c4-8a0b-59f5fe971b9a"]
     */
    function updateMessageTime() {
      var _this3 = this;
      var blockedIds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var elements = document.querySelectorAll(".js_update_message_time");
      elements.forEach(function (element) {
        var id = element.getAttribute("data-id");

        // ブロックされているユーザーをスキップ
        if (blockedIds.includes(id)) return;

        // 時間を更新
        var chatUserId = _this3.senderType === "user" ? _this3.senderId : _this3.receiverId;
        element.innerHTML = id === chatUserId ? _this3.time : element.innerHTML;
      });
    }
  }]);
}();
function _moveToTop(element, parent) {
  var firstChild = parent.firstChild;
  if (!firstChild) return;
  var newElement = element.cloneNode(true);
  parent.insertBefore(newElement, firstChild); // 最初に挿入
  if (element.parentNode === parent) parent.removeChild(element); // 元の要素を削除
}
/**
 * チャットユーザー一覧に新しいユーザーを追加
 * 
 * 指定された senderId と receiverId に基づいてユーザー情報を取得し、
 * ユーザーリストに新しい要素を挿入します。
 */
function _createNewDivElement() {
  return _createNewDivElement2.apply(this, arguments);
}
function _createNewDivElement2() {
  _createNewDivElement2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var response, parentElement, firstChild;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _util_api_Fetch__WEBPACK_IMPORTED_MODULE_0__["default"].fetchGetOperation("/api/users/".concat(this.senderId, "/").concat(this.receiverId));
        case 2:
          response = _context2.sent;
          parentElement = document.getElementById("js_chatUser_wrapper");
          firstChild = parentElement.firstChild; // 最初の子要素を取得
          if (!(!response || response.length === 0)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return");
        case 7:
          response.forEach(function (res) {
            _util_state_UserStateManager__WEBPACK_IMPORTED_MODULE_2__["default"].setState(res["id"]);
            var template = (0,_templates_elementTemplate__WEBPACK_IMPORTED_MODULE_3__.createChatUserContainer)(res["entity_uuid"], res);
            if (firstChild) {
              // 最初の子要素の前に直接HTMLを挿入
              parentElement.insertAdjacentHTML('afterbegin', template);
            } else {
              parentElement.innerHTML += template; // 最初の子要素がない場合、末尾に追加
            }
          });
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return _createNewDivElement2.apply(this, arguments);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChatUserListController);

/***/ }),

/***/ "./resources/js/module/component/messageTemplates/InitializeTemplate.js":
/*!******************************************************************************!*\
  !*** ./resources/js/module/component/messageTemplates/InitializeTemplate.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InitializeTemplate)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var InitializeTemplate = /*#__PURE__*/function () {
  function InitializeTemplate() {
    _classCallCheck(this, InitializeTemplate);
  }
  return _createClass(InitializeTemplate, null, [{
    key: "initialize",
    value: function initialize() {
      document.querySelectorAll(".template-card").forEach(function (card) {
        return card.classList.remove("selected");
      });
      document.querySelectorAll(".select-btn").forEach(function (card) {
        return card.classList.remove("selected");
      });
      document.querySelectorAll(".select-btn").forEach(function (card) {
        return card.innerHTML = "選択";
      });
      document.querySelector(".selected-templates-chat").style.dispay = "none";
      document.querySelector(".selected-templates-messages").innerHTML = "";
      document.querySelector(".use-all-templates-btn").innerHTML = "選択したテンプレートを使用 (0)";
      document.querySelector(".use-all-templates-btn").disabled = true;
    }
  }]);
}();


/***/ }),

/***/ "./resources/js/module/component/messageTemplates/MessageTemplate.js":
/*!***************************************************************************!*\
  !*** ./resources/js/module/component/messageTemplates/MessageTemplate.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageTemplate)
/* harmony export */ });
/* harmony import */ var _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/apiEndPoints */ "./resources/js/config/apiEndPoints.js");
/* harmony import */ var _util_api_Fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/api/Fetch */ "./resources/js/module/util/api/Fetch.js");
/* harmony import */ var _templates_elementTemplate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../templates/elementTemplate */ "./resources/js/module/component/templates/elementTemplate.js");
/* harmony import */ var _UpdateTemplateView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UpdateTemplateView */ "./resources/js/module/component/messageTemplates/UpdateTemplateView.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }




var _MessageTemplate_brand = /*#__PURE__*/new WeakSet();
var MessageTemplate = /*#__PURE__*/function () {
  function MessageTemplate() {
    _classCallCheck(this, MessageTemplate);
    // 展開ボタンの機能
    _classPrivateMethodInitSpec(this, _MessageTemplate_brand);
    // カード要素の取得
    this.templateCards = document.querySelectorAll('.template-card');
    this.expandBtns = document.querySelectorAll('.expand-btn');
    this.selectedName = document.getElementById('selected-template-name');
    this.selectedContent = document.getElementById('selected-template-content');
    this.copyBtn = document.getElementById('copy-template');
    this.useTemplateBtn = document.getElementById('use-template');

    // フィルター関連の要素
    this.filterButtons = document.querySelectorAll('.filter-button');
    this.clearFilterBtn = document.querySelector('.clear-filter');
    this.noResultsMessage = document.querySelector('.no-results');

    // アクティブなフィルターを追跡する配列
    this.activeFilters = [];
    this.initialize();
  }
  return _createClass(MessageTemplate, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;
      this.filterButtons.forEach(function (filterButton) {
        filterButton.addEventListener("click", _assertClassBrand(_MessageTemplate_brand, _this, _handleFilter).bind(_this));
      });
      this.clearFilterBtn.addEventListener("click", _assertClassBrand(_MessageTemplate_brand, this, _handleClearFilter).bind(this));
      this.expandBtns.forEach(function (expandBtn) {
        expandBtn.addEventListener("click", _assertClassBrand(_MessageTemplate_brand, _this, _handleExpand).bind(_this));
      });
    }
  }]);
}();
function _handleExpand(event) {
  var card = event.target.closest('.template-card');
  var content = card.querySelector('.template-content');
  content.classList.toggle('active');
  event.target.classList.toggle('active');
}
function _handleClearFilter() {
  // すべてのフィルターボタンからアクティブクラスを削除
  this.filterButtons.forEach(function (btn) {
    btn.classList.remove('active');
  });

  // アクティブなフィルターをクリア
  this.activeFilters = [];

  // フィルターを再適用（すべて表示）
  _assertClassBrand(_MessageTemplate_brand, this, _applyFilters).call(this);
}
// フィルターボタンのイベントリスナー
function _handleFilter(event) {
  var tag = event.target.getAttribute('data-id');
  this.filterButtons.forEach(function (btn) {
    return btn.classList.remove("active");
  });

  // ボタンのアクティブ状態を切り替え
  event.target.classList.add('active');
  this.activeFilters = [];
  // アクティブなフィルターリストを更新
  if (event.target.classList.contains('active')) {
    this.activeFilters.push(tag);
  }

  // フィルターを適用
  _assertClassBrand(_MessageTemplate_brand, this, _applyFilters).call(this);
}
// フィルターを適用する関数
function _applyFilters() {
  return _applyFilters2.apply(this, arguments);
}
function _applyFilters2() {
  _applyFilters2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var _this2 = this;
    var activeFilters, visibleCount, templateWrapper;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          activeFilters = [];
          visibleCount = 0;
          templateWrapper = document.querySelector(".templates-grid");
          this.templateCards.forEach(function (card) {
            var cardTags = card.getAttribute('data-category-id').split(',');
            // アクティブなフィルターがない場合はすべて表示
            if (_this2.activeFilters.length === 0) {
              activeFilters.push(card);
              card.classList.remove('hidden');
              visibleCount++;
            } else {
              // カードがアクティブなフィルターのいずれかに一致するか確認
              var isVisible = _this2.activeFilters.some(function (filter) {
                return cardTags.includes(filter);
              });
              if (isVisible) {
                activeFilters.push(card);
                card.classList.remove('hidden');
                visibleCount++;
              } else {
                card.classList.add('hidden');
              }
            }
          });
          activeFilters.sort(function (a, b) {
            return parseInt(a.dataset.order) - parseInt(b.dataset.order);
          });
          activeFilters.forEach(function (card) {
            templateWrapper.appendChild(card);
          });
          _UpdateTemplateView__WEBPACK_IMPORTED_MODULE_3__["default"].getInstance();

          // 表示されているカードがなければ「結果なし」メッセージを表示
          if (visibleCount === 0) {
            this.noResultsMessage.style.display = 'block';
          } else {
            this.noResultsMessage.style.display = 'none';
          }
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return _applyFilters2.apply(this, arguments);
}


/***/ }),

/***/ "./resources/js/module/component/messageTemplates/UpdateTemplateView.js":
/*!******************************************************************************!*\
  !*** ./resources/js/module/component/messageTemplates/UpdateTemplateView.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UpdateTemplateView)
/* harmony export */ });
/* harmony import */ var _util_FormatText__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/FormatText */ "./resources/js/module/util/FormatText.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }

var _UpdateTemplateView_brand = /*#__PURE__*/new WeakSet();
var UpdateTemplateView = /*#__PURE__*/function () {
  function UpdateTemplateView() {
    _classCallCheck(this, UpdateTemplateView);
    /**
     * ボタンのテキストと状態を更新する
     * 
     * @returns {void}
     */
    _classPrivateMethodInitSpec(this, _UpdateTemplateView_brand);
    // すでにインスタンスが存在する場合はエラーを投げる
    if (_instance._) {
      throw new Error("UpdateTemplateViewのインスタンスは1つしか作成できません。getInstance()を使用してください。");
    }
    this.selectedTemplates = []; //選択されたテンプレートを格納 
    this.singleTemplateDisplay = document.querySelector('.selected-template-display');
    this.messagesContainer = document.querySelector('.selected-templates-messages');
    this.useAllBtn = document.querySelector('.use-all-templates-btn');
    this.chatViewContainer = document.createElement('div');
    this.templateCards = document.querySelectorAll('.template-card');
    this.generateChatViewContainer();
    this.addChatViewContainer();
    this.addClickEventToSelectButton();
    this.index = 0;

    // このインスタンスを静的プロパティに保存
    _instance._ = this;
  }
  return _createClass(UpdateTemplateView, [{
    key: "resetIndex",
    value: function resetIndex() {
      this.index = 0;
    }
    /**
     * 選択されたテンプレートを表示するためのチャットビューコンテナを生成する
     * 
     * @returns {HTMLElement} 設定済みのチャットビューコンテナ要素
     */
  }, {
    key: "generateChatViewContainer",
    value: function generateChatViewContainer() {
      this.chatViewContainer.className = 'selected-templates-chat';
      this.chatViewContainer.innerHTML = "\n                  <h3 class=\"selected-templates-title\">\u9078\u629E\u3055\u308C\u305F\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8</h3>\n                  <div class=\"selected-templates-messages\"></div>\n                  <div class=\"selected-templates-actions\">\n                        <button class=\"use-all-templates-btn\" type=\"submit\" disabled>\u9078\u629E\u3057\u305F\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u4F7F\u7528 (0)</button>\n                  </div>\n            ";
      this.useAllBtn = this.chatViewContainer.querySelector(".use-all-templates-btn");
      this.messagesContainer = this.chatViewContainer.querySelector(".selected-templates-messages");
    }

    /**
     * チャット一覧の下にチャットビューコンテナを挿入する
     * 
     * @returns {void}
     */
  }, {
    key: "addChatViewContainer",
    value: function addChatViewContainer() {
      this.singleTemplateDisplay.appendChild(this.chatViewContainer);
    }
  }, {
    key: "updateSelectedTemplatesView",
    value:
    /**
     * 選択されたテンプレートのビューを更新する
     * 
     * @returns {void}
     */
    function updateSelectedTemplatesView() {
      var _this = this;
      var messageEl = _assertClassBrand(_UpdateTemplateView_brand, this, _generateSelectedTemplateElement).call(this);
      this.messagesContainer.appendChild(messageEl);
      // テンプレート選択解除処理
      document.querySelectorAll('.remove-template-btn').forEach(function (btn) {
        var newBtn = btn.cloneNode(true);
        btn.replaceWith(newBtn);
        newBtn.addEventListener('click', function (event) {
          _this.removeButton(event);
          _assertClassBrand(_UpdateTemplateView_brand, _this, _updateBtnTextAndState).call(_this);
        });
      });

      // テンプレートの編集処理
      document.querySelectorAll(".js_edit_btn").forEach(function (btn) {
        btn.addEventListener("click", function (event) {
          _this.editTemplate(event);
        });
      });

      // Show or hide the chat view based on selection
      this.chatViewContainer.style.display = this.selectedTemplates ? 'block' : 'none';
    }

    /**
     * テンプレート編集処理(テキストのみメッセージの編集可能)
     * 
     * @param {Event} event - クリックイベント
     * @returns {void}
     */
  }, {
    key: "editTemplate",
    value: function editTemplate(event) {
      var parentElement = event.target.closest(".chat-message-container");
      var textareas = parentElement.querySelectorAll(".template_textarea");
      textareas.forEach(function (textarea) {
        textarea.classList.add("active");
        textarea.readOnly = false;
      });
    }
    /**
     * テンプレート削除ボタンのクリックイベントハンドラ
     * 
     * @param {Event} event - クリックイベント
     * @returns {void}
     */
  }, {
    key: "removeButton",
    value: function removeButton(event) {
      var id = event.target.dataset.templateId;
      var targetTemplate = Array.from(document.querySelectorAll(".chat-message-container")).find(function (container) {
        return container.dataset.templateId === id;
      });
      var card = Array.from(document.querySelectorAll(".template-card")).find(function (container) {
        return container.dataset.templateId === id;
      });
      this.index = this.index - Number(targetTemplate.dataset.count);
      this.messagesContainer.removeChild(targetTemplate);
      if (card) {
        card.classList.remove('selected');
        var selectBtn = card.querySelector('.select-btn');
        if (selectBtn) {
          selectBtn.classList.remove('selected');
          selectBtn.textContent = '選択';
        }
      }
    }

    /**
     * テンプレートカードの選択ボタンにクリックイベントを追加する
     * 
     * @returns {void}
     */
  }, {
    key: "addClickEventToSelectButton",
    value: function addClickEventToSelectButton() {
      var _this2 = this;
      this.templateCards.forEach(function (card) {
        // Add a data-id attribute if it doesn't exist
        if (!card.hasAttribute('data-id')) {
          card.setAttribute('data-id', 'template-' + Math.random().toString(36).substr(2, 9));
        }
        var selectBtn = card.querySelector('.select-btn');
        if (selectBtn) {
          var newBtn = selectBtn.cloneNode(true);
          selectBtn.replaceWith(newBtn);
          newBtn.addEventListener('click', function (e) {
            var _card$querySelector;
            e.stopPropagation(); // Prevent card expansion if clicking the button

            var isSelected = card.classList.contains('selected');
            var templateId = card.getAttribute('data-id');
            var templateTitle = ((_card$querySelector = card.querySelector('.template-title')) === null || _card$querySelector === void 0 ? void 0 : _card$querySelector.textContent) || 'テンプレート';
            var templateContents = card.querySelectorAll('.template-message');
            var templateImages = card.querySelectorAll('.template-image');
            var contentsArr = [];
            templateContents.forEach(function (content) {
              var data = {
                "content": content.textContent,
                "order": content.dataset.order,
                "type": "text"
              };
              contentsArr.push(data);
            });
            templateImages.forEach(function (image) {
              var _image$dataset$cropAr;
              var data = {
                "content": image.src,
                "order": image.dataset.order,
                "type": "image",
                "cropArea": (_image$dataset$cropAr = image.dataset.cropArea) !== null && _image$dataset$cropAr !== void 0 ? _image$dataset$cropAr : null
              };
              contentsArr.push(data);
            });
            if (isSelected) {
              var id = card.dataset.templateId;
              var targetTemplate = Array.from(document.querySelectorAll(".chat-message-container")).find(function (container) {
                return container.dataset.templateId === id;
              });
              _this2.messagesContainer.removeChild(targetTemplate);

              // Update UI
              card.classList.remove('selected');
              newBtn.classList.remove('selected');
              newBtn.textContent = '選択';
              _this2.index = _this2.index - Number(targetTemplate.dataset.count);
            } else {
              _this2.selectedTemplates = {
                id: templateId,
                title: templateTitle,
                contents: contentsArr,
                template_id: card.dataset.templateId,
                count: templateContents.length + templateImages.length
              };

              // Update UI
              card.classList.add('selected');
              newBtn.classList.add('selected');
              newBtn.textContent = '選択済み';

              // Update the chat view
              _this2.updateSelectedTemplatesView();
            }
            _assertClassBrand(_UpdateTemplateView_brand, _this2, _updateBtnTextAndState).call(_this2);
          });
        }
      });
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!_instance._) {
        _instance._ = new UpdateTemplateView();
      }
      return _instance._;
    }
  }]);
}();
function _updateBtnTextAndState() {
  this.useAllBtn.textContent = "\u9078\u629E\u3057\u305F\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u4F7F\u7528 (".concat(document.querySelectorAll(".chat-message-container").length, ")");
  this.useAllBtn.disabled = document.querySelectorAll(".chat-message-container").length === 0;
}
/**
 * 選択されたテンプレート要素を生成する
 * 
 * @param {Object} template - テンプレートオブジェクト
 * @param {number} index - テンプレートのインデックス
 * @returns {HTMLElement} 生成されたテンプレート要素
 */
function _generateSelectedTemplateElement() {
  var _this3 = this;
  var contents = _assertClassBrand(_UpdateTemplateView_brand, this, _formatContents).call(this);
  var messageEl = document.createElement('div');
  messageEl.className = 'chat-message-container';
  messageEl.dataset.count = this.selectedTemplates["count"];
  messageEl.dataset.templateId = this.selectedTemplates["template_id"];
  var messageContents = "";
  contents.forEach(function (content) {
    if (content.content_type === "text") {
      messageContents += "\n                        <input type=\"hidden\" class=\"template_type\" name=\"contents[".concat(_this3.index, "][type]\" value=\"text\"/>\n                        <textarea maxlength=\"1000\"class=\"template_textarea\" name=\"contents[").concat(_this3.index, "][content]\" readonly>").concat(_util_FormatText__WEBPACK_IMPORTED_MODULE_0__["default"].escapeHtml(content.content), "</textarea>\n                        ");
    } else if (content.content_type === "image") {
      messageContents += "\n                        <div style=\"display: flex;\">\n                              <input type=\"hidden\" class=\"template_type\"  name=\"contents[".concat(_this3.index, "][type]\" value=\"image\"/>\n                              <input type=\"hidden\" class=\"template_images\" name=\"contents[").concat(_this3.index, "][image_path]\" value=\"").concat(content.content, "\"/>\n                              <input type=\"hidden\" class\"template_croparea name=\"contents[").concat(_this3.index, "][cropArea]\" value='").concat(content.cropArea, "'/>\n                              <img src='").concat(content.content, "'/>\n                        </div>");
    }
    _this3.index++;
  });
  messageEl.innerHTML = "\n                  <div class=\"chat-message-header\">\n                        <span class=\"template-title\">".concat(_util_FormatText__WEBPACK_IMPORTED_MODULE_0__["default"].escapeHtml(this.selectedTemplates.title), " / <i class=\"fa-solid fa-pen-to-square js_edit_btn\"></i></span>\n                        <button class=\"remove-template-btn\" data-template-id=\"").concat(this.selectedTemplates.template_id, "\">\u2715</button>\n                  </div>\n                  <div class=\"chat-message-body\">\n                        <input type=\"hidden\" name=\"admin_uuid\" class=\"template_admin_uuid\" value=\"").concat(document.getElementById("js_sender_id").value, "\"/>\n                        <input type=\"hidden\" name=\"user_uuid\" class=\"template_user_uuid\" value=\"").concat(document.getElementById("js_receiver_id").value, "\"/>\n                        ").concat(messageContents, "\n                  </div>\n            ");
  return messageEl;
}
/**
 * 選択されたテンプレート要素を順番通りに並び替える
 * 
 * @param {Object} template - テンプレートオブジェクト
 * @returns {Array} 生成されたテンプレート要素
 */
function _formatContents() {
  var data = [];
  var index = 0;
  var maxOrder = 0;
  // order が最も大きい値を探す
  if (this.selectedTemplates["contents"].length > 0) {
    maxOrder = Math.max.apply(Math, _toConsumableArray(this.selectedTemplates["contents"].map(function (content) {
      // orderが数値でない場合は数値に変換
      var orderVal = parseInt(content.order) || 0;
      return orderVal;
    })));
  }
  while (index <= maxOrder) {
    var _this$selectedTemplat;
    var targetContent = (_this$selectedTemplat = this.selectedTemplates["contents"]) === null || _this$selectedTemplat === void 0 ? void 0 : _this$selectedTemplat.find(function (content) {
      return content["order"] == index;
    });
    if (targetContent) {
      var _targetContent$cropAr;
      data.push({
        "content": targetContent["content"],
        "content_type": targetContent["type"],
        "cropArea": (_targetContent$cropAr = targetContent["cropArea"]) !== null && _targetContent$cropAr !== void 0 ? _targetContent$cropAr : null,
        "template_id": this.selectedTemplates["template_id"]
      });
    }
    index++;
  }
  return data;
}
/**
 * UpdateTemplateViewのコンストラクタ
 * 必要な要素の取得と初期設定を行う
 */
var _instance = {
  _: null
};


/***/ }),

/***/ "./resources/js/module/component/templates/elementTemplate.js":
/*!********************************************************************!*\
  !*** ./resources/js/module/component/templates/elementTemplate.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createChatUserContainer: () => (/* binding */ createChatUserContainer),
/* harmony export */   createLeftMessageContainer: () => (/* binding */ createLeftMessageContainer),
/* harmony export */   createRightMessageContainer: () => (/* binding */ createRightMessageContainer)
/* harmony export */ });
/* harmony import */ var _util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/messaging/messageService.js */ "./resources/js/module/util/messaging/messageService.js");
/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/config.js */ "./resources/js/config/config.js");
/* harmony import */ var _util_FormatText_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/FormatText.js */ "./resources/js/module/util/FormatText.js");



var createRightMessageContainer = function createRightMessageContainer(message_type, time, content, cropArea, type) {
  if (typeof cropArea === "string") {
    cropArea = JSON.parse(cropArea);
  }
  var rawHtml = "";
  if (Object.entries(cropArea).length > 0) {
    rawHtml = "\n            <div class=\"image-container\" style=\"position: relative; display: inline-block; margin: 5px 0;\" data-crop='".concat(JSON.stringify(cropArea), "'>\n                  <img src=\"").concat(_config_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].S3_URL, "/").concat(content, "\" alt=\"Image\" class=\"chat-margin5 chat_image overlay-target js_chat_message\" style=\"margin: 0;\"/>\n                  <a class=\"overlay\" href=\"").concat(cropArea.url, "\" style=\"display: none;\"></a>\n            </div>\n            ");
  } else {
    rawHtml = "\n                  <div class=\"image-container\" style=\"position: relative; display: inline-block; margin: 5px 0;\" >\n                        <img src=\"".concat(_config_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].S3_URL, "/").concat(content, "\" alt=\"Image\" class=\"chat-margin5 chat_image js_chat_message\" style=\"margin: 0;\"/>\n                  </div>\n            ");
  }

  // テキストに含まれてるURLをaタグに変換する
  var escapedContent = _util_FormatText_js__WEBPACK_IMPORTED_MODULE_2__["default"].escapeHtml(content);
  var linkedMessage = (0,_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.linkifyContent)(escapedContent);
  var displayMessage = linkedMessage;
  if (document.getElementById("js_user_name") && type == "greeting") {
    var _document$getElementB;
    displayMessage = linkedMessage.replace(/{名前}/g, ((_document$getElementB = document.getElementById("js_user_name")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value) || '');
  }

  // 共通の改行処理
  displayMessage = displayMessage.replace(/&lt;br&gt;/g, '\n') // エスケープされた<br>タグを改行に変換
  .replace(/\n/g, '<br>'); // 改行を<br>タグに戻す

  return "\n            <div class=\"chat__message-container-right\">\n                  <div class=\"chat__mesgae-main-right\">\n                        <div class=\"chat__message-time-txt\">".concat(time, "</div>\n                        ").concat(message_type === "text" || message_type === "broadcast_text" || message_type === "greeting_text" ? "<div class=\"chat__message-box-right chat-margin5 js_chat_message\">".concat(displayMessage, "</div>") : "".concat(rawHtml), "\n                  </div>\n            </div>\n      ");
};
var createLeftMessageContainer = function createLeftMessageContainer(message_type, time, content, cropArea, type) {
  var _document$getElementB2;
  var src = (_document$getElementB2 = document.getElementById("js_user_icon_img")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value;
  var icon_src = src === "" ? "/img/user.png" : src;

  // テキストに含まれてるURLをaタグに変換する前にエスケープ
  var escapedContent = _util_FormatText_js__WEBPACK_IMPORTED_MODULE_2__["default"].escapeHtml(content);
  var linkedMessage = (0,_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.linkifyContent)(escapedContent);
  var displayMessage = linkedMessage;
  if (document.getElementById("js_user_name") && type === "greeting") {
    var _document$getElementB3;
    displayMessage = linkedMessage.replace(/{名前}/g, ((_document$getElementB3 = document.getElementById("js_user_name")) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value) || '');
  }

  // 共通の改行処理
  displayMessage = displayMessage.replace(/&lt;br&gt;/g, '\n') // エスケープされた<br>タグを改行に変換
  .replace(/\n/g, '<br>'); // 改行を<br>タグに戻す

  if (typeof cropArea === "string") {
    cropArea = JSON.parse(cropArea);
  }
  var rawHtml = "";
  if (Object.entries(cropArea).length > 0) {
    rawHtml = "\n            <div class=\"image-container\" style=\"position: relative; display: inline-block; margin: 5px 0;\" data-crop='".concat(JSON.stringify(cropArea), "'>\n                  <img src=\"").concat(_config_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].S3_URL, "/").concat(content, "\" alt=\"Image\" class=\"chat-margin5 chat_image overlay-target js_chat_message\" style=\"margin: 0;\"/>\n                  <a class=\"overlay\" href=\"").concat(cropArea.url, "\" style=\"display: none;\"></a>\n            </div>\n            ");
  } else {
    rawHtml = "\n            <div class=\"image-container\" style=\"position: relative; display: inline-block; margin: 5px 0;\" >\n                  <img src=\"".concat(_config_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].S3_URL, "/").concat(content, "\" alt=\"Image\" class=\"chat-margin5 chat_image js_chat_message\" style=\"margin: 0;\"/>\n            </div>\n            ");
  }
  return "\n            <div class=\"chat__message-container-left\">\n                  <div class=\"chat__mesgae-main-left\">\n                        <img src=".concat(icon_src, " alt=\"\" class=\"chat_users-icon-message\" onerror=\"this.onerror=null; this.src='/img/user.png';\" id=\"icon_msg\"> \n                        ").concat(message_type === "text" || message_type === "broadcast_text" || message_type === "greeting_text" || message_type === "test_txt" ? "<div class=\"chat__message-box-left chat-margin5 js_chat_message\">".concat(displayMessage, "</div>") : "".concat(rawHtml), "\n                        <div class=\"chat__message-time-txt\">").concat(time, "</div>\n                  </div> \n            </div>\n      ");
};
var createChatUserContainer = function createChatUserContainer(sender_id, res) {
  var countDivStyle = document.getElementById("js_chatuser_id").value == sender_id || res["unread_count"] == null || res["unread_count"] === 0 ? "none" : "flex";
  var countinnerHTML = document.getElementById("js_chatuser_id").value == sender_id || res["unread_count"] == null || res["unread_count"] === 0 ? 0 : res["unread_count"];
  return "\n            <div class=\"chat__users-list-wraper js_chat_wrapper js_user_btn\" style=\"margin-top: 0\" data-uuid=\"".concat(sender_id, "\" data-id=\"").concat(res["id"], "\" data-admin-id=\"").concat(document.getElementById("js_admin_id").value, "\">\n                  <input type=\"hidden\" name=\"admin_id\" class=\"js_admin_el\">\n                  <input type=\"hidden\" name=\"user_id\" class=\"js_user_el\">\n                  <input type=\"hidden\" name=\"token\" class=\"js_token\">\n                  <img src=").concat(res["user_picture"], " alt=\"\" onerror=\"this.onerror=null; this.src='/img/user.png';\" class=\"chat_users-icon\"> \n                  <div class=\"chat_users-list-flex\">\n                        <div class=\"chat_users-list-box\" > \n                              <p class=\"chat_name_txt\" data-simplebar>").concat(res["line_name"], "</p>\n                              <small class=\"chat_time js_update_message_time\" data-id=\"").concat(sender_id, "\">").concat(res["latest_message_date"], "</small>\n                        </div>  \n                        <div class=\"chat__users-list-msg\">\n                              <small class=\"chat_message js_chatMessage_elment\" data-id=\"").concat(sender_id, "\">").concat(_util_FormatText_js__WEBPACK_IMPORTED_MODULE_2__["default"].escapeHtml(res["latest_all_message"]), "</small>\n                              <div class=\"message_count js_mesage_count\" data-id=\"").concat(sender_id, "\" style=\"display:").concat(countDivStyle, "\">").concat(countinnerHTML, "</div>\n                        </div>\n                  </div>\n            </div>\n      ");
};

/***/ }),

/***/ "./resources/js/module/component/ui/ButtonController.js":
/*!**************************************************************!*\
  !*** ./resources/js/module/component/ui/ButtonController.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var ButtonController = /*#__PURE__*/function () {
  function ButtonController() {
    _classCallCheck(this, ButtonController);
  }
  return _createClass(ButtonController, null, [{
    key: "replaceButton",
    value:
    /**
    * ボタンを新しいボタンに置き換える処理
    * イベントリスナーの重複をさけるため
    * 
    * @param {string} buttonId - 置き換えるボタンのID
    * @returns {HTMLElement} - 新しく置き換えられたボタン要素
    */
    function replaceButton(buttonId) {
      var oldSelectBtn = document.getElementById(buttonId);
      if (!oldSelectBtn || !oldSelectBtn.parentNode) {
        console.error("親要素が見つかりません: js_change_area");
        return;
      }
      var newSelectBtn = oldSelectBtn.cloneNode(true);
      oldSelectBtn.parentNode.replaceChild(newSelectBtn, oldSelectBtn);
      return newSelectBtn;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ButtonController);

/***/ }),

/***/ "./resources/js/module/component/ui/FormController.js":
/*!************************************************************!*\
  !*** ./resources/js/module/component/ui/FormController.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/apiEndPoints */ "./resources/js/config/apiEndPoints.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/config */ "./resources/js/config/config.js");
/* harmony import */ var _util_api_Fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/api/Fetch */ "./resources/js/module/util/api/Fetch.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }



var MAX_HEIGHT = "200px";
/**
 * FromController
 * formの処理に関するロジックをまとめたクラス
 */
var _FromController_brand = /*#__PURE__*/new WeakSet();
var FromController = /*#__PURE__*/function () {
  function FromController() {
    _classCallCheck(this, FromController);
    /**
     * ユーティリティ関数: 隠し input 要素を作成
     * @param {string} name - input 名称
     * @param {string} value - input 値
     * @returns {HTMLElement} - 作成された input 要素
     */
    _classPrivateMethodInitSpec(this, _FromController_brand);
  }
  return _createClass(FromController, [{
    key: "submitRedirectForm",
    value: (
    /**
     * 指定された情報を基にフォームを生成してリダイレクトを実行
     *
     * @param {string} adminId - 管理者ID
     * @param {string} userId - ユーザーID
     */
    function () {
      var _submitRedirectForm = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(adminId, userId) {
        var token, form;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _util_api_Fetch__WEBPACK_IMPORTED_MODULE_2__["default"].fetchGetOperation(_config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__.API_ENDPOINTS.GENERATE_TOKEN);
            case 2:
              token = _context.sent;
              form = document.createElement("form");
              form.method = "POST";
              form.action = _config_config__WEBPACK_IMPORTED_MODULE_1__["default"].CHAT_URL;
              form.style.visibility = "hidden";
              form.enctype = "application/x-www-form-urlencoded";
              form.appendChild(_assertClassBrand(_FromController_brand, this, _createHiddenInput).call(this, "token", token));
              form.appendChild(_assertClassBrand(_FromController_brand, this, _createHiddenInput).call(this, "admin_id", adminId));
              form.appendChild(_assertClassBrand(_FromController_brand, this, _createHiddenInput).call(this, "user_id", userId));
              document.body.appendChild(form);
              form.submit();
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function submitRedirectForm(_x, _x2) {
        return _submitRedirectForm.apply(this, arguments);
      }
      return submitRedirectForm;
    }())
  }], [{
    key: "changeTextareaHeight",
    value:
    /**
     * inputタグの高さを文字の長さにあわせて変更する処理
     */
    function changeTextareaHeight() {
      var textarea = document.getElementById('js_msg');
      var height = textarea.clientHeight;
      textarea.addEventListener('input', autoResize, false);
      function autoResize() {
        if (this.scrollHeight > height) {
          this.style.height = 'auto'; // 高さをリセット
          this.style.maxHeight = MAX_HEIGHT;
          this.style.height = this.scrollHeight + 'px'; // 内容に合わせて高さを設定
          document.querySelector(".chat__form-flex").style.alignItems = "end";
        } else {
          document.querySelector(".chat__form-flex").style.alignItems = "center";
        }
      }
    }

    /**
     * ユーザーから入力があったか否かで、ボタンのスタイルを変更
     */
  }, {
    key: "disableSubmitBtn",
    value: function disableSubmitBtn() {
      var field = document.getElementById("js_msg");
      var btn = document.querySelector(".chat__form-submit");
      field.addEventListener("input", function (e) {
        var value = e.currentTarget.value;
        if (value.length > 0) {
          btn.classList.remove("disabled_btn");
        } else {
          btn.classList.add("disabled_btn");
        }
      });
    }
  }, {
    key: "resetCropperUIElements",
    value:
    /**
     * 画像リンク作成モーダルで毎回開いたときの初期化
     */
    function resetCropperUIElements() {
      var urlInput = document.getElementById("js_url_input");
      var selectBtn = document.getElementById("js_change_area");
      var previewBtn = document.getElementById("js_preview_submit_btn");
      var choices = document.getElementsByName('choice');
      var setting = document.getElementById("js_url_setting");
      choices.forEach(function (choice) {
        if (choice.value == "off") choice.checked = true;
      });
      setting.classList.add("hidden");
      urlInput.value = "";
      selectBtn.innerHTML = "選択範囲確定";
      selectBtn.style.backgroundColor = "#fff";
      // selectBtn.classList.add("disabled_btn")
      previewBtn.classList.remove("disabled_btn");
    }
  }, {
    key: "showCropperSetting",
    value: function showCropperSetting() {
      var setting = document.getElementById("js_url_setting");
      setting.classList.remove("hidden");
      document.getElementById("js_preview_submit_btn").classList.add("disabled_btn");
      var checkOff = document.getElementById("flexRadioDefault1");
      var checkOn = document.getElementById("flexRadioDefault2");
      checkOff.checked = false;
      checkOn.checked = true;
    }
  }]);
}();
function _createHiddenInput(name, value) {
  var input = document.createElement("input");
  input.type = "hidden";
  input.name = name;
  input.value = value;
  return input;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FromController);

/***/ }),

/***/ "./resources/js/module/component/ui/ModalController.js":
/*!*************************************************************!*\
  !*** ./resources/js/module/component/ui/ModalController.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * ModalController
 * 各モーダルの表示切替のロジックを管理するクラス
 */
var ModalController = /*#__PURE__*/function () {
  function ModalController() {
    _classCallCheck(this, ModalController);
  }
  return _createClass(ModalController, null, [{
    key: "open_modal",
    value:
    /**
     * モーダルを開く
     * @param {HTMLElement} modal - モーダル要素
     */
    function open_modal(modal) {
      document.querySelector(".bg").classList.remove("hidden");
      modal.classList.remove("hidden");
    }
  }, {
    key: "open_management_modal",
    value: function open_management_modal(modal) {
      document.querySelector(".template_bg").classList.remove("hidden");
      modal.classList.remove("hidden");
    }
  }, {
    key: "close_modal",
    value: function close_modal() {
      var modals = document.querySelectorAll(".js_modal");
      var bg = document.querySelector(".bg");
      var loader = document.querySelector(".js_loader");
      bg.addEventListener("click", function () {
        modals.forEach(function (modal) {
          modal.classList.add("hidden");
          bg.classList.add("hidden");
          loader.classList.add("hidden");
        });
      });
    }

    // ローダーを表示する処理
  }, {
    key: "open_loader",
    value: function open_loader() {
      document.querySelector(".bg").classList.remove("hidden");
      document.querySelector(".loader").classList.remove("hidden");
    }

    // ローダーを閉じる処理
  }, {
    key: "close_loader",
    value: function close_loader() {
      document.querySelector(".bg").classList.add("hidden");
      document.querySelector(".loader").classList.add("hidden");
    }
  }, {
    key: "open_image_modal",
    value: function open_image_modal() {
      var isAdmin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var images = document.querySelectorAll(".chat_image");
      var image_modal = document.querySelector(".js_image_src");
      var bg = document.querySelector(".black_bg");
      var close_button = document.querySelector(".close_button");
      images.forEach(function (img) {
        if (img.parentElement.getAttribute("data-crop") == null || img.parentElement.getAttribute("data-crop") == "null") {
          img.addEventListener("click", function (e) {
            var target_img = e.currentTarget.src;
            bg.classList.remove("hidden");
            image_modal.classList.remove("hidden");
            close_button.classList.remove("hidden");
            document.querySelector(".js_image_src").src = target_img;
          });
        }
      });
      close_button.addEventListener("click", function () {
        ModalController.close_image();
      });
      if (isAdmin) {
        image_modal.addEventListener("click", function () {
          ModalController.close_image();
        });
      }
    }
  }, {
    key: "close_image_by_key",
    value: function close_image_by_key() {
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && document.querySelector(".js_image_src").classList.contains("hidden") == false) {
          ModalController.close_image();
        }
      });
    }
  }, {
    key: "close_image",
    value: function close_image() {
      var image_modal = document.querySelector(".js_image_src");
      var bg = document.querySelector(".black_bg");
      var close_button = document.querySelector(".close_button");
      bg.classList.add("hidden");
      image_modal.classList.add("hidden");
      close_button.classList.add("hidden");
    }

    // cropper編集と、template作成モーダルを閉じる処理
  }, {
    key: "close_management_modal",
    value: function close_management_modal() {
      var bg = document.querySelector(".template_bg");
      var imageEditModal = document.querySelector(".image_edit_modal");
      var confirm_modal = document.getElementById("js_bulk_confirm_modal");
      var templateModal = document.getElementById("js_messageSetting_modal");
      var cancelBtn = document.getElementById("js_cancel_btn");
      var closeBtn = document.querySelector(".js_close_modal_btn");
      bg.addEventListener("click", function () {
        // cropper編集モーダルを閉じる処理
        if (!imageEditModal.classList.contains("hidden")) {
          // cropper編集モーダルを閉じた際に、対するfileInputの中身を空にする処理
          var _bg = document.querySelector(".template_bg");
          var imageIndex = _bg.dataset.number;
          var fileInput = document.getElementById("fileUpload_".concat(imageIndex));
          fileInput.value = "";
          _bg.dataset.number = "";
          imageEditModal.classList.add("hidden");
        } else {
          // メッセージ生成モーダルを閉じる処理
          confirm_modal.classList.remove("hidden");
          templateModal.style.zIndex = "997";
          cancelBtn.addEventListener("click", function () {
            confirm_modal.classList.add("hidden");
            templateModal.style.zIndex = "998";
          });
          closeBtn.addEventListener("click", function () {
            window.location.reload();
          });
        }
      });
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModalController);

/***/ }),

/***/ "./resources/js/module/util/BrowserAndDeviceDetector.js":
/*!**************************************************************!*\
  !*** ./resources/js/module/util/BrowserAndDeviceDetector.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BrowserAndDeviceDetector = /*#__PURE__*/function () {
  function BrowserAndDeviceDetector() {
    _classCallCheck(this, BrowserAndDeviceDetector);
  }
  return _createClass(BrowserAndDeviceDetector, null, [{
    key: "isBrave",
    value: function isBrave() {
      var userAgent = navigator.userAgent.toLowerCase();
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
  }, {
    key: "isEdge",
    value: function isEdge() {
      var userAgent = navigator.userAgent.toLowerCase();
      // Edgeの特定
      return userAgent.includes("edg") && !userAgent.includes("edgehtml");
    }
  }, {
    key: "isOpera",
    value: function isOpera() {
      var userAgent = navigator.userAgent.toLowerCase();
      // Operaの固有の識別
      return userAgent.includes("opera") || userAgent.includes("opr");
    }
  }, {
    key: "isSafari",
    value: function isSafari() {
      return !BrowserAndDeviceDetector.isOpera && !BrowserAndDeviceDetector.isBrave() && !BrowserAndDeviceDetector.isEdge && /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) && !navigator.userAgent.includes('Chrome');
    }
  }, {
    key: "isChrome",
    value: function isChrome() {
      return navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg');
    }
  }, {
    key: "isFirefox",
    value: function isFirefox() {
      var userAgent = navigator.userAgent.toLowerCase();
      return userAgent.includes("firefox") && !userAgent.includes("seamonkey");
    }
  }, {
    key: "isIOS",
    value: function isIOS() {
      return (/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) && !window.MSStream;
    }
  }, {
    key: "isAndroid",
    value: function isAndroid() {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android/i.test(userAgent) && !window.MSStream;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrowserAndDeviceDetector); // ESモジュール形式でエクスポート

/***/ }),

/***/ "./resources/js/module/util/FormatText.js":
/*!************************************************!*\
  !*** ./resources/js/module/util/FormatText.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormatText)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FormatText = /*#__PURE__*/function () {
  function FormatText() {
    _classCallCheck(this, FormatText);
  }
  return _createClass(FormatText, null, [{
    key: "escapeHtml",
    value:
    /**
     * エスケープ処理
     * @param {string} - エスケープする前の文字列
     * @return {string} - エスケープされた文字列
     */
    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;") // & は最初に変換
      .replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
  }]);
}();


/***/ }),

/***/ "./resources/js/module/util/api/Fetch.js":
/*!***********************************************!*\
  !*** ./resources/js/module/util/api/Fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Fetch = /*#__PURE__*/function () {
  function Fetch() {
    _classCallCheck(this, Fetch);
  }
  return _createClass(Fetch, null, [{
    key: "fetchPostOperation",
    value: function fetchPostOperation(data, url) {
      return fetch("".concat(url), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(response) {
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
        console.error(error);
      });
    }
  }, {
    key: "fetchGetOperation",
    value: function fetchGetOperation(url) {
      return fetch("".concat(url), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {
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
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fetch);

/***/ }),

/***/ "./resources/js/module/util/bulk-messaging/component/forms/MessageFormController.js":
/*!******************************************************************************************!*\
  !*** ./resources/js/module/util/bulk-messaging/component/forms/MessageFormController.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MessageFormController = /*#__PURE__*/function () {
  function MessageFormController() {
    _classCallCheck(this, MessageFormController);
    this.messageList = document.getElementById("js_message-list");
    this.textareas = document.querySelectorAll(".js_textarea");
    this.fileUploads = document.querySelectorAll(".js_file_upload");
    this.previewWrapper = document.querySelector(".chat_wrapper");
  }
  return _createClass(MessageFormController, [{
    key: "clearTextarea",
    value: function clearTextarea() {
      this.messageList.innerHTML = "";
      this.textareas.forEach(function (textarea) {
        textarea.value = "";
      });
      this.fileUploads.forEach(function (upload) {
        upload.value = "";
      });
      this.previewWrapper.innerHTML = "";
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageFormController);

/***/ }),

/***/ "./resources/js/module/util/bulk-messaging/component/ui/UIController.js":
/*!******************************************************************************!*\
  !*** ./resources/js/module/util/bulk-messaging/component/ui/UIController.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var UIController = /*#__PURE__*/function () {
  function UIController() {
    _classCallCheck(this, UIController);
  }
  return _createClass(UIController, null, [{
    key: "displayUploadedImage",
    value:
    // 画像をアップロード画面に表示する処理
    function displayUploadedImage(addedElement, fileURL) {
      var label = addedElement.querySelector(".file_upload");
      var uploadImgElement = addedElement.querySelector(".js_upload_img");
      uploadImgElement.src = fileURL;
      label.classList.add("hidden");
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIController);

/***/ }),

/***/ "./resources/js/module/util/bulk-messaging/template/createHtml.js":
/*!************************************************************************!*\
  !*** ./resources/js/module/util/bulk-messaging/template/createHtml.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMessageHtml: () => (/* binding */ createMessageHtml),
/* harmony export */   createMessageImageHtml: () => (/* binding */ createMessageImageHtml),
/* harmony export */   createPreviewHtml: () => (/* binding */ createPreviewHtml),
/* harmony export */   createPreviewImageHtml: () => (/* binding */ createPreviewImageHtml)
/* harmony export */ });
// メッセージアイテムを作成
var createMessageHtml = function createMessageHtml(index) {
  return "\n            <div class=\"message-item\" data-type=\"text\">\n                <div class=\"message-header\">\n                    <div>\n                        <span class=\"message-type-icon\">T</span>\n                        <span>\u30C6\u30AD\u30B9\u30C8\u30E1\u30C3\u30BB\u30FC\u30B8</span>   \n                    </div>\n                    <div class=\"message-actions\">\n                        <button class=\"message-delete\" data-number=".concat(index, ">\xD7</button>\n                    </div>\n                </div>\n                <div class=\"message-content\">\n                    <textarea placeholder=\"\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u5165\u529B\" style=\"width: -webkit-fill-available;\" class=\"js_textarea\" maxlength=\"1000\" data-number=").concat(index, "></textarea>\n                </div>\n            </div>\n    ");
};

// 画像アイテムを作成
var createMessageImageHtml = function createMessageImageHtml(index) {
  return "\n        <div class=\"message-item\" data-type=\"image\" data-number=".concat(index, ">\n            <div class=\"message-header\">\n                    <div style=\"display: flex; gap: 7px;\">\n                        <span class=\"icon\">\uD83D\uDDBC\uFE0F</span>\n                        <span>\u753B\u50CF</span>   \n                    </div>\n                    <div class=\"message-actions\">\n                        <button class=\"message-delete\" data-number=").concat(index, ">\xD7</button>\n                    </div>\n            </div>\n            <div class=\"dropzone dz-clickable\">\n                    <img src=\"\" alt=\"\" class=\"js_upload_img\">\n                    <label for=\"fileUpload_").concat(index, "\" class=\"file_upload\">\n                        <img src=\"/img/icons8-plus-50.png\" alt=\"\" >\n                        <p>\u30D5\u30A1\u30A4\u30EB\u306E\u9078\u629E</p>\n                    </label>\n                    <input type=\"file\" id=\"fileUpload_").concat(index, "\" class=\"js_file_upload\" hidden>\n            </div>\n        </div>\n    ");
};
var createPreviewHtml = function createPreviewHtml(text, time, img, index) {
  return "\n        <div class=\"chat__message-container-left\" style=\"display: flex; gap: 6px; margin: 0 4px; width: 95%;\" data-number=".concat(index, ">\n            <img src=").concat(img, " alt=\"\"  class=\"chat_users-icon-message preview_user-icon\" id=\"icon_msg\"> \n            <div class=\"chat__message-box-left chat-margin5 js_preview_message \" style=\"border-radius: 10px;\" data-number=").concat(index, ">").concat(text, "</div>\n            <div class=\"chat__message-time-txt\" style=\"font-size: 6px;\">").concat(time, "</div>\n        </div>\n    ");
};
var createPreviewImageHtml = function createPreviewImageHtml(srcUrl, time, img, index) {
  return "\n        <div class=\"chat__message-container-left\" style=\"display: flex; gap: 6px; margin: 0 4px;\" data-number=".concat(index, ">\n            <img src=").concat(img, " alt=\"\"  class=\"chat_users-icon-message preview_user-icon\" id=\"icon_msg\"> \n            <img src=\"").concat(srcUrl, "\" class=\"chat-margin5 chat_image js_preview_message\" data-number=").concat(index, ">\n            <div class=\"chat__message-time-txt\" style=\"font-size: 6px;\">").concat(time, "</div>\n        </div> \n    ");
};

/***/ }),

/***/ "./resources/js/module/util/bulk-messaging/util/MessageEditor.js":
/*!***********************************************************************!*\
  !*** ./resources/js/module/util/bulk-messaging/util/MessageEditor.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../config/apiEndPoints */ "./resources/js/config/apiEndPoints.js");
/* harmony import */ var _component_ui_FormController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../component/ui/FormController */ "./resources/js/module/component/ui/FormController.js");
/* harmony import */ var _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../component/ui/ModalController */ "./resources/js/module/component/ui/ModalController.js");
/* harmony import */ var _fileOperation_imageFileOperator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../fileOperation/imageFileOperator */ "./resources/js/module/util/fileOperation/imageFileOperator.js");
/* harmony import */ var _component_ui_UIController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../component/ui/UIController */ "./resources/js/module/util/bulk-messaging/component/ui/UIController.js");
/* harmony import */ var _template_createHtml__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../template/createHtml */ "./resources/js/module/util/bulk-messaging/template/createHtml.js");
/* harmony import */ var _Utility__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utility */ "./resources/js/module/util/bulk-messaging/util/Utility.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }







var _MessageEditor_brand = /*#__PURE__*/new WeakSet();
var MessageEditor = /*#__PURE__*/function () {
  function MessageEditor(socket) {
    _classCallCheck(this, MessageEditor);
    _classPrivateMethodInitSpec(this, _MessageEditor_brand);
    this.messageList = document.querySelector('#js_message-list');
    this.previewWrapper = document.querySelector(".chat_wrapper");
    this.img = document.querySelector(".chat_users-icon").src;
    this.textarea = null;
    this.url = _config_apiEndPoints__WEBPACK_IMPORTED_MODULE_0__.API_ENDPOINTS.ADMIN_MESSAGES_STORE;
    this.index = "";
    this.clickCount = 0;
    this.socket = socket;
    this.sender_id = document.getElementById("js_sender_id").value;
    this.receiver_id = document.getElementById("js_receiver_id").value;

    // 初期化を行う
    _assertClassBrand(_MessageEditor_brand, this, _removeExistingListeners).call(this);
    this.bindEvents();
    _assertClassBrand(_MessageEditor_brand, this, _inputMessageHanlder).call(this);

    // 初期化完了のフラグを設定
    document.body.dataset.messageEditorInitialized = "true";
  }
  return _createClass(MessageEditor, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      document.getElementById('add-text').addEventListener('click', function () {
        return _assertClassBrand(_MessageEditor_brand, _this, _addTextMessageElement).call(_this);
      });
      document.getElementById('add-image').addEventListener('click', function () {
        return _assertClassBrand(_MessageEditor_brand, _this, _addImageMessageElement).call(_this);
      });
    }

    // メッセージを入力する際の処理
  }, {
    key: "submitMessages",
    value: function submitMessages() {
      var _this2 = this;
      try {
        var submitBtn = document.getElementById("submit-messages");
        // 既存のイベントリスナーを削除
        var newSubmitButton = submitBtn.cloneNode(true);
        submitBtn.replaceWith(newSubmitButton);
        var formData = new FormData();
        newSubmitButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var messagesElements, messageCounter, hasData, response, res;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!(document.querySelectorAll(".js_preview_message").length <= 0)) {
                  _context.next = 3;
                  break;
                }
                alert("メッセージを一つ以上入力してください。");
                return _context.abrupt("return");
              case 3:
                document.getElementById("js_messageSetting_modal").classList.add("hidden");
                document.querySelector(".template_bg").classList.add("hidden");
                _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__["default"].open_loader();
                messagesElements = document.querySelectorAll(".message-item");
                messageCounter = 0; // テキストメッセージ用カウンター
                messagesElements.forEach(function (element) {
                  if (element.dataset.type === "text" && element.querySelector(".js_textarea").value.length > 0) {
                    var textMessage = element.querySelector(".js_textarea").value;
                    // オブジェクトをJSON文字列に変換してから追加
                    var item = {
                      "adminUuid": _this2.sender_id,
                      "userUuid": _this2.receiver_id,
                      "resource": textMessage
                    };
                    formData.append("messages[".concat(messageCounter, "]"), JSON.stringify(item));
                    messageCounter++;
                  } else if (element.dataset.type === "image") {
                    var fileInput = element.querySelector(".js_file_upload");
                    if (fileInput.files && fileInput.files.length > 0) {
                      // ファイルはそのまま追加
                      if (fileInput.files && fileInput.files[0]) {
                        formData.append("images[".concat(messageCounter, "][file]"), fileInput.files[0]);
                      }

                      // その他のメタデータを個別に追加
                      formData.append("images[".concat(messageCounter, "][adminUuid]"), _this2.sender_id);
                      formData.append("images[".concat(messageCounter, "][userUuid]"), _this2.receiver_id);
                      if (fileInput.dataset.url && fileInput.dataset.url !== "null") {
                        formData.append("images[".concat(messageCounter, "][url]"), fileInput.dataset.url);
                        formData.append("images[".concat(messageCounter, "][cropArea]"), fileInput.dataset.cropArea);
                      }
                      messageCounter++;
                    }
                  }
                });
                hasData = formData.entries().next().done === false;
                if (!hasData) {
                  _context.next = 20;
                  break;
                }
                _context.next = 13;
                return fetch(_this2.url, {
                  method: "POST",
                  body: formData
                });
              case 13:
                response = _context.sent;
                if (response.ok) {
                  _context.next = 16;
                  break;
                }
                throw new Error("サーバーからエラー応答が返されました。");
              case 16:
                _context.next = 18;
                return response.json();
              case 18:
                res = _context.sent;
                _this2.socket.emit("send_messages", {
                  data: res["data"],
                  adminUuid: res["data"][0]["adminUuid"],
                  userUuid: res["data"][0]["userUuid"]
                });
              case 20:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })));
      } catch (error) {
        alert("メッセージ送信でエラーが発生しました。再度実行してください。");
      }
    }
  }]);
}();
function _removeExistingListeners() {
  // 既存のイベントリスナーを削除するためのクローン置換テクニック
  var addTextBtn = document.getElementById('add-text');
  var addImageBtn = document.getElementById('add-image');
  if (addTextBtn) {
    var newTextBtn = addTextBtn.cloneNode(true);
    addTextBtn.parentNode.replaceChild(newTextBtn, addTextBtn);
  }
  if (addImageBtn) {
    var newImageBtn = addImageBtn.cloneNode(true);
    addImageBtn.parentNode.replaceChild(newImageBtn, addImageBtn);
  }
}
function _inputMessageHanlder() {
  var _this3 = this;
  document.querySelectorAll(".js_textarea").forEach(function (textarea) {
    textarea.addEventListener("input", function (e) {
      var text = e.target.value;
      _this3.index = textarea.dataset.number;
      // textareaと対のpreview_message要素を取得。なかったらundefinedを返す。undefinedの場合は、新たなに新しいpreview要素を追加し、ある場合はinnerHTMLを更新
      var targetElement = _toConsumableArray(document.querySelectorAll(".js_preview_message")).find(function (el) {
        return el.dataset.number == _this3.index;
      });
      if (text.length > 0) {
        _assertClassBrand(_MessageEditor_brand, _this3, _addPreviewMessage).call(_this3, text, targetElement);
      } else {
        if (targetElement !== undefined) {
          _this3.previewWrapper.removeChild(targetElement.parentElement);
        }
      }
    });
  });
}
function _setupImageUploadHandler(addedElement) {
  var _this4 = this;
  var fileInput = document.querySelector("#fileUpload_".concat(addedElement.dataset.number));
  fileInput.addEventListener("change", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var errorElement, file, fileURL, imageData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // エラーメッセージを非表示にする
          errorElement = document.querySelector(".js_image_error");
          errorElement.innerHTML = "";
          errorElement.classList.add("hidden");
          file = fileInput.files[0]; //選択されたファイルを取得
          fileURL = URL.createObjectURL(file); // ファイルをURLに変換
          // cropper編集の初期化(inputをすべて空にするなど)
          _component_ui_FormController__WEBPACK_IMPORTED_MODULE_1__["default"].resetCropperUIElements();

          // cropperの処理をして、cropArea, URLを返す
          _context2.next = 8;
          return (0,_fileOperation_imageFileOperator__WEBPACK_IMPORTED_MODULE_3__.handleImageProcessingFlow)(_this4.socket, _this4.sender_id, _this4.url, "admin", file, addedElement.dataset.number, true, fileInput);
        case 8:
          imageData = _context2.sent;
          fileInput.dataset.cropArea = imageData["cropArea"];
          fileInput.dataset.url = imageData["url"];

          // 画像をアップロード画面に表示する処理
          _component_ui_UIController__WEBPACK_IMPORTED_MODULE_4__["default"].displayUploadedImage(addedElement, fileURL);
          _assertClassBrand(_MessageEditor_brand, _this4, _addPreviewImage).call(_this4, addedElement.dataset.number, fileURL);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
}
function _addPreviewMessage(text, targetElement) {
  var _this5 = this;
  var previewText = text.replace(/\n/g, '<br>');
  if (targetElement !== undefined) {
    targetElement.innerHTML = previewText;
  } else {
    var currentTime = _Utility__WEBPACK_IMPORTED_MODULE_6__["default"].getCurrentTimeFormatted();
    var previewHtml = (0,_template_createHtml__WEBPACK_IMPORTED_MODULE_5__.createPreviewHtml)(previewText, currentTime, this.img, this.index);
    var allMessages = _toConsumableArray(this.previewWrapper.children);
    //this.index` より大きい `data-number` を持つ最初の要素を探す
    var _targetElement = allMessages.find(function (el) {
      return parseInt(el.dataset.number, 10) > _this5.index;
    });

    // `previewHtml` を要素に変換
    var tempContainer = document.createElement("div");
    tempContainer.innerHTML = previewHtml;
    var newElement = tempContainer.firstElementChild;
    if (_targetElement) {
      // `targetElement` の前に挿入（this.previewWrapper 内で）
      this.previewWrapper.insertBefore(newElement, _targetElement);
    } else {
      // すべての `data-number` より大きい場合は末尾に追加
      this.previewWrapper.appendChild(newElement);
    }

    // 挿入した要素（最後の子要素）を取得
    var insertedElement = this.previewWrapper.lastElementChild;
    // その中からtextareaを検索して返す
    this.textarea = insertedElement.querySelector('.js_chat_message');
  }
}
function _addPreviewImage(index, src) {
  var currentTime = _Utility__WEBPACK_IMPORTED_MODULE_6__["default"].getCurrentTimeFormatted();
  var previewHtml = (0,_template_createHtml__WEBPACK_IMPORTED_MODULE_5__.createPreviewImageHtml)(src, currentTime, this.img, index);
  var allMessages = _toConsumableArray(this.previewWrapper.children);
  //this.index` より大きい `data-number` を持つ最初の要素を探す
  var targetElement = allMessages.find(function (el) {
    return parseInt(el.dataset.number, 10) > index;
  });

  // `previewHtml` を要素に変換
  var tempContainer = document.createElement("div");
  tempContainer.innerHTML = previewHtml;
  var newElement = tempContainer.firstElementChild;
  if (targetElement) {
    // `targetElement` の前に挿入（this.previewWrapper 内で）
    this.previewWrapper.insertBefore(newElement, targetElement);
  } else {
    // すべての `data-number` より大きい場合は末尾に追加
    this.previewWrapper.appendChild(newElement);
  }
}
function _addTextMessageElement() {
  this.clickCount++;
  var newMessageHtml = (0,_template_createHtml__WEBPACK_IMPORTED_MODULE_5__.createMessageHtml)(this.clickCount);
  this.messageList.insertAdjacentHTML('beforeend', newMessageHtml);
  _assertClassBrand(_MessageEditor_brand, this, _inputMessageHanlder).call(this);
  _assertClassBrand(_MessageEditor_brand, this, _setupDeleteHandlers).call(this);
}
function _addImageMessageElement() {
  this.clickCount++;
  var newImageHtml = (0,_template_createHtml__WEBPACK_IMPORTED_MODULE_5__.createMessageImageHtml)(this.clickCount);
  this.messageList.insertAdjacentHTML('beforeend', newImageHtml);
  var addedElement = this.messageList.lastElementChild;
  _assertClassBrand(_MessageEditor_brand, this, _setupImageUploadHandler).call(this, addedElement);
  _assertClassBrand(_MessageEditor_brand, this, _setupDeleteHandlers).call(this);
}
// 削除ボタンのイベントハンドラをセットアップ
function _setupDeleteHandlers() {
  var _this6 = this;
  var deleteBtns = document.querySelectorAll(".message-delete");
  deleteBtns.forEach(function (btn) {
    // イベントの重複登録を防ぐために一度削除
    btn.removeEventListener("click", _assertClassBrand(_MessageEditor_brand, _this6, _handleDeleteValue));
    // イベントを追加
    btn.addEventListener("click", function (e) {
      return _assertClassBrand(_MessageEditor_brand, _this6, _handleDeleteValue).call(_this6, e);
    });
  });
}
// 削除処理（textareaの削除）
function _handleDeleteValue(event) {
  var btn = event.currentTarget;
  _assertClassBrand(_MessageEditor_brand, this, _handleDeletePreview).call(this, btn);
  var messageItem = btn.closest('.message-item');
  if (this.messageList.contains(messageItem)) {
    this.messageList.removeChild(messageItem);
  }
}
// 削除処理（previewからの削除）
function _handleDeletePreview(btn) {
  var _this7 = this;
  var index = btn.dataset.number;
  var previewElements = document.querySelectorAll(".js_preview_message");
  previewElements.forEach(function (element) {
    if (element.dataset.number === index) {
      _this7.previewWrapper.removeChild(element.parentElement);
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MessageEditor);

/***/ }),

/***/ "./resources/js/module/util/bulk-messaging/util/Utility.js":
/*!*****************************************************************!*\
  !*** ./resources/js/module/util/bulk-messaging/util/Utility.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Utility = /*#__PURE__*/function () {
  function Utility() {
    _classCallCheck(this, Utility);
  }
  return _createClass(Utility, null, [{
    key: "getCurrentTimeFormatted",
    value:
    // 現在の時間を取得し、〇〇:〇〇の形にする
    function getCurrentTimeFormatted() {
      var now = new Date();
      var hours = now.getHours().toString().padStart(2, '0');
      var minutes = now.getMinutes().toString().padStart(2, '0');
      return "".concat(hours, ":").concat(minutes);
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utility);

/***/ }),

/***/ "./resources/js/module/util/cropper/CropperEventHandler.js":
/*!*****************************************************************!*\
  !*** ./resources/js/module/util/cropper/CropperEventHandler.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CropperOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CropperOverlay */ "./resources/js/module/util/cropper/CropperOverlay.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var CropperEventHandler = /*#__PURE__*/function () {
  function CropperEventHandler(changeBtn, cropper) {
    _classCallCheck(this, CropperEventHandler);
    this.choices = document.getElementsByName('choice');
    this.changeBtn = changeBtn;
    this.cropper = cropper;
  }

  // 画像変更ボタンのクリックイベントを監視
  // クリック時にCropperの編集モードを開始
  return _createClass(CropperEventHandler, [{
    key: "changeBtnEvent",
    value: function changeBtnEvent() {
      var _this = this;
      this.changeBtn.addEventListener("click", function () {
        var txt = _this.changeBtn.innerHTML;
        if (txt === "選択範囲確定") {
          _this.cropper.disableCropper();
          _this.changeBtn.innerHTML = "選択範囲変更";
          _this.changeBtn.style.background = "#80808038";
        } else {
          _this.cropper.enableCropperEditing();
          _this.changeBtn.innerHTML = "選択範囲確定";
          _this.changeBtn.style.background = "#fff";
        }
      });
    }

    // // URL変更要素の表示切替
  }], [{
    key: "handleUrlInputToggle",
    value: function handleUrlInputToggle(event) {
      var url_wrapper = document.getElementById("js_url_setting");
      url_wrapper.classList.toggle("hidden", event.target.value === "off");
      if (event.target.value === "off") {
        _CropperOverlay__WEBPACK_IMPORTED_MODULE_0__["default"].updateCropperState(false);
      } else {
        _CropperOverlay__WEBPACK_IMPORTED_MODULE_0__["default"].updateCropperState(true);
      }
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CropperEventHandler);

/***/ }),

/***/ "./resources/js/module/util/cropper/CropperImage.js":
/*!**********************************************************!*\
  !*** ./resources/js/module/util/cropper/CropperImage.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cropperjs */ "./node_modules/cropperjs/dist/cropper.js");
/* harmony import */ var cropperjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cropperjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cropperjs_dist_cropper_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cropperjs/dist/cropper.css */ "./node_modules/cropperjs/dist/cropper.css");
/* harmony import */ var _CropperOverlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CropperOverlay */ "./resources/js/module/util/cropper/CropperOverlay.js");
/* harmony import */ var _CropperEventHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CropperEventHandler */ "./resources/js/module/util/cropper/CropperEventHandler.js");
/* harmony import */ var _CropperState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CropperState */ "./resources/js/module/util/cropper/CropperState.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// 通常のnpmパッケージからのインポート





var CropperImage = /*#__PURE__*/function () {
  function CropperImage(image, changeBtn) {
    _classCallCheck(this, CropperImage);
    this.image = image;
    this.cropperInstance = null; // Cropper.js インスタンスを保持
    this.changeBtn = changeBtn;
    this.choices = document.getElementsByName('choice');
    this.cropperState = null;
  }
  return _createClass(CropperImage, [{
    key: "enableCropperEditing",
    value: function enableCropperEditing() {
      // 画像範囲選択を選択したい際にcropperを有効にする
      if (this.cropperInstance) {
        this.cropperInstance.enable();
      }
      // オーバーレイ要素をデフォルト(表示)に戻す
      var cropperOverlay = new _CropperOverlay__WEBPACK_IMPORTED_MODULE_2__["default"]();
      cropperOverlay.setVisibility(true);
    }

    // 現在の Cropper インスタンスを破棄して新しい画像をセット
  }, {
    key: "updateImage",
    value: function updateImage(newImage) {
      var _this = this;
      // 既存のインスタンスを破棄
      if (this.cropperInstance) {
        this.cropperInstance.destroy();
        this.cropperInstance = null;
      }

      // 新しい画像要素を設定
      this.image = newImage;

      // 新しい Cropper インスタンスを作成
      this.choices.forEach(function (choice) {
        var newChoice = choice.cloneNode(true); // 元の要素を複製
        choice.replaceWith(newChoice); // 新しい要素と置き換え

        newChoice.addEventListener("change", function (e) {
          _CropperEventHandler__WEBPACK_IMPORTED_MODULE_3__["default"].handleUrlInputToggle(e);
          if (e.target.value === "on") {
            _this.resizeImage();
          } else {
            if (_this.cropperInstance) {
              _this.destroyCropper();
            }
          }
        });
      });
    }
  }, {
    key: "resizeImage",
    value: function resizeImage() {
      var _this2 = this;
      // Cropper.js インスタンスを作成
      try {
        this.cropperInstance = new (cropperjs__WEBPACK_IMPORTED_MODULE_0___default())(this.image, {
          viewMode: 1,
          // 画像の範囲内にクロップボックスと画像を制限
          dragMode: "crop",
          // クロップ操作を有効にする
          autoCropArea: 1.0,
          // 初期のクロップエリアを最大化
          responsive: true,
          // 画面サイズに応じてリサイズ対応
          restore: true,
          // 元の状態を保持
          guides: true,
          // ガイド線を非表示
          highlight: true,
          // クロップボックスのハイライトを有効
          cropBoxResizable: true,
          // クロップボックスのリサイズを許可
          ready: function ready() {
            // Cropper の初期化が完了したら crop 領域の取得
            var cropperArea = _this2.getCropperArea();
            console.log("✅ cropperArea:", cropperArea);
          },
          cropend: function cropend() {
            _this2.changeBtn.classList.remove("disabled_btn");
            var cropBoxData = _this2.cropperInstance.getCropBoxData(); // 最終的な選択範囲
            var containerData = _this2.cropperInstance.getContainerData(); // コンテナのデータ
            var imageData = _this2.cropperInstance.getImageData(); // 画像全体の情報

            // 選択範囲の位置とサイズを画像全体に対する割合（%）で計算し保存
            _this2.cropperState = new _CropperState__WEBPACK_IMPORTED_MODULE_4__["default"](cropBoxData, imageData, containerData);
            _this2.cropperState.updatePercentage();
          }
        });
      } catch (error) {
        alert("画像切り取り処理でエラーが発生しました。お手数ですがもう一度お試しください。");
      }
    }
  }, {
    key: "getCropperArea",
    value: function getCropperArea() {
      try {
        if (this.cropperInstance) {
          var cropBoxData = this.cropperInstance.getCropBoxData(); // 最終的な選択範囲
          var containerData = this.cropperInstance.getContainerData(); // コンテナのデータ
          var imageData = this.cropperInstance.getImageData(); // 画像全体の情報

          // 選択範囲の位置とサイズを画像全体に対する割合（%）で計算し保存
          this.cropperState = new _CropperState__WEBPACK_IMPORTED_MODULE_4__["default"](cropBoxData, imageData, containerData);
          this.cropperState.updatePercentage();
          return this.cropperState.getState();
        }
      } catch (error) {
        console.log(error);
        alert("画像リンク指定でエラーが発生しました。再度実行してください。");
      }
    }

    // enableCropper(){
    //     this.cropperInstance = new CropperJS(this.image, {
    //         viewMode: 0.5, // 画像の範囲内にクロップボックスと画像を制限
    //         dragMode: "crop", // クロップ操作を有効にする
    //         autoCropArea: 0.5, // 初期のクロップエリアを最大化
    //         responsive: true, // 画面サイズに応じてリサイズ対応
    //         restore: true, // 元の状態を保持
    //         guides: true, // ガイド線を非表示
    //         highlight: true, // クロップボックスのハイライトを有効
    //         cropBoxResizable: true, // クロップボックスのリサイズを許可
    //     });
    // }
  }, {
    key: "disableCropper",
    value: function disableCropper() {
      // cropperを無効化にする
      // 選択範囲を色変更
      var cropperOverlay = new _CropperOverlay__WEBPACK_IMPORTED_MODULE_2__["default"]();
      cropperOverlay.setVisibility(false);
      this.cropperInstance.disable();
    }
  }, {
    key: "destroyCropper",
    value: function destroyCropper() {
      this.cropperInstance.destroy();
      this.cropperInstance = null;
    }
  }, {
    key: "getCropperState",
    value: function getCropperState() {
      // CropperState インスタンスを返す
      return this.cropperState;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CropperImage);

/***/ }),

/***/ "./resources/js/module/util/cropper/CropperOverlay.js":
/*!************************************************************!*\
  !*** ./resources/js/module/util/cropper/CropperOverlay.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _CropperOverlay;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _overlayElements = /*#__PURE__*/new WeakMap();
var _CropperOverlay_brand = /*#__PURE__*/new WeakSet();
var CropperOverlay = /*#__PURE__*/function () {
  function CropperOverlay() {
    _classCallCheck(this, CropperOverlay);
    // スタイル変更対象のDOM要素をオブジェクトとして格納
    _classPrivateMethodInitSpec(this, _CropperOverlay_brand);
    _classPrivateFieldInitSpec(this, _overlayElements, null);
    _assertClassBrand(_CropperOverlay_brand, this, _initializeElements).call(this);
  }
  return _createClass(CropperOverlay, [{
    key: "setVisibility",
    value:
    // オーバーレイ要素の表示状態を制御するメソッド
    function setVisibility(isVisible) {
      // 表示状態に応じたスタイル値を設定
      var displayStyle = isVisible ? CropperOverlay.STYLES.VISIBLE : CropperOverlay.STYLES.HIDDEN;
      var backgroundColor = isVisible ? CropperOverlay.STYLES.DEFAULT_COLOR : CropperOverlay.STYLES.SELECTED_COLOR;

      // 複数要素（lines, points, dots）を一括で処理するための配列
      var targetElements = [_classPrivateFieldGet(_overlayElements, this).lines, _classPrivateFieldGet(_overlayElements, this).points, _classPrivateFieldGet(_overlayElements, this).dots];

      // 各要素グループの表示/非表示を切り替え
      targetElements.forEach(function (elements) {
        elements.forEach(function (element) {
          element.style.display = displayStyle;
        });
      });

      // 背景の切り替え
      _classPrivateFieldGet(_overlayElements, this).selectedArea.style.backgroundColor = backgroundColor;
    }
  }], [{
    key: "updateCropperState",
    value: function updateCropperState(isEnabled) {
      var cropper = document.querySelector(".cropper-drag-box");
      var cropperContainer = document.querySelector(".cropper-container");
      var cropperBox = document.querySelector(".cropper-crop-box");
      if (!cropper || !cropperContainer || !cropperBox) {
        return;
      }
      if (isEnabled) {
        cropper.classList.add("cropper-crop", "cropper-modal");
        cropperContainer.classList.add("cropper-bg");
        cropperBox.style.display = "block";
      } else {
        cropper.classList.remove("cropper-crop", "cropper-modal");
        cropperContainer.classList.remove("cropper-bg");
        cropperBox.style.display = "none";
      }
    }
  }]);
}();
_CropperOverlay = CropperOverlay;
function _initializeElements() {
  _classPrivateFieldSet(_overlayElements, this, {
    selectedArea: document.querySelector(_CropperOverlay.SELECTORS.SELECTED_AREA),
    lines: document.querySelectorAll(_CropperOverlay.SELECTORS.LINES),
    points: document.querySelectorAll(_CropperOverlay.SELECTORS.POINTS),
    dots: document.querySelectorAll(_CropperOverlay.SELECTORS.DOTS)
  });
}
// スタイル変更したい要素のクラス名の定義
_defineProperty(CropperOverlay, "SELECTORS", {
  SELECTED_AREA: '.cropper-face',
  LINES: '.cropper-line',
  POINTS: '.cropper-point',
  DOTS: '.cropper-dashed'
});
// toggleで変更するときのスタイル
// (例)visible = true →　display: block, backgroundColor: #fff
// (例)visible = false →　display: none, backgroundColor: red
_defineProperty(CropperOverlay, "STYLES", {
  HIDDEN: 'none',
  VISIBLE: 'block',
  SELECTED_COLOR: 'red',
  DEFAULT_COLOR: '#fff'
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CropperOverlay);

/***/ }),

/***/ "./resources/js/module/util/cropper/CropperState.js":
/*!**********************************************************!*\
  !*** ./resources/js/module/util/cropper/CropperState.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var CropperState = /*#__PURE__*/function () {
  function CropperState(cropBoxData, imageData, containerData) {
    _classCallCheck(this, CropperState);
    this.xPercent = 0;
    this.yPercent = 0;
    this.widthPercent = 0;
    this.heightPercent = 0;
    this.imageData = imageData;
    this.cropBoxData = cropBoxData;
    this.containerData = containerData;
  }

  // 選択範囲の位置とサイズを画像全体に対する割合（%）で計算し保存
  // cropBoxData: 選択された範囲の情報
  // imageData: 元画像のサイズ情報
  return _createClass(CropperState, [{
    key: "updatePercentage",
    value: function updatePercentage() {
      var widthRatio = this.imageData.naturalWidth / this.imageData.width;
      var heightRatio = this.imageData.naturalHeight / this.imageData.height;
      var extraPaddingForLeft = (this.containerData.width - this.imageData.width) / 2;
      var extraPaddingForTop = (this.containerData.height - this.imageData.height) / 2;
      var correctedLeft = this.cropBoxData.left - extraPaddingForLeft;
      var correctedTop = this.cropBoxData.top - extraPaddingForTop;

      // 元画像サイズを基準にクロップデータを補正
      this.xPercent = correctedLeft * widthRatio / this.imageData.naturalWidth * 100;
      this.yPercent = correctedTop * heightRatio / this.imageData.naturalHeight * 100;
      this.widthPercent = this.cropBoxData.width * widthRatio / this.imageData.naturalWidth * 100;
      this.heightPercent = this.cropBoxData.height * heightRatio / this.imageData.naturalHeight * 100;
    }

    // 保存された選択範囲の位置とサイズの割合（%）を返す
  }, {
    key: "getState",
    value: function getState() {
      return {
        xPercent: this.xPercent,
        yPercent: this.yPercent,
        widthPercent: this.widthPercent,
        heightPercent: this.heightPercent
      };
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CropperState);

/***/ }),

/***/ "./resources/js/module/util/fileOperation/FIleUploader.js":
/*!****************************************************************!*\
  !*** ./resources/js/module/util/fileOperation/FIleUploader.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _imageFileOperator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./imageFileOperator */ "./resources/js/module/util/fileOperation/imageFileOperator.js");
/* harmony import */ var _cropper_CropperImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cropper/CropperImage */ "./resources/js/module/util/cropper/CropperImage.js");
/* harmony import */ var _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/ui/ModalController */ "./resources/js/module/component/ui/ModalController.js");
/* harmony import */ var _cropper_CropperEventHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cropper/CropperEventHandler */ "./resources/js/module/util/cropper/CropperEventHandler.js");
/* harmony import */ var _component_ui_ButtonController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/ui/ButtonController */ "./resources/js/module/component/ui/ButtonController.js");
/* harmony import */ var _component_ui_FormController__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/ui/FormController */ "./resources/js/module/component/ui/FormController.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }






var _FileUploader_brand = /*#__PURE__*/new WeakSet();
var FileUploader = /*#__PURE__*/function () {
  function FileUploader(socket, sender_id, url, sender_type, file, imageElement, isTemplate, index, fileInput) {
    _classCallCheck(this, FileUploader);
    _classPrivateMethodInitSpec(this, _FileUploader_brand);
    this.socket = socket;
    this.sender_id = sender_id;
    this.url = url;
    this.sender_type = sender_type;
    this.file = file;
    this.receiver_id = document.getElementById("js_receiver_id").value;
    this.cropper = null;
    this.imageElement = imageElement;
    this.hasUrl = false;
    this.isConfirmed = false;
    this.isTemplate = isTemplate;
    this.actionUrl = "";
    this.imageIndex = index;
    this.fileInput = fileInput;
    this.sendingData = {};
  }
  return _createClass(FileUploader, [{
    key: "initializeEvents",
    value: function initializeEvents() {
      this.changeImageBtn = document.getElementById("js_changeImg_btn");
      this.newChangeImageBtn = this.changeImageBtn.cloneNode(true);
      this.changeImageBtn.parentNode.replaceChild(this.newChangeImageBtn, this.changeImageBtn);
      this.newChangeImageBtn.addEventListener("click", this.handleDisplayClick.bind(this));
    }
  }, {
    key: "handleDisplayClick",
    value: function handleDisplayClick() {
      _component_ui_FormController__WEBPACK_IMPORTED_MODULE_5__["default"].initializeFileUpload();
    }
  }, {
    key: "getSendingData",
    value: function getSendingData() {
      return this.sendingData;
    }
  }, {
    key: "validateAndProcessFile",
    value: function () {
      var _validateAndProcessFile = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              if (this.validateFile()) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");
            case 3:
              if (!(this.sender_type == "admin")) {
                _context.next = 9;
                break;
              }
              if (document.querySelector(".image_edit_modal").classList.contains("hidden")) {
                _assertClassBrand(_FileUploader_brand, this, _toggleLoader).call(this, true);
              } else {
                _assertClassBrand(_FileUploader_brand, this, _toggleLoaderforChangeImg).call(this, true);
              }
              _context.next = 7;
              return this.handleAdminFileUpload();
            case 7:
              _context.next = 11;
              break;
            case 9:
              _context.next = 11;
              return this.handleUserFileUpload();
            case 11:
              _context.next = 17;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.error("エラーが発生しました:", _context.t0);
              alert("エラーが発生しました。再試行してください。");
            case 17:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 13]]);
      }));
      function validateAndProcessFile() {
        return _validateAndProcessFile.apply(this, arguments);
      }
      return validateAndProcessFile;
    }()
  }, {
    key: "validateFile",
    value: function validateFile() {
      var _document$querySelect;
      var hasModal = true;
      if ((_document$querySelect = document.querySelector(".image_edit_modal")) !== null && _document$querySelect !== void 0 && _document$querySelect.classList.contains("hidden")) hasModal = false;
      if (!(0,_imageFileOperator__WEBPACK_IMPORTED_MODULE_0__.isAllowedType)(this.file.type)) {
        if (this.fileInput) {
          this.fileInput.value = "";
        }
        if (this.sender_type == "admin") {
          // cropperページから画像を切り替えた場合の処理
          if (document.querySelector(".change_img").id == "fileInputEdit") {
            _component_ui_FormController__WEBPACK_IMPORTED_MODULE_5__["default"].showCropperSetting();
          }
        }
        return _assertClassBrand(_FileUploader_brand, this, _validationError).call(this, "許可されているファイル形式は JPG, PNGのみです。", hasModal);
      }
      if (!(0,_imageFileOperator__WEBPACK_IMPORTED_MODULE_0__.isCorrectSize)(this.file.size)) {
        if (this.fileInput) {
          this.fileInput.value = "";
        }
        if (this.sender_type === "admin") {
          // cropperページから画像を切り替えた場合の処理
          if (document.querySelector(".change_img").id == "fileInputEdit") {
            _component_ui_FormController__WEBPACK_IMPORTED_MODULE_5__["default"].showCropperSetting();
          }
        }
        return _assertClassBrand(_FileUploader_brand, this, _validationError).call(this, "ファイルサイズは5MB以下にしてください。", hasModal);
      }
      return true;
    }
  }, {
    key: "handleAdminFileUpload",
    value: function () {
      var _handleAdminFileUpload = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _this = this;
        var newImage;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (this.imageElement) {
                _context3.next = 2;
                break;
              }
              throw new Error("画像の要素が見つかりません。");
            case 2:
              newImage = _assertClassBrand(_FileUploader_brand, this, _createImageElement).call(this, this.file);
              newImage.onload = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                var newImageButton, cropperHandler, container, imageEditModal;
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      try {
                        newImageButton = _component_ui_ButtonController__WEBPACK_IMPORTED_MODULE_4__["default"].replaceButton("js_change_area");
                        _this.cropper = new _cropper_CropperImage__WEBPACK_IMPORTED_MODULE_1__["default"](_this.imageElement, newImageButton);
                        cropperHandler = new _cropper_CropperEventHandler__WEBPACK_IMPORTED_MODULE_3__["default"](newImageButton, _this.cropper);
                        cropperHandler.changeBtnEvent();
                        // 新しい画像要素を Cropper に更新
                        _this.cropper.updateImage(newImage);

                        // 古い画像を置き換え
                        container = document.getElementById("image-container");
                        container.innerHTML = ""; // 古い画像を削除
                        container.appendChild(newImage); // 新しい画像を追加

                        _assertClassBrand(_FileUploader_brand, _this, _toggleLoaderforChangeImg).call(_this, false);
                        _assertClassBrand(_FileUploader_brand, _this, _toggleLoader).call(_this, false);
                        imageEditModal = document.querySelector(".image_edit_modal");
                        document.querySelector(".change_img").id = "fileInputEdit";
                        if (_this.isTemplate) {
                          // imageEditモーダルを閉じた時に対するfileInputを空にするために番号をふる
                          if (_this.imageIndex) {
                            document.querySelector(".template_bg").dataset.number = _this.imageIndex;
                          }
                          document.querySelector(".change_img").setAttribute("for", _this.fileInput.id);
                          _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__["default"].open_management_modal(imageEditModal);
                        } else {
                          _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__["default"].open_modal(imageEditModal);
                          document.querySelector(".change_img").setAttribute("for", "fileInput");
                        }
                        _assertClassBrand(_FileUploader_brand, _this, _changeSubmitBtn).call(_this);
                      } catch (error) {
                        console.error("画像処理中にエラーが発生しました:", error);
                        alert("画像の処理に失敗しました。");
                      }
                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }));
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function handleAdminFileUpload() {
        return _handleAdminFileUpload.apply(this, arguments);
      }
      return handleAdminFileUpload;
    }()
  }, {
    key: "handleUserFileUpload",
    value: function () {
      var _handleUserFileUpload = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var formData, response, res, time, admin_login_id, resizedImage;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__["default"].open_loader();
              _context4.prev = 1;
              _context4.next = 4;
              return (0,_imageFileOperator__WEBPACK_IMPORTED_MODULE_0__.processImageUpload)(this.file, this.sender_id, this.receiver_id, this.sender_type);
            case 4:
              formData = _context4.sent;
              _context4.next = 7;
              return fetch(this.url, {
                method: "POST",
                body: formData
              });
            case 7:
              response = _context4.sent;
              if (response.ok) {
                _context4.next = 10;
                break;
              }
              throw new Error("サーバーからエラー応答が返されました。");
            case 10:
              _context4.next = 12;
              return response.json();
            case 12:
              res = _context4.sent;
              time = res.created_at, admin_login_id = res.admin_login_id, resizedImage = res.imageName;
              this.socket.emit("send_image", {
                resizedImage: resizedImage,
                receiver_id: this.receiver_id,
                sender_id: this.sender_id,
                sender_type: this.sender_type,
                time: time,
                admin_login_id: admin_login_id,
                cropArea: []
              });
              _context4.next = 21;
              break;
            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](1);
              console.error("ユーザー用ファイルアップロード中にエラーが発生しました:", _context4.t0);
              alert("ファイルのアップロードに失敗しました。");
            case 21:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[1, 17]]);
      }));
      function handleUserFileUpload() {
        return _handleUserFileUpload.apply(this, arguments);
      }
      return handleUserFileUpload;
    }() // 新しい画像要素を作成
  }, {
    key: "setupMessageSubmitButton",
    value: function setupMessageSubmitButton() {
      var _this2 = this;
      var submitButton = document.getElementById("js_preview_submit_btn");
      if (!submitButton) {
        throw new Error("送信ボタンが見つかりません。");
      }

      // 既存のイベントリスナーを削除
      var newSubmitButton = submitButton.cloneNode(true);
      submitButton.replaceWith(newSubmitButton);

      // this.#changeSubmitBtn()
      // 新しいイベントリスナーを登録
      newSubmitButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var regex, urlInput, selectedValue, urlError, modal, formData, cropperState, response, res, time, admin_login_id, resizedImage, cropArea;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?.*)?$/;
              urlInput = document.getElementById("js_url_input");
              selectedValue = document.querySelector('input[name="choice"]:checked').value;
              if (!(selectedValue === "on" && !regex.test(urlInput.value))) {
                _context5.next = 8;
                break;
              }
              urlError = document.querySelector(".js_url_error");
              urlError.classList.remove("hidden");
              return _context5.abrupt("return");
            case 8:
              modal = document.querySelector(".image_edit_modal");
              modal.classList.add("hidden");
              _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_2__["default"].open_loader();
              _context5.next = 13;
              return (0,_imageFileOperator__WEBPACK_IMPORTED_MODULE_0__.processImageUpload)(_this2.file, _this2.sender_id, _this2.receiver_id, _this2.sender_type);
            case 13:
              formData = _context5.sent;
              if (!(selectedValue === "on")) {
                _context5.next = 22;
                break;
              }
              cropperState = _this2.cropper.getCropperState();
              if (cropperState) {
                _context5.next = 18;
                break;
              }
              throw new Error("CropperStateが初期化されていません。");
            case 18:
              formData.append("cropArea", JSON.stringify(cropperState.getState()));
              formData.append("url", _this2.actionUrl);
              _context5.next = 24;
              break;
            case 22:
              formData.append("cropArea", []);
              formData.append("url", null);
            case 24:
              _context5.next = 26;
              return fetch(_this2.url, {
                method: "POST",
                body: formData
              });
            case 26:
              response = _context5.sent;
              if (response.ok) {
                _context5.next = 29;
                break;
              }
              throw new Error("サーバーからエラー応答が返されました。");
            case 29:
              _context5.next = 31;
              return response.json();
            case 31:
              res = _context5.sent;
              time = res.created_at, admin_login_id = res.admin_login_id, resizedImage = res.imageName, cropArea = res.cropArea;
              _this2.socket.emit("send_image", {
                resizedImage: resizedImage,
                receiver_id: _this2.receiver_id,
                sender_id: _this2.sender_id,
                sender_type: _this2.sender_type,
                time: time,
                admin_login_id: admin_login_id,
                cropArea: cropArea
              });
              _context5.next = 39;
              break;
            case 36:
              _context5.prev = 36;
              _context5.t0 = _context5["catch"](0);
              console.error("送信処理中にエラーが発生しました:", _context5.t0);
            case 39:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 36]]);
      })));
    }
  }, {
    key: "setupMessagesTemplateSubmitButton",
    value: function setupMessagesTemplateSubmitButton() {
      var _this3 = this;
      var submitButton = document.getElementById("js_preview_submit_btn");
      if (!submitButton) {
        throw new Error("送信ボタンが見つかりません。");
      }

      // 既存のイベントリスナーを削除
      var newSubmitButton = submitButton.cloneNode(true);
      submitButton.replaceWith(newSubmitButton);

      // 新しいイベントリスナーを登録
      return new Promise(function (resolve) {
        newSubmitButton.addEventListener("click", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
          var regex, urlInput, selectedValue, urlError, modal, cropperState;
          return _regeneratorRuntime().wrap(function _callee6$(_context6) {
            while (1) switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*(\?.*)?$/;
                urlInput = document.getElementById("js_url_input");
                selectedValue = document.querySelector('input[name="choice"]:checked').value;
                if (!(selectedValue === "on" && !regex.test(urlInput.value))) {
                  _context6.next = 8;
                  break;
                }
                urlError = document.querySelector(".js_url_error");
                urlError.classList.remove("hidden");
                return _context6.abrupt("return");
              case 8:
                modal = document.querySelector(".image_edit_modal");
                modal.classList.add("hidden");
                if (!(selectedValue === "on")) {
                  _context6.next = 17;
                  break;
                }
                cropperState = _this3.cropper.getCropperState();
                if (cropperState) {
                  _context6.next = 14;
                  break;
                }
                throw new Error("CropperStateが初期化されていません。");
              case 14:
                _this3.sendingData = {
                  "cropArea": JSON.stringify(cropperState.getState()),
                  "url": _this3.actionUrl
                };
                _context6.next = 18;
                break;
              case 17:
                _this3.sendingData = {
                  "cropArea": [],
                  "url": null
                };
              case 18:
                // Promise を解決
                resolve(_this3.sendingData);
                _context6.next = 24;
                break;
              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](0);
                console.error("送信処理中にエラーが発生しました:", _context6.t0);
              case 24:
              case "end":
                return _context6.stop();
            }
          }, _callee6, null, [[0, 21]]);
        })));
      });
    }
  }]);
}();
function _validationError(txt, hasModal) {
  var errorElement = document.querySelector(".js_image_error");
  if (hasModal && errorElement) {
    errorElement.classList.remove("hidden");
    errorElement.innerHTML = txt;
  } else {
    alert(txt);
  }
  return false;
}
function _createImageElement() {
  var newImage = document.createElement("img");
  newImage.src = URL.createObjectURL(this.file);
  newImage.id = "image"; // IDを付加
  return newImage;
}
function _toggleLoader(isLoading) {
  var messageModal = document.querySelector(".image_edit_modal");
  var loader = document.querySelector(".loader");
  if (isLoading) {
    messageModal.style.zIndex = 0;
    loader.classList.remove("hidden");
  } else {
    messageModal.style.zIndex = 999;
    loader.classList.remove("add");
  }
}
// 送信ボタンの色を変更する
// 送信ボタンの色を変更する
function _changeSubmitBtn() {
  var _this4 = this;
  var choices = document.querySelectorAll('input[name="choice"]');
  var urlInput = document.getElementById("js_url_input");
  var submitBtn = document.getElementById("js_preview_submit_btn");
  var confirmBtn = document.getElementById("js_change_area");
  var urlError = document.querySelector(".js_url_error");

  // ボタンの状態を更新する関数
  var updateButtonState = function updateButtonState() {
    var isChoiceOn = _toConsumableArray(choices).some(function (choice) {
      return choice.checked && choice.value === "on";
    });
    var hasUrl = urlInput.value.length > 0;
    var isConfirmed = confirmBtn.innerHTML !== "選択範囲確定";
    if (isChoiceOn) {
      if (hasUrl && isConfirmed) {
        submitBtn.classList.remove("disabled_btn");
      } else {
        submitBtn.classList.add("disabled_btn");
      }
    } else {
      submitBtn.classList.remove("disabled_btn");
    }
  };

  // 各イベントリスナーでボタン状態を更新
  choices.forEach(function (choice) {
    choice.addEventListener("change", updateButtonState);
  });
  urlInput.addEventListener("input", function () {
    urlError.classList.add("hidden");
    _this4.actionUrl = urlInput.value;
    updateButtonState();
  });
  confirmBtn.addEventListener("click", function () {
    // 確定状態をトグル
    _this4.isConfirmed = confirmBtn.innerHTML !== "選択範囲確定";
    updateButtonState();
  });
}
function _toggleLoaderforChangeImg(isLoading) {
  var bg = document.querySelector(".crop_bg");
  var loader = document.querySelector(".crop_loader");
  if (isLoading) {
    bg.classList.remove("hidden");
    loader.classList.remove("hidden");
  } else {
    bg.classList.add("hidden");
    loader.classList.add("hidden");
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileUploader);

/***/ }),

/***/ "./resources/js/module/util/fileOperation/imageFileOperator.js":
/*!*********************************************************************!*\
  !*** ./resources/js/module/util/fileOperation/imageFileOperator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleImageProcessingFlow: () => (/* binding */ handleImageProcessingFlow),
/* harmony export */   isAllowedType: () => (/* binding */ isAllowedType),
/* harmony export */   isCorrectSize: () => (/* binding */ isCorrectSize),
/* harmony export */   processImageUpload: () => (/* binding */ processImageUpload)
/* harmony export */ });
/* harmony import */ var browser_image_compression__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! browser-image-compression */ "./node_modules/browser-image-compression/dist/browser-image-compression.mjs");
/* harmony import */ var _util_fileOperation_FIleUploader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/fileOperation/FIleUploader */ "./resources/js/module/util/fileOperation/FIleUploader.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }


var isAllowedType = function isAllowedType(fileType) {
  var allowedTypes = ['image/jpeg', 'image/png'];
  return allowedTypes.includes(fileType);
};
var isCorrectSize = function isCorrectSize(fileSize) {
  var MAX_SIZE_MB = 5;
  return fileSize < MAX_SIZE_MB * 1024 * 1024;
};
var processImageUpload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(file, sender_id, receiver_id, sender_type) {
    var compressedFile, extension, newFileName, user_id, admin_id, formData;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0,browser_image_compression__WEBPACK_IMPORTED_MODULE_0__["default"])(file, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800,
            useWebWorker: true
          });
        case 3:
          compressedFile = _context.sent;
          // ファイル名生成
          extension = file.name.split('.').pop();
          newFileName = "".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9), ".").concat(extension); // ID取得
          user_id = sender_type == "user" ? sender_id : receiver_id;
          admin_id = sender_type == "user" ? receiver_id : sender_id; // FormData作成
          formData = new FormData();
          formData.append('image', compressedFile, newFileName);
          formData.append('user_id', user_id);
          formData.append('admin_id', admin_id);
          formData.append('type', 'user');
          return _context.abrupt("return", formData);
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          console.error('Error processing image:', _context.t0);
          throw _context.t0;
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function processImageUpload(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
var handleImageProcessingFlow = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(socket, sender_id, url, sender_type, file) {
    var index,
      isTemplate,
      fileInput,
      imageElement,
      fileUploader,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          index = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : null;
          isTemplate = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : false;
          fileInput = _args2.length > 7 && _args2[7] !== undefined ? _args2[7] : null;
          imageElement = document.getElementById("image");
          fileUploader = new _util_fileOperation_FIleUploader__WEBPACK_IMPORTED_MODULE_1__["default"](socket, sender_id, url, sender_type, file, imageElement, isTemplate, index, fileInput);
          _context2.next = 7;
          return fileUploader.validateAndProcessFile();
        case 7:
          if (!(sender_type === "admin")) {
            _context2.next = 13;
            break;
          }
          if (!isTemplate) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", fileUploader.setupMessagesTemplateSubmitButton());
        case 12:
          fileUploader.setupMessageSubmitButton();
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function handleImageProcessingFlow(_x5, _x6, _x7, _x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./resources/js/module/util/messaging/messageService.js":
/*!**************************************************************!*\
  !*** ./resources/js/module/util/messaging/messageService.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   fetchAndDisplayAllMessages: () => (/* binding */ fetchAndDisplayAllMessages),
/* harmony export */   handleReceivedBroadcastingMessage: () => (/* binding */ handleReceivedBroadcastingMessage),
/* harmony export */   handleReceivedMessage: () => (/* binding */ handleReceivedMessage),
/* harmony export */   handleSearchInput: () => (/* binding */ handleSearchInput),
/* harmony export */   linkifyContent: () => (/* binding */ linkifyContent),
/* harmony export */   prepareMessageData: () => (/* binding */ prepareMessageData),
/* harmony export */   sendMessage: () => (/* binding */ sendMessage)
/* harmony export */ });
/* harmony import */ var _component_chat_ChatMessageController_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/chat/ChatMessageController.js */ "./resources/js/module/component/chat/ChatMessageController.js");
/* harmony import */ var _component_chat_ChatSearchController_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/chat/ChatSearchController.js */ "./resources/js/module/component/chat/ChatSearchController.js");
/* harmony import */ var _component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/chat/ChatUIHelper.js */ "./resources/js/module/component/chat/ChatUIHelper.js");
/* harmony import */ var _component_chat_ChatUserListController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/chat/ChatUserListController.js */ "./resources/js/module/component/chat/ChatUserListController.js");
/* harmony import */ var _component_templates_elementTemplate_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/templates/elementTemplate.js */ "./resources/js/module/component/templates/elementTemplate.js");
/* harmony import */ var _api_Fetch_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../api/Fetch.js */ "./resources/js/module/util/api/Fetch.js");
/* harmony import */ var _FormatText_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../FormatText.js */ "./resources/js/module/util/FormatText.js");
/* harmony import */ var _scrolling_InfiniteScrollForList_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../scrolling/InfiniteScrollForList.js */ "./resources/js/module/util/scrolling/InfiniteScrollForList.js");
/* harmony import */ var _notificationSound_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./notificationSound.js */ "./resources/js/module/util/messaging/notificationSound.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }










// ##################################################################
//                  サーバーへデータを送信する処理
// ###################################################################

var prepareMessageData = function prepareMessageData() {
  // スタイル変更
  document.getElementById('js_msg').style.height = "19px";
  document.querySelector(".chat__form-submit").classList.add("disabled_btn");
  // サーバーに送信するデータをすべて取得する
  var msg = document.getElementById("js_msg").value;
  var formattedMsg = msg;
  var receiver_id = document.getElementById("js_receiver_id").value;
  var sender_type = document.getElementById("js_sender_type").value;
  return {
    msg: msg,
    formattedMsg: formattedMsg,
    receiver_id: receiver_id,
    sender_type: sender_type
  };
};

// メッセージをサーバーに送信
var sendMessage = function sendMessage(socket, msg, sender_id, receiver_id, sender_type, msg2, url) {
  // sender_typeに基づいて送信者・受信者を自動設定
  var actual_sender_id, actual_receiver_id, data;
  if (sender_type == "admin") {
    actual_sender_id = sender_id; // 管理者が送信者(管理者ID)
    actual_receiver_id = receiver_id; // ユーザーが受信者(ユーザーID)

    data = {
      content: msg2,
      admin_id: actual_sender_id,
      user_id: actual_receiver_id
    };
  } else if (sender_type == "user") {
    actual_sender_id = receiver_id; // ユーザーが送信者(ユーザーID)
    actual_receiver_id = sender_id; // 管理者が受信者(管理者ID)

    data = {
      content: msg2,
      admin_id: actual_receiver_id,
      user_id: actual_sender_id
    };
  }
  _api_Fetch_js__WEBPACK_IMPORTED_MODULE_5__["default"].fetchPostOperation(data, url).then(function (res) {
    var time = res["created_at"];
    var admin_login_id = res["admin_login_id"];
    socket.emit('chat message', {
      msg: msg,
      actual_receiver_id: actual_receiver_id,
      actual_sender_id: actual_sender_id,
      sender_type: sender_type,
      time: time,
      admin_login_id: admin_login_id
    });
    document.getElementById("js_msg").value = "";
  });
};

// ##################################################################
//                  メッセージ受信処理
// ###################################################################

// メッセージ受信時の処理
var handleReceivedMessage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(isON, is_searching, sender_type, sender_id, time, receiver_id, content, message_type) {
    var cropArea,
      current_chat_id,
      _data,
      chatMessageController,
      args,
      chatUserListController,
      data,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          cropArea = _args.length > 8 && _args[8] !== undefined ? _args[8] : [];
          if (isON["isSoundOn"]) (0,_notificationSound_js__WEBPACK_IMPORTED_MODULE_8__.playNotificationSound)();
          current_chat_id = document.getElementById("js_chatuser_id").value;
          if (current_chat_id == receiver_id || current_chat_id == sender_id) {
            // 必要なデータをオブジェクトで準備
            _data = {
              messageType: message_type,
              cropArea: cropArea,
              position: "beforeend",
              time: time,
              className: "js_append_admin",
              senderType: sender_type,
              content: content,
              fileName: "admin",
              senderId: sender_id
            }; // `ChatMessageController` のインスタンスを作成
            chatMessageController = new _component_chat_ChatMessageController_js__WEBPACK_IMPORTED_MODULE_0__["default"](_data); // チャット画像を表示
            chatMessageController.displayChatMessage();
          }
          args = {
            senderId: sender_id,
            receiverId: receiver_id,
            senderType: sender_type,
            isSearching: is_searching,
            content: content,
            messageType: message_type,
            time: time
          };
          chatUserListController = new _component_chat_ChatUserListController_js__WEBPACK_IMPORTED_MODULE_3__["default"](args); // チャットリストのリアルタイムでデータを表示する処理
          chatUserListController.updateMessageTime();
          chatUserListController.displayMessage();
          chatUserListController.increaseMessageCount();
          _context.next = 11;
          return chatUserListController.updateChatUserList();
        case 11:
          // メッセージ送信者と開いてるチャットユーザーが同じだったら、メッセージを既読にするため、データベースに既読を格納する
          data = {
            "admin_id": receiver_id,
            "chat_user_id": sender_id
          };
          if (sender_id == document.getElementById("js_chatuser_id").value) {
            _api_Fetch_js__WEBPACK_IMPORTED_MODULE_5__["default"].fetchPostOperation(data, "/api/user/messages/read");
          }
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handleReceivedMessage(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
    return _ref.apply(this, arguments);
  };
}();
var handleReceivedBroadcastingMessage = function handleReceivedBroadcastingMessage(sender_id, time, sendingDatatoBackEnd, ids) {
  var orderedData = sendingDatatoBackEnd.sort(function (a, b) {
    return a.order - b.order;
  });
  var argsForMessage = {
    position: "beforeend",
    time: time,
    className: "js_append_admin",
    senderType: "admin",
    fileName: "admin",
    senderId: sender_id,
    ids: ids
  };
  orderedData.forEach(function (data) {
    var content = data["resource"];
    var type = data["type"];
    var cropArea = data["cropArea"];
    var url = data["url"];

    // 必要なデータを新しいオブジェクトで作成
    var messageArgs = _objectSpread(_objectSpread({}, argsForMessage), {}, {
      // 基本の値を引き継ぐ
      messageType: type,
      content: content,
      cropArea: cropArea,
      url: url
    });

    // `ChatMessageController` のインスタンスを作成
    var chatMessageController = new _component_chat_ChatMessageController_js__WEBPACK_IMPORTED_MODULE_0__["default"](messageArgs);

    // チャットメッセージを表示
    chatMessageController.displayChatMessage();
  });
  var argsForUserList = {
    senderId: sender_id,
    receiverId: null,
    senderType: "admin",
    isSearching: false,
    content: "",
    messageType: "",
    time: time
  };
  var chatUserListController = new _component_chat_ChatUserListController_js__WEBPACK_IMPORTED_MODULE_3__["default"](argsForUserList);

  // チャットリストのリアルタイムでデータを表示する処理
  chatUserListController.updateMessageTime();
  chatUserListController.updateUserListMessage(ids);
};

// debounce関数を作成
var debounce = function debounce(func, delay) {
  var timer;
  return function () {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    clearTimeout(timer);
    return new Promise(function (resolve) {
      timer = setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var result;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return func.apply(_this, args);
            case 3:
              result = _context2.sent;
              resolve(result);
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.error('Debounce error:', _context2.t0);
            case 10:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      })), delay);
    });
  };
};

// ##################################################################
//                      検索バーの処理
// ###################################################################

// 検索バーの入力処理
var handleSearchInput = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(is_searching, value, sender_id) {
    var data, elements;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          data = {
            admin_id: sender_id,
            text: value
          }; // 検索欄に何かしら入力があった場合
          if (!(value.length > 0)) {
            _context3.next = 6;
            break;
          }
          _context3.next = 4;
          return _component_chat_ChatSearchController_js__WEBPACK_IMPORTED_MODULE_1__["default"].createDivForSearch(data);
        case 4:
          _context3.next = 9;
          break;
        case 6:
          is_searching.flag = false;
          _context3.next = 9;
          return fetchAndDisplayAllMessages(sender_id);
        case 9:
          // メッセージの長さ制限処理
          elements = document.querySelectorAll(".js_chatMessage_elment");
          elements.forEach(function (element) {
            element.innerHTML = _component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"].adjustMesageLength(element.innerHTML);
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function handleSearchInput(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

// 全ユーザーのメッセージを取得し、表示する処理
var fetchAndDisplayAllMessages = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(admin_id) {
    var response, parentElement, element, adminId;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _api_Fetch_js__WEBPACK_IMPORTED_MODULE_5__["default"].fetchGetOperation("/api/users/messages/lineAccounts/".concat(admin_id));
        case 2:
          response = _context4.sent;
          parentElement = document.getElementById("js_chatUser_wrapper");
          parentElement.innerHTML = "";
          response.forEach(function (res) {
            if (res["latest_all_message"] !== null) {
              parentElement.innerHTML += (0,_component_templates_elementTemplate_js__WEBPACK_IMPORTED_MODULE_4__.createChatUserContainer)(res["entity_uuid"], res);
            }
          });

          // チャットユーザーリストの無限スクロール
          element = document.querySelector(".chat__users-list-area");
          adminId = document.getElementById("js_admin_id").value;
          new _scrolling_InfiniteScrollForList_js__WEBPACK_IMPORTED_MODULE_7__["default"](element, adminId);
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function fetchAndDisplayAllMessages(_x12) {
    return _ref4.apply(this, arguments);
  };
}();

// テキストに含まれてるURLをaタグに変換する
var linkifyContent = function linkifyContent(content) {
  var cleanContent = content.replace(/<br>/g, '\n');
  var pattern = /((?:https?:\/\/|www\.)[^\s<>]+)/gi;
  var replacement = '<a href="$1" openExternalBrowser=1>$1</a>';
  return cleanContent.replace(pattern, replacement);
};

/***/ }),

/***/ "./resources/js/module/util/messaging/notificationSound.js":
/*!*****************************************************************!*\
  !*** ./resources/js/module/util/messaging/notificationSound.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   playNotificationSound: () => (/* binding */ playNotificationSound)
/* harmony export */ });
var playNotificationSound = function playNotificationSound() {
  // WAVファイルのパスを指定
  var audio = new Audio('/img/sound.wav');
  audio.play();
};

/***/ }),

/***/ "./resources/js/module/util/scrolling/InfiniteScroll.js":
/*!**************************************************************!*\
  !*** ./resources/js/module/util/scrolling/InfiniteScroll.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _component_chat_ChatMessageController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/chat/ChatMessageController */ "./resources/js/module/component/chat/ChatMessageController.js");
/* harmony import */ var _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/ui/ModalController */ "./resources/js/module/component/ui/ModalController.js");
/* harmony import */ var _api_Fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/Fetch */ "./resources/js/module/util/api/Fetch.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



var MESSAGES_PER_PAGE = 20;
var InfiniteScroll = /*#__PURE__*/function () {
  function InfiniteScroll(element, adminUuid, userUuid, fileType) {
    var _document$querySelect;
    var isAdmin = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    _classCallCheck(this, InfiniteScroll);
    this.element = element;
    this.hasNoValue = false;
    this.isFetchFlag = false;
    this.dataCount = document.querySelectorAll(".js_chat_message").length;
    this.new_date_el = null;
    this.parentElement = null;
    this.hasDate = false;
    this.adminUuid = adminUuid;
    this.userUuid = userUuid;
    this.fileType = fileType;
    this.default_message = (_document$querySelect = document.querySelector(".chat_default-area")) !== null && _document$querySelect !== void 0 ? _document$querySelect : null;
    this.scrollEndTid = null; // デバウンス用
    this.isAdmin = isAdmin;

    // スクロールイベントリスナーを登録
    this.element.addEventListener("scroll", this.onScroll.bind(this));
    this.element.addEventListener("touchmove", this.onScroll.bind(this)); // iOS Safari用
  }

  //メッセージカウントを更新
  return _createClass(InfiniteScroll, [{
    key: "updateMessageCount",
    value: function () {
      var _updateMessageCount = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.dataCount = document.querySelectorAll(".js_chat_message").length;
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function updateMessageCount() {
        return _updateMessageCount.apply(this, arguments);
      }
      return updateMessageCount;
    }()
  }, {
    key: "handleScroll",
    value: function () {
      var _handleScroll = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;
        var scrollThreshold, beforeUpdatingScrollTop, oldScrollHeight, url, response, dates_elements;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.hasNoValue || this.isFetchFlag)) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return");
            case 2:
              // スクロール位置の取得
              scrollThreshold = 20; // スクロール位置の閾値
              beforeUpdatingScrollTop = this.element.scrollTop; // スクロール位置が先頭に近い場合データをロード
              if (!(beforeUpdatingScrollTop <= scrollThreshold)) {
                _context2.next = 30;
                break;
              }
              this.isFetchFlag = true;

              // スクロール補正のための初期高さを非同期で取得
              oldScrollHeight = this.element.scrollHeight; // this.dataCount = document.querySelectorAll(".js_chat_message").length;
              url = "/api/users/messages/fetch/".concat(this.dataCount, "/").concat(this.userUuid, "/").concat(this.adminUuid);
              _context2.prev = 8;
              _context2.next = 11;
              return _api_Fetch__WEBPACK_IMPORTED_MODULE_2__["default"].fetchGetOperation(url);
            case 11:
              response = _context2.sent;
              console.log(response);
              if (!(response.length === 0)) {
                _context2.next = 16;
                break;
              }
              this.hasNoValue = true;
              return _context2.abrupt("return");
            case 16:
              dates_elements = document.querySelectorAll(".js_chat_message_date");
              Object.entries(response).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                  index = _ref2[0],
                  dateGroup = _ref2[1];
                Object.entries(dateGroup).reverse().forEach(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                    date = _ref4[0],
                    messages = _ref4[1];
                  _this.parentElement = _this.fileType === "user" ? document.querySelector(".js_append_user") : document.querySelector(".js_append_admin");
                  _this.new_date_el = dates_elements[0].cloneNode(true);
                  _this.new_date_el.innerHTML = date;
                  _this.new_date_el.setAttribute("data-date-name", date);
                  if (_this.default_message) {
                    _this.parentElement.removeChild(_this.default_message);
                  }
                  var existingDateElement = Array.from(dates_elements).find(function (el) {
                    return el.getAttribute("data-date-name") === date;
                  });
                  if (existingDateElement) {
                    _this.parentElement.removeChild(existingDateElement);
                  }
                  messages.slice().reverse().forEach(function (message) {
                    var date = new Date(message.created_at);
                    var time = date.toLocaleTimeString("ja-JP", {
                      timeZone: "Asia/Tokyo",
                      hour: "2-digit",
                      minute: "2-digit"
                    });
                    var parsedData = JSON.parse(message.crop_data);
                    // 共通の args を作成
                    var args = {
                      messageType: message.type,
                      cropArea: parsedData ? {
                        x_percent: parsedData.x_percent,
                        y_percent: parsedData.y_percent,
                        width_percent: parsedData.width_percent,
                        height_percent: parsedData.height_percent,
                        url: message.url
                      } : [],
                      position: "afterbegin",
                      time: time,
                      className: _this.fileType === "user" ? "js_append_user" : "js_append_admin",
                      senderType: message.sender_type,
                      content: message.content,
                      fileName: _this.fileType,
                      senderId: _this.fileType === "user" ? "" : _this.userUuid
                    };

                    // `ChatMessageController` のインスタンスを作成
                    var chatMessageController = new _component_chat_ChatMessageController__WEBPACK_IMPORTED_MODULE_0__["default"](args);

                    // チャットメッセージを表示
                    chatMessageController.displayChatMessage();
                  });
                  _this.parentElement.insertAdjacentElement("afterbegin", _this.new_date_el);
                  if (_this.default_message) {
                    _this.parentElement.insertAdjacentElement("afterbegin", _this.default_message);
                  }
                });
              });
              // // 画像を拡大する
              _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_1__["default"].open_image_modal(this.isAdmin);
              if (this.isAdmin) {
                _component_ui_ModalController__WEBPACK_IMPORTED_MODULE_1__["default"].close_image_by_key();
              }

              // スクロール位置の補正
              requestAnimationFrame(function () {
                var newScrollHeight = _this.element.scrollHeight;
                _this.element.scrollTop = newScrollHeight - oldScrollHeight;
              });
              _context2.next = 26;
              break;
            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](8);
              console.error("Failed to fetch data:", _context2.t0);
            case 26:
              _context2.prev = 26;
              this.isFetchFlag = false;
              this.dataCount += MESSAGES_PER_PAGE;
              return _context2.finish(26);
            case 30:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[8, 23, 26, 30]]);
      }));
      function handleScroll() {
        return _handleScroll.apply(this, arguments);
      }
      return handleScroll;
    }()
  }, {
    key: "onScroll",
    value: function onScroll() {
      if (this.isFetchFlag) return;
      clearTimeout(this.scrollEndTid);
      this.scrollEndTid = setTimeout(function () {
        // this.handleScroll();
      }, 200); // デバウンス時間を調整
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfiniteScroll); // ESモジュール形式でエクスポート

/***/ }),

/***/ "./resources/js/module/util/scrolling/InfiniteScrollForList.js":
/*!*********************************************************************!*\
  !*** ./resources/js/module/util/scrolling/InfiniteScrollForList.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _component_chat_ChatUIHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/chat/ChatUIHelper */ "./resources/js/module/component/chat/ChatUIHelper.js");
/* harmony import */ var _component_templates_elementTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../component/templates/elementTemplate */ "./resources/js/module/component/templates/elementTemplate.js");
/* harmony import */ var _api_Fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/Fetch */ "./resources/js/module/util/api/Fetch.js");
/* harmony import */ var _FormatText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../FormatText */ "./resources/js/module/util/FormatText.js");
/* harmony import */ var _state_UserStateManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../state/UserStateManager */ "./resources/js/module/util/state/UserStateManager.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





var MESSAGES_PER_PAGE = 20;
var InfiniteScrollForList = /*#__PURE__*/function () {
  function InfiniteScrollForList(element, adminId) {
    _classCallCheck(this, InfiniteScrollForList);
    this.element = element;
    this.hasNoValue = false;
    this.isFetchFlag = false;
    this.dataCount = 20;
    this.new_date_el = null;
    this.parentElement = null;
    this.hasDate = false;
    this.adminId = adminId;
    this.loader = document.querySelector(".js_loader");
    this.userList = _state_UserStateManager__WEBPACK_IMPORTED_MODULE_4__["default"].getState();
    // コンストラクタで定義された this を使用するメソッドをイベントリスナーやコールバックとして使用する場合、bind(this) が必要
    this.element.addEventListener("scroll", this.handleScroll.bind(this));
  }
  return _createClass(InfiniteScrollForList, [{
    key: "handleScroll",
    value: function () {
      var _handleScroll = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var _this$element, scrollTop, scrollHeight, clientHeight, url, data, response, elements;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!this.hasNoValue && !this.isFetchFlag)) {
                _context.next = 25;
                break;
              }
              _this$element = this.element, scrollTop = _this$element.scrollTop, scrollHeight = _this$element.scrollHeight, clientHeight = _this$element.clientHeight; // 一番下までスクロールしたかを判定
              if (!(scrollTop + clientHeight + 50 >= scrollHeight)) {
                _context.next = 25;
                break;
              }
              this.loader.classList.remove("hidden");
              this.isFetchFlag = true;
              url = "/api/users/list";
              data = {
                "adminId": this.adminId,
                "dataCount": this.dataCount,
                "userList": this.userList
              };
              _context.prev = 7;
              _context.next = 10;
              return _api_Fetch__WEBPACK_IMPORTED_MODULE_2__["default"].fetchPostOperation(data, url);
            case 10:
              response = _context.sent;
              if (response.length === 0) {
                this.hasNoValue = true;
              }
              this.loader.classList.add("hidden");
              response.forEach(function (res) {
                var parentEl = document.querySelector(".chat__users-list-container");
                if (res["latest_all_message"] !== null) {
                  parentEl.insertAdjacentHTML("beforeend", (0,_component_templates_elementTemplate__WEBPACK_IMPORTED_MODULE_1__.createChatUserContainer)(res["entity_uuid"], res));
                }
              });
              elements = document.querySelectorAll(".js_chatMessage_elment");
              elements.forEach(function (element) {
                element.innerHTML = _component_chat_ChatUIHelper__WEBPACK_IMPORTED_MODULE_0__["default"].adjustMesageLength(element.innerHTML);
              });
              _context.next = 21;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](7);
              console.error("Failed to fetch data:", _context.t0);
            case 21:
              _context.prev = 21;
              this.isFetchFlag = false;
              this.dataCount = this.dataCount + MESSAGES_PER_PAGE;
              return _context.finish(21);
            case 25:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[7, 18, 21, 25]]);
      }));
      function handleScroll() {
        return _handleScroll.apply(this, arguments);
      }
      return handleScroll;
    }()
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfiniteScrollForList); // ESモジュール形式でエクスポート

/***/ }),

/***/ "./resources/js/module/util/socket/SocketService.js":
/*!**********************************************************!*\
  !*** ./resources/js/module/util/socket/SocketService.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/build/esm/index.js");
/* harmony import */ var _BrowserAndDeviceDetector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../BrowserAndDeviceDetector.js */ "./resources/js/module/util/BrowserAndDeviceDetector.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// js/module/services/SocketService.js


var SocketService = /*#__PURE__*/function () {
  function SocketService(url, senderId) {
    var _this = this;
    _classCallCheck(this, SocketService);
    this.socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_0__["default"])(url, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
    if (_BrowserAndDeviceDetector_js__WEBPACK_IMPORTED_MODULE_1__["default"].isAndroid() || _BrowserAndDeviceDetector_js__WEBPACK_IMPORTED_MODULE_1__["default"].isIOS) {
      if (document.visibilityState == "visible") {
        this.socket.emit('userVisibility', {
          visibilityState: document.visibilityState,
          user_id: senderId,
          is_visible: true
        });
      }
    }
    this.socket.on('connect', function () {
      _this.registerUser(senderId);
    });
    this.socket.on('disconnect', function () {
      // 接続が切れた場合の処理を記述
      window.location.reload();
    });
  }
  return _createClass(SocketService, [{
    key: "registerUser",
    value: function registerUser(senderId) {
      if (this.socket && senderId) {
        this.socket.emit('register', senderId);
      }
    }
  }, {
    key: "sendHeartbeat",
    value: function sendHeartbeat() {
      if (this.socket) {
        this.socket.emit('heartbeat');
      }
    }
  }, {
    key: "getSocket",
    value: function getSocket() {
      return this.socket;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocketService);

/***/ }),

/***/ "./resources/js/module/util/state/UserStateManager.js":
/*!************************************************************!*\
  !*** ./resources/js/module/util/state/UserStateManager.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// シングルトンパターン
var UserStateManager = /*#__PURE__*/function () {
  function UserStateManager() {
    _classCallCheck(this, UserStateManager);
    if (!UserStateManager.instance) {
      this.list = []; // 初期状態
      UserStateManager.instance = this; // インスタンスを保存
    }
    return UserStateManager.instance; // 常に同じインスタンスを返す
  }
  return _createClass(UserStateManager, [{
    key: "getState",
    value: function getState() {
      return this.list;
    }
  }, {
    key: "setState",
    value: function setState(value) {
      this.list.push(value);
    }
  }]);
}();
var userStateManager = new UserStateManager();
Object.freeze(userStateManager); // インスタンスを凍結して変更不可に

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userStateManager);

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
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./resources/js/adminChat.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/util/messaging/messageService.js */ "./resources/js/module/util/messaging/messageService.js");
/* harmony import */ var _config_config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/config.js */ "./resources/js/config/config.js");
/* harmony import */ var _module_util_socket_SocketService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/util/socket/SocketService.js */ "./resources/js/module/util/socket/SocketService.js");
/* harmony import */ var _module_util_scrolling_InfiniteScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/util/scrolling/InfiniteScroll.js */ "./resources/js/module/util/scrolling/InfiniteScroll.js");
/* harmony import */ var _module_util_scrolling_InfiniteScrollForList_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/util/scrolling/InfiniteScrollForList.js */ "./resources/js/module/util/scrolling/InfiniteScrollForList.js");
/* harmony import */ var _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module/component/chat/ChatUIHelper.js */ "./resources/js/module/component/chat/ChatUIHelper.js");
/* harmony import */ var _module_component_ui_FormController_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./module/component/ui/FormController.js */ "./resources/js/module/component/ui/FormController.js");
/* harmony import */ var _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./module/component/ui/ModalController.js */ "./resources/js/module/component/ui/ModalController.js");
/* harmony import */ var _module_util_fileOperation_imageFileOperator_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./module/util/fileOperation/imageFileOperator.js */ "./resources/js/module/util/fileOperation/imageFileOperator.js");
/* harmony import */ var _module_util_bulk_messaging_util_MessageEditor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./module/util/bulk-messaging/util/MessageEditor.js */ "./resources/js/module/util/bulk-messaging/util/MessageEditor.js");
/* harmony import */ var _module_util_bulk_messaging_component_forms_MessageFormController_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./module/util/bulk-messaging/component/forms/MessageFormController.js */ "./resources/js/module/util/bulk-messaging/component/forms/MessageFormController.js");
/* harmony import */ var _module_component_messageTemplates_UpdateTemplateView_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./module/component/messageTemplates/UpdateTemplateView.js */ "./resources/js/module/component/messageTemplates/UpdateTemplateView.js");
/* harmony import */ var _module_component_messageTemplates_MessageTemplate_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./module/component/messageTemplates/MessageTemplate.js */ "./resources/js/module/component/messageTemplates/MessageTemplate.js");
/* harmony import */ var _module_util_api_Fetch_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./module/util/api/Fetch.js */ "./resources/js/module/util/api/Fetch.js");
/* harmony import */ var _config_apiEndPoints_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./config/apiEndPoints.js */ "./resources/js/config/apiEndPoints.js");
/* harmony import */ var _module_component_messageTemplates_InitializeTemplate_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./module/component/messageTemplates/InitializeTemplate.js */ "./resources/js/module/component/messageTemplates/InitializeTemplate.js");
/* harmony import */ var _module_component_chat_ChatMessageController_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./module/component/chat/ChatMessageController.js */ "./resources/js/module/component/chat/ChatMessageController.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }

















window.window.isON = {
  isSoundOn: false
};
document.addEventListener("DOMContentLoaded", function () {
  // チャット表示の無限スクロール

  var element = document.querySelector(".chat__message-main");
  var adminUuid = document.getElementById("js_sender_id").value;
  var userUuid = document.getElementById("js_receiver_id").value;
  var infiniteScrollInstance = new _module_util_scrolling_InfiniteScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"](element, adminUuid, userUuid, "admin", true);
  _module_component_ui_FormController_js__WEBPACK_IMPORTED_MODULE_6__["default"].changeTextareaHeight();
  _module_component_ui_FormController_js__WEBPACK_IMPORTED_MODULE_6__["default"].disableSubmitBtn();
  _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_modal();
  _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_management_modal();
  // // 画像を拡大する
  _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].open_image_modal(true);
  _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_image_by_key();

  // グローバル変数
  var is_searching = {
    flag: false
  };
  var sender_id = document.getElementById("js_sender_id").value;
  var socketService = new _module_util_socket_SocketService_js__WEBPACK_IMPORTED_MODULE_2__["default"](_config_config_js__WEBPACK_IMPORTED_MODULE_1__["default"].SOCKET_URL, sender_id);

  // 30秒ごとにハートビートを送信
  setInterval(socketService.sendHeartbeat(), 10000);
  var socket = socketService.getSocket();

  // メッセージテンプレート機能のモーダルを表示
  var messageSettingBtn = document.getElementById("js_template_btn");
  var messageSettingModal = document.getElementById("js_messageSetting_modal");
  messageSettingBtn.addEventListener("click", function () {
    var messageFormController = new _module_util_bulk_messaging_component_forms_MessageFormController_js__WEBPACK_IMPORTED_MODULE_10__["default"]();

    //テキストエリアを空にする
    messageFormController.clearTextarea();
    _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].open_management_modal(messageSettingModal);
    var messageEditor = new _module_util_bulk_messaging_util_MessageEditor_js__WEBPACK_IMPORTED_MODULE_9__["default"](socket);
    messageEditor.submitMessages();
  });

  // メッセージテンプレート選択
  {
    var selectBtn = document.getElementById("js_select_btn");
    selectBtn.addEventListener("click", function () {
      _module_component_messageTemplates_InitializeTemplate_js__WEBPACK_IMPORTED_MODULE_15__["default"].initialize();
      document.querySelector(".bg").classList.remove("hidden");
      document.querySelector(".message-template-container").classList.remove("hidden");
    });
  }

  // クライアントからソケットサーバーへメッセージを送信する
  document.querySelector(".chat__form-submit").addEventListener("click", function (e) {
    e.preventDefault();
    sendMessageToServer();
  });

  // クライアントからソケットサーバーへメッセージを送信する(Enter + shift)
  document.getElementById("js_msg").addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault(); // 改行を防止
      sendMessageToServer();
    }
  });
  var sendMessageToServer = function sendMessageToServer() {
    var _prepareMessageData = (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.prepareMessageData)(),
      msg = _prepareMessageData.msg,
      formattedMsg = _prepareMessageData.formattedMsg,
      receiver_id = _prepareMessageData.receiver_id,
      sender_type = _prepareMessageData.sender_type;
    // メッセージをサーバーに送信する
    (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.sendMessage)(socket, formattedMsg, sender_id, receiver_id, sender_type, msg, "/api/admin/messages");
  };

  // サーバーからのメッセージを受信
  socket.on('chat message', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(msg, sender_type, actual_sender_id, time, actual_receiver_id) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.handleReceivedMessage)(window.isON, is_searching, sender_type, actual_sender_id, time, actual_receiver_id, msg, "text");
          case 2:
            if (_module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].isCurrentUser(actual_sender_id) || _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].isCurrentAmdin(actual_sender_id, actual_receiver_id)) {
              _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].scrollToBottom();
            }
            // InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
            _context.next = 5;
            return infiniteScrollInstance.updateMessageCount();
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }());

  // サーバーからの画像を受信
  socket.on("send_image", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(sender_type, sender_id, time, receiver_id, resizedImage, cropArea) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_loader();
            _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].open_image_modal(true);
            _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_image_by_key();
            _context2.next = 5;
            return (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.handleReceivedMessage)(window.isON, is_searching, sender_type, sender_id, time, receiver_id, resizedImage, "image", cropArea);
          case 5:
            if (_module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].isCurrentUser(sender_id) || _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].isCurrentAmdin(sender_id, receiver_id)) {
              _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].scrollToBottom();
            }

            // InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
            _context2.next = 8;
            return infiniteScrollInstance.updateMessageCount();
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x6, _x7, _x8, _x9, _x10, _x11) {
      return _ref2.apply(this, arguments);
    };
  }());
  socket.on('send_messages', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(res) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_loader();
            _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].open_image_modal(true);
            _module_component_ui_ModalController_js__WEBPACK_IMPORTED_MODULE_7__["default"].close_image_by_key();
            res["data"].forEach(/*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!(data["type"] === "text")) {
                        _context3.next = 5;
                        break;
                      }
                      _context3.next = 3;
                      return (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.handleReceivedMessage)(window.isON, is_searching, "admin", data["adminUuid"], data["created_at"], data["userUuid"], data["resource"], "text");
                    case 3:
                      _context3.next = 8;
                      break;
                    case 5:
                      if (!(data["type"] === "image")) {
                        _context3.next = 8;
                        break;
                      }
                      _context3.next = 8;
                      return (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.handleReceivedMessage)(window.isON, is_searching, "admin", data["adminUuid"], data["created_at"], data["userUuid"], data["resource"], "image", data["cropArea"]);
                    case 8:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x13) {
                return _ref4.apply(this, arguments);
              };
            }());

            // InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
            _context4.next = 6;
            return infiniteScrollInstance.updateMessageCount();
          case 6:
            if (_module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].isCurrentUser(res["adminUuid"]) || _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].isCurrentAmdin(res["adminUuid"], res["userUuid"])) {
              _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].scrollToBottom();
            }
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x12) {
      return _ref3.apply(this, arguments);
    };
  }());
  socket.on("broadcast message", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(sendingDatatoBackEnd, created_at, userUuids, adminUuid, ids) {
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.handleReceivedBroadcastingMessage)(adminUuid, created_at, sendingDatatoBackEnd, ids);
            _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].scrollToBottom();

            // InfiniteScrollのインスタンスのthis.dataCOuntを更新(リアルタイムで表示されているデータ数を常に更新する)
            _context5.next = 4;
            return infiniteScrollInstance.updateMessageCount();
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x14, _x15, _x16, _x17, _x18) {
      return _ref5.apply(this, arguments);
    };
  }());
  var elements = document.querySelectorAll(".js_chatMessage_elment");
  elements.forEach(function (element) {
    element.innerHTML = _module_component_chat_ChatUIHelper_js__WEBPACK_IMPORTED_MODULE_5__["default"].adjustMesageLength(element.innerHTML);
  });

  // 画像の処理

  var fileInput = document.getElementById("fileInput");
  fileInput.addEventListener("change", /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          document.querySelector(".js_image_error").classList.add("hidden");
          _module_component_ui_FormController_js__WEBPACK_IMPORTED_MODULE_6__["default"].resetCropperUIElements();
          _context6.next = 4;
          return (0,_module_util_fileOperation_imageFileOperator_js__WEBPACK_IMPORTED_MODULE_8__.handleImageProcessingFlow)(socket, sender_id, "/api/admin/messages/image", "admin", fileInput.files[0]);
        case 4:
          fileInput.value = "";
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  })));

  // チャット画面検索機能
  var message_input = document.querySelector(".js_message_input");
  message_input.addEventListener("input", (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.debounce)(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(e) {
      var value;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            value = e.target.value;
            is_searching["flag"] = true;
            _context7.next = 4;
            return (0,_module_util_messaging_messageService_js__WEBPACK_IMPORTED_MODULE_0__.handleSearchInput)(is_searching, value, sender_id);
          case 4:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    return function (_x19) {
      return _ref7.apply(this, arguments);
    };
  }(), 500)); // 500ミリ秒の間隔を指定

  // チャットユーザーリストの無限スクロール
  {
    var _element = document.querySelector(".chat__users-list-area");
    var adminId = document.getElementById("js_admin_id").value;
    new _module_util_scrolling_InfiniteScrollForList_js__WEBPACK_IMPORTED_MODULE_4__["default"](_element, adminId);
  }
  {
    new _module_component_messageTemplates_MessageTemplate_js__WEBPACK_IMPORTED_MODULE_12__["default"]();
    var updateTemplateView = _module_component_messageTemplates_UpdateTemplateView_js__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance();
    var form = document.getElementById("template_form");
    form.addEventListener("submit", /*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(e) {
        var inputs, formData, textareas, hasValue, response, res;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              e.preventDefault();
              document.querySelector(".loader").classList.remove("hidden");
              document.querySelector(".message-template-container").classList.add("hidden");
              updateTemplateView.resetIndex();

              // 入力欄の前後の空白を削除
              inputs = form.querySelectorAll("input, textarea");
              inputs.forEach(function (el) {
                if (el.value) el.value = el.value.trim();
              });
              formData = new FormData(form);
              textareas = document.querySelectorAll(".template_textarea");
              hasValue = true;
              textareas.forEach(function (textarea) {
                if (textarea.value.trim().length <= 0) {
                  hasValue = false;
                }
              });
              if (hasValue) {
                _context8.next = 15;
                break;
              }
              alert("テンプレートメッセージは空白にできません。");
              document.querySelector(".loader").classList.add("hidden");
              document.querySelector(".message-template-container").classList.remove("hidden");
              return _context8.abrupt("return");
            case 15:
              _context8.next = 17;
              return fetch(_config_apiEndPoints_js__WEBPACK_IMPORTED_MODULE_14__.API_ENDPOINTS.TEMPLATE_SELECT, {
                method: "POST",
                body: formData
              });
            case 17:
              response = _context8.sent;
              if (response.ok) {
                _context8.next = 20;
                break;
              }
              throw new Error("サーバーからエラー応答が返されました。");
            case 20:
              _context8.next = 22;
              return response.json();
            case 22:
              res = _context8.sent;
              socket.emit("send_messages", {
                data: res["data"],
                adminUuid: res["data"][0]["adminUuid"],
                userUuid: res["data"][0]["userUuid"]
              });
            case 24:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      return function (_x20) {
        return _ref8.apply(this, arguments);
      };
    }());
  }

  // チャットユーザー切り替え
  {
    var btns = document.querySelectorAll(".js_user_btn");
    btns.forEach(function (btn) {
      btn.addEventListener("click", /*#__PURE__*/function () {
        var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(e) {
          var _document$querySelect;
          var userId, adminId, userUuid, src, name, response, dates_elements, default_message, parentElement;
          return _regeneratorRuntime().wrap(function _callee9$(_context9) {
            while (1) switch (_context9.prev = _context9.next) {
              case 0:
                userId = e.currentTarget.dataset.id;
                adminId = e.currentTarget.dataset.adminId;
                userUuid = e.currentTarget.dataset.uuid;
                src = e.currentTarget.querySelector(".chat_users-icon").src;
                name = e.currentTarget.querySelector(".chat_name_txt").innerHTML;
                _context9.next = 7;
                return _module_util_api_Fetch_js__WEBPACK_IMPORTED_MODULE_13__["default"].fetchGetOperation("".concat(_config_apiEndPoints_js__WEBPACK_IMPORTED_MODULE_14__.API_ENDPOINTS.GET_USER_CHATS, "/").concat(userId, "/").concat(adminId));
              case 7:
                response = _context9.sent;
                dates_elements = document.querySelectorAll(".js_chat_message_date");
                default_message = (_document$querySelect = document.querySelector(".chat_default-area")) !== null && _document$querySelect !== void 0 ? _document$querySelect : null;
                parentElement = document.querySelector(".js_append_admin");
                parentElement.dataset.id = userUuid;
                document.getElementById("js_receiver_id").value = userUuid;
                document.querySelector(".js_append_admin").dataset.id = userUuid;
                document.getElementById("js_chatuser_id").value = userUuid;
                console.log(userUuid);
                console.log(document.getElementById("js_chatuser_id"));
                document.querySelector(".js_user_icon").src = src;
                document.querySelectorAll(".chat_users-icon-message").forEach(function (icon) {
                  return icon.src = src;
                });
                document.querySelector(".chat_message_name").innerHTML = name;
                parentElement.innerHTML = "";
                Object.entries(response).forEach(function (_ref10) {
                  var _ref11 = _slicedToArray(_ref10, 2),
                    index = _ref11[0],
                    dateGroup = _ref11[1];
                  Object.entries(dateGroup).reverse().forEach(function (_ref12) {
                    var _ref13 = _slicedToArray(_ref12, 2),
                      date = _ref13[0],
                      messages = _ref13[1];
                    var new_date_el = dates_elements[0].cloneNode(true);
                    new_date_el.innerHTML = date;
                    new_date_el.setAttribute("data-date-name", date);
                    if (default_message) {
                      parentElement.removeChild(default_message);
                    }
                    messages.slice().reverse().forEach(function (message) {
                      var date = new Date(message.created_at);
                      var time = date.toLocaleTimeString("ja-JP", {
                        timeZone: "Asia/Tokyo",
                        hour: "2-digit",
                        minute: "2-digit"
                      });
                      var parsedData = JSON.parse(message.crop_data);
                      // 共通の args を作成
                      var args = {
                        messageType: message.type,
                        cropArea: parsedData ? {
                          x_percent: parsedData.x_percent,
                          y_percent: parsedData.y_percent,
                          width_percent: parsedData.width_percent,
                          height_percent: parsedData.height_percent,
                          url: message.url
                        } : [],
                        position: "afterbegin",
                        time: time,
                        className: "js_append_admin",
                        senderType: message.sender_type,
                        content: message.content,
                        fileName: "admin",
                        senderId: ""
                      };

                      // `ChatMessageController` のインスタンスを作成
                      var chatMessageController = new _module_component_chat_ChatMessageController_js__WEBPACK_IMPORTED_MODULE_16__["default"](args);

                      // チャットメッセージを表示
                      chatMessageController.displayChatMessage();
                    });
                    parentElement.insertAdjacentElement("afterbegin", new_date_el);
                    if (default_message) {
                      parentElement.insertAdjacentElement("afterbegin", default_message);
                    }
                  });
                });
              case 22:
              case "end":
                return _context9.stop();
            }
          }, _callee9);
        }));
        return function (_x21) {
          return _ref9.apply(this, arguments);
        };
      }());
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=adminChat.js.map