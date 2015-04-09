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
            msg_container.innerHTML = "ممنون از شما! ";
        },
        error : function(component, msg_container, event){
            msg_container.innerHTML = "لطفا یک عدد وارد نمایید. مقدار وارد شده کنونی: "+component.value;
        },

        // whether to insert HTML templates for the items to which this rule has been bound
        template_allow : true,

        // templates for different conditions of this rule, these are used only if
        // templates_allow is set to true.
        templates : {
            default : "<div :attrs >Result is shown here: :message</div>",
        },

        // which template must be used as default template
        template_default : "default"
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
        error : function(elm, value, msg, event){

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
    },

    "email" : {
        main : function(component, event){
            if(component.value !== "s")
                return false;
            else
                return true;
        },

        error : function(elm, msg, event){
            alert("Failed");
        },

        success : function(elm, msg, event){
            alert("Success");
        },


        // whether to insert HTML templates for the items to which this rule has been bound
        template_allow : true,

        // templates for different conditions of this rule, these are used only if
        // templates_allow is set to true.
        templates : {
            default : "<span :attrs >Result is shown here: :message</span>",
        },

        // which template must be used as default template
        template_default : "default"
    }

}

