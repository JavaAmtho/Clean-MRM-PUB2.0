/**
 *
 * @constructor    GetViewStructure
 */
function GetViewStructure(){

}

/**
 *
 * @param schemaId
 * @description calls getSchema REST api using id
 */
GetViewStructure.get = function(schemaId){
    Router.loadRequest("getSchema",true,GetViewStructure.onViewStructureSuccess,schemaId);
}

/**
 *
 * @param data
 * @description callback for getViewStructure by id
 */
GetViewStructure.onViewStructureSuccess = function(data){
    GraphicDataStore.setCurrentSchema(data);
    GraphicDataStore.setSchemaLabel();
    //HomePresenter.clearList();
    $(document).trigger({
        type: "viewStructureLoaded",
        schemaData: GraphicDataStore.getSchemaArray(),
        schemaChanged: true
    });
    $(document).trigger({
        type: "TREE_ITEM_CLICKED",
        uiData: ""
    });
}

/**
 * @description calls getAllViewStructure REST api
 */
GetViewStructure.getAll = function(){
    Router.loadRequest("getAllSchema",true,GetViewStructure.onViewStructuresLoaded);
}

/**
 *
 * @param data
 * @description callBack for getAllViewStructure REST api
 */
GetViewStructure.onViewStructuresLoaded = function(data){
    GraphicDataStore.setSchemaArray(data);
    GraphicDataStore.setDefaultSchema();
    $(document).trigger({
        type: "viewStructureLoaded",
        schemaData: GraphicDataStore.getSchemaArray(),
        schemaChanged: false
    });

}