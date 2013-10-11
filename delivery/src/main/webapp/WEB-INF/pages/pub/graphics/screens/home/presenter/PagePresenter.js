/**
 *
 * @constructor
 */
function PagePresenter() {
}

/**
 *
 * @param parentMasterPageDiv
 * Sets the already saved page rules
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
                    var ruleStatementDiv = PagePresenter.createRuleStatement(pageRule, parentMasterPageDiv);
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
                            content = "&nbsp;&nbsp;<select onchange='PagePresenter.modifyValueDropDown(this)' " +
                                "onclick='event.stopPropagation()' class='rulesText groupType selectpicker span2' data-width='auto' value='-1'>" +
                                "<option selected='selected' disabled='disabled'>Choose</option>";
                            for (var k = 0; k < variablesList.length; k++) {
                                content += "<option>" + variablesList[k] + "</option>";
                            }
                            content += "</select>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            content = "<select onchange='PagePresenter.makeRuleDirty(this.parentNode,false)' " +
                                "onclick='event.stopPropagation()' onchange='PagePresenter.makeDirty(this,event)' class='rulesText operation selectpicker span2' data-width='auto'><option selected='selected'>=</option>" +
                                "</select>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            content = "<select onclick='event.stopPropagation()' " +
                                "onchange='PagePresenter.makeDirty(this.parentNode,event)'  class='input rulesText value selectpicker span2' data-width='auto' type='text'>" +
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
                                "onclick='PagePresenter.removeNew(this.parentNode,event)'>-</span>";
                            whenDiv.innerHTML = whenDiv.innerHTML + content;
                            content = "<p class='hidden dataDirty'>0</p>"
                            whenDiv.innerHTML = whenDiv.innerHTML + content;

                            ruleStatementDiv.appendChild(whenDiv);


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
    else {
        $dirtyFields.html('0');
    }

    $(".selectpicker").selectBoxIt({
        autoWidth: false
    });
}

/**
 *
 * @param pageRule
 * @param parentMasterPageDiv
 * @returns {HTMLElement} which is newRuleStatement
 */
PagePresenter.createRuleStatement = function(pageRule, parentMasterPageDiv){
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
    $(masterTemplateDropDown).attr('onchange','PagePresenter.makeRuleDirty(this.parentNode,true)');
    $(masterTemplateDropDown).attr('data-width','45%');

    var dropDownOptions;
    dropDownOptions = createDefaultDisabledDropDownOption();
    $(dropDownOptions).html('Select Master Template');
    $(masterTemplateDropDown).append(dropDownOptions);
    /*
     ruleDataContent += "<select onchange='PagePresenter.makeRuleDirty(this.parentNode,true)' " +
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
    ruleDataContent = "<select onchange='PagePresenter.makeRuleDirty(this.parentNode,false)' onclick='event.stopPropagation()' " +
        "class='rulesText assortment selectpicker span3' data-width='35%'><option selected='selected' disabled='disabled' value='-1'>Select Assortment</option>";
    for (var j = 0; j < assortmentList.length; j++) {
        ruleDataContent += "<option>" + assortmentList[j].name + "</option>";
    }
    ruleDataContent += "</select>";
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    ruleDataContent = "<span class='buttons remove' onclick='PagePresenter.removeNew(this.parentNode,event)'>-</span>"
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    ruleDataContent = "<span class='buttons addCondition' onclick='PagePresenter.newCondition(this.parentNode)'>+</span>"
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    ruleDataContent = "<p class='hidden dataDirty'>0</p>"
//    newRuleStatementDiv.innerHTML = newRuleStatementDiv.innerHTML + ruleDataContent;
    $(newRuleStatementDiv).append(ruleDataContent);
    return newRuleStatementDiv;
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
PagePresenter.openURL = function (childPageInnerDiv) {
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
PagePresenter.addClickEventForWBDPopup = function (url, childPageInnerDiv) {

//	var config = EngineDataStore.getPublicationDetailsArray()["Config"];
//    url = url.replace("../admin",  config.host+config.context+"/admin");
    var $childPage = $(childPageInnerDiv);
    $childPage.children('.wbdURL').html(url);
    $imageReference = $childPage.children('.popupImage');
    $imageReference.attr('onclick', "PagePresenter.openURL(this.parentNode)");
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
PagePresenter.openWhiteBoard = function (childPageInnerDiv) {

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
PagePresenter.setClassNamesToChildPagesForFilterByCondition = function(childPageDiv, $dimensionValues) {
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


PagePresenter.expandCollapseChildPages = function (masterPageDiv, event) {

    var $container = $isotopeContainer;
    //Check if master page has been expanded into the child pages
    if (!$(masterPageDiv).hasClass('opened')) {
        //Expand the master page into its child pages
        var $dirtyFields = $(masterPageDiv).find('.dataDirty');
        var isDirty = getDataDirtyFlag($dirtyFields);               //Check if dirty(in case previously wbd created)
        if (isDirty) {                                          //***NOT SURE IF I HAVE TO KEEP THIS*****
            PagePresenter.setRules(masterPageDiv);              //***REMEMBER TO CHECK AND DELETE********
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
                PagePresenter.setClassNamesToChildPagesForFilterByCondition(childPageDiv,$dimensionValues);
            }
            var childPageInnerDiv = PagePresenter.createChildPageInnerDiv(currentRule, masterPageDiv);

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
            PagePresenter.addClickEventForWBDPopup(wbdURL, $innerDiv[0]);               //
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

PagePresenter.onSaveSuccess = function (data) {
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






/*
 arguments : parentMasterPageDiv - the respective master page div reference
 return : void
 Description : toggle each of the elements that need to be removed or added according to
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
PagePresenter.displayExpandRulesButton = function(parentMasterPageDiv) {
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
PagePresenter.openRulesConfigurationMenu = function(parentMasterPageDiv) {
    //When opening the rules configuration menu the expand button(if visible) needs to be hidden
    $(parentMasterPageDiv).children(".expand").css('display',"none");
    PagePresenter.toggleRulesView(parentMasterPageDiv);
}

/*
 arguments : parentMasterPageDiv - reference to the master page div
 return : void
 Description : Open or close the rules configuration menu according to situation
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

                                //show the expand rules button on the master page if rules exist
                                PagePresenter.displayExpandRulesButton(parentMasterPageDiv);

                                //close the rules configuration menu
                                PagePresenter.toggleRulesView(parentMasterPageDiv);

                                //Discard currently set values and pickup up last saved rules
                                PagePresenter.setRules(parentMasterPageDiv);
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


/*
 arguments : groupTypeDropDown - reference to the group type drop down(target group/region select drop-down)
 return : void
 Description : According to value selected in the group type drop-down modify the values in the value drop-down
 */
PagePresenter.modifyValueDropDown = function (groupTypeDropDown) {
    $(groupTypeDropDown.parentNode).children('.dataDirty').html('1');

    //We encountered some issues after using the new drop-down component while modifying the
    //values in the drop-down. So instead of modifying the values we replace the entire
    //drop-down manually.

    var options = "<select onclick='event.stopPropagation()' " +
        "onchange='PagePresenter.makeDirty(this.parentNode,event)'  " +
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


/*
 arguments : parentThenChildDiv - reference to the parent rule for the condition to be added
 return : void
 Description : Create a new condition for the rule(Called on the '+' next to the rule)
 */
PagePresenter.newCondition = function (parentThenChildDiv) {
    //Set dirty flag to the paren thenChild
    $(parentThenChildDiv).children('.dataDirty').html('1');


    var newConditionDiv = document.createElement("div");        //Create new condition
    $(newConditionDiv).addClass("whenChild row-fluid");         //in the parent rule div

    var variablesList = groupTypes;
    content = "&nbsp;&nbsp;<select onchange='PagePresenter.modifyValueDropDown(this)' " +  //Form drop-down
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
        "onchange='PagePresenter.makeDirty(this.parentNode,event)'  " +                 //Form the basic
        "class='input rulesText value selectpicker span2' " +                           //drop-down
        "data-width='auto' type='text'>" +                                              //for the
        "<option selected='selected' disabled='disabled' value='-1'>Choose</option>" +  //value field
        "</select>";                                                                    //
    newConditionDiv.innerHTML = newConditionDiv.innerHTML + content;    //Add the value drop-down to the parent div


    //Add the '-' button to let user remove the condition
    var content = "&nbsp;&nbsp;<span class='buttons remove' " +
        "onclick='PagePresenter.removeNew(this.parentNode,event)'>-</span>";
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
PagePresenter.newRule = function (parentThenDiv) {
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
    content += "<select onclick='event.stopPropagation()' onchange='PagePresenter.makeRuleDirty(this.parentNode,true)' " +
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
    content = "<select onchange='PagePresenter.makeRuleDirty(this.parentNode,false)' onclick='event.stopPropagation()' " +
        "class='rulesText assortment selectpicker span3' data-width='35%'>" +
        "<option selected='selected' value='-1'>Select Assortment</option>";
    console.log(assortmentList)
    for (var i = 0; i < assortmentList.length; i++) {
        content += "<option>" + assortmentList[i].name + "</option>";
    }
    content += "</select>";
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;//Add assortments dropdown to the new rule div

    //Add the add new condition and remove rule buttons to the new rule div
    content = "<span class='buttons remove' onclick='PagePresenter.removeNew(this.parentNode,event)'>-</span>"
    newRuleDiv.innerHTML = newRuleDiv.innerHTML + content;
    content = "<span class='buttons addCondition' onclick='PagePresenter.newCondition(this.parentNode)'>+</span>"
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
PagePresenter.removeNew = function (reference, event) {
    $(reference).children('.dataDirty').html('1');
    $(reference.parentNode).children('.dataDirty').html('1');
    reference.parentNode.removeChild(reference);
    return false;
}

/*
 Description : Called by the splitter when the drag has ended or started
 in order to re-layout(position) the isotope elements properly
 */
PagePresenter.setContainerRelayout = function(){
    if($isotopeContainer){
        $isotopeContainer.isotope('reLayout');
    }
}

/*
 Description : Creates a new view with all the pages under the publication.
 (Callback from GetAllPagesInPublication.get)
 */
PagePresenter.changeViewToShowAllPages = function(data){
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
PagePresenter.showAllPages = function(){
    var publicationName = GraphicDataStore.getCurrentView(); //Since the button shows up only when publication
    //is clicked the current view is the publication
    GetAllPagesInPublication.get(publicationName,PagePresenter.changeViewToShowAllPages);
}
