
//var _ = require("./lodash");

var REGISTRY = {
	debug:false,
    data:{},
    has:function(name){
        this.debug && console.log("REGISTRY: checking "+name+" = " + !!this.data[name]);
        return !!this.data[name];
    },
    get:function(name){
        this.debug && console.log("REGISTRY: get "+name);
        !this.has(name) && !!this["load"] && this.set(name,this.load.apply(this,[].slice.call(arguments)));
        return this.data[name];
    },
    set:function(name,value){
        this.debug && console.log("REGISTRY: set "+name);
        this.data[name] = value;
    },
	// implement this for cache self loading functionality
    //load:function(){},
	Factory:function(extension){
		return _.extend({},this,extension);
	}
};

!!this["module"] && (module["exports"] = REGISTRY.Factory);

