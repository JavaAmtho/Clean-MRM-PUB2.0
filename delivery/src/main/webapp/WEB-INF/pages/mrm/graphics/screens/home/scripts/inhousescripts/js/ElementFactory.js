/**
 * @constructor
 */
function ElementFactory(){

}

/**
 *
 * @returns {DynaTree}
 */
ElementFactory.getTree = function(){
    return new DynaTree();
}

/**
 *
 * @returns {DynaLazyTree}
 */
ElementFactory.getLazyTree = function(){
    return new DynaLazyTree();
}

/**
 *
 * @returns {DropDownJS}
 */
ElementFactory.getDropDown = function(){
    return new DropDownJS();
}

/**
 *
 * @returns {GanttChart}
 */
ElementFactory.getGanttChart= function(){
    return new GanttChart();
}
