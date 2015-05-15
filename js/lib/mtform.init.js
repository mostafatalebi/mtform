/**
 * Initializes an accessible global variable
 */
if(
    typeof window.$mtf === "undefined" ||
    typeof window.$mtf === null )
{
    window.$mtf = new mtFormInit();
}

