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

    // rules which are no longer used. Since they are already assigned to
    // their respective components.
    this.rules_obsolete = [];

}

/**
 * Checks to see what "event" has been defined for certain component
 * @param tag_name the name of the tag for which an event is to be searched
 * @returns {Window.$MTF_Valid_Config.ev_input_default|*}
 */
MTF_Valid.prototype.getEventDefault = function(tag_name){
    if(tag_name == 'input') return $MTF_Valid_Config.ev_input_default;
}

MTF_Valid.prototype.getRuleMethod = function(rule_name){
    rule_index = $MTF_Valid_Rules_Names[rule_name].indexOf();
    __("Rule Index: "+rule_index);
    __("Rule Method: "+$MTF_Valid_Rules_Methods[rule_index]);
    return $MTF_Valid_Rules_Methods[rule_index];
}

/**
 * Binds all assigned rules to the components
 * @constructor
 */
MTF_Valid.prototype.Bind = function(){
    this.__bind_rules();
}

/**
 * Attach all necessary event listeners for the component values to be checked
 * on the occurrence of that certain event.
 * @param parent_container_id
 * @constructor
 */
MTF_Valid.prototype.Eventize = function(parent_container_id){
    this.__add_event_listeners(parent_container_id);
}


/**######## PRIVATE FUNCTIONS #########**/

/**
 *
 * @param element_index
 * @param element_type
 * @param rule_obj
 * @private
 */
MTF_Valid.prototype.__add_rule_to_stack = function(element_index, element_type, rule_obj){

    if( this.rules.length > 0)
    {
        for( var i = 0; i < this.rules.length; i++ ) // checks if this component has alreay
        // being bound to a rule, if yes, then just add the rule than creating a collection anew
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

/**
 * Adds event listener for the form components for their values to be checked against
 * their bound rules on the occurance of that certain event.
 * @param form_id
 * @private
 */
MTF_Valid.prototype.__add_event_listeners = function(form_id){
    var parent_cont = document.getElementById(form_id);

    var form_components = parent_cont.children;
    var item;
    for( var i = 0; i < form_components.length; i++ )
    {
        item = form_components[i];

        if($mtf.is_form_component(item))
        {
           var rules_array = this.__find_rules(item);

            if( $mtf.isArrayOrObject(rules_array) !== false)
            {
                var length = $mtf.objectLength();
                for(var w = 0; w < length; w++)
                {
                    __("Rule is: "+rules_array[i]);
                }
            }

           /*
           $mtf.forEach(rules_array, function(element){
               __("Rule is: "  + rules_array);
               item.addEventListener( this.getEventDefault(item.tagName.toLowerCase()), this.getRuleMethod(element) );
           });
           */

        }
    }
}

/**
 * Registers the rule to the main rules object with the target component's index and type
 * retrieved from componentLastInfo API of the main object.
 * @param ruleName {string} the name of the rule
 * @param ruleValue {mixed} the value of the rule
 * @private
 */
MTF_Valid.prototype.__assign_rule = function(ruleName, ruleValue){
    var last_comp = $mtf.componentLastInfo;

    this.__add_rule_to_stack(last_comp.index, last_comp.type, [ ruleName , ruleValue ] );
}

/**
 * Based on the rules and its bound index and type, it search main collections and find the proper string for\
 * the already-added form-component
 * @private
 */
MTF_Valid.prototype.__bind_rules = function(){

    for( var i = 0; i < this.rules.length; i++ )
    {
        var rule_parsed = this.__rules_parsed(this.rules[i]['rules']);
        rule_parsed = this.__wrap_in_attr(rule_parsed);

        var type = this.rules[i]['type'];
        var index = this.rules[i]['index'];

        var component = $mtf.collections[type][index];

        // this rules select <tagName as well as the following spaces, for an input,
        // matches: "<input name='email' />" => "<input "
        var reg_rule = new RegExp("^(\<[a-zA-Z]*\s*)+(.*)");
        var component_split = reg_rule.exec(component);
        component = component.replace(reg_rule, component_split[1] + " " + rule_parsed + " " + component_split[2]);
        $mtf.collections[type][index] = component;
    }
}

/**
 * parses the rules objects and makes them into a string. rule=value&next_rule=value&...
 * @param rule_object an object of rule which has a specific scheme
 * @returns {string}
 * @private
 */
MTF_Valid.prototype.__rules_parsed = function(rule_object){

    var keys = Object.keys(rule_object);
    var rule_string = "";
    var sep = $MTF_Valid_Config.rules_each_separator;
    for( var i = 0; i < keys.length; i++ )
    {
        if(i+1 == keys.length)
        {
            rule_string +=  keys[i] + "=" + rule_object[keys[i]];
        }
        else
        {
            rule_string +=  keys[i] + "=" + rule_object[keys[i]] + sep;
        }
    }

    return rule_string;
}

/**
 * Wraps in the rules string in an html attribute name. example: data-name="{rules}"
 * @param rules {string} rules string
 * @returns {string} a string with name of the attribute prepended and wrapped in the quotation
 * @private
 */
MTF_Valid.prototype.__wrap_in_attr = function(rules){
    return $MTF_Valid_Config.rules_attr_name+ "='" + rules + "' ";
}

/**
 * Searches the attributes @__elementJavascript and sees if it contains any rule
 * @param element @__elementJavascript
 * @returns {{}} an object of rules whose elements are an object with two keys: callback and value
 * @private
 */
MTF_Valid.prototype.__find_rules = function(element){
    var rule_attr = element.getAttribute( $MTF_Valid_Config.rules_attr_name );
    var found_rules = {};

    if( !$mtf.is_empty(rule_attr) && $mtf.objectLength(rule_attr) > 0 )
    {
        var rules = rule_attr.split( $MTF_Valid_Config.rules_attr_name );

        for( var i = 0; i < rules.length; i++ )
        {
            var key_value = rules[i].split("=");

            var name = $MTF_Valid_Rules_Names[key_value[0]];
            var callback_method = $MTF_Valid_Rules_Methods[name.index];

            found_rules[name] = {
                callback : callback_method,
                value : key_value[1]
            };
        }

        return found_rules;
    }
}