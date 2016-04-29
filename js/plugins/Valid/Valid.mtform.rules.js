MTF_VALID_RULES = {};


MTF_VALID_RULES = {

    /**
     * @rule email
     * @description checks to see if input is a correctly formatted email or not
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
            var result = MTVL_RULE_RETURN;

            result.status = /^[a-zA-Z0-9_.-]+@+[a-zA-Z0-9-]+\.{1}[a-zA-Z0-9-]{2,20}(?:\.{1}[a-zA-Z0-9-]{2,20})?(?:\.{1}[a-zA-Z0-9-]{2,20})?$/.test($mtf.E(elm).Value());

            if( data.hasOwnProperty("skip_type") )
            {
                result.skip_type = data.skip_type;
            }

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
            if($mtf.$lives.Valid.rule_is_last_in_stack("email"))
            {
                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }
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
            var msg_parsed = "";
            if(data.hasOwnProperty("message_element"))
            {
                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed =  data.message_text.replace(":field", elm.getAttribute("name"));
                }
            }
            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
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
    "if-element" : {
        events : ["blur"],

        main : function(elm, element_to_match, data){
            var result = { status : false, data : "" };

            var original_element = $mtf.E(elm).findAndGetContent();
            var secondary_element = $mtf.E(element_to_match).findAndGetContent();
            if( original_element != secondary_element  )
            {
                return result;
            }
            else
            {
                result.status = true;
                return result;
            }

        },

        success : function(elm, rule_value, data){
            var msg_parsed = "";
            // you can check to see if currently this
            // rule has not other rule to be executed after it,
            // using this, you can then show "success" messages only
            // when the last rule is executed
            if($mtf.$lives.Valid.rule_is_last_in_stack("if-element"))
            {


                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }
            }
            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        error : function(elm, rule_value, data){
            var msg_parsed = "";

            if(data.hasOwnProperty("placeholders"))
            {
                msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
            }
            else
            {
                msg_parsed = data.message_text.replace([":field", ":value"], [elm.getAttribute("name"), $mtf.E(element_to_match).findAndGetContent()]);
            }

            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
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
                en : ":field's value matches."
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
            if($mtf.$lives.Valid.rule_is_last_in_stack("max"))
            {
                var msg_parsed = "";

                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }

                $mtf.E(data.message_element).HTML(msg_parsed);
            }
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
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
            var result = MTVL_RULE_RETURN;

            result.status = (elm.value.length >= parseInt(rule_value)) ? true : false;

            if(data.hasOwnProperty("message_element"))
            {
                $mtf.E(data.message_element).HTML(data.message_text);
            }

            if( data.hasOwnProperty("skip_type") )
            {
                result.skip_type = data.skip_type;
            }

            return result;

        },

        success : function(elm, rule_value, data){
            if($mtf.$lives.Valid.rule_is_last_in_stack("min"))
            {
                var msg_parsed = "";

                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }

                $mtf.E(data.message_element).HTML(msg_parsed);
            }
        },

        error : function(elm, rule_value, data)
        {
            var msg_parsed = "";
            if(data.hasOwnProperty("placeholders"))
            {
                msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
            }
            else
            {
                msg_parsed =  data.message_text.replace(":field", elm.getAttribute("name"));
            }


            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
            data.message_element.innerHTML = "";
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
            if($mtf.$lives.Valid.rule_is_last_in_stack("number"))
            {
                var msg_parsed = "";

                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }

                $mtf.E(data.message_element).HTML(msg_parsed);
            }
        },

        error : function(elm, rule_value, data){
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
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
     * @note this rule is different. The type of the rule is of asynchronous
     *       and as a result it needs to be handled differently. The error() and
     *       success() callbacks are invoked internally through a third function
     *       named systematically. You can inspect through the code to see
     *       the details.
     * @note this rule follows asynchronous rules' criteria; hence it should
     *       be queued as the last rule due to its asynchronous nature.
     * @param {Object} url => the URL to which the request is sent
     *                 key : the name of the JSON-key sent through form
     *                 extra : an object containing extra data to be sent
     * @return {JSON} response object must have a key named "status" which
     *                is of a type boolean and is used by MTFormJS to see
     *                if the server confirms the uniqueness of the value or not
     *                You can send any extra data from the server as long as
     *                the key "status" is used with a value of type boolean.
     *                [if Object] {
     *                  'status' => [boolean]
     *                  ...
     *                }
     * @requires_value YES => {Object|String}
     *                 [if object]{
     *                      url {String} [required] the URL
     *                      data {Object} [optional]
     *                      message_failure {String} [optional]
     *                 }
     */
    "unique" : {

        events : ["blur"],

        main : function(elm, rule_value, data){
            var result = MTVL_RULE_RETURN;

            var url_str = "";

            if( typeof rule_value !== "string" )
            {
                url_str = rule_value.url;

                if( typeof rule_value.data !== 'object' ) rule_value.data = {};

                if( elm.tagName.toLowerCase() == "input" )
                {
                    rule_value.data[$mtf.E(elm).getName()] = $mtf.E(elm).Value();
                }
                else if ( elm.tagName.toLowerCase() == "textarea" )
                {
                    rule_value.data[$mtf.E(elm).getName()] = $mtf.E(elm).HTML();
                }

            }
            else
            {
                url_str = rule_value;
                rule_value = { data : {} };

                if( elm.tagName.toLowerCase() == "input" )
                {
                    rule_value.data[$mtf.E(elm).getName()] = $mtf.E(elm).Value();
                }
                else if ( elm.tagName.toLowerCase() == "textarea" )
                {
                    rule_value.data[$mtf.E(elm).getName()] = $mtf.E(elm).HTML();
                }

            }

            function __MTformSysValidRuleAjaxMain__(error_callback, success_callback){
                var ajax = new AjaxCall({ url : url_str, type: "post", data : rule_value.data, responseType : 'json' });
                var res;
                ajax.success(function(responseData){
                    success_callback(responseData)
                });
                ajax.error(function(responseData){
                    error_callback(responseData)
                });

                ajax.send();
            };

            __MTformSysValidRuleAjaxMain__(
                // error callback
                function(responseData){
                    data.system.error_callback(elm, rule_value, {
                            message_element : data.message_element,
                            message_text : rule_value.failure_message,
                            placeholders : data.placeholders,
                            event : data.event
                    });

                },
                // success callback
                function(responseData){
                    if(responseData.status == true)
                    {
                        var obj = {
                            message_element : data.message_element,
                            message_text : data.system.message_success,
                            placeholders : data.placeholders,
                            event : data.event
                        };

                        data.system.success_callback(elm, rule_value, obj);
                    }
                    else
                    {
                        data.system.error_callback(elm, rule_value, {
                            message_element : data.message_element,
                            message_text : data.system.message_error,
                            placeholders : data.placeholders,
                            event : data.event
                        });
                    }
                }
            );

            result.type = MTVL_CALLBACK_ASYNC;
            result.skip_type = 0;
            return result;
        },
        success : function(elm, rule_value, data){

            if($mtf.$lives.Valid.rule_is_last_in_stack("unique"))
            {
                var msg_parsed = "";

                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }

                $mtf.E(data.message_element).HTML(msg_parsed);
            }
        },

        error : function(elm, rule_value, data){
            var field_label = "Field";
            if(data.placeholders.hasOwnProperty("field"))
            {
                field_label =data.placeholders.field;
            }
            data.message_text = data.message_text.replace(":field", field_label);
            $mtf.E(data.message_element).HTML(data.message_text);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
        },

        template_allow : true,

        templates : {
            main : "<span :attrs ></span>",
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
                en : ":field is unique."
            }
        }
    },


    /**
     * @rule if-value
     * @description checks for another input's value
     * @return {NULL}
     * @requires_value YES
     *                 -value a value to be matched against
     *                 -element an element whose value is checked against the 'value'
     */
    "value" : {
        events : ["blur"],

        main : function(elm, value, data){
            var result = MTVL_RULE_RETURN;

            var original_element = $mtf.E(elm).findAndGetContent();

            if( data.hasOwnProperty("skip_type") )
            {
                result.skip_type = data.skip_type;
            }
            if( data.hasOwnProperty("cleaner"))
            {
                result.cleaner_type = data.cleaner;
            }

            if( original_element != value  )
            {
                return result;
            }
            else
            {
                result.status = true;
                return result;
            }

        },

        success : function(elm, rule_value, data){
            var msg_parsed = "";
            // you can check to see if currently this
            // rule has not other rule to be executed after it,
            // using this, you can then show "success" messages only
            // when the last rule is executed
            if($mtf.$lives.Valid.rule_is_last_in_stack("if-element"))
            {
                if(data.hasOwnProperty("placeholders"))
                {
                    msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
                }
                else
                {
                    msg_parsed = data.message_text.replace(":field", elm.getAttribute("name"));
                }
            }

            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        error : function(elm, rule_value, data){
            var msg_parsed = "";

            if(data.hasOwnProperty("placeholders"))
            {
                msg_parsed = $mtf.$lives.Valid.message_parse(data.message_text, data.placeholders);
            }
            else
            {
                msg_parsed = data.message_text.replace([":field", ":value"], [elm.getAttribute("name"), $mtf.E(element_to_match).findAndGetContent()]);
            }

            $mtf.E(data.message_element).HTML(msg_parsed);
        },

        cleaner : function (elm, rule_value, data){
            $mtf.E(data.message_element).HTML("");
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
                en : ":field's value matches."
            }
        }
    },
}

