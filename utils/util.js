//获取当前日期，返回格式yyyy-mm-dd
function getDate() {
  var date = new Date();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
}

//获取当前时间，返回格式hh:mm
function getTime(val) {
  if(val) {
    var date = new Date();
    var hour = date.getHours()+val;
    var min = date.getMinutes();
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
  } else {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//删除数组中指定对象，有局限性。用于联系人
function removeByValue(arr, val1, val2) {  
  for(var i=0; i<arr.length; i++) {  
    if(arr[i].name == val1 && arr[i].email == val2) {  
      arr.splice(i, 1);  
      break;  
    }  
  }  
}; 

//删除数组中指定对象，有局限性。用于会议室列表
function removeByValueBr(arr, val1, val2) {  
  for(var i=0; i<arr.length; i++) {  
    if(arr[i].name == val1 && arr[i].id == val2) {  
      arr.splice(i, 1);  
      break;  
    }  
  }  
}; 

module.exports = {
  removeByValue: removeByValue,
  removeByValueBr: removeByValueBr,
  getDate: getDate,
  getTime: getTime
}
