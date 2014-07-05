/**
 * License MPL 2.0
 * Author Ross Illingworth
 */

var CLASS = {
    // collection of constructor functions
    overrides:{},
    specificationDefaults:{
        underlyingPrototype:Object.prototype,
        allowParentConstructor:true
    },
    // create object
    // create extends hierarchy - heirarchy of prototypes
    // ?? create every time?
    // ?? reuse previous prototypes
    register:function(json){
        EXCEPTION.when(!json.specification,"'specification' missing from class definition");
        EXCEPTION.when(!json.specification.name,"'name' missing from class specification");

        var config = _.extend({},this.specificationDefaults,json.specification);

        // get base class constructor
        var baseName = config.extends;
        var baseConstructor = JS.OBJECT.getProperty(window,baseName);
        EXCEPTION.when(!!baseName && !(!!baseConstructor),"No base instance of %s",baseName);

        /**
         * Intermediary PROTOTYPE container
         * Provides container for object prototype methods
         * Without requiring instantiating a parent class object
         * @constructor
         */
        function PROTOTYPE(){
            console.log("Inheriting from " + this.prototype + " to " + config.name);
        };

        /**
         * Constructor for our class
         * Will call parent constructor chain
         * and our own constructor
         * @constructor
         */
        function CONSTRUCTOR(){
            var args = [].slice.apply(arguments);
            console.log("Constructor for " + config.name + " called with ["+args.concat(",")+"]");
            config.allowParentConstructor && this.super.constructor.apply(this,args);
            !!json.constructor && json.constructor.apply(this,args);
        };

        // assign (base prototype or Object.prototype) to our intermediary prototype
        // inherit baseConstructor prototype without creating an instance on baseConstructor
        // this is also done to avoid polluting the baseConstructor.prototype
        PROTOTYPE.prototype = baseConstructor ? baseConstructor.prototype : config.underlyingPrototype;
        CONSTRUCTOR.prototype = new PROTOTYPE();
        CONSTRUCTOR.prototype.constructor = CONSTRUCTOR;
        CONSTRUCTOR.prototype.super = PROTOTYPE.prototype;

        // decorate constructor with specified mixins
        if(config.mixins && config.mixins.length > 0){
            for(var i in config.mixins){
                var mixinName = config.mixins[i];
                // get mixin from global scope reference
                var mixin = JS.OBJECT.getProperty(window,mixinName);
                EXCEPTION.when(!mixin,"No instance of mixin found:  %s",mixinName);
                // convert constructor to object if need to
                _.isFunction(mixin) && (mixin = new mixin());
                _.extend(CONSTRUCTOR.prototype,mixin);
            }
        }

        // implement overrides
        var overrides = this.overrides[config.name];
        if(!!overrides){
            for(var i in overrides){
                _.extend(CONSTRUCTOR.prototype,overrides[i]);
            }
        }

        // now add all other config properties
        _.extend(CONSTRUCTOR.prototype,json);

        // push CONSTRUCTOR to global namespace
        JS.OBJECT.setProperty(window,config.name,CONSTRUCTOR);
    },

    /**
     * Used to extend/modify functionality of any CLASS derived object
     * without touching the source code.
     * eg: temporary fixes
     *
     * @param name
     * @param jsonConfig
     */
    override:function(name,jsonConfig){
        !this.overrides[name] && (this.overrides[name] = []);
        this.overrides[name].push(jsonConfig);
    },
    /**
     * CLASS Factory
     * Allows you to override defaults in your own instance of CLASS creator
     *
     * @param overrides JSON object with overriding properties & methods
     * @returns {void|*}
     * @constructor
     */
    Factory:function Factory(overrides){
        return _.extend({},this,overrides);
    }
};

