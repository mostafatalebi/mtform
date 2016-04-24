/**
 * This file contains configuration for MTForm Plugin "Valid"
 *
 */
if(typeof window.MTF_Valid_Config !== 'object')
{
    window.$MTF_Valid_Config = {


        // whether to add messages templates for rules or not
        allow_template : true,

        //### GENERAL ###//
        rules_attr_name : "data-valid", // a name for data-* attribute
        rules_each_separator : '&',
        message_attr_name : "data-msgparentid",
        input_message_attr_name : "data-msgcontainerid",
        attribute_component_info : 'data-validev',

        //### EVENT MANAGEMENT ###//
        // all values have to be in array
        ev_input_default : [],
        ev_textarea_default : [],
        ev_radio_default : [],
        ev_checkbox_default : [],
        ev_select_default : [],
        ev_input_default : [],
        ev_misc_default : [],

        type_events : {
            input : [],
            email : [],
            number : [],
            password : [],
            radio : [],
            checkbox : [],
            textarea : [],
            form : [],
            button : [],
            submit : [],
            hidden : [],
            select : []
        },

        hash_table : {
            "input" :    "140f8a1dafss",
            "password" : "4fe98asdfdsf",
            "file" :     "1f864eb5sdf",
            "hidden" :   "1a9b4254fsa1",
            "radio" :    "14a4fe98a74ea1",
            "checkbox" : "10e98a74eb54c1a1",
            "rule" :     "00ca050b2a",
            "submit" :   "18dey0uaAM9qd",
            "button" :   "3fa4054f214",
            "textarea" : "f0f80be6e30c",
            "select" :   "6e051f395b61"
        },

        tag_names : {
            input : "input",
            email : "input",
            number : "input",
            password : "input",
            radio : "input",
            checkbox : "input",
            textarea : "textarea",
            form : "form",
            button : "button",
            submit : "input",
            hidden : "hidden",
            select : "select"
        },

    };
}




/**
 * A value which indicates that something(function, variable etc.)
 * of its regular type within that scope.
 * @type {number}
 */
MTVL_CALLBACK_REGULAR = 101;

/**
 * A value which indicates that the something is expected
 * to be of asynchronous type or associated with it in
 * some way.
 * @type {string}
 */
MTVL_CALLBACK_ASYNC = 102;

/**
 * A value which tells callback_handler to skip
 * calling the success callback
 * @type {string}
 */
MTVL_SKIP_CALLBACK_SUCCESS = 201;

/**
 * A value which tells callback_handler to skip
 * calling the error callback
 * @type {string}
 */
MTVL_SKIP_CALLBACK_ERROR = 202;

/**
 * A value which tells callback_handler to call
 * cleaner function instead of success callback
 * @type {string}
 */
MTVL_CALL_CLEANER = 203;


/**
 * A value which tells callback_handler to skip
 * cleaner function in any condition
 * @type {string}
 */
MTVL_SKIP_CLEANER = 204;



/**
 * An object which is returned by rules.
 * @type {{type: number, skip_type: string, status: boolean, data: {}}}
 */
MTVL_RULE_RETURN = {
    /**
     * The type of function from which this object is returned
     */
    type : MTVL_CALLBACK_REGULAR,

    /**
     * skip_type specifies if the callback handler should skip any of the validation
     * formal steps.
     * @default executes callback handler
     * @todo reminds in the documentation that success_callback at least can be used as a
     * @todo cleaner() function which cleans if there is any messages related to error_callback()
     */
    skip_type : MTVL_CALLBACK_REGULAR,


    cleaner_type : MTVL_CALL_CLEANER,

    /**
     * Validation status for main() function of the rule. By default
     * it is assumed that the validation fails.
     */
    status : false,

    /**
     * Any optional data to be returned from rule's callbacks operations
     */
    data : {}
}


