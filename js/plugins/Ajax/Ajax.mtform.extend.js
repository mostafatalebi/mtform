$mtf.extends("Ajax", function(config, event_name, form_id, element_trigger_selector){

    //var FormElement = new FormElement($mtf.getContainer())
    //var form_value = FormElement.getComponentsByAttribute("value");

    // this allows a set of elements to trigger AJAX request than one
    var triggers = document.querySelectorAll( element_trigger_selector );

    // create a new instance of our domestic AJAX Library
    var Ajax = new MT_Ajax( document.getElementById(form_id) );

    // check to see if the result of querySelector is healthy
    if(triggers.length)
    {
        for(var i = 0; i < triggers.length; i++ )
        {
            Ajax.When( event_name, triggers[i], config );
        }
    }
    else
    {
        Ajax.When( event_name, triggers, config );
    }

    // Ajax.SendAjax();

    return $mtf;

});

$mtf.extends("AjaxOnClick", function(config, form_id, element_trigger_selector){

    // this allows a set of elements to trigger AJAX request than one
    var triggers = document.querySelectorAll( element_trigger_selector );

    // create a new instance of our domestic AJAX Library
    var Ajax = new MT_Ajax( document.getElementById(form_id), config );

    // check to see if the result of querySelector is healthy
    if(triggers.length)
    {
        for(var i = 0; i < triggers.length; i++ )
        {
            Ajax.When( "click", triggers[i] );
        }
    }
    else
    {
        Ajax.When( "click", triggers );
    }

    Ajax.SendAjax();

});