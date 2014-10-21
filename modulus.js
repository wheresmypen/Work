



function collatz(num){
    var top = num;
    var steps = 0;

    while (top > 1){

        if (top % 2){
            top = (top * 3) + 1;
        }

        else {
            top = top / 2;
        }

        steps++;
    }

    return steps;

}

console.log(collatz(47));