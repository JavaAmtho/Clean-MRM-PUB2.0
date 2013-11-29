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
UpdateEditorUrl.updateUrl = function(pageId,editorUrl,mamFileId,callback){
    var body = {};
    body["pageId"] = pageId;
    body["mamFileId"] = mamFileId;
    body["editorUrl"] = editorUrl;
    Router.loadPhpPostRequest("updateEditorUrl",true,pageId,body,callback);
}

