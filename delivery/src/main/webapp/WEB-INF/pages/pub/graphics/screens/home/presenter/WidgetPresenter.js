/**
 * Created with JetBrains WebStorm.
 * User: CS13
 * Date: 13/11/13
 * Time: 8:06 PM
 * To change this template use File | Settings | File Templates.
 */
var WidgetPresenter = function(){

}

WidgetPresenter.createWidgetForNewPage = function(type,data){
    if(type == "BreadCrumb"){
        var breadCrumbWidget = ElementFactory.getNewPageBreadCrumbWidget();
        breadCrumbWidget.design(data);
    }
}