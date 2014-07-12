/**
 * Taken from: http://idiallo.com/blog/2014/01/dynamic-function-definition-in-js#b
 */

var Handler = (function (){
    var getElByClassName;
    if ("getElementsByClassName" in document){
        getElByClassName = function (className){
            return document.getElementsByClassName(className);
        }
    }else {
        getElByClassName = function (className){
            var allElements = document.getElementsByTagName("*"),
                filteredElements = [],
                i, // counter
                l = allElements.length,
                currentClass;

            for(i=0;i<l;i++){
                currentClass = allElements[i].className;
                if (currentClass.indexOf(className) !== -1){ // sure use regex here
                    filteredElements.push(allElements[i]);
                }
            }
            return filteredElements;
        };
    }
    hand.getElementsByClassName = getElByClassName;
    return hand;
})();
