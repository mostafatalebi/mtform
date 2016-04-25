window.onload = function(){
    $mtf.setContainer(".form-holder");

    $mtf.Input("firstname", { class : "form-input"}).Rule("min", 3)
        .AttachLabel( "First Name: ")
        .Input("lastname").Rule("min", 3)
        .AttachLabel( "Last Name: ")
        .Input("email").Rule("email")
        .AttachLabel( "Email Address: ")
        .Input("job").Rule("min", 3)
        .AttachLabel( "Current Job: ")
        .Input("education").Rule("min", 3)
        .AttachLabel( "Highest Level of Education: ")
        .Radios("sex", { labels : ['male', 'female', 'Not Mentioned.'], values : ['male', 'female', 'none']})
        .AttachLabel(  "Your Gender: ")
        .Textarea("bio", { placeholder : "A Brief Description About Yourself."})
        .AttachLabel( "Your Brief Bio: ")
        .Textarea("skills", { placeholder : "Your Skills"})
        .AttachLabel( "Your Skills: ")
        .Textarea("foundus", { placeholder : "Somewhere"})
        .AttachLabel( "How did you find us: ")
        .Input("_token", "true", { type : 'hidden'})
        .Submit("submit", "Register", { id : "register" }).Form({ id : "login-form" , action : "server.php"})
        .Bind().MakeAppend();

        $mtf.Eventize("#login-form");
    console.log($mtf.Export());
}