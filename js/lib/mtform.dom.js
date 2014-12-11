/**
 * Created by safa on 30/11/2014.
 */


mtFormInit.prototype.__injectHtml = function()
{
    // let's see what it will do, currently no decision on it
}

mtFormInit.prototype.HtmlAfter = function(htmlContent)
{
    this.isHtml = true;
    this.htmlObject.after = htmlContent;
    this.__addHtmls(this.componentLastInfo);
    return this;
}

mtFormInit.prototype.HtmlBefore = function(htmlContent)
{
    this.isHtml = true;
    this.htmlObject.before = htmlContent;
    this.__addHtmls(this.componentLastInfo);
    return this;
}

mtFormInit.prototype.__addHtmls = function(component_last_stack_properties)
{
    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] = this.htmlObject.before +
    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] + this.htmlObject.after;
    this.htmlObject.after = "";
    this.htmlObject.before = "";
}