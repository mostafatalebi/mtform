/**
 * @method VAdd
 * @description Registers a rule for the @__lastComponent and its events in case any passed
 * @param rule_name {string} the name of defined rule
 * @param rule_value {callback} the value of rule in case it needs any
 * @param events {object.array} [optional] an array of events names
 */
$mtf.extends("VAdd", function(rule_name, rule_value, events, use_template){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.AddRule(rule_name, rule_value, events, use_template);

    return $mtf;
}, true);


/**
 * @method VEventize
 * @description Adds events listeners to the components registered in the system
 *              with VAdd.
 * @param container_id {string}  the id of the component which is
 *              being searched for its children to
 *              to be applied the registered rules.
 */
$mtf.extends("VEventize", function(form_selector){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Eventize(form_selector);

    return $mtf;
});

/**
 * @method VBind
 * @description Binds rules to the components and make them printable. It injects
 *                    special attributes to the <tag />
 */
$mtf.extends("VBind", function(){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Bind();

    return $mtf;
});



$mtf.defineExport("ValidExport", function(){
    var data = {};
    data.rules = $mtf.$lives.Valid.rules;

    return data;
});


$mtf.defineImport("ValidImport", function(rule_name, rule_value, events, use_template){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.AddRule(rule_name, rule_value, events, use_template);

    return $mtf;
});
