function ViewDimensionDialog(){

}

ViewDimensionDialog.create = function(G,row,col,name){
    var parentNode;
    var currentPath;
    DimensionDialogPresenter.loadClassesDataForDimensinDialog();
    DimensionDialogPresenter.disableAllFieldsOfDimensionDialog(true);
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
            Close: function() {
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
        changeTitle: document.getElementById("ui-id-1").innerHTML="View " + row.type,
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

