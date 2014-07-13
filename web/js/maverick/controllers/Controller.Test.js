

MAVERICK.register("TEST","template.TEST",{
    specification:{
        name:"ControllerTest",
        extends:"ControllerBase"
    },
    // put your expected bindings here
    bindings:{
        button1:null
    },
    constructor:function(){
        console.log("creating Test Controller");
    },
    after:function after(df){
        Maverick.Events.add(this.bindings.button1,"click",Maverick.Function.bind(this,this.test));
    },
    test:function(){
        console.log("button1 clicked");
    }
});

