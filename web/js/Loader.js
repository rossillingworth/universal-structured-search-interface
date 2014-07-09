/**
 * Created by rillingworth on 09/07/14.
 */

var Loader = {
    dir:"",
    suffix:"",
    load:function load(name){
        var request = new XMLHttpRequest();
        var path = this.dir + name + this.suffix;
        console.log("loading: " + path);
        request.open("GET",path,false);
        request.send();
        if(request.readyState == 4 && request.status == 200){
            return request.responseText;
        }
        var msg = "Failed to load: " + path
        alert(msg);
        debugger;
        throw new Error(msg);
    },
    Factory:function(extension){
        return _.extend({},this,extension);
    }
};

!!this["module"] && (module["exports"] = Loader.Factory);

