
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];

     var MtForm = new mtFormInit(document.getElementById("form-cont"));
    console.log(MtForm.getAllTemplates());
    var MTFormer = MtForm.setDefaultTemplate("<div id='someID'><input type='text' :attrs" +
    " :rules /></div>", "input");
    console.log(MTFormer.getAllTemplates());
    MTFormer.Input().addRule("phone", "max(10)").Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea().addRule("length", "250").
        Radios({
            name : 'students',
            values : ["female", "male", "old", "young"], // can accept a function too
            default : "",
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            attrs : {class : "good.bad"},
        }).addRule("mobile", "10numbers").Submit("Click Here").
        setContainer(ele).breakBetween().makeAppend().JSON().printJSON();
    console.log(MTFormer.getAllTemplates());
};












