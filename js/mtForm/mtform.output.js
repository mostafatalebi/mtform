/**
 Outputting the result of operations, it can put the contents
 into an HTML element, creates something a new or append to an
 existing element
 **/

mtFormInit.prototype.generate = function(){

    if(this.hasRule() === true)
    {
        var rules = this._rulesToString();
        console.log(rules);
        for(var i = 0; i < this.inputs.length; i++)
        {
            this.inputs[i] = this.inputs[i].replace(this.basePlaceholder, rules);
        }

    }
    for(var i = 0; i < this.inputs.length; i++)
    {
        this.htmls += this.inputs[i];
    }
};

mtFormInit.prototype.make = function(element){
    this.generate();
    var html = this.htmls;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = html;
    else
        element.innerHTML = html;
    return this;
}

mtFormInit.prototype.makeAppend = function(element){
    this.generate();
    var html = this.htmls;
    var containerContent = this.container.innerHTML;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = containerContent+html;
    else
        element.innerHTML = containerContent+html;
}

mtFormInit.prototype.makePrepend = function(element){
    this.generate();
    var html = this.htmls;
    var containerContent = this.container.innerHTML;
    if(typeof element === 'null' || typeof element === 'undefined')
        this.container.innerHTML = html+containerContent;
    else
        element.innerHTML = html+containerContent;
}


mtFormInit.prototype.print = function(){
    console.log(this.htmls);
    return this;
};
