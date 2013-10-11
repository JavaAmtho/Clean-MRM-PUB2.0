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
 */
TreePresenter.createDimension = function(prefix,action,name,currentPath,flag,callBack){
    CreateDimensions.createDim(prefix,action,name,currentPath,flag,callBack);
}

/**
 *
 * @param prefix
 * @param name
 * @param oldPath
 * @param flag
 * @param newPath
 * @param callBack
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
 */
TreePresenter.dragAndDropAssortment = function(prefix,name,newPath,callBack){
    var jsonData = {};
    var columnName = "products";
    jsonData[columnName] = GraphicDataStore.getProdcutsArr();
    CopyAssortment.dragAndDropAssortment(prefix,name,newPath,jsonData,callBack);
}
