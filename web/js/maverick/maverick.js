/**
 * Created by rillingworth on 05/07/14.
 */

//require("CLASS");
//require("Maverick");
//require("TEMPLATES");

//MAVERICK.register([
//    {tag:"DDL",template:"TEMPLATE.DDL.VIEW",handler:"TEMPLATE.DDL.CLASS"}
//]);
//
//MAVERICK.register({tag:"DDL",template:"TEMPLATE.DDL.VIEW",handler:"TEMPLATE.DDL.CLASS"});
//
//MAVERICK.register("DDL","TEMPLATE.DDL.VIEW","TEMPLATE.DDL.CLASS");
//MAVERICK.register("DDL","TEMPLATE.DDL.VIEW",TEMPLATE.DDL);
//MAVERICK.register("DDL","TEMPLATE.DDL.VIEW",{});
//
//MAVERICK.register("OPTION",null,{}); // no template added, but handler used


var MAVERICK = {
    debug:true,
    templateFactory:TemplateFactory.Factory({}),
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
        EXCEPTION.when(!_.isFunction(handler),"Handler is NOT a function");
        // store template
        this.tags[tagName] = {templateName:templateName,handler:handler};
    },
    /**
     * Check and compile any templates as required
     * Needs to be run after DOM loaded, so called on start.
     * If templates have been loaded in compiled form,
     * will be very fast
     */
    compileTemplates:function(){
        for(var name in this.tags){
            var tName = this.tags[name].templateName;
            this.debug && console.log("Checking template: " + tName);
            TemplateFactory.compile(tName);
        }
    },
    start:function(){
        this.compileTemplates();
        if(arguments[0]==undefined){
            // iterate all identified top level dataTags
            var topLevelDataTags = document.getElementsByClassName("soviet");
            topLevelDataTags = JS.ARRAY.fromCollection(topLevelDataTags);
            for(var i = 0; i< topLevelDataTags.length; i++){
                this.start(topLevelDataTags[i]);
            }
//            for(var dataTag in topLevelDataTags){
//                this.start(topLevelDataTags[dataTag]);
//            }
        }else{
            var dataTag = JS.DOM.getElement(arguments[0],true);
            var targetContainer = null;
            if(dataTag.hasAttribute("target")){
                targetContainer = JS.DOM.getElement(dataTag.getAttribute("target"));
            }else{
                // TODO - should we remove dataTags fom DOM here?
                targetContainer = JS.DOM.createElement("span",{},dataTag.parentNode);
            }
            this.populate(dataTag,targetContainer);
        }
    },
    /**
     *
     */
    populate:function(dataTag,targetElement){
        // DbC & assignments
        var name = dataTag.tagName;
        EXCEPTION.when(!this.tags[name],"Custom Tag[%1] has no registered Handler/Template Pair",name);
        targetElement = JS.DOM.getElement(targetElement,true);
        // identify handler
        var pair = this.tags[name];
        var templateName = pair.templateName;
        var handlerConstructor = pair.handler;
        // create handler instance
        var handler = new handlerConstructor();
        var postProcessing = [];
        // push HTML to DOM node
        var html = TemplateFactory.render(templateName,{
            uuid: _.uniqueId(templateName),
            dataTag:dataTag,
            postProcessing:postProcessing
        });
        var container = JS.DOM.createElement("div",{innerHTML:html});
        var cLen = container.children.length;
        // transfer DOM output to a document fragment
        var df = document.createDocumentFragment();
        var domComponents = [];
        for(var i = 0; i < cLen; i++){
            var childNode = container.children[i];
            childNode && childNode.tagName && df.appendChild(childNode);
            handler.domComponents.push(childNode);
        }
        // do any template specified post processing
        _.forEach(postProcessing,function(func){func.apply()});
        // attach bindings
        handler.attachTemplateBindings(df);
        handler.checkExpectedBindingsAttached();
        // do controller post processing
        handler.after(df);
        // now push document fragment to DOM
//        targetElement.appendChild(df.cloneNode(true));  // this breaks bindings by cloning
        targetElement.appendChild(df);

    }
};








//<script>
//    <div id="" bindId="bind1">
//        <input type="text" bindId="">
//    </div>
//<script>


// identify tag type
//  get template/handler pair
//  populate t/h to container

// handler knows of dataTag & DOM elements

// when an event occurs...
// DD node identifies dataTag selected

// MAVERICK.populate(dataTag,targetContainer,parentHandler) -> Handler Instance
// MAVERICK identifies template/Handler
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

// MAVERICK - trigger: populate DOM with View+Model, binds controller to DOM
// Data - configures Handler, + custom event bindings
// Handler - configured by Model, controls view
// View - changes trigger handler methods


// TODO - onDomLoad="MAVERICK.start();"