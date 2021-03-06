



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
 * registers a rule for a the last component of MTForm and
 * @param rule_name @__ruleName
 * @param rule_value @__ruleValueId
 * @param config the configuration object
 */
MTF_Valid.prototype.ruleRegister = function(rule_name, rule_value, config){
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

    if( config.hasOwnProperty("message") )
        message_object  = config.message;
    else
        config.message = message_object;
    if( config.hasOwnProperty("events") )
        events  = config.events;
    else
        config.events = events;
    if( config.hasOwnProperty("type") )
        inline  = config.inline;
    else
        config.type = inline;
    if( config.hasOwnProperty("template") )
        template  = config.template;
    else
        config.template = template;
    if( config.hasOwnProperty("message_element") )
        message_element  = config.message_element;
    else
        config.message_element = message_element;
    if( config.hasOwnProperty("placeholders") )
        placeholders = config.placeholders;
    else
        config.placeholders = placeholders;

    this.rule_data_register(rule_name, last_comp, config);

    // if user has not passed any value to use_template, we delegate the decision for
    // per-rule and global configurations.
    if ( template !== false && message_element === null )
    {
        // message containers, by default, are just added to each
        // component once, but it is possible to allow several
        // instances per component. The following code block checks to see
        // whether to allow multiple insertion or else secure one-insertion

        // @todo we have to make another complementary condition
        // @todo to allow for insertion of multiple templates

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

    // storing the rules values
    if(!this.temporary_rules_values.hasOwnProperty(last_comp.type))
        this.temporary_rules_values[last_comp.type] = {};
    if(!this.temporary_rules_values[last_comp.type].hasOwnProperty(last_comp.index))
        this.temporary_rules_values[last_comp.type][last_comp.index] = {};

    this.temporary_rules_values[last_comp.type][last_comp.index][rule_name] = rule_value;


    this.rule_add_to_collection(rule_name, last_comp);


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
 * Adds the defined rule to the collection.
 * @param lastCompInfo {Object} @__lastComponent
 * @param rule_obj {Array} an array containing the name and the valueId of the rule
 * @param events an array containing the events of the rule
 * @param placeholders @__placeholder
 * @private
 */
MTF_Valid.prototype.rule_add_to_collection = function(rule_name, component_info){

    var rule_data = this.rule_data_fetch(rule_name, component_info);
    if( this.rule_to_component_exists(component_info) )
    {
        this.rule_to_component_update(component_info, rule_name, {
            rules : [rule_name],
            message_id : this.last_message_id,
            events : rule_data.events
        });
       /* for( var i = 0; i < this.rules.length; i++ ) // checks if this component has already
        // being bound to a rule, if yes, then just add the rule than creating a collection anew
        {
            if( this.rules[i]['index'] == lastCompInfo.index && this.rules[i]['type'] == lastCompInfo.type )
            {
                this.rules[i]['rules'][rule_obj[0]] = rule_obj[1];
                this.rules[i]['index'] = lastCompInfo.index;
                this.rules[i]['type'] = lastCompInfo.type;
                this.rules[i]['events'] = events;
                this.rules[i]['message_id'] = this.last_message_id;
                rule_object = this.rules[i];
            }
            else
            {
                var rule_new = {};
                var placeholder_obj = {};
                placeholder_obj[rule_obj[0]] = placeholders;
                rule_new[rule_obj[0]] = rule_obj[1];
                rule_object = {
                    index : lastCompInfo.index,
                    type : lastCompInfo.type,
                    rules : rule_new,
                    events : events,

                    'message_id' : this.last_message_id
                };
                this.rules.push(rule_object);
            }
        }*/
    }
    else
    {

        this.rule_to_component_register(component_info, {
            rules : [rule_name],
            message_id : this.last_message_id,
            events : rule_data.events
        });

    }
}

/**
 * Based on the rules and its bound index and type, it search main collections and find the proper string for
 * the already-added form-component and merge the rule attribute to them using regular expression.
 * Note: in this stage, no form component has yet been created and all data are string.
 * @private
 */
MTF_Valid.prototype.rules_bind = function(){

    var rules_keys = Object.keys(this.rules);

    /**
     * Looping through each element
     */
    for( var i = 0; i < rules_keys.length; i++ )
    {
        // extracting the name to get proper data
        var component_info  = this.name_extract(rules_keys[i]);
        var type = component_info.type;
        var index = component_info.index;

        var component_rules = this.rules[rules_keys[i]];

        var rule_parsed = this.rules_parsed(component_rules.rules, component_info);

        var attribute_component_info;

        /**
         * The following block registers the events for elements. The event listeners
         * are not attached here, they are attached when events_add_listeners() is invoked.
         */
        if(this.rules[rules_keys[i]]['events'])
        {
            this.events_to_component_register(this.rules[rules_keys[i]]['events'], { "type" : type, "index" : index } );
            attribute_component_info = this.component_info_attribute_set(
                type,
                index
            );
        }


        rule_parsed = this.__wrap_in_attr(rule_parsed);



        var msg_container = component_rules.message_id;

        var component = $mtf.collections[type][index];
        var msg_container = $MTF_Valid_Config.input_message_attr_name + "='" + msg_container + "'";
        // this rules select <tagName as well as the following spaces, for an input,
        // matches: "<input name='email' />" => "<input "
        var reg_comp_type = this.tag_name(type);
        var reg_rule = new RegExp("(\<" + reg_comp_type + "*\s*)+(.*)");

        // ensuring that no undefined is returned. ONLY string must be allowed
        if(typeof attribute_component_info !== 'string' ) attribute_component_info = "";
        if(typeof rule_parsed !== 'string' ) rule_parsed = "";
        if(typeof msg_container !== 'string' ) msg_container = "";
        /**
         * @todo in later versions we must make a more powerful, modular and
         * object oriented approach for injecting rule's associated template params.
         * Now, we achieve this through template processing, but in future revisions,
         * it is worth transferring the following code into a more standard code, the
         * one which uses the system's EvenEngine and relies on pointers tha actual
         * [hardened] string values.
         */
        if( component_info.type == 'select')
        {
            var component_split = reg_rule.exec(component);
            component = component.replace(reg_rule, component_split[1] + " " + attribute_component_info + " " + rule_parsed + " " + msg_container + " " + component_split[2]);
        }
        else if( component_info.type === 'radio' ||  component_info.type === 'checkbox' )
        {
            /**
             * What we do here?
             * Since in aggregated collections, we do have several instances of a component,
             * such as two or more radios, all of them are created using <input type='radio' ... />
             * hence, our regular RegEx does not suffice, as it would only match one instance
             * (the very first one) of a certain component. Hence, the rest of instances
             * would remain untouched by the rules&events, resulting in a broken validation
             * system for that set of components. The following block of code process the first
             * component, regularly as the other types of component, then the component_temp_name
             * which is a randomly generated value, appended to a designated name ("CUSTOM_TEMPLATE_NAME")
             * to make a totally partly sensible, partly random name, replaces the very first component's
             * real name, hence removing it from later match candidates; then, since the while still returns
             * true, the next first available component would be matched, processed, and then replaced
             * with the temporary name, making room for the next potential component to be matched
             * and so and on....
             */
            var component_temp_name = "<CUSTOM_TEMPLATE_NAME"+$mtf.rand(15); // a randomName
            while( reg_rule.test(component) !== false )
            {
                var component_split = reg_rule.exec(component);
                var tag_temp_replacement = component_temp_name; // this prevents the next match to stop at this component
                component = component.replace(reg_rule, tag_temp_replacement + " " + attribute_component_info + " " + rule_parsed + " " + msg_container + " " + component_split[2]);
            }

            /**
             * This while simply replaces all temp name with the component's real name.
             */
            while( component.indexOf(component_temp_name) != -1 )
            {
                component = component.replace(component_temp_name, "<"+reg_comp_type);
            }


            // // for aggregated collections such as radios or checkboxes
            // for( var w = 0; w < component.length; w++)
            // {
            //     var component_split = reg_rule.exec(component[w]);
            //     component[w] = component[w].replace(reg_rule, component_split[1] + " " + attribute_component_info + " " + rule_parsed + " " + msg_container + " " + component_split[2]);
            // }
        }
        else
        {
            var component_split = reg_rule.exec(component);
            component = component.replace(reg_rule, component_split[1] + " " + attribute_component_info + " " + rule_parsed + " " + msg_container + " " + component_split[2]);
        }

        $mtf.collections[type][index] = component;
        //  var this_rule_s_message_id =
        /* finalizing message container */
        if( this.message_injection_container.length > 0 )
        {
            var reg_msg_rule = new RegExp("(?:.*)(<" + reg_comp_type + ".*\/>)(?:.*)");
            for( var w = 0; w < this.message_injection_container.length; w++ )
            {
                // checks to see if the rule is bound to current component or not
                if( this.message_injection_container[w].type == type &&
                    this.message_injection_container[w].index == index )
                {
                    var msg_info = this.message_injection_container[w];
                    var current_comp = null;
                    var temp_comp  = $mtf.collections[msg_info.type][msg_info.index];
                    var form_comp_extracted = null;
                    var tpl =  this.template_detect(msg_info.ruleName);
                    var attr = $MTF_Valid_Config.message_attr_name + "='" + component_rules.message_id + "'";
                    var final_template = "";
                    /**
                     * Because the last segment of aggregated templates, such as radios and
                     * checkboxes are not the self-closing tags, but rather are a piece of
                     * label, we have to push the message template to the end of the template,
                     */
                    if( component_info.type == 'radio' || component_info.type == 'checkbox' )
                    {
                        current_comp = $mtf.collections[msg_info.type][msg_info.index];
                        // form_comp_extracted = reg_msg_rule.exec(current_comp);
                        tpl = tpl.replace( $mtf.placeholders_get_default("attrs", 'mtform'), attr);
                        tpl = current_comp + tpl;
                        final_template = tpl;
                    }
                    else if( typeof temp_comp === "string")
                    {
                        current_comp = $mtf.collections[msg_info.type][msg_info.index];
                        form_comp_extracted = reg_msg_rule.exec(current_comp);
                        tpl = tpl.replace( $mtf.placeholders_get_default("attrs", 'mtform'), attr);
                        tpl = form_comp_extracted[1] + tpl;
                        final_template = current_comp.replace(form_comp_extracted[1], tpl);
                    }
                    /**
                     * Currently the only known aggregated HTMLElements are
                     * checkboxes, radios and selects.
                     * Hence the following block is for the above type of HTMLElements
                     */
                    else if(typeof temp_comp == 'object')
                    {
                        // this is a value passed in the time of invocation
                        // as the value of an option named "position"
                        var positioning_index = 0;

                        current_comp = $mtf.collections[msg_info.type][msg_info.index];
                        form_comp_extracted = reg_msg_rule.exec(current_comp[positioning_index]);
                        tpl = tpl.replace( $mtf.placeholders_get_default("attrs", 'mtform') , attr);

                        // @todo for radios and checkboxes we pass the message container before the elements and not after them
                        if( type == 'checkbox' || type == 'radio' )
                        {
                            tpl = tpl + form_comp_extracted[1];
                        }
                        else
                        {
                            tpl = form_comp_extracted[1] + tpl;
                        }

                        // we have to put everything back in order, hence re-loop the
                        // collection and put them back.
                        for( var pb = 0; pb < current_comp.length; pb++)
                        {
                            if( pb != positioning_index )
                            {
                                final_template += current_comp[pb];
                            }
                            else
                            {
                                final_template = current_comp[positioning_index].replace(form_comp_extracted[1], tpl);
                            }
                        }
                        /*
                        for( var k = 0; i < temp_comp.length; k++)
                        {
                            current_comp.push($mtf.collections[msg_info.type][msg_info.index][k]);
                            form_comp_extracted.push(reg_msg_rule.exec($mtf.collections[msg_info.type][msg_info.index][k]));

                            for(var s = 0; s < form_comp_extracted.length; s++)
                            {
                                if( typeof form_comp_extracted[s] == 'object' )
                                {
                                    tpl = form_comp_extracted[s][1] + tpl; // @todo undefined error here
                                    if( typeof current_comp == 'object')
                                    {
                                        tpl = current_comp[0].replace(form_comp_extracted[s][1], tpl);
                                    }
                                    else
                                    {
                                        tpl = current_comp.replace(form_comp_extracted[s][1], tpl);
                                    }

                                    final_template += tpl;
                                }

                            }

                        }
                        **/

                    }


                    $mtf.collections[msg_info.type][msg_info.index] = final_template;

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
MTF_Valid.prototype.rules_parsed = function(rule_array, last_component_info){

    var rule_string = "";
    var sep = $MTF_Valid_Config.rules_each_separator;
    for( var i = 0; i < rule_array.length; i++ )
    {
        var rule_value;
        var random_key = $mtf.rand(10);

        if( this.temporary_rules_values.hasOwnProperty(last_component_info.type) )
        {
            var rules_values_keys = Object.keys(this.temporary_rules_values[last_component_info.type]);
            for(var w = 0; w < rules_values_keys.length; w++)
            {
                this.rules_values[random_key] = this.temporary_rules_values[last_component_info.type][rules_values_keys[w]][rule_array[i]];
            }
        }


        rule_value = rule_array[i];

        if(i+1 == rule_array.length)
        {
            rule_string +=  rule_array[i] + "=" + random_key;
        }
        else
        {
            rule_string +=  rule_array[i] + "=" + random_key + sep;
        }

        // save the random_key=rule_name pair
        this.rules_rand_key_to_rule_name[random_key] = rule_array[i];
    }
    this.rules[random_key]
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

    var event_item_info = this.get_type_index(element.getAttribute( $MTF_Valid_Config.attribute_component_info ));

    var found_rules = {};

    if( !$mtf.is_empty(rule_attr) && $mtf.objectLength(rule_attr) > 0 )
    {
        var rules = rule_attr.split( $MTF_Valid_Config.rules_each_separator );

        for( var i = 0; i < rules.length; i++ )
        {

            var key_value = rules[i].split("=");
            var rule_value = this.rules_values[key_value[1]];
            var g =  event_item_info.index + "-" + event_item_info.type + "-" + key_value[0];
            // searching for placeholders
            //var placeholders = this.template_placeholder_values[event_item_info.index + "-" + event_item_info.type + "-" + key_value[0]];

            var placeholders = this.rule_data_fetch(key_value[0], event_item_info, "placeholders");


            var callback_method = this.rules_collection[key_value[0]]['main'];
            var success_callback = this.rules_collection[key_value[0]]['success'];
            var error_callback = this.rules_collection[key_value[0]]['error'];
            var cleaner_callback = this.rules_collection[key_value[0]]['cleaner'];
            var events_collection = this.events_fetch(element);
            var msg = this.rules_collection[key_value[0]]['messages'];

            found_rules[key_value[0]] = {
                callback : callback_method,
                success : success_callback,
                error : error_callback,
                cleaner : cleaner_callback,
                value : rule_value,
                events : events_collection,
                messages : msg,
                "events-default" : this.rules_collection[key_value[0]]['events'],
                placeholders : placeholders,
                others : this.rules_collection[key_value[0]],
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

    if( typeof(element_valid_ev_attribute) == "string" && element_valid_ev_attribute != "" )
    {
        var splitted = element_valid_ev_attribute.split("-");
        var type_str = this.hash_value_to_name(splitted[0]);

        return {
            type : type_str,
            index : splitted[1],
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
 *
 * @param events_array
 * @param compLastInfo
 */
MTF_Valid.prototype.events_to_component_register = function(events_array, compLastInfo)
{
    var item_type = this.hash_name_to_value(compLastInfo.type);

    if(!this.events_to_rules_collection[compLastInfo.type])
    {
        this.events_to_rules_collection[compLastInfo.type] = {};
    }

    if(!this.events_to_rules_collection[compLastInfo.type][compLastInfo.index])
    {
        this.events_to_rules_collection[compLastInfo.type][compLastInfo.index] = [];
    }

    this.events_to_rules_collection[compLastInfo.type][compLastInfo.index] = events_array;
}



/**
 * Handles event attachment to the component. It is a very important function which
 * creates an anonymous function that manages the two other optional callbacks.
 * If the initial_callback returns false, then the error callback is called,
 * otherwise the success is called.
 * @param initial_callback {function} the main callback for the event
 * @param error {function} optional a callback to be called when initial_callback returns false
 * @param success {function} optional a callback to be called when initial_callback returns true
 * @param cleaner {function} optional a callback to be called over success callback. It is
 *                                    heavier than success callback and is called instead of
 *                                    success callback
 */
MTF_Valid.prototype.event_callback_handler = function(initial_callback, error, success, cleaner){
    var result = initial_callback();

    // checks to see if the return-object has a type property
    if( result.hasOwnProperty("type") )
    {
        // checks to see if the function which has returned
        // value is of regular type
        if( result.type == MTVL_CALLBACK_REGULAR )
        {

            // checks to see if the handler should skip calling any of the error/success callback
            if( result.hasOwnProperty("skip_type") &&  result.skip_type )
            {

                // checks to see if the result is false (= calling error callback)
                if(  result.status !== true )
                {
                    // checks to see if the skip_type is set for error callback
                    if( result.skip_type !== MTVL_SKIP_CALLBACK_ERROR )
                    {
                        var error_result;
                        if(error)
                            error_result = error(result.data);
                        return false;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    if( result.cleaner_type && result.cleaner_type != MTVL_SKIP_CLEANER )
                    {
                        var success_result;
                        if(cleaner) cleaner(result.data);
                        success_result = cleaner(result.data);
                        return true;
                    }
                    else
                    {
                        // checks to see if the skip_type is set for success_callback
                        if( result.skip_type !== MTVL_SKIP_CALLBACK_SUCCESS )
                        {
                            var success_result;
                            if(success) success(result.data);
                            success_result = success(result.data);
                            return true;
                        }
                        else
                        {

                            return true;
                        }
                    }

                }
            }
            // checks to see if the function should skip the success_callback
            else
            {
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
        }
        // the function is of asynchronous type
        else if( result.type == MTVL_CALLBACK_ASYNC )
        {
            return true;
        }
    }
    else
    {
        if( result.hasOwnProperty("skip_type") )
        {
            if(  result.status !== true )
            {
                if( result.skip_type !== MTVL_SKIP_CALLBACK_ERROR )
                {
                    if(error) error(result.data);
                    return false;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                if( result.cleaner_type && result.cleaner_type != MTVL_SKIP_CLEANER )
                {
                    var success_result;
                    if(cleaner) cleaner(result.data);
                    success_result = cleaner(result.data);
                    return true;
                }
                else
                {
                    if (result.skip_type !== MTVL_SKIP_CALLBACK_SUCCESS) {
                        if (success) success(result.data);
                        return true;
                    }
                    else {
                        return true;
                    }
                }
            }
        }
        else
        {
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

    }
}


/**
 * Checks to see what "events" have been defined for a certain component type
 * @param tag_name the name of the tag for which an event is to be searched
 * @returns {object} an array of events
 */
MTF_Valid.prototype.event_get_default = function(tag_name){
    if(tag_name == 'input') return $MTF_Valid_Config.ev_input_default;
}

/**
 * Adds event listener to the form-component children of a form. This function iterates recursively through
 * all the children of a form,checks if they are of type form component, if yes, then
 * checks if they have any events to be attached to them. In case true, it creates a callback,
 * passes all necessary arguments of that specific rule to that call back, and then attaches the event
 * with that callback set as its callback, to the element.
 * @param form_selector the CSS selector to select form which contains the components
 */
MTF_Valid.prototype.events_add_listeners = function(form_selector){
    var parent_cont = document.querySelector(form_selector);
    var mainFunction = this;
    this.each(parent_cont, function(current_child, current_parent){
        // @todo devise a way to retrieve <select>, because the iterator loops through
        // <options> by bypassing (not considering) the <select>
        var parent_tag_name = current_parent.tagName.toLowerCase();
        var parent_childTag_name = current_parent.tagName.toLowerCase();
        var items = [];

        // @todo we do a simple comparison here to check if its <select>
        // but later on, we must create a more convenient, comprehensive
        // and extensible way. Because we might have future modules allowing
        // users to create custom FORM Elements, which probably require
        // special treatments in all regions
        if( parent_tag_name == 'select' )
        {
            items.push(current_parent);
        }

        items.push(current_child);

        var events = [];

        // why do we create another loop?
        // because having a loop allows us to have more control
        // over our elements, even when they passed from is_form_component()
        // and we can change the collection right before it gets bound 
        for( var itr = 0; itr < items.length; itr++ )
        {
            var item = items[itr];
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
                        var callback_cleaner_function = rules_array[keys[w]]['cleaner'];
                        var rule_value = rules_array[keys[w]]['value'];
                        var messages = rules_array[keys[w]]['messages'];
                        var placeholders = rules_array[keys[w]]['placeholders'];
                        var other_options = rules_array[keys[w]];
                        var rule_name = keys[w];

                        // since events accepts an array of events, we loops through events as well, no matter
                        // if the user has passed one event or more.
                        events = rules_array[keys[w]]['events-default'];
                        var events_to_rules_collection = mainFunction.events_fetch(item);
                        if( events_to_rules_collection && events_to_rules_collection.length > 0 )
                        {
                            events = events_to_rules_collection;
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
                         * @param messages_main string for mainCallback
                         * @param messages_error string for errorCallback
                         * @param messages_success string for successCallback
                         * @param placeholders object an object containing key&value pairs. Key is the name
                         *                     of placeholder and value is its replacing value.
                         * @param others object the rest of options
                         * @returns {Function}
                         */
                        var createFunction = function(event, item, rule_value, cb_main, cb_error, cb_success, cb_cleaner, msg_container,
                                                      messages_main, messages_error, messages_success, placeholders, others) {
                            return function (event) {
                                var current_element = item;
                                var event_object = event;
                                return $mtf.$lives.Valid.event_callback_handler(
                                    function () {
                                        var configuration = {
                                            "message_element": msg_container,
                                            "message_text": messages_main,
                                            "event": event_object,
                                            "placeholders": placeholders,
                                            // such extra data is needed if the rule's main
                                            // function tries to call error callback or success
                                            // callback internally. This is needed for functions
                                            // which contains asynchronous AJAX.
                                            // But regardless of AJAX-bound functions, there
                                            // are unpredicted conditions where a developer
                                            // might want to write a customized rule which
                                            // would do operations inside its main() function
                                            // and hence should have access to this information
                                            system: {
                                                error_callback: cb_error,
                                                success_callback: cb_success,
                                                cleaner_callback: cb_cleaner,
                                                message_error: messages_error,
                                                message_success: messages_success
                                            }
                                        };

                                        var conf_keys = Object.keys(others);
                                        for(var x = 0; x < conf_keys.length; x++)
                                        {
                                            if( !configuration.hasOwnProperty(conf_keys[x]) )
                                            {
                                                configuration[conf_keys[x]] = others[conf_keys[x]];
                                            }
                                        }


                                        return cb_main(current_element, rule_value, configuration);
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
                                    },
                                    function () {
                                        return cb_cleaner(current_element, rule_value, {
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
                            createFunction(event, item, rule_value, callback_function, callback_error_function, callback_success_function,
                                callback_cleaner_function, msg_container, messages.main[$mtf.lang],
                                messages.error[$mtf.lang], messages.success[$mtf.lang], placeholders, other_options)
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
        }

    });

}

/**
 * fetches the events which are bound to this component. It reads the corresponding attribute
 * which holds the type and index of a component and then searches for the events bound to this
 * specific component.
 * @param element {Object} @__elementJavascript
 * @returns {Array} an array of events [might be zeor-length]
 */
MTF_Valid.prototype.events_fetch = function(element){
    var event_attr = element.getAttribute( $MTF_Valid_Config.attribute_component_info );

    if(event_attr)
    {
        event_attr = event_attr.split("-");
        var event_readable = this.hash_value_to_name(event_attr[0]);
        return this.events_to_rules_collection[event_readable][event_attr[1]];
    }

}

/**
 * Inserts a message container and register it for later usage.
 * @param rule_name the name of the the for which this message container is bound
 * @param inline {Boolean} Defautl = true. If true, then it inserts a container right after the input by editing the
 * current inserted input in the main $mtf.collection
 * @returns {Object} returns a message object containing all types and languages
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
            $mtf.create_custom("custom", tpl, attributes );
        }
        else
        {
            return false;
        }

    }

}

/**
 * Returns all the messages of a rule.
 * @param rule_name @__ruleName
 * @returns {*}
 */
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
    language = (language) ? language : $mtf.language_fetch();
    this.rules_collection[rule_name].messages[type][language] = message;
}

/**
 * Sets the message of a certain language of a certain type
 * @param rule_name @__ruleName
 * @param type {String} the type of the messages to be edited (e.g. error)
 * @param language {String} the name of the language which is going to be edited
 * @param messages {String} the messages container. Note: it should contain all the (target) languages.

 */
MTF_Valid.prototype.message_language_edit = function(rule_name, type, language, messages){
    this.rules_collection[rule_name].messages[type][language] = messages;
}

/**
 * Sets all the messages of a certain type (e.g. error) at once.
 * @param rule_name @__ruleName
 * @param type {String} the type of the messages to be edited (e.g. error)
 * @param messages the messages container. Note: it should contain all the (target) languages.
 */
MTF_Valid.prototype.messages_edit_all = function(rule_name, type, messages){
    this.rules_collection[rule_name].messages[type] = messages;
}

/**
 * Adds an attribute whose value is the message id of the message container to which the element
 * is bound. The operation is done a live element.
 * @param element_selector_or_object {String|Object} @__selectorOrElement
 * @param message_id
 * @returns {*}
 */
MTF_Valid.prototype.message_id_into_template = function(element_selector_or_object, message_id){
    return $mtf.E(element_selector_or_object).Attr($MTF_Valid_Config.input_message_attr_name, message_id);
}


/**
 * Parses the messages. It treats the keys of the "placeholders" object as placeholder and replace them
 * with their respective values. Placeholders are prepended with a ":".
 * @param message {String} the message string
 * @param placeholders @__placeholder
 * @returns {string}
 */
MTF_Valid.prototype.message_parse = function(message, placeholders){
    var keys = Object.keys(placeholders);
    var msg_parsed = message;
    for(var i = 0; i < keys.length; i++)
    {
        var key_name = ":"+keys[i].toLowerCase();
        if( keys[i].toLowerCase().indexOf("::") == 0 ) // means it is a system placeholder
        {
            key_name = keys[i].toLowerCase();
        }
        msg_parsed = message.replace(key_name, placeholders[keys[i]]);
    }
    return msg_parsed;
}

/**
 * Returns a new hash. this function returns a hash of current component's type, with its
 * index appended to it to avoid collision with other components of the same type.
 * @param lastCompObject @__lastComponent
 * @returns {string}
 */
MTF_Valid.prototype.hash_generate_new = function(lastCompObject){
    var hash = this.hash_name_to_value(lastCompObject.type);
    var id = "mtmsg"+hash+lastCompObject.index;
    return id;
}

/**
 * Returns current language used by MTForm
 * @returns {String}
 */
MTF_Valid.prototype.language_detect = function(){
    return $MTF_Valid_Config.lang;
}

/**
 * Checks to see if the component whose type and index is passed, has already been injected with a message
 * container (of type injection). This function is used because message container of injection type are
 * just injected into the current component's template (inline-method), and hence are not treated as a distinct
 * component.
 * @param lastCompObject {Object} @__lastComponent
 * @returns {boolean}
 */
MTF_Valid.prototype.component_not_bound_to_message = function(lastCompObject){
    var g = (lastCompObject.type + "-" + lastCompObject.index);
    return ( this.message_to_components.indexOf(lastCompObject.index + "-" + lastCompObject.type) !== -1 )
        ? false : true;
}


/**
 * parses the event into a usable string. This function creates a index and type of the component
 * @param events_array the events array
 * @param item_type @__elementLastType
 * @param item_index @__elementLastIndex
 * @returns {string}
 */
MTF_Valid.prototype.component_info_attribute_set = function(item_type, item_index){
    return $MTF_Valid_Config.attribute_component_info + "='" + this.hash_name_to_value(item_type) + "-" + item_index + "'";
};


MTF_Valid.prototype.rule_data_register = function(rule_name, last_component_info, data_object ){
    if( !this.rules_data.hasOwnProperty(rule_name))
        this.rules_data[ rule_name ] = {};
    if( !this.rules_data[ rule_name ].hasOwnProperty(last_component_info.type))
        this.rules_data[ rule_name ][ last_component_info.type ] = {};
    if( !this.rules_data[ rule_name ][ last_component_info.type ].hasOwnProperty(last_component_info.type))
        this.rules_data[ rule_name ][ last_component_info.type ][ last_component_info.index ] = {};

    this.rules_data[ rule_name ][ last_component_info.type ][ last_component_info.index ] = data_object;
}

MTF_Valid.prototype.rule_data_fetch = function(rule_name, last_component_info, property_name){
    if(typeof property_name === 'string')
    {
        return this.rules_data[rule_name][last_component_info.type][last_component_info.index][property_name];
    }
    else
    {
        return this.rules_data[rule_name][last_component_info.type][last_component_info.index]
    }
}


MTF_Valid.prototype.rule_data_update = function(rule_name, last_component_info, property_name, property_value){
    return this.rules_data[rule_name][last_component_info.type][last_component_info.index][property_name] = property_value;
}

MTF_Valid.prototype.rule_to_component_register = function(component_info, data){
    this.rules[this.name_create_from_index_type(component_info)] = data;
}

/**
 *
 * @param component_info
 * @returns {*}
 */
MTF_Valid.prototype.rule_to_component_fetch= function(component_info){
    return this.rules[this.name_create_from_index_type(component_info)];
}

/**
 * If a rule is associated with a component or not
 * @param component_info
 * @returns {boolean}
 */
MTF_Valid.prototype.rule_to_component_exists = function(component_info){
    return (this.rules.hasOwnProperty(this.name_create_from_index_type(component_info))) ? true : false;
}

/**
 * Adds a rule with its data-object to the list of rules associated with the given
 * component
 * @param component_info the component to which the rules are associated
 * @param rule_name the name of the rule to be added
 * @param data the data object of the rule
 */
MTF_Valid.prototype.rule_to_component_update = function(component_info, rule_name, data){
    var old_data = this.rules[this.name_create_from_index_type(component_info)];

    if(data.hasOwnProperty("rules"))
    {
        for(var i = 0; i < data.rules.length; i++)
        {
            old_data.rules.push(data.rules[i]);
        }
    }
    if(data.hasOwnProperty("events"))
    {
        var length1 = Object.keys(data.events);
        for(var i = 0; i < length1; i++)
        {
            var length2 = Object.keys(old_data.events);
            var allow = false;
            for(var w = 0; w < length2; w++)
            {
                if( old_data.events[length2[w]] == data.events[length1[i]])
                {
                    allow = true;
                }
            }
            if(allow)
            {
                old_data.events.push(length1[i]);
            }
        }
    }

    this.rules[this.name_create_from_index_type(component_info)][rule_name] = old_data;
}

/**
 * Creates a name from the component's index and type
 * @param component_info
 * @returns {string}
 */
MTF_Valid.prototype.name_create_from_index_type = function(component_info){
    return component_info.type + '-' + component_info.index;
}

/**
 * Extracts a name into type and index object.
 * @param name_string
 * @returns {{type: *, index: *}}
 */
MTF_Valid.prototype.name_extract = function(name_string){
    var split_name = name_string.split("-");
    return {
        type : split_name[0],
        index : split_name[1]
    };
}

/**
 * Checks to see if the rule_name is the last rule in the rules-queue or not.
 * @param rule_name the name of the rule to be checked
 * @returns {boolean} true if the rule_name is the last rule in the rules-queue and false if
 * it is not
 */
MTF_Valid.prototype.rule_is_last_in_stack = function(rule_name){

    var rules_values_keys = Object.keys(this.rules_values);
    var rules_length = rules_values_keys.length;
    var last_rule_name = this.rules_rand_key_to_rule_name[rules_values_keys[rules_length-1]];
    return (last_rule_name == rule_name);
}