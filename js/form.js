
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];

     var MtForm = new mtFormInit(document.getElementById("form-cont"));

    var MTFormer = MtForm.setDefaultTemplate("<div id='someID'><input type='text' :attrs" +
    " :rules /></div>", "input");

    MTFormer.Input().Input().addRule("phone", "max(10)").Hidden().addRule("email").Password().
        addRule("mobile", "false").Textarea("I am mostafa").addRule("length", "250").
        AttachLabel({ name : "someSpecialName", "for" : "someTextareas"}, "Something").
        Radios({
            name : 'students',
            values : ["female", "male", "old", "young"], // can accept a function too
            default : "",
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            attrs : {class : "good.bad"},
        }).addRule("mobile", "10numbers").
            HtmlBefore("<div style='border: 1px red solid;'>This is added before the components.</div>", true).
        HtmlAfter("<p>This is added after an input</p>").
        Select({
            name : 'students',
            values : ["female", "male", "old", "young"], // can accept a function too
            default : "",
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            id : ["id1", "id2", "id3", "id4"],
            attrs : {class : "good.bad"},
         }).
        Submit({value : "Click Here", "data-id" : 28}).
        setContainer(ele).Alternate("<p>---------------------------------</p>", true).MakeAppend()
        .JSON().printJSON();
};












