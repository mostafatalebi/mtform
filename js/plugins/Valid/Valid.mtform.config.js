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

        //### EVENT MANAGEMENT ###//
        ev_input_default : 'blur',
        ev_textarea_default : 'blur',
        ev_radio_default : 'blur',
        ev_checkbox_default : 'blur',
        ev_select_default : 'blur',
        ev_input_default : 'blur',
        ev_misc_default : 'blur',



    };
}
