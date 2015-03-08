
window.onload = function(){
    var ele = document.getElementsByTagName("body")[0];



    $mtf.Input().File().Input().VAdd("number", "true", ['keyup']).VAdd("radio", "true", ['change']).Hidden().Password().
        addRule("mobile", "false").Textarea("I am mostafa").addRule("length", "250").
        AttachLabel({ name : "someSpecialName", "for" : "someTextareas"}, "Something").
        Radios({
            name : 'students',
            values : ["female", "male", "old", "young"], // can accept a function too
            default : "",
            labels : ["Female", "Male", "Aged", "Young"], // can accepts a function too
            ids : ['first', 'second'],
            attrs : {class : "good.bad"}
        }).VAdd("radio").
            HtmlBefore("<div style='border: 1px red solid;'>This is added before the components.</div>", true).
        HtmlAfter("<p>This is added after an input</p>").
        Select({
            name : 'students',
            values : ["female", "male", "old", "young"],
            default : "",
            labels : ["Female", "Male", "Aged", "Young"], // can accept a function
            ids : ["id1", "id2", "id3", "id4"], // can accept a function
            attrs : {class : "some-classes"},
            optionAttr : [{ class : 'for-each-option'}, { class : 'something else', 'data-table' : true}, {"data-href" : 'somelink.com'} ],
            optionAttrUseOneSet : false,
         }).VAdd("select", "change").
        Submit({value : "Click Here", "data-id" : 28}).
        setContainer(ele).Alternate(function(currentItem, nextItem){
            if(currentItem.indexOf("radio") !== -1)
            {
                return "<p style='color: red;'>---------------------------------</p>";
            }
            else
            {
                return "<p style='color: green; font-weight: bold;'>---------------------------------</p>"
            }
        }).FormWithFile({ id : 'main_form'}).VBind().MakeAppend();

        $mtf.VEventize("main_form");

};












