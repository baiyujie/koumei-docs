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
return webpackJsonpindex([1],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var avalon = __webpack_require__(1);
__webpack_require__(24);
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
// const routeConfig = [{
//     path: '/ms-input',
//     component(resolve) {
//         require.ensure([], function () {
//             resolve(require('../components/ms-input/demo/input.md'));
//         });
//     }
// }, {
//     path: '/ms-select',
//     component(resolve) {
//         require.ensure([], function () {
//             resolve(require('../components/ms-select/demo/select.md'));
//         });
//     }
// }];
// applyRouteConfig(routeConfig, {
//     name: 'root'
// }); 


/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);

__webpack_require__(6);
__webpack_require__(7);

var jQuery = __webpack_require__(2);
window.$ = window.jQuery = jQuery;
__webpack_require__(4);
var bootbox = __webpack_require__(3);
bootbox.setLocale('zh_CN');

__webpack_require__(11);

var avalon = __webpack_require__(1);
avalon.config({
    debug: true
});
if (avalon.msie === 8) {
    Object.defineProperty = function (obj, property, meta) {
        obj[property] = meta.value;
    }
}
__webpack_require__(5);

avalon.define({
    $id: 'root',
    currentPage: ''
});
avalon.history.start({
    fireAnchor: false
});
if (!/#!/.test(global.location.hash)) {
    avalon.router.navigate('/', 2);
}
avalon.scan(document.body);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[26]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy8uL3Rlc3RzL3JvdXRlci50cyIsIndlYnBhY2s6Ly8vLi90ZXN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vdmVydHggKGlnbm9yZWQpIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7OztBQ1ZBLG9DQUFrQztBQUNsQyx3QkFBa0I7QUFFbEIsaUJBQWlCLFNBQVM7SUFDdEIsSUFBTSxJQUFJLEdBQUcsZUFBWSxTQUFTLDBCQUFtQixTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsZ0JBQVksQ0FBQztJQUMvRixNQUFNLENBQUMsSUFBSTtBQUNmLENBQUM7QUFFRCwwQkFBMEIsTUFBTSxFQUFFLFdBQVcsRUFBRSxPQUFZO0lBQVosc0NBQVk7SUFDdkQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUs7UUFDdEIsSUFBSSxVQUFVLEdBQU8sRUFBRSxDQUFDO1FBQ3hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFVBQVUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUM3QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFDbEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFRO2dCQUNoQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sU0FBUyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xDLFNBQVMsQ0FBQyxVQUFVLENBQUM7d0JBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pFLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDekUsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDSCxjQUFjO1FBQ2Qsa0ZBQWtGO0lBQ3RGLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsMkJBQTJCO0FBQzNCLDJDQUEyQztBQUMzQyx3RUFBd0U7QUFDeEUsY0FBYztBQUNkLFFBQVE7QUFDUixPQUFPO0FBQ1AsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUMzQiwyQ0FBMkM7QUFDM0MsMEVBQTBFO0FBQzFFLGNBQWM7QUFDZCxRQUFRO0FBQ1IsTUFBTTtBQUVOLGtDQUFrQztBQUNsQyxtQkFBbUI7QUFDbkIsTUFBTTs7Ozs7Ozs7OENDcEROO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSwyQjs7Ozs7Ozs7QUNwQ0EsZSIsImZpbGUiOiJhcHBkZGQ5ZWE5YzAyOTA2NWZjYWYxYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImluZGV4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImluZGV4XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsImltcG9ydCAqIGFzIGF2YWxvbiBmcm9tICdhdmFsb24yJztcbmltcG9ydCAnbW1Sb3V0ZXInO1xuXG5mdW5jdGlvbiBnZXRQYWdlKGNvbXBvbmVudCkge1xuICAgIGNvbnN0IGh0bWwgPSBgPHhtcCBpcz1cIiR7Y29tcG9uZW50fVwiIDp3aWRnZXQ9XCJ7aWQ6JyR7Y29tcG9uZW50LnJlcGxhY2UoL1xcLS9nLCAnXycpfSd9XCI+PC94bXA+YDtcbiAgICByZXR1cm4gaHRtbFxufVxuXG5mdW5jdGlvbiBhcHBseVJvdXRlQ29uZmlnKGNvbmZpZywgcGFyZW50Um91dGUsIGFjY1BhdGggPSAnJykge1xuICAgIGNvbmZpZy5tYXAoZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIGxldCBjb21wb25lbnRzOmFueSA9IHt9O1xuICAgICAgICBpZiAocm91dGUuY29tcG9uZW50KSB7XG4gICAgICAgICAgICBjb21wb25lbnRzLmN1cnJlbnRQYWdlID0gcm91dGUuY29tcG9uZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3V0ZS5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzID0gcm91dGUuY29tcG9uZW50cztcbiAgICAgICAgfVxuICAgICAgICBhdmFsb24ucm91dGVyLmFkZChhY2NQYXRoICsgcm91dGUucGF0aCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29tcG9uZW50cykubWFwKHZpZXdOYW1lID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1t2aWV3TmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50KGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdmFsb24udm1vZGVsc1twYXJlbnRSb3V0ZS5uYW1lXVt2aWV3TmFtZV0gPSBnZXRQYWdlKG0ubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF2YWxvbi52bW9kZWxzW3BhcmVudFJvdXRlLm5hbWVdW3ZpZXdOYW1lXSA9IGdldFBhZ2UoY29tcG9uZW50Lm5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gVE9ETyDmlK/mjIHltYzlpZfot6/nlLFcbiAgICAgICAgLy9yb3V0ZS5jaGlsZHJlbiAmJiBhcHBseVJvdXRlQ29uZmlnKHJvdXRlLmNoaWxkcmVuLCByb3V0ZSwgYWNjUGF0aCArIHJvdXRlLnBhdGgpO1xuICAgIH0pO1xufVxuXG4vLyBjb25zdCByb3V0ZUNvbmZpZyA9IFt7XG4vLyAgICAgcGF0aDogJy9tcy1pbnB1dCcsXG4vLyAgICAgY29tcG9uZW50KHJlc29sdmUpIHtcbi8vICAgICAgICAgcmVxdWlyZS5lbnN1cmUoW10sIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJlc29sdmUocmVxdWlyZSgnLi4vY29tcG9uZW50cy9tcy1pbnB1dC9kZW1vL2lucHV0Lm1kJykpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9XG4vLyB9LCB7XG4vLyAgICAgcGF0aDogJy9tcy1zZWxlY3QnLFxuLy8gICAgIGNvbXBvbmVudChyZXNvbHZlKSB7XG4vLyAgICAgICAgIHJlcXVpcmUuZW5zdXJlKFtdLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXNvbHZlKHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvbXMtc2VsZWN0L2RlbW8vc2VsZWN0Lm1kJykpO1xuLy8gICAgICAgICB9KTtcbi8vICAgICB9XG4vLyB9XTtcblxuLy8gYXBwbHlSb3V0ZUNvbmZpZyhyb3V0ZUNvbmZpZywge1xuLy8gICAgIG5hbWU6ICdyb290J1xuLy8gfSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vdGVzdHMvcm91dGVyLnRzIiwicmVxdWlyZSgnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5jc3MnKTtcbnJlcXVpcmUoJ2ZvbnQtYXdlc29tZS9jc3MvZm9udC1hd2Vzb21lLmNzcycpO1xucmVxdWlyZSgnaGlnaGxpZ2h0LmpzL3N0eWxlcy9hdG9tLW9uZS1saWdodC5jc3MnKTtcblxucmVxdWlyZSgnZXM1LXNoaW0nKTtcbnJlcXVpcmUoJ2VzNi1wcm9taXNlL2Rpc3QvZXM2LXByb21pc2UuYXV0bycpO1xuXG52YXIgalF1ZXJ5ID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG53aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSBqUXVlcnk7XG5yZXF1aXJlKCdib290c3RyYXAnKTtcbnZhciBib290Ym94ID0gcmVxdWlyZSgnYm9vdGJveCcpO1xuYm9vdGJveC5zZXRMb2NhbGUoJ3poX0NOJyk7XG5cbnJlcXVpcmUoJy4vcm91dGVyJyk7XG5cbnZhciBhdmFsb24gPSByZXF1aXJlKCdhdmFsb24yJyk7XG5hdmFsb24uY29uZmlnKHtcbiAgICBkZWJ1ZzogdHJ1ZVxufSk7XG5pZiAoYXZhbG9uLm1zaWUgPT09IDgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wZXJ0eSwgbWV0YSkge1xuICAgICAgICBvYmpbcHJvcGVydHldID0gbWV0YS52YWx1ZTtcbiAgICB9XG59XG5yZXF1aXJlKCdlczUtc2hpbS9lczUtc2hhbScpO1xuXG5hdmFsb24uZGVmaW5lKHtcbiAgICAkaWQ6ICdyb290JyxcbiAgICBjdXJyZW50UGFnZTogJydcbn0pO1xuYXZhbG9uLmhpc3Rvcnkuc3RhcnQoe1xuICAgIGZpcmVBbmNob3I6IGZhbHNlXG59KTtcbmlmICghLyMhLy50ZXN0KGdsb2JhbC5sb2NhdGlvbi5oYXNoKSkge1xuICAgIGF2YWxvbi5yb3V0ZXIubmF2aWdhdGUoJy8nLCAyKTtcbn1cbmF2YWxvbi5zY2FuKGRvY3VtZW50LmJvZHkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdGVzdHMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsIi8qIChpZ25vcmVkKSAqL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIHZlcnR4IChpZ25vcmVkKVxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIl0sInNvdXJjZVJvb3QiOiIifQ==