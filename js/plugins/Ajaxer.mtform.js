/** Sample Plugin **/
$Mtf.extends("Ajaxer", function(url_name, id_val){
    if(typeof jQuery !== null || typeof jQuery !== undefined )
    {
        jQuery.ajax({
            url : url_name,
            type : "POST",
            data : { id : id_val },
            success  :function(){
                console.log(" I am an aJAX request.");
            }

        });
    }
});
/** end of Sample Plugin **/