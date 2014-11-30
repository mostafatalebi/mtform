
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];

    var MtForm = new mtFormInit(document.getElementById("form-cont"));
    MtForm.Input().Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea().addRule("length", "250").
        setContainer(ele).breakBetween().makeAppend().JSON().printJSON();
};












