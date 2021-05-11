/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

start_button = document.querySelector('#btn__reset');

start_button.addEventListener('click', () => {
    game = new Game();

    game.startGame();
});

keyboard = document.querySelector('#qwerty');

keyboard.addEventListener('click', (e) => {
    game.handleInteraction(e.target);
});