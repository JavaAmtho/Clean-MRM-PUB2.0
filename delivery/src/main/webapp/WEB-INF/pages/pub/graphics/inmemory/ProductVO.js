/**
 *
 * @constructor
 */
var ProductVO = function(){

}

/**
 *
 * @type {{id: null, title: null, type: null, path: null, children: Array, isFolder: Function}}
 */
ProductVO.prototype = {
    "id": "",
    "title": "",
    "type": "",
    "path": "",
    "children": [],

    /**
     *
     * @param type
     * @returns true if type equals page else false
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
