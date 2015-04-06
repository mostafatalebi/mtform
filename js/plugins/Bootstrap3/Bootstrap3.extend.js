/**
 * @plugin Bootstrap3
 * @description Adds bootstrap 3.* markup and css to the theme support.
 * @author Mostafa Talebi
 * @version 0.0.1
 *
 * @requires { "Theme" }
 */
$mtf.extends( "Bootstrap3", function(){
    if( $mtf.pluginLoaded( "Theme" ) )
    {
        var templates =  {
            form : "<form :attrs >:form</form>",
            input : "<div class='input-group'><input :attrs /></div>",
            password : "<div class='input-group'>:component</div>",
            file : "<div class='input-group'>:component</div>",
            hidden : "<input type='hidden' :attrs />",
            textarea : "<div class='input-group'><textarea class='form-control' :attrs >:innerValue</textarea></div>",
            radio : "<input type='radio' :values  :attrs />",
            checkbox : "<input type='checkbox'   :attrs />",
            submit : "<input type='submit'   :attrs />",
            button : "<button   :attrs >:value</button>",
            select : "<select  :attrs >:options</select>",
            option : "<option  :uniqueValue :attrs />:innerValue</option>"
        };

        $mtf.$lives.Theme.addTheme( "Bootstrap3", templates );
        $mtf.$lives.Theme.setTheme( "Bootstrap3");
        $mtf.$lives.Theme.setDefaultAttr("input", { class : "one-such-item"});
        $mtf.$lives.Theme.setDefaultAttr("submit", { class : "btn btn-large btn-info"});
    }
});