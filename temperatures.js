var temp = [32, 44, 48, 52, 55, 54, 60, 63, 60, 57, 54];

/*function smooth(temp){

    var answer = [temp[0]];

    for (var i = 1; i < temp.length - 1; i++){
      var value = ((temp[i - 1] + temp[i] + temp[i + 1]) / 3);
      answer.push(value);
    }

    answer.push(temp[temp.length - 1]);
    return answer;
}

console.log(smooth(temp));*/

//function smooth(temp){
//
//    var answer = temp.slice(1, temp.length - 1);
//    console.log(answer);
//
//    var newArr = answer.map(function(temp, i){
//        var a =[];
//        a[i] = (temp[i-1]+temp[i]+temp[i+1])/3;
//        return a;
//    })
//
//
//    console.log(answer)
//
///*    for (var i = 1; i < temp.length - 1; i++){
//        var value = ((temp[i - 1] + temp[i] + temp[i + 1]) / 3);
//        answer.push(value);
//    }*/
//
//
//    answer.unshift(temp[0])
//    answer.push(temp[temp.length - 1]);
//    return answer;
//}

function smooth(arr){
    var answer = [];

    arr.forEach(function(num, idx){

    if(idx === 0 || idx === arr.length-1) answer.push(num);
    else{answer.push((arr[idx-1] + arr[idx] + arr[idx+1]) / 3);}

    });


    return answer;

}

    console.log(smooth(temp));


/* function smooth(arr){
     return arr.map(function(num, idx){
       if(idx === 0 || idx === arr.length-1) return num;
       return (arr[idx-1] + arr[idx] + arr[idx+1]) / 3;
     });
   }

//   if on same line doesn't require {}.
//   with the use of return, you don't require an else.

 */