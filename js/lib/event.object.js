/**
 * Is event prevented (from continuing to trigger)
 * @type {boolean}
 */
EventObject.prototype.defaultPrevented = false;

/**
 * The type (name) of the event
 * @type {null}
 */
EventObject.prototype.type  = null;

/**
 * A unique event key which is generated at current execution flow
 * @type {null}
 */
EventObject.prototype.key  = null;

/**
 * The current target on which event is created
 * @type {null}
 */
EventObject.prototype.target  = null;

/**
 * The timestamp (UNIX seconds) of the event creation
 * @type {null}
 */
EventObject.prototype.timestamp  = null;
/**
 * @dependency Should be used when preventDefault() is used.
 * The result of a listener; it used to return [data] in necessary methods where preventDefault is
 * checked for an event. It cannot be used everywhere is the method in which the dispatchEvents() is
 * used should accommodate the usage of result. Since $EventObject.result replaces a method's default
 * return and hence it should be used with full awareness.
 * Note: $EventObject.result is a property which should be used with the end-user's listener, it is not
 * system-assigned property. For instance while adding an event listener for event "templateProcess", you
 * can use this property to return your own version of the template. It is a MUST to call preventDefault()
 * on event object because otherwise the .result value is ignored and technically it would not be used.
 * @type {null}
 */
EventObject.prototype.result  = null;

/**
 * Prevents the event from executing its default
 * @note it can destroy the execution of some critical
 * operations if used unwisely.
 */
EventObject.prototype.preventDefault = function(){
    this.defaultPrevented = true;
}

/**
 * Checks if the event is prevented
 */
EventObject.prototype.isDefaultPrevented = function(){
    return this.defaultPrevented;
}

/**
 * Continues the default execution
 */
EventObject.prototype.continueDefault = function(){
    this.defaultPrevented = false;
}

/**
 * Sets the current target object of the event
 * @param targetObject Object|Array|String|Integer
 */
EventObject.prototype.setTarget = function(targetObject){
    this.target = targetObject;
}

/**
 * Initializes the event
 */
EventObject.prototype.init = function(){
    // this.timestamp = sth
}

function EventObject(eventData) {
    if( typeof eventData !== 'object' )
    {
        eventData = {};
    }

    if(eventData.hasOwnProperty("target"))
        this.setTarget(eventData.target);
    if(eventData.hasOwnProperty("type"))
        this.type = eventData.type;
};