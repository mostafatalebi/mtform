/**
 * Created by safa on 30/11/2014.
 */


mtFormInit.prototype.__injectHtml = function()
{
    // let's see what it will do, currently no decision on it
}

/**
 * Inserts HTML contents to be added before the last added component
 * @param htmlContent the HTML content to be added
 * @returns {mtFormInit} void
 * @constructor
 */
mtFormInit.prototype.HtmlAfter = function(htmlContent)
{
    this.isHtml = true;
    this.htmlObject.after = htmlContent;
    this.__addHtmls(this.componentLastInfo);
}

/**
 * Inserts HTML contents to be added after the last added component
 * @param htmlContent the HTML content to be added
 * @constructor
 */
mtFormInit.prototype.HtmlBefore = function(htmlContent)
{
    this.isHtml = true;
    this.htmlObject.before = htmlContent;
    this.__addHtmls(this.componentLastInfo);
}

mtFormInit.prototype.__addHtmls = function(component_last_stack_properties)
{
    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] = this.htmlObject.before +
    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] + this.htmlObject.after;
    this.htmlObject.after = "";
    this.htmlObject.before = "";
}