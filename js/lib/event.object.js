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
    this.defaultPrevented = false;
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
    // this.timestamp = sth
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