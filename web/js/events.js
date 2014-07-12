/**
 * Taken from: http://idiallo.com/blog/2014/01/dynamic-function-definition-in-js#b
 */

var Handler = (function (){
    var addEvent,
        removeEvent,
        hand = {},
        on = "",
        attach = "attachEvent",
        detach = "detachEvent";
    if(window.attachEvent){
        on = "on";
    }else {
        attach = "addEventListener";
        detach = "removeEventListener";
    }
    addEvent = function (elem,event,func){
        elem[attach](on+event,func,false); // bubbling will be ignored in IE
    };
    removeEvent = function (elem,event,func){
        elem[detach](on+event,func);
    };
    hand.addEvent = addEvent;
    hand.removeEvent = removeEvent;
    return hand;
})();
