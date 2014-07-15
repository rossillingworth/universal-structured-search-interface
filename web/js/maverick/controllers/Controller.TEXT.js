
MAVERICK.registerValidator("required",function(value){
    return (value.length > 0)?"":"Field is required";
});

MAVERICK.register("TEXT","template.TEXT",{
    specification:{
        name:"ControllerTEXT",
        extends:"ControllerBase"
    },
    // put your expected bindings here
//    bindings:{
//        select:null
//    },
    constructor:function(){
        console.log("creating TEXT Controller");
        this.bindings = {
            textField:null,
            container:null
        };
    },
    after:function after(df){
        Maverick.Events.add(this.bindings.textField,"change",Maverick.Function.bind(this,this.changed));
        Maverick.Events.add(this.bindings.textField,"blur",Maverick.Function.bind(this,this.validate));
    },
    changed:function(){
        var value = JS.DOM.FORM.getValue(this.bindings.textField);
        console.log("text: " + value);
    },
    validate:function(){
        var results = [];
        var value = JS.DOM.FORM.getValue(this.bindings.textField);
        var validators = this.dataTag.getAttribute("validators");
        validators = validators.split(",");
        for(var i = 0, len = validators.length; i < len; i++){
            var vFuncName = validators[i];
            var vFunc = JS.OBJECT.getProperty(MAVERICK.validators,vFuncName);
            EXCEPTION.when(!_.isFunction(vFunc),"%1 is not a registered validator function",vFuncName);
            results.push(vFunc(value));
        }
        results = _.filter(results,function(v){return v.length>0;})
        if(results.length>0){
            this.bindings.container.style.backgroundColor = "red";
        }else{
            this.bindings.container.style.backgroundColor = "green";
        }
    }
});


