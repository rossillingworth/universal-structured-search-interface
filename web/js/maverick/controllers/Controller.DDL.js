

MAVERICK.register("TEST","template.DDL",{
    specification:{
        name:"ControllerDDL",
        extends:"ControllerBase"
    },
    // put your expected bindings here
    bindings:{
//        button1:null
    },
    constructor:function(){
        console.log("creating DDL Controller");
    },
    after:function after(df){
//        Maverick.Events.add(this.bindings.button1,"click",Maverick.Function.bind(this,this.test));
    },
    test:function(){
        console.log("button1 clicked");
    }
});

