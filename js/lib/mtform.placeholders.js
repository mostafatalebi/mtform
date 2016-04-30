mtFormInit.prototype.placeholders = new function(){};
/**
 * Gets the default value for the placeholder based on a language
 * @param ph_name String the name of the placeholder
 * @param ph_name String the name of the group of placeholders
 * @param language_code String [optional]  the language code Default= framework's default
 * @returns {*}
 */
mtFormInit.prototype.placeholders_get_default = function(ph_name, key, language_code)
{
    key = (typeof key !== "string") ? "basic" : key;
    language_code = (typeof language_code !== "string") ? this.language_fetch() : language_code;
    var g = this.placeholders_storage;
    // to avoid undefined error on the condition following this
    if( !this.placeholders_storage.hasOwnProperty(language_code) )
        this.placeholders_storage[language_code] = {};
    if( !this.placeholders_storage[language_code].hasOwnProperty(key) )
        this.placeholders_storage[language_code][key] = {};


    if(this.placeholders_storage[language_code][key].hasOwnProperty(ph_name))
    {
        return this.placeholders_storage[language_code][key][ph_name];
    }
    else
    {
        return "";
    }
}

mtFormInit.prototype.placeholders_set_default = function(ph_name, value, key, language_code)
{
    key = (typeof key !== "string") ? "basic" : key;
    language_code = (typeof language_code !== "string") ? this.language_fetch() : language_code;

    // to avoid undefined error on the condition following this
    if( !this.placeholders_storage.hasOwnProperty(language_code) )
        this.placeholders_storage[language_code] = {};
    if( !this.placeholders_storage[language_code].hasOwnProperty(key) )
        this.placeholders_storage[language_code][key] = {};

    if(this.placeholders_storage[language_code][key].hasOwnProperty(ph_name))
    {
        this.placeholders_storage[language_code][key][ph_name] = value;
    }

    return value;
}

mtFormInit.prototype.placeholders_create_group = function(key, language_code)
{
    key = (typeof key !== "string") ? "basic" : key;
    language_code = (typeof language_code !== "string") ? this.language_fetch() : language_code;

    // to avoid undefined error on the condition following this
    if( !this.placeholders_storage.hasOwnProperty(language_code) )
        this.placeholders_storage[language_code] = {};
    if( !this.placeholders_storage[language_code].hasOwnProperty(key) )
        this.placeholders_storage[language_code][key] = {};
    return true;
}

mtFormInit.prototype.placeholders_get_group = function(key, language_code)
{
    key = (typeof key !== "string") ? "basic" : key;
    language_code = (typeof language_code !== "string") ? this.language_fetch() : language_code;

    // to avoid undefined error on the condition following this
    if( !this.placeholders_storage.hasOwnProperty(language_code) )
        this.placeholders_storage[language_code] = {};
    if( !this.placeholders_storage[language_code].hasOwnProperty(key) )
        this.placeholders_storage[language_code][key] = {};

    return this.placeholders_storage[language_code][key];
}

mtFormInit.prototype.placeholders_clear_group = function(key, language_code)
{
    key = (typeof key !== "string") ? "basic" : key;
    language_code = (typeof language_code !== "string") ? this.language_fetch() : language_code;

    // to avoid undefined error on the condition following this
    if( !this.placeholders_storage.hasOwnProperty(language_code) )
        return true;
    if( this.placeholders_storage[language_code].hasOwnProperty(key) )
        this.placeholders_storage[language_code][key] = {};

    return true;
}