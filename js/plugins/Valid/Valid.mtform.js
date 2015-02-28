var MTF_Valid = function(){

    /**
     * A very important array container. Each elements of it is an object containing :
     * (int) index, (string) type, (object) rules. rules is an object containing key=value pairs of
     * rules. An example container is:
     * rules = {
     *      index : 1,
     *      type : 'input',
     *      rules : {
     *          required : true,
     *          number : true,
     *          max : 10,
     *      }
     * }
     * @type {{}}
     */
    this.rules = [];

}

MTF_Valid.prototype.Bind = function(){

}


/**######## PRIVATE FUNCTIONS #########**/
MTF_Valid.prototype.__add_rule_to_stack = function(element_index, element_type, rule_obj){

    if( this.rules.length > 0)
    {
        for( var i = 0; i < this.rules.length; i++ )
        {
            if( this.rules[i]['index'] == element_index && this.rules[i]['type'] == element_type )
            {
                this.rules[i]['rules'][rule_obj[0]] = rule_obj[1];
                this.rules[i]['index'] = element_index;
                this.rules[i]['type'] = element_type;
            }
        }
    }
    else
    {
        var rule_new = {};
        rule_new[rule_obj[0]] = rule_obj[1];
        this.rules.push({
            index : element_index,
            type : element_type,
            rules : rule_new,
        });

        var x = this.rules;
    }

}
MTF_Valid.prototype.__assign_rule = function(ruleName, ruleValue){
    var last_comp = $mtf.componentLastInfo;

    this.__add_rule_to_stack(last_comp.index, last_comp.type, [ ruleName , ruleValue ] );
}