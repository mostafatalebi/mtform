mtFormInit.prototype.E = function(element)
{
    this.Element = (typeof element === "string" ) ?
        document.querySelector(element) : element;
    return {
        /**
         * gets the attribute "name" of the element
         * @returns {string}
         */
        getName : function(){
            return $mtf.Element.getAttribute("name");
        },
        /**
         * Both a setter and a getter function
         * gets the value of the attribute whose name is passed, if value is passed too, then its sets the
         * value of that attribute.
         * @param name
         * @param value
         * @returns {*}
         * @constructor
         */
        Attr : function(name, value){
            if(value)
            {
                return $mtf.Element.setAttribute(name, value);
            }
            else
            {
                return $mtf.Element.getAttribute(name);
            }
        },
        /**
         *
         * @returns {string}
         * @constructor
         */
        Value : function(){
            return $mtf.Element.value;
        },

        HTML : function(html){
            console.log($mtf.Element.tagName.toLowerCase());
            if($mtf.Element.tagName.toLowerCase() == 'span' && typeof html !== "undefined" )
            {
                $mtf.Element.innerHTML = "";
                $mtf.Element.appendChild(document.createTextNode(html));
            }
            else if(html)
            {
                $mtf.Element.innerHTML = html;
            }
            else {
                return $mtf.Element.innerHTML;
            }
        },

        /**
         * Checks an element's type and then returns its content either by returning value attribute
         * or innerHTML attribute.
         * @param no_innerHTML {Boolean} [optional] default=false if set, then textarea and button tags are also
         *                                          treated like normal input and their value property would be
         *                                          returned.
         * @returns {*}
         */
        findAndGetContent : function(no_innerHTML){
            var element = $mtf.Element;
            var tag_name = element.tagName.toLowerCase();
            element = ( typeof element === 'string' ) ? document.querySelector(element) : element;

            if( $mtf.form_components_names.indexOf(tag_name) != -1 )
            {
                if(tag_name == 'textarea' || tag_name == 'button')
                {
                    return element.innerHTML;
                }
                else
                {
                    return element.value;
                }
            }
            else
            {
                return element.innerHTML;
            }

        }

    }
}