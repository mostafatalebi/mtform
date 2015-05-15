



/**
 * Allows custom rules to be defined. The defined rule will be added to the already
 * defined default rules collection.
 * @param ruleName the name of the rule
 * @param ruleObject the object of the rule which follows this scheme: { main : function(){}, success : function(){} error : function(){} }
 *        the callback receives these arguments: {element}element, {element}message_container, {event}event
 * @returns {*}
 * @constructor
 */
MTF_Valid.prototype.ruleDefine = function(ruleName, ruleObject){
    return this.rule_define(ruleName, ruleObject);
}


/**
 * Registers the rule to the @__lastComponent
 * @param rule_name  {string} the name of the rule which is already defined somewhere
 * @param rule_value {*} the value of the rule. Note: for many rules this param is not required,
 *                   the mere declaration of the name of the rule means it works, but for
 *                   some rules such as max_length or min_length this is required as to
 *                   designate to which value the input's value must be compared.
 * @param events     {object} custom events which are used to trigger the rule
 * @param use_template {boolean} [optional] if set to false, the rule does not generate
 *                    a message template.
 * @param insertion_type whether to inject it right after the form component or insert it regularly into
 *                        components collection.
 * @constructor
 */
MTF_Valid.prototype.ruleAdd = function(rule_name, rule_value, config){
    config = (typeof config !== "object") ? {} : config;
    var last_comp = $mtf.componentLastInfo;
    /*
    Setting the default values
     */
    var template = true;
    var message_object = {};
    var events = [];
    var inline = true;
    var message_element = null; // @todo must be fulfilled in coming days
    var placeholders = {};

    if( config.hasOwnProperty("message") ) message_object  = config.message;
    if( config.hasOwnProperty("events") ) events  = config.events;
    if( config.hasOwnProperty("type") ) inline  = config.inline;
    if( config.hasOwnProperty("template") ) template  = config.template;
    if( config.hasOwnProperty("message_element") ) message_element  = config.message_element;
    if( config.hasOwnProperty("placeholders") ) placeholders = config.placeholders;

    // if user has not passed any value to use_template, we delegate the decision for
    // per-rule and global configurations.
    if ( template !== false && message_element === null )
    {
        // message containers, by default, are just added to each
        // component once, but it is possible to allow several
        // instances per component. The following code block checks to see
        // whether to allow multiple insertion or else secure one-insertion


        if( this.component_not_bound_to_message(last_comp) )
        {
            this.last_message_id = this.hash_generate_new(last_comp);
            this.message_to_components.push(last_comp.index + "-" + last_comp.type );
            this.message_container_insert(rule_name, inline);
        }

    }
    else
    {
        if( this.templates_custom.indexOf(this.last_message_id) === -1 )
        {
            this.last_message_id = this.hash_generate_new(last_comp);
            this.message_id_into_template(message_element, this.last_message_id);
            this.templates_custom.push(this.last_message_id);
        }
    }

    this.rule_add_to_collection(last_comp.index, last_comp.type, [ rule_name , rule_value ], events, placeholders );


}

/**
 * Binds all assigned rules to the components
 * @constructor
 */
MTF_Valid.prototype.Bind = function(){
    this.rules_bind();
}



MTF_Valid.prototype.template_add = function(tmp_name, tmp_value){
    this.templates[tmp_name] = tmp_value;
}

MTF_Valid.prototype.template_fetch = function(tmp_name, tmp_value){
    return this.templates[tmp_name];
}

MTF_Valid.prototype.template_edit = function(tmp_name, tmp_value){
    this.templates[tmp_name] = tmp_value;
}

MTF_Valid.prototype.template_detect = function(rule_name){

    var tpl = "";
    if ( this.rules_collection[rule_name].hasOwnProperty("template_allow") && this.rules_collection[rule_name].template_allow === true )
    {
        if (  this.rules_collection[rule_name]['templates'].hasOwnProperty("main")  )
        {
            template_default = (!this.rules_collection[rule_name].template_default)
                ? "main" : this.rules_collection[rule_name].template_default;

            tpl = this.rules_collection[rule_name].templates[ template_default ];
        }
        else
        {
            tpl = this.templates['main'];
        }

        return tpl;
    }
    else
    {
        return false;
    }
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
 * Executes a rule on an element. Not to be confused with event-binding, this just directly
 * executes a rule on an element regardless of whether it is bound or not.
 * Note: It just executes the "main" function of the rule and does not do
 * anything with "error" and "success" callbacks.
 * @param element {Element} on which this rule must be executed
 * @param rule_name the name of the rule whose "main" function would be invoked
 * @param rule_value the value of the rule (if any required)
 * @returns {boolean}
 */
MTF_Valid.prototype.rule_execute = function(element, rule_name, rule_value){
    return (this.rules_collection[rule_name].main(element, rule_value)) ? true : false;
}

/**
 * Adds the defined rule to the stack.
 * @param element_index
 * @param element_type
 * @param rule_obj
 * @param events
 * @private
 */
MTF_Valid.prototype.rule_add_to_collection = function(element_index, element_type, rule_obj, events, placeholders){

    var rule_object;

    /** inserting placeholders **/
    var placeholder_element_key = element_index + "-" + element_type + "-" + rule_obj[0];
    this.template_placeholder_values[placeholder_element_key] = placeholders;

    if( this.rules.length > 0 )
    {
        for( var i = 0; i < this.rules.length; i++ ) // checks if this component has already
        // being bound to a rule, if yes, then just add the rule than creating a collection anew
        {

            if( this.rules[i]['index'] == element_index && this.rules[i]['type'] == element_type )
            {
                this.rules[i]['rules'][rule_obj[0]] = rule_obj[1];
                this.rules[i]['index'] = element_index;
                this.rules[i]['type'] = element_type;
                this.rules[i]['events'] = events;
                this.rules[i]['message_id'] = this.last_message_id;
                //this.rules[i]['placeholders'][rule_obj[0]] = placeholders;
                rule_object = this.rules[i];
            }
            else
            {
                var rule_new = {};
                var placeholder_obj = {};
                placeholder_obj[rule_obj[0]] = placeholders;
                rule_new[rule_obj[0]] = rule_obj[1];
                rule_object = {
                    index : element_index,
                    type : element_type,
                    rules : rule_new,
                    events : events,
                    //placeholders : placeholder_obj,
                    'message_id' : this.last_message_id
                };
                this.rules.push(rule_object);
            }
        }
    }
    else
    {
        var rule_new = {};
        rule_new[rule_obj[0]] = rule_obj[1];
        var placeholder_obj = {};
        placeholder_obj[rule_obj[0]] = placeholders;
        rule_object = {
            index : element_index,
            type : element_type,
            rules : rule_new,
            events : events,
            //"placeholders" : placeholder_obj,
            'message_id' : this.last_message_id,
        };
        this.rules.push(rule_object);
    }

    this.rules_obsolete.push( rule_object );
}

/**
 * Based on the rules and its bound index and type, it search main collections and find the proper string for\
 * the already-added form-component and merge the rule attribute to them using regular expression.
 * Note: in this stage, no form component has yet been created and all data are string.
 * @private
 */
MTF_Valid.prototype.rules_bind = function(){

    var l = this.rules.length;
    for( var i = 0; i < this.rules.length; i++ )
    {
        var rule_parsed = this.rules_parsed(this.rules[i]['rules']);
        var events_parsed;

        if(this.rules[i]['events'])
             events_parsed = this.events_parsed(this.rules[i]['events'], this.rules[i]['type'], this.rules[i]['index']);

        rule_parsed = this.__wrap_in_attr(rule_parsed);

        var type = this.rules[i]['type'];
        var index = this.rules[i]['index'];
        var msg_container = this.rules[i]['message_id'];

        var component = $mtf.collections[type][index];
        var msg_container = $MTF_Valid_Config.input_message_attr_name + "='" + msg_container + "'";
        // this rules select <tagName as well as the following spaces, for an input,
        // matches: "<input name='email' />" => "<input "
        var reg_comp_type = this.tag_name(type);
        var reg_rule = new RegExp("(\<" + reg_comp_type + "*\s*)+(.*)");

        // ensuring that no undefined is returned. ONLY string must be allowed
        if(typeof events_parsed !== 'string' ) events_parsed = "";
        if(typeof rule_parsed !== 'string' ) rule_parsed = "";
        if(typeof msg_container !== 'string' ) msg_container = "";


        if( typeof component === 'object' )
        {
            // for aggregated collections such as radios or selects
            for( var i = 0; i < component.length; i++ )
            {
                var component_split = reg_rule.exec(component[i]);
                component[i] = component[i].replace(reg_rule, component_split[1] + " " + events_parsed + " " + rule_parsed + " " + msg_container + " " + component_split[2]);
            }
        }
        else
        {
            var component_split = reg_rule.exec(component);
            component = component.replace(reg_rule, component_split[1] + " " + events_parsed + " " + rule_parsed + " " + msg_container + " " + component_split[2]);
        }

        $mtf.collections[type][index] = component;
      //  var this_rule_s_message_id =
        /* finalizing message container */
        if( this.message_injection_container.length > 0 )
        {
            var reg_msg_rule = new RegExp("(?:.*)(<input.*\/>)(?:.*)");
            for( var w = 0; w < this.message_injection_container.length; w++ )
            {
                if( this.message_injection_container[w].type == type &&
                    this.message_injection_container[w].index == index )
                {
                    var msg_info = this.message_injection_container[w];
                    var current_comp = $mtf.collections[msg_info.type][msg_info.index];
                    var form_comp_extracted = reg_msg_rule.exec(current_comp);
                    var tpl =  this.template_detect(msg_info.ruleName);
                    var attributes = {};
                    var attr = $MTF_Valid_Config.message_attr_name + "='" + this.rules[i]['message_id'] + "'";
                    tpl = tpl.replace($mtf.ph("attrs"), attr);
                    tpl = form_comp_extracted[1] + tpl;
                    tpl = current_comp.replace(form_comp_extracted[1], tpl);
                    $mtf.collections[msg_info.type][msg_info.index] = tpl;

                    break;
                }
            }
        }

    }
}


/**
 * parses the rules objects and makes them into a string. rule=value&next_rule=value&...
 * @param rule_object an object of rule which has a specific scheme
 * @returns {string}
 * @private
 */
MTF_Valid.prototype.rules_parsed = function(rule_object){

    var keys = Object.keys(rule_object);
    var rule_string = "";
    var sep = $MTF_Valid_Config.rules_each_separator;
    for( var i = 0; i < keys.length; i++ )
    {
        var rule_value;
        var random_key = $mtf.rand(10);

        rule_value = rule_object[keys[i]];
        this.rules_values[random_key] = rule_value;
        if( typeof rule_value === 'undefined' || typeof rule_value === null )
            rule_value = true;
        if(i+1 == keys.length)
        {
            rule_string +=  keys[i] + "=" + random_key;
        }
        else
        {
            rule_string +=  keys[i] + "=" + random_key + sep;
        }
    }

    return rule_string;
}



/**
 * Searches the attributes @__elementJavascript and sees if it contains any rule
 * @param element @__elementJavascript
 * @returns {{}} an object of rules whose elements are an object with two keys: callback and value
 * @private
 */
MTF_Valid.prototype.rules_find = function(element){
    var rule_attr = element.getAttribute( $MTF_Valid_Config.rules_attr_name );

    var event_item_info = this.get_type_index(element.getAttribute( $MTF_Valid_Config.events_optional_attr ));

    var found_rules = {};

    if( !$mtf.is_empty(rule_attr) && $mtf.objectLength(rule_attr) > 0 )
    {
        var rules = rule_attr.split( $MTF_Valid_Config.rules_each_separator );

        for( var i = 0; i < rules.length; i++ )
        {

            var key_value = rules[i].split("=");
            var rule_value = this.rules_values[key_value[1]];

            // searching for placeholders
            var placeholders = this.template_placeholder_values[event_item_info.index + "-" + event_item_info.type + "-" + key_value[0]];

            var callback_method = this.rules_collection[key_value[0]]['main'];
            var success_callback = this.rules_collection[key_value[0]]['success'];
            var error_callback = this.rules_collection[key_value[0]]['error'];
            var events_collection = this.events_get_optional(element);
            var msg = this.rules_collection[key_value[0]]['messages'];

            found_rules[key_value[0]] = {
                callback : callback_method,
                success : success_callback,
                error : error_callback,
                value : rule_value,
                events : events_collection,
                messages : msg,
                "events-default" : this.rules_collection[key_value[0]]['events'],
                placeholders : placeholders
            };
        }

        return found_rules;
    }
}


/**
 * Defines a global rule to be defined.
 * @param rule_name
 * @param value
 * @private
 */
MTF_Valid.prototype.rule_define = function(rule_name, value){
    if(!this.rules_collection) $MTF_Valid_Rules = {};

    this.rules_collection[rule_name] = value;
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
 * Gets the name of input of the hash
 * @param hash_value the hash value for which an input name is returned
 * @returns {string} the name of input
 * @private
 */
MTF_Valid.prototype.hash_value_to_name = function(hash_value)
{
    var hash_table_keys = Object.keys($MTF_Valid_Config.hash_table);
    for(var i = 0; i < hash_table_keys.length; i++)
    {
        if($MTF_Valid_Config.hash_table[hash_table_keys[i]] == hash_value)
        {
            return hash_table_keys[i];
        }
    }
}

/**
 * Gets the hash value of an input name
 * @param name the name of the input
 * @returns {string} the hash value
 * @private
 */
MTF_Valid.prototype.hash_name_to_value = function(name)
{
    return $MTF_Valid_Config.hash_table[name];
}




MTF_Valid.prototype.tag_name = function(input_type_string)
{
    return $MTF_Valid_Config.tag_names[input_type_string];
}



/**
 *
 * @param element_valid_ev_attribute {String} the value of the valid-ev attribute
 * @returns {*}
 */
MTF_Valid.prototype.get_type_index = function(element_valid_ev_attribute){
    if( typeof element_valid_ev_attribute === "string" && element_valid_ev_attribute != "" )
    {
        var splitted = element_valid_ev_attribute.split("-");
        var type_str = this.hash_value_to_name(splitted[0]);
        return {
            type : type_str,
            index : splitted[1]
        };
    }
}


MTF_Valid.prototype.each = function(parent, callback)
{
    if( parent.children.length > 0 )
    {
        for ( var i = 0; i < parent.children.length; i++ )
        {
            if( parent.children[i].children.length > 0 )
            {
                this.each(parent.children[i], function(current_child, this_parent){
                    callback(current_child, this_parent);
                });
            }
            else
            {
                callback(parent.children[i], parent);
            }

        }
    }
}


/**
 * Attach all necessary event listeners for the component values to be checked
 * on the occurrence of that certain event.
 * @param parent_container_id
 * @constructor
 */
MTF_Valid.prototype.Eventize = function(parent_container_id){
    this.events_add_listeners(parent_container_id);
}


/**
 * parses the event into a usable string.
 * @param events_array the events array
 * @param item_type @__elementLastType
 * @param item_index @__elementLastIndex
 * @returns {string}
 * @private
 */
MTF_Valid.prototype.events_parsed = function(events_array, item_type, item_index){
    item_type = this.hash_name_to_value(item_type);
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
 * Handles event attachment to the component. It is a very important function which
 * creates an anonymous function that manages the two other optional callbacks.
 * If the initial_callback returns false, then the error callback is called,
 * otherwise the success is called.
 * @param initial_callback the main callaback for the event
 * @param error {function} optional a callback to be called when initial_callback returns false
 * @param success {function} optional a callback to be called when initial_callback returns true
 */
MTF_Valid.prototype.event_callback_handler = function(initial_callback, error, success){

    var result = initial_callback();
    if(  result.status !== true )
    {

        if(error) error(result.data);
        return false;
    }
    else
    {

        if(success) success(result.data);
        return true;
    }
}


/**
 * Checks to see what "event" has been defined for a certain component type
 * @param tag_name the name of the tag for which an event is to be searched
 * @returns {object} an array of events
 */
MTF_Valid.prototype.event_get_default = function(tag_name){
    if(tag_name == 'input') return $MTF_Valid_Config.ev_input_default;
}

/**
 * Adds event listener for the form components for their values to be checked against
 * their bound rules on the occurance of that certain event.
 * @param form_selector the CSS selector to select form which contains the components
 * @private
 */
MTF_Valid.prototype.events_add_listeners = function(form_selector){
    var parent_cont = document.querySelector(form_selector);
    var mainFunction = this;
    this.each(parent_cont, function(current_child, current_parent){
        var item = current_child;
        var events = [];
        if($mtf.is_form_component(item))
        {
            var rules_array = mainFunction.rules_find(item);
            var callbackProcessQueue = [];
            if(rules_array)
            {
                var keys = Object.keys(rules_array);
                for(var w = 0; w < keys.length; w++)
                {
                    var callback_function = rules_array[keys[w]]['callback'];
                    var callback_success_function = rules_array[keys[w]]['success'];
                    var callback_error_function = rules_array[keys[w]]['error'];
                    var rule_value = rules_array[keys[w]]['value'];
                    var messages = rules_array[keys[w]]['messages'];
                    var placeholders = rules_array[keys[w]]['placeholders'];


                    // since events accepts an array of events, we loops through events as well, no matter
                    // if the user has passed one event or more.
                    events = rules_array[keys[w]]['events-default'];
                    var events_optional = mainFunction.events_get_optional(item);
                    if( events_optional && events_optional.length > 0 )
                    {
                        events = events_optional;
                    }
                    var event_callback_handler = mainFunction.event_callback_handler;

                    var msg_container = item.parentElement.querySelector("["+$MTF_Valid_Config.message_attr_name+"='"+item.getAttribute($MTF_Valid_Config.input_message_attr_name)+"']");




                    /**
                     * This function creates a function-pack out of three methods of current rule. It paves the way for
                     * variables assignment in a scope-friendly way. Without such approach, it is not possible to keep
                     * an array of functions with their own local variables's values the same as when they very assigned/declared
                     * /created. We have to use the following motherFunction to create a function for us to be used later.
                     * @usage Allows us to delegate function execution to a later time if current rule returns false
                     * @param event the current event
                     * @param item the current element
                     * @param rule_value the current rule's value assigned in Form Creation
                     * @param msg_container the message element
                     * @param messages_main message string for mainCallback
                     * @param messages_error message string for errorCallback
                     * @param messages_success message string for successCallback
                     * @returns {Function}
                     */
                    var createFunction = function(event, item, rule_value, cb_main, cb_error, cb_success, msg_container, messages_main, messages_error, messages_success, placeholders) {
                        return function (event) {
                            var current_element = item;
                            var event_object = event;
                            return $mtf.$lives.Valid.event_callback_handler(
                                function () {
                                    return cb_main(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages_main,
                                        "event": event_object,
                                        "placeholders" : placeholders,
                                    });
                                },
                                function () {
                                    return cb_error(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages_error,
                                        "event": event_object,
                                        "placeholders" : placeholders,
                                    })
                                },
                                function () {
                                    return cb_success(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages_success,
                                        "event": event_object,
                                        "placeholders" : placeholders,
                                    })
                                }
                            );
                        }
                    };

                    // we have to initialize the event object to avoid undefined error
                    var event = null;

                    callbackProcessQueue.push(
                        createFunction(event, item, rule_value, callback_function, callback_error_function, callback_success_function, msg_container, messages.main[$mtf.lang],
                            messages.error[$mtf.lang], messages.success[$mtf.lang], placeholders)
                    );



                }

                /**
                 * This loops through the events array and attach the proper callback to the
                 * iterated event(though most of the time there is just one event).
                 */
                for( var eventIncr = 0 ; eventIncr < events.length; eventIncr++)
                {
                    var mainCallbackAttacher = function(event){
                        for(var i = 0; i < callbackProcessQueue.length; i++)
                        {
                            var result = callbackProcessQueue[i](event);

                            if( result.hasOwnProperty("status") )
                            {
                                if(result.status !== true )
                                    break;
                            }
                            else
                            {
                                if( result !== true )
                                    break;
                            }
                        }
                    };

                    item.addEventListener( events[eventIncr], mainCallbackAttacher )
                }

            }


        }
    });

}

MTF_Valid.prototype.events_get_optional = function(element){
    var event_attr = element.getAttribute( $MTF_Valid_Config.events_optional_attr );

    if(event_attr)
    {
        event_attr = event_attr.split("-");
        var event_readable = event_attr[0];
        return this.events_optional[event_readable][event_attr[1]];
    }

}

/**
 * Inserts a message container and register it for later usage.
 * @param rule_name the name of the the for which this message container is bound
 * @param inline {Boolean} Defautl = true. If true, then it inserts a container right after the input by editing the
 * current inserted input in the main $mtf.collection
 * @returns {mixed}
 * @private
 */
MTF_Valid.prototype.message_container_insert = function(rule_name, inline){

    var lastCmp = $mtf.componentLastInfo;

    if(inline === true)
    {
        lastCmp.ruleName = rule_name;
        this.message_injection_container.push(lastCmp);
    }
    else
    {
        var tpl =  this.template_detect(rule_name);
        attr_name = $MTF_Valid_Config.message_attr_name;
        var attributes = {};
        attributes[attr_name] = this.last_message_id;
        if( tpl )
        {
            $mtf.createCustom("custom", tpl, attributes );
        }
        else
        {
            return false;
        }

    }

}


MTF_Valid.prototype.messages_fetch = function(rule_name){
    if(this.rules_collection[rule_name].hasOwnProperty("messages"))
    {
        return this.rules_collection[rule_name].messages;
    }
    else
    {
        return false;
    }
}

MTF_Valid.prototype.message_edit = function(rule_name, type, message, language){
    language = (language) ? language : $mtf.getLang();
    this.rules_collection[rule_name].messages[type][language] = message;
}

MTF_Valid.prototype.message_language_edit = function(rule_name, type, messages){
    this.rules_collection[rule_name].messages[type] = messages;
}


MTF_Valid.prototype.messages_edit_all = function(rule_name, type, messages){
    this.rules_collection[rule_name].messages[type] = messages;
}


MTF_Valid.prototype.message_id_into_template = function(element_selector_or_object, message_id){
    return $mtf.E(element_selector_or_object).Attr($MTF_Valid_Config.input_message_attr_name, message_id);
}

MTF_Valid.prototype.message_parse = function(message, placeholders){
    var keys = Object.keys(placeholders);
    var msg_parsed = "";
    for(var i = 0; i < keys.length; i++)
    {
        msg_parsed = message.replace(":"+keys[i].toLowerCase(), placeholders[keys[i]]);
    }
    return msg_parsed;
}

MTF_Valid.prototype.hash_generate_new = function(cmp_obj){
    var hash = this.hash_name_to_value(cmp_obj.type);
    var id = "mtmsg"+hash+cmp_obj.index;
    return id;
}

MTF_Valid.prototype.language_detect = function(){
    return $MTF_Valid_Config.lang;
}


MTF_Valid.prototype.component_not_bound_to_message = function(lastCompObject){
    var g = (lastCompObject.type + "-" + lastCompObject.index);
    return ( this.message_to_components.indexOf(lastCompObject.index + "-" + lastCompObject.type) !== -1 )
        ? false : true;
}
