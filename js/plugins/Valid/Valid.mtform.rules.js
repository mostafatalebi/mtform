MTF_VALID_RULES = {};


MTF_VALID_RULES = {

    /**
     * @rule number
     * @description checks to see if input is a number or not
     * @param number input value
     * @returns {boolean} true if number, and false if contains non-numeric values
     */
    "number" : {
        main : function(component, event){
            return /^[0-9]*$/.test(component.value);
        },
        success : function(component, msg_container, event) {
            // you can leave it empty
        },
        error : function(component, msg_container, event){
            alert("No, you value is not a number: "+component.value)
        }
    }



}

