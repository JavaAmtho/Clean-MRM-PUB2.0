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
                        var listData = [];
                        for(var i=0; i <node.data.children.length; i++){
                            if(node.data.children[i].isLazy === false){
                                listData.push(node.data.children[i])
                            }
                        }
                        AssetTreePresenter.createAssetsListWithData(listData)
                },
                onLazyRead: function(node){
                    AssetTreePresenter.getLazyNodes(node.data.id,function(data){
                        if(data.length != 0){
                            var treeData = [];
                            var listData = [];
                            for(var i=0; i <data.length; i++){
                                if(data[i].isLazy === true){
                                    //Create tree data
                                    treeData.push(data[i])
                                }else{
                                    //Create list data
                                    listData.push(data[i])
                                }
                            }
                            node.addChild(treeData);    //Just adding tree data as to show only folders in tree
                            node.data.children = data;  //Adding whole data in data of node as on activate need to show leaf as well
                            if(treeData.length<1){
                                node.childList = [];
                                node.render();
                            }

                            AssetTreePresenter.createAssetsListWithData(listData);
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