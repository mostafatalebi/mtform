/**
 * Created by safa on 30/11/2014.
 */


mtFormInit.prototype.__injectHtml = function()
{
    // let's see what it will do, currently no decision on it
}

mtFormInit.prototype.HtmlAfter = function(htmlContent, array_skip)
{
    array_skip = (typeof array_skip === "undefined" || typeof array_skip === null)
        ? false :  array_skip;
    this.isHtml = true;
    this.htmlObject.after = htmlContent;
    this.__addHtmls(this.componentLastInfo, "after", array_skip);
    return this;
}

mtFormInit.prototype.HtmlBefore = function(htmlContent, array_skip)
{
    array_skip = (typeof array_skip === "undefined" || typeof array_skip === null)
        ? false :  array_skip;
    this.isHtml = true;
    this.htmlObject.before = htmlContent;
    this.__addHtmls(this.componentLastInfo, "before", array_skip);
    return this;
}

mtFormInit.prototype.__addHtmls = function(component_last_stack_properties, insertion_type, array_skip)
{
    if(insertion_type == 'after')
    {
        if(typeof this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] !== "object")
        {
            this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] =
            this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] + this.htmlObject.after;
        }
        else // if it is object
        {
            if(array_skip == false)
            {
                for(var i = 0; i < this.stacks[component_last_stack_properties.type][component_last_stack_properties.index].length; i++)
                {
                    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][i] =
                    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][i] + this.htmlObject.after;
                }
            }
            else
            {
                // since array_skip is true, we just assign the HTMLs before and after the collection. To do this,
                // we prepend it to the first element and append it to the last element.
                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][0] =
                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][0] + this.htmlObject.after;

                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index]
                    [this.stacks[component_last_stack_properties.type][component_last_stack_properties.index].length-1] =
                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index]
                    [this.stacks[component_last_stack_properties.type][component_last_stack_properties.index].length-1] + this.htmlObject.after;

            }

        }
        this.htmlObject.after = "";
    }
    else if(insertion_type == 'before')
    {
        if(typeof this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] !== "object")
        {
            this.stacks[component_last_stack_properties.type][component_last_stack_properties.index] = this.htmlObject.before +
            this.stacks[component_last_stack_properties.type][component_last_stack_properties.index];
        }
        else // if it is object
        {
            if(array_skip == false)
            {
                for(var i = 0; i < this.stacks[component_last_stack_properties.type][component_last_stack_properties.index].length; i++)
                {
                    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][i] = this.htmlObject.before +
                    this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][i];
                }
            }
            else
            {
                // since array_skip is true, we just assign the HTMLs before and after the collection. To do this,
                // we prepend it to the first element and append it to the last element.
                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][0] = this.htmlObject.before +
                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index][0];

                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index]
                    [this.stacks[component_last_stack_properties.type][component_last_stack_properties.index].length-1] = this.htmlObject.before +
                this.stacks[component_last_stack_properties.type][component_last_stack_properties.index]
                    [this.stacks[component_last_stack_properties.type][component_last_stack_properties.index].length-1];

            }

        }
        this.htmlObject.before = "";
    }
}