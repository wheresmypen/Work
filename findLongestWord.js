



function findLongestWord(str){
    var longest = 0;
    var words = str.trim().split(" ");

    for (var i = 0; i < words.length; i++){

        var word = words[i];

        if (word.length > longest) {
            longest = i;
        }


    }


    return words[longest];

}


var sentence = "the quick brown fox jumped over the lazy dog"


var answer = findLongestWord(sentence);
console.log(answer);