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
    if(typeof args !== 'object')
        args = {};
    this.argsToAttrs(args);
    var inp;

    if(element.trim().toLowerCase() == 'input')
        inp = this.addInput(this.attrs);
    else if (element.trim().toLowerCase() == 'hidden')
        inp = this.addHidden(this.attrs);
    else if (element.trim().toLowerCase() == 'hidden')
        inp = this.addHidden(this.attrs);
    else if (element.trim().toLowerCase() == 'password')
        inp = this.addPassword(this.attrs);

    this.inputs.push(inp);
    this.lastQueried = inp;
    return this;
}

mtFormInit.prototype.addInput = function(attrs){
    return "<input" + attrs + " @mtForm@ />";
};

mtFormInit.prototype.addHidden = function(attrs){
    return "<input type='hidden'" + attrs + " @mtForm@ />";
};

mtFormInit.prototype.addPassword = function(attrs){
    return "<input type='hidden'" + attrs + " @mtForm@ />";
};

mtFormInit.prototype.Input = function(args){
    return this.create("input", args);
};

mtFormInit.prototype.Hidden = function(args){
    return this.create("input", args);
};

mtFormInit.prototype.Password = function(args){
    return this.create("input", args);
};