/**
 * @type Plugin
 * @name: Valid
 * @description: A plugin for form-validation rules and messages. It allows
 * exporting and importing of the settings through $mtf global exporter and
 * importer.
 * @author Mostafa Talebi
 * @requires No Packages
 *
 */


/**
 * Providing a pointer to the main MTF_Valid Object
 */
$mtf.$lives.Valid = new MTF_Valid();

/**
 * @method VAdd
 * @description Registers a rule for the @__lastComponent and its events in case any passed
 * @param rule_name {string} the name of defined rule
 * @param rule_value {callback} the value of rule in case it needs any
 * @param events {object.array} [optional] an array of events names
 */
$mtf.extends("Rule", function(rule_name, rule_value, use_template, messages_object, events, insertion_type){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.ruleAdd(rule_name, rule_value, use_template, messages_object, events, insertion_type);

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
$mtf.extends("Eventize", function(form_selector){
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
$mtf.extends("Bind", function(){
    if( typeof $mtf.$lives.Valid !== "object" )
    {
        $mtf.$lives.Valid = new MTF_Valid();
    }

    $mtf.$lives.Valid.Bind();

    return $mtf;
});


/**
 * Export Cooperator
 */
$mtf.defineExport("ValidExport", function(){
    var data = {};
    data.rules = $mtf.$lives.Valid.rules;
    data.message_to_components = $mtf.$lives.Valid.message_to_components;
    data.message_injection_container = $mtf.$lives.Valid.message_injection_container;
    data.events = $mtf.$lives.Valid.events;
    data.events_optional = $mtf.$lives.Valid.events_optional;
    return data;
});


/**
 * Import Cooperator
 */
$mtf.defineImport("ValidImport", function(importData){
    var data = {};
    $mtf.$lives.Valid.rules = importData.rules;
    $mtf.$lives.Valid.message_to_components = importData.message_to_components =
    $mtf.$lives.Valid.message_injection_container = importData.message_injection_container;
    $mtf.$lives.Valid.events = importData.events;
    $mtf.$lives.Valid.events_optional = importData.events_optional;
});


