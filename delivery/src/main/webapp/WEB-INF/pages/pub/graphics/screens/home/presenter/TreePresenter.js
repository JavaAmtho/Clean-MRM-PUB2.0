/**
 *
 * @constructor
 */
var TreePresenter = function(){

    this.design = function(id)
    {
        var treeData;

        $(document).bind("viewStructureLoaded", function onSchemaLoadedHandler(e){
            //This is to create folder as per first element of the current schema
            treeData = {};
            treeData = {
                "id" : "-1" ,"type": 'root',
                "title" : GraphicDataStore.getFirstDimension(),
                "isFolder" : "true",
                children:[]
            };
            $(document).bind("treeDataLoaded", function onSchemaLoadedHandler(e){
                if(e.treeData != "error"){
                    treeData.children = e.treeData;
                }
                var treeObj = document.getElementById(id);
                var darkTree = ElementFactory.getTree();
                darkTree.createTree(treeObj,treeData);
                $(document).unbind("treeDataLoaded");
            });
            TreePresenter.getTree();
        });

    }
}

/**
 *
 * @returns new TreePresenter object
 */
TreePresenter.getInstance = function(){
    return new TreePresenter();
}

/**
 * function getTree
 * @description calls GetTree interactor to get tree as per selected viewStructure id
 */
TreePresenter.getTree = function(){
    GetTree.get();
}

/**
 *
 * @param prefix
 * @param action
 * @param name
 * @param currentPath
 * @param flag
 * @param callBack
 * @description calls CreateDimensions to create new Dimension
 */
TreePresenter.createDimension = function(prefix,action,name,currentPath,flag,callBack){
    CreateDimensions.createDim(prefix,action,name,currentPath,flag,callBack);
}

/**
 *
 * @param prefix
 * @param action
 * @param name
 * @param currentPath
 * @param flag
 * @param callBack
 * @description calls CreateDimensions to create new Page
 */
TreePresenter.createPage = function(prefix,action,name,currentPath,flag,pageObj,callBack){
    CreateDimensions.createPage(prefix,action,name,currentPath,flag,pageObj,callBack);
}


/**
 *
 * @param prefix
 * @param name
 * @param oldPath
 * @param flag
 * @param newPath
 * @param callBack
 * @description calls DragDimension interactor dragAndDropDimensions
 */
TreePresenter.dragAndDropDimensions = function(prefix,name,oldPath,flag,newPath,callBack){
    DragDimension.dragAndDropDimensions(prefix,name,oldPath,flag,newPath,callBack);
}

/**
 *
 * @param prefix
 * @param action
 * @param name
 * @param currentPath
 * @param flag
 * @param callBack
 * @description calls CreateAssortment interactor to create new Assortment
 */
TreePresenter.createAssortment = function(prefix,action,name,currentPath,flag,callBack){
    CreateAssortment.create(prefix,action,name,currentPath,flag,callBack);
}

/**
 *
 * @param prefix
 * @param name
 * @param newPath
 * @param callBack
 * @description calls CopyAssortment interactor to dragAndDropAssortment
 */
TreePresenter.dragAndDropAssortment = function(prefix,name,newPath,callBack){
    var jsonData = {};
    var columnName = "products";
    jsonData[columnName] = GraphicDataStore.getProdcutsArr();
    CopyAssortment.dragAndDropAssortment(prefix,name,newPath,jsonData,callBack);
}

/**
 *
 * @param prefix
 * @param type
 * @param input
 * @param callback
 * @description calls DeleteDimension interactor
 */
TreePresenter.deleteDimension = function(prefix,type,input,callback){
    DeleteDimension.deleteDim(prefix,type,input,callback);
}