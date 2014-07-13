/**
 * adapted from: http://idiallo.com/blog/2014/01/dynamic-function-definition-in-js#b
 */




var Maverick = Maverick || {};
Maverick.Events = (function (){
    var cache = [];
    var hand = {},
        on = (window.attachEvent)?"on":"",
        attach = (window.attachEvent)?"attachEvent":"addEventListener",
        detach = (window.attachEvent)?"detachEvent":"removeEventListener";
    var addEvent = function (elem,event,func){
        elem[attach](on+event,func,false); // bubbling will be ignored in IE
        cache.push([elem,event,func]);
    };
    /**
     * Remove events with any identifying features
     * @param elem  [optional]
     * @param event [optional]
     * @param func  [optional]
     */
    var removeEvent = function (elem,event,func){
        // todo
        // identify list that matches args from cache
        // iterate list
        // - remove events from DOM
        // - remove hit from cache
        var i = 0;
        while(i < cache.length){
            var isElem  = !elem  || (cache[i][0] == elem);
            var isEvent = !event || (cache[i][1] == event);
            var isFunc  = !func  || (cache[i][2] == func);
            if(isElem && isEvent && isFunc){
                var __elem  = cache[i][0];
                var __event = cache[i][1];
                var __func  = cache[i][2];
                __elem[detach](on+__event,__func);
                cache.splice(i,1);
            }else{
                i++;
            }
        }
    };
    return {
        add:addEvent,
        remove:removeEvent
    };
})();
