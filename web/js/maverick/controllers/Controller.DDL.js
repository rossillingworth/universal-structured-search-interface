

MAVERICK.register("DDL","template.DDL",{
    specification:{
        name:"ControllerDDL",
        extends:"ControllerBase"
    },
    // put your expected bindings here
    bindings:{
        select:null
    },
    constructor:function(){
        console.log("creating DDL Controller");
    },
    after:function after(df){
        Maverick.Events.add(this.bindings.select,"change",Maverick.Function.bind(this,this.optionChanged));
    },
    optionChanged:function(){
        console.log("option changed");

//        // remove all old descendants
//        var container = JS.DOM.getElement(childrenContainerId);
//        container.innerHTML = "";
//        // get selected value
//        var selectedValue = JS.DOM.FORM.getValue(this);
//        // populate new child
//        var childDataTag = dataTag.children.namedItem(selectedValue);
//        tlf.populate(level+1,container,childDataTag)
    }
});

