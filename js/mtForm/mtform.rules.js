/**
 Validation rules for all form components.
 **/

mtFormInit.prototype.addRule = function(ruleName, ruleValue){
    if(typeof ruleValue === null || typeof ruleValue === "undefined")
        ruleValue = "true"; // set a default value, most of the rules just need this
    this.rules.push(ruleName+":"+ruleValue);
    return this;
};

mtFormInit.prototype._rulesToString = function(){
    var baseAttr = "data-rules";
    var rules = "";

    for(var i = 0; i < this.rules.length; i++)
    {
        var postPH = "@";
        if(i == this.rules.length-1) postPH = "";
        if(this.rules.length == 1) postPH = "";
        rules += this.rules[i]+postPH;
    }
    return baseAttr+"="+rules;
}

mtFormInit.prototype.hasRule = function(){
    return (this.rules.length > 0) ? true : false;
}