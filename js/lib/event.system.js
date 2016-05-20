function EventSystem() {};
/**
 * List of Events Group, each containing its own events
 * @type {{}}
 */
EventSystem.prototype.events_list = {'root' : {}};

EventSystem.prototype.events_listening = {'root':{}};


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

