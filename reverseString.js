
var answer = [];
var result = [];

function reverseString(word) {
    answer = word.split("");

/*    for (var i = answer.length - 1; i >= 0; i--){

        result += answer[i];

    }*/

    var result = answer.forEach(convert)/*{
        return answer[(answer.length - i)];
    })*/

    function convert(word, index){
        return word[(word.length - index)];
    }

//    result = result.join("");
    return result;

}

console.log(reverseString("anthropocenentic"));