/*
 * Create a list that holds all of your cards
 */
const deck= ["fa fa-diamond","fa fa-paper-plane-o", "fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor", "fa fa-leaf", "fa fa-bicycle","fa fa-diamond", "fa fa-bomb", "fa fa-leaf", "fa fa-bomb","fa fa-bolt", "fa fa-bicycle", "fa fa-paper-plane-o", "fa fa-cube"];


const cardsContainer = document.querySelector(".deck");


let selectCards = [];
let matchedCards = [];
/*
*Start Game
*/

function init(){
//Cards
for (let i = 0; i <deck.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML =`<i class="${deck[i]}"></i>`;
    cardsContainer.appendChild(card);

    //Add Click Event
    click(card);
    }
}

/*
*Click Event
*/
    
//First Click
let isFirstClick= true;

//Click Function
function click(card){

    //Card Click
    card.addEventListener("click", function(){

        if(isFirstClick){
            startTimer();
            isFirstClick = false;
        }

        const firstCard = this;
        const secondCard = selectCards[0];

    //We have an existing select card
        if(selectCards.length === 1) {

            card.classList.add("open", "show",  "disable");
        selectCards.push(this);

        //Compeare our 2 select cards
        compare(firstCard, secondCard);
    
        }else{
            firstCard.classList.add("open", "show",  "disable");
            selectCards.push(this);
        }
    });
}
    /*
    *Compare Cards
    */

    function compare(firstCard, secondCard){

        //Matcher
        if(firstCard.innerHTML === secondCard.innerHTML) {

            //Matched
            firstCard.classList.add("match");
            secondCard.classList.add("match");

            matchedCards.push(firstCard, secondCard);
            selectCards = [];

            //Check is game is over
            isOver();

        }else{

            //Wait 630ms, then do this
            setTimeout(function(){
                firstCard.classList.remove("open", "show", "disable");
                secondCard.classList.remove("open", "show", "disable");
            },630);

            selectCards = [];

        }
        //Add New  Move
        addMove();
    }

    /*
    *Check if the game is over
    */
   function isOver(){
       if(matchedCards.length === isSecureContext.length){

        //Stop timer
		clearTimeout();
		let stars = $(".fa-star").lentgh;
		
        alert("You Win!");
       }
   }

   /*
   *Add Move
   */
  const movesContainer = document.querySelector(".moves");
  let moves = 0;
  movesContainer.innerHTML = 0;
  function addMove(){
      moves++;
      movesContainer.innerHTML = moves;

      //Set Rating
      rating();
  }
  /*
  *Rating
  */
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {
    if(moves <6){
        starsContainer.innerHTML =star + star + star;
    }else if(moves < 10) {
    }else{
      starsContainer.innerHTML = star;
    }
}

/*
*Timer
 */
const timerContainer =document.querySelector(".timer");
let liveTimer,
totalSeconds = 0;

//Ste the default value to the timer
timerContainer.innerHTML = totalSeconds + 's';

function startTimer(){
    liveTimer = setInterval(function(){
        totalSeconds++;
        timerContainer.innerHTML = totalSeconds + 's';
    },1000);
}

function stopTimer() {
    clearInterval(liveTimer);
}

/*
 * Restart Button
 */
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    //Reset ALL cards
    cardsContainer.innerHTML = "";

    // Call `init` to create new cards
    init();

    // Reset the game
    reset();

});


/*
 * Reset All Game 
 */
function reset() {
    // Empty  `matchedCards` array
    matchedCards = [];

    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;
    

    //Reset the `timer`
     
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
}


/////// Start the game for the first time!
init();



// /*
//  * Display the cards on the page
//  *   - shuffle the list of cards using the provided "shuffle" method below
//  *   - loop through each card and create its HTML
//  *   - add each card's HTML to the page
//  */

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



