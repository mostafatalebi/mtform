var MT_Ajax = function(form_selector, config, elements_trigger){

    /**
     * By default all components are scanned. If there is a component whose value should be
     * ignored, it's name must be included here.
     * @type {Array}
     */
    this.excludedByName = [];

    /**
     * An object containing the configurations of the AJAXCall library. If jQuery is included and
     * it is set to be used, this object would be passed on to the jQuery, which means lexically it
     * is a replication of jQuery configuration
     * @type {Object}
     */
    this.config = config;

    // a version of configurations which is processed by SendAjax and its associated functions
    this.configProcessed = config;

    /**
     * A CSS selector to help us select the proper form which is used as AJAX container of
     * components
     */
    this.form = form_selector;


    /**
     * This array is pushed with an item every time When() gets called. It helps us
     * keep trace of events and also utilize this list for export&import functionalities
     * @type {Array}
     */
    this.events = [];


    /**
     * This is merely used for export&import functionalities and is not operationally used as of v0.0.1
     * @type {String}
     */
    this.triggers_selector = elements_trigger;
};

// accepts both name or array
MT_Ajax.prototype.Exclude = function(names_array){
    if( typeof names_array === 'object' )
        this.excludedByName = this.excludedByName.concat(names_array);
    else
        this.excludedByName.push(names_array);
}


MT_Ajax.prototype.When = function( event, element, config ){
    var sendAjax = this.SendAjax;
    var form_element = this.form;
    element.addEventListener(event, function(e){
        e.preventDefault();
        sendAjax(form_element, config);
    });
    return this;
}

MT_Ajax.prototype.SendAjax = function(form, config){

    var formElement = new MTF_FormElement(form);
   // var form_data =  new FormData( document.getElementById("main_form") );
    var form_data =  formElement.getComponentsByAttribute( "value", this.excludedByName );
    var ajax;
    if( typeof config.data === 'object' )
    {
        if ( window.FormData && config.formData )
        {
            config.data = $mtf.objectJoinWithFormData( config.data, form_data );
        }
        else
        {
            config.data = $mtf.joinObjects( config.data, form_data );
        }

    }
    else
    {
        // needed since we have to reset AJAX after it is sent.
        config['old_data'] = (config['data']) ? config['data'] : {};
        config['data'] = form_data;
    }



    // we let Wonderful jQuery handles the AJAX request if the user has already included it, otherwise
    // we let our own AJAX engine to send the request
    if( typeof jQuery === 'object' || typeof jQuery === 'function' && config.forceDomesticLibrary === true )
    {
        jQuery.ajax(config);
    }
    else
    {
        ajax = new AjaxCall(config);
        ajax.send();
    }

    config['data'] = config['old_data'];

    // saving a copy of the processed configurations.
    this.configProcessed = config;
    return this;
}
