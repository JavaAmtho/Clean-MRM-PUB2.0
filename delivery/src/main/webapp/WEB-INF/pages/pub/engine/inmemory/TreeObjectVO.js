/**
 *
 * @constructor
 */
var TreeObjectVO = function(){

}

/**
 *
 * @type {{id: null, title: null, type: null, path: null, children: null, isFolder: Function}}
 */
TreeObjectVO.prototype = {
    "id": "",
    "title": "",
    "type": "",
    "path": "",
    "children": [],

    /**
     *
     * @param type
     * @returns true if type is page, else false
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
