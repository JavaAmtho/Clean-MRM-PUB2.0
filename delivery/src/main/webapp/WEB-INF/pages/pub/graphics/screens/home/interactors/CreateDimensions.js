/**
 *
 * @constructor
 */
function CreateDimensions() {

}

/**
 *
 * @param prefix
 * @param action
 * @param name
 * @param currentPath
 * @param flag
 * @param callBack
 * @description calls REST api for creating a dimension object and returns the same object on success else returns empty object
 */
CreateDimensions.createDim = function (prefix, action, name, currentPath, flag, callBack) {
    var reqBody = new Object();
    Router.forwardWithPost(prefix + action + "/name/" + name + "/path/" + currentPath + "/folder/" + flag, true, reqBody, function (data) {
        callBack(data);
    });
}


/**
 *
 * @param prefix
 * @param action
 * @param name
 * @param currentPath
 * @param flag
 * @param callBack
 * @description calls REST api for creating a dimension object and returns the same object on success else returns empty object
 */
CreateDimensions.createPage = function (prefix, action, name, currentPath, flag, pageObj, callBack) {
    var reqBody = pageObj;
    Router.forwardWithPost(prefix + action + "/name/" + name + "/path/" + currentPath + "/folder/" + flag, true, reqBody, function (data) {
        callBack(data);
    });
}

