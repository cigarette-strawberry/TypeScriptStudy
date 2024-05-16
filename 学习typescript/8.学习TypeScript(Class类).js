"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var eight;
(function (eight) {
    var Person = /** @class */ (function () {
        function Person(name, age, sex, height) {
            // 1、在TypeScript是不允许直接在constructor 定义变量的 需要在constructor上面先声明
            // 2、定义了变量不用 也会报错 通常是给个默认值 或者 进行赋值
            this.name = name;
            this.age = age;
            this.sex = sex;
            this.height = height;
        }
        return Person;
    }());
    var person = new Person('张三', 18, 1, 180);
    var DOM = /** @class */ (function () {
        function DOM() {
        }
        // 创建节点
        DOM.prototype.createElement = function (el) {
            return document.createElement(el);
        };
        // 填充文本
        DOM.prototype.setText = function (el, text) {
            el.textContent = text;
        };
        // 渲染节点
        DOM.prototype.render = function (data) {
            var _this = this;
            var _a, _b;
            var root = this.createElement(data.tag);
            // 递归操作
            if (data.children && Array.isArray(data.children)) {
                (_a = data.children) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                    var child = _this.render(item);
                    root.appendChild(child);
                });
            }
            else {
                this.setText(root, (_b = data.text) !== null && _b !== void 0 ? _b : null);
            }
            return root;
        };
        return DOM;
    }());
    var Vue = /** @class */ (function (_super) {
        __extends(Vue, _super);
        function Vue(options) {
            var _this = _super.call(this) || this; // 父类的 prototype.constructor.call()
            _this.options = options;
            _this.init();
            return _this;
        }
        Vue.prototype.init = function () {
            var data = {
                tag: 'div',
                children: [
                    {
                        tag: 'span',
                        text: 'hello world',
                        children: [
                            {
                                tag: 'h1',
                                text: 'hello world'
                            }
                        ]
                    },
                    {
                        tag: 'p',
                        text: 'hello world'
                    },
                    {
                        tag: 'i',
                        text: 'hello world'
                    }
                ]
            };
            var app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el;
            app.appendChild(this.render(data));
        };
        return Vue;
    }(DOM));
    new Vue({
        el: '#app'
    });
})(eight || (eight = {}));
