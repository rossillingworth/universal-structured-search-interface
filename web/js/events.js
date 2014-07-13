/**
 * Taken from: http://idiallo.com/blog/2014/01/dynamic-function-definition-in-js#b
 */

// TODO - extend Cache, to record handlers and elements bound, so we can delete it later

var EVENTS = (function (){
    var cache = {};
    var hand = {},
        on = (window.attachEvent)?"on":"",
        attach = (window.attachEvent)?"attachEvent":"addEventListener",
        detach = (window.attachEvent)?"detachEvent":"removeEventListener";
    var addEvent = function (elem,event,func){
        elem[attach](on+event,func,false); // bubbling will be ignored in IE
        !cache[elem] && (cache[elem]={});
        !cache[elem][event] && (cache[elem][event]=[]);
        cache[elem][event].push(func);
    };
    var removeEvent = function (elem,event,func){
        elem[detach](on+event,func);
        var ind = cache[elem][event].indexOf(func);
        cache[elem][event].splice(ind,1);
    };
    /**
     * TODO - verify it works
     * @param elem
     * @param event
     */
    var clear = function(elem,event){
        var events = cache[elem];
        for(var eventName in events){
            if(!event || eventName == event){
                while(cache[elem][eventName].length > 0){
                    removeEvent(elem,eventName,cache[elem][eventName][0]);
                }
            }
        }
    };
    return {
        addEvent:addEvent,
        removeEvent:removeEvent,
        clear:clear
    };
})();
