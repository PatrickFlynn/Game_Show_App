/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = [
            "Black Panther",
            "Iron Man",
            "Spiderman",
            "Captain America",
            "The Hulk",
            "Groot",
            "Thanos",
            "Dr Strange",
            "Black Widow",
            "Winter Soldier",
            "Vision",
            "Hawkeye",
            "Thor",
            "Scarlet Witch",

        ];
        this.activePhrase = null;
    }


    //called when user clicks on start game button
    startGame(){

        document.querySelector('#overlay').style.display = 'none';

        this.activePhrase = new Phrase(this.getRandomPhrase());

        this.activePhrase.addPhraseToDisplay();

    }

    //this selects one of the random phrases (characters) from the list
    getRandomPhrase(){

        let random_index = 
        
            Math.floor(Math.random() * this.phrases.length);

        return this.phrases[random_index];

    }

    handleInteraction(target){

        if (target.classList.contains('key')){

            let selected_letter = target.innerText;

            //letter is in phrase

            target.disabled = true;

            if(this.activePhrase.checkLetter(selected_letter)){

                this.activePhrase.showMatchedLetter(selected_letter);

                target.className = 'key chosen';

                this.checkForWin();

            //letter is not in phrase    
            } else {

                target.className = 'key wrong';

                this.removeLife();

            }

        }

    }

    //this is called when a correct guess is provided
    checkForWin(){

        let phrase_letters = document.querySelector('#phrase').firstElementChild.children;
        
        //helper function to reduce repetitiveness
        function count_by_class(elem, class_to_count, runningTotal){
            if(elem.classList.contains(class_to_count)){
                return runningTotal += 1;
            } else {
                return runningTotal;
            }
        }
        
        //get all letter LI items counts
        let total_letters = [...phrase_letters].reduce((total, currentVal) => {
            return count_by_class(currentVal, 'letter', total);
        }, 0);

        //get all "shown" LI item counts
        let selectd_letters = [...phrase_letters].reduce((total, currentVal) => {
            return count_by_class(currentVal, 'show', total);
        }, 0);

        if (selectd_letters === total_letters){
            this.gameOver(true);
        }
        

    }

    //this is called when a guess is not correct
    removeLife(){

        this.missed += 1;

        let heart_ol = document.querySelector('#scoreboard').firstElementChild;
        let lives = heart_ol.children;


        //reduce function that counts "ouch" classes
        let lives_lost = [...lives].reduce((total, currValue) => {
            if (currValue.classList.contains('ouch')){
                return total + 1;
            } else {
                return total;
            }
        }, 0)

        //add ouch class depending on remove index and update image
        let remove_index = ([...lives].length - 1) - lives_lost;

        [...lives][remove_index].classList.add('ouch');

        [...lives][remove_index]
            .firstElementChild
            .setAttribute('src', 'images/lostHeart.png');

        if (this.missed === 5){

            this.gameOver(false);
        
        }
        
        
    }

    gameOver(status){

        //Reshow the overlay and color it appropriately depending on game state
        let overlay = document.querySelector('#overlay');
        overlay.style.display = 'flex';
        let game_over_message = overlay.querySelector('#game-over-message')
        
        if (status){
            overlay.className = 'win';
            game_over_message.innerText = 'Great job! You win!!!'
        } else {
            overlay.className = 'lose';
            game_over_message.innerText = 'You lost! Try again!'
        }

        overlay.lastElementChild.innerText = 'Play Again!'


        //Remove all li elements from phrase ul
        let phrase_ul = document.querySelector('#phrase').firstElementChild;
        phrase_ul.innerHTML = '';

        //reset keyboard object
        let keys = document.querySelectorAll('.key');
        [...keys].map((key) => {key.disabled = false});
        [...keys].map((key) => {key.classList.remove('wrong')});
        [...keys].map((key) => {key.classList.remove('chosen')});

        //Replace hearts with full heart
        let heart_ol = document.querySelector('#scoreboard').firstElementChild;
        let lives = heart_ol.children;

        [...lives].map((heart) => {heart.classList.remove('ouch')});

        [...lives].map((heart) => {
            heart
            .firstElementChild
            .setAttribute('src', 'images/liveHeart.png');
        })

    }
}