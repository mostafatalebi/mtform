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
    this.lastQueried = {}; // the last queried element
    this.basePlaceholder = "@mtForm:attr@"; // used for placeholders inside components
    this.jsonResult; // the json-converted array of form components
    this.islternate = false;
    this.alternateContent = "";
    this.contentBefore = "";
    this.contentAfter = "";
    this.mainNamespace = "mtform";
    this.namespaceDelimiter = "@";
    this.stacks = {
        "form" : [],
        "input" : [],
        "password" : [],
        "hidden" : [],
        "radio" : [],
        "checkbox" : [],
        "rule" : [], // global rules to be applied
        "input" : [],
        "submit" : [],
        "button" : [],
        "textarea" : [],
        "option" : [],
    };

    this.stackParsed = {};


    this.htmlObject = {
        after : "",
        before : ""
    };

    this.isHtml = false;

    // this stack accepts an object on each push(). this
    // object holds two properties. One is .type and another is
    // .index, which when combioned, points exactly to the
    // component place in this.stacks array.
    this.stackSequential = [];

    // Array of parsed, ordered components without any association of types
    this.collectionOrdered = [];


    // each component has a fixed "unchangeable" attribute called
    // data-mtformid which stores a unique id of each component.

    // this array-attribute holds events for each component at occurrence of which the
    // validation for that certain component is carried out. This is optional, since
    // all components are validated by default on "submit" event.
    this.validationEvents = {
        change : [],
        blur : [],
        submit : [],
        custom : [], // each entry must be an object containing a function and a unique id corresponding
        // to a specific component
    }

    this.placeholders = {
        rules : ":rules",
        component : ":component",
        before : ":before",
        after : ":after",
        message : ":message",
        label : ":label",
        attrs : ":attrs",
        value : ":value",
        innerValue : ":innerValue",
    };





    // each entry into the array has to be
    // an object {} (containing type and htmlContent)
    this.templateDefault = [];

    // string. since it will be immediately used for the last inserted element(s)
    this.templateImmediate = "";

    // the type of the last component generated
    this.lastComponentType = "";

    this.componentLastInfo = {
        index : 0,
        type : ""
    }

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

/**
 * This functions adds the most recent [created] components into its related
 * stack for later use.
 * @param component the component which is created
 * @param componentStack the stack onto which the component should be pushed
 * @private
 */
mtFormInit.prototype.__addComponentInstance = function(component, componentStack){
    this.stacks[componentStack].push(component);
    // returns nothing, since this is a system function
}


mtFormInit.prototype.__setLastComponentType = function(componentType){
    this.lastComponentType = componentType;
    // returns nothing, since this is a system function
}
