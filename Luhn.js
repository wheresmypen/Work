
var acctNo = "4653459518194410";
var luhnArr = [];
var checkValue = 0;
var total = 0;
var checkNo = 0;

function luhn(acctNo){
    luhnArr = acctNo.toString().split("");
    checkNo = luhnArr.pop();
    luhnArr.reverse();

    var answ = luhnArr.map(calculate)
    for (var i = 0; i < answ.length; i++){
        total = total + answ[i];
    }

    checkValue = (total % 10);

/*    total = answ.forEach(function(number){
        console.log(total);
        return total + number;
    })*/


    console.log('total'+total);



    return checkValue;
}

checkValue = luhn(acctNo);

if (checkValue == checkNo) console.log("good")
    else console.log('bad');



function calculate(numb, idx){
    if (!(idx % 2)) {
        if (numb < 5) {
            return numb * 2;
        }
        else {
            var dbl = numb * 2;
            var remain = (dbl % 10);
            return remain + 1;
        }
    }
    else {
        return +numb;
    }
}