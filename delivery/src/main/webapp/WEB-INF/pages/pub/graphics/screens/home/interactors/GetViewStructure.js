/**
 *
 * @constructor
 */
function GetViewStructure(){

}

/**
 *
 * @param schemaId
 * @description calls REST api to get viewStructure as per id
 */
GetViewStructure.get = function(schemaId){
    Router.loadRequest("getSchema",true,GetViewStructure.onViewStructureSuccess,schemaId);
}

/**
 *
 * @param data
 */
GetViewStructure.onViewStructureSuccess = function(data){
    GraphicDataStore.setCurrentSchema(data);
    GraphicDataStore.setSchemaLabel();
    HomePresenter.clearList();
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
 * function getAll
 * @description calls REST api to get all viewStructures
 */
GetViewStructure.getAll = function(){
    Router.loadRequest("getAllSchema",true,GetViewStructure.onViewStructuresLoaded);
}

/**
 *
 * @param data
 */
GetViewStructure.onViewStructuresLoaded = function(data){
    data=eval('(' + data + ')');
    GraphicDataStore.setSchemaArray(data);
    GraphicDataStore.setDefaultSchema();
    GraphicDataStore.setSchemaLabel();
    $(document).trigger({
        type: "viewStructureLoaded",
        schemaData: GraphicDataStore.getSchemaArray(),
        schemaChanged: false
    });

}