/**
 *
 * @constructor HomePresenter
 */
function HomePresenter() {
}

var rendererData;
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
        /*var pageRule = $masterPages[i].id;
        if (pageRule != null && pageRule.length > 0) {
            PagePresenter.setRules($masterPages[i]);
            //set the + button as displayed or hidden as per the rules data present
            var $thenChildren = $($masterPages[i]).children('.rule').children('.then').children('.thenChild');
            if ($thenChildren.length > 0) {
                if ($($masterPages[i]).children(".expand").css('display') == 'none') {
                    $($masterPages[i]).children(".expand").toggle();
                }
            }
        }*/
        var $masterPage = $($masterPages[i]);
        var mamFileId = $masterPage.children('.mamFileId').html();
        if(mamFileId && mamFileId.length!=0){
            if ($masterPage.children(".expand").css('display') == 'none') {
                $masterPage.children(".expand").toggle();
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
        /*GetAllPageRules.get(pages,function(data){
            GraphicDataStore.addAllPageRules(data.listOfPageRules);
        });*/

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

//        HomePresenter.bindClickEventToFilterButtons();
//        $('.nano').nanoScroller();
    });
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

$(document).bind("TREE_ITEM_CLICKED", function itemClickedHandler(e) {
        if (e.nodeType == "Assortment") {
            AssetTreePresenter.enableTemplatesDropdown(e.rendererType);
            AssetTreePresenter.showAssortmentPanel(e.uiData);
        } else {
            AssetTreePresenter.hideAssortPanel();
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
        obj.pageType = node.data.children[i].pageType;
        obj.renderEngineType = node.data.children[i].renderEngineType;
        obj.fileID = node.data.children[i].fileID;
        if(node.data.children[i].editorURL){
            obj.editorUrl = node.data.children[i].editorURL;
        }
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