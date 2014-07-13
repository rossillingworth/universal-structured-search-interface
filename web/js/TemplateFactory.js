/**
 * License: MPL 2.0
 */

// ASSERT requirements.
if(!(!!JS && !!_)){
    var msg = "JS library or Lodash library are missing";
    alert(msg);
    throw new Error(msg);
}

//var Cache = require("./Cache");
//var Loader = require("./Loader");

/**
 * Template Factory is a caching template compiler with rendering.
 * template are expected to be named: template.NAME by default
 *
 * A factory instance can be created with a specified template prefix
 *
 */
var TemplateFactory = Cache.Factory({
    dir:"js/templates/",
    filePrefix:"",
    suffix:".html",
    load:function(name){
        !!this.loader && (this.loader = Loader.Factory({dir:this.dir,suffix:this.suffix}));
        var templateName = this.filePrefix + name;
        var templateElement = JS.DOM.getElement(templateName);
        var templateText = (!!templateElement)?templateElement.innerHTML:this.loader.load(templateName);
        return  _.template(templateText);
    },
    /**
     * Convert Template text into Javascript function,
     * also caches compiled function for faster access
     */
    compile:function(name){
        return this.get(name,this.prefix,this.dir);
    },
    /**
     *
     */
    render:function(templateName,json){
        return this.compile(templateName)(json);
    }
});
