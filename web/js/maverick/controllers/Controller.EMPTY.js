

MAVERICK.register("EMPTY","template.EMPTY",{
    specification:{
        name:"ControllerEMPTY",
        extends:"ControllerBase"
    },
    // put your expected bindings here
//    bindings:{},
    constructor:function(){
        console.log("creating OPTION Controller");
        this.bindings = {};
    },
    after:function after(df){

    }
});

