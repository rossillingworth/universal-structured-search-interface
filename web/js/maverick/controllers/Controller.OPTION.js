

MAVERICK.register("OPTION","template.OPTION",{
    specification:{
        name:"ControllerOPTION",
        extends:"ControllerBase"
    },
    // put your expected bindings here
    bindings:{},
    constructor:function(){
        console.log("creating OPTION Controller");
    },
    after:function after(df){
        var childDataTag = this.dataTag.children[0];
        MAVERICK.populate(childDataTag,this.targetElement,this);
        (this.testArray == null) && (this.testArray = []);
        this.testArray.push(_.uniqueId("OPTION"));
//        debugger;
    }
});

