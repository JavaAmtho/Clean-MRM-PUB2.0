function EditDimensionDialog(){

}

EditDimensionDialog.currentRow;
EditDimensionDialog.input;

EditDimensionDialog.create = function(G,row,col,name){
    var parentNode;
    var currentPath;
    EditDimensionDialog.currentRow = row;

    DimensionDialogPresenter.loadClassesDataForDimensinDialog();

    DimensionDialogPresenter.disableAllFieldsOfDimensionDialog(false);
    DimensionDialogPresenter.preInsertDataInDimensionDialog(row);


    $( "#dialog-form" ).dialog({
        height: 490,
        width: 500,
        modal: true,
        resizable: false,
        show: {
            effect: "clip",
            duration: 500
        },
        hide: {
            effect: "clip",
            duration: 500
        },
        buttons: {

            "Save ": function() {

                var errorMsg = "";
                var popupValid = true;
                var bValid = true;
                var dimensionName = $( "#name" ),
                    manager = $( "#manager" ),
                    startdate = $( "#startdate" ),
                    enddate = $( "#enddate" ),
                    budgetowner = $( "#budgetOwner" ),
                    budgetamount = $( "#budget"),
                    currency = $( "#currency"),
                    classId = $("#classDropDown");


                popupValid = checkNull(dimensionName);
                popupValid = popupValid && checkNull(manager);
                popupValid = popupValid && checkNull(startdate);
                popupValid = popupValid && checkNull(enddate);
                popupValid = popupValid && checkNull(budgetowner);
                popupValid = popupValid && checkNull(budgetamount);

                popupValid &= checkAlpha(manager);
                popupValid &= checkAlpha(budgetowner);

                popupValid &= checkDate(startdate);
                popupValid &= checkDate(enddate);
                if(!popupValid){
                    errorMsg += "Fields should not be EMPTY!";
                }

                var startdateDATE = new Date(startdate.val()); //    in order to do comparisons between
                var enddateDATE = new Date(enddate.val());     //    dates they have to be converted to date objects

                if(startdateDATE>enddateDATE){
                    //console.log(startdateDATE)
                    errorMsg += "Please verify start and end dates!";
                    popupValid =  false;
                    startdate.addClass( "ui-state-error") ;
                    enddate.addClass( "ui-state-error") ;
                }
                if(!$.isNumeric( budgetamount.val() )){
                    errorMsg += "Please verify budget!";
                    popupValid =  false;
                    budgetamount.addClass( "ui-state-error") ;
                }
                updateTips(errorMsg);

                if(popupValid == true){
                    input = new Object();
                    //Constant values while editing dimension
                    input.id=row.id;
                    input.type=row.type;
                    input.groupId=row.groupId;
                    input.path=row.path;
                    input.currency=row.currency

                    //Possible changed values while editing dimension by user
                    input.title=dimensionName.val();
                    input.name=dimensionName.val();
                    input.manager=manager.val();
                    input.startDate=startdate.val();
                    input.endDate=enddate.val();
                    input.budgetOwner = budgetowner.val();
                    input.classId = classId.val();
                    input.customAttributes = DimensionDialogPresenter.getAllAttributes();
                    if(budgetamount.val() != "")
                        input.budget = budgetamount.val() + " " + currency.val();

                    var prefix =getUrlPrefix(row.type,"update");
                    EditDimensionDialog.input = input;
                    GanttChartPresenter.updateDimension(prefix,input,EditDimensionDialog.onUpdate);

                }
            },
            Cancel: function() {
                DimensionDialogPresenter.closeDimensionDialog();
            }
        },
        close: function() {
            //allFields.val( "" ).removeClass( "ui-state-error" );
            $( "#name" ).removeClass("ui-state-error") ;
            $( "#manager" ).removeClass("ui-state-error");
            $( "#startdate" ).removeClass("ui-state-error");
            $( "#enddate" ).removeClass("ui-state-error");
            $( "#budgetOwner" ).removeClass("ui-state-error");
            $( "#budget").removeClass("ui-state-error");
            $( "#currency" ).removeClass("ui-state-error");
            clearForm();
        },
        autoOpen :true,
        changeTitle: document.getElementById("ui-id-1").innerHTML="Edit " + row.type,
        changeLabel: document.getElementById("dimensionName").innerHTML=row.type + " Name",
        datePicker: $(function() {
            $( '.datePicker' ).datepicker({
                showOn: 'both',
                duration: "slow",
                buttonImage: '../../../graphics/screens/home/images/calendar-icon.png',
                buttonImageOnly: true,
                //changeMonth: true,
                changeYear: true,
                showAnim: 'blind',
                showButtonPanel: true
            });
        })
    });

}

EditDimensionDialog.onUpdate = function(rowData){
    DimensionDialogPresenter.closeDimensionDialog();
    Grids[0].SetValue(EditDimensionDialog.currentRow,"title",EditDimensionDialog.input.title,1);
    Grids[0].SetValue(EditDimensionDialog.currentRow,"name",EditDimensionDialog.input.name,1);
    Grids[0].SetValue(EditDimensionDialog.currentRow,"budgetOwner",EditDimensionDialog.input.budgetOwner,1);
    Grids[0].SetValue(EditDimensionDialog.currentRow,"budget",EditDimensionDialog.input.budget,1);
    Grids[0].SetValue(EditDimensionDialog.currentRow,"startDate",EditDimensionDialog.input.startDate,1);
    Grids[0].SetValue(EditDimensionDialog.currentRow,"endDate",EditDimensionDialog.input.endDate,1);
    Grids[0].SetValue(EditDimensionDialog.currentRow,"manager",EditDimensionDialog.input.manager,1);
    Grids[0].SetScrollTop(Grids[0].GetScrollTop()+30) ;

    Grids[0].ScrollToDate(input.startDate,"Left");
    alertify.success(""+input.type+" edited successfully");
}


