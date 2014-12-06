/** Template Properties **/
mtFormInit.prototype.templatesFormComponents = {
    input : "<input type='text' :rules  :attrs />",
    password : "<input type='password' :attrs />",
    hidden : "<input type='hidden' :rules  :attrs />",
    textarea : "<textarea :rules  :attrs >:value</textarea>",
    radio : "<input type='radio' :rules  :attrs />",
    checkbox : "<input type='checkbox' :rules  :attrs />",
    submit : "<input type='submit' :rules  :attrs />",
    button : "<textarea :rules  :attrs >:value</textarea>",
}



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

mtFormInit.prototype.__cleanPlaceholder = function(input)
{
    var result = input;
    var keys = Object.keys(this.placeholders);
    if(typeof input === 'object')
    {
        for(var w = 0; w < result.length; w++)
        {
            for(var i = 0; i < keys.length; i++)
            {
                result[w] = result[w].replace(this.placeholders[keys[i]], "");
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

mtFormInit.prototype.setDefaultTemplate = function(htmlContent, componentType){
    this.templateDefault.push({
        html : htmlContent,
        type : componentType,
    });
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

mtFormInit.prototype.Template = function(html){
    this.setTemplate(html);
    this.parseTemplate("component");
    return this;
}