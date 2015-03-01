if( typeof window.$MTF_Valid_Rules !== "object" )
{
    window.$MTF_Valid_Rules_Names = [];
    window.$MTF_Valid_Rules_Methods = [];
}

window.$MTF_Valid_Rules_Names.push("number");
window.$MTF_Valid_Rules_Methods.push(function(number){
        return /^[0-9]*$/.test(number);
});
