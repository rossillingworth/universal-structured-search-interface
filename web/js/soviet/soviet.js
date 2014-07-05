/**
 * Created by rillingworth on 05/07/14.
 */

require("CLASS");
require("SOVIET");
require("TEMPLATES");

SOVIET.register([
    {tag:"DDL",template:"TEMPLATE.DDL.VIEW",handler:"TEMPLATE.DDL.CLASS"}
]);

SOVIET.register({tag:"DDL",template:"TEMPLATE.DDL.VIEW",handler:"TEMPLATE.DDL.CLASS"});

SOVIET.register("DDL","TEMPLATE.DDL.VIEW","TEMPLATE.DDL.CLASS");
SOVIET.register("DDL","TEMPLATE.DDL.VIEW",TEMPLATE.DDL);
SOVIET.register("DDL","TEMPLATE.DDL.VIEW",{});

SOVIET.register("OPTION",null,{}); // no template added, but handler used


var SOVIET = {
    tags:{
        //demo:{templateName:"",handler:function(){}}
    },
    /**
     * Register a custom TAG
     *
     * @param tagName Name of TAG
     * @param templateName Name of View Template to use
     * @param handler Custom Controller (Constructor Function,Class JSON, or Name of Constructor)
     */
    register:function(tagName,templateName,handler){
        // ensure template is loaded & cached
        TemplateFactory.compile(templateName);
        // handler handler types
        switch(typeof handler){
            case "string":
                //
                handler = JS.OBJECT.getProperty(window,handler);
                break;
            case "object":
                // JSON object is a class definition
                handler = CLASS.register(handler);
                break;
            case "function":
                // perfect, is now a constructor
                break;
        }
        EXCEPTION.when(!_.isFunction(handler,"Handler is NOT a function"));
        // store template
        this.tags[tagName] = {templateName:templateName,handler:handler};
    },
    start:function(){
        // TODO - require shim for getElementsByClassName
        var topLevelDataTags = document.getElementsByClassName("soviet")
        for(var dataTag in topLevelDataTags){
            this.startOne(dataTag);
        }
    },
    startOne:function(dataTag){
        // if container is spec'd, use it, else inject a span by default (configurable)
        //
        var configContainer = JS.DOM.getElement(configContainerId,true);
        var dataTag = JS.DOM.getElement(dataTag,true);

        tlf.populate(0,container,dataTag);

        // identify tag type
        //  get template/handler pair
        //  populate t/h to container

        // handler knows of dataTag & DOM elements

        // when an event occurs...
        // DD node identifies dataTag selected

        // SOVIET.populate(dataTag,targetContainer,parentHandler) -> Handler Instance
        // SOVIET identifies template/Handler
        // populate template {dataTag,Handler,UUID} into DF
        // run Handler.postProcess + bind event handlers
        // return Handler instance
        //

        // DOM events can now trigger functions in  handlers
        // Handler now controls process

        // MVC
        // MODEL - dataTags
        // View - Tempaltes
        // Controller - Handler

        // Handler API
        // getChildren - returns children list
        // delete - sends delete to all children, then deletes itself, undoes all bindings
        // .... events: eg:
        // onSelected
        // onChange
        //

        // SOVIET - trigger: populate DOM with View+Model, binds controller to DOM
        // Data - configures Handler, + custom event bindings
        // Handler - configured by Model, controls view
        // View - changes trigger handler methods
    }
}


// TODO - onDomLoad="SOVIET.start();"