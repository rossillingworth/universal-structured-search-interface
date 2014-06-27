/**
 * License: MPL 2.0
 */

// ASSERT requirements.
if(!(!!JS && !!_)){
    var msg = "JS library or Lodash library are missing";
    alert(msg);
    throw new Error(msg);
}


/**
 * Template Factory is a caching template compiler with rendering.
 * template are expected to be named: template.NAME by default
 *
 * A factory instance can be created with a specified template prefix
 *
 */
var TemplateFactory = {
    cache:{},
    prefix:"template.",
    /**
     * Convert Template text into Javascript function,
     * also caches compiled function for faster access
     */
    compile:function(name){
        if(this.cache[name] == undefined){
            var templateText = JS.DOM.getElement(this.prefix + name,true).innerHTML;
            this.cache[name] = _.template(templateText);
        }
        return this.cache[name];
    },
    /**
     *
     */
    render:function(templateName,json){
        return this.compile(templateName)(json);
    },
    getTemplateFactory:function(prefix){
        prefix = prefix || "";
        return _.extend({},TemplateFactory,{prefix:prefix});
    }
};