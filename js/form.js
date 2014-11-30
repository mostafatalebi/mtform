
window.onload = function(){
    var MtForm = new mtFormInit(document.getElementById("form-cont"));

    MtForm.Input().addRule("email").
        addRule("mobile", "true").
        setContainer(document.getElementsByTagName("body")[0]).makeAppend();
};












