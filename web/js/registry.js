

var REGISTRY = {
	data:{},
    has:function(){
        return !!this.data[name];
    },
    get:function(name){
        !this.data.has(name) && this.load.apply(this,[].slice.call(arguments));
        return this.data[name];
    },
    set:function(name,value){
        // store pair
        this.data[name] = value;
    },
	load:function(name){
		// override this to load data to registry
	},
	Factory:function(extension){
		return _.extend({},this,extension);
	}
};

!!this["module"] && (module["exports"] = REGISTRY.Factory);

