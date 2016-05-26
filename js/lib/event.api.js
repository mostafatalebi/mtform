
EventSystem.prototype.Register = function(eventName){
    if( typeof eventName == 'string' )
    {
        return this.__event_system_register(eventName);
    }
    else if (typeof eventName == 'object')
    {
        for(var eventInc = 0; eventInc < eventName.length; eventInc++)
        {
            this.__event_system_register(eventName[eventInc]);
            return true;
        }
    }
}

EventSystem.prototype.Exists = function(eventName ){
    return this.__event_exists(eventName);
}

EventSystem.prototype.addEventListener = function(eventName, eventCallback, eventWeight) {
    this.__event_system_add_listener(eventName, eventCallback, eventWeight)
}

/**
 * Dispatches all the listener attached to an event.
 * @param eventName the name of the event
 * @param eventObject the event object which is passed to each listener. The
 * event.target is the most important property of the event object.
 * @returns {*}
 */
EventSystem.prototype.dispatchEvent = function(eventName, eventObject) {
    if( this.__event_exists(eventName) )
    {
        try{

            var events = this.__event_system_fetch_by_event_name(eventName);
            if( events )
            {
                var keys = Object.keys(events);

                for(var eventItr = 0; (eventItr < keys.length); eventItr++)
                {
                    var callback = events[keys[eventItr]];
                    callback.callback(eventObject);
                    this.$EventObject[eventName] = eventObject;
                }
                return this.$EventObject[eventName];
            }

        }
        catch(e)
        {
            console.error(e.message);
        }

    }
    // in case there is not event listener, we return the event object as is.
    return eventObject;
}

/**
 * Returns the last eventObject (acted upon by a possible listener) of
 * a certain event.
 * @param eventName {String} the name of the event
 * @returns {*}
 */
EventSystem.prototype.getLastEventObject = function(eventName) {
    if(this.$EventObject.hasOwnProperty(eventName))
    {
        return this.$EventObject[eventName];
    }
    else
    {
        return false;
    }
}

/**
 * Checks to see how event should prevent the current execution flow,
 * within the current accessible scope.
 * @param eventObject An event object whose isDefaultPrevented is treated
 * in association with result and config.prevention_type properties, respectively
 * members of the event object and Event class.
 *
 * @returns {*} Returns a data to be returned by the caller, or -1 which
 * tells the caller to ignore the prevention; and continue its flow. A value
 * of false denotes that the treatment of the event object has not been
 * carried out properly, for instance a null or an undefined event object
 * causes this.
 */
EventSystem.prototype.checkPreventionState = function(eventObject) {
    return this.__check_prevention_state(eventObject);
}