/**
 * This plugin receives all the values of the form's components. It allows exclusion of certain components (by name).
 * It returns both an object or an JSON-string of the values with the form's name as their keys.
 */

/**
 * the id of the form whose components are to be scanned
 * @param form_id the id of the form or the form element itself
 * @constructor
 */
var MTF_FormElement = function(form_selector) {
    this.form = document.querySelector(form_selector);
}


MTF_FormElement.prototype.getComponents = function() {
    return this.form.elements;
}

MTF_FormElement.prototype.detectType = function(element) {
    if( element.tagName.toLowerCase() == "checkbox" || element.tagName.toLowerCase() )
    {

    }
    else
    {
        return element;
    }
};


MTF_FormElement.prototype.getComponentsByAttribute = function( attr_name, element_exclusion_by_name, callback ){
    var form_data;
    if( typeof window.FormData !== 'undefined' )
    {
        form_data = new FormData( this.form );

    }
    else
    {
        var form_elms = this.getComponents();
        form_data = {};
        var obj_keys = [];
        obj_keys = Object.keys(form_elms);
        if(!attr_name) attr_name = "value";

        if(element_exclusion_by_name)
        {
            for( var i = 0; i < obj_keys.length; i++ )
            {
                    var element_name = form_elms[obj_keys[i]].name;
                    if( element_exclusion_by_name.indexOf(element_name) )
                    {
                        if(callback)
                        {
                            form_data[element_name] = callback(form_elms[obj_keys[i]]);
                        }
                        else
                        {
                            if( attr_name == "value" )
                            {
                                form_data[element_name] = form_elms[obj_keys[i]].value;
                            }
                            else
                            {
                                form_data[element_name] = form_elms[obj_keys[i]].getAttribute(attr_name);
                            }
                        }
                    }
            }
        }
        else
        {
            for( var i = 0; i < form_elms.length; i++ )
            {
                var element_name = form_elms[i].getAttribute("name");

                if(callback)
                {
                    form_data[element_name] = callback(form_elms[i]);
                }
                else
                {
                    if( attr_name == "value" )
                    {
                        form_data[element_name] = form_elms[i].value;
                    }
                    else
                    {
                        form_data[element_name] = form_elms[i].getAttribute(attr_name);
                    }

                }
            }
        }
    }

    form_data;
    return form_data;
}


MTF_FormElement.prototype.getComponentsValueInJSON = function(element_exclusion_by_name){
    var form_elements = this.getComponentsByAttribute("value", element_exclusion_by_name);
    return  JSON.stringify(form_elements);
}

MTF_FormElement.prototype.jsonToFormElement = function(json_stirng){
    var form_elements = this.getComponentsByAttribute("value", element_exclusion_by_name);
    return  JSON.stringify(form_elements);
}
