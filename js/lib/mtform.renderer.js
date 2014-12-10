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






mtFormInit.prototype.wrapInHtml = function(openTag, closeTag){
    this.content("<br />");
    for(var i = 0; i < this.inputs.length; i++)
    {
        this.input[i] = openTag+this.input[i]+closeTag;
    }
    return this;
};