/**
 * Created by Rohan H. Dani
 * User: CS13
 * Date: 11/8/13
 * Time: 3:52 PM
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 * @constructor  GraphicDataStore
 */
var GraphicDataStore = function(){
    var schemaArray=[];
    var currentSchema;
    var prodcutsArr=[];
    var currentAssortment;
    var pageRulesArr;
    var masterTemplateList;
    var currentPublication;
    var assortmentsList;
    var loadingRulesList;
    var publicationPosition;
    var currentPublication;
}

/**
 *
 * @param currentPublication
 * @description set the publication name of the current view element
 */
GraphicDataStore.setCurrentPublication = function(currentPublication){
    console.log(currentPublication);
    this.currentPublication = currentPublication;
}

/**
 *
 * @returns currentPublication if true
 * @description get the name of the current view's publication
 */
GraphicDataStore.getCurrentPublication = function(){
    if(this.currentPublication){
        return this.currentPublication;
    }
    else{
        return "";
    }
}

/**
 *
 * @param ruleID
 * @returns true if loadingRulesList[rileID] equals 'loading' else false
 * @description check if the rule has a loading status
 */
GraphicDataStore.checkIfRuleLoading = function(ruleID){
    if(!this.loadingRulesList){
        this.loadingRulesList = {};
    }
    if(this.loadingRulesList[ruleID] == 'loading'){
        return true;
    }
    else{
        return false;
    }
}

/**
 *
 * @param ruleID
 * @description remove the loading status from the rule
 */
GraphicDataStore.stopLoadingStatus = function(ruleID){
    if(!this.loadingRulesList){
        this.loadingRulesList = {};
    }
    this.loadingRulesList[ruleID] = "";
}

/**
 *
 * @param ruleID
 * @description add the loading status to the rule
 */
GraphicDataStore.addRuleToLoadingList = function(ruleID){
    if(!this.loadingRulesList){
        this.loadingRulesList = {};
    }
    this.loadingRulesList[ruleID] = "loading"
}

/**
 *
 * @param pageID
 * @param assortments
 * @description add the assortment to the list of assortments for the respective page
 */
GraphicDataStore.pushToAssortmentsList = function(pageID,assortments){
    if(!this.assortmentsList){
        this.assortmentsList = {};
    }
    this.assortmentsList[pageID] = assortments;
}

/**
 *
 * @param pageID
 * @returns Array assortmentList[] if assortmentList, else null
 * @description get all the assortments for the respective page
 */
GraphicDataStore.getAssortmentsByPageID = function(pageID){
    if(this.assortmentsList){
        return this.assortmentsList[pageID];
    }
    else{
        return null;
    }
}

/**
 *
 * @param obj
 * @description set the name of the view element that is activate on the tree
 */
GraphicDataStore.setCurrentView = function(obj){
    this.currentView = obj;
}

/**
 *
 * @returns currentView Object
 * @description get the name of the currently activate element on the dyna tree
 */
GraphicDataStore.getCurrentView = function(){
    return this.currentView;
}

/**
 *
 * @param obj
 * @description set the list of master template ids
 */
GraphicDataStore.setMasterTemplateList = function(obj){
    this.masterTemplateList = obj;
}

/**
 *
 * @returns masterTemplateList Object
 * @description get the list of master template ids
 */
GraphicDataStore.getMasterTemplateList = function(){
    return this.masterTemplateList;
}


/**
 *
 * @param id
 * @returns pageRulesArr if Array[rules[i].pageRules] else undefined
 * @description get the page rule for a particular page
 */
GraphicDataStore.getPageRuleById = function(id){
    if(this.pageRulesArr){
        return this.pageRulesArr[this.currentView + "." + id];
    }
    else{
        return undefined;
    }
}

/**
 *
 * @param rules
 * @description add all the page rules for all the pages
 */
GraphicDataStore.addAllPageRules = function(rules){
    if(!this.pageRulesArr){
        this.pageRulesArr = {};
    }
    if(rules != null && rules.length > 0){
        for(var i = 0 ; i < rules.length ; i++){
            if(rules[i] != null){
                this.pageRulesArr[rules[i].id] = rules[i].pageRules;
            }
        }
    }
}

/**
 *
 * @param rule
 * @description add a rule corresponding to a page
 */
GraphicDataStore.addToPageRules = function(rule){
    if(!this.pageRulesArr){
        this.pageRulesArr = {};
    }
    this.pageRulesArr[rule.logicalPageID] = rule.pageRules;
}


/**
 *
 * @param additionalInfo
 * @param ruleID
 * @param logicalPageID
 * @description add the additional information(mamFileID and wbdURL) to an existing rule
 */
GraphicDataStore.addAdditionalInformationToPageRules = function(additionalInfo, ruleID, logicalPageID){
    console.log(this.pageRulesArr[logicalPageID]);
    if(this.pageRulesArr){
        var pageRules = this.pageRulesArr[logicalPageID];
        if(pageRules){
            for(var i = 0 ; i < pageRules.length ; i++){
                if(pageRules[i].ruleID == ruleID){
                    pageRules[i].additionalInformation.mamFileID =  additionalInfo.mamFileID;
                    pageRules[i].additionalInformation.editUrl =  additionalInfo.editorURL;
                }
            }
        }
    }
    console.log(this.pageRulesArr[logicalPageID]);
}


/**
 *
 * @param obj
 * @description sets the currentAssortment which is opened by clicking in the tree
 */
GraphicDataStore.setCurrentAssortment = function(obj){
    this.currentAssortment = obj;
}

/**
 *
 * @returns currentAssortment Object
 * @description gets the currentAssortment which is opened by clicking in the tree
 */
GraphicDataStore.getCurrentAssortment = function(){
    return this.currentAssortment;
}

/**
 *
 * @param arr
 */
GraphicDataStore.setProdcutsArr = function(arr){
    this.prodcutsArr = arr;
}

/**
 *
 * @param item
 * @description adds the product to the currentAssortment which is opened by clicking in the tree
 */
GraphicDataStore.addProdcut = function(item){
    this.prodcutsArr.push(item);
}

/**
 *
 * @returns prodcutsArr
 * @description gets all products which are dragged inside the currentAssortment which is opened by clicking in the tree
 */
GraphicDataStore.getProdcutsArr = function(){
    return this.prodcutsArr;
}

/**
 *
 * @param schemaData
 * @description sets all viewStructures
 */
GraphicDataStore.setSchemaArray = function(schemaData){
    this.schemaArray = schemaData;
}

/**
 *
 * @returns GraphicDataStore.schemaArray
 * @description gets all viewStructures
 */
GraphicDataStore.getSchemaArray = function(){
    return this.schemaArray;
}

/**
 * setDefaultSchema function
 * @description sets default schema from all viewStructures
 */
GraphicDataStore.setDefaultSchema = function(){
    for(var i=0; i< this.schemaArray.length; i++){
        if(this.schemaArray[i].default == "true"){
            GraphicDataStore.setCurrentSchema(this.schemaArray[i]);
        }
    }
}

/**
 *
 * @param schema
 * @description sets default viewStructure as currentViewStucture
 */
GraphicDataStore.setCurrentSchema = function(schema){
    this.currentSchema = schema;
    var schemaSplit = schema.name.split("-");
    this.publicationPosition = schemaSplit.indexOf("Publication");
}

/**
 *
 * @returns indexOf("Publication")
 */
GraphicDataStore.getPublicationPosition = function(){
    return this.publicationPosition;
}

/**
 *
 * @param schema
 * @returns currentSchema
 */
GraphicDataStore.getCurrentSchema = function(schema){
    return this.currentSchema;
}


/**
 *
 * @returns {string}
 */
GraphicDataStore.getFirstDimension = function(){
    return this.currentSchema.structure[0].name+"s";
}

/**
 *
 * @param dim
 * @returns ["MarketingInitiative"] if dim is 'root', else ["Campaign"] or ["SubCampaign"] etc.
 */
GraphicDataStore.getPossibleChild = function(dim){
    if(dim === 'root'){
        var arr = [];
        arr.push(this.currentSchema.structure[0].name)
        return arr;
    }
    else{
        for(var i=0; i< this.currentSchema.structure.length; i++){
            if(dim === this.currentSchema.structure[i].name){
                return this.currentSchema.structure[i].possibleChild;
            }
        }
    }

}

/**
 * setSchemaLabel function
 */
GraphicDataStore.setSchemaLabel = function(){
    $("#txt").show();
    $("#txt").text(this.currentSchema.name);
}