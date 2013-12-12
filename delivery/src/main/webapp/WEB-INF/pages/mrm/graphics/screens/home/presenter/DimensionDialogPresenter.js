var DimensionDialogPresenter = function(){

}

DimensionDialogPresenter.loadClassesDataForDimensinDialog = function(){
    if(!GraphicDataStore.getIfClassesLoaded()){
        ClassPresenter.getAllClasses(function(data){
            data = eval('(' + data + ')');
            GraphicDataStore.setClassesCollecation(data);
            DimensionDialogPresenter.fillClassDropDown(data);
        });
    }
}


DimensionDialogPresenter.fillClassDropDown = function(classesData){
    for(var i=0; i< classesData.length; i ++){
        var opt = document.createElement('option');
        opt.value = classesData[i].id;
        opt.innerHTML = classesData[i].className;
        document.getElementById("classDropDown").appendChild(opt);
    }
}


DimensionDialogPresenter.getAllAttributes = function(){
    var divContainer = $('#classAttributes');
    var customAttributes = {};
    for(var i=0;i<divContainer.children().length ;i++){
        console.log($(divContainer).children()[i]);
        //console.log(divContainer.childNodes[i]);
        var attributeName = $(divContainer.children()[i]).children()[0].innerHTML;
        var attributeValue = $(divContainer.children()[i]).children()[1].value;
        customAttributes[attributeName] = attributeValue;
    }
    return customAttributes;
}


DimensionDialogPresenter.onChangeOfClass = function(){
    var selectedClassId = $('#classDropDown').val();
    ClassPresenter.getAttributesForClass(selectedClassId,DimensionDialogPresenter.onAttributesLoaded);
}

DimensionDialogPresenter.onAttributesLoaded = function(data,editMode){
    data = eval('(' + data + ')');

    $('#classAttributes').empty();
    for(var i=0; i< data.length; i++){
        var opt = document.createElement('div');
        var labelDiv = document.createElement('div');
        var input = document.createElement('input');
        input.id = data[i] + i;
        labelDiv.innerHTML = data[i];
        opt.appendChild(labelDiv);
        opt.appendChild(input);
        document.getElementById("classAttributes").appendChild(opt);
    }

}


DimensionDialogPresenter.disableAllFieldsOfDimensionDialog = function(flag){
    $("#name").attr('disabled', flag);
    $("#manager").attr('disabled', flag);
    $("#budgetOwner").attr('disabled', flag);
    $("#budget").attr('disabled', flag);
    $("#currency").attr('disabled', flag);
    $("#startdate").attr('disabled', flag);
    $("#enddate").attr('disabled', flag);
    $("#classDropDown").attr('disabled', flag);
}

DimensionDialogPresenter.showAttributesWithValues = function(attributesData){
    $('#classAttributes').empty();
    var i=1;
    $.each(attributesData, function (key, item) {
        var opt = document.createElement('div');
        var labelDiv = document.createElement('div');
        var input = document.createElement('input');
        input.id = key + i;
        input.value  = item;
        labelDiv.innerHTML = key;
        opt.appendChild(labelDiv);
        opt.appendChild(input);
        document.getElementById("classAttributes").appendChild(opt);
        i++;
    });
}


DimensionDialogPresenter.preInsertDataInDimensionDialog = function(rowData){
    if(rowData.dimensionInfo.classId){
        $('#classDropDown').val(rowData.dimensionInfo.classId);
    }
    if(rowData.dimensionInfo.customAttributes){
        //add in list and flush the existing ones
        DimensionDialogPresenter.showAttributesWithValues(rowData.dimensionInfo.customAttributes);

    }
    if(rowData.name)
        $("#name").val(rowData.name);
    if(rowData.manager)
        $("#manager").val(rowData.manager);
    if(rowData.budgetOwner)
        $("#budgetOwner").val(rowData.budgetOwner);
    if(rowData.budgetOwner){
        //Need to extract last charachter for currenct and rest is budget
        var currency = rowData.budget.substr(rowData.budget.length - 1);
        var budget = rowData.budget.substring(0, rowData.budget.length - 1);
        $("#budget").val(budget);
        $("#currency").val(currency);
    }
    if(rowData.startDate){
        var startDate = new Date(rowData.startDate).toMDY();
        $("#startdate").val(startDate);
    }

    if(rowData.endDate){
        var endDate = new Date(rowData.endDate).toMDY();
        $("#enddate").val(endDate);
    }
}

DimensionDialogPresenter.closeDimensionDialog = function(){
    $("#dialog-form").dialog( "close" );
}