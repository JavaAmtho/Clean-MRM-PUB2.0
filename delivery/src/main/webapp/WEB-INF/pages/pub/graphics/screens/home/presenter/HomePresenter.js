function HomePresenter() {
}

var rendererData;
var btnSelectionFlag = 0;
var onTarget = false;
var $isotopeContainer;

var filters = {};

var pages = {};

HomePresenter.handleViewChange = function (evt) {
    switch (evt.currentTarget.id) {
        case "tileView":
            //console.log(":: Load Tile View Button Clicked ::");
            HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/TileViewRenderer.html");
            HomePresenter.btnFocus(".tileBtnCSS");
            break;

        case "listView":
            //console.log(":: Load List View Button Clicked ::");
            HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/ListViewRenderer.html");
            HomePresenter.btnFocus(".listBtnCSS");
            break;

        case "detailView":
            //console.log(":: Load Detail View Button Clicked ::");
            HomePresenter.loadViewItems(rendererData, EngineDataStore.getBaseURL() + "graphics/screens/home/htmls/renderers/DetailViewRenderer.html");
            HomePresenter.btnFocus(".detailBtnCSS");
            break;
    }
}

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

        /*var $masterPages =  $("#viewHolder").children('.masterPage');
        console.log($masterPages)
        for(var i = 0 ; i < $masterPages ; i++){
            var pageRule = $masterPages[i].id;
            if(pageRule != null && pageRule.length > 0){
                HomePresenter.setRules($masterPages[i])
                var $thenChildren = $($masterPages[i]).children('.rule').children('.then').children('.thenChild');
                if ($thenChildren.length > 0) {
                    if ($($masterPages[i]).children(".expand").css('display') == 'none') {
                        $($masterPages[i]).children(".expand").toggle();
                    }
                }
            }
        }*/
    }

    MustacheWrapper.createUI(currentTemplateView, evt, function (currentViewStr) {


        $('#viewHolder').html(currentViewStr);

        //Set rules for all the master Pages
        if(pages.pageIDs != null && pages.pageIDs.length > 0){
            var $masterPages =  $("#viewHolder").children('.masterPage');
            for(var i = 0 ; i < $masterPages.length ; i++){
                var pageRule = $masterPages[i].id;
                if(pageRule != null && pageRule.length > 0){
                    HomePresenter.setRules($masterPages[i]);
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


        if ($isotopeContainer) {
            $isotopeContainer.isotope('destroy');
        }


        $isotopeContainer = $('#viewHolder');

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

        $isotopeContainer.isotope();

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
                if(filters[prop].indexOf("anyRegion")!=-1)
                    bothRegions=filters[prop].split(",");
                else if(filters[prop].indexOf("anyTargetGroup")!=-1)
                    bothTgs=filters[prop].split(",");
                isoFilters.push(filters[ prop ])
            }
            var selector;
            if(bothRegions!=undefined && bothTgs!=undefined)
            {
                selector=bothRegions[0]+ bothTgs[1]+","+bothRegions[1]+bothTgs[0]+","+bothRegions[0]+bothTgs[0]+","+bothRegions[1]+bothTgs[1];
            }
            else{
                selector = isoFilters.join('');
            }
            $isotopeContainer.isotope({ filter: selector });

            return false;
        });



    });
}

var currentPanelId;

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


HomePresenter.clearList = function () {
    var contextMenusHolder = document.getElementById('menus');
    contextMenusHolder.innerHTML = "";
}

HomePresenter.btnFocus = function (btn) {
    $('.tileBtnCSS').css("border", "0px");
    $('.listBtnCSS').css("border", "0px");
    $('.detailBtnCSS').css("border", "0px");
    $(btn).css("border", "1px solid black");
}

HomePresenter.createTree = function (btnId) {
    var urls;
    urls = EngineDataStore.getBaseURL() + EngineDataStore.getApiMappingObject()[btnId];

    var treeObj = document.getElementById("assetsTree");
    var darkTree = ElementFactory.getLazyTree();
    darkTree.createTree(treeObj, urls);
}

HomePresenter.reset = function () {
    $("#btnMIM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/MIM.png)");
    $("#btnPIM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/PIM.png)");
    $("#btnMAM").css("background-image", "url(/delivery/pages/pub/graphics/screens/home/images/icons/MAM.png)");
}

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

HomePresenter.showAssortmentPanel = function (rendererData) {


    console.log(rendererData)
    HomePresenter.unHideAssortPanel();
    GraphicDataStore.setProdcutsArr(rendererData);
    //Converting the div into the jqwidget list
    // var theme=getDemoTheme();
    /*$("#subtab1").jqxListBox({ selectedIndex: 3, source: rendererData, width: 500, height: 500,scrollBarSize:10

     */
    /*renderer: function (index, label, value) {
     var datarecord = rendererData[index];
     var imgurl = datarecord.image;
     var img = '<img height="30" width="40" src="' + imgurl + '"/>';
     var table = '<table class="assestsJQList" style="min-width: 130px;"><tr><td style="width: 40px;" rowspan="1">' + img + '</td><td>' + datarecord.title +  '</td></tr></table>';
     return table;
     }*/
    /*
     });*/

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

HomePresenter.populateAssetsList = function (data) {
    //alert(1234)
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

HomePresenter.hideAssortPanel = function () {
    $('#assortPanel').hide();
    $('#dim').show();
}

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

HomePresenter.unHideAssortPanel = function () {
    $("#dim").hide();
    $("#assortPanel").show();
}


var regions = ['Germany', 'India', 'USA'];          //
var targetGroups = ['Men', 'Women','Kids'];         //static data for the dropdowns
var groupTypes = ['Region', 'Target Group'];        //
const collapseIconPath = 'url("../../../graphics/screens/home/images/collapse.png")';
const expandIconPath = 'url("../../../graphics/screens/home/images/expand.png")';
/*
 arguments : childPageInnerDiv - the respective child page inner div of the popout icon
 return : void
 Description : Open the WBD URL in a popout window
 */
HomePresenter.openURL = function (childPageInnerDiv) {
    //Get the wbd url from the hidden data in the div
    var urlToOpen = $(childPageInnerDiv).children('.wbdURL').html();
    urlToOpen = urlToOpen.replace(/&amp;/g, '&'); //In case of any problems with wbd try uncommenting
    var config = EngineDataStore.getPublicationDetailsArray()["Config"];
    urlToOpen = urlToOpen.replace("../admin", config.host+config.context+"/admin");
    var screenParams = [
        'height=' + (screen.height - 100),
        'width=' + (screen.width - 100),
        'fullscreen=yes'
    ].join(',');
    window.open(urlToOpen, '_blank', screenParams); //Open url in popup window
}

/*
 arguments : childPageInnerDiv - the respective child page inner div of the popout icon
             url - the url that has been received from CS and need to be embedded into the child page
 return : void
 Description : display the popup icon and add a click event to it once the WBD url has been received
                (called once the wbd has been created and the url is received)
 */
HomePresenter.addClickEventForWBDPopup = function (url, childPageInnerDiv) {
	
//	var config = EngineDataStore.getPublicationDetailsArray()["Config"];
//    url = url.replace("../admin",  config.host+config.context+"/admin");
    var $childPage = $(childPageInnerDiv);
    $childPage.children('.wbdURL').html(url);
    $imageReference = $childPage.children('.popupImage');
    $imageReference.attr('onclick', "HomePresenter.openURL(this.parentNode)");
    $imageReference.removeClass('hidden');
    setInterval(function () {                   //pulsating glow logic
        $imageReference.toggleClass('urlInjected');
    }, 1000);
}

/*
 arguments : childPageInnerDiv - the respective child page inner div of the popout icon
 return : void
 Description : Make server call to create WBD according to the data from the page rules and get the url to open it
 */
HomePresenter.openWhiteBoard = function (childPageInnerDiv) {

    var publicationID = GraphicDataStore.getCurrentPublication();
    var $innerDiv = $(childPageInnerDiv);
    /*if (!$innerDiv.hasClass('inner')) {
        $innerDiv = $innerDiv.children('.inner');
    }*/
    var ruleID = $innerDiv.children('.ruleID').html();
    var logicalPageID = $innerDiv.children('.logicalPageID').html();
    GraphicDataStore.addRuleToLoadingList(ruleID);
    CreateWBD.createWBD(ruleID, GraphicDataStore.getCurrentView() + "." + logicalPageID, publicationID,
                            function (data) {
        if (data == 'error') {
            alert("Error creating WBD!!");
            $('.childPages').trigger("loadingError",[ruleID]);  //trigger the loading error event
        }
        else {
            var $parentMasterPageRuleReference = $("[id = '"+logicalPageID+"']").children('.rule').children('.then');
            //Set the parent master page data as dirty so that it gets reset later with the new wbd url and mamfileid
            $parentMasterPageRuleReference.children('.dataDirty').html('1');
            GraphicDataStore.addAdditionalInformationToPageRules(data,ruleID,
                        GraphicDataStore.getCurrentView() + "." + logicalPageID);
            $('.childPages').trigger("loadingDone",[ruleID,data.editorURL]);    //trigger the loading done event
        }
        GraphicDataStore.stopLoadingStatus(ruleID)
    });
    $innerDiv.children('.loading-overlay').toggleClass('hidden');       //toggle loading screen
    $innerDiv.children('.loading-message').toggleClass('hidden');       //
}


/*
 arguments : masterPageDiv - the respective child page inner div of the popout icon
 return : void
 Description : Open up the child pages if they exist
 */
HomePresenter.setClassNamesToChildPagesForFilterByCondition = function(childPageDiv, $dimensionValues) {
    for (var j = 0; j < $dimensionValues.length; j++) {
        var filterType = $($dimensionValues[j]).children('.groupType')[0].value;                                                                //logic written
        if (filterType == 'Region') {
            if ($(childPageDiv).hasClass('anyRegion')) {
                $(childPageDiv).removeClass('anyRegion')
            }
        }
        else if (filterType == 'Target Group') {
            if ($(childPageDiv).hasClass('anyTargetGroup')) {
                $(childPageDiv).removeClass('anyTargetGroup');
            }
        }
        if (!$($dimensionValues[j]).hasClass('hidden')) {
            $(childPageDiv).addClass($($dimensionValues[j]).children('.value')[0].value.toLowerCase());
        }
    }
}

HomePresenter.createChildPageData = function(rule, masterPageDiv) {
    var $masterTemplate = $(rule).children('.template')[0].value;   //
    var $assortment = $(rule).children('.assortment')[0].value;     //Get all data
    var ruleID = $(rule).children('.ruleID').html();                //to be used in
    var wbdURL = $(rule).children('.wbdURL').html();                //Child pages
    var mamFileID = $(rule).children('.mamFileID').html();          //
    var childPageData = '';
    childPageData += "<div class='childPageName' >" + ruleID + "</div>";
    childPageData += "<p class='hidden logicalPageID'>" + masterPageDiv.id + "</p>";
    childPageData += "<p class='hidden ruleID'>" + ruleID + "</p>";
    childPageData += "<p class='childPagesText'>Mstr Templ ID: </p>";
    childPageData += "<p class='childPagesText data templateName' >" + $masterTemplate + "</p>";
    childPageData += "<p class='childPagesText'>Assrtmnt Name: </p>";
    childPageData += "<p class='childPagesText data assortment' >" + $assortment + "</p>";
    childPageData += "<p class='hidden data wbdURL'> " + wbdURL + " </p>";
    childPageData += "<p class='hidden data mamFileID'>" + mamFileID + "</p>";
    return childPageData;
}

HomePresenter.createChildPageLoadingScreen = function(rule) {
    var ruleID = $(rule).children('.ruleID').html();
    var loadingOverlayDiv = document.createElement("div");
    $(loadingOverlayDiv).addClass('loading-overlay');
    $(loadingOverlayDiv).attr('ondblclick', 'event.stopPropagation()');

    var loadingImage = document.createElement("img");
    $(loadingImage).addClass('loading-message');
    $(loadingImage).attr('src', '../../../graphics/screens/home/images/load.gif');
    $(loadingImage).attr('ondblclick', 'event.stopPropagation()');
    if (!GraphicDataStore.checkIfRuleLoading(ruleID)) {
        $(loadingImage).addClass('hidden');
        $(loadingOverlayDiv).addClass('hidden');
    }
    return {loadingOverlayDiv: loadingOverlayDiv, loadingImage: loadingImage};
}

HomePresenter.createChildPageInnerDiv = function(rule, masterPageDiv) {


    var childPageInnerDiv = document.createElement("div");
    $(childPageInnerDiv).addClass("childPages");
    $(childPageInnerDiv).addClass("inner");

    if ($(masterPageDiv).hasClass('odd')) {
        $(childPageInnerDiv).addClass("odd");
    }
    else {
        $(childPageInnerDiv).addClass("even");
    }
    $(childPageInnerDiv).attr('ondblclick', 'HomePresenter.openWhiteBoard(this,event)');

    var wbdURL = $(rule).children('.wbdURL').html();
    var popupImage = document.createElement("img");
    $(popupImage).addClass('popupImage');
    $(popupImage).addClass('hidden');
    $(popupImage).attr('src', '../../../graphics/screens/home/images/popup_icon.png');
    $(popupImage).attr('onclick', 'HomePresenter.openURL(this.parentNode)');
    if (wbdURL != " ") {
        $(childPageInnerDiv).removeAttr('ondblclick');
        $(popupImage).removeClass('hidden');
    }
    $(childPageInnerDiv).append(popupImage);

    var loadingScreen = HomePresenter.createChildPageLoadingScreen(rule);
    var loadingOverlayDiv = loadingScreen.loadingOverlayDiv;
    var loadingImage = loadingScreen.loadingImage;
    $(childPageInnerDiv).append(loadingOverlayDiv);
    $(childPageInnerDiv).append(loadingImage);

    var childPageData = HomePresenter.createChildPageData(rule, masterPageDiv);
    $(childPageInnerDiv).append(childPageData);

    return childPageInnerDiv;
}


HomePresenter.expandCollapseChildPages = function (masterPageDiv, event) {

    var $container = $isotopeContainer;
    //Check if master page has been expanded into the child pages
    if (!$(masterPageDiv).hasClass('opened')) {
        //Expand the master page into its child pages
        var $dirtyFields = $(masterPageDiv).find('.dataDirty');
        var isDirty = getDataDirtyFlag($dirtyFields);               //Check if dirty(in case previously wbd created)
            if (isDirty) {                                          //***NOT SURE IF I HAVE TO KEEP THIS*****
                HomePresenter.setRules(masterPageDiv);              //***REMEMBER TO CHECK AND DELETE********
            }                                                       //
            //$(masterPageDiv).children('.expand').html("-");   //change '+' button to '-' to indicate expansion

        $(masterPageDiv).children('.expand').css('background-image',collapseIconPath);
            var $itemsToInsert = new Array();
            var $rules = $(masterPageDiv).children('.rule').children('.then').children('.thenChild');
            var rulesCount = $rules.length;
            if (rulesCount > 0) {   //if no rules then 'opened' class does not need to be added
                $(masterPageDiv).toggleClass('opened');
            }
            //iterate through the rules
            for (var i = 0; i < rulesCount; i++) {

                var currentRule = $rules[i];
                var childPageDiv = document.createElement("div");     //create new div for the child page
                $(childPageDiv).addClass('anyTargetGroup');
                $(childPageDiv).addClass('anyRegion');
                $(childPageDiv).addClass('childPages');
                if ($(masterPageDiv).hasClass('odd')) {
                    $(childPageDiv).addClass('odd');
                }
                else {
                    $(childPageDiv).addClass('even');
                }

                var $dimensionValues = $(currentRule).children('.whenChild');

                if ($dimensionValues.length > 0) {
                    HomePresenter.setClassNamesToChildPagesForFilterByCondition(childPageDiv,$dimensionValues);
                }
                var childPageInnerDiv = HomePresenter.createChildPageInnerDiv(currentRule, masterPageDiv);

                $(childPageDiv).append(childPageInnerDiv);

                $itemsToInsert[i] = childPageDiv;
            }
            $container.isotope('insert', $($itemsToInsert), $(masterPageDiv));
        }
    else {
        //$(masterPageDiv).children('.expand').html("+");
        $(masterPageDiv).children('.expand').css('background-image', expandIconPath);
        //jquery reference of all children having the parent's logicalpage id
        var $logicalPageIDOfParentOfChild = $('.childPages').children('.inner').children('.logicalPageID:contains(' + masterPageDiv.id + ')');
        var $childPages = $('.childPages').has($logicalPageIDOfParentOfChild);
        $childPages.unbind("loadingError");
        $childPages.unbind("loadingDone");
        $container.isotope('remove',$childPages);
        $(masterPageDiv).toggleClass('opened');
    }


    $('.childPages').bind("loadingDone",function(event,ruleIDFinishLoading,wbdURL){     //
        var $innerDiv = $(this).children('.inner');                                     //
        var ruleIDnew = $innerDiv.children('.ruleID').html();                           //
        if(ruleIDFinishLoading == ruleIDnew){                                           //
            var logicalPageID = $innerDiv.children('.logicalPageID').html();            //
            HomePresenter.addClickEventForWBDPopup(wbdURL, $innerDiv[0]);               //
            $innerDiv.children('.loading-overlay').addClass('hidden');                  //
            $innerDiv.children('.loading-message').addClass('hidden');                  //need to modify
        }                                                                               //
    });                                                                                 //
                                                                                        //
    $('.childPages').bind("loadingError",function(event,ruleIDFinishLoading){           //  toggle class can
        var $innerDiv = $(this).children('.inner');                                     //
        var ruleIDnew = $innerDiv.children('.ruleID').html();                           //   be used
        if(ruleIDFinishLoading == ruleIDnew){                                           //
            $innerDiv.children('.loading-overlay').addClass('hidden');                  //
            $innerDiv.children('.loading-message').addClass('hidden');                  //
        }                                                                               //
    });


}

HomePresenter.openIncorrectRulesDialog = function() {
    $(function () {
        $("#dialog-incorrect-rules").dialog({
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                OK: function () {
                    $(this).dialog("close");
                }
            }
        });
    });
}

HomePresenter.saveRulesData = function (masterPageDiv) {
    var $dirtyFields = $(masterPageDiv).find('.dataDirty');
    var isDirty = getDataDirtyFlag($dirtyFields);
    if (isDirty) {

        var $rules = $(masterPageDiv).children('.rule').children('.then').children('.thenChild');

        var pageRuleArr = [];

        for (var i = 0; i < $rules.length; i++) {
            var pageRule = {};
            var currentRule = $rules[i]
            var masterPageID = $(currentRule).children('.template')[0].value;
            var assortmentID = $(currentRule).children('.assortment')[0].value;

            var ruleResult = {};
            if ((masterPageID != '-1' && masterPageID != 'Select') &&
                (assortmentID != '-1' && assortmentID != 'Select')) {

                var columnName = "masterPageId";
                ruleResult[columnName] = masterPageID;
                var columnName = "assortmentId";
                ruleResult[columnName] = assortmentID;


                var condArray = [];
                var $ruleConditions = $(currentRule).children('.whenChild');
                for (var j = 0; j < $ruleConditions.length; j++) {
                    var currentCondition = $ruleConditions[j];
                    var variable = $(currentCondition).children('.groupType')[0].value;
                    var value = $(currentCondition).children('.value')[0].value;
                    if ((variable != '-1' && variable != 'Select') &&
                        (value != '-1' && value != 'Select')) {
                        var condition = {};
                        var columnName = "variable";
                        condition[columnName] = variable;
                        var columnName = "operator";
                        condition[columnName] = $(currentCondition).children('.operation')[0].value;
                        var columnName = "value";
                        condition[columnName] = value;
                        condArray.push(condition)
                    }
                    else
                    {
                        HomePresenter.openIncorrectRulesDialog();
                        return false;
                    }
                }

                var columnName = "ruleResult";
                pageRule[columnName] = ruleResult;
                var columnName = "ruleConditions";
                pageRule[columnName] = condArray;
                var columnName = "ruleID";
                var ruleID = masterPageDiv.id + "." + i;
                $(currentRule).children('.ruleID').html(ruleID);
                pageRule[columnName] = ruleID;

                var additional = {};
                var columnName = "mamFileID";
                var mamFileID = $(currentRule).children('.mamFileID').html()
                additional[columnName] = mamFileID;
                var columnName = "editUrl";
                var editUrl = $(currentRule).children('.wbdURL').html()
                additional[columnName] = editUrl;

                var columnName = "additionalInformation";
                pageRule[columnName] = additional;
            }
            else
            {
                HomePresenter.openIncorrectRulesDialog();
                return false;
            }
            pageRuleArr.push(pageRule);

        }

        var finalJson = {};

        var columnName = "logicalPageID";
        
        finalJson[columnName] = GraphicDataStore.getCurrentView() + "." + masterPageDiv.id;
        var columnName = "pageRules";
        finalJson[columnName] = pageRuleArr;
        //Sending Save call
        SavePageRules.save("saveRules", finalJson, HomePresenter.onSaveSuccess);
        GraphicDataStore.addToPageRules(finalJson);
        alert("Saved Successfully");

        for (var i = 0; i < $dirtyFields.length; i++) {
            $dirtyFields[i].innerHTML = '0';
        }
        return true;
    }
    else {
        alert("No changes detected. No save operation performed.");
        return true;
    }
}

HomePresenter.onSaveSuccess = function (data) {
    console.log(data);
}

function createDefaultDisabledDropDownOption() {
    var dropDownOptions = document.createElement("option");
    $(dropDownOptions).attr('selected', 'selected');
    $(dropDownOptions).attr('disabled', 'disabled');
    $(dropDownOptions).attr('value', '-1');
    $(dropDownOptions).html('Select');
    return dropDownOptions;
}


function createDropDownOption(dropDownListID, dropDownDisplayName) {
    var dropDownOptions = document.createElement("option");
    $(dropDownOptions).attr('value', dropDownListID);
    $(dropDownOptions).html(dropDownDisplayName);
    return dropDownOptions;
}

function createRuleStatement(pageRule, parentMasterPageDiv) {
    var ruleId = pageRule.ruleID;
    var mamFileID = pageRule.additionalInformation.mamFileID;
    var wbdURL = pageRule.additionalInformation.editUrl;
    /***********Then Div creation***********/
    var newRuleStatementDiv = document.createElement("div");
    $(newRuleStatementDiv).addClass("thenChild");
    $(newRuleStatementDiv).addClass("row-fluid");
    var masterTemplateFileNames = EngineDataStore.getMasterTemplateList();
    var ruleDataContent = "<p class='hidden ruleID'>" + ruleId + "</p>";
    ruleDataContent += "<p class='hidden wbdURL'>" + wbdURL + "</p>";
    ruleDataContent += "<p class='hidden mamFileID'>" + mamFileID + "</p>";
    $(newRuleStatementDiv).append(ruleDataContent);

    var masterTemplateDropDown = document.createElement("select");
    $(masterTemplateDropDown).addClass('rulesText  template selectpicker span2');
    $(masterTemplateDropDown).attr('onchange','HomePresenter.makeRuleDirty(this.parentNode,true)');
    $(masterTemplateDropDown).attr('data-width','45%');

    var dropDownOptions;
    dropDownOptions = createDefaultDisabledDropDownOption();
    $(dropDownOptions).html('Select Master Template');
    $(masterTemplateDropDown).append(dropDownOptions);
/*
    ruleDataContent += "<select onchange='HomePresenter.makeRuleDirty(this.parentNode,true)' " +
        "class='rulesText  template selectpicker span2' data-width='45%'><option selected='selected' disabled='disabled' value='-1'>Select Master Template</option>";
    */
    for (var j = 0; j < masterTemplateFileNames.length; j++) {
        var masterTemplateID = masterTemplateFileNames[j].templateID;
        var masterTemplateName = masterTemplateFileNames[j].templateName;

        dropDownOptions = createDropDownOption(masterTemplateID, masterTemplateName);
        $(masterTemplateDropDown).append(dropDownOptions);
        //ruleDataContent += "<option value='" + masterTemplateFileNames[j].templateID + "'>" + masterTemplateFileNames[j].templateName + "</option>";
    }
//    ruleDataContent += "</select>";
//    console.log(masterTemplateDropDown.innerHTML)

    $(newRuleStatementDiv).append(masterTemplateDropDown);
//    console.log($(newRuleStatementDiv).html())
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + dropDownOptions;

    var assortments;
    GetAssortments.get($(parentMasterPageDiv).children('.pagePath').html(), parentMasterPageDiv.id, function (data) {
        GraphicDataStore.pushToAssortmentsList(parentMasterPageDiv.id, data);
    });
    assortments = GraphicDataStore.getAssortmentsByID(parentMasterPageDiv.id);

    var assortmentList = assortments;
    ruleDataContent = "<select onchange='HomePresenter.makeRuleDirty(this.parentNode,false)' onclick='event.stopPropagation()' " +
        "class='rulesText assortment selectpicker span3' data-width='35%'><option selected='selected' disabled='disabled' value='-1'>Select Assortment</option>";
    for (var j = 0; j < assortmentList.length; j++) {
        ruleDataContent += "<option>" + assortmentList[j].name + "</option>";
    }
    ruleDataContent += "</select>";
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    ruleDataContent = "<span class='buttons remove' onclick='HomePresenter.removeNew(this.parentNode,event)'>-</span>"
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    ruleDataContent = "<span class='buttons addCondition' onclick='HomePresenter.newCondition(this.parentNode)'>+</span>"
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    ruleDataContent = "<p class='hidden dataDirty'>0</p>"
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    return newRuleStatementDiv;
}


HomePresenter.setRules = function (parentMasterPageDiv) {
    var $dirtyFields = $(parentMasterPageDiv).find('.dataDirty');
    var isDirty = getDataDirtyFlag($dirtyFields);
    if (isDirty) {
        $(parentMasterPageDiv).find('.thenChild').remove();
        $dirtyFields.html('0');
        var pageRules = GraphicDataStore.getPageRuleById(parentMasterPageDiv.id);
        if(pageRules){
            var $thenReference = $(parentMasterPageDiv).children('.rule').children('.then');
            for (var i = 0; i < pageRules.length; i++) {
                var pageRule = pageRules[i]
                if (pageRule.ruleResult) {
                    var ruleStatementDiv = createRuleStatement(pageRule, parentMasterPageDiv);
                    $thenReference.append(ruleStatementDiv);
                    /*****************Setting drop down values************************/
                    var masterPageId = pageRules[i].ruleResult.masterPageId;
                    var assortmentName = pageRules[i].ruleResult.assortmentId;
                    $(ruleStatementDiv).children('.template').val(masterPageId);
                    $(ruleStatementDiv).children('.assortment').val(assortmentName);


                    var ruleConditions = pageRules[i].ruleConditions;

                    if(ruleConditions){
                        for (var j = 0; j < ruleConditions.length; j++) {
                            var groupType = ruleConditions[j].variable;
                            var operation = ruleConditions[j].operator;
                            var value = ruleConditions[j].value;

                            /***********when Div creation***********/
                            var whenDiv = document.createElement("div");
                            $(whenDiv).addClass("whenChild");

                            var variablesList = groupTypes;
                            content = "&nbsp;&nbsp;<select onchange='HomePresenter.modifyValueDropDown(this)' " +
                                "onclick='event.stopPropagation()' class='rulesText groupType selectpicker span2' data-width='auto' value='-1'>" +
                                "<option selected='selected' disabled='disabled'>Choose</option>";
                            for (var k = 0; k < variablesList.length; k++) {
                                content += "<option>" + variablesList[k] + "</option>";
                            }
                            content += "</select>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            content = "<select onchange='HomePresenter.makeRuleDirty(this.parentNode,false)' " +
                                "onclick='event.stopPropagation()' onchange='HomePresenter.makeDirty(this,event)' class='rulesText operation selectpicker span2' data-width='auto'><option selected='selected'>=</option>" +
                                "</select>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            content = "<select onclick='event.stopPropagation()' " +
                                "onchange='HomePresenter.makeDirty(this.parentNode,event)'  class='input rulesText value selectpicker span2' data-width='auto' type='text'>" +
                                "<option selected='selected' disabled='disabled' value='-1'>Choose</option>";

                            if (groupType == 'Region') {
                                var regionsList = regions;
                                for (var k = 0; k < regionsList.length; k++) {
                                    content += "<option>" + regionsList[k] + "</option>";
                                }
                            }
                            else if (groupType == 'Target Group') {
                                var targetGroupsList = targetGroups;
                                for (var k = 0; k < targetGroupsList.length; k++) {
                                    content += "<option>" + targetGroupsList[k] + "</option>";
                                }
                            }

                            content +="</select>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            var content = "&nbsp;&nbsp;<span class='buttons remove' " +
                                "onclick='HomePresenter.removeNew(this.parentNode,event)'>-</span>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;
                            content = "<p class='hidden dataDirty'>0</p>"
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            ruleStatementDiv.appendChild(whenDiv);


                            /******************Setting dropdown Values****************************/
                            $(whenDiv).children('.groupType').val(groupType);
                            //HomePresenter.modifyValueDropDown($(whenDiv).children('.groupType')[0], false)
                            $(whenDiv).children('.operation').val(operation);
                            $(whenDiv).children('.value').val(value);

                        }
                    }
                }
            }
        }
    }
    else {
        $dirtyFields.html('0');
    }

    $(".selectpicker").selectBoxIt({
        autoWidth: false
    });
}

/*
 arguments : parentMasterPageDiv - the respective master page div reference
 return : void
 Description : toggle each of the elements that need to be removed or added according to
                whether the rules menu is opened or closed
 */
HomePresenter.toggleRulesView = function (parentMasterPageDiv) {
    $(parentMasterPageDiv).toggleClass('rules-opened');         //enlarge the master page size to fir the rules menu
    $(parentMasterPageDiv).children(".openRules").toggle();     //toggle view of the open rules menu button
    $(parentMasterPageDiv).children(".rule").toggle();          //toggle the rules menu(all the drop-downs)
    $(parentMasterPageDiv).children(".name").toggle();          //toggle the master page name display
    $(parentMasterPageDiv).children(".buttonsHolder").toggle(); //toggle the div behind the buttons

    $isotopeContainer.isotope('reLayout');  //re-layout the isotope positioning once the rules menu has been opened
}

/*
 arguments : $dirtyFields - jquery reference of all the data dirty flags
 return : boolean - if overall data is dirty or not
 Description : check if any of the rules are dirty
 */
function getDataDirtyFlag($dirtyFields) {
    var isDirty = false;
    for (var i = 0; i < $dirtyFields.length; i++) {
        var checkDirty = ($dirtyFields[i].innerHTML === '1');
        isDirty |= checkDirty;
    }
    return isDirty;
}

/*
 arguments : parentMasterPageDiv - the respective master page div reference
 return : void
 Description : check if rules exist and display the expand rules button
 */
HomePresenter.displayExpandRulesButton = function(parentMasterPageDiv) {
    var $rules = $(parentMasterPageDiv).children('.rule').children('.then').children('.thenChild');
    if ($rules.length > 0) {
        $(parentMasterPageDiv).children(".expand").toggle();
    }
}

/*
 arguments : parentMasterPageDiv - the respective master page div reference
 return : void
 Description : Open the rules configuration menu
 */
HomePresenter.openRulesConfigurationMenu = function(parentMasterPageDiv) {
    //When opening the rules configuration menu the expand button(if visible) needs to be hidden
    $(parentMasterPageDiv).children(".expand").css('display',"none");
    HomePresenter.toggleRulesView(parentMasterPageDiv);
}

/*
 arguments : parentMasterPageDiv - reference to the master page div
 return : void
 Description : Open or close the rules configuration menu according to situation
 */
HomePresenter.toggleOpenCloseRules = function (parentMasterPageDiv) {

    if (!$(parentMasterPageDiv).hasClass('opened')) { //check if the master page has been expanded to its child pages
        //if pages not expanded then proceed straight for open/close rules menu
        if ($(parentMasterPageDiv).hasClass('rules-opened')) {  //check if the rules configuration menu in open
            //If opened then proceed to close the rules menu
            var $dirtyFields = $(parentMasterPageDiv).find('.dataDirty');      //Get all the dirty flags
            var isDirty = getDataDirtyFlag($dirtyFields);
            if (isDirty) {                                                     //Check if any dirty flag is set

                //If dirty then open up the dialog confirming close or save of rules
                $(function () {
                    $("#dialog-confirm").dialog({
                        resizable: false,
                        height: 140,
                        modal: true,
                        buttons: {
                            //Actions to perform if user chooses the 'Save' option
                            "Save": function () {
                                //close the dialog box
                                $(this).dialog("close");

                                //Save the rules
                                var isSaveSuccess = HomePresenter.saveRulesData(parentMasterPageDiv);
                                if(isSaveSuccess){ //Check if successfully saved

                                    //show the expand rules button on the master page if rules exist
                                    HomePresenter.displayExpandRulesButton(parentMasterPageDiv);

                                    //close the rules configuration menu
                                    HomePresenter.toggleRulesView(parentMasterPageDiv);
                                }
                            },

                            //Actions to perform if user chooses the 'Discard' option
                            "Discard": function () {
                                //Close the dialog box
                                $(this).dialog("close");

                                //show the expand rules button on the master page if rules exist
                                HomePresenter.displayExpandRulesButton(parentMasterPageDiv);

                                //close the rules configuration menu
                                HomePresenter.toggleRulesView(parentMasterPageDiv);

                                //Discard currently set values and pickup up last saved rules
                                HomePresenter.setRules(parentMasterPageDiv);
                            },

                            //Actions to perform if user chooses the 'Cancel' option
                            "Cancel": function () {
                                $(this).dialog("close");
                            }
                        }
                    });
                });
            }
            else {  //Case when close is clicked and data is not dirty

                /******Not sure why its been called so commented 09/10/2013******/
                /****Please revert code if any issues****/
                //HomePresenter.setRules(parentMasterPageDiv);

                //show the expand rules button on the master page if rules exist
                HomePresenter.displayExpandRulesButton(parentMasterPageDiv);

                //close the rules configuration menu
                HomePresenter.toggleRulesView(parentMasterPageDiv);
            }
        }
        else {
            //Rules menu is closed so proceed to opening rules configuration menu
            HomePresenter.openRulesConfigurationMenu(parentMasterPageDiv);
        }

    }

    else{
        //When child pages have been expanded and rules configuration menu button clicked
        //collapse all the child pages and open the rules configuration menu
        HomePresenter.expandCollapseChildPages(parentMasterPageDiv);
        HomePresenter.openRulesConfigurationMenu(parentMasterPageDiv);

    }
}


/*
 arguments : groupTypeDropDown - reference to the group type drop down(target group/region select drop-down)
 return : void
 Description : According to value selected in the group type drop-down modify the values in the value drop-down
 */
HomePresenter.modifyValueDropDown = function (groupTypeDropDown) {
        $(groupTypeDropDown.parentNode).children('.dataDirty').html('1');

    //We encountered some issues after using the new drop-down component while modifying the
    //values in the drop-down. So instead of modifying the values we replace the entire
    //drop-down manually.

    var options = "<select onclick='event.stopPropagation()' " +
                    "onchange='HomePresenter.makeDirty(this.parentNode,event)'  " +
                    "class='input rulesText value selectpicker span2' " +
                    "data-width='auto' type='text'>" +
                    "<option disable='disabled' value='-1'>Select</option>";

    if (groupTypeDropDown.selectedIndex == 1) {
        var regionsList = regions;                                      //
        for (var i = 0; i < regionsList.length; i++) {                  //  If selected index is 1(Region)
            options += "<option>" + regionsList[i] + "</option>";       //  then add regions list to the drop-down
        }                                                               //
    }
    else if (groupTypeDropDown.selectedIndex == 2) {
        var targetGroupsList = targetGroups;                            //
        for (var i = 0; i < targetGroupsList.length; i++) {             //  If selected index is 2(Target Group)
            options += "<option>" + targetGroupsList[i] + "</option>";  //  then add target groups list to drop-down
        }                                                               //
    }
    options += "</select>";

    $(groupTypeDropDown).siblings('.value').remove();               //remove the existing drop-down
    //Get the last operator drop-down component and add the values drop-down after it
    var $operationDropdown = $(groupTypeDropDown).siblings('.selectboxit-container');
    $($operationDropdown[$operationDropdown.length-1]).after(options);
    $('.selectpicker').selectBoxIt();   //initialize the selectBoxIt component on the drop-downs
}

/*
 arguments : parentDiv - reference to the parent rule for the condition to be marked dirty
             ifResetWBD - boolean indicating if the wbd url and mamFileID need to be reset
 return : void
 Description : indicate data as dirty due to changes and also reset wbdurl and mam file id accordingly
 */
HomePresenter.makeRuleDirty = function (parentDiv,ifResetWBD) {
    HomePresenter.makeDirty(parentDiv);
    if(ifResetWBD){
        $(parentDiv).children('.wbdURL').html(" ");
        $(parentDiv).children('.mamFileID').html(" ");
    }
}

HomePresenter.makeDirty = function (text, event) {
    $(text).children('.dataDirty').html('1');
}


/*
 arguments : parentThenChildDiv - reference to the parent rule for the condition to be added
 return : void
 Description : Create a new condition for the rule(Called on the '+' next to the rule)
 */
HomePresenter.newCondition = function (parentThenChildDiv) {
    //Set dirty flag to the paren thenChild
    $(parentThenChildDiv).children('.dataDirty').html('1');


    var newConditionDiv = document.createElement("div");        //Create new condition
    $(newConditionDiv).addClass("whenChild row-fluid");         //in the parent rule div

    var variablesList = groupTypes;
    content = "&nbsp;&nbsp;<select onchange='HomePresenter.modifyValueDropDown(this)' " +  //Form drop-down
                "onclick='event.stopPropagation()' " +                                         //   with the
                "class='rulesText groupType selectpicker span2' " +                            //     group
                "data-width='auto' value='-1'>" +                                              //     types
                "<option selected='selected' disabled='disabled'>Choose</option>";             //  i.e. Region,
    for (var i = 0; i < variablesList.length; i++) {                                           //    Target
        content += "<option>" + variablesList[i] + "</option>";                                //    Group e.t.c
    }                                                                                          //
    content += "</select>";
    newConditionDiv.innerHTML = newConditionDiv.innerHTML + content;    //Add the drop-down to the parent div

    content = "<select class='rulesText operation selectpicker span2' data-width='auto'>" +
                "<option selected='selected'>=</option>" +
                "</select>";
    newConditionDiv.innerHTML = newConditionDiv.innerHTML + content;   //Add the operator drop-down to the parent div

    content = "<select onclick='event.stopPropagation()' " +                                    //
                "onchange='HomePresenter.makeDirty(this.parentNode,event)'  " +                 //Form the basic
                "class='input rulesText value selectpicker span2' " +                           //drop-down
                "data-width='auto' type='text'>" +                                              //for the
                "<option selected='selected' disabled='disabled' value='-1'>Choose</option>" +  //value field
                "</select>";                                                                    //
    newConditionDiv.innerHTML = newConditionDiv.innerHTML + content;    //Add the value drop-down to the parent div


    //Add the '-' button to let user remove the condition
    var content = "&nbsp;&nbsp;<span class='buttons remove' " +
        "onclick='HomePresenter.removeNew(this.parentNode,event)'>-</span>";
    newConditionDiv.innerHTML = newConditionDiv.innerHTML + content;

    //create dirty flag and initialize to 0
    content = "<p class='hidden dataDirty'>0</p>"
    newConditionDiv.innerHTML = newConditionDiv.innerHTML + content;

    parentThenChildDiv.appendChild(newConditionDiv);    //Append the condition to the parent div
    $(".selectpicker").selectBoxIt({autoWidth:true});   //Initialize the selectBoxitComponent on all drop-downs
}


/*
    arguments : parentThenDiv - reference to the main then div to which the new rules have to be added
    return : void
    Description : Create a new rule(called on click of the main '+' button on the configure rules page)
*/
HomePresenter.newRule = function (parentThenDiv) {
    //Set the main dirty flag when new rule is added
    $(parentThenDiv).children('.dataDirty').html('1');

    var newRuleDiv = document.createElement("div");         //  new div creation
    $(newRuleDiv).addClass("thenChild row-fluid");          //  for new rule

    var masterTemplateFileNames = EngineDataStore.getMasterTemplateList();

    /**************************Removed ruleID generation logic since it is already performed in saveRulesData.
                                Incase needed refer to code before 9/10/2013*******************/

    var content = "<p class='hidden ruleID'></p>";         //Empty 'p' tags
    content += "<p class='hidden wbdURL'> </p>";           //to store wbdURL/wbdURL/mamFileID
    content += "<p class='hidden mamFileID'> </p>";        //once generated

    //Forming drop down with list of all the master template file names from CS
    content += "<select onclick='event.stopPropagation()' onchange='HomePresenter.makeRuleDirty(this.parentNode,true)' " +
                "class='rulesText selectpicker  template ' >" +
                "<option selected='selected' disabled='disabled' value='-1'>Select Master Template</option>";
    for (var i = 0; i < masterTemplateFileNames.length; i++) {
        content += "<option value=" + masterTemplateFileNames[i].templateID + ">" +
                    masterTemplateFileNames[i].templateName + "</option>";
    }
    content += "</select>";
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;     //Add master template filename dropdown to the new rule div

    var assortmentList;
    var $parentPageReference = $(parentThenDiv).closest(".masterPage");
    var pathToPage = $parentPageReference.children('.pagePath').html();
    var pageID = $parentPageReference[0].id;

    GetAssortments.get(pathToPage,pageID,function(data){                //
        GraphicDataStore.pushToAssortmentsList(parentThenDiv.id,data);      //Get list of assortments
    });                                                                 //    under the page
    assortmentList = GraphicDataStore.getAssortmentsByID(parentThenDiv.id); //

    //Form drop down with the list of assortments under the page from the server
    content = "<select onchange='HomePresenter.makeRuleDirty(this.parentNode,false)' onclick='event.stopPropagation()' " +
                "class='rulesText assortment selectpicker span3' data-width='35%'>" +
                "<option selected='selected' value='-1'>Select Assortment</option>";
    console.log(assortmentList)
    for (var i = 0; i < assortmentList.length; i++) {
        content += "<option>" + assortmentList[i].name + "</option>";
    }
    content += "</select>";
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;//Add assortments dropdown to the new rule div

    //Add the add new condition and remove rule buttons to the new rule div
    content = "<span class='buttons remove' onclick='HomePresenter.removeNew(this.parentNode,event)'>-</span>"
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;
    content = "<span class='buttons addCondition' onclick='HomePresenter.newCondition(this.parentNode)'>+</span>"
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;

    content = "<p class='hidden dataDirty'>0</p>"   //The dirty flag by default set to 0
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;
    parentThenDiv.appendChild(newRuleDiv);      //Add the new rule div to the parent div

    $(".selectpicker").selectBoxIt({    //  Initialize the
        autoWidth: false                //  selectBoxIt component
    });                                 //  on the drop down menus

}

/*
    Desciption : Removes the rule condition or statement
                    (called on click of the minus buttons in the rules)
 */
HomePresenter.removeNew = function (reference, event) {
    $(reference).children('.dataDirty').html('1');
    $(reference.parentNode).children('.dataDirty').html('1');
    reference.parentNode.removeChild(reference);
    return false;
}

/*
    Description : Called by the splitter when the drag has ended or started
                    in order to re-layout(position) the isotope elements properly
 */
HomePresenter.setContainerRelayout = function(){
    if($isotopeContainer){
        $isotopeContainer.isotope('reLayout');
    }
}

/*
    Description : Creates a new view with all the pages under the publication.
                    (Callback from GetAllPagesInPublication.get)
 */
HomePresenter.changeViewToShowAllPages = function(data){
    $(document).trigger({
        type: "TREE_ITEM_CLICKED",
        uiData: data,
        nodeType: "Dimension"
    });
}

/*
    Description : Function called when the show all pages button is called.
                    Brings up all the pages under the current publication
*/
HomePresenter.showAllPages = function(){
    var publicationName = GraphicDataStore.getCurrentView(); //Since the button shows up only when publication
                                                             //is clicked the current view is the publication
    GetAllPagesInPublication.get(publicationName,HomePresenter.changeViewToShowAllPages);
}
