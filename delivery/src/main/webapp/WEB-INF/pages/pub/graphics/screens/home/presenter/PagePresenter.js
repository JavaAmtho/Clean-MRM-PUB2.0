/**
 *
 * @constructor
 */
function PagePresenter() {
}

var regions = ['Germany', 'India', 'USA'];          //
var targetGroups = ['Men', 'Women', 'Kids'];        //static data for the dropdowns
var groupTypes = ['Region', 'Target Group'];        //
var COLLAPSE_ICON_URL = 'url("../../../graphics/screens/home/images/collapse.png")';
var EXPAND_ICON_URL = 'url("../../../graphics/screens/home/images/expand.png")';
var LOADING_IMAGE_URL = '../../../graphics/screens/home/images/load.gif';




/**
 *
 * @param childPageInnerDiv : the respective child page inner div of the popout icon
 * @description : Open the WBD URL in a popout window
 */
PagePresenter.openURL = function (childPageInnerDiv) {
    //Get the wbd url from the hidden data in the div
    var urlToOpen = $(childPageInnerDiv).children('.wbdURL').html();
    urlToOpen = urlToOpen.replace(/&amp;/g, '&');
    var config = EngineDataStore.getPublicationDetailsArray()["Config"];
    urlToOpen = urlToOpen.replace("../admin", config.host + config.context + "/admin");
    var screenParams = [
        'height=' + (screen.height - 100),
        'width=' + (screen.width - 100),
        'fullscreen=yes'
    ].join(',');
    window.open(urlToOpen, '_blank', screenParams); //Open url in popup window
}

/**
 *
 * @param url : the url that has been received from CS and need to be embedded into the child page
 * @param childPageInnerDiv : the respective child page inner div of the popout icon
 * @description : display the popup icon and add a click event to it once the WBD url has been received
 (called once the wbd has been created and the url is received)
 */
PagePresenter.addClickEventForWBDPopup = function (url, childPageInnerDiv) {

    var $childPage = $(childPageInnerDiv);
    $childPage.children('.wbdURL').html(url);
    $imageReference = $childPage.children('.popupImage');
    $imageReference.attr('onclick', "PagePresenter.openURL(this.parentNode)");
    $imageReference.removeClass('hidden');
    setInterval(function () {                   //pulsating glow logic
        $imageReference.toggleClass('urlInjected');
    }, 1000);
}

/**
 *
 * @param childPageInnerDiv : the respective child page inner div of the popout icon
 * @description : Make server call to create WBD according to the data from the page rules and get the url to open it
 */
PagePresenter.openWhiteBoard = function (childPageInnerDiv) {

    var publicationID = GraphicDataStore.getCurrentPublication();
    var $innerDiv = $(childPageInnerDiv);
    var ruleID = $innerDiv.children('.ruleID').html();
    alert(ruleID);
    var logicalPageID = $innerDiv.children('.logicalPageID').html();
    GraphicDataStore.addRuleToLoadingList(ruleID);
    CreateWBD.createWBD(logicalPageID,function (data) {
            if (data == 'error') {
                alert("Error creating WBD!!");
                $('.childPages').trigger("loadingError", [ruleID]);  //trigger the loading error event
            }
            else {
//                var $parentMasterPageRuleReference = $("[id = '" + logicalPageID + "']").children('.rule').children('.then');
                //Set the parent master page data as dirty so that it gets reset later with the new wbd url and mamfileid
//                $parentMasterPageRuleReference.children('.dataDirty').html('1');
                /*GraphicDataStore.addAdditionalInformationToPageRules(data, ruleID,
                    GraphicDataStore.getCurrentView() + "." + logicalPageID);*/
                if(data && data.editorURL){
                    var $parentMasterPageRuleReference = $("[id = '" + logicalPageID + "']") ;
                    var pageType = $parentMasterPageRuleReference.children('.renderer').html();
                    data.editorURL += "&rendererName=" + pageType;
                    UpdateEditorUrl.updateUrl(logicalPageID,data.editorURL,function(data){
                        console.log($parentMasterPageRuleReference.children('.editorURL'));
                        $parentMasterPageRuleReference.children('.editorURL')[0].innerHTML = data.editorURL;
                    });
                    $('.childPages').trigger("loadingDone", [ruleID, data.editorURL]);    //trigger the loading done event
                }
                else{
                    $('.childPages').trigger("loadingError", [ruleID]);  //trigger the loading error event
                }
            }
            GraphicDataStore.stopLoadingStatus(ruleID)
        });
    $innerDiv.children('.loading-overlay').toggleClass('hidden');       //toggle loading screen
    $innerDiv.children('.loading-message').toggleClass('hidden');       //
}

/**
 *
 * @param rule
 * @param masterPageDiv
 * @returns tags with hidden data for child pages
 * @description create hidden data for the child pages
 */
PagePresenter.createChildPageData = function (rule, masterPageDiv) {
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

/**
 *
 * @param rule
 * @returns the overlay div and the image tag
 * @description create the overlay div and the image placeholder for the loading screen
 */
PagePresenter.createChildPageLoadingScreen = function (ruleID) {
//    var ruleID = $(rule).children('.ruleID').html();
    var loadingOverlayDiv = document.createElement("div");
    $(loadingOverlayDiv).addClass('loading-overlay');
    $(loadingOverlayDiv).attr('ondblclick', 'event.stopPropagation()');

    var loadingImage = document.createElement("img");
    $(loadingImage).addClass('loading-message');
    $(loadingImage).attr('src', LOADING_IMAGE_URL);
    $(loadingImage).attr('ondblclick', 'event.stopPropagation()');
    if (!GraphicDataStore.checkIfRuleLoading(ruleID)) {
        $(loadingImage).addClass('hidden');
        $(loadingOverlayDiv).addClass('hidden');
    }
    return {loadingOverlayDiv: loadingOverlayDiv, loadingImage: loadingImage};
}

/**
 *
 * @param rule
 * @param masterPageDiv
 * @returns inner div for the child page
 * @description create the inner div for the child page
 */
PagePresenter.createChildPageInnerDiv = function (rule, masterPageDiv, url) {


    var childPageInnerDiv = document.createElement("div");
    $(childPageInnerDiv).addClass("childPages");
    $(childPageInnerDiv).addClass("inner");
    var config = EngineDataStore.getPublicationDetailsArray()["Config"];
    url = url.replace("../admin", config.host + config.context + "/admin");
    $(childPageInnerDiv).css("background-image","url("+url+")");

    if ($(masterPageDiv).hasClass('odd')) {
        $(childPageInnerDiv).addClass("odd");
    }
    else {
        $(childPageInnerDiv).addClass("even");
    }
    $(childPageInnerDiv).attr('ondblclick', 'PagePresenter.openWhiteBoard(this,event)');

    var wbdURL = $(masterPageDiv).children('.editorURL').html();/*$(rule).children('.wbdURL').html()*/
    var mamFileID = " ";
    var masterTemplate = $(masterPageDiv).children('.mamFileId').html();

    var popupImage = document.createElement("img");
    $(popupImage).addClass('popupImage');
    $(popupImage).addClass('hidden');
    $(popupImage).attr('src', '../../../graphics/screens/home/images/popup_icon.png');
    $(popupImage).attr('onclick', 'PagePresenter.openURL(this.parentNode)');
    if (wbdURL != " ") {
        $(childPageInnerDiv).removeAttr('ondblclick');
        $(popupImage).removeClass('hidden');
    }
    $(childPageInnerDiv).append(popupImage);

    var loadingScreen = PagePresenter.createChildPageLoadingScreen(rule);
    var loadingOverlayDiv = loadingScreen.loadingOverlayDiv;
    var loadingImage = loadingScreen.loadingImage;
    $(childPageInnerDiv).append(loadingOverlayDiv);
    $(childPageInnerDiv).append(loadingImage);

    ruleID = masterPageDiv.id + "." + rule;

    $(childPageInnerDiv).append("<div class='childPageName ruleID' >" + ruleID + "</div>");
    $(childPageInnerDiv).append("<p class='hidden logicalPageID'>" + masterPageDiv.id + "</p>");
    $(childPageInnerDiv).append("<p class='childPagesText'>Mstr Templ ID: </p>");
    $(childPageInnerDiv).append("<p class='childPagesText data templateName' >" + masterTemplate + "</p>");
    $(childPageInnerDiv).append("<p class='hidden data wbdURL'> " + wbdURL + " </p>");
    $(childPageInnerDiv).append("<p class='hidden data mamFileID'>" + mamFileID + "</p>");

//    var childPageData = PagePresenter.createChildPageData(rule, masterPageDiv);
//    $(childPageInnerDiv).append(childPageData);

    return childPageInnerDiv;
}

/**
 * @description function that binds the childpages to the loadingDone and loadingError events
 */
PagePresenter.bindChildPagesToCustomLoadingWBDEvent = function () {
    $('.childPages').bind("loadingDone", function (event, ruleIDFinishLoading, wbdURL) {
        var $innerDiv = $(this).children('.inner');
        var ruleIDnew = $innerDiv.children('.ruleID').html();
        if (ruleIDFinishLoading == ruleIDnew) {
            var logicalPageID = $innerDiv.children('.logicalPageID').html();
            PagePresenter.addClickEventForWBDPopup(wbdURL, $innerDiv[0]);
            $innerDiv.children('.loading-overlay').addClass('hidden');
            $innerDiv.children('.loading-message').addClass('hidden');
        }
    });

    $('.childPages').bind("loadingError", function (event, ruleIDFinishLoading) {
        var $innerDiv = $(this).children('.inner');
        var ruleIDnew = $innerDiv.children('.ruleID').html();
        if (ruleIDFinishLoading == ruleIDnew) {
            $innerDiv.children('.loading-overlay').addClass('hidden');
            $innerDiv.children('.loading-message').addClass('hidden');
        }
    });
}

/**
 *
 * @param masterPageDiv : the respective child page inner div of the popout icon
 * @description : Open up the child pages if they exist
 */
PagePresenter.expandCollapseChildPages = function (masterPageDiv) {

    var $container = $isotopeContainer;
    //Check if master page has been expanded into the child pages
    if (!$(masterPageDiv).hasClass('opened')) {
        //Expand the master page into its child pages
        $(masterPageDiv).children('.expand').css('background-image', COLLAPSE_ICON_URL);
        var $itemsToInsert = new Array();
        var mamFileId = $(masterPageDiv).children('.mamFileId').html();
        GetPageThumbnails.get(mamFileId,PagePresenter.getPageThumbnails);
            $(masterPageDiv).toggleClass('opened');

            $.each(childPagesList, function (key, item) {
//                alert(item)
                var childPageDiv = document.createElement("div");     //create new div for the child page
                $(childPageDiv).addClass('childPages');
                if ($(masterPageDiv).hasClass('odd')) {
                    $(childPageDiv).addClass('odd');
                }
                else {
                    $(childPageDiv).addClass('even');
                }
                var childPageInnerDiv = PagePresenter.createChildPageInnerDiv(key, masterPageDiv,item);

                $(childPageDiv).append(childPageInnerDiv);
                $itemsToInsert.push(childPageDiv);
            });
        $container.isotope('insert', $($itemsToInsert), $(masterPageDiv));
    }
    else {
        $(masterPageDiv).children('.expand').css('background-image', EXPAND_ICON_URL);
        //jquery reference of all children having the parent's logicalpage id
        var $logicalPageIDOfParentOfChild = $('.childPages').children('.inner').children('.logicalPageID:contains(' + masterPageDiv.id + ')');
        var $childPages = $('.childPages').has($logicalPageIDOfParentOfChild);
        $childPages.unbind("loadingError");
        $childPages.unbind("loadingDone");
        $container.isotope('remove', $childPages);
        $(masterPageDiv).toggleClass('opened');
/*        var $dirtyFields = $(masterPageDiv).find('.dataDirty');
        var isDirty = getDataDirtyFlag($dirtyFields);
        if (isDirty) {
            PagePresenter.setRules(masterPageDiv);
        }*/
    }

    PagePresenter.bindChildPagesToCustomLoadingWBDEvent();
}

var childPagesList = [];

PagePresenter.getPageThumbnails = function(data) {
   childPagesList = data;
}


/**
 *
 * @param $dirtyFields : jquery reference of all the data dirty flags
 * @returns boolean indicating whether overall data is dirty or not
 * @description : check if any of the rules are dirty
 */
function getDataDirtyFlag($dirtyFields) {
    var isDirty = false;
    for (var i = 0; i < $dirtyFields.length; i++) {
        var checkDirty = ($dirtyFields[i].innerHTML === '1');
        isDirty |= checkDirty;
    }
    return isDirty;
}

/**
 *
 * @param parentMasterPageDiv : the respective master page div reference
 * @description : check if rules exist and display the expand rules button
 */
PagePresenter.displayExpandRulesButton = function (parentMasterPageDiv) {
    var $rules = $(parentMasterPageDiv).children('.rule').children('.then').children('.thenChild');
    if ($rules.length > 0) {
        $(parentMasterPageDiv).children(".expand").toggle();
    }
}

/**
 *
 * @param parentDiv reference to the parent rule for the condition to be marked dirty
 * @param ifResetWBD  boolean indicating if the wbd url and mamFileID need to be reset
 * @description : indicate data as dirty due to changes and also reset wbdurl and mam file id accordingly
 */
PagePresenter.makeRuleDirty = function (parentDiv, ifResetWBD) {
    PagePresenter.makeDirty(parentDiv);
    if (ifResetWBD) {
        $(parentDiv).children('.wbdURL').html(" ");
        $(parentDiv).children('.mamFileID').html(" ");
    }
}

PagePresenter.makeDirty = function (text, event) {
    $(text).children('.dataDirty').html('1');
}


/**
 *
 * @param reference
 * @Desciption : Removes the rule condition or statement
 (called on click of the minus buttons in the rules)
 */
PagePresenter.removeNew = function (reference) {
    $(reference).children('.dataDirty').html('1');
    $(reference.parentNode).children('.dataDirty').html('1');
    reference.parentNode.removeChild(reference);
    $('.nano').nanoScroller();
}

/**
 * @description : Called by the splitter when the drag has ended or started
 in order to re-layout(position) the isotope elements properly
 */
PagePresenter.setContainerRelayout = function () {
    if ($isotopeContainer) {
        $isotopeContainer.isotope('reLayout');
    }
}

/**
 *
 * @param data
 * @description : Creates a new view with all the pages under the publication.
 (Callback from GetAllPagesInPublication.get)
 */
PagePresenter.changeViewToShowAllPages = function (data) {
    $(document).trigger({
        type: "TREE_ITEM_CLICKED",
        uiData: data,
        nodeType: "Dimension"
    });
}

/**
 * @description : Function called when the show all pages button is called.
 Brings up all the pages under the current publication
 */
PagePresenter.showAllPages = function () {
    var publicationName = GraphicDataStore.getCurrentView(); //Since the button shows up only when publication
    //is clicked the current view is the publication
    GetAllPagesInPublication.get(publicationName, PagePresenter.changeViewToShowAllPages);
}
