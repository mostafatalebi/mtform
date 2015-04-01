/**
 Core engine of mtForm. It contains initializations and basic properties.
 **/

/**
 * Initializes mtFormInit
 * @param container an element to put the result in
 */
function mtFormInit(container_selector){
    this.container;

    // list of living module during the lifespan of the application
    this.$lives = [];

    this.collections =              MTF_Collection;
    this.form_components_names =    MTF_COMPONENTS;
    this.placeholders =             MTF_PLACEHOLDERS;

    this.attrs = ""; // assigns the attributes translated from args to this var
    this.htmls = ""; // assigns the attributes translated from args to this var

    this.rules = []; // Note: @__remove(0.0.2)
    this.rulesAll = []; // Note: @__remove(0.0.2)
    this.jsonResult; // the json-converted array of form components
    this.alternateContent = "";

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

    this.componentLastIterated = "";

    // each entry into the array has to be
    // an object {} (containing type and htmlContent)
    this.templateDefault = [];

    // string. since it will be immediately used for the last inserted element(s)
    this.templateImmediate = "";

    this.componentLastInfo = {
        index : 0,
        type : ""
    }

    /**
     * A list of export functions to be called when Export is called
     * @type {Array}
     */
    this.exports = [];

    /**
     * A list of import functions to be called when Import is called
     * @type {Array}
     */
    this.imports = [];

    /**
     * A list of reset functions to be called when Reset is called
     * @type {Array}
     */
    this.resets = [];

    /**
     * A list of all plugins
     * @type {Array}
     */
    this.plugins = [];

    /**
     * Stores various instances of $mtf which are not living anymore and are rendered to the page.
     * @type {Array}
     */
    this.store = [];

    /**
     * A list of attributes which are assigned as default to each generated components
     * @type {Object}
     */
    this.defaults = {
        input : {
            class : "input-control"
        }
    };

    /**
     * Set the container if any selector is passed.
     */
    if( typeof container_selector === 'string' )
        this.container =  document.querySelector(container_selector);

    /** Template Properties **/
    // This template collection feeds the components'
    // default templates. It increases the flexibility and
    // allows for a more robust collection.
    // All of them can accept a callback function, with the following parameters:
    // callback(lastCreatedItemType, lastCreatedItemIndex, placeholders, values);
    this.templatesFormComponents = {
        form : "<form :attrs >:form</form>",
        input : "<input type='text'   :attrs />",
        password : "<input type='password' :attrs />",
        file : "<input type='file' :attrs />",
        hidden : "<input type='hidden'   :attrs />",
        textarea : "<textarea   :attrs >:innerValue</textarea>",
        radio : "<input type='radio' :values  :attrs />",
        checkbox : "<input type='checkbox'   :attrs />",
        submit : "<input type='submit'   :attrs />",
        button : "<button   :attrs >:value</button>",
        select : "<select  :attrs >:options</select>",
        option : "<option  :uniqueValue :attrs />:innerValue</option>"
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
mtFormInit.prototype.setContainer = function(selector){
    this.container =  document.querySelector(selector);
    return this;
}

/**
 *
 * @param keep_old_stuff
 * @constructor
 */
mtFormInit.prototype.Reset = function(keep_old_stuff){

    if( keep_old_stuff )
    {
        this.__transferToStore();
    }
    else
    {
        this.collection = MTF_Collection;
        this.collectionSequential = [];
        this.collectionOrdered = [];
        this.forms = [];
    }

    return this;
}




// ===================
// PRIVATE FUNCTIONS
// ===================

/**
 * Adds the most recent [created] components into its related
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


mtFormInit.prototype.__transferToStore = function(){

    this.store.push(
        {
            collection : this.collection,
            collectionSequential : this.collectionSequential,
            collectionOrdered : this.collectionOrdered,
            forms : this.forms
        }
    );

    this.collection = MTF_Collection;
    this.collectionSequential = [];
    this.collectionOrdered = [];
    this.forms = [];
}
