var MT_Ajax = function(form_element, config){

    // list of excluded components' names from being sent via AJAX
    this.excludedByName = [];
    this.config = config;
    this.form = form_element;
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
    if( typeof config.data === 'object')
        config.data =$mtf.joinArraysUnique( config.data, form_data );
    else
        config['data'] = form_data;


    // we let Wonderful jQuery handles the AJAX request if the user has already included it, otherwise
    // we let our own AJAX engine to send the request
    if( typeof jQuery === 'object' || typeof jQuery === 'function')
    {
        jQuery.ajax(config);
    }
    else
    {
        ajax = new AjaxCall(config);
        ajax.send();
    }

    return this;
}
