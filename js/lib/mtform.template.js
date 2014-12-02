/**
Used for template parsing
 **/

mtFormInit.prototype.__parseTemplate = function(htmlContent, componentType)
{
    for(var i = 0; i < this.inputs.length; i++)
    {
        this.inputs[i] = this.inputs[i].replace(this.ph(componentType), htmlContent);
    }
}

mtFormInit.prototype.setDefaultTemplate = function(htmlContent, componentType){
    this.templates.push({
        html : htmlContent,
        type : componentType,
    });
}

mtFormInit.prototype.setTemplate = function(html){
    this.templateImmediate = html;
}