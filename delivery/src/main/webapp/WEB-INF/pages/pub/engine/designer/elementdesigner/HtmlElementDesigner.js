/**
 * Created with JetBrains WebStorm.
 * User: CS13
 * Date: 11/8/13
 * Time: 2:03 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * @constructor
 */
function HtmlElementDesigner(){

}

/**
 *
 * @param id
 * @param scriptName
 * @param screenName
 */
HtmlElementDesigner.design = function(id,scriptName,screenName){
    var htmlElement = this.getElementBy(id);
    var className = scriptName;
    var scriptName = this.getScriptName(scriptName,screenName);
    $.getScript(scriptName,function(){
        var ref = eval(className+".getInstance()");
        ref.design(id);
    })
}

/**
 *
 * @param id
 * @returns element by ID
 */
HtmlElementDesigner.getElementBy = function(id){
    return  document.getElementById(id);
}

/**
 *
 * @param scriptName
 * @param screenName
 * @returns complete URL of particular js script
 */
HtmlElementDesigner.getScriptName = function(scriptName,screenName){
    var name = EngineDataStore.getBaseURL()+"graphics/screens/"+screenName+"/presenter/"+scriptName+".js";
    return name;
}