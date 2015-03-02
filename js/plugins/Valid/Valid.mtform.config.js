/**
 * This file contains configuration for MTForm Plugin "Valid"
 *
 */
if(typeof window.MTF_Valid_Config !== 'object')
{
    window.$MTF_Valid_Config = {

        //### GENERAL ###//
        rules_attr_name : "data-valid", // a name for data-* attribute
        rules_each_separator : "&amp;",
        events_optional_attr : 'data-validev',

        //### EVENT MANAGEMENT ###//
        // all values have to be in array
        ev_input_default : ['blur'],
        ev_textarea_default : ['blur'],
        ev_radio_default : ['blur'],
        ev_checkbox_default : ['blur'],
        ev_select_default : ['blur'],
        ev_input_default : ['blur'],
        ev_misc_default : ['blur'],

        // matches a group of components by their names
        ev_by_name : {
            'sample-name' : [ 'blue', 'change']
        },

        // matches a group of components by their ids
        ev_by_id : {

        },

        // matches a group of components by their classNames
        ev_by_class : {

        },

        // matches a group of components by their data-attrs
        ev_by_data_attr : {

        },

        hash_table : {
            "input" : "140f8a1",
            "password" : "4fe98a",
            "file" : "1f864eb5",
            "hidden" : "1a9b4254fsa1",
            "radio" : "14a4fe98a74ea1",
            "checkbox" : "10e98a74eb54c1a1",
            "rule" : "00ca050b2a",
            "submit" : "57018896106",
            "button" : "3fa4054f214",
            "textarea" : "f0f80be6e30c",
            "select" : "6e051f395b61",
        }
    };
}
