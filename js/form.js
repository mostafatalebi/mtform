
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];

     var MtForm = new mtFormInit(document.getElementById("form-cont"));

    var MTFormer = MtForm.setDefaultTemplate("<div id='someID'><input type='text' :attrs" +
    " :rules /></div>", "input");

    MTFormer.Input().Input().addRule("phone", "max(10)").Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea("I am mostafa").addRule("length", "250").
        Radios({
            name : 'students',
            values : ["female", "male", "old", "young"], // can accept a function too
            default : "",
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            attrs : {class : "good.bad"},
        }).addRule("mobile", "10numbers").Submit({value : "Click Here", "data-id" : 28}).
        setContainer(ele).breakBetween().makeAppend().JSON().printJSON();
};












