
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];

     var MtForm = new mtFormInit(document.getElementById("form-cont"));

    MtForm.Input().Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea().addRule("length", "250").
        Radios({}, {
            name : 'students',
            values : ["female", "male", "old", "young"],
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            attrs : {class : "good.bad"},
        }).Submit("Click Here").
        setContainer(ele).breakBetween().makeAppend().JSON().printJSON();

};












