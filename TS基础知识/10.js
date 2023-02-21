"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
/* 模块 VS 命名空间 */
exports.a = 1;
exports.b = 2;
exports.default = 3;
// import { a, b } from './10'
/* namespace 第一个作用是封装类似的代码 第二个作用是防止命名冲突 */
var zoo;
(function (zoo) {
    class Dog {
    }
    zoo.Dog = Dog;
})(zoo || (zoo = {}));
var home;
(function (home) {
    class Dog {
    }
})(home || (home = {}));
let dog = new zoo.Dog();
let seasons = [
    0 /* Spring */,
    1 /* Summer */,
    2 /* Autumn */,
    3 /* Winter */
];
console.log(seasons);
