


function isSpeeding(speed, isBirthday){

if (isBirthday){
    speed =  speed -5;
}

var penalty = 0;


    if (speed > 60){
        penalty++;
    }

    if (speed > 80){
        penalty++;
    }



return penalty;
}


var copSays = isSpeeding(86);
console.log(copSays);