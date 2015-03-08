/**
 * @method VAdd
 * @description Registers a rule for the @__lastComponent and its events in case any passed
 * @param rule_name {string} the name of defined rule
 * @param rule_value {callback} the value of rule in case it needs any
 * @param events {object.array} [optional] an array of events names
 */
$mtf.extends("VAdd", function(rule_name, rule_value, events){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.AddRule(rule_name, rule_value, events);

    return $mtf;
});


/**
 * @method VEventize
 * @description Adds events listeners to the components registered in the system
 *              with VAdd.
 * @param container_id {string}  the id of the component which is
 *              being searched for its children to
 *              to be applied the registered rules.
 */
$mtf.extends("VEventize", function(container_id){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Eventize(container_id);

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

