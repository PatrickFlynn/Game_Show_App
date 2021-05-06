/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase{
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    //This method adds the chosen phrase to the game board
    addPhraseToDisplay(){
        let phrase_div_ul = document.querySelector('#phrase').firstElementChild;

        //function to create LI element on game board
        function add_li_to_ul(char){
            let li = document.createElement('li');
            if (char === ' '){
                li.className = 'space';
            } else {
                li.className = `hide letter ${char}`;
            }
            li.textContent = char;
            phrase_div_ul.appendChild(li);
        }

        //Map phrase array to add_li function
        this.phrase.split('').map(char => add_li_to_ul(char));
    }


    //Check to see if player selected letter exists in phrase
    checkLetter(selectedLetter){

        if (this.phrase.includes(selectedLetter.toLowerCase())){
            return true;
        } else {
            return false;
        }

    }

    showMatchedLetter(){

    }
}