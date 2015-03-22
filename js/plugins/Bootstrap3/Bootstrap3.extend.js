$mtf.extends( "Bootstrap3", function(){
    if( $mtf.pluginLoaded( "Theme" ) )
    {
        var templates =  {
            form : "<form :attrs >:form</form>",
            input : "<div class='input-group'>:component</div>",
            password : "<div class='input-group'><input class='form-control' type='password' :attrs /></div>",
            file : "<div class='input-group'><input class='form-control' type='file' :attrs /></div>",
            hidden : "<input type='hidden'   :attrs />",
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
    }
});