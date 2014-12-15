/** Template Properties **/
mtFormInit.prototype.templatesFormComponents = {
    input : "<input type='text' :rules  :attrs />",
    password : "<input type='password' :attrs />",
    hidden : "<input type='hidden' :rules  :attrs />",
    textarea : "<textarea :rules  :attrs >:innerValue</textarea>",
    radio : "<input type='radio' :values :rules  :attrs />",
    checkbox : "<input type='checkbox' :rules  :attrs />",
    submit : "<input type='submit' :rules  :attrs />",
    button : "<textarea :rules  :attrs >:value</textarea>",
    select : "<select :rules  :attrs  :unique_values>:options</select>",
}

// ===================
// PRIVATE FUNCTIONS
// ===================

/**
 * Receives an array object of generated form components, or one single form component (string)
 * and iterates over them and erase their remained
 * garbage placeholders. Since this function erases any remained placeholder, it should be used
 * only when no associated parsing would come after it. Otherwise, it will destroy the further
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
    var stack_keys = Object.keys(result);
    // checks to see if the input is object at all
    if(typeof result === 'object')
    {
        // loops through the main stack
        for(var w = 0; w < stack_keys.length; w++)
        {
            // checks to see if stack's component type has any element
            if(typeof result[stack_keys[w]] === 'object' && result[stack_keys[w]].length > 0)
            {
                // loops through the component's type of any component added
                for(var t = 0; t < result[stack_keys[w]].length; t++)
                {
                    // for each individual added component, it iterates over the defined
                    // placeholders and erase them if any exists in the component
                    // But, first we have to check if it is one single component or a
                    // set of components.
                    if( typeof result[stack_keys[w]][t] === 'object')
                    {
                        for(var q = 0; q < result[stack_keys[w]][t].length; q++)
                        {
                            // we loop over the set of components (such as radios or checkboxes)
                            for (var i = 0; i < keys.length; i++)
                            {
                                result[stack_keys[w]][t][q] = result[stack_keys[w]][t][q].replace(this.placeholders[keys[i]], "");
                            }
                        }
                    }
                    else
                    {
                        for(var i = 0; i < keys.length; i++)
                        {
                            result[stack_keys[w]][t] = result[stack_keys[w]][t].replace(this.placeholders[keys[i]], "");
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
mtFormInit.prototype.parser = function(str, placeholders, values)
{
    var result = "";
    for(var i = 0; i < placeholders.length; i++)
    {
        result = str.replace(placeholders[i], values[i]);
    }
    return result;
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
mtFormInit.prototype.getAllTemplates = function(){
    return this.templatesFormComponents;
};
