/**
 The main interface for creating the components. This file contains all the methods and properties
 which required to generate a form component of any type.
 **/

/**
 * Create a form element from a set of pre-defined elements (covering all form elements)
 * @param element string name of the form element: "input" "textarea" etc.
 * @param args object key represent the name attribute and value is its value
 * @returns {mtFormInit} string HTML Markup
 */
mtFormInit.prototype.create = function(element, args){
    // we make sure if no param is passed, to re-declare it
    // as a object so to avoid future undefined errors
    if(typeof args !== 'object' && typeof args !== 'string')
        args = "";
    if(typeof args === 'object') this.argsToAttrs(args);
    var arguments = (typeof args === 'object' && args.length > 0)
            ? this.attrs : args;
    var inp;

    if(element.trim().toLowerCase() == 'input')
        inp = this.addInput(arguments);
    else if (element.trim().toLowerCase() == 'hidden')
        inp = this.addHidden(arguments);
    else if (element.trim().toLowerCase() == 'hidden')
        inp = this.addHidden(arguments);
    else if (element.trim().toLowerCase() == 'password')
        inp = this.addPassword(arguments);
    else if (element.trim().toLowerCase() == 'textarea')
        inp = this.addTextarea(arguments);
    else if (element.trim().toLowerCase() == 'submit')
        inp = this.addSubmit(arguments);
    else if (element.trim().toLowerCase() == 'button')
        inp = this.addButton(arguments);

    this.inputs.push(inp);
    this.lastQueried = inp;
    return this;
}

mtFormInit.prototype.addInput = function(attrs){
    return "<input" + attrs + " "+ this.ph("attr") +" />";
};

mtFormInit.prototype.addHidden = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Hidden input already has a 'type' attribute. Cannot be changed.");
    return "<input type='hidden'" + attrs + " "+ this.ph("attr") +" />";
};

mtFormInit.prototype.addPassword = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Password input already has a 'type' attribute. Cannot be changed.");
    return "<input type='password'" + attrs + " "+ this.ph("attr") +" />";
};

mtFormInit.prototype.addTextarea = function(attrs, innerValue){
    innerValue = (typeof innerValue == 'undefined' || typeof innerValue === null)
        ? "" : innerValue;
    return "<textarea " + attrs + " "+ this.ph("attr") +" >" + innerValue + "</textarea>";
};

mtFormInit.prototype.addSubmit = function(attrs){
    var value = "";
    value = (typeof attrs === 'string' && (typeof attrs.value === "undefined" || typeof attrs.value === "null") )
        ? "value='"+attrs+"'" : "value='"+attrs.value+"'";
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
            console.warn("Submit input already has a 'type' attribute. Cannot be changed.");

    return "<input type='submit' " + attrs + " "+ this.ph("attr") +" " + value + " />";
};

mtFormInit.prototype.addButton = function(attrs){
    var value = "";
    value = (typeof attrs == 'string' || typeof attrs.value === "undefined" || typeof attrs.value === "null")
        ? "value='"+attrs+"'" : "value='"+attrs.value+"'";
    return "<button " + attrs + " "+ this.ph("attr") +" >" + value + "</button>";
};


mtFormInit.prototype.Input = function(args){
    return this.create("input", args);
};

mtFormInit.prototype.Hidden = function(args){
    return this.create("hidden", args);
};

mtFormInit.prototype.Password = function(args){
    return this.create("password", args);
};

mtFormInit.prototype.Textarea = function(args){
    return this.create("textarea", args);
};

mtFormInit.prototype.Submit = function(args){
    return this.create("submit", args);
};

mtFormInit.prototype.Button = function(args){
    return this.create("button", args);
};