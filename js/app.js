/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

function resetCount(){
    count = 0;
    $('.moves').text(count);
}

function incCount(){
    count ++;
    $('.moves').text(count);
}

function resetGame(){
    
    cardA = cardB = '';
    shuffle(cards);
    resetCount();

    $('ul.deck').find('li').each(function() {
        $(this).removeClass();
        $(this).addClass('card');
        $(this).find('i').removeClass();
        $(this).find('i').addClass('fa');
    });
}

function flipCard(cardId){
    var aux = cardId + 1;
    var item = $('.card:nth-child(' + aux + ')');

    //console.log('Function flipCard: cardId ' + cardId + ' | cardFont ' + cards[cardId]);

    item.find('i').toggleClass('fa-' + cards[cardId]);
    item.toggleClass('open show');
}

function setCards(cardId){
    if (cardA === ''){
        cardA = cardId;
    }else if (cardB === ''){
        cardB = cardId;
    }else{
        cardA = cardB = '';
    }
    //console.log('cardA: ' + cards[cardA] + ' | cardB: ' + cards[cardB]);
}

function setMatchClass(){
    $('.card.open').toggleClass('open show match');
}

function areCardsEql(){
    if (cards[cardA] === cards[cardB]){
        $('.card.open').effect( "bounce", "slow" );
        return true;
    }else{        
        $('.card.open').effect( "shake", "slow" );
        return false;
    }
}

var cards = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'];
var cardA = '', cardB = '';
var wait = false;
var count = 0;

resetGame();

$('.restart').click(function(){
    resetGame();
    console.log(cards);
})

$('.deck .card').click(function(){

    var cardId = $(this).prevAll().length;

    //console.log('Evento click card: cardId '+ cardId);

    if (!$(this).hasClass('match') && !$(this).hasClass('open') && !wait){
        flipCard(cardId);
        setCards(cardId);
        if (cardA !== '' & cardB !== ''){
            if (areCardsEql()){//se cartas forem iguais então adicionar classe match
                setMatchClass();
            }else{//desvirar cartas
                wait = true;
                setTimeout("flipCard("+cardA+")", 1000);
                setTimeout("flipCard("+cardB+")", 1000);
                setTimeout("wait = false", 1000);
            }
            cardA = cardB = '';
            incCount();
        }
    }
    
})

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
