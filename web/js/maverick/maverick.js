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
    templateFactory:TemplateFactory.Factory({dir:"js/maverick/templates/",suffix:".ejs"}),
    tags:{
        //demo:{templateName:"",handler:function(){}}
    },
    validators:{},
    /**
     * Register a custom TAG
     *
     * @param tagName Name of TAG
     * @param templateName Name of View Template to use
     * @param controller Custom Controller (Constructor Function,Class JSON, or Name of Constructor)
     */
    register:function(tagName,viewName,controller){
        // handler handler types
        switch(typeof controller){
            case "string":
                //
                controller = JS.OBJECT.getProperty(window,controller);
                break;
            case "object":
                // JSON object is a class definition
                controller = CLASS.register(controller);
                break;
            case "function":
                // perfect, is now a constructor
                break;
        }
        EXCEPTION.when(!_.isFunction(controller),"Handler is NOT a function");
        // store template
        this.tags[tagName] = {viewName:viewName,controller:controller};
    },
    registerValidator:function(name,func){
        this.validators[name] = func;
    },
    /**
     * Check and compile any templates as required
     * Needs to be run after DOM loaded, so called on start.
     * If templates have been loaded in compiled form,
     * will be very fast
     */
    compileTemplates:function(){
        for(var name in this.tags){
            var vName = this.tags[name].viewName;
            this.debug && console.log("Checking template: " + vName);
            this.templateFactory.compile(vName);
        }
    },
    start:function(){
        this.compileTemplates();
        if(arguments[0]==undefined){
            // iterate all identified top level dataTags
            var topLevelDataTags = document.getElementsByClassName("maverickStart");
            topLevelDataTags = JS.ARRAY.fromCollection(topLevelDataTags);
            for(var i = 0, len = topLevelDataTags.length; i<len; i++){
                this.start(topLevelDataTags[i]);
            }
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
    populate:function(dataTag,targetElement,parentController){

        // DbC & assignments
        EXCEPTION.when(!dataTag,"Data must be populated");
        var name = dataTag.tagName;
        EXCEPTION.when(!this.tags[name],"Custom Tag[%1] has no registered Handler/Template Pair",name);
        targetElement = JS.DOM.getElement(targetElement,true);

        // identify handler
        var pair = this.tags[name];

        // create handler instance
        var controllerConstructor = pair.controller;
        var controller = new controllerConstructor();
        controller.dataTag = dataTag;
        controller.parentController = parentController;
        controller.targetElement = targetElement;
        EXCEPTION.when(!(controller instanceof ControllerBase),"All handlers must be instances of ControllerBase.");

        // init arrays to avoid pollution
        controller.domComponents = [];
        controller.childControllers = [];

        // push controller to parent array
        !!parentController && parentController.childControllers.push(controller);

        // push HTML to DOM node
        var viewName = pair.viewName;
        var postProcessing = [];
        var html = this.templateFactory.render(viewName,{
            uuid: _.uniqueId(viewName),
            dataTag:dataTag,
            postProcessing:postProcessing
        });
        var container = JS.DOM.createElement("div",{innerHTML:html});

        // transfer DOM output to a document fragment, store references in controller
        var df = document.createDocumentFragment();
        while(container.children.length > 0){
            var childNode = container.children[0];
            controller.addDomComponent(df.appendChild(childNode));
        }

        // do any template specified post processing
        _.forEach(postProcessing,function(func){func.apply()});

        // attach bindings
        controller.attachTemplateBindings(df);
        controller.checkExpectedBindingsAttached();

        // do controller post processing
        controller.after(df);

        // now push document fragment to DOM
//        targetElement.appendChild(df.cloneNode(true));  // this breaks bindings by cloning
        targetElement.appendChild(df);
        return controller;
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