/**
 * Define plugin as a property of $mtf
 * @type {{}}
 */
mtFormInit.prototype.plugin = {

    repo : [],

    /**
     * Creates a new plugin, register it in the system and
     * defines it as a Method of $mtf
     * @param configurations {Object}
     *        keys:
     *        method_name {String} [optional] if set, then it becomes the name
     *          of the method accessible via $mtf
     *
     *        dependencies {Array} [optional] list of all other plugin on which this
     *          plugin is dependent
     *
     *        core_version {String} [optional] the least version of $mtf required for
     *          this plugin
     */
    define : function(plugin_name, callback, configurations) {
        configurations = (typeof configurations !== "object" ) ? configurations : {};
        if (!$mtf.plugin.hasOwnProperty(plugin_name)) {
            $mtf.plugin.__add(plugin_name, callback, configurations);
        }
        else
        {
            console.warn("A plugin with the name "+plugin_name+" already exists.");
        }
    },

    /**
     * Checks to see if a certain pulugin is loaded
     * @param plugin_name
     * @returns {*}
     */
    loaded : function(plugin_name){
        return $mtf.plugin.__is_loaded(plugin_name);
    },


    __add : function(plugin_name, callback, configurations){
        var allow = false;
        if( typeof configurations.core_version === "string")
        {
            if($mtf.versionCompare(configurations.core_version, false ) === -1)
            {
                console.warn("Version incompatible for plugin "+plugin_name);
                return false;
            }
        }
        else if( typeof configurations.dependencies === "object")
        {
            for(var i = 0; i < configurations.dependencies.length; i++)
            {
                if(!this.__is_loaded(configurations.dependencies[i]))
                        console.warn("Plugin "+configurations.dependencies[i]+" must be loaded first("+plugin_name+").");
                        return false;
            }
        }

        var method = (configurations.method_name) ? configurations.method_name : plugin_name;
        this[method] = callback;
        return true;
    },

    __is_loaded : function(plugin_name)
    {
        return ($mtf.plugin.repo.hasOwnProperty(plugin_name)) ? true : false;
    }
};
