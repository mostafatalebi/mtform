if(
    typeof window.EventEngine === "undefined" ||
    typeof window.EventEngine === 'null' )
{
    window.EventEngine = new EventSystem();
}



var MTFORM_EVENT_GROUP= 'mtform';

EventEngine.Register("onInit", MTFORM_EVENT_GROUP);
EventEngine.Register("onTemplateParsing", MTFORM_EVENT_GROUP);

EventEngine.addEventListener("onInit", MTFORM_EVENT_GROUP, function(event){
    console.log("I have been triggered.");
});