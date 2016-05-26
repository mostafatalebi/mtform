
/**
 Used for template parsing
 **/
mtFormInit.prototype.template_parse = function(placeholder, replaceValue)
{
    var result = [];
    if(this.templateImmediate != "")
    {
        for(var i = 0; i < this.inputs.length; i++)
        {
            result.push(this.templateImmediate.replace(this.placeholders.get_default(placeholder, "mtform"), this.inputs[i]));
        }
        return result;
    }
}

// =======================
// PROTECTED FUNCTIONS
// =======================

/**
 * returns @__template
 * @param key type of the template
 * @returns {*}
 */
mtFormInit.prototype.template_fetch = function(key){
    /**
     * @event onTemplateBeforeFetch
     */
    var eventObject = $mtf.Event.dispatchEvent("onTemplateBeforeFetch", new EventObject({
        target : key , type : 'onTemplateBeforeFetch'}));

    if(typeof eventObject == 'object' && eventObject.hasOwnProperty("target"))
        key = eventObject.target;

    return this.templatesFormComponents[key];
}

/**
 * Parses the template string|callback. It accepts an array of placeholders and values as well.
 * @param the string|callback of the template
 * @param placeholders an array of placeholders to be searched inside the template.
 * @param values an array of values to replace the placeholders. This array must be the same size of
 *               placeholders
 * @returns {string|boolean|integer|null} a fully qualified template string
 */
mtFormInit.prototype.template_process = function(template, placeholders, values)
{
    /**
     * @event onTemplateBeforeFetch
     */
    var eventObject = $mtf.Event.dispatchEvent("onTemplateProcess", new EventObject({
        target : { "template" : template, "placeholders" : placeholders, "values" : values} , type : 'onTemplateProcess'}));
    var eventPrevention = this.Event.checkPreventionState(eventObject);
    if(eventPrevention != false && eventPrevention != -1)
        return eventPrevention;



    if(eventObject.hasOwnProperty("target"))
    {
        template = eventObject.target.template;
        placeholders = eventObject.target.placeholders;
        values = eventObject.target.values;
    }


    
    // we check to see if the template is a callback function, we execute the callback, get
    // the result of it, and go for the parsing.
    if(typeof template === 'function')
    {
        var new_template = template(this.componentLastInfo.type, this.componentLastInfo.index, placeholders, values);
        // now loop through and parse the template
        for(var i = 0; i < placeholders.length; i++)
        {
            new_template = new_template.replace(placeholders[i], values[i]);
        }
        return new_template;
    }
    else
    {
        // now loop through and parse the template
        for(var i = 0; i < placeholders.length; i++)
        {
            template = template.replace(placeholders[i],values[i]);
        }
        return template;
    }

}

/**
 * A template to be used for the next generated form component.
 * @param html
 */
mtFormInit.prototype.template_set = function(html){
    this.templateImmediate = html;
}



mtFormInit.prototype.template_fetch_all = function(){
    return this.templatesFormComponents;
};
