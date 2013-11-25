/**
 *
 * @constructor       UpdateDimension
 */
function UpdateEditorUrl(){

}

/**
 *
 * @param prefix
 * @param row
 * @param callBack
 */
UpdateEditorUrl.updateUrl = function(pageId,editorUrl,callback){
    var body = {};
    body["pageId"] = pageId;
    body["editorUrl"] = editorUrl;
    Router.loadPOSTRequest("updateEditorUrl",true,pageId,body,callback);
}

