
function when(condition){
    return Boolean(condition);
}

var and = when;

function then(scope,func){
    if(typeof scope == "function"){
        func = scope;
        scope = this;
    }
    func.apply(scope);
}

//when(x==1) && and(y==2) && then(function(){});


// this breaks conditional evaluation.
//when(cond).and(cond).then(function(){});

//look into use of

//:labelName
//break labelName
//continue labelName