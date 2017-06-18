(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["index"] = factory();
	else
		root["index"] = factory();
})(this, function() {
return webpackJsonpindex([2],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
exports["default"] = avalon.component('ms-control', {
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
/* 5 */
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
var koumei_util_1 = __webpack_require__(9);
function emitToFormItem(vmodel, options) {
    if (options === void 0) { options = {}; }
    vmodel.$formItem = koumei_util_1.findParentComponent(vmodel, 'ms-form-item');
    if (vmodel.$formItem === null) {
        return;
    }
    vmodel.$formItem.onFieldChange(__assign({ name: vmodel.col, rules: vmodel.$rules, value: vmodel.value, denyValidate: true }, options));
}
exports.emitToFormItem = emitToFormItem;


/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
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
            delete vnode.props['ms-skip'];
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var koumei_util_1 = __webpack_require__(9);
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
avalon.component('ms-checkbox', {
    soleSlot: 'label',
    template: __webpack_require__(241),
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(225);


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var koumei_util_1 = __webpack_require__(9);
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
avalon.component('ms-radio', {
    soleSlot: 'label',
    template: __webpack_require__(249),
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
/**
 * 分页组件
 * @prop {Number} [current=1] 当前页
 * @prop {Number} [pageSize=10] 每页的数据量
 * @prop {Number} total 数据总量
 * @event {Function} onChange 当页码改变时触发，参数current
 *
 * @example
 * ```
 * <ms-pagination :widget="{total:100,onChange:@handlePageChange}"></ms-pagination>
 *
 * <ms-pagination :widget="{current:@currentPage,pageSize:@pageSize,total:@total,onChange:@handlePageChange}"></ms-pagination>
 * ```
 */
avalon.component('ms-pagination', {
    template: __webpack_require__(247),
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(197);
__webpack_require__(221);
__webpack_require__(235);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
__webpack_require__(26);
ms_control_1["default"].extend({
    displayName: 'ms-checkbox-group',
    template: __webpack_require__(240),
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_loading_directive_1 = __webpack_require__(216);
exports.Loading = ms_loading_directive_1.Loading;
__webpack_require__(200);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
__webpack_require__(42);
ms_control_1["default"].extend({
    displayName: 'ms-radio-group',
    template: __webpack_require__(248),
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
var OPTION_HEIGHT = 24;
avalon.component('ms-timepicker-view', {
    template: __webpack_require__(254),
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(232);
__webpack_require__(204);


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = [{
    key: 'components',
    title: '组件',
    children: [{
        key: 'component-demo-input-input',
        title: 'input 输入框',
        uri: '/input',
        location: 'ms-input/ms-input.md'
    }, {
        key: 'component-demo-textarea-textarea',
        title: 'textarea 多行输入框',
        uri: '/textarea',
        location: 'ms-textarea/ms-textarea.md'
    }, {
        key: 'component-demo-select-select',
        title: 'select 选择框',
        uri: '/select',
        location: 'ms-select/ms-select.md'
    }, {
        key: 'component-demo-radio-radio',
        title: 'radio 单选框',
        uri: '/radio',
        location: 'ms-radio/ms-radio.md'
    }, {
        key: 'component-demo-checkbox-checkbox',
        title: 'checkbox 多选框',
        uri: '/checkbox',
        location: 'ms-checkbox/ms-checkbox.md'
    }, {
        key: 'component-demo-datepicker-datepicker',
        title: 'datepicker 日期选择器',
        uri: '/datepicker',
        location: 'ms-datepicker/ms-datepicker.md'
    }, {
        key: 'component-demo-timepicker-timepicker',
        title: 'timepicker 时间选择器',
        uri: '/timepicker',
        location: 'ms-timepicker/ms-timepicker.md'
    }, {
        key: 'component-demo-upload-upload',
        title: 'upload 文件上传',
        uri: '/upload',
        location: 'ms-upload/ms-upload.md'
    }, {
        key: 'component-demo-form-control',
        title: 'form-control 表单控件',
        uri: '/form-control',
        location: 'ms-form/ms-control.md'
    }, {
        key: 'component-demo-form-form',
        title: 'form 表单',
        uri: '/form',
        location: 'ms-form/ms-form.md'
    }, {
        key: 'component-demo-menu-menu',
        title: 'menu 菜单',
        uri: '/menu',
        location: 'ms-menu/ms-menu.md'
    }, {
        key: 'component-demo-table-table',
        title: 'table 数据表格',
        uri: '/table',
        location: 'ms-table/ms-table.md'
    }, {
        key: 'component-demo-pagination-pagination',
        title: 'pagination 分页',
        uri: '/pagination',
        location: 'ms-pagination/ms-pagination.md'
    }, {
        key: 'component-demo-dialog-dialog',
        title: 'dialog 对话框',
        uri: '/dialog',
        location: 'ms-dialog/ms-dialog.md'
    }, {
        key: 'component-demo-loading-loading',
        title: 'loading 加载中蒙版',
        uri: '/loading',
        location: 'ms-loading/ms-loading.md'
    }, {
        key: 'component-demo-message-message',
        title: 'message 全局提示',
        uri: '/message',
        location: 'ms-message/ms-message.md'
    }, {
        key: 'component-demo-notification-notification',
        title: 'notification 通知提醒框',
        uri: '/notification',
        location: 'ms-notification/ms-notification.md'
    }]
}];

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.menu = {
    selectedKeys$: Observable(),
    openKeys$: Observable()
};
function Observable() {
    return {
        onNextCbList: [],
        subscribe: function (onNext) {
            this.onNextCbList.push(onNext);
        },
        onNext: function (value) {
            this.onNextCbList.forEach(function (cb) {
                if (typeof cb === 'function') {
                    cb(value);
                }
            });
        }
    };
}


/***/ }),
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var navConfig = __webpack_require__(50);
__webpack_require__(337);
var stores_1 = __webpack_require__(182);
exports.name = 'doc-sidebar';
avalon.component(exports.name, {
    template: __webpack_require__(336),
    defaults: {
        menu: [],
        selectedKeys: [],
        openKeys: ['components'],
        handleMenuClick: function (item, key, keyPath) {
            avalon.history.setHash(item.uri);
        },
        handleOpenChange: function (openKeys) {
            this.openKeys = openKeys.slice(-1);
        },
        onInit: function (event) {
            var _this = this;
            this.menu = navConfig;
            stores_1.menu.selectedKeys$.subscribe(function (v) {
                _this.selectedKeys = v;
            });
        }
    }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
__webpack_require__(334);
var stores_1 = __webpack_require__(182);
var navConfig = __webpack_require__(50);
function getPage(component) {
    var html = "<xmp is=\"" + component + "\" :widget=\"{id:'" + component.replace(/\-/g, '_') + "'}\"></xmp>";
    return html;
}
function applyRouteConfig(config, parentRoute, accPath) {
    if (accPath === void 0) { accPath = ''; }
    config.map(function (route) {
        var components = {};
        if (route.component) {
            components.currentPage = route.component;
        }
        if (route.components) {
            components = route.components;
        }
        avalon.router.add(accPath + route.path, function () {
            Object.keys(components).map(function (viewName) {
                var component = components[viewName];
                if (typeof component === 'function') {
                    component(function (m) {
                        stores_1.menu.selectedKeys$.onNext([m.name]);
                        avalon.vmodels[parentRoute.name][viewName] = getPage(m.name);
                    });
                }
                else {
                    avalon.vmodels[parentRoute.name][viewName] = getPage(component.name);
                }
            });
        });
        // TODO 支持嵌套路由
        //route.children && applyRouteConfig(route.children, route, accPath + route.path);
    });
}
var routeConfig = [];
var travel = function (item) {
    if (!item.children || item.children.length === 0) {
        routeConfig.push({
            path: item.uri,
            component: function (resolve) {
                __webpack_require__.e/* require.ensure */(0).then((function () {
                    resolve(__webpack_require__(340)("./" + item.location));
                }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
            }
        });
    }
    else {
        item.children.map(travel);
    }
};
navConfig.map(travel);
applyRouteConfig(routeConfig, {
    name: 'root'
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
var ms_control_1 = __webpack_require__(4);
__webpack_require__(27);
__webpack_require__(209);
__webpack_require__(48);
var utils_1 = __webpack_require__(5);
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
ms_control_1["default"].extend({
    displayName: 'ms-datepicker',
    template: __webpack_require__(243),
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
        panelTemplate: __webpack_require__(242),
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
/* 193 */
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
var avalon = __webpack_require__(1);
var Schema = __webpack_require__(260);
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
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(203);
__webpack_require__(214);


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
ms_control_1["default"].extend({
    displayName: 'ms-input',
    template: __webpack_require__(245),
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
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-menu', {
    template: __webpack_require__(246),
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
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var ms_control_1 = __webpack_require__(4);
__webpack_require__(27);
var koumei_util_1 = __webpack_require__(9);
var utils_1 = __webpack_require__(5);
ms_control_1["default"].extend({
    displayName: 'ms-select',
    template: __webpack_require__(251),
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
        panelTemplate: __webpack_require__(250),
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
        if (option.is != 'ms-select-option')
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
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
var ms_control_1 = __webpack_require__(4);
__webpack_require__(27);
__webpack_require__(48);
var utils_1 = __webpack_require__(5);
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
ms_control_1["default"].extend({
    displayName: 'ms-timepicker',
    template: __webpack_require__(255),
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
        panelTemplate: "<div class=\"koumei-timepicker-panel\" style=\"overflow: auto\">\n                            <xmp is=\"ms-timepicker-view\" :widget=\"{value:@currentDateArray,onChange:@handleTimepickerChange}\"></xmp>\n                        </div>",
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
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../typings/index.d.ts" />
exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
__webpack_require__(228);
__webpack_require__(227);
var koumei_fileup_loader_1 = __webpack_require__(333);
/**
 * 文件上传组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 *
 * @example
 * ``` html
 * <ms-upload :widget="{value:@record.attachment,col:'attachment',$rules:{required:true,type:'array'}}">
 *      <i class="fa fa-upload"></i>选择附件
 * </ms-upload>
 * ```
 */
ms_control_1["default"].extend({
    displayName: 'ms-upload',
    template: __webpack_require__(258),
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
/* 200 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
__webpack_require__(44);
__webpack_require__(210);
avalon.component('ms-calendar', {
    template: __webpack_require__(239),
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
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var bootbox = __webpack_require__(41);
var koumei_util_1 = __webpack_require__(9);
var $ = __webpack_require__(17);
avalon.component('ms-dialog', {
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
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-form', {
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
            event.target._ctype_ = 'ms-form';
            event.target._vm_ = this;
        },
        onReady: function (event) {
        }
    },
    soleSlot: 'items'
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var layoutComponent = avalon.component('ms-layout', {
    template: "<div class=\"koumei-layout\" :css=\"@style\" :class=\"@className\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        style: {},
        className: ''
    }
});
layoutComponent.extend({
    displayName: 'ms-layout-sider',
    template: "<div class=\"koumei-layout-sider\" :css=\"@style\" :class=\"@className\" :class-1=\"[@fixed?'koumei-layout-fixed-sider':'']\"><div class=\"koumei-layout-sider-inner\"><slot /></div></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false,
        width: '300px'
    }
});
layoutComponent.extend({
    displayName: 'ms-layout-header',
    template: "<div class=\"koumei-layout-header\" :css=\"@style\" :class=\"@className\" :class-1=\"[@fixed?'koumei-layout-fixed-header':'']\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false,
        width: '60px'
    }
});
layoutComponent.extend({
    displayName: 'ms-layout-content',
    template: "<div class=\"koumei-layout-content\" :css=\"@style\" :class=\"@className\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false
    }
});
layoutComponent.extend({
    displayName: 'ms-layout-footer',
    template: "<div class=\"koumei-layout-footer\" :css=\"@style\" :class=\"@className\" :class-1=\"[@fixed?'koumei-layout-fixed-footer':'']\"><slot /></div>",
    soleSlot: 'slot',
    defaults: {
        fixed: false,
        width: '60px'
    }
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var noty = __webpack_require__(180);
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
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var noty = __webpack_require__(180);
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
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
__webpack_require__(26);
__webpack_require__(222);
__webpack_require__(43);
var koumei_util_1 = __webpack_require__(9);
__webpack_require__(46);
var defaultPagination = function () {
    return {
        current: 1, pageSize: 10, total: NaN, onChange: avalon.noop
    };
};
avalon.component('ms-table', {
    soleSlot: 'header',
    template: __webpack_require__(252),
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
        if (column.is != 'ms-table-header')
            return acc;
        if (column.props.type == 'selection') {
            return acc;
        }
        var inlineTemplate = column.inlineTemplate;
        inlineTemplate = inlineTemplate.replace(/(ms-|:)skip="[^"]*"/g, '');
        inlineTemplate = inlineTemplate.replace(/<\s*ms-table-header[^>]*>.*<\/\s*ms-table-header\s*>/g, '');
        inlineTemplate = inlineTemplate.replace(/(ms-|:)click="handle\(([^"]*)\)"/g, function ($0, $1, $2, $3) {
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
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
/**
 * 多行文本输入组件
 * @prop value 组件值(inherit)
 * @prop col 字段路径(inherit)
 * @prop rows 文本框行数
 *
 * @example
 * ``` html
 * <ms-textarea :widget="{value: @bio, col: 'bio', rows: 3}"></ms-textarea>
 * ```
 */
ms_control_1["default"].extend({
    displayName: 'ms-textarea',
    template: __webpack_require__(253),
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
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(201);
__webpack_require__(229);


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
var monthTable = [];
avalon.component('ms-calendar-year-view', {
    template: __webpack_require__(238),
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
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(26);
__webpack_require__(45);
__webpack_require__(230);


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(192);
__webpack_require__(231);


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(202);


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var koumei_util_1 = __webpack_require__(9);
/**
 * 表单项组件
 * @prop label 表单项标签
 *
 * @example
 * ``` html
 * <ms-form-item :widget="{label: '标题'}">
        <ms-input :widget="{value: @title, col: 'title'}"></ms-input>
    </ms-form-item>
 * ```
 */
avalon.component('ms-form-item', {
    template: __webpack_require__(244),
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
            event.target._ctype_ = 'ms-form-item';
            event.target._vm_ = this;
            this.$formVm = koumei_util_1.findParentComponent(this, 'ms-form');
            if (this.$formVm === null) {
                throw 'ms-form-item 必须放在 ms-form 内';
            }
            this.inline = this.$formVm.inline;
        },
        onReady: function (event) {
        }
    },
    soleSlot: 'control'
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(195);


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
exports.__esModule = true;
var avalon = __webpack_require__(1);
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
 * import { Loading } from './components/ms-loading';
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(233);
__webpack_require__(196);


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_message_1 = __webpack_require__(205);
exports["default"] = ms_message_1["default"];


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_notification_1 = __webpack_require__(206);
exports["default"] = ms_notification_1["default"];


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(42);
__webpack_require__(47);
__webpack_require__(234);


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-select-option', {
    template: '&nbsp;',
    soleSlot: 'label',
    defaults: {
        label: '',
        value: '',
        disabled: false
    }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-table-header', {
    template: '<th><slot /></th>',
    soleSlot: 'content',
    defaults: {
        content: '',
        col: ''
    }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(208);


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(198);
__webpack_require__(236);


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var domAlign = __webpack_require__(331);
avalon.component('ms-trigger', {
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
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(199);
__webpack_require__(237);


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-upload-card', {
    template: __webpack_require__(256),
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
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-upload-list', {
    template: __webpack_require__(257),
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
/* 229 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 230 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 231 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 232 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 233 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 234 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 235 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 236 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 237 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 238 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-calendar\">\n    <table class=\"koumei-calendar-year-view\">\n        <tbody>\n            <tr :for=\"（i, row) in @table\">\n                <td class=\"koumei-calendar-cell\"\n                    :class=\"[\n                                (@isSelected(cell) ? 'koumei-calendar-selected-day' : ''),\n                                (@view > 1 && (i + j === 0 || i * j === 6) ? 'koumei-calendar-prev-month-cell' : '')\n                            ]\"\n                    :for=\"(j, cell) in row\">\n                    <div class=\"koumei-calendar-date\" :click=\"@handleCellClick(cell)\">{{cell.label}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),
/* 239 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-calendar\">\n    <div class=\"row\" ms-if=\"@showHeader\">\n        <div class=\"col-md-2 col-md-offset-4\">\n            <ms-select :widget=\"{value:[@currentYear],options:@currentYearOptions,onChange:@handleYearChange}\"></ms-select>\n        </div>\n        <div class=\"col-md-2\">\n            <ms-select :widget=\"{value:[@currentMonth],options:@monthOptions,onChange:@handleMonthChange}\"></ms-select>\n        </div>\n    </div>\n    <table>\n        <thead>\n            <tr>\n                <th class=\"koumei-calendar-column-header\" :for=\"day in @weekdays\">{{day}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"week in @table\">\n                <td class=\"koumei-calendar-cell\" :class=\"el.className\" :for=\"el in week\">\n                    <div class=\"koumei-calendar-date\" :click=\"@handleDateClick(el) | stop\">{{el.date}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),
/* 240 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-group\">\n    <ms-checkbox \n        :widget=\"{\n            checked:@selection.indexOf(option.value)!=-1,\n            group:true,\n            onChange:function(){\n                @toggleOption(option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-checkbox>\n</div>"

/***/ }),
/* 241 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"@wrapper\" class=\"koumei-checkbox\" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"koumei-checkbox-inner koumei-checkbox-inner-ie\">\n        <input type=\"checkbox\"\n            :attr=\"{id:@helpId,disabled:@disabled}\"\n            :duplex-checked=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text\"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>"

/***/ }),
/* 242 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-datepicker-panel\" style=\"overflow: auto\">\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 0\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 1, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <a class=\"koumei-datepicker-prev-month-btn\" :click=\"mutate('subtract', 1, 'months')\">\n            <i class=\"fa fa-angle-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(1)\">{{@currentMonth}}</a>\n            <a class=\"koumei-datepicker-year-select\" :click=\"@changeView(2)\">{{@currentYear}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'months')\">\n            <i class=\"fa fa-angle-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 1\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 1, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(2)\">{{@currentYear}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 2\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 10, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(3)\">{{@startOfDecade + '-' + (@startOfDecade + 9)}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 10, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 3\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 100, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>{{@startOfCentury + '-' + (@startOfCentury + 99)}}</span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 100, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode < 0 && @showTime\">\n        <span>\n            <a class=\"koumei-datepicker-month-select\">{{@currentMonth}}</a>\n            <a class=\"koumei-datepicker-month-select\">{{@currentDay}}</a>\n            <a class=\"koumei-datepicker-year-select\">{{@currentYear}}</a>\n        </span>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode === 0\">\n        <ms-calendar :widget=\"{value:@currentDateArray,showHeader:false,disabledDate:@disabledDate,onChange:@handleCalendarChange}\"></ms-calendar>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode > 0\">\n        <ms-calendar-year-view :widget=\"{currentMonth:@currentMonth,currentYear:@currentYear,view:@viewMode,onSelect:@handleYearViewSelect}\"></ms-calendar-year-view>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode === -1\">\n        <ms-timepicker-view :widget=\"{value:@currentDateArray,onChange:@handleTimepickerChange}\"></ms-timepicker-view>\n    </div>\n    <div class=\"koumei-datepicker-panel-footer\" :visible=\"@viewMode === 0 && !@showTime\">\n        <span class=\"koumei-datepicker-panel-footer-btn\">\n            <a class=\"koumei-datepicker-panel-today-btn\" :click=\"@today\">今天</a>\n        </span>\n    </div>\n    <div class=\"koumei-datepicker-panel-footer\" :visible=\"@viewMode <= 0 && @showTime\">\n        <span class=\"koumei-datepicker-panel-footer-btn\">\n            <a class=\"koumei-datepicker-panel-now-btn\" :click=\"@today\">此刻</a>\n            <a class=\"koumei-datepicker-panel-ok-btn\" :click=\"@complete\">确定</a>\n            <a class=\"koumei-datepicker-panel-timepicker-btn\" :click=\"@changeView(@viewMode > -1 ? -1 : 0)\">{{@viewMode > -1 ? '选择时间' : '选择日期'}}</a>\n        </span>\n    </div>\n</div>"

/***/ }),
/* 243 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-datepicker\" :css=\"{width:@width}\">\n    <i class=\"fa fa-calendar koumei-datepicker-icon\"></i>\n    <i class=\"fa fa-times-circle koumei-datepicker-clear\" :if=\"@selected.length\" :click=\"@clear\"></i>\n    <input type=\"text\"\n        class=\"form-control koumei-datepicker-input\"\n        :click=\"@handleClick\"\n        readonly\n        :attr=\"{placeholder:@placeholder}\"\n        :css=\"{width:'100%'}\"\n        :duplex=\"selected\" />\n    <ms-trigger :widget=\"{\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide\n    }\">\n    </ms-trigger>\n</div>"

/***/ }),
/* 244 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group has-feedback\" :css=\"[@inline && @inlineFormGroupStyle]\" :class=\"[@className,(@hasRules && @dirty ? (@reasons.length ? 'has-error' : 'has-success') : '')]\">\n    <label class=\"control-label\" :if=\"@label.length\">{{@label}}</label>\n    <slot />\n    <i class=\"form-control-feedback\" :if=\"@hasRules && @showIcon\" :class=\"[(@dirty ? 'glyphicon' : ''), (@reasons.length ? 'glyphicon-remove' : 'glyphicon-ok')]\" :visible=\"@dirty\"></i>\n    <small class=\"help-block\" :css=\"[@inline && @inlineMessageStyle]\" :if=\"@hasRules && @reasons.length\">{{@reasons.length ? @reasons[0].message : ''}}</small>\n</div>"

/***/ }),
/* 245 */
/***/ (function(module, exports) {

module.exports = "<input type=\"text\" class=\"form-control\" \n    :duplex=\"@text\" \n    :attr=\"{name:@col,placeholder:@placeholder}\" \n    :css=\"{width:@width}\"\n    data-duplex-changed=\"@handleChange\">"

/***/ }),
/* 246 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-menu\">\n    <li :class=\"[\n                    !item.children || item.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                    @openKeys.contains(item.key) ? 'koumei-menu-open' : '',\n                    @selectedKeys.contains(item.key) ? 'koumei-menu-item-selected' : ''\n                ]\"\n        :for=\"item in @menu\">\n        <a :click=\"handleClick(item, item.key, [item.key])\" style=\"padding-left: 24px;\">\n            <i :class=\"[item.icon]\"></i>\n            <span>{{item.title}}</span>\n            <i class=\"koumei-menu-caret fa\" :class=\"[@openKeys.contains(item.key) ? 'fa-angle-up' : 'fa-angle-down']\"></i>\n        </a>\n        <ul class=\"koumei-menu\">\n            <li :class=\"[\n                            !item2.children || item2.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                                @openKeys.contains(item2.key) ? 'koumei-menu-open' : '',\n                                @selectedKeys.contains(item2.key) ? 'koumei-menu-item-selected' : ''\n                            ]\"\n                :for=\"item2 in item.children\">\n                <a :click=\"handleClick(item2, item2.key, [item2.key,item.key])\" style=\"padding-left: 48px;\">\n                    <span>{{item2.title}}</span>\n                    <i class=\"koumei-menu-caret fa\" :class=\"[@openKeys.contains(item2.key) ? 'fa-angle-up' : 'fa-angle-down']\"></i>\n                </a>\n                <ul class=\"koumei-menu\">\n                    <li :class=\"[\n                                    !item3.children || item3.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                                    @selectedKeys.contains(item3.key) ? 'koumei-menu-item-selected' : ''\n                                ]\"\n                        :for=\"item3 in item2.children\">\n                        <a :click=\"handleClick(item3, item3.key, [item3.key,item2.key,item.key])\" style=\"padding-left: 72px;\">{{item3.title}}</a>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n    </li>\n</ul>"

/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <a class=\"btn blue\" :attr=\"{disabled:@current===1}\" :click=\"@prevPage\">\n        <i class=\"icon-step-backward\"></i>上一页\n    </a>\n    <a class=\"btn success\">{{ @current }}/{{ Math.ceil(@total/@pageSize) }}</a>\n    <a class=\"btn blue\" :attr=\"{disabled:@current===Math.ceil(@total/@pageSize)}\" :click=\"@nextPage\">\n        <i class=\"icon-step-forward\"></i>下一页\n    </a>\n</div>"

/***/ }),
/* 248 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-group\">\n    <ms-radio \n        :widget=\"{\n            checked:@selected,\n            value:option.value,\n            name:@helpId,\n            group:true,\n            onChange:function(){\n                @toggleOption(arguments[0], option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-radio>\n</div>"

/***/ }),
/* 249 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"@wrapper\" class=\"koumei-radio\" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"koumei-radio-inner koumei-radio-inner-ie\">\n        <input type=\"radio\"\n            :attr=\"{id:@helpId,disabled:@disabled,value:@value,name:@name}\"\n            :duplex=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text\"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>"

/***/ }),
/* 250 */
/***/ (function(module, exports) {

module.exports = "<div style=\"overflow: auto\">\n    <ul class=\"koumei-select-dropdown-menu\" role=\"menu\">\n        <li class=\"koumei-select-dropdown-menu-item\"\n            :class=\"[\n                (@selection.some(function(){return arguments[0].value===option.value}) ? 'koumei-select-dropdown-menu-item-selected' : ''),\n                (option.disabled ? 'koumei-select-dropdown-menu-item-disabled' : '')\n            ]\"\n            :for=\"option in @getFilteredOptions()\"\n            :click=\"@handleOptionClick($event, option)\"\n            role=\"menuitem\">\n            {{option.label}}\n            <i class=\"fa fa-check\" :visible=\"@isMultiple\"></i>\n        </li>\n        <li class=\"koumei-select-dropdown-menu-item koumei-select-dropdown-menu-item-disabled\"\n            :visible=\"@getFilteredOptions().length <= 0 && @searchValue && !@loading\">无数据</li>\n        <li class=\"koumei-select-dropdown-menu-item koumei-select-dropdown-menu-item-disabled\"\n            :visible=\"@loading\">加载中</li>\n    </ul>\n</div>"

/***/ }),
/* 251 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-select form-control\"\n    :class=\"[(@isMultiple ? 'koumei-select-multiple' : '')]\"\n    :css=\"{width:@width}\"\n    :click=\"@handleClick\"\n    role=\"combobox\"\n    aria-autocomplete=\"list\"\n    aria-haspopup=\"true\"\n    :attr=\"{'aria-expanded': @panelVisible + ''}\">\n    <ul class=\"koumei-select-selection\" :class=\"[(@isMultiple ? 'koumei-select-tags' : '')]\">\n        <li class=\"koumei-select-selected\" :visible=\"!@isMultiple && (!@showSearch || !@panelVisible)\">{{@displayValue}}</li>\n        <li class=\"koumei-select-choice\" :for=\"choice in @selection\">\n            <span>{{choice.label}}</span>\n            <i class=\"fa fa-times\" :click=\"@removeSelection($event, choice) | stop\"></i>\n        </li>\n        <li class=\"koumei-select-search\">\n            <input class=\"koumei-select-search-field\"\n                name=\"search\"\n                type=\"text\"\n                autocomplete=\"off\"\n                :duplex=\"@searchValue\"\n                :css=\"{visibility:(@showSearch && @panelVisible)?'visible':'hidden'}\"\n                :keydown=\"@handleDelete\" />\n        </li>\n    </ul>\n    <i class=\"fa koumei-select-arrow\"\n        :class=\"[(@panelVisible ? 'fa-caret-up' : 'fa-caret-down')]\"\n        :visible=\"@mode === ''\"></i>\n    <ms-trigger :widget=\"{\n        width: @panelWidth,\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide}\">\n    </ms-trigger>\n</div>"

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports = "<div>\n    <table class=\"table\" :loading=\"!window.isNaN(@paginationConfig.total) && @loading\">\n        <thead>\n            <tr>\n                <th :if=\"@needSelection\">\n                    <ms-checkbox :widget=\"{checked:@isAllChecked,onChange:@handleCheckAll}\"></ms-checkbox>\n                </th>\n                <th :for=\"el in @columns\">{{el.title}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"($index, record) in @getCurrentPageData()\">\n                <td :if=\"@needSelection\">\n                    <ms-checkbox :widget=\"{checked:@checked.indexOf(record[@key])!=-1,onChange:function(){@handleCheck(arguments[0].target.checked,record)}}\"></ms-checkbox>\n                </td>\n                <td :for=\"col in @columns\" :html=\"col.template\"></td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"pull-right\">\n        <ms-pagination :widget=\"{current:@paginationConfig.current,pageSize:@paginationConfig.pageSize,total:@total,onChange:@handlePageChange}\"></ms-pagination>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>"

/***/ }),
/* 253 */
/***/ (function(module, exports) {

module.exports = "<textarea class=\"form-control\" \n    :duplex=\"@text\" \n    :attr=\"{rows:@rows,name:@col}\"\n    data-duplex-changed=\"@handleChange\"></textarea>"

/***/ }),
/* 254 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-timepicker-view\">\n    <div class=\"koumei-timepicker-view-combobox\">\n        <div class=\"koumei-timepicker-view-select\" name=\"hour-options\">\n            <ul>\n                <li :for=\"hour in @hourOptions\"\n                    :class=\"[(hour==@currentHour?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(hour, 'hour')\">{{hour}}</li>\n            </ul>\n        </div>\n        <div class=\"koumei-timepicker-view-select\" name=\"minute-options\">\n            <ul>\n                <li :for=\"minute in @minuteOptions\"\n                    :class=\"[(minute==@currentMinute?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(minute, 'minute')\">{{minute}}</li>\n            </ul>\n        </div>\n        <div class=\"koumei-timepicker-view-select\" name=\"second-options\">\n            <ul>\n                <li :for=\"second in @secondOptions\"\n                    :class=\"[(second==@currentSecond?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(second, 'second')\">{{second}}</li>\n            </ul>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-timepicker\" :css=\"{width:@width}\">\n    <i class=\"fa fa-clock-o koumei-timepicker-icon\"></i>\n    <i class=\"fa fa-times-circle koumei-timepicker-clear\" :if=\"@selected.length\" :click=\"@clear\"></i>\n    <input type=\"text\"\n        class=\"form-control koumei-timepicker-input\"\n        :click=\"@handleClick\"\n        readonly\n        :attr=\"{placeholder:@placeholder}\"\n        :css=\"{width:'100%'}\"\n        :duplex=\"selected\" />\n    <ms-trigger :widget=\"{\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide\n    }\">\n    </ms-trigger>\n</div>"

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-upload-card\">\n    <div class=\"koumei-upload-card-item\" :class=\"[(file.status === 'error' ? 'bordered-danger' : '')]\" :for=\"($index, file) in @fileList\">\n        <img :attr=\"{src:file.url,alt:file.name,title:file.name}\">\n        <span class=\"koumei-upload-card-progress\" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <span class=\"koumei-upload-card-tool\">\n            <i class=\"fa fa-eye\"></i>\n            <i class=\"fa fa-trash-o\" :click=\"del(file)\"></i>\n        </span>\n    </div>\n</div>"

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-upload-list\">\n    <li :for=\"($index, file) in @fileList\"\n        :class=\"[@getTextClass(file)]\">\n        <div class=\"koumei-upload-list-info\">\n            <i class=\"fa fa-file-o text-muted\"></i>\n            <span :attr=\"{title:file.name}\">{{file.name}}</span>\n        </div>\n        <i class=\"fa fa-times koumei-upload-btn-close\" :click=\"del(file)\"></i>\n        <span class=\"koumei-upload-list-progress\" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <i class=\"fa fa-check-circle text-success\" :class=\"[(file.status === 'done' ? '' : 'hide')]\"></i>\n    </li>\n</ul>"

/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-upload-container\">\n    <div class=\"koumei-upload-card-wall\" :if=\"@showUploadList && @listType==='picture-card'\">\n        <ms-upload-card :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ms-upload-card>\n    </div>\n    <label :visible=\"!@showUploadList && @listType==='picture-card' && @fileList.length > 0\" class=\"koumei-upload-card-item\" :attr=\"{'for':@helpId}\">\n        <img :attr=\"{src:@fileList[0]?@fileList[0].url:blankImg,alt:@fileList[0]?@fileList[0].name:'',title:@fileList[0]?@fileList[0].name:''}\">\n    </label>\n    <label :visible=\"@showUploadList || @fileList.length == 0\" :class=\"[(@listType==='picture-card'?@cardClass:@btnClass)]\" :attr=\"{'for':@helpId}\"><slot /></label>\n    <form><input type=\"file\" name=\"file\" :attr=\"{id:@helpId}\"></form>\n    <div :if=\"@showUploadList && @listType!=='picture-card'\">\n        <ms-upload-list :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ms-upload-list>\n    </div>\n</div>"

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);

__webpack_require__(185);
__webpack_require__(186);

var jQuery = __webpack_require__(17);
window.$ = window.jQuery = jQuery;
__webpack_require__(183);
var bootbox = __webpack_require__(41);
bootbox.setLocale('zh_CN');

var avalon = __webpack_require__(1);
avalon.config({
    debug: true
});
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}
__webpack_require__(184);
__webpack_require__(191);
__webpack_require__(49);
__webpack_require__(190);

avalon.define({
    $id: 'root',
    currentPage: '',
    breadcrumb: []
});
avalon.history.start({
    fireAnchor: false
});
if (!/#!/.test(global.location.hash)) {
    avalon.router.navigate('/', 2);
}
avalon.scan(document.body);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */
/***/ (function(module, exports) {

module.exports = "<ms-menu :widget=\"{menu:@menu,openKeys:@openKeys,selectedKeys:@selectedKeys,onClick:@handleMenuClick,onOpenChange:@handleOpenChange}\"></ms-menu>"

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(217);
__webpack_require__(207);
__webpack_require__(43);
__webpack_require__(213);
__webpack_require__(194);
var create_form_1 = __webpack_require__(193);
exports.createForm = create_form_1.createForm;
__webpack_require__(215);
__webpack_require__(223);
__webpack_require__(44);
__webpack_require__(226);
__webpack_require__(212);
__webpack_require__(224);
__webpack_require__(211);
__webpack_require__(45);
__webpack_require__(220);
__webpack_require__(47);
var ms_loading_1 = __webpack_require__(46);
exports.Loading = ms_loading_1.Loading;
var ms_notification_1 = __webpack_require__(219);
exports.notification = ms_notification_1["default"];
var ms_message_1 = __webpack_require__(218);
exports.message = ms_message_1["default"];


/***/ }),
/* 338 */,
/* 339 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[259]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS9tcy1jb250cm9sLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9rb3VtZWktdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdHJpZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtcGFnaW5hdGlvbi9tcy1wYWdpbmF0aW9uLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtc2VsZWN0L2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvbXMtY2hlY2tib3gtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sb2FkaW5nL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8tZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXItdmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWxheW91dC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9kb2NzL25hdi5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9zdG9yZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9jb21wb25lbnRzL2RvYy1zaWRlYmFyL2RvYy1zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL2RvY3Mvcm91dGVyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS9jcmVhdGUtZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWZvcm0vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1pbnB1dC9tcy1pbnB1dC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLW1lbnUvbXMtbWVudS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbG9hZGluZy9tcy1sb2FkaW5nLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9tcy1jYWxlbmRhci50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWRpYWxvZy9tcy1kaWFsb2cudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1mb3JtL21zLWZvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sYXlvdXQvbXMtbGF5b3V0LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbWVzc2FnZS9tcy1tZXNzYWdlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbm90aWZpY2F0aW9uL21zLW5vdGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXRhYmxlL21zLXRhYmxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvbXMtdGV4dGFyZWEudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLXllYXItdmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWRpYWxvZy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWZvcm0vbXMtZm9ybS1pdGVtLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtaW5wdXQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sb2FkaW5nL21zLWxvYWRpbmctZGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbWVudS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLW1lc3NhZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1ub3RpZmljYXRpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1yYWRpby9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3Qtb3B0aW9uLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGFibGUvbXMtdGFibGUtaGVhZGVyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdHJpZ2dlci9tcy10cmlnZ2VyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdXBsb2FkL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1jYXJkLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1saXN0LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1kYXRlcGlja2VyL21zLWRhdGVwaWNrZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWxheW91dC9tcy1sYXlvdXQuc2NzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLW1lbnUvbXMtbWVudS5zY3NzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8uc2NzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3Quc2NzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci5zY3NzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC5zY3NzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIteWVhci12aWV3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9tcy1jYWxlbmRhci5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvbXMtY2hlY2tib3gtZ3JvdXAuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1kYXRlcGlja2VyL21zLWRhdGVwaWNrZXItcGFuZWwuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWRhdGVwaWNrZXIvbXMtZGF0ZXBpY2tlci5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS9tcy1mb3JtLWl0ZW0uaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWlucHV0L21zLWlucHV0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1tZW51L21zLW1lbnUuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXBhZ2luYXRpb24vbXMtcGFnaW5hdGlvbi5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8tZ3JvdXAuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1zZWxlY3QvbXMtc2VsZWN0LXBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1zZWxlY3QvbXMtc2VsZWN0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10YWJsZS9tcy10YWJsZS5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvbXMtdGV4dGFyZWEuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci12aWV3Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQtY2FyZC5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1saXN0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kb2NzL2NvbXBvbmVudHMvZG9jLXNpZGViYXIvZG9jLXNpZGViYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9pbmRleC50cyIsIndlYnBhY2s6Ly8vdmVydHggKGln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Qyx5Qzs7Ozs7OzhDQ0F6OUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsMkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLHNDQUFzQyxpSEFBaUgsYzs7Ozs7Ozs7O0FDQXZKLHlCQUE4QjtBQUM5Qix5QkFBd0M7QUFDeEMsd0JBQWtEO0FBQ2xELHlCQUFnQztBQUNoQyx5QkFBOEI7QUFDOUIsNkNBQThEO0FBQXJELDZDQUFVO0FBQ25CLHlCQUErQjtBQUMvQix5QkFBa0M7QUFDbEMsd0JBQWdDO0FBQ2hDLHlCQUFnQztBQUNoQyx5QkFBb0M7QUFDcEMseUJBQW9DO0FBQ3BDLHlCQUFrQztBQUNsQyx3QkFBb0Q7QUFDcEQseUJBQStCO0FBQy9CLHdCQUE4QztBQUU5QywyQ0FBa0Q7QUFBekMsc0NBQU87QUFDaEIsaURBQXVFO0FBQTlELGtEQUFPLEVBQWdCO0FBQ2hDLDRDQUE2RDtBQUFwRCx3Q0FBTyxFQUFXOzs7Ozs7OztBQ25CM0IsZSIsImZpbGUiOiJhcHAzZWQyMzIyMGIyYWRhZTA5NmY4Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImluZGV4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImluZGV4XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGF2YWxvbi5jb21wb25lbnQoJ21zLWNvbnRyb2wnLCB7XG4gICAgdGVtcGxhdGU6ICcmbmJzcDsnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICRmb3JtSXRlbTogbnVsbCxcbiAgICAgICAgJHJ1bGVzOiBudWxsLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGNvbDogJycsXG4gICAgICAgIHBsYWNlaG9sZGVyOiAnJyxcbiAgICAgICAgd2lkdGg6ICd4JyxcbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBlbWl0VmFsdWUoZSkge1xuICAgICAgICAgICAgbGV0IHYgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1JdGVtICYmIHRoaXMuJGZvcm1JdGVtLm9uRm9ybUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5jb2wsIHZhbHVlOiB2LCBkZW55VmFsaWRhdGU6IGUuZGVueVZhbGlkYXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFZhbHVlKGUpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZShlKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZm9ybS9tcy1jb250cm9sLnRzIiwiaW1wb3J0IHsgZmluZFBhcmVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcblxuZXhwb3J0IGZ1bmN0aW9uIGVtaXRUb0Zvcm1JdGVtKHZtb2RlbCwgb3B0aW9ucyA9IHt9KTogdm9pZCB7XG4gICAgdm1vZGVsLiRmb3JtSXRlbSA9IGZpbmRQYXJlbnRDb21wb25lbnQodm1vZGVsLCAnbXMtZm9ybS1pdGVtJyk7XG4gICAgaWYgKHZtb2RlbC4kZm9ybUl0ZW0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2bW9kZWwuJGZvcm1JdGVtLm9uRmllbGRDaGFuZ2Uoe1xuICAgICAgICBuYW1lOiB2bW9kZWwuY29sLFxuICAgICAgICBydWxlczogdm1vZGVsLiRydWxlcyxcbiAgICAgICAgdmFsdWU6IHZtb2RlbC52YWx1ZSxcbiAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAuLi5vcHRpb25zXG4gICAgfSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1mb3JtL3V0aWxzLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudENvbXBvbmVudCh2bSwgY3R5cGUpIHtcbiAgICBsZXQgcGFyZW50ID0gdm0uJGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB3aGlsZSAocGFyZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnQuX3ZtXyAmJiAoIWN0eXBlIHx8IHBhcmVudC5fY3R5cGVfID09PSBjdHlwZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQuX3ZtXztcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVNsb3RUb1ZNb2RlbCh2bW9kZWwsIHZub2Rlcz86IGFueVtdKTogdm9pZCB7XG4gICAgaWYgKHZub2RlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZub2RlcyA9IHZtb2RlbC4kcmVuZGVyLnJvb3QgPyB2bW9kZWwuJHJlbmRlci5yb290LmNoaWxkcmVuIDogW107XG4gICAgfVxuICAgIHZub2Rlcy5mb3JFYWNoKHZub2RlID0+IHtcbiAgICAgICAgaWYgKCF2bm9kZSB8fCAhdm5vZGUubm9kZU5hbWUgfHwgdm5vZGUuZG9tLm5vZGVUeXBlICE9PSAxKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgbGV0IHNsb3ROYW1lID0gdm5vZGUuZG9tLmdldEF0dHJpYnV0ZSgnc2xvdCcpO1xuICAgICAgICBpZiAoc2xvdE5hbWUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2bm9kZS5wcm9wc1snOnNraXAnXTtcbiAgICAgICAgICAgIGRlbGV0ZSB2bm9kZS5wcm9wc1snbXMtc2tpcCddO1xuICAgICAgICAgICAgdm1vZGVsW3Nsb3ROYW1lXSA9IGF2YWxvbi52ZG9tKHZub2RlLCAndG9IVE1MJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZVNsb3RUb1ZNb2RlbCh2bW9kZWwsIHZub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2hpbGRUZW1wbGF0ZURlc2NyaXB0b3Iodm1vZGVsLCByZW5kZXIgPSB2bW9kZWwuJHJlbmRlcik6IGFueVtdIHtcbiAgICBpZiAocmVuZGVyLmRpcmVjdGl2ZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHJldHVybiByZW5kZXIuZGlyZWN0aXZlcy5yZWR1Y2UoKGFjYywgYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24uaXMpIHtcbiAgICAgICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpczogYWN0aW9uLmlzLFxuICAgICAgICAgICAgICAgIHByb3BzOiBhY3Rpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgaW5saW5lVGVtcGxhdGU6IGFjdGlvbi5mcmFnbWVudCxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogZ2V0Q2hpbGRUZW1wbGF0ZURlc2NyaXB0b3Iodm1vZGVsLCBhY3Rpb24uaW5uZXJSZW5kZXIgfHwgeyBkaXJlY3RpdmVzOiBbXSB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBbXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0OiBudW1iZXIgPSAzMDAsIGltbWVkaWF0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdGxldCBjb250ZXh0ID0gdGhpcztcblx0XHRsZXQgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0aWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0fTtcblx0XHRsZXQgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHRcdGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHR9O1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2tvdW1laS11dGlsLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0IHsgcGFyc2VTbG90VG9WTW9kZWwgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbmlmIChhdmFsb24ubXNpZSA8PSA4KSB7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGNvbnN0IHN0eWxlOiBhbnkgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjb25zdCBjc3NTdHIgPSBgXG4gICAgICAgIC5rb3VtZWktY2hlY2tib3gtaW5uZXItaWUgaW5wdXQge1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBzdGF0aWMgIWltcG9ydGFudDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA2cHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAua291bWVpLWNoZWNrYm94LWlubmVyLWllIHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgYDtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcblxuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1N0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoY3NzU3RyKSk7XG4gICAgfVxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLWNoZWNrYm94Jywge1xuICAgIHNvbGVTbG90OiAnbGFiZWwnLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLWNoZWNrYm94Lmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB3cmFwcGVyOiAnY2hlY2tib3gnLFxuICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIGNoZWNrZWQ6IGZhbHNlLFxuICAgICAgICBncm91cDogZmFsc2UsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBmbHVzaDogYXZhbG9uLm5vb3AsXG4gICAgICAgIGhlbHBJZDogJycsXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWxwSWQgPSB0aGlzLiRpZDtcbiAgICAgICAgICAgIC8vIC8vIGlubGluZeWcqElFOOS4i+aYvuekuuaciemXrumimO+8jOW+heino+WGs1xuICAgICAgICAgICAgLy8gaWYgKHRoaXMuaW5saW5lICE9IHZvaWQgMCkge1xuICAgICAgICAgICAgLy8gICAgIHRoaXMud3JhcHBlciA9ICdjaGVja2JveC1pbmxpbmUnO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICB9LFxuICAgICAgICBvblJlYWR5KGV2ZW50KSB7XG4gICAgICAgICAgICBwYXJzZVNsb3RUb1ZNb2RlbCh0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKHZtLCBlbCkge1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC50cyIsImltcG9ydCAnLi9tcy10cmlnZ2VyJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXRyaWdnZXIvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgeyBwYXJzZVNsb3RUb1ZNb2RlbCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcblxuaWYgKGF2YWxvbi5tc2llIDw9IDgpIHtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudDtcbiAgICBjb25zdCBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3Qgc3R5bGU6IGFueSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNvbnN0IGNzc1N0ciA9IGBcbiAgICAgICAgLmtvdW1laS1yYWRpby1pbm5lci1pZSBpbnB1dCB7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgcG9zaXRpb246IHN0YXRpYyAhaW1wb3J0YW50O1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDZweCAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICAgIC5rb3VtZWktcmFkaW8taW5uZXItaWUgc3BhbiB7XG4gICAgICAgICAgICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICBgO1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuXG4gICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzU3RyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShjc3NTdHIpKTtcbiAgICB9XG5cbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtcmFkaW8nLCB7XG4gICAgc29sZVNsb3Q6ICdsYWJlbCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtcmFkaW8uaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHdyYXBwZXI6ICdyYWRpbycsXG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgY2hlY2tlZDogJycsXG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICAgIGdyb3VwOiBmYWxzZSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBvbkNoYW5nZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIGhlbHBJZDogJycsXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5oZWxwSWQgPSB0aGlzLiRpZDtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICAgICAgcGFyc2VTbG90VG9WTW9kZWwodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZSh2bSwgZWwpIHtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8udHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbi8qKlxuICog5YiG6aG157uE5Lu2XG4gKiBAcHJvcCB7TnVtYmVyfSBbY3VycmVudD0xXSDlvZPliY3pobVcbiAqIEBwcm9wIHtOdW1iZXJ9IFtwYWdlU2l6ZT0xMF0g5q+P6aG155qE5pWw5o2u6YePXG4gKiBAcHJvcCB7TnVtYmVyfSB0b3RhbCDmlbDmja7mgLvph49cbiAqIEBldmVudCB7RnVuY3Rpb259IG9uQ2hhbmdlIOW9k+mhteeggeaUueWPmOaXtuinpuWPke+8jOWPguaVsGN1cnJlbnRcbiAqIFxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogPG1zLXBhZ2luYXRpb24gOndpZGdldD1cInt0b3RhbDoxMDAsb25DaGFuZ2U6QGhhbmRsZVBhZ2VDaGFuZ2V9XCI+PC9tcy1wYWdpbmF0aW9uPlxuICogXG4gKiA8bXMtcGFnaW5hdGlvbiA6d2lkZ2V0PVwie2N1cnJlbnQ6QGN1cnJlbnRQYWdlLHBhZ2VTaXplOkBwYWdlU2l6ZSx0b3RhbDpAdG90YWwsb25DaGFuZ2U6QGhhbmRsZVBhZ2VDaGFuZ2V9XCI+PC9tcy1wYWdpbmF0aW9uPlxuICogYGBgXG4gKi9cbmF2YWxvbi5jb21wb25lbnQoJ21zLXBhZ2luYXRpb24nLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtcGFnaW5hdGlvbi5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgY3VycmVudDogMSxcbiAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgcHJldlBhZ2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50ID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoLS10aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBuZXh0UGFnZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQgPCBNYXRoLmNlaWwodGhpcy50b3RhbC90aGlzLnBhZ2VTaXplKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoKyt0aGlzLmN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkNoYW5nZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICB9LFxuICAgICAgICBvblJlYWR5KGV2ZW50KSB7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZShldmVudCkge1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1wYWdpbmF0aW9uL21zLXBhZ2luYXRpb24udHMiLCJpbXBvcnQgJy4vbXMtc2VsZWN0JztcbmltcG9ydCAnLi9tcy1zZWxlY3Qtb3B0aW9uJ1xuaW1wb3J0ICcuL21zLXNlbGVjdC5zY3NzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXNlbGVjdC9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCBjb250cm9sQ29tcG9uZW50IGZyb20gJy4uL21zLWZvcm0vbXMtY29udHJvbCc7XG5pbXBvcnQgeyBlbWl0VG9Gb3JtSXRlbSB9IGZyb20gJy4uL21zLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgZmluZFBhcmVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcbmltcG9ydCAnLi9tcy1jaGVja2JveCc7XG5cbmNvbnRyb2xDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLWNoZWNrYm94LWdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1jaGVja2JveC1ncm91cC5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdmFsdWU6IFtdLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBzZWxlY3Rpb246IFtdLFxuICAgICAgICB0b2dnbGVPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25JbmRleCA9IHRoaXMuc2VsZWN0aW9uLmluZGV4T2Yob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25JbmRleCA9PT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5yZW1vdmUob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHRoaXMuc2VsZWN0aW9uLnRvSlNPTigpIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94LWdyb3VwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1hcFZhbHVlVG9TZWxlY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5vcHRpb25zLmZpbHRlcihvID0+IHZhbHVlLmNvbnRhaW5zKG8udmFsdWUpKS5tYXAobyA9PiBvLnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1NlbGVjdGlvbih2KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdi50b0pTT04oKSB9LFxuICAgICAgICAgICAgICAgICAgICBkZW55VmFsaWRhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveC1ncm91cCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvU2VsZWN0aW9uKHRoaXMudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBvblJlYWR5KGV2ZW50KSB7XG4gICAgICAgICAgICAvL3ZtLmVsSGlkZGVuSW5wdXQgPSAkKGVsKS5maW5kKCdpbnB1dDpoaWRkZW4nKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKGV2ZW50KSB7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LWdyb3VwLnRzIiwiZXhwb3J0IHsgTG9hZGluZyB9IGZyb20gICcuL21zLWxvYWRpbmctZGlyZWN0aXZlJztcbmltcG9ydCAnLi9tcy1sb2FkaW5nLnNjc3MnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbG9hZGluZy9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCBjb250cm9sQ29tcG9uZW50IGZyb20gJy4uL21zLWZvcm0vbXMtY29udHJvbCc7XG5pbXBvcnQgeyBlbWl0VG9Gb3JtSXRlbSB9IGZyb20gJy4uL21zLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgZmluZFBhcmVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcbmltcG9ydCAnLi9tcy1yYWRpbyc7XG5cbmNvbnRyb2xDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLXJhZGlvLWdyb3VwJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1yYWRpby1ncm91cC5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBzZWxlY3RlZDogJycsXG4gICAgICAgIHRvZ2dsZU9wdGlvbihlLCBvcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBvcHRpb24udmFsdWU7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB0aGlzLnNlbGVjdGVkIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3JhZGlvLWdyb3VwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhlbHBJZDogJycsXG4gICAgICAgIG1hcFZhbHVlVG9TZWxlY3RlZCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVscElkID0gdGhpcy4kaWQ7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1NlbGVjdGVkKHYpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB2IH0sXG4gICAgICAgICAgICAgICAgICAgIGRlbnlWYWxpZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3JhZGlvLWdyb3VwJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2UoZXZlbnQpIHtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8tZ3JvdXAudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuY29uc3QgT1BUSU9OX0hFSUdIVCA9IDI0O1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy10aW1lcGlja2VyLXZpZXcnLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdGltZXBpY2tlci12aWV3Lmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGN1cnJlbnRIb3VyOiAwLFxuICAgICAgICBjdXJyZW50TWludXRlOiAwLFxuICAgICAgICBjdXJyZW50U2Vjb25kOiAwLFxuICAgICAgICBob3VyT3B0aW9uczogYXZhbG9uLnJhbmdlKDI0KS5tYXAobiA9PiAoJzAnICsgbikuc3Vic3RyKC0yKSksXG4gICAgICAgIG1pbnV0ZU9wdGlvbnM6IGF2YWxvbi5yYW5nZSg2MCkubWFwKG4gPT4gKCcwJyArIG4pLnN1YnN0cigtMikpLFxuICAgICAgICBzZWNvbmRPcHRpb25zOiBhdmFsb24ucmFuZ2UoNjApLm1hcChuID0+ICgnMCcgKyBuKS5zdWJzdHIoLTIpKSxcbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBzZWxlY3QoZWwsIHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmtvdW1laS10aW1lcGlja2VyLXZpZXctc2VsZWN0W25hbWU9JyArIHR5cGUgKyAnLW9wdGlvbnNdJykuc2Nyb2xsVG9wID0gZWwgKiAyNDtcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnaG91cicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3VyID0gZWw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtaW51dGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TWludXRlID0gZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIGhvdXI6IHRoaXMuY3VycmVudEhvdXIsXG4gICAgICAgICAgICAgICAgICAgIG1pbnV0ZTogdGhpcy5jdXJyZW50TWludXRlLFxuICAgICAgICAgICAgICAgICAgICBzZWNvbmQ6IHRoaXMuY3VycmVudFNlY29uZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lcGlja2VyLXZpZXctY2hhbmdlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoKSB7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmFsdWUnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtID0gbW9tZW50KHYuc3BsaXQoJywnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IG0uaG91cigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IG0ubWludXRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Vjb25kID0gbS5zZWNvbmQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmtvdW1laS10aW1lcGlja2VyLXZpZXctc2VsZWN0W25hbWU9aG91ci1vcHRpb25zXScpLnNjcm9sbFRvcCA9IHRoaXMuY3VycmVudEhvdXIgKiBPUFRJT05fSEVJR0hUO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQucXVlcnlTZWxlY3RvcignLmtvdW1laS10aW1lcGlja2VyLXZpZXctc2VsZWN0W25hbWU9bWludXRlLW9wdGlvbnNdJykuc2Nyb2xsVG9wID0gdGhpcy5jdXJyZW50TWludXRlICogT1BUSU9OX0hFSUdIVDtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdFtuYW1lPXNlY29uZC1vcHRpb25zXScpLnNjcm9sbFRvcCA9IHRoaXMuY3VycmVudFNlY29uZCAqIE9QVElPTl9IRUlHSFQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGZpcmUoJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci12aWV3LnRzIiwiaW1wb3J0ICcuL21zLWxheW91dC5zY3NzJztcbmltcG9ydCAnLi9tcy1sYXlvdXQnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbGF5b3V0L2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSBbe1xuICAgIGtleTogJ2NvbXBvbmVudHMnLFxuICAgIHRpdGxlOiAn57uE5Lu2JyxcbiAgICBjaGlsZHJlbjogW3tcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8taW5wdXQtaW5wdXQnLFxuICAgICAgICB0aXRsZTogJ2lucHV0IOi+k+WFpeahhicsXG4gICAgICAgIHVyaTogJy9pbnB1dCcsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtaW5wdXQvbXMtaW5wdXQubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby10ZXh0YXJlYS10ZXh0YXJlYScsXG4gICAgICAgIHRpdGxlOiAndGV4dGFyZWEg5aSa6KGM6L6T5YWl5qGGJyxcbiAgICAgICAgdXJpOiAnL3RleHRhcmVhJyxcbiAgICAgICAgbG9jYXRpb246ICdtcy10ZXh0YXJlYS9tcy10ZXh0YXJlYS5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLXNlbGVjdC1zZWxlY3QnLFxuICAgICAgICB0aXRsZTogJ3NlbGVjdCDpgInmi6nmoYYnLFxuICAgICAgICB1cmk6ICcvc2VsZWN0JyxcbiAgICAgICAgbG9jYXRpb246ICdtcy1zZWxlY3QvbXMtc2VsZWN0Lm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tcmFkaW8tcmFkaW8nLFxuICAgICAgICB0aXRsZTogJ3JhZGlvIOWNlemAieahhicsXG4gICAgICAgIHVyaTogJy9yYWRpbycsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtcmFkaW8vbXMtcmFkaW8ubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1jaGVja2JveC1jaGVja2JveCcsXG4gICAgICAgIHRpdGxlOiAnY2hlY2tib3gg5aSa6YCJ5qGGJyxcbiAgICAgICAgdXJpOiAnL2NoZWNrYm94JyxcbiAgICAgICAgbG9jYXRpb246ICdtcy1jaGVja2JveC9tcy1jaGVja2JveC5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLWRhdGVwaWNrZXItZGF0ZXBpY2tlcicsXG4gICAgICAgIHRpdGxlOiAnZGF0ZXBpY2tlciDml6XmnJ/pgInmi6nlmagnLFxuICAgICAgICB1cmk6ICcvZGF0ZXBpY2tlcicsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tdGltZXBpY2tlci10aW1lcGlja2VyJyxcbiAgICAgICAgdGl0bGU6ICd0aW1lcGlja2VyIOaXtumXtOmAieaLqeWZqCcsXG4gICAgICAgIHVyaTogJy90aW1lcGlja2VyJyxcbiAgICAgICAgbG9jYXRpb246ICdtcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby11cGxvYWQtdXBsb2FkJyxcbiAgICAgICAgdGl0bGU6ICd1cGxvYWQg5paH5Lu25LiK5LygJyxcbiAgICAgICAgdXJpOiAnL3VwbG9hZCcsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtdXBsb2FkL21zLXVwbG9hZC5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLWZvcm0tY29udHJvbCcsXG4gICAgICAgIHRpdGxlOiAnZm9ybS1jb250cm9sIOihqOWNleaOp+S7ticsXG4gICAgICAgIHVyaTogJy9mb3JtLWNvbnRyb2wnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWZvcm0vbXMtY29udHJvbC5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLWZvcm0tZm9ybScsXG4gICAgICAgIHRpdGxlOiAnZm9ybSDooajljZUnLFxuICAgICAgICB1cmk6ICcvZm9ybScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtZm9ybS9tcy1mb3JtLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tbWVudS1tZW51JyxcbiAgICAgICAgdGl0bGU6ICdtZW51IOiPnOWNlScsXG4gICAgICAgIHVyaTogJy9tZW51JyxcbiAgICAgICAgbG9jYXRpb246ICdtcy1tZW51L21zLW1lbnUubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby10YWJsZS10YWJsZScsXG4gICAgICAgIHRpdGxlOiAndGFibGUg5pWw5o2u6KGo5qC8JyxcbiAgICAgICAgdXJpOiAnL3RhYmxlJyxcbiAgICAgICAgbG9jYXRpb246ICdtcy10YWJsZS9tcy10YWJsZS5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLXBhZ2luYXRpb24tcGFnaW5hdGlvbicsXG4gICAgICAgIHRpdGxlOiAncGFnaW5hdGlvbiDliIbpobUnLFxuICAgICAgICB1cmk6ICcvcGFnaW5hdGlvbicsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtcGFnaW5hdGlvbi9tcy1wYWdpbmF0aW9uLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tZGlhbG9nLWRpYWxvZycsXG4gICAgICAgIHRpdGxlOiAnZGlhbG9nIOWvueivneahhicsXG4gICAgICAgIHVyaTogJy9kaWFsb2cnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWRpYWxvZy9tcy1kaWFsb2cubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1sb2FkaW5nLWxvYWRpbmcnLFxuICAgICAgICB0aXRsZTogJ2xvYWRpbmcg5Yqg6L295Lit6JKZ54mIJyxcbiAgICAgICAgdXJpOiAnL2xvYWRpbmcnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWxvYWRpbmcvbXMtbG9hZGluZy5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLW1lc3NhZ2UtbWVzc2FnZScsXG4gICAgICAgIHRpdGxlOiAnbWVzc2FnZSDlhajlsYDmj5DnpLonLFxuICAgICAgICB1cmk6ICcvbWVzc2FnZScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtbWVzc2FnZS9tcy1tZXNzYWdlLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tbm90aWZpY2F0aW9uLW5vdGlmaWNhdGlvbicsXG4gICAgICAgIHRpdGxlOiAnbm90aWZpY2F0aW9uIOmAmuefpeaPkOmGkuahhicsXG4gICAgICAgIHVyaTogJy9ub3RpZmljYXRpb24nLFxuICAgICAgICBsb2NhdGlvbjogJ21zLW5vdGlmaWNhdGlvbi9tcy1ub3RpZmljYXRpb24ubWQnXG4gICAgfV1cbn1dO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZG9jcy9uYXYuY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJleHBvcnQgY29uc3QgbWVudSA9IHtcbiAgICBzZWxlY3RlZEtleXMkOiBPYnNlcnZhYmxlKCksXG4gICAgb3BlbktleXMkOiBPYnNlcnZhYmxlKClcbn07XG5cbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25OZXh0Q2JMaXN0OiBbXSxcbiAgICAgICAgc3Vic2NyaWJlKG9uTmV4dCkge1xuICAgICAgICAgICAgdGhpcy5vbk5leHRDYkxpc3QucHVzaChvbk5leHQpO1xuICAgICAgICB9LFxuICAgICAgICBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub25OZXh0Q2JMaXN0LmZvckVhY2goY2IgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kb2NzL3N0b3Jlcy9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcblxuaW1wb3J0ICogYXMgbmF2Q29uZmlnIGZyb20gJy4uLy4uL25hdi5jb25maWcuanMnO1xuaW1wb3J0ICdrb3VtZWknO1xuaW1wb3J0IHsgbWVudSBhcyBtZW51U3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZXMnO1xuXG5leHBvcnQgY29uc3QgbmFtZSA9ICdkb2Mtc2lkZWJhcic7XG5cbmF2YWxvbi5jb21wb25lbnQobmFtZSwge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2RvYy1zaWRlYmFyLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBtZW51OiBbXSxcbiAgICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgICAgb3BlbktleXM6IFsnY29tcG9uZW50cyddLFxuICAgICAgICBoYW5kbGVNZW51Q2xpY2soaXRlbSwga2V5LCBrZXlQYXRoKSB7XG4gICAgICAgICAgICBhdmFsb24uaGlzdG9yeS5zZXRIYXNoKGl0ZW0udXJpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlT3BlbkNoYW5nZShvcGVuS2V5cykge1xuICAgICAgICAgICAgdGhpcy5vcGVuS2V5cyA9IG9wZW5LZXlzLnNsaWNlKC0xKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBuYXZDb25maWc7XG4gICAgICAgICAgICBtZW51U3RvcmUuc2VsZWN0ZWRLZXlzJC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEtleXMgPSB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kb2NzL2NvbXBvbmVudHMvZG9jLXNpZGViYXIvZG9jLXNpZGViYXIudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgJ21tUm91dGVyJztcbmltcG9ydCB7IG1lbnUgYXMgbWVudVN0b3JlIH0gZnJvbSAnLi9zdG9yZXMnO1xuaW1wb3J0ICogYXMgbmF2Q29uZmlnIGZyb20gJy4vbmF2LmNvbmZpZy5qcyc7XG5cbmZ1bmN0aW9uIGdldFBhZ2UoY29tcG9uZW50KSB7XG4gICAgY29uc3QgaHRtbCA9IGA8eG1wIGlzPVwiJHtjb21wb25lbnR9XCIgOndpZGdldD1cIntpZDonJHtjb21wb25lbnQucmVwbGFjZSgvXFwtL2csICdfJyl9J31cIj48L3htcD5gO1xuICAgIHJldHVybiBodG1sXG59XG5cbmZ1bmN0aW9uIGFwcGx5Um91dGVDb25maWcoY29uZmlnLCBwYXJlbnRSb3V0ZSwgYWNjUGF0aCA9ICcnKSB7XG4gICAgY29uZmlnLm1hcChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudHM6YW55ID0ge307XG4gICAgICAgIGlmIChyb3V0ZS5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuY3VycmVudFBhZ2UgPSByb3V0ZS5jb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdXRlLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSByb3V0ZS5jb21wb25lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGF2YWxvbi5yb3V0ZXIuYWRkKGFjY1BhdGggKyByb3V0ZS5wYXRoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5tYXAodmlld05hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW3ZpZXdOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVTdG9yZS5zZWxlY3RlZEtleXMkLm9uTmV4dChbbS5uYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmFsb24udm1vZGVsc1twYXJlbnRSb3V0ZS5uYW1lXVt2aWV3TmFtZV0gPSBnZXRQYWdlKG0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3BhcmVudFJvdXRlLm5hbWVdW3ZpZXdOYW1lXSA9IGdldFBhZ2UoY29tcG9uZW50Lm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVE9ETyDmlK/mjIHltYzlpZfot6/nlLFcbiAgICAgICAgLy9yb3V0ZS5jaGlsZHJlbiAmJiBhcHBseVJvdXRlQ29uZmlnKHJvdXRlLmNoaWxkcmVuLCByb3V0ZSwgYWNjUGF0aCArIHJvdXRlLnBhdGgpO1xuICAgIH0pO1xufVxuXG5jb25zdCByb3V0ZUNvbmZpZyA9IFtdO1xuY29uc3QgdHJhdmVsID0gaXRlbSA9PiB7XG4gICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJvdXRlQ29uZmlnLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogaXRlbS51cmksXG4gICAgICAgICAgICBjb21wb25lbnQocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy8nICsgaXRlbS5sb2NhdGlvbikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmNoaWxkcmVuLm1hcCh0cmF2ZWwpO1xuICAgIH1cbn07XG5uYXZDb25maWcubWFwKHRyYXZlbCk7XG5cbmFwcGx5Um91dGVDb25maWcocm91dGVDb25maWcsIHtcbiAgICBuYW1lOiAncm9vdCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2RvY3Mvcm91dGVyLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQgY29udHJvbENvbXBvbmVudCBmcm9tICcuLi9tcy1mb3JtL21zLWNvbnRyb2wnO1xuaW1wb3J0ICcuLi9tcy10cmlnZ2VyJztcbmltcG9ydCAnLi4vbXMtY2FsZW5kYXInO1xuaW1wb3J0ICcuLi9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXItdmlldydcbmltcG9ydCB7IGVtaXRUb0Zvcm1JdGVtIH0gZnJvbSAnLi4vbXMtZm9ybS91dGlscyc7XG5cbi8qKlxuICog5pel5pyf6YCJ5oup57uE5Lu2XG4gKiBAcHJvcCB2YWx1ZSDnu4Tku7blgLwoaW5oZXJpdClcbiAqIEBwcm9wIGNvbCDlrZfmrrXot6/lvoQoaW5oZXJpdClcbiAqIEBwcm9wIGZvcm1hdCDml6XmnJ/moLzlvI/vvIzlj4LogIMgbW9tZW50anPvvIzpu5jorqTkuLogWVlZWS1NTS1ERFxuICogQHByb3Agc3RhcnREYXRlIOaOp+WItuWPr+W3sumAieaLqeeahOaXtumXtOeahOW8gOWni+aXpeacn++8jOaXpeacn+Wtl+espuS4su+8jOagvOW8j+S4jiBmb3JtYXQg5Y+C5pWw5Yy56YWN77yM6K6+572u5q2k6aG56Ieq5Yqo5b+955WlIGRpc2FibGVkRGF0ZVxuICogQHByb3AgZW5kRGF0ZSDmjqfliLblj6/lt7LpgInmi6nnmoTml7bpl7TnmoTnu5PmnZ/ml6XmnJ/vvIzml6XmnJ/lrZfnrKbkuLLvvIzmoLzlvI/kuI4gZm9ybWF0IOWPguaVsOWMuemFje+8jOiuvue9ruatpOmhueiHquWKqOW/veeVpSBkaXNhYmxlZERhdGVcbiAqIEBwcm9wIGRpc2FibGVkRGF0ZSDkuI3lj6/pgInmi6nml6XmnJ/nmoTliKTmlq3lh73mlbDvvIzkvKDlhaUgY3VycmVudO+8iOW9k+WJjemBjeWOhuaXpeacn++8ie+8jOi/lOWbniB0cnVlIOihqOekuuatpOaXpeacn+S4jeWPr+mAiVxuICogQHByb3Agc2hvd1RpbWUg5piv5ZCm5pi+56S65pe26Ze06YCJ5oup77yM5aaC5p6c5q2k6aG55Li6IHRydWXvvIzliJkgZm9ybWF0IOm7mOiupOS4uiBZWVlZLU1NLUREIEhIOm1tOnNzXG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGAgaHRtbFxuICogXG4gKiBgYGBcbiAqL1xuY29udHJvbENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtZGF0ZXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtZGF0ZXBpY2tlci5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgc2VsZWN0ZWQ6ICcnLFxuICAgICAgICBmb3JtYXQ6ICdZWVlZLU1NLUREJyxcbiAgICAgICAgc3RhcnREYXRlOiAnJyxcbiAgICAgICAgZW5kRGF0ZTogJycsXG4gICAgICAgIGRpc2FibGVkRGF0ZSgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBzaG93VGltZTogZmFsc2UsXG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgYXZhbG9uLnZtb2RlbHNbdGhpcy5wYW5lbFZtSWRdLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiAnJyB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdkYXRlcGlja2VyLWNoYW5nZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aEluQm94KGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudCA9PT0gZWwgfHwgYXZhbG9uLmNvbnRhaW5zKHRoaXMuJGVsZW1lbnQsIGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFyZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFuZWxWbUlkOiAnJyxcbiAgICAgICAgcGFuZWxWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgcGFuZWxDbGFzczogJ2tvdW1laS1kYXRlcGlja2VyLXBhbmVsLWNvbnRhaW5lcicsXG4gICAgICAgIHBhbmVsVGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtZGF0ZXBpY2tlci1wYW5lbC5odG1sJyksXG4gICAgICAgIGhhbmRsZVBhbmVsSGlkZSgpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWFwVmFsdWVUb1NlbGVjdGVkKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5pdDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGVtaXRUb0Zvcm1JdGVtKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBzaG93SWNvbjogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZhbHVlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvU2VsZWN0ZWQodik7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHYgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGF0ZXBpY2tlci1jaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zaG93VGltZSAmJiB0aGlzLmZvcm1hdCA9PT0gJ1lZWVktTU0tREQnKSB7XG4gICAgICAgICAgICAgICAgLy8g5YWB6K646YCJ5oup5pe26Ze055qE5qih5byP5LiL77yM55So5oi35aaC5p6c5rKh6Ieq5a6a5LmJ5qC85byP77yM5YiZ6Ieq5Yqo6L2s5Li65pel5pyf5pe26Ze05qC85byPXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXQgPSAnWVlZWS1NTS1ERCBISDptbTpzcyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhbmVsVm1JZCA9IHRoaXMuJGlkICsgJ19wYW5lbCc7XG4gICAgICAgICAgICBjb25zdCBpbm5lclZtID0gYXZhbG9uLmRlZmluZSh7XG4gICAgICAgICAgICAgICAgJGlkOiB0aGlzLnBhbmVsVm1JZCxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZUFycmF5OiAnJyxcbiAgICAgICAgICAgICAgICAkbW9tZW50OiBtb21lbnQoKSxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF5OiAwLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRNb250aDogJycsXG4gICAgICAgICAgICAgICAgY3VycmVudFllYXI6IDAsXG4gICAgICAgICAgICAgICAgJHN0YXJ0RGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICAkZW5kRGF0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICBkaXNhYmxlZERhdGUoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgICAgICAgICBzaG93VGltZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgLy8gLTEt5aSp77yI5pe26Ze077yJ6KeG5Zu+77yMMC3mnIjop4blm77vvIwxLeW5tOinhuWbvu+8jDIt5Y2B5bm06KeG5Zu+77yMMy3nmb7lubTop4blm75cbiAgICAgICAgICAgICAgICB2aWV3TW9kZTogMCxcbiAgICAgICAgICAgICAgICBzdGFnZWQ6IDAsXG4gICAgICAgICAgICAgICAgJGNvbXB1dGVkOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2ZEZWNhZGUoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50WWVhciAtIHRoaXMuY3VycmVudFllYXIgJSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRPZkNlbnR1cnkoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50WWVhciAtIHRoaXMuY3VycmVudFllYXIgJSAxMDA7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZXNldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbW9tZW50ID0gc2VsZi5zZWxlY3RlZCA/IG1vbWVudChzZWxmLnNlbGVjdGVkLCBzZWxmLmZvcm1hdCkgOiBtb21lbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF5ID0gdGhpcy4kbW9tZW50LmRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSB0aGlzLiRtb21lbnQuZm9ybWF0KCdNTU0nKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IHRoaXMuJG1vbWVudC55ZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVBcnJheSA9IHRoaXMuJG1vbWVudC50b0FycmF5KCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VGltZSA9IHNlbGYuc2hvd1RpbWU7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyDmnoTpgKDkuI3lj6/pgInmi6nml6XmnJ/nmoTliKTmlq3lh73mlbBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuc3RhcnREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRzdGFydERhdGUgPSBtb21lbnQoc2VsZi5zdGFydERhdGUsIHNlbGYuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5lbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRlbmREYXRlID0gbW9tZW50KHNlbGYuZW5kRGF0ZSwgc2VsZi5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnN0YXJ0RGF0ZSB8fCBzZWxmLmVuZERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOiuvue9ruS6huW8gOWni+aXpeacn+WSjOe7k+adn+aXpeacn++8jOWImeaNruatpOaehOmAoOS4gOS4quWIpOaWreWHveaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZERhdGUgPSAoY3VycmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRzdGFydERhdGUgPT09IG51bGwgJiYgdGhpcy4kZW5kRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNb21lbnQgPSBtb21lbnQoY3VycmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTYW1lT3JBZnRlclN0YXJ0RGF0ZSA9IGN1cnJlbnRNb21lbnQuaXNTYW1lT3JBZnRlcih0aGlzLiRzdGFydERhdGUsICdkYXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTYW1lT3JCZWZvcmVFbmREYXRlID0gY3VycmVudE1vbWVudC5pc1NhbWVPckJlZm9yZSh0aGlzLiRlbmREYXRlLCAnZGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRzdGFydERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICFpc1NhbWVPckJlZm9yZUVuZERhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLiRlbmREYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNTYW1lT3JBZnRlclN0YXJ0RGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEoaXNTYW1lT3JBZnRlclN0YXJ0RGF0ZSAmJiBpc1NhbWVPckJlZm9yZUVuZERhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWQpuWImeS9v+eUqOm7mOiupOeahOaIluiAheWklumDqOS8oOi/m+adpeeahOWIpOaWreWHveaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZERhdGUgPSBzZWxmLmRpc2FibGVkRGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2hhbmdlVmlldyh2aWV3TW9kZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gMCAmJiB2aWV3TW9kZSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5LuO5pyI6KeG5Zu+55u05o6l6Lez5Yiw5Y2B5bm06KeG5Zu+5ZCO77yM6L+U5Zue5pe26Lez6L+H5bm06KeG5Zu+XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGFuZGxlWWVhclZpZXdTZWxlY3QoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld01vZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb21lbnQubW9udGgoZWwudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUFycmF5ID0gdGhpcy4kbW9tZW50LnRvQXJyYXkoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb21lbnQueWVhcihlbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld01vZGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBlbC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJG1vbWVudC55ZWFyKGVsLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVBcnJheSA9IHRoaXMuJG1vbWVudC50b0FycmF5KCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGUgPSB0aGlzLnZpZXdNb2RlIC0gMSAtIHRoaXMuc3RhZ2VkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZSA9IHRoaXMudmlld01vZGUgLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtdXRhdGUoYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG1vbWVudFthY3Rpb25dLmFwcGx5KHRoaXMuJG1vbWVudCwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERheSA9IHRoaXMuJG1vbWVudC5kYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gdGhpcy4kbW9tZW50LmZvcm1hdCgnTU1NJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB0aGlzLiRtb21lbnQueWVhcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0b2RheSgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDYWxlbmRhckNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2FsZW5kYXItY2hhbmdlZCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhhbmRsZUNhbGVuZGFyQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbW9tZW50ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERheSA9IHRoaXMuJG1vbWVudC5kYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gdGhpcy4kbW9tZW50LmZvcm1hdCgnTU1NJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB0aGlzLiRtb21lbnQueWVhcigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaGFuZGxlVGltZXBpY2tlckNoYW5nZShlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaG91ciwgbWludXRlLCBzZWNvbmQgfSA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb21lbnQuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkID0gdGhpcy4kbW9tZW50LmZvcm1hdChzZWxmLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogc2VsZi5zZWxlY3RlZCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGVwaWNrZXItY2hhbmdlZCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGlubmVyVm0ucmVzZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKCkge1xuICAgICAgICAgICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0ICogYXMgU2NoZW1hIGZyb20gJ2FzeW5jLXZhbGlkYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtKG9wdGlvbnM/KSB7XG4gICAgcmV0dXJuIG5ldyBGb3JtKG9wdGlvbnMpO1xufVxuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICByZWNvcmQ6IHt9LFxuICAgIGF1dG9Bc3luY0NoYW5nZTogdHJ1ZSxcbiAgICBvbkZpZWxkc0NoYW5nZTogYXZhbG9uLm5vb3Bcbn07XG5cbmZ1bmN0aW9uIEZvcm0ob3B0aW9ucykge1xuICAgIHRoaXMuY2FjaGVkUmVjb3JkID0ge307XG4gICAgdGhpcy5maWVsZHMgPSB7fTtcbiAgICB0aGlzLmFsbCA9IHt9O1xuICAgIGF2YWxvbi5taXgodGhpcywgYXZhbG9uLm1peCh0cnVlLCB7fSwgZGVmYXVsdE9wdGlvbnMpLCBvcHRpb25zKVxufVxuXG5Gb3JtLnByb3RvdHlwZS5zZXRGaWVsZHNWYWx1ZSA9IGZ1bmN0aW9uIChmaWVsZHMpIHtcbiAgICBpZiAoIXRoaXMuYXV0b0FzeW5jQ2hhbmdlKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgc2V0VmFsdWUodGhpcy5jYWNoZWRSZWNvcmQsIG5hbWUsIGZpZWxkc1tuYW1lXS52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZCA9IGZpZWxkc1tuYW1lXTtcblxuICAgICAgICBzZXRWYWx1ZSh0aGlzLnJlY29yZCwgbmFtZSwgZmllbGQudmFsdWUpO1xuXG4gICAgICAgIGlmICghZmllbGQuZGVueVZhbGlkYXRlICYmIHRoaXMuZmllbGRzW25hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlRmllbGQobmFtZSwgdGhpcy5maWVsZHNbbmFtZV0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmlzT2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicgKyByZXN1bHQubmFtZSwgW10pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InICsgcmVzdWx0Lm5hbWUsIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZXN1bHQubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uRmllbGRzQ2hhbmdlKGZpZWxkcywgdGhpcy5yZWNvcmQpO1xufVxuXG5Gb3JtLnByb3RvdHlwZS5hZGRGaWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzKSB7XG4gICAgT2JqZWN0LmtleXMoZmllbGRzKS5mb3JFYWNoKG5hbWUgPT4ge1xuICAgICAgICB0aGlzLmZpZWxkc1tuYW1lXSA9IGZpZWxkc1tuYW1lXTtcbiAgICB9KTtcbn1cblxuRm9ybS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAodHlwZTogc3RyaW5nLCBsaXN0ZW5lcikge1xuICAgICh0aGlzLmFsbFt0eXBlXSB8fCAodGhpcy5hbGxbdHlwZV0gPSBbXSkpLnB1c2gobGlzdGVuZXIpO1xufVxuXG5Gb3JtLnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24gKHR5cGU6IHN0cmluZywgcGF5bG9hZCkge1xuICAgICh0aGlzLmFsbFt0eXBlXSB8fCBbXSkubWFwKGhhbmRsZXIgPT4geyBoYW5kbGVyKHBheWxvYWQpIH0pO1xufVxuXG5Gb3JtLnByb3RvdHlwZS52YWxpZGF0ZUZpZWxkID0gYXN5bmMgZnVuY3Rpb24gKGZpZWxkTmFtZSwgZmllbGQpIHtcbiAgICBjb25zdCBydWxlcyA9IGZpZWxkLnJ1bGVzO1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0VmFsdWUodGhpcy5yZWNvcmQsIGZpZWxkTmFtZSk7XG4gICAgbGV0IHJlc3VsdDogYW55ID0geyBpc09rOiB0cnVlLCBuYW1lOiBmaWVsZE5hbWUgfTtcbiAgICBpZiAoIXJ1bGVzKSByZXR1cm4gcmVzdWx0O1xuICAgIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBTY2hlbWEoe1xuICAgICAgICBbZmllbGROYW1lXTogcnVsZXNcbiAgICB9KTtcbiAgICByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhbGlkYXRvci52YWxpZGF0ZSh7IFtmaWVsZE5hbWVdOiB2YWx1ZSB9LCAoZXJyb3JzLCBmaWVsZHMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgaXNPazogZmFsc2UsIG5hbWU6IGZpZWxkTmFtZSwgbWVzc2FnZTogZXJyb3JzWzBdLm1lc3NhZ2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlzT2s6IHRydWUsIG5hbWU6IGZpZWxkTmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5Gb3JtLnByb3RvdHlwZS52YWxpZGF0ZUZpZWxkcyA9IGZ1bmN0aW9uIChmaWVsZHMgPSB0aGlzLmZpZWxkcykge1xuICAgIGNvbnN0IGZsYXRSZWNvcmQgPSB7fSwgcnVsZU1hcCA9IHt9O1xuICAgIGlmICghdGhpcy5hdXRvQXN5bmNDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5yZWNvcmQgPSBhdmFsb24ubWl4KHRydWUsIHt9LCB0aGlzLnJlY29yZCwgdGhpcy5jYWNoZWRSZWNvcmQpO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhmaWVsZHMpLm1hcChuYW1lID0+IHtcbiAgICAgICAgcnVsZU1hcFtuYW1lXSA9IGZpZWxkc1tuYW1lXS5ydWxlcztcbiAgICAgICAgZmxhdFJlY29yZFtuYW1lXSA9IGdldFZhbHVlKHRoaXMucmVjb3JkLCBuYW1lKTtcbiAgICB9KTtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgU2NoZW1hKHJ1bGVNYXApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHZhbGlkYXRvci52YWxpZGF0ZShmbGF0UmVjb3JkLCAoZXJyb3JzLCBmaWVsZHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRmllbGRzID0gT2JqZWN0LmtleXMoZmllbGRzIHx8IHt9KTtcbiAgICAgICAgICAgIGxldCBpc0FsbFZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZmllbGRzKS5tYXAobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKH5lcnJvckZpZWxkcy5pbmRleE9mKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQWxsVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmlnZ2VyKCdlcnJvcicgKyBuYW1lLCBmaWVsZHNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InICsgbmFtZSwgW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzb2x2ZShpc0FsbFZhbGlkKTtcbiAgICAgICAgfSlcbiAgICB9KTtcbn1cblxuRm9ybS5wcm90b3R5cGUucmVzZXRGaWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzID0gdGhpcy5maWVsZHMpIHtcbiAgICB0aGlzLnJlY29yZCA9IHt9O1xuICAgIHRoaXMudHJpZ2dlcigncmVzZXQnLCBmaWVsZHMpO1xufVxuXG4vKipcbiAqIOagueaNruihqOi+vuW8j+aehOe7meWvueixoei1i+WAvO+8jOWxnuaAp+i3r+W+hOS4reacgOWkmuWPquWFgeiuuOWtmOWcqOS4gOS4quaVsOe7hFxuICogQHBhcmFtIHsqfSByZWNvcmQg5pWw5o2u5a+56LGhXG4gKiBAcGFyYW0ge1N0cmluZ30gZXhwciDlr7nosaHlsZ7mgKfot6/lvoTooajovr7lvI9cbiAqIEBwYXJhbSB7Kn0gdmFsIOWAvFxuICovXG5mdW5jdGlvbiBzZXRWYWx1ZShyZWNvcmQsIGV4cHIsIHZhbCkge1xuICAgIGNvbnN0IHJTcGxpdCA9IC9cXC58XFxdLnxcXFt8XFxdLztcbiAgICBsZXQgdGVtcCA9IHJlY29yZCwgcHJvcDtcbiAgICBleHByID0gZXhwci5zcGxpdChyU3BsaXQpLmZpbHRlcihwcm9wID0+ICEhcHJvcCk7XG4gICAgY29uc3QgdmFsVHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWwpO1xuICAgIGxldCBtaXJyb3JWYWw7XG4gICAgaWYgKHZhbFR5cGUgPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgICBtaXJyb3JWYWwgPSBhdmFsb24ubWl4KHRydWUsIHt9LCB7IHQ6IHZhbCB9KS50O1xuICAgIH0gZWxzZSBpZiAodmFsVHlwZSA9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgICBtaXJyb3JWYWwgPSBhdmFsb24ubWl4KHRydWUsIHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1pcnJvclZhbCA9IHZhbDtcbiAgICB9XG5cbiAgICB3aGlsZSAocHJvcCA9IGV4cHIuc2hpZnQoKSkge1xuICAgICAgICBpZiAoZXhwci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRlbXBbcHJvcF0gPSBtaXJyb3JWYWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0ZW1wID0gdGVtcFtwcm9wXSA9IHRlbXBbcHJvcF0gfHwge307XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICog5qC55o2u6KGo6L6+5byP5p6E5LuO5a+56LGh5Y+W5YC877yM5bGe5oCn6Lev5b6E5Lit5pyA5aSa5Y+q5YWB6K645a2Y5Zyo5LiA5Liq5pWw57uEXG4gKiBAcGFyYW0geyp9IHJlY29yZCDmlbDmja7lr7nosaFcbiAqIEBwYXJhbSB7U3RyaW5nfSBleHByIOWvueixoeWxnuaAp+i3r+W+hOihqOi+vuW8j1xuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShyZWNvcmQsIGV4cHIpIHtcbiAgICBjb25zdCByU3BsaXQgPSAvXFwufFxcXS58XFxbfFxcXS87XG4gICAgbGV0IHRlbXAgPSByZWNvcmQsIHByb3A7XG4gICAgZXhwciA9IGV4cHIuc3BsaXQoclNwbGl0KS5maWx0ZXIocHJvcCA9PiAhIXByb3ApO1xuICAgIHdoaWxlICgocHJvcCA9IGV4cHIuc2hpZnQoKSkgJiYgdGVtcCkge1xuICAgICAgICB0ZW1wID0gdGVtcFtwcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXA7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1mb3JtL2NyZWF0ZS1mb3JtLnRzIiwiaW1wb3J0ICcuL21zLWZvcm0nO1xuaW1wb3J0ICcuL21zLWZvcm0taXRlbSc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1mb3JtL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0IGNvbnRyb2xDb21wb25lbnQgZnJvbSAnLi4vbXMtZm9ybS9tcy1jb250cm9sJztcbmltcG9ydCB7IGVtaXRUb0Zvcm1JdGVtIH0gZnJvbSAnLi4vbXMtZm9ybS91dGlscyc7XG5pbXBvcnQgeyBmaW5kUGFyZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuXG5jb250cm9sQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy1pbnB1dCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtaW5wdXQuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHRleHQ6ICcnLFxuICAgICAgICBtYXBWYWx1ZVRvVGV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy50ZXh0ID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5pdDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1RleHQodik7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHYgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvVGV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtaW5wdXQvbXMtaW5wdXQudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLW1lbnUnLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtbWVudS5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgbWVudTogW10sXG4gICAgICAgIHNlbGVjdGVkS2V5czogW10sXG4gICAgICAgIG9wZW5LZXlzOiBbXSxcbiAgICAgICAgb25DbGljazogYXZhbG9uLm5vb3AsXG4gICAgICAgIG9uT3BlbkNoYW5nZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIGhhbmRsZUNsaWNrKGl0ZW0sIGtleSwga2V5UGF0aCkge1xuICAgICAgICAgICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8g5Y+25a2Q6IqC54K5XG4gICAgICAgICAgICAgICAgLy90aGlzLnNlbGVjdGVkS2V5cy5lbnN1cmUoaXRlbS5rZXkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRLZXlzID0gW2l0ZW0ua2V5XTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soaXRlbSwga2V5LCBrZXlQYXRoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8g6Z2e5Y+25a2Q6IqC54K5XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3BlbktleXMuY29udGFpbnMoaXRlbS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbktleXMucmVtb3ZlKGl0ZW0ua2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5LZXlzLnB1c2goaXRlbS5rZXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm9uT3BlbkNoYW5nZSh0aGlzLm9wZW5LZXlzLnRvSlNPTigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbWVudS9tcy1tZW51LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0IGNvbnRyb2xDb21wb25lbnQgZnJvbSBcIi4uL21zLWZvcm0vbXMtY29udHJvbFwiO1xuaW1wb3J0ICcuLi9tcy10cmlnZ2VyJztcblxuaW1wb3J0IHsgZ2V0Q2hpbGRUZW1wbGF0ZURlc2NyaXB0b3IsIGRlYm91bmNlIH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuaW1wb3J0IHsgZW1pdFRvRm9ybUl0ZW0gfSBmcm9tICcuLi9tcy1mb3JtL3V0aWxzJztcblxuY29udHJvbENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtc2VsZWN0JyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1zZWxlY3QuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHZhbHVlOiBbXSxcbiAgICAgICAgbW9kZTogJycsXG4gICAgICAgIG9wdGlvbnM6IFtdLFxuICAgICAgICBzZWxlY3Rpb246IFtdLFxuICAgICAgICByZW1vdGU6IGZhbHNlLFxuICAgICAgICByZW1vdGVNZXRob2Q6IGF2YWxvbi5ub29wLFxuXG4gICAgICAgIC8vIOS4i+aLieahhuWxleekuuWSjOaTjeS9nOmDqOWIhlxuICAgICAgICBkaXNwbGF5VmFsdWU6ICcnLFxuICAgICAgICBzaG93U2VhcmNoOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoVmFsdWU6ICcnLFxuICAgICAgICBmb2N1c1NlYXJjaCgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0Jykuc2VhcmNoLmZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhJbkJveChlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQgPT09IGVsIHx8IGF2YWxvbi5jb250YWlucyh0aGlzLiRlbGVtZW50LCBlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRhcmdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50O1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFuZWxWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hWYWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxXaWR0aCA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbFZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNTZWFyY2goKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZURlbGV0ZShlKSB7XG4gICAgICAgICAgICBpZiAoKGUud2hpY2ggPT09IDggfHwgZS53aGljaCA9PT0gNDYpICYmIHRoaXMuc2VhcmNoVmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucmVtb3ZlQXQodGhpcy5zZWxlY3Rpb24ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24udG9KU09OKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzZWxlY3Rpb24ubWFwKHMgPT4gcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgYXZhbG9uLnZtb2RlbHNbdGhpcy5wYW5lbFZtSWRdLnNlbGVjdGlvbiA9IHNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5pc011bHRpcGxlID8gdmFsdWUgOiB2YWx1ZVswXSB8fCAnJyB9LFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZW1vdmVTZWxlY3Rpb24oZSwgb3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5yZW1vdmVBbGwobyA9PiBvLnZhbHVlID09PSBvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24udG9KU09OKCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdGlvbi5tYXAocyA9PiBzLnZhbHVlKTtcbiAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXS5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gICAgICAgICAgICB0aGlzLmZvY3VzU2VhcmNoKCk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB0aGlzLmlzTXVsdGlwbGUgPyB2YWx1ZSA6IHZhbHVlWzBdIHx8ICcnIH0sXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NlbGVjdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vIOS4i+aLieahhuS4i+aLieWIl+ihqOmDqOWIhlxuICAgICAgICBwYW5lbFdpZHRoOiAwLFxuICAgICAgICBwYW5lbFZtSWQ6ICcnLFxuICAgICAgICBwYW5lbFZpc2libGU6IGZhbHNlLFxuICAgICAgICBwYW5lbENsYXNzOiAna291bWVpLXNlbGVjdC1kcm9wZG93bicsXG4gICAgICAgIHBhbmVsVGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtc2VsZWN0LXBhbmVsLmh0bWwnKSxcbiAgICAgICAgaGFuZGxlUGFuZWxIaWRlKCkge1xuICAgICAgICAgICAgdGhpcy5wYW5lbFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICAkY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGlzTXVsdGlwbGU6IHtcbiAgICAgICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGUgPT09ICdtdWx0aXBsZScgfHwgdGhpcy5tb2RlID09PSAndGFncyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgLy8g55Sf5ZG95ZGo5pyfXG4gICAgICAgIG1hcFZhbHVlVG9TZWxlY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5vcHRpb25zLmZpbHRlcihvID0+IHZhbHVlLmNvbnRhaW5zKG8udmFsdWUpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnNlbGVjdGlvblswXS5sYWJlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXS5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi50b0pTT04oKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IGdldENoaWxkVGVtcGxhdGVEZXNjcmlwdG9yKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGdldE9wdGlvbnMoZGVzY3JpcHRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVtaXRUb0Zvcm1JdGVtKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZhbHVlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB2LnRvSlNPTigpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1NlbGVjdGlvbih2KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5pc011bHRpcGxlID8gdmFsdWUgOiB2YWx1ZVswXSB8fCAnJyB9LFxuICAgICAgICAgICAgICAgICAgICBkZW55VmFsaWRhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wYW5lbFZtSWQgPSB0aGlzLiRpZCArICdfcGFuZWwnO1xuICAgICAgICAgICAgY29uc3QgaW5uZXJWbSA9IGF2YWxvbi5kZWZpbmUoe1xuICAgICAgICAgICAgICAgICRpZDogdGhpcy5wYW5lbFZtSWQsXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbXSxcbiAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc011bHRpcGxlOiB0aGlzLmlzTXVsdGlwbGUsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLnRvSlNPTigpLFxuICAgICAgICAgICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICBnZXRGaWx0ZXJlZE9wdGlvbnMoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsdGVyKHRoaXMuZmlsdGVyRm4pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsdGVyRm4oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnJlbW90ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChhdmFsb24uZXNjYXBlUmVnRXhwKHRoaXMuc2VhcmNoVmFsdWUpLCAnaScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVnLnRlc3QoZWwubGFiZWwpIHx8IHJlZy50ZXN0KGVsLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhhbmRsZU9wdGlvbkNsaWNrKGUsIG9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuaXNNdWx0aXBsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uLnNvbWUobyA9PiBvLnZhbHVlID09PSBvcHRpb24udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucmVtb3ZlQWxsKG8gPT4gby52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucHVzaChvcHRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5mb2N1c1NlYXJjaCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbb3B0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24udG9KU09OKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc2VsZWN0aW9uLm1hcChzID0+IHMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHNlbGYuaXNNdWx0aXBsZSA/IHZhbHVlIDogdmFsdWVbMF0gfHwgJycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BsYXlWYWx1ZSA9IG9wdGlvbi5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnc2VhcmNoVmFsdWUnLCBkZWJvdW5jZSh2ID0+IHtcbiAgICAgICAgICAgICAgICBpbm5lclZtLnNlYXJjaFZhbHVlID0gdjtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1vdGUgJiYgISF2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyVm0ubG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlTWV0aG9kKHYpLnRoZW4ob3B0aW9ucyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbm5lclZtLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJWbS5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ2lzTXVsdGlwbGUnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICBpbm5lclZtLmlzTXVsdGlwbGUgPSB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3Rpb24odGhpcy52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0T3B0aW9ucyhkZXNjcmlwdG9yKSB7XG4gICAgcmV0dXJuIGRlc2NyaXB0b3IucmVkdWNlKChhY2MsIG9wdGlvbikgPT4ge1xuICAgICAgICBpZiAob3B0aW9uLmlzICE9ICdtcy1zZWxlY3Qtb3B0aW9uJykgcmV0dXJuIGFjYztcbiAgICAgICAgbGV0IGxhYmVsID0gb3B0aW9uLmlubGluZVRlbXBsYXRlO1xuICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgICBsYWJlbDogb3B0aW9uLmlubGluZVRlbXBsYXRlIHx8ICcnLFxuICAgICAgICAgICAgdmFsdWU6IG9wdGlvbi5wcm9wcy52YWx1ZSB8fCAnJyxcbiAgICAgICAgICAgIGRpc2FibGVkOiBvcHRpb24ucHJvcHMuZGlzYWJsZWQgfHwgZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtc2VsZWN0L21zLXNlbGVjdC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGNvbnRyb2xDb21wb25lbnQgZnJvbSAnLi4vbXMtZm9ybS9tcy1jb250cm9sJztcbmltcG9ydCAnLi4vbXMtdHJpZ2dlcic7XG5pbXBvcnQgJy4uL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci12aWV3J1xuaW1wb3J0IHsgZW1pdFRvRm9ybUl0ZW0gfSBmcm9tICcuLi9tcy1mb3JtL3V0aWxzJztcblxuLyoqXG4gKiDml7bpl7TpgInmi6nnu4Tku7ZcbiAqIEBwcm9wIHZhbHVlIOe7hOS7tuWAvChpbmhlcml0KVxuICogQHByb3AgY29sIOWtl+autei3r+W+hChpbmhlcml0KVxuICogQHByb3AgZm9ybWF0IOaXpeacn+agvOW8j++8jOWPguiAgyBtb21lbnRqc++8jOm7mOiupOS4uiBISDptbTpzc1xuICogXG4gKiBAZXhhbXBsZVxuICogYGBgIGh0bWxcbiAqIFxuICogYGBgXG4gKi9cbmNvbnRyb2xDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLXRpbWVwaWNrZXInLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXRpbWVwaWNrZXIuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgICAgZm9ybWF0OiAnSEg6bW06c3MnLFxuICAgICAgICBjbGVhcigpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogJycgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiAndGltZXBpY2tlci1jaGFuZ2VkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhJbkJveChlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQgPT09IGVsIHx8IGF2YWxvbi5jb250YWlucyh0aGlzLiRlbGVtZW50LCBlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRhcmdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50O1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFuZWxWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgYXZhbG9uLnZtb2RlbHNbdGhpcy5wYW5lbFZtSWRdLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbFZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBhbmVsVm1JZDogJycsXG4gICAgICAgIHBhbmVsVmlzaWJsZTogZmFsc2UsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdrb3VtZWktdGltZXBpY2tlci1wYW5lbC1jb250YWluZXInLFxuICAgICAgICBwYW5lbFRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtvdW1laS10aW1lcGlja2VyLXBhbmVsXCIgc3R5bGU9XCJvdmVyZmxvdzogYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx4bXAgaXM9XCJtcy10aW1lcGlja2VyLXZpZXdcIiA6d2lkZ2V0PVwie3ZhbHVlOkBjdXJyZW50RGF0ZUFycmF5LG9uQ2hhbmdlOkBoYW5kbGVUaW1lcGlja2VyQ2hhbmdlfVwiPjwveG1wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YCxcbiAgICAgICAgaGFuZGxlUGFuZWxIaWRlKCkge1xuICAgICAgICAgICAgdGhpcy5wYW5lbFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgfSxcblxuICAgICAgICBtYXBWYWx1ZVRvU2VsZWN0ZWQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgZW1pdFRvRm9ybUl0ZW0odGhpcywge1xuICAgICAgICAgICAgICAgIHNob3dJY29uOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmFsdWUnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3RlZCh2KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdiB9LFxuICAgICAgICAgICAgICAgICAgICBkZW55VmFsaWRhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lcGlja2VyLWNoYW5nZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucGFuZWxWbUlkID0gdGhpcy4kaWQgKyAnX3BhbmVsJztcbiAgICAgICAgICAgIGNvbnN0IGlubmVyVm0gPSBhdmFsb24uZGVmaW5lKHtcbiAgICAgICAgICAgICAgICAkaWQ6IHRoaXMucGFuZWxWbUlkLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREYXRlQXJyYXk6ICcnLFxuICAgICAgICAgICAgICAgICRtb21lbnQ6IG1vbWVudCgpLFxuICAgICAgICAgICAgICAgIHJlc2V0KCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb21lbnQgPSBzZWxmLnNlbGVjdGVkID8gbW9tZW50KHNlbGYuc2VsZWN0ZWQsIHNlbGYuZm9ybWF0KSA6IG1vbWVudCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoYW5kbGVUaW1lcGlja2VyQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBob3VyLCBtaW51dGUsIHNlY29uZCB9ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG1vbWVudC5ob3VyKGhvdXIpLm1pbnV0ZShtaW51dGUpLnNlY29uZChzZWNvbmQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWQgPSB0aGlzLiRtb21lbnQuZm9ybWF0KHNlbGYuZm9ybWF0KTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHNlbGYuc2VsZWN0ZWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lcGlja2VyLWNoYW5nZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvU2VsZWN0ZWQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBpbm5lclZtLnJlc2V0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci50cyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuXG5cbmltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCBjb250cm9sQ29tcG9uZW50IGZyb20gJy4uL21zLWZvcm0vbXMtY29udHJvbCc7XG5pbXBvcnQgeyBlbWl0VG9Gb3JtSXRlbSB9IGZyb20gJy4uL21zLWZvcm0vdXRpbHMnO1xuaW1wb3J0ICcuL21zLXVwbG9hZC1saXN0JztcbmltcG9ydCAnLi9tcy11cGxvYWQtY2FyZCc7XG5pbXBvcnQgVXBsb2FkZXIgZnJvbSAna291bWVpLWZpbGV1cC1sb2FkZXInO1xuXG4vKipcbiAqIOaWh+S7tuS4iuS8oOe7hOS7tlxuICogQHByb3AgdmFsdWUg57uE5Lu25YC8KGluaGVyaXQpXG4gKiBAcHJvcCBjb2wg5a2X5q616Lev5b6EKGluaGVyaXQpXG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGAgaHRtbFxuICogPG1zLXVwbG9hZCA6d2lkZ2V0PVwie3ZhbHVlOkByZWNvcmQuYXR0YWNobWVudCxjb2w6J2F0dGFjaG1lbnQnLCRydWxlczp7cmVxdWlyZWQ6dHJ1ZSx0eXBlOidhcnJheSd9fVwiPlxuICogICAgICA8aSBjbGFzcz1cImZhIGZhLXVwbG9hZFwiPjwvaT7pgInmi6npmYTku7ZcbiAqIDwvbXMtdXBsb2FkPlxuICogYGBgXG4gKi9cbmNvbnRyb2xDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLXVwbG9hZCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdXBsb2FkLmh0bWwnKSxcbiAgICBzb2xlU2xvdDogJ3RyaWdnZXInLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGhlbHBJZDogJycsXG4gICAgICAgIHRyaWdnZXI6ICcnLFxuICAgICAgICB2YWx1ZTogW10sXG4gICAgICAgIGZpbGVMaXN0OiBbXSxcbiAgICAgICAgYWN0aW9uOiAnJyxcbiAgICAgICAgbGlzdFR5cGU6ICd0ZXh0LWxpc3QnLFxuICAgICAgICBzaG93VXBsb2FkTGlzdDogdHJ1ZSxcbiAgICAgICAgYnRuQ2xhc3M6ICdidG4gYnRuLWRlZmF1bHQnLFxuICAgICAgICBjYXJkQ2xhc3M6ICdrb3VtZWktdXBsb2FkLXNlbGVjdC1jYXJkIGtvdW1laS11cGxvYWQtY2FyZC1pdGVtJyxcbiAgICAgICAgYmxhbmtJbWc6ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQkFQLy8vd0FBQUNINUJBRUtBQUVBTEFBQUFBQUJBQUVBQUFJQ1RBRUFPdz09JyxcbiAgICAgICAgJHVwbG9hZGVyOiBudWxsLFxuICAgICAgICBiZWZvcmVVcGxvYWQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlUmVtb3ZlKGZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QucmVtb3ZlQWxsKGYgPT4gZi51aWQgPT09IGZpbGUudWlkKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5maWxlTGlzdC5maWx0ZXIoZiA9PiBmLnN0YXR1cyA9PT0gJ2RvbmUnKS5tYXAoZiA9PiBmLnVybCk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB0aGlzLnNob3dVcGxvYWRMaXN0ID8gdmFsdWUgOiB2YWx1ZVswXSB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdmaWxlLXVwbG9hZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtYXBWYWx1ZVRvRmlsZUxpc3QodmFsdWUpIHtcbiAgICAgICAgICAgIHZhbHVlLm1hcCgodXJsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHVybCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB1aWQ6IC0oaSArIDEpLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB1cmwucmVwbGFjZSgvLipcXC8oW15cXC9dKylcXC8/LywgJyQxJyksXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICdkb25lJyxcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGVtaXRUb0Zvcm1JdGVtKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oZWxwSWQgPSB0aGlzLiRpZDtcbiAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb0ZpbGVMaXN0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZhbHVlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gdi50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVMaXN0LmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvRmlsZUxpc3QodmFsdWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB0aGlzLnNob3dVcGxvYWRMaXN0ID8gdmFsdWUgOiB2YWx1ZVswXSB9LFxuICAgICAgICAgICAgICAgICAgICBkZW55VmFsaWRhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdmaWxlLXVwbG9hZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvblJlYWR5KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiR1cGxvYWRlciA9IFVwbG9hZGVyLmluaXQoe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy5hY3Rpb24sXG4gICAgICAgICAgICAgICAgZmlsZUlucHV0OiBldmVudC50YXJnZXQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2lucHV0JykuZmlsZSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6IChmaWxlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzkuI3mlK/mjIHlm77niYfkv6Hmga/nmoTpooTop4jvvIzliJnkuI3ov5vooYzov4fmu6TlkozpmZDliLZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVzLmZpbHRlcihmaWxlID0+ICFmaWxlLnNpemUgfHwgdGhpcy5iZWZvcmVVcGxvYWQoZmlsZSkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25TZWxlY3Q6IChmaWxlcywgYWxsRmlsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYWxsRmlsZXMubWFwKGZpbGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dVcGxvYWRMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5zZXQoMCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IGZpbGUuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAndXBsb2FkaW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy5ibGFua0ltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGVMaXN0LmV2ZXJ5KGYgPT4gZi51aWQgIT09IGZpbGUuaW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlkOiBmaWxlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ3VwbG9hZGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmxhbmtJbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsZU9iaih0aGlzLmZpbGVMaXN0LCBmaWxlLmluZGV4LCBmID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5zdGF0dXMgPSAndXBsb2FkaW5nJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5wcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiR1cGxvYWRlci51cGxvYWQoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3M6IChmaWxlLCBsb2FkZWQsIHRvdGFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbGVPYmoodGhpcy5maWxlTGlzdCwgZmlsZS5pbmRleCwgZiA9PiBmLnByb2dyZXNzID0gKGxvYWRlZCAvIHRvdGFsICogMTAwKS50b0ZpeGVkKCkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25TdWNjZXNzOiAoZmlsZSwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsZU9iaih0aGlzLmZpbGVMaXN0LCBmaWxlLmluZGV4LCBmID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYuc3RhdHVzID0gJ2RvbmUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZi5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYudXJsID0gcmVzcG9uc2UudXJsO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRmFpbHVyZTogKGZpbGUsIGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVGaWxlT2JqKHRoaXMuZmlsZUxpc3QsIGZpbGUuaW5kZXgsIGYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZi5zdGF0dXMgPSAnZXJyb3InO1xuICAgICAgICAgICAgICAgICAgICAgICAgZi51cmwgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LE1BPT0nO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5maWxlTGlzdC5maWx0ZXIoZiA9PiBmLnN0YXR1cyA9PT0gJ2RvbmUnKS5tYXAoZiA9PiBmLnVybCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5zaG93VXBsb2FkTGlzdCA/IHZhbHVlIDogdmFsdWVbMF0gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdmaWxlLXVwbG9hZCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZShldmVudCkge1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZUZpbGVPYmooZmlsZUxpc3QsIHVpZCwgY2FsbGJhY2spIHtcbiAgICBmaWxlTGlzdC5mb3JFYWNoKGYgPT4ge1xuICAgICAgICBpZiAoZi51aWQgPT09IHVpZCkge1xuICAgICAgICAgICAgY2FsbGJhY2soZik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQudHMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1sb2FkaW5nL21zLWxvYWRpbmcuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0ICcuLi9tcy1zZWxlY3QnO1xuaW1wb3J0ICcuL21zLWNhbGVuZGFyLXllYXItdmlldyc7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLWNhbGVuZGFyJywge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLWNhbGVuZGFyLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgICR2YWx1ZTogbnVsbCxcbiAgICAgICAgJHNlbGVjdGVkOiBudWxsLFxuICAgICAgICB3ZWVrU3RhcnQ6IDAsXG4gICAgICAgIHNob3dIZWFkZXI6IHRydWUsXG4gICAgICAgIGRpc2FibGVkRGF0ZSgpIHsgcmV0dXJuIGZhbHNlOyB9LFxuICAgICAgICBcbiAgICAgICAgY3VycmVudE1vbnRoOiAnJyxcbiAgICAgICAgY3VycmVudFllYXI6IDAsXG4gICAgICAgIHdlZWtkYXlzOiBbXSxcbiAgICAgICAgY3VycmVudFllYXJPcHRpb25zOiBbXSxcbiAgICAgICAgbW9udGhPcHRpb25zOiBbXSxcbiAgICAgICAgdGFibGU6IFtdLFxuICAgICAgICBoYW5kbGVZZWFyQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHRoaXMuJHZhbHVlLnllYXIoZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICB0aGlzLmNhbGNUYWJsZSh0aGlzLiR2YWx1ZS5jbG9uZSgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlTW9udGhDaGFuZ2UoZSkge1xuICAgICAgICAgICAgdGhpcy4kdmFsdWUubW9udGgoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5jYWxjVGFibGUodGhpcy4kdmFsdWUuY2xvbmUoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZURhdGVDbGljayhlbCkge1xuICAgICAgICAgICAgaWYgKGVsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kc2VsZWN0ZWQueWVhcih0aGlzLmN1cnJlbnRZZWFyKS5tb250aCh0aGlzLmN1cnJlbnRNb250aCkuZGF0ZShlbC5kYXRlKTtcbiAgICAgICAgICAgIGlmIChlbC5wcmV2TW9udGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzZWxlY3RlZC5zdWJ0cmFjdCgxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwubmV4dE1vbnRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2VsZWN0ZWQuYWRkKDEsICdtb250aHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHZhbHVlID0gdGhpcy4kc2VsZWN0ZWQ7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuJHNlbGVjdGVkLmNsb25lKClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjYWxlbmRhci1jaGFuZ2VkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyDmmK/lkKbmnInlv4XopoHlho3orqHnrpfmm7TmlrDkuIDmrKHvvJ9cbiAgICAgICAgICAgIHRoaXMuY2FsY1RhYmxlKHRoaXMuJHZhbHVlLmNsb25lKCkpO1xuICAgICAgICB9LFxuICAgICAgICBvbkNoYW5nZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIGNhbGNUYWJsZShtOiBtb21lbnQuTW9tZW50KSB7XG4gICAgICAgICAgICBsZXQgaSwgajtcbiAgICAgICAgICAgIC8vIOi/meS4quaciOeahOesrOS4gOWkqVxuICAgICAgICAgICAgY29uc3QgZmlyc3REYXlPZk1vbnRoID0gbS5jbG9uZSgpLnN0YXJ0T2YoJ21vbnRoJyk7XG4gICAgICAgICAgICAvLyDov5nkuKrmnIjnmoTmnIDlkI7kuIDlpKlcbiAgICAgICAgICAgIGNvbnN0IGxhc3REYXlPZk1vbnRoID0gbS5jbG9uZSgpLmVuZE9mKCdtb250aCcpO1xuICAgICAgICAgICAgLy8g5LiK5Liq5pyI55qE5pyA5ZCO5LiA5aSpXG4gICAgICAgICAgICBjb25zdCBsYXN0RGF5T2ZQcmV2TW9udGggPSBmaXJzdERheU9mTW9udGguY2xvbmUoKS5zdWJ0cmFjdCgxLCAnZGF5cycpO1xuICAgICAgICAgICAgY29uc3QgZmlyc3REYXkgPSAoZmlyc3REYXlPZk1vbnRoLmRheSgpIC0gdGhpcy53ZWVrU3RhcnQgKyA3KSAlIDc7XG4gICAgICAgICAgICBjb25zdCBwcmV2TGFzdERhdGUgPSBsYXN0RGF5T2ZQcmV2TW9udGguZGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgbGFzdERhdGUgPSBsYXN0RGF5T2ZNb250aC5kYXRlKCk7XG4gICAgICAgICAgICBjb25zdCB0YWJsZSA9IFtdO1xuICAgICAgICAgICAgbGV0IHBhc3NlZCA9IDA7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGVSb3cgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgNzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZXZNb250aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dE1vbnRoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIGogPCBmaXJzdERheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5LiK5pyI57uT5p2f6YOo5YiGXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUucHVzaCgna291bWVpLWNhbGVuZGFyLXByZXYtbW9udGgtY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldk1vbnRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZSgrbS5jbG9uZSgpLnN1YnRyYWN0KDEsICdtb250aHMnKS5kYXRlKHByZXZMYXN0RGF0ZSAtIGZpcnN0RGF5ICsgaiArIDEpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUucHVzaCgna291bWVpLWNhbGVuZGFyLWRpc2FibGVkLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlUm93LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2TW9udGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IHByZXZMYXN0RGF0ZSAtIGZpcnN0RGF5ICsgaiArIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhc3NlZCArIDEgPiBsYXN0RGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5LiL5pyI5byA5aeL6YOo5YiGXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUucHVzaCgna291bWVpLWNhbGVuZGFyLW5leHQtbW9udGgtY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE1vbnRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZSgrbS5jbG9uZSgpLmFkZCgxLCAnbW9udGhzJykuZGF0ZShwYXNzZWQgKyAxIC0gbGFzdERhdGUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUucHVzaCgna291bWVpLWNhbGVuZGFyLWRpc2FibGVkLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlUm93LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2TW9udGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dE1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6ICsrcGFzc2VkIC0gbGFzdERhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pys5pyI6YOo5YiGXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9tZW50KCkuaXNTYW1lKG0uY2xvbmUoKS5kYXRlKHBhc3NlZCArIDEpLCAnZGF5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUucHVzaCgna291bWVpLWNhbGVuZGFyLXRvZGF5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kc2VsZWN0ZWQuaXNTYW1lKG0uY2xvbmUoKS5kYXRlKHBhc3NlZCArIDEpLCAnZGF5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUucHVzaCgna291bWVpLWNhbGVuZGFyLXNlbGVjdGVkLWRheScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWREYXRlKCttLmNsb25lKCkuZGF0ZShwYXNzZWQgKyAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci1kaXNhYmxlZC1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZVJvdy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldk1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRNb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiArK3Bhc3NlZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFibGUucHVzaCh0YWJsZVJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IG0uZm9ybWF0KCdNTU0nKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIgPSBtLnllYXIoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXJPcHRpb25zID0gYXZhbG9uLnJhbmdlKHRoaXMuY3VycmVudFllYXIgLSAxMCwgdGhpcy5jdXJyZW50WWVhciArIDkpLm1hcCh5ID0+ICh7IGxhYmVsOiB5LCB2YWx1ZTogeSB9KSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgdGhpcy4kdmFsdWUgPSBtb21lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuJHNlbGVjdGVkID0gbW9tZW50KCk7XG4gICAgICAgICAgICBjb25zdCB3ZWVrZGF5cyA9IG1vbWVudC5sb2NhbGVEYXRhKCkud2Vla2RheXNNaW4oKTtcbiAgICAgICAgICAgIGF2YWxvbi5yYW5nZSh0aGlzLndlZWtTdGFydCkuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICAgICAgICB3ZWVrZGF5cy5wdXNoKHdlZWtkYXlzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMud2Vla2RheXMgPSB3ZWVrZGF5cztcbiAgICAgICAgICAgIGNvbnN0IG1vbnRoTGlzdCA9IG1vbWVudC5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQoKTtcbiAgICAgICAgICAgIHRoaXMubW9udGhPcHRpb25zID0gbW9udGhMaXN0Lm1hcChtID0+ICh7IGxhYmVsOiBtLCB2YWx1ZTogbSB9KSk7XG4gICAgICAgICAgICB0aGlzLmNhbGNUYWJsZSh0aGlzLiR2YWx1ZS5jbG9uZSgpKTtcblxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuJHZhbHVlLnRvQXJyYXkoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZhbHVlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdmFsdWUgPSB0aGlzLiRzZWxlY3RlZCA9IG1vbWVudCh2LnNwbGl0KCcsJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY1RhYmxlKHRoaXMuJHZhbHVlLmNsb25lKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0ICogYXMgYm9vdGJveCBmcm9tICdib290Ym94JztcbmltcG9ydCB7IHBhcnNlU2xvdFRvVk1vZGVsIH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuaW1wb3J0ICogYXMgJCBmcm9tICdqcXVlcnknO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy1kaWFsb2cnLCB7XG4gICAgdGVtcGxhdGU6ICc8ZGl2IHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPjxzbG90IG5hbWU9XCJoZWFkZXJcIiAvPjxzbG90IG5hbWU9XCJib2R5XCIvPjwvZGl2PicsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgYm9keTogJ2JsYW5rJyxcbiAgICAgICAgJGRpYWxvZzogbnVsbCxcbiAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgIHNpemU6ICcnLFxuICAgICAgICB1cGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAkaW5uZXJWbTogJycsXG4gICAgICAgIG9uT2soKSB7fSxcbiAgICAgICAgb25DYW5jZWwoKSB7fSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgdm0gPSBldmVudC52bW9kZWw7XG4gICAgICAgICAgICB2bS4kd2F0Y2goJ3Nob3cnLCAobmV3VikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWKSB7XG4gICAgICAgICAgICAgICAgICAgIHZtLiRkaWFsb2cgPSBib290Ym94LmRpYWxvZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB2bS5ib2R5LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICd7e3RpdGxlfX0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogdm0uc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAn5L+d5a2YJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXByaW1hcnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLm9uT2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuY2VsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAn5Y+W5raIJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLWRlZmF1bHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLm9uQ2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLm9uKCdoaWRkZW4uYnMubW9kYWwnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoJy5tb2RhbC5pbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAub24oJ3Nob3duLmJzLm1vZGFsJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB2bS4kZGlhbG9nLmZpbmQoJy5tb2RhbC1jb250ZW50JykuYXR0cignOmNvbnRyb2xsZXInLCB0aGlzLiRpbm5lclZtKTtcbiAgICAgICAgICAgICAgICAgICAgYXZhbG9uLnNjYW4odm0uJGRpYWxvZy5nZXQoMCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2bS4kZGlhbG9nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS4kZGlhbG9nLmZpbmQoJy5ib290Ym94LWNsb3NlLWJ1dHRvbicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICAgICAgcGFyc2VTbG90VG9WTW9kZWwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnNob3cgJiYgdGhpcy4kZmlyZSgnc2hvdycsIHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2UoZXZlbnQpIHtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZGlhbG9nL21zLWRpYWxvZy50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLWZvcm0nLCB7XG4gICAgdGVtcGxhdGU6IGA8Zm9ybSByb2xlPVwiZm9ybVwiIDpjbGFzcz1cIlsoQGhvcml6b250YWwgPyAnZm9ybS1ob3Jpem9udGFsJyA6ICcnKSwgKEBpbmxpbmUgPyAnZm9ybS1pbmxpbmUnIDogJycpXVwiPjxzbG90IC8+PC9mb3JtPmAsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgaXRlbXM6ICcnLFxuICAgICAgICAkZm9ybTogbnVsbCxcbiAgICAgICAgdHlwZTogJycsXG4gICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICBvbkZvcm1DaGFuZ2UobWV0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuJGZvcm0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICAgICAgW21ldGEubmFtZV06IHsgdmFsdWU6IG1ldGEudmFsdWUgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5fY3R5cGVfID0gJ21zLWZvcm0nO1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0Ll92bV8gPSB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBvblJlYWR5KGV2ZW50KSB7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNvbGVTbG90OiAnaXRlbXMnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWZvcm0vbXMtZm9ybS50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcblxuY29uc3QgbGF5b3V0Q29tcG9uZW50ID0gYXZhbG9uLmNvbXBvbmVudCgnbXMtbGF5b3V0Jywge1xuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtvdW1laS1sYXlvdXRcIiA6Y3NzPVwiQHN0eWxlXCIgOmNsYXNzPVwiQGNsYXNzTmFtZVwiPjxzbG90IC8+PC9kaXY+YCxcbiAgICBzb2xlU2xvdDogJ3Nsb3QnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHN0eWxlOiB7fSxcbiAgICAgICAgY2xhc3NOYW1lOiAnJ1xuICAgIH1cbn0pO1xuXG5sYXlvdXRDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLWxheW91dC1zaWRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwia291bWVpLWxheW91dC1zaWRlclwiIDpjc3M9XCJAc3R5bGVcIiA6Y2xhc3M9XCJAY2xhc3NOYW1lXCIgOmNsYXNzLTE9XCJbQGZpeGVkPydrb3VtZWktbGF5b3V0LWZpeGVkLXNpZGVyJzonJ11cIj48ZGl2IGNsYXNzPVwia291bWVpLWxheW91dC1zaWRlci1pbm5lclwiPjxzbG90IC8+PC9kaXY+PC9kaXY+YCxcbiAgICBzb2xlU2xvdDogJ3Nsb3QnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGZpeGVkOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6ICczMDBweCdcbiAgICB9XG59KTtcblxubGF5b3V0Q29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy1sYXlvdXQtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJrb3VtZWktbGF5b3V0LWhlYWRlclwiIDpjc3M9XCJAc3R5bGVcIiA6Y2xhc3M9XCJAY2xhc3NOYW1lXCIgOmNsYXNzLTE9XCJbQGZpeGVkPydrb3VtZWktbGF5b3V0LWZpeGVkLWhlYWRlcic6JyddXCI+PHNsb3QgLz48L2Rpdj5gLFxuICAgIHNvbGVTbG90OiAnc2xvdCcsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZml4ZWQ6IGZhbHNlLFxuICAgICAgICB3aWR0aDogJzYwcHgnXG4gICAgfVxufSk7XG5cbmxheW91dENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtbGF5b3V0LWNvbnRlbnQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtvdW1laS1sYXlvdXQtY29udGVudFwiIDpjc3M9XCJAc3R5bGVcIiA6Y2xhc3M9XCJAY2xhc3NOYW1lXCI+PHNsb3QgLz48L2Rpdj5gLFxuICAgIHNvbGVTbG90OiAnc2xvdCcsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZml4ZWQ6IGZhbHNlXG4gICAgfVxufSk7XG5cbmxheW91dENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtbGF5b3V0LWZvb3RlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwia291bWVpLWxheW91dC1mb290ZXJcIiA6Y3NzPVwiQHN0eWxlXCIgOmNsYXNzPVwiQGNsYXNzTmFtZVwiIDpjbGFzcy0xPVwiW0BmaXhlZD8na291bWVpLWxheW91dC1maXhlZC1mb290ZXInOicnXVwiPjxzbG90IC8+PC9kaXY+YCxcbiAgICBzb2xlU2xvdDogJ3Nsb3QnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGZpeGVkOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6ICc2MHB4J1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbGF5b3V0L21zLWxheW91dC50cyIsImltcG9ydCAqIGFzIG5vdHkgZnJvbSAnbm90eSc7XG5cbnR5cGUgbWVzc2FnZUFyZ3MgPSB7XG4gICAgY29udGVudDogc3RyaW5nLFxuICAgIGR1cmF0aW9uPzogbnVtYmVyXG59O1xuXG5sZXQgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgZHVyYXRpb246IDE1MDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbmZvKHsgY29udGVudCwgZHVyYXRpb24gfTogbWVzc2FnZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiAnPGkgY2xhc3M9XCJmYSBmYS1pbmZvLWNpcmNsZVwiPjwvaT4nICsgY29udGVudCxcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgICAgICBsYXlvdXQ6ICd0b3BDZW50ZXInLFxuICAgICAgICAgICAgdGltZW91dDogZHVyYXRpb24gfHwgZGVmYXVsdE9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzdWNjZXNzKHsgY29udGVudCwgZHVyYXRpb259OiBtZXNzYWdlQXJncyk6IHZvaWQge1xuICAgICAgICBub3R5KHtcbiAgICAgICAgICAgIHRleHQ6ICc8aSBjbGFzcz1cImZhIGZhLWNoZWNrLWNpcmNsZVwiPjwvaT4nICsgY29udGVudCxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGxheW91dDogJ3RvcENlbnRlcicsXG4gICAgICAgICAgICB0aW1lb3V0OiBkdXJhdGlvbiB8fCBkZWZhdWx0T3B0aW9ucy5kdXJhdGlvblxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGVycm9yKHsgY29udGVudCwgZHVyYXRpb259OiBtZXNzYWdlQXJncyk6IHZvaWQge1xuICAgICAgICBub3R5KHtcbiAgICAgICAgICAgIHRleHQ6ICc8aSBjbGFzcz1cImZhIGZhLXRpbWVzLWNpcmNsZVwiPjwvaT4nICsgY29udGVudCxcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICBsYXlvdXQ6ICd0b3BDZW50ZXInLFxuICAgICAgICAgICAgdGltZW91dDogZHVyYXRpb24gfHwgZGVmYXVsdE9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXJuaW5nKHsgY29udGVudCwgZHVyYXRpb259OiBtZXNzYWdlQXJncyk6IHZvaWQge1xuICAgICAgICBub3R5KHtcbiAgICAgICAgICAgIHRleHQ6ICc8aSBjbGFzcz1cImZhIGZhLXdhcm5pbmdcIj48L2k+JyArIGNvbnRlbnQsXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgICAgICBsYXlvdXQ6ICd0b3BDZW50ZXInLFxuICAgICAgICAgICAgdGltZW91dDogZHVyYXRpb24gfHwgZGVmYXVsdE9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXJuKHsgY29udGVudCwgZHVyYXRpb259OiBtZXNzYWdlQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhcm5pbmcoeyBjb250ZW50LCBkdXJhdGlvbiB9KTtcbiAgICB9LFxuICAgIGNvbmZpZyhvcHRpb25zOiBtZXNzYWdlQXJncyk6IHZvaWQge1xuICAgICAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkZWZhdWx0T3B0aW9ucy5kdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbWVzc2FnZS9tcy1tZXNzYWdlLnRzIiwiaW1wb3J0ICogYXMgbm90eSBmcm9tICdub3R5JztcblxudHlwZSBub3RpZmljYXRpb25BcmdzID0ge1xuICAgIC8qKlxuICAgICAqIOmAmuefpeato+aWh1xuICAgICAqL1xuICAgIG1lc3NhZ2U6IHN0cmluZyxcbiAgICAvKipcbiAgICAgKiDpgJrnn6XmoIfpophcbiAgICAgKi9cbiAgICB0aXRsZT86IHN0cmluZyxcbiAgICAvKipcbiAgICAgKiDmsqHmnInnlKjmiLfmk43kvZznmoTmg4XlhrXkuIvpgJrnn6Xkv53mjIHmmL7npLrnmoTml7bpl7TvvIjmr6vnp5LvvInvvIzpu5jorqTkuLogNTAwMG1zXG4gICAgICovXG4gICAgdGltZW91dD86IG51bWJlclxufTtcblxubGV0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHRpbWVvdXQ6IDMwMDBcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBpbmZvKHsgbWVzc2FnZSwgdGl0bGUsIHRpbWVvdXQgfTogbm90aWZpY2F0aW9uQXJncyk6IHZvaWQge1xuICAgICAgICBub3R5KHtcbiAgICAgICAgICAgIHRleHQ6IHRlbXBsYXRlKHRpdGxlLCBtZXNzYWdlLCAnZmEgZmEtaW5mby1jaXJjbGUnKSxcbiAgICAgICAgICAgIHR5cGU6ICdpbmZvcm1hdGlvbicsXG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0IHx8IGRlZmF1bHRPcHRpb25zLnRpbWVvdXRcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBzdWNjZXNzKHsgbWVzc2FnZSwgdGl0bGUsIHRpbWVvdXQgfTogbm90aWZpY2F0aW9uQXJncyk6IHZvaWQge1xuICAgICAgICBub3R5KHtcbiAgICAgICAgICAgIHRleHQ6IHRlbXBsYXRlKHRpdGxlLCBtZXNzYWdlLCAnZmEgZmEtY2hlY2stY2lyY2xlJyksXG4gICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0IHx8IGRlZmF1bHRPcHRpb25zLnRpbWVvdXRcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcih7IG1lc3NhZ2UsIHRpdGxlLCB0aW1lb3V0IH06IG5vdGlmaWNhdGlvbkFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiB0ZW1wbGF0ZSh0aXRsZSwgbWVzc2FnZSwgJ2ZhIGZhLXRpbWVzLWNpcmNsZScpLFxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IHRpbWVvdXQgfHwgZGVmYXVsdE9wdGlvbnMudGltZW91dFxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHdhcm5pbmcoeyBtZXNzYWdlLCB0aXRsZSwgdGltZW91dCB9OiBub3RpZmljYXRpb25BcmdzKTogdm9pZCB7XG4gICAgICAgIG5vdHkoe1xuICAgICAgICAgICAgdGV4dDogdGVtcGxhdGUodGl0bGUsIG1lc3NhZ2UsICdmYSBmYS13YXJuaW5nJyksXG4gICAgICAgICAgICB0eXBlOiAnd2FybmluZycsXG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0IHx8IGRlZmF1bHRPcHRpb25zLnRpbWVvdXRcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXJuKHsgbWVzc2FnZSwgdGl0bGUsIHRpbWVvdXQgfTogbm90aWZpY2F0aW9uQXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLndhcm5pbmcoeyBtZXNzYWdlLCB0aXRsZSwgdGltZW91dCB9KTtcbiAgICB9LFxuICAgIGNvbmZpZyhvcHRpb25zOiBub3RpZmljYXRpb25BcmdzKTogdm9pZCB7XG4gICAgICAgIGlmIChvcHRpb25zLnRpbWVvdXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMudGltZW91dCA9IG9wdGlvbnMudGltZW91dDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHRlbXBsYXRlKHRpdGxlOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZywgaWNvbjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB0aXRsZSA9IHRpdGxlID8gYDxzdHJvbmc+JHt0aXRsZX08L3N0cm9uZz48YnI+YCA6ICcnO1xuICAgIHJldHVybiBgPGRpdj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7aWNvbn0gcHVsbC1sZWZ0XCIgc3R5bGU9XCJmb250LXNpemU6IDM4cHg7bWluLXdpZHRoOiAzOHB4O3RleHQtYWxpZ246IGNlbnRlcjtcIj48L2k+XG4gICAgICAgICAgICAgICAgJHt0aXRsZX1cbiAgICAgICAgICAgICAgICAke21lc3NhZ2V9XG4gICAgICAgICAgICA8L2Rpdj5gO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbm90aWZpY2F0aW9uL21zLW5vdGlmaWNhdGlvbi50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAnLi4vbXMtY2hlY2tib3gvbXMtY2hlY2tib3gnO1xuaW1wb3J0ICcuL21zLXRhYmxlLWhlYWRlcidcbmltcG9ydCAnLi4vbXMtcGFnaW5hdGlvbi9tcy1wYWdpbmF0aW9uJztcbmltcG9ydCB7XG4gICAgZmluZFBhcmVudENvbXBvbmVudCxcbiAgICBwYXJzZVNsb3RUb1ZNb2RlbCxcbiAgICBnZXRDaGlsZFRlbXBsYXRlRGVzY3JpcHRvclxufSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5pbXBvcnQgJy4uL21zLWxvYWRpbmcnO1xuXG5jb25zdCBkZWZhdWx0UGFnaW5hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjdXJyZW50OiAxLCBwYWdlU2l6ZTogMTAsIHRvdGFsOiBOYU4sIG9uQ2hhbmdlOiBhdmFsb24ubm9vcFxuICAgIH07XG59O1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy10YWJsZScsIHtcbiAgICBzb2xlU2xvdDogJ2hlYWRlcicsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdGFibGUuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGhlYWRlcjogJycsXG4gICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAga2V5OiAnaWQnLFxuXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBuZWVkU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgY2hlY2tlZDogW10sXG4gICAgICAgIHNlbGVjdGlvbjogW10sXG4gICAgICAgIGlzQWxsQ2hlY2tlZDogZmFsc2UsXG4gICAgICAgIG9uU2VsZWN0OiBhdmFsb24ubm9vcCxcbiAgICAgICAgb25TZWxlY3RBbGw6IGF2YWxvbi5ub29wLFxuICAgICAgICBzZWxlY3Rpb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBoYW5kbGVDaGVja0FsbChlKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXRDdXJyZW50UGFnZURhdGEoKTtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5mb3JFYWNoKHJlY29yZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZC5lbnN1cmUocmVjb3JkW3RoaXMua2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmVuc3VyZShyZWNvcmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHRoaXMucGFnaW5hdGlvbkNvbmZpZy50b3RhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkLnJlbW92ZUFsbChlbCA9PiBkYXRhLm1hcChyZWNvcmQgPT4gcmVjb3JkW3RoaXMua2V5XSkuaW5kZXhPZihlbCkgIT09IC0xKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucmVtb3ZlQWxsKGVsID0+IGRhdGEuaW5kZXhPZihlbCkgIT09IC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZSh0aGlzLmNoZWNrZWQsIHRoaXMuc2VsZWN0aW9uLiRtb2RlbCk7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0QWxsKGUudGFyZ2V0LmNoZWNrZWQsIHRoaXMuc2VsZWN0aW9uLiRtb2RlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZUNoZWNrKGNoZWNrZWQsIHJlY29yZCkge1xuICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQuZW5zdXJlKHJlY29yZFt0aGlzLmtleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmVuc3VyZShyZWNvcmQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQucmVtb3ZlKHJlY29yZFt0aGlzLmtleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnJlbW92ZShyZWNvcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UodGhpcy5jaGVja2VkLCB0aGlzLnNlbGVjdGlvbi4kbW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdChyZWNvcmQuJG1vZGVsLCBjaGVja2VkLCB0aGlzLnNlbGVjdGlvbi4kbW9kZWwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFjdGlvbnM6IGF2YWxvbi5ub29wLFxuICAgICAgICBoYW5kbGUodHlwZSwgY29sLCByZWNvcmQsICRpbmRleCwgLi4uZXh0cmEpIHtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gcmVjb3JkW2NvbC5kYXRhSW5kZXhdLiRtb2RlbCB8fCByZWNvcmRbY29sLmRhdGFJbmRleF07XG4gICAgICAgICAgICB0aGlzLmFjdGlvbnModHlwZSwgdGV4dCwgcmVjb3JkLiRtb2RlbCwgJGluZGV4LCAuLi5leHRyYSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFnaW5hdGlvbjogZGVmYXVsdFBhZ2luYXRpb24oKSxcbiAgICAgICAgcGFnaW5hdGlvbkNvbmZpZzogZGVmYXVsdFBhZ2luYXRpb24oKSxcbiAgICAgICAgaGFuZGxlUGFnZUNoYW5nZShjdXJyZW50UGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLm9uQ2hhbmdlKGN1cnJlbnRQYWdlKTtcbiAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5jdXJyZW50ID0gY3VycmVudFBhZ2U7XG5cbiAgICAgICAgICAgIHRoaXMuJGZpcmUoJ2NoZWNrZWQubGVuZ3RoJywgdGhpcy5jaGVja2VkLmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucGFnaW5hdGlvbkNvbmZpZy4kbW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDdXJyZW50UGFnZURhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHRoaXMucGFnaW5hdGlvbkNvbmZpZy50b3RhbCkgPyB0aGlzLmRhdGEgOiB0aGlzLmRhdGEuc2xpY2UoXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLnBhZ2VTaXplICogKHRoaXMucGFnaW5hdGlvbkNvbmZpZy5jdXJyZW50IC0gMSksXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLnBhZ2VTaXplICogdGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgICRjb21wdXRlZDoge1xuICAgICAgICAgICAgdG90YWwoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFpc05hTih0aGlzLnBhZ2luYXRpb25Db25maWcudG90YWwpID8gdGhpcy5wYWdpbmF0aW9uQ29uZmlnLnRvdGFsIDogdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvbkNoYW5nZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IGdldENoaWxkVGVtcGxhdGVEZXNjcmlwdG9yKHRoaXMpO1xuICAgICAgICAgICAgZGVzY3JpcHRvci5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbHVtbi5wcm9wcy50eXBlID09ICdzZWxlY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5ID0gY29sdW1uLnByb3BzLmRhdGFJbmRleCB8fCB0aGlzLmtleTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZWVkU2VsZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gZ2V0Q29sdW1uQ29uZmlnKGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ2NoZWNrZWQubGVuZ3RoJywgKG5ld1YpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UGFnZUtleXMgPSB0aGlzLmdldEN1cnJlbnRQYWdlRGF0YSgpXG4gICAgICAgICAgICAgICAgICAgIC5tYXAocmVjb3JkID0+IHJlY29yZFt0aGlzLmtleV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBbGxDaGVja2VkID0gY3VycmVudFBhZ2VLZXlzXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IHRoaXMuY2hlY2tlZC5jb250YWlucyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09IGN1cnJlbnRQYWdlS2V5cy5sZW5ndGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdkYXRhJywgKHYpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdkYXRhLmxlbmd0aCcsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNBbGxDaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3BhZ2luYXRpb24nLCB2ID0+IHtcbiAgICAgICAgICAgICAgICBhdmFsb24ubWl4KHRoaXMucGFnaW5hdGlvbkNvbmZpZywgdik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdwYWdpbmF0aW9uLmN1cnJlbnQnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudCA9IHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdwYWdpbmF0aW9uLnBhZ2VTaXplJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLnBhZ2VTaXplID0gdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3BhZ2luYXRpb24udG90YWwnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcudG90YWwgPSB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgncGFnaW5hdGlvbi5vbkNoYW5nZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5vbkNoYW5nZSA9IHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGZpcmUoJ3BhZ2luYXRpb24nLCB0aGlzLnBhZ2luYXRpb24uJG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2Uodm0sIGVsKSB7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuZnVuY3Rpb24gZ2V0Q29sdW1uQ29uZmlnKGRlc2NyaXB0b3IsIGxldmVsID0gMSkge1xuICAgIHJldHVybiBkZXNjcmlwdG9yLnJlZHVjZSgoYWNjLCBjb2x1bW4pID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5pcyAhPSAnbXMtdGFibGUtaGVhZGVyJykgcmV0dXJuIGFjYztcbiAgICAgICAgaWYgKGNvbHVtbi5wcm9wcy50eXBlID09ICdzZWxlY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbmxpbmVUZW1wbGF0ZSA9IGNvbHVtbi5pbmxpbmVUZW1wbGF0ZTtcbiAgICAgICAgaW5saW5lVGVtcGxhdGUgPSBpbmxpbmVUZW1wbGF0ZS5yZXBsYWNlKC8obXMtfDopc2tpcD1cIlteXCJdKlwiL2csICcnKTtcbiAgICAgICAgaW5saW5lVGVtcGxhdGUgPSBpbmxpbmVUZW1wbGF0ZS5yZXBsYWNlKC88XFxzKm1zLXRhYmxlLWhlYWRlcltePl0qPi4qPFxcL1xccyptcy10YWJsZS1oZWFkZXJcXHMqPi9nLCAnJyk7XG4gICAgICAgIGlubGluZVRlbXBsYXRlID0gaW5saW5lVGVtcGxhdGUucmVwbGFjZSgvKG1zLXw6KWNsaWNrPVwiaGFuZGxlXFwoKFteXCJdKilcXClcIi9nLCAoJDAsICQxLCAkMiwgJDMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHskMX1jbGljaz1cImhhbmRsZSgkeyQyfSwpXCJgLnJlcGxhY2UoLywvLCAnLCBjb2wsIHJlY29yZCwgJGluZGV4LCcpLnJlcGxhY2UoLyxcXCkvLCAnKScpO1xuICAgICAgICB9KTtcbiAgICAgICAgYWNjLnB1c2goe1xuICAgICAgICAgICAgdGl0bGU6IGNvbHVtbi5wcm9wcy50aXRsZSxcbiAgICAgICAgICAgIGRhdGFJbmRleDogY29sdW1uLnByb3BzLmRhdGFJbmRleCB8fCAnJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiAvXlxccyokLy50ZXN0KGlubGluZVRlbXBsYXRlKSA/ICd7e3JlY29yZC4nICsgY29sdW1uLnByb3BzLmRhdGFJbmRleCArICd9fScgOiBpbmxpbmVUZW1wbGF0ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGFjYy5jb25jYXQoZ2V0Q29sdW1uQ29uZmlnKGNvbHVtbi5jaGlsZHJlbiwgbGV2ZWwgKyAxKSk7XG4gICAgfSwgW10pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdGFibGUvbXMtdGFibGUudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgY29udHJvbENvbXBvbmVudCBmcm9tICcuLi9tcy1mb3JtL21zLWNvbnRyb2wnO1xuaW1wb3J0IHsgZW1pdFRvRm9ybUl0ZW0gfSBmcm9tICcuLi9tcy1mb3JtL3V0aWxzJztcbmltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbi8qKlxuICog5aSa6KGM5paH5pys6L6T5YWl57uE5Lu2XG4gKiBAcHJvcCB2YWx1ZSDnu4Tku7blgLwoaW5oZXJpdClcbiAqIEBwcm9wIGNvbCDlrZfmrrXot6/lvoQoaW5oZXJpdClcbiAqIEBwcm9wIHJvd3Mg5paH5pys5qGG6KGM5pWwXG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGAgaHRtbFxuICogPG1zLXRleHRhcmVhIDp3aWRnZXQ9XCJ7dmFsdWU6IEBiaW8sIGNvbDogJ2JpbycsIHJvd3M6IDN9XCI+PC9tcy10ZXh0YXJlYT5cbiAqIGBgYFxuICovXG5jb250cm9sQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy10ZXh0YXJlYScsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdGV4dGFyZWEuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHJvd3M6ICcnLFxuICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgbWFwVmFsdWVUb1RleHQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGVtaXRUb0Zvcm1JdGVtKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZhbHVlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvVGV4dCh2KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdiB9LFxuICAgICAgICAgICAgICAgICAgICBkZW55VmFsaWRhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjaGFuZ2VkJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9UZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10ZXh0YXJlYS9tcy10ZXh0YXJlYS50cyIsImltcG9ydCAnLi9tcy1jYWxlbmRhcic7XG5pbXBvcnQgJy4vbXMtY2FsZW5kYXIuc2Nzcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb250aFRhYmxlID0gW107XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLWNhbGVuZGFyLXllYXItdmlldycsIHtcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1jYWxlbmRhci15ZWFyLXZpZXcuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHRhYmxlOiBbXSxcbiAgICAgICAgLy8gMC3mnIjop4blm77vvIwxLeW5tOinhuWbvu+8jDIt5Y2B5bm06KeG5Zu+77yMMy3nmb7lubTop4blm75cbiAgICAgICAgdmlldzogMSxcbiAgICAgICAgY3VycmVudE1vbnRoOiAnJyxcbiAgICAgICAgY3VycmVudFllYXI6IDAsXG4gICAgICAgIGlzU2VsZWN0ZWQoZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZWxlY3Q6IGF2YWxvbi5ub29wLFxuICAgICAgICBoYW5kbGVDZWxsQ2xpY2soZWwpIHtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QoZWwpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoKSB7XG4gICAgICAgICAgICBjb25zdCBtb250aExpc3QgPSBtb21lbnQubG9jYWxlRGF0YSgpLm1vbnRoc1Nob3J0KCk7XG4gICAgICAgICAgICBpZiAobW9udGhUYWJsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBbMCwgMywgNiwgOV0uZm9yRWFjaChuID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbW9udGhUYWJsZS5wdXNoKG1vbnRoTGlzdC5zbGljZShuLCBuICsgMykubWFwKG0gPT4gKHsgbGFiZWw6IG0sIHZhbHVlOiBtIH0pKSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmlldycsIHYgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0T2ZEZWNhZGUgPSB0aGlzLmN1cnJlbnRZZWFyIC0gdGhpcy5jdXJyZW50WWVhciAlIDEwO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0T2ZDZW50dXJ5ID0gdGhpcy5jdXJyZW50WWVhciAtIHRoaXMuY3VycmVudFllYXIgJSAxMDA7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGUgPSBtb250aFRhYmxlOyBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGUgPSBbMCwgMywgNiwgOV0ubWFwKG4gPT4gYXZhbG9uLnJhbmdlKHN0YXJ0T2ZEZWNhZGUgLSAxLCBzdGFydE9mRGVjYWRlICsgMTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKG4sIG4gKyAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobSA9PiAoeyBsYWJlbDogbSwgdmFsdWU6IG0gfSkpKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGUgPSBbMCwgMywgNiwgOV0ubWFwKG4gPT4gYXZhbG9uLnJhbmdlKHN0YXJ0T2ZDZW50dXJ5IC0gMTAsIHN0YXJ0T2ZDZW50dXJ5ICsgMTEwLCAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UobiwgbiArIDMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm1hcChtID0+ICh7IGxhYmVsOiBgJHttfS0ke20gKyA5fWAsIHZhbHVlOiBtIH0pKSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ2N1cnJlbnRZZWFyJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZmlyZSgndmlldycsIHRoaXMudmlldyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIteWVhci12aWV3LnRzIiwiaW1wb3J0ICcuL21zLWNoZWNrYm94JztcbmltcG9ydCAnLi9tcy1jaGVja2JveC1ncm91cCc7XG5pbXBvcnQgJy4vbXMtY2hlY2tib3guc2Nzcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1jaGVja2JveC9pbmRleC50cyIsImltcG9ydCAnLi9tcy1kYXRlcGlja2VyJztcbmltcG9ydCAnLi9tcy1kYXRlcGlja2VyLnNjc3MnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9pbmRleC50cyIsImltcG9ydCAnLi9tcy1kaWFsb2cnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZGlhbG9nL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0IHsgZmluZFBhcmVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcblxuLyoqXG4gKiDooajljZXpobnnu4Tku7ZcbiAqIEBwcm9wIGxhYmVsIOihqOWNlemhueagh+etvlxuICogXG4gKiBAZXhhbXBsZVxuICogYGBgIGh0bWxcbiAqIDxtcy1mb3JtLWl0ZW0gOndpZGdldD1cIntsYWJlbDogJ+agh+mimCd9XCI+XG4gICAgICAgIDxtcy1pbnB1dCA6d2lkZ2V0PVwie3ZhbHVlOiBAdGl0bGUsIGNvbDogJ3RpdGxlJ31cIj48L21zLWlucHV0PlxuICAgIDwvbXMtZm9ybS1pdGVtPlxuICogYGBgXG4gKi9cbmF2YWxvbi5jb21wb25lbnQoJ21zLWZvcm0taXRlbScsIHtcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1mb3JtLWl0ZW0uaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgICRmb3JtVm06IG51bGwsXG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgY29udHJvbDogJycsXG4gICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgIGRpcnR5OiBmYWxzZSxcbiAgICAgICAgcmVhc29uczogW10sXG4gICAgICAgIGhhc1J1bGVzOiBmYWxzZSxcbiAgICAgICAgc2hvd0ljb246IHRydWUsXG4gICAgICAgIGNsYXNzTmFtZTogJycsXG4gICAgICAgIGlubGluZUZvcm1Hcm91cFN0eWxlOiB7IHZlcnRpY2FsQWxpZ246ICd0b3AnIH0sXG4gICAgICAgIGlubGluZU1lc3NhZ2VTdHlsZTogeyBtYXJnaW5Cb3R0b206IDAgfSxcbiAgICAgICAgb25GaWVsZENoYW5nZShkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICB0aGlzLiRmb3JtVm0udHlwZSAhPT0gJ3NlYXJjaCcgJiYgdGhpcy4kZm9ybVZtLiRmb3JtLnNldEZpZWxkc1ZhbHVlKHtcbiAgICAgICAgICAgICAgICBbZGVzY3JpcHRvci5uYW1lXTogeyB2YWx1ZTogZGVzY3JpcHRvci52YWx1ZSwgZGVueVZhbGlkYXRlOiBkZXNjcmlwdG9yLmRlbnlWYWxpZGF0ZSB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghZGVzY3JpcHRvci5ydWxlcykgcmV0dXJuIDtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLnNob3dJY29uID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0ljb24gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBkZXNjcmlwdG9yLnNob3dJY29uO1xuICAgICAgICAgICAgdGhpcy5oYXNSdWxlcyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRmb3JtVm0uJGZvcm0uYWRkRmllbGRzKHtcbiAgICAgICAgICAgICAgICBbZGVzY3JpcHRvci5uYW1lXTogeyBydWxlczogZGVzY3JpcHRvci5ydWxlcyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1WbS4kZm9ybS5vbignZXJyb3InICsgZGVzY3JpcHRvci5uYW1lLCAocmVhc29ucykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhc29ucyA9IHJlYXNvbnM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGZvcm1WbS4kZm9ybS5vbigncmVzZXQnLCBmaWVsZHMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh+T2JqZWN0LmtleXMoZmllbGRzKS5pbmRleE9mKGRlc2NyaXB0b3IubmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYXNvbnMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Gb3JtQ2hhbmdlKG1ldGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtVm0uJGZvcm0uYXV0b0FzeW5jQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRmb3JtVm0ub25Gb3JtQ2hhbmdlKG1ldGEpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5fY3R5cGVfID0gJ21zLWZvcm0taXRlbSc7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuX3ZtXyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRmb3JtVm0gPSBmaW5kUGFyZW50Q29tcG9uZW50KHRoaXMsICdtcy1mb3JtJyk7XG4gICAgICAgICAgICBpZiAodGhpcy4kZm9ybVZtID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ21zLWZvcm0taXRlbSDlv4XpobvmlL7lnKggbXMtZm9ybSDlhoUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbmxpbmUgPSB0aGlzLiRmb3JtVm0uaW5saW5lO1xuICAgICAgICB9LFxuICAgICAgICBvblJlYWR5KGV2ZW50KSB7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNvbGVTbG90OiAnY29udHJvbCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZm9ybS9tcy1mb3JtLWl0ZW0udHMiLCJpbXBvcnQgJy4vbXMtaW5wdXQnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtaW5wdXQvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbi8qKlxuICogbG9hZGluZyDmjIfku6RcbiAqIFxuICogQGV4YW1wbGVcbiAqIGBgYCBodG1sXG4gKiA8dGFibGUgOmxvYWRpbmc9XCJ0cnVlXCI+Li4uPC90YWJsZT5cbiAqIGBgYFxuICovXG5hdmFsb24uZGlyZWN0aXZlKCdsb2FkaW5nJywge1xuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBudWxsO1xuICAgICAgICB0aGlzLm9sZFBvc2l0aW9uU3R5bGUgPSAnJztcbiAgICB9LFxuICAgIHVwZGF0ZSh2ZG9tLCB2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbSA9IHZkb20uZG9tO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUgPyBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShkb20pIDogZG9tLmN1cnJlbnRTdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBkb20ub2Zmc2V0V2lkdGgsIGhlaWdodCA9IGRvbS5zY3JvbGxIZWlnaHQsIGNsYXNzTmFtZSA9IGRvbS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckxlZnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheVxuICAgICAgICAgICAgICAgICAgICB9ID0gY29tcHV0ZWRTdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbGRQb3NpdGlvblN0eWxlID0gZG9tLnN0eWxlLnBvc2l0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOWFg+e0oOaYr+makOiXj+eahO+8jOS7gOS5iOmDveS4jeWBmlxuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5a695bqm5ZKM6auY5bqm6YO95LiN5Li6MO+8jOWImea3u+WKoGxvYWRpbmfpga7nvalcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpZHRoICE9PSAwICYmIGhlaWdodCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXNrRWxlbWVudCA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgbWFza0VsZW1lbnQuY2xhc3NOYW1lID0gJ2tvdW1laS1sb2FkaW5nLW1hc2snO1xuICAgICAgICAgICAgICAgICAgICBtYXNrRWxlbWVudC5pbm5lclRleHQgPSAn5Yqg6L295LitLi4uJztcbiAgICAgICAgICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUubGVmdCA9IDAgLSAoYm9yZGVyTGVmdFdpZHRoID09PSAnbWVkaXVtJyA/IDAgOiBwYXJzZUZsb2F0KGJvcmRlckxlZnRXaWR0aCkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUudG9wID0gMCAtIChib3JkZXJUb3BXaWR0aCA9PT0gJ21lZGl1bScgPyAwIDogcGFyc2VGbG9hdChib3JkZXJUb3BXaWR0aCkpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmxpbmVIZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghfmAgJHtjbGFzc05hbWV9IGAuaW5kZXhPZignIG1hc2tlZCAnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNsYXNzTmFtZSArPSAnIG1hc2tlZCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9tLmFwcGVuZENoaWxkKG1hc2tFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG1hc2tFbGVtZW50O1xuICAgICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRvbSA9IHZkb20uZG9tO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hc2tFbGVtZW50ID0gdGhpcy5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBkb20uY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMub2xkUG9zaXRpb25TdHlsZSA9IGRvbS5zdHlsZS5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgICAgIGlmICghfmAgJHtjbGFzc05hbWV9IGAuaW5kZXhPZignIG1hc2tlZCAnKSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uY2xhc3NOYW1lID0gY2xhc3NOYW1lICsgJyBtYXNrZWQnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvbSA9IHZkb20uZG9tO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXNrRWxlbWVudCA9IHRoaXMuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGRvbS5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9sZFBvc2l0aW9uU3R5bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5wb3NpdGlvbiA9IHRoaXMub2xkUG9zaXRpb25TdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb20uY2xhc3NOYW1lID0gYCAke2NsYXNzTmFtZX0gYC5yZXBsYWNlKC9cXHMqbWFza2VkXFxzKi8sICcgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgYmVmb3JlRGlzcG9zZSgpIHtcbiAgICAgICAgY29uc3QgZG9tID0gdGhpcy5ub2RlLmRvbTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZSAmJiBkb20ucmVtb3ZlQ2hpbGQodGhpcy5pbnN0YW5jZSk7XG4gICAgfVxufSk7XG5cbi8qKlxuICog5YWo5bGAIGxvYWRpbmcg5pa55rOVXG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGAganNcbiAqIGltcG9ydCB7IExvYWRpbmcgfSBmcm9tICcuL2NvbXBvbmVudHMvbXMtbG9hZGluZyc7XG4gKiBMb2FkaW5nLnNob3coKTtcbiAqIHNldFRpbWVvdXQoKCkgPT4ge1xuICogICBMb2FkaW5nLmhpZGUoKTtcbiAqIH0sIDUwMDApXG4gKiBgYGBcbiAqL1xuY29uc3QgbG9hZGluZ0RpcmVjdGl2ZSA9IGF2YWxvbi5kaXJlY3RpdmVzWydsb2FkaW5nJ107XG5jb25zdCBnbG9iYWxMb2FkaW5nQ29udGV4dDoge1xuICAgIG5vZGU6IHsgZG9tOiBIVE1MRWxlbWVudCB9LFxuICAgIGluc3RhbmNlPzogSFRNTERpdkVsZW1lbnRcbn0gPSB7XG4gICAgbm9kZTogeyBkb206IGRvY3VtZW50LmJvZHkgfVxufTtcblxuZXhwb3J0IGNvbnN0IExvYWRpbmcgPSB7XG4gICAgc2hvdygpIHtcbiAgICAgICAgaWYgKGdsb2JhbExvYWRpbmdDb250ZXh0Lmluc3RhbmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvYWRpbmdEaXJlY3RpdmUuaW5pdC5jYWxsKGdsb2JhbExvYWRpbmdDb250ZXh0KTtcbiAgICAgICAgICAgIGF2YWxvbi5yZWFkeSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9hZGluZ0RpcmVjdGl2ZS51cGRhdGUuY2FsbChnbG9iYWxMb2FkaW5nQ29udGV4dCwge1xuICAgICAgICAgICAgICAgICAgICBkb206IGdsb2JhbExvYWRpbmdDb250ZXh0Lm5vZGUuZG9tXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWRpbmdEaXJlY3RpdmUudXBkYXRlLmNhbGwoZ2xvYmFsTG9hZGluZ0NvbnRleHQsIHtcbiAgICAgICAgICAgICAgICBkb206IGdsb2JhbExvYWRpbmdDb250ZXh0Lm5vZGUuZG9tXG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaGlkZSgpIHtcbiAgICAgICAgaWYgKGdsb2JhbExvYWRpbmdDb250ZXh0Lmluc3RhbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxvYWRpbmdEaXJlY3RpdmUudXBkYXRlLmNhbGwoZ2xvYmFsTG9hZGluZ0NvbnRleHQsIHtcbiAgICAgICAgICAgICAgICBkb206IGdsb2JhbExvYWRpbmdDb250ZXh0Lm5vZGUuZG9tXG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbG9hZGluZy9tcy1sb2FkaW5nLWRpcmVjdGl2ZS50cyIsImltcG9ydCAnLi9tcy1tZW51LnNjc3MnO1xuaW1wb3J0ICcuL21zLW1lbnUnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbWVudS9pbmRleC50cyIsImltcG9ydCBtZXNzYWdlIGZyb20gJy4vbXMtbWVzc2FnZSc7XG5leHBvcnQgZGVmYXVsdCBtZXNzYWdlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbWVzc2FnZS9pbmRleC50cyIsImltcG9ydCBub3RpZmljYXRpb24gZnJvbSAnLi9tcy1ub3RpZmljYXRpb24nO1xuZXhwb3J0IGRlZmF1bHQgbm90aWZpY2F0aW9uO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtbm90aWZpY2F0aW9uL2luZGV4LnRzIiwiaW1wb3J0ICcuL21zLXJhZGlvJztcbmltcG9ydCAnLi9tcy1yYWRpby1ncm91cCc7XG5pbXBvcnQgJy4vbXMtcmFkaW8uc2Nzcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1yYWRpby9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtc2VsZWN0LW9wdGlvbicsIHtcbiAgICB0ZW1wbGF0ZTogJyZuYnNwOycsXG4gICAgc29sZVNsb3Q6ICdsYWJlbCcsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtc2VsZWN0L21zLXNlbGVjdC1vcHRpb24udHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLXRhYmxlLWhlYWRlcicsIHtcbiAgICB0ZW1wbGF0ZTogJzx0aD48c2xvdCAvPjwvdGg+JyxcbiAgICBzb2xlU2xvdDogJ2NvbnRlbnQnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGNvbnRlbnQ6ICcnLFxuICAgICAgICBjb2w6ICcnXG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10YWJsZS9tcy10YWJsZS1oZWFkZXIudHMiLCJpbXBvcnQgJy4vbXMtdGV4dGFyZWEnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvaW5kZXgudHMiLCJpbXBvcnQgJy4vbXMtdGltZXBpY2tlcic7XG5pbXBvcnQgJy4vbXMtdGltZXBpY2tlci5zY3NzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgKiBhcyBkb21BbGlnbiBmcm9tICdkb20tYWxpZ24nO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy10cmlnZ2VyJywge1xuICAgIHRlbXBsYXRlOiAnPHNwYW4gc3R5bGU9XCJkaXNwbGF5Om5vbmU7XCI+PC9zcGFuPicsXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIHZpc2libGU6IGZhbHNlLFxuICAgICAgICBpbm5lclZtSWQ6ICcnLFxuICAgICAgICBpbm5lckNsYXNzOiAnJyxcbiAgICAgICAgaW5uZXJUZW1wbGF0ZTogJycsXG4gICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgd2l0aEluQm94KCkgeyByZXR1cm4gdHJ1ZTsgfSxcbiAgICAgICAgZ2V0VGFyZ2V0OiBhdmFsb24ubm9vcCxcbiAgICAgICAgb25IaWRlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgaGlkZShwYW5lbCkge1xuICAgICAgICAgICAgcGFuZWwuc3R5bGUudG9wID0gJy05OTk5cHgnO1xuICAgICAgICAgICAgcGFuZWwuc3R5bGUubGVmdCA9ICctOTk5OXB4JztcbiAgICAgICAgICAgIHRoaXMub25IaWRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXRQYW5lbChwYW5lbDogSFRNTERpdkVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IERPQyA9IGRvY3VtZW50LCBib2R5ID0gRE9DLmJvZHk7XG4gICAgICAgICAgICBjb25zdCBtZWRpdW0gPSBET0MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBtZWRpdW0uc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuJGlkKTtcbiAgICAgICAgICAgIG1lZGl1bS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwcHg7IGxlZnQ6IDBweDsgd2lkdGg6IDEwMCU7Jyk7XG4gICAgICAgICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgdGhpcy5pbm5lckNsYXNzKTtcbiAgICAgICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnei1pbmRleDogMTA1MDtsZWZ0OiAtOTk5OXB4O3RvcDogLTk5OTlweDtwb3NpdGlvbjogYWJzb2x1dGU7b3V0bGluZTogbm9uZTtvdmVyZmxvdzogaGlkZGVuOycpO1xuICAgICAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCc6aW1wb3J0YW50JywgdGhpcy5pbm5lclZtSWQpO1xuICAgICAgICAgICAgcGFuZWwuaW5uZXJIVE1MID0gdGhpcy5pbm5lclRlbXBsYXRlLnJlcGxhY2UoL1xccnxcXG4vZywgJycpO1xuICAgICAgICAgICAgbWVkaXVtLmFwcGVuZENoaWxkKHBhbmVsKTtcbiAgICAgICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQobWVkaXVtKTtcblxuICAgICAgICAgICAgYXZhbG9uLnNjYW4ocGFuZWwsIGF2YWxvbi52bW9kZWxzW3RoaXMuaW5uZXJWbUlkXSk7XG5cbiAgICAgICAgICAgIGF2YWxvbi5iaW5kKERPQywgJ2NsaWNrJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSAmJiBwYW5lbCAhPT0gZS50YXJnZXQgJiYgIWF2YWxvbi5jb250YWlucyhwYW5lbCwgZS50YXJnZXQpICYmICAhdGhpcy53aXRoSW5Cb3goZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZShwYW5lbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgY29uc3QgRE9DID0gZG9jdW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBwYW5lbCA9IERPQy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2aXNpYmxlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRQYW5lbChwYW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYW5lbC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggPT09IDAgPyAnYXV0bycgOiAodGhpcy53aWR0aCArICdweCcpO1xuICAgICAgICAgICAgICAgICAgICBwYW5lbC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICAgICAgICAgICAgICBkb21BbGlnbihwYW5lbCwgdGhpcy5nZXRUYXJnZXQoKSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiBbJ3RsJywgJ2JsJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IFswLCAxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGFyZ2V0T2Zmc2V0OiBbJzAlJywnMTAwJSddXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkanVzdFk6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUocGFuZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2UoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IERPQyA9IGRvY3VtZW50LCBib2R5ID0gRE9DLmJvZHk7XG4gICAgICAgICAgICBjb25zdCBtZWRpdW0gPSBET0MuZ2V0RWxlbWVudEJ5SWQodGhpcy4kaWQpO1xuICAgICAgICAgICAgYm9keS5yZW1vdmVDaGlsZChtZWRpdW0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10cmlnZ2VyL21zLXRyaWdnZXIudHMiLCJpbXBvcnQgJy4vbXMtdXBsb2FkJztcbmltcG9ydCAnLi9tcy11cGxvYWQuc2Nzcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy11cGxvYWQvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLXVwbG9hZC1jYXJkJywge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXVwbG9hZC1jYXJkLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBmaWxlTGlzdDogW10sXG4gICAgICAgIGdldFRleHRDbGFzcyhmaWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZpbGUuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG9uZSc6IHJldHVybiAndGV4dC1wcmltYXJ5JztcbiAgICAgICAgICAgICAgICBjYXNlICd1cGxvYWRpbmcnOiByZXR1cm4gJ3RleHQtbXV0ZWQnO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzogcmV0dXJuICd0ZXh0LWRhbmdlcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVtb3ZlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgZGVsKGZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmUoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQtY2FyZC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtdXBsb2FkLWxpc3QnLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdXBsb2FkLWxpc3QuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGZpbGVMaXN0OiBbXSxcbiAgICAgICAgZ2V0VGV4dENsYXNzKGZpbGUpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZmlsZS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdkb25lJzogcmV0dXJuICd0ZXh0LXByaW1hcnknO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3VwbG9hZGluZyc6IHJldHVybiAndGV4dC1tdXRlZCc7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOiByZXR1cm4gJ3RleHQtZGFuZ2VyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSxcbiAgICAgICAgb25SZW1vdmU6IGF2YWxvbi5ub29wLFxuICAgICAgICBkZWwoZmlsZSkge1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZShmaWxlKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1saXN0LnRzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDIzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1kYXRlcGlja2VyL21zLWRhdGVwaWNrZXIuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLWxheW91dC9tcy1sYXlvdXQuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLW1lbnUvbXMtbWVudS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8uc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3Quc2Nzc1xuLy8gbW9kdWxlIGlkID0gMjM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhclxcXCI+XFxuICAgIDx0YWJsZSBjbGFzcz1cXFwia291bWVpLWNhbGVuZGFyLXllYXItdmlld1xcXCI+XFxuICAgICAgICA8dGJvZHk+XFxuICAgICAgICAgICAgPHRyIDpmb3I9XFxcIu+8iGksIHJvdykgaW4gQHRhYmxlXFxcIj5cXG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzPVxcXCJrb3VtZWktY2FsZW5kYXItY2VsbFxcXCJcXG4gICAgICAgICAgICAgICAgICAgIDpjbGFzcz1cXFwiW1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKEBpc1NlbGVjdGVkKGNlbGwpID8gJ2tvdW1laS1jYWxlbmRhci1zZWxlY3RlZC1kYXknIDogJycpLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKEB2aWV3ID4gMSAmJiAoaSArIGogPT09IDAgfHwgaSAqIGogPT09IDYpID8gJ2tvdW1laS1jYWxlbmRhci1wcmV2LW1vbnRoLWNlbGwnIDogJycpXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Zm9yPVxcXCIoaiwgY2VsbCkgaW4gcm93XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhci1kYXRlXFxcIiA6Y2xpY2s9XFxcIkBoYW5kbGVDZWxsQ2xpY2soY2VsbClcXFwiPnt7Y2VsbC5sYWJlbH19PC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgPC90cj5cXG4gICAgICAgIDwvdGJvZHk+XFxuICAgIDwvdGFibGU+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIteWVhci12aWV3Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDIzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwia291bWVpLWNhbGVuZGFyXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIiBtcy1pZj1cXFwiQHNob3dIZWFkZXJcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTIgY29sLW1kLW9mZnNldC00XFxcIj5cXG4gICAgICAgICAgICA8bXMtc2VsZWN0IDp3aWRnZXQ9XFxcInt2YWx1ZTpbQGN1cnJlbnRZZWFyXSxvcHRpb25zOkBjdXJyZW50WWVhck9wdGlvbnMsb25DaGFuZ2U6QGhhbmRsZVllYXJDaGFuZ2V9XFxcIj48L21zLXNlbGVjdD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTJcXFwiPlxcbiAgICAgICAgICAgIDxtcy1zZWxlY3QgOndpZGdldD1cXFwie3ZhbHVlOltAY3VycmVudE1vbnRoXSxvcHRpb25zOkBtb250aE9wdGlvbnMsb25DaGFuZ2U6QGhhbmRsZU1vbnRoQ2hhbmdlfVxcXCI+PC9tcy1zZWxlY3Q+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICAgIDx0YWJsZT5cXG4gICAgICAgIDx0aGVhZD5cXG4gICAgICAgICAgICA8dHI+XFxuICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cXFwia291bWVpLWNhbGVuZGFyLWNvbHVtbi1oZWFkZXJcXFwiIDpmb3I9XFxcImRheSBpbiBAd2Vla2RheXNcXFwiPnt7ZGF5fX08L3RoPlxcbiAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICA8L3RoZWFkPlxcbiAgICAgICAgPHRib2R5PlxcbiAgICAgICAgICAgIDx0ciA6Zm9yPVxcXCJ3ZWVrIGluIEB0YWJsZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwia291bWVpLWNhbGVuZGFyLWNlbGxcXFwiIDpjbGFzcz1cXFwiZWwuY2xhc3NOYW1lXFxcIiA6Zm9yPVxcXCJlbCBpbiB3ZWVrXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhci1kYXRlXFxcIiA6Y2xpY2s9XFxcIkBoYW5kbGVEYXRlQ2xpY2soZWwpIHwgc3RvcFxcXCI+e3tlbC5kYXRlfX08L2Rpdj5cXG4gICAgICAgICAgICAgICAgPC90ZD5cXG4gICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgPC90Ym9keT5cXG4gICAgPC90YWJsZT5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9tcy1jYWxlbmRhci5odG1sXG4vLyBtb2R1bGUgaWQgPSAyMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImNoZWNrYm94LWdyb3VwXFxcIj5cXG4gICAgPG1zLWNoZWNrYm94IFxcbiAgICAgICAgOndpZGdldD1cXFwie1xcbiAgICAgICAgICAgIGNoZWNrZWQ6QHNlbGVjdGlvbi5pbmRleE9mKG9wdGlvbi52YWx1ZSkhPS0xLFxcbiAgICAgICAgICAgIGdyb3VwOnRydWUsXFxuICAgICAgICAgICAgb25DaGFuZ2U6ZnVuY3Rpb24oKXtcXG4gICAgICAgICAgICAgICAgQHRvZ2dsZU9wdGlvbihvcHRpb24pXFxuICAgICAgICAgICAgfSxcXG4gICAgICAgICAgICBkaXNhYmxlZDonZGlzYWJsZWQnIGluIG9wdGlvbj9vcHRpb24uZGlzYWJsZWQ6QGRpc2FibGVkXFxuICAgICAgICB9XFxcIiBcXG4gICAgICAgIDpmb3I9XFxcIm9wdGlvbiBpbiBvcHRpb25zXFxcIj57e29wdGlvbi5sYWJlbH19PC9tcy1jaGVja2JveD5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC1ncm91cC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgOmNsYXNzPVxcXCJAd3JhcHBlclxcXCIgY2xhc3M9XFxcImtvdW1laS1jaGVja2JveFxcXCIgc3R5bGU9XFxcIm1hcmdpbi10b3A6IDA7IG1hcmdpbi1ib3R0b206IDA7XFxcIj5cXG4gICAgPGxhYmVsIGNsYXNzPVxcXCJrb3VtZWktY2hlY2tib3gtaW5uZXIga291bWVpLWNoZWNrYm94LWlubmVyLWllXFxcIj5cXG4gICAgICAgIDxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCJcXG4gICAgICAgICAgICA6YXR0cj1cXFwie2lkOkBoZWxwSWQsZGlzYWJsZWQ6QGRpc2FibGVkfVxcXCJcXG4gICAgICAgICAgICA6ZHVwbGV4LWNoZWNrZWQ9XFxcIkBjaGVja2VkXFxcIlxcbiAgICAgICAgICAgIGRhdGEtZHVwbGV4LWNoYW5nZWQ9XFxcIkBvbkNoYW5nZVxcXCJcXG4gICAgICAgICAgICAvPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInRleHRcXFwiPjwvc3Bhbj5cXG4gICAgPC9sYWJlbD5cXG4gICAgPGxhYmVsIDphdHRyPVxcXCJ7J2Zvcic6QGhlbHBJZH1cXFwiIHN0eWxlPVxcXCJwYWRkaW5nLWxlZnQ6IDA7XFxcIiA6Y3NzPVxcXCJ7bWFyZ2luUmlnaHQ6QGdyb3VwPzg6MH1cXFwiPjxzbG90IC8+PC9sYWJlbD5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsXFxcIiBzdHlsZT1cXFwib3ZlcmZsb3c6IGF1dG9cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1oZWFkZXJcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPT09IDBcXFwiPlxcbiAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXByZXYteWVhci1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdzdWJ0cmFjdCcsIDEsICd5ZWFycycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wcmV2LW1vbnRoLWJ0blxcXCIgOmNsaWNrPVxcXCJtdXRhdGUoJ3N1YnRyYWN0JywgMSwgJ21vbnRocycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtbGVmdFxcXCI+PC9pPlxcbiAgICAgICAgPC9hPlxcbiAgICAgICAgPHNwYW4+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLW1vbnRoLXNlbGVjdFxcXCIgOmNsaWNrPVxcXCJAY2hhbmdlVmlldygxKVxcXCI+e3tAY3VycmVudE1vbnRofX08L2E+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXllYXItc2VsZWN0XFxcIiA6Y2xpY2s9XFxcIkBjaGFuZ2VWaWV3KDIpXFxcIj57e0BjdXJyZW50WWVhcn19PC9hPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLW5leHQtbW9udGgtYnRuXFxcIiA6Y2xpY2s9XFxcIm11dGF0ZSgnYWRkJywgMSwgJ3llYXJzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtcmlnaHRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1uZXh0LW1vbnRoLWJ0blxcXCIgOmNsaWNrPVxcXCJtdXRhdGUoJ2FkZCcsIDEsICdtb250aHMnKVxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLXJpZ2h0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1oZWFkZXJcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPT09IDFcXFwiPlxcbiAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXByZXYteWVhci1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdzdWJ0cmFjdCcsIDEsICd5ZWFycycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgICAgIDxzcGFuPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1tb250aC1zZWxlY3RcXFwiIDpjbGljaz1cXFwiQGNoYW5nZVZpZXcoMilcXFwiPnt7QGN1cnJlbnRZZWFyfX08L2E+XFxuICAgICAgICA8L3NwYW4+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbmV4dC1tb250aC1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdhZGQnLCAxLCAneWVhcnMnKVxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1yaWdodFxcXCI+PC9pPlxcbiAgICAgICAgPC9hPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtaGVhZGVyXFxcIiA6dmlzaWJsZT1cXFwiQHZpZXdNb2RlID09PSAyXFxcIj5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wcmV2LXllYXItYnRuXFxcIiA6Y2xpY2s9XFxcIm11dGF0ZSgnc3VidHJhY3QnLCAxMCwgJ3llYXJzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtbGVmdFxcXCI+PC9pPlxcbiAgICAgICAgPC9hPlxcbiAgICAgICAgPHNwYW4+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLW1vbnRoLXNlbGVjdFxcXCIgOmNsaWNrPVxcXCJAY2hhbmdlVmlldygzKVxcXCI+e3tAc3RhcnRPZkRlY2FkZSArICctJyArIChAc3RhcnRPZkRlY2FkZSArIDkpfX08L2E+XFxuICAgICAgICA8L3NwYW4+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbmV4dC1tb250aC1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdhZGQnLCAxMCwgJ3llYXJzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtcmlnaHRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWhlYWRlclxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA9PT0gM1xcXCI+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcHJldi15ZWFyLWJ0blxcXCIgOmNsaWNrPVxcXCJtdXRhdGUoJ3N1YnRyYWN0JywgMTAwLCAneWVhcnMnKVxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1sZWZ0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgICAgICA8c3Bhbj57e0BzdGFydE9mQ2VudHVyeSArICctJyArIChAc3RhcnRPZkNlbnR1cnkgKyA5OSl9fTwvc3Bhbj5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1uZXh0LW1vbnRoLWJ0blxcXCIgOmNsaWNrPVxcXCJtdXRhdGUoJ2FkZCcsIDEwMCwgJ3llYXJzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtcmlnaHRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWhlYWRlclxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA8IDAgJiYgQHNob3dUaW1lXFxcIj5cXG4gICAgICAgIDxzcGFuPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1tb250aC1zZWxlY3RcXFwiPnt7QGN1cnJlbnRNb250aH19PC9hPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1tb250aC1zZWxlY3RcXFwiPnt7QGN1cnJlbnREYXl9fTwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXIteWVhci1zZWxlY3RcXFwiPnt7QGN1cnJlbnRZZWFyfX08L2E+XFxuICAgICAgICA8L3NwYW4+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1ib2R5XFxcIiA6dmlzaWJsZT1cXFwiQHZpZXdNb2RlID09PSAwXFxcIj5cXG4gICAgICAgIDxtcy1jYWxlbmRhciA6d2lkZ2V0PVxcXCJ7dmFsdWU6QGN1cnJlbnREYXRlQXJyYXksc2hvd0hlYWRlcjpmYWxzZSxkaXNhYmxlZERhdGU6QGRpc2FibGVkRGF0ZSxvbkNoYW5nZTpAaGFuZGxlQ2FsZW5kYXJDaGFuZ2V9XFxcIj48L21zLWNhbGVuZGFyPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtYm9keVxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA+IDBcXFwiPlxcbiAgICAgICAgPG1zLWNhbGVuZGFyLXllYXItdmlldyA6d2lkZ2V0PVxcXCJ7Y3VycmVudE1vbnRoOkBjdXJyZW50TW9udGgsY3VycmVudFllYXI6QGN1cnJlbnRZZWFyLHZpZXc6QHZpZXdNb2RlLG9uU2VsZWN0OkBoYW5kbGVZZWFyVmlld1NlbGVjdH1cXFwiPjwvbXMtY2FsZW5kYXIteWVhci12aWV3PlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtYm9keVxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA9PT0gLTFcXFwiPlxcbiAgICAgICAgPG1zLXRpbWVwaWNrZXItdmlldyA6d2lkZ2V0PVxcXCJ7dmFsdWU6QGN1cnJlbnREYXRlQXJyYXksb25DaGFuZ2U6QGhhbmRsZVRpbWVwaWNrZXJDaGFuZ2V9XFxcIj48L21zLXRpbWVwaWNrZXItdmlldz5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWZvb3RlclxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA9PT0gMCAmJiAhQHNob3dUaW1lXFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1mb290ZXItYnRuXFxcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtdG9kYXktYnRuXFxcIiA6Y2xpY2s9XFxcIkB0b2RheVxcXCI+5LuK5aSpPC9hPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtZm9vdGVyXFxcIiA6dmlzaWJsZT1cXFwiQHZpZXdNb2RlIDw9IDAgJiYgQHNob3dUaW1lXFxcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1mb290ZXItYnRuXFxcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtbm93LWJ0blxcXCIgOmNsaWNrPVxcXCJAdG9kYXlcXFwiPuatpOWIuzwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtb2stYnRuXFxcIiA6Y2xpY2s9XFxcIkBjb21wbGV0ZVxcXCI+56Gu5a6aPC9hPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC10aW1lcGlja2VyLWJ0blxcXCIgOmNsaWNrPVxcXCJAY2hhbmdlVmlldyhAdmlld01vZGUgPiAtMSA/IC0xIDogMClcXFwiPnt7QHZpZXdNb2RlID4gLTEgPyAn6YCJ5oup5pe26Ze0JyA6ICfpgInmi6nml6XmnJ8nfX08L2E+XFxuICAgICAgICA8L3NwYW4+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLWRhdGVwaWNrZXIvbXMtZGF0ZXBpY2tlci1wYW5lbC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyXFxcIiA6Y3NzPVxcXCJ7d2lkdGg6QHdpZHRofVxcXCI+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jYWxlbmRhciBrb3VtZWktZGF0ZXBpY2tlci1pY29uXFxcIj48L2k+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10aW1lcy1jaXJjbGUga291bWVpLWRhdGVwaWNrZXItY2xlYXJcXFwiIDppZj1cXFwiQHNlbGVjdGVkLmxlbmd0aFxcXCIgOmNsaWNrPVxcXCJAY2xlYXJcXFwiPjwvaT5cXG4gICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGtvdW1laS1kYXRlcGlja2VyLWlucHV0XFxcIlxcbiAgICAgICAgOmNsaWNrPVxcXCJAaGFuZGxlQ2xpY2tcXFwiXFxuICAgICAgICByZWFkb25seVxcbiAgICAgICAgOmF0dHI9XFxcIntwbGFjZWhvbGRlcjpAcGxhY2Vob2xkZXJ9XFxcIlxcbiAgICAgICAgOmNzcz1cXFwie3dpZHRoOicxMDAlJ31cXFwiXFxuICAgICAgICA6ZHVwbGV4PVxcXCJzZWxlY3RlZFxcXCIgLz5cXG4gICAgPG1zLXRyaWdnZXIgOndpZGdldD1cXFwie1xcbiAgICAgICAgdmlzaWJsZTogQHBhbmVsVmlzaWJsZSxcXG4gICAgICAgIGlubmVyVm1JZDogQHBhbmVsVm1JZCxcXG4gICAgICAgIGlubmVyQ2xhc3M6IEBwYW5lbENsYXNzLFxcbiAgICAgICAgaW5uZXJUZW1wbGF0ZTogQHBhbmVsVGVtcGxhdGUsXFxuICAgICAgICB3aXRoSW5Cb3g6IEB3aXRoSW5Cb3gsXFxuICAgICAgICBnZXRUYXJnZXQ6IEBnZXRUYXJnZXQsXFxuICAgICAgICBvbkhpZGU6IEBoYW5kbGVQYW5lbEhpZGVcXG4gICAgfVxcXCI+XFxuICAgIDwvbXMtdHJpZ2dlcj5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1kYXRlcGlja2VyL21zLWRhdGVwaWNrZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIGhhcy1mZWVkYmFja1xcXCIgOmNzcz1cXFwiW0BpbmxpbmUgJiYgQGlubGluZUZvcm1Hcm91cFN0eWxlXVxcXCIgOmNsYXNzPVxcXCJbQGNsYXNzTmFtZSwoQGhhc1J1bGVzICYmIEBkaXJ0eSA/IChAcmVhc29ucy5sZW5ndGggPyAnaGFzLWVycm9yJyA6ICdoYXMtc3VjY2VzcycpIDogJycpXVxcXCI+XFxuICAgIDxsYWJlbCBjbGFzcz1cXFwiY29udHJvbC1sYWJlbFxcXCIgOmlmPVxcXCJAbGFiZWwubGVuZ3RoXFxcIj57e0BsYWJlbH19PC9sYWJlbD5cXG4gICAgPHNsb3QgLz5cXG4gICAgPGkgY2xhc3M9XFxcImZvcm0tY29udHJvbC1mZWVkYmFja1xcXCIgOmlmPVxcXCJAaGFzUnVsZXMgJiYgQHNob3dJY29uXFxcIiA6Y2xhc3M9XFxcIlsoQGRpcnR5ID8gJ2dseXBoaWNvbicgOiAnJyksIChAcmVhc29ucy5sZW5ndGggPyAnZ2x5cGhpY29uLXJlbW92ZScgOiAnZ2x5cGhpY29uLW9rJyldXFxcIiA6dmlzaWJsZT1cXFwiQGRpcnR5XFxcIj48L2k+XFxuICAgIDxzbWFsbCBjbGFzcz1cXFwiaGVscC1ibG9ja1xcXCIgOmNzcz1cXFwiW0BpbmxpbmUgJiYgQGlubGluZU1lc3NhZ2VTdHlsZV1cXFwiIDppZj1cXFwiQGhhc1J1bGVzICYmIEByZWFzb25zLmxlbmd0aFxcXCI+e3tAcmVhc29ucy5sZW5ndGggPyBAcmVhc29uc1swXS5tZXNzYWdlIDogJyd9fTwvc21hbGw+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtZm9ybS9tcy1mb3JtLWl0ZW0uaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgXFxuICAgIDpkdXBsZXg9XFxcIkB0ZXh0XFxcIiBcXG4gICAgOmF0dHI9XFxcIntuYW1lOkBjb2wscGxhY2Vob2xkZXI6QHBsYWNlaG9sZGVyfVxcXCIgXFxuICAgIDpjc3M9XFxcInt3aWR0aDpAd2lkdGh9XFxcIlxcbiAgICBkYXRhLWR1cGxleC1jaGFuZ2VkPVxcXCJAaGFuZGxlQ2hhbmdlXFxcIj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1pbnB1dC9tcy1pbnB1dC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjx1bCBjbGFzcz1cXFwia291bWVpLW1lbnVcXFwiPlxcbiAgICA8bGkgOmNsYXNzPVxcXCJbXFxuICAgICAgICAgICAgICAgICAgICAhaXRlbS5jaGlsZHJlbiB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCA/ICdrb3VtZWktbWVudS1pdGVtJyA6ICdrb3VtZWktbWVudS1zdWJtZW51JyxcXG4gICAgICAgICAgICAgICAgICAgIEBvcGVuS2V5cy5jb250YWlucyhpdGVtLmtleSkgPyAna291bWVpLW1lbnUtb3BlbicgOiAnJyxcXG4gICAgICAgICAgICAgICAgICAgIEBzZWxlY3RlZEtleXMuY29udGFpbnMoaXRlbS5rZXkpID8gJ2tvdW1laS1tZW51LWl0ZW0tc2VsZWN0ZWQnIDogJydcXG4gICAgICAgICAgICAgICAgXVxcXCJcXG4gICAgICAgIDpmb3I9XFxcIml0ZW0gaW4gQG1lbnVcXFwiPlxcbiAgICAgICAgPGEgOmNsaWNrPVxcXCJoYW5kbGVDbGljayhpdGVtLCBpdGVtLmtleSwgW2l0ZW0ua2V5XSlcXFwiIHN0eWxlPVxcXCJwYWRkaW5nLWxlZnQ6IDI0cHg7XFxcIj5cXG4gICAgICAgICAgICA8aSA6Y2xhc3M9XFxcIltpdGVtLmljb25dXFxcIj48L2k+XFxuICAgICAgICAgICAgPHNwYW4+e3tpdGVtLnRpdGxlfX08L3NwYW4+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImtvdW1laS1tZW51LWNhcmV0IGZhXFxcIiA6Y2xhc3M9XFxcIltAb3BlbktleXMuY29udGFpbnMoaXRlbS5rZXkpID8gJ2ZhLWFuZ2xlLXVwJyA6ICdmYS1hbmdsZS1kb3duJ11cXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgICAgIDx1bCBjbGFzcz1cXFwia291bWVpLW1lbnVcXFwiPlxcbiAgICAgICAgICAgIDxsaSA6Y2xhc3M9XFxcIltcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIWl0ZW0yLmNoaWxkcmVuIHx8IGl0ZW0yLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCA/ICdrb3VtZWktbWVudS1pdGVtJyA6ICdrb3VtZWktbWVudS1zdWJtZW51JyxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBvcGVuS2V5cy5jb250YWlucyhpdGVtMi5rZXkpID8gJ2tvdW1laS1tZW51LW9wZW4nIDogJycsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAc2VsZWN0ZWRLZXlzLmNvbnRhaW5zKGl0ZW0yLmtleSkgPyAna291bWVpLW1lbnUtaXRlbS1zZWxlY3RlZCcgOiAnJ1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXFxcIlxcbiAgICAgICAgICAgICAgICA6Zm9yPVxcXCJpdGVtMiBpbiBpdGVtLmNoaWxkcmVuXFxcIj5cXG4gICAgICAgICAgICAgICAgPGEgOmNsaWNrPVxcXCJoYW5kbGVDbGljayhpdGVtMiwgaXRlbTIua2V5LCBbaXRlbTIua2V5LGl0ZW0ua2V5XSlcXFwiIHN0eWxlPVxcXCJwYWRkaW5nLWxlZnQ6IDQ4cHg7XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7aXRlbTIudGl0bGV9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJrb3VtZWktbWVudS1jYXJldCBmYVxcXCIgOmNsYXNzPVxcXCJbQG9wZW5LZXlzLmNvbnRhaW5zKGl0ZW0yLmtleSkgPyAnZmEtYW5nbGUtdXAnIDogJ2ZhLWFuZ2xlLWRvd24nXVxcXCI+PC9pPlxcbiAgICAgICAgICAgICAgICA8L2E+XFxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cXFwia291bWVpLW1lbnVcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGxpIDpjbGFzcz1cXFwiW1xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpdGVtMy5jaGlsZHJlbiB8fCBpdGVtMy5jaGlsZHJlbi5sZW5ndGggPT09IDAgPyAna291bWVpLW1lbnUtaXRlbScgOiAna291bWVpLW1lbnUtc3VibWVudScsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHNlbGVjdGVkS2V5cy5jb250YWlucyhpdGVtMy5rZXkpID8gJ2tvdW1laS1tZW51LWl0ZW0tc2VsZWN0ZWQnIDogJydcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cXFwiXFxuICAgICAgICAgICAgICAgICAgICAgICAgOmZvcj1cXFwiaXRlbTMgaW4gaXRlbTIuY2hpbGRyZW5cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIDpjbGljaz1cXFwiaGFuZGxlQ2xpY2soaXRlbTMsIGl0ZW0zLmtleSwgW2l0ZW0zLmtleSxpdGVtMi5rZXksaXRlbS5rZXldKVxcXCIgc3R5bGU9XFxcInBhZGRpbmctbGVmdDogNzJweDtcXFwiPnt7aXRlbTMudGl0bGV9fTwvYT5cXG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICAgICAgPC9saT5cXG4gICAgICAgIDwvdWw+XFxuICAgIDwvbGk+XFxuPC91bD5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1tZW51L21zLW1lbnUuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJidG4tZ3JvdXBcXFwiPlxcbiAgICA8YSBjbGFzcz1cXFwiYnRuIGJsdWVcXFwiIDphdHRyPVxcXCJ7ZGlzYWJsZWQ6QGN1cnJlbnQ9PT0xfVxcXCIgOmNsaWNrPVxcXCJAcHJldlBhZ2VcXFwiPlxcbiAgICAgICAgPGkgY2xhc3M9XFxcImljb24tc3RlcC1iYWNrd2FyZFxcXCI+PC9pPuS4iuS4gOmhtVxcbiAgICA8L2E+XFxuICAgIDxhIGNsYXNzPVxcXCJidG4gc3VjY2Vzc1xcXCI+e3sgQGN1cnJlbnQgfX0ve3sgTWF0aC5jZWlsKEB0b3RhbC9AcGFnZVNpemUpIH19PC9hPlxcbiAgICA8YSBjbGFzcz1cXFwiYnRuIGJsdWVcXFwiIDphdHRyPVxcXCJ7ZGlzYWJsZWQ6QGN1cnJlbnQ9PT1NYXRoLmNlaWwoQHRvdGFsL0BwYWdlU2l6ZSl9XFxcIiA6Y2xpY2s9XFxcIkBuZXh0UGFnZVxcXCI+XFxuICAgICAgICA8aSBjbGFzcz1cXFwiaWNvbi1zdGVwLWZvcndhcmRcXFwiPjwvaT7kuIvkuIDpobVcXG4gICAgPC9hPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXBhZ2luYXRpb24vbXMtcGFnaW5hdGlvbi5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImNoZWNrYm94LWdyb3VwXFxcIj5cXG4gICAgPG1zLXJhZGlvIFxcbiAgICAgICAgOndpZGdldD1cXFwie1xcbiAgICAgICAgICAgIGNoZWNrZWQ6QHNlbGVjdGVkLFxcbiAgICAgICAgICAgIHZhbHVlOm9wdGlvbi52YWx1ZSxcXG4gICAgICAgICAgICBuYW1lOkBoZWxwSWQsXFxuICAgICAgICAgICAgZ3JvdXA6dHJ1ZSxcXG4gICAgICAgICAgICBvbkNoYW5nZTpmdW5jdGlvbigpe1xcbiAgICAgICAgICAgICAgICBAdG9nZ2xlT3B0aW9uKGFyZ3VtZW50c1swXSwgb3B0aW9uKVxcbiAgICAgICAgICAgIH0sXFxuICAgICAgICAgICAgZGlzYWJsZWQ6J2Rpc2FibGVkJyBpbiBvcHRpb24/b3B0aW9uLmRpc2FibGVkOkBkaXNhYmxlZFxcbiAgICAgICAgfVxcXCIgXFxuICAgICAgICA6Zm9yPVxcXCJvcHRpb24gaW4gb3B0aW9uc1xcXCI+e3tvcHRpb24ubGFiZWx9fTwvbXMtcmFkaW8+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8tZ3JvdXAuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IDpjbGFzcz1cXFwiQHdyYXBwZXJcXFwiIGNsYXNzPVxcXCJrb3VtZWktcmFkaW9cXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAwOyBtYXJnaW4tYm90dG9tOiAwO1xcXCI+XFxuICAgIDxsYWJlbCBjbGFzcz1cXFwia291bWVpLXJhZGlvLWlubmVyIGtvdW1laS1yYWRpby1pbm5lci1pZVxcXCI+XFxuICAgICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiXFxuICAgICAgICAgICAgOmF0dHI9XFxcIntpZDpAaGVscElkLGRpc2FibGVkOkBkaXNhYmxlZCx2YWx1ZTpAdmFsdWUsbmFtZTpAbmFtZX1cXFwiXFxuICAgICAgICAgICAgOmR1cGxleD1cXFwiQGNoZWNrZWRcXFwiXFxuICAgICAgICAgICAgZGF0YS1kdXBsZXgtY2hhbmdlZD1cXFwiQG9uQ2hhbmdlXFxcIlxcbiAgICAgICAgICAgIC8+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwidGV4dFxcXCI+PC9zcGFuPlxcbiAgICA8L2xhYmVsPlxcbiAgICA8bGFiZWwgOmF0dHI9XFxcInsnZm9yJzpAaGVscElkfVxcXCIgc3R5bGU9XFxcInBhZGRpbmctbGVmdDogMDtcXFwiIDpjc3M9XFxcInttYXJnaW5SaWdodDpAZ3JvdXA/ODowfVxcXCI+PHNsb3QgLz48L2xhYmVsPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBzdHlsZT1cXFwib3ZlcmZsb3c6IGF1dG9cXFwiPlxcbiAgICA8dWwgY2xhc3M9XFxcImtvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudVxcXCIgcm9sZT1cXFwibWVudVxcXCI+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImtvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtXFxcIlxcbiAgICAgICAgICAgIDpjbGFzcz1cXFwiW1xcbiAgICAgICAgICAgICAgICAoQHNlbGVjdGlvbi5zb21lKGZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50c1swXS52YWx1ZT09PW9wdGlvbi52YWx1ZX0pID8gJ2tvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtLXNlbGVjdGVkJyA6ICcnKSxcXG4gICAgICAgICAgICAgICAgKG9wdGlvbi5kaXNhYmxlZCA/ICdrb3VtZWktc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbS1kaXNhYmxlZCcgOiAnJylcXG4gICAgICAgICAgICBdXFxcIlxcbiAgICAgICAgICAgIDpmb3I9XFxcIm9wdGlvbiBpbiBAZ2V0RmlsdGVyZWRPcHRpb25zKClcXFwiXFxuICAgICAgICAgICAgOmNsaWNrPVxcXCJAaGFuZGxlT3B0aW9uQ2xpY2soJGV2ZW50LCBvcHRpb24pXFxcIlxcbiAgICAgICAgICAgIHJvbGU9XFxcIm1lbnVpdGVtXFxcIj5cXG4gICAgICAgICAgICB7e29wdGlvbi5sYWJlbH19XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrXFxcIiA6dmlzaWJsZT1cXFwiQGlzTXVsdGlwbGVcXFwiPjwvaT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImtvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtIGtvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtLWRpc2FibGVkXFxcIlxcbiAgICAgICAgICAgIDp2aXNpYmxlPVxcXCJAZ2V0RmlsdGVyZWRPcHRpb25zKCkubGVuZ3RoIDw9IDAgJiYgQHNlYXJjaFZhbHVlICYmICFAbG9hZGluZ1xcXCI+5peg5pWw5o2uPC9saT5cXG4gICAgICAgIDxsaSBjbGFzcz1cXFwia291bWVpLXNlbGVjdC1kcm9wZG93bi1tZW51LWl0ZW0ga291bWVpLXNlbGVjdC1kcm9wZG93bi1tZW51LWl0ZW0tZGlzYWJsZWRcXFwiXFxuICAgICAgICAgICAgOnZpc2libGU9XFxcIkBsb2FkaW5nXFxcIj7liqDovb3kuK08L2xpPlxcbiAgICA8L3VsPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3QtcGFuZWwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktc2VsZWN0IGZvcm0tY29udHJvbFxcXCJcXG4gICAgOmNsYXNzPVxcXCJbKEBpc011bHRpcGxlID8gJ2tvdW1laS1zZWxlY3QtbXVsdGlwbGUnIDogJycpXVxcXCJcXG4gICAgOmNzcz1cXFwie3dpZHRoOkB3aWR0aH1cXFwiXFxuICAgIDpjbGljaz1cXFwiQGhhbmRsZUNsaWNrXFxcIlxcbiAgICByb2xlPVxcXCJjb21ib2JveFxcXCJcXG4gICAgYXJpYS1hdXRvY29tcGxldGU9XFxcImxpc3RcXFwiXFxuICAgIGFyaWEtaGFzcG9wdXA9XFxcInRydWVcXFwiXFxuICAgIDphdHRyPVxcXCJ7J2FyaWEtZXhwYW5kZWQnOiBAcGFuZWxWaXNpYmxlICsgJyd9XFxcIj5cXG4gICAgPHVsIGNsYXNzPVxcXCJrb3VtZWktc2VsZWN0LXNlbGVjdGlvblxcXCIgOmNsYXNzPVxcXCJbKEBpc011bHRpcGxlID8gJ2tvdW1laS1zZWxlY3QtdGFncycgOiAnJyldXFxcIj5cXG4gICAgICAgIDxsaSBjbGFzcz1cXFwia291bWVpLXNlbGVjdC1zZWxlY3RlZFxcXCIgOnZpc2libGU9XFxcIiFAaXNNdWx0aXBsZSAmJiAoIUBzaG93U2VhcmNoIHx8ICFAcGFuZWxWaXNpYmxlKVxcXCI+e3tAZGlzcGxheVZhbHVlfX08L2xpPlxcbiAgICAgICAgPGxpIGNsYXNzPVxcXCJrb3VtZWktc2VsZWN0LWNob2ljZVxcXCIgOmZvcj1cXFwiY2hvaWNlIGluIEBzZWxlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgIDxzcGFuPnt7Y2hvaWNlLmxhYmVsfX08L3NwYW4+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLXRpbWVzXFxcIiA6Y2xpY2s9XFxcIkByZW1vdmVTZWxlY3Rpb24oJGV2ZW50LCBjaG9pY2UpIHwgc3RvcFxcXCI+PC9pPlxcbiAgICAgICAgPC9saT5cXG4gICAgICAgIDxsaSBjbGFzcz1cXFwia291bWVpLXNlbGVjdC1zZWFyY2hcXFwiPlxcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cXFwia291bWVpLXNlbGVjdC1zZWFyY2gtZmllbGRcXFwiXFxuICAgICAgICAgICAgICAgIG5hbWU9XFxcInNlYXJjaFxcXCJcXG4gICAgICAgICAgICAgICAgdHlwZT1cXFwidGV4dFxcXCJcXG4gICAgICAgICAgICAgICAgYXV0b2NvbXBsZXRlPVxcXCJvZmZcXFwiXFxuICAgICAgICAgICAgICAgIDpkdXBsZXg9XFxcIkBzZWFyY2hWYWx1ZVxcXCJcXG4gICAgICAgICAgICAgICAgOmNzcz1cXFwie3Zpc2liaWxpdHk6KEBzaG93U2VhcmNoICYmIEBwYW5lbFZpc2libGUpPyd2aXNpYmxlJzonaGlkZGVuJ31cXFwiXFxuICAgICAgICAgICAgICAgIDprZXlkb3duPVxcXCJAaGFuZGxlRGVsZXRlXFxcIiAvPlxcbiAgICAgICAgPC9saT5cXG4gICAgPC91bD5cXG4gICAgPGkgY2xhc3M9XFxcImZhIGtvdW1laS1zZWxlY3QtYXJyb3dcXFwiXFxuICAgICAgICA6Y2xhc3M9XFxcIlsoQHBhbmVsVmlzaWJsZSA/ICdmYS1jYXJldC11cCcgOiAnZmEtY2FyZXQtZG93bicpXVxcXCJcXG4gICAgICAgIDp2aXNpYmxlPVxcXCJAbW9kZSA9PT0gJydcXFwiPjwvaT5cXG4gICAgPG1zLXRyaWdnZXIgOndpZGdldD1cXFwie1xcbiAgICAgICAgd2lkdGg6IEBwYW5lbFdpZHRoLFxcbiAgICAgICAgdmlzaWJsZTogQHBhbmVsVmlzaWJsZSxcXG4gICAgICAgIGlubmVyVm1JZDogQHBhbmVsVm1JZCxcXG4gICAgICAgIGlubmVyQ2xhc3M6IEBwYW5lbENsYXNzLFxcbiAgICAgICAgaW5uZXJUZW1wbGF0ZTogQHBhbmVsVGVtcGxhdGUsXFxuICAgICAgICB3aXRoSW5Cb3g6IEB3aXRoSW5Cb3gsXFxuICAgICAgICBnZXRUYXJnZXQ6IEBnZXRUYXJnZXQsXFxuICAgICAgICBvbkhpZGU6IEBoYW5kbGVQYW5lbEhpZGV9XFxcIj5cXG4gICAgPC9tcy10cmlnZ2VyPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3QuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2PlxcbiAgICA8dGFibGUgY2xhc3M9XFxcInRhYmxlXFxcIiA6bG9hZGluZz1cXFwiIXdpbmRvdy5pc05hTihAcGFnaW5hdGlvbkNvbmZpZy50b3RhbCkgJiYgQGxvYWRpbmdcXFwiPlxcbiAgICAgICAgPHRoZWFkPlxcbiAgICAgICAgICAgIDx0cj5cXG4gICAgICAgICAgICAgICAgPHRoIDppZj1cXFwiQG5lZWRTZWxlY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPG1zLWNoZWNrYm94IDp3aWRnZXQ9XFxcIntjaGVja2VkOkBpc0FsbENoZWNrZWQsb25DaGFuZ2U6QGhhbmRsZUNoZWNrQWxsfVxcXCI+PC9tcy1jaGVja2JveD5cXG4gICAgICAgICAgICAgICAgPC90aD5cXG4gICAgICAgICAgICAgICAgPHRoIDpmb3I9XFxcImVsIGluIEBjb2x1bW5zXFxcIj57e2VsLnRpdGxlfX08L3RoPlxcbiAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICA8L3RoZWFkPlxcbiAgICAgICAgPHRib2R5PlxcbiAgICAgICAgICAgIDx0ciA6Zm9yPVxcXCIoJGluZGV4LCByZWNvcmQpIGluIEBnZXRDdXJyZW50UGFnZURhdGEoKVxcXCI+XFxuICAgICAgICAgICAgICAgIDx0ZCA6aWY9XFxcIkBuZWVkU2VsZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxtcy1jaGVja2JveCA6d2lkZ2V0PVxcXCJ7Y2hlY2tlZDpAY2hlY2tlZC5pbmRleE9mKHJlY29yZFtAa2V5XSkhPS0xLG9uQ2hhbmdlOmZ1bmN0aW9uKCl7QGhhbmRsZUNoZWNrKGFyZ3VtZW50c1swXS50YXJnZXQuY2hlY2tlZCxyZWNvcmQpfX1cXFwiPjwvbXMtY2hlY2tib3g+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgICAgIDx0ZCA6Zm9yPVxcXCJjb2wgaW4gQGNvbHVtbnNcXFwiIDpodG1sPVxcXCJjb2wudGVtcGxhdGVcXFwiPjwvdGQ+XFxuICAgICAgICAgICAgPC90cj5cXG4gICAgICAgIDwvdGJvZHk+XFxuICAgIDwvdGFibGU+XFxuICAgIDxkaXYgY2xhc3M9XFxcInB1bGwtcmlnaHRcXFwiPlxcbiAgICAgICAgPG1zLXBhZ2luYXRpb24gOndpZGdldD1cXFwie2N1cnJlbnQ6QHBhZ2luYXRpb25Db25maWcuY3VycmVudCxwYWdlU2l6ZTpAcGFnaW5hdGlvbkNvbmZpZy5wYWdlU2l6ZSx0b3RhbDpAdG90YWwsb25DaGFuZ2U6QGhhbmRsZVBhZ2VDaGFuZ2V9XFxcIj48L21zLXBhZ2luYXRpb24+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjbGVhcmZpeFxcXCI+PC9kaXY+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdGFibGUvbXMtdGFibGUuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8dGV4dGFyZWEgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgXFxuICAgIDpkdXBsZXg9XFxcIkB0ZXh0XFxcIiBcXG4gICAgOmF0dHI9XFxcIntyb3dzOkByb3dzLG5hbWU6QGNvbH1cXFwiXFxuICAgIGRhdGEtZHVwbGV4LWNoYW5nZWQ9XFxcIkBoYW5kbGVDaGFuZ2VcXFwiPjwvdGV4dGFyZWE+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvbXMtdGV4dGFyZWEuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdGltZXBpY2tlci12aWV3XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLXRpbWVwaWNrZXItdmlldy1jb21ib2JveFxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdFxcXCIgbmFtZT1cXFwiaG91ci1vcHRpb25zXFxcIj5cXG4gICAgICAgICAgICA8dWw+XFxuICAgICAgICAgICAgICAgIDxsaSA6Zm9yPVxcXCJob3VyIGluIEBob3VyT3B0aW9uc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIDpjbGFzcz1cXFwiWyhob3VyPT1AY3VycmVudEhvdXI/J2tvdW1laS10aW1lcGlja2VyLXZpZXctc2VsZWN0LW9wdGlvbi1zZWxlY3RlZCc6JycpXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIDpjbGljaz1cXFwiQHNlbGVjdChob3VyLCAnaG91cicpXFxcIj57e2hvdXJ9fTwvbGk+XFxuICAgICAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwia291bWVpLXRpbWVwaWNrZXItdmlldy1zZWxlY3RcXFwiIG5hbWU9XFxcIm1pbnV0ZS1vcHRpb25zXFxcIj5cXG4gICAgICAgICAgICA8dWw+XFxuICAgICAgICAgICAgICAgIDxsaSA6Zm9yPVxcXCJtaW51dGUgaW4gQG1pbnV0ZU9wdGlvbnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XFxcIlsobWludXRlPT1AY3VycmVudE1pbnV0ZT8na291bWVpLXRpbWVwaWNrZXItdmlldy1zZWxlY3Qtb3B0aW9uLXNlbGVjdGVkJzonJyldXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgOmNsaWNrPVxcXCJAc2VsZWN0KG1pbnV0ZSwgJ21pbnV0ZScpXFxcIj57e21pbnV0ZX19PC9saT5cXG4gICAgICAgICAgICA8L3VsPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdFxcXCIgbmFtZT1cXFwic2Vjb25kLW9wdGlvbnNcXFwiPlxcbiAgICAgICAgICAgIDx1bD5cXG4gICAgICAgICAgICAgICAgPGxpIDpmb3I9XFxcInNlY29uZCBpbiBAc2Vjb25kT3B0aW9uc1xcXCJcXG4gICAgICAgICAgICAgICAgICAgIDpjbGFzcz1cXFwiWyhzZWNvbmQ9PUBjdXJyZW50U2Vjb25kPydrb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdC1vcHRpb24tc2VsZWN0ZWQnOicnKV1cXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Y2xpY2s9XFxcIkBzZWxlY3Qoc2Vjb25kLCAnc2Vjb25kJylcXFwiPnt7c2Vjb25kfX08L2xpPlxcbiAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLXZpZXcuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdGltZXBpY2tlclxcXCIgOmNzcz1cXFwie3dpZHRoOkB3aWR0aH1cXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtY2xvY2stbyBrb3VtZWktdGltZXBpY2tlci1pY29uXFxcIj48L2k+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10aW1lcy1jaXJjbGUga291bWVpLXRpbWVwaWNrZXItY2xlYXJcXFwiIDppZj1cXFwiQHNlbGVjdGVkLmxlbmd0aFxcXCIgOmNsaWNrPVxcXCJAY2xlYXJcXFwiPjwvaT5cXG4gICAgPGlucHV0IHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICBjbGFzcz1cXFwiZm9ybS1jb250cm9sIGtvdW1laS10aW1lcGlja2VyLWlucHV0XFxcIlxcbiAgICAgICAgOmNsaWNrPVxcXCJAaGFuZGxlQ2xpY2tcXFwiXFxuICAgICAgICByZWFkb25seVxcbiAgICAgICAgOmF0dHI9XFxcIntwbGFjZWhvbGRlcjpAcGxhY2Vob2xkZXJ9XFxcIlxcbiAgICAgICAgOmNzcz1cXFwie3dpZHRoOicxMDAlJ31cXFwiXFxuICAgICAgICA6ZHVwbGV4PVxcXCJzZWxlY3RlZFxcXCIgLz5cXG4gICAgPG1zLXRyaWdnZXIgOndpZGdldD1cXFwie1xcbiAgICAgICAgdmlzaWJsZTogQHBhbmVsVmlzaWJsZSxcXG4gICAgICAgIGlubmVyVm1JZDogQHBhbmVsVm1JZCxcXG4gICAgICAgIGlubmVyQ2xhc3M6IEBwYW5lbENsYXNzLFxcbiAgICAgICAgaW5uZXJUZW1wbGF0ZTogQHBhbmVsVGVtcGxhdGUsXFxuICAgICAgICB3aXRoSW5Cb3g6IEB3aXRoSW5Cb3gsXFxuICAgICAgICBnZXRUYXJnZXQ6IEBnZXRUYXJnZXQsXFxuICAgICAgICBvbkhpZGU6IEBoYW5kbGVQYW5lbEhpZGVcXG4gICAgfVxcXCI+XFxuICAgIDwvbXMtdHJpZ2dlcj5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtaXRlbVxcXCIgOmNsYXNzPVxcXCJbKGZpbGUuc3RhdHVzID09PSAnZXJyb3InID8gJ2JvcmRlcmVkLWRhbmdlcicgOiAnJyldXFxcIiA6Zm9yPVxcXCIoJGluZGV4LCBmaWxlKSBpbiBAZmlsZUxpc3RcXFwiPlxcbiAgICAgICAgPGltZyA6YXR0cj1cXFwie3NyYzpmaWxlLnVybCxhbHQ6ZmlsZS5uYW1lLHRpdGxlOmZpbGUubmFtZX1cXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcImtvdW1laS11cGxvYWQtY2FyZC1wcm9ncmVzc1xcXCIgOnZpc2libGU9XFxcImZpbGUuc3RhdHVzID09PSAndXBsb2FkaW5nJ1xcXCI+5LiK5Lyg5LitIHt7ZmlsZS5wcm9ncmVzc319JTwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtdG9vbFxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWV5ZVxcXCI+PC9pPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vXFxcIiA6Y2xpY2s9XFxcImRlbChmaWxlKVxcXCI+PC9pPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLWNhcmQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8dWwgY2xhc3M9XFxcImtvdW1laS11cGxvYWQtbGlzdFxcXCI+XFxuICAgIDxsaSA6Zm9yPVxcXCIoJGluZGV4LCBmaWxlKSBpbiBAZmlsZUxpc3RcXFwiXFxuICAgICAgICA6Y2xhc3M9XFxcIltAZ2V0VGV4dENsYXNzKGZpbGUpXVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWxpc3QtaW5mb1xcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWZpbGUtbyB0ZXh0LW11dGVkXFxcIj48L2k+XFxuICAgICAgICAgICAgPHNwYW4gOmF0dHI9XFxcInt0aXRsZTpmaWxlLm5hbWV9XFxcIj57e2ZpbGUubmFtZX19PC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdGltZXMga291bWVpLXVwbG9hZC1idG4tY2xvc2VcXFwiIDpjbGljaz1cXFwiZGVsKGZpbGUpXFxcIj48L2k+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwia291bWVpLXVwbG9hZC1saXN0LXByb2dyZXNzXFxcIiA6dmlzaWJsZT1cXFwiZmlsZS5zdGF0dXMgPT09ICd1cGxvYWRpbmcnXFxcIj7kuIrkvKDkuK0ge3tmaWxlLnByb2dyZXNzfX0lPC9zcGFuPlxcbiAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrLWNpcmNsZSB0ZXh0LXN1Y2Nlc3NcXFwiIDpjbGFzcz1cXFwiWyhmaWxlLnN0YXR1cyA9PT0gJ2RvbmUnID8gJycgOiAnaGlkZScpXVxcXCI+PC9pPlxcbiAgICA8L2xpPlxcbjwvdWw+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1saXN0Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwia291bWVpLXVwbG9hZC1jb250YWluZXJcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtd2FsbFxcXCIgOmlmPVxcXCJAc2hvd1VwbG9hZExpc3QgJiYgQGxpc3RUeXBlPT09J3BpY3R1cmUtY2FyZCdcXFwiPlxcbiAgICAgICAgPG1zLXVwbG9hZC1jYXJkIDp3aWRnZXQ9XFxcIntmaWxlTGlzdDogQGZpbGVMaXN0LCBvblJlbW92ZTogQGhhbmRsZVJlbW92ZX1cXFwiPjwvbXMtdXBsb2FkLWNhcmQ+XFxuICAgIDwvZGl2PlxcbiAgICA8bGFiZWwgOnZpc2libGU9XFxcIiFAc2hvd1VwbG9hZExpc3QgJiYgQGxpc3RUeXBlPT09J3BpY3R1cmUtY2FyZCcgJiYgQGZpbGVMaXN0Lmxlbmd0aCA+IDBcXFwiIGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtaXRlbVxcXCIgOmF0dHI9XFxcInsnZm9yJzpAaGVscElkfVxcXCI+XFxuICAgICAgICA8aW1nIDphdHRyPVxcXCJ7c3JjOkBmaWxlTGlzdFswXT9AZmlsZUxpc3RbMF0udXJsOmJsYW5rSW1nLGFsdDpAZmlsZUxpc3RbMF0/QGZpbGVMaXN0WzBdLm5hbWU6JycsdGl0bGU6QGZpbGVMaXN0WzBdP0BmaWxlTGlzdFswXS5uYW1lOicnfVxcXCI+XFxuICAgIDwvbGFiZWw+XFxuICAgIDxsYWJlbCA6dmlzaWJsZT1cXFwiQHNob3dVcGxvYWRMaXN0IHx8IEBmaWxlTGlzdC5sZW5ndGggPT0gMFxcXCIgOmNsYXNzPVxcXCJbKEBsaXN0VHlwZT09PSdwaWN0dXJlLWNhcmQnP0BjYXJkQ2xhc3M6QGJ0bkNsYXNzKV1cXFwiIDphdHRyPVxcXCJ7J2Zvcic6QGhlbHBJZH1cXFwiPjxzbG90IC8+PC9sYWJlbD5cXG4gICAgPGZvcm0+PGlucHV0IHR5cGU9XFxcImZpbGVcXFwiIG5hbWU9XFxcImZpbGVcXFwiIDphdHRyPVxcXCJ7aWQ6QGhlbHBJZH1cXFwiPjwvZm9ybT5cXG4gICAgPGRpdiA6aWY9XFxcIkBzaG93VXBsb2FkTGlzdCAmJiBAbGlzdFR5cGUhPT0ncGljdHVyZS1jYXJkJ1xcXCI+XFxuICAgICAgICA8bXMtdXBsb2FkLWxpc3QgOndpZGdldD1cXFwie2ZpbGVMaXN0OiBAZmlsZUxpc3QsIG9uUmVtb3ZlOiBAaGFuZGxlUmVtb3ZlfVxcXCI+PC9tcy11cGxvYWQtbGlzdD5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNThcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwicmVxdWlyZSgnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnKTtcbnJlcXVpcmUoJ2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzcycpO1xucmVxdWlyZSgnaGlnaGxpZ2h0LmpzL3N0eWxlcy9hdG9tLW9uZS1saWdodC5jc3MnKTtcblxucmVxdWlyZSgnZXM1LXNoaW0nKTtcbnJlcXVpcmUoJ2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuYXV0bycpO1xuXG52YXIgalF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG53aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSBqUXVlcnk7XG5yZXF1aXJlKCdib290c3RyYXAnKTtcbnZhciBib290Ym94ID0gcmVxdWlyZSgnYm9vdGJveCcpO1xuYm9vdGJveC5zZXRMb2NhbGUoJ3poX0NOJyk7XG5cbnZhciBhdmFsb24gPSByZXF1aXJlKCdhdmFsb24yJyk7XG5hdmFsb24uY29uZmlnKHtcbiAgICBkZWJ1ZzogdHJ1ZVxufSk7XG5pZiAoYXZhbG9uLm1zaWUgPT09IDgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wZXJ0eSwgbWV0YSkge1xuICAgICAgICBvYmpbcHJvcGVydHldID0gbWV0YS52YWx1ZTtcbiAgICB9XG59XG5yZXF1aXJlKCdlczUtc2hpbS9lczUtc2hhbScpO1xucmVxdWlyZSgnLi9yb3V0ZXInKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbXMtbGF5b3V0Jyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvZG9jLXNpZGViYXIvZG9jLXNpZGViYXInKTtcblxuYXZhbG9uLmRlZmluZSh7XG4gICAgJGlkOiAncm9vdCcsXG4gICAgY3VycmVudFBhZ2U6ICcnLFxuICAgIGJyZWFkY3J1bWI6IFtdXG59KTtcbmF2YWxvbi5oaXN0b3J5LnN0YXJ0KHtcbiAgICBmaXJlQW5jaG9yOiBmYWxzZVxufSk7XG5pZiAoIS8jIS8udGVzdChnbG9iYWwubG9jYXRpb24uaGFzaCkpIHtcbiAgICBhdmFsb24ucm91dGVyLm5hdmlnYXRlKCcvJywgMik7XG59XG5hdmFsb24uc2Nhbihkb2N1bWVudC5ib2R5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RvY3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG1zLW1lbnUgOndpZGdldD1cXFwie21lbnU6QG1lbnUsb3BlbktleXM6QG9wZW5LZXlzLHNlbGVjdGVkS2V5czpAc2VsZWN0ZWRLZXlzLG9uQ2xpY2s6QGhhbmRsZU1lbnVDbGljayxvbk9wZW5DaGFuZ2U6QGhhbmRsZU9wZW5DaGFuZ2V9XFxcIj48L21zLW1lbnU+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RvY3MvY29tcG9uZW50cy9kb2Mtc2lkZWJhci9kb2Mtc2lkZWJhci5odG1sXG4vLyBtb2R1bGUgaWQgPSAzMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiaW1wb3J0ICcuL2NvbXBvbmVudHMvbXMtbWVudSc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy10YWJsZS9tcy10YWJsZSc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy1wYWdpbmF0aW9uL21zLXBhZ2luYXRpb24nO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvbXMtZGlhbG9nJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWZvcm0nO1xuZXhwb3J0IHsgY3JlYXRlRm9ybSB9IGZyb20gJy4vY29tcG9uZW50cy9tcy1mb3JtL2NyZWF0ZS1mb3JtJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWlucHV0JztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXRleHRhcmVhJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXNlbGVjdCc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy11cGxvYWQnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlcic7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWNoZWNrYm94JztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LWdyb3VwJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXJhZGlvJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLWdyb3VwJztcblxuZXhwb3J0IHsgTG9hZGluZyB9IGZyb20gJy4vY29tcG9uZW50cy9tcy1sb2FkaW5nJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbm90aWZpY2F0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL21zLW5vdGlmaWNhdGlvbic7XG5leHBvcnQgeyBkZWZhdWx0IGFzIG1lc3NhZ2UgfSBmcm9tICcuL2NvbXBvbmVudHMvbXMtbWVzc2FnZSc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXgudHMiLCIvKiAoaWdub3JlZCkgKi9cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyB2ZXJ0eCAoaWdub3JlZClcbi8vIG1vZHVsZSBpZCA9IDMzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiXSwic291cmNlUm9vdCI6IiJ9