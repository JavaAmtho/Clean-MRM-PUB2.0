/**
 *
 * @constructor
 */
function ElementFactory(){

}

/**
 *
 * @returns new DynaTree object
 */
ElementFactory.getTree = function(){
    return new DynaTree();
}

/**
 *
 * @returns new DynaLazyTree object
 */
ElementFactory.getLazyTree = function(){
    return new DynaLazyTree();
}

/**
 *
 * @returns new DropDownJS object
 */
ElementFactory.getDropDown = function(){
    return new DropDownJS();
}
