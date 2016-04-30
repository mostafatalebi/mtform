/**
 * Sets current default language
 * @param lang_name {String} the name of the language.
 */
mtFormInit.prototype.language_set = function(lang_name){
    this.lang = lang_name;
    return this;
}


/**
 * Gets current default language.
 * @returns {string}
 */
mtFormInit.prototype.language_fetch = function(){
    return this.lang;
}

