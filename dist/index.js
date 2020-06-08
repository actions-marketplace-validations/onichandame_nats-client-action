module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(526);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 16:
/***/ (function(module) {

module.exports = require("tls");

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 196:
/***/ (function(module, __unusedexports, __webpack_require__) {

(function(nacl) {
'use strict';

// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
// Public domain.
//
// Implementation derived from TweetNaCl version 20140427.
// See for details: http://tweetnacl.cr.yp.to/

var gf = function(init) {
  var i, r = new Float64Array(16);
  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
  return r;
};

//  Pluggable, initialized in high-level API below.
var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

var _0 = new Uint8Array(16);
var _9 = new Uint8Array(32); _9[0] = 9;

var gf0 = gf(),
    gf1 = gf([1]),
    _121665 = gf([0xdb41, 1]),
    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function ts64(x, i, h, l) {
  x[i]   = (h >> 24) & 0xff;
  x[i+1] = (h >> 16) & 0xff;
  x[i+2] = (h >>  8) & 0xff;
  x[i+3] = h & 0xff;
  x[i+4] = (l >> 24)  & 0xff;
  x[i+5] = (l >> 16)  & 0xff;
  x[i+6] = (l >>  8)  & 0xff;
  x[i+7] = l & 0xff;
}

function vn(x, xi, y, yi, n) {
  var i,d = 0;
  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
  return (1 & ((d - 1) >>> 8)) - 1;
}

function crypto_verify_16(x, xi, y, yi) {
  return vn(x,xi,y,yi,16);
}

function crypto_verify_32(x, xi, y, yi) {
  return vn(x,xi,y,yi,32);
}

function core_salsa20(o, p, k, c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }
   x0 =  x0 +  j0 | 0;
   x1 =  x1 +  j1 | 0;
   x2 =  x2 +  j2 | 0;
   x3 =  x3 +  j3 | 0;
   x4 =  x4 +  j4 | 0;
   x5 =  x5 +  j5 | 0;
   x6 =  x6 +  j6 | 0;
   x7 =  x7 +  j7 | 0;
   x8 =  x8 +  j8 | 0;
   x9 =  x9 +  j9 | 0;
  x10 = x10 + j10 | 0;
  x11 = x11 + j11 | 0;
  x12 = x12 + j12 | 0;
  x13 = x13 + j13 | 0;
  x14 = x14 + j14 | 0;
  x15 = x15 + j15 | 0;

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x1 >>>  0 & 0xff;
  o[ 5] = x1 >>>  8 & 0xff;
  o[ 6] = x1 >>> 16 & 0xff;
  o[ 7] = x1 >>> 24 & 0xff;

  o[ 8] = x2 >>>  0 & 0xff;
  o[ 9] = x2 >>>  8 & 0xff;
  o[10] = x2 >>> 16 & 0xff;
  o[11] = x2 >>> 24 & 0xff;

  o[12] = x3 >>>  0 & 0xff;
  o[13] = x3 >>>  8 & 0xff;
  o[14] = x3 >>> 16 & 0xff;
  o[15] = x3 >>> 24 & 0xff;

  o[16] = x4 >>>  0 & 0xff;
  o[17] = x4 >>>  8 & 0xff;
  o[18] = x4 >>> 16 & 0xff;
  o[19] = x4 >>> 24 & 0xff;

  o[20] = x5 >>>  0 & 0xff;
  o[21] = x5 >>>  8 & 0xff;
  o[22] = x5 >>> 16 & 0xff;
  o[23] = x5 >>> 24 & 0xff;

  o[24] = x6 >>>  0 & 0xff;
  o[25] = x6 >>>  8 & 0xff;
  o[26] = x6 >>> 16 & 0xff;
  o[27] = x6 >>> 24 & 0xff;

  o[28] = x7 >>>  0 & 0xff;
  o[29] = x7 >>>  8 & 0xff;
  o[30] = x7 >>> 16 & 0xff;
  o[31] = x7 >>> 24 & 0xff;

  o[32] = x8 >>>  0 & 0xff;
  o[33] = x8 >>>  8 & 0xff;
  o[34] = x8 >>> 16 & 0xff;
  o[35] = x8 >>> 24 & 0xff;

  o[36] = x9 >>>  0 & 0xff;
  o[37] = x9 >>>  8 & 0xff;
  o[38] = x9 >>> 16 & 0xff;
  o[39] = x9 >>> 24 & 0xff;

  o[40] = x10 >>>  0 & 0xff;
  o[41] = x10 >>>  8 & 0xff;
  o[42] = x10 >>> 16 & 0xff;
  o[43] = x10 >>> 24 & 0xff;

  o[44] = x11 >>>  0 & 0xff;
  o[45] = x11 >>>  8 & 0xff;
  o[46] = x11 >>> 16 & 0xff;
  o[47] = x11 >>> 24 & 0xff;

  o[48] = x12 >>>  0 & 0xff;
  o[49] = x12 >>>  8 & 0xff;
  o[50] = x12 >>> 16 & 0xff;
  o[51] = x12 >>> 24 & 0xff;

  o[52] = x13 >>>  0 & 0xff;
  o[53] = x13 >>>  8 & 0xff;
  o[54] = x13 >>> 16 & 0xff;
  o[55] = x13 >>> 24 & 0xff;

  o[56] = x14 >>>  0 & 0xff;
  o[57] = x14 >>>  8 & 0xff;
  o[58] = x14 >>> 16 & 0xff;
  o[59] = x14 >>> 24 & 0xff;

  o[60] = x15 >>>  0 & 0xff;
  o[61] = x15 >>>  8 & 0xff;
  o[62] = x15 >>> 16 & 0xff;
  o[63] = x15 >>> 24 & 0xff;
}

function core_hsalsa20(o,p,k,c) {
  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
      x15 = j15, u;

  for (var i = 0; i < 20; i += 2) {
    u = x0 + x12 | 0;
    x4 ^= u<<7 | u>>>(32-7);
    u = x4 + x0 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x4 | 0;
    x12 ^= u<<13 | u>>>(32-13);
    u = x12 + x8 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x1 | 0;
    x9 ^= u<<7 | u>>>(32-7);
    u = x9 + x5 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x9 | 0;
    x1 ^= u<<13 | u>>>(32-13);
    u = x1 + x13 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x6 | 0;
    x14 ^= u<<7 | u>>>(32-7);
    u = x14 + x10 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x14 | 0;
    x6 ^= u<<13 | u>>>(32-13);
    u = x6 + x2 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x11 | 0;
    x3 ^= u<<7 | u>>>(32-7);
    u = x3 + x15 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x3 | 0;
    x11 ^= u<<13 | u>>>(32-13);
    u = x11 + x7 | 0;
    x15 ^= u<<18 | u>>>(32-18);

    u = x0 + x3 | 0;
    x1 ^= u<<7 | u>>>(32-7);
    u = x1 + x0 | 0;
    x2 ^= u<<9 | u>>>(32-9);
    u = x2 + x1 | 0;
    x3 ^= u<<13 | u>>>(32-13);
    u = x3 + x2 | 0;
    x0 ^= u<<18 | u>>>(32-18);

    u = x5 + x4 | 0;
    x6 ^= u<<7 | u>>>(32-7);
    u = x6 + x5 | 0;
    x7 ^= u<<9 | u>>>(32-9);
    u = x7 + x6 | 0;
    x4 ^= u<<13 | u>>>(32-13);
    u = x4 + x7 | 0;
    x5 ^= u<<18 | u>>>(32-18);

    u = x10 + x9 | 0;
    x11 ^= u<<7 | u>>>(32-7);
    u = x11 + x10 | 0;
    x8 ^= u<<9 | u>>>(32-9);
    u = x8 + x11 | 0;
    x9 ^= u<<13 | u>>>(32-13);
    u = x9 + x8 | 0;
    x10 ^= u<<18 | u>>>(32-18);

    u = x15 + x14 | 0;
    x12 ^= u<<7 | u>>>(32-7);
    u = x12 + x15 | 0;
    x13 ^= u<<9 | u>>>(32-9);
    u = x13 + x12 | 0;
    x14 ^= u<<13 | u>>>(32-13);
    u = x14 + x13 | 0;
    x15 ^= u<<18 | u>>>(32-18);
  }

  o[ 0] = x0 >>>  0 & 0xff;
  o[ 1] = x0 >>>  8 & 0xff;
  o[ 2] = x0 >>> 16 & 0xff;
  o[ 3] = x0 >>> 24 & 0xff;

  o[ 4] = x5 >>>  0 & 0xff;
  o[ 5] = x5 >>>  8 & 0xff;
  o[ 6] = x5 >>> 16 & 0xff;
  o[ 7] = x5 >>> 24 & 0xff;

  o[ 8] = x10 >>>  0 & 0xff;
  o[ 9] = x10 >>>  8 & 0xff;
  o[10] = x10 >>> 16 & 0xff;
  o[11] = x10 >>> 24 & 0xff;

  o[12] = x15 >>>  0 & 0xff;
  o[13] = x15 >>>  8 & 0xff;
  o[14] = x15 >>> 16 & 0xff;
  o[15] = x15 >>> 24 & 0xff;

  o[16] = x6 >>>  0 & 0xff;
  o[17] = x6 >>>  8 & 0xff;
  o[18] = x6 >>> 16 & 0xff;
  o[19] = x6 >>> 24 & 0xff;

  o[20] = x7 >>>  0 & 0xff;
  o[21] = x7 >>>  8 & 0xff;
  o[22] = x7 >>> 16 & 0xff;
  o[23] = x7 >>> 24 & 0xff;

  o[24] = x8 >>>  0 & 0xff;
  o[25] = x8 >>>  8 & 0xff;
  o[26] = x8 >>> 16 & 0xff;
  o[27] = x8 >>> 24 & 0xff;

  o[28] = x9 >>>  0 & 0xff;
  o[29] = x9 >>>  8 & 0xff;
  o[30] = x9 >>> 16 & 0xff;
  o[31] = x9 >>> 24 & 0xff;
}

function crypto_core_salsa20(out,inp,k,c) {
  core_salsa20(out,inp,k,c);
}

function crypto_core_hsalsa20(out,inp,k,c) {
  core_hsalsa20(out,inp,k,c);
}

var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
            // "expand 32-byte k"

function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
    mpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
  }
  return 0;
}

function crypto_stream_salsa20(c,cpos,b,n,k) {
  var z = new Uint8Array(16), x = new Uint8Array(64);
  var u, i;
  for (i = 0; i < 16; i++) z[i] = 0;
  for (i = 0; i < 8; i++) z[i] = n[i];
  while (b >= 64) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
    u = 1;
    for (i = 8; i < 16; i++) {
      u = u + (z[i] & 0xff) | 0;
      z[i] = u & 0xff;
      u >>>= 8;
    }
    b -= 64;
    cpos += 64;
  }
  if (b > 0) {
    crypto_core_salsa20(x,z,k,sigma);
    for (i = 0; i < b; i++) c[cpos+i] = x[i];
  }
  return 0;
}

function crypto_stream(c,cpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20(c,cpos,d,sn,s);
}

function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
  var s = new Uint8Array(32);
  crypto_core_hsalsa20(s,n,k,sigma);
  var sn = new Uint8Array(8);
  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
}

/*
* Port of Andrew Moon's Poly1305-donna-16. Public domain.
* https://github.com/floodyberry/poly1305-donna
*/

var poly1305 = function(key) {
  this.buffer = new Uint8Array(16);
  this.r = new Uint16Array(10);
  this.h = new Uint16Array(10);
  this.pad = new Uint16Array(8);
  this.leftover = 0;
  this.fin = 0;

  var t0, t1, t2, t3, t4, t5, t6, t7;

  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
  this.r[9] = ((t7 >>>  5)) & 0x007f;

  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
};

poly1305.prototype.blocks = function(m, mpos, bytes) {
  var hibit = this.fin ? 0 : (1 << 11);
  var t0, t1, t2, t3, t4, t5, t6, t7, c;
  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

  var h0 = this.h[0],
      h1 = this.h[1],
      h2 = this.h[2],
      h3 = this.h[3],
      h4 = this.h[4],
      h5 = this.h[5],
      h6 = this.h[6],
      h7 = this.h[7],
      h8 = this.h[8],
      h9 = this.h[9];

  var r0 = this.r[0],
      r1 = this.r[1],
      r2 = this.r[2],
      r3 = this.r[3],
      r4 = this.r[4],
      r5 = this.r[5],
      r6 = this.r[6],
      r7 = this.r[7],
      r8 = this.r[8],
      r9 = this.r[9];

  while (bytes >= 16) {
    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
    h5 += ((t4 >>>  1)) & 0x1fff;
    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
    h9 += ((t7 >>> 5)) | hibit;

    c = 0;

    d0 = c;
    d0 += h0 * r0;
    d0 += h1 * (5 * r9);
    d0 += h2 * (5 * r8);
    d0 += h3 * (5 * r7);
    d0 += h4 * (5 * r6);
    c = (d0 >>> 13); d0 &= 0x1fff;
    d0 += h5 * (5 * r5);
    d0 += h6 * (5 * r4);
    d0 += h7 * (5 * r3);
    d0 += h8 * (5 * r2);
    d0 += h9 * (5 * r1);
    c += (d0 >>> 13); d0 &= 0x1fff;

    d1 = c;
    d1 += h0 * r1;
    d1 += h1 * r0;
    d1 += h2 * (5 * r9);
    d1 += h3 * (5 * r8);
    d1 += h4 * (5 * r7);
    c = (d1 >>> 13); d1 &= 0x1fff;
    d1 += h5 * (5 * r6);
    d1 += h6 * (5 * r5);
    d1 += h7 * (5 * r4);
    d1 += h8 * (5 * r3);
    d1 += h9 * (5 * r2);
    c += (d1 >>> 13); d1 &= 0x1fff;

    d2 = c;
    d2 += h0 * r2;
    d2 += h1 * r1;
    d2 += h2 * r0;
    d2 += h3 * (5 * r9);
    d2 += h4 * (5 * r8);
    c = (d2 >>> 13); d2 &= 0x1fff;
    d2 += h5 * (5 * r7);
    d2 += h6 * (5 * r6);
    d2 += h7 * (5 * r5);
    d2 += h8 * (5 * r4);
    d2 += h9 * (5 * r3);
    c += (d2 >>> 13); d2 &= 0x1fff;

    d3 = c;
    d3 += h0 * r3;
    d3 += h1 * r2;
    d3 += h2 * r1;
    d3 += h3 * r0;
    d3 += h4 * (5 * r9);
    c = (d3 >>> 13); d3 &= 0x1fff;
    d3 += h5 * (5 * r8);
    d3 += h6 * (5 * r7);
    d3 += h7 * (5 * r6);
    d3 += h8 * (5 * r5);
    d3 += h9 * (5 * r4);
    c += (d3 >>> 13); d3 &= 0x1fff;

    d4 = c;
    d4 += h0 * r4;
    d4 += h1 * r3;
    d4 += h2 * r2;
    d4 += h3 * r1;
    d4 += h4 * r0;
    c = (d4 >>> 13); d4 &= 0x1fff;
    d4 += h5 * (5 * r9);
    d4 += h6 * (5 * r8);
    d4 += h7 * (5 * r7);
    d4 += h8 * (5 * r6);
    d4 += h9 * (5 * r5);
    c += (d4 >>> 13); d4 &= 0x1fff;

    d5 = c;
    d5 += h0 * r5;
    d5 += h1 * r4;
    d5 += h2 * r3;
    d5 += h3 * r2;
    d5 += h4 * r1;
    c = (d5 >>> 13); d5 &= 0x1fff;
    d5 += h5 * r0;
    d5 += h6 * (5 * r9);
    d5 += h7 * (5 * r8);
    d5 += h8 * (5 * r7);
    d5 += h9 * (5 * r6);
    c += (d5 >>> 13); d5 &= 0x1fff;

    d6 = c;
    d6 += h0 * r6;
    d6 += h1 * r5;
    d6 += h2 * r4;
    d6 += h3 * r3;
    d6 += h4 * r2;
    c = (d6 >>> 13); d6 &= 0x1fff;
    d6 += h5 * r1;
    d6 += h6 * r0;
    d6 += h7 * (5 * r9);
    d6 += h8 * (5 * r8);
    d6 += h9 * (5 * r7);
    c += (d6 >>> 13); d6 &= 0x1fff;

    d7 = c;
    d7 += h0 * r7;
    d7 += h1 * r6;
    d7 += h2 * r5;
    d7 += h3 * r4;
    d7 += h4 * r3;
    c = (d7 >>> 13); d7 &= 0x1fff;
    d7 += h5 * r2;
    d7 += h6 * r1;
    d7 += h7 * r0;
    d7 += h8 * (5 * r9);
    d7 += h9 * (5 * r8);
    c += (d7 >>> 13); d7 &= 0x1fff;

    d8 = c;
    d8 += h0 * r8;
    d8 += h1 * r7;
    d8 += h2 * r6;
    d8 += h3 * r5;
    d8 += h4 * r4;
    c = (d8 >>> 13); d8 &= 0x1fff;
    d8 += h5 * r3;
    d8 += h6 * r2;
    d8 += h7 * r1;
    d8 += h8 * r0;
    d8 += h9 * (5 * r9);
    c += (d8 >>> 13); d8 &= 0x1fff;

    d9 = c;
    d9 += h0 * r9;
    d9 += h1 * r8;
    d9 += h2 * r7;
    d9 += h3 * r6;
    d9 += h4 * r5;
    c = (d9 >>> 13); d9 &= 0x1fff;
    d9 += h5 * r4;
    d9 += h6 * r3;
    d9 += h7 * r2;
    d9 += h8 * r1;
    d9 += h9 * r0;
    c += (d9 >>> 13); d9 &= 0x1fff;

    c = (((c << 2) + c)) | 0;
    c = (c + d0) | 0;
    d0 = c & 0x1fff;
    c = (c >>> 13);
    d1 += c;

    h0 = d0;
    h1 = d1;
    h2 = d2;
    h3 = d3;
    h4 = d4;
    h5 = d5;
    h6 = d6;
    h7 = d7;
    h8 = d8;
    h9 = d9;

    mpos += 16;
    bytes -= 16;
  }
  this.h[0] = h0;
  this.h[1] = h1;
  this.h[2] = h2;
  this.h[3] = h3;
  this.h[4] = h4;
  this.h[5] = h5;
  this.h[6] = h6;
  this.h[7] = h7;
  this.h[8] = h8;
  this.h[9] = h9;
};

poly1305.prototype.finish = function(mac, macpos) {
  var g = new Uint16Array(10);
  var c, mask, f, i;

  if (this.leftover) {
    i = this.leftover;
    this.buffer[i++] = 1;
    for (; i < 16; i++) this.buffer[i] = 0;
    this.fin = 1;
    this.blocks(this.buffer, 0, 16);
  }

  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  for (i = 2; i < 10; i++) {
    this.h[i] += c;
    c = this.h[i] >>> 13;
    this.h[i] &= 0x1fff;
  }
  this.h[0] += (c * 5);
  c = this.h[0] >>> 13;
  this.h[0] &= 0x1fff;
  this.h[1] += c;
  c = this.h[1] >>> 13;
  this.h[1] &= 0x1fff;
  this.h[2] += c;

  g[0] = this.h[0] + 5;
  c = g[0] >>> 13;
  g[0] &= 0x1fff;
  for (i = 1; i < 10; i++) {
    g[i] = this.h[i] + c;
    c = g[i] >>> 13;
    g[i] &= 0x1fff;
  }
  g[9] -= (1 << 13);

  mask = (c ^ 1) - 1;
  for (i = 0; i < 10; i++) g[i] &= mask;
  mask = ~mask;
  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

  f = this.h[0] + this.pad[0];
  this.h[0] = f & 0xffff;
  for (i = 1; i < 8; i++) {
    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
    this.h[i] = f & 0xffff;
  }

  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
};

poly1305.prototype.update = function(m, mpos, bytes) {
  var i, want;

  if (this.leftover) {
    want = (16 - this.leftover);
    if (want > bytes)
      want = bytes;
    for (i = 0; i < want; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    bytes -= want;
    mpos += want;
    this.leftover += want;
    if (this.leftover < 16)
      return;
    this.blocks(this.buffer, 0, 16);
    this.leftover = 0;
  }

  if (bytes >= 16) {
    want = bytes - (bytes % 16);
    this.blocks(m, mpos, want);
    mpos += want;
    bytes -= want;
  }

  if (bytes) {
    for (i = 0; i < bytes; i++)
      this.buffer[this.leftover + i] = m[mpos+i];
    this.leftover += bytes;
  }
};

function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
  var s = new poly1305(k);
  s.update(m, mpos, n);
  s.finish(out, outpos);
  return 0;
}

function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
  var x = new Uint8Array(16);
  crypto_onetimeauth(x,0,m,mpos,n,k);
  return crypto_verify_16(h,hpos,x,0);
}

function crypto_secretbox(c,m,d,n,k) {
  var i;
  if (d < 32) return -1;
  crypto_stream_xor(c,0,m,0,d,n,k);
  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
  for (i = 0; i < 16; i++) c[i] = 0;
  return 0;
}

function crypto_secretbox_open(m,c,d,n,k) {
  var i;
  var x = new Uint8Array(32);
  if (d < 32) return -1;
  crypto_stream(x,0,32,n,k);
  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
  crypto_stream_xor(m,0,c,0,d,n,k);
  for (i = 0; i < 32; i++) m[i] = 0;
  return 0;
}

function set25519(r, a) {
  var i;
  for (i = 0; i < 16; i++) r[i] = a[i]|0;
}

function car25519(o) {
  var i, v, c = 1;
  for (i = 0; i < 16; i++) {
    v = o[i] + c + 65535;
    c = Math.floor(v / 65536);
    o[i] = v - c * 65536;
  }
  o[0] += c-1 + 37 * (c-1);
}

function sel25519(p, q, b) {
  var t, c = ~(b-1);
  for (var i = 0; i < 16; i++) {
    t = c & (p[i] ^ q[i]);
    p[i] ^= t;
    q[i] ^= t;
  }
}

function pack25519(o, n) {
  var i, j, b;
  var m = gf(), t = gf();
  for (i = 0; i < 16; i++) t[i] = n[i];
  car25519(t);
  car25519(t);
  car25519(t);
  for (j = 0; j < 2; j++) {
    m[0] = t[0] - 0xffed;
    for (i = 1; i < 15; i++) {
      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
      m[i-1] &= 0xffff;
    }
    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
    b = (m[15]>>16) & 1;
    m[14] &= 0xffff;
    sel25519(t, m, 1-b);
  }
  for (i = 0; i < 16; i++) {
    o[2*i] = t[i] & 0xff;
    o[2*i+1] = t[i]>>8;
  }
}

function neq25519(a, b) {
  var c = new Uint8Array(32), d = new Uint8Array(32);
  pack25519(c, a);
  pack25519(d, b);
  return crypto_verify_32(c, 0, d, 0);
}

function par25519(a) {
  var d = new Uint8Array(32);
  pack25519(d, a);
  return d[0] & 1;
}

function unpack25519(o, n) {
  var i;
  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
  o[15] &= 0x7fff;
}

function A(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
}

function Z(o, a, b) {
  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
}

function M(o, a, b) {
  var v, c,
     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
    b0 = b[0],
    b1 = b[1],
    b2 = b[2],
    b3 = b[3],
    b4 = b[4],
    b5 = b[5],
    b6 = b[6],
    b7 = b[7],
    b8 = b[8],
    b9 = b[9],
    b10 = b[10],
    b11 = b[11],
    b12 = b[12],
    b13 = b[13],
    b14 = b[14],
    b15 = b[15];

  v = a[0];
  t0 += v * b0;
  t1 += v * b1;
  t2 += v * b2;
  t3 += v * b3;
  t4 += v * b4;
  t5 += v * b5;
  t6 += v * b6;
  t7 += v * b7;
  t8 += v * b8;
  t9 += v * b9;
  t10 += v * b10;
  t11 += v * b11;
  t12 += v * b12;
  t13 += v * b13;
  t14 += v * b14;
  t15 += v * b15;
  v = a[1];
  t1 += v * b0;
  t2 += v * b1;
  t3 += v * b2;
  t4 += v * b3;
  t5 += v * b4;
  t6 += v * b5;
  t7 += v * b6;
  t8 += v * b7;
  t9 += v * b8;
  t10 += v * b9;
  t11 += v * b10;
  t12 += v * b11;
  t13 += v * b12;
  t14 += v * b13;
  t15 += v * b14;
  t16 += v * b15;
  v = a[2];
  t2 += v * b0;
  t3 += v * b1;
  t4 += v * b2;
  t5 += v * b3;
  t6 += v * b4;
  t7 += v * b5;
  t8 += v * b6;
  t9 += v * b7;
  t10 += v * b8;
  t11 += v * b9;
  t12 += v * b10;
  t13 += v * b11;
  t14 += v * b12;
  t15 += v * b13;
  t16 += v * b14;
  t17 += v * b15;
  v = a[3];
  t3 += v * b0;
  t4 += v * b1;
  t5 += v * b2;
  t6 += v * b3;
  t7 += v * b4;
  t8 += v * b5;
  t9 += v * b6;
  t10 += v * b7;
  t11 += v * b8;
  t12 += v * b9;
  t13 += v * b10;
  t14 += v * b11;
  t15 += v * b12;
  t16 += v * b13;
  t17 += v * b14;
  t18 += v * b15;
  v = a[4];
  t4 += v * b0;
  t5 += v * b1;
  t6 += v * b2;
  t7 += v * b3;
  t8 += v * b4;
  t9 += v * b5;
  t10 += v * b6;
  t11 += v * b7;
  t12 += v * b8;
  t13 += v * b9;
  t14 += v * b10;
  t15 += v * b11;
  t16 += v * b12;
  t17 += v * b13;
  t18 += v * b14;
  t19 += v * b15;
  v = a[5];
  t5 += v * b0;
  t6 += v * b1;
  t7 += v * b2;
  t8 += v * b3;
  t9 += v * b4;
  t10 += v * b5;
  t11 += v * b6;
  t12 += v * b7;
  t13 += v * b8;
  t14 += v * b9;
  t15 += v * b10;
  t16 += v * b11;
  t17 += v * b12;
  t18 += v * b13;
  t19 += v * b14;
  t20 += v * b15;
  v = a[6];
  t6 += v * b0;
  t7 += v * b1;
  t8 += v * b2;
  t9 += v * b3;
  t10 += v * b4;
  t11 += v * b5;
  t12 += v * b6;
  t13 += v * b7;
  t14 += v * b8;
  t15 += v * b9;
  t16 += v * b10;
  t17 += v * b11;
  t18 += v * b12;
  t19 += v * b13;
  t20 += v * b14;
  t21 += v * b15;
  v = a[7];
  t7 += v * b0;
  t8 += v * b1;
  t9 += v * b2;
  t10 += v * b3;
  t11 += v * b4;
  t12 += v * b5;
  t13 += v * b6;
  t14 += v * b7;
  t15 += v * b8;
  t16 += v * b9;
  t17 += v * b10;
  t18 += v * b11;
  t19 += v * b12;
  t20 += v * b13;
  t21 += v * b14;
  t22 += v * b15;
  v = a[8];
  t8 += v * b0;
  t9 += v * b1;
  t10 += v * b2;
  t11 += v * b3;
  t12 += v * b4;
  t13 += v * b5;
  t14 += v * b6;
  t15 += v * b7;
  t16 += v * b8;
  t17 += v * b9;
  t18 += v * b10;
  t19 += v * b11;
  t20 += v * b12;
  t21 += v * b13;
  t22 += v * b14;
  t23 += v * b15;
  v = a[9];
  t9 += v * b0;
  t10 += v * b1;
  t11 += v * b2;
  t12 += v * b3;
  t13 += v * b4;
  t14 += v * b5;
  t15 += v * b6;
  t16 += v * b7;
  t17 += v * b8;
  t18 += v * b9;
  t19 += v * b10;
  t20 += v * b11;
  t21 += v * b12;
  t22 += v * b13;
  t23 += v * b14;
  t24 += v * b15;
  v = a[10];
  t10 += v * b0;
  t11 += v * b1;
  t12 += v * b2;
  t13 += v * b3;
  t14 += v * b4;
  t15 += v * b5;
  t16 += v * b6;
  t17 += v * b7;
  t18 += v * b8;
  t19 += v * b9;
  t20 += v * b10;
  t21 += v * b11;
  t22 += v * b12;
  t23 += v * b13;
  t24 += v * b14;
  t25 += v * b15;
  v = a[11];
  t11 += v * b0;
  t12 += v * b1;
  t13 += v * b2;
  t14 += v * b3;
  t15 += v * b4;
  t16 += v * b5;
  t17 += v * b6;
  t18 += v * b7;
  t19 += v * b8;
  t20 += v * b9;
  t21 += v * b10;
  t22 += v * b11;
  t23 += v * b12;
  t24 += v * b13;
  t25 += v * b14;
  t26 += v * b15;
  v = a[12];
  t12 += v * b0;
  t13 += v * b1;
  t14 += v * b2;
  t15 += v * b3;
  t16 += v * b4;
  t17 += v * b5;
  t18 += v * b6;
  t19 += v * b7;
  t20 += v * b8;
  t21 += v * b9;
  t22 += v * b10;
  t23 += v * b11;
  t24 += v * b12;
  t25 += v * b13;
  t26 += v * b14;
  t27 += v * b15;
  v = a[13];
  t13 += v * b0;
  t14 += v * b1;
  t15 += v * b2;
  t16 += v * b3;
  t17 += v * b4;
  t18 += v * b5;
  t19 += v * b6;
  t20 += v * b7;
  t21 += v * b8;
  t22 += v * b9;
  t23 += v * b10;
  t24 += v * b11;
  t25 += v * b12;
  t26 += v * b13;
  t27 += v * b14;
  t28 += v * b15;
  v = a[14];
  t14 += v * b0;
  t15 += v * b1;
  t16 += v * b2;
  t17 += v * b3;
  t18 += v * b4;
  t19 += v * b5;
  t20 += v * b6;
  t21 += v * b7;
  t22 += v * b8;
  t23 += v * b9;
  t24 += v * b10;
  t25 += v * b11;
  t26 += v * b12;
  t27 += v * b13;
  t28 += v * b14;
  t29 += v * b15;
  v = a[15];
  t15 += v * b0;
  t16 += v * b1;
  t17 += v * b2;
  t18 += v * b3;
  t19 += v * b4;
  t20 += v * b5;
  t21 += v * b6;
  t22 += v * b7;
  t23 += v * b8;
  t24 += v * b9;
  t25 += v * b10;
  t26 += v * b11;
  t27 += v * b12;
  t28 += v * b13;
  t29 += v * b14;
  t30 += v * b15;

  t0  += 38 * t16;
  t1  += 38 * t17;
  t2  += 38 * t18;
  t3  += 38 * t19;
  t4  += 38 * t20;
  t5  += 38 * t21;
  t6  += 38 * t22;
  t7  += 38 * t23;
  t8  += 38 * t24;
  t9  += 38 * t25;
  t10 += 38 * t26;
  t11 += 38 * t27;
  t12 += 38 * t28;
  t13 += 38 * t29;
  t14 += 38 * t30;
  // t15 left as is

  // first car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  // second car
  c = 1;
  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
  t0 += c-1 + 37 * (c-1);

  o[ 0] = t0;
  o[ 1] = t1;
  o[ 2] = t2;
  o[ 3] = t3;
  o[ 4] = t4;
  o[ 5] = t5;
  o[ 6] = t6;
  o[ 7] = t7;
  o[ 8] = t8;
  o[ 9] = t9;
  o[10] = t10;
  o[11] = t11;
  o[12] = t12;
  o[13] = t13;
  o[14] = t14;
  o[15] = t15;
}

function S(o, a) {
  M(o, a, a);
}

function inv25519(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 253; a >= 0; a--) {
    S(c, c);
    if(a !== 2 && a !== 4) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function pow2523(o, i) {
  var c = gf();
  var a;
  for (a = 0; a < 16; a++) c[a] = i[a];
  for (a = 250; a >= 0; a--) {
      S(c, c);
      if(a !== 1) M(c, c, i);
  }
  for (a = 0; a < 16; a++) o[a] = c[a];
}

function crypto_scalarmult(q, n, p) {
  var z = new Uint8Array(32);
  var x = new Float64Array(80), r, i;
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf();
  for (i = 0; i < 31; i++) z[i] = n[i];
  z[31]=(n[31]&127)|64;
  z[0]&=248;
  unpack25519(x,p);
  for (i = 0; i < 16; i++) {
    b[i]=x[i];
    d[i]=a[i]=c[i]=0;
  }
  a[0]=d[0]=1;
  for (i=254; i>=0; --i) {
    r=(z[i>>>3]>>>(i&7))&1;
    sel25519(a,b,r);
    sel25519(c,d,r);
    A(e,a,c);
    Z(a,a,c);
    A(c,b,d);
    Z(b,b,d);
    S(d,e);
    S(f,a);
    M(a,c,a);
    M(c,b,e);
    A(e,a,c);
    Z(a,a,c);
    S(b,a);
    Z(c,d,f);
    M(a,c,_121665);
    A(a,a,d);
    M(c,c,a);
    M(a,d,f);
    M(d,b,x);
    S(b,e);
    sel25519(a,b,r);
    sel25519(c,d,r);
  }
  for (i = 0; i < 16; i++) {
    x[i+16]=a[i];
    x[i+32]=c[i];
    x[i+48]=b[i];
    x[i+64]=d[i];
  }
  var x32 = x.subarray(32);
  var x16 = x.subarray(16);
  inv25519(x32,x32);
  M(x16,x16,x32);
  pack25519(q,x16);
  return 0;
}

function crypto_scalarmult_base(q, n) {
  return crypto_scalarmult(q, n, _9);
}

function crypto_box_keypair(y, x) {
  randombytes(x, 32);
  return crypto_scalarmult_base(y, x);
}

function crypto_box_beforenm(k, y, x) {
  var s = new Uint8Array(32);
  crypto_scalarmult(s, x, y);
  return crypto_core_hsalsa20(k, _0, s, sigma);
}

var crypto_box_afternm = crypto_secretbox;
var crypto_box_open_afternm = crypto_secretbox_open;

function crypto_box(c, m, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_afternm(c, m, d, n, k);
}

function crypto_box_open(m, c, d, n, y, x) {
  var k = new Uint8Array(32);
  crypto_box_beforenm(k, y, x);
  return crypto_box_open_afternm(m, c, d, n, k);
}

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function crypto_hashblocks_hl(hh, hl, m, n) {
  var wh = new Int32Array(16), wl = new Int32Array(16),
      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
      th, tl, i, j, h, l, a, b, c, d;

  var ah0 = hh[0],
      ah1 = hh[1],
      ah2 = hh[2],
      ah3 = hh[3],
      ah4 = hh[4],
      ah5 = hh[5],
      ah6 = hh[6],
      ah7 = hh[7],

      al0 = hl[0],
      al1 = hl[1],
      al2 = hl[2],
      al3 = hl[3],
      al4 = hl[4],
      al5 = hl[5],
      al6 = hl[6],
      al7 = hl[7];

  var pos = 0;
  while (n >= 128) {
    for (i = 0; i < 16; i++) {
      j = 8 * i + pos;
      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
    }
    for (i = 0; i < 80; i++) {
      bh0 = ah0;
      bh1 = ah1;
      bh2 = ah2;
      bh3 = ah3;
      bh4 = ah4;
      bh5 = ah5;
      bh6 = ah6;
      bh7 = ah7;

      bl0 = al0;
      bl1 = al1;
      bl2 = al2;
      bl3 = al3;
      bl4 = al4;
      bl5 = al5;
      bl6 = al6;
      bl7 = al7;

      // add
      h = ah7;
      l = al7;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma1
      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Ch
      h = (ah4 & ah5) ^ (~ah4 & ah6);
      l = (al4 & al5) ^ (~al4 & al6);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // K
      h = K[i*2];
      l = K[i*2+1];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // w
      h = wh[i%16];
      l = wl[i%16];

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      th = c & 0xffff | d << 16;
      tl = a & 0xffff | b << 16;

      // add
      h = th;
      l = tl;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      // Sigma0
      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      // Maj
      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh7 = (c & 0xffff) | (d << 16);
      bl7 = (a & 0xffff) | (b << 16);

      // add
      h = bh3;
      l = bl3;

      a = l & 0xffff; b = l >>> 16;
      c = h & 0xffff; d = h >>> 16;

      h = th;
      l = tl;

      a += l & 0xffff; b += l >>> 16;
      c += h & 0xffff; d += h >>> 16;

      b += a >>> 16;
      c += b >>> 16;
      d += c >>> 16;

      bh3 = (c & 0xffff) | (d << 16);
      bl3 = (a & 0xffff) | (b << 16);

      ah1 = bh0;
      ah2 = bh1;
      ah3 = bh2;
      ah4 = bh3;
      ah5 = bh4;
      ah6 = bh5;
      ah7 = bh6;
      ah0 = bh7;

      al1 = bl0;
      al2 = bl1;
      al3 = bl2;
      al4 = bl3;
      al5 = bl4;
      al6 = bl5;
      al7 = bl6;
      al0 = bl7;

      if (i%16 === 15) {
        for (j = 0; j < 16; j++) {
          // add
          h = wh[j];
          l = wl[j];

          a = l & 0xffff; b = l >>> 16;
          c = h & 0xffff; d = h >>> 16;

          h = wh[(j+9)%16];
          l = wl[(j+9)%16];

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma0
          th = wh[(j+1)%16];
          tl = wl[(j+1)%16];
          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          // sigma1
          th = wh[(j+14)%16];
          tl = wl[(j+14)%16];
          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

          a += l & 0xffff; b += l >>> 16;
          c += h & 0xffff; d += h >>> 16;

          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;

          wh[j] = (c & 0xffff) | (d << 16);
          wl[j] = (a & 0xffff) | (b << 16);
        }
      }
    }

    // add
    h = ah0;
    l = al0;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[0];
    l = hl[0];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[0] = ah0 = (c & 0xffff) | (d << 16);
    hl[0] = al0 = (a & 0xffff) | (b << 16);

    h = ah1;
    l = al1;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[1];
    l = hl[1];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[1] = ah1 = (c & 0xffff) | (d << 16);
    hl[1] = al1 = (a & 0xffff) | (b << 16);

    h = ah2;
    l = al2;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[2];
    l = hl[2];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[2] = ah2 = (c & 0xffff) | (d << 16);
    hl[2] = al2 = (a & 0xffff) | (b << 16);

    h = ah3;
    l = al3;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[3];
    l = hl[3];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[3] = ah3 = (c & 0xffff) | (d << 16);
    hl[3] = al3 = (a & 0xffff) | (b << 16);

    h = ah4;
    l = al4;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[4];
    l = hl[4];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[4] = ah4 = (c & 0xffff) | (d << 16);
    hl[4] = al4 = (a & 0xffff) | (b << 16);

    h = ah5;
    l = al5;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[5];
    l = hl[5];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[5] = ah5 = (c & 0xffff) | (d << 16);
    hl[5] = al5 = (a & 0xffff) | (b << 16);

    h = ah6;
    l = al6;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[6];
    l = hl[6];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[6] = ah6 = (c & 0xffff) | (d << 16);
    hl[6] = al6 = (a & 0xffff) | (b << 16);

    h = ah7;
    l = al7;

    a = l & 0xffff; b = l >>> 16;
    c = h & 0xffff; d = h >>> 16;

    h = hh[7];
    l = hl[7];

    a += l & 0xffff; b += l >>> 16;
    c += h & 0xffff; d += h >>> 16;

    b += a >>> 16;
    c += b >>> 16;
    d += c >>> 16;

    hh[7] = ah7 = (c & 0xffff) | (d << 16);
    hl[7] = al7 = (a & 0xffff) | (b << 16);

    pos += 128;
    n -= 128;
  }

  return n;
}

function crypto_hash(out, m, n) {
  var hh = new Int32Array(8),
      hl = new Int32Array(8),
      x = new Uint8Array(256),
      i, b = n;

  hh[0] = 0x6a09e667;
  hh[1] = 0xbb67ae85;
  hh[2] = 0x3c6ef372;
  hh[3] = 0xa54ff53a;
  hh[4] = 0x510e527f;
  hh[5] = 0x9b05688c;
  hh[6] = 0x1f83d9ab;
  hh[7] = 0x5be0cd19;

  hl[0] = 0xf3bcc908;
  hl[1] = 0x84caa73b;
  hl[2] = 0xfe94f82b;
  hl[3] = 0x5f1d36f1;
  hl[4] = 0xade682d1;
  hl[5] = 0x2b3e6c1f;
  hl[6] = 0xfb41bd6b;
  hl[7] = 0x137e2179;

  crypto_hashblocks_hl(hh, hl, m, n);
  n %= 128;

  for (i = 0; i < n; i++) x[i] = m[b-n+i];
  x[n] = 128;

  n = 256-128*(n<112?1:0);
  x[n-9] = 0;
  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
  crypto_hashblocks_hl(hh, hl, x, n);

  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

  return 0;
}

function add(p, q) {
  var a = gf(), b = gf(), c = gf(),
      d = gf(), e = gf(), f = gf(),
      g = gf(), h = gf(), t = gf();

  Z(a, p[1], p[0]);
  Z(t, q[1], q[0]);
  M(a, a, t);
  A(b, p[0], p[1]);
  A(t, q[0], q[1]);
  M(b, b, t);
  M(c, p[3], q[3]);
  M(c, c, D2);
  M(d, p[2], q[2]);
  A(d, d, d);
  Z(e, b, a);
  Z(f, d, c);
  A(g, d, c);
  A(h, b, a);

  M(p[0], e, f);
  M(p[1], h, g);
  M(p[2], g, f);
  M(p[3], e, h);
}

function cswap(p, q, b) {
  var i;
  for (i = 0; i < 4; i++) {
    sel25519(p[i], q[i], b);
  }
}

function pack(r, p) {
  var tx = gf(), ty = gf(), zi = gf();
  inv25519(zi, p[2]);
  M(tx, p[0], zi);
  M(ty, p[1], zi);
  pack25519(r, ty);
  r[31] ^= par25519(tx) << 7;
}

function scalarmult(p, q, s) {
  var b, i;
  set25519(p[0], gf0);
  set25519(p[1], gf1);
  set25519(p[2], gf1);
  set25519(p[3], gf0);
  for (i = 255; i >= 0; --i) {
    b = (s[(i/8)|0] >> (i&7)) & 1;
    cswap(p, q, b);
    add(q, p);
    add(p, p);
    cswap(p, q, b);
  }
}

function scalarbase(p, s) {
  var q = [gf(), gf(), gf(), gf()];
  set25519(q[0], X);
  set25519(q[1], Y);
  set25519(q[2], gf1);
  M(q[3], X, Y);
  scalarmult(p, q, s);
}

function crypto_sign_keypair(pk, sk, seeded) {
  var d = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()];
  var i;

  if (!seeded) randombytes(sk, 32);
  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  scalarbase(p, d);
  pack(pk, p);

  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
  return 0;
}

var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

function modL(r, x) {
  var carry, i, j, k;
  for (i = 63; i >= 32; --i) {
    carry = 0;
    for (j = i - 32, k = i - 12; j < k; ++j) {
      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
      carry = Math.floor((x[j] + 128) / 256);
      x[j] -= carry * 256;
    }
    x[j] += carry;
    x[i] = 0;
  }
  carry = 0;
  for (j = 0; j < 32; j++) {
    x[j] += carry - (x[31] >> 4) * L[j];
    carry = x[j] >> 8;
    x[j] &= 255;
  }
  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
  for (i = 0; i < 32; i++) {
    x[i+1] += x[i] >> 8;
    r[i] = x[i] & 255;
  }
}

function reduce(r) {
  var x = new Float64Array(64), i;
  for (i = 0; i < 64; i++) x[i] = r[i];
  for (i = 0; i < 64; i++) r[i] = 0;
  modL(r, x);
}

// Note: difference from C - smlen returned, not passed as argument.
function crypto_sign(sm, m, n, sk) {
  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
  var i, j, x = new Float64Array(64);
  var p = [gf(), gf(), gf(), gf()];

  crypto_hash(d, sk, 32);
  d[0] &= 248;
  d[31] &= 127;
  d[31] |= 64;

  var smlen = n + 64;
  for (i = 0; i < n; i++) sm[64 + i] = m[i];
  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

  crypto_hash(r, sm.subarray(32), n+32);
  reduce(r);
  scalarbase(p, r);
  pack(sm, p);

  for (i = 32; i < 64; i++) sm[i] = sk[i];
  crypto_hash(h, sm, n + 64);
  reduce(h);

  for (i = 0; i < 64; i++) x[i] = 0;
  for (i = 0; i < 32; i++) x[i] = r[i];
  for (i = 0; i < 32; i++) {
    for (j = 0; j < 32; j++) {
      x[i+j] += h[i] * d[j];
    }
  }

  modL(sm.subarray(32), x);
  return smlen;
}

function unpackneg(r, p) {
  var t = gf(), chk = gf(), num = gf(),
      den = gf(), den2 = gf(), den4 = gf(),
      den6 = gf();

  set25519(r[2], gf1);
  unpack25519(r[1], p);
  S(num, r[1]);
  M(den, num, D);
  Z(num, num, r[2]);
  A(den, r[2], den);

  S(den2, den);
  S(den4, den2);
  M(den6, den4, den2);
  M(t, den6, num);
  M(t, t, den);

  pow2523(t, t);
  M(t, t, num);
  M(t, t, den);
  M(t, t, den);
  M(r[0], t, den);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) M(r[0], r[0], I);

  S(chk, r[0]);
  M(chk, chk, den);
  if (neq25519(chk, num)) return -1;

  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

  M(r[3], r[0], r[1]);
  return 0;
}

function crypto_sign_open(m, sm, n, pk) {
  var i;
  var t = new Uint8Array(32), h = new Uint8Array(64);
  var p = [gf(), gf(), gf(), gf()],
      q = [gf(), gf(), gf(), gf()];

  if (n < 64) return -1;

  if (unpackneg(q, pk)) return -1;

  for (i = 0; i < n; i++) m[i] = sm[i];
  for (i = 0; i < 32; i++) m[i+32] = pk[i];
  crypto_hash(h, m, n);
  reduce(h);
  scalarmult(p, q, h);

  scalarbase(q, sm.subarray(32));
  add(p, q);
  pack(t, p);

  n -= 64;
  if (crypto_verify_32(sm, 0, t, 0)) {
    for (i = 0; i < n; i++) m[i] = 0;
    return -1;
  }

  for (i = 0; i < n; i++) m[i] = sm[i + 64];
  return n;
}

var crypto_secretbox_KEYBYTES = 32,
    crypto_secretbox_NONCEBYTES = 24,
    crypto_secretbox_ZEROBYTES = 32,
    crypto_secretbox_BOXZEROBYTES = 16,
    crypto_scalarmult_BYTES = 32,
    crypto_scalarmult_SCALARBYTES = 32,
    crypto_box_PUBLICKEYBYTES = 32,
    crypto_box_SECRETKEYBYTES = 32,
    crypto_box_BEFORENMBYTES = 32,
    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
    crypto_sign_BYTES = 64,
    crypto_sign_PUBLICKEYBYTES = 32,
    crypto_sign_SECRETKEYBYTES = 64,
    crypto_sign_SEEDBYTES = 32,
    crypto_hash_BYTES = 64;

nacl.lowlevel = {
  crypto_core_hsalsa20: crypto_core_hsalsa20,
  crypto_stream_xor: crypto_stream_xor,
  crypto_stream: crypto_stream,
  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
  crypto_stream_salsa20: crypto_stream_salsa20,
  crypto_onetimeauth: crypto_onetimeauth,
  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
  crypto_verify_16: crypto_verify_16,
  crypto_verify_32: crypto_verify_32,
  crypto_secretbox: crypto_secretbox,
  crypto_secretbox_open: crypto_secretbox_open,
  crypto_scalarmult: crypto_scalarmult,
  crypto_scalarmult_base: crypto_scalarmult_base,
  crypto_box_beforenm: crypto_box_beforenm,
  crypto_box_afternm: crypto_box_afternm,
  crypto_box: crypto_box,
  crypto_box_open: crypto_box_open,
  crypto_box_keypair: crypto_box_keypair,
  crypto_hash: crypto_hash,
  crypto_sign: crypto_sign,
  crypto_sign_keypair: crypto_sign_keypair,
  crypto_sign_open: crypto_sign_open,

  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
  crypto_sign_BYTES: crypto_sign_BYTES,
  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
  crypto_hash_BYTES: crypto_hash_BYTES,

  gf: gf,
  D: D,
  L: L,
  pack25519: pack25519,
  unpack25519: unpack25519,
  M: M,
  A: A,
  S: S,
  Z: Z,
  pow2523: pow2523,
  add: add,
  set25519: set25519,
  modL: modL,
  scalarmult: scalarmult,
  scalarbase: scalarbase,
};

/* High-level API */

function checkLengths(k, n) {
  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
}

function checkBoxLengths(pk, sk) {
  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
}

function checkArrayTypes() {
  for (var i = 0; i < arguments.length; i++) {
    if (!(arguments[i] instanceof Uint8Array))
      throw new TypeError('unexpected type, use Uint8Array');
  }
}

function cleanup(arr) {
  for (var i = 0; i < arr.length; i++) arr[i] = 0;
}

nacl.randomBytes = function(n) {
  var b = new Uint8Array(n);
  randombytes(b, n);
  return b;
};

nacl.secretbox = function(msg, nonce, key) {
  checkArrayTypes(msg, nonce, key);
  checkLengths(key, nonce);
  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
  var c = new Uint8Array(m.length);
  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
  crypto_secretbox(c, m, m.length, nonce, key);
  return c.subarray(crypto_secretbox_BOXZEROBYTES);
};

nacl.secretbox.open = function(box, nonce, key) {
  checkArrayTypes(box, nonce, key);
  checkLengths(key, nonce);
  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
  var m = new Uint8Array(c.length);
  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
  if (c.length < 32) return null;
  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
  return m.subarray(crypto_secretbox_ZEROBYTES);
};

nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

nacl.scalarMult = function(n, p) {
  checkArrayTypes(n, p);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult(q, n, p);
  return q;
};

nacl.scalarMult.base = function(n) {
  checkArrayTypes(n);
  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
  var q = new Uint8Array(crypto_scalarmult_BYTES);
  crypto_scalarmult_base(q, n);
  return q;
};

nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

nacl.box = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox(msg, nonce, k);
};

nacl.box.before = function(publicKey, secretKey) {
  checkArrayTypes(publicKey, secretKey);
  checkBoxLengths(publicKey, secretKey);
  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
  crypto_box_beforenm(k, publicKey, secretKey);
  return k;
};

nacl.box.after = nacl.secretbox;

nacl.box.open = function(msg, nonce, publicKey, secretKey) {
  var k = nacl.box.before(publicKey, secretKey);
  return nacl.secretbox.open(msg, nonce, k);
};

nacl.box.open.after = nacl.secretbox.open;

nacl.box.keyPair = function() {
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
  crypto_box_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.box.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
  crypto_scalarmult_base(pk, secretKey);
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
nacl.box.nonceLength = crypto_box_NONCEBYTES;
nacl.box.overheadLength = nacl.secretbox.overheadLength;

nacl.sign = function(msg, secretKey) {
  checkArrayTypes(msg, secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
  crypto_sign(signedMsg, msg, msg.length, secretKey);
  return signedMsg;
};

nacl.sign.open = function(signedMsg, publicKey) {
  checkArrayTypes(signedMsg, publicKey);
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var tmp = new Uint8Array(signedMsg.length);
  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
  if (mlen < 0) return null;
  var m = new Uint8Array(mlen);
  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
  return m;
};

nacl.sign.detached = function(msg, secretKey) {
  var signedMsg = nacl.sign(msg, secretKey);
  var sig = new Uint8Array(crypto_sign_BYTES);
  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
  return sig;
};

nacl.sign.detached.verify = function(msg, sig, publicKey) {
  checkArrayTypes(msg, sig, publicKey);
  if (sig.length !== crypto_sign_BYTES)
    throw new Error('bad signature size');
  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
    throw new Error('bad public key size');
  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
  var i;
  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
};

nacl.sign.keyPair = function() {
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  crypto_sign_keypair(pk, sk);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.keyPair.fromSecretKey = function(secretKey) {
  checkArrayTypes(secretKey);
  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
    throw new Error('bad secret key size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
};

nacl.sign.keyPair.fromSeed = function(seed) {
  checkArrayTypes(seed);
  if (seed.length !== crypto_sign_SEEDBYTES)
    throw new Error('bad seed size');
  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
  for (var i = 0; i < 32; i++) sk[i] = seed[i];
  crypto_sign_keypair(pk, sk, true);
  return {publicKey: pk, secretKey: sk};
};

nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
nacl.sign.seedLength = crypto_sign_SEEDBYTES;
nacl.sign.signatureLength = crypto_sign_BYTES;

nacl.hash = function(msg) {
  checkArrayTypes(msg);
  var h = new Uint8Array(crypto_hash_BYTES);
  crypto_hash(h, msg, msg.length);
  return h;
};

nacl.hash.hashLength = crypto_hash_BYTES;

nacl.verify = function(x, y) {
  checkArrayTypes(x, y);
  // Zero length arguments are considered not equal.
  if (x.length === 0 || y.length === 0) return false;
  if (x.length !== y.length) return false;
  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
};

nacl.setPRNG = function(fn) {
  randombytes = fn;
};

(function() {
  // Initialize PRNG if environment provides CSPRNG.
  // If not, methods calling randombytes will throw.
  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
  if (crypto && crypto.getRandomValues) {
    // Browsers.
    var QUOTA = 65536;
    nacl.setPRNG(function(x, n) {
      var i, v = new Uint8Array(n);
      for (i = 0; i < n; i += QUOTA) {
        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
      }
      for (i = 0; i < n; i++) x[i] = v[i];
      cleanup(v);
    });
  } else if (true) {
    // Node.js.
    crypto = __webpack_require__(417);
    if (crypto && crypto.randomBytes) {
      nacl.setPRNG(function(x, n) {
        var i, v = crypto.randomBytes(n);
        for (i = 0; i < n; i++) x[i] = v[i];
        cleanup(v);
      });
    }
  }
})();

})( true && module.exports ? module.exports : (self.nacl = self.nacl || {}));


/***/ }),

/***/ 205:
/***/ (function(module, __unusedexports, __webpack_require__) {

/*
 * Copyright 2016-2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = __webpack_require__(434)


/***/ }),

/***/ 239:
/***/ (function(module) {

module.exports = {"name":"ts-nats","version":"1.2.15","description":"Typescript Node.js client for NATS, a lightweight, high-performance cloud native messaging system","keywords":["nats","messaging","pubsub","publish","subscribe","queue","distributed","queueing"],"homepage":"https://nats.io","repository":{"type":"git","url":"git@github.com:nats-io/nats.ts.git"},"bugs":{"url":"https://github.com/nats-io/nats.ts/issues"},"license":"Apache-2.0","private":false,"author":{"name":"The NATS Authors"},"contributors":[],"main":"./index.js","types":"./","scripts":{"prepare":"npm run build","build":"npm run clean && tsc && npm run copy","clean":"rm -Rf lib/ || true && rm -Rf .nyc_output/ || true && rm -Rf coverage/ || true","copy":"cp -R ./lib/src ./dist && rm -Rf lib/ && mv dist lib","cover:html":"nyc report --reporter=html && open coverage/index.html","cover:coveralls":"nyc report --reporter=lcovonly && cat ./coverage/lcov.info | coveralls","pack":"npm run build && npm pack","debugtest":"tsc && cp package.json lib/package.json && node node_modules/.bin/ava --verbose -T 6500000 --match","test":"tsc && cp package.json lib/package.json && nyc ava --verbose -T 15000","doc":"node_modules/.bin/typedoc --options ./typedoc.json && touch ./docs/.nojekyll"},"engines":{"node":">= 8.17.0"},"dependencies":{"nuid":"^1.1.4","ts-nkeys":"^1.0.16"},"devDependencies":{"@types/node":"^13.13.4","acorn":"^7.1.1","ava":"^3.8.1","coveralls":"^3.1.0","nyc":"^15.0.1","typedoc":"^0.17.6","typescript":"^3.8.3"},"typings":"./lib/nats.d.ts","ava":{"failFast":false,"require":["./lib/test/helpers/ava_fix.js"],"files":["./lib/test/**/*.js","!./lib/test/helpers/**/*.js"]},"nyc":{"extension":[".ts",".js"],"include":["src/**/*.ts","lib/src/**/*.js"],"exclude":["lib/test/**","examples/**","benchmark/**"],"sourceMap":true,"all":true}};

/***/ }),

/***/ 255:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const util = __importStar(__webpack_require__(669));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["API_ERROR"] = "API_ERROR";
    ErrorCode["BAD_AUTHENTICATION"] = "BAD_AUTHENTICATION";
    ErrorCode["BAD_CREDS"] = "BAD_CREDENTIALS";
    ErrorCode["BAD_JSON"] = "BAD_JSON";
    ErrorCode["BAD_MSG"] = "BAD_MSG";
    ErrorCode["BAD_NKEY_SEED"] = "BAD_NKEY_CREDENTIALS";
    ErrorCode["BAD_REPLY"] = "BAD_REPLY";
    ErrorCode["BAD_SUBJECT"] = "BAD_SUBJECT";
    ErrorCode["CLIENT_CERT_REQ"] = "CLIENT_CERT_REQ";
    ErrorCode["CONN_CLOSED"] = "CONN_CLOSED";
    ErrorCode["CONN_DRAINING"] = "CONN_DRAINING";
    ErrorCode["CONN_ERR"] = "CONN_ERR";
    ErrorCode["CONN_TIMEOUT"] = "CONN_TIMEOUT";
    ErrorCode["INVALID_ENCODING"] = "INVALID_ENCODING";
    ErrorCode["NKEY_OR_JWT_REQ"] = "NKEY_OR_JWT_REQ";
    ErrorCode["NO_ECHO_NOT_SUPPORTED"] = "NO_ECHO_NOT_SUPPORTED";
    ErrorCode["NO_SEED_IN_CREDS"] = "NO_SEED_IN_CREDS";
    ErrorCode["NO_USER_JWT_IN_CREDS"] = "NO_USER_JWT_IN_CREDS";
    ErrorCode["NON_SECURE_CONN_REQ"] = "NON_SECURE_CONN_REQ";
    ErrorCode["NONCE_SIGNER_NOTFUNC"] = "NONCE_SIGNER_NOT_FUNC";
    ErrorCode["RECONNECT_DELAY_NOTFUNC"] = "RECONNECT_DELAY_NOT_FUNC";
    ErrorCode["REQ_TIMEOUT"] = "REQ_TIMEOUT";
    ErrorCode["SECURE_CONN_REQ"] = "SECURE_CONN_REQ";
    ErrorCode["SIGNATURE_REQUIRED"] = "SIG_REQ";
    ErrorCode["SSL_ERR"] = "SSL_ERR";
    ErrorCode["STALE_CONNECTION_ERR"] = "STALE CONNECTION";
    ErrorCode["SUB_CLOSED"] = "SUB_CLOSED";
    ErrorCode["SUB_DRAINING"] = "SUB_DRAINING";
    ErrorCode["SUB_TIMEOUT"] = "SUB_TIMEOUT";
    ErrorCode["UNABLE_TO_CONNECT"] = "UNABLE_TO_CONNECT";
    // emitted by the server
    ErrorCode["AUTHORIZATION_VIOLATION"] = "AUTHORIZATION_VIOLATION";
    ErrorCode["NATS_PROTOCOL_ERR"] = "NATS_PROTOCOL_ERR";
    ErrorCode["PERMISSIONS_VIOLATION"] = "PERMISSIONS_VIOLATION";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
// Error templates
/** @internal **/
exports.REQ_TIMEOUT_MSG_PREFIX = 'The request timed out for subscription id: ';
/** @internal **/
exports.INVALID_ENCODING_MSG_PREFIX = 'Invalid Encoding:';
/** @internal **/
exports.CONN_ERR_PREFIX = 'Could not connect to server: ';
/** @internal **/
class Messages {
    constructor() {
        this.messages = {};
        this.messages[ErrorCode.BAD_AUTHENTICATION] = 'User and Token can not both be provided';
        this.messages[ErrorCode.BAD_CREDS] = 'Bad user credentials';
        this.messages[ErrorCode.BAD_JSON] = 'Message should be a non-circular JSON-serializable value';
        this.messages[ErrorCode.BAD_MSG] = 'Message cannot be a function';
        this.messages[ErrorCode.BAD_NKEY_SEED] = 'Bad nkey credentials';
        this.messages[ErrorCode.BAD_REPLY] = 'Reply cannot be a function';
        this.messages[ErrorCode.BAD_SUBJECT] = 'Subject must be supplied';
        this.messages[ErrorCode.CLIENT_CERT_REQ] = 'Server requires a client certificate.';
        this.messages[ErrorCode.CONN_CLOSED] = 'Connection closed';
        this.messages[ErrorCode.CONN_DRAINING] = 'Connection draining';
        this.messages[ErrorCode.CONN_TIMEOUT] = 'Connection timeout';
        this.messages[ErrorCode.NKEY_OR_JWT_REQ] = 'An Nkey or User JWT callback is required.';
        this.messages[ErrorCode.NONCE_SIGNER_NOTFUNC] = 'nonce signer is not a function';
        this.messages[ErrorCode.NON_SECURE_CONN_REQ] = 'Server does not support a secure connection.';
        this.messages[ErrorCode.NON_SECURE_CONN_REQ] = 'Server does not support a secure connection.';
        this.messages[ErrorCode.NO_ECHO_NOT_SUPPORTED] = 'No echo option is not supported by this server';
        this.messages[ErrorCode.NO_SEED_IN_CREDS] = 'Cannot locate signing key in credentials';
        this.messages[ErrorCode.NO_USER_JWT_IN_CREDS] = 'Cannot locate user jwt in credentials.';
        this.messages[ErrorCode.NON_SECURE_CONN_REQ] = 'Server does not support a secure connection.';
        this.messages[ErrorCode.NONCE_SIGNER_NOTFUNC] = 'nonce signer is not a function';
        this.messages[ErrorCode.REQ_TIMEOUT] = 'Request timed out.';
        this.messages[ErrorCode.RECONNECT_DELAY_NOTFUNC] = "reconnectDelayHandler is not a function";
        this.messages[ErrorCode.SECURE_CONN_REQ] = 'Server requires a secure connection.';
        this.messages[ErrorCode.SIGNATURE_REQUIRED] = 'Server requires an nkey signature.';
        this.messages[ErrorCode.SSL_ERR] = 'TLS credentials verification failed';
        this.messages[ErrorCode.SUB_CLOSED] = 'Subscription closed';
        this.messages[ErrorCode.SUB_DRAINING] = 'Subscription draining';
        this.messages[ErrorCode.SUB_TIMEOUT] = 'Subscription timed out.';
        this.messages[ErrorCode.UNABLE_TO_CONNECT] = 'Unable to connect.';
    }
    static getMessage(s) {
        return Messages.messages.getMessage(s);
    }
    getMessage(s) {
        let v = this.messages[s];
        if (!v) {
            v = s;
        }
        return v;
    }
}
exports.Messages = Messages;
Messages.messages = new Messages();
class NatsError {
    /**
     * @param {String} message
     * @param {String} code
     * @param {Error} [chainedError]
     * @constructor
     *
     * @api private
     * @internal
     */
    constructor(message, code, chainedError) {
        Error.captureStackTrace(this, this.constructor);
        this.name = 'NatsError';
        this.message = message;
        this.code = code;
        this.chainedError = chainedError;
        util.inherits(NatsError, Error);
    }
    /**
     * @param code
     * @param chainedError
     * @api private
     * @internal
     */
    static errorForCode(code, chainedError) {
        let m = Messages.getMessage(code);
        return new NatsError(m, code, chainedError);
    }
}
exports.NatsError = NatsError;
//# sourceMappingURL=error.js.map

/***/ }),

/***/ 256:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ed25519 = __webpack_require__(196);
var codec_1 = __webpack_require__(829);
var nkeys_1 = __webpack_require__(509);
var KP = /** @class */ (function () {
    function KP(seed) {
        this.seed = seed;
    }
    KP.prototype.getRawSeed = function () {
        var sd = codec_1.Codec.decodeSeed(this.seed);
        return sd.buf;
    };
    KP.prototype.getSeed = function () {
        return this.seed;
    };
    KP.prototype.getPublicKey = function () {
        var sd = codec_1.Codec.decodeSeed(this.seed);
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        return codec_1.Codec.encode(sd.prefix, Buffer.from(kp.publicKey));
    };
    ;
    KP.prototype.getPrivateKey = function () {
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        return codec_1.Codec.encode(nkeys_1.Prefix.Private, Buffer.from(kp.secretKey));
    };
    KP.prototype.sign = function (input) {
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        var a = ed25519.sign.detached(input, kp.secretKey);
        return Buffer.from(a.buffer);
    };
    KP.prototype.verify = function (input, sig) {
        var kp = ed25519.sign.keyPair.fromSeed(this.getRawSeed());
        return ed25519.sign.detached.verify(input, sig, kp.publicKey);
    };
    return KP;
}());
exports.KP = KP;
//# sourceMappingURL=kp.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __unusedexports, __webpack_require__) {

/*
 * Copyright 2013-2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = __webpack_require__(670);


/***/ }),

/***/ 417:
/***/ (function(module) {

module.exports = require("crypto");

/***/ }),

/***/ 422:
/***/ (function(module) {

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __createBinding;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if ( true && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __createBinding = function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});


/***/ }),

/***/ 429:
/***/ (function(__unusedmodule, exports) {

"use strict";

/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// An implementation of crc16 according to CCITT standards for XMODEM.
var crc16tab = new Uint16Array([
    0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7,
    0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef,
    0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
    0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de,
    0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485,
    0xa56a, 0xb54b, 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
    0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4,
    0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc,
    0x48c4, 0x58e5, 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
    0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b,
    0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12,
    0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
    0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41,
    0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b, 0x8d68, 0x9d49,
    0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
    0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78,
    0x9188, 0x81a9, 0xb1ca, 0xa1eb, 0xd10c, 0xc12d, 0xf14e, 0xe16f,
    0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
    0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e,
    0x02b1, 0x1290, 0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256,
    0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
    0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
    0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c,
    0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
    0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9, 0xb98a, 0xa9ab,
    0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3,
    0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
    0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0, 0x2ab3, 0x3a92,
    0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9,
    0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
    0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8,
    0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
]);
var crc16 = /** @class */ (function () {
    function crc16() {
    }
    // crc16 returns the crc for the data provided.
    crc16.checksum = function (data) {
        var crc = 0;
        for (var i = 0; i < data.byteLength; i++) {
            var b = data[i];
            crc = ((crc << 8) & 0xffff) ^ crc16tab[((crc >> 8) ^ (b)) & 0x00FF];
        }
        return crc;
    };
    // validate will check the calculated crc16 checksum for data against the expected.
    crc16.validate = function (data, expected) {
        var ba = crc16.checksum(data);
        return ba == expected;
    };
    return crc16;
}());
exports.crc16 = crc16;
//# sourceMappingURL=crc16.js.map

/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 434:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";
/*
 * Copyright 2016-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * Module Dependencies
 */

const crypto = __webpack_require__(417)

/**
 * Constants
 */
const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const base = 36
const preLen = 12
const seqLen = 10
const maxSeq = 3656158440062976 // base^seqLen == 36^10
const minInc = 33
const maxInc = 333
const totalLen = preLen + seqLen

exports.version = __webpack_require__(759).version

/**
 * Create and initialize a nuid.
 *
 * @api private
 */

function Nuid () {
  this.buf = Buffer.alloc(totalLen)
  this.init()
}

/**
 * Initializes a nuid with a crypto random prefix,
 * and pseudo-random sequence and increment.
 *
 * @api private
 */

Nuid.prototype.init = function () {
  this.setPre()
  this.initSeqAndInc()
  this.fillSeq()
}

/**
 * Initializes the pseudo randmon sequence number and the increment range.
 *
 * @api private
 */

Nuid.prototype.initSeqAndInc = function () {
  this.seq = Math.floor(Math.random() * maxSeq)
  this.inc = Math.floor((Math.random() * (maxInc - minInc)) + minInc)
}

/**
 * Sets the prefix from crypto random bytes. Converts to base36.
 *
 * @api private
 */

Nuid.prototype.setPre = function () {
  const cbuf = crypto.randomBytes(preLen)
  for (let i = 0; i < preLen; i++) {
    const di = cbuf[i] % base
    this.buf[i] = digits.charCodeAt(di)
  }
}

/**
 * Fills the sequence part of the nuid as base36 from this.seq.
 *
 * @api private
 */

Nuid.prototype.fillSeq = function () {
  let n = this.seq
  for (let i = totalLen - 1; i >= preLen; i--) {
    this.buf[i] = digits.charCodeAt(n % base)
    n = Math.floor(n / base)
  }
}

/**
 * Returns the next nuid.
 *
 * @api private
 */

Nuid.prototype.next = function () {
  this.seq += this.inc
  if (this.seq > maxSeq) {
    this.setPre()
    this.initSeqAndInc()
  }
  this.fillSeq()
  return (this.buf.toString('ascii'))
}

/* Global Nuid */
const g = new Nuid()

/**
 * Resets the prefix of the global nuid, as well as the
 * pseudo random sequence number and increment amounts.
 *
 * @api public
 */

exports.reset = function () {
  g.init()
}

/**
 * Returns the next nuid from the global.
 *
 * @api public
 */

exports.next = function () {
  return g.next()
}

/**
 * This here to facilitate testing
 * @api private
 */
exports.getGlobalNuid = function () {
  return g
}


/***/ }),

/***/ 461:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2019 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __webpack_require__(255);
const nats_1 = __webpack_require__(670);
const const_1 = __webpack_require__(563);
/**
 * @hidden
 */
class MsgBuffer {
    constructor(chunks, payload, encoding) {
        this.buffers = [];
        this.msg = {};
        this.encoding = encoding;
        this.msg.subject = chunks[1];
        this.msg.sid = parseInt(chunks[2], 10);
        this.msg.reply = chunks[4];
        this.msg.size = parseInt(chunks[5], 10);
        this.length = this.msg.size + const_1.CR_LF_LEN;
        this.payload = payload;
    }
    fill(data) {
        this.buffers.push(data);
        this.length -= data.byteLength;
        if (this.length === 0) {
            let buf = this.pack();
            buf = buf.slice(0, buf.byteLength - 2);
            switch (this.payload) {
                case nats_1.Payload.JSON:
                    this.msg.data = buf.toString();
                    try {
                        this.msg.data = JSON.parse(this.msg.data);
                    }
                    catch (ex) {
                        this.error = error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_JSON, ex);
                    }
                    break;
                case nats_1.Payload.STRING:
                    this.msg.data = buf.toString(this.encoding);
                    break;
                case nats_1.Payload.BINARY:
                    this.msg.data = buf;
                    break;
            }
            this.buffers = [];
        }
    }
    pack() {
        if (this.buffers.length === 1) {
            return this.buffers[0];
        }
        else {
            return Buffer.concat(this.buffers);
        }
    }
}
exports.MsgBuffer = MsgBuffer;
//# sourceMappingURL=messagebuffer.js.map

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 509:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ed25519 = __webpack_require__(196);
var kp_1 = __webpack_require__(256);
var public_1 = __webpack_require__(998);
var codec_1 = __webpack_require__(829);
exports.VERSION = "1.0.16";
function createPair(prefix) {
    var rawSeed = ed25519.randomBytes(32).buffer;
    var str = codec_1.Codec.encodeSeed(prefix, Buffer.from(rawSeed));
    return new kp_1.KP(str);
}
exports.createPair = createPair;
function createAccount() {
    return createPair(Prefix.Account);
}
exports.createAccount = createAccount;
function createUser() {
    return createPair(Prefix.User);
}
exports.createUser = createUser;
function createOperator() {
    return createPair(Prefix.Operator);
}
exports.createOperator = createOperator;
function createCluster() {
    return createPair(Prefix.Cluster);
}
exports.createCluster = createCluster;
function createServer() {
    return createPair(Prefix.Server);
}
exports.createServer = createServer;
function fromPublic(src) {
    var raw = codec_1.Codec._decode(src);
    var prefix = Prefixes.parsePrefix(raw.readUInt8(0));
    if (Prefixes.isValidPublicPrefix(prefix)) {
        return new public_1.PublicKey(src);
    }
    throw new NKeysError(NKeysErrorCode.InvalidPublicKey);
}
exports.fromPublic = fromPublic;
function fromSeed(src) {
    codec_1.Codec.decodeSeed(src);
    // if we are here it decoded
    return new kp_1.KP(src);
}
exports.fromSeed = fromSeed;
var Prefix;
(function (Prefix) {
    //Seed is the version byte used for encoded NATS Seeds
    Prefix[Prefix["Seed"] = 144] = "Seed";
    //PrefixBytePrivate is the version byte used for encoded NATS Private keys
    Prefix[Prefix["Private"] = 120] = "Private";
    //PrefixByteOperator is the version byte used for encoded NATS Operators
    Prefix[Prefix["Operator"] = 112] = "Operator";
    //PrefixByteServer is the version byte used for encoded NATS Servers
    Prefix[Prefix["Server"] = 104] = "Server";
    //PrefixByteCluster is the version byte used for encoded NATS Clusters
    Prefix[Prefix["Cluster"] = 16] = "Cluster";
    //PrefixByteAccount is the version byte used for encoded NATS Accounts
    Prefix[Prefix["Account"] = 0] = "Account";
    //PrefixByteUser is the version byte used for encoded NATS Users
    Prefix[Prefix["User"] = 160] = "User";
})(Prefix = exports.Prefix || (exports.Prefix = {}));
/**
 * Internal utility for testing prefixes
 */
var Prefixes = /** @class */ (function () {
    function Prefixes() {
    }
    Prefixes.isValidPublicPrefix = function (prefix) {
        return prefix == Prefix.Server
            || prefix == Prefix.Operator
            || prefix == Prefix.Cluster
            || prefix == Prefix.Account
            || prefix == Prefix.User;
    };
    Prefixes.startsWithValidPrefix = function (s) {
        var c = s[0];
        return c == 'S' || c == 'P' || c == 'O' || c == 'N' || c == 'C' || c == 'A' || c == 'U';
    };
    Prefixes.isValidPrefix = function (prefix) {
        var v = this.parsePrefix(prefix);
        return v != -1;
    };
    Prefixes.parsePrefix = function (v) {
        switch (v) {
            case Prefix.Seed:
                return Prefix.Seed;
            case Prefix.Private:
                return Prefix.Private;
            case Prefix.Operator:
                return Prefix.Operator;
            case Prefix.Server:
                return Prefix.Server;
            case Prefix.Cluster:
                return Prefix.Cluster;
            case Prefix.Account:
                return Prefix.Account;
            case Prefix.User:
                return Prefix.User;
            default:
                return -1;
        }
    };
    return Prefixes;
}());
exports.Prefixes = Prefixes;
var NKeysErrorCode;
(function (NKeysErrorCode) {
    NKeysErrorCode["InvalidPrefixByte"] = "nkeys: invalid prefix byte";
    NKeysErrorCode["InvalidKey"] = "nkeys: invalid key";
    NKeysErrorCode["InvalidPublicKey"] = "nkeys: invalid public key";
    NKeysErrorCode["InvalidSeedLen"] = "nkeys: invalid seed length";
    NKeysErrorCode["InvalidSeed"] = "nkeys: invalid seed";
    NKeysErrorCode["InvalidEncoding"] = "nkeys: invalid encoded key";
    NKeysErrorCode["InvalidSignature"] = "nkeys: signature verification failed";
    NKeysErrorCode["CannotSign"] = "nkeys: can not sign, no private key available";
    NKeysErrorCode["PublicKeyOnly"] = "nkeys: no seed or private key available";
    NKeysErrorCode["InvalidChecksum"] = "nkeys: invalid checksum";
    NKeysErrorCode["SerializationError"] = "nkeys: serialization error";
    NKeysErrorCode["ApiError"] = "nkeys: api error";
})(NKeysErrorCode = exports.NKeysErrorCode || (exports.NKeysErrorCode = {}));
var NKeysError = /** @class */ (function (_super) {
    __extends(NKeysError, _super);
    /**
     * @param {NKeysErrorCode} code
     * @param {Error} [chainedError]
     * @constructor
     *
     * @api private
     */
    function NKeysError(code, chainedError) {
        var _this = _super.call(this, code) || this;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = "NKeysError";
        _this.code = code;
        _this.chainedError = chainedError;
        return _this;
    }
    return NKeysError;
}(Error));
exports.NKeysError = NKeysError;
//# sourceMappingURL=nkeys.js.map

/***/ }),

/***/ 526:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(422);
const core_1 = __webpack_require__(470);
const ts_nats_1 = __webpack_require__(341);
const parseServers = () => core_1.getInput("servers")
    .split(" ")
    .filter(v => !!v);
const servers = parseServers();
const testServer = (server) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    core_1.info(`testing server ${server}`);
    ts_nats_1.connect(server)
        .then(nc => nc.close())
        .catch(e => {
        core_1.setFailed(`server ${server} failed due to ${JSON.stringify(e)}`);
    });
});
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let con = [];
    for (let server of servers)
        con.push(testServer(server));
    yield Promise.all(con).catch(e => core_1.setFailed(JSON.stringify(e.message || e)));
    if (core_1.getInput("cluster") === "true") {
        core_1.info("testing cluster");
        const p = [];
        yield Promise.all(p).catch(e => core_1.setFailed(JSON.stringify(e.message || e)));
    }
}))();
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 563:
/***/ (function(__unusedmodule, exports) {

"use strict";

/*
 * Copyright 2018-2019 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Connection defaults
exports.DEFAULT_PORT = 4222;
exports.DEFAULT_PRE = 'nats://localhost:';
exports.DEFAULT_URI = exports.DEFAULT_PRE + exports.DEFAULT_PORT;
// Reconnect Parameters, 2 sec wait, 10 tries
exports.DEFAULT_RECONNECT_TIME_WAIT = 2 * 1000;
exports.DEFAULT_MAX_RECONNECT_ATTEMPTS = 10;
exports.DEFAULT_JITTER = 100;
exports.DEFAULT_JITTER_TLS = 1000;
// Ping interval
exports.DEFAULT_PING_INTERVAL = 2 * 60 * 1000; // 2 minutes
exports.DEFAULT_MAX_PING_OUT = 2;
// Line handling
exports.CR_LF = '\r\n';
exports.CR_LF_LEN = exports.CR_LF.length;
exports.EMPTY = '';
//# sourceMappingURL=const.js.map

/***/ }),

/***/ 570:
/***/ (function(__unusedmodule, exports) {

"use strict";

/*
 * Copyright 2018-2019 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const EMPTY_BUF = Buffer.allocUnsafe(0);
const CR = 13;
const LF = 10;
var ParserState;
(function (ParserState) {
    ParserState[ParserState["START"] = 0] = "START";
    ParserState[ParserState["CR"] = 1] = "CR";
})(ParserState || (ParserState = {}));
/**
 * @hidden
 */
class DataBuffer {
    constructor() {
        this.buffers = [];
        this.byteLength = 0;
    }
    pack() {
        if (this.buffers.length > 1) {
            let v = Buffer.concat(this.buffers, this.byteLength);
            this.buffers = [v];
        }
    }
    drain(n) {
        if (n === undefined) {
            n = this.byteLength;
        }
        if (this.byteLength >= n) {
            this.pack();
            let v = this.buffers.pop();
            if (v) {
                let d = v.slice(0, n);
                if (this.byteLength > n) {
                    this.buffers.push(v.slice(n));
                }
                this.byteLength -= n;
                return d;
            }
        }
        return EMPTY_BUF;
    }
    fill(data) {
        if (data) {
            this.buffers.push(data);
            this.byteLength += data.byteLength;
        }
    }
    protoLen() {
        let ps = ParserState.START;
        let offset = 0;
        for (let j = 0; j < this.buffers.length; j++) {
            let cb = this.buffers[j];
            for (let i = 0; i < cb.byteLength; i++) {
                let v = cb.readUInt8(i);
                switch (ps) {
                    case ParserState.START:
                        switch (v) {
                            case CR:
                                ps = ParserState.CR;
                                break;
                            default:
                        }
                        break;
                    case ParserState.CR:
                        switch (v) {
                            case LF:
                                // we want a length not an index
                                return offset + i + 1;
                            default:
                                ps = ParserState.START;
                        }
                        break;
                }
            }
            offset += cb.byteLength;
        }
        return -1;
    }
    peek() {
        if (this.buffers.length) {
            this.pack();
            return this.buffers[0];
        }
        return EMPTY_BUF;
    }
    size() {
        return this.byteLength;
    }
    length() {
        return this.buffers.length;
    }
    reset() {
        let a = this.buffers;
        this.buffers = [];
        this.byteLength = 0;
        return a;
    }
}
exports.DataBuffer = DataBuffer;
//# sourceMappingURL=databuffer.js.map

/***/ }),

/***/ 577:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2019 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(617);
/**
 * @hidden
 */
class MuxSubscriptions {
    constructor() {
        this.reqs = {};
        this.length = 0;
    }
    init() {
        this.baseInbox = `${util_1.createInbox()}.`;
        return this.baseInbox;
    }
    add(r) {
        if (!isNaN(r.received)) {
            r.received = 0;
        }
        this.length++;
        this.reqs[r.token] = r;
    }
    get(token) {
        if (token in this.reqs) {
            return this.reqs[token];
        }
        return null;
    }
    all() {
        let buf = [];
        for (let token in this.reqs) {
            let req = this.reqs[token];
            buf.push(req);
        }
        return buf;
    }
    cancel(r) {
        if (r && r.timeout) {
            clearTimeout(r.timeout);
            delete r.timeout;
        }
        if (r.token in this.reqs) {
            delete this.reqs[r.token];
            this.length--;
        }
    }
    close() {
        let reqs = this.all();
        for (let i = 0; i < reqs.length; i++) {
            this.cancel(reqs[i]);
        }
    }
    getToken(m) {
        let s = '';
        if (m) {
            s = m.subject || '';
        }
        if (s.indexOf(this.baseInbox) === 0) {
            return s.substring(this.baseInbox.length);
        }
        return null;
    }
    dispatcher() {
        let mux = this;
        return (error, m) => {
            let token = mux.getToken(m);
            if (token) {
                let r = mux.get(token);
                if (r) {
                    r.received++;
                    r.callback(error, m);
                    if (r.max && r.received >= r.max) {
                        mux.cancel(r);
                    }
                }
            }
        };
    }
    ;
}
exports.MuxSubscriptions = MuxSubscriptions;
//# sourceMappingURL=muxsubscriptions.js.map

/***/ }),

/***/ 614:
/***/ (function(module) {

module.exports = require("events");

/***/ }),

/***/ 617:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nuid = __webpack_require__(205);
/**
 * Create a properly formatted inbox subject.
 */
function createInbox() {
    return `_INBOX.${nuid.next()}`;
}
exports.createInbox = createInbox;
/**
 * @hidden
 */
function extend(a, ...b) {
    for (let i = 0; i < b.length; i++) {
        let o = b[i];
        Object.keys(o).forEach(function (k) {
            a[k] = o[k];
        });
    }
    return a;
}
exports.extend = extend;
function delay(millis) {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    });
}
exports.delay = delay;
/**
 * @hidden
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
exports.shuffle = shuffle;
function settle(a) {
    if (Array.isArray(a)) {
        return Promise.resolve(a).then(_settle);
    }
    else {
        return Promise.reject(new TypeError('argument requires an array of promises'));
    }
}
exports.settle = settle;
function _settle(a) {
    return Promise.all(a.map((p) => {
        return Promise.resolve(p).then(_resolve, _resolve);
    }));
}
function _resolve(r) {
    return r;
}
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 631:
/***/ (function(module) {

module.exports = require("net");

/***/ }),

/***/ 669:
/***/ (function(module) {

module.exports = require("util");

/***/ }),

/***/ 670:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events = __importStar(__webpack_require__(614));
const error_1 = __webpack_require__(255);
exports.ErrorCode = error_1.ErrorCode;
exports.NatsError = error_1.NatsError;
const util_1 = __webpack_require__(617);
const protocolhandler_1 = __webpack_require__(697);
const const_1 = __webpack_require__(563);
const nuid_1 = __webpack_require__(205);
/** Version of the ts-nats library */
exports.VERSION = __webpack_require__(239).version;
/**
 * @internal
 */
function defaultSub() {
    return { sid: 0, subject: '', received: 0 };
}
exports.defaultSub = defaultSub;
/**
 * Payload specifies the type of [[Msg.data]] that will be sent and received by the client.
 * The payload affects all client subscribers and publishers. If using mixed types, either
 * create multiple connections, or select [[Payload.BINARY]] and perform your own decoding.
 */
var Payload;
(function (Payload) {
    /** Specifies a string payload. This is default [[NatsConnectionOptions.payload]] setting */
    Payload["STRING"] = "string";
    /** Specifies payloads are JSON. */
    Payload["JSON"] = "json";
    /** Specifies payloads are binary (Buffer) */
    Payload["BINARY"] = "binary";
})(Payload = exports.Payload || (exports.Payload = {}));
/** @internal */
function defaultReq() {
    return { token: '', subject: '', received: 0, max: 1 };
}
/**
 * NATS server Client object.
 */
class Client extends events.EventEmitter {
    /** @internal */
    constructor() {
        super();
        /** Returns an unique and properly formatted inbox subject that can be used for replies */
        this.createInbox = util_1.createInbox;
        events.EventEmitter.call(this);
        // this.addDebugHandlers()
    }
    // private addDebugHandlers() {
    //     let events = [
    //         'close',
    //         'connect',
    //         'connecting',
    //         'disconnect',
    //         'error',
    //         'permissionError',
    //         'pingcount',
    //         'pingtimer',
    //         'reconnect',
    //         'reconnecting',
    //         'serversChanged',
    //         'subscribe',
    //         'unsubscribe',
    //         'yield',
    //     ];
    //
    //     function handler(name: string) {
    //         return function(arg: any) {
    //             console.log('debughdlr', name, [arg]);
    //         }
    //     }
    //
    //     events.forEach((e) => {
    //         this.on(e, handler(e));
    //     });
    // }
    /** @internal */
    static connect(opts) {
        return new Promise((resolve, reject) => {
            let options = Client.parseOptions(opts);
            let client = new Client();
            protocolhandler_1.ProtocolHandler.connect(client, options)
                .then((ph) => {
                client.protocolHandler = ph;
                resolve(client);
            }).catch((ex) => {
                reject(ex);
            });
        });
    }
    /**
     * @internal
     */
    static defaultOptions() {
        return {
            encoding: 'utf8',
            maxPingOut: const_1.DEFAULT_MAX_PING_OUT,
            maxReconnectAttempts: const_1.DEFAULT_MAX_RECONNECT_ATTEMPTS,
            noRandomize: false,
            pedantic: false,
            pingInterval: const_1.DEFAULT_PING_INTERVAL,
            reconnect: true,
            reconnectJitter: const_1.DEFAULT_JITTER,
            reconnectJitterTLS: const_1.DEFAULT_JITTER_TLS,
            reconnectTimeWait: const_1.DEFAULT_RECONNECT_TIME_WAIT,
            tls: undefined,
            verbose: false,
            waitOnFirstConnect: false
        };
    }
    /**
     * @internal
     */
    static parseOptions(args) {
        if (args === undefined || args === null) {
            args = { url: const_1.DEFAULT_URI };
        }
        if (typeof args === 'number') {
            args = { url: const_1.DEFAULT_PRE + args };
        }
        else if (typeof args === 'string') {
            args = { url: args.toString() };
        }
        else if (typeof args === 'object') {
            if (args.port !== undefined) {
                args.url = const_1.DEFAULT_PRE + args.port;
            }
        }
        // override defaults with provided options.
        // non-standard aliases are not handled
        // FIXME: may need to add uri and pass
        // uri, password, urls, NoRandomize, dontRandomize, secure, client
        let options = util_1.extend(Client.defaultOptions(), args);
        // Authentication - make sure authentication is valid.
        if (options.user && options.token) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_AUTHENTICATION);
        }
        // if specified nonceSigner must be a function
        if (options.nonceSigner && typeof options.nonceSigner !== 'function') {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.NONCE_SIGNER_NOTFUNC);
        }
        // Encoding - make sure its valid.
        let bufEncoding = options.encoding;
        if (!Buffer.isEncoding(bufEncoding)) {
            throw new error_1.NatsError(error_1.INVALID_ENCODING_MSG_PREFIX + options.encoding, error_1.ErrorCode.INVALID_ENCODING);
        }
        if (options.reconnectDelayHandler && typeof options.reconnectDelayHandler !== 'function') {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.RECONNECT_DELAY_NOTFUNC);
        }
        else {
            options.reconnectDelayHandler = () => {
                let extra = options.tls ? options.reconnectJitterTLS : options.reconnectJitter;
                if (extra) {
                    extra++;
                    extra = Math.floor(Math.random() * extra);
                }
                return options.reconnectTimeWait + extra;
            };
        }
        return options;
    }
    /**
     * Flush outbound queue to server and call optional callback when server has processed all data.
     * @param cb is optional, if not provided a Promise is returned. Flush is completed when promise resolves.
     * @return Promise<void> or void if a callback was provided.
     */
    flush(cb) {
        if (cb === undefined) {
            return new Promise((resolve, reject) => {
                this.protocolHandler.flush((err) => {
                    if (!err) {
                        resolve();
                    }
                    else {
                        reject(err);
                    }
                });
            });
        }
        else {
            this.protocolHandler.flush(cb);
        }
    }
    /**
     * Publish a message to the given subject, with optional payload and reply subject.
     * @param subject
     * @param data optional (can be a string, JSON object, or Buffer. Must match [[NatsConnectionOptions.payload].)
     * @param reply optional
     */
    publish(subject, data = undefined, reply = '') {
        if (!subject) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_SUBJECT);
        }
        this.protocolHandler.publish(subject, data, reply);
    }
    /**
     * Subscribe to a given subject. Messages are passed to the provided callback.
     * @param subject
     * @param cb
     * @param opts   Optional subscription options
     * @return Promise<Subscription>
     */
    subscribe(subject, cb, opts = {}) {
        return new Promise((resolve, reject) => {
            if (!subject) {
                reject(error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_SUBJECT));
            }
            if (!cb) {
                reject(new error_1.NatsError('subscribe requires a callback', error_1.ErrorCode.API_ERROR));
            }
            let s = defaultSub();
            util_1.extend(s, opts);
            s.subject = subject;
            s.callback = cb;
            resolve(this.protocolHandler.subscribe(s));
        });
    }
    /**
     * Drains all subscriptions. Returns a Promise that when resolved, indicates that all subscriptions have finished,
     * and the client closed. Note that after calling drain, it is impossible to create new
     * subscriptions or make any requests. As soon as all messages for the draining subscriptions are processed,
     * it is also impossible to publish new messages.
     * A drained connection is closed when the Promise resolves.
     * @see [[Subscription.drain]]
     */
    drain() {
        return this.protocolHandler.drain();
    }
    /**
     * Publish a request message with an implicit inbox listener as the reply. Message is optional.
     * This should be treated as a subscription. The subscription is auto-cancelled after the
     * first reply is received or the timeout in millisecond is reached.
     *
     * If a timeout is reached, the promise is rejected. Returns the received message if resolved.
     *
     * @param subject
     * @param timeout
     * @param data optional (can be a string, JSON object, or Buffer. Must match specified Payload option)
     * @return Promise<Msg>
     */
    request(subject, timeout = 1000, data = undefined) {
        return new Promise((resolve, reject) => {
            if (this.isClosed()) {
                reject(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED));
            }
            if (!subject) {
                reject(error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_SUBJECT));
            }
            let r = defaultReq();
            let opts = { max: 1 };
            util_1.extend(r, opts);
            r.token = nuid_1.next();
            let request = this.protocolHandler.request(r);
            r.timeout = setTimeout(() => {
                request.cancel();
                reject(error_1.NatsError.errorForCode(error_1.ErrorCode.REQ_TIMEOUT));
            }, timeout);
            r.callback = (error, msg) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(msg);
                }
            };
            try {
                this.publish(subject, data, `${this.protocolHandler.muxSubscriptions.baseInbox}${r.token}`);
            }
            catch (err) {
                reject(err);
                request.cancel();
            }
        });
    }
    ;
    /**
     * Closes the connection to the NATS server. A closed client cannot be reconnected.
     */
    close() {
        this.protocolHandler.close();
    }
    /**
     * @return true if the NATS client is closed.
     */
    isClosed() {
        return this.protocolHandler.isClosed();
    }
    /**
     * Report number of subscriptions on this connection.
     *
     * @return {Number}
     */
    numSubscriptions() {
        return this.protocolHandler.numSubscriptions();
    }
}
exports.Client = Client;
/**
 * Creates a NATS [[Client]] by connecting to the specified server, port or using the specified [[NatsConnectionOptions]].
 * @param opts
 * @return Promise<Client>
 */
function connect(opts) {
    return Client.connect(opts);
}
exports.connect = connect;
/**
 * Type returned when a subscribe call resolved. Provides methods to manage the subscription.
 */
class Subscription {
    /**
     * @hidden
     */
    constructor(sub, protocol) {
        this.sid = sub.sid;
        this.protocol = protocol;
    }
    /**
     * @hidden
     */
    static cancelTimeout(s) {
        if (s && s.timeout) {
            clearTimeout(s.timeout);
            delete s.timeout;
        }
    }
    /**
     * Cancels the subscription after the specified number of messages has been received.
     * If max is not specified, the subscription cancels immediately. A cancelled subscription
     * will not process messages that are inbound but not yet handled.
     * @param max
     * @see [[drain]]
     */
    unsubscribe(max) {
        this.protocol.unsubscribe(this.sid, max);
    }
    /**
     * Draining a subscription is similar to unsubscribe but inbound pending messages are
     * not discarded. When the last in-flight message is processed, the subscription handler
     * is removed.
     * @return a Promise that resolves when the draining a subscription completes
     * @see [[unsubscribe]]
     */
    drain() {
        return this.protocol.drainSubscription(this.sid);
    }
    /**
     * Returns true if the subscription has an associated timeout.
     */
    hasTimeout() {
        let sub = this.protocol.subscriptions.get(this.sid);
        return sub !== null && sub.hasOwnProperty('timeout');
    }
    /**
     * Cancels a timeout associated with the subscription
     */
    cancelTimeout() {
        let sub = this.protocol.subscriptions.get(this.sid);
        Subscription.cancelTimeout(sub);
    }
    /**
     * Sets a timeout on a subscription. The timeout will fire by calling
     * the subscription's callback with an error argument if the expected
     * number of messages (specified via max) has not been received by the
     * subscription before the timer expires. If max is not specified,
     * the subscription times out if no messages are received within the timeout
     * specified.
     *
     * Returns `true` if the subscription was found and the timeout was registered.
     *
     * @param millis
     */
    setTimeout(millis) {
        let sub = this.protocol.subscriptions.get(this.sid);
        Subscription.cancelTimeout(sub);
        if (sub) {
            sub.timeout = setTimeout(() => {
                if (sub && sub.callback) {
                    sub.callback(error_1.NatsError.errorForCode(error_1.ErrorCode.SUB_TIMEOUT), {});
                }
                this.unsubscribe();
            }, millis);
            return true;
        }
        return false;
    }
    /**
     * Returns the number of messages received by the subscription.
     */
    getReceived() {
        let sub = this.protocol.subscriptions.get(this.sid);
        if (sub) {
            return sub.received;
        }
        return 0;
    }
    /**
     * Returns the number of messages expected by the subscription.
     * If `0`, the subscription was not found or was auto-cancelled.
     * If `-1`, the subscription didn't specify a count for expected messages.
     */
    getMax() {
        let sub = this.protocol.subscriptions.get(this.sid);
        if (!sub) {
            return 0;
        }
        if (sub && sub.max) {
            return sub.max;
        }
        return -1;
    }
    /**
     * @return true if the subscription is not found.
     */
    isCancelled() {
        return this.protocol.subscriptions.get(this.sid) === null;
    }
    /**
     * @return true if the subscription is draining.
     * @see [[drain]]
     */
    isDraining() {
        let sub = this.protocol.subscriptions.get(this.sid);
        if (sub) {
            return sub.draining === true;
        }
        return false;
    }
}
exports.Subscription = Subscription;
//# sourceMappingURL=nats.js.map

/***/ }),

/***/ 697:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = __webpack_require__(670);
const muxsubscriptions_1 = __webpack_require__(577);
const error_1 = __webpack_require__(255);
const events_1 = __webpack_require__(614);
const const_1 = __webpack_require__(563);
const servers_1 = __webpack_require__(740);
const tcptransport_1 = __webpack_require__(823);
const subscriptions_1 = __webpack_require__(932);
const databuffer_1 = __webpack_require__(570);
const messagebuffer_1 = __webpack_require__(461);
const util_1 = __webpack_require__(617);
const fs = __importStar(__webpack_require__(747));
const nkeys = __importStar(__webpack_require__(509));
// Protocol
const MSG = /^MSG\s+([^\s\r\n]+)\s+([^\s\r\n]+)\s+(([^\s\r\n]+)[^\S\r\n]+)?(\d+)\r\n/i, OK = /^\+OK\s*\r\n/i, ERR = /^-ERR\s+('.+')?\r\n/i, PING = /^PING\r\n/i, PONG = /^PONG\r\n/i, INFO = /^INFO\s+([^\r\n]+)\r\n/i, SUBRE = /^SUB\s+([^\r\n]+)\r\n/i, CREDS = /\s*(?:(?:[-]{3,}[^\n]*[-]{3,}\n)(.+)(?:\n\s*[-]{3,}[^\n]*[-]{3,}\n))/i, 
// Protocol
SUB = 'SUB', UNSUB = 'UNSUB', CONNECT = 'CONNECT', FLUSH_THRESHOLD = 65536;
const CRLF_BUF = Buffer.from('\r\n');
// Parser state
var ParserState;
(function (ParserState) {
    ParserState[ParserState["CLOSED"] = -1] = "CLOSED";
    ParserState[ParserState["AWAITING_CONTROL"] = 0] = "AWAITING_CONTROL";
    ParserState[ParserState["AWAITING_MSG_PAYLOAD"] = 1] = "AWAITING_MSG_PAYLOAD";
})(ParserState || (ParserState = {}));
var TlsRequirement;
(function (TlsRequirement) {
    TlsRequirement[TlsRequirement["OFF"] = -1] = "OFF";
    TlsRequirement[TlsRequirement["ANY"] = 0] = "ANY";
    TlsRequirement[TlsRequirement["ON"] = 1] = "ON";
})(TlsRequirement || (TlsRequirement = {}));
/**
 * @hidden
 */
class ProtocolHandler extends events_1.EventEmitter {
    constructor(client, options) {
        super();
        this.muxSubscriptions = new muxsubscriptions_1.MuxSubscriptions();
        this.closed = false;
        this.connected = false;
        this.inbound = new databuffer_1.DataBuffer();
        this.info = {};
        this.infoReceived = false;
        this.outbound = new databuffer_1.DataBuffer();
        this.pongs = [];
        this.pout = 0;
        this.reconnecting = false;
        this.state = ParserState.AWAITING_CONTROL;
        this.wasConnected = false;
        this.draining = false;
        this.noMorePublishing = false;
        events_1.EventEmitter.call(this);
        this.client = client;
        this.options = options;
        this.encoding = options.encoding || 'utf8';
        this.payload = options.payload || nats_1.Payload.STRING;
        this.subscriptions = new subscriptions_1.Subscriptions();
        this.subscriptions.on('subscribe', (sub) => {
            this.client.emit('subscribe', sub);
        });
        this.subscriptions.on('unsubscribe', (unsub) => {
            this.client.emit('unsubscribe', unsub);
        });
        this.servers = new servers_1.Servers(!this.options.noRandomize, this.options.servers || [], this.options.url);
        this.transport = new tcptransport_1.TCPTransport(this.getTransportHandlers());
    }
    static connect(client, opts) {
        let lastError;
        // loop through all the servers and bail or loop until connect if waitOnFirstConnect
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let ph = new ProtocolHandler(client, opts);
            while (true) {
                // @ts-ignore
                let wait = ph.options.reconnectDelayHandler();
                let maxWait = wait;
                for (let i = 0; i < ph.servers.length(); i++) {
                    const srv = ph.selectServer();
                    if (srv) {
                        const now = Date.now();
                        if (srv.lastConnect === 0 || srv.lastConnect + wait <= now) {
                            try {
                                yield ph.connect();
                                resolve(ph);
                                ph.startHandshakeTimeout();
                                return;
                            }
                            catch (err) {
                                lastError = err;
                                // if waitOnFirstConnect and fail, remove the server
                                if (!ph.options.waitOnFirstConnect) {
                                    ph.servers.removeCurrentServer();
                                }
                            }
                        }
                        else {
                            maxWait = Math.min(maxWait, srv.lastConnect + wait - now);
                        }
                    }
                }
                // we could have removed all the known servers
                if (ph.servers.length() === 0) {
                    const err = lastError || error_1.NatsError.errorForCode(error_1.ErrorCode.UNABLE_TO_CONNECT);
                    reject(err);
                    return;
                }
                // soonest to retry is maxWait
                yield util_1.delay(maxWait);
            }
        }));
    }
    startHandshakeTimeout() {
        if (this.options.timeout) {
            this.connectionTimer = setTimeout(() => {
                this.processErr('conn_timeout');
            }, this.options.timeout - this.transport.dialDuration());
        }
    }
    flush(cb) {
        if (this.closed) {
            if (typeof cb === 'function') {
                cb(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED));
                return;
            }
            else {
                throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED);
            }
        }
        this.pongs.push(cb);
        this.sendCommand(ProtocolHandler.buildProtocolMessage('PING'));
    }
    closeAndEmit() {
        this.close();
        this.client.emit('close');
    }
    close() {
        this.cancelHeartbeat();
        this.closed = true;
        this.removeAllListeners();
        this.closeStream();
        this.subscriptions.close();
        this.muxSubscriptions.close();
        this.state = ParserState.CLOSED;
        this.pongs = [];
        this.outbound.reset();
    }
    ;
    drain() {
        if (this.closed) {
            return Promise.reject(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED));
        }
        if (this.draining) {
            return Promise.reject(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_DRAINING));
        }
        this.draining = true;
        let subs = this.subscriptions.all();
        let promises = [];
        subs.forEach((sub) => {
            let p = this.drainSubscription(sub.sid);
            promises.push(p);
        });
        return new Promise((resolve) => {
            util_1.settle(promises)
                .then((a) => {
                this.noMorePublishing = true;
                process.nextTick(() => {
                    // send pending buffer
                    this.flush(() => {
                        this.close();
                        resolve(a);
                    });
                });
            })
                .catch(() => {
                // cannot happen
            });
        });
    }
    publish(subject, data, reply = '') {
        if (this.closed) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED);
        }
        if (this.noMorePublishing) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_DRAINING);
        }
        data = this.toBuffer(data);
        let len = data.length;
        let proto;
        if (reply) {
            proto = `PUB ${subject} ${reply} ${len}`;
        }
        else {
            proto = `PUB ${subject} ${len}`;
        }
        this.sendCommand(ProtocolHandler.buildProtocolMessage(proto, data));
    }
    subscribe(s) {
        if (this.isClosed()) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED);
        }
        if (this.draining) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_DRAINING);
        }
        let sub = this.subscriptions.add(s);
        if (sub.queue) {
            this.sendCommand(ProtocolHandler.buildProtocolMessage(`SUB ${sub.subject} ${sub.queue} ${sub.sid}`));
        }
        else {
            this.sendCommand(ProtocolHandler.buildProtocolMessage(`SUB ${sub.subject} ${sub.sid}`));
        }
        if (s.max) {
            this.unsubscribe(sub.sid, s.max);
        }
        return new nats_1.Subscription(sub, this);
    }
    drainSubscription(sid) {
        if (this.closed) {
            return Promise.reject(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED));
        }
        if (!sid) {
            return Promise.reject(error_1.NatsError.errorForCode(error_1.ErrorCode.SUB_CLOSED));
        }
        let s = this.subscriptions.get(sid);
        if (!s) {
            return Promise.reject(error_1.NatsError.errorForCode(error_1.ErrorCode.SUB_CLOSED));
        }
        if (s.draining) {
            return Promise.reject(error_1.NatsError.errorForCode(error_1.ErrorCode.SUB_DRAINING));
        }
        let sub = s;
        return new Promise((resolve) => {
            sub.draining = true;
            this.sendCommand(ProtocolHandler.buildProtocolMessage(`UNSUB ${sid}`));
            this.flush(() => {
                this.subscriptions.cancel(sub);
                resolve({ sid: sub.sid, subject: sub.subject, queue: sub.queue });
            });
        });
    }
    unsubscribe(sid, max) {
        if (!sid || this.closed) {
            return;
        }
        let s = this.subscriptions.get(sid);
        if (s) {
            if (max) {
                this.sendCommand(ProtocolHandler.buildProtocolMessage(`${UNSUB} ${sid} ${max}`));
            }
            else {
                this.sendCommand(ProtocolHandler.buildProtocolMessage(`${UNSUB} ${sid}`));
            }
            s.max = max;
            if (s.max === undefined || s.received >= s.max) {
                this.subscriptions.cancel(s);
            }
        }
    }
    request(r) {
        if (this.closed) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_CLOSED);
        }
        if (this.draining) {
            throw error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_DRAINING);
        }
        this.initMux();
        this.muxSubscriptions.add(r);
        return new Request(r, this);
    }
    numSubscriptions() {
        return this.subscriptions.length;
    }
    isClosed() {
        return this.closed;
    }
    cancelRequest(token, max) {
        if (!token || this.isClosed()) {
            return;
        }
        let r = this.muxSubscriptions.get(token);
        if (r) {
            r.max = max;
            if (r.max === undefined || r.received >= r.max) {
                this.muxSubscriptions.cancel(r);
            }
        }
    }
    connect() {
        this.currentServer.lastConnect = Date.now();
        this.prepareConnection();
        if (this.reconnecting) {
            this.currentServer.reconnects += 1;
            this.client.emit('reconnecting', this.url.href);
        }
        return this.transport.connect(this.url, this.options.timeout);
    }
    flushPending() {
        if (!this.infoReceived) {
            return;
        }
        if (this.outbound.size()) {
            let d = this.outbound.drain();
            this.transport.write(d);
        }
    }
    static buildProtocolMessage(protocol, payload) {
        let protoLen = Buffer.byteLength(protocol);
        let cmd = protoLen + 2;
        let len = cmd;
        if (payload) {
            len += payload.byteLength + 2;
        }
        let buf = Buffer.allocUnsafe(len);
        buf.write(protocol);
        CRLF_BUF.copy(buf, protoLen);
        if (payload) {
            payload.copy(buf, cmd);
            CRLF_BUF.copy(buf, buf.byteLength - 2);
        }
        return buf;
    }
    sendCommand(cmd) {
        // Buffer to cut down on system calls, increase throughput.
        // When receive gets faster, should make this Buffer based..
        if (this.closed) {
            return;
        }
        let buf;
        if (typeof cmd === 'string') {
            let len = Buffer.byteLength(cmd);
            buf = Buffer.allocUnsafe(len);
            buf.write(cmd, 0, len, 'utf8');
        }
        else {
            buf = cmd;
        }
        if (buf.byteLength === 0) {
            return;
        }
        this.outbound.fill(buf);
        if (this.outbound.length() === 1) {
            setImmediate(() => {
                this.flushPending();
            });
        }
        else if (this.outbound.size() > FLUSH_THRESHOLD) {
            this.flushPending();
        }
    }
    getTransportHandlers() {
        let handlers = {};
        handlers.connect = () => {
            this.connected = true;
        };
        handlers.close = () => {
            this.cancelHeartbeat();
            let wasConnected = this.connected;
            this.closeStream();
            if (wasConnected) {
                this.client.emit('disconnect', this.currentServer.url.href);
            }
            if (this.closed) {
                this.closeAndEmit();
            }
            else {
                this.scheduleReconnect();
            }
        };
        handlers.error = (exception) => {
            // If we were connected just return, close event will process
            if (this.wasConnected && this.currentServer.didConnect) {
                return;
            }
            // if the current server did not connect at all, and we in
            // general have not connected to any server, remove it from
            // this list. Unless overridden
            if (!this.wasConnected && !this.currentServer.didConnect) {
                // We can override this behavior with waitOnFirstConnect, which will
                // treat it like a reconnect scenario.
                if (this.options.waitOnFirstConnect) {
                    // Pretend to move us into a reconnect state.
                    this.currentServer.didConnect = true;
                }
                else {
                    this.servers.removeCurrentServer();
                }
            }
            // Only bubble up error if we never had connected
            // to the server and we only have one.
            if (!this.wasConnected && this.servers.length() === 0) {
                this.client.emit('error', new error_1.NatsError(error_1.CONN_ERR_PREFIX + exception, error_1.ErrorCode.CONN_ERR, exception));
            }
            this.closeStream();
        };
        handlers.data = (data) => {
            // If inbound exists, concat them together. We try to avoid this for split
            // messages, so this should only really happen for a split control line.
            // Long term answer is hand rolled parser and not regexp.
            this.inbound.fill(data);
            // Process the inbound queue.
            this.processInbound();
        };
        return handlers;
    }
    prepareConnection() {
        // Commands may have been queued during reconnect. Discard everything except:
        // 1) ping requests with a pong callback
        // 2) publish requests
        //
        // Rationale: CONNECT and SUBs are written directly upon connecting, any PONG
        // response is no longer relevant, and any UNSUB will be accounted for when we
        // sync our SUBs. Without this, users of the client may miss state transitions
        // via callbacks, would have to track the client's internal connection state,
        // and may have to double buffer messages (which we are already doing) if they
        // wanted to ensure their messages reach the server.
        // copy outbound and reset it
        let buffers = this.outbound.reset();
        let pongs = [];
        if (buffers.length) {
            let pongIndex = 0;
            // find all the pings with associated callback, and pubs
            buffers.forEach((buf) => {
                let cmd = buf.toString('binary');
                if (PING.test(cmd) && this.pongs !== null && pongIndex < this.pongs.length) {
                    let f = this.pongs[pongIndex++];
                    if (f) {
                        this.outbound.fill(buf);
                        pongs.push(f);
                    }
                }
                else if (cmd.length > 3 && cmd[0] === 'P' && cmd[1] === 'U' && cmd[2] === 'B') {
                    this.outbound.fill(buf);
                }
            });
        }
        this.pongs = pongs;
        this.state = ParserState.AWAITING_CONTROL;
        // Clear info processing.
        this.info = {};
        this.infoReceived = false;
    }
    ;
    getInfo() {
        if (this.infoReceived) {
            return this.info;
        }
        return null;
    }
    /**
     * Strips all SUBS commands from pending during initial connection completed since
     * we send the subscriptions as a separate operation.
     *
     * @api private
     */
    stripPendingSubs() {
        if (this.outbound.size() === 0) {
            return;
        }
        // FIXME: outbound doesn't peek so there's no packing
        let buffers = this.outbound.reset();
        for (let i = 0; i < buffers.length; i++) {
            let s = buffers[i].toString('binary');
            if (!SUBRE.test(s)) {
                // requeue the command
                this.sendCommand(buffers[i]);
            }
        }
    }
    /**
     * Sends existing subscriptions to new server after reconnect.
     *
     * @api private
     */
    sendSubscriptions() {
        if (this.subscriptions.length === 0 || !this.transport.isConnected()) {
            return;
        }
        let cmds = [];
        this.subscriptions.all().forEach((s) => {
            if (s.queue) {
                cmds.push(`${SUB} ${s.subject} ${s.queue} ${s.sid}${const_1.CR_LF}`);
            }
            else {
                cmds.push(`${SUB} ${s.subject} ${s.sid}${const_1.CR_LF}`);
            }
            if (s.max) {
                const max = s.max - s.received;
                if (max > 0) {
                    cmds.push(`${UNSUB} ${s.sid} ${max}${const_1.CR_LF}`);
                }
                else {
                    cmds.push(`${UNSUB} ${s.sid}${const_1.CR_LF}`);
                }
            }
        });
        if (cmds.length) {
            this.transport.write(cmds.join(''));
        }
    }
    /**
     * Process the inbound data queue.
     *
     * @api private
     */
    processInbound() {
        // Hold any regex matches.
        let m;
        // For optional yield
        let start;
        if (!this.transport) {
            // if we are here, the stream was reaped and errors raised
            // if we continue.
            return;
        }
        // unpause if needed.
        this.transport.resume();
        if (this.options.yieldTime !== undefined) {
            start = Date.now();
        }
        while (!this.closed && this.inbound.size()) {
            switch (this.state) {
                case ParserState.AWAITING_CONTROL:
                    // Regex only works on strings, so convert once to be more efficient.
                    // Long term answer is a hand rolled parser, not regex.
                    let len = this.inbound.protoLen();
                    if (len === -1) {
                        return;
                    }
                    let bb = this.inbound.drain(len);
                    if (bb.byteLength === 0) {
                        return;
                    }
                    // specifying an encoding here like 'ascii' slows it down
                    let buf = bb.toString();
                    if ((m = MSG.exec(buf)) !== null) {
                        this.msgBuffer = new messagebuffer_1.MsgBuffer(m, this.payload, this.encoding);
                        this.state = ParserState.AWAITING_MSG_PAYLOAD;
                    }
                    else if ((m = OK.exec(buf)) !== null) {
                        // Ignore for now..
                    }
                    else if ((m = ERR.exec(buf)) !== null) {
                        if (this.processErr(m[1])) {
                            return;
                        }
                    }
                    else if ((m = PONG.exec(buf)) !== null) {
                        this.pout = 0;
                        let cb = this.pongs && this.pongs.shift();
                        if (cb) {
                            try {
                                cb();
                            }
                            catch (err) {
                                console.error('error while processing pong', err);
                            }
                        } // FIXME: Should we check for exceptions?
                    }
                    else if ((m = PING.exec(buf)) !== null) {
                        this.sendCommand(ProtocolHandler.buildProtocolMessage('PONG'));
                    }
                    else if ((m = INFO.exec(buf)) !== null) {
                        this.info = JSON.parse(m[1]);
                        // Check on TLS mismatch.
                        if (this.checkTLSMismatch()) {
                            return;
                        }
                        if (this.checkNoEchoMismatch()) {
                            return;
                        }
                        if (this.checkNonceSigner()) {
                            return;
                        }
                        // Always try to read the connect_urls from info
                        let change = this.servers.processServerUpdate(this.info);
                        if (change.deleted.length > 0 || change.added.length > 0) {
                            this.client.emit('serversChanged', change);
                        }
                        // Process first INFO
                        if (!this.infoReceived) {
                            // Switch over to TLS as needed.
                            // are we a tls socket?
                            let encrypted = this.transport.isEncrypted();
                            if (this.info.tls_required === true && !encrypted) {
                                this.transport.upgrade(this.options.tls, () => {
                                    this.flushPending();
                                });
                            }
                            // Send the connect message and subscriptions immediately
                            let cs = JSON.stringify(new Connect(this.currentServer, this.options, this.info));
                            this.transport.write(`${CONNECT} ${cs}${const_1.CR_LF}`);
                            this.pongs.unshift(() => {
                                if (this.connectionTimer) {
                                    clearTimeout(this.connectionTimer);
                                    this.connectionTimer = undefined;
                                }
                                this.sendSubscriptions();
                                this.stripPendingSubs();
                                this.scheduleHeartbeat();
                                this.connectCB();
                            });
                            this.transport.write(ProtocolHandler.buildProtocolMessage('PING'));
                            // Mark as received
                            this.flushPending();
                            this.infoReceived = true;
                        }
                    }
                    else {
                        // FIXME, check line length for something weird.
                        // Nothing here yet, return
                        return;
                    }
                    break;
                case ParserState.AWAITING_MSG_PAYLOAD:
                    if (!this.msgBuffer) {
                        break;
                    }
                    // wait for more data to arrive
                    if (this.inbound.size() < this.msgBuffer.length) {
                        return;
                    }
                    // drain the number of bytes we need
                    let dd = this.inbound.drain(this.msgBuffer.length);
                    this.msgBuffer.fill(dd);
                    this.processMsg();
                    this.state = ParserState.AWAITING_CONTROL;
                    this.msgBuffer = null;
                    // Check to see if we have an option to yield for other events after yieldTime.
                    if (start !== undefined && this.options && this.options.yieldTime) {
                        if ((Date.now() - start) > this.options.yieldTime) {
                            this.transport.pause();
                            this.client.emit('yield');
                            setImmediate(() => {
                                this.processInbound();
                            });
                            return;
                        }
                    }
                    break;
            }
        }
    }
    clientTLSRequirement() {
        if (this.options.tls === undefined) {
            return TlsRequirement.ANY;
        }
        if (this.options.tls === false) {
            return TlsRequirement.OFF;
        }
        return TlsRequirement.ON;
    }
    /**
     * Check for TLS configuration mismatch.
     *
     * @api private
     */
    checkTLSMismatch() {
        switch (this.clientTLSRequirement()) {
            case TlsRequirement.OFF:
                if (this.info.tls_required) {
                    this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.SECURE_CONN_REQ));
                    this.closeStream();
                    return true;
                }
                break;
            case TlsRequirement.ON:
                if (!this.info.tls_required) {
                    this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.NON_SECURE_CONN_REQ));
                    this.closeStream();
                    return true;
                }
                break;
            case TlsRequirement.ANY:
                // tls auto-upgrade
                break;
        }
        let cert = false;
        if (this.options.tls && typeof this.options.tls === 'object') {
            cert = this.options.tls.cert != null;
        }
        if (this.info.tls_verify && !cert) {
            this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.CLIENT_CERT_REQ));
            this.closeStream();
            return true;
        }
        return false;
    }
    /**
     * Check no echo
     * @api private
     */
    checkNoEchoMismatch() {
        if ((this.info.proto === undefined || this.info.proto < 1) && this.options.noEcho) {
            this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.NO_ECHO_NOT_SUPPORTED));
            this.closeStream();
            return true;
        }
        return false;
    }
    checkNonceSigner() {
        if (this.info.nonce === undefined) {
            return false;
        }
        if (this.options.nkeyCreds) {
            try {
                let seed = nkeys.fromSeed(this.getNkeyCreds());
                this.options.nkey = seed.getPublicKey().toString();
                this.options.nonceSigner = (nonce) => {
                    return this.nkeyNonceSigner(Buffer.from(nonce));
                };
            }
            catch (err) {
                this.client.emit('error', err);
                this.closeStream();
                return true;
            }
        }
        if (this.options.userCreds) {
            try {
                // simple test that we got a creds file - exception is thrown
                // if the file is not a valid creds file
                this.getUserCreds(true);
                this.options.nonceSigner = (nonce) => {
                    return this.credsNonceSigner(Buffer.from(nonce));
                };
                this.options.userJWT = () => {
                    return this.loadJwt();
                };
            }
            catch (err) {
                this.client.emit('error', err);
                this.closeStream();
                return true;
            }
        }
        if (this.options.nonceSigner === undefined) {
            this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.SIGNATURE_REQUIRED));
            this.closeStream();
            return true;
        }
        if (this.options.nkey === undefined && this.options.userJWT === undefined) {
            this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.NKEY_OR_JWT_REQ));
            this.closeStream();
            return true;
        }
        return false;
    }
    getNkeyCreds() {
        if (this.options.nkeyCreds) {
            return fs.readFileSync(this.options.nkeyCreds);
        }
        throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_NKEY_SEED);
    }
    // returns a regex array - first match is the jwt, second match is the nkey
    getUserCreds(jwt = false) {
        if (this.options.userCreds) {
            let buf = fs.readFileSync(this.options.userCreds);
            if (buf) {
                let re = jwt ? CREDS : new RegExp(CREDS, 'g');
                let contents = buf.toString();
                // first match jwt
                let m = re.exec(contents);
                if (m === null) {
                    throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_CREDS);
                }
                if (jwt) {
                    return m;
                }
                // second match the seed
                m = re.exec(contents);
                if (m === null) {
                    throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_CREDS);
                }
                return m;
            }
        }
        throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_CREDS);
    }
    // built-in handler for signing nonces based on a nkey seed file
    nkeyNonceSigner(nonce) {
        try {
            let m = this.getNkeyCreds();
            let sk = nkeys.fromSeed(m);
            return sk.sign(nonce);
        }
        catch (ex) {
            this.closeStream();
            this.client.emit('error', ex);
        }
    }
    // built-in handler for signing nonces based on user creds file
    credsNonceSigner(nonce) {
        try {
            let m = this.getUserCreds();
            let sk = nkeys.fromSeed(Buffer.from(m[1]));
            return sk.sign(nonce);
        }
        catch (ex) {
            this.closeStream();
            this.client.emit('error', ex);
        }
    }
    // built-in handler for loading user jwt based on user creds file
    loadJwt() {
        try {
            let m = this.getUserCreds(true);
            return m[1];
        }
        catch (ex) {
            this.closeStream();
            this.client.emit('error', ex);
        }
    }
    /**
     * Process a delivered message and deliver to appropriate subscriber.
     *
     * @api private
     */
    processMsg() {
        if (this.subscriptions.length === 0 || !this.msgBuffer) {
            return;
        }
        let sub = this.subscriptions.get(this.msgBuffer.msg.sid);
        if (!sub) {
            return;
        }
        sub.received += 1;
        // cancel the timeout if we got the expected number of messages
        if (sub.timeout && (sub.max === undefined || sub.received >= sub.max)) {
            nats_1.Subscription.cancelTimeout(sub);
        }
        // if we got max number of messages, unsubscribe
        if (sub.max !== undefined && sub.received >= sub.max) {
            this.unsubscribe(sub.sid);
        }
        if (sub.callback) {
            try {
                if (this.msgBuffer.error) {
                    sub.callback(this.msgBuffer.error, this.msgBuffer.msg);
                }
                else {
                    sub.callback(null, this.msgBuffer.msg);
                }
            }
            catch (error) {
                // client could have died
                this.client.emit('error', error);
            }
        }
    }
    ;
    static toError(s) {
        let t = s ? s.toLowerCase() : '';
        if (t.indexOf('permissions violation') !== -1) {
            return new error_1.NatsError(s, error_1.ErrorCode.PERMISSIONS_VIOLATION);
        }
        else if (t.indexOf('authorization violation') !== -1) {
            return new error_1.NatsError(s, error_1.ErrorCode.AUTHORIZATION_VIOLATION);
        }
        else if (t.indexOf('conn_timeout') !== -1) {
            return error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_TIMEOUT);
        }
        else {
            return new error_1.NatsError(s, error_1.ErrorCode.NATS_PROTOCOL_ERR);
        }
    }
    /**
     * ProcessErr processes any error messages from the server
     * Return true if the error closed the connection
     * @api private
     */
    processErr(s) {
        // current NATS clients, will raise an error and close on any errors
        // except stale connection and permission errors
        let err = ProtocolHandler.toError(s);
        switch (err.code) {
            case error_1.ErrorCode.AUTHORIZATION_VIOLATION:
                this.client.emit('error', err);
                // closeStream() triggers a reconnect if allowed
                this.closeStream();
                return true;
            case error_1.ErrorCode.PERMISSIONS_VIOLATION:
                // just emit
                this.client.emit('permissionError', err);
                return false;
            case error_1.ErrorCode.CONN_TIMEOUT:
                this.client.emit('error', error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_TIMEOUT));
                this.closeStream();
                return true;
            default:
                this.client.emit('error', err);
                // closeStream() triggers a reconnect if allowed
                this.closeStream();
                return true;
        }
    }
    ;
    /**
     * Close down the stream and clear state.
     *
     * @api private
     */
    closeStream() {
        this.transport.destroy();
        if (this.connected || this.closed) {
            this.pongs = [];
            this.pout = 0;
            this.connected = false;
            this.inbound.reset();
        }
    }
    ;
    /**
     * Setup a timer event to attempt reconnect.
     *
     * @api private
     */
    scheduleReconnect() {
        if (this.closed) {
            return;
        }
        // Just return if no more servers or if no reconnect is desired
        if (this.servers.length() === 0 || this.options.reconnect === false) {
            this.closeAndEmit();
            return;
        }
        // Don't set reconnecting state if we are just trying for the first time.
        if (this.wasConnected) {
            this.reconnecting = true;
        }
        //@ts-ignore
        let wait = this.options.reconnectDelayHandler();
        let maxWait = wait;
        const now = Date.now();
        for (let i = 0; i < this.servers.length(); i++) {
            const srv = this.selectServer();
            if (srv) {
                const mra = this.options.maxReconnectAttempts || 0;
                if (mra !== -1 && srv.reconnects >= mra) {
                    this.servers.removeCurrentServer();
                    continue;
                }
                // if never connected or last connect is past the wait, try right away
                if (srv.lastConnect === 0 || srv.lastConnect + wait <= now) {
                    this.reconnect();
                    return;
                }
                // start collecting min retry
                maxWait = Math.min(maxWait, srv.lastConnect + wait - now);
            }
        }
        // we could have removed all the known servers
        if (this.servers.length() === 0) {
            this.closeAndEmit();
            return;
        }
        // soonest to retry is maxWait
        setTimeout(() => {
            this.scheduleReconnect();
        }, maxWait);
    }
    scheduleHeartbeat() {
        this.pingTimer = setTimeout(() => {
            this.client.emit('pingtimer');
            if (this.closed) {
                return;
            }
            // we could be waiting on the socket to connect
            if (this.transport.isConnected()) {
                this.client.emit('pingcount', this.pout);
                this.pout++;
                // @ts-ignore
                if (this.pout > this.options.maxPingOut) {
                    // processErr will scheduleReconnect
                    this.processErr(error_1.ErrorCode.STALE_CONNECTION_ERR);
                    // don't reschedule, new connection initiated
                    return;
                }
                else {
                    // send the ping
                    this.sendCommand(ProtocolHandler.buildProtocolMessage('PING'));
                    if (this.pongs) {
                        // no callback
                        this.pongs.push(undefined);
                    }
                }
            }
            // reschedule
            this.scheduleHeartbeat();
        }, this.options.pingInterval || const_1.DEFAULT_PING_INTERVAL, this);
    }
    cancelHeartbeat() {
        if (this.pingTimer) {
            clearTimeout(this.pingTimer);
            delete this.pingTimer;
        }
    }
    /**
     * Reconnect to the server.
     *
     * @api private
     */
    reconnect() {
        if (this.closed) {
            return;
        }
        const ph = this;
        this.connect().then(() => {
            ph.startHandshakeTimeout();
            // all good the pong handler deals with it
        }).catch(() => {
            // the stream handler deals with it
        });
    }
    /**
     * Properly select the next server.
     * We rotate the server list as we go,
     * we also pull auth from urls as needed, or
     * if they were set in options use that as override.
     *
     * @api private
     */
    selectServer() {
        let server = this.servers.selectServer();
        if (server === undefined) {
            return undefined;
        }
        // Place in client context.
        this.currentServer = server;
        this.url = server.url;
        return this.currentServer;
    }
    toBuffer(data = undefined) {
        if (this.options.payload === nats_1.Payload.JSON) {
            // undefined is not a valid JSON-serializable value, but null is
            data = data === undefined ? null : data;
            try {
                data = JSON.stringify(data);
            }
            catch (e) {
                throw error_1.NatsError.errorForCode(error_1.ErrorCode.BAD_JSON);
            }
        }
        else {
            data = data || const_1.EMPTY;
        }
        // if not a buffer, it is already serialized json or a string
        if (!Buffer.isBuffer(data)) {
            // must be utf8 - omitting encoding to prevent clever change
            data = Buffer.from(data);
        }
        return data;
    }
    initMux() {
        let mux = this.subscriptions.getMux();
        if (!mux) {
            let inbox = this.muxSubscriptions.init();
            let sub = nats_1.defaultSub();
            // dot is already part of mux
            sub.subject = `${inbox}*`;
            sub.callback = this.muxSubscriptions.dispatcher();
            this.subscriptions.setMux(sub);
            this.subscribe(sub);
        }
    }
    /**
     * Callback for first flush/connect.
     *
     * @api private
     */
    connectCB() {
        let event = this.reconnecting ? 'reconnect' : 'connect';
        this.reconnecting = false;
        this.wasConnected = true;
        if (this.currentServer) {
            this.currentServer.didConnect = true;
            this.currentServer.reconnects = 0;
        }
        // copy the info
        let info = {};
        try {
            info = JSON.parse(JSON.stringify(this.info));
        }
        catch (err) {
            // ignore
        }
        this.client.emit(event, this.client, this.currentServer.url.href, info);
        this.flushPending();
    }
}
exports.ProtocolHandler = ProtocolHandler;
class Request {
    constructor(req, protocol) {
        this.token = req.token;
        this.protocol = protocol;
    }
    cancel() {
        this.protocol.cancelRequest(this.token, 0);
    }
}
exports.Request = Request;
class Connect {
    constructor(server, opts, info) {
        this.lang = 'typescript';
        this.version = nats_1.VERSION;
        this.verbose = false;
        this.pedantic = false;
        this.protocol = 1;
        opts = opts || {};
        if (opts.user) {
            this.user = opts.user;
            this.pass = opts.pass;
        }
        if (opts.token) {
            this.auth_token = opts.token;
        }
        let auth = server.getCredentials();
        if (auth) {
            if (auth.length !== 1) {
                if (this.user === undefined) {
                    this.user = auth[0];
                }
                if (this.pass === undefined) {
                    this.pass = auth[1];
                }
            }
            else if (this.auth_token === undefined) {
                this.auth_token = auth[0];
            }
        }
        if (opts.name) {
            this.name = opts.name;
        }
        if (opts.verbose !== undefined) {
            this.verbose = opts.verbose;
        }
        if (opts.pedantic !== undefined) {
            this.pedantic = opts.pedantic;
        }
        if (opts.noEcho) {
            this.echo = false;
        }
        if (info.nonce && opts.nonceSigner) {
            let sig = opts.nonceSigner(info.nonce);
            this.sig = sig.toString('base64');
        }
        if (opts.userJWT) {
            if (typeof opts.userJWT === 'function') {
                this.jwt = opts.userJWT();
            }
            else {
                this.jwt = opts.userJWT;
            }
        }
        if (opts.nkey) {
            this.nkey = opts.nkey;
        }
    }
}
exports.Connect = Connect;
//# sourceMappingURL=protocolhandler.js.map

/***/ }),

/***/ 740:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const url = __importStar(__webpack_require__(835));
const const_1 = __webpack_require__(563);
const util_1 = __webpack_require__(617);
/**
 * @hidden
 */
class Server {
    constructor(u, implicit = false) {
        // add scheme if not specified
        if (!/^.*:\/\/.*/.test(u)) {
            u = `nats://${u}`;
        }
        this.url = url.parse(u);
        if (!this.url.port) {
            this.url.port = `${const_1.DEFAULT_PORT}`;
        }
        this.didConnect = false;
        this.reconnects = 0;
        this.lastConnect = 0;
        this.implicit = implicit;
    }
    toString() {
        return this.url.href || '';
    }
    getCredentials() {
        if ('auth' in this.url && !!this.url.auth) {
            return this.url.auth.split(':');
        }
        return undefined;
    }
}
exports.Server = Server;
/**
 * @hidden
 */
class Servers {
    constructor(randomize, urls, firstServer) {
        this.firstSelect = true;
        this.servers = [];
        if (urls) {
            urls.forEach(element => {
                this.servers.push(new Server(element));
            });
            if (randomize) {
                this.servers = util_1.shuffle(this.servers);
            }
        }
        if (firstServer) {
            let index = urls.indexOf(firstServer);
            if (index === -1) {
                this.addServer(firstServer, false);
            }
            else {
                let fs = this.servers[index];
                this.servers.splice(index, 1);
                this.servers.unshift(fs);
            }
        }
        else {
            if (this.servers.length === 0) {
                this.addServer(const_1.DEFAULT_URI, false);
            }
        }
        this.currentServer = this.servers[0];
    }
    getCurrentServer() {
        return this.currentServer;
    }
    addServer(u, implicit = false) {
        this.servers.push(new Server(u, implicit));
    }
    selectServer() {
        // allow using select without breaking the order of the servers
        if (this.firstSelect) {
            this.firstSelect = false;
            return this.currentServer;
        }
        let t = this.servers.shift();
        if (t) {
            this.servers.push(t);
            this.currentServer = t;
        }
        return t;
    }
    removeCurrentServer() {
        this.removeServer(this.currentServer);
    }
    removeServer(server) {
        if (server) {
            let index = this.servers.indexOf(server);
            this.servers.splice(index, 1);
        }
    }
    length() {
        return this.servers.length;
    }
    next() {
        return this.servers.length ? this.servers[0] : undefined;
    }
    getServers() {
        return this.servers;
    }
    processServerUpdate(info) {
        let added = [];
        let deleted = [];
        if (info.connect_urls && info.connect_urls.length > 0) {
            let discovered = {};
            info.connect_urls.forEach(server => {
                // protocol in node includes the ':'
                let protocol = this.currentServer.url.protocol;
                let u = `${protocol}//${server}`;
                discovered[u] = new Server(u, true);
            });
            // remove implicit servers that are no longer reported
            let toDelete = [];
            this.servers.forEach((s, index) => {
                let u = s.toString();
                if (s.implicit && this.currentServer.url.href !== u && discovered[u] === undefined) {
                    // server was removed
                    toDelete.push(index);
                }
                // remove this entry from reported
                delete discovered[u];
            });
            // perform the deletion
            toDelete.reverse();
            toDelete.forEach(index => {
                let removed = this.servers.splice(index, 1);
                deleted = deleted.concat(removed[0].url.toString());
            });
            // remaining servers are new
            for (let k in discovered) {
                if (discovered.hasOwnProperty(k)) {
                    this.servers.push(discovered[k]);
                    added.push(k);
                }
            }
        }
        return { added: added, deleted: deleted };
    }
}
exports.Servers = Servers;
//# sourceMappingURL=servers.js.map

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 759:
/***/ (function(module) {

module.exports = {"name":"nuid","version":"1.1.4","description":"NUID - A highly performant unique identifier generator.","keywords":["unique","identifier","generator"],"homepage":"https://nats.io","repository":{"type":"git","url":"git@github.com:nats-io/node-nuid.git"},"bugs":{"url":"https://github.com/nats-io/node-nuid/issues"},"license":"Apache-2.0","private":false,"author":{"name":"The NATS Authors"},"contributors":[],"main":"./index.js","scripts":{"depcheck":"dependency-check --no-dev package.json","depcheck:unused":"dependency-check package.json --no-dev --entry ./**/*.js","test:unit":"mkdir -p reports/ && NODE_ENV=test multi='spec=- xunit=reports/mocha-xunit.xml' nyc mocha --timeout 10000 --slow 750","test":"npm run depcheck && npm run depcheck:unused && npm run lint && npm run test:unit","coveralls":"nyc report --reporter=text-lcov | coveralls","cover":"nyc report --reporter=html && open coverage/index.html","lint":"standard './**/*.js'","fmt":"standard --fix './**/*.js'"},"engines":{"node":">= 8.16.0"},"dependencies":{},"devDependencies":{"coveralls":"^3.0.9","dependency-check":"^4.1.0","eslint":"^6.8.0","mocha":"^7.0.1","mocha-lcov-reporter":"1.3.0","nyc":"^15.0.0","should":"^13.2.3","standard":"^14.3.1"},"nyc":{"include":["lib/**"],"exclude":["test/**","examples/**","benchmark/**"]},"typings":"./index.d.ts"};

/***/ }),

/***/ 823:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const net = __importStar(__webpack_require__(631));
const tls = __importStar(__webpack_require__(16));
const tls_1 = __webpack_require__(16);
const error_1 = __webpack_require__(255);
/**
 * @hidden
 */
class TCPTransport {
    constructor(handlers) {
        this.connectedOnce = false;
        this.stream = null;
        this.closed = false;
        this.dialTime = 0;
        this.handlers = handlers;
    }
    connect(url, timeout) {
        let dialStart = 0;
        if (timeout) {
            dialStart = Date.now();
        }
        return new Promise((resolve, reject) => {
            // Create the stream
            // See #45 if we have a stream release the listeners
            // otherwise in addition to the leak events will fire fire
            if (this.stream) {
                this.destroy();
            }
            let connected = false;
            let to;
            if (timeout) {
                to = setTimeout(() => {
                    if (!this.connectedOnce) {
                        reject(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_TIMEOUT));
                        this.destroy();
                    }
                    else {
                        // if the client didn't resolve, the error handler
                        // is not set, so emitting 'error' will shutdown node
                        this.handlers.error(error_1.NatsError.errorForCode(error_1.ErrorCode.CONN_TIMEOUT));
                    }
                }, timeout);
            }
            // @ts-ignore typescript requires this parsed to a number
            this.stream = net.createConnection(parseInt(url.port, 10), url.hostname, () => {
                if (to) {
                    this.dialTime = Date.now() - dialStart;
                    clearTimeout(to);
                    to = undefined;
                }
                resolve();
                connected = true;
                this.connectedOnce = true;
                this.handlers.connect();
            });
            // @ts-ignore
            this.stream.setNoDelay(true);
            // @ts-ignore
            this.stream.on('error', (error) => {
                if (!this.connectedOnce) {
                    reject(error);
                    this.destroy();
                }
                else {
                    // if the client didn't resolve, the error handler
                    // is not set, so emitting 'error' will shutdown node
                    this.handlers.error(error);
                }
            });
            // @ts-ignore
            this.stream.on('close', () => {
                if (this.connectedOnce) {
                    this.handlers.close();
                }
            });
            // @ts-ignore
            this.stream.on('data', (data) => {
                // console.log('data', '< ', data.toString());
                this.handlers.data(data);
            });
        });
    }
    isClosed() {
        return this.closed;
    }
    isConnected() {
        return this.stream != null && !this.stream.connecting;
    }
    isEncrypted() {
        return this.stream instanceof tls_1.TLSSocket && this.stream.encrypted;
    }
    isAuthorized() {
        return this.stream instanceof tls_1.TLSSocket && this.stream.authorized;
    }
    upgrade(tlsOptions, done) {
        if (this.stream) {
            let opts;
            if ('object' === typeof tlsOptions) {
                opts = tlsOptions;
            }
            else {
                opts = {};
            }
            opts.socket = this.stream;
            this.stream.removeAllListeners();
            try {
                this.stream = tls.connect(opts, () => {
                    done();
                });
                this.stream.on('error', (error) => {
                    this.handlers.error(error);
                });
                this.stream.on('close', () => {
                    this.handlers.close();
                });
                this.stream.on('data', (data) => {
                    this.handlers.data(data);
                });
            }
            catch (err) {
                this.handlers.error(new error_1.NatsError(error_1.Messages.getMessage(error_1.ErrorCode.SSL_ERR), error_1.ErrorCode.SSL_ERR, err));
            }
        }
    }
    write(data) {
        // if (typeof data === 'string') {
        //     console.log('>', [data]);
        // } else {
        //     console.log('>', [data.toString('binary')]);
        // }
        if (this.stream) {
            this.stream.write(data);
        }
    }
    destroy() {
        if (!this.stream) {
            return;
        }
        if (this.closed) {
            this.stream.removeAllListeners();
        }
        this.stream.destroy();
        this.stream = null;
    }
    close() {
        this.closed = true;
        this.destroy();
    }
    pause() {
        if (this.stream) {
            this.stream.pause();
        }
    }
    resume() {
        if (this.stream && this.stream.isPaused()) {
            this.stream.resume();
        }
    }
    dialDuration() {
        return this.dialTime;
    }
}
exports.TCPTransport = TCPTransport;
//# sourceMappingURL=tcptransport.js.map

/***/ }),

/***/ 829:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var crc16_1 = __webpack_require__(429);
var ed25519 = __webpack_require__(196);
var nkeys_1 = __webpack_require__(509);
var util = __webpack_require__(834);
var base32_1 = __webpack_require__(974);
var Codec = /** @class */ (function () {
    function Codec() {
    }
    Codec.encode = function (prefix, src) {
        if (!Buffer.isBuffer(src)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.SerializationError);
        }
        if (!nkeys_1.Prefixes.isValidPrefix(prefix)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        return Codec._encode(false, prefix, src);
    };
    Codec.encodeSeed = function (role, src) {
        if (!nkeys_1.Prefixes.isValidPublicPrefix(role)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        if (!Buffer.isBuffer(src)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.ApiError);
        }
        if (src.byteLength != ed25519.sign.seedLength) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidSeedLen);
        }
        return Codec._encode(true, role, src);
    };
    Codec.decode = function (expected, src) {
        if (!nkeys_1.Prefixes.isValidPrefix(expected)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        var raw = Codec._decode(src);
        if (raw[0] !== expected) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        return raw.slice(1);
    };
    Codec.decodeSeed = function (src) {
        var raw = Codec._decode(src);
        var prefix = Codec._decodePrefix(raw);
        if (prefix[0] != nkeys_1.Prefix.Seed) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidSeed);
        }
        if (!nkeys_1.Prefixes.isValidPublicPrefix(prefix[1])) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidPrefixByte);
        }
        return ({ buf: raw.slice(2), prefix: prefix[1] });
    };
    // unsafe encode no prefix/role validation
    Codec._encode = function (seed, role, payload) {
        // offsets for this token
        var payloadOffset = seed ? 2 : 1;
        var payloadLen = payload.byteLength;
        var checkLen = 2;
        var cap = payloadOffset + payloadLen + checkLen;
        var checkOffset = payloadOffset + payloadLen;
        var raw = Buffer.alloc(cap);
        // make the prefixes human readable when encoded
        if (seed) {
            var encodedPrefix = Codec._encodePrefix(nkeys_1.Prefix.Seed, role);
            encodedPrefix.copy(raw, 0, 0);
        }
        else {
            raw[0] = role;
        }
        payload.copy(raw, payloadOffset, 0);
        //calculate the checksum write it LE
        var checksum = crc16_1.crc16.checksum(raw.slice(0, checkOffset));
        raw.writeUInt16LE(checksum, checkOffset);
        return base32_1.base32.encode(raw);
    };
    // unsafe decode - no prefix/role validation
    Codec._decode = function (src) {
        if (src.byteLength < 4) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidEncoding);
        }
        var raw;
        try {
            raw = base32_1.base32.decode(src);
        }
        catch (ex) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidEncoding, ex);
        }
        var checkOffset = raw.byteLength - 2;
        var checksum = raw.readUInt16LE(checkOffset);
        var payload = raw.slice(0, checkOffset);
        if (!crc16_1.crc16.validate(payload, checksum)) {
            throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.InvalidChecksum);
        }
        return payload;
    };
    Codec._encodePrefix = function (kind, role) {
        // In order to make this human printable for both bytes, we need to do a little
        // bit manipulation to setup for base32 encoding which takes 5 bits at a time.
        var b1 = kind | (role >> 5);
        var b2 = (role & 31) << 3; // 31 = 00011111
        return Buffer.from([b1, b2]);
    };
    Codec._decodePrefix = function (raw) {
        // Need to do the reverse from the printable representation to
        // get back to internal representation.
        var b1 = raw[0] & 248; // 248 = 11111000
        var b2 = (raw[0] & 7) << 5 | ((raw[1] & 248) >> 3); // 7 = 00000111
        var a = new Uint8Array(2);
        a[0] = b1;
        a[1] = b2;
        return a;
    };
    Codec.toArrayBuffer = util.toArrayBuffer();
    return Codec;
}());
exports.Codec = Codec;
//# sourceMappingURL=codec.js.map

/***/ }),

/***/ 834:
/***/ (function(__unusedmodule, exports) {

"use strict";

/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function dump(buf, msg) {
    if (msg) {
        console.log(msg);
    }
    var a = [];
    for (var i = 0; i < buf.byteLength; i++) {
        if (i % 8 === 0) {
            a.push('\n');
        }
        var v = buf[i].toString(16);
        if (v.length === 1) {
            v = '0' + v;
        }
        a.push(v);
    }
    console.log(a.join('  '));
}
exports.dump = dump;
function node6(buf) {
    // @ts-ignore
    return buf;
}
function node8(buf) {
    return buf.buffer;
}
function parseNodeVersion() {
    var ma = process.version.match(/^v(\d+).+/i);
    if (ma && ma.length > 1) {
        return parseInt(ma[1], 10);
    }
    return 0;
}
// Node < 8 needs different handling on how a Buffer
// is converted to ArrayBuffer. These older nodes
// don't have the '.buffer' property.
function toArrayBuffer() {
    if (parseNodeVersion() < 8) {
        return node6;
    }
    else {
        return node8;
    }
}
exports.toArrayBuffer = toArrayBuffer;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ 835:
/***/ (function(module) {

module.exports = require("url");

/***/ }),

/***/ 932:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2019 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(614);
/**
 * @hidden
 */
class Subscriptions extends events_1.EventEmitter {
    constructor() {
        super();
        this.subs = {};
        this.sidCounter = 0;
        this.length = 0;
        events_1.EventEmitter.call(this);
    }
    add(s) {
        this.sidCounter++;
        this.length++;
        s.sid = this.sidCounter;
        this.subs[s.sid] = s;
        let se = { sid: s.sid, subject: s.subject, queue: s.queue };
        this.emit('subscribe', se);
        return s;
    }
    setMux(s) {
        this.mux = s;
        return s;
    }
    getMux() {
        return this.mux;
    }
    get(sid) {
        if (sid in this.subs) {
            return this.subs[sid];
        }
        return null;
    }
    all() {
        let buf = [];
        for (let sid in this.subs) {
            let sub = this.subs[sid];
            buf.push(sub);
        }
        return buf;
    }
    cancel(s) {
        if (s && s.timeout) {
            clearTimeout(s.timeout);
            delete s.timeout;
        }
        if (s.sid in this.subs) {
            let sub = this.subs[s.sid];
            let se = { sid: sub.sid, subject: sub.subject, queue: sub.queue };
            delete this.subs[s.sid];
            this.length--;
            this.emit('unsubscribe', se);
        }
    }
    close() {
        let subs = this.all();
        for (let i = 0; i < subs.length; i++) {
            this.cancel(subs[i]);
        }
    }
}
exports.Subscriptions = Subscriptions;
//# sourceMappingURL=subscriptions.js.map

/***/ }),

/***/ 974:
/***/ (function(__unusedmodule, exports) {

"use strict";

/*
 * Copyright 2018 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Fork of https://github.com/LinusU/base32-encode
// and https://github.com/LinusU/base32-decode to support returning
// buffers without padding.
var base32 = /** @class */ (function () {
    function base32() {
    }
    base32.encode = function (src) {
        var bits = 0;
        var value = 0;
        var a = new Uint8Array(src);
        var buf = Buffer.allocUnsafe(src.byteLength * 2);
        var j = 0;
        for (var i = 0; i < a.byteLength; i++) {
            value = (value << 8) | a[i];
            bits += 8;
            while (bits >= 5) {
                var index = (value >>> (bits - 5)) & 31;
                buf[j++] = base32.alphabet.charAt(index).charCodeAt(0);
                bits -= 5;
            }
        }
        if (bits > 0) {
            var index = (value << (5 - bits)) & 31;
            buf[j++] = base32.alphabet.charAt(index).charCodeAt(0);
        }
        return buf.slice(0, j);
    };
    base32.decode = function (src) {
        var bits = 0;
        var byte = 0;
        var j = 0;
        var a = new Uint8Array(src);
        var out = Buffer.alloc(a.byteLength * 5 / 8 | 0);
        for (var i = 0; i < a.byteLength; i++) {
            var v = String.fromCharCode(a[i]);
            var vv = base32.alphabet.indexOf(v);
            if (vv === -1) {
                throw new Error("Illegal Base32 character: " + a[i]);
            }
            byte = (byte << 5) | vv;
            bits += 5;
            if (bits >= 8) {
                out[j++] = (byte >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }
        return out.slice(0, j);
    };
    base32.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    return base32;
}());
exports.base32 = base32;
//# sourceMappingURL=base32.js.map

/***/ }),

/***/ 998:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

/*
 * Copyright 2018-2020 The NATS Authors
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ed25519 = __webpack_require__(196);
var codec_1 = __webpack_require__(829);
var nkeys_1 = __webpack_require__(509);
/**
 * KeyPair capable of verifying only
 */
var PublicKey = /** @class */ (function () {
    function PublicKey(publicKey) {
        this.publicKey = publicKey;
    }
    PublicKey.prototype.getPublicKey = function () {
        return this.publicKey;
    };
    PublicKey.prototype.getPrivateKey = function () {
        throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.PublicKeyOnly);
    };
    PublicKey.prototype.getSeed = function () {
        throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.PublicKeyOnly);
    };
    PublicKey.prototype.sign = function (_) {
        throw new nkeys_1.NKeysError(nkeys_1.NKeysErrorCode.CannotSign);
    };
    PublicKey.prototype.verify = function (input, sig) {
        var buf = codec_1.Codec._decode(this.publicKey);
        return ed25519.sign.detached.verify(input, sig, buf.slice(1));
    };
    return PublicKey;
}());
exports.PublicKey = PublicKey;
//# sourceMappingURL=public.js.map

/***/ })

/******/ });