/**
 The main interface for creating the components. This file contains all the methods and properties
 which required to generate a form component of any type.
 **/

// ===================
// FORM COMPONENTS
// ===================

mtFormInit.prototype.Input = function(args){
    return this.create("input", args);
};

mtFormInit.prototype.Hidden = function(args){
    return this.create("hidden", args);
};

mtFormInit.prototype.Password = function(args){
    return this.create("password", args);
};

mtFormInit.prototype.Textarea = function(args, innerValue){
    return this.create("textarea", args, innerValue);
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


mtFormInit.prototype.Label = function(args, innerValue)
{
    var last_comp_info = this.componentLastInfo;
    this.__label(last_comp_info, args, innerValue);
    return this;
}


mtFormInit.prototype.HtmlAfter = function(htmlContent, array_skip)
{
    array_skip = (typeof array_skip === "undefined" || typeof array_skip === null)
        ? false :  array_skip;
    this.isHtml = true;
    this.htmlObject.after = htmlContent;
    this.__addHtmls(this.componentLastInfo, "after", array_skip);
    return this;
}

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

mtFormInit.prototype.AllComponents = function(){
    return this.stacks;
}

mtFormInit.prototype.Template = function(html){
    this.setTemplate(html);
    this.parseTemplate("component");
    return this;
}

mtFormInit.prototype.setDefaultTemplate = function(htmlContent, componentType){
    this.templatesFormComponents[componentType] = htmlContent;
    return this;
}



mtFormInit.prototype.BreakBetween = function(){
    this.Alternate("<br />");
    return this;
};

/**
 *
 * @param html
 * @param from_zero
 * @returns {mtFormInit}
 * @constructor
 */
mtFormInit.prototype.Alternate = function(html, from_zero){
    this.isAlternate = true;
    this.alternateContent = html;
    return this;
}

// ===================
// OUTPUTTING RESULTED CONTENT
// ===================

/**
 * puts the HTML markup in the container Element.
 * @param element optional a DOM element, which overrides the last container Element
 * @returns {mtFormInit}
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
 * Appends the HTML markup to the last specified container Element.
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
    console.log(this.htmls);
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
