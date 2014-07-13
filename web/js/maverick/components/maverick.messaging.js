

var Maverick = Maverick || {};
Maverick.Messaging = {
    send: function bind(scope,func){
        return function(){
            func.apply(scope,[].slice.apply(arguments));
        }
    },
    listen:function listen(queue,func){
        queue.registerListener()
    }
};

