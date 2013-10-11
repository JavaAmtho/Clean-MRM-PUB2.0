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
 */
CreateDimensions.createDim = function (prefix, action, name, currentPath, flag, callBack) {

    var reqBody = new Object();
    //Commented since logic behind showing images for coverflow on Publication has been moved to the MRM

    //    if(action === "Publication"){
    //        var myArr = EngineDataStore.getPublicationDetailsArray();
    //        var item = myArr[Math.floor(Math.random()*myArr.length)];
    //        reqBody = item;
    //    }

    Router.forwardWithPost(prefix + action + "/name/" + name + "/path/" + currentPath + "/folder/" + flag, true, reqBody, function (data) {
        callBack(data);
    });
}

