var MTF_Valid = function(){

    // The rules which are defined and can be assigned to various components.
    // @extra MTF_VALID_RULES is a globally used variable for defined rules
    // Note: it is not a globally defined variable (window.var), it is just
    // used in a similar way.
    this.rules_collection = MTF_VALID_RULES;

    // this option holds any event passed in the time of VAdd function call.
    this.events_to_rules_collection = {};

    /**
     * Stores data for each rule-per-component
     * @type {{}}
     */
    this.rules_data = {};


    this.rules_to_components = {};


    this.templates = MT_VALID_TEMPLATES;

    /**
     * All components which are bound to a message-containers
     * entry scheme is: type-index, for instance : input-5
     * @type {Array}
     */
    this.message_to_components = [];

    /**
     * There are two types of message insertion. One is using injection-type (which is default),
     * the other is insertion-type. Insertion type is a regular message container insertion and it
     * uses regular $mtf component creation routine. But, injection type indeed edits $mtf collection
     * and adds the message container right after form component. So, no matter how deep a form-component
     * is nested in its template (for instance: <div><div><a><input type='text' /></a></div></div> ) it
     * finds the proper input and injects the message container right after it. It allows a more dynamic
     * handling of the message container.
     * Note: This is possible when MTF standard is practiced; which is to avoid placing two form components in the
     * same template definition, otherwise, unexpected results are highly probable.
     * This array collection only holds the track of message containers of injection type. Because if containers
     * are injected inside another already inserted component, then it could not be traced by default collections
     * of $mtf, hence we have to devise our own tracking method
     * @type {Array}
     */
    this.message_injection_container = [];


    /**
     * the last message container id. No matter if it is of injection-type or insertion-type
     * @type {string}
     */
    this.last_message_id = "";


    /**
     * A very important array container. Each elements of it is an object containing :
     * (int) index, (string) type, (object) rules. rules is an object containing key=value pairs of
     * rules. An example container is:
     * rules = {
     *      index : 1,
     *      type : 'input',
     *      rules : {
     *          required : true,
     *          number : true,
     *          max : 10,
     *      }
     *      events : []
     * }
     * @type {{}}
     */
    this.rules = {};

    /**
     * It keeps any values which must be kept for rule.
     * The key is a random id, and the value is the value
     * of a currently bound-rule. The random key is set
     * as the value of rule in the attribute of the
     * element. e.g: rule_name={random_value}&another_rule={another_random_val}&etc..
     * @type {Object}
     */
    this.rules_values = {};

    /**
     * Stores all placeholders for a rule which have been passed to the add-rule function
     * @type {{}}
     */
    this.template_placeholder_values = {};

    /**
     * An array which holds sets of object containing the name of the event and the
     * index&type of the element to which they must be bound.
     * @type {Array}
     */
    this.events = [];


    // rules which are no longer used. Since they are already assigned to
    // their respective components.
    this.rules_obsolete = [];


    /**
     * An object containing references to the custom elements which have been
     * used as a message element. These elements are created by the developer
     * outside of $mtf, hence something must trace them.
     * @type {Array}
     */
    this.templates_custom = [];

}

