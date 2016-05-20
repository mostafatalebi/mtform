function ExportSystem() {};
ExportSystem.prototype.export_data = {};

/**
 *
 * @param exportData
 * @param exportKey
 * @param exportGroupName
 * @param forceOverride
 * @private
 */
ExportSystem.prototype.__register_export_entry = function(exportData, exportKey, exportGroupName, forceOverride){
    exportGroupName = (typeof exportGroupName != 'string' ) ? "basic" : exportGroupName;
    if( !this.export_data.hasOwnProperty(exportGroupName) )
        this.export_data[exportGroupName] = {};
    if(forceOverride)
    {
        this.export_data[exportGroupName][exportKey] = this.__export_data_encode(exportData);
    }
    else if( !this.export_data[exportGroupName].hasOwnProperty(exportKey) )
    {
        this.export_data[exportGroupName][exportKey] = this.__export_data_encode(exportData);
    }
}

ExportSystem.prototype.__export_get_entry = function(exportKey, exportGroupName){
    if( this.__export_entry_exists(exportKey, exportGroupName))
    {
        return this.export_data[exportGroupName][exportKey];
    }
    return false;
}

ExportSystem.prototype.__export_get_all_entries = function(exportGroupName){
    if( this.export_data.hasOwnProperty(exportGroupName) )
    {
        return this.export_data[exportGroupName]
    }
    else
    {
        return this.export_data;
    }
}

ExportSystem.prototype.__export_entry_exists = function(exportKey, exportGroupName){
    try {
        if(!this.export_data.hasOwnProperty(exportGroupName))
        {
            return false;
        }
        else if(!this.export_data[exportGroupName].hasOwnProperty(exportKey))
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    catch(e)
    {

    }
}


ExportSystem.prototype.__export_data_encode = function(data){
    try
    {
        var content = JSON.stringify(data);
        return content;
    }
    catch(e)
    {
        console.warn(e.message);
    }

}

ExportSystem.prototype.__export_data_decode = function(data){
    try
    {
        var content = JSON.parse(data);
        return content;
    }
    catch(e)
    {
        console.warn(e.message);
    }

}