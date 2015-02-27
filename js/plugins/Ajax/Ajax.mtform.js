/** Sample Plugin **/
$mtf.extends("Ajax", function(config){
    if(typeof jQuery !== null || typeof jQuery !== undefined )
    {
        jQuery.ajax(config);
    }
    else
    {
        // use a built-in AJAX plugin
        var ajax = new AjaxCall("http://google.com", "POST");

    }
});
/** end of Sample Plugin **/