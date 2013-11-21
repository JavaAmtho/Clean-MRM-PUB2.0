var assetTreeExists;

/**
 *
 * @constructor
 */
var DynaLazyTree = function(){
    this.createTree = function(treeObj,data){
        if(assetTreeExists != null){
            assetTreeExists.removeChildren();
            assetTreeExists.addChild(data);
        }else{
            $(treeObj).dynatree({
                children : data,
                onActivate: function(node) {
                    if(node.data.children)
                    HomePresenter.populateAssetsList(node.data.children[0])
                },
                onLazyRead: function(node){
                    AssetTreePresenter.getLazyNodes(node.data.id,function(data){
                        if(data.length != 0){
                            node.addChild(data);
                            node.data.children = data;
                            HomePresenter.populateAssetsList(data);
                        }
                        else{
                            node.childList = [];
                            node.render();
                        }
                    });
                }
            });
            assetTreeExists = $(treeObj).dynatree("getRoot");
        }
    }
};