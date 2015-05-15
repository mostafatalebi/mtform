/**
@type Plugin
@name Theme
@author Mostafa Talebi
@description this plugin manages themes per component for final render. It can also manages theme per set.
@version 0.0.1
**/

$mtf.plugin.define("Theme", function(init_list){
    if( !$mtf.$lives.hasOwnProperty("Theme") )
    {
        $mtf.$lives["Theme"] = new MT_Theme();
    }
    return $mtf.$lives["Theme"];

}, { core_version : "0.0.1" } );



