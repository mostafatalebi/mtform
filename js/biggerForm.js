window.onload = function(){
    $mtf.setContainer(".form-holder");

    /**
     * Sample addEventListener Usage
     */
    $mtf.Event.addEventListener("onTemplateProcess", function(event){
        event.preventDefault();
        if(event.target.args.hasOwnProperty("name"))
        {
            event.target.args.name += "-APPENDED";
        }
    });


    $mtf.Input("firstname", { class : "form-input"}).Rule("min", 3)
        .AttachLabel( "First Name: ")
        .Input("lastname").Rule("required").Rule("min", 3)
        .AttachLabel( "Last Name: ")
        .Input("email").Rule("email", null, { template : true , placeholders : { "field" : "Email"}, events : ['blur'] })
        .AttachLabel( "Email Address: ")
        .Input("job").Rule("min", 3)
        .AttachLabel( "Current Job: ")
        .Input("education").Rule("min", 3)
        .AttachLabel( "Highest Level of Education: ")
        .Radios("sex", { labels : ['male', 'female', 'Not Mentioned.'], values : ['male', 'female', 'none']})
        .Rule("value", 'male', {events : ['click']})
        .AttachLabel(  "Your Gender: ")
        .Textarea("bio", { placeholder : "A Brief Description About Yourself."})
        .AttachLabel( "Your Brief Bio: ")
        .Textarea("skills", { placeholder : "Your Skills"})
        .AttachLabel( "Your Skills: ")
        .Textarea("foundus", { placeholder : "Somewhere"})
        .AttachLabel( "How did you find us: ")
        .Input("_token", "true", { type : 'hidden'})
        .Select("favorite_position", { labels : ['Backend Programmer', 'Frontend Programer', 'Sales Expert'],
            values : ['bp', 'fp', 'se'], attrs : { 'data-type' : 'example'}, options_attrs : [{ class : 'each-option'}], repeat : true })
        .Rule("value", 'bp', { template : true , placeholders : { "field" : "Favorite Position"}, events : ['change'] })
        .HtmlBefore("<br />").HtmlAfter("<br /><br /><br /><br />")
        .AttachLabel("Your Favorite Position")

        .Submit("submit", "Register", { id : "register" }).Form({ id : "login-form" , action : "server.php"})
        .Bind().MakeAppend();

        $mtf.Eventize("#login-form");






    /**
     * Export
     */
    $mtf.Event.Register(["onExportAdd", "onExportOutput"]); 




    /**
     * example
     */
    $mtf.Event.addEventListener("onInit", function(event){
        event.preventDefault();
        console.log("I have been triggered.");
    });
    /**
     * example
     */
    $mtf.Event.addEventListener("onAfterGenerate", function(event){
        console.log(event.target);
    });

    $mtf.Event.addEventListener("onExportOutput", function(event){
        event.mostafa = 'onExportOutput';
        console.log("I am from Export Module");
    });


    
    $mtf.Export.Add({ id : 23}, "keyName", "core");
}