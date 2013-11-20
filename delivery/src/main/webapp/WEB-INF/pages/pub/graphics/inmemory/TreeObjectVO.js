/**
 *
 * @constructor
 */
var TreeObjectVO = function(){

}

/**
 *
 * @type {{id: null, title: null, type: null, path: null, children: Array, isFolder: Function}}
 */
TreeObjectVO.prototype = {
    "id": "",
    "title": "",
    "type": "",
    "path": "",
    "children": [],
    "pageType":"",
    "renderEngineType":"",
    "fileID":"",

    /**
     *
     * @param type
     * @returns true if type equals page
     */
    "isFolder": function(type) {
        if(type == "Page"){
            return true;
        }
        else{
            return false;
        }
    }
};
