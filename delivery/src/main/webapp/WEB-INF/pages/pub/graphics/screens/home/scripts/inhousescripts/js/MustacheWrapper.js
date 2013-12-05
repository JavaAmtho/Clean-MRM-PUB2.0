/**
 *
 * @constructor
 */
function MustacheWrapper(){

}

/**
 *
 * @param templateURL
 * @param templateData
 * @param callBack
 * @description creates the mustache ui but this is a wrapper method and doesn't contain actual implementation
 */
MustacheWrapper.createUI = function(templateURL, templateData, callBack){
    var str = "";
    if(templateURL == "")
        return;

    $(document).load(templateURL, function(templateStr){

        var tpl = templateStr;

        str = Mustache.to_html(tpl, templateData);
        str = str.replace(/&#x2F;/g, "/");

        callBack(str);
    });
}