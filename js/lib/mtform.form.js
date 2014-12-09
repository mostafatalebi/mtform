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
mtFormInit.prototype.create = function(component_type, args, secondaryArgs){
    var arguments = "";
    // we make sure if no param is passed, to re-declare it
    // as a object so to avoid future undefined errors
    if(typeof args !== 'object' && typeof args !== 'string')
        args = "";
    else if (typeof args === 'object')
        arguments = this.argsToAttrs(args);
    var inp;

    var component_type = component_type.trim().toLowerCase();

    if(component_type == 'input')
        inp = this.addInput(arguments);
    else if (component_type == 'text')
        inp = this.addInput(arguments);
    else if (component_type== 'hidden')
        inp = this.addHidden(arguments);
    else if (component_type == 'password')
        inp = this.addPassword(arguments);
    else if (component_type == 'textarea')
        inp = this.addTextarea(arguments);
    else if (component_type == 'submit')
        inp = this.addSubmit(arguments);
    else if (component_type == 'button')
        inp = this.addButton(arguments);
    else if (component_type == 'radio')
        inp = this.addRadios(arguments, secondaryArgs);

    // why concat? because it will both join string with array and array with array,
    // making our workflow seamless here.
    inp = this.__cleanPlaceholder(inp); // cleans the placeholders, if any remained 'unused'

    // we check to see what is the last component's index in the stacks. We just want to have a
    // sequence of pointers in order to just parse one real string objects. As our components
    // are grouped respective to their type, while the user expects the generation of the components
    // to be in order of their call. Thus, we have to keep the order in which they are called.

    var component_stack_properties = { type : component_type , index : this.stackSequentialLastIndex(component_type) };
    this.addStackSequential( component_stack_properties.type, component_stack_properties.index );

    // we keep track of the last generated component's type and index.
    this.lastQueried = component_type;
    return this;
}

mtFormInit.prototype.addInput = function(attrs){
    var input = this.getTpl("input");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("input");
    this.__addComponentInstance(prs, "input");
    return prs;
};

mtFormInit.prototype.addHidden = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Hidden input already has a 'type' attribute. Cannot be changed.");
    var input = this.getTpl("hidden");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("input");
    this.__addComponentInstance(prs, "input");
    return prs;
};

mtFormInit.prototype.addPassword = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Password input already has a 'type' attribute. Cannot be changed.");
    var input = this.getTpl("password");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("password");
    this.__addComponentInstance(prs, "password");
    return prs;
};

mtFormInit.prototype.addTextarea = function(attrs, innerValue){
    innerValue = (typeof innerValue == 'undefined' || typeof innerValue === null)
        ? "" : innerValue;
    var textarea = this.getTpl("textarea");
    var prs = this.parser(textarea, [":attrs"], [attrs]);
    this.__setLastComponentType("textarea");
    this.__addComponentInstance(prs, "textarea");
    return prs;
};

mtFormInit.prototype.addSubmit = function(attrs){
    var value = "";
    value = (typeof attrs === 'string' && (typeof attrs.value === "undefined" || typeof attrs.value === "null") )
        ? "value='"+attrs+"'" : attrs;
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
            console.warn("Submit input already has a 'type' attribute. Cannot be changed.");
    var submit = this.getTpl("submit");
    var prs = this.parser(submit, [":attrs"], [attrs]);
    this.__setLastComponentType("submit");
    this.__addComponentInstance(prs, "submit");
    return prs;
};

mtFormInit.prototype.addButton = function(attrs, innerValue){
    var value = "";
    value = (typeof innerValue === "undefined" || typeof innerValue === "null")
        ? "" : innerValue;
    var button = this.getTpl("button");
    var prs = this.parser(button, [":attrs", ":innerValue"], [attrs, innerValue]);
    this.__setLastComponentType("button");
    this.__addComponentInstance(prs, "button");
    return prs;
};

mtFormInit.prototype.addRadios = function(attrs, args){
    var value = "";
    value = (typeof attrs == 'string' || typeof attrs.value === "undefined" || typeof attrs.value === "null")
        ? "value='"+attrs+"'" : "value='"+attrs.value+"'";

    var radios = [];

    for(var i = 0; i < args.values.length; i++)
    {
        var current_input = "";
        var extra = "";
        if(typeof args.values !== undefined &&
            typeof args.values !== 'null') extra += " value=" + "'" + args.values[i] + "' ";
        if(typeof args.name !== undefined &&
            typeof args.name !== 'null') extra += " name=" + "'" + args.name + "' ";
        if(typeof attrs.class !== undefined &&
            typeof attrs.class !== 'null') extra += " class="  + "'" + attrs.class + "' ";
        current_input = "<label >"+ args.labels[i] +"</label>";
        current_input += "<input type='radio' "  + extra +  " " + this.ph("rules") + " />";
        radios.push(current_input);
    }

    return radios;
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

mtFormInit.prototype.Radios = function(args){
    return this.create("radio", args.attrs, args);
};



mtFormInit.prototype.__getComponentsFromStack = function(componentType){
    return this.stacks[componentType];
};

mtFormInit.prototype.AllComponents = function(){
    return this.stacks;
}