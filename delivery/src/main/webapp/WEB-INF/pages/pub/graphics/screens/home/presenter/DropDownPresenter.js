/**
 *
 * @constructor
 */
var DropDownPresenter = function(){

    this.design = function(id)
    {
        $(document).bind("viewStructureLoaded", function onSchemaLoadedHandler(e){
            if(!e.schemaChanged){
                var data = e.schemaData;
                var dropdownObj = document.getElementById(id);
                var dropdown = ElementFactory.getDropDown();
                dropdown.createDropDown(dropdownObj,data);
            }
        });
        DropDownPresenter.getAllViewStructure();
    }

}

/**
 *
 * @returns new DropDownPresenter object
 */
DropDownPresenter.getInstance = function(){
    return new DropDownPresenter();
}

/**
 *
 * @param structId
 */
DropDownPresenter.getAllViewStructure = function(structId){
    GetViewStructure.getAll();
}

/**
 *
 * @param structId
 */
DropDownPresenter.getViewStructureById = function(structId){
    GetViewStructure.get(structId);
}














/*$('#selectLbl').text("Select View");
  $('#schemaDropDown').hide();
  $('#mainAnimationContainer').animate({height: actualHeight}, 500);*/


