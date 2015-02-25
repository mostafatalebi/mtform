/**
 General methods and properties used across all the other methods
 **/

mtFormInit.prototype.argsToAttrs = function(args, scope_of_usage, parseValues){
    parseValues = (typeof  parseValues === 'undefined' || typeof  parseValues === null)
        ? false : parseValues;
    scope_of_usage = (typeof  scope_of_usage === 'undefined' || typeof  scope_of_usage === null)
        ? "global" : scope_of_usage;
    var attrsStr = " "; // declared with a space at the beginning
    if(typeof args !== 'object')
        // this eliminates undefined="" result in the case that args is undefined
        return " ";

    else
    {
        if(args.length == 0)
        {
            return "";
        }
        else
        {

            this.forEach(args, function(element, key, isFirst, isLast){
                if(parseValues == true)
                    element = this.parsePossiblePh(element);
                if((typeof key != 'undefined' && typeof key !== null) &&
                    (typeof element != 'undefined' && typeof element !== null))
                        attrsStr += " " + key+'='+"'" + element + "' ";
                if(isLast == true) attrsStr += " ";
            });
            if(scope_of_usage == "global") this.attrs = attrsStr;
            return attrsStr;
        }
    }
}

mtFormInit.prototype.isArrayOrObject = function(inp)
{
    if(typeof inp !== 'object') return false;
    if( Object.prototype.toString.call( inp ) === '[object Array]' )
    {
        return "array";
    }
    else
    {
        return "object";
    }
}

mtFormInit.prototype.forEach = function(obj, callback)
{
    var len;
    var objectKeys;
    var i  = 0;
    if(this.isArrayOrObject(obj) === 'array')
    {
        len = obj.length;
        iterator = i;
    }
    else if(this.isArrayOrObject(obj) === 'object')
    {
        len = Object.keys(obj).length;

        objectKeys = Object.keys(obj);
    }

    var isFirstLoop = false;
    var isLastLoop = false;
    for(i = 0; i < len; i++)
    {
        var currentElement;
        var currentKey;
        if(i == 0) isFirstLoop = true;
        if(i == len) isLastLoop = true;

        if(this.isArrayOrObject(obj) === 'array')
        {
            currentElement = obj[i];
            currentKey = i;
        }
        else if(this.isArrayOrObject(obj) === 'object')
        {
            currentElement = obj[objectKeys[i]];
            currentKey = objectKeys[i];
        }
        if(typeof currentElement !== 'undefined' ||
            typeof currentElement !== null)
                callback(currentElement, currentKey, isFirstLoop, isLastLoop);

        if(this.isArrayOrObject(currentElement) !== false)
        {
            this.forEach(currentElement, function(element){
                callback(element);
            });
        }
    }
}


/**
 * Gets the placeholder for the provided key
 * @param key the key of the placeholder
 * @returns {*}
 */
mtFormInit.prototype.ph = function(key)
{
    return this.placeholders[key];
}

/**
 * Edits current placeholder
 * @param key the name of placeholder
 * @param value
 */
mtFormInit.prototype.setPh = function(key, value)
{
    this.placeholders[key] = value;
}


mtFormInit.prototype.addCollectionSequential = function(componentType, componentIndex)
{
    this.collectionSequential.push({ type : componentType, index : componentIndex });
}

mtFormInit.prototype.collectionSequentialLastIndex = function(componentType)
{
    if(typeof this.collections[componentType] === 'object')
    {
        return ( (this.collections[componentType].length) != 0)
            ? this.collections[componentType].length-1 : 0;
    }
}

/**
 * Traverses through all generated components, not by their type (since components are originally treated
 * by their types), but by the order of their appearance in the call-sequences.
 * @param collectionOriginal
 * @param collectionSequential
 * @returns {Array}
 */
mtFormInit.prototype.collectionIterateSequentially = function(collectionOriginal, collectionSequential){
    var new_collection = [];
    for(var i = 0; i < collectionSequential.length; i++)
    {
       // console.log(collectionSequential[i]);
        var component = collectionOriginal[collectionSequential[i].type][collectionSequential[i].index];
        new_collection.push(component);
    }
    return new_collection;
}

mtFormInit.prototype.LastComponent = function()
{
    var last_collection_info = this.componentLastInfo;
    return this.collections[last_collection_info.type][last_collection_info.index];
}

mtFormInit.prototype.FirstNode = function()
{
    var last_collection_info = this.collectionSequential[0];
    return this.collections[last_collection_info.type][last_collection_info.index];
}

mtFormInit.prototype.NthNode = function(index)
{
    var last_collection_info = this.collectionSequential[index];
    return this.collections[last_collection_info.type][last_collection_info.index];
}


mtFormInit.prototype.__getComponentsFromCollection = function(componentType){
    return this.collections[componentType];
};

mtFormInit.prototype.is_function = function(input) {
    return (typeof input === 'function') ? true : false;
}

mtFormInit.prototype.is_object = function(input) {
    return (typeof input === 'object') ? true : false;
}

mtFormInit.prototype.is_object = function(input) {
    return (typeof input === 'object') ? true : false;
}

mtFormInit.prototype.is_string = function(input) {
    return (typeof input === 'string') ? true : false;
}

mtFormInit.prototype.is_empty = function(input) {
    return (typeof input === 'undefined' || typeof input === null) ? true : false;
}

mtFormInit.prototype.is_normal = function(input) {
    return (typeof input !== 'function' && typeof input !== 'object') ? true : false;
}