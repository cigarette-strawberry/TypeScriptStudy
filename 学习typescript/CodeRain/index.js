"use strict";
var CodeRain;
(function (CodeRain) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = screen.availWidth;
    canvas.height = screen.availHeight;
    const str = 'Hello World!'.split('');
    const arr = Array(Math.ceil(canvas.width / 10)).fill(0);
    const rain = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        arr.forEach((item, index) => {
            ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, item + 10);
            arr[index] = item >= canvas.height || item >= 10000 * Math.random() ? 0 : item + 10;
        });
    };
    setInterval(rain, 50);
})(CodeRain || (CodeRain = {}));
