



function findLongestWord(str){
    var answer = {};
    var longest = 0;
    var words = str.trim().split(" ");

    for (var i = 0; i < words.length; i++){

        var word = words[i];

        if (word.length > longest) {
            longest = i;
        }


    }

    answer.word =  words[longest];
    answer.length = words[longest].length;
    return answer;

}


var sentence = "hey hey my my rock and roll will never die"


var answer = findLongestWord(sentence);
console.log(answer.word);