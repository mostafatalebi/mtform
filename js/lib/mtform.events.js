if(
    typeof window.EventEngine === "undefined" ||
    typeof window.EventEngine === 'null' )
{
    window.EventEngine = new EventSystem();
}



var MTFORM_EVENT_GROUP= 'mtform';

/**
 * Core
 */
EventEngine.Register("onInit", MTFORM_EVENT_GROUP);
EventEngine.Register("onTemplateParsing", MTFORM_EVENT_GROUP);


/**
 * Export
 */
EventEngine.Register("onExportAdd", "export");
EventEngine.Register("onExport", "export");




/**
 * example
 */
EventEngine.addEventListener("onInit", MTFORM_EVENT_GROUP, function(event){
    event.preventDefault();
    console.log("I have been triggered.");
});
/**
 * example
 */
EventEngine.addEventListener("onAfterGenerate", MTFORM_EVENT_GROUP, function(event){
    console.log(event.target);
});