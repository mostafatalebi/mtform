/** Template Properties **/
// This template collection feeds the components'
// default templates. It increases the flexibility and
// allows for a more robust collection.
// All of them can accept a callback function, with the following parameters:
// callback(lastCreatedItemType, lastCreatedItemIndex, placeholders, values);
mtFormInit.prototype.templatesFormComponents = {
    form : "<form :attrs >:form</form>",
    input : "<input type='text'   :attrs />",
    password : "<input type='password' :attrs />",
    file : "<input type='file' :attrs />",
    hidden : "<input type='hidden'   :attrs />",
    textarea : "<textarea   :attrs >:innerValue</textarea>",
    radio : "<input type='radio' :values  :attrs />",
    checkbox : "<input type='checkbox'   :attrs />",
    submit : "<input type='submit'   :attrs />",
    button : "<textarea   :attrs >:value</textarea>",
    select : "<select  :attrs >:options</select>",
    option : "<option  :uniqueValue :attrs />:innerValue</option>",
}

// ===================
// PRIVATE FUNCTIONS
// ===================

/**
 * (Note: This function is going to be removed or left unused within the system. All validations
 *  now are handled by a third party plugin called Valid)
 * Receives an array-type object of generated form components, or one single form component (string)
 * and iterates over them and erase their remained
 * garbage placeholders. Since this function erases any remained placeholder, it should be used
 * only when no associated parsing will follow it. Otherwise, it will destroy the remained
 * process of parsing and make the application to stop parsing.
 *
 * @param mixed input the array object or a string
 * @returns mixed {*} a cleaned array object or string
 * @private
 */
mtFormInit.prototype.__cleanPlaceholder = function(input)
{
    var result = input;
    var keys = Object.keys(this.placeholders);
    var collection_keys = Object.keys(result);
    // checks to see if the input is object at all
    if(typeof result === 'object')
    {
        // loops through the main collection
        for(var w = 0; w < collection_keys.length; w++)
        {
            // checks to see if collection's component type has any element
            if(typeof result[collection_keys[w]] === 'object' && result[collection_keys[w]].length > 0)
            {
                // loops through the component's type of any component added
                for(var t = 0; t < result[collection_keys[w]].length; t++)
                {
                    // for each individual added component, it iterates over the defined
                    // placeholders and erase them if any exists in the component
                    // But, first we have to check if it is one single component or a
                    // set of components.
                    if( typeof result[collection_keys[w]][t] === 'object')
                    {
                        for(var q = 0; q < result[collection_keys[w]][t].length; q++)
                        {
                            // we loop over the set of components (such as radios or checkboxes)
                            for (var i = 0; i < keys.length; i++)
                            {
                                result[collection_keys[w]][t][q] = result[collection_keys[w]][t][q].replace(this.placeholders[keys[i]], "");
                            }
                        }
                    }
                    else
                    {
                        for(var i = 0; i < keys.length; i++)
                        {
                            result[collection_keys[w]][t] = result[collection_keys[w]][t].replace(this.placeholders[keys[i]], "");
                        }
                    }
                }
            }
        }
    }
    else
    {
        for(var i = 0; i < keys.length; i++)
        {
            result = result.replace(this.placeholders[keys[i]], "");
        }
    }
    return result;
}
/**
 Used for template parsing
 **/
mtFormInit.prototype.__parseTemplate = function(placeholder, replaceValue)
{
    var result = [];
    if(this.templateImmediate != "")
    {
        for(var i = 0; i < this.inputs.length; i++)
        {
            result.push(this.templateImmediate.replace(this.ph(placeholder), this.inputs[i]));
        }
        return result;
    }
}

// =======================
// PROTECTED FUNCTIONS
// =======================

/**
 * returns @__template
 * @param key type of the tmeplate
 * @returns {*}
 */
mtFormInit.prototype.getTpl = function(key){
    return this.templatesFormComponents[key];
}
mtFormInit.prototype.parser = function(template, placeholders, values)
{
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
            template = template.replace(placeholders[i], values[i]);
        }
        return template;
    }

}

mtFormInit.prototype.setTemplate = function(html){
    this.templateImmediate = html;
}

mtFormInit.prototype.parseTemplate = function(){
    if(typeof this.inputs === 'object' && this.inputs.length != 0)
    { // parse inputs
        this.inputs = this.__parseTemplate("component");
    }
}

mtFormInit.prototype.parsePossiblePh = function()
{
    var placeholders_helpers = this.placeholders_helpers;
}

mtFormInit.prototype.getAllTemplates = function(){
    return this.templatesFormComponents;
};
