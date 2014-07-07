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
    dir:"js/templates/",
    /**
     * Convert Template text into Javascript function,
     * also caches compiled function for faster access
     */
    compile:function(name){
        if(this.cache[name] == undefined){
            var templateName = this.prefix + name;
            var templateElement = JS.DOM.getElement(templateName);
            var templateText = "";
            if(!!templateElement){
                templateText = templateElement.innerHTML;
            }else{
                templateText = this.loadTemplate(templateName);
            }
            this.cache[name] = _.template(templateText);
        }
        return this.cache[name];
    },
    loadTemplate:function(name){
        var request = new XMLHttpRequest();
        var path = this.dir + name + ".html";
        request.open("GET",path,false);
        request.send();
        if(request.readyState == 4 && request.status == 200){
            return request.responseText;
        }else{
            alert("Failed to load: " + name)
        }
    },
    /**
     *
     */
    render:function(templateName,json){
        return this.compile(templateName)(json);
    },
    /**
     * Get a custom template factory instance
     * available properties to modify: prefix, dir
     *
     * @param json
     * @returns {void|*}
     */
    getTemplateFactory:function(json){
        return _.extend({},TemplateFactory,json);
    }
};