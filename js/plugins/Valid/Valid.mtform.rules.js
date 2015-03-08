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
            alert("No, the value is not a number: "+component.value)
        }
    },

    /**
     * @rule radio
     * @description checks to see if any of the radio inputs are check or not
     */
    "radio" : {
        main : function(component, event){
            if(component.value == 'female')
            {
                return false;
            }
        },
        error : function(component){
            alert("You are a female");
        }
    },

    "select" : {
        main : function(elm, msg, container){
            if(elm.value == "young")    return true;
            else return false;
        },
        error : function(){
            console.log("Select invalid.");
        },
    }

}

