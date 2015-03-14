/**
 The main interface for creating the components. This file contains all the methods and properties
 which required to generate a form component of any type.
 **/

// ===================
// FORM COMPONENTS
// ===================

/**
 * Creates a form Element. <form>
 * @param args object @__attributes
 * @param formKey string the key(name) of the form used across the app. It is great for multi-forms
 *          app where the elements are destined to specific forms.
 * @returns {form} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Form = function(name, value, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, value, 'value');
    return this.create("form", args, formKey);
};

/**
 * Creates a form input (default = text). <input />
 * @param args object @__attributes
 * @returns {input} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Input = function(name, value, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, value, 'value');
    return this.create("input", args);
};

/**
 * Creates a hidden form input. <input type='hidden' />
 * @param args @__attributes
 * @returns {hidden} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Hidden = function(name, value, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, value, 'value');
    return this.create("hidden", args);
};

/**
 * Creates an input password field. <input type='password' />
 * @param args @__attributes
 * @returns {password} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Password = function(name, value, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, value, 'value');
    return this.create("password", args_temp.args);
};

/**
 * Creates a textarea element. <textarea />
 * @param args @__attributes
 * @param innerValue the value which fills content of the element .innerHTML
 * @returns {textarea} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Textarea = function(name, innerValue, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, innerValue, args, 'innerValue');
    return this.create("textarea", args_temp.args, args_temp.innerValue);
};

/**
 * Creates a submit button. <input type='submit' />
 * @param args @__attributes
 * @returns {submit} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Submit = function(name, value, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, value, args, 'value');
    return this.create("submit", args_temp.args);
};

/**
 * Creates a button element. <button></button>
 * @param args @__attributes
 * @param innerValue the value which fills content of the element .innerHTML
 * @returns {button} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Button = function(name, innerValue, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, innerValue, 'innerValue');
    return this.create("button", args, innerValue);
};

/**
 * Creates a radio-set. It uses a special attributes schema for generating radios.
 * @param name {string|object} if string, then it is set as the name for the components
 *        created by this set. if an object, then it is assumed to be args argument,
 *        which makes the engine the skip the next @param which is args.
 * @param args The attributes for radios are different that the other components.
 *          The attributes should contain the following elements:
 *          {
 *              values :  [object - array]          an array of values based on which the number of radios are
 *                                                     specified. Since they basically must be unique.
         *
         *
 *              default : [string|object - array]   Sets the default value for the radios. If string, checks
         *                                             against all the components' values. It is logical and standard
         *                                             for it to be an array of same size as names.
 *              attrs :   [object - object]         @__attributes
 *              labels :  [object - array]          If set, then a label for each radio will be created.
 *          }
 * @returns {radio} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Radios = function( name, args ){
    var args_temp;
    args_temp = this.handleCreateRadioArguments(name, args);
    return this.create("radio", args_temp.attrs, args_temp.args);
};

/**
 * Creates a select-menu. It uses a special attributes schema for generating options.
 * @param args object list of attributes. That follows a special structure with several fixed keys. Very much
 *                    similar to Radio()
 * @returns {select}
 * @constructor
 */
mtFormInit.prototype.Select = function( name, args){
    var args_temp;
    args_temp = this.handleCreateRadioArguments(name, args);
    return this.create("select", args_temp.attrs, args_temp.args);
}

/**
 * Creates an input file field.
 * @param args object list of key=value pairs attributes of the tag
 * @returns {file}
 * @constructor
 */
mtFormInit.prototype.File = function(name, value, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, value, 'innerValue');
    return this.create("file", args_temp.args);
};

/**
 * Creates a simple form
 * @param args object list of key=value pairs attributes of the tag
 * @returns {mtFormInit}
 * @constructor
 */
mtFormInit.prototype.Form = function(name, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, "", 'form');
    this.addForm(args);
    return this;
};

/**
 * Creates a form with enctype set to "formdata/multipart"
 * @param args object list of key=value pairs attributes of the tag
 * @returns {mtFormInit}
 * @constructor
 */
mtFormInit.prototype.FormWithFile = function(name, args){
    var args_temp;
    args_temp = this.handleCreateFunctionArguments(name, args, "", 'form');

    args_temp.args["enctype"] = "multipart/form-data";

    this.addForm(args_temp.args);
    return this;
};

/**
 * Creates a label for @__lastComponent. It is different form Laebl() function in that
 * it comes after the component's specific function. Input().AttachLabel()
 * @param args @__attributes
 * @param innerValue @__innerValue
 * @returns {mtFormInit} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.AttachLabel = function(args, innerValue)
{
    var last_comp_info = this.componentLastInfo;
    this.__label(last_comp_info, args, innerValue);
    return this;
}

/**
 * Injects HTML after the @__lastComponent
 * @param htmlContent @__htmlContent
 * @param array_skip if set to true, skips the array as one single collection
 * @returns {mtFormInit} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.HtmlAfter = function(htmlContent, array_skip)
{
    array_skip = (typeof array_skip === "undefined" || typeof array_skip === null)
        ? false :  array_skip;
    this.isHtml = true;
    this.htmlObject.after = htmlContent;
    this.__addHtmls(this.componentLastInfo, "after", array_skip);
    return this;
}

/**
 * Injects HTML before the @__lastComponent
 * @param htmlContent @__htmlContent
 * @param array_skip if set to true, skips the array as one single collection
 * @returns {mtFormInit} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.HtmlBefore = function(htmlContent, array_skip)
{
    array_skip = (typeof array_skip === "undefined" || typeof array_skip === null)
        ? false :  array_skip;
    this.isHtml = true;
    this.htmlObject.before = htmlContent;
    this.__addHtmls(this.componentLastInfo, "before", array_skip);
    return this;
}

// ===================
// TEMPLATE PROCESSING
// ===================

/**
 * Returns an unprocess, unordered collection of all components.
 * @returns collection
 * @constructor
 */
mtFormInit.prototype.AllComponents = function(){
    return this.collections;
}

/**
 * Sets the component for the last created component.
 * @param html @__htmlContent
 * @returns {mtFormInit} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Template = function(html){
    this.setTemplate(html);
    this.parseTemplate("component");
    return this;
}

/**
 * Sets a default component to be used for all components.
 * @param html @__htmlContent
 * @param componentType @__componentTypes
 * @returns {mtFormInit} @__mtformObject
 */
mtFormInit.prototype.setDefaultTemplate = function(html, componentType){
    this.templatesFormComponents[componentType] = html;
    return this;
}


/**
 * Adds a <br /> tag after each component.
 * @returns {mtFormInit}
 * @constructor
 */
mtFormInit.prototype.BreakBetween = function(){
    this.Alternate("<br />");
    return this;
};

/**
 *
 * @param html @__htmlContent
 * @param from_zero
 * @returns {mtFormInit} @__mtformObject
 * @constructor
 */
mtFormInit.prototype.Alternate = function(alternateInput, from_zero){
    this.isAlternate = true;
    this.alternateContent = alternateInput;
    return this;
}

// ===================
// OUTPUTTING RESULTED CONTENT
// ===================

/**
 * puts the HTML markup in the container Element.
 * @param @__elementJavascript
 * @returns {mtFormInit} @__mtformObject
 */
mtFormInit.prototype.Make = function(element){
    this.generate();
    var html = this.htmls;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = html;
    else
        element.innerHTML = html;
    return this;
}

/**
 * Appends @__htmlContent @__lastContainer
 * @param element optional a DOM element, which overrides the last container Element
 */
mtFormInit.prototype.MakeAppend = function(element){
    this.generate();
    var html = this.htmls;
    var containerContent = this.container.innerHTML;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = containerContent+html;
    else
        element.innerHTML = containerContent+html;

    return this;
}

/**
 * Prepends the HTML markup to the last specified container Element.
 * @param element optional a DOM element, which overrides the last container Element
 */
mtFormInit.prototype.MakePrepend = function(element){
    this.generate();
    var html = this.htmls;
    var containerContent = this.container.innerHTML;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = html+containerContent;
    else
        element.innerHTML = html+containerContent;

    return this;
}

/**
 * puts the HTML markup in the container Element.
 * @param element optional a DOM element, which overrides the last container Element
 * @returns {mtFormInit}
 */
mtFormInit.prototype.JSON = function(element){
    this.generateJSON();
    return this;
}

/**
 * [developer]
 * prints the result into the console.
 * @returns {mtFormInit}
 */
mtFormInit.prototype.print = function(){

    return this;
};

/**
 * [developer]
 * prints the JSON result into the console.
 * @returns {mtFormInit}
 */
mtFormInit.prototype.printJSON = function(){
    console.log(this.jsonResult);
    return this;
};

/**
 * [developer]
 * prints the array result into the console.
 * @returns {mtFormInit}
 */
mtFormInit.prototype.printArray = function(){
    console.log(this.inputs);
    return this;
};
