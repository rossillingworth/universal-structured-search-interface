(function e(modules, n, modNumArray) {
    function s(modNum, u) {
        if (!n[modNum]) {
            if (!modules[modNum]) {
                var require2 = typeof require == "function" && require;
                if (!u && require2) return require2(modNum, !0);
                if (require1) return require1(modNum, !0);
                throw new Error("Cannot find module '" + modNum + "'")
            }
            var f = n[modNum] = {
                exports: {}
            };
            modules[modNum][0].call(f.exports, function (e) {
                var n = modules[modNum][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, modules, n, modNumArray)
        }
        return n[modNum].exports
    }
    var require1 = typeof require == "function" && require;
    for (var o = 0; o < modNumArray.length; o++) s(modNumArray[o]);
    return s
})({
    1: [
        function (require, module, exports) {

            'use strict';

            var t = require('./test');

            var testIt = function () {
                console.log(t.test());
            }

            module.exports = testIt;


        }, {
            "./test": 2
        }
    ],
    2: [
        function (require, module, exports) {

            'use strict';

            var test = function () {
                return "xxxxx";
            }

            module.exports = test;


        }, {}
    ]
}, {}, [1])