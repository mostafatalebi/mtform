/**
 * An Ajax plugin which supports both IE and non-IEs (Firefox, Chrome, Safari, Opera)
 * @param url string [optional] the url to which the request is sent
 * @param type string [optional] the type of the request.
 * @constructor
 */

var AjaxCall = function(config){
    this.request = null;

    this.params = {
        // HTTP method. POST, GET etc.
        type : (typeof config.type === null || typeof config.type === 'undefined') ? "POST" : config.type,

        // URL to which the request is sent
        url : (typeof config.url === null || typeof config.url === 'undefined') ? "" : config.url,

        // the data which is sent as part of request
        data : (typeof config.data === null || typeof config.data === 'undefined') ? {} : config.data,

        // a callback to process the data before sending. Using this, the default serialization would
        // be disabled for the interest of the custom function the user uses.
        dataProcess : (typeof config.dataProcess === null || typeof config.dataProcess === 'undefined') ? null : config.dataProcess(config.data),

        // Asynchronous or Synchronous
        async : (typeof config.async === null || typeof config.async === 'undefined') ? true : config.async,

        // callback to be called if the Response Code is 200
        success : (typeof config.success === null || typeof config.success === 'undefined') ? null : config.success,

        // callback to be called before the request is sent.
        beforeSend : (typeof config.beforeSend === null || typeof config.beforeSend === 'undefined') ? null : config.beforeSend,

        // callback to be called when the request is in process
        loading : (typeof config.loading === null || typeof config.loading === 'undefined') ? null : config.loading,

        // callback to be called when the request is complete regardless of status code.
        complete : (typeof config.complete === null || typeof config.complete === 'undefined') ? null : config.complete,

        // callback to be called when the request completes with error code.
        error : (typeof config.error === null || typeof config.error === 'undefined') ? null : config.error,

        // an object accepting the header name and value. Any value added to the object
        // would override the default '*-urlencoded' header.
        headers : (typeof config.headers === null || typeof config.headers === 'undefined') ? {'Content-type' : "application/x-www-form-urlencoded"} : config.headers,

        // expectation from response headers
        responseHeaders : (typeof config.responseHeaders === null || typeof config.responseHeaders === 'undefined') ? null : config.responseHeaders,

        // the response type
        responseType : (typeof config.responseType === null || typeof config.responseType === 'undefined') ? "text" : config.responseType,

        // caching behaviors. "no-cache" is the default value.
        cache : (typeof config.cache === null || typeof config.cache === 'undefined') ? "no-cache" : config.cache
    }

    // creating the request object compatible with the browser
    this.request = this.__createRequestObject();
    return this;
}

AjaxCall.prototype.setParams = function(params){
        this.params = params;
    return this;
}

AjaxCall.prototype.send = function(){
    var data = this.__understandData(this.params.data);
    var request = this.request;
    // open the request
    request.open(this.params.type, this.params.url, this.params.async);

    // set the headers
    this.__setHeaders(this.params.headers);

    // set the responseType
    if(typeof this.params.responseType !== null || typeof this.params.responseType !== 'undefined')
        this.request.responseType = this.params.responseType;



    var current_ajax_instance = this;
    request.onreadystatechange = function ( ) {
        current_ajax_instance.__responseCallback(request, request.readyState, request.status);
    }

    request.send(data);
    return this;
}



AjaxCall.prototype.beforeSend = function(callback){
    this.params.beforeSend = callback;
}

AjaxCall.prototype.loading = function(callback){
    this.params.loading = callback;
}

AjaxCall.prototype.complete = function(callback){
    this.params.complete = callback;
}

AjaxCall.prototype.success = function(callback){
    this.params.success = callback;
}

AjaxCall.prototype.error = function(callback){
    this.params.error = callback;
}


//==== PRIVATE FUNCTIONS ====\\

/**
 * Creates a new XMLHttpRequest Object
 * @returns {*}
 * @private
 */
AjaxCall.prototype.__createRequestObject = function(){
    // this block is copied from firefox MDN Documentation
    // https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
    // Step 3 of the documentation
    var http_request;
    if (window.XMLHttpRequest)
    { // Mozilla, Safari, ...
        http_request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
            }
        }
    }
    return http_request;
}


AjaxCall.prototype.__serializeData = function(data){
    var result = "";

    var obj_length = Object.keys(data);
    for( var i = 0; i < obj_length.length; i++)
    {
        if( i == 0) result += obj_length[i] + "=" + encodeURIComponent(data[obj_length[i]]) + "&";
        else if( i == obj_length.length ) result += "&" + encodeURIComponent(obj_length[i]) + "=" + encodeURIComponent(data[obj_length[i]]);
        else result += obj_length[i] + "=" + encodeURIComponent(data[obj_length[i]]) + "&";
    }

    return result;
}

AjaxCall.prototype.__understandData = function(data){


    if(typeof this.params.dataProcess === 'function')
    {
        return this.params.dataProcess(data);
    }
    else
    {
        return this.__serializeData(data);
    }

}

AjaxCall.prototype.__processResponse = function(){
    if(this.params.responseType == 'json' || this.params.responseType == 'JSON')
        return this.request.response;
    else if( this.params.responseType == 'text')
        return this.request.responseText;
}

AjaxCall.prototype.__setHeaders = function(headers){

    var obj_length = Object.keys(headers);
    for( var i = 0; i < obj_length.length; i++)
    {
        this.request.setRequestHeader(obj_length[i], headers[obj_length[i]]);
    }
}

AjaxCall.prototype.__responseCallback = function(request, readyState, status){
        if( readyState == 4)
        {
            // complete() function
            if(typeof this.params.complete === 'function' )
                this.params.complete(this.__processResponse());

            if(status == 200) // success
            {
                if(typeof this.params.success === 'function' )
                    this.params.success(this.__processResponse());
            }
            else
            {
                if(typeof this.params.error === 'function' )
                    this.params.error(this.request.status, this.request.getAllResponseHeaders());
            }
        }
        else
        {
            if(typeof this.params.loading === 'function' )
                this.params.loading();
        }


}