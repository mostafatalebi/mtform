

/**
 * Checks to see what "event" has been defined for a certain component type
 * @param tag_name the name of the tag for which an event is to be searched
 * @returns {object} an array of events
 */
MTF_Valid.prototype.getEventDefault = function(tag_name){
    if(tag_name == 'input') return $MTF_Valid_Config.ev_input_default;
}

/**
 * Allows custom rules to be defined. The defined rule will be added to the already
 * defined default rules collection.
 * @param ruleName the name of the rule
 * @param ruleObject the object of the rule which follows this scheme: { main : function(){}, success : function(){} error : function(){} }
 *        the callback receives these arguments: {element}element, {element}message_container, {event}event
 * @returns {*}
 * @constructor
 */
MTF_Valid.prototype.DefineRule = function(ruleName, ruleObject){
    return this.__define_rule(ruleName, ruleObject);
}

/**
 *
 * @param rule_name
 * @returns {*}
 */
MTF_Valid.prototype.getRuleMethod = function(rule_name){
    return this.rules_collection[rule_name];
}




/**
 * Binds all assigned rules to the components
 * @constructor
 */
MTF_Valid.prototype.AddRule = function(rule_name, rule_value, events){
    this.__assign_rule(rule_name, rule_value, events);
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

/**
 * Handles event attachment to the component. It is a very important function which
 * creates an anonymous function that manages the two other optional callback.
 * If the initial_callback returns false, then the error callback is called,
 * otherwise the success is called.
 * @param initial_callback the main callaback for the event
 * @param error {function} optional a callback to be called when initial_callback returns false
 * @param success {function} optional a callback to be called when initial_callback returns true
 */
MTF_Valid.prototype.__eventCallbackHandler = function(initial_callback, error, success){
    var s = initial_callback();
    if( initial_callback() === false )
    {
        if(error) error();
    }
    else
    {
        if(success) success();
    }
}

/**
 * Adds the defined rule to the stack.
 * @param element_index
 * @param element_type
 * @param rule_obj
 * @param events
 * @private
 */
MTF_Valid.prototype.__add_rule_to_stack = function(element_index, element_type, rule_obj, events){

    if( this.rules.length > 0)
    {
        for( var i = 0; i < this.rules.length; i++ ) // checks if this component has already
        // being bound to a rule, if yes, then just add the rule than creating a collection anew
        {
            if( this.rules[i]['index'] == element_index && this.rules[i]['type'] == element_type )
            {
                this.rules[i]['rules'][rule_obj[0]] = rule_obj[1];
                this.rules[i]['index'] = element_index;
                this.rules[i]['type'] = element_type;
                this.rules[i]['events'] = this.rules[i]['events'].concat(events);
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
            events : events
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

            if(rules_array)
            {
                var keys = Object.keys(rules_array);
                for(var w = 0; w < keys.length; w++)
                {
                    var callback_function = rules_array[keys[w]]['callback'];
                    var callback_success_function = rules_array[keys[w]]['success'];
                    var callback_error_function = rules_array[keys[w]]['error'];


                    // since events accepts an array of events, we loops through events as well, no matter
                    // if the user has passed one event or more.
                    var events  = this.getEventDefault(item.tagName.toLowerCase());
                    var events_optional = this.__get_optional_events(item);
                    if(events_optional)
                    {
                        events = events_optional;
                    }
                    var __eventCallbackHandler = this.__eventCallbackHandler;
                    for( var eventIncr = 0 ; eventIncr < events.length; eventIncr++)
                    item.addEventListener( events[eventIncr], function(event){
                            var current_element = this;
                            var event_object = event;
                            __eventCallbackHandler(
                            function(){
                                return callback_function(current_element, event_object);
                            },
                            function(){
                                return callback_error_function(current_element, event_object)
                            },
                            function(){
                                return callback_success_function(current_element, event_object)
                            }
                            );

                    });

                }
            }


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
MTF_Valid.prototype.__assign_rule = function(ruleName, ruleValue, events){
    var last_comp = $mtf.componentLastInfo;

    this.__add_rule_to_stack(last_comp.index, last_comp.type, [ ruleName , ruleValue ], events );
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
        var events_parsed;

        if(this.rules[i]['events'])
             events_parsed = this.__events_parsed(this.rules[i]['events'], this.rules[i]['type'], this.rules[i]['index']);

        rule_parsed = this.__wrap_in_attr(rule_parsed);

        var type = this.rules[i]['type'];
        var index = this.rules[i]['index'];

        var component = $mtf.collections[type][index];

        // this rules select <tagName as well as the following spaces, for an input,
        // matches: "<input name='email' />" => "<input "
        var reg_rule = new RegExp("^(\<[a-zA-Z]*\s*)+(.*)");
        var component_split = reg_rule.exec(component);
        component = component.replace(reg_rule, component_split[1] + " " + events_parsed + " " + rule_parsed + " " + component_split[2]);
        $mtf.collections[type][index] = component;
    }
}

/**
 * parses the event into a usable string.
 * @param events_array the events array
 * @param item_type @__elementLastType
 * @param item_index @__elementLastIndex
 * @returns {string}
 * @private
 */
MTF_Valid.prototype.__events_parsed = function(events_array, item_type, item_index){
    item_type = this.__get_hash_value(item_type);
    if(!this.events_optional[item_type])
    {
        this.events_optional[item_type] = {};
    }
    if(!this.events_optional[item_type][item_index])
    {
        this.events_optional[item_type][item_index] = [];
    }
    this.events_optional[item_type][item_index] = events_array;

    return $MTF_Valid_Config.events_optional_attr + "='" + item_type + "-" + item_index + "'";
};


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

            var callback_method = this.rules_collection[key_value[0]]['main'];
            var success_callback = this.rules_collection[key_value[0]]['success'];
            var error_callback = this.rules_collection[key_value[0]]['error'];
            var events_collection = this.__get_optional_events(element);
            found_rules[key_value[0]] = {
                callback : callback_method,
                success : success_callback,
                error : error_callback,
                value : key_value[1],
                events : events_collection,
            };
        }

        return found_rules;
    }
}

MTF_Valid.prototype.__get_optional_events = function(element){
    var event_attr = element.getAttribute( $MTF_Valid_Config.events_optional_attr );

    if(event_attr)
    {
        event_attr = event_attr.split("-");
        var event_readable = this.__get_hash_name(event_attr[0]);
        return this.events_optional[event_readable][event_attr[1]];
    }

}

/**
 * Defines a global rule to be defined.
 * @param rule_name
 * @param value
 * @private
 */
MTF_Valid.prototype.__define_rule = function(rule_name, value){
    if(!this.rules_collection) $MTF_Valid_Rules = {};

    this.rules_collection[rule_name] = value;
}

/**
 * Gets the name of input of the hash
 * @param hash_value the hash value for which an input name is returned
 * @returns {string} the name of input
 * @private
 */
MTF_Valid.prototype.__get_hash_name = function(hash_value)
{
    var len = Object.keys($MTF_Valid_Config.hash_table);
    for(var i = 0; i < len.length; i++)
    {
        if($MTF_Valid_Config.hash_table[len[i]] == hash_value)
        {
            return $MTF_Valid_Config.hash_table[len[i]];
        }
    }
}

/**
 * Gets the hash value of an input name
 * @param name the name of the input
 * @returns {string} the hash value
 * @private
 */
MTF_Valid.prototype.__get_hash_value = function(name)
{
    return $MTF_Valid_Config.hash_table[name];
}

