

CLASS.register({
    specification: {
        name: "ControllerBase"
    },
    dataTag:null,
    targetElement:null,
    parentController:null,
    testArray:null,
    childControllers:null, // references to child controllers, generated by Maverick
    domComponents:null, // references to topLevel components, generated by Maverick
    bindings: null, // named references to template bindings, generated by Maverick
    /**
     * Iterates over template DOM
     * identifies and elments for binding (bind="name")
     * Adds named reference to this.bindings
     * @param templateDocumentFragment
     */
    attachTemplateBindings: function (templateDocumentFragment) {
        (this.bindings==null)&&(this.bindings={});
        var nodes = templateDocumentFragment.querySelectorAll("*");
        for (var i = 0, len = nodes.length; i < len; i++) {
            if (nodes[i].hasAttribute("bind")) {
                var bindingName = nodes[i].getAttribute("bind");
                EXCEPTION.when(!this.bindings.hasOwnProperty(bindingName),"Binding '%1' has not been specified in the constructor for %2.",bindingName,this.specification.name);
                this.bindings[bindingName] = nodes[i];
            }
        }
    },
    checkExpectedBindingsAttached: function () {
        for (var n in this.bindings) {
            if (this.bindings.hasOwnProperty(n)) {
                EXCEPTION.when(!this.bindings[n], "Expected binding '%1' not found in %2.", n, this.specification.name);
            }
        }
    },
    /**
     * called after template & bindings have been processed
     */
    after: function () {
    },
    /**
     * delete all bindings and potential memory leaks
     */
    delete: function () {
        // todo - iterate bindings - remove all
        this.deleteChildControllers();
        this.deleteBindings();
        this.deleteDomComponents();
    },
    deleteChildControllers:function deleteChildControllers(){
        while(this.childControllers.length > 0) {
            EXCEPTION.when(!this.childControllers[0].delete,"Child controller missing delete function");
            var child = this.childControllers.splice(0,1)[0];
            child.delete();
        }
    },
    deleteBindings:function deleteBindings(){
        while(this.bindings.length > 0){
            var boundElement = this.bindings.splice(0,1)[0];
            Maverick.Events.remove(boundElement,undefined,undefined);
        }
    },
    deleteDomComponents:function deleteDomComponents(){
        while(this.domComponents.length > 0){
            var el = this.domComponents.splice(0,1)[0];
            el.parentNode.removeChild(el);
        }
    },
    addDomComponent:function addDomComponent(el){
        EXCEPTION.when(!el,"Added component must exist");
        this.domComponents.push(el);
    }
});

