/**
 * Disable elements click event
 * @function
  */
 function disableClick(){
    $('.deck .card').off('click');
    $('.restart').off('click');
};

/**
 * Enable elements click event
 * @function
  */
function enableClick(){
    $('.deck .card').on('click',logic)
    $('.restart').click(resetGame);
};

/**
 * Convert sec to HH:MM:SS format
 * @function
 */
function secToTimeFormat(secs) {
    hours = Math.floor(secs / 3600);
    secs %= 3600;
    minutes = Math.floor(secs / 60);
    seconds = secs % 60;

    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return hours + ':' + minutes + ':' + seconds;
};

/**
 * Show timer
 * @function
 */
function showTimer(){
    var aux = new Date();
    var taux = Math.round((aux - startTime)/1000);
    $('.timer').text( secToTimeFormat(taux) );
};

/**
 * Start timer
 * @function
 */
function startTimer(){
    startTime = new Date();
    myTime = setInterval(showTimer,1000);
};

/**
 * Reset timer
 * @function
 */
function resetTimer(){
    $('.timer').text( '00:00:00' );
    clearInterval(myTime);
    startTime = endTime = '';
};

/**
 * Check if timer is running
 * @function
 * @returns {boolean}
 */
function isTimerRunning(){
    if(startTime == ''){
        return false;
    }else{
        return true;
    }
};

/**
 * Get the diff timer in seconds
 * @function
 * @returns {string}
 */
function getTimer(){
    endTime = new Date();
    var timeDiff = (endTime - startTime)/1000;
    return Math.round(timeDiff); 
};

/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 * @function
 * @param {array} array - Array to shuffle
 */
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
};

/**
 * Flip the target card.
 * @function
 * @param {string} cardId - The card ID
 */
function flipCard(cardId){
    var aux = cardId + 1;
    var item = $('.card:nth-child(' + aux + ')');

    item.find('.back').toggleClass('fa-' + cards[cardId]);
    item.toggleClass('open show');
    item.flip('toggle');
};

/**
 * Set choosed card in the global variables.
 * @function
 * @param {string} cardId - The card ID
 */
function setCards(cardId){
    if (cardA === ''){
        cardA = cardId;
    }else if (cardB === ''){
        cardB = cardId;
    }else{
        cardA = cardB = '';
    }  
};

/**
 * Set match class to card element.
 * @function
 */
function setMatchClass(){
    $('.card.open').toggleClass('open show match');
};

/**
 * Check if cards are equals
 * @function
 * @returns {boolean}
 */
function areCardsEql(){
    if (cards[cardA] === cards[cardB]){
        setTimeout('$(".card.open").effect( "bounce", "slow" )', 500);
        return true;
    }else{        
        setTimeout('$(".card.open").effect( "shake", "slow" )', 500);
        return false;
    }
};

/**
 * Reset the moves value
 * @function
 */
function resetCount(){
    count = 0;
    $('.moves').text(count);
};

/**
 * Increment moves value by 1
 * @function
 */
function incCount(){
    count ++;
    $('.moves').text(count);
};

/**
 * Update the stars based on number of moves
 * @function
 */
function updStars(){
    switch (count) {
        case  15:
            $('.stars li:nth-child(5)').css('color','white');
            break;
        case 20:
            $('.stars li:nth-child(4)').css('color','white');
            break;
        case 25:
            $('.stars li:nth-child(3)').css('color','white');
            break;
        case 30:
            $('.stars li:nth-child(2)').css('color','white');
            break;              
        case 35:
            $('.stars li:nth-child(1)').css('color','white');
            break;              
    }
};

/**
 * Reset the stars element style
 * @function
 */
function resetStars(){
    $('.stars').find('li').each(function() {
        $(this).removeAttr('style');
    });
};

/**
 * Reset the game configurantion
 * @function
 */
function resetGame(){
    
    cardA = cardB = '';
    shuffle(cards);
    resetCount();
    resetStars();
    resetTimer();

    $('ul.deck').find('li').each(function() {
        $(this).removeClass();
        $(this).addClass('card');
        $(this).find('.back').removeClass().addClass('back fa');
        $(this).flip(false);
    });
};

/**
 * Check if game is over
 * @function
 * @returns {boolean}
 */
function isEndGame(){
    var end = true;

    $('ul.deck').find('li.card').each(function() {
        if (!$(this).hasClass('match')){
            end = false;
        }
    });

    if (end){
        showResults();
        resetTimer();
    }
};

/**
 * Show modal with results
 * @function
  */
function showResults(){
    $(".modal-body .modal-text").text("Good Job! You did " + count + " moves in " + secToTimeFormat(getTimer()) + ' to complete.');
    $('#myModal1').modal('show');
};

/**
 * The main script
 * @function
 */
function logic(){
    var cardId = $(this).prevAll().length;

    if (!$(this).hasClass('match') && !$(this).hasClass('open')){
        disableClick();

        if(!isTimerRunning()){
            startTimer();
        }

        flipCard(cardId);
        setCards(cardId);
        if (cardA !== '' & cardB !== ''){          
            if (areCardsEql()){//se cartas forem iguais
                setTimeout('setMatchClass()', 500); //add class para as cartas
                setTimeout('isEndGame()', 500); //confere se fim de jogo
            }else{
                setTimeout("flipCard("+cardA+")", 1500);//desvira carta
                setTimeout("flipCard("+cardB+")", 1500);//desvira carta
            }
            
            setTimeout("enableClick()", 1500);//espera animacao antes de habilitar o evento de click
            cardA = cardB = '';
            incCount();
            updStars();
        }else{
            setTimeout("enableClick()", 100);//espera animacao antes de habilitar o evento de click
        }
    }
};

var cards = ['diamond','diamond','paper-plane-o','paper-plane-o','anchor','anchor','bolt','bolt','cube','cube','leaf','leaf','bicycle','bicycle','bomb','bomb'];
var cardA = '', cardB = '';
var count = 0;
var startTime = '', endTime;

var myTime;

$(".card").flip({
    trigger: 'manual'
});

resetGame();

$('.deck .card').click(logic);

$('.restart').click(resetGame);

/**
 * Easter egg - Shows the cards position in the console
 */
$('header').dblclick(function(){
    console.log(cards);
});

/**
 * Easter egg - Sort the cards array
 */
$('ul.stars').dblclick(function(){
    cards.sort();
});