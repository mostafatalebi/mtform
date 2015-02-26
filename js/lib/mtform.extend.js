/**
 * An array for the name of extra modules registered
 * @type {Array}
 */
mtFormInit.prototype.plugins = [];

/**
 * It adds a new module to the system. Throws an error if the plugin with the same name
 * is already registered. The registered plugin has access to all core properties and methods.
 * @param name string the name of the plugin
 * @param callback a functionality of the plugin.
 */
mtFormInit.prototype.extends = function(name, callback){
    var new_plugin = { name : callback };
    this.plugins.push(new_plugin);
    this[name] = callback;
}