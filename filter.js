



/*
function isBigEnough(element, max) {
    return element<=max;
}
  var filtered = [[12, 5, 8, 130, 44],12].filter(isBigEnough);
// filtered is [12, 130, 44]

console.log(filtered)*/


console.log(maxVals([2, 4, 6, "hi", 10], 5));

function maxVals(arr, max){
    return arr.filter(function(val,idx){
        return (+val !== val);
    });
}
