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


    // if it is set, then applies it
    // this.alternate();

    var new_collection = this.collectionIterateSequentially(this.collections, this.collectionSequential);
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
    this.alternate();


    var collection_to_html = this.collectionOrdered.join("");

    // if user has specified any form, then the current generated HTML would be
    // injected into the form. Else, it would ignore and let the script does its
    // job.
    collection_to_html = this.components_into_form(collection_to_html);

    this.htmls = collection_to_html;
};


/**
 * Generates an JSON version of all created components. It does not output anything, it
 * just prepares the JSON version for other methods such as makeJSON() to use it.
 */
mtFormInit.prototype.json_generate = function(){

    this.__parseRules();

    // make a JSON version
    this.jsonResult = JSON.stringify(this.inputs);

    return this;
};


mtFormInit.prototype.components_into_form = function(formContent){
    var form_html;
    var form_length = this.forms.length;
    if(form_length > 0 )
    {
        for(var i = 0; i < form_length; i++)
        {
            form_html = this.template_process(this.forms[i], [":form"], [formContent]);
            return form_html;
        }

    }
    else
    {
        // if the user has not defined any forms, then we
        // return the same content passed to the function
        // for a seamless flow to happen
        return formContent;
    }
}

mtFormInit.prototype.alternate = function()
{
    if(this.isAlternate === true)
    {
        var new_result = [];
        var new_collections = this.alternateContent;

        if (this.is_normal(new_collections))
        {
            for (var i = 0; i < this.collectionOrdered.length; i++)
            {
                new_result.push(this.collectionOrdered[i]);
                new_result.push(new_collections);
            }
        }
        else if (this.is_object(new_collections))
        {
            var nestedIterator = 0;
            for (var i = 0; i < this.collectionOrdered.length; i++)
            {
                new_result.push(this.collectionOrdered[i]);
                new_result.push(new_collections[nestedIterator]);
                if( nestedIterator == new_collections.length-1 ) nestedIterator = 0;
                else nestedIterator++;
            }
        }
        else if (this.is_function(new_collections))
        {
            for (var i = 0; i < this.collectionOrdered.length; i++)
            {
                new_result.push(this.collectionOrdered[i]);
                new_result.push(new_collections(this.collectionOrdered[i], this.collectionOrdered[i+1]));
            }
        }

        this.collectionOrdered = new_result;
    }


}

/**
 * returns the HTML markup
 * @returns {string}
 */
mtFormInit.prototype.get = function(){
    return (this.htmls);
};






mtFormInit.prototype.html_wrapper = function(openTag, closeTag){
    this.content("<br />");
    for(var i = 0; i < this.inputs.length; i++)
    {
        this.input[i] = openTag+this.input[i]+closeTag;
    }
    return this;
};


mtFormInit.prototype.Export = function( inclusion, exclusion ){
    var export_result = {};
    for( var i = 0; i < this.exports.length; i++ )
    {
        var callback = this.exports[i]['callback'];
        export_result[this.exports[i].name] = callback();
    }
    return export_result;
};

