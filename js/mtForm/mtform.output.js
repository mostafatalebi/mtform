/**
 Outputting the result of operations, it can put the contents
 into an HTML element, creates something a new or append to an
 existing element
 **/

<<<<<<< HEAD
/**
 * Generates an HTML markup of all created inputs. It does not output anything, it
 * just prepares the HTML markup for other methods such as make(), makeAppend and makePrepend
 * No parsing should be done after this function.
 */
mtFormInit.prototype.generate = function(){

    // checks to see if there any rules to be applied
    this._applyRules(true);
    this.__makeAlternate(); // if it is set, then applies it
    this.htmls += this.inputs.join("");


};

/**
 * Generates an JSON version of all created components. It does not output anything, it
 * just prepares the JSON version for other methods such as makeJSON() to use it.
 */
mtFormInit.prototype.generateJSON = function(){

    if(this.hasRule() === true)
    {
        var rules = this._rulesToString();
=======
mtFormInit.prototype.generate = function(){

    if(this.hasRule() === true)
    {
        var rules = this._rulesToString();
        console.log(rules);
>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
        for(var i = 0; i < this.inputs.length; i++)
        {
            this.inputs[i] = this.inputs[i].replace(this.basePlaceholder, rules);
        }

    }
<<<<<<< HEAD

    // make a JSON version
    this.jsonResult = JSON.stringify(this.inputs);

    return this;
};

/**
 * puts the HTML markup in the container Element.
 * @param element optional a DOM element, which overrides the last container Element
 * @returns {mtFormInit}
 */
=======
    for(var i = 0; i < this.inputs.length; i++)
    {
        this.htmls += this.inputs[i];
    }
};

>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
mtFormInit.prototype.make = function(element){
    this.generate();
    var html = this.htmls;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = html;
    else
        element.innerHTML = html;
    return this;
}

<<<<<<< HEAD
/**
 * Appends the HTML markup to the last specified container Element.
 * @param element optional a DOM element, which overrides the last container Element
 */
=======
>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
mtFormInit.prototype.makeAppend = function(element){
    this.generate();
    var html = this.htmls;
    var containerContent = this.container.innerHTML;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = containerContent+html;
    else
        element.innerHTML = containerContent+html;
<<<<<<< HEAD

    return this;
}

/**
 * Prepends the HTML markup to the last specified container Element.
 * @param element optional a DOM element, which overrides the last container Element
 */
=======
}

>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
mtFormInit.prototype.makePrepend = function(element){
    this.generate();
    var html = this.htmls;
    var containerContent = this.container.innerHTML;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = html+containerContent;
    else
        element.innerHTML = html+containerContent;
<<<<<<< HEAD

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
=======
}


>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
mtFormInit.prototype.print = function(){
    console.log(this.htmls);
    return this;
};
<<<<<<< HEAD



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
=======
>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
