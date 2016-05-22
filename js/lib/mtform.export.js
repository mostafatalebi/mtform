

var mtFormExportAPI = function(){};

mtFormExportAPI.prototype.ExportSystem = new ExportSystem();

/**
 * Adds an export registry
 * @param exportData Object|Array|String|Integer|Double the raw data to be exported
 * @param exportKey String the name of the export item
 * @param exportGroup String the group to which export belongs. Useful for third-party modules.
 * @param forceOverride Boolean If true, then it does not check if an export item with the same key and group exists or not,
 *                      and if one exists, it overrides that.
 * @reference Uses EventSystem API
 * @constructor
 */
mtFormExportAPI.prototype.Add = function(exportData, exportKey, exportGroup, forceOverride){
    var Arguments = {
        "exportData" : exportData,
        "exportKey" : exportKey,
        "exportGroup" : exportGroup,
        "forceOverride" : forceOverride,
    };

    var eventObject = new EventObject({ target : Arguments, type : 'onExportAdd'});
    /**
     * @Event onExportAdd
     * @target Object
     * @type onInit
     */
    eventObject = $mtf.Event.dispatchEvent("onExportAdd", eventObject);


    return this.ExportSystem.EntryRegister(exportData, exportKey, exportGroup, forceOverride);
}

/**
 * Does the same as Add() function, but first checks to see if the entry is added,
 * and if yes, skips the operation.
 * @param exportData Object|Array|String|Integer|Double
 * @param exportKey String
 * @param exportGroup String
 * @constructor
 */
mtFormExportAPI.prototype.AddIfNotExists = function(exportData, exportKey, exportGroup){
    return this.ExportSystem.EntryRegister(exportData, exportKey, exportGroup, 0);
}

/**
 * Returns the final version of all exports data
 * @param exportGroupName String [optional] if passed, the the returned object is limited to the group
 * @param exportKey String [optional] Should only be used if exportGroupName is specified. Limits the
 *                                         returned output to a key of a group.
 * @constructor
 */
mtFormExportAPI.prototype.Output = function(exportGroupName, exportKey){
    var result = null;
    if(typeof exportGroupName == 'string')
    {
        if(typeof exportKey == 'string')
        {
            result = this.ExportSystem.__export_get_entry(exportKey, exportGroupName);
        }
        else
        {
            result = this.ExportSystem.__export_get_all_entries(exportGroupName);
        }
    }
    else
    {
        result =  this.ExportSystem.__export_get_all_entries();
    }

    var eventObject = new EventObject({ target : result, type : 'onExportOutput'});
    /**
     * @Event onExportOutput
     * @target Object
     * @type onInit
     */
    eventObject = $mtf.Event.dispatchEvent("onExportOutput", eventObject);

    return eventObject.target;
}

mtFormInit.prototype.Export = new mtFormExportAPI();