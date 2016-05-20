

/**
 * It adds a new module to the system. Throws an error if the plugin with the same name
 * is already registered. The registered plugin has access to all core properties and methods.
 * @param name string the name of the plugin
 * @param callback functionality of the plugin
 */
mtFormInit.prototype.extends = function( name, callback ){
    var new_plugin = { name : callback };
    this.plugins.push(new_plugin);
    if( !this.hasOwnProperty(name) )
        mtFormInit.prototype[name] = callback;
}

/**
 *
 * Defines a callback to be called on $mtd.Export()
 * @param name
 * @param exportFunction
 * @deprecated use Export service instead
 */
mtFormInit.prototype.exportDefine = function( name, exportFunction ){
    var new_plugin = { name : "", callback : null };
    new_plugin.name = name;
    new_plugin.callback = exportFunction;
    this.exports.push(new_plugin);
}

/**
 *
 * @param name
 * @param importFunction
 * @deprecated use Import module instead
 */
mtFormInit.prototype.importDefine = function( name, importFunction ){
    var new_plugin = { name : importFunction };
    this.imports.push(new_plugin);
}

/**
 *
 * @param name
 * @param resetFunction
 */
mtFormInit.prototype.resetDefine = function( name, resetFunction ){
    var new_plugin = { name : resetFunction };
    this.resets.push(new_plugin);
}

/**
 *
 * @param name
 * @returns {boolean}
 */
mtFormInit.prototype.pluginLoaded = function( name ){
    return $mtf.hasOwnProperty( name );
}