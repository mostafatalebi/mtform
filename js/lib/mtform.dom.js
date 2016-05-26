mtFormInit.prototype.html_inject = function(component_last_collection_properties, insertion_type, skip_aggregated)
{
    /**
     * @event onHTMLBeforeInjection
     * @type {*}
     */
    var eventObject = $mtf.Event.dispatchEvent("onHTMLBeforeInjection", new EventObject({
        target : {
            "component_last_collection_properties" : component_last_collection_properties,
            "insertion_type" : insertion_type,
            "skip_aggregated" : skip_aggregated
        } ,
        type : 'onHTMLBeforeInjection'}));
    var eventPrevention = this.Event.checkPreventionState(eventObject);
    if(eventPrevention != false && eventPrevention != -1)
        return eventPrevention;
    

    if(insertion_type == 'after')
    {
        if(typeof this.collections[component_last_collection_properties.type][component_last_collection_properties.index] !== "object")
        {
            this.collections[component_last_collection_properties.type][component_last_collection_properties.index] =
                this.collections[component_last_collection_properties.type][component_last_collection_properties.index] + this.htmlObject.after;
        }
        else // if it is object
        {
            if(skip_aggregated == false)
            {
                for(var i = 0; i < this.collections[component_last_collection_properties.type][component_last_collection_properties.index].length; i++)
                {
                    this.collections[component_last_collection_properties.type][component_last_collection_properties.index][i] =
                        this.collections[component_last_collection_properties.type][component_last_collection_properties.index][i] + this.htmlObject.after;
                }
            }
            else
            {
                // since array_skip is true, we just assign the HTMLs before and after the collection. To do this,
                // we prepend it to the first element and append it to the last element.
                this.collections[component_last_collection_properties.type][component_last_collection_properties.index][0] =
                    this.collections[component_last_collection_properties.type][component_last_collection_properties.index][0] + this.htmlObject.after;

                this.collections[component_last_collection_properties.type][component_last_collection_properties.index]
                    [this.collections[component_last_collection_properties.type][component_last_collection_properties.index].length-1] =
                    this.collections[component_last_collection_properties.type][component_last_collection_properties.index]
                        [this.collections[component_last_collection_properties.type][component_last_collection_properties.index].length-1] + this.htmlObject.after;

            }

        }
        this.htmlObject.after = "";
    }
    else if(insertion_type == 'before')
    {
        if(typeof this.collections[component_last_collection_properties.type][component_last_collection_properties.index] !== "object")
        {
            this.collections[component_last_collection_properties.type][component_last_collection_properties.index] = this.htmlObject.before +
            this.collections[component_last_collection_properties.type][component_last_collection_properties.index];
        }
        else // if it is object
        {
            if(skip_aggregated == false)
            {
                for(var i = 0; i < this.collections[component_last_collection_properties.type][component_last_collection_properties.index].length; i++)
                {
                    this.collections[component_last_collection_properties.type][component_last_collection_properties.index][i] = this.htmlObject.before +
                    this.collections[component_last_collection_properties.type][component_last_collection_properties.index][i];
                }
            }
            else
            {
                // since array_skip is true, we just assign the HTMLs before and after the collection. To do this,
                // we prepend it to the first element and append it to the last element.
                this.collections[component_last_collection_properties.type][component_last_collection_properties.index][0] = this.htmlObject.before +
                this.collections[component_last_collection_properties.type][component_last_collection_properties.index][0];

                this.collections[component_last_collection_properties.type][component_last_collection_properties.index]
                    [this.collections[component_last_collection_properties.type][component_last_collection_properties.index].length-1] = this.htmlObject.before +
                this.collections[component_last_collection_properties.type][component_last_collection_properties.index]
                    [this.collections[component_last_collection_properties.type][component_last_collection_properties.index].length-1];

            }

        }
        this.htmlObject.before = "";
    }
}

/**
 * @todo must be completed
 * Creates a label for the last created form component.
 * @param component_last_collection_properties an object containing the info about the last created
 *          component
 * @param labelValue the title of the label
 * @param args an object accepting key-value pairs for attributes.
 * @private
 */
mtFormInit.prototype.label_generate = function(component_last_collection_properties, args, labelValue)
{
    var label = this.template_fetch("label");


    var attrs = this.attributes_concat(args, "local");
    label = this.template_process(label, [":attrs", ":innerValue"], [attrs, labelValue]);
    this.collections[component_last_collection_properties.type][component_last_collection_properties.index]
        =
        label+this.collections[component_last_collection_properties.type][component_last_collection_properties.index];
}


mtFormInit.prototype.create_custom = function(component_type, value, args){
    var arguments = "";
    // we make sure if no param is passed, to re-declare it
    // as a object so to avoid future undefined errors
    if(this.is_empty(args))
        args = "";
    else if (typeof args === 'object')
        args = this.attributes_concat(args);


    var inp;

    var component_type = component_type.trim().toLowerCase();

    inp = this.addCustom(value , args);


    // we check the last component's index in the collection. We just want to have a
    // sequence of pointers in order to parse one real string objects during the whole process. As our components
    // are grouped respective to their type,  the user expects the generation of the components
    // to be in order of their call. Thus, we have to keep the order in which they are called.
    var component_last_collection_properties = { type : component_type , index : this.collectionSequentialLastIndex(component_type) };
    this.addCollectionSequential( component_last_collection_properties.type, component_last_collection_properties.index );


    // we keep track of the last generated component's type and index.
    this.lastQueried = component_type;
    this.componentLastInfo = component_last_collection_properties;
    return this;
}
/**
 * @todo documentation of this method is wrong and incomplete. Must be re-written
 * Create a form element from a set of pre-defined elements (covering all form elements)
 * @param element string name of the form element: "input" "textarea" etc.
 * @param args object key represent the name attribute and value is its value
 * @returns {mtFormInit} string HTML Markup
 */
mtFormInit.prototype.create = function(component_type, args, secondaryArgs){
    var arguments = "";


    /**
     * @event onComponentBeforeCreate
     * @type {*}
     */
    var eventObject = $mtf.Event.dispatchEvent("onComponentBeforeCreate", new EventObject({
        target : {
            "component_type" : component_type,
            "args" : args,
            "secondaryArgs" : secondaryArgs
        } ,
        type : 'onComponentBeforeCreate'}));
    var eventPrevention = this.Event.checkPreventionState(eventObject);
    if(eventPrevention != false && eventPrevention != -1)
        return eventPrevention;


    if(typeof eventObject == 'object')
    {
        component_type = eventObject.target.component_type;
        args = eventObject.target.args;
        secondaryArgs = eventObject.target.secondaryArgs;
    }
    // END OF EVENT DISPATCHING

    // we make sure if no param is passed, to re-declare it
    // as a object so to avoid future undefined errors
    if(this.is_empty(args))
        args = "";
    else if (typeof args === 'object')
    {
        // merge default attributes value
        if( this.defaults.hasOwnProperty(component_type) )
        {
            var default_attrs = Object.keys( this.defaults[component_type] );

            if( default_attrs.length != 0 )
            {
                for(var i = 0; i < default_attrs.length; i++ )
                {
                    if(args[default_attrs[i]])
                        args[default_attrs[i]] +=  " " + this.defaults[component_type][default_attrs[i]];
                    else
                        args[default_attrs[i]] =  this.defaults[component_type][default_attrs[i]];
                }

            }
        }

        arguments = this.attributes_concat(args);
    }

    else if (typeof args === 'string')
        secondaryArgs = args;
    args = {};

    var inp;

    var component_type = component_type.trim().toLowerCase();

    if(component_type == 'input')
        inp = this.addInput(arguments);
    else if (component_type == 'text')
        inp = this.addInput(arguments);
    else if (component_type == 'hidden')
        inp = this.addHidden(arguments);
    else if (component_type == 'password')
        inp = this.addPassword(arguments);
    else if (component_type == 'textarea')
        inp = this.addTextarea(arguments, secondaryArgs);
    else if (component_type == 'submit')
        inp = this.addSubmit(arguments);
    else if (component_type == 'button')
        inp = this.addButton(arguments);
    else if (component_type == 'radio')
        inp = this.addRadios(arguments, secondaryArgs); // note that we have passed unparsed args
    else if (component_type == 'checkbox')
        inp = this.addCheckboxes(arguments, secondaryArgs); // note that we have passed unparsed args
    else if (component_type == 'select')
        inp = this.addSelect(arguments, secondaryArgs); // note that we have passed unparsed args
    else if (component_type == 'file')
        inp = this.addFile(arguments);
    else if (component_type == 'message')
        inp = this.addMessage(arguments, secondaryArgs);
    else if (component_type == 'form')
        inp = this.addForm(arguments  , secondaryArgs);
    else if (component_type == 'custom')
        inp = this.addCustom(arguments  , secondaryArgs);


    // we check the last component's index in the collection. We just want to have a
    // sequence of pointers in order to parse one real string objects during the whole process. As our components
    // are grouped respective to their type,  the user expects the generation of the components
    // to be in order of their call. Thus, we have to keep the order in which they are called.
    var component_last_collection_properties = { type : component_type , index : this.collectionSequentialLastIndex(component_type) };
    this.addCollectionSequential( component_last_collection_properties.type, component_last_collection_properties.index );


    // we keep track of the last generated component's type and index.
    this.lastQueried = component_type;
    this.componentLastInfo = component_last_collection_properties;

    /**
     * Dispatching Event Listeners
     * @type {EventObject}
     */
    $mtf.Event.dispatchEvent("onComponentAfterCreate", new EventObject({ target : {
        "component_type" : component_type,
        "args" : args,
        "secondaryArgs" : secondaryArgs,
        "component_last_info" : component_last_collection_properties,
        "template" : inp,
    }, type : 'onComponentAfterCreate'}));
    // END OF EVENT DISPATCHING
}

mtFormInit.prototype.addInput = function(attrs){
    var input = this.template_fetch("input");
    var prs = this.template_process(input, [":attrs"], [attrs]);
    this.__setLastComponentType("input");
    this.__addComponentInstance(prs, "input");
    return prs;
};

mtFormInit.prototype.addHidden = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Hidden input already has a 'type' attribute. Cannot be changed.");
    var input = this.template_fetch("hidden");
    var prs = this.template_process(input, [":attrs"], [attrs]);
    this.__setLastComponentType("hidden");
    this.__addComponentInstance(prs, "hidden");

    return prs;
};

mtFormInit.prototype.addPassword = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Password input already has a 'type' attribute. Cannot be changed.");
    var input = this.template_fetch("password");
    var prs = this.template_process(input, [":attrs"], [attrs]);
    this.__setLastComponentType("password");
    this.__addComponentInstance(prs, "password");
    return prs;
};

mtFormInit.prototype.addFile = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("File input already has a 'type' attribute. Cannot be changed.");
    var input = this.template_fetch("file");
    var prs = this.template_process(input, [":attrs"], [attrs]);
    this.__setLastComponentType("file");
    this.__addComponentInstance(prs, "file");
    return prs;
};

mtFormInit.prototype.addTextarea = function(attrs, innerValue){
    innerValue = (typeof innerValue === 'undefined' || typeof innerValue === null)
        ? "" : innerValue;
    var textarea = this.template_fetch("textarea");
    var prs = this.template_process(textarea, [":attrs", ":innerValue"], [attrs, innerValue]);
    this.__setLastComponentType("textarea");
    this.__addComponentInstance(prs, "textarea");
    return prs;
};

mtFormInit.prototype.addSubmit = function(attrs){
    var value = "";
    value = (typeof attrs === 'string' && (typeof attrs.value === "undefined" || typeof attrs.value === "null") )
        ? "value='"+attrs+"'" : attrs;
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Submit input already has a 'type' attribute. Cannot be changed.");
    var submit = this.template_fetch("submit");
    var prs = this.template_process(submit, [":attrs"], [attrs]);
    this.__setLastComponentType("submit");
    this.__addComponentInstance(prs, "submit");
    return prs;
};

mtFormInit.prototype.addButton = function(attrs, innerValue){
    var value = "";
    value = (typeof innerValue === "undefined" || typeof innerValue === "null")
        ? "" : innerValue;
    var button = this.template_fetch("button");
    var prs = this.template_process(button, [":attrs", ":innerValue"], [attrs, innerValue]);
    this.__setLastComponentType("button");
    this.__addComponentInstance(prs, "button");
    return prs;
};

/**
 * This function uses a very special object scheme to generate Radios.
 * @param attrs
 * @param radiosArgs
 * @returns {Array}
 */
mtFormInit.prototype.addRadios = function(attrs, radiosArgs){


    var value = "";
    value = (typeof radiosArgs == 'string' || typeof radiosArgs.value === "undefined" || typeof radiosArgs.value === "null")
        ? "value='"+radiosArgs+"'" : "value='"+radiosArgs.value+"'";

    var radios = [];
    var radiosTplMain = this.template_fetch("radio");

    // a distinct iterator for templates (in case it be array). It is the same as i, but might have a different
    // value if the user passer lower number of templates than number of radios.
    var templatePossibleIterator = 0;
    var radiosTpl = "";

    // we check if the user has passed any value as the default value, if NO,
    // then we set the first item as checked.
    if(radiosArgs.default === "" || typeof radiosArgs.default === 'undefined'
        || radiosArgs.default === null) radiosArgs.default = radiosArgs.values[0];

    // Our loop criterion is .values property. Because for radio buttons, value
    // is the most necessarily unique attribute.
    var label_attrs = this.attributes_concat(radiosArgs.labels_attrs);
    for(var i = 0; i < radiosArgs.values.length; i++)
    {
        // we check if the current component should be checked or not, if yes,
        // then we set the corresponding value.
        var is_checked = "";
        var id_values = "";
        if(radiosArgs.values[i] == radiosArgs.default)  is_checked = " CHECKED ";

        if(this.is_function(radiosArgs.ids))
        {
            id_values = " id='"+radiosArgs.ids(radiosArgs.values[i])+"' ";
        }
        else if(this.is_object(radiosArgs.ids))
        {
            if(i <= radiosArgs.ids.length)
                    id_values = " id='"+radiosArgs.ids[i]+"' ";
        }

        var radio_value = "value='"+radiosArgs.values[i]+"' "+is_checked;
        radio_value += id_values;


        var label = null;
        if (radiosArgs.labels && radiosArgs.labels[i] )
        {
            label = radiosArgs.labels[i];
        }
        // we check to see if the user has passed an array of templates for each radio, since
        // we like to support template for each individual component generated within the form
        if(typeof radiosTplMain === 'object')
        {
            radiosTpl  = radiosTplMain[templatePossibleIterator];
            // here we check to see if the current iteration for templates (in case it is array)
            // is smaller than i and equals the length of the templates array, if true, then we
            // set it back to zero for the iteration to work. Doing this, we guarantee the coverage
            // of the templates for all the components. e.g. the user can pass an array of two-templates
            // for 6 radios, which allows him/her to have an alternate template pattern for that set of
            // radios.
            templatePossibleIterator++;
            if( templatePossibleIterator === radiosTplMain.length ) templatePossibleIterator = 0;
        }
        else
        {
            radiosTpl = radiosTplMain;
        }

        // we then parse them individually
        radios.push(this.template_process(radiosTpl, [":attrs", ":values", ":title", ":label::attrs"], [attrs, radio_value, label, label_attrs]));
    }

    this.__setLastComponentType("radio");
    this.__addComponentInstance(radios, "radio");
    return radios;
};

mtFormInit.prototype.addCheckboxes = function(attrs, checkboxesArgs){


    var value = "";
    value = (typeof checkboxesArgs == 'string' || typeof checkboxesArgs.value === "undefined" || typeof checkboxesArgs.value === "null")
        ? "value='"+checkboxesArgs+"'" : "value='"+checkboxesArgs.value+"'";

    var checkboxes = [];
    var checkboxesTplMain = this.template_fetch("checkbox");

    // a distinct iterator for templates (in case it be array). It is the same as i, but might have a different
    // value if the user passer lower number of templates than number of checkboxes.
    var templatePossibleIterator = 0;
    var checkboxesTpl = "";

    // we check if the user has passed any value as the default value, if NO,
    // then we set the first item as checked.
    if(checkboxesArgs.default === "" || typeof checkboxesArgs.default === 'undefined'
        || checkboxesArgs.default === null) checkboxesArgs.default = checkboxesArgs.values[0];

    // Our loop criterion is .values property. Because for checkbox buttons, value
    // is the most necessarily unique attribute.
    var label_attrs = this.attributes_concat(checkboxesArgs.labels_attrs);
    for(var i = 0; i < checkboxesArgs.values.length; i++)
    {
        // we check if the current component should be checked or not, if yes,
        // then we set the corresponding value.
        var is_checked = "";
        var id_values = "";
        if(checkboxesArgs.values[i] == checkboxesArgs.default)  is_checked = " CHECKED ";

        if(this.is_function(checkboxesArgs.ids))
        {
            id_values = " id='"+checkboxesArgs.ids(checkboxesArgs.values[i])+"' ";
        }
        else if(this.is_object(checkboxesArgs.ids))
        {
            if(i <= checkboxesArgs.ids.length)
                id_values = " id='"+checkboxesArgs.ids[i]+"' ";
        }

        var checkbox_value = "value='"+checkboxesArgs.values[i]+"' "+is_checked;
        checkbox_value += id_values;


        var label = null;
        if (checkboxesArgs.labels && checkboxesArgs.labels[i] )
        {
            label = checkboxesArgs.labels[i];
        }
        // we check to see if the user has passed an array of templates for each checkbox, since
        // we like to support template for each individual component generated within the form
        if(typeof checkboxesTplMain === 'object')
        {
            checkboxesTpl  = checkboxesTplMain[templatePossibleIterator];
            // here we check to see if the current iteration for templates (in case it is array)
            // is smaller than i and equals the length of the templates array, if true, then we
            // set it back to zero for the iteration to work. Doing this, we guarantee the coverage
            // of the templates for all the components. e.g. the user can pass an array of two-templates
            // for 6 checkboxes, which allows him/her to have an alternate template pattern for that set of
            // checkboxes.
            templatePossibleIterator++;
            if( templatePossibleIterator === checkboxesTplMain.length ) templatePossibleIterator = 0;
        }
        else
        {
            checkboxesTpl = checkboxesTplMain;
        }

        // we then parse them individually
        checkboxes.push(this.template_process(checkboxesTpl, [":attrs", ":values", ":title", ":label::attrs"], [attrs, checkbox_value, label, label_attrs]));
    }

    this.__setLastComponentType("checkbox");
    this.__addComponentInstance(checkboxes, "checkbox");
    return checkboxes;
};

/**
 * Creates a <select> html component.
 * @param attrs
 * @param options
 * It supports the following keys:
 *      ..All supported HTML Attributes...
 *      options_attrs Array an array objects holding option attributes. These attributes
 *      have are mapped to each <option> corresponding to their index.
 *      repeat boolean forces to use the first [object] element of the option_attrs
 *                     for all the <option>s regardless of the Array.length.
 *      @todo must add some index-associated keys for options_attr, so that the use can use
 *      LAST_ITEM : [something] which tells the parses to use this object as the option of the last
 *      option (FIRST_ITEM etc. and such keys)
 * @returns {*}
 */
mtFormInit.prototype.addSelect = function(attrs, options){
    var value = "";
    value = (typeof options == 'string' || typeof options.value === "undefined" || typeof options.value === "null")
        ? "value='"+options+"'" : "value='"+options.value+"'";

    var option = [];
    var selectTplMain = this.template_fetch("select");

    // a distinct iterator for templates (in case it be array). It is the same as i, but might have a different
    // value if the user passer lower number of templates than number of select.
    var templatePossibleIterator = 0;
    var optionTpl = "";
    var option_template = this.template_fetch("option");
    if( !options.hasOwnProperty("options_attrs") )
    {
        options['options_attrs'] = [];
    }
    for(var i = 0; i < options.values.length; i++)
    {
        var unique_values = "";
        var id_values = "";
        var value_raw = options.values[i];
        var innerValue = "";
        unique_values = " value='"+options.values[i]+"' ";

        if(this.is_function(options.ids))
        {
            id_values = " id='"+options.ids(value_raw)+"' ";
        }
        else if(this.is_object(options.ids))
        {
            if(i <= options.ids.length)
                    d_values = " id='"+options.ids[i]+"' ";
        }

        if(this.is_function(options.labels))
        {
            innerValue = options.labels(value_raw);
        }
        else if(this.is_object(options.labels))
        {
            if(i <= options.labels.length)
                innerValue = options.labels[i];
        }

        unique_values += id_values; // appending the ids value to the unique value


        // we check to see if the user has passed an array  of templates for each option, since
        // we like to support template for each individual component generated within the form
        if(typeof option_template === 'object')
        {
            optionTpl  = option_template[templatePossibleIterator];
            // here we check to see if the current iteration for templates (in case it is array)
            // is smaller than i and equals the length of the templates array, if true, then we
            // set it back to zero for the iteration to work. Doing this, we guarantee the coverage
            // of the templates for all the components. e.g. the user can pass an array of two-templates
            // for 6 select, which allows it to have an alternate template pattern for that set of
            // select.
            templatePossibleIterator++;
            if( templatePossibleIterator === option_template.length ) templatePossibleIterator = 0;
        }
        else
        {
            optionTpl = option_template;
        }
        var current_option_attr;
        if( options.hasOwnProperty('repeat') && options.repeat === true) current_option_attr = options.options_attrs[0];
        else current_option_attr = options.options_attrs[i];;
        // we then parse them individually
        option.push(this.template_process(optionTpl, [":attrs", ":uniqueValue", ":innerValue"],
            [this.attributes_concat(current_option_attr), unique_values, innerValue]));
    }

    option = option.join("");
    selectTplMain = this.template_process(selectTplMain, [":options", ":attrs"], [option, attrs])
    this.__setLastComponentType("select");
    this.__addComponentInstance(selectTplMain, "select");
    return selectTplMain;
};

mtFormInit.prototype.addForm = function(attrs){
    var form_tpl = this.template_fetch("form");
    attrs = this.attributes_concat(attrs);
    form_tpl = this.template_process(form_tpl, [":attrs"], [attrs]);
    this.forms.push(form_tpl);
};

mtFormInit.prototype.addMessage = function(attrs, msg_string){

    msg_string = (typeof msg_string === "undefined" || typeof msg_string === "null")
        ? "" : msg_string;
    var message = this.template_fetch("message");
    var prs = this.template_process(message, [":attrs", ":message"], [attrs, msg_string]);
    this.__setLastComponentType("message");
    this.__addComponentInstance(prs, "message");
    return prs;
};

mtFormInit.prototype.addCustom = function(value, attrs){
    var prs = value;

    if(attrs)
    {
         prs = this.template_process(value, [":attrs"], [attrs]);
    }

    this.__setLastComponentType("custom");
    this.__addComponentInstance(prs, "custom");
    return prs;
};
