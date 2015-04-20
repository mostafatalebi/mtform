mtFormInit.prototype.E = function(element)
{
    this.Element = element;
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
            if(html)
                $mtf.Element.innerHTML = html;
            else
                return $mtf.Element.innerHTML;
        }

    }
}