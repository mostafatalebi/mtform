
EventSystem.prototype.Register = function(eventName, eventGroupKey){
    return this.__event_system_register(eventName, eventGroupKey);
}

EventSystem.prototype.Exists = function(eventName, eventGroupKey ){
    return this.__event_exists(eventName, eventGroupKey);
}

EventSystem.prototype.addEventListener = function(eventName, eventGroupName, eventWeight) {
    this.__event_system_add_listener(eventName, eventGroupName, eventWeight)
}

EventSystem.prototype.dispatchEvent = function(eventName, eventGroupName, eventObject) {
    if( this.__event_exists(eventName, eventGroupName) )
    {
        var events = this.__event_system_fetch_by_event_name(eventName, eventGroupName);
        var keys = Object.keys(events);

        for(var eventItr = 0; eventItr < keys.length; eventItr++)
        {
            var callback = events[keys[eventItr]];
            callback.callback(eventObject);
        }
    }
}