/**
 *
 * @constructor HomePresenter
 */
function HomePresenter() {
}

var rendererData;
var btnSelectionFlag = 0;
var onTarget = false;
var $isotopeContainer;

var filters = {};

var pages = {};

/**
 *
 * @param evt
 * @description changes the view as per tile list and detail buttons clicked
 */
HomePresenter.handleViewChange = function (evt) {
    switch (evt.currentTarget.id) {
        case "tileView":
            HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/TileViewRenderer.html");
            HomePresenter.btnFocus(".tileBtnCSS");
            break;

        case "listView":
            HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/ListViewRenderer.html");
            HomePresenter.btnFocus(".listBtnCSS");
            break;

        case "detailView":
            HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/DetailViewRenderer.html");
            HomePresenter.btnFocus(".detailBtnCSS");
            break;
    }
}

/**
 * @description set each dimension as even or odd which assigns different colour to them
 */
HomePresenter.setEvenOddClassesToDimensions = function() {
    $isotopeContainer.find('.masterPage,.dimension,.chapter,.assortmentItem').each(function (key, value) {
        var $this = $(this),
            number = key + 1;
        if (number % 2 == 1) {
            $this.addClass('odd');
        }
        else {
            $this.addClass('even');
        }
    });
}

/**
 * @description if the node that is activated contains pages then set all the pages
 *              with their respective rules
 */
HomePresenter.setAllPageRulesOnActivateOfNode = function() {
    var $masterPages = $("#viewHolder").children('.masterPage');
    for (var i = 0; i < $masterPages.length; i++) {
        var pageRule = $masterPages[i].id;
        if (pageRule != null && pageRule.length > 0) {
            PagePresenter.setRules($masterPages[i]);
            //set the + button as displayed or hidden as per the rules data present
            var $thenChildren = $($masterPages[i]).children('.rule').children('.then').children('.thenChild');
            if ($thenChildren.length > 0) {
                if ($($masterPages[i]).children(".expand").css('display') == 'none') {
                    $($masterPages[i]).children(".expand").toggle();
                }
            }
        }
    }
}

/**
 * @description bind the filter buttons to a click event that performs the filtering operation
 */
HomePresenter.bindClickEventToFilterButtons = function() {
    $('.filter a').click(function () {

        var $this = $(this);
        // don't proceed if already selected
        if ($this.hasClass('calendarButtonPressed')) {
            return;
        }

        var $optionSet = $this.parents('.option-set');
        // change selected class
        $optionSet.find('.calendarButtonPressed').removeClass('calendarButtonPressed');
        $this.addClass('calendarButtonPressed');

        var group = $optionSet.attr('data-filter-group');
        filters[ group ] = $this.attr('data-filter-value');
        // convert object into array
        var bothRegions;
        var bothTgs;
        var isoFilters = [];
        for (var prop in filters) {
            if (filters[prop].indexOf("anyRegion") != -1)
                bothRegions = filters[prop].split(",");
            else if (filters[prop].indexOf("anyTargetGroup") != -1)
                bothTgs = filters[prop].split(",");
            isoFilters.push(filters[ prop ])
        }
        var selector;
        if (bothRegions != undefined && bothTgs != undefined) {
            selector = bothRegions[0] + bothTgs[1] + "," + bothRegions[1] + bothTgs[0] + "," + bothRegions[0] + bothTgs[0] + "," + bothRegions[1] + bothTgs[1];
        }
        else {
            selector = isoFilters.join('');
        }
        $isotopeContainer.isotope({ filter: selector });

        return false;
    });
}
/**
 *
 * @param evt
 * @param currentTemplateView
 * @description load all the view items under the activated node i.e. node that is clicked
 */
HomePresenter.loadViewItems = function (evt, currentTemplateView) {
    var pageIDs = [];
    var publicationPosition = GraphicDataStore.getPublicationPosition();
    $.each(evt.mydata, function (index, value) {
        var ref = value;
        if (ref != null) {
            var css = "";
            var stackcss = "";
            if (ref.type == "Page") {
                pageIDs.push(GraphicDataStore.getCurrentView() + "." + ref.title);
                css = "masterPage anyRegion anyTargetGroup";
                console.log("CSS : " + css);
                ref.typeCSS = css;
                ref.hiddenCSS = "";
                var splitPath = ref.path.split(",");
                GraphicDataStore.setCurrentPublication(splitPath[publicationPosition]);
            }
            else if(ref.type == "Chapter"){
                ref.typeCSS = "chapter";
                ref.hiddenCSS = 'hidden';
            }
            else if(ref.type == "Assortment"){
                ref.typeCSS = "assortmentItem";
                ref.hiddenCSS = 'hidden';
            }
            else {
                ref.typeCSS = "dimension";
                ref.hiddenCSS = 'hidden';
            }
            var pubImageList = EngineDataStore.getPublicationDetailsArray();
            if(pubImageList[ref.title]){
            	var config = pubImageList["Config"];
                ref.backgroundImageStyle = "background-image: url("+config.host+config.context+pubImageList[ref.title].imageURL+")";
                console.log(ref.backgroundImageStyle);
            }
        }

    });
    if(pageIDs.length > 0){
        pages["pageIDs"] = pageIDs;
        GetAllPageRules.get(pages,function(data){
            GraphicDataStore.addAllPageRules(data.listOfPageRules);
        });

    }

    MustacheWrapper.createUI(currentTemplateView, evt, function (currentViewStr) {


        $('#viewHolder').html(currentViewStr);

        //Set rules for all the master Pages

        if (pages.pageIDs != null && pages.pageIDs.length > 0) {
            HomePresenter.setAllPageRulesOnActivateOfNode();
        }


        if ($isotopeContainer) {
            $isotopeContainer.isotope('destroy');
        }


        $isotopeContainer = $('#viewHolder');

        HomePresenter.setEvenOddClassesToDimensions();

        $isotopeContainer.isotope();

        HomePresenter.bindClickEventToFilterButtons();



    });
}

var currentPanelId;

/**
 *
 * @param evt
 * @description slides the panel and displays PIM/MAM tree as per the PIM/MAM button pressed
 */
HomePresenter.slidePanel = function (evt) {
    currentPanelId = evt.currentTarget.id;

    var btnId = evt.currentTarget.id;
    if (btnSelectionFlag == 0) {
        $("#panel").css('display','block')
        $("#typeHolder").html(evt.currentTarget.name);
        $("#panel").animate({right: '30px'}, "slow", function () {
            HomePresenter.createTree(btnId);
        });
        btnSelectionFlag = 1;
    }
    else if (btnSelectionFlag == 1 && ($("#typeHolder").html() == evt.currentTarget.name)) {
        $("#panel").animate({right: '-200px'}, "slow");
        setTimeout(function() {
            $("#panel").css('display','none')

        }, 500);
        HomePresenter.reset();
        btnSelectionFlag = 0;
    }
    else {
        $("#typeHolder").html(evt.currentTarget.name);
        HomePresenter.createTree(btnId);
    }
    HomePresenter.changeSelectedBtn(evt.currentTarget.id);
}

/**
 * @description clears the contextmenu created on the fly for all types of dimensions in tree
 */
HomePresenter.clearList = function () {
    var contextMenusHolder = document.getElementById('menus');
    contextMenusHolder.innerHTML = "";
}

/**
 *
 * @param btn
 * @description changes the focus of selected button in between tile/list/detail
 */
HomePresenter.btnFocus = function (btn) {
    $('.tileBtnCSS').css("border", "0px");
    $('.listBtnCSS').css("border", "0px");
    $('.detailBtnCSS').css("border", "0px");
    $(btn).css("border", "1px solid black");
}

/**
 *
 * @param btnId
 * @description creates a tree object instance
 */
HomePresenter.createTree = function (btnId) {
    var urls;
    urls = EngineDataStore.getBaseURL() + EngineDataStore.getApiMappingObject()[btnId];

    var treeObj = document.getElementById("assetsTree");
    var darkTree = ElementFactory.getLazyTree();
    darkTree.createTree(treeObj, urls);
}

/**
 *   @description resets the css for all PIM/MAM buttons as unclicked
 */
HomePresenter.reset = function () {
    $("#btnMIM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/MIM.png)");
    $("#btnPIM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/PIM.png)");
    $("#btnMAM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/MAM.png)");
}

/**
 *
 * @param btnId
 * @description changes css of pressed or selected button PIM/MAM
 */
HomePresenter.changeSelectedBtn = function (btnId) {
    HomePresenter.reset();
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


$(document).bind("TREE_ITEM_CLICKED", function itemClickedHandler(e) {
    if (e.nodeType == "Assortment") {
        HomePresenter.showAssortmentPanel(e.uiData);
    } else {
        HomePresenter.hideAssortPanel();
        rendererData = {"mydata": e.uiData};
        HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/TileViewRenderer.html");
        HomePresenter.btnFocus(".tileBtnCSS");
    }

});

/**
 *
 * @param node
 * @returns {Array} of all children of the current node
 */
HomePresenter.getChildrenForSelectedNode = function (node) {

    var nodeDetails = [];
    for (var i = 0; i < node.data.children.length; i++) {
        var obj = new TreeObjectVO();
        obj.id = node.data.children[i].id;
        obj.title = node.data.children[i].title;
        obj.type = node.data.children[i].type;
        obj.path = node.data.children[i].path;
        obj.children = node.data.children[i].children;
        nodeDetails.push(obj);
    }
    return nodeDetails;
}

/**
 *
 * @param node
 * @returns {Array}    all products under the selected node
 */
HomePresenter.getProductsForSelectedNode = function (node) {

    var nodeDetails = [];
    for (var i = 0; i < node.data.products.length; i++) {
        var obj = new ProductVO();
        obj.id = node.data.products[i].id;
        obj.title = node.data.products[i].title;
        obj.type = node.data.products[i].type;
        obj.path = node.data.products[i].path;
        nodeDetails.push(obj);
    }
    return nodeDetails;
}

/**
 *
 * @param rendererData
 * @description shows the assortment panel and hides the mustache div
 */
HomePresenter.showAssortmentPanel = function (rendererData) {
    HomePresenter.unHideAssortPanel();
    GraphicDataStore.setProdcutsArr(rendererData);

    $('#subtab1').jqxListBox({ selectedIndex: 0, allowDrag: false, source: GraphicDataStore.getProdcutsArr(), itemHeight: 70, height: 500, width: '100%',
        renderer: function (index, label, value) {
            console.log(rendererData)
            var datarecord = rendererData[index];

            if (datarecord) {
                console.log("Inside IF==>" + index);
                var imgurl = datarecord.image;
                var img = '<img height="50" width="40" src="' + imgurl + '"/>';
                var table = '<table style="min-width: 130px; height: 70px"><tr><td style="width: 40px;" rowspan="1">' + img + '</td><td>' + datarecord.title + " " + '</td></tr></table>';
                return table;
            }

        }

    });
    $('#subtab1').jqxListBox('refresh');
}

/**
 *
 * @param data
 * @description shows list of assets under the node clicked in PIM/MAM tree
 */
HomePresenter.populateAssetsList = function (data) {
    //Converting the div into the jqwidget list with the renderer for that list
    $("#assetDetails").jqxListBox('beginUpdate');
    $("#assetDetails").jqxListBox({ source: data, autoItemsHeight: true, scrollBarSize: 15, height: '450px', displayMember: "title", valueMember: "description", width: 200, height: 250,
        renderer: function (index, label, value) {
            var datarecord = data[index];
            var imgurl = datarecord.image;
            var img = '<img height="30" width="40" src="' + imgurl + '"/>';
            var table = '<table class="assestsJQList" style="min-width: 130px;"><tr><td style="width: 40px;" rowspan="1">' + img + '</td><td>' + datarecord.title + '</td></tr></table>';
            return table;
        }
    });
    $("#assetDetails").jqxListBox('endUpdate');
    $('#assetDetails').jqxListBox('refresh');

    //This will say that the assets list item needs to be dragged and the drop taget will be assortment panels div
    $(".jqx-listitem-element").jqxDragDrop({ dropTarget: $('#subtab1'), revert: true });
    //This will add all the necessary events for d&d operation
    HomePresenter.addEventListeners();

}

/**
 *  @description adds all listeners for list in assortment panel like dragAccept onDrop etc
 */
HomePresenter.addEventListeners = function () {

    $('.jqx-listitem-element').bind('dropTargetEnter', function (event) {
        onTarget = true;
        $(event.args.target).css('border', '2px solid #000');
        $(this).jqxDragDrop('dropAction', 'none');
    });
    $('.jqx-listitem-element').bind('dropTargetLeave', function (event) {
        onTarget = false;
        $(event.args.target).css('border', '2px solid #aaa');
        $(this).jqxDragDrop('dropAction', 'copy');
    });

    //Drag End
    $('.jqx-listitem-element').bind('dragEnd', function (event) {

        var existingItems = $("#subtab1").jqxListBox('getItems');
        if (onTarget) {
            var exists = HomePresenter.productAlreadyExists(existingItems, event.args.actualData.title);
            /*alert(exists)
             if(!exists){
             /*$("#subtab1").jqxListBox('beginUpdate');*/
            GraphicDataStore.addProdcut(event.args.actualData);//Yet to decide what fields exactly needs to be added to this object
            $("#subtab1").jqxListBox('addItem', event.args.actualData);
            /* var source = $('#subtab1').jqxListBox('source');
             source.push(event.args.actualData)
             */
            /*$("#subtab1").jqxListBox('endUpdate');
             $('#subtab1').jqxListBox('refresh');*/
            $('#subtab1').css('border', '2px dashed #aaa');

            onTarget = false;
            /*}*/
        }

    });
    //Drag Start
    $('.jqx-listitem-element').bind('dragStart', function (event) {
        $('#subtab1').css('border', '2px solid #aaa');
        var items = $("#assetDetails").jqxListBox('getSelectedItems');
        $(this).jqxDragDrop('data', {
            actualData: items[0].originalItem
        });
    });
}

/**
 *
 * @param e
 * @description calls interactor to search the assets with the entered key in input
 */
HomePresenter.searchList = function (e) {
    console.log(e.currentTarget)
    if (e.keyCode == 13) {
        if (currentPanelId == "btnPIM") {
            SearchPimAsset.search(e.currentTarget.value, HomePresenter.populateAssetsList);
        }
        if (currentPanelId == "btnMAM") {
            SearchMamAsset.search(e.currentTarget.value, HomePresenter.populateAssetsList);
        }
    }
}

/**
 *
 * @param existingItems
 * @param newLabel
 * @returns {boolean}   checks if the same product already exists for the same assortment
 */
HomePresenter.productAlreadyExists = function (existingItems, newLabel) {
    if (existingItems) {
        for (var i = 0; i < existingItems.length; i++) {
            if (existingItems[i].title === newLabel) {
                return true
            }
        }
    }
    return false;
}

/**
 *  @description hides assortment panel and shows mustache div
 */
HomePresenter.hideAssortPanel = function () {
    $('#assortPanel').hide();
    $('#dim').show();
}

/**
 * @description creates the products json object and calls interactor to update the assortment
 */
HomePresenter.createProductsJSON = function () {
    var jsonData = {};
    var columnName = "products";
    jsonData[columnName] = GraphicDataStore.getProdcutsArr();
    var columnName = "id";
    jsonData[columnName] = GraphicDataStore.getCurrentAssortment().id;
    UpdateAssortment.update(GraphicDataStore.getCurrentAssortment(), jsonData, HomePresenter.hideAssortPanel);
    $(document).trigger({
        type: "expandParentNode",
        currentId: GraphicDataStore.getCurrentAssortment().title
    });
}

/**
 * @description unHides assortment panel
 */
HomePresenter.unHideAssortPanel = function () {
    $("#dim").hide();
    $("#assortPanel").show();
}


