$mtf.extends( "Bootstrap3", function(){
    if( $mtf.pluginLoaded( "Theme" ) )
    {
        var templates =  {
            form : "",
            input : "<div class='input-group'><input :attrs /></div>",
            password : "<div class='input-group'>:component</div>",
            file : "<div class='input-group'>:component</div>",
            hidden : "",
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
        $mtf.$lives.Theme.setDefaultAttr("input", { class : "one-such-item"})
    }
});