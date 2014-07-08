
var Loader = {
    dir:"",
    suffix:".js",
    load:function load(name){
        var request = new XMLHttpRequest();
        var path = this.dir + name + this.suffix;
        console.log("loading: " + path);
        request.open("GET",path,false);
        request.send();
        if(request.readyState == 4 && request.status == 200){
            return request.responseText;
        }
        var msg = "Failed to load: " + path
        alert(msg);
        debugger;
        throw new Error(msg);
    }
}

function addExecScope(json,func,args){

    func.apply(args);
}

function require(name){

    // startwith ./ -> local file, so add .js
    // ? can we set scope to allow chaining?

    if(this["_requirePath"] != undefined){
        alert("file scope defined: " + _requirePath);
        name = this["_requirePath"] + name;
    }

    var module = {};
    var contents = Loader.load(name);


//    var funcDef = JS.STRING.format("var require = function(name){return window.require(name,%s)}",path);

    (function addPathToScope(func){
        this._requirePath = name.split("/").slice(0,-1).join("/") + "/";
        var f = new Function('module',contents);
        f.prototype.require = function(){alert("sub-require called");};
        f(module);
    })();

    // return module exports
    return module.exports;

}