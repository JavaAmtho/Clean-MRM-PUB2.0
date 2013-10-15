/**
 * Created with JetBrains WebStorm.
 * User: CS13
 * Date: 11/8/13
 * Time: 2:03 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * @constructor     HtmlElementDesigner
 */
function HtmlElementDesigner(){

}

/**
 *
 * @param id
 * @param scriptName
 * @param screenName
 * @description loads the script mentioned for particular elements and then calls the design method of it
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
 * @description gets the particular dom element
 */
HtmlElementDesigner.getElementBy = function(id){
    return  document.getElementById(id);
}

/**
 *
 * @param scriptName
 * @param screenName
 * @returns path of particular script as a string
 * @description gets the particular script
 */
HtmlElementDesigner.getScriptName = function(scriptName,screenName){
    var name = EngineDataStore.getBaseURL()+"graphics/screens/"+screenName+"/presenter/"+scriptName+".js";
    return name;
}