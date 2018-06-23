var searchCity = ['北京', '上海', '深圳', '广州'];

//对会议室按城市进行分组
function boardroomList(arr) {
    var tempObj=[];  
    for (var i = 0; i < searchCity.length; i++) {
        var initial = searchCity[i];
        var boardroomInfo = [];
        var tempArr = {};
        tempArr.initial = initial;  

        for (var j = 0; j < arr.length; j++) {
            if (initial == arr[j].initial) {
                boardroomInfo.push(arr[j]);
            }
        }

        tempArr.boardroomInfo = boardroomInfo;
        tempObj.push(tempArr);
    }
    return tempObj;
}

module.exports = {
    boardroomList: boardroomList
}