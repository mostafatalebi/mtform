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
        events_optional_attr : 'data-validev',

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
        }
    };
}
