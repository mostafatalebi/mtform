/**
@type Plugin
@name Theme
@author Mostafa Talebi
@description this plugin manages themes per component for final render. It can also manages theme per set.
@version 0.0.1
**/

$mtf.extends("Theme", function(){
	var theme = new MT_Theme();
    $mtf.$lives.Theme = theme;
    return $mtf;
});


