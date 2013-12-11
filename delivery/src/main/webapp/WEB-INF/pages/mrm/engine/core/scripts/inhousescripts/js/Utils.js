(function() {
    Date.prototype.toMDY = Date_toMDY;
    function Date_toMDY() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return month + "/" + day+ "/" +year ;
    }
})();