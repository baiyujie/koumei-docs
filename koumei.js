(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("avalon2"), require("moment"), require("noty"), require("jquery"), require("async-validator"), require("koumei-fileup-loader"), require("bootbox"), require("dom-align"));
	else if(typeof define === 'function' && define.amd)
		define(["avalon2", "moment", "noty", "jquery", "async-validator", "koumei-fileup-loader", "bootbox", "dom-align"], factory);
	else if(typeof exports === 'object')
		exports["koumei"] = factory(require("avalon2"), require("moment"), require("noty"), require("jquery"), require("async-validator"), require("koumei-fileup-loader"), require("bootbox"), require("dom-align"));
	else
		root["koumei"] = factory(root["avalon"], root["moment"], root["noty"], root["$"], root["Schema"], root["Uploader"], root["bootbox"], root["domAlign"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_85__, __WEBPACK_EXTERNAL_MODULE_86__, __WEBPACK_EXTERNAL_MODULE_87__, __WEBPACK_EXTERNAL_MODULE_88__, __WEBPACK_EXTERNAL_MODULE_89__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 83);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
exports["default"] = avalon.component('ts-control', {
    template: '&nbsp;',
    defaults: {
        $formItem: null,
        $rules: null,
        value: '',
        col: '',
        placeholder: '',
        width: 'x',
        onChange: avalon.noop,
        emitValue: function (e) {
            var v = e.target.value;
            this.$formItem && this.$formItem.onFormChange({
                name: this.col, value: v, denyValidate: e.denyValidate
            });
        },
        handleChange: function (e) {
            this.emitValue(e);
            this.onChange(e);
        }
    }
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var koumei_util_1 = __webpack_require__(3);
function emitToFormItem(vmodel, options) {
    if (options === void 0) { options = {}; }
    vmodel.$formItem = koumei_util_1.findParentComponent(vmodel, 'ts-form-item');
    if (vmodel.$formItem === null) {
        return;
    }
    vmodel.$formItem.onFieldChange(__assign({ name: vmodel.col, rules: vmodel.$rules, value: vmodel.value, denyValidate: true }, options));
}
exports.emitToFormItem = emitToFormItem;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
function findParentComponent(vm, ctype) {
    var parent = vm.$element.parentElement;
    while (parent) {
        if (parent._vm_ && (!ctype || parent._ctype_ === ctype)) {
            return parent._vm_;
        }
        parent = parent.parentElement;
    }
    return null;
}
exports.findParentComponent = findParentComponent;
function parseSlotToVModel(vmodel, vnodes) {
    if (vnodes === undefined) {
        vnodes = vmodel.$render.root ? vmodel.$render.root.children : [];
    }
    vnodes.forEach(function (vnode) {
        if (!vnode || !vnode.nodeName || vnode.dom.nodeType !== 1)
            return true;
        var slotName = vnode.dom.getAttribute('slot');
        if (slotName) {
            delete vnode.props[':skip'];
            delete vnode.props['ts-skip'];
            vmodel[slotName] = avalon.vdom(vnode, 'toHTML');
        }
        else {
            parseSlotToVModel(vmodel, vnode.children);
        }
    });
}
exports.parseSlotToVModel = parseSlotToVModel;
function getChildTemplateDescriptor(vmodel, render) {
    if (render === void 0) { render = vmodel.$render; }
    if (render.directives === undefined) {
        return [];
    }
    return render.directives.reduce(function (acc, action) {
        if (action.is) {
            acc.push({
                is: action.is,
                props: action.value,
                inlineTemplate: action.fragment,
                children: getChildTemplateDescriptor(vmodel, action.innerRender || { directives: [] })
            });
        }
        return acc;
    }, []);
}
exports.getChildTemplateDescriptor = getChildTemplateDescriptor;
function debounce(func, wait, immediate) {
    if (wait === void 0) { wait = 300; }
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = this;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var koumei_util_1 = __webpack_require__(3);
if (avalon.msie <= 8) {
    var doc = document;
    var head = doc.getElementsByTagName('head')[0];
    var style = doc.createElement('style');
    var cssStr = "\n        .koumei-checkbox-inner-ie input {\n            left: 0;\n            position: static !important;\n            margin-left: 0 !important;\n            margin-top: 6px !important;\n        }\n        .koumei-checkbox-inner-ie span {\n            display: none !important;\n        }\n    ";
    style.setAttribute('type', 'text/css');
    if (style.styleSheet) {
        style.styleSheet.cssText = cssStr;
    }
    else {
        style.appendChild(doc.createTextNode(cssStr));
    }
    head.appendChild(style);
}
avalon.component('ts-checkbox', {
    soleSlot: 'label',
    template: __webpack_require__(43),
    defaults: {
        wrapper: 'checkbox',
        label: '',
        checked: false,
        group: false,
        disabled: false,
        onChange: avalon.noop,
        flush: avalon.noop,
        helpId: '',
        onInit: function (event) {
            this.helpId = this.$id;
            // // inline在IE8下显示有问题，待解决
            // if (this.inline != void 0) {
            //     this.wrapper = 'checkbox-inline';
            // }
        },
        onReady: function (event) {
            koumei_util_1.parseSlotToVModel(this);
        },
        onDispose: function (vm, el) {
        }
    }
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(79);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_control_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
__webpack_require__(5);
ts_control_1["default"].extend({
    displayName: 'ts-checkbox-group',
    template: __webpack_require__(42),
    defaults: {
        value: [],
        disabled: false,
        options: [],
        selection: [],
        toggleOption: function (option) {
            var optionIndex = this.selection.indexOf(option.value);
            if (optionIndex === -1) {
                this.selection.push(option.value);
            }
            else {
                this.selection.remove(option.value);
            }
            this.handleChange({
                target: { value: this.selection.toJSON() },
                type: 'checkbox-group'
            });
        },
        mapValueToSelection: function (value) {
            this.selection = this.options.filter(function (o) { return value.contains(o.value); }).map(function (o) { return o.value; });
        },
        onInit: function (event) {
            var _this = this;
            utils_1.emitToFormItem(this);
            this.$watch('value', function (v) {
                _this.mapValueToSelection(v);
                _this.handleChange({
                    target: { value: v.toJSON() },
                    denyValidate: true,
                    type: 'checkbox-group'
                });
            });
            this.mapValueToSelection(this.value);
        },
        onReady: function (event) {
            //vm.elHiddenInput = $(el).find('input:hidden');
        },
        onDispose: function (event) {
        }
    }
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_loading_directive_1 = __webpack_require__(70);
exports.Loading = ts_loading_directive_1.Loading;
__webpack_require__(34);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
/**
 * 分页组件
 * @prop {Number} [current=1] 当前页
 * @prop {Number} [pageSize=10] 每页的数据量
 * @prop {Number} total 数据总量
 * @event {Function} onChange 当页码改变时触发，参数current
 *
 * @example
 * ```
 * <ts-pagination :widget="{total:100,onChange:@handlePageChange}"></ts-pagination>
 *
 * <ts-pagination :widget="{current:@currentPage,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ts-pagination>
 * ```
 */
avalon.component('ts-pagination', {
    template: __webpack_require__(49),
    defaults: {
        current: 1,
        pageSize: 10,
        total: 0,
        prevPage: function () {
            if (this.current > 1) {
                this.onChange(--this.current);
            }
        },
        nextPage: function () {
            if (this.current < Math.ceil(this.total / this.pageSize)) {
                this.onChange(++this.current);
            }
        },
        onChange: avalon.noop,
        onInit: function (event) {
        },
        onReady: function (event) {
        },
        onDispose: function (event) {
        }
    }
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_control_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
__webpack_require__(12);
ts_control_1["default"].extend({
    displayName: 'ts-radio-group',
    template: __webpack_require__(50),
    defaults: {
        value: '',
        disabled: false,
        options: [],
        selected: '',
        toggleOption: function (e, option) {
            this.selected = option.value;
            this.handleChange({
                target: { value: this.selected },
                type: 'radio-group'
            });
        },
        helpId: '',
        mapValueToSelected: function (value) {
            this.selected = value;
        },
        onInit: function (event) {
            var _this = this;
            this.helpId = this.$id;
            utils_1.emitToFormItem(this);
            this.$watch('value', function (v) {
                _this.mapValueToSelected(v);
                _this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'radio-group'
                });
            });
            this.mapValueToSelected(this.value);
        },
        onReady: function (event) {
        },
        onDispose: function (event) {
        }
    }
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(75);
__webpack_require__(74);
__webpack_require__(37);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var koumei_util_1 = __webpack_require__(3);
if (avalon.msie <= 8) {
    var doc = document;
    var head = doc.getElementsByTagName('head')[0];
    var style = doc.createElement('style');
    var cssStr = "\n        .koumei-radio-inner-ie input {\n            left: 0;\n            position: static !important;\n            margin-left: 0 !important;\n            margin-top: 6px !important;\n        }\n        .koumei-radio-inner-ie span {\n            display: none !important;\n        }\n    ";
    style.setAttribute('type', 'text/css');
    if (style.styleSheet) {
        style.styleSheet.cssText = cssStr;
    }
    else {
        style.appendChild(doc.createTextNode(cssStr));
    }
    head.appendChild(style);
}
avalon.component('ts-radio', {
    soleSlot: 'label',
    template: __webpack_require__(51),
    defaults: {
        wrapper: 'radio',
        label: '',
        checked: '',
        value: '',
        name: '',
        group: false,
        disabled: false,
        onChange: avalon.noop,
        helpId: '',
        onInit: function (event) {
            this.helpId = this.$id;
        },
        onReady: function (event) {
            koumei_util_1.parseSlotToVModel(this);
        },
        onDispose: function (vm, el) {
        }
    }
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var moment = __webpack_require__(4);
var OPTION_HEIGHT = 24;
avalon.component('ts-timepicker-view', {
    template: __webpack_require__(56),
    defaults: {
        value: '',
        currentHour: 0,
        currentMinute: 0,
        currentSecond: 0,
        hourOptions: avalon.range(24).map(function (n) { return ('0' + n).substr(-2); }),
        minuteOptions: avalon.range(60).map(function (n) { return ('0' + n).substr(-2); }),
        secondOptions: avalon.range(60).map(function (n) { return ('0' + n).substr(-2); }),
        onChange: avalon.noop,
        select: function (el, type) {
            this.$element.querySelector('.koumei-timepicker-view-select[name=' + type + '-options]').scrollTop = el * 24;
            if (type === 'hour') {
                this.currentHour = el;
            }
            else if (type === 'minute') {
                this.currentMinute = el;
            }
            else {
                this.currentSecond = el;
            }
            this.onChange({
                target: {
                    hour: this.currentHour,
                    minute: this.currentMinute,
                    second: this.currentSecond
                },
                type: 'timepicker-view-changed'
            });
        },
        onInit: function () {
            var _this = this;
            this.$watch('value', function (v) {
                var m = moment(v.split(','));
                _this.currentHour = m.hour();
                _this.currentMinute = m.minute();
                _this.currentSecond = m.second();
                _this.$element.querySelector('.koumei-timepicker-view-select[name=hour-options]').scrollTop = _this.currentHour * OPTION_HEIGHT;
                _this.$element.querySelector('.koumei-timepicker-view-select[name=minute-options]').scrollTop = _this.currentMinute * OPTION_HEIGHT;
                _this.$element.querySelector('.koumei-timepicker-view-select[name=second-options]').scrollTop = _this.currentSecond * OPTION_HEIGHT;
            });
            this.$fire('value', this.value);
        }
    }
});


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(5);
__webpack_require__(7);
__webpack_require__(32);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(64);
__webpack_require__(33);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(65);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var avalon = __webpack_require__(0);
var Schema = __webpack_require__(86);
function createForm(options) {
    return new Form(options);
}
exports.createForm = createForm;
var defaultOptions = {
    record: {},
    autoAsyncChange: true,
    onFieldsChange: avalon.noop
};
function Form(options) {
    this.cachedRecord = {};
    this.fields = {};
    this.all = {};
    avalon.mix(this, avalon.mix(true, {}, defaultOptions), options);
}
Form.prototype.setFieldsValue = function (fields) {
    var _this = this;
    if (!this.autoAsyncChange) {
        Object.keys(fields).forEach(function (name) {
            setValue(_this.cachedRecord, name, fields[name].value);
        });
        return;
    }
    Object.keys(fields).forEach(function (name) {
        var field = fields[name];
        setValue(_this.record, name, field.value);
        if (!field.denyValidate && _this.fields[name]) {
            _this.validateField(name, _this.fields[name]).then(function (result) {
                if (result.isOk) {
                    _this.trigger('error' + result.name, []);
                }
                else {
                    _this.trigger('error' + result.name, [{
                            message: result.message
                        }]);
                }
            });
        }
    });
    this.onFieldsChange(fields, this.record);
};
Form.prototype.addFields = function (fields) {
    var _this = this;
    Object.keys(fields).forEach(function (name) {
        _this.fields[name] = fields[name];
    });
};
Form.prototype.on = function (type, listener) {
    (this.all[type] || (this.all[type] = [])).push(listener);
};
Form.prototype.trigger = function (type, payload) {
    (this.all[type] || []).map(function (handler) { handler(payload); });
};
Form.prototype.validateField = function (fieldName, field) {
    return __awaiter(this, void 0, void 0, function () {
        var rules, value, result, validator, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    rules = field.rules;
                    value = getValue(this.record, fieldName);
                    result = { isOk: true, name: fieldName };
                    if (!rules)
                        return [2 /*return*/, result];
                    validator = new Schema((_a = {},
                        _a[fieldName] = rules,
                        _a));
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            validator.validate((_a = {}, _a[fieldName] = value, _a), function (errors, fields) {
                                if (errors) {
                                    resolve({
                                        isOk: false, name: fieldName, message: errors[0].message
                                    });
                                }
                                else {
                                    resolve({
                                        isOk: true, name: fieldName
                                    });
                                }
                            });
                            var _a;
                        })];
                case 1:
                    result = _b.sent();
                    return [2 /*return*/, result];
            }
        });
    });
};
Form.prototype.validateFields = function (fields) {
    var _this = this;
    if (fields === void 0) { fields = this.fields; }
    var flatRecord = {}, ruleMap = {};
    if (!this.autoAsyncChange) {
        this.record = avalon.mix(true, {}, this.record, this.cachedRecord);
    }
    Object.keys(fields).map(function (name) {
        ruleMap[name] = fields[name].rules;
        flatRecord[name] = getValue(_this.record, name);
    });
    var validator = new Schema(ruleMap);
    return new Promise(function (resolve, reject) {
        validator.validate(flatRecord, function (errors, fields) {
            var errorFields = Object.keys(fields || {});
            var isAllValid = true;
            Object.keys(_this.fields).map(function (name) {
                if (~errorFields.indexOf(name)) {
                    isAllValid = false;
                    _this.trigger('error' + name, fields[name]);
                }
                else {
                    _this.trigger('error' + name, []);
                }
            });
            resolve(isAllValid);
        });
    });
};
Form.prototype.resetFields = function (fields) {
    if (fields === void 0) { fields = this.fields; }
    this.record = {};
    this.trigger('reset', fields);
};
/**
 * 根据表达式构给对象赋值，属性路径中最多只允许存在一个数组
 * @param {*} record 数据对象
 * @param {String} expr 对象属性路径表达式
 * @param {*} val 值
 */
function setValue(record, expr, val) {
    var rSplit = /\.|\].|\[|\]/;
    var temp = record, prop;
    expr = expr.split(rSplit).filter(function (prop) { return !!prop; });
    var valType = Object.prototype.toString.call(val);
    var mirrorVal;
    if (valType == '[object Array]') {
        mirrorVal = avalon.mix(true, {}, { t: val }).t;
    }
    else if (valType == '[object Object]') {
        mirrorVal = avalon.mix(true, {}, val);
    }
    else {
        mirrorVal = val;
    }
    while (prop = expr.shift()) {
        if (expr.length === 0) {
            temp[prop] = mirrorVal;
        }
        else {
            temp = temp[prop] = temp[prop] || {};
        }
    }
}
/**
 * 根据表达式构从对象取值，属性路径中最多只允许存在一个数组
 * @param {*} record 数据对象
 * @param {String} expr 对象属性路径表达式
 */
function getValue(record, expr) {
    var rSplit = /\.|\].|\[|\]/;
    var temp = record, prop;
    expr = expr.split(rSplit).filter(function (prop) { return !!prop; });
    while ((prop = expr.shift()) && temp) {
        temp = temp[prop];
    }
    return temp;
}


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(67);
__webpack_require__(66);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(68);


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(35);
__webpack_require__(71);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_message_1 = __webpack_require__(72);
exports["default"] = ts_message_1["default"];


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_notification_1 = __webpack_require__(73);
exports["default"] = ts_notification_1["default"];


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(12);
__webpack_require__(10);
__webpack_require__(36);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
__webpack_require__(5);
__webpack_require__(76);
__webpack_require__(9);
var koumei_util_1 = __webpack_require__(3);
__webpack_require__(8);
var defaultPagination = function () {
    return {
        current: 1, pageSize: 10, total: NaN, onChange: avalon.noop
    };
};
avalon.component('ts-table', {
    soleSlot: 'header',
    template: __webpack_require__(54),
    defaults: {
        header: '',
        columns: [],
        data: [],
        key: 'id',
        loading: false,
        needSelection: false,
        checked: [],
        selection: [],
        isAllChecked: false,
        onSelect: avalon.noop,
        onSelectAll: avalon.noop,
        selectionChange: avalon.noop,
        handleCheckAll: function (e) {
            var _this = this;
            var data = this.getCurrentPageData();
            if (e.target.checked) {
                data.forEach(function (record) {
                    _this.checked.ensure(record[_this.key]);
                    _this.selection.ensure(record);
                });
            }
            else {
                if (!isNaN(this.paginationConfig.total)) {
                    this.checked.clear();
                    this.selection.clear();
                }
                else {
                    this.checked.removeAll(function (el) { return data.map(function (record) { return record[_this.key]; }).indexOf(el) !== -1; });
                    this.selection.removeAll(function (el) { return data.indexOf(el) !== -1; });
                }
            }
            this.selectionChange(this.checked, this.selection.$model);
            this.onSelectAll(e.target.checked, this.selection.$model);
        },
        handleCheck: function (checked, record) {
            if (checked) {
                this.checked.ensure(record[this.key]);
                this.selection.ensure(record);
            }
            else {
                this.checked.remove(record[this.key]);
                this.selection.remove(record);
            }
            this.selectionChange(this.checked, this.selection.$model);
            this.onSelect(record.$model, checked, this.selection.$model);
        },
        actions: avalon.noop,
        handle: function (type, col, record, $index) {
            var extra = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                extra[_i - 4] = arguments[_i];
            }
            var text = record[col.dataIndex].$model || record[col.dataIndex];
            this.actions.apply(this, [type, text, record.$model, $index].concat(extra));
        },
        pagination: defaultPagination(),
        paginationConfig: defaultPagination(),
        handlePageChange: function (currentPage) {
            this.paginationConfig.onChange(currentPage);
            this.paginationConfig.current = currentPage;
            this.$fire('checked.length', this.checked.length);
            this.onChange(this.paginationConfig.$model);
        },
        getCurrentPageData: function () {
            return !isNaN(this.paginationConfig.total) ? this.data : this.data.slice(this.paginationConfig.pageSize * (this.paginationConfig.current - 1), this.paginationConfig.pageSize * this.paginationConfig.current);
        },
        $computed: {
            total: function () {
                return !isNaN(this.paginationConfig.total) ? this.paginationConfig.total : this.data.length;
            }
        },
        onChange: avalon.noop,
        onInit: function (event) {
            var _this = this;
            var descriptor = koumei_util_1.getChildTemplateDescriptor(this);
            descriptor.forEach(function (column) {
                if (column.props.type == 'selection') {
                    _this.key = column.props.dataIndex || _this.key;
                    _this.needSelection = true;
                    return false;
                }
            });
            this.columns = getColumnConfig(descriptor);
            this.$watch('checked.length', function (newV) {
                var currentPageKeys = _this.getCurrentPageData()
                    .map(function (record) { return record[_this.key]; });
                _this.isAllChecked = currentPageKeys
                    .filter(function (key) { return _this.checked.contains(key); })
                    .length == currentPageKeys.length;
            });
            this.$watch('data', function (v) {
                _this.isAllChecked = false;
                _this.checked.clear();
                _this.selection.clear();
            });
            this.$watch('data.length', function (v) {
                _this.isAllChecked = false;
                _this.checked.clear();
                _this.selection.clear();
            });
            this.$watch('pagination', function (v) {
                avalon.mix(_this.paginationConfig, v);
            });
            this.$watch('pagination.current', function (v) {
                _this.paginationConfig.current = v;
            });
            this.$watch('pagination.pageSize', function (v) {
                _this.paginationConfig.pageSize = v;
            });
            this.$watch('pagination.total', function (v) {
                _this.paginationConfig.total = v;
            });
            this.$watch('pagination.onChange', function (v) {
                _this.paginationConfig.onChange = v;
            });
            this.$fire('pagination', this.pagination.$model);
        },
        onReady: function (event) {
        },
        onDispose: function (vm, el) {
        }
    }
});
function getColumnConfig(descriptor, level) {
    if (level === void 0) { level = 1; }
    return descriptor.reduce(function (acc, column) {
        if (column.is != 'ts-table-header')
            return acc;
        if (column.props.type == 'selection') {
            return acc;
        }
        var inlineTemplate = column.inlineTemplate;
        inlineTemplate = inlineTemplate.replace(/(ts-|:)skip="[^"]*"/g, '');
        inlineTemplate = inlineTemplate.replace(/<\s*ts-table-header[^>]*>.*<\/\s*ts-table-header\s*>/g, '');
        inlineTemplate = inlineTemplate.replace(/(ts-|:)click="handle\(([^"]*)\)"/g, function ($0, $1, $2, $3) {
            return ($1 + "click=\"handle(" + $2 + ",)\"").replace(/,/, ', col, record, $index,').replace(/,\)/, ')');
        });
        acc.push({
            title: column.props.title,
            dataIndex: column.props.dataIndex || '',
            template: /^\s*$/.test(inlineTemplate) ? '{{record.' + column.props.dataIndex + '}}' : inlineTemplate
        });
        return acc.concat(getColumnConfig(column.children, level + 1));
    }, []);
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(77);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(78);
__webpack_require__(38);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(82);
__webpack_require__(39);


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 39 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-calendar\">\n    <table class=\"koumei-calendar-year-view\">\n        <tbody>\n            <tr :for=\"（i, row) in @table\">\n                <td class=\"koumei-calendar-cell\"\n                    :class=\"[\n                                (@isSelected(cell) ? 'koumei-calendar-selected-day' : ''),\n                                (@view > 1 && (i + j === 0 || i * j === 6) ? 'koumei-calendar-prev-month-cell' : '')\n                            ]\"\n                    :for=\"(j, cell) in row\">\n                    <div class=\"koumei-calendar-date\" :click=\"@handleCellClick(cell)\">{{cell.label}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-calendar\">\n    <div class=\"row\" ts-if=\"@showHeader\">\n        <div class=\"col-md-2 col-md-offset-4\">\n            <ts-select :widget=\"{value:[@currentYear],options:@currentYearOptions,onChange:@handleYearChange}\"></ts-select>\n        </div>\n        <div class=\"col-md-2\">\n            <ts-select :widget=\"{value:[@currentMonth],options:@monthOptions,onChange:@handleMonthChange}\"></ts-select>\n        </div>\n    </div>\n    <table>\n        <thead>\n            <tr>\n                <th class=\"koumei-calendar-column-header\" :for=\"day in @weekdays\">{{day}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"week in @table\">\n                <td class=\"koumei-calendar-cell\" :class=\"el.className\" :for=\"el in week\">\n                    <div class=\"koumei-calendar-date\" :click=\"@handleDateClick(el) | stop\">{{el.date}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-group\">\n    <ts-checkbox \n        :widget=\"{\n            checked:@selection.indexOf(option.value)!=-1,\n            group:true,\n            onChange:function(){\n                @toggleOption(option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ts-checkbox>\n</div>"

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"@wrapper\" class=\"koumei-checkbox\" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"koumei-checkbox-inner koumei-checkbox-inner-ie\">\n        <input type=\"checkbox\"\n            :attr=\"{id:@helpId,disabled:@disabled}\"\n            :duplex-checked=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text\"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>"

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-datepicker-panel\" style=\"overflow: auto\">\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 0\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 1, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <a class=\"koumei-datepicker-prev-month-btn\" :click=\"mutate('subtract', 1, 'months')\">\n            <i class=\"fa fa-angle-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(1)\">{{@currentMonth}}</a>\n            <a class=\"koumei-datepicker-year-select\" :click=\"@changeView(2)\">{{@currentYear}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'months')\">\n            <i class=\"fa fa-angle-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 1\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 1, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(2)\">{{@currentYear}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 2\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 10, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(3)\">{{@startOfDecade + '-' + (@startOfDecade + 9)}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 10, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 3\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 100, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>{{@startOfCentury + '-' + (@startOfCentury + 99)}}</span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 100, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode < 0 && @showTime\">\n        <span>\n            <a class=\"koumei-datepicker-month-select\">{{@currentMonth}}</a>\n            <a class=\"koumei-datepicker-month-select\">{{@currentDay}}</a>\n            <a class=\"koumei-datepicker-year-select\">{{@currentYear}}</a>\n        </span>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode === 0\">\n        <ts-calendar :widget=\"{value:@currentDateArray,showHeader:false,disabledDate:@disabledDate,onChange:@handleCalendarChange}\"></ts-calendar>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode > 0\">\n        <ts-calendar-year-view :widget=\"{currentMonth:@currentMonth,currentYear:@currentYear,view:@viewMode,onSelect:@handleYearViewSelect}\"></ts-calendar-year-view>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode === -1\">\n        <ts-timepicker-view :widget=\"{value:@currentDateArray,onChange:@handleTimepickerChange}\"></ts-timepicker-view>\n    </div>\n    <div class=\"koumei-datepicker-panel-footer\" :visible=\"@viewMode === 0 && !@showTime\">\n        <span class=\"koumei-datepicker-panel-footer-btn\">\n            <a class=\"koumei-datepicker-panel-today-btn\" :click=\"@today\">今天</a>\n        </span>\n    </div>\n    <div class=\"koumei-datepicker-panel-footer\" :visible=\"@viewMode <= 0 && @showTime\">\n        <span class=\"koumei-datepicker-panel-footer-btn\">\n            <a class=\"koumei-datepicker-panel-now-btn\" :click=\"@today\">此刻</a>\n            <a class=\"koumei-datepicker-panel-ok-btn\" :click=\"@complete\">确定</a>\n            <a class=\"koumei-datepicker-panel-timepicker-btn\" :click=\"@changeView(@viewMode > -1 ? -1 : 0)\">{{@viewMode > -1 ? '选择时间' : '选择日期'}}</a>\n        </span>\n    </div>\n</div>"

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-datepicker\" :css=\"{width:@width}\">\n    <i class=\"fa fa-calendar koumei-datepicker-icon\"></i>\n    <i class=\"fa fa-times-circle koumei-datepicker-clear\" :if=\"@selected.length\" :click=\"@clear\"></i>\n    <input type=\"text\"\n        class=\"form-control koumei-datepicker-input\"\n        :click=\"@handleClick\"\n        readonly\n        :attr=\"{placeholder:@placeholder}\"\n        :css=\"{width:'100%'}\"\n        :duplex=\"selected\" />\n    <ts-trigger :widget=\"{\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide\n    }\">\n    </ts-trigger>\n</div>"

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group has-feedback\" :css=\"[@inline && @inlineFormGroupStyle]\" :class=\"[@className,(@hasRules && @dirty ? (@reasons.length ? 'has-error' : 'has-success') : '')]\">\n    <label class=\"control-label\" :if=\"@label.length\">{{@label}}</label>\n    <slot />\n    <i class=\"form-control-feedback\" :if=\"@hasRules && @showIcon\" :class=\"[(@dirty ? 'glyphicon' : ''), (@reasons.length ? 'glyphicon-remove' : 'glyphicon-ok')]\" :visible=\"@dirty\"></i>\n    <small class=\"help-block\" :css=\"[@inline && @inlineMessageStyle]\" :if=\"@hasRules && @reasons.length\">{{@reasons.length ? @reasons[0].message : ''}}</small>\n</div>"

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = "<input type=\"text\" class=\"form-control\" \n    :duplex=\"@text\" \n    :attr=\"{name:@col,placeholder:@placeholder}\" \n    :css=\"{width:@width}\"\n    data-duplex-changed=\"@handleChange\">"

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-menu\">\n    <li :class=\"[\n                    !item.children || item.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                    @openKeys.contains(item.key) ? 'koumei-menu-open' : '',\n                    @selectedKeys.contains(item.key) ? 'koumei-menu-item-selected' : ''\n                ]\"\n        :for=\"item in @menu\">\n        <a :click=\"handleClick(item, item.key, [item.key])\" style=\"padding-left: 24px;\">\n            <i :class=\"[item.icon]\"></i>\n            <span>{{item.title}}</span>\n            <i class=\"koumei-menu-caret fa\" :class=\"[@openKeys.contains(item.key) ? 'fa-angle-up' : 'fa-angle-down']\"></i>\n        </a>\n        <ul class=\"koumei-menu\">\n            <li :class=\"[\n                            !item2.children || item2.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                                @openKeys.contains(item2.key) ? 'koumei-menu-open' : '',\n                                @selectedKeys.contains(item2.key) ? 'koumei-menu-item-selected' : ''\n                            ]\"\n                :for=\"item2 in item.children\">\n                <a :click=\"handleClick(item2, item2.key, [item2.key,item.key])\" style=\"padding-left: 48px;\">\n                    <span>{{item2.title}}</span>\n                    <i class=\"koumei-menu-caret fa\" :class=\"[@openKeys.contains(item2.key) ? 'fa-angle-up' : 'fa-angle-down']\"></i>\n                </a>\n                <ul class=\"koumei-menu\">\n                    <li :class=\"[\n                                    !item3.children || item3.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                                    @selectedKeys.contains(item3.key) ? 'koumei-menu-item-selected' : ''\n                                ]\"\n                        :for=\"item3 in item2.children\">\n                        <a :click=\"handleClick(item3, item3.key, [item3.key,item2.key,item.key])\" style=\"padding-left: 72px;\">{{item3.title}}</a>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n    </li>\n</ul>"

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <a class=\"btn blue\" :attr=\"{disabled:@current===1}\" :click=\"@prevPage\">\n        <i class=\"icon-step-backward\"></i>上一页\n    </a>\n    <a class=\"btn success\">{{ @current }}/{{ Math.ceil(@total/@pageSize) }}</a>\n    <a class=\"btn blue\" :attr=\"{disabled:@current===Math.ceil(@total/@pageSize)}\" :click=\"@nextPage\">\n        <i class=\"icon-step-forward\"></i>下一页\n    </a>\n</div>"

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-group\">\n    <ts-radio \n        :widget=\"{\n            checked:@selected,\n            value:option.value,\n            name:@helpId,\n            group:true,\n            onChange:function(){\n                @toggleOption(arguments[0], option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ts-radio>\n</div>"

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"@wrapper\" class=\"koumei-radio\" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"koumei-radio-inner koumei-radio-inner-ie\">\n        <input type=\"radio\"\n            :attr=\"{id:@helpId,disabled:@disabled,value:@value,name:@name}\"\n            :duplex=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text\"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>"

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = "<div style=\"overflow: auto\">\n    <ul class=\"koumei-select-dropdown-menu\" role=\"menu\">\n        <li class=\"koumei-select-dropdown-menu-item\"\n            :class=\"[\n                (@selection.some(function(){return arguments[0].value===option.value}) ? 'koumei-select-dropdown-menu-item-selected' : ''),\n                (option.disabled ? 'koumei-select-dropdown-menu-item-disabled' : '')\n            ]\"\n            :for=\"option in @getFilteredOptions()\"\n            :click=\"@handleOptionClick($event, option)\"\n            role=\"menuitem\">\n            {{option.label}}\n            <i class=\"fa fa-check\" :visible=\"@isMultiple\"></i>\n        </li>\n        <li class=\"koumei-select-dropdown-menu-item koumei-select-dropdown-menu-item-disabled\"\n            :visible=\"@getFilteredOptions().length <= 0 && @searchValue && !@loading\">无数据</li>\n        <li class=\"koumei-select-dropdown-menu-item koumei-select-dropdown-menu-item-disabled\"\n            :visible=\"@loading\">加载中</li>\n    </ul>\n</div>"

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-select form-control\"\n    :class=\"[(@isMultiple ? 'koumei-select-multiple' : '')]\"\n    :css=\"{width:@width}\"\n    :click=\"@handleClick\"\n    role=\"combobox\"\n    aria-autocomplete=\"list\"\n    aria-haspopup=\"true\"\n    :attr=\"{'aria-expanded': @panelVisible + ''}\">\n    <ul class=\"koumei-select-selection\" :class=\"[(@isMultiple ? 'koumei-select-tags' : '')]\">\n        <li class=\"koumei-select-selected\" :visible=\"!@isMultiple && (!@showSearch || !@panelVisible)\">{{@displayValue}}</li>\n        <li class=\"koumei-select-choice\" :for=\"choice in @selection\">\n            <span>{{choice.label}}</span>\n            <i class=\"fa fa-times\" :click=\"@removeSelection($event, choice) | stop\"></i>\n        </li>\n        <li class=\"koumei-select-search\">\n            <input class=\"koumei-select-search-field\"\n                name=\"search\"\n                type=\"text\"\n                autocomplete=\"off\"\n                :duplex=\"@searchValue\"\n                :css=\"{visibility:(@showSearch && @panelVisible)?'visible':'hidden'}\"\n                :keydown=\"@handleDelete\" />\n        </li>\n    </ul>\n    <i class=\"fa koumei-select-arrow\"\n        :class=\"[(@panelVisible ? 'fa-caret-up' : 'fa-caret-down')]\"\n        :visible=\"@mode === ''\"></i>\n    <ts-trigger :widget=\"{\n        width: @panelWidth,\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide}\">\n    </ts-trigger>\n</div>"

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = "<div>\n    <table class=\"table\" :loading=\"!window.isNaN(@paginationConfig.total) && @loading\">\n        <thead>\n            <tr>\n                <th :if=\"@needSelection\">\n                    <ts-checkbox :widget=\"{checked:@isAllChecked,onChange:@handleCheckAll}\"></ts-checkbox>\n                </th>\n                <th :for=\"el in @columns\">{{el.title}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"($index, record) in @getCurrentPageData()\">\n                <td :if=\"@needSelection\">\n                    <ts-checkbox :widget=\"{checked:@checked.indexOf(record[@key])!=-1,onChange:function(){@handleCheck(arguments[0].target.checked,record)}}\"></ts-checkbox>\n                </td>\n                <td :for=\"col in @columns\" :html=\"col.template\"></td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"pull-right\">\n        <ts-pagination :widget=\"{current:@paginationConfig.current,pageSize:@paginationConfig.pageSize,total:@total,onChange:@handlePageChange}\"></ts-pagination>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>"

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = "<textarea class=\"form-control\" \n    :duplex=\"@text\" \n    :attr=\"{rows:@rows,name:@col}\"\n    data-duplex-changed=\"@handleChange\"></textarea>"

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-timepicker-view\">\n    <div class=\"koumei-timepicker-view-combobox\">\n        <div class=\"koumei-timepicker-view-select\" name=\"hour-options\">\n            <ul>\n                <li :for=\"hour in @hourOptions\"\n                    :class=\"[(hour==@currentHour?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(hour, 'hour')\">{{hour}}</li>\n            </ul>\n        </div>\n        <div class=\"koumei-timepicker-view-select\" name=\"minute-options\">\n            <ul>\n                <li :for=\"minute in @minuteOptions\"\n                    :class=\"[(minute==@currentMinute?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(minute, 'minute')\">{{minute}}</li>\n            </ul>\n        </div>\n        <div class=\"koumei-timepicker-view-select\" name=\"second-options\">\n            <ul>\n                <li :for=\"second in @secondOptions\"\n                    :class=\"[(second==@currentSecond?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(second, 'second')\">{{second}}</li>\n            </ul>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-timepicker\" :css=\"{width:@width}\">\n    <i class=\"fa fa-clock-o koumei-timepicker-icon\"></i>\n    <i class=\"fa fa-times-circle koumei-timepicker-clear\" :if=\"@selected.length\" :click=\"@clear\"></i>\n    <input type=\"text\"\n        class=\"form-control koumei-timepicker-input\"\n        :click=\"@handleClick\"\n        readonly\n        :attr=\"{placeholder:@placeholder}\"\n        :css=\"{width:'100%'}\"\n        :duplex=\"selected\" />\n    <ts-trigger :widget=\"{\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide\n    }\">\n    </ts-trigger>\n</div>"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-upload-card\">\n    <div class=\"koumei-upload-card-item\" :class=\"[(file.status === 'error' ? 'bordered-danger' : '')]\" :for=\"($index, file) in @fileList\">\n        <img :attr=\"{src:file.url,alt:file.name,title:file.name}\">\n        <span class=\"koumei-upload-card-progress\" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <span class=\"koumei-upload-card-tool\">\n            <i class=\"fa fa-eye\"></i>\n            <i class=\"fa fa-trash-o\" :click=\"del(file)\"></i>\n        </span>\n    </div>\n</div>"

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-upload-list\">\n    <li :for=\"($index, file) in @fileList\"\n        :class=\"[@getTextClass(file)]\">\n        <div class=\"koumei-upload-list-info\">\n            <i class=\"fa fa-file-o text-muted\"></i>\n            <span :attr=\"{title:file.name}\">{{file.name}}</span>\n        </div>\n        <i class=\"fa fa-times koumei-upload-btn-close\" :click=\"del(file)\"></i>\n        <span class=\"koumei-upload-list-progress\" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <i class=\"fa fa-check-circle text-success\" :class=\"[(file.status === 'done' ? '' : 'hide')]\"></i>\n    </li>\n</ul>"

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-upload-container\">\n    <div class=\"koumei-upload-card-wall\" :if=\"@showUploadList && @listType==='picture-card'\">\n        <ts-upload-card :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ts-upload-card>\n    </div>\n    <label :visible=\"!@showUploadList && @listType==='picture-card' && @fileList.length > 0\" class=\"koumei-upload-card-item\" :attr=\"{'for':@helpId}\">\n        <img :attr=\"{src:@fileList[0]?@fileList[0].url:blankImg,alt:@fileList[0]?@fileList[0].name:'',title:@fileList[0]?@fileList[0].name:''}\">\n    </label>\n    <label :visible=\"@showUploadList || @fileList.length == 0\" :class=\"[(@listType==='picture-card'?@cardClass:@btnClass)]\" :attr=\"{'for':@helpId}\"><slot /></label>\n    <form><input type=\"file\" name=\"file\" :attr=\"{id:@helpId}\"></form>\n    <div :if=\"@showUploadList && @listType!=='picture-card'\">\n        <ts-upload-list :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ts-upload-list>\n    </div>\n</div>"

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(63);
__webpack_require__(31);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var moment = __webpack_require__(4);
var monthTable = [];
avalon.component('ts-calendar-year-view', {
    template: __webpack_require__(40),
    defaults: {
        table: [],
        // 0-月视图，1-年视图，2-十年视图，3-百年视图
        view: 1,
        currentMonth: '',
        currentYear: 0,
        isSelected: function (el) {
            return false;
        },
        onSelect: avalon.noop,
        handleCellClick: function (el) {
            this.onSelect(el);
        },
        onInit: function () {
            var _this = this;
            var monthList = moment.localeData().monthsShort();
            if (monthTable.length === 0) {
                [0, 3, 6, 9].forEach(function (n) {
                    monthTable.push(monthList.slice(n, n + 3).map(function (m) { return ({ label: m, value: m }); }));
                });
            }
            this.$watch('view', function (v) {
                var startOfDecade = _this.currentYear - _this.currentYear % 10;
                var startOfCentury = _this.currentYear - _this.currentYear % 100;
                switch (v) {
                    case 1:
                        _this.table = monthTable;
                        break;
                    case 2:
                        _this.table = [0, 3, 6, 9].map(function (n) { return avalon.range(startOfDecade - 1, startOfDecade + 11)
                            .slice(n, n + 3)
                            .map(function (m) { return ({ label: m, value: m }); }); });
                        break;
                    case 3:
                        _this.table = [0, 3, 6, 9].map(function (n) { return avalon.range(startOfCentury - 10, startOfCentury + 110, 10)
                            .slice(n, n + 3)
                            .map(function (m) { return ({ label: m + "-" + (m + 9), value: m }); }); });
                        break;
                }
            });
            this.$watch('currentYear', function (v) {
                _this.$fire('view', _this.view);
            });
        }
    }
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var moment = __webpack_require__(4);
__webpack_require__(11);
__webpack_require__(62);
avalon.component('ts-calendar', {
    template: __webpack_require__(41),
    defaults: {
        value: '',
        $value: null,
        $selected: null,
        weekStart: 0,
        showHeader: true,
        disabledDate: function () { return false; },
        currentMonth: '',
        currentYear: 0,
        weekdays: [],
        currentYearOptions: [],
        monthOptions: [],
        table: [],
        handleYearChange: function (e) {
            this.$value.year(e.target.value);
            this.calcTable(this.$value.clone());
        },
        handleMonthChange: function (e) {
            this.$value.month(e.target.value);
            this.calcTable(this.$value.clone());
        },
        handleDateClick: function (el) {
            if (el.disabled) {
                return false;
            }
            this.$selected.year(this.currentYear).month(this.currentMonth).date(el.date);
            if (el.prevMonth) {
                this.$selected.subtract(1, 'months');
            }
            if (el.nextMonth) {
                this.$selected.add(1, 'months');
            }
            this.$value = this.$selected;
            this.onChange({
                target: {
                    value: this.$selected.clone()
                },
                type: 'calendar-changed'
            });
            // 是否有必要再计算更新一次？
            this.calcTable(this.$value.clone());
        },
        onChange: avalon.noop,
        calcTable: function (m) {
            var i, j;
            // 这个月的第一天
            var firstDayOfMonth = m.clone().startOf('month');
            // 这个月的最后一天
            var lastDayOfMonth = m.clone().endOf('month');
            // 上个月的最后一天
            var lastDayOfPrevMonth = firstDayOfMonth.clone().subtract(1, 'days');
            var firstDay = (firstDayOfMonth.day() - this.weekStart + 7) % 7;
            var prevLastDate = lastDayOfPrevMonth.date();
            var lastDate = lastDayOfMonth.date();
            var table = [];
            var passed = 0;
            for (i = 0; i < 6; i++) {
                var tableRow = [];
                for (j = 0; j < 7; j++) {
                    var className = [];
                    var disabled = false;
                    var prevMonth = false;
                    var nextMonth = false;
                    if (i === 0 && j < firstDay) {
                        // 上月结束部分
                        className.push('koumei-calendar-prev-month-cell');
                        prevMonth = true;
                        if (this.disabledDate(+m.clone().subtract(1, 'months').date(prevLastDate - firstDay + j + 1))) {
                            disabled = true;
                            className.push('koumei-calendar-disabled-cell');
                        }
                        tableRow.push({
                            className: className,
                            disabled: disabled,
                            prevMonth: prevMonth,
                            nextMonth: nextMonth,
                            date: prevLastDate - firstDay + j + 1
                        });
                    }
                    else if (passed + 1 > lastDate) {
                        // 下月开始部分
                        className.push('koumei-calendar-next-month-cell');
                        nextMonth = true;
                        if (this.disabledDate(+m.clone().add(1, 'months').date(passed + 1 - lastDate))) {
                            disabled = true;
                            className.push('koumei-calendar-disabled-cell');
                        }
                        tableRow.push({
                            className: className,
                            disabled: disabled,
                            prevMonth: prevMonth,
                            nextMonth: nextMonth,
                            date: ++passed - lastDate
                        });
                    }
                    else {
                        // 本月部分
                        if (moment().isSame(m.clone().date(passed + 1), 'day')) {
                            className.push('koumei-calendar-today');
                        }
                        if (this.$selected.isSame(m.clone().date(passed + 1), 'day')) {
                            className.push('koumei-calendar-selected-day');
                        }
                        if (this.disabledDate(+m.clone().date(passed + 1))) {
                            disabled = true;
                            className.push('koumei-calendar-disabled-cell');
                        }
                        tableRow.push({
                            className: className,
                            disabled: disabled,
                            prevMonth: prevMonth,
                            nextMonth: nextMonth,
                            date: ++passed
                        });
                    }
                }
                table.push(tableRow);
            }
            this.table = table;
            this.currentMonth = m.format('MMM');
            this.currentYear = m.year();
            this.currentYearOptions = avalon.range(this.currentYear - 10, this.currentYear + 9).map(function (y) { return ({ label: y, value: y }); });
        },
        onInit: function (event) {
            var _this = this;
            this.$value = moment();
            this.$selected = moment();
            var weekdays = moment.localeData().weekdaysMin();
            avalon.range(this.weekStart).forEach(function (n) {
                weekdays.push(weekdays.shift());
            });
            this.weekdays = weekdays;
            var monthList = moment.localeData().monthsShort();
            this.monthOptions = monthList.map(function (m) { return ({ label: m, value: m }); });
            this.calcTable(this.$value.clone());
            this.value = this.$value.toArray().toString();
            this.$watch('value', function (v) {
                _this.$value = _this.$selected = moment(v.split(','));
                _this.calcTable(_this.$value.clone());
            });
        }
    }
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var moment = __webpack_require__(4);
var ts_control_1 = __webpack_require__(1);
__webpack_require__(6);
__webpack_require__(61);
__webpack_require__(13);
var utils_1 = __webpack_require__(2);
/**
 * 日期选择组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * @prop format 日期格式，参考 momentjs，默认为 YYYY-MM-DD
 * @prop startDate 控制可已选择的时间的开始日期，日期字符串，格式与 format 参数匹配，设置此项自动忽略 disabledDate
 * @prop endDate 控制可已选择的时间的结束日期，日期字符串，格式与 format 参数匹配，设置此项自动忽略 disabledDate
 * @prop disabledDate 不可选择日期的判断函数，传入 current（当前遍历日期），返回 true 表示此日期不可选
 * @prop showTime 是否显示时间选择，如果此项为 true，则 format 默认为 YYYY-MM-DD HH:mm:ss
 *
 * @example
 * ``` html
 *
 * ```
 */
ts_control_1["default"].extend({
    displayName: 'ts-datepicker',
    template: __webpack_require__(45),
    defaults: {
        selected: '',
        format: 'YYYY-MM-DD',
        startDate: '',
        endDate: '',
        disabledDate: function () { return false; },
        showTime: false,
        clear: function () {
            this.selected = '';
            avalon.vmodels[this.panelVmId].reset();
            this.handleChange({
                target: { value: '' },
                type: 'datepicker-changed'
            });
        },
        withInBox: function (el) {
            return this.$element === el || avalon.contains(this.$element, el);
        },
        getTarget: function () {
            return this.$element;
        },
        handleClick: function (e) {
            if (!this.panelVisible) {
                avalon.vmodels[this.panelVmId].reset();
                this.panelVisible = true;
            }
            else {
                this.panelVisible = false;
            }
        },
        panelVmId: '',
        panelVisible: false,
        panelClass: 'koumei-datepicker-panel-container',
        panelTemplate: __webpack_require__(44),
        handlePanelHide: function () {
            this.panelVisible = false;
        },
        mapValueToSelected: function (value) {
            this.selected = value;
        },
        onInit: function (event) {
            var _this = this;
            var self = this;
            utils_1.emitToFormItem(this, {
                showIcon: false
            });
            this.$watch('value', function (v) {
                _this.mapValueToSelected(v);
                _this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'datepicker-changed'
                });
            });
            if (this.showTime && this.format === 'YYYY-MM-DD') {
                // 允许选择时间的模式下，用户如果没自定义格式，则自动转为日期时间格式
                this.format = 'YYYY-MM-DD HH:mm:ss';
            }
            this.panelVmId = this.$id + '_panel';
            var innerVm = avalon.define({
                $id: this.panelVmId,
                currentDateArray: '',
                $moment: moment(),
                currentDay: 0,
                currentMonth: '',
                currentYear: 0,
                $startDate: null,
                $endDate: null,
                disabledDate: function () { return false; },
                showTime: false,
                // -1-天（时间）视图，0-月视图，1-年视图，2-十年视图，3-百年视图
                viewMode: 0,
                staged: 0,
                $computed: {
                    startOfDecade: function () {
                        return this.currentYear - this.currentYear % 10;
                    },
                    startOfCentury: function () {
                        return this.currentYear - this.currentYear % 100;
                    }
                },
                reset: function () {
                    var _this = this;
                    this.viewMode = 0;
                    this.staged = 0;
                    this.$moment = self.selected ? moment(self.selected, self.format) : moment();
                    this.currentDay = this.$moment.date();
                    this.currentMonth = this.$moment.format('MMM');
                    this.currentYear = this.$moment.year();
                    this.currentDateArray = this.$moment.toArray().toString();
                    this.showTime = self.showTime;
                    // 构造不可选择日期的判断函数
                    if (self.startDate) {
                        this.$startDate = moment(self.startDate, self.format);
                    }
                    if (self.endDate) {
                        this.$endDate = moment(self.endDate, self.format);
                    }
                    if (self.startDate || self.endDate) {
                        // 如果设置了开始日期和结束日期，则据此构造一个判断函数
                        this.disabledDate = function (current) {
                            if (_this.$startDate === null && _this.$endDate === null) {
                                return false;
                            }
                            var currentMoment = moment(current);
                            var isSameOrAfterStartDate = currentMoment.isSameOrAfter(_this.$startDate, 'date');
                            var isSameOrBeforeEndDate = currentMoment.isSameOrBefore(_this.$endDate, 'date');
                            if (_this.$startDate === null) {
                                return !isSameOrBeforeEndDate;
                            }
                            if (_this.$endDate === null) {
                                return !isSameOrAfterStartDate;
                            }
                            return !(isSameOrAfterStartDate && isSameOrBeforeEndDate);
                        };
                    }
                    else {
                        // 否则使用默认的或者外部传进来的判断函数
                        this.disabledDate = self.disabledDate;
                    }
                },
                changeView: function (viewMode) {
                    if (this.viewMode === 0 && viewMode === 2) {
                        // 从月视图直接跳到十年视图后，返回时跳过年视图
                        this.staged = 1;
                    }
                    this.viewMode = viewMode;
                },
                handleYearViewSelect: function (el) {
                    if (this.viewMode === 1) {
                        this.currentMonth = el.value;
                        this.$moment.month(el.value);
                        this.currentDateArray = this.$moment.toArray().toString();
                    }
                    if (this.viewMode === 3) {
                        this.currentYear = el.value;
                        this.$moment.year(el.value);
                        this.currentDateArray = this.$moment.toArray().toString();
                    }
                    if (this.viewMode === 2) {
                        this.currentYear = el.value;
                        this.$moment.year(el.value);
                        this.currentDateArray = this.$moment.toArray().toString();
                        this.viewMode = this.viewMode - 1 - this.staged;
                        this.staged = 0;
                    }
                    else {
                        this.viewMode = this.viewMode - 1;
                    }
                },
                mutate: function (action) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    this.$moment[action].apply(this.$moment, args);
                    this.currentDay = this.$moment.date();
                    this.currentMonth = this.$moment.format('MMM');
                    this.currentYear = this.$moment.year();
                    this.currentDateArray = this.$moment.toArray().toString();
                },
                today: function () {
                    this.handleCalendarChange({
                        target: {
                            value: moment()
                        },
                        type: 'calendar-changed'
                    });
                    this.complete();
                },
                handleCalendarChange: function (e) {
                    this.$moment = e.target.value;
                    this.currentDay = this.$moment.date();
                    this.currentMonth = this.$moment.format('MMM');
                    this.currentYear = this.$moment.year();
                    if (!this.showTime) {
                        this.complete();
                    }
                },
                handleTimepickerChange: function (e) {
                    var _a = e.target, hour = _a.hour, minute = _a.minute, second = _a.second;
                    this.$moment.hour(hour).minute(minute).second(second);
                },
                complete: function () {
                    self.selected = this.$moment.format(self.format);
                    self.panelVisible = false;
                    self.handleChange({
                        target: { value: self.selected },
                        type: 'datepicker-changed'
                    });
                }
            });
            this.mapValueToSelected(this.value);
            innerVm.reset();
        },
        onDispose: function () {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var bootbox = __webpack_require__(88);
var koumei_util_1 = __webpack_require__(3);
var $ = __webpack_require__(85);
avalon.component('ts-dialog', {
    template: '<div style="display: none"><slot name="header" /><slot name="body"/></div>',
    defaults: {
        body: 'blank',
        $dialog: null,
        show: false,
        size: '',
        uploading: false,
        $innerVm: '',
        onOk: function () { },
        onCancel: function () { },
        onInit: function (event) {
            var _this = this;
            var vm = event.vmodel;
            vm.$watch('show', function (newV) {
                if (newV) {
                    vm.$dialog = bootbox.dialog({
                        message: vm.body,
                        title: '{{title}}',
                        size: vm.size,
                        buttons: {
                            save: {
                                label: '保存',
                                className: 'btn-primary',
                                callback: function () {
                                    vm.onOk();
                                    return false;
                                }
                            },
                            cancel: {
                                label: '取消',
                                className: 'btn-default',
                                callback: function () {
                                    vm.onCancel();
                                }
                            }
                        }
                    }).on('hidden.bs.modal', function (e) {
                        setTimeout(function () {
                            if ($('.modal.in').length) {
                                $('body').addClass('modal-open');
                            }
                            else {
                                $('body').removeClass('modal-open');
                            }
                        }, 100);
                    })
                        .on('shown.bs.modal', function () {
                    });
                    vm.$dialog.find('.modal-content').attr(':controller', _this.$innerVm);
                    avalon.scan(vm.$dialog.get(0));
                }
                else {
                    if (vm.$dialog) {
                        vm.$dialog.find('.bootbox-close-button').trigger('click');
                    }
                }
            });
        },
        onReady: function (event) {
            koumei_util_1.parseSlotToVModel(this);
            this.show && this.$fire('show', true);
        },
        onDispose: function (event) {
        }
    }
});


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var koumei_util_1 = __webpack_require__(3);
/**
 * 表单项组件
 * @prop label 表单项标签
 *
 * @example
 * ``` html
 * <ts-form-item :widget="{label: '标题'}">
        <ts-input :widget="{value: @title, col: 'title'}"></ts-input>
    </ts-form-item>
 * ```
 */
avalon.component('ts-form-item', {
    template: __webpack_require__(46),
    defaults: {
        $formVm: null,
        label: '',
        control: '',
        inline: false,
        dirty: false,
        reasons: [],
        hasRules: false,
        showIcon: true,
        className: '',
        inlineFormGroupStyle: { verticalAlign: 'top' },
        inlineMessageStyle: { marginBottom: 0 },
        onFieldChange: function (descriptor) {
            var _this = this;
            this.$formVm.type !== 'search' && this.$formVm.$form.setFieldsValue((_a = {},
                _a[descriptor.name] = { value: descriptor.value, denyValidate: descriptor.denyValidate },
                _a));
            if (!descriptor.rules)
                return;
            if (descriptor.showIcon === false) {
                this.showIcon = false;
            }
            delete descriptor.showIcon;
            this.hasRules = true;
            this.$formVm.$form.addFields((_b = {},
                _b[descriptor.name] = { rules: descriptor.rules },
                _b));
            this.$formVm.$form.on('error' + descriptor.name, function (reasons) {
                _this.dirty = true;
                _this.reasons = reasons;
            });
            this.$formVm.$form.on('reset', function (fields) {
                if (~Object.keys(fields).indexOf(descriptor.name)) {
                    _this.dirty = false;
                    _this.reasons = [];
                }
            });
            var _a, _b;
        },
        onFormChange: function (meta) {
            if (this.$formVm.$form.autoAsyncChange) {
                this.dirty = true;
            }
            this.$formVm.onFormChange(meta);
        },
        onInit: function (event) {
            event.target._ctype_ = 'ts-form-item';
            event.target._vm_ = this;
            this.$formVm = koumei_util_1.findParentComponent(this, 'ts-form');
            if (this.$formVm === null) {
                throw 'ts-form-item 必须放在 ts-form 内';
            }
            this.inline = this.$formVm.inline;
        },
        onReady: function (event) {
        }
    },
    soleSlot: 'control'
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
avalon.component('ts-form', {
    template: "<form role=\"form\" :class=\"[(@horizontal ? 'form-horizontal' : ''), (@inline ? 'form-inline' : '')]\"><slot /></form>",
    defaults: {
        items: '',
        $form: null,
        type: '',
        horizontal: false,
        inline: false,
        onFormChange: function (meta) {
            if (this.$form) {
                this.$form.setFieldsValue((_a = {},
                    _a[meta.name] = { value: meta.value },
                    _a));
            }
            var _a;
        },
        onInit: function (event) {
            event.target._ctype_ = 'ts-form';
            event.target._vm_ = this;
        },
        onReady: function (event) {
        }
    },
    soleSlot: 'items'
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_control_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
ts_control_1["default"].extend({
    displayName: 'ts-input',
    template: __webpack_require__(47),
    defaults: {
        text: '',
        mapValueToText: function (value) {
            this.text = value;
        },
        onInit: function (event) {
            var _this = this;
            utils_1.emitToFormItem(this);
            this.$watch('value', function (v) {
                _this.mapValueToText(v);
                _this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'changed'
                });
            });
            this.mapValueToText(this.value);
        }
    }
});


/***/ }),
/* 69 */,
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
exports.__esModule = true;
var avalon = __webpack_require__(0);
/**
 * loading 指令
 *
 * @example
 * ``` html
 * <table :loading="true">...</table>
 * ```
 */
avalon.directive('loading', {
    init: function () {
        this.instance = null;
        this.oldPositionStyle = '';
    },
    update: function (vdom, value) {
        var _this = this;
        if (value) {
            if (!this.instance) {
                var t_1 = setInterval(function () {
                    var dom = vdom.dom;
                    var computedStyle = global.getComputedStyle ? global.getComputedStyle(dom) : dom.currentStyle;
                    var width = dom.offsetWidth, height = dom.scrollHeight, className = dom.className;
                    var borderLeftWidth = computedStyle.borderLeftWidth, borderTopWidth = computedStyle.borderTopWidth, display = computedStyle.display;
                    _this.oldPositionStyle = dom.style.position;
                    // 如果元素是隐藏的，什么都不做
                    if (display === 'none') {
                        clearInterval(t_1);
                    }
                    // 如果宽度和高度都不为0，则添加loading遮罩
                    if (width !== 0 && height !== 0) {
                        clearInterval(t_1);
                    }
                    else {
                        return;
                    }
                    var maskElement = global.document.createElement('div');
                    maskElement.className = 'koumei-loading-mask';
                    maskElement.innerText = '加载中...';
                    maskElement.style.left = 0 - (borderLeftWidth === 'medium' ? 0 : parseFloat(borderLeftWidth)) + 'px';
                    maskElement.style.top = 0 - (borderTopWidth === 'medium' ? 0 : parseFloat(borderTopWidth)) + 'px';
                    maskElement.style.width = width + 'px';
                    maskElement.style.height = height + 'px';
                    maskElement.style.lineHeight = height + 'px';
                    dom.style.position = 'relative';
                    if (!~(" " + className + " ").indexOf(' masked ')) {
                        dom.className += ' masked';
                    }
                    dom.appendChild(maskElement);
                    _this.instance = maskElement;
                }, 100);
            }
            else {
                var dom = vdom.dom;
                var maskElement = this.instance;
                var className = dom.className;
                this.oldPositionStyle = dom.style.position;
                maskElement.style.display = 'block';
                dom.style.position = 'relative';
                if (!~(" " + className + " ").indexOf(' masked ')) {
                    dom.className = className + ' masked';
                }
            }
        }
        else {
            setTimeout(function () {
                if (_this.instance) {
                    var dom = vdom.dom;
                    var maskElement = _this.instance;
                    var className = dom.className;
                    maskElement.style.display = 'none';
                    if (_this.oldPositionStyle) {
                        dom.style.position = _this.oldPositionStyle;
                    }
                    dom.className = (" " + className + " ").replace(/\s*masked\s*/, ' ');
                }
            }, 100);
        }
    },
    beforeDispose: function () {
        var dom = this.node.dom;
        this.instance && dom.removeChild(this.instance);
    }
});
/**
 * 全局 loading 方法
 *
 * @example
 * ``` js
 * import { Loading } from './components/ts-loading';
 * Loading.show();
 * setTimeout(() => {
 *   Loading.hide();
 * }, 5000)
 * ```
 */
var loadingDirective = avalon.directives['loading'];
var globalLoadingContext = {
    node: { dom: document.body }
};
exports.Loading = {
    show: function () {
        if (globalLoadingContext.instance === undefined) {
            loadingDirective.init.call(globalLoadingContext);
            avalon.ready(function () {
                loadingDirective.update.call(globalLoadingContext, {
                    dom: globalLoadingContext.node.dom
                }, true);
            });
        }
        else {
            loadingDirective.update.call(globalLoadingContext, {
                dom: globalLoadingContext.node.dom
            }, true);
        }
    },
    hide: function () {
        if (globalLoadingContext.instance !== undefined) {
            loadingDirective.update.call(globalLoadingContext, {
                dom: globalLoadingContext.node.dom
            }, false);
        }
    }
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(84)))

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
avalon.component('ts-menu', {
    template: __webpack_require__(48),
    defaults: {
        menu: [],
        selectedKeys: [],
        openKeys: [],
        onClick: avalon.noop,
        onOpenChange: avalon.noop,
        handleClick: function (item, key, keyPath) {
            if (!item.children || item.children.length === 0) {
                // 叶子节点
                //this.selectedKeys.ensure(item.key);
                this.selectedKeys = [item.key];
                this.onClick(item, key, keyPath);
            }
            else {
                // 非叶子节点
                if (this.openKeys.contains(item.key)) {
                    this.openKeys.remove(item.key);
                }
                else {
                    this.openKeys.push(item.key);
                }
                this.onOpenChange(this.openKeys.toJSON());
            }
        }
    }
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var noty = __webpack_require__(14);
var defaultOptions = {
    duration: 1500
};
exports["default"] = {
    info: function (_a) {
        var content = _a.content, duration = _a.duration;
        noty({
            text: '<i class="fa fa-info-circle"></i>' + content,
            type: 'information',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    success: function (_a) {
        var content = _a.content, duration = _a.duration;
        noty({
            text: '<i class="fa fa-check-circle"></i>' + content,
            type: 'success',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    error: function (_a) {
        var content = _a.content, duration = _a.duration;
        noty({
            text: '<i class="fa fa-times-circle"></i>' + content,
            type: 'error',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    warning: function (_a) {
        var content = _a.content, duration = _a.duration;
        noty({
            text: '<i class="fa fa-warning"></i>' + content,
            type: 'warning',
            layout: 'topCenter',
            timeout: duration || defaultOptions.duration
        });
    },
    warn: function (_a) {
        var content = _a.content, duration = _a.duration;
        this.warning({ content: content, duration: duration });
    },
    config: function (options) {
        if (options.duration !== undefined) {
            defaultOptions.duration = options.duration;
        }
    }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var noty = __webpack_require__(14);
var defaultOptions = {
    timeout: 3000
};
exports["default"] = {
    info: function (_a) {
        var message = _a.message, title = _a.title, timeout = _a.timeout;
        noty({
            text: template(title, message, 'fa fa-info-circle'),
            type: 'information',
            timeout: timeout || defaultOptions.timeout
        });
    },
    success: function (_a) {
        var message = _a.message, title = _a.title, timeout = _a.timeout;
        noty({
            text: template(title, message, 'fa fa-check-circle'),
            type: 'success',
            timeout: timeout || defaultOptions.timeout
        });
    },
    error: function (_a) {
        var message = _a.message, title = _a.title, timeout = _a.timeout;
        noty({
            text: template(title, message, 'fa fa-times-circle'),
            type: 'error',
            timeout: timeout || defaultOptions.timeout
        });
    },
    warning: function (_a) {
        var message = _a.message, title = _a.title, timeout = _a.timeout;
        noty({
            text: template(title, message, 'fa fa-warning'),
            type: 'warning',
            timeout: timeout || defaultOptions.timeout
        });
    },
    warn: function (_a) {
        var message = _a.message, title = _a.title, timeout = _a.timeout;
        this.warning({ message: message, title: title, timeout: timeout });
    },
    config: function (options) {
        if (options.timeout !== undefined) {
            defaultOptions.timeout = options.timeout;
        }
    }
};
function template(title, message, icon) {
    title = title ? "<strong>" + title + "</strong><br>" : '';
    return "<div>\n                <i class=\"" + icon + " pull-left\" style=\"font-size: 38px;min-width: 38px;text-align: center;\"></i>\n                " + title + "\n                " + message + "\n            </div>";
}


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
avalon.component('ts-select-option', {
    template: '&nbsp;',
    soleSlot: 'label',
    defaults: {
        label: '',
        value: '',
        disabled: false
    }
});


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var ts_control_1 = __webpack_require__(1);
__webpack_require__(6);
var koumei_util_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(2);
ts_control_1["default"].extend({
    displayName: 'ts-select',
    template: __webpack_require__(53),
    defaults: {
        value: [],
        mode: '',
        options: [],
        selection: [],
        remote: false,
        remoteMethod: avalon.noop,
        // 下拉框展示和操作部分
        displayValue: '',
        showSearch: false,
        searchValue: '',
        focusSearch: function () {
            this.$element.getElementsByTagName('input').search.focus();
        },
        withInBox: function (el) {
            return this.$element === el || avalon.contains(this.$element, el);
        },
        getTarget: function () {
            return this.$element;
        },
        handleClick: function (e) {
            if (!this.panelVisible) {
                this.searchValue = '';
                this.panelWidth = this.$element.offsetWidth;
                this.panelVisible = true;
                this.focusSearch();
            }
            else if (!this.isMultiple) {
                this.panelVisible = false;
            }
        },
        handleDelete: function (e) {
            if ((e.which === 8 || e.which === 46) && this.searchValue === '') {
                this.selection.removeAt(this.selection.length - 1);
                var selection = this.selection.toJSON();
                var value = selection.map(function (s) { return s.value; });
                avalon.vmodels[this.panelVmId].selection = selection;
                this.handleChange({
                    target: { value: this.isMultiple ? value : value[0] || '' },
                    type: 'select'
                });
            }
        },
        removeSelection: function (e, option) {
            this.selection.removeAll(function (o) { return o.value === option.value; });
            var selection = this.selection.toJSON();
            var value = selection.map(function (s) { return s.value; });
            avalon.vmodels[this.panelVmId].selection = selection;
            this.focusSearch();
            this.handleChange({
                target: { value: this.isMultiple ? value : value[0] || '' },
                type: 'select'
            });
        },
        // 下拉框下拉列表部分
        panelWidth: 0,
        panelVmId: '',
        panelVisible: false,
        panelClass: 'koumei-select-dropdown',
        panelTemplate: __webpack_require__(52),
        handlePanelHide: function () {
            this.panelVisible = false;
        },
        $computed: {
            isMultiple: {
                get: function () {
                    return this.mode === 'multiple' || this.mode === 'tags';
                }
            }
        },
        // 生命周期
        mapValueToSelection: function (value) {
            this.selection = this.options.filter(function (o) { return value.contains(o.value); });
            if (this.selection.length > 0) {
                this.displayValue = this.selection[0].label;
            }
            avalon.vmodels[this.panelVmId].selection = this.selection.toJSON();
        },
        onInit: function (event) {
            var _this = this;
            var self = this;
            if (this.options.length === 0) {
                var descriptor = koumei_util_1.getChildTemplateDescriptor(this);
                this.options = getOptions(descriptor);
            }
            utils_1.emitToFormItem(this);
            this.$watch('value', function (v) {
                var value = v.toJSON();
                _this.mapValueToSelection(v);
                _this.handleChange({
                    target: { value: _this.isMultiple ? value : value[0] || '' },
                    denyValidate: true,
                    type: 'select'
                });
            });
            this.panelVmId = this.$id + '_panel';
            var innerVm = avalon.define({
                $id: this.panelVmId,
                selection: [],
                loading: false,
                isMultiple: this.isMultiple,
                options: this.options.toJSON(),
                searchValue: '',
                getFilteredOptions: function () {
                    return this.options.filter(this.filterFn);
                },
                filterFn: function (el) {
                    if (this.loading) {
                        return false;
                    }
                    if (self.remote) {
                        return true;
                    }
                    var reg = new RegExp(avalon.escapeRegExp(this.searchValue), 'i');
                    return reg.test(el.label) || reg.test(el.value);
                },
                handleOptionClick: function (e, option) {
                    if (option.disabled) {
                        return false;
                    }
                    if (self.isMultiple) {
                        if (this.selection.some(function (o) { return o.value === option.value; })) {
                            this.selection.removeAll(function (o) { return o.value === option.value; });
                        }
                        else {
                            this.selection.push(option);
                        }
                        self.focusSearch();
                    }
                    else {
                        this.selection = [option];
                        self.panelVisible = false;
                    }
                    var selection = this.selection.toJSON();
                    var value = selection.map(function (s) { return s.value; });
                    self.handleChange({
                        target: { value: self.isMultiple ? value : value[0] || '' },
                        type: 'select'
                    });
                    self.displayValue = option.label;
                    self.selection = selection;
                }
            });
            this.$watch('searchValue', koumei_util_1.debounce(function (v) {
                innerVm.searchValue = v;
                if (_this.remote && !!v) {
                    innerVm.loading = true;
                    _this.remoteMethod(v).then(function (options) {
                        innerVm.loading = false;
                        innerVm.options = options;
                    });
                }
            }));
            this.$watch('isMultiple', function (v) {
                innerVm.isMultiple = v;
            });
            this.mapValueToSelection(this.value);
        },
        onDispose: function () {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});
function getOptions(descriptor) {
    return descriptor.reduce(function (acc, option) {
        if (option.is != 'ts-select-option')
            return acc;
        var label = option.inlineTemplate;
        acc.push({
            label: option.inlineTemplate || '',
            value: option.props.value || '',
            disabled: option.props.disabled || false
        });
        return acc;
    }, []);
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
avalon.component('ts-table-header', {
    template: '<th><slot /></th>',
    soleSlot: 'content',
    defaults: {
        content: '',
        col: ''
    }
});


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ts_control_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
/**
 * 多行文本输入组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * @prop rows 文本框行数
 *
 * @example
 * ``` html
 * <ts-textarea :widget="{value: @bio, col: 'bio', rows: 3}"></ts-textarea>
 * ```
 */
ts_control_1["default"].extend({
    displayName: 'ts-textarea',
    template: __webpack_require__(55),
    defaults: {
        rows: '',
        text: '',
        mapValueToText: function (value) {
            this.text = value;
        },
        onInit: function (event) {
            var _this = this;
            utils_1.emitToFormItem(this);
            this.$watch('value', function (v) {
                _this.mapValueToText(v);
                _this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'changed'
                });
            });
            this.mapValueToText(this.value);
        }
    }
});


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var moment = __webpack_require__(4);
var ts_control_1 = __webpack_require__(1);
__webpack_require__(6);
__webpack_require__(13);
var utils_1 = __webpack_require__(2);
/**
 * 时间选择组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * @prop format 日期格式，参考 momentjs，默认为 HH:mm:ss
 *
 * @example
 * ``` html
 *
 * ```
 */
ts_control_1["default"].extend({
    displayName: 'ts-timepicker',
    template: __webpack_require__(57),
    defaults: {
        selected: '',
        format: 'HH:mm:ss',
        clear: function () {
            this.selected = '';
            avalon.vmodels[this.panelVmId].reset();
            this.handleChange({
                target: { value: '' },
                type: 'timepicker-changed'
            });
        },
        withInBox: function (el) {
            return this.$element === el || avalon.contains(this.$element, el);
        },
        getTarget: function () {
            return this.$element;
        },
        handleClick: function (e) {
            if (!this.panelVisible) {
                avalon.vmodels[this.panelVmId].reset();
                this.panelVisible = true;
            }
            else {
                this.panelVisible = false;
            }
        },
        panelVmId: '',
        panelVisible: false,
        panelClass: 'koumei-timepicker-panel-container',
        panelTemplate: "<div class=\"koumei-timepicker-panel\" style=\"overflow: auto\">\n                            <xmp is=\"ts-timepicker-view\" :widget=\"{value:@currentDateArray,onChange:@handleTimepickerChange}\"></xmp>\n                        </div>",
        handlePanelHide: function () {
            this.panelVisible = false;
        },
        mapValueToSelected: function (value) {
            this.selected = value;
        },
        onInit: function (event) {
            var _this = this;
            var self = this;
            utils_1.emitToFormItem(this, {
                showIcon: false
            });
            this.$watch('value', function (v) {
                _this.mapValueToSelected(v);
                _this.handleChange({
                    target: { value: v },
                    denyValidate: true,
                    type: 'timepicker-changed'
                });
            });
            this.panelVmId = this.$id + '_panel';
            var innerVm = avalon.define({
                $id: this.panelVmId,
                currentDateArray: '',
                $moment: moment(),
                reset: function () {
                    this.$moment = self.selected ? moment(self.selected, self.format) : moment();
                    this.currentDateArray = this.$moment.toArray().toString();
                },
                handleTimepickerChange: function (e) {
                    var _a = e.target, hour = _a.hour, minute = _a.minute, second = _a.second;
                    this.$moment.hour(hour).minute(minute).second(second);
                    this.currentDateArray = this.$moment.toArray().toString();
                    self.selected = this.$moment.format(self.format);
                    self.handleChange({
                        target: { value: self.selected },
                        type: 'timepicker-changed'
                    });
                }
            });
            this.mapValueToSelected(this.value);
            innerVm.reset();
        },
        onDispose: function () {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
var domAlign = __webpack_require__(89);
avalon.component('ts-trigger', {
    template: '<span style="display:none;"></span>',
    defaults: {
        width: 0,
        visible: false,
        innerVmId: '',
        innerClass: '',
        innerTemplate: '',
        initialized: false,
        withInBox: function () { return true; },
        getTarget: avalon.noop,
        onHide: avalon.noop,
        hide: function (panel) {
            panel.style.top = '-9999px';
            panel.style.left = '-9999px';
            this.onHide();
        },
        initPanel: function (panel) {
            var _this = this;
            var DOC = document, body = DOC.body;
            var medium = DOC.createElement('div');
            medium.setAttribute('id', this.$id);
            medium.setAttribute('style', 'position: absolute; top: 0px; left: 0px; width: 100%;');
            panel.setAttribute('class', this.innerClass);
            panel.setAttribute('style', 'z-index: 1050;left: -9999px;top: -9999px;position: absolute;outline: none;overflow: hidden;');
            panel.setAttribute(':important', this.innerVmId);
            panel.innerHTML = this.innerTemplate.replace(/\r|\n/g, '');
            medium.appendChild(panel);
            body.appendChild(medium);
            avalon.scan(panel, avalon.vmodels[this.innerVmId]);
            avalon.bind(DOC, 'click', function (e) {
                if (_this.visible && panel !== e.target && !avalon.contains(panel, e.target) && !_this.withInBox(e.target)) {
                    _this.hide(panel);
                }
            });
        },
        onInit: function (event) {
            var _this = this;
            var DOC = document;
            var panel = DOC.createElement('div');
            this.$watch('visible', function (v) {
                if (v) {
                    if (!_this.initialized) {
                        _this.initPanel(panel);
                        _this.initialized = true;
                    }
                    panel.style.width = _this.width === 0 ? 'auto' : (_this.width + 'px');
                    panel.scrollTop = 0;
                    domAlign(panel, _this.getTarget(), {
                        points: ['tl', 'bl'],
                        offset: [0, 1],
                        //targetOffset: ['0%','100%']
                        overflow: {
                            adjustY: true
                        }
                    });
                }
                else {
                    _this.hide(panel);
                }
            });
        },
        onDispose: function (event) {
            if (!this.initialized) {
                return;
            }
            var DOC = document, body = DOC.body;
            var medium = DOC.getElementById(this.$id);
            body.removeChild(medium);
        }
    }
});


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
avalon.component('ts-upload-card', {
    template: __webpack_require__(58),
    defaults: {
        fileList: [],
        getTextClass: function (file) {
            switch (file.status) {
                case 'done': return 'text-primary';
                case 'uploading': return 'text-muted';
                case 'error': return 'text-danger';
            }
            return '';
        },
        onRemove: avalon.noop,
        del: function (file) {
            this.onRemove(file);
        }
    }
});


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(0);
avalon.component('ts-upload-list', {
    template: __webpack_require__(59),
    defaults: {
        fileList: [],
        getTextClass: function (file) {
            switch (file.status) {
                case 'done': return 'text-primary';
                case 'uploading': return 'text-muted';
                case 'error': return 'text-danger';
            }
            return '';
        },
        onRemove: avalon.noop,
        del: function (file) {
            this.onRemove(file);
        }
    }
});


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../typings/index.d.ts" />
exports.__esModule = true;
var ts_control_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
__webpack_require__(81);
__webpack_require__(80);
var koumei_fileup_loader_1 = __webpack_require__(87);
/**
 * 文件上传组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 *
 * @example
 * ``` html
 * <ts-upload :widget="{value:@record.attachment,col:'attachment',$rules:{required:true,type:'array'}}">
 *      <i class="fa fa-upload"></i>选择附件
 * </ts-upload>
 * ```
 */
ts_control_1["default"].extend({
    displayName: 'ts-upload',
    template: __webpack_require__(60),
    soleSlot: 'trigger',
    defaults: {
        helpId: '',
        trigger: '',
        value: [],
        fileList: [],
        action: '',
        listType: 'text-list',
        showUploadList: true,
        btnClass: 'btn btn-default',
        cardClass: 'koumei-upload-select-card koumei-upload-card-item',
        blankImg: 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        $uploader: null,
        beforeUpload: function () {
            return true;
        },
        handleRemove: function (file) {
            this.fileList.removeAll(function (f) { return f.uid === file.uid; });
            var value = this.fileList.filter(function (f) { return f.status === 'done'; }).map(function (f) { return f.url; });
            this.handleChange({
                target: { value: this.showUploadList ? value : value[0] },
                type: 'file-upload'
            });
        },
        mapValueToFileList: function (value) {
            var _this = this;
            value.map(function (url, i) {
                if (url === '') {
                    return;
                }
                _this.fileList.push({
                    uid: -(i + 1),
                    name: url.replace(/.*\/([^\/]+)\/?/, '$1'),
                    url: url,
                    status: 'done',
                    progress: 0
                });
            });
        },
        onInit: function (event) {
            var _this = this;
            utils_1.emitToFormItem(this);
            this.helpId = this.$id;
            this.mapValueToFileList(this.value);
            this.$watch('value', function (v) {
                var value = v.toJSON();
                _this.fileList.clear();
                _this.mapValueToFileList(value);
                _this.handleChange({
                    target: { value: _this.showUploadList ? value : value[0] },
                    denyValidate: true,
                    type: 'file-upload'
                });
            });
        },
        onReady: function (event) {
            var _this = this;
            this.$uploader = koumei_fileup_loader_1["default"].init({
                url: this.action,
                fileInput: event.target.getElementsByTagName('input').file,
                filter: function (files) {
                    // 如果不支持图片信息的预览，则不进行过滤和限制
                    return files.filter(function (file) { return !file.size || _this.beforeUpload(file); });
                },
                onSelect: function (files, allFiles) {
                    allFiles.map(function (file) {
                        if (!_this.showUploadList) {
                            _this.fileList.set(0, {
                                uid: file.index,
                                name: file.name,
                                status: 'uploading',
                                progress: 0,
                                url: _this.blankImg
                            });
                            return;
                        }
                        if (_this.fileList.every(function (f) { return f.uid !== file.index; })) {
                            _this.fileList.push({
                                uid: file.index,
                                name: file.name,
                                status: 'uploading',
                                progress: 0,
                                url: _this.blankImg
                            });
                        }
                        else {
                            updateFileObj(_this.fileList, file.index, function (f) {
                                f.status = 'uploading';
                                f.progress = 0;
                            });
                        }
                    });
                    _this.$uploader.upload();
                },
                onProgress: function (file, loaded, total) {
                    updateFileObj(_this.fileList, file.index, function (f) { return f.progress = (loaded / total * 100).toFixed(); });
                },
                onSuccess: function (file, response) {
                    updateFileObj(_this.fileList, file.index, function (f) {
                        f.status = 'done';
                        f.progress = 100;
                        f.url = response.url;
                    });
                },
                onFailure: function (file, err) {
                    updateFileObj(_this.fileList, file.index, function (f) {
                        f.status = 'error';
                        f.url = 'data:image/gif;base64,MA==';
                    });
                    throw err;
                },
                onComplete: function () {
                    var value = _this.fileList.filter(function (f) { return f.status === 'done'; }).map(function (f) { return f.url; });
                    _this.handleChange({
                        target: { value: _this.showUploadList ? value : value[0] },
                        type: 'file-upload'
                    });
                }
            });
        },
        onDispose: function (event) {
        }
    }
});
function updateFileObj(fileList, uid, callback) {
    fileList.forEach(function (f) {
        if (f.uid === uid) {
            callback(f);
            return false;
        }
    });
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(23);
__webpack_require__(27);
__webpack_require__(9);
__webpack_require__(18);
__webpack_require__(20);
var create_form_1 = __webpack_require__(19);
exports.createForm = create_form_1.createForm;
__webpack_require__(21);
__webpack_require__(28);
__webpack_require__(11);
__webpack_require__(30);
__webpack_require__(17);
__webpack_require__(29);
__webpack_require__(16);
__webpack_require__(7);
__webpack_require__(26);
__webpack_require__(10);
var ts_loading_1 = __webpack_require__(8);
exports.Loading = ts_loading_1.Loading;
var ts_notification_1 = __webpack_require__(25);
exports.notification = ts_notification_1["default"];
var ts_message_1 = __webpack_require__(24);
exports.message = ts_message_1["default"];


/***/ }),
/* 84 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_85__;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_86__;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_87__;

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_88__;

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_89__;

/***/ })
/******/ ]);
});