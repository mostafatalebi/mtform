/**
#####################
##################### TO BE DEPRECATED AND REMOVED
##################### REASON: AN EXTERNAL MODULE TAKES THE RESPONSIBILITY OF VALIDATION
##################### IT IS HIGHLY CONVENIENT
 **/
/**
 Validation rules for all form components.
 **/


/**
 * Adds a rule to the last generated [set of] input(s)
 * @param ruleName
 * @param ruleValue
 * @returns {mtFormInit}
 * @deprecated Use valid plugin
 */
mtFormInit.prototype.addRule = function(ruleName, ruleValue){
    if(typeof ruleValue === null || typeof ruleValue === "undefined")
        ruleValue = "true"; // set a default value, most of the rules just need this
    this.rules.push(ruleName+":"+ruleValue);
    this.__parseRules(true);
    return this;
};

/**
 *
 * @param type
 * @returns {string}
 * @private
 * @deprecated Use valid plugin
 */
mtFormInit.prototype.__rulesToString = function(type){

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
};

/**
 *
 * @returns {boolean}
 * @deprecated Use valid plugin
 */
mtFormInit.prototype.hasRule = function(){
    return (this.rules.length > 0) ? true : false;
};

/**
 * Parses the rules and injects them into last generated inputs.
 * @param emptyRules erases the rules array after each rule relates super-function (AddRule(), AddRules() etc)
 * @returns {mtFormInit} returns the main Object
 * @private
 */
mtFormInit.prototype.__parseRules = function(emptyRules){

    emptyRules = (typeof emptyRules === null || typeof emptyRules === 'undefined')
        ? false : emptyRules;

    var new_collections = this.collections;

    if(this.hasRule() === true)
    {
        var rules = this.__rulesToString();

        var collection_keys = Object.keys(new_collections);

        for(var i =0; i < collection_keys.length; i++)
        {

            if(this.isArrayOrObject(new_collections[collection_keys[i]]) !== false)
            {

                // we expect this to be an array and not an object
                // thus, we use .length property than Object.keys(), unlike the
                // above parent iterator.
                for(var t = 0; t < new_collections[collection_keys[i]].length; t++ )
                {
                    if(typeof new_collections[collection_keys[i]][t] === 'object')
                    {
                        for(var q = 0; q < new_collections[collection_keys[i]][t].length; q++ )
                        {
                            new_collections[collection_keys[i]][t][q] = new_collections[collection_keys[i]][t][q].replace(this.ph("rules"), rules);
                        }
                    }
                    else
                    {

                        new_collections[collection_keys[i]][t] = new_collections[collection_keys[i]][t].replace(this.ph("rules"), rules);

                    }
                }
            }
        }
    }

    if(emptyRules === true)
    {
        this.rules = []; // empty the rules
    }

    return new_collections;
}