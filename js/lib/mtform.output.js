/**
 Outputting the result of operations, it can put the contents
 into an HTML element, creates something a new or append to an
 existing element
 **/

/**
 * Generates an HTML markup of all created inputs. It does not output anything, it
 * just prepares the HTML markup for other methods such as make(), makeAppend and makePrepend
 * No parsing should be done after this function.
 */
mtFormInit.prototype.generate = function(){

    // checks to see if there any rules to be applied
    this.__applyRules(true);
    this.__makeAlternate(); // if it is set, then applies it

    this.htmls += this.inputs.join("");
};

/**
 * Generates an JSON version of all created components. It does not output anything, it
 * just prepares the JSON version for other methods such as makeJSON() to use it.
 */
mtFormInit.prototype.generateJSON = function(){

    /**
    if(this.hasRule() === true)
    {
        var rules = this.__rulesToString();
        for(var i = 0; i < this.inputs.length; i++)
        {
            this.inputs[i] = this.inputs[i].replace(this.ph("attr"), rules);
        }
    }
     **/
    this.__applyRules();

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

mtFormInit.prototype.alternate = function(html, from_zero){
    this.isAlternate = true;
    this.alternateContent = html;

    return this;
}


mtFormInit.prototype.__makeAlternate = function(){

    if(this.isAlternate === true)
    {
        var new_result = [];
        var content = this.alternateContent;
        if (typeof content !== "object") {
            for (var i = 0; i < this.inputs.length; i++) {
                new_result.push(this.inputs[i]);
                new_result.push(content);
            }
        }
        else // it is object
        {
            var content_iterator = 0;
            for (var i = 0; i < this.inputs.length; i++) {
                if(content_iterator == content.length ) content_iterator = 0;
                new_result.push(this.inputs[i]);
                new_result.push(content[content_iterator]);
                content_iterator++;
            }
        }

        this.inputs = new_result;
    }
    return this;
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


mtFormInit.prototype.breakBetween = function(){
    this.alternate("<br />");

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