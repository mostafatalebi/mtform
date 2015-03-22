var MT_Theme = function(templates, placeholders){

    /**
     *  An object similiar to $mtf default templates object which
     *  holds templates for each component based on the current theme
     *  For instance, when bootstrap3 theme is used, it changes the templates
     *  markup to bootstrap 3.
     *  @type {Object}
     */
    this.templates = {};


    /**
     * This object holds the default templates of mtform,
     * it is used to reset the theme back to its default
     * @type {Object}
     */
    this.templatesDefault = {};
};


MT_Theme.prototype.getTemplate = function(repo, component_name){
    return this[repo][component_name];
}

/**
 * Adds a new theme. This theme then can be used as a method of $mtf globally.
 * @param theme_name {String} the name of the theme
 * @param templates_collection {Object} an duplicate version of $mtf templates object which is changed
 *                                      in its content for the new theme. But the general structure follows
 *                                      the same patterns. For instance it must include all the necessary
 *                                      placeholders.
 */
MT_Theme.prototype.addTheme = function(theme_name, templates_collection){
    this.templates[ theme_name ] = templates_collection;
}

MT_Theme.prototype.setTheme = function(theme_name){
    $mtf.templatesFormComponents = this.templates[ theme_name ];
}
