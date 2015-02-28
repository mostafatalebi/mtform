$mtf.extends("VAdd", function(rule_name, rule_value){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.__assign_rule(rule_name, rule_value);


    return $mtf;
});