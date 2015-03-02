var MTF_Valid = function(){


    __(MTF_VALID_RULES);
    // The rules which are defined and can be assigned to various components.
    // @extra MTF_VALID_RULES is a globally used variable for defined rules
    // Note: it is not a globally defined variable (window.var), it is just
    // used in a similar way.
    this.rules_collection = MTF_VALID_RULES;

    // this option holds any event passed in the time of VAdd function call.
    this.events_optional = {};


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
    this.rules = [];

    // rules which are no longer used. Since they are already assigned to
    // their respective components.
    this.rules_obsolete = [];

}

