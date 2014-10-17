
small_ln = 1;
large_ln =5;

function brickLayer(small, large, total_length){
    answer = {};
    large_bricks = 0;

    total_bricks = (small * small_ln) + (large * large_ln);

    if (total_bricks >= total_length){

        answer.state = "Made it";


        for (var i = 0; i <= (large+1); i++){
            if ((i * large_ln) >= total_length){
              large_bricks = i - 1;
              break;
            }
            else large_bricks = large;
        }

        answer.lb = large_bricks;
        answer.sb = total_length - (large_bricks * large_ln)

    }

    else{
        answer.state = "Need more bricks";
    }



  return answer;

}

var Sup_says = brickLayer(8, 14, 78);
console.log(answer.state);
if (answer.state === "Made it"){
    console.log("Use " + answer.lb + " large bricks and " + answer.sb + " small bricks.")
}