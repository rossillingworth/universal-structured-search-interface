
//var REGISTRY = require("./REGISTRY");
//var LOADER = require("./LOADER");


function require(name,path){

    // startwith ./ -> local file, so add .js
    // ? can we set scope to allow chaining?

    path = path || "";
    name = path + name;

    // initialise loading
    !this.loading && (this.loading = []);
    !this.cache && (this.cache = REGISTRY.Factory({
        load:function(name,path){

        }
    }));

    // check circular references
    if(this.loading[name]){
        throw new Error("Circular Reference: already loading " + name);
    }

    if(this.cache.has(name)){
        console.log("require cache hit: " + name + " - " + path);
        return this.cache.get(name);
    }

    var funcDef = Loader.load(name);
    var path = name.split("/").slice(0,-1).join("/") + "/";

    funcDef += "//path: "+ path +"\n" + funcDef;
    //console.log(funcDef);

    var f = new Function('require','module', funcDef);
    var r = function r(name){return require(name,path)};
    var module = {};

    var i = loading.push(name);
    f(r,module);
    loading.splice(i,1);

    this.cache.set(name,module.exports);

    // return module exports
    return module.exports;

}

