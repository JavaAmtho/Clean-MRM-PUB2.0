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
                if(dropdownObj){
                    var dropdown = ElementFactory.getDropDown();
                    dropdown.createDropDown(dropdownObj,data);
                }
            }
        });
        DropDownPresenter.getAllViewStructure();
    }

}

/**
 *
 * @returns {DropDownPresenter}
 */
DropDownPresenter.getInstance = function(){
    return new DropDownPresenter();
}

/**
 *
 * @param structId
 * @description calls GetViewStructure interactor's getAll method
 */
DropDownPresenter.getAllViewStructure = function(structId){
    GetViewStructure.getAll();
}

/**
 *
 * @param structId
 * @description calls GetViewStructure interactor's getViewStructureById method
 */
DropDownPresenter.getViewStructureById = function(structId){
    GetViewStructure.get(structId);
}
