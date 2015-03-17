

/**
 * It adds a new module to the system. Throws an error if the plugin with the same name
 * is already registered. The registered plugin has access to all core properties and methods.
 * @param name string the name of the plugin
 * @param callback a functionality of the plugin.
 */
mtFormInit.prototype.extends = function( name, callback ){
    var new_plugin = { name : callback };
    this.plugins.push(new_plugin);
    mtFormInit.prototype[name] = callback;
}


mtFormInit.prototype.defineExport = function( name, exportFunction ){
    var new_plugin = { name : "", callback : null };
    new_plugin.name = name;
    new_plugin.callback = exportFunction;
    this.exports.push(new_plugin);
}


mtFormInit.prototype.defineImport = function( name, importFunction ){
    var new_plugin = { name : importFunction };
    this.imports.push(new_plugin);
}

mtFormInit.prototype.defineReset = function( name, resetFunction ){
    var new_plugin = { name : resetFunction };
    this.resets.push(new_plugin);
}