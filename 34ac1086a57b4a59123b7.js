webpackJsonpindex([3],{

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(404);

/***/ }),

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.name = 'component-api-docs-installation';
avalon.component(exports.name, { template: "<div><h2>\u5B89\u88C5</h2>\n<h3>npm \u5B89\u88C5</h3>\n<p>\u63A8\u8350\u4F7F\u7528 npm \u7684\u65B9\u5F0F\u5B89\u88C5\uFF0C\u5B83\u80FD\u66F4\u597D\u5730\u548C <a href=\"https://webpack.js.org/\">webpack</a> \u6253\u5305\u5DE5\u5177\u914D\u5408\u4F7F\u7528\u3002</p>\n<pre><code class=\"language-shell\">npm install koumei --save\n</code></pre>\n<h3>Koumei npm\u547D\u4EE4</h3>\n<pre><code class=\"language-shell\">  npm run [scripts]\n  i: \u5B89\u88C5\u963F\u91CCnpm\u8D44\u6E90\u955C\u50CF \n  build: \u6D4B\u8BD5\u7F16\u8BD1\n  dev\uFF1A\u542F\u52A8\u670D\u52A1,\u5728\u7EBF\u7EC4\u4EF6\u6D4B\u8BD5\n  examples: koumei\u6307\u5357\u5728\u7EBF\u67E5\u770B\n  examples: build: koumei\u6307\u5357\u9759\u6001\u8D44\u6E90\u751F\u6210\n  dist: koumei\u6838\u5FC3\u6587\u4EF6\u538B\u7F29\u751F\u6210 \n</code></pre>\n<h3>CDN</h3>\n<p>\u76EE\u524D\u53EF\u4EE5\u901A\u8FC7 <a href=\"https://github.com/baiyujie/koumei/\">github.com/koumei</a> \u83B7\u53D6\u5230\u6700\u65B0\u7248\u672C\u7684\u8D44\u6E90\uFF0C\u5728\u9875\u9762\u4E0A\u5F15\u5165 js \u548C css \u6587\u4EF6\u5373\u53EF\u5F00\u59CB\u4F7F\u7528\u3002</p>\n<pre><code class=\"language-shell\">&lt;!-- \u5F15\u5165\u6837\u5F0F --&gt;\n&lt;link rel=&quot;stylesheet&quot; href=&quot;/lib/koumei.css&quot;&gt;\n&lt;!-- \u5F15\u5165\u7EC4\u4EF6\u5E93 --&gt;\n&lt;script src=&quot;/lib/koumei.js&quot;&gt;&lt;/script&gt;\n</code></pre>\n<h3>\u6D4F\u89C8\u5668\u652F\u6301</h3>\n<p>\u73B0\u4EE3\u6D4F\u89C8\u5668\u3001IE8 \u53CA\u4EE5\u4E0A</p>\n<h3>Hello world</h3>\n<p>\u901A\u8FC7 CDN \u7684\u65B9\u5F0F\u6211\u4EEC\u53EF\u4EE5\u5F88\u5BB9\u6613\u5730\u4F7F\u7528 koumei \u5199\u51FA\u4E00\u4E2A Hello world \u9875\u9762\u3002<a href=\"http://\">\u5728\u7EBF\u6F14\u793A</a></p>\n<pre><code class=\"language-shell\">&lt;!DOCTYPE html&gt;\n&lt;html&gt;\n&lt;head&gt;\n  &lt;meta charset=&quot;UTF-8&quot;&gt;\n  &lt;!-- \u5F15\u5165\u6837\u5F0F --&gt;\n  &lt;link rel=&quot;stylesheet&quot; href=&quot;/lib/koumei.css&quot;&gt;\n&lt;/head&gt;\n&lt;body&gt;\n  &lt;div :controller=&quot;helloworld&quot;&gt;\n    &lt;button type=&quot;button&quot; class=&quot;btn btn-primary&quot; :click=&quot;@show = true&quot;&gt;\u5F39\u51FA\u5BF9\u8BDD\u6846&lt;/button&gt;\n    &lt;ms-dialog :widget=&quot;{$innerVm: 'helloworld-dialog', show: @show, onCancel: @handleCancel, onOk: @handleOk}&quot;&gt;\n      &lt;div slot=&quot;body&quot; ms-skip&gt;\n        &lt;p&gt;\u6B22\u8FCE\u4F7F\u7528 Koumei&lt;/p&gt;\n      &lt;/div&gt;\n    &lt;/ms-dialog&gt;\n  &lt;/div&gt;\n&lt;/body&gt;\n  &lt;!-- \u5148\u5F15\u5165 Avalon2 --&gt;\n  &lt;script src=&quot;/lib/avalon2.js&quot;&gt;&lt;/script&gt;\n  &lt;!-- \u5F15\u5165\u7EC4\u4EF6\u5E93 --&gt;\n  &lt;script src=&quot;/lib/koumei.js&quot;&gt;&lt;/script&gt;\n  &lt;script&gt;\n    vm = avalon.define({\n      $id: 'helloworld',\n      show: false,\n      handleCancel(e) {\n          this.show = false;\n      },\n      handleOk() {\n          this.show = false;\n      }\n    });\n    avalon.define({\n      $id: 'helloworld-dialog',\n      title: 'Koumei'\n    });\n  &lt;/script&gt;\n&lt;/html&gt;\n</code></pre>\n<p>\u5982\u679C\u662F\u901A\u8FC7 npm \u5B89\u88C5\uFF0C\u5E76\u5E0C\u671B\u914D\u5408 webpack \u4F7F\u7528\uFF0C\u8BF7\u9605\u8BFB\u4E0B\u4E00\u8282\uFF1A\u5FEB\u901F\u4E0A\u624B\u3002</p>\n</div>" });


/***/ })

});