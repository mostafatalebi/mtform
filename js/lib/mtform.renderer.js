/**
 Outputting the result of operations, it can put the contents
 into an HTML element, creates something a new or append to an
 existing element.
 **/

/**
 * Generates an HTML markup of all created inputs. It does not output anything, it
 * just prepares the HTML markup for other methods such as make(), makeAppend and makePrepend
 * No parsing should be done after this function.
 */
mtFormInit.prototype.generate = function(){

    // checks to see if there any rules to be applied
    this.stackParsed = this.__parseRules(true);
    this.stackParsed = this.__cleanPlaceholder(this.stackParsed);

    // if it is set, then applies it
    // this.__makeAlternate();

    var new_stack = this.stackIterationByStackSequential(this.stackParsed, this.stackSequential);
    __(this.stacks);
    __(new_stack);
    var html_result = "";

    var stack_keys = Object.keys(new_stack);

    // So far, we have parsed and generated multi-dimensional collections, now it's time to
    // flatten them to one-dimensional collection. This new collection allows us to inject
    // html and further things which are hard with multi-dimensional collection and/or are
    // easier with one-dimensional collection.
    for(var i = 0; i < stack_keys.length; i++)
    {

        if(typeof new_stack[stack_keys[i]] === 'object')
        {

            for(var w = 0; w < new_stack[stack_keys[i]].length; w++)
            {
                this.collectionOrdered.push(new_stack[stack_keys[i]][w]);

            }
        }
        else
        {
            this.collectionOrdered.push(new_stack[stack_keys[i]]);

        }
    }

    // Since makeAlternate works with one-dimension linear collection of components,
    // we have to call it right after flattening the multi-dimensional collection
    this.__makeAlternate();


    this.htmls = this.collectionOrdered.join("");
};


/**
 * Generates an JSON version of all created components. It does not output anything, it
 * just prepares the JSON version for other methods such as makeJSON() to use it.
 */
mtFormInit.prototype.generateJSON = function(){

    this.__parseRules();

    // make a JSON version
    this.jsonResult = JSON.stringify(this.inputs);

    return this;
};

/**
 * puts the HTML markup in the container Element.
 * @param element optional a DOM element, which overrides the last container Element
 * @returns {mtFormInit}
 */
mtFormInit.prototype.make = function(element){
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
mtFormInit.prototype.makeAppend = function(element){
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
mtFormInit.prototype.makePrepend = function(element){
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


mtFormInit.prototype.__makeAlternate = function()
{
    if(this.isAlternate === true)
    {
        var new_result = [];
        var new_stacks = this.alternateContent;
        if (typeof new_stacks !== "object")
        {
            for (var i = 0; i < this.collectionOrdered.length; i++)
            {
                new_result.push(this.collectionOrdered[i]);
                new_result.push(new_stacks);
            }
        }
    }
    this.collectionOrdered = new_result;
}

/**
 * returns the HTML markup
 * @returns {string}
 */
mtFormInit.prototype.get = function(){
    return (this.htmls);
};

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


mtFormInit.prototype.BreakBetween = function(){
    this.Alternate("<br />");
    return this;
};

mtFormInit.prototype.wrapInHtml = function(openTag, closeTag){
    this.content("<br />");
    for(var i = 0; i < this.inputs.length; i++)
    {
        this.input[i] = openTag+this.input[i]+closeTag;
    }
    return this;
};