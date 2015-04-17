/**
 * Sets current default language
 * @param lang_name {String} the name of the language.
 */
mtFormInit.prototype.setLang = function(lang_name){
    this.lang = lang_name;
    return this;
}


/**
 * Gets current default language.
 * @param lang_name {String} the name of the language
 * @returns {string}
 */
mtFormInit.prototype.getLang = function(lang_name){
    return this.lang;
}