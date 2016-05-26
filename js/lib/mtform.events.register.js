/**
 * @type event
 * @target NULL
 * @desc On MTForm intialization
 */
$mtf.Event.Register("onInit");

/**
 * @type event
 * @target
 * On calling the template parser
 */
$mtf.Event.Register("onTemplateParsing");

/**
 * @type event
 * @target the container element
 * On calling the getContainer()
 */
$mtf.Event.Register("onContainerGet");

/**
 * @type event
 * @target [component_type String, args Object, secondaryArgs Object|NULL]
 * On before creating a certain component.
 */
$mtf.Event.Register("onComponentBeforeCreate");

/**
 * @type event
 * @target [component_type String, args Object, secondaryArgs Object|NULL, component_last_info Object]
 * On after creating a certain component.
 */
$mtf.Event.Register("onComponentAfterCreate");

/**
 * @type event
 * @target String the key which is the name of the template to be fetched
 * On fetching a certain template
 */
$mtf.Event.Register("onTemplateBeforeFetch");
/**
 * @type event
 * @target String the key which is the name of the template to be fetched
 * On fetching a certain template
 */
$mtf.Event.Register("onTemplateProcess");