/**
 * 1.发布订阅模式 是设计模式中的一种
 * 2.面试中经常问 其次让手写 他的思想被人们广泛使用
 * 3.有谁在用 vue2 eventBus $on监听 $emit触发
 * 4.electron ipcMain ipcRenderer 通讯
 * 5.DOM2 addEventListener removeEventListener
 * 监听器
 */
var twenty_two;
(function (twenty_two) {
    // 用法
    /* const cb = () => {
    console.log('触发了')
  }
  
  document.addEventListener('asdad', cb, {
    once: true // 触发一次
  })
  
  document.removeEventListener('asdad', cb) // 支持删除监听器函数 加上这段代码 就不会继续向下执行了
  
  const e = new Event('asdad') // 订阅中心
  
  document.dispatchEvent(e)
  document.dispatchEvent(e)
  document.dispatchEvent(e)
  document.dispatchEvent(e)
  document.dispatchEvent(e) */
    // 实现 once on emit off 订阅中心Map<事件的名称,[Function]订阅者集合>
    var Emitter = /** @class */ (function () {
        function Emitter() {
            this.events = new Map();
        }
        Emitter.prototype.once = function (event, callback) {
            var _this = this;
            // 先创建一个自定义函数 通过On 触发 触发完成后立马通过Off 回收
            var fn = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                callback.apply(void 0, args);
                _this.off(event, fn);
            };
            this.on(event, fn);
        };
        Emitter.prototype.on = function (event, callback) {
            if (this.events.has(event)) {
                var callbackList = this.events.get(event);
                callbackList && callbackList.push(callback);
            }
            else {
                this.events.set(event, [callback]);
            }
        };
        Emitter.prototype.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var callbackList = this.events.get(event);
            if (callbackList) {
                callbackList.forEach(function (cb) {
                    cb.apply(void 0, args);
                });
            }
        };
        Emitter.prototype.off = function (event, callback) {
            var callbackList = this.events.get(event);
            if (callbackList) {
                var index = callbackList.findIndex(function (cb) { return cb === callback; });
                if (index > -1) {
                    callbackList.splice(index, 1);
                }
            }
        };
        return Emitter;
    }());
    var bus = new Emitter();
    var fn = function (a, b) {
        console.log(a, b);
    };
    // bus.on('asdad', fn)
    // bus.off('asdad', fn)
    bus.once('asdad', fn);
    bus.emit('asdad', true, '123');
    bus.emit('asdad', true, '123');
    bus.emit('asdad', true, '123');
    console.log(bus);
})(twenty_two || (twenty_two = {}));
