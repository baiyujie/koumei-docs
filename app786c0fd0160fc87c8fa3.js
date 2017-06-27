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
    template: __webpack_require__(245),
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
__webpack_require__(229);


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
    template: __webpack_require__(253),
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
    template: __webpack_require__(251),
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
__webpack_require__(198);
__webpack_require__(223);
__webpack_require__(239);


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
    template: __webpack_require__(244),
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
var ms_loading_directive_1 = __webpack_require__(218);
exports.Loading = ms_loading_directive_1.Loading;
__webpack_require__(202);


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
    template: __webpack_require__(252),
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
    template: __webpack_require__(258),
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
__webpack_require__(236);
__webpack_require__(206);


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
        key: 'component-demo-tree-tree',
        title: 'tree 树',
        uri: '/tree',
        location: 'ms-tree/ms-tree.md'
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
__webpack_require__(192);
var stores_1 = __webpack_require__(182);
exports.name = 'doc-sidebar';
avalon.component(exports.name, {
    template: __webpack_require__(341),
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
__webpack_require__(339);
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
                    resolve(__webpack_require__(344)("./" + item.location));
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
__webpack_require__(219);
__webpack_require__(209);
__webpack_require__(43);
__webpack_require__(215);
__webpack_require__(195);
var create_form_1 = __webpack_require__(194);
exports.createForm = create_form_1.createForm;
__webpack_require__(217);
__webpack_require__(225);
__webpack_require__(44);
__webpack_require__(230);
__webpack_require__(214);
__webpack_require__(226);
__webpack_require__(213);
__webpack_require__(45);
__webpack_require__(222);
__webpack_require__(47);
__webpack_require__(228);
var ms_loading_1 = __webpack_require__(46);
exports.Loading = ms_loading_1.Loading;
var ms_notification_1 = __webpack_require__(221);
exports.notification = ms_notification_1["default"];
var ms_message_1 = __webpack_require__(220);
exports.message = ms_message_1["default"];


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
var ms_control_1 = __webpack_require__(4);
__webpack_require__(27);
__webpack_require__(211);
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
    template: __webpack_require__(247),
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
        panelTemplate: __webpack_require__(246),
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
/* 194 */
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
var Schema = __webpack_require__(265);
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
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(205);
__webpack_require__(216);


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
ms_control_1["default"].extend({
    displayName: 'ms-input',
    template: __webpack_require__(249),
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
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-menu', {
    template: __webpack_require__(250),
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
/* 198 */
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
    template: __webpack_require__(255),
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
        panelTemplate: __webpack_require__(254),
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
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var ms_control_1 = __webpack_require__(4);
__webpack_require__(27);
__webpack_require__(48);
var ms_timepicker_panel_1 = __webpack_require__(227);
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
    template: __webpack_require__(259),
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
            var innerVm = ms_timepicker_panel_1["default"](this);
            this.mapValueToSelected(this.value);
            innerVm.reset();
        },
        onDispose: function () {
            delete avalon.vmodels[this.panelVmId];
        }
    }
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var treeID = 0;
avalon.component('ms-tree', {
    template: __webpack_require__(260),
    defaults: {
        tree: [],
        renderSubTree: function (el) {
            return el.subtree.length ? '<wbr :widget="{is:\'ms-tree\',$id:\'tree_' + (++treeID) + '\', tree: el.subtree}" />' : '';
        },
        openSubTree: function (el) {
            el.open = !el.open;
        },
        changeIcon: function (el) {
            return el.open && el.subtree.length ? 'fa-caret-down' : 'fa-caret-right';
        }
    }
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../typings/index.d.ts" />
exports.__esModule = true;
var ms_control_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(5);
__webpack_require__(232);
__webpack_require__(231);
var koumei_fileup_loader_1 = __webpack_require__(338);
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
    template: __webpack_require__(263),
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
/* 202 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
__webpack_require__(44);
__webpack_require__(212);
avalon.component('ms-calendar', {
    template: __webpack_require__(243),
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
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var bootbox = __webpack_require__(41);
var koumei_util_1 = __webpack_require__(9);
var $ = __webpack_require__(14);
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
/* 205 */
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
/* 206 */
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
        width: '65px'
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
        width: '55px'
    }
});


/***/ }),
/* 207 */
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
/* 208 */
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
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
__webpack_require__(26);
__webpack_require__(224);
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
    template: __webpack_require__(256),
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
/* 210 */
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
    template: __webpack_require__(257),
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
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(203);
__webpack_require__(233);


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
var monthTable = [];
avalon.component('ms-calendar-year-view', {
    template: __webpack_require__(242),
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
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(26);
__webpack_require__(45);
__webpack_require__(234);


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(193);
__webpack_require__(235);


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(204);


/***/ }),
/* 216 */
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
    template: __webpack_require__(248),
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
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(196);


/***/ }),
/* 218 */
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
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(237);
__webpack_require__(197);


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_message_1 = __webpack_require__(207);
exports["default"] = ms_message_1["default"];


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var ms_notification_1 = __webpack_require__(208);
exports["default"] = ms_notification_1["default"];


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(42);
__webpack_require__(47);
__webpack_require__(238);


/***/ }),
/* 223 */
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
/* 224 */
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
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(210);


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(199);
__webpack_require__(240);


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var moment = __webpack_require__(0);
function default_1(cmpVm) {
    if (avalon.vmodels[cmpVm.panelVmId] !== undefined) {
        return avalon.vmodels[cmpVm.panelVmId];
    }
    return avalon.define({
        $id: cmpVm.panelVmId,
        currentDateArray: '',
        $moment: moment(),
        reset: function () {
            this.$moment = cmpVm.selected ? moment(cmpVm.selected, cmpVm.format) : moment();
            this.currentDateArray = this.$moment.toArray().toString();
        },
        handleTimepickerChange: function (e) {
            var _a = e.target, hour = _a.hour, minute = _a.minute, second = _a.second;
            this.$moment.hour(hour).minute(minute).second(second);
            this.currentDateArray = this.$moment.toArray().toString();
            cmpVm.selected = this.$moment.format(cmpVm.format);
            cmpVm.handleChange({
                target: { value: cmpVm.selected },
                type: 'timepicker-changed'
            });
        }
    });
}
exports["default"] = default_1;
;


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(200);


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
var domAlign = __webpack_require__(336);
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
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
__webpack_require__(201);
__webpack_require__(241);


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-upload-card', {
    template: __webpack_require__(261),
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
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
avalon.component('ms-upload-list', {
    template: __webpack_require__(262),
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

// removed by extract-text-webpack-plugin

/***/ }),
/* 239 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 240 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 241 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 242 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-calendar\">\n    <table class=\"koumei-calendar-year-view\">\n        <tbody>\n            <tr :for=\"（i, row) in @table\">\n                <td class=\"koumei-calendar-cell\"\n                    :class=\"[\n                                (@isSelected(cell) ? 'koumei-calendar-selected-day' : ''),\n                                (@view > 1 && (i + j === 0 || i * j === 6) ? 'koumei-calendar-prev-month-cell' : '')\n                            ]\"\n                    :for=\"(j, cell) in row\">\n                    <div class=\"koumei-calendar-date\" :click=\"@handleCellClick(cell)\">{{cell.label}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),
/* 243 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-calendar\">\n    <div class=\"row\" ms-if=\"@showHeader\">\n        <div class=\"col-md-2 col-md-offset-4\">\n            <ms-select :widget=\"{value:[@currentYear],options:@currentYearOptions,onChange:@handleYearChange}\"></ms-select>\n        </div>\n        <div class=\"col-md-2\">\n            <ms-select :widget=\"{value:[@currentMonth],options:@monthOptions,onChange:@handleMonthChange}\"></ms-select>\n        </div>\n    </div>\n    <table>\n        <thead>\n            <tr>\n                <th class=\"koumei-calendar-column-header\" :for=\"day in @weekdays\">{{day}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"week in @table\">\n                <td class=\"koumei-calendar-cell\" :class=\"el.className\" :for=\"el in week\">\n                    <div class=\"koumei-calendar-date\" :click=\"@handleDateClick(el) | stop\">{{el.date}}</div>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>"

/***/ }),
/* 244 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-group\">\n    <ms-checkbox \n        :widget=\"{\n            checked:@selection.indexOf(option.value)!=-1,\n            group:true,\n            onChange:function(){\n                @toggleOption(option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-checkbox>\n</div>"

/***/ }),
/* 245 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"@wrapper\" class=\"koumei-checkbox\" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"koumei-checkbox-inner koumei-checkbox-inner-ie\">\n        <input type=\"checkbox\"\n            :attr=\"{id:@helpId,disabled:@disabled}\"\n            :duplex-checked=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text\"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>"

/***/ }),
/* 246 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-datepicker-panel\" style=\"overflow: auto\">\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 0\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 1, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <a class=\"koumei-datepicker-prev-month-btn\" :click=\"mutate('subtract', 1, 'months')\">\n            <i class=\"fa fa-angle-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(1)\">{{@currentMonth}}</a>\n            <a class=\"koumei-datepicker-year-select\" :click=\"@changeView(2)\">{{@currentYear}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'months')\">\n            <i class=\"fa fa-angle-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 1\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 1, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(2)\">{{@currentYear}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 1, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 2\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 10, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>\n            <a class=\"koumei-datepicker-month-select\" :click=\"@changeView(3)\">{{@startOfDecade + '-' + (@startOfDecade + 9)}}</a>\n        </span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 10, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode === 3\">\n        <a class=\"koumei-datepicker-prev-year-btn\" :click=\"mutate('subtract', 100, 'years')\">\n            <i class=\"fa fa-angle-double-left\"></i>\n        </a>\n        <span>{{@startOfCentury + '-' + (@startOfCentury + 99)}}</span>\n        <a class=\"koumei-datepicker-next-month-btn\" :click=\"mutate('add', 100, 'years')\">\n            <i class=\"fa fa-angle-double-right\"></i>\n        </a>\n    </div>\n    <div class=\"koumei-datepicker-panel-header\" :visible=\"@viewMode < 0 && @showTime\">\n        <span>\n            <a class=\"koumei-datepicker-month-select\">{{@currentMonth}}</a>\n            <a class=\"koumei-datepicker-month-select\">{{@currentDay}}</a>\n            <a class=\"koumei-datepicker-year-select\">{{@currentYear}}</a>\n        </span>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode === 0\">\n        <ms-calendar :widget=\"{value:@currentDateArray,showHeader:false,disabledDate:@disabledDate,onChange:@handleCalendarChange}\"></ms-calendar>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode > 0\">\n        <ms-calendar-year-view :widget=\"{currentMonth:@currentMonth,currentYear:@currentYear,view:@viewMode,onSelect:@handleYearViewSelect}\"></ms-calendar-year-view>\n    </div>\n    <div class=\"koumei-datepicker-panel-body\" :visible=\"@viewMode === -1\">\n        <ms-timepicker-view :widget=\"{value:@currentDateArray,onChange:@handleTimepickerChange}\"></ms-timepicker-view>\n    </div>\n    <div class=\"koumei-datepicker-panel-footer\" :visible=\"@viewMode === 0 && !@showTime\">\n        <span class=\"koumei-datepicker-panel-footer-btn\">\n            <a class=\"koumei-datepicker-panel-today-btn\" :click=\"@today\">今天</a>\n        </span>\n    </div>\n    <div class=\"koumei-datepicker-panel-footer\" :visible=\"@viewMode <= 0 && @showTime\">\n        <span class=\"koumei-datepicker-panel-footer-btn\">\n            <a class=\"koumei-datepicker-panel-now-btn\" :click=\"@today\">此刻</a>\n            <a class=\"koumei-datepicker-panel-ok-btn\" :click=\"@complete\">确定</a>\n            <a class=\"koumei-datepicker-panel-timepicker-btn\" :click=\"@changeView(@viewMode > -1 ? -1 : 0)\">{{@viewMode > -1 ? '选择时间' : '选择日期'}}</a>\n        </span>\n    </div>\n</div>"

/***/ }),
/* 247 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-datepicker\" :css=\"{width:@width}\">\n    <i class=\"fa fa-calendar koumei-datepicker-icon\"></i>\n    <i class=\"fa fa-times-circle koumei-datepicker-clear\" :if=\"@selected.length\" :click=\"@clear\"></i>\n    <input type=\"text\"\n        class=\"form-control koumei-datepicker-input\"\n        :click=\"@handleClick\"\n        readonly\n        :attr=\"{placeholder:@placeholder}\"\n        :css=\"{width:'100%'}\"\n        :duplex=\"selected\" />\n    <ms-trigger :widget=\"{\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide\n    }\">\n    </ms-trigger>\n</div>"

/***/ }),
/* 248 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group has-feedback\" :css=\"[@inline && @inlineFormGroupStyle]\" :class=\"[@className,(@hasRules && @dirty ? (@reasons.length ? 'has-error' : 'has-success') : '')]\">\n    <label class=\"control-label\" :if=\"@label.length\">{{@label}}</label>\n    <slot />\n    <i class=\"form-control-feedback\" :if=\"@hasRules && @showIcon\" :class=\"[(@dirty ? 'glyphicon' : ''), (@reasons.length ? 'glyphicon-remove' : 'glyphicon-ok')]\" :visible=\"@dirty\"></i>\n    <small class=\"help-block\" :css=\"[@inline && @inlineMessageStyle]\" :if=\"@hasRules && @reasons.length\">{{@reasons.length ? @reasons[0].message : ''}}</small>\n</div>"

/***/ }),
/* 249 */
/***/ (function(module, exports) {

module.exports = "<input type=\"text\" class=\"form-control\" \n    :duplex=\"@text\" \n    :attr=\"{name:@col,placeholder:@placeholder}\" \n    :css=\"{width:@width}\"\n    data-duplex-changed=\"@handleChange\">"

/***/ }),
/* 250 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-menu\">\n    <li :class=\"[\n                    !item.children || item.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                    @openKeys.contains(item.key) ? 'koumei-menu-open' : '',\n                    @selectedKeys.contains(item.key) ? 'koumei-menu-item-selected' : ''\n                ]\"\n        :for=\"item in @menu\">\n        <a :click=\"handleClick(item, item.key, [item.key])\" style=\"padding-left: 24px;\">\n            <i :class=\"[item.icon]\"></i>\n            <span>{{item.title}}</span>\n            <i class=\"koumei-menu-caret fa\" :class=\"[@openKeys.contains(item.key) ? 'fa-angle-up' : 'fa-angle-down']\"></i>\n        </a>\n        <ul class=\"koumei-menu\">\n            <li :class=\"[\n                            !item2.children || item2.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                                @openKeys.contains(item2.key) ? 'koumei-menu-open' : '',\n                                @selectedKeys.contains(item2.key) ? 'koumei-menu-item-selected' : ''\n                            ]\"\n                :for=\"item2 in item.children\">\n                <a :click=\"handleClick(item2, item2.key, [item2.key,item.key])\" style=\"padding-left: 48px;\">\n                    <span>{{item2.title}}</span>\n                    <i class=\"koumei-menu-caret fa\" :class=\"[@openKeys.contains(item2.key) ? 'fa-angle-up' : 'fa-angle-down']\"></i>\n                </a>\n                <ul class=\"koumei-menu\">\n                    <li :class=\"[\n                                    !item3.children || item3.children.length === 0 ? 'koumei-menu-item' : 'koumei-menu-submenu',\n                                    @selectedKeys.contains(item3.key) ? 'koumei-menu-item-selected' : ''\n                                ]\"\n                        :for=\"item3 in item2.children\">\n                        <a :click=\"handleClick(item3, item3.key, [item3.key,item2.key,item.key])\" style=\"padding-left: 72px;\">{{item3.title}}</a>\n                    </li>\n                </ul>\n            </li>\n        </ul>\n    </li>\n</ul>"

/***/ }),
/* 251 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\">\n    <a class=\"btn blue\" :attr=\"{disabled:@current===1}\" :click=\"@prevPage\">\n        <i class=\"icon-step-backward\"></i>上一页\n    </a>\n    <a class=\"btn success\">{{ @current }}/{{ Math.ceil(@total/@pageSize) }}</a>\n    <a class=\"btn blue\" :attr=\"{disabled:@current===Math.ceil(@total/@pageSize)}\" :click=\"@nextPage\">\n        <i class=\"icon-step-forward\"></i>下一页\n    </a>\n</div>"

/***/ }),
/* 252 */
/***/ (function(module, exports) {

module.exports = "<div class=\"checkbox-group\">\n    <ms-radio \n        :widget=\"{\n            checked:@selected,\n            value:option.value,\n            name:@helpId,\n            group:true,\n            onChange:function(){\n                @toggleOption(arguments[0], option)\n            },\n            disabled:'disabled' in option?option.disabled:@disabled\n        }\" \n        :for=\"option in options\">{{option.label}}</ms-radio>\n</div>"

/***/ }),
/* 253 */
/***/ (function(module, exports) {

module.exports = "<div :class=\"@wrapper\" class=\"koumei-radio\" style=\"margin-top: 0; margin-bottom: 0;\">\n    <label class=\"koumei-radio-inner koumei-radio-inner-ie\">\n        <input type=\"radio\"\n            :attr=\"{id:@helpId,disabled:@disabled,value:@value,name:@name}\"\n            :duplex=\"@checked\"\n            data-duplex-changed=\"@onChange\"\n            />\n        <span class=\"text\"></span>\n    </label>\n    <label :attr=\"{'for':@helpId}\" style=\"padding-left: 0;\" :css=\"{marginRight:@group?8:0}\"><slot /></label>\n</div>"

/***/ }),
/* 254 */
/***/ (function(module, exports) {

module.exports = "<div style=\"overflow: auto\">\n    <ul class=\"koumei-select-dropdown-menu\" role=\"menu\">\n        <li class=\"koumei-select-dropdown-menu-item\"\n            :class=\"[\n                (@selection.some(function(){return arguments[0].value===option.value}) ? 'koumei-select-dropdown-menu-item-selected' : ''),\n                (option.disabled ? 'koumei-select-dropdown-menu-item-disabled' : '')\n            ]\"\n            :for=\"option in @getFilteredOptions()\"\n            :click=\"@handleOptionClick($event, option)\"\n            role=\"menuitem\">\n            {{option.label}}\n            <i class=\"fa fa-check\" :visible=\"@isMultiple\"></i>\n        </li>\n        <li class=\"koumei-select-dropdown-menu-item koumei-select-dropdown-menu-item-disabled\"\n            :visible=\"@getFilteredOptions().length <= 0 && @searchValue && !@loading\">无数据</li>\n        <li class=\"koumei-select-dropdown-menu-item koumei-select-dropdown-menu-item-disabled\"\n            :visible=\"@loading\">加载中</li>\n    </ul>\n</div>"

/***/ }),
/* 255 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-select form-control\"\n    :class=\"[(@isMultiple ? 'koumei-select-multiple' : '')]\"\n    :css=\"{width:@width}\"\n    :click=\"@handleClick\"\n    role=\"combobox\"\n    aria-autocomplete=\"list\"\n    aria-haspopup=\"true\"\n    :attr=\"{'aria-expanded': @panelVisible + ''}\">\n    <ul class=\"koumei-select-selection\" :class=\"[(@isMultiple ? 'koumei-select-tags' : '')]\">\n        <li class=\"koumei-select-selected\" :visible=\"!@isMultiple && (!@showSearch || !@panelVisible)\">{{@displayValue}}</li>\n        <li class=\"koumei-select-choice\" :for=\"choice in @selection\">\n            <span>{{choice.label}}</span>\n            <i class=\"fa fa-times\" :click=\"@removeSelection($event, choice) | stop\"></i>\n        </li>\n        <li class=\"koumei-select-search\">\n            <input class=\"koumei-select-search-field\"\n                name=\"search\"\n                type=\"text\"\n                autocomplete=\"off\"\n                :duplex=\"@searchValue\"\n                :css=\"{visibility:(@showSearch && @panelVisible)?'visible':'hidden'}\"\n                :keydown=\"@handleDelete\" />\n        </li>\n    </ul>\n    <i class=\"fa koumei-select-arrow\"\n        :class=\"[(@panelVisible ? 'fa-caret-up' : 'fa-caret-down')]\"\n        :visible=\"@mode === ''\"></i>\n    <ms-trigger :widget=\"{\n        width: @panelWidth,\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide}\">\n    </ms-trigger>\n</div>"

/***/ }),
/* 256 */
/***/ (function(module, exports) {

module.exports = "<div>\n    <table class=\"table\" :loading=\"!window.isNaN(@paginationConfig.total) && @loading\">\n        <thead>\n            <tr>\n                <th :if=\"@needSelection\">\n                    <ms-checkbox :widget=\"{checked:@isAllChecked,onChange:@handleCheckAll}\"></ms-checkbox>\n                </th>\n                <th :for=\"el in @columns\">{{el.title}}</th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr :for=\"($index, record) in @getCurrentPageData()\">\n                <td :if=\"@needSelection\">\n                    <ms-checkbox :widget=\"{checked:@checked.indexOf(record[@key])!=-1,onChange:function(){@handleCheck(arguments[0].target.checked,record)}}\"></ms-checkbox>\n                </td>\n                <td :for=\"col in @columns\" :html=\"col.template\"></td>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"pull-right\">\n        <ms-pagination :widget=\"{current:@paginationConfig.current,pageSize:@paginationConfig.pageSize,total:@total,onChange:@handlePageChange}\"></ms-pagination>\n    </div>\n    <div class=\"clearfix\"></div>\n</div>"

/***/ }),
/* 257 */
/***/ (function(module, exports) {

module.exports = "<textarea class=\"form-control\" \n    :duplex=\"@text\" \n    :attr=\"{rows:@rows,name:@col}\"\n    data-duplex-changed=\"@handleChange\"></textarea>"

/***/ }),
/* 258 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-timepicker-view\">\n    <div class=\"koumei-timepicker-view-combobox\">\n        <div class=\"koumei-timepicker-view-select\" name=\"hour-options\">\n            <ul>\n                <li :for=\"hour in @hourOptions\"\n                    :class=\"[(hour==@currentHour?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(hour, 'hour')\">{{hour}}</li>\n            </ul>\n        </div>\n        <div class=\"koumei-timepicker-view-select\" name=\"minute-options\">\n            <ul>\n                <li :for=\"minute in @minuteOptions\"\n                    :class=\"[(minute==@currentMinute?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(minute, 'minute')\">{{minute}}</li>\n            </ul>\n        </div>\n        <div class=\"koumei-timepicker-view-select\" name=\"second-options\">\n            <ul>\n                <li :for=\"second in @secondOptions\"\n                    :class=\"[(second==@currentSecond?'koumei-timepicker-view-select-option-selected':'')]\"\n                    :click=\"@select(second, 'second')\">{{second}}</li>\n            </ul>\n        </div>\n    </div>\n</div>"

/***/ }),
/* 259 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-timepicker\" :css=\"{width:@width}\">\n    <i class=\"fa fa-clock-o koumei-timepicker-icon\"></i>\n    <i class=\"fa fa-times-circle koumei-timepicker-clear\" :if=\"@selected.length\" :click=\"@clear\"></i>\n    <input type=\"text\"\n        class=\"form-control koumei-timepicker-input\"\n        :click=\"@handleClick\"\n        readonly\n        :attr=\"{placeholder:@placeholder}\"\n        :css=\"{width:'100%'}\"\n        :duplex=\"selected\" />\n    <ms-trigger :widget=\"{\n        visible: @panelVisible,\n        innerVmId: @panelVmId,\n        innerClass: @panelClass,\n        innerTemplate: @panelTemplate,\n        withInBox: @withInBox,\n        getTarget: @getTarget,\n        onHide: @handlePanelHide\n    }\">\n    </ms-trigger>\n</div>"

/***/ }),
/* 260 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-tree\">\n    <li :for=\"(index, el) in @tree | get(0)\">\n        <span class=\"koumei-tree-icon fa\" :class=\"[@changeIcon(el)]\" :click=\"@openSubTree(el)\"></span>\n        {{el.text}}\n        <div :visible=\"el.open\" :html=\"@renderSubTree(el)\"></div>\n    </li>\n</ul>"

/***/ }),
/* 261 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-upload-card\">\n    <div class=\"koumei-upload-card-item\" :class=\"[(file.status === 'error' ? 'bordered-danger' : '')]\" :for=\"($index, file) in @fileList\">\n        <img :attr=\"{src:file.url,alt:file.name,title:file.name}\">\n        <span class=\"koumei-upload-card-progress\" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <span class=\"koumei-upload-card-tool\">\n            <i class=\"fa fa-eye\"></i>\n            <i class=\"fa fa-trash-o\" :click=\"del(file)\"></i>\n        </span>\n    </div>\n</div>"

/***/ }),
/* 262 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"koumei-upload-list\">\n    <li :for=\"($index, file) in @fileList\"\n        :class=\"[@getTextClass(file)]\">\n        <div class=\"koumei-upload-list-info\">\n            <i class=\"fa fa-file-o text-muted\"></i>\n            <span :attr=\"{title:file.name}\">{{file.name}}</span>\n        </div>\n        <i class=\"fa fa-times koumei-upload-btn-close\" :click=\"del(file)\"></i>\n        <span class=\"koumei-upload-list-progress\" :visible=\"file.status === 'uploading'\">上传中 {{file.progress}}%</span>\n        <i class=\"fa fa-check-circle text-success\" :class=\"[(file.status === 'done' ? '' : 'hide')]\"></i>\n    </li>\n</ul>"

/***/ }),
/* 263 */
/***/ (function(module, exports) {

module.exports = "<div class=\"koumei-upload-container\">\n    <div class=\"koumei-upload-card-wall\" :if=\"@showUploadList && @listType==='picture-card'\">\n        <ms-upload-card :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ms-upload-card>\n    </div>\n    <label :visible=\"!@showUploadList && @listType==='picture-card' && @fileList.length > 0\" class=\"koumei-upload-card-item\" :attr=\"{'for':@helpId}\">\n        <img :attr=\"{src:@fileList[0]?@fileList[0].url:blankImg,alt:@fileList[0]?@fileList[0].name:'',title:@fileList[0]?@fileList[0].name:''}\">\n    </label>\n    <label :visible=\"@showUploadList || @fileList.length == 0\" :class=\"[(@listType==='picture-card'?@cardClass:@btnClass)]\" :attr=\"{'for':@helpId}\"><slot /></label>\n    <form><input type=\"file\" name=\"file\" :attr=\"{id:@helpId}\"></form>\n    <div :if=\"@showUploadList && @listType!=='picture-card'\">\n        <ms-upload-list :widget=\"{fileList: @fileList, onRemove: @handleRemove}\"></ms-upload-list>\n    </div>\n</div>"

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);

__webpack_require__(185);
__webpack_require__(186);

var jQuery = __webpack_require__(14);
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
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */
/***/ (function(module, exports) {

module.exports = "<ms-menu :widget=\"{menu:@menu,openKeys:@openKeys,selectedKeys:@selectedKeys,onClick:@handleMenuClick,onOpenChange:@handleOpenChange}\"></ms-menu>"

/***/ }),
/* 342 */,
/* 343 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[264]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS9tcy1jb250cm9sLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9rb3VtZWktdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdHJpZ2dlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtcGFnaW5hdGlvbi9tcy1wYWdpbmF0aW9uLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtc2VsZWN0L2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvbXMtY2hlY2tib3gtZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sb2FkaW5nL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtcmFkaW8vbXMtcmFkaW8tZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXItdmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWxheW91dC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9uZXdkb2NzL25hdi5jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbmV3ZG9jcy9zdG9yZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbmV3ZG9jcy9jb21wb25lbnRzL2RvYy1zaWRlYmFyL2RvYy1zaWRlYmFyLnRzIiwid2VicGFjazovLy8uL25ld2RvY3Mvcm91dGVyLnRzIiwid2VicGFjazovLy8uL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZm9ybS9jcmVhdGUtZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWZvcm0vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1pbnB1dC9tcy1pbnB1dC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLW1lbnUvbXMtbWVudS50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10cmVlL21zLXRyZWUudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbG9hZGluZy9tcy1sb2FkaW5nLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9tcy1jYWxlbmRhci50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWRpYWxvZy9tcy1kaWFsb2cudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1mb3JtL21zLWZvcm0udHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sYXlvdXQvbXMtbGF5b3V0LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbWVzc2FnZS9tcy1tZXNzYWdlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbm90aWZpY2F0aW9uL21zLW5vdGlmaWNhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXRhYmxlL21zLXRhYmxlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvbXMtdGV4dGFyZWEudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLXllYXItdmlldy50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWRpYWxvZy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWZvcm0vbXMtZm9ybS1pdGVtLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtaW5wdXQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sb2FkaW5nL21zLWxvYWRpbmctZGlyZWN0aXZlLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbWVudS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLW1lc3NhZ2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1ub3RpZmljYXRpb24vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1yYWRpby9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3Qtb3B0aW9uLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGFibGUvbXMtdGFibGUtaGVhZGVyLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL2luZGV4LnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLXBhbmVsLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdHJlZS9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXRyaWdnZXIvbXMtdHJpZ2dlci50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXVwbG9hZC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQtY2FyZC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQtbGlzdC50cyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC5sZXNzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1sYXlvdXQvbXMtbGF5b3V0Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1tZW51L21zLW1lbnUubGVzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1zZWxlY3QvbXMtc2VsZWN0Lmxlc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIubGVzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQubGVzcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLXllYXItdmlldy5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LWdyb3VwLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLXBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1kYXRlcGlja2VyL21zLWRhdGVwaWNrZXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLWZvcm0vbXMtZm9ybS1pdGVtLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1pbnB1dC9tcy1pbnB1dC5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtbWVudS9tcy1tZW51Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1wYWdpbmF0aW9uL21zLXBhZ2luYXRpb24uaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLWdyb3VwLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy1yYWRpby9tcy1yYWRpby5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtc2VsZWN0L21zLXNlbGVjdC1wYW5lbC5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtc2VsZWN0L21zLXNlbGVjdC5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGFibGUvbXMtdGFibGUuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXRleHRhcmVhL21zLXRleHRhcmVhLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXItdmlldy5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy10cmVlL21zLXRyZWUuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQtY2FyZC5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1saXN0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vbmV3ZG9jcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9uZXdkb2NzL2NvbXBvbmVudHMvZG9jLXNpZGViYXIvZG9jLXNpZGViYXIuaHRtbCIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7OztBQ1ZBLG9DQUFrQztBQUdsQyxxQkFBZSxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtJQUMxQyxRQUFRLEVBQUUsUUFBUTtJQUNsQixRQUFRLEVBQUU7UUFDTixTQUFTLEVBQUUsSUFBSTtRQUNmLE1BQU0sRUFBRSxJQUFJO1FBQ1osS0FBSyxFQUFFLEVBQUU7UUFDVCxHQUFHLEVBQUUsRUFBRTtRQUNQLFdBQVcsRUFBRSxFQUFFO1FBQ2YsS0FBSyxFQUFFLEdBQUc7UUFDVixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUk7UUFDckIsU0FBUyxZQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTthQUN6RCxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsWUFBWSxZQUFDLENBQUM7WUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFD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WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJpbmRleFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJpbmRleFwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgeyBmaW5kUGFyZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuXG5leHBvcnQgZGVmYXVsdCBhdmFsb24uY29tcG9uZW50KCdtcy1jb250cm9sJywge1xuICAgIHRlbXBsYXRlOiAnJm5ic3A7JyxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICAkZm9ybUl0ZW06IG51bGwsXG4gICAgICAgICRydWxlczogbnVsbCxcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBjb2w6ICcnLFxuICAgICAgICBwbGFjZWhvbGRlcjogJycsXG4gICAgICAgIHdpZHRoOiAneCcsXG4gICAgICAgIG9uQ2hhbmdlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgZW1pdFZhbHVlKGUpIHtcbiAgICAgICAgICAgIGxldCB2ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLiRmb3JtSXRlbSAmJiB0aGlzLiRmb3JtSXRlbS5vbkZvcm1DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMuY29sLCB2YWx1ZTogdiwgZGVueVZhbGlkYXRlOiBlLmRlbnlWYWxpZGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZUNoYW5nZShlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRWYWx1ZShlKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWZvcm0vbXMtY29udHJvbC50cyIsImltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0VG9Gb3JtSXRlbSh2bW9kZWwsIG9wdGlvbnMgPSB7fSk6IHZvaWQge1xuICAgIHZtb2RlbC4kZm9ybUl0ZW0gPSBmaW5kUGFyZW50Q29tcG9uZW50KHZtb2RlbCwgJ21zLWZvcm0taXRlbScpO1xuICAgIGlmICh2bW9kZWwuJGZvcm1JdGVtID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdm1vZGVsLiRmb3JtSXRlbS5vbkZpZWxkQ2hhbmdlKHtcbiAgICAgICAgbmFtZTogdm1vZGVsLmNvbCxcbiAgICAgICAgcnVsZXM6IHZtb2RlbC4kcnVsZXMsXG4gICAgICAgIHZhbHVlOiB2bW9kZWwudmFsdWUsXG4gICAgICAgIGRlbnlWYWxpZGF0ZTogdHJ1ZSxcbiAgICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZm9ybS91dGlscy50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnRDb21wb25lbnQodm0sIGN0eXBlKSB7XG4gICAgbGV0IHBhcmVudCA9IHZtLiRlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBpZiAocGFyZW50Ll92bV8gJiYgKCFjdHlwZSB8fCBwYXJlbnQuX2N0eXBlXyA9PT0gY3R5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Ll92bV87XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTbG90VG9WTW9kZWwodm1vZGVsLCB2bm9kZXM/OiBhbnlbXSk6IHZvaWQge1xuICAgIGlmICh2bm9kZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2bm9kZXMgPSB2bW9kZWwuJHJlbmRlci5yb290ID8gdm1vZGVsLiRyZW5kZXIucm9vdC5jaGlsZHJlbiA6IFtdO1xuICAgIH1cbiAgICB2bm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgICAgIGlmICghdm5vZGUgfHwgIXZub2RlLm5vZGVOYW1lIHx8IHZub2RlLmRvbS5ub2RlVHlwZSAhPT0gMSkgcmV0dXJuIHRydWU7XG4gICAgICAgIGxldCBzbG90TmFtZSA9IHZub2RlLmRvbS5nZXRBdHRyaWJ1dGUoJ3Nsb3QnKTtcbiAgICAgICAgaWYgKHNsb3ROYW1lKSB7XG4gICAgICAgICAgICBkZWxldGUgdm5vZGUucHJvcHNbJzpza2lwJ107XG4gICAgICAgICAgICBkZWxldGUgdm5vZGUucHJvcHNbJ21zLXNraXAnXTtcbiAgICAgICAgICAgIHZtb2RlbFtzbG90TmFtZV0gPSBhdmFsb24udmRvbSh2bm9kZSwgJ3RvSFRNTCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyc2VTbG90VG9WTW9kZWwodm1vZGVsLCB2bm9kZS5jaGlsZHJlbik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENoaWxkVGVtcGxhdGVEZXNjcmlwdG9yKHZtb2RlbCwgcmVuZGVyID0gdm1vZGVsLiRyZW5kZXIpOiBhbnlbXSB7XG4gICAgaWYgKHJlbmRlci5kaXJlY3RpdmVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyLmRpcmVjdGl2ZXMucmVkdWNlKChhY2MsIGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLmlzKSB7XG4gICAgICAgICAgICBhY2MucHVzaCh7XG4gICAgICAgICAgICAgICAgaXM6IGFjdGlvbi5pcyxcbiAgICAgICAgICAgICAgICBwcm9wczogYWN0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGlubGluZVRlbXBsYXRlOiBhY3Rpb24uZnJhZ21lbnQsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IGdldENoaWxkVGVtcGxhdGVEZXNjcmlwdG9yKHZtb2RlbCwgYWN0aW9uLmlubmVyUmVuZGVyIHx8IHsgZGlyZWN0aXZlczogW10gfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgW10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdDogbnVtYmVyID0gMzAwLCBpbW1lZGlhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0XHRsZXQgY29udGV4dCA9IHRoaXM7XG5cdFx0bGV0IGxhdGVyID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdH07XG5cdFx0bGV0IGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0fTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9rb3VtZWktdXRpbC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCB7IHBhcnNlU2xvdFRvVk1vZGVsIH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuXG5pZiAoYXZhbG9uLm1zaWUgPD0gOCkge1xuICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50O1xuICAgIGNvbnN0IGhlYWQgPSBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBzdHlsZTogYW55ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgY29uc3QgY3NzU3RyID0gYFxuICAgICAgICAua291bWVpLWNoZWNrYm94LWlubmVyLWllIGlucHV0IHtcbiAgICAgICAgICAgIGxlZnQ6IDA7XG4gICAgICAgICAgICBwb3NpdGlvbjogc3RhdGljICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogNnB4ICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLmtvdW1laS1jaGVja2JveC1pbm5lci1pZSBzcGFuIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIGA7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3NTdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGNzc1N0cikpO1xuICAgIH1cblxuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5hdmFsb24uY29tcG9uZW50KCdtcy1jaGVja2JveCcsIHtcbiAgICBzb2xlU2xvdDogJ2xhYmVsJyxcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1jaGVja2JveC5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgd3JhcHBlcjogJ2NoZWNrYm94JyxcbiAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICBjaGVja2VkOiBmYWxzZSxcbiAgICAgICAgZ3JvdXA6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICAgIG9uQ2hhbmdlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgZmx1c2g6IGF2YWxvbi5ub29wLFxuICAgICAgICBoZWxwSWQ6ICcnLFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVscElkID0gdGhpcy4kaWQ7XG4gICAgICAgICAgICAvLyAvLyBpbmxpbmXlnKhJRTjkuIvmmL7npLrmnInpl67popjvvIzlvoXop6PlhrNcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmlubGluZSAhPSB2b2lkIDApIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLndyYXBwZXIgPSAnY2hlY2tib3gtaW5saW5lJztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICAgICAgcGFyc2VTbG90VG9WTW9kZWwodGhpcyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZSh2bSwgZWwpIHtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvbXMtY2hlY2tib3gudHMiLCJpbXBvcnQgJy4vbXMtdHJpZ2dlcic7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10cmlnZ2VyL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0IHsgcGFyc2VTbG90VG9WTW9kZWwgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbmlmIChhdmFsb24ubXNpZSA8PSA4KSB7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgIGNvbnN0IHN0eWxlOiBhbnkgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBjb25zdCBjc3NTdHIgPSBgXG4gICAgICAgIC5rb3VtZWktcmFkaW8taW5uZXItaWUgaW5wdXQge1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBzdGF0aWMgIWltcG9ydGFudDtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA2cHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAua291bWVpLXJhZGlvLWlubmVyLWllIHNwYW4ge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgYDtcbiAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9jc3MnKTtcblxuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzc1N0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZS5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoY3NzU3RyKSk7XG4gICAgfVxuXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLXJhZGlvJywge1xuICAgIHNvbGVTbG90OiAnbGFiZWwnLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXJhZGlvLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB3cmFwcGVyOiAncmFkaW8nLFxuICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIGNoZWNrZWQ6ICcnLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIG5hbWU6ICcnLFxuICAgICAgICBncm91cDogZmFsc2UsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBoZWxwSWQ6ICcnLFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaGVscElkID0gdGhpcy4kaWQ7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgICAgIHBhcnNlU2xvdFRvVk1vZGVsKHRoaXMpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2Uodm0sIGVsKSB7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG4vKipcbiAqIOWIhumhtee7hOS7tlxuICogQHByb3Age051bWJlcn0gW2N1cnJlbnQ9MV0g5b2T5YmN6aG1XG4gKiBAcHJvcCB7TnVtYmVyfSBbcGFnZVNpemU9MTBdIOavj+mhteeahOaVsOaNrumHj1xuICogQHByb3Age051bWJlcn0gdG90YWwg5pWw5o2u5oC76YePXG4gKiBAZXZlbnQge0Z1bmN0aW9ufSBvbkNoYW5nZSDlvZPpobXnoIHmlLnlj5jml7bop6blj5HvvIzlj4LmlbBjdXJyZW50XG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIDxtcy1wYWdpbmF0aW9uIDp3aWRnZXQ9XCJ7dG90YWw6MTAwLG9uQ2hhbmdlOkBoYW5kbGVQYWdlQ2hhbmdlfVwiPjwvbXMtcGFnaW5hdGlvbj5cbiAqIFxuICogPG1zLXBhZ2luYXRpb24gOndpZGdldD1cIntjdXJyZW50OkBjdXJyZW50UGFnZSxwYWdlU2l6ZTpAcGFnZVNpemUsdG90YWw6QHRvdGFsLG9uQ2hhbmdlOkBoYW5kbGVQYWdlQ2hhbmdlfVwiPjwvbXMtcGFnaW5hdGlvbj5cbiAqIGBgYFxuICovXG5hdmFsb24uY29tcG9uZW50KCdtcy1wYWdpbmF0aW9uJywge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXBhZ2luYXRpb24uaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGN1cnJlbnQ6IDEsXG4gICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICAgIHByZXZQYWdlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudCA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKC0tdGhpcy5jdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbmV4dFBhZ2UoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50IDwgTWF0aC5jZWlsKHRoaXMudG90YWwvdGhpcy5wYWdlU2l6ZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCsrdGhpcy5jdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2UoZXZlbnQpIHtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtcGFnaW5hdGlvbi9tcy1wYWdpbmF0aW9uLnRzIiwiaW1wb3J0ICcuL21zLXNlbGVjdCc7XG5pbXBvcnQgJy4vbXMtc2VsZWN0LW9wdGlvbidcbmltcG9ydCAnLi9tcy1zZWxlY3QubGVzcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1zZWxlY3QvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgY29udHJvbENvbXBvbmVudCBmcm9tICcuLi9tcy1mb3JtL21zLWNvbnRyb2wnO1xuaW1wb3J0IHsgZW1pdFRvRm9ybUl0ZW0gfSBmcm9tICcuLi9tcy1mb3JtL3V0aWxzJztcbmltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5pbXBvcnQgJy4vbXMtY2hlY2tib3gnO1xuXG5jb250cm9sQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy1jaGVja2JveC1ncm91cCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtY2hlY2tib3gtZ3JvdXAuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHZhbHVlOiBbXSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgc2VsZWN0aW9uOiBbXSxcbiAgICAgICAgdG9nZ2xlT3B0aW9uKG9wdGlvbikge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uSW5kZXggPSB0aGlzLnNlbGVjdGlvbi5pbmRleE9mKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICBpZiAob3B0aW9uSW5kZXggPT09IC0xICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnB1c2gob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucmVtb3ZlKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB0aGlzLnNlbGVjdGlvbi50b0pTT04oKSB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveC1ncm91cCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtYXBWYWx1ZVRvU2VsZWN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiB2YWx1ZS5jb250YWlucyhvLnZhbHVlKSkubWFwKG8gPT4gby52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgZW1pdFRvRm9ybUl0ZW0odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmFsdWUnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3Rpb24odik7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHYudG9KU09OKCkgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gtZ3JvdXAnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1NlbGVjdGlvbih0aGlzLnZhbHVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICAgICAgLy92bS5lbEhpZGRlbklucHV0ID0gJChlbCkuZmluZCgnaW5wdXQ6aGlkZGVuJyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZShldmVudCkge1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC1ncm91cC50cyIsImV4cG9ydCB7IExvYWRpbmcgfSBmcm9tICAnLi9tcy1sb2FkaW5nLWRpcmVjdGl2ZSc7XG5pbXBvcnQgJy4vbXMtbG9hZGluZy5sZXNzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWxvYWRpbmcvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgY29udHJvbENvbXBvbmVudCBmcm9tICcuLi9tcy1mb3JtL21zLWNvbnRyb2wnO1xuaW1wb3J0IHsgZW1pdFRvRm9ybUl0ZW0gfSBmcm9tICcuLi9tcy1mb3JtL3V0aWxzJztcbmltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5pbXBvcnQgJy4vbXMtcmFkaW8nO1xuXG5jb250cm9sQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy1yYWRpby1ncm91cCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtcmFkaW8tZ3JvdXAuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgc2VsZWN0ZWQ6ICcnLFxuICAgICAgICB0b2dnbGVPcHRpb24oZSwgb3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5zZWxlY3RlZCB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdyYWRpby1ncm91cCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBoZWxwSWQ6ICcnLFxuICAgICAgICBtYXBWYWx1ZVRvU2VsZWN0ZWQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmhlbHBJZCA9IHRoaXMuJGlkO1xuICAgICAgICAgICAgZW1pdFRvRm9ybUl0ZW0odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmFsdWUnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3RlZCh2KTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdiB9LFxuICAgICAgICAgICAgICAgICAgICBkZW55VmFsaWRhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdyYWRpby1ncm91cCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvU2VsZWN0ZWQodGhpcy52YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKGV2ZW50KSB7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLWdyb3VwLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IE9QVElPTl9IRUlHSFQgPSAyNDtcblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtdGltZXBpY2tlci12aWV3Jywge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXRpbWVwaWNrZXItdmlldy5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBjdXJyZW50SG91cjogMCxcbiAgICAgICAgY3VycmVudE1pbnV0ZTogMCxcbiAgICAgICAgY3VycmVudFNlY29uZDogMCxcbiAgICAgICAgaG91ck9wdGlvbnM6IGF2YWxvbi5yYW5nZSgyNCkubWFwKG4gPT4gKCcwJyArIG4pLnN1YnN0cigtMikpLFxuICAgICAgICBtaW51dGVPcHRpb25zOiBhdmFsb24ucmFuZ2UoNjApLm1hcChuID0+ICgnMCcgKyBuKS5zdWJzdHIoLTIpKSxcbiAgICAgICAgc2Vjb25kT3B0aW9uczogYXZhbG9uLnJhbmdlKDYwKS5tYXAobiA9PiAoJzAnICsgbikuc3Vic3RyKC0yKSksXG4gICAgICAgIG9uQ2hhbmdlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgc2VsZWN0KGVsLCB0eXBlKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdFtuYW1lPScgKyB0eXBlICsgJy1vcHRpb25zXScpLnNjcm9sbFRvcCA9IGVsICogMjQ7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2hvdXInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SG91ciA9IGVsO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbWludXRlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1pbnV0ZSA9IGVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWNvbmQgPSBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICAgICAgICBob3VyOiB0aGlzLmN1cnJlbnRIb3VyLFxuICAgICAgICAgICAgICAgICAgICBtaW51dGU6IHRoaXMuY3VycmVudE1pbnV0ZSxcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kOiB0aGlzLmN1cnJlbnRTZWNvbmQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiAndGltZXBpY2tlci12aWV3LWNoYW5nZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KCkge1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZhbHVlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbSA9IG1vbWVudCh2LnNwbGl0KCcsJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEhvdXIgPSBtLmhvdXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNaW51dGUgPSBtLm1pbnV0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlY29uZCA9IG0uc2Vjb25kKCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdFtuYW1lPWhvdXItb3B0aW9uc10nKS5zY3JvbGxUb3AgPSB0aGlzLmN1cnJlbnRIb3VyICogT1BUSU9OX0hFSUdIVDtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5rb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdFtuYW1lPW1pbnV0ZS1vcHRpb25zXScpLnNjcm9sbFRvcCA9IHRoaXMuY3VycmVudE1pbnV0ZSAqIE9QVElPTl9IRUlHSFQ7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcua291bWVpLXRpbWVwaWNrZXItdmlldy1zZWxlY3RbbmFtZT1zZWNvbmQtb3B0aW9uc10nKS5zY3JvbGxUb3AgPSB0aGlzLmN1cnJlbnRTZWNvbmQgKiBPUFRJT05fSEVJR0hUO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRmaXJlKCd2YWx1ZScsIHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXItdmlldy50cyIsImltcG9ydCAnLi9tcy1sYXlvdXQubGVzcyc7XG5pbXBvcnQgJy4vbXMtbGF5b3V0JztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWxheW91dC9pbmRleC50cyIsIm1vZHVsZS5leHBvcnRzID0gW3tcbiAgICBrZXk6ICdjb21wb25lbnRzJyxcbiAgICB0aXRsZTogJ+e7hOS7ticsXG4gICAgY2hpbGRyZW46IFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLWlucHV0LWlucHV0JyxcbiAgICAgICAgdGl0bGU6ICdpbnB1dCDovpPlhaXmoYYnLFxuICAgICAgICB1cmk6ICcvaW5wdXQnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWlucHV0L21zLWlucHV0Lm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tdGV4dGFyZWEtdGV4dGFyZWEnLFxuICAgICAgICB0aXRsZTogJ3RleHRhcmVhIOWkmuihjOi+k+WFpeahhicsXG4gICAgICAgIHVyaTogJy90ZXh0YXJlYScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtdGV4dGFyZWEvbXMtdGV4dGFyZWEubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1zZWxlY3Qtc2VsZWN0JyxcbiAgICAgICAgdGl0bGU6ICdzZWxlY3Qg6YCJ5oup5qGGJyxcbiAgICAgICAgdXJpOiAnL3NlbGVjdCcsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtc2VsZWN0L21zLXNlbGVjdC5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLXJhZGlvLXJhZGlvJyxcbiAgICAgICAgdGl0bGU6ICdyYWRpbyDljZXpgInmoYYnLFxuICAgICAgICB1cmk6ICcvcmFkaW8nLFxuICAgICAgICBsb2NhdGlvbjogJ21zLXJhZGlvL21zLXJhZGlvLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tY2hlY2tib3gtY2hlY2tib3gnLFxuICAgICAgICB0aXRsZTogJ2NoZWNrYm94IOWkmumAieahhicsXG4gICAgICAgIHVyaTogJy9jaGVja2JveCcsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtY2hlY2tib3gvbXMtY2hlY2tib3gubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1kYXRlcGlja2VyLWRhdGVwaWNrZXInLFxuICAgICAgICB0aXRsZTogJ2RhdGVwaWNrZXIg5pel5pyf6YCJ5oup5ZmoJyxcbiAgICAgICAgdXJpOiAnL2RhdGVwaWNrZXInLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWRhdGVwaWNrZXIvbXMtZGF0ZXBpY2tlci5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLXRpbWVwaWNrZXItdGltZXBpY2tlcicsXG4gICAgICAgIHRpdGxlOiAndGltZXBpY2tlciDml7bpl7TpgInmi6nlmagnLFxuICAgICAgICB1cmk6ICcvdGltZXBpY2tlcicsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tdXBsb2FkLXVwbG9hZCcsXG4gICAgICAgIHRpdGxlOiAndXBsb2FkIOaWh+S7tuS4iuS8oCcsXG4gICAgICAgIHVyaTogJy91cGxvYWQnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLXVwbG9hZC9tcy11cGxvYWQubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1mb3JtLWNvbnRyb2wnLFxuICAgICAgICB0aXRsZTogJ2Zvcm0tY29udHJvbCDooajljZXmjqfku7YnLFxuICAgICAgICB1cmk6ICcvZm9ybS1jb250cm9sJyxcbiAgICAgICAgbG9jYXRpb246ICdtcy1mb3JtL21zLWNvbnRyb2wubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1mb3JtLWZvcm0nLFxuICAgICAgICB0aXRsZTogJ2Zvcm0g6KGo5Y2VJyxcbiAgICAgICAgdXJpOiAnL2Zvcm0nLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWZvcm0vbXMtZm9ybS5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLW1lbnUtbWVudScsXG4gICAgICAgIHRpdGxlOiAnbWVudSDoj5zljZUnLFxuICAgICAgICB1cmk6ICcvbWVudScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtbWVudS9tcy1tZW51Lm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tdGFibGUtdGFibGUnLFxuICAgICAgICB0aXRsZTogJ3RhYmxlIOaVsOaNruihqOagvCcsXG4gICAgICAgIHVyaTogJy90YWJsZScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtdGFibGUvbXMtdGFibGUubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1wYWdpbmF0aW9uLXBhZ2luYXRpb24nLFxuICAgICAgICB0aXRsZTogJ3BhZ2luYXRpb24g5YiG6aG1JyxcbiAgICAgICAgdXJpOiAnL3BhZ2luYXRpb24nLFxuICAgICAgICBsb2NhdGlvbjogJ21zLXBhZ2luYXRpb24vbXMtcGFnaW5hdGlvbi5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLXRyZWUtdHJlZScsXG4gICAgICAgIHRpdGxlOiAndHJlZSDmoJEnLFxuICAgICAgICB1cmk6ICcvdHJlZScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtdHJlZS9tcy10cmVlLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tZGlhbG9nLWRpYWxvZycsXG4gICAgICAgIHRpdGxlOiAnZGlhbG9nIOWvueivneahhicsXG4gICAgICAgIHVyaTogJy9kaWFsb2cnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWRpYWxvZy9tcy1kaWFsb2cubWQnXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnQtZGVtby1sb2FkaW5nLWxvYWRpbmcnLFxuICAgICAgICB0aXRsZTogJ2xvYWRpbmcg5Yqg6L295Lit6JKZ54mIJyxcbiAgICAgICAgdXJpOiAnL2xvYWRpbmcnLFxuICAgICAgICBsb2NhdGlvbjogJ21zLWxvYWRpbmcvbXMtbG9hZGluZy5tZCdcbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudC1kZW1vLW1lc3NhZ2UtbWVzc2FnZScsXG4gICAgICAgIHRpdGxlOiAnbWVzc2FnZSDlhajlsYDmj5DnpLonLFxuICAgICAgICB1cmk6ICcvbWVzc2FnZScsXG4gICAgICAgIGxvY2F0aW9uOiAnbXMtbWVzc2FnZS9tcy1tZXNzYWdlLm1kJ1xuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50LWRlbW8tbm90aWZpY2F0aW9uLW5vdGlmaWNhdGlvbicsXG4gICAgICAgIHRpdGxlOiAnbm90aWZpY2F0aW9uIOmAmuefpeaPkOmGkuahhicsXG4gICAgICAgIHVyaTogJy9ub3RpZmljYXRpb24nLFxuICAgICAgICBsb2NhdGlvbjogJ21zLW5vdGlmaWNhdGlvbi9tcy1ub3RpZmljYXRpb24ubWQnXG4gICAgfV1cbn1dO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbmV3ZG9jcy9uYXYuY29uZmlnLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJleHBvcnQgY29uc3QgbWVudSA9IHtcbiAgICBzZWxlY3RlZEtleXMkOiBPYnNlcnZhYmxlKCksXG4gICAgb3BlbktleXMkOiBPYnNlcnZhYmxlKClcbn07XG5cbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25OZXh0Q2JMaXN0OiBbXSxcbiAgICAgICAgc3Vic2NyaWJlKG9uTmV4dCkge1xuICAgICAgICAgICAgdGhpcy5vbk5leHRDYkxpc3QucHVzaChvbk5leHQpO1xuICAgICAgICB9LFxuICAgICAgICBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMub25OZXh0Q2JMaXN0LmZvckVhY2goY2IgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY2IodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9uZXdkb2NzL3N0b3Jlcy9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcblxuaW1wb3J0ICogYXMgbmF2Q29uZmlnIGZyb20gJy4uLy4uL25hdi5jb25maWcuanMnO1xuaW1wb3J0ICdrb3VtZWknO1xuaW1wb3J0IHsgbWVudSBhcyBtZW51U3RvcmUgfSBmcm9tICcuLi8uLi9zdG9yZXMnO1xuXG5leHBvcnQgY29uc3QgbmFtZSA9ICdkb2Mtc2lkZWJhcic7XG5cbmF2YWxvbi5jb21wb25lbnQobmFtZSwge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2RvYy1zaWRlYmFyLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBtZW51OiBbXSxcbiAgICAgICAgc2VsZWN0ZWRLZXlzOiBbXSxcbiAgICAgICAgb3BlbktleXM6IFsnY29tcG9uZW50cyddLFxuICAgICAgICBoYW5kbGVNZW51Q2xpY2soaXRlbSwga2V5LCBrZXlQYXRoKSB7XG4gICAgICAgICAgICBhdmFsb24uaGlzdG9yeS5zZXRIYXNoKGl0ZW0udXJpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlT3BlbkNoYW5nZShvcGVuS2V5cykge1xuICAgICAgICAgICAgdGhpcy5vcGVuS2V5cyA9IG9wZW5LZXlzLnNsaWNlKC0xKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1lbnUgPSBuYXZDb25maWc7XG4gICAgICAgICAgICBtZW51U3RvcmUuc2VsZWN0ZWRLZXlzJC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEtleXMgPSB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9uZXdkb2NzL2NvbXBvbmVudHMvZG9jLXNpZGViYXIvZG9jLXNpZGViYXIudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgJ21tUm91dGVyJztcbmltcG9ydCB7IG1lbnUgYXMgbWVudVN0b3JlIH0gZnJvbSAnLi9zdG9yZXMnO1xuaW1wb3J0ICogYXMgbmF2Q29uZmlnIGZyb20gJy4vbmF2LmNvbmZpZy5qcyc7XG5cbmZ1bmN0aW9uIGdldFBhZ2UoY29tcG9uZW50KSB7XG4gICAgY29uc3QgaHRtbCA9IGA8eG1wIGlzPVwiJHtjb21wb25lbnR9XCIgOndpZGdldD1cIntpZDonJHtjb21wb25lbnQucmVwbGFjZSgvXFwtL2csICdfJyl9J31cIj48L3htcD5gO1xuICAgIHJldHVybiBodG1sXG59XG5cbmZ1bmN0aW9uIGFwcGx5Um91dGVDb25maWcoY29uZmlnLCBwYXJlbnRSb3V0ZSwgYWNjUGF0aCA9ICcnKSB7XG4gICAgY29uZmlnLm1hcChmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgbGV0IGNvbXBvbmVudHM6YW55ID0ge307XG4gICAgICAgIGlmIChyb3V0ZS5jb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMuY3VycmVudFBhZ2UgPSByb3V0ZS5jb21wb25lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdXRlLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHMgPSByb3V0ZS5jb21wb25lbnRzO1xuICAgICAgICB9XG4gICAgICAgIGF2YWxvbi5yb3V0ZXIuYWRkKGFjY1BhdGggKyByb3V0ZS5wYXRoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5tYXAodmlld05hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW3ZpZXdOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQoZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lbnVTdG9yZS5zZWxlY3RlZEtleXMkLm9uTmV4dChbbS5uYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmFsb24udm1vZGVsc1twYXJlbnRSb3V0ZS5uYW1lXVt2aWV3TmFtZV0gPSBnZXRQYWdlKG0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3BhcmVudFJvdXRlLm5hbWVdW3ZpZXdOYW1lXSA9IGdldFBhZ2UoY29tcG9uZW50Lm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVE9ETyDmlK/mjIHltYzlpZfot6/nlLFcbiAgICAgICAgLy9yb3V0ZS5jaGlsZHJlbiAmJiBhcHBseVJvdXRlQ29uZmlnKHJvdXRlLmNoaWxkcmVuLCByb3V0ZSwgYWNjUGF0aCArIHJvdXRlLnBhdGgpO1xuICAgIH0pO1xufVxuXG5jb25zdCByb3V0ZUNvbmZpZyA9IFtdO1xuY29uc3QgdHJhdmVsID0gaXRlbSA9PiB7XG4gICAgaWYgKCFpdGVtLmNoaWxkcmVuIHx8IGl0ZW0uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJvdXRlQ29uZmlnLnB1c2goe1xuICAgICAgICAgICAgcGF0aDogaXRlbS51cmksXG4gICAgICAgICAgICBjb21wb25lbnQocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy8nICsgaXRlbS5sb2NhdGlvbikpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmNoaWxkcmVuLm1hcCh0cmF2ZWwpO1xuICAgIH1cbn07XG5uYXZDb25maWcubWFwKHRyYXZlbCk7XG5cbmFwcGx5Um91dGVDb25maWcocm91dGVDb25maWcsIHtcbiAgICBuYW1lOiAncm9vdCdcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25ld2RvY3Mvcm91dGVyLnRzIiwiaW1wb3J0ICcuL2NvbXBvbmVudHMvbXMtbWVudSc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy10YWJsZS9tcy10YWJsZSc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy1wYWdpbmF0aW9uL21zLXBhZ2luYXRpb24nO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvbXMtZGlhbG9nJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWZvcm0nO1xuZXhwb3J0IHsgY3JlYXRlRm9ybSB9IGZyb20gJy4vY29tcG9uZW50cy9tcy1mb3JtL2NyZWF0ZS1mb3JtJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWlucHV0JztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXRleHRhcmVhJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXNlbGVjdCc7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy11cGxvYWQnO1xuaW1wb3J0ICcuL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlcic7XG5pbXBvcnQgJy4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWNoZWNrYm94JztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLWNoZWNrYm94L21zLWNoZWNrYm94LWdyb3VwJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXJhZGlvJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLWdyb3VwJztcbmltcG9ydCAnLi9jb21wb25lbnRzL21zLXRyZWUnO1xuXG5leHBvcnQgeyBMb2FkaW5nIH0gZnJvbSAnLi9jb21wb25lbnRzL21zLWxvYWRpbmcnO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBub3RpZmljYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvbXMtbm90aWZpY2F0aW9uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbWVzc2FnZSB9IGZyb20gJy4vY29tcG9uZW50cy9tcy1tZXNzYWdlJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGNvbnRyb2xDb21wb25lbnQgZnJvbSAnLi4vbXMtZm9ybS9tcy1jb250cm9sJztcbmltcG9ydCAnLi4vbXMtdHJpZ2dlcic7XG5pbXBvcnQgJy4uL21zLWNhbGVuZGFyJztcbmltcG9ydCAnLi4vbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLXZpZXcnXG5pbXBvcnQgeyBlbWl0VG9Gb3JtSXRlbSB9IGZyb20gJy4uL21zLWZvcm0vdXRpbHMnO1xuXG4vKipcbiAqIOaXpeacn+mAieaLqee7hOS7tlxuICogQHByb3AgdmFsdWUg57uE5Lu25YC8KGluaGVyaXQpXG4gKiBAcHJvcCBjb2wg5a2X5q616Lev5b6EKGluaGVyaXQpXG4gKiBAcHJvcCBmb3JtYXQg5pel5pyf5qC85byP77yM5Y+C6ICDIG1vbWVudGpz77yM6buY6K6k5Li6IFlZWVktTU0tRERcbiAqIEBwcm9wIHN0YXJ0RGF0ZSDmjqfliLblj6/lt7LpgInmi6nnmoTml7bpl7TnmoTlvIDlp4vml6XmnJ/vvIzml6XmnJ/lrZfnrKbkuLLvvIzmoLzlvI/kuI4gZm9ybWF0IOWPguaVsOWMuemFje+8jOiuvue9ruatpOmhueiHquWKqOW/veeVpSBkaXNhYmxlZERhdGVcbiAqIEBwcm9wIGVuZERhdGUg5o6n5Yi25Y+v5bey6YCJ5oup55qE5pe26Ze055qE57uT5p2f5pel5pyf77yM5pel5pyf5a2X56ym5Liy77yM5qC85byP5LiOIGZvcm1hdCDlj4LmlbDljLnphY3vvIzorr7nva7mraTpobnoh6rliqjlv73nlaUgZGlzYWJsZWREYXRlXG4gKiBAcHJvcCBkaXNhYmxlZERhdGUg5LiN5Y+v6YCJ5oup5pel5pyf55qE5Yik5pat5Ye95pWw77yM5Lyg5YWlIGN1cnJlbnTvvIjlvZPliY3pgY3ljobml6XmnJ/vvInvvIzov5Tlm54gdHJ1ZSDooajnpLrmraTml6XmnJ/kuI3lj6/pgIlcbiAqIEBwcm9wIHNob3dUaW1lIOaYr+WQpuaYvuekuuaXtumXtOmAieaLqe+8jOWmguaenOatpOmhueS4uiB0cnVl77yM5YiZIGZvcm1hdCDpu5jorqTkuLogWVlZWS1NTS1ERCBISDptbTpzc1xuICogXG4gKiBAZXhhbXBsZVxuICogYGBgIGh0bWxcbiAqIFxuICogYGBgXG4gKi9cbmNvbnRyb2xDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLWRhdGVwaWNrZXInLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLWRhdGVwaWNrZXIuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgICAgZm9ybWF0OiAnWVlZWS1NTS1ERCcsXG4gICAgICAgIHN0YXJ0RGF0ZTogJycsXG4gICAgICAgIGVuZERhdGU6ICcnLFxuICAgICAgICBkaXNhYmxlZERhdGUoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgc2hvd1RpbWU6IGZhbHNlLFxuICAgICAgICBjbGVhcigpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSAnJztcbiAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXS5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogJycgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGF0ZXBpY2tlci1jaGFuZ2VkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHdpdGhJbkJveChlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQgPT09IGVsIHx8IGF2YWxvbi5jb250YWlucyh0aGlzLiRlbGVtZW50LCBlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRhcmdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50O1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVDbGljayhlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFuZWxWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgYXZhbG9uLnZtb2RlbHNbdGhpcy5wYW5lbFZtSWRdLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYW5lbFZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHBhbmVsVm1JZDogJycsXG4gICAgICAgIHBhbmVsVmlzaWJsZTogZmFsc2UsXG4gICAgICAgIHBhbmVsQ2xhc3M6ICdrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1jb250YWluZXInLFxuICAgICAgICBwYW5lbFRlbXBsYXRlOiByZXF1aXJlKCcuL21zLWRhdGVwaWNrZXItcGFuZWwuaHRtbCcpLFxuICAgICAgICBoYW5kbGVQYW5lbEhpZGUoKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hcFZhbHVlVG9TZWxlY3RlZCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgc2hvd0ljb246IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1NlbGVjdGVkKHYpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB2IH0sXG4gICAgICAgICAgICAgICAgICAgIGRlbnlWYWxpZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RhdGVwaWNrZXItY2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5mb3JtYXQgPT09ICdZWVlZLU1NLUREJykge1xuICAgICAgICAgICAgICAgIC8vIOWFgeiuuOmAieaLqeaXtumXtOeahOaooeW8j+S4i++8jOeUqOaIt+WmguaenOayoeiHquWumuS5ieagvOW8j++8jOWImeiHquWKqOi9rOS4uuaXpeacn+aXtumXtOagvOW8j1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0ID0gJ1lZWVktTU0tREQgSEg6bW06c3MnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYW5lbFZtSWQgPSB0aGlzLiRpZCArICdfcGFuZWwnO1xuICAgICAgICAgICAgY29uc3QgaW5uZXJWbSA9IGF2YWxvbi5kZWZpbmUoe1xuICAgICAgICAgICAgICAgICRpZDogdGhpcy5wYW5lbFZtSWQsXG4gICAgICAgICAgICAgICAgY3VycmVudERhdGVBcnJheTogJycsXG4gICAgICAgICAgICAgICAgJG1vbWVudDogbW9tZW50KCksXG4gICAgICAgICAgICAgICAgY3VycmVudERheTogMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50TW9udGg6ICcnLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyOiAwLFxuICAgICAgICAgICAgICAgICRzdGFydERhdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgJGVuZERhdGU6IG51bGwsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWREYXRlKCkgeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICAgICAgICAgICAgc2hvd1RpbWU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC8vIC0xLeWkqe+8iOaXtumXtO+8ieinhuWbvu+8jDAt5pyI6KeG5Zu+77yMMS3lubTop4blm77vvIwyLeWNgeW5tOinhuWbvu+8jDMt55m+5bm06KeG5Zu+XG4gICAgICAgICAgICAgICAgdmlld01vZGU6IDAsXG4gICAgICAgICAgICAgICAgc3RhZ2VkOiAwLFxuICAgICAgICAgICAgICAgICRjb21wdXRlZDoge1xuICAgICAgICAgICAgICAgICAgICBzdGFydE9mRGVjYWRlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFllYXIgLSB0aGlzLmN1cnJlbnRZZWFyICUgMTA7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0T2ZDZW50dXJ5KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFllYXIgLSB0aGlzLmN1cnJlbnRZZWFyICUgMTAwO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzZXQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG1vbWVudCA9IHNlbGYuc2VsZWN0ZWQgPyBtb21lbnQoc2VsZi5zZWxlY3RlZCwgc2VsZi5mb3JtYXQpIDogbW9tZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERheSA9IHRoaXMuJG1vbWVudC5kYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1vbnRoID0gdGhpcy4kbW9tZW50LmZvcm1hdCgnTU1NJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFllYXIgPSB0aGlzLiRtb21lbnQueWVhcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RpbWUgPSBzZWxmLnNob3dUaW1lO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8g5p6E6YCg5LiN5Y+v6YCJ5oup5pel5pyf55qE5Yik5pat5Ye95pWwXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kc3RhcnREYXRlID0gbW9tZW50KHNlbGYuc3RhcnREYXRlLCBzZWxmLmZvcm1hdCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZW5kRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZW5kRGF0ZSA9IG1vbWVudChzZWxmLmVuZERhdGUsIHNlbGYuZm9ybWF0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zdGFydERhdGUgfHwgc2VsZi5lbmREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzorr7nva7kuoblvIDlp4vml6XmnJ/lkoznu5PmnZ/ml6XmnJ/vvIzliJnmja7mraTmnoTpgKDkuIDkuKrliKTmlq3lh73mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWREYXRlID0gKGN1cnJlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kc3RhcnREYXRlID09PSBudWxsICYmIHRoaXMuJGVuZERhdGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50TW9tZW50ID0gbW9tZW50KGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2FtZU9yQWZ0ZXJTdGFydERhdGUgPSBjdXJyZW50TW9tZW50LmlzU2FtZU9yQWZ0ZXIodGhpcy4kc3RhcnREYXRlLCAnZGF0ZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2FtZU9yQmVmb3JlRW5kRGF0ZSA9IGN1cnJlbnRNb21lbnQuaXNTYW1lT3JCZWZvcmUodGhpcy4kZW5kRGF0ZSwgJ2RhdGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kc3RhcnREYXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNTYW1lT3JCZWZvcmVFbmREYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy4kZW5kRGF0ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIWlzU2FtZU9yQWZ0ZXJTdGFydERhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKGlzU2FtZU9yQWZ0ZXJTdGFydERhdGUgJiYgaXNTYW1lT3JCZWZvcmVFbmREYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlkKbliJnkvb/nlKjpu5jorqTnmoTmiJbogIXlpJbpg6jkvKDov5vmnaXnmoTliKTmlq3lh73mlbBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGlzYWJsZWREYXRlID0gc2VsZi5kaXNhYmxlZERhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNoYW5nZVZpZXcodmlld01vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmlld01vZGUgPT09IDAgJiYgdmlld01vZGUgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS7juaciOinhuWbvuebtOaOpei3s+WIsOWNgeW5tOinhuWbvuWQju+8jOi/lOWbnuaXtui3s+i/h+W5tOinhuWbvlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZWQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhhbmRsZVllYXJWaWV3U2VsZWN0KGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbW9tZW50Lm1vbnRoKGVsLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVBcnJheSA9IHRoaXMuJG1vbWVudC50b0FycmF5KCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52aWV3TW9kZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50WWVhciA9IGVsLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbW9tZW50LnllYXIoZWwudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUFycmF5ID0gdGhpcy4kbW9tZW50LnRvQXJyYXkoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpZXdNb2RlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gZWwudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb21lbnQueWVhcihlbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlID0gdGhpcy52aWV3TW9kZSAtIDEgLSB0aGlzLnN0YWdlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2VkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGUgPSB0aGlzLnZpZXdNb2RlIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbXV0YXRlKGFjdGlvbiwgLi4uYXJncykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRtb21lbnRbYWN0aW9uXS5hcHBseSh0aGlzLiRtb21lbnQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXkgPSB0aGlzLiRtb21lbnQuZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IHRoaXMuJG1vbWVudC5mb3JtYXQoJ01NTScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdGhpcy4kbW9tZW50LnllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZUFycmF5ID0gdGhpcy4kbW9tZW50LnRvQXJyYXkoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdG9kYXkoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2FsZW5kYXJDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG1vbWVudCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NhbGVuZGFyLWNoYW5nZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoYW5kbGVDYWxlbmRhckNoYW5nZShlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJG1vbWVudCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnREYXkgPSB0aGlzLiRtb21lbnQuZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRNb250aCA9IHRoaXMuJG1vbWVudC5mb3JtYXQoJ01NTScpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gdGhpcy4kbW9tZW50LnllYXIoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnNob3dUaW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGhhbmRsZVRpbWVwaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGhvdXIsIG1pbnV0ZSwgc2Vjb25kIH0gPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbW9tZW50LmhvdXIoaG91cikubWludXRlKG1pbnV0ZSkuc2Vjb25kKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZCA9IHRoaXMuJG1vbWVudC5mb3JtYXQoc2VsZi5mb3JtYXQpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHNlbGYuc2VsZWN0ZWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkYXRlcGlja2VyLWNoYW5nZWQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvU2VsZWN0ZWQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBpbm5lclZtLnJlc2V0KCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRGlzcG9zZSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF07XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWRhdGVwaWNrZXIvbXMtZGF0ZXBpY2tlci50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAqIGFzIFNjaGVtYSBmcm9tICdhc3luYy12YWxpZGF0b3InO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRm9ybShvcHRpb25zPykge1xuICAgIHJldHVybiBuZXcgRm9ybShvcHRpb25zKTtcbn1cblxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcmVjb3JkOiB7fSxcbiAgICBhdXRvQXN5bmNDaGFuZ2U6IHRydWUsXG4gICAgb25GaWVsZHNDaGFuZ2U6IGF2YWxvbi5ub29wXG59O1xuXG5mdW5jdGlvbiBGb3JtKG9wdGlvbnMpIHtcbiAgICB0aGlzLmNhY2hlZFJlY29yZCA9IHt9O1xuICAgIHRoaXMuZmllbGRzID0ge307XG4gICAgdGhpcy5hbGwgPSB7fTtcbiAgICBhdmFsb24ubWl4KHRoaXMsIGF2YWxvbi5taXgodHJ1ZSwge30sIGRlZmF1bHRPcHRpb25zKSwgb3B0aW9ucylcbn1cblxuRm9ybS5wcm90b3R5cGUuc2V0RmllbGRzVmFsdWUgPSBmdW5jdGlvbiAoZmllbGRzKSB7XG4gICAgaWYgKCF0aGlzLmF1dG9Bc3luY0NoYW5nZSkge1xuICAgICAgICBPYmplY3Qua2V5cyhmaWVsZHMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHNldFZhbHVlKHRoaXMuY2FjaGVkUmVjb3JkLCBuYW1lLCBmaWVsZHNbbmFtZV0udmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIDtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhmaWVsZHMpLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgZmllbGQgPSBmaWVsZHNbbmFtZV07XG5cbiAgICAgICAgc2V0VmFsdWUodGhpcy5yZWNvcmQsIG5hbWUsIGZpZWxkLnZhbHVlKTtcblxuICAgICAgICBpZiAoIWZpZWxkLmRlbnlWYWxpZGF0ZSAmJiB0aGlzLmZpZWxkc1tuYW1lXSkge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUZpZWxkKG5hbWUsIHRoaXMuZmllbGRzW25hbWVdKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pc09rKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InICsgcmVzdWx0Lm5hbWUsIFtdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJyArIHJlc3VsdC5uYW1lLCBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVzdWx0Lm1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vbkZpZWxkc0NoYW5nZShmaWVsZHMsIHRoaXMucmVjb3JkKTtcbn1cblxuRm9ybS5wcm90b3R5cGUuYWRkRmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgdGhpcy5maWVsZHNbbmFtZV0gPSBmaWVsZHNbbmFtZV07XG4gICAgfSk7XG59XG5cbkZvcm0ucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKHR5cGU6IHN0cmluZywgbGlzdGVuZXIpIHtcbiAgICAodGhpcy5hbGxbdHlwZV0gfHwgKHRoaXMuYWxsW3R5cGVdID0gW10pKS5wdXNoKGxpc3RlbmVyKTtcbn1cblxuRm9ybS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uICh0eXBlOiBzdHJpbmcsIHBheWxvYWQpIHtcbiAgICAodGhpcy5hbGxbdHlwZV0gfHwgW10pLm1hcChoYW5kbGVyID0+IHsgaGFuZGxlcihwYXlsb2FkKSB9KTtcbn1cblxuRm9ybS5wcm90b3R5cGUudmFsaWRhdGVGaWVsZCA9IGFzeW5jIGZ1bmN0aW9uIChmaWVsZE5hbWUsIGZpZWxkKSB7XG4gICAgY29uc3QgcnVsZXMgPSBmaWVsZC5ydWxlcztcbiAgICBjb25zdCB2YWx1ZSA9IGdldFZhbHVlKHRoaXMucmVjb3JkLCBmaWVsZE5hbWUpO1xuICAgIGxldCByZXN1bHQ6IGFueSA9IHsgaXNPazogdHJ1ZSwgbmFtZTogZmllbGROYW1lIH07XG4gICAgaWYgKCFydWxlcykgcmV0dXJuIHJlc3VsdDtcbiAgICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgU2NoZW1hKHtcbiAgICAgICAgW2ZpZWxkTmFtZV06IHJ1bGVzXG4gICAgfSk7XG4gICAgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUoeyBbZmllbGROYW1lXTogdmFsdWUgfSwgKGVycm9ycywgZmllbGRzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgIGlzT2s6IGZhbHNlLCBuYW1lOiBmaWVsZE5hbWUsIG1lc3NhZ2U6IGVycm9yc1swXS5tZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBpc09rOiB0cnVlLCBuYW1lOiBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuRm9ybS5wcm90b3R5cGUudmFsaWRhdGVGaWVsZHMgPSBmdW5jdGlvbiAoZmllbGRzID0gdGhpcy5maWVsZHMpIHtcbiAgICBjb25zdCBmbGF0UmVjb3JkID0ge30sIHJ1bGVNYXAgPSB7fTtcbiAgICBpZiAoIXRoaXMuYXV0b0FzeW5jQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMucmVjb3JkID0gYXZhbG9uLm1peCh0cnVlLCB7fSwgdGhpcy5yZWNvcmQsIHRoaXMuY2FjaGVkUmVjb3JkKTtcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoZmllbGRzKS5tYXAobmFtZSA9PiB7XG4gICAgICAgIHJ1bGVNYXBbbmFtZV0gPSBmaWVsZHNbbmFtZV0ucnVsZXM7XG4gICAgICAgIGZsYXRSZWNvcmRbbmFtZV0gPSBnZXRWYWx1ZSh0aGlzLnJlY29yZCwgbmFtZSk7XG4gICAgfSk7XG4gICAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFNjaGVtYShydWxlTWFwKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB2YWxpZGF0b3IudmFsaWRhdGUoZmxhdFJlY29yZCwgKGVycm9ycywgZmllbGRzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvckZpZWxkcyA9IE9iamVjdC5rZXlzKGZpZWxkcyB8fCB7fSk7XG4gICAgICAgICAgICBsZXQgaXNBbGxWYWxpZCA9IHRydWU7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmZpZWxkcykubWFwKG5hbWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh+ZXJyb3JGaWVsZHMuaW5kZXhPZihuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0FsbFZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlcignZXJyb3InICsgbmFtZSwgZmllbGRzW25hbWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2Vycm9yJyArIG5hbWUsIFtdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc29sdmUoaXNBbGxWYWxpZCk7XG4gICAgICAgIH0pXG4gICAgfSk7XG59XG5cbkZvcm0ucHJvdG90eXBlLnJlc2V0RmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcyA9IHRoaXMuZmllbGRzKSB7XG4gICAgdGhpcy5yZWNvcmQgPSB7fTtcbiAgICB0aGlzLnRyaWdnZXIoJ3Jlc2V0JywgZmllbGRzKTtcbn1cblxuLyoqXG4gKiDmoLnmja7ooajovr7lvI/mnoTnu5nlr7nosaHotYvlgLzvvIzlsZ7mgKfot6/lvoTkuK3mnIDlpJrlj6rlhYHorrjlrZjlnKjkuIDkuKrmlbDnu4RcbiAqIEBwYXJhbSB7Kn0gcmVjb3JkIOaVsOaNruWvueixoVxuICogQHBhcmFtIHtTdHJpbmd9IGV4cHIg5a+56LGh5bGe5oCn6Lev5b6E6KGo6L6+5byPXG4gKiBAcGFyYW0geyp9IHZhbCDlgLxcbiAqL1xuZnVuY3Rpb24gc2V0VmFsdWUocmVjb3JkLCBleHByLCB2YWwpIHtcbiAgICBjb25zdCByU3BsaXQgPSAvXFwufFxcXS58XFxbfFxcXS87XG4gICAgbGV0IHRlbXAgPSByZWNvcmQsIHByb3A7XG4gICAgZXhwciA9IGV4cHIuc3BsaXQoclNwbGl0KS5maWx0ZXIocHJvcCA9PiAhIXByb3ApO1xuICAgIGNvbnN0IHZhbFR5cGUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKTtcbiAgICBsZXQgbWlycm9yVmFsO1xuICAgIGlmICh2YWxUeXBlID09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgbWlycm9yVmFsID0gYXZhbG9uLm1peCh0cnVlLCB7fSwgeyB0OiB2YWwgfSkudDtcbiAgICB9IGVsc2UgaWYgKHZhbFR5cGUgPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgICAgbWlycm9yVmFsID0gYXZhbG9uLm1peCh0cnVlLCB7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtaXJyb3JWYWwgPSB2YWw7XG4gICAgfVxuXG4gICAgd2hpbGUgKHByb3AgPSBleHByLnNoaWZ0KCkpIHtcbiAgICAgICAgaWYgKGV4cHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0ZW1wW3Byb3BdID0gbWlycm9yVmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGVtcCA9IHRlbXBbcHJvcF0gPSB0ZW1wW3Byb3BdIHx8IHt9O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIOagueaNruihqOi+vuW8j+aehOS7juWvueixoeWPluWAvO+8jOWxnuaAp+i3r+W+hOS4reacgOWkmuWPquWFgeiuuOWtmOWcqOS4gOS4quaVsOe7hFxuICogQHBhcmFtIHsqfSByZWNvcmQg5pWw5o2u5a+56LGhXG4gKiBAcGFyYW0ge1N0cmluZ30gZXhwciDlr7nosaHlsZ7mgKfot6/lvoTooajovr7lvI9cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUocmVjb3JkLCBleHByKSB7XG4gICAgY29uc3QgclNwbGl0ID0gL1xcLnxcXF0ufFxcW3xcXF0vO1xuICAgIGxldCB0ZW1wID0gcmVjb3JkLCBwcm9wO1xuICAgIGV4cHIgPSBleHByLnNwbGl0KHJTcGxpdCkuZmlsdGVyKHByb3AgPT4gISFwcm9wKTtcbiAgICB3aGlsZSAoKHByb3AgPSBleHByLnNoaWZ0KCkpICYmIHRlbXApIHtcbiAgICAgICAgdGVtcCA9IHRlbXBbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiB0ZW1wO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZm9ybS9jcmVhdGUtZm9ybS50cyIsImltcG9ydCAnLi9tcy1mb3JtJztcbmltcG9ydCAnLi9tcy1mb3JtLWl0ZW0nO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtZm9ybS9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCBjb250cm9sQ29tcG9uZW50IGZyb20gJy4uL21zLWZvcm0vbXMtY29udHJvbCc7XG5pbXBvcnQgeyBlbWl0VG9Gb3JtSXRlbSB9IGZyb20gJy4uL21zLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgZmluZFBhcmVudENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcblxuY29udHJvbENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtaW5wdXQnLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLWlucHV0Lmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgbWFwVmFsdWVUb1RleHQodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZW1pdFRvRm9ybUl0ZW0odGhpcyk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmFsdWUnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9UZXh0KHYpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB2IH0sXG4gICAgICAgICAgICAgICAgICAgIGRlbnlWYWxpZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoYW5nZWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1RleHQodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWlucHV0L21zLWlucHV0LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy1tZW51Jywge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLW1lbnUuaHRtbCcpLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIG1lbnU6IFtdLFxuICAgICAgICBzZWxlY3RlZEtleXM6IFtdLFxuICAgICAgICBvcGVuS2V5czogW10sXG4gICAgICAgIG9uQ2xpY2s6IGF2YWxvbi5ub29wLFxuICAgICAgICBvbk9wZW5DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBoYW5kbGVDbGljayhpdGVtLCBrZXksIGtleVBhdGgpIHtcbiAgICAgICAgICAgIGlmICghaXRlbS5jaGlsZHJlbiB8fCBpdGVtLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIOWPtuWtkOiKgueCuVxuICAgICAgICAgICAgICAgIC8vdGhpcy5zZWxlY3RlZEtleXMuZW5zdXJlKGl0ZW0ua2V5KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkS2V5cyA9IFtpdGVtLmtleV07XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGl0ZW0sIGtleSwga2V5UGF0aCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIOmdnuWPtuWtkOiKgueCuVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wZW5LZXlzLmNvbnRhaW5zKGl0ZW0ua2V5KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5LZXlzLnJlbW92ZShpdGVtLmtleSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuS2V5cy5wdXNoKGl0ZW0ua2V5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW5DaGFuZ2UodGhpcy5vcGVuS2V5cy50b0pTT04oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLW1lbnUvbXMtbWVudS50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCBjb250cm9sQ29tcG9uZW50IGZyb20gXCIuLi9tcy1mb3JtL21zLWNvbnRyb2xcIjtcbmltcG9ydCAnLi4vbXMtdHJpZ2dlcic7XG5cbmltcG9ydCB7IGdldENoaWxkVGVtcGxhdGVEZXNjcmlwdG9yLCBkZWJvdW5jZSB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcbmltcG9ydCB7IGVtaXRUb0Zvcm1JdGVtIH0gZnJvbSAnLi4vbXMtZm9ybS91dGlscyc7XG5cbmNvbnRyb2xDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLXNlbGVjdCcsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtc2VsZWN0Lmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB2YWx1ZTogW10sXG4gICAgICAgIG1vZGU6ICcnLFxuICAgICAgICBvcHRpb25zOiBbXSxcbiAgICAgICAgc2VsZWN0aW9uOiBbXSxcbiAgICAgICAgcmVtb3RlOiBmYWxzZSxcbiAgICAgICAgcmVtb3RlTWV0aG9kOiBhdmFsb24ubm9vcCxcblxuICAgICAgICAvLyDkuIvmi4nmoYblsZXnpLrlkozmk43kvZzpg6jliIZcbiAgICAgICAgZGlzcGxheVZhbHVlOiAnJyxcbiAgICAgICAgc2hvd1NlYXJjaDogZmFsc2UsXG4gICAgICAgIHNlYXJjaFZhbHVlOiAnJyxcbiAgICAgICAgZm9jdXNTZWFyY2goKSB7XG4gICAgICAgICAgICB0aGlzLiRlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLnNlYXJjaC5mb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICB3aXRoSW5Cb3goZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50ID09PSBlbCB8fCBhdmFsb24uY29udGFpbnModGhpcy4kZWxlbWVudCwgZWwpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRUYXJnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudDtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlQ2xpY2soZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBhbmVsVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoVmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsV2lkdGggPSB0aGlzLiRlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzU2VhcmNoKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVEZWxldGUoZSkge1xuICAgICAgICAgICAgaWYgKChlLndoaWNoID09PSA4IHx8IGUud2hpY2ggPT09IDQ2KSAmJiB0aGlzLnNlYXJjaFZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnJlbW92ZUF0KHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnRvSlNPTigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gc2VsZWN0aW9uLm1hcChzID0+IHMudmFsdWUpO1xuICAgICAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXS5zZWxlY3Rpb24gPSBzZWxlY3Rpb247XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHRoaXMuaXNNdWx0aXBsZSA/IHZhbHVlIDogdmFsdWVbMF0gfHwgJycgfSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NlbGVjdCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3ZlU2VsZWN0aW9uKGUsIG9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24ucmVtb3ZlQWxsKG8gPT4gby52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnRvSlNPTigpO1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBzZWxlY3Rpb24ubWFwKHMgPT4gcy52YWx1ZSk7XG4gICAgICAgICAgICBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF0uc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5mb2N1c1NlYXJjaCgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5pc011bHRpcGxlID8gdmFsdWUgOiB2YWx1ZVswXSB8fCAnJyB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvLyDkuIvmi4nmoYbkuIvmi4nliJfooajpg6jliIZcbiAgICAgICAgcGFuZWxXaWR0aDogMCxcbiAgICAgICAgcGFuZWxWbUlkOiAnJyxcbiAgICAgICAgcGFuZWxWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgcGFuZWxDbGFzczogJ2tvdW1laS1zZWxlY3QtZHJvcGRvd24nLFxuICAgICAgICBwYW5lbFRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXNlbGVjdC1wYW5lbC5odG1sJyksXG4gICAgICAgIGhhbmRsZVBhbmVsSGlkZSgpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH0sXG5cbiAgICAgICAgJGNvbXB1dGVkOiB7XG4gICAgICAgICAgICBpc011bHRpcGxlOiB7XG4gICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlID09PSAnbXVsdGlwbGUnIHx8IHRoaXMubW9kZSA9PT0gJ3RhZ3MnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIC8vIOeUn+WRveWRqOacn1xuICAgICAgICBtYXBWYWx1ZVRvU2VsZWN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMub3B0aW9ucy5maWx0ZXIobyA9PiB2YWx1ZS5jb250YWlucyhvLnZhbHVlKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5zZWxlY3Rpb25bMF0ubGFiZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF0uc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24udG9KU09OKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBnZXRDaGlsZFRlbXBsYXRlRGVzY3JpcHRvcih0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBnZXRPcHRpb25zKGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdi50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3Rpb24odik7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHRoaXMuaXNNdWx0aXBsZSA/IHZhbHVlIDogdmFsdWVbMF0gfHwgJycgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucGFuZWxWbUlkID0gdGhpcy4kaWQgKyAnX3BhbmVsJztcbiAgICAgICAgICAgIGNvbnN0IGlubmVyVm0gPSBhdmFsb24uZGVmaW5lKHtcbiAgICAgICAgICAgICAgICAkaWQ6IHRoaXMucGFuZWxWbUlkLFxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogW10sXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaXNNdWx0aXBsZTogdGhpcy5pc011bHRpcGxlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucy50b0pTT04oKSxcbiAgICAgICAgICAgICAgICBzZWFyY2hWYWx1ZTogJycsXG4gICAgICAgICAgICAgICAgZ2V0RmlsdGVyZWRPcHRpb25zKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmZpbHRlcih0aGlzLmZpbHRlckZuKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbHRlckZuKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5yZW1vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZyA9IG5ldyBSZWdFeHAoYXZhbG9uLmVzY2FwZVJlZ0V4cCh0aGlzLnNlYXJjaFZhbHVlKSwgJ2knKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZy50ZXN0KGVsLmxhYmVsKSB8fCByZWcudGVzdChlbC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoYW5kbGVPcHRpb25DbGljayhlLCBvcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmlzTXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbi5zb21lKG8gPT4gby52YWx1ZSA9PT0gb3B0aW9uLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnJlbW92ZUFsbChvID0+IG8udmFsdWUgPT09IG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnB1c2gob3B0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZm9jdXNTZWFyY2goKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gW29wdGlvbl07XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLnRvSlNPTigpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdGlvbi5tYXAocyA9PiBzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiBzZWxmLmlzTXVsdGlwbGUgPyB2YWx1ZSA6IHZhbHVlWzBdIHx8ICcnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc2VsZWN0J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwbGF5VmFsdWUgPSBvcHRpb24ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3NlYXJjaFZhbHVlJywgZGVib3VuY2UodiA9PiB7XG4gICAgICAgICAgICAgICAgaW5uZXJWbS5zZWFyY2hWYWx1ZSA9IHY7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVtb3RlICYmICEhdikge1xuICAgICAgICAgICAgICAgICAgICBpbm5lclZtLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZU1ldGhvZCh2KS50aGVuKG9wdGlvbnMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5uZXJWbS5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlubmVyVm0ub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdpc011bHRpcGxlJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgaW5uZXJWbS5pc011bHRpcGxlID0gdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvU2VsZWN0aW9uKHRoaXMudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2UoKSB7XG4gICAgICAgICAgICBkZWxldGUgYXZhbG9uLnZtb2RlbHNbdGhpcy5wYW5lbFZtSWRdO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldE9wdGlvbnMoZGVzY3JpcHRvcikge1xuICAgIHJldHVybiBkZXNjcmlwdG9yLnJlZHVjZSgoYWNjLCBvcHRpb24pID0+IHtcbiAgICAgICAgaWYgKG9wdGlvbi5pcyAhPSAnbXMtc2VsZWN0LW9wdGlvbicpIHJldHVybiBhY2M7XG4gICAgICAgIGxldCBsYWJlbCA9IG9wdGlvbi5pbmxpbmVUZW1wbGF0ZTtcbiAgICAgICAgYWNjLnB1c2goe1xuICAgICAgICAgICAgbGFiZWw6IG9wdGlvbi5pbmxpbmVUZW1wbGF0ZSB8fCAnJyxcbiAgICAgICAgICAgIHZhbHVlOiBvcHRpb24ucHJvcHMudmFsdWUgfHwgJycsXG4gICAgICAgICAgICBkaXNhYmxlZDogb3B0aW9uLnByb3BzLmRpc2FibGVkIHx8IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIFtdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3QudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgY29udHJvbENvbXBvbmVudCBmcm9tICcuLi9tcy1mb3JtL21zLWNvbnRyb2wnO1xuaW1wb3J0ICcuLi9tcy10cmlnZ2VyJztcbmltcG9ydCAnLi9tcy10aW1lcGlja2VyLXZpZXcnXG5pbXBvcnQgZ2V0UGFuZWxWbSBmcm9tICcuL21zLXRpbWVwaWNrZXItcGFuZWwnXG5pbXBvcnQgeyBlbWl0VG9Gb3JtSXRlbSB9IGZyb20gJy4uL21zLWZvcm0vdXRpbHMnO1xuXG4vKipcbiAqIOaXtumXtOmAieaLqee7hOS7tlxuICogQHByb3AgdmFsdWUg57uE5Lu25YC8KGluaGVyaXQpXG4gKiBAcHJvcCBjb2wg5a2X5q616Lev5b6EKGluaGVyaXQpXG4gKiBAcHJvcCBmb3JtYXQg5pel5pyf5qC85byP77yM5Y+C6ICDIG1vbWVudGpz77yM6buY6K6k5Li6IEhIOm1tOnNzXG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGAgaHRtbFxuICogXG4gKiBgYGBcbiAqL1xuY29udHJvbENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtdGltZXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdGltZXBpY2tlci5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgc2VsZWN0ZWQ6ICcnLFxuICAgICAgICBmb3JtYXQ6ICdISDptbTpzcycsXG4gICAgICAgIGNsZWFyKCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9ICcnO1xuICAgICAgICAgICAgYXZhbG9uLnZtb2RlbHNbdGhpcy5wYW5lbFZtSWRdLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiAnJyB9LFxuICAgICAgICAgICAgICAgIHR5cGU6ICd0aW1lcGlja2VyLWNoYW5nZWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgd2l0aEluQm94KGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZWxlbWVudCA9PT0gZWwgfHwgYXZhbG9uLmNvbnRhaW5zKHRoaXMuJGVsZW1lbnQsIGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGFyZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZUNsaWNrKGUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wYW5lbFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBhdmFsb24udm1vZGVsc1t0aGlzLnBhbmVsVm1JZF0ucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMucGFuZWxWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFuZWxWbUlkOiAnJyxcbiAgICAgICAgcGFuZWxWaXNpYmxlOiBmYWxzZSxcbiAgICAgICAgcGFuZWxDbGFzczogJ2tvdW1laS10aW1lcGlja2VyLXBhbmVsLWNvbnRhaW5lcicsXG4gICAgICAgIHBhbmVsVGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwia291bWVpLXRpbWVwaWNrZXItcGFuZWxcIiBzdHlsZT1cIm92ZXJmbG93OiBhdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHhtcCBpcz1cIm1zLXRpbWVwaWNrZXItdmlld1wiIDp3aWRnZXQ9XCJ7dmFsdWU6QGN1cnJlbnREYXRlQXJyYXksb25DaGFuZ2U6QGhhbmRsZVRpbWVwaWNrZXJDaGFuZ2V9XCI+PC94bXA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gLFxuICAgICAgICBoYW5kbGVQYW5lbEhpZGUoKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIG1hcFZhbHVlVG9TZWxlY3RlZCh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgc2hvd0ljb246IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1NlbGVjdGVkKHYpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7IHZhbHVlOiB2IH0sXG4gICAgICAgICAgICAgICAgICAgIGRlbnlWYWxpZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RpbWVwaWNrZXItY2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5wYW5lbFZtSWQgPSB0aGlzLiRpZCArICdfcGFuZWwnO1xuICAgICAgICAgICAgY29uc3QgaW5uZXJWbSA9IGdldFBhbmVsVm0odGhpcyk7XG4gICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9TZWxlY3RlZCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGlubmVyVm0ucmVzZXQoKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKCkge1xuICAgICAgICAgICAgZGVsZXRlIGF2YWxvbi52bW9kZWxzW3RoaXMucGFuZWxWbUlkXTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG5sZXQgdHJlZUlEID0gMDtcbmF2YWxvbi5jb21wb25lbnQoJ21zLXRyZWUnLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtdHJlZS5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdHJlZTogW10sXG4gICAgICAgIHJlbmRlclN1YlRyZWU6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgcmV0dXJuICBlbC5zdWJ0cmVlLmxlbmd0aCA/ICc8d2JyIDp3aWRnZXQ9XCJ7aXM6XFwnbXMtdHJlZVxcJywkaWQ6XFwndHJlZV8nICsgKCsrdHJlZUlEKSArICdcXCcsIHRyZWU6IGVsLnN1YnRyZWV9XCIgLz4nIDogJydcbiAgICAgICAgfSxcbiAgICAgICAgb3BlblN1YlRyZWU6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgZWwub3BlbiA9ICFlbC5vcGVuXG4gICAgICAgIH0sXG4gICAgICAgIGNoYW5nZUljb246IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsLm9wZW4gJiYgZWwuc3VidHJlZS5sZW5ndGggPyAnZmEtY2FyZXQtZG93bicgOiAnZmEtY2FyZXQtcmlnaHQnO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10cmVlL21zLXRyZWUudHMiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxuXG5pbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgY29udHJvbENvbXBvbmVudCBmcm9tICcuLi9tcy1mb3JtL21zLWNvbnRyb2wnO1xuaW1wb3J0IHsgZW1pdFRvRm9ybUl0ZW0gfSBmcm9tICcuLi9tcy1mb3JtL3V0aWxzJztcbmltcG9ydCAnLi9tcy11cGxvYWQtbGlzdCc7XG5pbXBvcnQgJy4vbXMtdXBsb2FkLWNhcmQnO1xuaW1wb3J0IFVwbG9hZGVyIGZyb20gJ2tvdW1laS1maWxldXAtbG9hZGVyJztcblxuLyoqXG4gKiDmlofku7bkuIrkvKDnu4Tku7ZcbiAqIEBwcm9wIHZhbHVlIOe7hOS7tuWAvChpbmhlcml0KVxuICogQHByb3AgY29sIOWtl+autei3r+W+hChpbmhlcml0KVxuICogXG4gKiBAZXhhbXBsZVxuICogYGBgIGh0bWxcbiAqIDxtcy11cGxvYWQgOndpZGdldD1cInt2YWx1ZTpAcmVjb3JkLmF0dGFjaG1lbnQsY29sOidhdHRhY2htZW50JywkcnVsZXM6e3JlcXVpcmVkOnRydWUsdHlwZTonYXJyYXknfX1cIj5cbiAqICAgICAgPGkgY2xhc3M9XCJmYSBmYS11cGxvYWRcIj48L2k+6YCJ5oup6ZmE5Lu2XG4gKiA8L21zLXVwbG9hZD5cbiAqIGBgYFxuICovXG5jb250cm9sQ29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy11cGxvYWQnLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXVwbG9hZC5odG1sJyksXG4gICAgc29sZVNsb3Q6ICd0cmlnZ2VyJyxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBoZWxwSWQ6ICcnLFxuICAgICAgICB0cmlnZ2VyOiAnJyxcbiAgICAgICAgdmFsdWU6IFtdLFxuICAgICAgICBmaWxlTGlzdDogW10sXG4gICAgICAgIGFjdGlvbjogJycsXG4gICAgICAgIGxpc3RUeXBlOiAndGV4dC1saXN0JyxcbiAgICAgICAgc2hvd1VwbG9hZExpc3Q6IHRydWUsXG4gICAgICAgIGJ0bkNsYXNzOiAnYnRuIGJ0bi1kZWZhdWx0JyxcbiAgICAgICAgY2FyZENsYXNzOiAna291bWVpLXVwbG9hZC1zZWxlY3QtY2FyZCBrb3VtZWktdXBsb2FkLWNhcmQtaXRlbScsXG4gICAgICAgIGJsYW5rSW1nOiAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUJBUC8vL3dBQUFDSDVCQUVLQUFFQUxBQUFBQUFCQUFFQUFBSUNUQUVBT3c9PScsXG4gICAgICAgICR1cGxvYWRlcjogbnVsbCxcbiAgICAgICAgYmVmb3JlVXBsb2FkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZVJlbW92ZShmaWxlKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnJlbW92ZUFsbChmID0+IGYudWlkID09PSBmaWxlLnVpZCk7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZmlsZUxpc3QuZmlsdGVyKGYgPT4gZi5zdGF0dXMgPT09ICdkb25lJykubWFwKGYgPT4gZi51cmwpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5zaG93VXBsb2FkTGlzdCA/IHZhbHVlIDogdmFsdWVbMF0gfSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZmlsZS11cGxvYWQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbWFwVmFsdWVUb0ZpbGVMaXN0KHZhbHVlKSB7XG4gICAgICAgICAgICB2YWx1ZS5tYXAoKHVybCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh1cmwgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdWlkOiAtKGkgKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdXJsLnJlcGxhY2UoLy4qXFwvKFteXFwvXSspXFwvPy8sICckMScpLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiAnZG9uZScsXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaGVscElkID0gdGhpcy4kaWQ7XG4gICAgICAgICAgICB0aGlzLm1hcFZhbHVlVG9GaWxlTGlzdCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHYudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb0ZpbGVMaXN0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogdGhpcy5zaG93VXBsb2FkTGlzdCA/IHZhbHVlIDogdmFsdWVbMF0gfSxcbiAgICAgICAgICAgICAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmlsZS11cGxvYWQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICAgICAgdGhpcy4kdXBsb2FkZXIgPSBVcGxvYWRlci5pbml0KHtcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYWN0aW9uLFxuICAgICAgICAgICAgICAgIGZpbGVJbnB1dDogZXZlbnQudGFyZ2V0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLmZpbGUsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiAoZmlsZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8g5aaC5p6c5LiN5pSv5oyB5Zu+54mH5L+h5oGv55qE6aKE6KeI77yM5YiZ5LiN6L+b6KGM6L+H5ruk5ZKM6ZmQ5Yi2XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlcy5maWx0ZXIoZmlsZSA9PiAhZmlsZS5zaXplIHx8IHRoaXMuYmVmb3JlVXBsb2FkKGZpbGUpKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uU2VsZWN0OiAoZmlsZXMsIGFsbEZpbGVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFsbEZpbGVzLm1hcChmaWxlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5zaG93VXBsb2FkTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZUxpc3Quc2V0KDAsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlkOiBmaWxlLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogJ3VwbG9hZGluZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHRoaXMuYmxhbmtJbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWxlTGlzdC5ldmVyeShmID0+IGYudWlkICE9PSBmaWxlLmluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpZDogZmlsZS5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXM6ICd1cGxvYWRpbmcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB0aGlzLmJsYW5rSW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbGVPYmoodGhpcy5maWxlTGlzdCwgZmlsZS5pbmRleCwgZiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYuc3RhdHVzID0gJ3VwbG9hZGluZyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdXBsb2FkZXIudXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzOiAoZmlsZSwgbG9hZGVkLCB0b3RhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVGaWxlT2JqKHRoaXMuZmlsZUxpc3QsIGZpbGUuaW5kZXgsIGYgPT4gZi5wcm9ncmVzcyA9IChsb2FkZWQgLyB0b3RhbCAqIDEwMCkudG9GaXhlZCgpKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uU3VjY2VzczogKGZpbGUsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbGVPYmoodGhpcy5maWxlTGlzdCwgZmlsZS5pbmRleCwgZiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmLnN0YXR1cyA9ICdkb25lJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGYucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmLnVybCA9IHJlc3BvbnNlLnVybDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkZhaWx1cmU6IChmaWxlLCBlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsZU9iaih0aGlzLmZpbGVMaXN0LCBmaWxlLmluZGV4LCBmID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGYudXJsID0gJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxNQT09JztcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuZmlsZUxpc3QuZmlsdGVyKGYgPT4gZi5zdGF0dXMgPT09ICdkb25lJykubWFwKGYgPT4gZi51cmwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHRoaXMuc2hvd1VwbG9hZExpc3QgPyB2YWx1ZSA6IHZhbHVlWzBdIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmlsZS11cGxvYWQnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkRpc3Bvc2UoZXZlbnQpIHtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiB1cGRhdGVGaWxlT2JqKGZpbGVMaXN0LCB1aWQsIGNhbGxiYWNrKSB7XG4gICAgZmlsZUxpc3QuZm9yRWFjaChmID0+IHtcbiAgICAgICAgaWYgKGYudWlkID09PSB1aWQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGYpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLnRzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtbG9hZGluZy9tcy1sb2FkaW5nLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIwMlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCAnLi4vbXMtc2VsZWN0JztcbmltcG9ydCAnLi9tcy1jYWxlbmRhci15ZWFyLXZpZXcnO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy1jYWxlbmRhcicsIHtcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy1jYWxlbmRhci5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAkdmFsdWU6IG51bGwsXG4gICAgICAgICRzZWxlY3RlZDogbnVsbCxcbiAgICAgICAgd2Vla1N0YXJ0OiAwLFxuICAgICAgICBzaG93SGVhZGVyOiB0cnVlLFxuICAgICAgICBkaXNhYmxlZERhdGUoKSB7IHJldHVybiBmYWxzZTsgfSxcbiAgICAgICAgXG4gICAgICAgIGN1cnJlbnRNb250aDogJycsXG4gICAgICAgIGN1cnJlbnRZZWFyOiAwLFxuICAgICAgICB3ZWVrZGF5czogW10sXG4gICAgICAgIGN1cnJlbnRZZWFyT3B0aW9uczogW10sXG4gICAgICAgIG1vbnRoT3B0aW9uczogW10sXG4gICAgICAgIHRhYmxlOiBbXSxcbiAgICAgICAgaGFuZGxlWWVhckNoYW5nZShlKSB7XG4gICAgICAgICAgICB0aGlzLiR2YWx1ZS55ZWFyKGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgdGhpcy5jYWxjVGFibGUodGhpcy4kdmFsdWUuY2xvbmUoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZU1vbnRoQ2hhbmdlKGUpIHtcbiAgICAgICAgICAgIHRoaXMuJHZhbHVlLm1vbnRoKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY1RhYmxlKHRoaXMuJHZhbHVlLmNsb25lKCkpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVEYXRlQ2xpY2soZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJHNlbGVjdGVkLnllYXIodGhpcy5jdXJyZW50WWVhcikubW9udGgodGhpcy5jdXJyZW50TW9udGgpLmRhdGUoZWwuZGF0ZSk7XG4gICAgICAgICAgICBpZiAoZWwucHJldk1vbnRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2VsZWN0ZWQuc3VidHJhY3QoMSwgJ21vbnRocycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVsLm5leHRNb250aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNlbGVjdGVkLmFkZCgxLCAnbW9udGhzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiR2YWx1ZSA9IHRoaXMuJHNlbGVjdGVkO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLiRzZWxlY3RlZC5jbG9uZSgpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiAnY2FsZW5kYXItY2hhbmdlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8g5piv5ZCm5pyJ5b+F6KaB5YaN6K6h566X5pu05paw5LiA5qyh77yfXG4gICAgICAgICAgICB0aGlzLmNhbGNUYWJsZSh0aGlzLiR2YWx1ZS5jbG9uZSgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBjYWxjVGFibGUobTogbW9tZW50Lk1vbWVudCkge1xuICAgICAgICAgICAgbGV0IGksIGo7XG4gICAgICAgICAgICAvLyDov5nkuKrmnIjnmoTnrKzkuIDlpKlcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RGF5T2ZNb250aCA9IG0uY2xvbmUoKS5zdGFydE9mKCdtb250aCcpO1xuICAgICAgICAgICAgLy8g6L+Z5Liq5pyI55qE5pyA5ZCO5LiA5aSpXG4gICAgICAgICAgICBjb25zdCBsYXN0RGF5T2ZNb250aCA9IG0uY2xvbmUoKS5lbmRPZignbW9udGgnKTtcbiAgICAgICAgICAgIC8vIOS4iuS4quaciOeahOacgOWQjuS4gOWkqVxuICAgICAgICAgICAgY29uc3QgbGFzdERheU9mUHJldk1vbnRoID0gZmlyc3REYXlPZk1vbnRoLmNsb25lKCkuc3VidHJhY3QoMSwgJ2RheXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0RGF5ID0gKGZpcnN0RGF5T2ZNb250aC5kYXkoKSAtIHRoaXMud2Vla1N0YXJ0ICsgNykgJSA3O1xuICAgICAgICAgICAgY29uc3QgcHJldkxhc3REYXRlID0gbGFzdERheU9mUHJldk1vbnRoLmRhdGUoKTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3REYXRlID0gbGFzdERheU9mTW9udGguZGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgdGFibGUgPSBbXTtcbiAgICAgICAgICAgIGxldCBwYXNzZWQgPSAwO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlUm93ID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwcmV2TW9udGggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRNb250aCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCAmJiBqIDwgZmlyc3REYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS4iuaciOe7k+adn+mDqOWIhlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci1wcmV2LW1vbnRoLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZNb250aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGUoK20uY2xvbmUoKS5zdWJ0cmFjdCgxLCAnbW9udGhzJykuZGF0ZShwcmV2TGFzdERhdGUgLSBmaXJzdERheSArIGogKyAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci1kaXNhYmxlZC1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZVJvdy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldk1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRNb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBwcmV2TGFzdERhdGUgLSBmaXJzdERheSArIGogKyAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXNzZWQgKyAxID4gbGFzdERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS4i+aciOW8gOWni+mDqOWIhlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci1uZXh0LW1vbnRoLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRNb250aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGUoK20uY2xvbmUoKS5hZGQoMSwgJ21vbnRocycpLmRhdGUocGFzc2VkICsgMSAtIGxhc3REYXRlKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci1kaXNhYmxlZC1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJsZVJvdy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldk1vbnRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRNb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiArK3Bhc3NlZCAtIGxhc3REYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOacrOaciOmDqOWIhlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1vbWVudCgpLmlzU2FtZShtLmNsb25lKCkuZGF0ZShwYXNzZWQgKyAxKSwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci10b2RheScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuJHNlbGVjdGVkLmlzU2FtZShtLmNsb25lKCkuZGF0ZShwYXNzZWQgKyAxKSwgJ2RheScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLnB1c2goJ2tvdW1laS1jYWxlbmRhci1zZWxlY3RlZC1kYXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkRGF0ZSgrbS5jbG9uZSgpLmRhdGUocGFzc2VkICsgMSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZS5wdXNoKCdrb3VtZWktY2FsZW5kYXItZGlzYWJsZWQtY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVSb3cucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZNb250aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0TW9udGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogKytwYXNzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYmxlLnB1c2godGFibGVSb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TW9udGggPSBtLmZvcm1hdCgnTU1NJyk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyID0gbS55ZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRZZWFyT3B0aW9ucyA9IGF2YWxvbi5yYW5nZSh0aGlzLmN1cnJlbnRZZWFyIC0gMTAsIHRoaXMuY3VycmVudFllYXIgKyA5KS5tYXAoeSA9PiAoeyBsYWJlbDogeSwgdmFsdWU6IHkgfSkpO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJHZhbHVlID0gbW9tZW50KCk7XG4gICAgICAgICAgICB0aGlzLiRzZWxlY3RlZCA9IG1vbWVudCgpO1xuICAgICAgICAgICAgY29uc3Qgd2Vla2RheXMgPSBtb21lbnQubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKCk7XG4gICAgICAgICAgICBhdmFsb24ucmFuZ2UodGhpcy53ZWVrU3RhcnQpLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICAgICAgd2Vla2RheXMucHVzaCh3ZWVrZGF5cy5zaGlmdCgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLndlZWtkYXlzID0gd2Vla2RheXM7XG4gICAgICAgICAgICBjb25zdCBtb250aExpc3QgPSBtb21lbnQubG9jYWxlRGF0YSgpLm1vbnRoc1Nob3J0KCk7XG4gICAgICAgICAgICB0aGlzLm1vbnRoT3B0aW9ucyA9IG1vbnRoTGlzdC5tYXAobSA9PiAoeyBsYWJlbDogbSwgdmFsdWU6IG0gfSkpO1xuICAgICAgICAgICAgdGhpcy5jYWxjVGFibGUodGhpcy4kdmFsdWUuY2xvbmUoKSk7XG5cbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLiR2YWx1ZS50b0FycmF5KCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHZhbHVlID0gdGhpcy4kc2VsZWN0ZWQgPSBtb21lbnQodi5zcGxpdCgnLCcpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGNUYWJsZSh0aGlzLiR2YWx1ZS5jbG9uZSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1jYWxlbmRhci9tcy1jYWxlbmRhci50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAqIGFzIGJvb3Rib3ggZnJvbSAnYm9vdGJveCc7XG5pbXBvcnQgeyBwYXJzZVNsb3RUb1ZNb2RlbCB9IGZyb20gJy4uLy4uL2tvdW1laS11dGlsJztcbmltcG9ydCAqIGFzICQgZnJvbSAnanF1ZXJ5JztcblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtZGlhbG9nJywge1xuICAgIHRlbXBsYXRlOiAnPGRpdiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIj48c2xvdCBuYW1lPVwiaGVhZGVyXCIgLz48c2xvdCBuYW1lPVwiYm9keVwiLz48L2Rpdj4nLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGJvZHk6ICdibGFuaycsXG4gICAgICAgICRkaWFsb2c6IG51bGwsXG4gICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICBzaXplOiAnJyxcbiAgICAgICAgdXBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgJGlubmVyVm06ICcnLFxuICAgICAgICBvbk9rKCkge30sXG4gICAgICAgIG9uQ2FuY2VsKCkge30sXG4gICAgICAgIG9uSW5pdChldmVudCkge1xuICAgICAgICAgICAgdmFyIHZtID0gZXZlbnQudm1vZGVsO1xuICAgICAgICAgICAgdm0uJHdhdGNoKCdzaG93JywgKG5ld1YpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV3Vikge1xuICAgICAgICAgICAgICAgICAgICB2bS4kZGlhbG9nID0gYm9vdGJveC5kaWFsb2coe1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogdm0uYm9keSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAne3t0aXRsZX19JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHZtLnNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ+S/neWtmCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1wcmltYXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5vbk9rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmNlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ+WPlua2iCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J0bi1kZWZhdWx0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5vbkNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KS5vbignaGlkZGVuLmJzLm1vZGFsJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKCcubW9kYWwuaW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdzaG93bi5icy5tb2RhbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdm0uJGRpYWxvZy5maW5kKCcubW9kYWwtY29udGVudCcpLmF0dHIoJzpjb250cm9sbGVyJywgdGhpcy4kaW5uZXJWbSk7XG4gICAgICAgICAgICAgICAgICAgIGF2YWxvbi5zY2FuKHZtLiRkaWFsb2cuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodm0uJGRpYWxvZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0uJGRpYWxvZy5maW5kKCcuYm9vdGJveC1jbG9zZS1idXR0b24nKS50cmlnZ2VyKCdjbGljaycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgICAgIHBhcnNlU2xvdFRvVk1vZGVsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5zaG93ICYmIHRoaXMuJGZpcmUoJ3Nob3cnLCB0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKGV2ZW50KSB7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWRpYWxvZy9tcy1kaWFsb2cudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgeyBmaW5kUGFyZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy1mb3JtJywge1xuICAgIHRlbXBsYXRlOiBgPGZvcm0gcm9sZT1cImZvcm1cIiA6Y2xhc3M9XCJbKEBob3Jpem9udGFsID8gJ2Zvcm0taG9yaXpvbnRhbCcgOiAnJyksIChAaW5saW5lID8gJ2Zvcm0taW5saW5lJyA6ICcnKV1cIj48c2xvdCAvPjwvZm9ybT5gLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGl0ZW1zOiAnJyxcbiAgICAgICAgJGZvcm06IG51bGwsXG4gICAgICAgIHR5cGU6ICcnLFxuICAgICAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICAgICAgb25Gb3JtQ2hhbmdlKG1ldGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRmb3JtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgICAgIFttZXRhLm5hbWVdOiB7IHZhbHVlOiBtZXRhLnZhbHVlIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuX2N0eXBlXyA9ICdtcy1mb3JtJztcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5fdm1fID0gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzb2xlU2xvdDogJ2l0ZW1zJ1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy1mb3JtL21zLWZvcm0udHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbmNvbnN0IGxheW91dENvbXBvbmVudCA9IGF2YWxvbi5jb21wb25lbnQoJ21zLWxheW91dCcsIHtcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJrb3VtZWktbGF5b3V0XCIgOmNzcz1cIkBzdHlsZVwiIDpjbGFzcz1cIkBjbGFzc05hbWVcIj48c2xvdCAvPjwvZGl2PmAsXG4gICAgc29sZVNsb3Q6ICdzbG90JyxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBzdHlsZToge30sXG4gICAgICAgIGNsYXNzTmFtZTogJydcbiAgICB9XG59KTtcblxubGF5b3V0Q29tcG9uZW50LmV4dGVuZCh7XG4gICAgZGlzcGxheU5hbWU6ICdtcy1sYXlvdXQtc2lkZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtvdW1laS1sYXlvdXQtc2lkZXJcIiA6Y3NzPVwiQHN0eWxlXCIgOmNsYXNzPVwiQGNsYXNzTmFtZVwiIDpjbGFzcy0xPVwiW0BmaXhlZD8na291bWVpLWxheW91dC1maXhlZC1zaWRlcic6JyddXCI+PGRpdiBjbGFzcz1cImtvdW1laS1sYXlvdXQtc2lkZXItaW5uZXJcIj48c2xvdCAvPjwvZGl2PjwvZGl2PmAsXG4gICAgc29sZVNsb3Q6ICdzbG90JyxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBmaXhlZDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAnMzAwcHgnXG4gICAgfVxufSk7XG5cbmxheW91dENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtbGF5b3V0LWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwia291bWVpLWxheW91dC1oZWFkZXJcIiA6Y3NzPVwiQHN0eWxlXCIgOmNsYXNzPVwiQGNsYXNzTmFtZVwiIDpjbGFzcy0xPVwiW0BmaXhlZD8na291bWVpLWxheW91dC1maXhlZC1oZWFkZXInOicnXVwiPjxzbG90IC8+PC9kaXY+YCxcbiAgICBzb2xlU2xvdDogJ3Nsb3QnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGZpeGVkOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6ICc2NXB4J1xuICAgIH1cbn0pO1xuXG5sYXlvdXRDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLWxheW91dC1jb250ZW50JyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJrb3VtZWktbGF5b3V0LWNvbnRlbnRcIiA6Y3NzPVwiQHN0eWxlXCIgOmNsYXNzPVwiQGNsYXNzTmFtZVwiPjxzbG90IC8+PC9kaXY+YCxcbiAgICBzb2xlU2xvdDogJ3Nsb3QnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGZpeGVkOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5sYXlvdXRDb21wb25lbnQuZXh0ZW5kKHtcbiAgICBkaXNwbGF5TmFtZTogJ21zLWxheW91dC1mb290ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImtvdW1laS1sYXlvdXQtZm9vdGVyXCIgOmNzcz1cIkBzdHlsZVwiIDpjbGFzcz1cIkBjbGFzc05hbWVcIiA6Y2xhc3MtMT1cIltAZml4ZWQ/J2tvdW1laS1sYXlvdXQtZml4ZWQtZm9vdGVyJzonJ11cIj48c2xvdCAvPjwvZGl2PmAsXG4gICAgc29sZVNsb3Q6ICdzbG90JyxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBmaXhlZDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAnNTVweCdcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWxheW91dC9tcy1sYXlvdXQudHMiLCJpbXBvcnQgKiBhcyBub3R5IGZyb20gJ25vdHknO1xuXG50eXBlIG1lc3NhZ2VBcmdzID0ge1xuICAgIGNvbnRlbnQ6IHN0cmluZyxcbiAgICBkdXJhdGlvbj86IG51bWJlclxufTtcblxubGV0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGR1cmF0aW9uOiAxNTAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5mbyh7IGNvbnRlbnQsIGR1cmF0aW9uIH06IG1lc3NhZ2VBcmdzKTogdm9pZCB7XG4gICAgICAgIG5vdHkoe1xuICAgICAgICAgICAgdGV4dDogJzxpIGNsYXNzPVwiZmEgZmEtaW5mby1jaXJjbGVcIj48L2k+JyArIGNvbnRlbnQsXG4gICAgICAgICAgICB0eXBlOiAnaW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgbGF5b3V0OiAndG9wQ2VudGVyJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IGR1cmF0aW9uIHx8IGRlZmF1bHRPcHRpb25zLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc3VjY2Vzcyh7IGNvbnRlbnQsIGR1cmF0aW9ufTogbWVzc2FnZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiAnPGkgY2xhc3M9XCJmYSBmYS1jaGVjay1jaXJjbGVcIj48L2k+JyArIGNvbnRlbnQsXG4gICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBsYXlvdXQ6ICd0b3BDZW50ZXInLFxuICAgICAgICAgICAgdGltZW91dDogZHVyYXRpb24gfHwgZGVmYXVsdE9wdGlvbnMuZHVyYXRpb25cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBlcnJvcih7IGNvbnRlbnQsIGR1cmF0aW9ufTogbWVzc2FnZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiAnPGkgY2xhc3M9XCJmYSBmYS10aW1lcy1jaXJjbGVcIj48L2k+JyArIGNvbnRlbnQsXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgICAgbGF5b3V0OiAndG9wQ2VudGVyJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IGR1cmF0aW9uIHx8IGRlZmF1bHRPcHRpb25zLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgd2FybmluZyh7IGNvbnRlbnQsIGR1cmF0aW9ufTogbWVzc2FnZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiAnPGkgY2xhc3M9XCJmYSBmYS13YXJuaW5nXCI+PC9pPicgKyBjb250ZW50LFxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgbGF5b3V0OiAndG9wQ2VudGVyJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IGR1cmF0aW9uIHx8IGRlZmF1bHRPcHRpb25zLmR1cmF0aW9uXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgd2Fybih7IGNvbnRlbnQsIGR1cmF0aW9ufTogbWVzc2FnZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YXJuaW5nKHsgY29udGVudCwgZHVyYXRpb24gfSk7XG4gICAgfSxcbiAgICBjb25maWcob3B0aW9uczogbWVzc2FnZUFyZ3MpOiB2b2lkIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZHVyYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLW1lc3NhZ2UvbXMtbWVzc2FnZS50cyIsImltcG9ydCAqIGFzIG5vdHkgZnJvbSAnbm90eSc7XG5cbnR5cGUgbm90aWZpY2F0aW9uQXJncyA9IHtcbiAgICAvKipcbiAgICAgKiDpgJrnn6XmraPmlodcbiAgICAgKi9cbiAgICBtZXNzYWdlOiBzdHJpbmcsXG4gICAgLyoqXG4gICAgICog6YCa55+l5qCH6aKYXG4gICAgICovXG4gICAgdGl0bGU/OiBzdHJpbmcsXG4gICAgLyoqXG4gICAgICog5rKh5pyJ55So5oi35pON5L2c55qE5oOF5Ya15LiL6YCa55+l5L+d5oyB5pi+56S655qE5pe26Ze077yI5q+r56eS77yJ77yM6buY6K6k5Li6IDUwMDBtc1xuICAgICAqL1xuICAgIHRpbWVvdXQ/OiBudW1iZXJcbn07XG5cbmxldCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICB0aW1lb3V0OiAzMDAwXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5mbyh7IG1lc3NhZ2UsIHRpdGxlLCB0aW1lb3V0IH06IG5vdGlmaWNhdGlvbkFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiB0ZW1wbGF0ZSh0aXRsZSwgbWVzc2FnZSwgJ2ZhIGZhLWluZm8tY2lyY2xlJyksXG4gICAgICAgICAgICB0eXBlOiAnaW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgdGltZW91dDogdGltZW91dCB8fCBkZWZhdWx0T3B0aW9ucy50aW1lb3V0XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgc3VjY2Vzcyh7IG1lc3NhZ2UsIHRpdGxlLCB0aW1lb3V0IH06IG5vdGlmaWNhdGlvbkFyZ3MpOiB2b2lkIHtcbiAgICAgICAgbm90eSh7XG4gICAgICAgICAgICB0ZXh0OiB0ZW1wbGF0ZSh0aXRsZSwgbWVzc2FnZSwgJ2ZhIGZhLWNoZWNrLWNpcmNsZScpLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgdGltZW91dDogdGltZW91dCB8fCBkZWZhdWx0T3B0aW9ucy50aW1lb3V0XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZXJyb3IoeyBtZXNzYWdlLCB0aXRsZSwgdGltZW91dCB9OiBub3RpZmljYXRpb25BcmdzKTogdm9pZCB7XG4gICAgICAgIG5vdHkoe1xuICAgICAgICAgICAgdGV4dDogdGVtcGxhdGUodGl0bGUsIG1lc3NhZ2UsICdmYSBmYS10aW1lcy1jaXJjbGUnKSxcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICB0aW1lb3V0OiB0aW1lb3V0IHx8IGRlZmF1bHRPcHRpb25zLnRpbWVvdXRcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICB3YXJuaW5nKHsgbWVzc2FnZSwgdGl0bGUsIHRpbWVvdXQgfTogbm90aWZpY2F0aW9uQXJncyk6IHZvaWQge1xuICAgICAgICBub3R5KHtcbiAgICAgICAgICAgIHRleHQ6IHRlbXBsYXRlKHRpdGxlLCBtZXNzYWdlLCAnZmEgZmEtd2FybmluZycpLFxuICAgICAgICAgICAgdHlwZTogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgdGltZW91dDogdGltZW91dCB8fCBkZWZhdWx0T3B0aW9ucy50aW1lb3V0XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgd2Fybih7IG1lc3NhZ2UsIHRpdGxlLCB0aW1lb3V0IH06IG5vdGlmaWNhdGlvbkFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy53YXJuaW5nKHsgbWVzc2FnZSwgdGl0bGUsIHRpbWVvdXQgfSk7XG4gICAgfSxcbiAgICBjb25maWcob3B0aW9uczogbm90aWZpY2F0aW9uQXJncyk6IHZvaWQge1xuICAgICAgICBpZiAob3B0aW9ucy50aW1lb3V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiB0ZW1wbGF0ZSh0aXRsZTogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIGljb246IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGl0bGUgPSB0aXRsZSA/IGA8c3Ryb25nPiR7dGl0bGV9PC9zdHJvbmc+PGJyPmAgOiAnJztcbiAgICByZXR1cm4gYDxkaXY+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIke2ljb259IHB1bGwtbGVmdFwiIHN0eWxlPVwiZm9udC1zaXplOiAzOHB4O21pbi13aWR0aDogMzhweDt0ZXh0LWFsaWduOiBjZW50ZXI7XCI+PC9pPlxuICAgICAgICAgICAgICAgICR7dGl0bGV9XG4gICAgICAgICAgICAgICAgJHttZXNzYWdlfVxuICAgICAgICAgICAgPC9kaXY+YDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLW5vdGlmaWNhdGlvbi9tcy1ub3RpZmljYXRpb24udHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgJy4uL21zLWNoZWNrYm94L21zLWNoZWNrYm94JztcbmltcG9ydCAnLi9tcy10YWJsZS1oZWFkZXInXG5pbXBvcnQgJy4uL21zLXBhZ2luYXRpb24vbXMtcGFnaW5hdGlvbic7XG5pbXBvcnQge1xuICAgIGZpbmRQYXJlbnRDb21wb25lbnQsXG4gICAgcGFyc2VTbG90VG9WTW9kZWwsXG4gICAgZ2V0Q2hpbGRUZW1wbGF0ZURlc2NyaXB0b3Jcbn0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuaW1wb3J0ICcuLi9tcy1sb2FkaW5nJztcblxuY29uc3QgZGVmYXVsdFBhZ2luYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3VycmVudDogMSwgcGFnZVNpemU6IDEwLCB0b3RhbDogTmFOLCBvbkNoYW5nZTogYXZhbG9uLm5vb3BcbiAgICB9O1xufTtcblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtdGFibGUnLCB7XG4gICAgc29sZVNsb3Q6ICdoZWFkZXInLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXRhYmxlLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBoZWFkZXI6ICcnLFxuICAgICAgICBjb2x1bW5zOiBbXSxcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIGtleTogJ2lkJyxcblxuICAgICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgbmVlZFNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgIGNoZWNrZWQ6IFtdLFxuICAgICAgICBzZWxlY3Rpb246IFtdLFxuICAgICAgICBpc0FsbENoZWNrZWQ6IGZhbHNlLFxuICAgICAgICBvblNlbGVjdDogYXZhbG9uLm5vb3AsXG4gICAgICAgIG9uU2VsZWN0QWxsOiBhdmFsb24ubm9vcCxcbiAgICAgICAgc2VsZWN0aW9uQ2hhbmdlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgaGFuZGxlQ2hlY2tBbGwoZSkge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VEYXRhKCk7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChyZWNvcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQuZW5zdXJlKHJlY29yZFt0aGlzLmtleV0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5lbnN1cmUocmVjb3JkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTih0aGlzLnBhZ2luYXRpb25Db25maWcudG90YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZC5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZC5yZW1vdmVBbGwoZWwgPT4gZGF0YS5tYXAocmVjb3JkID0+IHJlY29yZFt0aGlzLmtleV0pLmluZGV4T2YoZWwpICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLnJlbW92ZUFsbChlbCA9PiBkYXRhLmluZGV4T2YoZWwpICE9PSAtMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UodGhpcy5jaGVja2VkLCB0aGlzLnNlbGVjdGlvbi4kbW9kZWwpO1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdEFsbChlLnRhcmdldC5jaGVja2VkLCB0aGlzLnNlbGVjdGlvbi4kbW9kZWwpO1xuICAgICAgICB9LFxuICAgICAgICBoYW5kbGVDaGVjayhjaGVja2VkLCByZWNvcmQpIHtcbiAgICAgICAgICAgIGlmIChjaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkLmVuc3VyZShyZWNvcmRbdGhpcy5rZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5lbnN1cmUocmVjb3JkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2VkLnJlbW92ZShyZWNvcmRbdGhpcy5rZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5yZW1vdmUocmVjb3JkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlKHRoaXMuY2hlY2tlZCwgdGhpcy5zZWxlY3Rpb24uJG1vZGVsKTtcbiAgICAgICAgICAgIHRoaXMub25TZWxlY3QocmVjb3JkLiRtb2RlbCwgY2hlY2tlZCwgdGhpcy5zZWxlY3Rpb24uJG1vZGVsKTtcbiAgICAgICAgfSxcblxuICAgICAgICBhY3Rpb25zOiBhdmFsb24ubm9vcCxcbiAgICAgICAgaGFuZGxlKHR5cGUsIGNvbCwgcmVjb3JkLCAkaW5kZXgsIC4uLmV4dHJhKSB7XG4gICAgICAgICAgICBsZXQgdGV4dCA9IHJlY29yZFtjb2wuZGF0YUluZGV4XS4kbW9kZWwgfHwgcmVjb3JkW2NvbC5kYXRhSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5hY3Rpb25zKHR5cGUsIHRleHQsIHJlY29yZC4kbW9kZWwsICRpbmRleCwgLi4uZXh0cmEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBhZ2luYXRpb246IGRlZmF1bHRQYWdpbmF0aW9uKCksXG4gICAgICAgIHBhZ2luYXRpb25Db25maWc6IGRlZmF1bHRQYWdpbmF0aW9uKCksXG4gICAgICAgIGhhbmRsZVBhZ2VDaGFuZ2UoY3VycmVudFBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5vbkNoYW5nZShjdXJyZW50UGFnZSk7XG4gICAgICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudCA9IGN1cnJlbnRQYWdlO1xuXG4gICAgICAgICAgICB0aGlzLiRmaXJlKCdjaGVja2VkLmxlbmd0aCcsIHRoaXMuY2hlY2tlZC5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLnBhZ2luYXRpb25Db25maWcuJG1vZGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q3VycmVudFBhZ2VEYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuICFpc05hTih0aGlzLnBhZ2luYXRpb25Db25maWcudG90YWwpID8gdGhpcy5kYXRhIDogdGhpcy5kYXRhLnNsaWNlKFxuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5wYWdlU2l6ZSAqICh0aGlzLnBhZ2luYXRpb25Db25maWcuY3VycmVudCAtIDEpLFxuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5wYWdlU2l6ZSAqIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5jdXJyZW50XG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICAkY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIHRvdGFsKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhaXNOYU4odGhpcy5wYWdpbmF0aW9uQ29uZmlnLnRvdGFsKSA/IHRoaXMucGFnaW5hdGlvbkNvbmZpZy50b3RhbCA6IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25DaGFuZ2U6IGF2YWxvbi5ub29wLFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0b3IgPSBnZXRDaGlsZFRlbXBsYXRlRGVzY3JpcHRvcih0aGlzKTtcbiAgICAgICAgICAgIGRlc2NyaXB0b3IuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb2x1bW4ucHJvcHMudHlwZSA9PSAnc2VsZWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmtleSA9IGNvbHVtbi5wcm9wcy5kYXRhSW5kZXggfHwgdGhpcy5rZXk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmVlZFNlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucyA9IGdldENvbHVtbkNvbmZpZyhkZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdjaGVja2VkLmxlbmd0aCcsIChuZXdWKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFBhZ2VLZXlzID0gdGhpcy5nZXRDdXJyZW50UGFnZURhdGEoKVxuICAgICAgICAgICAgICAgICAgICAubWFwKHJlY29yZCA9PiByZWNvcmRbdGhpcy5rZXldKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWxsQ2hlY2tlZCA9IGN1cnJlbnRQYWdlS2V5c1xuICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKGtleSA9PiB0aGlzLmNoZWNrZWQuY29udGFpbnMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PSBjdXJyZW50UGFnZUtleXMubGVuZ3RoO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnZGF0YScsICh2KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0FsbENoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrZWQuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgnZGF0YS5sZW5ndGgnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQWxsQ2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tlZC5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdwYWdpbmF0aW9uJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgYXZhbG9uLm1peCh0aGlzLnBhZ2luYXRpb25Db25maWcsIHYpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgncGFnaW5hdGlvbi5jdXJyZW50JywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnQgPSB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgncGFnaW5hdGlvbi5wYWdlU2l6ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdGlvbkNvbmZpZy5wYWdlU2l6ZSA9IHY7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdwYWdpbmF0aW9uLnRvdGFsJywgdiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnLnRvdGFsID0gdjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3BhZ2luYXRpb24ub25DaGFuZ2UnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRpb25Db25maWcub25DaGFuZ2UgPSB2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRmaXJlKCdwYWdpbmF0aW9uJywgdGhpcy5wYWdpbmF0aW9uLiRtb2RlbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVhZHkoZXZlbnQpIHtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKHZtLCBlbCkge1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldENvbHVtbkNvbmZpZyhkZXNjcmlwdG9yLCBsZXZlbCA9IDEpIHtcbiAgICByZXR1cm4gZGVzY3JpcHRvci5yZWR1Y2UoKGFjYywgY29sdW1uKSA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uaXMgIT0gJ21zLXRhYmxlLWhlYWRlcicpIHJldHVybiBhY2M7XG4gICAgICAgIGlmIChjb2x1bW4ucHJvcHMudHlwZSA9PSAnc2VsZWN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5saW5lVGVtcGxhdGUgPSBjb2x1bW4uaW5saW5lVGVtcGxhdGU7XG4gICAgICAgIGlubGluZVRlbXBsYXRlID0gaW5saW5lVGVtcGxhdGUucmVwbGFjZSgvKG1zLXw6KXNraXA9XCJbXlwiXSpcIi9nLCAnJyk7XG4gICAgICAgIGlubGluZVRlbXBsYXRlID0gaW5saW5lVGVtcGxhdGUucmVwbGFjZSgvPFxccyptcy10YWJsZS1oZWFkZXJbXj5dKj4uKjxcXC9cXHMqbXMtdGFibGUtaGVhZGVyXFxzKj4vZywgJycpO1xuICAgICAgICBpbmxpbmVUZW1wbGF0ZSA9IGlubGluZVRlbXBsYXRlLnJlcGxhY2UoLyhtcy18OiljbGljaz1cImhhbmRsZVxcKChbXlwiXSopXFwpXCIvZywgKCQwLCAkMSwgJDIsICQzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7JDF9Y2xpY2s9XCJoYW5kbGUoJHskMn0sKVwiYC5yZXBsYWNlKC8sLywgJywgY29sLCByZWNvcmQsICRpbmRleCwnKS5yZXBsYWNlKC8sXFwpLywgJyknKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjYy5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiBjb2x1bW4ucHJvcHMudGl0bGUsXG4gICAgICAgICAgICBkYXRhSW5kZXg6IGNvbHVtbi5wcm9wcy5kYXRhSW5kZXggfHwgJycsXG4gICAgICAgICAgICB0ZW1wbGF0ZTogL15cXHMqJC8udGVzdChpbmxpbmVUZW1wbGF0ZSkgPyAne3tyZWNvcmQuJyArIGNvbHVtbi5wcm9wcy5kYXRhSW5kZXggKyAnfX0nIDogaW5saW5lVGVtcGxhdGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhY2MuY29uY2F0KGdldENvbHVtbkNvbmZpZyhjb2x1bW4uY2hpbGRyZW4sIGxldmVsICsgMSkpO1xuICAgIH0sIFtdKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXRhYmxlL21zLXRhYmxlLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0IGNvbnRyb2xDb21wb25lbnQgZnJvbSAnLi4vbXMtZm9ybS9tcy1jb250cm9sJztcbmltcG9ydCB7IGVtaXRUb0Zvcm1JdGVtIH0gZnJvbSAnLi4vbXMtZm9ybS91dGlscyc7XG5pbXBvcnQgeyBmaW5kUGFyZW50Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4va291bWVpLXV0aWwnO1xuXG4vKipcbiAqIOWkmuihjOaWh+acrOi+k+WFpee7hOS7tlxuICogQHByb3AgdmFsdWUg57uE5Lu25YC8KGluaGVyaXQpXG4gKiBAcHJvcCBjb2wg5a2X5q616Lev5b6EKGluaGVyaXQpXG4gKiBAcHJvcCByb3dzIOaWh+acrOahhuihjOaVsFxuICogXG4gKiBAZXhhbXBsZVxuICogYGBgIGh0bWxcbiAqIDxtcy10ZXh0YXJlYSA6d2lkZ2V0PVwie3ZhbHVlOiBAYmlvLCBjb2w6ICdiaW8nLCByb3dzOiAzfVwiPjwvbXMtdGV4dGFyZWE+XG4gKiBgYGBcbiAqL1xuY29udHJvbENvbXBvbmVudC5leHRlbmQoe1xuICAgIGRpc3BsYXlOYW1lOiAnbXMtdGV4dGFyZWEnLFxuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXRleHRhcmVhLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICByb3dzOiAnJyxcbiAgICAgICAgdGV4dDogJycsXG4gICAgICAgIG1hcFZhbHVlVG9UZXh0KHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnRleHQgPSB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICBlbWl0VG9Gb3JtSXRlbSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCd2YWx1ZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwVmFsdWVUb1RleHQodik7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHsgdmFsdWU6IHYgfSxcbiAgICAgICAgICAgICAgICAgICAgZGVueVZhbGlkYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hhbmdlZCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tYXBWYWx1ZVRvVGV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdGV4dGFyZWEvbXMtdGV4dGFyZWEudHMiLCJpbXBvcnQgJy4vbXMtY2FsZW5kYXInO1xuaW1wb3J0ICcuL21zLWNhbGVuZGFyLmxlc3MnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9udGhUYWJsZSA9IFtdO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy1jYWxlbmRhci15ZWFyLXZpZXcnLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtY2FsZW5kYXIteWVhci12aWV3Lmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICB0YWJsZTogW10sXG4gICAgICAgIC8vIDAt5pyI6KeG5Zu+77yMMS3lubTop4blm77vvIwyLeWNgeW5tOinhuWbvu+8jDMt55m+5bm06KeG5Zu+XG4gICAgICAgIHZpZXc6IDEsXG4gICAgICAgIGN1cnJlbnRNb250aDogJycsXG4gICAgICAgIGN1cnJlbnRZZWFyOiAwLFxuICAgICAgICBpc1NlbGVjdGVkKGVsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2VsZWN0OiBhdmFsb24ubm9vcCxcbiAgICAgICAgaGFuZGxlQ2VsbENsaWNrKGVsKSB7XG4gICAgICAgICAgICB0aGlzLm9uU2VsZWN0KGVsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KCkge1xuICAgICAgICAgICAgY29uc3QgbW9udGhMaXN0ID0gbW9tZW50LmxvY2FsZURhdGEoKS5tb250aHNTaG9ydCgpO1xuICAgICAgICAgICAgaWYgKG1vbnRoVGFibGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgWzAsIDMsIDYsIDldLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG1vbnRoVGFibGUucHVzaChtb250aExpc3Quc2xpY2UobiwgbiArIDMpLm1hcChtID0+ICh7IGxhYmVsOiBtLCB2YWx1ZTogbSB9KSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kd2F0Y2goJ3ZpZXcnLCB2ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydE9mRGVjYWRlID0gdGhpcy5jdXJyZW50WWVhciAtIHRoaXMuY3VycmVudFllYXIgJSAxMDtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydE9mQ2VudHVyeSA9IHRoaXMuY3VycmVudFllYXIgLSB0aGlzLmN1cnJlbnRZZWFyICUgMTAwO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlID0gbW9udGhUYWJsZTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlID0gWzAsIDMsIDYsIDldLm1hcChuID0+IGF2YWxvbi5yYW5nZShzdGFydE9mRGVjYWRlIC0gMSwgc3RhcnRPZkRlY2FkZSArIDExKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShuLCBuICsgMylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubWFwKG0gPT4gKHsgbGFiZWw6IG0sIHZhbHVlOiBtIH0pKSk7IGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYmxlID0gWzAsIDMsIDYsIDldLm1hcChuID0+IGF2YWxvbi5yYW5nZShzdGFydE9mQ2VudHVyeSAtIDEwLCBzdGFydE9mQ2VudHVyeSArIDExMCwgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKG4sIG4gKyAzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAobSA9PiAoeyBsYWJlbDogYCR7bX0tJHttICsgOX1gLCB2YWx1ZTogbSB9KSkpOyBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHdhdGNoKCdjdXJyZW50WWVhcicsIHYgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJGZpcmUoJ3ZpZXcnLCB0aGlzLnZpZXcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLXllYXItdmlldy50cyIsImltcG9ydCAnLi9tcy1jaGVja2JveCc7XG5pbXBvcnQgJy4vbXMtY2hlY2tib3gtZ3JvdXAnO1xuaW1wb3J0ICcuL21zLWNoZWNrYm94Lmxlc3MnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvaW5kZXgudHMiLCJpbXBvcnQgJy4vbXMtZGF0ZXBpY2tlcic7XG5pbXBvcnQgJy4vbXMtZGF0ZXBpY2tlci5sZXNzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWRhdGVwaWNrZXIvaW5kZXgudHMiLCJpbXBvcnQgJy4vbXMtZGlhbG9nJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWRpYWxvZy9pbmRleC50cyIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCB7IGZpbmRQYXJlbnRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9rb3VtZWktdXRpbCc7XG5cbi8qKlxuICog6KGo5Y2V6aG557uE5Lu2XG4gKiBAcHJvcCBsYWJlbCDooajljZXpobnmoIfnrb5cbiAqIFxuICogQGV4YW1wbGVcbiAqIGBgYCBodG1sXG4gKiA8bXMtZm9ybS1pdGVtIDp3aWRnZXQ9XCJ7bGFiZWw6ICfmoIfpopgnfVwiPlxuICAgICAgICA8bXMtaW5wdXQgOndpZGdldD1cInt2YWx1ZTogQHRpdGxlLCBjb2w6ICd0aXRsZSd9XCI+PC9tcy1pbnB1dD5cbiAgICA8L21zLWZvcm0taXRlbT5cbiAqIGBgYFxuICovXG5hdmFsb24uY29tcG9uZW50KCdtcy1mb3JtLWl0ZW0nLCB7XG4gICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vbXMtZm9ybS1pdGVtLmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICAkZm9ybVZtOiBudWxsLFxuICAgICAgICBsYWJlbDogJycsXG4gICAgICAgIGNvbnRyb2w6ICcnLFxuICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICBkaXJ0eTogZmFsc2UsXG4gICAgICAgIHJlYXNvbnM6IFtdLFxuICAgICAgICBoYXNSdWxlczogZmFsc2UsXG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBjbGFzc05hbWU6ICcnLFxuICAgICAgICBpbmxpbmVGb3JtR3JvdXBTdHlsZTogeyB2ZXJ0aWNhbEFsaWduOiAndG9wJyB9LFxuICAgICAgICBpbmxpbmVNZXNzYWdlU3R5bGU6IHsgbWFyZ2luQm90dG9tOiAwIH0sXG4gICAgICAgIG9uRmllbGRDaGFuZ2UoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgdGhpcy4kZm9ybVZtLnR5cGUgIT09ICdzZWFyY2gnICYmIHRoaXMuJGZvcm1WbS4kZm9ybS5zZXRGaWVsZHNWYWx1ZSh7XG4gICAgICAgICAgICAgICAgW2Rlc2NyaXB0b3IubmFtZV06IHsgdmFsdWU6IGRlc2NyaXB0b3IudmFsdWUsIGRlbnlWYWxpZGF0ZTogZGVzY3JpcHRvci5kZW55VmFsaWRhdGUgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWRlc2NyaXB0b3IucnVsZXMpIHJldHVybiA7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci5zaG93SWNvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dJY29uID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgZGVzY3JpcHRvci5zaG93SWNvbjtcbiAgICAgICAgICAgIHRoaXMuaGFzUnVsZXMgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kZm9ybVZtLiRmb3JtLmFkZEZpZWxkcyh7XG4gICAgICAgICAgICAgICAgW2Rlc2NyaXB0b3IubmFtZV06IHsgcnVsZXM6IGRlc2NyaXB0b3IucnVsZXMgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRmb3JtVm0uJGZvcm0ub24oJ2Vycm9yJyArIGRlc2NyaXB0b3IubmFtZSwgKHJlYXNvbnMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYXNvbnMgPSByZWFzb25zO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRmb3JtVm0uJGZvcm0ub24oJ3Jlc2V0JywgZmllbGRzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAofk9iamVjdC5rZXlzKGZpZWxkcykuaW5kZXhPZihkZXNjcmlwdG9yLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFzb25zID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRm9ybUNoYW5nZShtZXRhKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kZm9ybVZtLiRmb3JtLmF1dG9Bc3luY0NoYW5nZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kZm9ybVZtLm9uRm9ybUNoYW5nZShtZXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Jbml0KGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC50YXJnZXQuX2N0eXBlXyA9ICdtcy1mb3JtLWl0ZW0nO1xuICAgICAgICAgICAgZXZlbnQudGFyZ2V0Ll92bV8gPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy4kZm9ybVZtID0gZmluZFBhcmVudENvbXBvbmVudCh0aGlzLCAnbXMtZm9ybScpO1xuICAgICAgICAgICAgaWYgKHRoaXMuJGZvcm1WbSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93ICdtcy1mb3JtLWl0ZW0g5b+F6aG75pS+5ZyoIG1zLWZvcm0g5YaFJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5saW5lID0gdGhpcy4kZm9ybVZtLmlubGluZTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZWFkeShldmVudCkge1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzb2xlU2xvdDogJ2NvbnRyb2wnXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWZvcm0vbXMtZm9ybS1pdGVtLnRzIiwiaW1wb3J0ICcuL21zLWlucHV0JztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWlucHV0L2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG4vKipcbiAqIGxvYWRpbmcg5oyH5LukXG4gKiBcbiAqIEBleGFtcGxlXG4gKiBgYGAgaHRtbFxuICogPHRhYmxlIDpsb2FkaW5nPVwidHJ1ZVwiPi4uLjwvdGFibGU+XG4gKiBgYGBcbiAqL1xuYXZhbG9uLmRpcmVjdGl2ZSgnbG9hZGluZycsIHtcbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluc3RhbmNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5vbGRQb3NpdGlvblN0eWxlID0gJyc7XG4gICAgfSxcbiAgICB1cGRhdGUodmRvbSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb20gPSB2ZG9tLmRvbTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlID8gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUoZG9tKSA6IGRvbS5jdXJyZW50U3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gZG9tLm9mZnNldFdpZHRoLCBoZWlnaHQgPSBkb20uc2Nyb2xsSGVpZ2h0LCBjbGFzc05hbWUgPSBkb20uY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJMZWZ0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJUb3BXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlcbiAgICAgICAgICAgICAgICAgICAgfSA9IGNvbXB1dGVkU3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub2xkUG9zaXRpb25TdHlsZSA9IGRvbS5zdHlsZS5wb3NpdGlvbjtcblxuICAgICAgICAgICAgICAgICAgICAvLyDlpoLmnpzlhYPntKDmmK/pmpDol4/nmoTvvIzku4DkuYjpg73kuI3lgZpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIOWmguaenOWuveW6puWSjOmrmOW6pumDveS4jeS4ujDvvIzliJnmt7vliqBsb2FkaW5n6YGu572pXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aWR0aCAhPT0gMCAmJiBoZWlnaHQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFza0VsZW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LmNsYXNzTmFtZSA9ICdrb3VtZWktbG9hZGluZy1tYXNrJztcbiAgICAgICAgICAgICAgICAgICAgbWFza0VsZW1lbnQuaW5uZXJUZXh0ID0gJ+WKoOi9veS4rS4uLic7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLmxlZnQgPSAwIC0gKGJvcmRlckxlZnRXaWR0aCA9PT0gJ21lZGl1bScgPyAwIDogcGFyc2VGbG9hdChib3JkZXJMZWZ0V2lkdGgpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLnRvcCA9IDAgLSAoYm9yZGVyVG9wV2lkdGggPT09ICdtZWRpdW0nID8gMCA6IHBhcnNlRmxvYXQoYm9yZGVyVG9wV2lkdGgpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIG1hc2tFbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS5saW5lSGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIX5gICR7Y2xhc3NOYW1lfSBgLmluZGV4T2YoJyBtYXNrZWQgJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jbGFzc05hbWUgKz0gJyBtYXNrZWQnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChtYXNrRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBtYXNrRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkb20gPSB2ZG9tLmRvbTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXNrRWxlbWVudCA9IHRoaXMuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gZG9tLmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZFBvc2l0aW9uU3R5bGUgPSBkb20uc3R5bGUucG9zaXRpb247XG4gICAgICAgICAgICAgICAgbWFza0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgICAgICAgICBpZiAoIX5gICR7Y2xhc3NOYW1lfSBgLmluZGV4T2YoJyBtYXNrZWQgJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLmNsYXNzTmFtZSA9IGNsYXNzTmFtZSArICcgbWFza2VkJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkb20gPSB2ZG9tLmRvbTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFza0VsZW1lbnQgPSB0aGlzLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSBkb20uY2xhc3NOYW1lO1xuICAgICAgICAgICAgICAgICAgICBtYXNrRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vbGRQb3NpdGlvblN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUucG9zaXRpb24gPSB0aGlzLm9sZFBvc2l0aW9uU3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9tLmNsYXNzTmFtZSA9IGAgJHtjbGFzc05hbWV9IGAucmVwbGFjZSgvXFxzKm1hc2tlZFxccyovLCAnICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGJlZm9yZURpc3Bvc2UoKSB7XG4gICAgICAgIGNvbnN0IGRvbSA9IHRoaXMubm9kZS5kb207XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgJiYgZG9tLnJlbW92ZUNoaWxkKHRoaXMuaW5zdGFuY2UpO1xuICAgIH1cbn0pO1xuXG4vKipcbiAqIOWFqOWxgCBsb2FkaW5nIOaWueazlVxuICogXG4gKiBAZXhhbXBsZVxuICogYGBgIGpzXG4gKiBpbXBvcnQgeyBMb2FkaW5nIH0gZnJvbSAnLi9jb21wb25lbnRzL21zLWxvYWRpbmcnO1xuICogTG9hZGluZy5zaG93KCk7XG4gKiBzZXRUaW1lb3V0KCgpID0+IHtcbiAqICAgTG9hZGluZy5oaWRlKCk7XG4gKiB9LCA1MDAwKVxuICogYGBgXG4gKi9cbmNvbnN0IGxvYWRpbmdEaXJlY3RpdmUgPSBhdmFsb24uZGlyZWN0aXZlc1snbG9hZGluZyddO1xuY29uc3QgZ2xvYmFsTG9hZGluZ0NvbnRleHQ6IHtcbiAgICBub2RlOiB7IGRvbTogSFRNTEVsZW1lbnQgfSxcbiAgICBpbnN0YW5jZT86IEhUTUxEaXZFbGVtZW50XG59ID0ge1xuICAgIG5vZGU6IHsgZG9tOiBkb2N1bWVudC5ib2R5IH1cbn07XG5cbmV4cG9ydCBjb25zdCBMb2FkaW5nID0ge1xuICAgIHNob3coKSB7XG4gICAgICAgIGlmIChnbG9iYWxMb2FkaW5nQ29udGV4dC5pbnN0YW5jZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2FkaW5nRGlyZWN0aXZlLmluaXQuY2FsbChnbG9iYWxMb2FkaW5nQ29udGV4dCk7XG4gICAgICAgICAgICBhdmFsb24ucmVhZHkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxvYWRpbmdEaXJlY3RpdmUudXBkYXRlLmNhbGwoZ2xvYmFsTG9hZGluZ0NvbnRleHQsIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tOiBnbG9iYWxMb2FkaW5nQ29udGV4dC5ub2RlLmRvbVxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkaW5nRGlyZWN0aXZlLnVwZGF0ZS5jYWxsKGdsb2JhbExvYWRpbmdDb250ZXh0LCB7XG4gICAgICAgICAgICAgICAgZG9tOiBnbG9iYWxMb2FkaW5nQ29udGV4dC5ub2RlLmRvbVxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhpZGUoKSB7XG4gICAgICAgIGlmIChnbG9iYWxMb2FkaW5nQ29udGV4dC5pbnN0YW5jZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBsb2FkaW5nRGlyZWN0aXZlLnVwZGF0ZS5jYWxsKGdsb2JhbExvYWRpbmdDb250ZXh0LCB7XG4gICAgICAgICAgICAgICAgZG9tOiBnbG9iYWxMb2FkaW5nQ29udGV4dC5ub2RlLmRvbVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLWxvYWRpbmcvbXMtbG9hZGluZy1kaXJlY3RpdmUudHMiLCJpbXBvcnQgJy4vbXMtbWVudS5sZXNzJztcbmltcG9ydCAnLi9tcy1tZW51JztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLW1lbnUvaW5kZXgudHMiLCJpbXBvcnQgbWVzc2FnZSBmcm9tICcuL21zLW1lc3NhZ2UnO1xuZXhwb3J0IGRlZmF1bHQgbWVzc2FnZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLW1lc3NhZ2UvaW5kZXgudHMiLCJpbXBvcnQgbm90aWZpY2F0aW9uIGZyb20gJy4vbXMtbm90aWZpY2F0aW9uJztcbmV4cG9ydCBkZWZhdWx0IG5vdGlmaWNhdGlvbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLW5vdGlmaWNhdGlvbi9pbmRleC50cyIsImltcG9ydCAnLi9tcy1yYWRpbyc7XG5pbXBvcnQgJy4vbXMtcmFkaW8tZ3JvdXAnO1xuaW1wb3J0ICcuL21zLXJhZGlvLmxlc3MnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtcmFkaW8vaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLXNlbGVjdC1vcHRpb24nLCB7XG4gICAgdGVtcGxhdGU6ICcmbmJzcDsnLFxuICAgIHNvbGVTbG90OiAnbGFiZWwnLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXNlbGVjdC9tcy1zZWxlY3Qtb3B0aW9uLnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy10YWJsZS1oZWFkZXInLCB7XG4gICAgdGVtcGxhdGU6ICc8dGg+PHNsb3QgLz48L3RoPicsXG4gICAgc29sZVNsb3Q6ICdjb250ZW50JyxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgY29sOiAnJ1xuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdGFibGUvbXMtdGFibGUtaGVhZGVyLnRzIiwiaW1wb3J0ICcuL21zLXRleHRhcmVhJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXRleHRhcmVhL2luZGV4LnRzIiwiaW1wb3J0ICcuL21zLXRpbWVwaWNrZXInO1xuaW1wb3J0ICcuL21zLXRpbWVwaWNrZXIubGVzcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0ICogYXMgbW9tZW50IGZyb20gJ21vbWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjbXBWbSkge1xuICAgIGlmIChhdmFsb24udm1vZGVsc1tjbXBWbS5wYW5lbFZtSWRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGF2YWxvbi52bW9kZWxzW2NtcFZtLnBhbmVsVm1JZF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGF2YWxvbi5kZWZpbmUoe1xuICAgICAgICAkaWQ6IGNtcFZtLnBhbmVsVm1JZCxcbiAgICAgICAgY3VycmVudERhdGVBcnJheTogJycsXG4gICAgICAgICRtb21lbnQ6IG1vbWVudCgpLFxuICAgICAgICByZXNldCgpIHtcbiAgICAgICAgICAgIHRoaXMuJG1vbWVudCA9IGNtcFZtLnNlbGVjdGVkID8gbW9tZW50KGNtcFZtLnNlbGVjdGVkLCBjbXBWbS5mb3JtYXQpIDogbW9tZW50KCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlQXJyYXkgPSB0aGlzLiRtb21lbnQudG9BcnJheSgpLnRvU3RyaW5nKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZVRpbWVwaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgICAgICAgY29uc3QgeyBob3VyLCBtaW51dGUsIHNlY29uZCB9ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICB0aGlzLiRtb21lbnQuaG91cihob3VyKS5taW51dGUobWludXRlKS5zZWNvbmQoc2Vjb25kKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGVBcnJheSA9IHRoaXMuJG1vbWVudC50b0FycmF5KCkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGNtcFZtLnNlbGVjdGVkID0gdGhpcy4kbW9tZW50LmZvcm1hdChjbXBWbS5mb3JtYXQpO1xuXG4gICAgICAgICAgICBjbXBWbS5oYW5kbGVDaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogeyB2YWx1ZTogY21wVm0uc2VsZWN0ZWQgfSxcbiAgICAgICAgICAgICAgICB0eXBlOiAndGltZXBpY2tlci1jaGFuZ2VkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXItcGFuZWwudHMiLCJpbXBvcnQgJy4vbXMtdHJlZSc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy10cmVlL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuaW1wb3J0ICogYXMgZG9tQWxpZ24gZnJvbSAnZG9tLWFsaWduJztcblxuYXZhbG9uLmNvbXBvbmVudCgnbXMtdHJpZ2dlcicsIHtcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIHN0eWxlPVwiZGlzcGxheTpub25lO1wiPjwvc3Bhbj4nLFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICB2aXNpYmxlOiBmYWxzZSxcbiAgICAgICAgaW5uZXJWbUlkOiAnJyxcbiAgICAgICAgaW5uZXJDbGFzczogJycsXG4gICAgICAgIGlubmVyVGVtcGxhdGU6ICcnLFxuICAgICAgICBpbml0aWFsaXplZDogZmFsc2UsXG4gICAgICAgIHdpdGhJbkJveCgpIHsgcmV0dXJuIHRydWU7IH0sXG4gICAgICAgIGdldFRhcmdldDogYXZhbG9uLm5vb3AsXG4gICAgICAgIG9uSGlkZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIGhpZGUocGFuZWwpIHtcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLnRvcCA9ICctOTk5OXB4JztcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLmxlZnQgPSAnLTk5OTlweCc7XG4gICAgICAgICAgICB0aGlzLm9uSGlkZSgpO1xuICAgICAgICB9LFxuICAgICAgICBpbml0UGFuZWwocGFuZWw6IEhUTUxEaXZFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCBET0MgPSBkb2N1bWVudCwgYm9keSA9IERPQy5ib2R5O1xuICAgICAgICAgICAgY29uc3QgbWVkaXVtID0gRE9DLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbWVkaXVtLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLiRpZCk7XG4gICAgICAgICAgICBtZWRpdW0uc2V0QXR0cmlidXRlKCdzdHlsZScsICdwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMHB4OyBsZWZ0OiAwcHg7IHdpZHRoOiAxMDAlOycpO1xuICAgICAgICAgICAgcGFuZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIHRoaXMuaW5uZXJDbGFzcyk7XG4gICAgICAgICAgICBwYW5lbC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3otaW5kZXg6IDEwNTA7bGVmdDogLTk5OTlweDt0b3A6IC05OTk5cHg7cG9zaXRpb246IGFic29sdXRlO291dGxpbmU6IG5vbmU7b3ZlcmZsb3c6IGhpZGRlbjsnKTtcbiAgICAgICAgICAgIHBhbmVsLnNldEF0dHJpYnV0ZSgnOmltcG9ydGFudCcsIHRoaXMuaW5uZXJWbUlkKTtcbiAgICAgICAgICAgIHBhbmVsLmlubmVySFRNTCA9IHRoaXMuaW5uZXJUZW1wbGF0ZS5yZXBsYWNlKC9cXHJ8XFxuL2csICcnKTtcbiAgICAgICAgICAgIG1lZGl1bS5hcHBlbmRDaGlsZChwYW5lbCk7XG4gICAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKG1lZGl1bSk7XG5cbiAgICAgICAgICAgIGF2YWxvbi5zY2FuKHBhbmVsLCBhdmFsb24udm1vZGVsc1t0aGlzLmlubmVyVm1JZF0pO1xuXG4gICAgICAgICAgICBhdmFsb24uYmluZChET0MsICdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUgJiYgcGFuZWwgIT09IGUudGFyZ2V0ICYmICFhdmFsb24uY29udGFpbnMocGFuZWwsIGUudGFyZ2V0KSAmJiAgIXRoaXMud2l0aEluQm94KGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUocGFuZWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkluaXQoZXZlbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IERPQyA9IGRvY3VtZW50O1xuICAgICAgICAgICAgY29uc3QgcGFuZWwgPSBET0MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLiR3YXRjaCgndmlzaWJsZScsIHYgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0UGFuZWwocGFuZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFuZWwuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoID09PSAwID8gJ2F1dG8nIDogKHRoaXMud2lkdGggKyAncHgnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFuZWwuc2Nyb2xsVG9wID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZG9tQWxpZ24ocGFuZWwsIHRoaXMuZ2V0VGFyZ2V0KCksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czogWyd0bCcsICdibCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0OiBbMCwgMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RhcmdldE9mZnNldDogWycwJScsJzEwMCUnXVxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3RZOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKHBhbmVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EaXNwb3NlKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBET0MgPSBkb2N1bWVudCwgYm9keSA9IERPQy5ib2R5O1xuICAgICAgICAgICAgY29uc3QgbWVkaXVtID0gRE9DLmdldEVsZW1lbnRCeUlkKHRoaXMuJGlkKTtcbiAgICAgICAgICAgIGJvZHkucmVtb3ZlQ2hpbGQobWVkaXVtKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdHJpZ2dlci9tcy10cmlnZ2VyLnRzIiwiaW1wb3J0ICcuL21zLXVwbG9hZCc7XG5pbXBvcnQgJy4vbXMtdXBsb2FkLmxlc3MnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgYXZhbG9uIGZyb20gJ2F2YWxvbjInO1xuXG5hdmFsb24uY29tcG9uZW50KCdtcy11cGxvYWQtY2FyZCcsIHtcbiAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9tcy11cGxvYWQtY2FyZC5odG1sJyksXG4gICAgZGVmYXVsdHM6IHtcbiAgICAgICAgZmlsZUxpc3Q6IFtdLFxuICAgICAgICBnZXRUZXh0Q2xhc3MoZmlsZSkge1xuICAgICAgICAgICAgc3dpdGNoIChmaWxlLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2RvbmUnOiByZXR1cm4gJ3RleHQtcHJpbWFyeSc7XG4gICAgICAgICAgICAgICAgY2FzZSAndXBsb2FkaW5nJzogcmV0dXJuICd0ZXh0LW11dGVkJztcbiAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6IHJldHVybiAndGV4dC1kYW5nZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgICAgICBvblJlbW92ZTogYXZhbG9uLm5vb3AsXG4gICAgICAgIGRlbChmaWxlKSB7XG4gICAgICAgICAgICB0aGlzLm9uUmVtb3ZlKGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLWNhcmQudHMiLCJpbXBvcnQgKiBhcyBhdmFsb24gZnJvbSAnYXZhbG9uMic7XG5cbmF2YWxvbi5jb21wb25lbnQoJ21zLXVwbG9hZC1saXN0Jywge1xuICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL21zLXVwbG9hZC1saXN0Lmh0bWwnKSxcbiAgICBkZWZhdWx0czoge1xuICAgICAgICBmaWxlTGlzdDogW10sXG4gICAgICAgIGdldFRleHRDbGFzcyhmaWxlKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGZpbGUuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZG9uZSc6IHJldHVybiAndGV4dC1wcmltYXJ5JztcbiAgICAgICAgICAgICAgICBjYXNlICd1cGxvYWRpbmcnOiByZXR1cm4gJ3RleHQtbXV0ZWQnO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzogcmV0dXJuICd0ZXh0LWRhbmdlcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH0sXG4gICAgICAgIG9uUmVtb3ZlOiBhdmFsb24ubm9vcCxcbiAgICAgICAgZGVsKGZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMub25SZW1vdmUoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQtbGlzdC50cyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1jaGVja2JveC9tcy1jaGVja2JveC5sZXNzXG4vLyBtb2R1bGUgaWQgPSAyMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1sYXlvdXQvbXMtbGF5b3V0Lmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1tZW51L21zLW1lbnUubGVzc1xuLy8gbW9kdWxlIGlkID0gMjM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1zZWxlY3QvbXMtc2VsZWN0Lmxlc3Ncbi8vIG1vZHVsZSBpZCA9IDIzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy10aW1lcGlja2VyL21zLXRpbWVwaWNrZXIubGVzc1xuLy8gbW9kdWxlIGlkID0gMjQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXVwbG9hZC9tcy11cGxvYWQubGVzc1xuLy8gbW9kdWxlIGlkID0gMjQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktY2FsZW5kYXJcXFwiPlxcbiAgICA8dGFibGUgY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhci15ZWFyLXZpZXdcXFwiPlxcbiAgICAgICAgPHRib2R5PlxcbiAgICAgICAgICAgIDx0ciA6Zm9yPVxcXCLvvIhpLCByb3cpIGluIEB0YWJsZVxcXCI+XFxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cXFwia291bWVpLWNhbGVuZGFyLWNlbGxcXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XFxcIltcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChAaXNTZWxlY3RlZChjZWxsKSA/ICdrb3VtZWktY2FsZW5kYXItc2VsZWN0ZWQtZGF5JyA6ICcnKSxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChAdmlldyA+IDEgJiYgKGkgKyBqID09PSAwIHx8IGkgKiBqID09PSA2KSA/ICdrb3VtZWktY2FsZW5kYXItcHJldi1tb250aC1jZWxsJyA6ICcnKVxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgOmZvcj1cXFwiKGosIGNlbGwpIGluIHJvd1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktY2FsZW5kYXItZGF0ZVxcXCIgOmNsaWNrPVxcXCJAaGFuZGxlQ2VsbENsaWNrKGNlbGwpXFxcIj57e2NlbGwubGFiZWx9fTwvZGl2PlxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICA8L3Rib2R5PlxcbiAgICA8L3RhYmxlPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLWNhbGVuZGFyL21zLWNhbGVuZGFyLXllYXItdmlldy5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhclxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcInJvd1xcXCIgbXMtaWY9XFxcIkBzaG93SGVhZGVyXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0yIGNvbC1tZC1vZmZzZXQtNFxcXCI+XFxuICAgICAgICAgICAgPG1zLXNlbGVjdCA6d2lkZ2V0PVxcXCJ7dmFsdWU6W0BjdXJyZW50WWVhcl0sb3B0aW9uczpAY3VycmVudFllYXJPcHRpb25zLG9uQ2hhbmdlOkBoYW5kbGVZZWFyQ2hhbmdlfVxcXCI+PC9tcy1zZWxlY3Q+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC0yXFxcIj5cXG4gICAgICAgICAgICA8bXMtc2VsZWN0IDp3aWRnZXQ9XFxcInt2YWx1ZTpbQGN1cnJlbnRNb250aF0sb3B0aW9uczpAbW9udGhPcHRpb25zLG9uQ2hhbmdlOkBoYW5kbGVNb250aENoYW5nZX1cXFwiPjwvbXMtc2VsZWN0PlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbiAgICA8dGFibGU+XFxuICAgICAgICA8dGhlYWQ+XFxuICAgICAgICAgICAgPHRyPlxcbiAgICAgICAgICAgICAgICA8dGggY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhci1jb2x1bW4taGVhZGVyXFxcIiA6Zm9yPVxcXCJkYXkgaW4gQHdlZWtkYXlzXFxcIj57e2RheX19PC90aD5cXG4gICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgPC90aGVhZD5cXG4gICAgICAgIDx0Ym9keT5cXG4gICAgICAgICAgICA8dHIgOmZvcj1cXFwid2VlayBpbiBAdGFibGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XFxcImtvdW1laS1jYWxlbmRhci1jZWxsXFxcIiA6Y2xhc3M9XFxcImVsLmNsYXNzTmFtZVxcXCIgOmZvcj1cXFwiZWwgaW4gd2Vla1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktY2FsZW5kYXItZGF0ZVxcXCIgOmNsaWNrPVxcXCJAaGFuZGxlRGF0ZUNsaWNrKGVsKSB8IHN0b3BcXFwiPnt7ZWwuZGF0ZX19PC9kaXY+XFxuICAgICAgICAgICAgICAgIDwvdGQ+XFxuICAgICAgICAgICAgPC90cj5cXG4gICAgICAgIDwvdGJvZHk+XFxuICAgIDwvdGFibGU+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtY2FsZW5kYXIvbXMtY2FsZW5kYXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjaGVja2JveC1ncm91cFxcXCI+XFxuICAgIDxtcy1jaGVja2JveCBcXG4gICAgICAgIDp3aWRnZXQ9XFxcIntcXG4gICAgICAgICAgICBjaGVja2VkOkBzZWxlY3Rpb24uaW5kZXhPZihvcHRpb24udmFsdWUpIT0tMSxcXG4gICAgICAgICAgICBncm91cDp0cnVlLFxcbiAgICAgICAgICAgIG9uQ2hhbmdlOmZ1bmN0aW9uKCl7XFxuICAgICAgICAgICAgICAgIEB0b2dnbGVPcHRpb24ob3B0aW9uKVxcbiAgICAgICAgICAgIH0sXFxuICAgICAgICAgICAgZGlzYWJsZWQ6J2Rpc2FibGVkJyBpbiBvcHRpb24/b3B0aW9uLmRpc2FibGVkOkBkaXNhYmxlZFxcbiAgICAgICAgfVxcXCIgXFxuICAgICAgICA6Zm9yPVxcXCJvcHRpb24gaW4gb3B0aW9uc1xcXCI+e3tvcHRpb24ubGFiZWx9fTwvbXMtY2hlY2tib3g+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvbXMtY2hlY2tib3gtZ3JvdXAuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IDpjbGFzcz1cXFwiQHdyYXBwZXJcXFwiIGNsYXNzPVxcXCJrb3VtZWktY2hlY2tib3hcXFwiIHN0eWxlPVxcXCJtYXJnaW4tdG9wOiAwOyBtYXJnaW4tYm90dG9tOiAwO1xcXCI+XFxuICAgIDxsYWJlbCBjbGFzcz1cXFwia291bWVpLWNoZWNrYm94LWlubmVyIGtvdW1laS1jaGVja2JveC1pbm5lci1pZVxcXCI+XFxuICAgICAgICA8aW5wdXQgdHlwZT1cXFwiY2hlY2tib3hcXFwiXFxuICAgICAgICAgICAgOmF0dHI9XFxcIntpZDpAaGVscElkLGRpc2FibGVkOkBkaXNhYmxlZH1cXFwiXFxuICAgICAgICAgICAgOmR1cGxleC1jaGVja2VkPVxcXCJAY2hlY2tlZFxcXCJcXG4gICAgICAgICAgICBkYXRhLWR1cGxleC1jaGFuZ2VkPVxcXCJAb25DaGFuZ2VcXFwiXFxuICAgICAgICAgICAgLz5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0ZXh0XFxcIj48L3NwYW4+XFxuICAgIDwvbGFiZWw+XFxuICAgIDxsYWJlbCA6YXR0cj1cXFwieydmb3InOkBoZWxwSWR9XFxcIiBzdHlsZT1cXFwicGFkZGluZy1sZWZ0OiAwO1xcXCIgOmNzcz1cXFwie21hcmdpblJpZ2h0OkBncm91cD84OjB9XFxcIj48c2xvdCAvPjwvbGFiZWw+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtY2hlY2tib3gvbXMtY2hlY2tib3guaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbFxcXCIgc3R5bGU9XFxcIm92ZXJmbG93OiBhdXRvXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtaGVhZGVyXFxcIiA6dmlzaWJsZT1cXFwiQHZpZXdNb2RlID09PSAwXFxcIj5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wcmV2LXllYXItYnRuXFxcIiA6Y2xpY2s9XFxcIm11dGF0ZSgnc3VidHJhY3QnLCAxLCAneWVhcnMnKVxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1sZWZ0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcHJldi1tb250aC1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdzdWJ0cmFjdCcsIDEsICdtb250aHMnKVxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWxlZnRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgICAgIDxzcGFuPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1tb250aC1zZWxlY3RcXFwiIDpjbGljaz1cXFwiQGNoYW5nZVZpZXcoMSlcXFwiPnt7QGN1cnJlbnRNb250aH19PC9hPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci15ZWFyLXNlbGVjdFxcXCIgOmNsaWNrPVxcXCJAY2hhbmdlVmlldygyKVxcXCI+e3tAY3VycmVudFllYXJ9fTwvYT5cXG4gICAgICAgIDwvc3Bhbj5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1uZXh0LW1vbnRoLWJ0blxcXCIgOmNsaWNrPVxcXCJtdXRhdGUoJ2FkZCcsIDEsICd5ZWFycycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLXJpZ2h0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbmV4dC1tb250aC1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdhZGQnLCAxLCAnbW9udGhzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1yaWdodFxcXCI+PC9pPlxcbiAgICAgICAgPC9hPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtaGVhZGVyXFxcIiA6dmlzaWJsZT1cXFwiQHZpZXdNb2RlID09PSAxXFxcIj5cXG4gICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wcmV2LXllYXItYnRuXFxcIiA6Y2xpY2s9XFxcIm11dGF0ZSgnc3VidHJhY3QnLCAxLCAneWVhcnMnKVxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWFuZ2xlLWRvdWJsZS1sZWZ0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgICAgICA8c3Bhbj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbW9udGgtc2VsZWN0XFxcIiA6Y2xpY2s9XFxcIkBjaGFuZ2VWaWV3KDIpXFxcIj57e0BjdXJyZW50WWVhcn19PC9hPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLW5leHQtbW9udGgtYnRuXFxcIiA6Y2xpY2s9XFxcIm11dGF0ZSgnYWRkJywgMSwgJ3llYXJzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtcmlnaHRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWhlYWRlclxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA9PT0gMlxcXCI+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcHJldi15ZWFyLWJ0blxcXCIgOmNsaWNrPVxcXCJtdXRhdGUoJ3N1YnRyYWN0JywgMTAsICd5ZWFycycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLWxlZnRcXFwiPjwvaT5cXG4gICAgICAgIDwvYT5cXG4gICAgICAgIDxzcGFuPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1tb250aC1zZWxlY3RcXFwiIDpjbGljaz1cXFwiQGNoYW5nZVZpZXcoMylcXFwiPnt7QHN0YXJ0T2ZEZWNhZGUgKyAnLScgKyAoQHN0YXJ0T2ZEZWNhZGUgKyA5KX19PC9hPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLW5leHQtbW9udGgtYnRuXFxcIiA6Y2xpY2s9XFxcIm11dGF0ZSgnYWRkJywgMTAsICd5ZWFycycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLXJpZ2h0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1oZWFkZXJcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPT09IDNcXFwiPlxcbiAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXByZXYteWVhci1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdzdWJ0cmFjdCcsIDEwMCwgJ3llYXJzJylcXFwiPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1hbmdsZS1kb3VibGUtbGVmdFxcXCI+PC9pPlxcbiAgICAgICAgPC9hPlxcbiAgICAgICAgPHNwYW4+e3tAc3RhcnRPZkNlbnR1cnkgKyAnLScgKyAoQHN0YXJ0T2ZDZW50dXJ5ICsgOTkpfX08L3NwYW4+XFxuICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbmV4dC1tb250aC1idG5cXFwiIDpjbGljaz1cXFwibXV0YXRlKCdhZGQnLCAxMDAsICd5ZWFycycpXFxcIj5cXG4gICAgICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtYW5nbGUtZG91YmxlLXJpZ2h0XFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1oZWFkZXJcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPCAwICYmIEBzaG93VGltZVxcXCI+XFxuICAgICAgICA8c3Bhbj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbW9udGgtc2VsZWN0XFxcIj57e0BjdXJyZW50TW9udGh9fTwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItbW9udGgtc2VsZWN0XFxcIj57e0BjdXJyZW50RGF5fX08L2E+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXllYXItc2VsZWN0XFxcIj57e0BjdXJyZW50WWVhcn19PC9hPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtYm9keVxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA9PT0gMFxcXCI+XFxuICAgICAgICA8bXMtY2FsZW5kYXIgOndpZGdldD1cXFwie3ZhbHVlOkBjdXJyZW50RGF0ZUFycmF5LHNob3dIZWFkZXI6ZmFsc2UsZGlzYWJsZWREYXRlOkBkaXNhYmxlZERhdGUsb25DaGFuZ2U6QGhhbmRsZUNhbGVuZGFyQ2hhbmdlfVxcXCI+PC9tcy1jYWxlbmRhcj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWJvZHlcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPiAwXFxcIj5cXG4gICAgICAgIDxtcy1jYWxlbmRhci15ZWFyLXZpZXcgOndpZGdldD1cXFwie2N1cnJlbnRNb250aDpAY3VycmVudE1vbnRoLGN1cnJlbnRZZWFyOkBjdXJyZW50WWVhcix2aWV3OkB2aWV3TW9kZSxvblNlbGVjdDpAaGFuZGxlWWVhclZpZXdTZWxlY3R9XFxcIj48L21zLWNhbGVuZGFyLXllYXItdmlldz5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWJvZHlcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPT09IC0xXFxcIj5cXG4gICAgICAgIDxtcy10aW1lcGlja2VyLXZpZXcgOndpZGdldD1cXFwie3ZhbHVlOkBjdXJyZW50RGF0ZUFycmF5LG9uQ2hhbmdlOkBoYW5kbGVUaW1lcGlja2VyQ2hhbmdlfVxcXCI+PC9tcy10aW1lcGlja2VyLXZpZXc+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlci1wYW5lbC1mb290ZXJcXFwiIDp2aXNpYmxlPVxcXCJAdmlld01vZGUgPT09IDAgJiYgIUBzaG93VGltZVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtZm9vdGVyLWJ0blxcXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLXRvZGF5LWJ0blxcXCIgOmNsaWNrPVxcXCJAdG9kYXlcXFwiPuS7iuWkqTwvYT5cXG4gICAgICAgIDwvc3Bhbj5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLWZvb3RlclxcXCIgOnZpc2libGU9XFxcIkB2aWV3TW9kZSA8PSAwICYmIEBzaG93VGltZVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtZm9vdGVyLWJ0blxcXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLW5vdy1idG5cXFwiIDpjbGljaz1cXFwiQHRvZGF5XFxcIj7mraTliLs8L2E+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XFxcImtvdW1laS1kYXRlcGlja2VyLXBhbmVsLW9rLWJ0blxcXCIgOmNsaWNrPVxcXCJAY29tcGxldGVcXFwiPuehruWumjwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cXFwia291bWVpLWRhdGVwaWNrZXItcGFuZWwtdGltZXBpY2tlci1idG5cXFwiIDpjbGljaz1cXFwiQGNoYW5nZVZpZXcoQHZpZXdNb2RlID4gLTEgPyAtMSA6IDApXFxcIj57e0B2aWV3TW9kZSA+IC0xID8gJ+mAieaLqeaXtumXtCcgOiAn6YCJ5oup5pel5pyfJ319PC9hPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1kYXRlcGlja2VyL21zLWRhdGVwaWNrZXItcGFuZWwuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktZGF0ZXBpY2tlclxcXCIgOmNzcz1cXFwie3dpZHRoOkB3aWR0aH1cXFwiPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtY2FsZW5kYXIga291bWVpLWRhdGVwaWNrZXItaWNvblxcXCI+PC9pPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdGltZXMtY2lyY2xlIGtvdW1laS1kYXRlcGlja2VyLWNsZWFyXFxcIiA6aWY9XFxcIkBzZWxlY3RlZC5sZW5ndGhcXFwiIDpjbGljaz1cXFwiQGNsZWFyXFxcIj48L2k+XFxuICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgY2xhc3M9XFxcImZvcm0tY29udHJvbCBrb3VtZWktZGF0ZXBpY2tlci1pbnB1dFxcXCJcXG4gICAgICAgIDpjbGljaz1cXFwiQGhhbmRsZUNsaWNrXFxcIlxcbiAgICAgICAgcmVhZG9ubHlcXG4gICAgICAgIDphdHRyPVxcXCJ7cGxhY2Vob2xkZXI6QHBsYWNlaG9sZGVyfVxcXCJcXG4gICAgICAgIDpjc3M9XFxcInt3aWR0aDonMTAwJSd9XFxcIlxcbiAgICAgICAgOmR1cGxleD1cXFwic2VsZWN0ZWRcXFwiIC8+XFxuICAgIDxtcy10cmlnZ2VyIDp3aWRnZXQ9XFxcIntcXG4gICAgICAgIHZpc2libGU6IEBwYW5lbFZpc2libGUsXFxuICAgICAgICBpbm5lclZtSWQ6IEBwYW5lbFZtSWQsXFxuICAgICAgICBpbm5lckNsYXNzOiBAcGFuZWxDbGFzcyxcXG4gICAgICAgIGlubmVyVGVtcGxhdGU6IEBwYW5lbFRlbXBsYXRlLFxcbiAgICAgICAgd2l0aEluQm94OiBAd2l0aEluQm94LFxcbiAgICAgICAgZ2V0VGFyZ2V0OiBAZ2V0VGFyZ2V0LFxcbiAgICAgICAgb25IaWRlOiBAaGFuZGxlUGFuZWxIaWRlXFxuICAgIH1cXFwiPlxcbiAgICA8L21zLXRyaWdnZXI+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtZGF0ZXBpY2tlci9tcy1kYXRlcGlja2VyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBoYXMtZmVlZGJhY2tcXFwiIDpjc3M9XFxcIltAaW5saW5lICYmIEBpbmxpbmVGb3JtR3JvdXBTdHlsZV1cXFwiIDpjbGFzcz1cXFwiW0BjbGFzc05hbWUsKEBoYXNSdWxlcyAmJiBAZGlydHkgPyAoQHJlYXNvbnMubGVuZ3RoID8gJ2hhcy1lcnJvcicgOiAnaGFzLXN1Y2Nlc3MnKSA6ICcnKV1cXFwiPlxcbiAgICA8bGFiZWwgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiIDppZj1cXFwiQGxhYmVsLmxlbmd0aFxcXCI+e3tAbGFiZWx9fTwvbGFiZWw+XFxuICAgIDxzbG90IC8+XFxuICAgIDxpIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2wtZmVlZGJhY2tcXFwiIDppZj1cXFwiQGhhc1J1bGVzICYmIEBzaG93SWNvblxcXCIgOmNsYXNzPVxcXCJbKEBkaXJ0eSA/ICdnbHlwaGljb24nIDogJycpLCAoQHJlYXNvbnMubGVuZ3RoID8gJ2dseXBoaWNvbi1yZW1vdmUnIDogJ2dseXBoaWNvbi1vaycpXVxcXCIgOnZpc2libGU9XFxcIkBkaXJ0eVxcXCI+PC9pPlxcbiAgICA8c21hbGwgY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiIDpjc3M9XFxcIltAaW5saW5lICYmIEBpbmxpbmVNZXNzYWdlU3R5bGVdXFxcIiA6aWY9XFxcIkBoYXNSdWxlcyAmJiBAcmVhc29ucy5sZW5ndGhcXFwiPnt7QHJlYXNvbnMubGVuZ3RoID8gQHJlYXNvbnNbMF0ubWVzc2FnZSA6ICcnfX08L3NtYWxsPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLWZvcm0vbXMtZm9ybS1pdGVtLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIFxcbiAgICA6ZHVwbGV4PVxcXCJAdGV4dFxcXCIgXFxuICAgIDphdHRyPVxcXCJ7bmFtZTpAY29sLHBsYWNlaG9sZGVyOkBwbGFjZWhvbGRlcn1cXFwiIFxcbiAgICA6Y3NzPVxcXCJ7d2lkdGg6QHdpZHRofVxcXCJcXG4gICAgZGF0YS1kdXBsZXgtY2hhbmdlZD1cXFwiQGhhbmRsZUNoYW5nZVxcXCI+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtaW5wdXQvbXMtaW5wdXQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8dWwgY2xhc3M9XFxcImtvdW1laS1tZW51XFxcIj5cXG4gICAgPGxpIDpjbGFzcz1cXFwiW1xcbiAgICAgICAgICAgICAgICAgICAgIWl0ZW0uY2hpbGRyZW4gfHwgaXRlbS5jaGlsZHJlbi5sZW5ndGggPT09IDAgPyAna291bWVpLW1lbnUtaXRlbScgOiAna291bWVpLW1lbnUtc3VibWVudScsXFxuICAgICAgICAgICAgICAgICAgICBAb3BlbktleXMuY29udGFpbnMoaXRlbS5rZXkpID8gJ2tvdW1laS1tZW51LW9wZW4nIDogJycsXFxuICAgICAgICAgICAgICAgICAgICBAc2VsZWN0ZWRLZXlzLmNvbnRhaW5zKGl0ZW0ua2V5KSA/ICdrb3VtZWktbWVudS1pdGVtLXNlbGVjdGVkJyA6ICcnXFxuICAgICAgICAgICAgICAgIF1cXFwiXFxuICAgICAgICA6Zm9yPVxcXCJpdGVtIGluIEBtZW51XFxcIj5cXG4gICAgICAgIDxhIDpjbGljaz1cXFwiaGFuZGxlQ2xpY2soaXRlbSwgaXRlbS5rZXksIFtpdGVtLmtleV0pXFxcIiBzdHlsZT1cXFwicGFkZGluZy1sZWZ0OiAyNHB4O1xcXCI+XFxuICAgICAgICAgICAgPGkgOmNsYXNzPVxcXCJbaXRlbS5pY29uXVxcXCI+PC9pPlxcbiAgICAgICAgICAgIDxzcGFuPnt7aXRlbS50aXRsZX19PC9zcGFuPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJrb3VtZWktbWVudS1jYXJldCBmYVxcXCIgOmNsYXNzPVxcXCJbQG9wZW5LZXlzLmNvbnRhaW5zKGl0ZW0ua2V5KSA/ICdmYS1hbmdsZS11cCcgOiAnZmEtYW5nbGUtZG93biddXFxcIj48L2k+XFxuICAgICAgICA8L2E+XFxuICAgICAgICA8dWwgY2xhc3M9XFxcImtvdW1laS1tZW51XFxcIj5cXG4gICAgICAgICAgICA8bGkgOmNsYXNzPVxcXCJbXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFpdGVtMi5jaGlsZHJlbiB8fCBpdGVtMi5jaGlsZHJlbi5sZW5ndGggPT09IDAgPyAna291bWVpLW1lbnUtaXRlbScgOiAna291bWVpLW1lbnUtc3VibWVudScsXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAb3BlbktleXMuY29udGFpbnMoaXRlbTIua2V5KSA/ICdrb3VtZWktbWVudS1vcGVuJyA6ICcnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHNlbGVjdGVkS2V5cy5jb250YWlucyhpdGVtMi5rZXkpID8gJ2tvdW1laS1tZW51LWl0ZW0tc2VsZWN0ZWQnIDogJydcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxcXCJcXG4gICAgICAgICAgICAgICAgOmZvcj1cXFwiaXRlbTIgaW4gaXRlbS5jaGlsZHJlblxcXCI+XFxuICAgICAgICAgICAgICAgIDxhIDpjbGljaz1cXFwiaGFuZGxlQ2xpY2soaXRlbTIsIGl0ZW0yLmtleSwgW2l0ZW0yLmtleSxpdGVtLmtleV0pXFxcIiBzdHlsZT1cXFwicGFkZGluZy1sZWZ0OiA0OHB4O1xcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57e2l0ZW0yLnRpdGxlfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cXFwia291bWVpLW1lbnUtY2FyZXQgZmFcXFwiIDpjbGFzcz1cXFwiW0BvcGVuS2V5cy5jb250YWlucyhpdGVtMi5rZXkpID8gJ2ZhLWFuZ2xlLXVwJyA6ICdmYS1hbmdsZS1kb3duJ11cXFwiPjwvaT5cXG4gICAgICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XFxcImtvdW1laS1tZW51XFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxsaSA6Y2xhc3M9XFxcIltcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaXRlbTMuY2hpbGRyZW4gfHwgaXRlbTMuY2hpbGRyZW4ubGVuZ3RoID09PSAwID8gJ2tvdW1laS1tZW51LWl0ZW0nIDogJ2tvdW1laS1tZW51LXN1Ym1lbnUnLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBzZWxlY3RlZEtleXMuY29udGFpbnMoaXRlbTMua2V5KSA/ICdrb3VtZWktbWVudS1pdGVtLXNlbGVjdGVkJyA6ICcnXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDpmb3I9XFxcIml0ZW0zIGluIGl0ZW0yLmNoaWxkcmVuXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSA6Y2xpY2s9XFxcImhhbmRsZUNsaWNrKGl0ZW0zLCBpdGVtMy5rZXksIFtpdGVtMy5rZXksaXRlbTIua2V5LGl0ZW0ua2V5XSlcXFwiIHN0eWxlPVxcXCJwYWRkaW5nLWxlZnQ6IDcycHg7XFxcIj57e2l0ZW0zLnRpdGxlfX08L2E+XFxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxcbiAgICAgICAgICAgICAgICA8L3VsPlxcbiAgICAgICAgICAgIDwvbGk+XFxuICAgICAgICA8L3VsPlxcbiAgICA8L2xpPlxcbjwvdWw+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtbWVudS9tcy1tZW51Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiYnRuLWdyb3VwXFxcIj5cXG4gICAgPGEgY2xhc3M9XFxcImJ0biBibHVlXFxcIiA6YXR0cj1cXFwie2Rpc2FibGVkOkBjdXJyZW50PT09MX1cXFwiIDpjbGljaz1cXFwiQHByZXZQYWdlXFxcIj5cXG4gICAgICAgIDxpIGNsYXNzPVxcXCJpY29uLXN0ZXAtYmFja3dhcmRcXFwiPjwvaT7kuIrkuIDpobVcXG4gICAgPC9hPlxcbiAgICA8YSBjbGFzcz1cXFwiYnRuIHN1Y2Nlc3NcXFwiPnt7IEBjdXJyZW50IH19L3t7IE1hdGguY2VpbChAdG90YWwvQHBhZ2VTaXplKSB9fTwvYT5cXG4gICAgPGEgY2xhc3M9XFxcImJ0biBibHVlXFxcIiA6YXR0cj1cXFwie2Rpc2FibGVkOkBjdXJyZW50PT09TWF0aC5jZWlsKEB0b3RhbC9AcGFnZVNpemUpfVxcXCIgOmNsaWNrPVxcXCJAbmV4dFBhZ2VcXFwiPlxcbiAgICAgICAgPGkgY2xhc3M9XFxcImljb24tc3RlcC1mb3J3YXJkXFxcIj48L2k+5LiL5LiA6aG1XFxuICAgIDwvYT5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1wYWdpbmF0aW9uL21zLXBhZ2luYXRpb24uaHRtbFxuLy8gbW9kdWxlIGlkID0gMjUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjaGVja2JveC1ncm91cFxcXCI+XFxuICAgIDxtcy1yYWRpbyBcXG4gICAgICAgIDp3aWRnZXQ9XFxcIntcXG4gICAgICAgICAgICBjaGVja2VkOkBzZWxlY3RlZCxcXG4gICAgICAgICAgICB2YWx1ZTpvcHRpb24udmFsdWUsXFxuICAgICAgICAgICAgbmFtZTpAaGVscElkLFxcbiAgICAgICAgICAgIGdyb3VwOnRydWUsXFxuICAgICAgICAgICAgb25DaGFuZ2U6ZnVuY3Rpb24oKXtcXG4gICAgICAgICAgICAgICAgQHRvZ2dsZU9wdGlvbihhcmd1bWVudHNbMF0sIG9wdGlvbilcXG4gICAgICAgICAgICB9LFxcbiAgICAgICAgICAgIGRpc2FibGVkOidkaXNhYmxlZCcgaW4gb3B0aW9uP29wdGlvbi5kaXNhYmxlZDpAZGlzYWJsZWRcXG4gICAgICAgIH1cXFwiIFxcbiAgICAgICAgOmZvcj1cXFwib3B0aW9uIGluIG9wdGlvbnNcXFwiPnt7b3B0aW9uLmxhYmVsfX08L21zLXJhZGlvPlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXJhZGlvL21zLXJhZGlvLWdyb3VwLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiA6Y2xhc3M9XFxcIkB3cmFwcGVyXFxcIiBjbGFzcz1cXFwia291bWVpLXJhZGlvXFxcIiBzdHlsZT1cXFwibWFyZ2luLXRvcDogMDsgbWFyZ2luLWJvdHRvbTogMDtcXFwiPlxcbiAgICA8bGFiZWwgY2xhc3M9XFxcImtvdW1laS1yYWRpby1pbm5lciBrb3VtZWktcmFkaW8taW5uZXItaWVcXFwiPlxcbiAgICAgICAgPGlucHV0IHR5cGU9XFxcInJhZGlvXFxcIlxcbiAgICAgICAgICAgIDphdHRyPVxcXCJ7aWQ6QGhlbHBJZCxkaXNhYmxlZDpAZGlzYWJsZWQsdmFsdWU6QHZhbHVlLG5hbWU6QG5hbWV9XFxcIlxcbiAgICAgICAgICAgIDpkdXBsZXg9XFxcIkBjaGVja2VkXFxcIlxcbiAgICAgICAgICAgIGRhdGEtZHVwbGV4LWNoYW5nZWQ9XFxcIkBvbkNoYW5nZVxcXCJcXG4gICAgICAgICAgICAvPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcInRleHRcXFwiPjwvc3Bhbj5cXG4gICAgPC9sYWJlbD5cXG4gICAgPGxhYmVsIDphdHRyPVxcXCJ7J2Zvcic6QGhlbHBJZH1cXFwiIHN0eWxlPVxcXCJwYWRkaW5nLWxlZnQ6IDA7XFxcIiA6Y3NzPVxcXCJ7bWFyZ2luUmlnaHQ6QGdyb3VwPzg6MH1cXFwiPjxzbG90IC8+PC9sYWJlbD5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1yYWRpby9tcy1yYWRpby5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgc3R5bGU9XFxcIm92ZXJmbG93OiBhdXRvXFxcIj5cXG4gICAgPHVsIGNsYXNzPVxcXCJrb3VtZWktc2VsZWN0LWRyb3Bkb3duLW1lbnVcXFwiIHJvbGU9XFxcIm1lbnVcXFwiPlxcbiAgICAgICAgPGxpIGNsYXNzPVxcXCJrb3VtZWktc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbVxcXCJcXG4gICAgICAgICAgICA6Y2xhc3M9XFxcIltcXG4gICAgICAgICAgICAgICAgKEBzZWxlY3Rpb24uc29tZShmdW5jdGlvbigpe3JldHVybiBhcmd1bWVudHNbMF0udmFsdWU9PT1vcHRpb24udmFsdWV9KSA/ICdrb3VtZWktc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbS1zZWxlY3RlZCcgOiAnJyksXFxuICAgICAgICAgICAgICAgIChvcHRpb24uZGlzYWJsZWQgPyAna291bWVpLXNlbGVjdC1kcm9wZG93bi1tZW51LWl0ZW0tZGlzYWJsZWQnIDogJycpXFxuICAgICAgICAgICAgXVxcXCJcXG4gICAgICAgICAgICA6Zm9yPVxcXCJvcHRpb24gaW4gQGdldEZpbHRlcmVkT3B0aW9ucygpXFxcIlxcbiAgICAgICAgICAgIDpjbGljaz1cXFwiQGhhbmRsZU9wdGlvbkNsaWNrKCRldmVudCwgb3B0aW9uKVxcXCJcXG4gICAgICAgICAgICByb2xlPVxcXCJtZW51aXRlbVxcXCI+XFxuICAgICAgICAgICAge3tvcHRpb24ubGFiZWx9fVxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS1jaGVja1xcXCIgOnZpc2libGU9XFxcIkBpc011bHRpcGxlXFxcIj48L2k+XFxuICAgICAgICA8L2xpPlxcbiAgICAgICAgPGxpIGNsYXNzPVxcXCJrb3VtZWktc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbSBrb3VtZWktc2VsZWN0LWRyb3Bkb3duLW1lbnUtaXRlbS1kaXNhYmxlZFxcXCJcXG4gICAgICAgICAgICA6dmlzaWJsZT1cXFwiQGdldEZpbHRlcmVkT3B0aW9ucygpLmxlbmd0aCA8PSAwICYmIEBzZWFyY2hWYWx1ZSAmJiAhQGxvYWRpbmdcXFwiPuaXoOaVsOaNrjwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImtvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtIGtvdW1laS1zZWxlY3QtZHJvcGRvd24tbWVudS1pdGVtLWRpc2FibGVkXFxcIlxcbiAgICAgICAgICAgIDp2aXNpYmxlPVxcXCJAbG9hZGluZ1xcXCI+5Yqg6L295LitPC9saT5cXG4gICAgPC91bD5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1zZWxlY3QvbXMtc2VsZWN0LXBhbmVsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwia291bWVpLXNlbGVjdCBmb3JtLWNvbnRyb2xcXFwiXFxuICAgIDpjbGFzcz1cXFwiWyhAaXNNdWx0aXBsZSA/ICdrb3VtZWktc2VsZWN0LW11bHRpcGxlJyA6ICcnKV1cXFwiXFxuICAgIDpjc3M9XFxcInt3aWR0aDpAd2lkdGh9XFxcIlxcbiAgICA6Y2xpY2s9XFxcIkBoYW5kbGVDbGlja1xcXCJcXG4gICAgcm9sZT1cXFwiY29tYm9ib3hcXFwiXFxuICAgIGFyaWEtYXV0b2NvbXBsZXRlPVxcXCJsaXN0XFxcIlxcbiAgICBhcmlhLWhhc3BvcHVwPVxcXCJ0cnVlXFxcIlxcbiAgICA6YXR0cj1cXFwieydhcmlhLWV4cGFuZGVkJzogQHBhbmVsVmlzaWJsZSArICcnfVxcXCI+XFxuICAgIDx1bCBjbGFzcz1cXFwia291bWVpLXNlbGVjdC1zZWxlY3Rpb25cXFwiIDpjbGFzcz1cXFwiWyhAaXNNdWx0aXBsZSA/ICdrb3VtZWktc2VsZWN0LXRhZ3MnIDogJycpXVxcXCI+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImtvdW1laS1zZWxlY3Qtc2VsZWN0ZWRcXFwiIDp2aXNpYmxlPVxcXCIhQGlzTXVsdGlwbGUgJiYgKCFAc2hvd1NlYXJjaCB8fCAhQHBhbmVsVmlzaWJsZSlcXFwiPnt7QGRpc3BsYXlWYWx1ZX19PC9saT5cXG4gICAgICAgIDxsaSBjbGFzcz1cXFwia291bWVpLXNlbGVjdC1jaG9pY2VcXFwiIDpmb3I9XFxcImNob2ljZSBpbiBAc2VsZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICA8c3Bhbj57e2Nob2ljZS5sYWJlbH19PC9zcGFuPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10aW1lc1xcXCIgOmNsaWNrPVxcXCJAcmVtb3ZlU2VsZWN0aW9uKCRldmVudCwgY2hvaWNlKSB8IHN0b3BcXFwiPjwvaT5cXG4gICAgICAgIDwvbGk+XFxuICAgICAgICA8bGkgY2xhc3M9XFxcImtvdW1laS1zZWxlY3Qtc2VhcmNoXFxcIj5cXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XFxcImtvdW1laS1zZWxlY3Qtc2VhcmNoLWZpZWxkXFxcIlxcbiAgICAgICAgICAgICAgICBuYW1lPVxcXCJzZWFyY2hcXFwiXFxuICAgICAgICAgICAgICAgIHR5cGU9XFxcInRleHRcXFwiXFxuICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cXFwib2ZmXFxcIlxcbiAgICAgICAgICAgICAgICA6ZHVwbGV4PVxcXCJAc2VhcmNoVmFsdWVcXFwiXFxuICAgICAgICAgICAgICAgIDpjc3M9XFxcInt2aXNpYmlsaXR5OihAc2hvd1NlYXJjaCAmJiBAcGFuZWxWaXNpYmxlKT8ndmlzaWJsZSc6J2hpZGRlbid9XFxcIlxcbiAgICAgICAgICAgICAgICA6a2V5ZG93bj1cXFwiQGhhbmRsZURlbGV0ZVxcXCIgLz5cXG4gICAgICAgIDwvbGk+XFxuICAgIDwvdWw+XFxuICAgIDxpIGNsYXNzPVxcXCJmYSBrb3VtZWktc2VsZWN0LWFycm93XFxcIlxcbiAgICAgICAgOmNsYXNzPVxcXCJbKEBwYW5lbFZpc2libGUgPyAnZmEtY2FyZXQtdXAnIDogJ2ZhLWNhcmV0LWRvd24nKV1cXFwiXFxuICAgICAgICA6dmlzaWJsZT1cXFwiQG1vZGUgPT09ICcnXFxcIj48L2k+XFxuICAgIDxtcy10cmlnZ2VyIDp3aWRnZXQ9XFxcIntcXG4gICAgICAgIHdpZHRoOiBAcGFuZWxXaWR0aCxcXG4gICAgICAgIHZpc2libGU6IEBwYW5lbFZpc2libGUsXFxuICAgICAgICBpbm5lclZtSWQ6IEBwYW5lbFZtSWQsXFxuICAgICAgICBpbm5lckNsYXNzOiBAcGFuZWxDbGFzcyxcXG4gICAgICAgIGlubmVyVGVtcGxhdGU6IEBwYW5lbFRlbXBsYXRlLFxcbiAgICAgICAgd2l0aEluQm94OiBAd2l0aEluQm94LFxcbiAgICAgICAgZ2V0VGFyZ2V0OiBAZ2V0VGFyZ2V0LFxcbiAgICAgICAgb25IaWRlOiBAaGFuZGxlUGFuZWxIaWRlfVxcXCI+XFxuICAgIDwvbXMtdHJpZ2dlcj5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy1zZWxlY3QvbXMtc2VsZWN0Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdj5cXG4gICAgPHRhYmxlIGNsYXNzPVxcXCJ0YWJsZVxcXCIgOmxvYWRpbmc9XFxcIiF3aW5kb3cuaXNOYU4oQHBhZ2luYXRpb25Db25maWcudG90YWwpICYmIEBsb2FkaW5nXFxcIj5cXG4gICAgICAgIDx0aGVhZD5cXG4gICAgICAgICAgICA8dHI+XFxuICAgICAgICAgICAgICAgIDx0aCA6aWY9XFxcIkBuZWVkU2VsZWN0aW9uXFxcIj5cXG4gICAgICAgICAgICAgICAgICAgIDxtcy1jaGVja2JveCA6d2lkZ2V0PVxcXCJ7Y2hlY2tlZDpAaXNBbGxDaGVja2VkLG9uQ2hhbmdlOkBoYW5kbGVDaGVja0FsbH1cXFwiPjwvbXMtY2hlY2tib3g+XFxuICAgICAgICAgICAgICAgIDwvdGg+XFxuICAgICAgICAgICAgICAgIDx0aCA6Zm9yPVxcXCJlbCBpbiBAY29sdW1uc1xcXCI+e3tlbC50aXRsZX19PC90aD5cXG4gICAgICAgICAgICA8L3RyPlxcbiAgICAgICAgPC90aGVhZD5cXG4gICAgICAgIDx0Ym9keT5cXG4gICAgICAgICAgICA8dHIgOmZvcj1cXFwiKCRpbmRleCwgcmVjb3JkKSBpbiBAZ2V0Q3VycmVudFBhZ2VEYXRhKClcXFwiPlxcbiAgICAgICAgICAgICAgICA8dGQgOmlmPVxcXCJAbmVlZFNlbGVjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8bXMtY2hlY2tib3ggOndpZGdldD1cXFwie2NoZWNrZWQ6QGNoZWNrZWQuaW5kZXhPZihyZWNvcmRbQGtleV0pIT0tMSxvbkNoYW5nZTpmdW5jdGlvbigpe0BoYW5kbGVDaGVjayhhcmd1bWVudHNbMF0udGFyZ2V0LmNoZWNrZWQscmVjb3JkKX19XFxcIj48L21zLWNoZWNrYm94PlxcbiAgICAgICAgICAgICAgICA8L3RkPlxcbiAgICAgICAgICAgICAgICA8dGQgOmZvcj1cXFwiY29sIGluIEBjb2x1bW5zXFxcIiA6aHRtbD1cXFwiY29sLnRlbXBsYXRlXFxcIj48L3RkPlxcbiAgICAgICAgICAgIDwvdHI+XFxuICAgICAgICA8L3Rib2R5PlxcbiAgICA8L3RhYmxlPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJwdWxsLXJpZ2h0XFxcIj5cXG4gICAgICAgIDxtcy1wYWdpbmF0aW9uIDp3aWRnZXQ9XFxcIntjdXJyZW50OkBwYWdpbmF0aW9uQ29uZmlnLmN1cnJlbnQscGFnZVNpemU6QHBhZ2luYXRpb25Db25maWcucGFnZVNpemUsdG90YWw6QHRvdGFsLG9uQ2hhbmdlOkBoYW5kbGVQYWdlQ2hhbmdlfVxcXCI+PC9tcy1wYWdpbmF0aW9uPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY2xlYXJmaXhcXFwiPjwvZGl2PlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXRhYmxlL21zLXRhYmxlLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHRleHRhcmVhIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIFxcbiAgICA6ZHVwbGV4PVxcXCJAdGV4dFxcXCIgXFxuICAgIDphdHRyPVxcXCJ7cm93czpAcm93cyxuYW1lOkBjb2x9XFxcIlxcbiAgICBkYXRhLWR1cGxleC1jaGFuZ2VkPVxcXCJAaGFuZGxlQ2hhbmdlXFxcIj48L3RleHRhcmVhPlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXRleHRhcmVhL21zLXRleHRhcmVhLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwia291bWVpLXRpbWVwaWNrZXItdmlld1xcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS10aW1lcGlja2VyLXZpZXctY29tYm9ib3hcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwia291bWVpLXRpbWVwaWNrZXItdmlldy1zZWxlY3RcXFwiIG5hbWU9XFxcImhvdXItb3B0aW9uc1xcXCI+XFxuICAgICAgICAgICAgPHVsPlxcbiAgICAgICAgICAgICAgICA8bGkgOmZvcj1cXFwiaG91ciBpbiBAaG91ck9wdGlvbnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XFxcIlsoaG91cj09QGN1cnJlbnRIb3VyPydrb3VtZWktdGltZXBpY2tlci12aWV3LXNlbGVjdC1vcHRpb24tc2VsZWN0ZWQnOicnKV1cXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Y2xpY2s9XFxcIkBzZWxlY3QoaG91ciwgJ2hvdXInKVxcXCI+e3tob3VyfX08L2xpPlxcbiAgICAgICAgICAgIDwvdWw+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImtvdW1laS10aW1lcGlja2VyLXZpZXctc2VsZWN0XFxcIiBuYW1lPVxcXCJtaW51dGUtb3B0aW9uc1xcXCI+XFxuICAgICAgICAgICAgPHVsPlxcbiAgICAgICAgICAgICAgICA8bGkgOmZvcj1cXFwibWludXRlIGluIEBtaW51dGVPcHRpb25zXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgOmNsYXNzPVxcXCJbKG1pbnV0ZT09QGN1cnJlbnRNaW51dGU/J2tvdW1laS10aW1lcGlja2VyLXZpZXctc2VsZWN0LW9wdGlvbi1zZWxlY3RlZCc6JycpXVxcXCJcXG4gICAgICAgICAgICAgICAgICAgIDpjbGljaz1cXFwiQHNlbGVjdChtaW51dGUsICdtaW51dGUnKVxcXCI+e3ttaW51dGV9fTwvbGk+XFxuICAgICAgICAgICAgPC91bD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwia291bWVpLXRpbWVwaWNrZXItdmlldy1zZWxlY3RcXFwiIG5hbWU9XFxcInNlY29uZC1vcHRpb25zXFxcIj5cXG4gICAgICAgICAgICA8dWw+XFxuICAgICAgICAgICAgICAgIDxsaSA6Zm9yPVxcXCJzZWNvbmQgaW4gQHNlY29uZE9wdGlvbnNcXFwiXFxuICAgICAgICAgICAgICAgICAgICA6Y2xhc3M9XFxcIlsoc2Vjb25kPT1AY3VycmVudFNlY29uZD8na291bWVpLXRpbWVwaWNrZXItdmlldy1zZWxlY3Qtb3B0aW9uLXNlbGVjdGVkJzonJyldXFxcIlxcbiAgICAgICAgICAgICAgICAgICAgOmNsaWNrPVxcXCJAc2VsZWN0KHNlY29uZCwgJ3NlY29uZCcpXFxcIj57e3NlY29uZH19PC9saT5cXG4gICAgICAgICAgICA8L3VsPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21zLXRpbWVwaWNrZXIvbXMtdGltZXBpY2tlci12aWV3Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwia291bWVpLXRpbWVwaWNrZXJcXFwiIDpjc3M9XFxcInt3aWR0aDpAd2lkdGh9XFxcIj5cXG4gICAgPGkgY2xhc3M9XFxcImZhIGZhLWNsb2NrLW8ga291bWVpLXRpbWVwaWNrZXItaWNvblxcXCI+PC9pPlxcbiAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdGltZXMtY2lyY2xlIGtvdW1laS10aW1lcGlja2VyLWNsZWFyXFxcIiA6aWY9XFxcIkBzZWxlY3RlZC5sZW5ndGhcXFwiIDpjbGljaz1cXFwiQGNsZWFyXFxcIj48L2k+XFxuICAgIDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIlxcbiAgICAgICAgY2xhc3M9XFxcImZvcm0tY29udHJvbCBrb3VtZWktdGltZXBpY2tlci1pbnB1dFxcXCJcXG4gICAgICAgIDpjbGljaz1cXFwiQGhhbmRsZUNsaWNrXFxcIlxcbiAgICAgICAgcmVhZG9ubHlcXG4gICAgICAgIDphdHRyPVxcXCJ7cGxhY2Vob2xkZXI6QHBsYWNlaG9sZGVyfVxcXCJcXG4gICAgICAgIDpjc3M9XFxcInt3aWR0aDonMTAwJSd9XFxcIlxcbiAgICAgICAgOmR1cGxleD1cXFwic2VsZWN0ZWRcXFwiIC8+XFxuICAgIDxtcy10cmlnZ2VyIDp3aWRnZXQ9XFxcIntcXG4gICAgICAgIHZpc2libGU6IEBwYW5lbFZpc2libGUsXFxuICAgICAgICBpbm5lclZtSWQ6IEBwYW5lbFZtSWQsXFxuICAgICAgICBpbm5lckNsYXNzOiBAcGFuZWxDbGFzcyxcXG4gICAgICAgIGlubmVyVGVtcGxhdGU6IEBwYW5lbFRlbXBsYXRlLFxcbiAgICAgICAgd2l0aEluQm94OiBAd2l0aEluQm94LFxcbiAgICAgICAgZ2V0VGFyZ2V0OiBAZ2V0VGFyZ2V0LFxcbiAgICAgICAgb25IaWRlOiBAaGFuZGxlUGFuZWxIaWRlXFxuICAgIH1cXFwiPlxcbiAgICA8L21zLXRyaWdnZXI+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdGltZXBpY2tlci9tcy10aW1lcGlja2VyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHVsIGNsYXNzPVxcXCJrb3VtZWktdHJlZVxcXCI+XFxuICAgIDxsaSA6Zm9yPVxcXCIoaW5kZXgsIGVsKSBpbiBAdHJlZSB8IGdldCgwKVxcXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwia291bWVpLXRyZWUtaWNvbiBmYVxcXCIgOmNsYXNzPVxcXCJbQGNoYW5nZUljb24oZWwpXVxcXCIgOmNsaWNrPVxcXCJAb3BlblN1YlRyZWUoZWwpXFxcIj48L3NwYW4+XFxuICAgICAgICB7e2VsLnRleHR9fVxcbiAgICAgICAgPGRpdiA6dmlzaWJsZT1cXFwiZWwub3BlblxcXCIgOmh0bWw9XFxcIkByZW5kZXJTdWJUcmVlKGVsKVxcXCI+PC9kaXY+XFxuICAgIDwvbGk+XFxuPC91bD5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy10cmVlL21zLXRyZWUuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmRcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtaXRlbVxcXCIgOmNsYXNzPVxcXCJbKGZpbGUuc3RhdHVzID09PSAnZXJyb3InID8gJ2JvcmRlcmVkLWRhbmdlcicgOiAnJyldXFxcIiA6Zm9yPVxcXCIoJGluZGV4LCBmaWxlKSBpbiBAZmlsZUxpc3RcXFwiPlxcbiAgICAgICAgPGltZyA6YXR0cj1cXFwie3NyYzpmaWxlLnVybCxhbHQ6ZmlsZS5uYW1lLHRpdGxlOmZpbGUubmFtZX1cXFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XFxcImtvdW1laS11cGxvYWQtY2FyZC1wcm9ncmVzc1xcXCIgOnZpc2libGU9XFxcImZpbGUuc3RhdHVzID09PSAndXBsb2FkaW5nJ1xcXCI+5LiK5Lyg5LitIHt7ZmlsZS5wcm9ncmVzc319JTwvc3Bhbj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtdG9vbFxcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWV5ZVxcXCI+PC9pPlxcbiAgICAgICAgICAgIDxpIGNsYXNzPVxcXCJmYSBmYS10cmFzaC1vXFxcIiA6Y2xpY2s9XFxcImRlbChmaWxlKVxcXCI+PC9pPlxcbiAgICAgICAgPC9zcGFuPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tcy11cGxvYWQvbXMtdXBsb2FkLWNhcmQuaHRtbFxuLy8gbW9kdWxlIGlkID0gMjYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIm1vZHVsZS5leHBvcnRzID0gXCI8dWwgY2xhc3M9XFxcImtvdW1laS11cGxvYWQtbGlzdFxcXCI+XFxuICAgIDxsaSA6Zm9yPVxcXCIoJGluZGV4LCBmaWxlKSBpbiBAZmlsZUxpc3RcXFwiXFxuICAgICAgICA6Y2xhc3M9XFxcIltAZ2V0VGV4dENsYXNzKGZpbGUpXVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWxpc3QtaW5mb1xcXCI+XFxuICAgICAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWZpbGUtbyB0ZXh0LW11dGVkXFxcIj48L2k+XFxuICAgICAgICAgICAgPHNwYW4gOmF0dHI9XFxcInt0aXRsZTpmaWxlLm5hbWV9XFxcIj57e2ZpbGUubmFtZX19PC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8aSBjbGFzcz1cXFwiZmEgZmEtdGltZXMga291bWVpLXVwbG9hZC1idG4tY2xvc2VcXFwiIDpjbGljaz1cXFwiZGVsKGZpbGUpXFxcIj48L2k+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cXFwia291bWVpLXVwbG9hZC1saXN0LXByb2dyZXNzXFxcIiA6dmlzaWJsZT1cXFwiZmlsZS5zdGF0dXMgPT09ICd1cGxvYWRpbmcnXFxcIj7kuIrkvKDkuK0ge3tmaWxlLnByb2dyZXNzfX0lPC9zcGFuPlxcbiAgICAgICAgPGkgY2xhc3M9XFxcImZhIGZhLWNoZWNrLWNpcmNsZSB0ZXh0LXN1Y2Nlc3NcXFwiIDpjbGFzcz1cXFwiWyhmaWxlLnN0YXR1cyA9PT0gJ2RvbmUnID8gJycgOiAnaGlkZScpXVxcXCI+PC9pPlxcbiAgICA8L2xpPlxcbjwvdWw+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC1saXN0Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDI2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwia291bWVpLXVwbG9hZC1jb250YWluZXJcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtd2FsbFxcXCIgOmlmPVxcXCJAc2hvd1VwbG9hZExpc3QgJiYgQGxpc3RUeXBlPT09J3BpY3R1cmUtY2FyZCdcXFwiPlxcbiAgICAgICAgPG1zLXVwbG9hZC1jYXJkIDp3aWRnZXQ9XFxcIntmaWxlTGlzdDogQGZpbGVMaXN0LCBvblJlbW92ZTogQGhhbmRsZVJlbW92ZX1cXFwiPjwvbXMtdXBsb2FkLWNhcmQ+XFxuICAgIDwvZGl2PlxcbiAgICA8bGFiZWwgOnZpc2libGU9XFxcIiFAc2hvd1VwbG9hZExpc3QgJiYgQGxpc3RUeXBlPT09J3BpY3R1cmUtY2FyZCcgJiYgQGZpbGVMaXN0Lmxlbmd0aCA+IDBcXFwiIGNsYXNzPVxcXCJrb3VtZWktdXBsb2FkLWNhcmQtaXRlbVxcXCIgOmF0dHI9XFxcInsnZm9yJzpAaGVscElkfVxcXCI+XFxuICAgICAgICA8aW1nIDphdHRyPVxcXCJ7c3JjOkBmaWxlTGlzdFswXT9AZmlsZUxpc3RbMF0udXJsOmJsYW5rSW1nLGFsdDpAZmlsZUxpc3RbMF0/QGZpbGVMaXN0WzBdLm5hbWU6JycsdGl0bGU6QGZpbGVMaXN0WzBdP0BmaWxlTGlzdFswXS5uYW1lOicnfVxcXCI+XFxuICAgIDwvbGFiZWw+XFxuICAgIDxsYWJlbCA6dmlzaWJsZT1cXFwiQHNob3dVcGxvYWRMaXN0IHx8IEBmaWxlTGlzdC5sZW5ndGggPT0gMFxcXCIgOmNsYXNzPVxcXCJbKEBsaXN0VHlwZT09PSdwaWN0dXJlLWNhcmQnP0BjYXJkQ2xhc3M6QGJ0bkNsYXNzKV1cXFwiIDphdHRyPVxcXCJ7J2Zvcic6QGhlbHBJZH1cXFwiPjxzbG90IC8+PC9sYWJlbD5cXG4gICAgPGZvcm0+PGlucHV0IHR5cGU9XFxcImZpbGVcXFwiIG5hbWU9XFxcImZpbGVcXFwiIDphdHRyPVxcXCJ7aWQ6QGhlbHBJZH1cXFwiPjwvZm9ybT5cXG4gICAgPGRpdiA6aWY9XFxcIkBzaG93VXBsb2FkTGlzdCAmJiBAbGlzdFR5cGUhPT0ncGljdHVyZS1jYXJkJ1xcXCI+XFxuICAgICAgICA8bXMtdXBsb2FkLWxpc3QgOndpZGdldD1cXFwie2ZpbGVMaXN0OiBAZmlsZUxpc3QsIG9uUmVtb3ZlOiBAaGFuZGxlUmVtb3ZlfVxcXCI+PC9tcy11cGxvYWQtbGlzdD5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbXMtdXBsb2FkL21zLXVwbG9hZC5odG1sXG4vLyBtb2R1bGUgaWQgPSAyNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwicmVxdWlyZSgnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnKTtcbnJlcXVpcmUoJ2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzcycpO1xucmVxdWlyZSgnaGlnaGxpZ2h0LmpzL3N0eWxlcy9hdG9tLW9uZS1saWdodC5jc3MnKTtcblxucmVxdWlyZSgnZXM1LXNoaW0nKTtcbnJlcXVpcmUoJ2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuYXV0bycpO1xuXG52YXIgalF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG53aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSBqUXVlcnk7XG5yZXF1aXJlKCdib290c3RyYXAnKTtcbnZhciBib290Ym94ID0gcmVxdWlyZSgnYm9vdGJveCcpO1xuYm9vdGJveC5zZXRMb2NhbGUoJ3poX0NOJyk7XG5cbnZhciBhdmFsb24gPSByZXF1aXJlKCdhdmFsb24yJyk7XG5hdmFsb24uY29uZmlnKHtcbiAgICBkZWJ1ZzogdHJ1ZVxufSk7XG5pZiAoYXZhbG9uLm1zaWUgPT09IDgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wZXJ0eSwgbWV0YSkge1xuICAgICAgICBvYmpbcHJvcGVydHldID0gbWV0YS52YWx1ZTtcbiAgICB9XG59XG5yZXF1aXJlKCdlczUtc2hpbS9lczUtc2hhbScpO1xucmVxdWlyZSgnLi9yb3V0ZXInKTtcbnJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbXMtbGF5b3V0Jyk7XG5yZXF1aXJlKCcuL2NvbXBvbmVudHMvZG9jLXNpZGViYXIvZG9jLXNpZGViYXInKTtcblxuYXZhbG9uLmRlZmluZSh7XG4gICAgJGlkOiAncm9vdCcsXG4gICAgY3VycmVudFBhZ2U6ICcnLFxuICAgIGJyZWFkY3J1bWI6IFtdXG59KTtcbmF2YWxvbi5oaXN0b3J5LnN0YXJ0KHtcbiAgICBmaXJlQW5jaG9yOiBmYWxzZVxufSk7XG5pZiAoIS8jIS8udGVzdChnbG9iYWwubG9jYXRpb24uaGFzaCkpIHtcbiAgICBhdmFsb24ucm91dGVyLm5hdmlnYXRlKCcvJywgMik7XG59XG5hdmFsb24uc2Nhbihkb2N1bWVudC5ib2R5KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25ld2RvY3MvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG1zLW1lbnUgOndpZGdldD1cXFwie21lbnU6QG1lbnUsb3BlbktleXM6QG9wZW5LZXlzLHNlbGVjdGVkS2V5czpAc2VsZWN0ZWRLZXlzLG9uQ2xpY2s6QGhhbmRsZU1lbnVDbGljayxvbk9wZW5DaGFuZ2U6QGhhbmRsZU9wZW5DaGFuZ2V9XFxcIj48L21zLW1lbnU+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25ld2RvY3MvY29tcG9uZW50cy9kb2Mtc2lkZWJhci9kb2Mtc2lkZWJhci5odG1sXG4vLyBtb2R1bGUgaWQgPSAzNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAyIiwiLyogKGlnbm9yZWQpICovXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gdmVydHggKGlnbm9yZWQpXG4vLyBtb2R1bGUgaWQgPSAzNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAyIl0sInNvdXJjZVJvb3QiOiIifQ==