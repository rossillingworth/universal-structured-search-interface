

var Maverick = Maverick || {};
Maverick.Function = {
    bind: function bind(scope,func){
        return function(){
            func.apply(scope,[].slice.apply(arguments));
        }
    }
};

