/**
 * MPL 2 license
 */

// TODO - add String.format to messages

var EXCEPTION = {
    on:true
    ,debug:true
    ,when:function(condition,message){
        if(!!condition){
            message = this.format.apply(this,Array.prototype.slice.call(arguments,1));
            if(EXCEPTION.debug){
                alert(message);
                // if you have got here, you have a contract failure
                // Use your debugger stack trace to identify the cause
                debugger;
            }
            throw new Error(message);
        }
    }
    /**
     * Use this for a gauranteed dev time failure.
     * eg: bad arguments etc
     *
     * @param condition
     * @param message
     */
    ,debugWhen:function(condition,message/*,varargs*/){
        if(!!condition){
            message = this.format.apply(this,Array.prototype.slice.call(arguments,1));
            alert(message);
            // if you have got here, you have a contract failure
            // Use your debugger stack trace to identify the cause
            debugger;
            throw new Error(message);
        }
    }
    ,format:function(string) {
        (arguments.length<1) && EXCEPTION.when(true,"Invalid Exception Arguments");
        var args = arguments;
        //alert("%([1-" + arguments.length + "])");
        var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
        return String(string).replace(pattern, function(match, index) {
            return args[index];
        });
    }
};

/**
 * Anonymous function to check EE config attribute has been defined
 */
(function(){
    try{
        var htmlElement = document.getElementsByTagName("HTML")[0];
        var attr = !!htmlElement && htmlElement.getAttribute("data-ee");
        var conf = !!attr && attr.valueOf().toUpperCase();
        var hash = (window.location.href.indexOf("debug") > 0) || (window.location.href.indexOf("DEBUG") > 0);
        EXCEPTION.debug = !(!!conf) || hash || (!!conf && !!(conf != "PROD" && conf != "PRODUCTION"));
        !(!!conf) && console.error("ExceptionExtensions config attribute ('data-ee=\"\"') missing from HTML element")
        EXCEPTION.debug && console.warn("ExceptionExtensions debugging is ON");
        !EXCEPTION.debug && console.log("ExceptionExtensions debugging is OFF");
    }catch(e){
        console.error(e);
    }
})();


if(!window["_"]){
    if(console && console.log){
        console.log("ExceptionExtensions recommends you use lodash.");
        console.log("Lodash makes pre & post conditions much easier, especially verifying variable types.");
    }
}