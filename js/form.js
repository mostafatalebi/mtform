
window.onload = function(){
<<<<<<< HEAD
    var ele = document.getElementsByTagName("body")[0];

    var MtForm = new mtFormInit(document.getElementById("form-cont"));
    MtForm.Input().Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea().addRule("length", "250").
        setContainer(ele).breakBetween().makeAppend().JSON().printJSON();
=======
    var MtForm = new mtFormInit(document.getElementById("form-cont"));

    MtForm.Input().addRule("email").
        addRule("mobile", "true").
        setContainer(document.getElementsByTagName("body")[0]).makeAppend();
>>>>>>> b3b250651e40c1656cc44f899379d4679d07f5cf
};












