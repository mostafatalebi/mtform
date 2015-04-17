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
            var obj_len = Object.keys(args);
            for( var i = 0; i < obj_len.length; i++ )
            {
                var element = args[obj_len[i]];
                var key = obj_len[i];
                var isLast = false;
                if( i == obj_len.length) isLast = true;
                if(parseValues == true)
                    element = this.parsePossiblePh(element);
                if((typeof key != 'undefined' && typeof key !== null) &&
                    (typeof element != 'undefined' && typeof element !== null))
                    attrsStr += " " + key+'='+"'" + element + "' ";
                if(isLast == true) attrsStr += " ";
            }

            /*this.forEach(args, function(element, key, isFirst, isLast){
                if(parseValues == true)
                    element = this.parsePossiblePh(element);
                if((typeof key != 'undefined' && typeof key !== null) &&
                    (typeof element != 'undefined' && typeof element !== null))
                        attrsStr += " " + key+'='+"'" + element + "' ";
                if(isLast == true) attrsStr += " ";
            });*/

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
    if( typeof obj !== 'object' ) return false; // Skipped.
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

mtFormInit.prototype.is_string = function(input) {
    return (typeof input === 'string') ? true : false;
}

mtFormInit.prototype.is_empty = function(input) {
    return (typeof input === 'undefined' || typeof input === null) ? true : false;
}

mtFormInit.prototype.is_normal = function(input) {
    return (typeof input !== 'function' && typeof input !== 'object') ? true : false;
}

mtFormInit.prototype.is_form_component = function(element){
    return (this.form_components_names.indexOf( element.tagName.toLowerCase() ) !== -1 )
            ? true : false;
}

/**
 * returns the length of the passed object
 * @param input {object} an object whose length is to be returned.
 * @returns {boolean|integer}
 */
mtFormInit.prototype.objectLength = function(input) {
    if(input)
        return (this.isArrayOrObject(input) == 'array') ? input.length : Object.keys(input).length;
    else
        return false;
}

/**
 * Joins two arrays but does not keep duplicated keys and only keeps one of them. The one which is
 * kept belongs to the arr1
 * @param arr1 first array
 * @param arr2 second array
 * @returns {*} a new array as joined version of arr1 and arr2
 */
mtFormInit.prototype.joinArraysUnique = function(arr1, arr2)
{
    var new_arr = [];
    var arr_len = (arr1.length > arr2.length) ? arr1.length : arr2.length;

    // ensure that loop operation is not futile
    if ( (typeof arr1 !== 'object' || typeof arr2 !== 'object') || (arr1.length === 0 || arr2.length === 0) )
    {
        return ( (typeof arr1 === 'object' && arr1.length !== 0 ) ) ? arr1 : arr2;
    }

    for(var i = 0; i < arr_len; i++)
    {
        if( i < arr1.length && new_arr.indexOf(arr1[i]) == -1 )
        {
            new_arr.push(arr1[i]);
        }
        if( i < arr2.length && new_arr.indexOf(arr2[i]) == -1 )
        {
            new_arr.push(arr2[i]);
        }
    }
    return new_arr;
}

/**
 * Joins two objects and returns a new joined object.
 * @param obj1 first object
 * @param obj2 second object
 * @returns {*} new object as joined version of object1 and object2
 */
mtFormInit.prototype.joinObjects = function(obj1, obj2)
{
    var new_arr = {};
    var obj1_keys = Object.keys(obj1);
    var obj2_keys = Object.keys(obj2);

    var obj_len = 0;

    if(obj1_keys.length > obj2_keys.length)
    {
        obj_len = obj1_keys.length;
    }
    else
    {
        obj_len = obj2_keys.length;
    }

    // ensure that loop operation is not futile
    if ( (typeof obj1 !== 'object' || typeof obj2 !== 'object') || (obj1.length === 0 || obj2.length === 0) )
    {
        return ( (typeof obj1 === 'object' && obj1.length !== 0 ) ) ? obj1 : obj2;
    }

    for(var i = 0; i < obj_len; i++)
    {
        if( i < obj1_keys.length )
        {
            new_arr[obj1_keys[i]] = obj1[obj1_keys[i]];
        }
        if( i < obj2_keys.length )
        {
            new_arr[obj2_keys[i]] = obj2[obj2_keys[i]];
        }
    }


    return new_arr;
}


/**
 * This function handles the argument list of form-component-create functions in a very flexible and special
 * way allowing different ways of passing arguments to the functions (e.g Input() ).
 * The function accepts a name, a value and an object holding unlimited key&value pairs for tag's attributes.
 * There is a last 'condition' param which specifies how to treat the arguments and specifically how to treat
 * 'innerValue'; because innerValue behaves as 'value' attribute for most of tags, but for some tags such as
 * textarea or button it acts as 'innerHTML'. The flexible part is that allows several types of argument-passing
 * schemes. We set Input() as our example. Input('name', 'value', { 'data-href' : 'http://google.com'}) is the primary
 * and most comprehensive way of calling that function. But arguments can be dropped for the interest of other arguments.
 * The function can also be called like Input("name", { 'data-href' : 'http://google.com'}). Dropping value since it might
 * not be needed. Or, it might be called Input( { 'data-href' : 'http://google.com'} ). Just passing attributes object.
 * Indeed the only necessary param is args object, because 'name' and 'value' params are just shortcuts which gets merged
 * eventually with args object, and if no args object is passed, the function declares one on the fly.
 * @param name {string|object} the name of the form component to be created
 * @param innerValue {string|object} the default value of the form component to be created
 * @param args {object} an object holding key&value pairs for attributes of the form component to be created
 * @param condition a keyword specifying how to treat arguments. Default values: "value", "innerValue", "form"
 * @returns {{args: {}, innerValue: string}} an object processing the final object to be passed to the mapper function.
 */
mtFormInit.prototype.handleCreateFunctionArguments = function( name, innerValue, args, condition ){
    var final = { args : {}, innerValue : "" };

    if( condition == 'innerValue' ) // means it is not a self-closing tag
    {
        if( typeof args !== 'object' && typeof args !== 'string' ) args = {}; // ensuring the type to be set to object
        if( typeof name === "string" ) // name is not passed (?directly maybe)
        {
            if( typeof innerValue === 'string' )// user has passed function ( 'name', "" ) {}
            {
                if( typeof args === 'object' ) // user has passed function ( 'name', "value", {} ) {}
                {
                    final.args = args;
                }

                final.innerValue = innerValue;
            }
            else if( typeof innerValue === 'object' ) // user has passed function ( 'name', {} ) {}
            {
                final.args = innerValue;
            }

            final.args.name = name;
        }
        else if( typeof name === 'object' ) // user has passed function ( {} ) {}
        {
            final.args = name;
        }
    }
    else if ( condition == 'value' ) // it is a self closing tag
    {
        if( typeof args !== 'object' && typeof args !== 'string' ) args = {}; // ensuring the type to be set to object
        if( typeof name === "string" ) // name is not passed (?directly maybe)
        {
            if( typeof innerValue === 'string' )// user has passed function ( 'name', "" ) {}
            {
                if( typeof args === 'object' ) // user has passed function ( 'name', "value", {} ) {}
                {
                    final.args = args;
                }

                final.args.value = innerValue;
            }
            else if( typeof innerValue === 'object' ) // user has passed function ( 'name', {} ) {}
            {
                final.args = innerValue;
            }


            final.args.name = name;
        }
        else if( typeof name === 'object' ) // user has passed function ( {} ) {}
        {
            final.args = name;
        }
    }
    else if( condition == 'form' )
    {
        if( typeof args !== 'object' && typeof args !== 'string' ) args = {}; // ensuring the type to be set to object
        if( typeof name === "string" ) // name is not passed (?directly maybe)
        {
            if( typeof innerValue == 'object')
            {
                final.args = innerValue;
            }

            final.args.name = name;
        }
        else if( typeof name === 'object' ) // user has passed function ( {} ) {}
        {
            final.args = name;
        }
    }


    return final;
}

mtFormInit.prototype.handleCreateRadioArguments = function( name, args ) {
    var final = { attrs : {}, args : "" };
    if( typeof args !== 'object' ) args = {}; // ensuring the type to be set to object
    if( typeof name === "string" )
    {
        if( typeof args === 'object' ) // user has passed function ( 'name', {} ) {}
        {
            if(args.attrs)
            {
                args.attrs.name = name;
            }
            else
            {
                args.attrs = { "name" :  name };
            }
            final.attrs = args.attrs;
            final.args = args;
        }
        else
        {
            final.attrs['name'] = name;
        }

    }
    else if( typeof name === 'object' ) // user has passed function ( {} ) {}
    {
        final.attrs = name.attrs;
        final.args = name;
    }

    return final;
}


mtFormInit.prototype.objectJoinWithFormData = function( object, formData ) {
    var obj_keys = Object.keys( object );
    for(var i = 0; i < obj_keys.length; i++ )
    {
        __( obj_keys[i] );
        __( object[ obj_keys[i] ] );
        formData.append( obj_keys[i], object[ obj_keys[i] ]);
    }

    return formData;
}

