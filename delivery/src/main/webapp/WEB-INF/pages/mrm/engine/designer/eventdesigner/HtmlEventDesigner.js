/**
 * Created by Rohan H. Dani
 * User: CS13
 * Date: 11/8/13
 * Time: 2:04 PM
 * Created for Events mapping.
 */

/**
 *
 * @constructor
 */
function HtmlEventDesigner(){

}

/**
 *
 * @param id
 * @param event
 * @param func
 * @param flag
 * @description adds events to the particular dom element
 */
HtmlEventDesigner.addEvents = function(id,event,func,flag){
    var htmlElement = this.getElementBy(id);
    htmlElement.addEventListener(event,func,flag);
}

/**
 *
 * @param id
 * @returns element by ID
 * @description gets the particular dom element
 */
HtmlEventDesigner.getElementBy = function(id){
    return  document.getElementById(id);
}