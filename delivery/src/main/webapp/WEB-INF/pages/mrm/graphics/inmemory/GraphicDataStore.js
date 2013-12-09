/**
 *
 * @constructor
 */
var GraphicDataStore = function(){
    var schemaArray=[];
    var currentSchema;
    var commChannelDetails=[];
    var currentFocusedItem;
}

GraphicDataStore.setTagsCollection = function(tagsData){
    this.tagsColl = tagsData;
}

GraphicDataStore.getTagsCollection = function(){
    return this.tagsColl;
}

/**
 *
 * @param schemaData
 */
GraphicDataStore.setSchemaArray = function(schemaData){
    this.schemaArray = schemaData;
}

/**
 *
 * @returns {GraphicDataStore.schemaArray}
 */
GraphicDataStore.getSchemaArray = function(){
    return this.schemaArray;
}

/**
 *
 * @param channelDetails
 */
GraphicDataStore.setCommChannelDetails = function(channelDetails){
    this.commChannelDetails = channelDetails;
}

/**
 *
 * @returns {GraphicDataStore.commChannelDetails}
 */
GraphicDataStore.getCommChannelDetails = function(){
    return this.commChannelDetails;
}

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
 */
GraphicDataStore.setCurrentSchema = function(schema){
    this.currentSchema = schema;
}

/**
 *
 * @returns {GraphicDataStore.currentSchema}
 */
GraphicDataStore.getCurrentSchema = function(){
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
 * @returns {possibleChild array for given dim type}
 */
GraphicDataStore.getPossibleChild = function(dim){
    if(dim === 'root'){
        var arr = [];
        arr.push(this.currentSchema.structure[0].name)
        return arr;
    }else{
        for(var i=0; i< this.currentSchema.structure.length; i++){
            if(dim === this.currentSchema.structure[i].name){
                return this.currentSchema.structure[i].possibleChild;
            }
        }
    }
}

/**
 *
 * @param dim
 * @returns {possibleDropParent array for given dim type}
 */
GraphicDataStore.getPossibleDropParent = function(dim){
    for(var i=0; i< this.currentSchema.structure.length; i++){
        if(dim === this.currentSchema.structure[i].name){
            return this.currentSchema.structure[i].possibleDropParent;
        }
    }
}

/**
 *
 * @param item in coverflow
 */
GraphicDataStore.setCurrentFocusedItem = function(item){
    var arr =   GraphicDataStore.getCommChannelDetails();
    for(var i=0; i< arr.length; i++){
        if(item.content.id == arr[i].id){
            this.currentFocusedItem = GraphicDataStore.getCommChannelDetails()[i];
        }
    }
}

/**
 *
 * @returns {GraphicDataStore.currentFocusedItem}
 */
GraphicDataStore.getCurrentFocusedItem = function(){
    return this.currentFocusedItem;
}