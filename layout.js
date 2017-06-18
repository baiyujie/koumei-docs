(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("avalon2"));
	else if(typeof define === 'function' && define.amd)
		define(["avalon2"], factory);
	else if(typeof exports === 'object')
		exports["layout"] = factory(require("avalon2"));
	else
		root["layout"] = factory(root["avalon"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var layoutComponent = avalon.component('ts-layout', {
    template: "<div class=\"koumei-layout\" :css=\"@style\" :class=\"@className\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        style: {},
        className: ''
    }
});
layoutComponent.extend({
    displayName: 'ts-layout-sider',
    template: "<div class=\"koumei-layout-sider\" :css=\"@style\" :class=\"@className\" :class-1=\"[@fixed?'koumei-layout-fixed-sider':'']\"><div class=\"koumei-layout-sider-inner\"><slot /></div></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false,
        width: '300px'
    }
});
layoutComponent.extend({
    displayName: 'ts-layout-header',
    template: "<div class=\"koumei-layout-header\" :css=\"@style\" :class=\"@className\" :class-1=\"[@fixed?'koumei-layout-fixed-header':'']\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false,
        width: '60px'
    }
});
layoutComponent.extend({
    displayName: 'ts-layout-content',
    template: "<div class=\"koumei-layout-content\" :css=\"@style\" :class=\"@className\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false
    }
});
layoutComponent.extend({
    displayName: 'ts-layout-footer',
    template: "<div class=\"koumei-layout-footer\" :css=\"@style\" :class=\"@className\" :class-1=\"[@fixed?'koumei-layout-fixed-footer':'']\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false,
        width: '60px'
    }
});


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(15);
__webpack_require__(22);


/***/ })

/******/ });
});