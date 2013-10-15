/**
 *
 * @constructor
 */
function PagePresenter() {
}

var regions = ['Germany', 'India', 'USA'];          //
var targetGroups = ['Men', 'Women','Kids'];         //static data for the dropdowns
var groupTypes = ['Region', 'Target Group'];        //
const collapseIconPath = 'url("../../../graphics/screens/home/images/collapse.png")';
const expandIconPath = 'url("../../../graphics/screens/home/images/expand.png")';

/**
 *
 * @returns the created drop down option element
 * @Description create a default disabled option for the drop down menu
 */
PagePresenter.createDefaultDisabledDropDownOption = function() {
    var dropDownOptions = document.createElement("option");
    $(dropDownOptions).attr('selected', 'selected');
    $(dropDownOptions).attr('disabled', 'disabled');
    $(dropDownOptions).attr('value', '-1');
    $(dropDownOptions).html('Select');
    return dropDownOptions;
}

/**
 *
 * @param dropDownDisplayName : display name in the drop down list
 * @param dropDownListID : id value to be used in the drop down
 * @returns the created drop down option element
 * @Description create an option tag for the dropdown menu
 */
PagePresenter.createDropDownOption = function(dropDownDisplayName, dropDownListID) {
    var dropDownOption = document.createElement("option");
    if(dropDownListID){
        $(dropDownOption).attr('value', dropDownListID);
    }
    $(dropDownOption).html(dropDownDisplayName);
    return dropDownOption;
}

/**
 *
 * @param parentMasterPageDiv : reference to the parent masterpage div
 * @Descritpion Sets the already saved page rules
 */
PagePresenter.setRules = function (parentMasterPageDiv) {
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
                    var ruleStatementDiv = PagePresenter.createRuleStatement(parentMasterPageDiv, pageRule);
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
                            var whenDiv = PagePresenter.createRuleConditionDiv(groupType);
                            $(ruleStatementDiv).append(whenDiv);
                            /******************Setting dropdown Values****************************/
                            $(whenDiv).children('.groupType').val(groupType);
                            //PagePresenter.modifyValueDropDown($(whenDiv).children('.groupType')[0], false)
                            $(whenDiv).children('.operation').val(operation);
                            $(whenDiv).children('.value').val(value);

                        }
                    }
                }
            }
        }
    }
    $(".selectpicker").selectBoxIt({
        autoWidth: false
    });
}

/**
 *
 * @param pageRule : rule statement data
 * @param parentMasterPageDiv : parent master page div reference
 * @returns rule statement div
 * @Description Create the rule statement div with the drop down
 *              menus for master template and assortment
 */
PagePresenter.createRuleStatement = function(parentMasterPageDiv, pageRule){
    var ruleId = pageRule ? pageRule.ruleID : "";
    var mamFileID = pageRule ? pageRule.additionalInformation.mamFileID : " ";
    var wbdURL = pageRule ? pageRule.additionalInformation.editUrl : " ";

    var newRuleStatementDiv = document.createElement("div");
    $(newRuleStatementDiv).addClass("thenChild");
    $(newRuleStatementDiv).addClass("row-fluid");

    var ruleDataContent = "<p class='hidden ruleID'>" + ruleId + "</p>";
    ruleDataContent += "<p class='hidden wbdURL'>" + wbdURL + "</p>";
    ruleDataContent += "<p class='hidden mamFileID'>" + mamFileID + "</p>";
    $(newRuleStatementDiv).append(ruleDataContent);

    var masterTemplateFileNames = EngineDataStore.getMasterTemplateList();
    var masterTemplateDropDown = document.createElement("select");
    $(masterTemplateDropDown).addClass('rulesText  template selectpicker span2');
    $(masterTemplateDropDown).attr('onchange','PagePresenter.makeRuleDirty(this.parentNode,true)');
    $(masterTemplateDropDown).attr('data-width','45%');
    var dropDownOptions;
    dropDownOptions = PagePresenter.createDefaultDisabledDropDownOption();
    $(dropDownOptions).html('Select Master Template');
    $(masterTemplateDropDown).append(dropDownOptions);
    for (var j = 0; j < masterTemplateFileNames.length; j++) {
        var masterTemplateID = masterTemplateFileNames[j].templateID;
        var masterTemplateName = masterTemplateFileNames[j].templateName;
        dropDownOptions = PagePresenter.createDropDownOption(masterTemplateName, masterTemplateID);
        $(masterTemplateDropDown).append(dropDownOptions);
    }
    $(newRuleStatementDiv).append(masterTemplateDropDown);

    GetAssortments.get($(parentMasterPageDiv).children('.pagePath').html(), parentMasterPageDiv.id, function (data) {
        GraphicDataStore.pushToAssortmentsList(parentMasterPageDiv.id, data);
    });
    var assortmentList = GraphicDataStore.getAssortmentsByID(parentMasterPageDiv.id);
    var assortmentsDropDown = document.createElement("select");
    $(assortmentsDropDown).addClass('rulesText assortment selectpicker span3');
    $(assortmentsDropDown).attr('onchange','PagePresenter.makeRuleDirty(this.parentNode,true)');
    $(assortmentsDropDown).attr('data-width','45%');
    dropDownOptions = PagePresenter.createDefaultDisabledDropDownOption();
    $(dropDownOptions).html('Select Assortment');
    $(assortmentsDropDown).append(dropDownOptions);
    for (var j = 0; j < assortmentList.length; j++) {
        var assortmentName = assortmentList[j].name;
        dropDownOptions = PagePresenter.createDropDownOption(assortmentName);
        $(assortmentsDropDown).append(dropDownOptions);
    }
    $(newRuleStatementDiv).append(assortmentsDropDown);

    var ruleConfigureButtons = "<span title='Remove the rule statement' class='buttons remove' " +
        "onclick='PagePresenter.removeNew(this.parentNode)'>-</span>"
    ruleConfigureButtons += "<span title='Add a new rule condition' class='buttons addCondition' " +
        "onclick='PagePresenter.addNewRuleCondition(this.parentNode)'>+</span>"
    $(newRuleStatementDiv).append(ruleConfigureButtons);
    ruleDataContent = "<p class='hidden dataDirty'>0</p>"
    $(newRuleStatementDiv).append(ruleDataContent);

    return newRuleStatementDiv;
}

/**
 *
 * @param groupType : selected group filter
 * @returns rule condition div
 * @Description create the rule condition div and its drop downs (group type, operator and value)
 */
PagePresenter.createRuleConditionDiv = function(groupType) {
    var newRuleConditionDiv = document.createElement("div");
    $(newRuleConditionDiv).addClass("whenChild");

    var variablesList = groupTypes;
    var groupTypeDropDown = document.createElement("select");
    $(groupTypeDropDown).addClass('rulesText groupType selectpicker span2');
    $(groupTypeDropDown).attr('onchange','PagePresenter.modifyValueDropDown(this)');
    $(groupTypeDropDown).attr('data-width','auto');
    var dropDownOptions;
    dropDownOptions = PagePresenter.createDefaultDisabledDropDownOption();
    $(groupTypeDropDown).append(dropDownOptions);
    for (var i = 0; i < variablesList.length; i++) {
        var currentGroupType = variablesList[i];
        dropDownOptions = PagePresenter.createDropDownOption(currentGroupType);
        $(groupTypeDropDown).append(dropDownOptions);
    }
    $(newRuleConditionDiv).append(groupTypeDropDown);

    var operatorDropDown = document.createElement("select");
    $(operatorDropDown).addClass('rulesText operation selectpicker span2');
    $(operatorDropDown).attr('onchange','PagePresenter.makeDirty(this)');
    $(operatorDropDown).attr('data-width','auto');
    dropDownOptions = PagePresenter.createDropDownOption("=");
    $(operatorDropDown).append(dropDownOptions);
    $(newRuleConditionDiv).append(operatorDropDown);

    var valuesDropDown = document.createElement("select");
    $(valuesDropDown).addClass('input rulesText value selectpicker span2');
    $(valuesDropDown).attr('onchange','PagePresenter.makeDirty(this.parentNode)');
    $(valuesDropDown).attr('data-width','auto');
    dropDownOptions = PagePresenter.createDefaultDisabledDropDownOption();
    $(valuesDropDown).append(dropDownOptions);
    if(groupType){
        if (groupType == 'Region') {
            var regionsList = regions;
            for (var i = 0; i < regionsList.length; i++) {
                var region = regionsList[i];
                dropDownOptions = PagePresenter.createDropDownOption(region);
                $(valuesDropDown).append(dropDownOptions);
            }
        }
        else if (groupType == 'Target Group') {
            var targetGroupsList = targetGroups;
            for (var i = 0; i < targetGroupsList.length; i++) {
                var targetGroup = targetGroupsList[i];
                dropDownOptions = PagePresenter.createDropDownOption(targetGroup);
                $(valuesDropDown).append(dropDownOptions);
            }
        }
    }
    $(newRuleConditionDiv).append(valuesDropDown);

    var ruleConditionsConfigurationButton = "&nbsp;&nbsp;<span title='Remove the rule condition' " +
                                            "class='buttons remove' " +
                                            "onclick='PagePresenter.removeNew(this.parentNode)'>-</span>";
    $(newRuleConditionDiv).append(ruleConditionsConfigurationButton);

    var ruleConditionsData = "<p class='hidden dataDirty'>0</p>"
    $(newRuleConditionDiv).append(ruleConditionsData);

    return newRuleConditionDiv;
}

/**
 *
 * @param groupTypeDropDown : reference to the group type drop down(target group/region select drop-down)
 * @Description : According to value selected in the group type drop-down modify the values in the value drop-down
 */
PagePresenter.modifyValueDropDown = function (groupTypeDropDown) {
    $(groupTypeDropDown.parentNode).children('.dataDirty').html('1');

    //We encountered some issues after using the new drop-down component while modifying the
    //values in the drop-down. So instead of modifying the values we replace the entire
    //drop-down manually.

    var valuesDropDown = document.createElement("select");
    $(valuesDropDown).addClass('input rulesText value selectpicker span2');
    $(valuesDropDown).attr('onchange','PagePresenter.makeDirty(this.parentNode)');
    $(valuesDropDown).attr('data-width','auto');
    var dropDownOptions = PagePresenter.createDefaultDisabledDropDownOption();
    $(valuesDropDown).append(dropDownOptions);

    if (groupTypeDropDown.selectedIndex == 1) {
        var regionsList = regions;                                          //
        for (var i = 0; i < regionsList.length; i++) {                      //  If selected index is 1(Region)
            var region = regionsList[i];                                    //  then add regions list
            dropDownOptions = PagePresenter.createDropDownOption(region);   //  to the drop-down
            $(valuesDropDown).append(dropDownOptions);                      //
        }
    }
    else if (groupTypeDropDown.selectedIndex == 2) {
        var targetGroupsList = targetGroups;                                    //
        for (var i = 0; i < targetGroupsList.length; i++) {                     //  If selected index is
            var targetGroup = targetGroupsList[i];                              //  2(Target Group) then add target
            dropDownOptions = PagePresenter.createDropDownOption(targetGroup);  //  groups list to drop-down
            $(valuesDropDown).append(dropDownOptions);                          //
        }
    }

    $(groupTypeDropDown).siblings('.value').remove();               //remove the existing drop-down
    //Get the last operator drop-down component and add the values drop-down after it
    var $operationDropdown = $(groupTypeDropDown).siblings('.selectboxit-container');
    $($operationDropdown[$operationDropdown.length-1]).after(valuesDropDown);
    $('.selectpicker').selectBoxIt();   //initialize the selectBoxIt component on the drop-downs
}


/**
 *
 * @param parentThenChildDiv : reference to the parent rule for the condition to be added
 * @Description : Create a new condition for the rule(Called on the '+' next to the rule)
 */
PagePresenter.addNewRuleCondition = function (parentThenChildDiv) {
    //Set dirty flag to the paren thenChild
    $(parentThenChildDiv).children('.dataDirty').html('1');

    var newRuleConditionDiv = PagePresenter.createRuleConditionDiv();
    parentThenChildDiv.appendChild(newRuleConditionDiv);

    $(".selectpicker").selectBoxIt({autoWidth:true});
}

/**
 *
 * @param parentRuleStatementsListDiv : reference to the parent then div which contains all the rule statements
 * @Description : Create a new rule(Called on click on top '+')
 */
PagePresenter.addNewRuleStatement = function (parentRuleStatementsListDiv) {
    //Set the main dirty flag when new rule is added
    $(parentRuleStatementsListDiv).children('.dataDirty').html('1');

    var parentMasterPageDiv = $(parentRuleStatementsListDiv).closest('.masterPage')[0];
    var newRuleStatement = PagePresenter.createRuleStatement(parentMasterPageDiv);
    $(parentRuleStatementsListDiv).append(newRuleStatement);      //Add the new rule div to the parent div

    $(".selectpicker").selectBoxIt({autoWidth: false});
}

/**
 *
 * @param childPageInnerDiv : the respective child page inner div of the popout icon
 * @Description : Open the WBD URL in a popout window
 */
PagePresenter.openURL = function (childPageInnerDiv) {
    //Get the wbd url from the hidden data in the div
    var urlToOpen = $(childPageInnerDiv).children('.wbdURL').html();
    urlToOpen = urlToOpen.replace(/&amp;/g, '&');
    var config = EngineDataStore.getPublicationDetailsArray()["Config"];
    urlToOpen = urlToOpen.replace("../admin", config.host+config.context+"/admin");
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
 * @Description : display the popup icon and add a click event to it once the WBD url has been received
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
 * @Description : Make server call to create WBD according to the data from the page rules and get the url to open it
 */
PagePresenter.openWhiteBoard = function (childPageInnerDiv) {

    var publicationID = GraphicDataStore.getCurrentPublication();
    var $innerDiv = $(childPageInnerDiv);
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

/**
 *
 * @param childPageDiv : reference to the main child page div
 * @param $dimensionValues
 * @Description according to the rule conditions set, add values to the classname for the filtering
 */
PagePresenter.setClassNamesToChildPagesForFilterByCondition = function(childPageDiv, $dimensionValues) {
    for (var j = 0; j < $dimensionValues.length; j++) {
        var currentDimensionValue = $dimensionValues[j];
        var filterType = $(currentDimensionValue).children('.groupType')[0].value;                                                                //logic written
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
        if (!$(currentDimensionValue).hasClass('hidden')) {
            $(childPageDiv).addClass($(currentDimensionValue).children('.value')[0].value.toLowerCase());
        }
    }
}

/**
 *
 * @param rule
 * @param masterPageDiv
 * @returns tags with hidden data for child pages
 * @Description create hidden data for the child pages
 */
PagePresenter.createChildPageData = function(rule, masterPageDiv) {
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
 * @Description create the overlay div and the image placeholder for the loading screen
 */
PagePresenter.createChildPageLoadingScreen = function(rule) {
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

/**
 *
 * @param rule
 * @param masterPageDiv
 * @returns inner div for the child page
 * @Description create the inner div for the child page
 */
PagePresenter.createChildPageInnerDiv = function(rule, masterPageDiv) {


    var childPageInnerDiv = document.createElement("div");
    $(childPageInnerDiv).addClass("childPages");
    $(childPageInnerDiv).addClass("inner");

    if ($(masterPageDiv).hasClass('odd')) {
        $(childPageInnerDiv).addClass("odd");
    }
    else {
        $(childPageInnerDiv).addClass("even");
    }
    $(childPageInnerDiv).attr('ondblclick', 'PagePresenter.openWhiteBoard(this,event)');

    var wbdURL = $(rule).children('.wbdURL').html();
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

    var childPageData = PagePresenter.createChildPageData(rule, masterPageDiv);
    $(childPageInnerDiv).append(childPageData);

    return childPageInnerDiv;
}

/**
 * @Description function that binds the childpages to the loadingDone and loadingError events
 */
PagePresenter.bindChildPagesToCustomLoadingWBDEvent = function() {
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
 * @Description : Open up the child pages if they exist
 */
PagePresenter.expandCollapseChildPages = function (masterPageDiv) {

    var $container = $isotopeContainer;
    //Check if master page has been expanded into the child pages
    if (!$(masterPageDiv).hasClass('opened')) {
        //Expand the master page into its child pages
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
                PagePresenter.setClassNamesToChildPagesForFilterByCondition(childPageDiv,$dimensionValues);
            }
            var childPageInnerDiv = PagePresenter.createChildPageInnerDiv(currentRule, masterPageDiv);

            $(childPageDiv).append(childPageInnerDiv);

            $itemsToInsert[i] = childPageDiv;
        }
        $container.isotope('insert', $($itemsToInsert), $(masterPageDiv));
    }
    else {
        $(masterPageDiv).children('.expand').css('background-image', expandIconPath);
        //jquery reference of all children having the parent's logicalpage id
        var $logicalPageIDOfParentOfChild = $('.childPages').children('.inner').children('.logicalPageID:contains(' + masterPageDiv.id + ')');
        var $childPages = $('.childPages').has($logicalPageIDOfParentOfChild);
        $childPages.unbind("loadingError");
        $childPages.unbind("loadingDone");
        $container.isotope('remove',$childPages);
        $(masterPageDiv).toggleClass('opened');
        var $dirtyFields = $(masterPageDiv).find('.dataDirty');
        var isDirty = getDataDirtyFlag($dirtyFields);
        if (isDirty) {
            PagePresenter.setRules(masterPageDiv);
        }
    }

    PagePresenter.bindChildPagesToCustomLoadingWBDEvent();
}

/**
 * @Description : dialog to indicate incorrect rules configured
 */
PagePresenter.openIncorrectRulesDialog = function() {
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

/**
 *
 * @param masterPageDiv : reference to the parent master page div
 * @returns success or faliure of save operation
 * @Description : save the configured rules to the server
 */
PagePresenter.saveRulesData = function (masterPageDiv) {
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
                        PagePresenter.openIncorrectRulesDialog();
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
                PagePresenter.openIncorrectRulesDialog();
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
        SavePageRules.save("saveRules", finalJson, PagePresenter.onSaveSuccess);
        GraphicDataStore.addToPageRules(finalJson);
        $(function () {
            $("#dialog-rules-save-successfull").dialog({
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

PagePresenter.onSaveSuccess = function (data) {
    console.log(data);
}

/**
 *
 * @param parentMasterPageDiv : the respective master page div reference
 * @Description : toggle each of the elements that need to be removed or added according to
                    whether the rules menu is opened or closed
 */
PagePresenter.toggleRulesView = function (parentMasterPageDiv) {
    $(parentMasterPageDiv).toggleClass('rules-opened');         //enlarge the master page size to fir the rules menu
    $(parentMasterPageDiv).children(".openRules").toggle();     //toggle view of the open rules menu button
    $(parentMasterPageDiv).children(".rule").toggle();          //toggle the rules menu(all the drop-downs)
    $(parentMasterPageDiv).children(".name").toggle();          //toggle the master page name display
    $(parentMasterPageDiv).children(".buttonsHolder").toggle(); //toggle the div behind the buttons

    $isotopeContainer.isotope('reLayout');  //re-layout the isotope positioning once the rules menu has been opened
}

/**
 *
 * @param $dirtyFields : jquery reference of all the data dirty flags
 * @returns boolean indicating whether overall data is dirty or not
 * @Description : check if any of the rules are dirty
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
 * @Description : check if rules exist and display the expand rules button
 */
PagePresenter.displayExpandRulesButton = function(parentMasterPageDiv) {
    var $rules = $(parentMasterPageDiv).children('.rule').children('.then').children('.thenChild');
    if ($rules.length > 0) {
        $(parentMasterPageDiv).children(".expand").toggle();
    }
}

/**
 *
 * @param parentMasterPageDiv : the respective master page div reference
 * @Description : Open the rules configuration menu
 */
PagePresenter.openRulesConfigurationMenu = function(parentMasterPageDiv) {
    //When opening the rules configuration menu the expand button(if visible) needs to be hidden
    $(parentMasterPageDiv).children(".expand").css('display',"none");
    PagePresenter.toggleRulesView(parentMasterPageDiv);
}

/**
 *
 * @param parentMasterPageDiv : reference to the master page div
 * @Description : Open or close the rules configuration menu according to situation
 */
PagePresenter.toggleOpenCloseRules = function (parentMasterPageDiv) {

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
                                var isSaveSuccess = PagePresenter.saveRulesData(parentMasterPageDiv);
                                if(isSaveSuccess){ //Check if successfully saved

                                    //show the expand rules button on the master page if rules exist
                                    PagePresenter.displayExpandRulesButton(parentMasterPageDiv);

                                    //close the rules configuration menu
                                    PagePresenter.toggleRulesView(parentMasterPageDiv);
                                }
                            },

                            //Actions to perform if user chooses the 'Discard' option
                            "Discard": function () {
                                //Close the dialog box
                                $(this).dialog("close");

                                //Discard currently set values and pickup up last saved rules
                                PagePresenter.setRules(parentMasterPageDiv);

                                //show the expand rules button on the master page if rules exist
                                PagePresenter.displayExpandRulesButton(parentMasterPageDiv);

                                //close the rules configuration menu
                                PagePresenter.toggleRulesView(parentMasterPageDiv);
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
                    //PagePresenter.setRules(parentMasterPageDiv);

                    //show the expand rules button on the master page if rules exist
                PagePresenter.displayExpandRulesButton(parentMasterPageDiv);

                //close the rules configuration menu
                PagePresenter.toggleRulesView(parentMasterPageDiv);
            }
        }
        else {
            //Rules menu is closed so proceed to opening rules configuration menu
            PagePresenter.openRulesConfigurationMenu(parentMasterPageDiv);
        }

    }

    else{
        //When child pages have been expanded and rules configuration menu button clicked
        //collapse all the child pages and open the rules configuration menu
        PagePresenter.expandCollapseChildPages(parentMasterPageDiv);
        PagePresenter.openRulesConfigurationMenu(parentMasterPageDiv);

    }
}

/**
 *
 * @param parentDiv reference to the parent rule for the condition to be marked dirty
 * @param ifResetWBD  boolean indicating if the wbd url and mamFileID need to be reset
 * @Description : indicate data as dirty due to changes and also reset wbdurl and mam file id accordingly
 */
PagePresenter.makeRuleDirty = function (parentDiv,ifResetWBD) {
    PagePresenter.makeDirty(parentDiv);
    if(ifResetWBD){
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
}

/**
 * @Description : Called by the splitter when the drag has ended or started
                    in order to re-layout(position) the isotope elements properly
 */
PagePresenter.setContainerRelayout = function(){
    if($isotopeContainer){
        $isotopeContainer.isotope('reLayout');
    }
}

/**
 *
 * @param data
 * @Description : Creates a new view with all the pages under the publication.
                (Callback from GetAllPagesInPublication.get)
 */
PagePresenter.changeViewToShowAllPages = function(data){
    $(document).trigger({
        type: "TREE_ITEM_CLICKED",
        uiData: data,
        nodeType: "Dimension"
    });
}

/**
 * @Description : Function called when the show all pages button is called.
                Brings up all the pages under the current publication
 */
PagePresenter.showAllPages = function(){
    var publicationName = GraphicDataStore.getCurrentView(); //Since the button shows up only when publication
    //is clicked the current view is the publication
    GetAllPagesInPublication.get(publicationName,PagePresenter.changeViewToShowAllPages);
}
