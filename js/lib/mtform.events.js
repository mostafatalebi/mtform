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
EventEngine.Register("onInit");
EventEngine.Register("onTemplateParsing");


/**
 * Export
 */
EventEngine.Register("onExportAdd");
EventEngine.Register("onExport");




/**
 * example
 */
EventEngine.addEventListener("onInit", function(event){
    event.preventDefault();
    console.log("I have been triggered.");
});
/**
 * example
 */
EventEngine.addEventListener("onAfterGenerate", function(event){
    console.log(event.target);
});