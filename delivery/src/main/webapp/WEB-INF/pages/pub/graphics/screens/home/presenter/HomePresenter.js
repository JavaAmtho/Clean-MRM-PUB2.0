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


var regions = ['Germany', 'India', 'USA'];
var targetGroups = ['Men', 'Women','Kids'];
var groupTypes = ['Region', 'Target Group'];
var masterTemplateList = new Array();

//Open the WBD URL in a popout window
HomePresenter.openURL = function (reference) {
	console.log(reference);
    var urlToOpen = $(reference).children('.wbdURL').html();
    urlToOpen = urlToOpen.replace(/&amp;/g, '&');
    var config = EngineDataStore.getPublicationDetailsArray()["Config"];
    urlToOpen = urlToOpen.replace("../admin", config.host+config.context+"/admin");
    var screenParams = [
        'height=' + (screen.height - 100),
        'width=' + (screen.width - 100),
        'fullscreen=yes'
    ].join(',');
    window.open(urlToOpen, '_blank', screenParams); // <- This is what makes it open in a new window.
}

//add click event once the WBD url has been received and also display the popout icon
HomePresenter.addClickEventForWBDPopup = function (url, innerDiv) {
	
	var config = EngineDataStore.getPublicationDetailsArray()["Config"];
    url = url.replace("../admin",  config.host+config.context+"/admin");
    var $childPage = $(innerDiv);
    $childPage.children('.wbdURL').html(url);
    //$childPage.attr('ondblclick', "event.stopPropagation()");
    $imageReference = $childPage.children('.popupImage');
    $imageReference.attr('onclick', "HomePresenter.openURL(this.parentNode)");
    $imageReference.removeClass('hidden');
    setInterval(function () {                   //pulsating glow logic
        $imageReference.toggleClass('urlInjected');
    }, 1000);
}

//Make server call to create WBD according to the data from the page rules and get the url to open it
HomePresenter.openWhiteBoard = function (divReference, event) {

    var publicationID = GraphicDataStore.getCurrentPublication();
    var $innerDiv = $(divReference);
    if (!$innerDiv.hasClass('inner')) {
        $innerDiv = $innerDiv.children('.inner');
    }
    var ruleID = $innerDiv.children('.ruleID').html();
    var logicalPageID = $innerDiv.children('.logicalPageID').html();
    GraphicDataStore.addRuleToLoadingList(ruleID);
    CreateWBD.createWBD(ruleID, GraphicDataStore.getCurrentView() + "." + logicalPageID, publicationID, function (data) {
        console.log(data);
        if (data == 'error') {
            alert("Error creating WBD!!");
            $('.childPages').trigger("loadingError",[ruleID]);
        }
        else {
            $("[id = '"+logicalPageID+"']").children('.rule').children('.then').children('.dataDirty').html('1');
            console.log($("[id = '"+logicalPageID+"']"))
            GraphicDataStore.addAdditionalInformationToPageRules(data,ruleID,GraphicDataStore.getCurrentView() + "." + logicalPageID);
            $('.childPages').trigger("loadingDone",[ruleID,data.editorURL]);
        }
        GraphicDataStore.stopLoadingStatus(ruleID)
    });
    $innerDiv.children('.loading-overlay').toggleClass('hidden');       //toggle loading screen
    $innerDiv.children('.loading-message').toggleClass('hidden');

    /*jQuery.getJSON("http://14.141.2.211/CS13.0Trunk/admin/rest/whiteboard/3/"+ $(divReference).children('.inner').children('.templateName').html(),function(data){
     console.log("WBD created "+data);
     mamFileID = data;
     console.log("Wbd stillWorking : "+stillWorking);
     if(stillWorking){
     stillWorking = false;
     }
     else{
     HomePresenter.createMergeList(mamFileID, json,$(divReference).children('.inner'));
     }
     console.log($(divReference).children('.inner').children('.assortment'))
     jQuery.getJSON("Data/"+$(divReference).children('.inner').children('.assortment').html()+".json",function(data) {
     console.log("Assortment Loaded "+data);
     var json1 = "["
     $.each( data, function( key, val ) {
     //console.log(val)
     json1 +="{\"id\":\"" + val.id +"\"}";
     if(key != data.length-1){
     json1+=","
     }
     })
     json1 +="]"
     //console.log(json1)
     //json = JSON.parse(json1);
     json = json1;
     console.log(json) ;
     console.log("Json stillWorking : "+stillWorking);
     if(stillWorking){
     stillWorking = false;
     console.log("Json stillWorking after : "+stillWorking);
     }
     else{
     HomePresenter.createMergeList(mamFileID, json,$(divReference).children('.inner'));
     }
     });*/
}


//Open up the child pages if they exist
HomePresenter.expandPages = function (div, event) {

    var $container = $isotopeContainer;
    //Check if master page has been expanded into the child pages
    if (!$(div).hasClass('opened')) {
    	    
    	    console.log("expand page");
            var $dirtyFields = $(div).find('.dataDirty');
            var isDirty = getDataDirtyFlag($dirtyFields);
            if (isDirty) {
                HomePresenter.setRules(div);
            }
            //If not then expand master page to child pages
            //$(div).children('.expand').html("-");   //change '+' button to '-' to indicate expansion
            $(div).children('.expand').css('background-image','url("../../../graphics/screens/home/images/collapse.png")');
            var $masterTemplate;
            var $assortment;
            var $itemsToInsert = new Array();
            var $results = $(div).children('.rule').children('.then').children('.thenChild');
            var $size = $results.length;
            if ($size > 0) {
                $(div).toggleClass('opened');
            }
            //iterate through the rules
            for (var i = 0; i < $size; i++) {
                $values = $($results[i]).children('.rulesText')
                $masterTemplate = $($results[i]).children('.template')[0].value;  //
                $assortment = $($results[i]).children('.assortment')[0].value;    //Get all data
                var ruleID = $($results[i]).children('.ruleID').html();           //to be used in
                var wbdURL = $($results[i]).children('.wbdURL').html();           //Child pages
                var mamFileID = $($results[i]).children('.mamFileID').html();     //


                var newDiv = document.createElement("div");     //create new div for the child page
                var content = '';
                $(newDiv).addClass('anyTargetGroup');
                $(newDiv).addClass('anyRegion');
                if ($(div).hasClass('odd')) {
                    $(newDiv).addClass('odd');                               //According to whether odd
                    content += "<div class='childPages inner odd' ";        //or even page set the class names

                }
                else {
                    $(newDiv).addClass('even');
                    content += "<div class='childPages inner even' ";
                }
                if (wbdURL != " ") {
                    content += "ondblclick=''>";
                    content += "<img onclick='HomePresenter.openURL(this.parentNode)' " +             //Add the popout icon
                        "src='../../../graphics/screens/home/images/popup_icon.png' " +   //and set whether
                        "class='popupImage'/>";                    //to be visible or not
                    HomePresenter.addClickEventForWBDPopup(wbdURL, newDiv);
                }
                else{
                        content += "ondblclick='HomePresenter.openWhiteBoard(this,event)'>";
                    content += "<img onclick='HomePresenter.openURL(this.parentNode)' " +             //Add the popout icon
                        "src='../../../graphics/screens/home/images/popup_icon.png' " +   //and set whether
                        "class='popupImage hidden'/>";                    //to be visible or not
                }

                var checkLoading = GraphicDataStore.checkIfRuleLoading(ruleID) ? "":" hidden";

                content += "<div class='loading-overlay" + checkLoading + "' ondblclick='event.stopPropagation()'></div>" +
                    "<img ondblclick='event.stopPropagation()' " +                    //Add the loading screen
                    "src='../../../graphics/screens/home/images/load.gif' " +         //image and background
                    "class='loading-message"+ checkLoading +"'/>"                                       //        div

                $(newDiv).addClass('childPages');


                $dimensionValues = $($results[i]).children('.whenChild');
                
                

                if ($dimensionValues.length > 0) {                                       //
                    for (var j = 0; j < $dimensionValues.length; j++) {
                        var filterType = $($dimensionValues[j]).children('.groupType')[0].value;                                                                //logic written
                        if(filterType == 'Region'){
                            if($(newDiv).hasClass('anyRegion')){
                                $(newDiv).removeClass('anyRegion')
                            }
                        }
                        else if(filterType == 'Target Group'){
                            if($(newDiv).hasClass('anyTargetGroup')){
                                $(newDiv).removeClass('anyTargetGroup');
                            }
                        }
                        if (!$($dimensionValues[j]).hasClass('hidden')) {                //     for
                            $(newDiv).addClass($($dimensionValues[j]).children('.value')[0].value.toLowerCase()); // filtering
                        }                                                                //     logic
                    }                                                                    //
                }
                content += "<div class='childPageName' >" + ruleID + "</div>";
                content += "<p class='hidden logicalPageID'>" + div.id + "</p>";              //
                content += "<p class='hidden ruleID'>" + ruleID + "</p>";                     //Data stored
                content += "<p class='childPagesText'>Mstr Templ ID: </p>";
                content += "<p class='childPagesText data templateName' >" + $masterTemplate + "</p>";//into child
                content += "<p class='childPagesText'>Assrtmnt Name: </p>";
                content += "<p class='childPagesText data assortment' >" + $assortment + "</p>";      //
                content += "<p class='hidden data wbdURL'> " + wbdURL + " </p>";              //
                content += "<p class='hidden data mamFileID'>" + mamFileID + "</p>";          //
                content += "</div>";
                newDiv.innerHTML = newDiv.innerHTML + content;

                $itemsToInsert[i] = newDiv;
            }
            $container.isotope('insert', $($itemsToInsert), $(div));
        }
    else {
        //$(div).children('.expand').html("+");
        $(div).children('.expand').css('background-image','url("../../../graphics/screens/home/images/expand.png")');
        var $logicalPageIDOfParentOfChild = $('.childPages').children('.inner').children('.logicalPageID:contains(' + div.id + ')');
        var $childPages = $('.childPages').has($logicalPageIDOfParentOfChild);
        $childPages.unbind("loadingError");
//        $container.isotope('remove', $('.' + $(div)[0].id));
        $container.isotope('remove',$childPages);
        //$('.' + $(div)[0].id).unbind("loadingError");
        $(div).toggleClass('opened');
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
        //               $(this).unbind("loadingDone");                                 //  logic so that
    });                                                                                 //
                                                                                        //
    $('.childPages').bind("loadingError",function(event,ruleIDFinishLoading){           //  toggle class can
        var $innerDiv = $(this).children('.inner');                                     //
        var ruleIDnew = $innerDiv.children('.ruleID').html();                           //   be used
        if(ruleIDFinishLoading == ruleIDnew){                                           //
            console.log('1231')                                                         //
            console.log($innerDiv.children('.loading-overlay').attr('class'));          //
            $innerDiv.children('.loading-overlay').addClass('hidden');                  //
            console.log($innerDiv.children('.loading-overlay').attr('class'));          //
            $innerDiv.children('.loading-message').addClass('hidden');                  //
        }                                                                               //
//                $(this).unbind("loadingError");
    });


}

/*
 HomePresenter.createMergeList = function (mamFileID, json, $loading) {
 jQuery.post("http://14.141.2.211/CS13.0Trunk/admin/rest/whiteboard/4/" + mamFileID, json, function (data){
 console.log("merge list prepared");

 jQuery.get("http://14.141.2.211/CS13.0Trunk/admin/rest/whiteboard/5/" + mamFileID, function (url) {
 $loading.children('.loading-overlay').toggleClass('hidden');
 $loading.children('.loading-message').toggleClass('hidden');
 url = url.replace("../admin", "http://14.141.2.211/CS13.0Trunk/admin");
 console.log(url);
 var screenParams = [
 'height=' + (screen.height - 100),
 'width=' + (screen.width - 100),
 'fullscreen=yes'
 ].join(',');

 window.open(url, '_blank', screenParams); // <- This is what makes it open in a new window.
 });
 });

 }, "json");



 }
 */


HomePresenter.saveRulesData = function (div) {
    var $dirtyFields = $(div).find('.dataDirty');
    var isDirty = getDataDirtyFlag($dirtyFields);
    if (isDirty) {
        var $thenStatements = $(div).children('.rule').children('.then').children('.thenChild');

        var pageRuleArr = [];

        for (var i = 0; i < $thenStatements.length; i++) {
            var pageRule = {};
            var masterPageID = $($thenStatements[i]).children('.template')[0].value;
            var assortmentID = $($thenStatements[i]).children('.assortment')[0].value;

            var ruleResult = {};
            if ((masterPageID != '-1' && masterPageID != 'Select') && (assortmentID != '-1' && assortmentID != 'Select')) {

                var columnName = "masterPageId";
                ruleResult[columnName] = masterPageID;
                var columnName = "assortmentId";
                ruleResult[columnName] = assortmentID;


                var condArray = [];
                var $whenConditions = $($thenStatements[i]).children('.whenChild');
                for (var j = 0; j < $whenConditions.length; j++) {
                    var variable = $($whenConditions[j]).children('.groupType')[0].value;
                    var value = $($whenConditions[j]).children('.value')[0].value;
                    console.log(variable + ":" + value)
                    if ((variable != '-1' && variable != 'Select') && (value != '-1' && value != 'Select')) {
                        var condition = {};
                        var columnName = "variable";
                        condition[columnName] = variable;
                        var columnName = "operator";
                        condition[columnName] = $($whenConditions[j]).children('.operation')[0].value;
                        var columnName = "value";
                        condition[columnName] = value;
                        condArray.push(condition)
                    }
                    else
                    {
                        $(function() {
                            $( "#dialog-incorrect-rules" ).dialog({
                                resizable: false,
                                height:140,
                                modal: true,
                                buttons: {
                                    OK: function() {
                                        $( this ).dialog( "close" );
                                    }
                                }
                            });
                        });
                        return false;
                    }
                }


                var wbdURL = $($thenStatements[i]).children('.wbdURL').html();
                var mamFileID = $($thenStatements[i]).children('.mamFileID').html();


                var columnName = "ruleResult";
                pageRule[columnName] = ruleResult;
                var columnName = "ruleConditions";
                pageRule[columnName] = condArray;
                var columnName = "ruleID";
                var ruleID = div.id + "." + i;
                $($thenStatements[i]).children('.ruleID').html(ruleID);
                pageRule[columnName] = ruleID;

                var additional = {};
                var columnName = "mamFileID";
                var mamFileID = $($thenStatements[i]).children('.mamFileID').html()
                additional[columnName] = mamFileID;
                var columnName = "editUrl";
                var editUrl = $($thenStatements[i]).children('.wbdURL').html()
                additional[columnName] = editUrl;

                var columnName = "additionalInformation";
                pageRule[columnName] = additional;
            }
            else
            {
                $(function() {
                    $( "#dialog-incorrect-rules" ).dialog({
                        resizable: false,
                        height:140,
                        modal: true,
                        buttons: {
                            OK: function() {
                                $( this ).dialog( "close" );
                            }
                        }
                    });
                });
                return false;
            }
            pageRuleArr.push(pageRule);

        }


        var finalJson = {};

        var columnName = "logicalPageID";
        
        finalJson[columnName] = GraphicDataStore.getCurrentView() + "." + div.id;
        var columnName = "pageRules";
        finalJson[columnName] = pageRuleArr;
        alert("Saved Successfully");
        //Sending Save call
        SavePageRules.save("saveRules", finalJson, HomePresenter.onSaveSuccess);
        GraphicDataStore.addToPageRules(finalJson);


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

HomePresenter.toggleRulesView = function (div) {
    $(div).toggleClass('rules-opened');
    $isotopeContainer.isotope('reLayout');
    $(div).children(".openRules").toggle();
    $(div).children(".rule").toggle();
    $(div).children(".name").toggle();
    $(div).children(".type").toggle();
    $(div).children(".buttonsHolder").toggle();
}


function getDataDirtyFlag($dirtyFields) {
    var isDirty = false;
    for (var i = 0; i < $dirtyFields.length; i++) {
        var checkDirty = ($dirtyFields[i].innerHTML === '1');
        isDirty |= checkDirty;
    }
    return isDirty;
}


HomePresenter.setRules = function (div) {
    console.log("***setRules");
    var $dirtyFields = $(div).find('.dataDirty');
    var isDirty = getDataDirtyFlag($dirtyFields);
    if (isDirty) {
        $(div).find('.thenChild').remove();
        $dirtyFields.html('0');
        var pageRules = GraphicDataStore.getPageRuleById(div.id);
        if(pageRules){
            var $thenReference = $(div).children('.rule').children('.then');
            for (var i = 0; i < pageRules.length; i++) {
                if (pageRules[i].ruleResult) {
                    var masterPageId = pageRules[i].ruleResult.masterPageId;
                    var assortmentName = pageRules[i].ruleResult.assortmentId;
                    var ruleId = pageRules[i].ruleID;
                    var mamFileID = pageRules[i].additionalInformation.mamFileID;
                    var wbdURL = pageRules[i].additionalInformation.editUrl;
                    /***********Then Div creation***********/
                    var newDiv = document.createElement("div");
                    $(newDiv).addClass("thenChild");
                    $(newDiv).addClass("row-fluid");
                    var masterTemplateFileNames = EngineDataStore.getMasterTemplateList();
                    var content = "<p class='hidden ruleID'>" + ruleId + "</p>";
                    content += "<p class='hidden wbdURL'>" + wbdURL + "</p>";
                    content += "<p class='hidden mamFileID'>" + mamFileID + "</p>";
                    content += "<select onclick='event.stopPropagation()' onchange='HomePresenter.makeRuleDirty(this.parentNode,true)' " +
                        "class='rulesText  template selectpicker span2' data-width='45%'><option selected='selected' disabled='disabled' value='-1'>Select Master Template</option>";
                    for (var j = 0; j < masterTemplateFileNames.length; j++) {
                        content += "<option value='" + masterTemplateFileNames[j].templateID + "'>" + masterTemplateFileNames[j].templateName + "</option>";
                    }
                    content += "</select>";
                    newDiv.innerHTML = newDiv.innerHTML + content;

                    var assortments;
                    GetAssortments.get($(div).children('.pagePath').html(),div.id,function(data){
                            GraphicDataStore.pushToAssortmentsList(div.id,data);
                    });
                    assortments = GraphicDataStore.getAssortmentsByID(div.id);

                    var assortmentList = assortments;
                    content = "<select onchange='HomePresenter.makeRuleDirty(this.parentNode,false)' onclick='event.stopPropagation()' " +
                        "class='rulesText assortment selectpicker span3' data-width='35%'><option selected='selected' disabled='disabled' value='-1'>Select Assortment</option>";
                    for (var j = 0; j < assortmentList.length; j++) {
                        content += "<option>" + assortmentList[j].name + "</option>";
                    }
                    content += "</select>";
                    newDiv.innerHTML = newDiv.innerHTML + content;

                    content = "<span class='buttons remove' onclick='HomePresenter.removeNew(this.parentNode,event)'>-</span>"
                    newDiv.innerHTML = newDiv.innerHTML + content;
                    content = "<span class='buttons addCondition' onclick='HomePresenter.newCondition(this.parentNode)'>+</span>"
                    newDiv.innerHTML = newDiv.innerHTML + content;
                    content = "<p class='hidden dataDirty'>0</p>"
                    newDiv.innerHTML = newDiv.innerHTML + content;

                    $thenReference.append(newDiv);
                    /*****************Setting drop down values************************/
                    $(newDiv).children('.template').val(masterPageId);
                    $(newDiv).children('.assortment').val(assortmentName);


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

                            newDiv.appendChild(whenDiv);


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


HomePresenter.displayExpandRulesButton = function(parentMasterPageDiv) {
    var $rules = $(parentMasterPageDiv).children('.rule').children('.then').children('.thenChild');
    if ($rules.length > 0) {
        $(parentMasterPageDiv).children(".expand").toggle();
    }
}


HomePresenter.openRulesConfigurationMenu = function(parentMasterPageDiv) {
    $(parentMasterPageDiv).children(".expand").css('display',"none");
    //open the rules configuration menu
    HomePresenter.toggleRulesView(parentMasterPageDiv);
}

/*
 arguments : groupTypeDropDown - reference to the master page div
 return : void
 Description : Open or close the rules configuration menu
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
        HomePresenter.expandPages(parentMasterPageDiv);
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



