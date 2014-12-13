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
    this.collectionParsed = this.__parseRules(true);
    this.collectionParsed = this.__cleanPlaceholder(this.collectionParsed);

    // if it is set, then applies it
    // this.__makeAlternate();

    var new_collection = this.collectionIterationByCollectionSequential(this.collectionParsed, this.collectionSequential);
    __(this.collections);
    __(new_collection);
    var html_result = "";

    var collection_keys = Object.keys(new_collection);

    // So far, we have parsed and generated multi-dimensional collections, now it's time to
    // flatten them to one-dimensional collection. This new collection allows us to inject
    // html and further things which are hard with multi-dimensional collection and/or are
    // easier with one-dimensional collection.
    for(var i = 0; i < collection_keys.length; i++)
    {

        if(typeof new_collection[collection_keys[i]] === 'object')
        {

            for(var w = 0; w < new_collection[collection_keys[i]].length; w++)
            {
                this.collectionOrdered.push(new_collection[collection_keys[i]][w]);

            }
        }
        else
        {
            this.collectionOrdered.push(new_collection[collection_keys[i]]);

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
        var new_collections = this.alternateContent;
        if (typeof new_collections !== "object")
        {
            for (var i = 0; i < this.collectionOrdered.length; i++)
            {
                new_result.push(this.collectionOrdered[i]);
                new_result.push(new_collections);
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