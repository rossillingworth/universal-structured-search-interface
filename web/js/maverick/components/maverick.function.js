

var Maverick = Maverick || {};
Maverick.Function = {
    bind: function bind(scope,func){
        EXCEPTION.when(!scope,"Bind scope is undefined");
        EXCEPTION.when(!func,"Bind function is undefined");
        return function(){
            func.apply(scope,[].slice.apply(arguments));
        }
    }
};

