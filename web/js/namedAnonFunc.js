/**
 * License: MPL 2.0
 */

/**
 *
 * @param func
 * @param storageObject
 * @param deleteAfterUse
 * @returns {*}
 */
function namedAnonymousFunction(func,storageObject,deleteAfterUse){
    var f = func;
    var name = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    storageObject = storageObject || window;
    if(deleteAfterUse){
        f = function(){
            var args = Array.prototype.slice.apply(arguments);
            setTimeout(function(){storageObject[name];},1)
            return func.apply(this,args);
        }
    }
    storageObject[name]=f;
    return name;
}