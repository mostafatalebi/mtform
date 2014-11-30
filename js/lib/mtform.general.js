/**
 General methods and properties used across all the other methods
 **/

mtFormInit.prototype.argsToAttrs = function(args){
    if(typeof args !== 'object')
        console.error("You have not passed an object as args. Function: argsToAttrs()");
    var attrsStr = " "; // declared with a space at the beginning
    this.forEach(args, function(element, key, isFirst, isLast){
        attrsStr += " " + key+'='+"'" + element + "' ";
        if(isLast == true) attrsStr += " ";
    });
    this.attrs = attrsStr;

    return this;
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

        callback(currentElement, currentKey, isFirstLoop, isLastLoop);

        if(this.isArrayOrObject(currentElement) !== false)
        {
            this.forEach(currentElement, function(element){
                callback(element);
            });
        }
    }
}

mtFormInit.prototype.getUniqueId = function(){
    var ui;
    ui = this.uniqueId;
    this.uniqueId++;
    return ui;
}

mtFormInit.prototype.addToRepo = function(elementType, elementId) {
    var newRepo = {
        type : elementType,
        id : elementId,
    }
}