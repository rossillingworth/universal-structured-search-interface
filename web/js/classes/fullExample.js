/**
 *
 * This can be used as a native CLASS example
 *
 */


(function(){
    function baseExample(){
        // call parent constructor
        this.prototype.prototype.constructor([].slice.apply(arguments));
    };

    baseExample.prototype = {
        myFunc1:function myFunc1(){}
    };
    baseExample.prototype.prototype = Object.prototype;


    // extend with mixins
    _.extend(baseExample.prototype,mixinObject);
    _.extend(baseExample.prototype,new mixinObjectConstructor);

    // push constructor to global scope
    this["baseExample"] = baseExample;

})();

(function(){
    function fullExample(){
        // call parent constructor
        this.prototype.prototype.constructor([].slice.apply(arguments));
    };

    fullExample.prototype = {
        myFunc2:function myFunc2(){}
    };
    fullExample.prototype.prototype = baseExample.prototype;


    // extend with mixins
    _.extend(fullExample.prototype,mixinObject);
    _.extend(fullExample.prototype,new mixinObjectConstructor);

    // push constructor to global scope
    this["fullExample"] = fullExample;

})();

var f = new fullExample();
var b = new baseExample();

f.myFunc1()