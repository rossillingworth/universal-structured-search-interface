
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

//#####################################################################
//# EFFECTIVELY a reimplementation of IF - but with closure control   #
//#####################################################################

//(function test1(){
//    var a = "aaa";
//    when(true) && and("true") && then(function(){console.log("busted")});
//    when(true) && ((function(){a="bbbbb";})());
//    when(false) && ((function(){a="ccccc";})());
//
//    when(true)(function(){});
//    when(true).and(0==1).and().then(function(){});
//    start(this).when(true).and(0==1).or(true).and().then(function(){});
//
//    console.log(a);
//})()