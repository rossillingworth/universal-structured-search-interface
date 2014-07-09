
//var REGISTRY = require("./REGISTRY");
//var LOADER = require("./LOADER");


function require(name,path){

    // startwith ./ -> local file, so add .js

    path = ((path || "") + name).replace("./","");

    console.log("Require: " + name + ", " + path);

    // initialise self loading cache
    !this.cache && (this.cache = REGISTRY.Factory({
        load:function(name,path){

            // initialise environment
            !this.loading && (this.loading = {});
            !this.loader && (this.loader = Loader.Factory({suffix:".js"}));

            // check if already loading ie: circular references
            if(this.loading[name]){
                var msg = "Circular Reference: already loading " + name;
                alert(msg);
                debugger;
                throw new Error(msg);
            }

            var directory = path.split("/").slice(0,-1).join("/") + "/";

            var funcDef = this.loader.load(path);
            funcDef = "//path: "+ directory +"\n" + funcDef;

            var requireOverride = function(name){return require(name,directory)};
            var module = {exports:{}};

            this.loading[name] = true;
            var f = new Function('require','module','exports', funcDef);
            f(requireOverride,module,module.exports);
            this.loading[name] = false;

            return module.exports;
        }
    }));

    return this.cache.get(name,path);

}

