

MAVERICK.register("FORM","template.FORM",{
    specification:{
        name:"ControllerFORM",
        extends:"ControllerBase"
    },
    // put your expected bindings here
    bindings:{},
    constructor:function(){
        console.log("creating FORM Controller");
    },
    after:function after(df){
        for(var i = 0, len = this.dataTag.children.length; i < len; i++){
            var childDataTag = this.dataTag.children[i];
            MAVERICK.populate(childDataTag,this.targetElement,this);
        }
    }
});

