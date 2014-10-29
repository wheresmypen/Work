$(function(){

    var board = []; // three rows of three
    var players = ['x', 'o'];
    var current = 0;
    var msg = $('#msg'); // TODO this will be where we insert game message
    var whos_turn = $('#whos_turn'); // TODO displays which players turn it is
    var total_moves = 0;
    var game_over = false;
    var rowList = ["topRow", "middleRow", "bottomRow", "leftCol", "middleCol", "rightCol", "bend", "bendS"]
    var winner = "";

    $('tr').each(function(idx, row){
        board.push( $(row).find('td').toArray() );
//        console.log(board);
    });

    reset();

    $('td').on('click', click);
    $('.reset').on('click', reset);

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function click() {
        var el = $(this);

        msg.text("");

        if (game_over) return;

        if (el.text() !== '') return msg.text('already set');

        total_moves++;

        el.text(players[current]);

        if (current < players.length - 1) {
            current++;
        } else {
            current = 0;
        }

        whos_turn.text('player Z-boy' + (current + 1));

//    Same as Nathan's to here

        checkForWin($('td')); // passes the clicked td object to "c4w"

        if(total_moves == 9 && game_over == false){
            game_over = true;
            msg.text("game over. no moves left.");
        }

    }

    function checkForWin(clickedSquare){

//      checks each of 8 possible directions for three in a row

        rowList.forEach(findMatch);

        if (winner) {

            msg.text('player ' + ( players.indexOf(winner) + 1) + ' wins!');
            whos_turn.text("");
            game_over = true;
        }

    }

    function findMatch(row, idx){

        var array = $("."+row);  // sets row jquery object to a variable
        array = array.toArray();  // converts jquery object to an array

//      checks the case of each possible first td jquery object
        switch(true) {

            case (array[0].innerHTML =='o' && !game_over):
                winner = checkRow(array);
                break;

            case (array[0].innerHTML =='x' && !game_over):
                winner = checkRow(array);
                break;

            default:
                break;

        return winner;

        }

//      checks to see if all elements in a row are x's or o's
        function checkRow(list){

            if (list[0].innerHTML == list[1].innerHTML && list[0].innerHTML == list[2].innerHTML){
               game_over=true;
               $(array).addClass("red");
               return list[0].innerHTML;
           }

            else {
               return;
           }
        }

        return;
    }

    function reset(){
        $('td').removeClass('red').text('');
        current = 0;
        msg.text('');
        whos_turn.text('player ' + (current +1));
        game_over = false;
        total_moves = 0;
        winner="";
    }

});