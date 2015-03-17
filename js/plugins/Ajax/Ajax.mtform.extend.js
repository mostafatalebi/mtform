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

$mtf.extends("AjaxOnClick", function(config, form_id, element_trigger_selector){

    // this allows a set of elements to trigger AJAX request than one
    var triggers = document.querySelectorAll( element_trigger_selector );

    // create a new instance of our domestic AJAX Library
    var Ajax = new MT_Ajax( document.getElementById(form_id), config, element_trigger_selector );

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