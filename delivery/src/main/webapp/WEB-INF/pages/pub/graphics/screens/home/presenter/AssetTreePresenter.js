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
    GetAssetsTree.get(btnId,AssetTreePresenter.getPageTemplates);
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

AssetTreePresenter.getPageTemplates = function(data){
    if(data == "error"){
        data=[];
    }
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
    var treeObj = document.getElementById("assetsTree");
    var assetsLazyTree = ElementFactory.getLazyTree();
    assetsLazyTree.createTree(treeObj,treeData);
    AssetTreePresenter.loadTemplates();
    AssetTreePresenter.createAssetsListWithData(listData);
}

AssetTreePresenter.loadTemplates = function(){
    if(!GraphicDataStore.templateLoaded){
        GetPageTemplates.getAll(AssetTreePresenter.onTemplatesLoaded);
    }

}

AssetTreePresenter.onTemplatesLoaded = function(data){
    GraphicDataStore.setPageTemplates(data);
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
    $("#btnMIM").css("background-image", "url("+ EngineDataStore.getBaseURL() + "graphics/screens/home/images/icons/MIM.png)");
    $("#btnPIM").css("background-image", "url("+ EngineDataStore.getBaseURL() + "graphics/screens/home/images/icons/PIM.png)");
    $("#btnMAM").css("background-image", "url("+ EngineDataStore.getBaseURL() + "graphics/screens/home/images/icons/MAM.png)");
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
            SearchPimAsset.search(e.currentTarget.value, AssetTreePresenter.createAssetsListWithData);
        }
        if (currentPanelId == "btnMAM") {
            SearchMamAsset.search(e.currentTarget.value, AssetTreePresenter.createAssetsListWithData);
        }
    }
}

var assetsDataSource;
var productsDataSource;

AssetTreePresenter.createAssetsListWithData = function(assetdata){
       assetsDataSource = new kendo.data.DataSource({
           data: assetdata
       });

       $("#assetDetails").kendoListView({
           dataSource: assetsDataSource,
           template: '<div class="tags move k-block"> <img src="#:image#"/>' +
               '<div class="labelRenderCSS">#:label#</div></div>'
       });

       if(myCount==0){
         myCount++;
         AssetTreePresenter.makeAssetsListDraggable();
       }
}

/**
 *
 * @param rendererData
 * @description shows the assortment panel and hides the mustache div
 */
AssetTreePresenter.showAssortmentPanel = function (rendererData) {

    AssetTreePresenter.unHideAssortPanel();
    GraphicDataStore.setProdcutsArr(rendererData);

    productsDataSource = new kendo.data.DataSource({
        data: rendererData
    });

    $("#subtab1").kendoListView({
        dataSource: productsDataSource,
        template: '<div class="tags k-block"> <img src="#:image#"/> ' +
            '<div class="labelRenderCSS">Product Name: #:label#</div>' +
            '<div class="rendererTemplateCSS">Product Template: #:rendererTemplateName#</div>' +
            '<img id="#:label#" src="../../../graphics/screens/home/images/_close.png" class="removeProductBtn" onclick="removeProduct(this.id)"/></div>'
    });
    AssetTreePresenter.makeProductsListDropable();
}

function removeProduct(nameOfProduct){
    for(var i=0; i< productsDataSource._data.length; i++){
        if(nameOfProduct == productsDataSource._data[i].label){
            productsDataSource._data.remove(productsDataSource._data[i]);
        }
    }
}

AssetTreePresenter.makeAssetsListDraggable = function(){
    $("#assetDetails").kendoDraggable({
        filter: ".move",
        hint: function (element) {
            return element.clone();
        }
    });
}

var myCount=0;

AssetTreePresenter.makeProductsListDropable = function(){
    $("#subtab1").kendoDropTarget({
        dragenter: function (e) {
            console.log(e.draggable.hint)
            $("#subtab1").css('border', '2px solid #000');
            e.draggable.hint.css("opacity", 0.6);
        },
        dragleave: function (e) {
            e.draggable.hint.css("opacity", 1);
        },
        drop: function (e) {
            var item = assetsDataSource.getByUid(e.draggable.hint.data().uid);
            var dropDownObj = document.getElementById("templateDropDown");
            item.rendererTemplateId = "NA";
            item.rendererTemplateName = "NA";
            if(!dropDownObj.disabled)
                item.rendererTemplateId = $("#templateDropDown option:selected").attr("id");
                item.rendererTemplateName = $("#templateDropDown option:selected").val();
            productsDataSource.add(item);
            $("#subtab1").css('border', '2px dashed #aaa');
            //unmappedtag_datasource.remove(item);
        }
    });
}

/**
 * @description unHides assortment panel
 */
AssetTreePresenter.unHideAssortPanel = function () {
    $("#dim").hide();
    $("#assortPanel").show();
}

/**
 * @description creates the products json object and calls interactor to update the assortment
 */
AssetTreePresenter.createProductsJSON = function () {
    var jsonData = {};
    var columnName = "products";
    //jsonData[columnName] = GraphicDataStore.getProdcutsArr();
    jsonData[columnName] = productsDataSource._data;
    var columnName = "id";
    jsonData[columnName] = GraphicDataStore.getCurrentAssortment().id;
    UpdateAssortment.update(GraphicDataStore.getCurrentAssortment(), jsonData, AssetTreePresenter.hideAssortPanel);
    $(document).trigger({
        type: "expandParentNode",
        currentId: GraphicDataStore.getCurrentAssortment().title,
        productsColl:  productsDataSource._data
    });
}

AssetTreePresenter.enableTemplatesDropdown = function(pageRendererType){
    var dropDownObj = document.getElementById("templateDropDown");
    if(pageRendererType){
        dropDownObj.disabled = false;
        AssetTreePresenter.loadTemplates();
        var dataProvider = GraphicDataStore.getPageTemplates(pageRendererType);
        $("#templateDropDown option").remove();
        for(var i=0; i< dataProvider.length; i ++){
            var opt = document.createElement('option');
            opt.id = dataProvider[i].templateId;
            opt.value = dataProvider[i].templateName;
            opt.innerHTML = dataProvider[i].templateName;
            dropDownObj.appendChild(opt);
        }
    }else{
        dropDownObj.disabled = true;
    }
}

/**
 *  @description hides assortment panel and shows mustache div
 */
AssetTreePresenter.hideAssortPanel = function () {
    $('#assortPanel').hide();
    $('#dim').show();
}