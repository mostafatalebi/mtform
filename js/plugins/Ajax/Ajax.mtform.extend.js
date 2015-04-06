/**
 * @plugin Ajax
 * @description Allows sending AJAX request.
 * @author Mostafa Talebi
 * @version 0.0.1
 *
 * @requires { "FormElement" }
 */





/**
 * Sets an AJAX request to be sent when the given element's specified attached events are
 * triggered. The XMLHttpRequest is supplied with a configuration object. If jQuery is
 * defined in the page, then jQuery is used. if in the config noJquery is set to true, then
 * the script ignores jQquery and uses its own engine
 * @param config {object} configuration object for AJAX
 * @param event_name {String} the name of the event on the occurrence of which ajax is sent
 * @param form_selector {String} a CSS selector which selects which form's data is going to be sent
 * @param elements_trigger_selector {String} a collective CSS selector, the result match of which
 *                                           is used as trigger to send the AJAX request. More than
 *                                           one element can be used. It is usually used with one
 *                                           submit button selector such as #submit or input[type='submit']
 * @return {Object} @__mtformObject
 */
$mtf.extends("Ajax", function(config, event_name, form_selector, element_trigger_selector){


    // this allows a set of elements to trigger AJAX request than one
    var triggers = document.querySelectorAll( element_trigger_selector );

    // create a new instance of our domestic AJAX Library
    var Ajax = new MT_Ajax( form_selector, config, element_trigger_selector );

    if( !$mtf.$lives.Ajax )
    {
        $mtf.$lives.Ajax = Ajax;
    }

    // check to see if the result of querySelector is healthy
    if(triggers.length)
    {
        for(var i = 0; i < triggers.length; i++ )
        {
            $mtf.$lives.Ajax.When( event_name, triggers[i], config );
        }
    }
    else
    {
        $mtf.$lives.Ajax.When( event_name, triggers, config );
    }

    // Ajax.SendAjax();

    return $mtf;
});

$mtf.extends("AjaxOnClick", function(config, form_selector, element_trigger_selector){

    // this allows a set of elements to trigger AJAX request than one
    var triggers = document.querySelectorAll( element_trigger_selector );

    // create a new instance of our domestic AJAX Library
    var Ajax = new MT_Ajax( form_selector, config, element_trigger_selector );

    if( !$mtf.$lives.Ajax )
    {
        $mtf.$lives.Ajax = Ajax;
    }

    // check to see if the result of querySelector is healthy
    if(triggers.length)
    {
        for(var i = 0; i < triggers.length; i++ )
        {
            $mtf.$lives.Ajax.When( "click", triggers[i], config );
        }
    }
    else
    {
        $mtf.$lives.Ajax.When( "click", triggers, config );
    }

    // Ajax.SendAjax();

    return $mtf;

});

/**
 * This function is a shorthand method to send AJAX POST request
 * It forces not to use FormData as it just accepts custom DATA and not form's
 */
$mtf.extends("Post", function(url, extraConfig){

    if( typeof url === 'string' && extraConfig )
    {
        extraConfig.url = url;
    }

    extraConfig.type = "POST";
    extraConfig.formData = false;

    var Ajax = new AjaxCall(extraConfig)

    Ajax.send();
})


$mtf.defineExport("Ajax", function(){
    var data = {};
    data.config = $mtf.$lives.Ajax.config;
    data.form_selector = $mtf.$lives.Ajax.form;
    data.triggers_selector = $mtf.$lives.Ajax.triggers_selector;
    data.configProcessed = $mtf.$lives.Ajax.configProcessed;

    return data;
});