

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
MTF_Valid.prototype.AddRule = function(rule_name, rule_value, config){

    var template = true;
    var message_object = {};
    var events = [];
    var inline = true;

    if( config.hasOwnProperty("message") ) message_object  = config.message;
    if( config.hasOwnProperty("events") ) events  = config.events;
    if( config.hasOwnProperty("type") ) inline  = config.inline;
    if( config.hasOwnProperty("template") ) template  = config.template;

    // if user has not passed any value to use_template, we delegate the decision for
    // per-rule and global configurations.
    if ( template !== false )
    {
        // message containers, by default, are just added to each
        // component once, but it is possible to allow several
        // instances per component. The following code block checks to see
        // whether to allow multiple insertion or else secure one-insertion
        var last_comp = $mtf.componentLastInfo;

        if( this.__compNotSame(last_comp) )
        {
            this.last_message_id = this.__generate_random_id(last_comp);
            this.message_to_components.push(last_comp.index + "-" + last_comp.type );
            this.__insertMessageContainer(rule_name, inline);
        }

    }


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

MTF_Valid.prototype.addTemplate = function(tmp_name, tmp_value){
    this.templates[tmp_name] = tmp_value;
}

MTF_Valid.prototype.getTemplate = function(tmp_name, tmp_value){
    return this.templates[tmp_name];
}

MTF_Valid.prototype.editTemplate = function(tmp_name, tmp_value){
    this.templates[tmp_name] = tmp_value;
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

    var result = initial_callback();
    //if($mtf.$lives.Valid.noProcessRunning(this.last_message_id))
    //{
        if(  result.status !== true )
        {
            $mtf.$lives.Valid.addProcess(this.last_message_id);
            if(error) error(result.data);
            return false;
        }
        else
        {
            $mtf.$lives.Valid.freeProcess(this.last_message_id);
            if(success) success(result.data);
            return true;
        }
    //}
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

    var rule_object;
    var events_all = $MTF_Valid_Config.type_events[ element_type ];
    if( events )
        events_all = events_all.concat(events);


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
                this.rules[i]['events'] = this.rules[i]['events'].concat(events);
                this.rules[i]['message_id'] = this.last_message_id;
                rule_object = this.rules[i];
            }
            else
            {
                var rule_new = {};
                rule_new[rule_obj[0]] = rule_obj[1];
                rule_object = {
                    index : element_index,
                    type : element_type,
                    rules : rule_new,
                    events : events,
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
        rule_object = {
            index : element_index,
            type : element_type,
            rules : rule_new,
            events : events_all,
            'message_id' : this.last_message_id,
        };
        this.rules.push(rule_object);
    }

    this.rules_obsolete.push( rule_object );
}

/**
 * Adds event listener for the form components for their values to be checked against
 * their bound rules on the occurance of that certain event.
 * @param form_selector the CSS selector to select form which contains the components
 * @private
 */
MTF_Valid.prototype.__add_event_listeners = function(form_selector){
    var parent_cont = document.querySelector(form_selector);
    var mainFunction = this;
    this.__forEachChildren(parent_cont, function(current_child, current_parent){
        var item = current_child;
        var events = [];
        if($mtf.is_form_component(item))
        {
            var rules_array = mainFunction.__find_rules(item);
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
                    // since events accepts an array of events, we loops through events as well, no matter
                    // if the user has passed one event or more.
                    events = rules_array[keys[w]]['events-default'];
                    var events_optional = mainFunction.__get_optional_events(item);
                    if( events_optional && events_optional.length > 0 )
                    {
                        events = events_optional;
                    }
                    var __eventCallbackHandler = mainFunction.__eventCallbackHandler;

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
                    var createFunction = function(event, item, rule_value, cb_main, cb_error, db_success, msg_container, messages_main, messages_error, messages_success) {
                        return function (event) {
                            var current_element = item;
                            var event_object = event;
                            return $mtf.$lives.Valid.__eventCallbackHandler(
                                function () {
                                    return cb_main(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages_main,
                                        "event": event_object
                                    });
                                },
                                function () {
                                    return cb_error(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages_error,
                                        "event": event_object
                                    })
                                },
                                function () {
                                    return db_success(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages_success,
                                        "event": event_object
                                    })
                                }
                            );
                        }
                    };


                    callbackProcessQueue.push(
                        createFunction(event, item, rule_value, callback_function, callback_error_function, callback_success_function, msg_container, messages.main[$mtf.lang],
                        messages.error[$mtf.lang], messages.success[$mtf.lang])
                    );



                    /*for( var eventIncr = 0 ; eventIncr < events.length; eventIncr++) {

                        item.addEventListener(events[eventIncr], function (event) {
                            var current_element = this;
                            var event_object = event;
                            __eventCallbackHandler(
                                function (extra_data) {
                                    return callback_function(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages.main[$mtf.lang],
                                        "event": event_object,
                                        "data": extra_data
                                    });
                                },
                                function (extra_data) {
                                    return callback_error_function(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages.error[$mtf.lang],
                                        "event": event_object,
                                        "data": extra_data
                                    })
                                },
                                function (extra_data) {
                                    return callback_success_function(current_element, rule_value, {
                                        "message_element": msg_container,
                                        "message_text": messages.success[$mtf.lang],
                                        "event": event_object,
                                        "data": extra_data
                                    })
                                }
                            );

                        });

                    }*/

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

                    item.addEventListener("blur", mainCallbackAttacher )
                }

            }


        }
    });

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
    //ruleValue = (ruleValue) ? ruleValue : true;
    this.__add_rule_to_stack(last_comp.index, last_comp.type, [ ruleName , ruleValue ], events );
}

/**
 * Based on the rules and its bound index and type, it search main collections and find the proper string for\
 * the already-added form-component and merge the rule attribute to them using regular expression.
 * Note: in this stage, no form component has yet been created and all data are string.
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
        var msg_container = this.rules[i]['message_id'];

        var component = $mtf.collections[type][index];
        var msg_container = $MTF_Valid_Config.input_message_attr_name + "='" + msg_container + "'";
        // this rules select <tagName as well as the following spaces, for an input,
        // matches: "<input name='email' />" => "<input "
        var reg_comp_type = this.__tagName(type);
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

        /* finalizing message container */
        if( this.message_injection_container.length > 0 )
        {
            var reg_msg_rule = new RegExp("(?:.*)(<input.*\/>)(?:.*)");
            for( var i = 0; i < this.message_injection_container.length; i++ )
            {
                var msg_info = this.message_injection_container[i];
                var current_comp = $mtf.collections[msg_info.type][msg_info.index];
                var form_comp_extracted = reg_msg_rule.exec(current_comp);
                var tpl =  this.__get_proper_template(msg_info.ruleName);
                var attributes = {};
                var attr = $MTF_Valid_Config.message_attr_name + "='" + this.last_message_id + "'";
                tpl = tpl.replace($mtf.ph("attrs"), attr);
                tpl = form_comp_extracted[1] + tpl;
                tpl = current_comp.replace(form_comp_extracted[1], tpl);
                $mtf.collections[msg_info.type][msg_info.index] = tpl;
            }
        }

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
        var rule_value;
        rule_value = rule_object[keys[i]];
        if( typeof rule_value === 'undefined' || typeof rule_value === null )
            rule_value = true;
        if(i+1 == keys.length)
        {
            rule_string +=  keys[i] + "=" + rule_value;
        }
        else
        {
            rule_string +=  keys[i] + "=" + rule_value + sep;
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
        var rules = rule_attr.split( $MTF_Valid_Config.rules_each_separator );

        for( var i = 0; i < rules.length; i++ )
        {
            var key_value = rules[i].split("=");

            var callback_method = this.rules_collection[key_value[0]]['main'];
            var success_callback = this.rules_collection[key_value[0]]['success'];
            var error_callback = this.rules_collection[key_value[0]]['error'];
            var events_collection = this.__get_optional_events(element);
            var msg = this.rules_collection[key_value[0]]['messages'];
            found_rules[key_value[0]] = {
                callback : callback_method,
                success : success_callback,
                error : error_callback,
                value : key_value[1],
                events : events_collection,
                messages : msg,
                "events-default" : this.rules_collection[key_value[0]]['events']
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

/**
 * Inserts a message container and register it for later usage.
 * @param rule_name the name of the the for which this message container is bound
 * @param inline {Boolean} Defautl = true. If true, then it inserts a container right after the input by editing the
 * current inserted input in the main $mtf.collection
 * @returns {mixed}
 * @private
 */
MTF_Valid.prototype.__insertMessageContainer = function(rule_name, inline){

    var lastCmp = $mtf.componentLastInfo;

    if(inline === true)
    {
        lastCmp.ruleName = rule_name;

        this.message_injection_container.push(lastCmp);
    }
    else
    {
        var tpl =  this.__get_proper_template(rule_name);
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

MTF_Valid.prototype.__get_proper_template = function(rule_name){

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

MTF_Valid.prototype.__forEachChildren = function(parent, callback)
{
    if( parent.children.length > 0 )
    {
        for ( var i = 0; i < parent.children.length; i++ )
        {
            if( parent.children[i].children.length > 0 )
            {
                this.__forEachChildren(parent.children[i], function(current_child, this_parent){
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

MTF_Valid.prototype.__tagName = function(input_type_string)
{
    return $MTF_Valid_Config.tag_names[input_type_string];
}

MTF_Valid.prototype.__generate_random_id = function(cmp_obj){
    var hash = this.__get_hash_value(cmp_obj.type);
    var id = "mtmsg"+hash+cmp_obj.index;
    return id;
}

MTF_Valid.prototype.__getLang = function(){
    return $MTF_Valid_Config.lang;
}

MTF_Valid.prototype.__getMessages = function(rule_name){
    if(this.rules_collection[rule_name].hasOwnProperty("messages"))
    {
        return this.rules_collection[rule_name].messages;
    }
    else
    {
        return false;
    }
}


MTF_Valid.prototype.__compNotSame = function(lastCompObject){
    return ( this.message_to_components.indexOf(lastCompObject.type + "-" + lastCompObject.index) !== -1 )
            ? false : true;
}


MTF_Valid.prototype.noProcessRunning = function(message_id){
    return (this.pid.indexOf(message_id) === -1 ) ? true : false;
}

MTF_Valid.prototype.addProcess = function(message_id){
    this.pid.push(message_id);
}

MTF_Valid.prototype.freeProcess = function(message_id){
    this.pid.pop(message_id);
}