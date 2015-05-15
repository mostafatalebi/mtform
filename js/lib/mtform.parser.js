mtFormInit.prototype.__understandInput = function(input, callback){

    var new_result = [];
    if (typeof input !== "object" && typeof input !== "function")
    {
        return callback(input);
    }
    else if (typeof input === 'object')
    {
        var nestedIterator = 0;
        // the advantage of using this built-in iterator-function
        // is that it works seamlessly for both Object and Array
        this.forEach(input, function(item){
            new_result.push(callback(item));
        });
        // return the whole result
        return new_result;
    }
    else if (typeof input === 'function')
    {
        var possible_result = callback(input());
        if(possible_result === 'object')
        {
            new_result.concat(possible_result);
        }
        else
        {
            new_result.push(possible_result);
        }
        return new_result;
    }
}
