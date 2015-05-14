MTF_VALID_RULES = {};


MTF_VALID_RULES = {

    /**
     * @rule email
     * @description checks to see if input is a correctly formatter email or not
     * @return {NULL}
     * @requires_value YES
     */
    "email" : {

        /**
         * The name of the event to be attached to the input, this can be overridden at the time of
         * adding rule to the input
         */
        events : ["blur"],


        /**
         * The main function which is executed to validate the input's value.
         * @param elm current {element} element whose value as been checked for validation
         * @param rule_value {mixed} the value of the rule, if any.
         * @param msg_container {element} the message container, if it is allowed
         * @param data_object  {Object} It is an object containing the following keys:
         *                     message_element {element} the message container element
         *                     message_string {string} the message string based on the current
         *                                             language
         *                     event {event} current event's object
         *                     extra_data {mixed} data that might be returned by main() function
         *                     are accessible via this parameter
         *                     would be checked.
         * @placeholders     :field
         * @returns {Boolean|Object} an object containing two value
         *                   status {boolean} indicating the status of the validation
         *                   data {mixed} an optional data to be returned
         *                   Note: It is possible to just return false if there is no
         *                   data to be returned
         */
        main : function(elm, rule_value, data){
            var result = { status : false, data : "" };
            result.status = /^[a-zA-Z0-9_.-]+@+[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9-]{2,20}(?:\.{1}[a-zA-Z0-9-]{2,20})?(?:\.{1}[a-zA-Z0-9-]{2,20})?$/.test($mtf.E(elm).Value());

            return result;

        },

        /**
         * Is executed when the return value of the main() function is not false.
         * @param elm current {element} element whose value as been checked for validation
         * @param rule_value {mixed} the value of the rule, if any.
         * @param msg_container {element} the message container, if it is allowed
         * @param data_object  {Object} It is an object containing the following keys:
         *                     message_element {element} the message container element
         *                     message_string {string} the message string based on the current
         *                                             language
         *                     event {event} current event's object
         *                     extra_data {mixed} data that might be returned by main() function
         *                     are accessible via this parameter
         *                     would be checked.
         * @returns {Boolean|Object} an object containing two value
         *                   status {boolean} indicating the status of the validation
         *                   data {mixed} an optional data to be returned
         *                   Note: It is possible to just return false if there is no
         *                   data to be returned
         */
        success : function(elm, rule_value, data){
            var msg_parsed = "";

            if(data.hasOwnProperty("placeholders"))
            {
                msg_parsed = $mtf.$lives.Valid.parseMessage(data.message_text, data.placeholders);
            }
            else
            {
                data.message_text.replace(":field", elm.getAttribute("name"));
            }

            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        /**
         * Is executed when the return value of the main() function is false.
         * @param elm current {element} element whose value as been checked for validation
         * @param rule_value {mixed} the value of the rule, if any.
         * @param msg_container {element} the message container, if it is allowed
         * @param data_object  {Object} It is an object containing the following keys:
         *                     message_element {element} the message container element
         *                     message_string {string} the message string based on the current
         *                                             language
         *                     event {event} current event's object
         *                     extra_data {mixed} data that might be returned by main() function
         *                     are accessible via this parameter
         *                     would be checked.
         * @returns {Boolean|Object} an object containing two value
         *                   status {boolean} indicating the status of the validation
         *                   data {mixed} an optional data to be returned
         *                   Note: It is possible to just return false if there is no
         *                   data to be returned
         */
        error : function(elm, rule_value, data){
            if(data.hasOwnProperty("message_element"))
            {
                var msg_parsed = "";

                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.parseMessage(data.message_text, data.placeholders);
                }
                else
                {
                    data.message_text.replace(":field", elm.getAttribute("name"));
                }

                $mtf.E(data.message_element).HTML(msg_parsed);
            }
        },

        /**
         * Allows insertion of templates for this rule.
         */
        template_allow : true,

        /**
         * A template for each validation method. The used only if templates are allowed. Also it is
         * possible to externally override it.
         * @placeholder :attrs a global $mtf placeholder which is replaced by a list of attribute lists
         * @placeholder :message a global $mtf placeholder which is replaced by a message string
         */
        templates : {
            main : "<span :attrs></span>",
            error : "<span :attrs ></span>",
            success : "<span :attrs ></span>"
        },

        /**
         * Sets which template to be used as default template. Default templates are
         * hidden by default, though they might be visible by default and show some
         * specific messages.
         */
        template_default : "main",

        /**
         * Allows default attribute list to be set for each message container.
         */
        templates_default : {
            main : {
                style : "display: none;"
            }
        },

        /**
         * message container. Messages for three different conditions of the validation.
         * Each method's message container, accepts an object holding key&value pairs, with
         * key representing the name of the language and value as the message in that language.
         * Default is $mtf.lang.default .
         */
        messages : {
            main : {
                en : "",
                fa : ""
            },

            error : {
                en : ":field's value must be in a correct email format."
            },

            success : {
                en : ":field's value validated successfully."
            }
        }
    },

    /**
     * @rule if-is
     * @description checks for another input's value
     * @return {NULL}
     * @requires_value YES
     *                 -value a value to be matched against
     *                 -element an element whose value is check against the 'value'
     */
    "if-is" : {
        events : ["blur"],

        main : function(elm, rule_value, data){
            var result = { status : false, data : "" };

            var elm_value = ($mtf.E(rule_value.element).findAndGetContent());
            if( rule_value.value != elm_value )
            {
                return result;
            }
            else
            {
                result.status = true;
            }

        },

        success : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        template_allow : true,

        templates : {
            main :    "<span :attrs></span>",
            error :   "<span :attrs ></span>",
            success : "<span :attrs ></span>"
        },

        template_default : "main",

        templates_default : {
            main : {
                style : "display: none;"
            }
        },
        messages : {
            main : {
                en : "",
            },

            error : {
                en : ":field's value should be :value"
            },

            success : {
                en : ""
            }
        }
    },

    /**
     * @rule max
     * @description checks to see if the maximum length is violated
     * @return {NULL}
     * @requires_value NO
     */
    "max" : {
        events : ["blur"],

        main : function(elm, rule_value, data){
            var result = { status : false, data : "" };
            result.status = (elm.value.length <= parseInt(rule_value)) ? true : false;

            if(data.hasOwnProperty("message_element"))
            {
                $mtf.E(data.message_element).HTML(data.message_text);
            }

            return result;

        },

        success : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        template_allow : true,

        templates : {
            main : "<span :attrs></span>",
            error : "<span :attrs ></span>",
            success : "<span :attrs ></span>"
        },

        template_default : "main",

        templates_default : {
            main : {
                style : "display: none;"
            }
        },
        messages : {
            main : {
                en : "",
            },

            error : {
                en : ":field should not more than :length characters"
            },

            success : {
                en : ""
            }
        }
    },

    /**
     * @rule min
     * @description checks to see if the minimum length is violated
     * @return {NULL}
     * @requires_value YES
     */
    "min" : {
        events : ["blur"],

        main : function(elm, rule_value, data){
            var result = { status : false, data : "" };
            result.status = (elm.value.length >= parseInt(rule_value)) ? true : false;

            if(data.hasOwnProperty("message_element"))
            {
                $mtf.E(data.message_element).HTML(data.message_text);
            }

            return result;

        },

        success : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        template_allow : true,

        templates : {
            main : "<span :attrs></span>",
            error : "<span :attrs ></span>",
            success : "<span :attrs ></span>"
        },

        template_default : "main",

        templates_default : {
            main : {
                style : "display: none;"
            }
        },
        messages : {
            main : {
                en : "",
            },

            error : {
                en : ":field should not be less than :length character"
            },

            success : {
                en : ""
            }
        }
    },


    /**
     * @rule number
     * @description checks to see if input is a number or not
     * @return {NULL}
     * @requires_value NO
     */
    "number" : {

        events : ["blur"],

        main : function(elm, rule_value, data){
                var result = { status : false, data : "" };
                result.status = /^[0-9]*$/.test($mtf.E(elm).Value());
                if(data.hasOwnProperty("message_element"))
                {
                    $mtf.E(data.message_element).HTML(data.message_text);
                }
                return result;
        },

        success : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        /**
         * Allows insertion of templates for this rule.
         */
        template_allow : true,

        templates : {
            main : "<span :attrs></span>",
            error : "<span :attrs ></span>",
            success : "<span :attrs ></span>"
        },

        template_default : "main",

        templates_default : {
            main : {
                style : "display: none;"
            }
        },

        messages : {
            main : {
                en : "",
            },

            error : {
                en : "Only numeric characters are allowed"
            },

            success : {
                en : ""
            }
        }
    },

    /**
     * @rule unique
     * @description sends an ajax request to a specified URL, if the result is not false,
     *              then it assumes the input's value is unique.
     * @param {Object} url => the URL to which the request is sent
     *                 key : the name of the JSON-key sent through form
     *                 extra : an object containing extra data to be sent
     * @return {JSON} [optional]
     * @requires_value YES => the URL to which the AJAX must be sent
     */
    "unique" : {

        events : ["blur"],

        main : function(elm, rule_value, data){
            var result = { status : false, data : "" };
            var url_str = "";

            if( typeof rule_value !== "string" )
            {
                url_str = rule_value.url;
                if( elm.tagName.toLowerCase() == "input" )
                {
                    rule_value[$mtf.E(elm).getName()] = $mtf.E(elm).Value();
                }
                else if ( elm.tagName.toLowerCase() == "textarea" )
                {
                    rule_value[$mtf.E(elm).getName()] = $mtf.E(elm).HTML();
                }

                delete rule_value["url"];
            }
            else
            {
                url_str = rule_value;
                rule_value = {};

                if( elm.tagName.toLowerCase() == "input" )
                {
                    rule_value[$mtf.E(elm).getName()] = $mtf.E(elm).Value();
                }
                else if ( elm.tagName.toLowerCase() == "textarea" )
                {
                    rule_value[$mtf.E(elm).getName()] = $mtf.E(elm).HTML();
                }

            }

            var ajax = new AjaxCall({ url : url_str, type: "post", data : rule_value });

            ajax.success(function(data){
                    if(data == false)
                    {
                        result.status = false;
                        return result;
                    }
            });

            ajax.send();
        },
        success : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },


        template_allow : true,

        templates : {
            main : "<span :attrs></span>",
            error : "<span :attrs ></span>",
            success : "<span :attrs ></span>"
        },

        template_default : "main",

        templates_default : {
            main : {
                style : "display: none;"
            }
        },

        messages : {
            main : {
                en : "",
            },

            error : {
                en : ":field is not unique."
            },

            success : {
                en : ""
            }
        }
    },
}

