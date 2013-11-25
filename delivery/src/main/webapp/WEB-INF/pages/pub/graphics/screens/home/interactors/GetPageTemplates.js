/**
 *
 * @constructor
 */
function GetPageTemplates(){

}

GetPageTemplates.getAll = function(callBack){
    var data = {
        "CSComet":[
            {
                "tempId":1,
                "tempName":"FirstTemplate"
            },
            {
                "tempId":2,
                "tempName":"SecondTemplate"
            },
            {
                "tempId":3,
                "tempName":"ThirdTemplate"
            }
        ],
        "CSSmart":[
            {
                "tempId":1,
                "tempName":"FirstSmartTemplate"
            },
            {
                "tempId":2,
                "tempName":"SecondSmartTemplate"
            },
            {
                "tempId":3,
                "tempName":"ThirdSmartTemplate"
            }
        ]
    }
    callBack(data);
    //Router.loadRequest("getPageTemplates",false,callBack,pageID);
}
