/**
 * Created by safa on 30/11/2014.
 */

// =======================
// PRIVATE FUNCTIONS
// =======================
mtFormInit.prototype.__injectHtml = function()
{
    // let's see what it will do, currently no decision on it
}

mtFormInit.prototype.__addHtmls = function(component_last_collection_properties, insertion_type, array_skip)
{
    if(insertion_type == 'after')
    {
        if(typeof this.collections[component_last_collection_properties.type][component_last_collection_properties.index] !== "object")
        {
            this.collections[component_last_collection_properties.type][component_last_collection_properties.index] =
                this.collections[component_last_collection_properties.type][component_last_collection_properties.index] + this.htmlObject.after;
        }
        else // if it is object
        {
            if(array_skip == false)
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
            if(array_skip == false)
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
 * Creates a label for the last created form component.
 * @param component_last_collection_properties an object containing the info about the last created
 *          component
 * @param labelValue the title of the label
 * @param args an object accepting key-value pairs for attributes.
 * @private
 */
mtFormInit.prototype.__label = function(component_last_collection_properties, labelValue, args)
{
    var label = this.createElement("label", labelValue, args);
    this.collections[component_last_collection_properties.type][component_last_collection_properties.index]
        =
        label+this.collections[component_last_collection_properties.type][component_last_collection_properties.index];
}

// =======================
// PROTECTED FUNCTIONS
// =======================


mtFormInit.prototype.createElement = function(name, args, content)
{
    args = (typeof args !== 'object') ? {} : args;
    if(name == 'label')
    {
        var attrs = this.argsToAttrs(args, "local");
        return "<label "  + attrs + ">" + content + "</label>";
    }

}


/**
 * Create a form element from a set of pre-defined elements (covering all form elements)
 * @param element string name of the form element: "input" "textarea" etc.
 * @param args object key represent the name attribute and value is its value
 * @returns {mtFormInit} string HTML Markup
 */
mtFormInit.prototype.create = function(component_type, args, secondaryArgs){
    var arguments = "";
    // we make sure if no param is passed, to re-declare it
    // as a object so to avoid future undefined errors
    if(this.is_empty(args))
        args = "";
    else if (typeof args === 'object')
        arguments = this.argsToAttrs(args);
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
    else if (component_type == 'select')
        inp = this.addSelect(arguments, secondaryArgs); // note that we have passed unparsed args
    else if (component_type == 'file')
        inp = this.addFile(arguments);
    else if (component_type == 'form')
        inp = this.addForm(arguments  , secondaryArgs);


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

mtFormInit.prototype.addInput = function(attrs){
    var input = this.getTpl("input");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("input");
    this.__addComponentInstance(prs, "input");
    return prs;
};

mtFormInit.prototype.addHidden = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Hidden input already has a 'type' attribute. Cannot be changed.");
    var input = this.getTpl("hidden");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("hidden");
    this.__addComponentInstance(prs, "hidden");

    return prs;
};

mtFormInit.prototype.addPassword = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("Password input already has a 'type' attribute. Cannot be changed.");
    var input = this.getTpl("password");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("password");
    this.__addComponentInstance(prs, "password");
    return prs;
};

mtFormInit.prototype.addFile = function(attrs){
    if(typeof attrs.type !== "undefined" && typeof attrs.type !== 'null' && attrs.type != "")
        console.warn("File input already has a 'type' attribute. Cannot be changed.");
    var input = this.getTpl("file");
    var prs = this.parser(input, [":attrs"], [attrs]);
    this.__setLastComponentType("file");
    this.__addComponentInstance(prs, "file");
    return prs;
};

mtFormInit.prototype.addTextarea = function(attrs, innerValue){
    innerValue = (typeof innerValue === 'undefined' || typeof innerValue === null)
        ? "" : innerValue;
    var textarea = this.getTpl("textarea");
    var prs = this.parser(textarea, [":attrs", ":innerValue"], [attrs, innerValue]);
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
    var submit = this.getTpl("submit");
    var prs = this.parser(submit, [":attrs"], [attrs]);
    this.__setLastComponentType("submit");
    this.__addComponentInstance(prs, "submit");
    return prs;
};

mtFormInit.prototype.addButton = function(attrs, innerValue){
    var value = "";
    value = (typeof innerValue === "undefined" || typeof innerValue === "null")
        ? "" : innerValue;
    var button = this.getTpl("button");
    var prs = this.parser(button, [":attrs", ":innerValue"], [attrs, innerValue]);
    this.__setLastComponentType("button");
    this.__addComponentInstance(prs, "button");
    return prs;
};

mtFormInit.prototype.addRadios = function(attrs, radiosArgs){


    var value = "";
    value = (typeof radiosArgs == 'string' || typeof radiosArgs.value === "undefined" || typeof radiosArgs.value === "null")
        ? "value='"+radiosArgs+"'" : "value='"+radiosArgs.value+"'";

    var radios = [];
    var radiosTplMain = this.getTpl("radio");

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
        radios.push(this.parser(radiosTpl, [":attrs", ":values"], [attrs, radio_value]));
    }

    this.__setLastComponentType("radio");
    this.__addComponentInstance(radios, "radio");
    return radios;
};

mtFormInit.prototype.addSelect = function(attrs, options){
    var value = "";
    value = (typeof options == 'string' || typeof options.value === "undefined" || typeof options.value === "null")
        ? "value='"+options+"'" : "value='"+options.value+"'";

    var option = [];
    var selectTplMain = this.getTpl("select");

    // a distinct iterator for templates (in case it be array). It is the same as i, but might have a different
    // value if the user passer lower number of templates than number of select.
    var templatePossibleIterator = 0;
    var optionTpl = "";
    var option_template = this.getTpl("option");
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
        if(options.optionAttrUseOneSet === true) current_option_attr = options.optionAttr[0];
        else current_option_attr = options.optionAttr[i];;
        // we then parse them individually
        option.push(this.parser(optionTpl, [":attrs", ":uniqueValue", ":innerValue"],
            [this.argsToAttrs(current_option_attr), unique_values, innerValue]));
    }

    option = option.join("");
    selectTplMain = this.parser(selectTplMain, [":options", ":attrs"], [option, attrs])
    this.__setLastComponentType("select");
    this.__addComponentInstance(selectTplMain, "select");
    return selectTplMain;
};

mtFormInit.prototype.addForm = function(attrs){
    var form_tpl = this.getTpl("form");
    attrs = this.argsToAttrs(attrs);
    form_tpl = this.parser(form_tpl, [":attrs"], [attrs]);
    this.forms.push(form_tpl);
};
