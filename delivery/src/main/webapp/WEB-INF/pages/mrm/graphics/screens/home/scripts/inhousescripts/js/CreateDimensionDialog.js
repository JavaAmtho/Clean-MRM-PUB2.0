function CreateDimensionDialog(){

}

CreateDimensionDialog.create = function(G,row,col,name){
    var parentNode;
    var currentPath;
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

            "Create ": function() {

                var errorMsg = "";
                var popupValid = true;
                var bValid = true;
                var dimensionName = $( "#name" ),
                    manager = $( "#manager" ),
                    startdate = $( "#startdate" ),
                    enddate = $( "#enddate" ),
                    budgetowner = $( "#budgetOwner" ),
                    budgetamount = $( "#budget"),
                    currency = $( "#currency" );

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
                    input.name=dimensionName.val();
                    input.managerName=manager.val();
                    input.startDate=startdate.val();
                    input.endDate=enddate.val();
                    input.budgetOwner = budgetowner.val();
                    if(budgetamount.val() != "")
                        input.budget = budgetamount.val() + " " + currency.val();
                    input.type = name;
                    input.Items = [];
                    if(input.name != null && input.name !=""){
                        parentNode = row;
                        if(parentNode.type == "root"){
                            currentPath = "-1";
                        }
                        else{
                            //alert(parentNode.id)
                            currentPath = parentNode.path+","+ parentNode.id;
                            if(currentPath.indexOf("-1")==0)
                                currentPath = currentPath.match(/([^,]*),(.*)/)[2];   //To remove -1 root folder
                        }

                        input.path=currentPath;

                        var flag = isFolder(name);
                        var prefix=getUrlPrefix(name,"create");
                        // newNode = createNewRow(input.name,name,currentPath,"cal1.png");
                        GanttChartPresenter.createDimension(prefix,name,input,currentPath,flag,GanttChart.addNode);
                    }

                }
            },
            Cancel: function() {
                closeDimensionDialog();
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
        changeTitle: document.getElementById("ui-id-1").innerHTML="Create New " + name,
        changeLabel: document.getElementById("dimensionName").innerHTML=name + " Name",
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

function closeDimensionDialog(){
    $("#dialog-form").dialog( "close" );
}