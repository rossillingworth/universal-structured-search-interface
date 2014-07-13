

var Maverick = Maverick || {};
Maverick.Select = {
    getValue: function getValue(element,func){
        return function(){
            func.apply(scope,[].slice.apply(arguments));
        }
    }
};