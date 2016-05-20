
EventSystem.prototype.Register = function(eventName){
    return this.__event_system_register(eventName);
}

EventSystem.prototype.Exists = function(eventName ){
    return this.__event_exists(eventName);
}

EventSystem.prototype.addEventListener = function(eventName, eventCallback, eventWeight) {
    this.__event_system_add_listener(eventName, eventCallback, eventWeight)
}

EventSystem.prototype.dispatchEvent = function(eventName, eventObject) {
    if( this.__event_exists(eventName) )
    {
        var events = this.__event_system_fetch_by_event_name(eventName);
        var keys = Object.keys(events);

        for(var eventItr = 0; (eventItr < keys.length); eventItr++)
        {
            /* if(!eventObject.allowBubble())*/
            //{
                var callback = events[keys[eventItr]];
                callback.callback(eventObject);
            //}
        }
        if(eventObject.isDefaultPrevented())
        {
            /**
             * @todo we should devise some mechanism to utilize this return false. Because it would be of
             * no use if preventDefault() allow the normal execution flow of an event.
             */
            return false;
        }
        return eventObject;
    }
}