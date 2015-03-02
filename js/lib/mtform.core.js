/**
 Core engine of mtForm. It contains initializations and basic properties.
 **/

/**
 * Initializes mtFormInit
 * @param container an element to put the result in
 */
function mtFormInit(container, coreModules){
    this.container =  container;

    // list of living module for the lifespan of the application
    this.$lives = [];
    // following properties are for the sake of method-chaining
    this.attrs = ""; // assigns the attributes translated from args to this var
    this.htmls = ""; // assigns the attributes translated from args to this var
    this.coreModules = []; // it just an array of names to be used to see which
                           // plugins have been loaded as core modules
    this.rules = []; // a list of rules for each element
    this.rulesAll = []; // a list of rules for each element
    this.jsonResult; // the json-converted array of form components
    this.alternateContent = "";
    this.collections = {
        "input" : [],
        "password" : [],
        "file" : [],
        "hidden" : [],
        "radio" : [],
        "checkbox" : [],
        "rule" : [], // global rules to be applied
        "input" : [],
        "submit" : [],
        "button" : [],
        "textarea" : [],
        "select" : [],
    };

    this.forms = [];

    this.formInjection = true;

    this.collectionParsed = {};


    this.htmlObject = {
        after : "",
        before : ""
    };

    this.isHtml = false;

    // this collection accepts an object on each push(). this
    // object holds two properties. One is .type and another is
    // .index, which when combined, points exactly to the
    // component place in this.collections array.
    this.collectionSequential = [];

    // Array of parsed, ordered components without any association of types
    this.collectionOrdered = [];


    // each component has a fixed "unchangeable" attribute called
    // data-mtformid which stores a unique id for each component.

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

    this.componentLastIterated = "";


    this.form_components_names = [
        "input", "select", "textarea", "radio", "checkbox", "button", "submit",
    ]

    // each entry into the array has to be
    // an object {} (containing type and htmlContent)
    this.templateDefault = [];

    // string. since it will be immediately used for the last inserted element(s)
    this.templateImmediate = "";

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

// ===================
// PRIVATE FUNCTIONS
// ===================

/**
 * This functions adds the most recent [created] components into its related
 * collection for later use.
 * @param component the component which is created
 * @param componentCollection the collection onto which the component should be pushed
 * @private
 */
mtFormInit.prototype.__addComponentInstance = function(component, componentCollection){
    this.collections[componentCollection].push(component);
    // returns nothing, since this is a system function
}


mtFormInit.prototype.__setLastComponentType = function(componentType){
    this.lastComponentType = componentType;
    // returns nothing, since this is a system function
}

