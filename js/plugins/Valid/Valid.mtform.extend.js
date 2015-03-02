$mtf.extends("VAdd", function(rule_name, rule_value, events){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.__assign_rule(rule_name, rule_value, events);

    return $mtf;
});

$mtf.extends("VWatch", function(element, event_type){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Eventize("main_form");

    return $mtf;
});

$mtf.extends("VBind", function(){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Bind();

    return $mtf;
});

$mtf.extends("VEventize", function(){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Eventize();

    return $mtf;
});