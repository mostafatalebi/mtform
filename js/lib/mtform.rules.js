/**
 Validation rules for all form components.
 **/


/**
 * Adds a rule to the last generated [set of] input(s)
 * @param ruleName
 * @param ruleValue
 * @returns {mtFormInit}
 */
mtFormInit.prototype.addRule = function(ruleName, ruleValue){
    if(typeof ruleValue === null || typeof ruleValue === "undefined")
        ruleValue = "true"; // set a default value, most of the rules just need this
    this.rules.push(ruleName+":"+ruleValue);
    this._applyRules(true);
    return this;
};

mtFormInit.prototype._rulesToString = function(type){
    type = (typeof type === null || typeof type === 'undefined')
        ? "single" : type;
    var baseAttr = "data-rules";
    var rules = "";
    var rulesArray = this.rules;
    if(type == 'all')
    {
        rulesArray = this.rulesAll;
    }

    for(var i = 0; i < rulesArray.length; i++)
    {
        var postPH = "@";
        if(i == rulesArray.length-1) postPH = "";
        if(rulesArray.length == 1) postPH = "";
        rules += rulesArray[i]+postPH;
    }

    return baseAttr+"="+"'"+rules+"'";
}

mtFormInit.prototype.hasRule = function(){
    return (this.rules.length > 0) ? true : false;
}

mtFormInit.prototype._applyRules = function(emptyRules){
    emptyRules = (typeof emptyRules === null || typeof emptyRules === 'undefined')
        ? false : emptyRules;

    if(this.hasRule() === true)
    {
        var rules = this._rulesToString();
        for(var i = 0; i < this.inputs.length; i++)
        {
            this.inputs[i] = this.inputs[i].replace(this.basePlaceholder, rules);
        }
    }

    if(emptyRules === true)
    {
        this.rules = []; // empty the rules
    }

    return this;
}