if( $mtf.pluginLoaded( "Theme" ) )
{
    var templates =  {
        form : "<form :attrs >:form</form>",
        input : "<div class='input-group'><input :attrs /></div>",
        password : "<div class='input-group'>:component</div>",
        file : "<div class='input-group'>:component</div>",
        hidden : "<input type='hidden' :attrs />",
        textarea : "<div class='input-group'><textarea class='form-control' :attrs >:innerValue</textarea></div>",
        radio : "<input type='radio' :values  :attrs /><span :label::attrs >:title</span>",
        checkbox : "<input type='checkbox'   :attrs /><span :label::attrs >:title</span>",
        submit : "<input type='submit'   :attrs />",
        button : "<button   :attrs >:value</button>",
        select : "<select  :attrs >:options</select>",
        option : "<option  :uniqueValue :attrs />:innerValue</option>",
        message : "<div :attrs >:message</div>",
        label : "<label :attrs >:innerValue</label>",
    };

    $mtf.Theme().addTheme( "Bootstrap3", templates );
    $mtf.Theme().setTheme( "Bootstrap3");
    $mtf.Theme().setDefaultAttr("input", { class : "one-such-item"} );
    $mtf.Theme().setDefaultAttr("message", { class : "alert alert-danger" /*, style : "display: none;"*/} );
    $mtf.Theme().setDefaultAttr("submit", { class : "btn btn-large btn-info"} );
}
