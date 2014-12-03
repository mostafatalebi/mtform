/**
 Core engine of mtForm. It contains initializations and basic properties.
 **/

/**
 * Initializes mtFormInit
 * @param container an element to put the result in
 */
function mtFormInit(container){
    this.container =  container;

    // following properties are for the sake of method-chaining
    this.attrs = ""; // assigns the attributes translated from args to this var
    this.htmls = ""; // assigns the attributes translated from args to this var

    this.inputs = []; // assigns the inputs to this var
    this.selects = []; // assigns the inputs to this var
    this.checkBoxes = []; // assigns the checkBoxes to this var
    this.radios = []; // assigns the checkBoxes to this var
    this.textareas = []; // assigns the textareas to this var
    this.textareas = []; // assigns the textareas to this var
    this.htmlResult = []; // assigns the HTML output to this var
    this.htmlResultObj = []; // push comoponent each time to this array
    this.rules = []; // a list of rules for each element
    this.rulesAll = []; // a list of rules for each element
    this.lastQueried = ""; // the last queried element
    this.basePlaceholder = "@mtForm@"; // used for placeholders inside components
    this.jsonResult; // the json-converted array of form components
    this.islternate = false;
    this.alternateContent = "";
    this.contentBefore = "";
    this.contentAfter = "";

    this.mainNamespace = "mtform";
    this.namespaceDelimiter = "@";
    this.placeholders = {
        attr : "attr",
        component : "component",
        before : "before",
        after : "after"
    }

    this.defaultItemTemplate = {
        before : "",
        after : "",
        condition : function(input, type){},
    };

    this.defaultTemplateStack = {};
};

/**
 * returns an instance of current mtFormInit
 * @returns {mtFormInit}
 */
mtFormInit.prototype.getInstance = function(){
    return this;
}

/**
 * Gets the current specified container.
 * @returns {*} container element
 */
mtFormInit.prototype.getContainer = function(){
    return this.container;
}

/**
 * Sets the main container to a new one which is the passed element.
 * @param element the new container. A javascript element
 * @returns {mtFormInit} the mtFormInit
 */
mtFormInit.prototype.setContainer = function(element){
    this.container = element;
    return this;
}
