
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
};


function require(name,path){

    // startwith ./ -> local file, so add .js
    // ? can we set scope to allow chaining?

    path = path || "";
    name = path + name;

    var module = {};
    var contents = Loader.load(name);

    var path = name.split("/").slice(0,-1).join("/") + "/";
    var funcDef = JS.STRING.format("function require(name){return window.require(name,'%1')};",path);

    funcDef += "\n" + contents;
    console.log(funcDef);

    var f = new Function('module', funcDef);
    f(module);

    // return module exports
    return module.exports;

}