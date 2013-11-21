/**
 *
 * @constructor  AssetTreePresenter
 */
var AssetTreePresenter = function(){

}

var currentPanelId;
var btnSelectionFlag = 0;

/**
 *
 * @param btnId
 * @description creates a tree object instance
 */
AssetTreePresenter.createTree = function (btnId) {
    GetAssetsTree.get(btnId,function(data){
        if(data == "error"){
            data=[];
        }
        var treeObj = document.getElementById("assetsTree");
        var assetsLazyTree = ElementFactory.getLazyTree();
        assetsLazyTree.createTree(treeObj,data);
    });
}

/**
 *
 * @param evt
 * @description slides the panel and displays PIM/MAM tree as per the PIM/MAM button pressed
 */
AssetTreePresenter.slidePanel = function (evt) {
    currentPanelId = evt.currentTarget.id;

    var btnId = evt.currentTarget.id;
    if (btnSelectionFlag == 0) {
        $("#panel").css('display','block')
        $("#typeHolder").html(evt.currentTarget.name);
        $("#panel").animate({right: '30px'}, "slow", function () {
            AssetTreePresenter.createTree(btnId);
        });
        btnSelectionFlag = 1;
    }
    else if (btnSelectionFlag == 1 && ($("#typeHolder").html() == evt.currentTarget.name)) {
        $("#panel").animate({right: '-200px'}, "slow");
        setTimeout(function() {
            $("#panel").css('display','none')

        }, 500);
        AssetTreePresenter.reset();
        btnSelectionFlag = 0;
    }
    else {
        $("#typeHolder").html(evt.currentTarget.name);
        AssetTreePresenter.createTree(btnId);
    }
    AssetTreePresenter.changeSelectedBtn(evt.currentTarget.id);
}

/**
 *
 * @param btnId
 * @description changes css of pressed or selected button PIM/MAM
 */
AssetTreePresenter.changeSelectedBtn = function (btnId) {
    AssetTreePresenter.reset();
    var urls;
    if (btnId == "btnPIM") {
        urls = EngineDataStore.getBaseURL() + "graphics/screens/home/images/icons/PIMb.png";
    }
    if (btnId == "btnMAM") {
        urls = EngineDataStore.getBaseURL() + "graphics/screens/home/images/icons/MAMb.png";
    }
    if (btnId == "btnMIM") {
        urls = EngineDataStore.getBaseURL() + "graphics/screens/home/images/icons/MIMb.png";
    }
    $('#' + btnId).css("background-image", 'url("' + urls + '")');
}

/**
 *   @description resets the css for all PIM/MAM buttons as unclicked
 */
AssetTreePresenter.reset = function () {
    $("#btnMIM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/MIM.png)");
    $("#btnPIM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/PIM.png)");
    $("#btnMAM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/MAM.png)");
}

AssetTreePresenter.getLazyNodes = function(id,callBack){
     GetAssetsTree.getAssetsById(currentPanelId,id,callBack);
}

/**
 *
 * @param e
 * @description calls interactor to search the assets with the entered key in input
 */
AssetTreePresenter.searchList = function (e) {
    if (e.keyCode == 13) {
        if (currentPanelId == "btnPIM") {
            SearchPimAsset.search(e.currentTarget.value, HomePresenter.populateAssetsList);
        }
        if (currentPanelId == "btnMAM") {
            SearchMamAsset.search(e.currentTarget.value, HomePresenter.populateAssetsList);
        }
    }
}
