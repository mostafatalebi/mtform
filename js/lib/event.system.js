function EventSystem() {};
/**
 * List of Events Group, each containing its own events
 * @type {{}}
 */
EventSystem.prototype.events_list = {'root' : {}};

EventSystem.prototype.events_listening = {'root':{}};

EventSystem.prototype.config = {
    /**
     * A value used by preventDefault() to determine its state of
     * strictness.
     * 1 ==> [normal] allows continuation of the default flow
     * 2 ==> [strict] Prevents the default flow and closes the caller-function
     * by returning any accessible value
     */
    prevention_type : 1,
};

EventSystem.prototype.$EventObject = {};


EventSystem.prototype.__event_system_add_listener = function(eventName, eventCallback, eventWeight){
    /**
     * @todo should make arguments handling more flexible. So it would be possible
     * to ignore eventGroupKey totally when using addEventListener() and use it
     * as eventCallback instead
     */

    if( this.__event_exists(eventName) )
    {
        if( !this.events_listening['root'].hasOwnProperty(eventName) )
            this.events_listening['root'][eventName] = [];

        this.events_listening['root'][eventName].push({
            name : eventName,
            weight : eventWeight,
            callback : eventCallback,
        })
    }
    return false;
}

EventSystem.prototype.__event_system_register = function(eventName){
    if(!this.__event_exists(eventName))
    {
        if( !this.events_list['root'].hasOwnProperty(eventName) )
            this.events_list['root'][eventName] = { name : eventName,
                callback : null, };
    }
}


EventSystem.prototype.__event_system_fetch_by_event_name = function(eventName){
    if(!this.__event_exists(eventName))
    {
        return false;
    }
    else
    {
        return this.events_listening['root'][eventName];
    }
}


EventSystem.prototype.__event_exists = function(eventName){
    try {
        if(!this.events_list['root'].hasOwnProperty(eventName))
        {
            return false;
        }
        else
        {
            return true;
        }

    }
    catch(e)
    {
        console.warn(e.message);
    }
}


/**
 *
 * @param eventObject
 * @returns {*}
 * @private
 */
EventSystem.prototype.__check_prevention_state = function(eventObject){
    try {
        if(typeof eventObject !== 'object' )
        {
            return false;
        }

        if( eventObject.isDefaultPrevented() )
        {
            if(eventObject.hasOwnProperty('result'))
            {
                return eventObject.result;
            }
            else
            {
                if( this.config.prevention_type == 2 ) // STRICT
                {
                    //this.ErrorHandler.show("STRICT", "Event", 101)@todo must create an error handler
                    console.error("Event's default is prevented but no event.result is defined which results in NULL return value. You can change this behavior through event prevention's parameters.");
                    return false;
                }
                else if(this.config.prevention_type == 2) // NORMAL
                {
                    // nothing
                }
            }
        }
        return -1;
    }
    catch(e)
    {
        console.warn(e.message);
        return false;
    }
}

