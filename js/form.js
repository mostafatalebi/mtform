
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];

     var MtForm = new mtFormInit(document.getElementById("form-cont"));

    MtForm.Input().Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea().addRule("length", "250").
        Radios({
            name : 'students',
            values : ["female", "male", "old", "young"], // can accept a function too
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            attrs : {class : "good.bad"},
        }).addRule("mobile", "10numbers").Submit("Click Here").
        setContainer(ele).breakBetween().makeAppend().JSON().printJSON();

};












