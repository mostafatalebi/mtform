function EventSystem() {};
/**
 * List of Events Group, each containing its own events
 * @type {{}}
 */
EventSystem.prototype.events_list = {};

EventSystem.prototype.events_listening = {};


EventSystem.prototype.__event_system_add_listener = function(eventName, eventGroupKey, eventCallback, eventWeight){
    if( this.__event_exists(eventName, eventGroupKey) )
    {
        if( !this.events_listening.hasOwnProperty(eventGroupKey) )
            this.events_listening[eventGroupKey] = {};
        if( !this.events_listening[eventGroupKey].hasOwnProperty(eventName) )
            this.events_listening[eventGroupKey][eventName] = [];

        this.events_listening[eventGroupKey][eventName].push({
            name : eventName,
            weight : eventWeight,
            callback : eventCallback,
            group : eventGroupKey,
        })
    }
    return false;
}

EventSystem.prototype.__event_system_register = function(eventName, eventGroupKey){
    eventGroupKey = (typeof eventGroupKey != 'string' ) ? "basic" : eventGroupKey;
    if(!this.events_list.hasOwnProperty(eventGroupKey))
    {
        if(!this.__event_exists(eventName, eventGroupKey))
        {
            if( !this.events_list.hasOwnProperty(eventGroupKey) )
                this.events_list[eventGroupKey] = {};
            if( !this.events_list[eventGroupKey].hasOwnProperty(eventName) )
                this.events_list[eventGroupKey][eventName] = { name : eventName, group : eventGroupKey, callback : null, };
        }
    }
}


EventSystem.prototype.__event_system_fetch_by_event_name = function(eventName, eventGroupKey){
    if(typeof eventGroupKey != 'string' || typeof eventName !== 'string')
    {
        return false;
    }
    if(!this.__event_exists(eventName, eventGroupKey))
    {
        return false;
    }
    if(this.events_listening.hasOwnProperty(eventGroupKey))
    {
        return this.events_listening[eventGroupKey][eventName];
    }
    else
    {
        return false;
    }
}


EventSystem.prototype.__event_system_fetch_by_group_name = function(eventGroupKey){
    if(typeof eventGroupKey != 'string' )
    {
        return false;
    }
    if(this.events_list.hasOwnProperty(eventGroupKey))
    {
        if( !this.events_list.hasOwnProperty(eventGroupKey) )
            return false;
        else
            return this.events_list[eventGroupKey];
    }
    else
    {
        return false;
    }
}

EventSystem.prototype.__event_group_exists = function(eventGroupKey){
    if(typeof eventGroupKey != 'string' )
    {
        return false;
    }

    try {
        if(!this.events_list.hasOwnProperty(eventGroupKey))
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

    }
}
EventSystem.prototype.__event_exists = function(eventName, eventGroupKey){
    eventGroupKey = (typeof eventGroupKey != 'string' ) ? "basic" : eventGroupKey;

    try {
        if(!this.events_list.hasOwnProperty(eventGroupKey))
        {
            return false;
        }
        else if(!this.events_list[eventGroupKey].hasOwnProperty(eventName))
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

    }
}

