

MAVERICK.register("DDL","template.DDL",{
    specification:{
        name:"ControllerDDL",
        extends:"ControllerBase"
    },
    // put your expected bindings here
//    bindings:{
//        select:null
//    },
    constructor:function(){
        console.log("creating DDL Controller");
        this.bindings = {
            select:null
        };
    },
    after:function after(df){
        Maverick.Events.add(this.bindings.select,"change",Maverick.Function.bind(this,this.optionChanged));
        (this.testArray == null) && (this.testArray = []);
        this.testArray.push(_.uniqueId("DDL"));
    },
    optionChanged:function(){
        // delete any existing child controller
        this.deleteChildControllers();
        var value = JS.DOM.FORM.getValue(this.bindings.select);
        var selectedDataTag = this.dataTag.children.namedItem(value);
        MAVERICK.populate(selectedDataTag,this.targetElement,this);
    }
});

