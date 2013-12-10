var TagsPresenter = function(){

}

TagsPresenter.addTagToMasterList = function(nameOfTag,callBack){
    AddTags.add(nameOfTag,callBack);
}

TagsPresenter.updateTagsForDimension = function(dimensionId,tagsList,callBack){
    UpdateTagsOfDimension.update(dimensionId,tagsList,callBack);
}

TagsPresenter.getTags = function(callBack){
    GetTags.getAllTags(callBack);
}