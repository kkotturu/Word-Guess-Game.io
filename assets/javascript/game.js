// PSUEDOCODE
// Start new game on page load
// Display wins, losses, number of guesses remaining, and letters guessed with preset values
// Computer chooses a random word from the array
// Display random word as "_ _ _ _ _"

// User selects letters on keyboard
// If selected letter is within random word, replace "_" with letter
// If selected letter is not within random word:
// - Subtract 1 from "Number of Remaining Guesses" 
// - Add selected letter to "Letters Already Guessed"
// If selected letter has already been selected, do nothing

// Game ends when:
// - All letters in random word are guessed 
// Add 1 to "Wins" total
// Reset guesses to max count
// Reset letters already guessed
// Computer chooses new random word from the array
// - Guesses remaining = 0
// Add 1 to "Losses" total
// Reset guesses to max count
// Reset letters already guessed
// Computer chooses new random word from the array


// creating an object game
var game = {
    wins: 0,
    losses: 0,
    remainingGuesses: 10,
    underscores: [], // use push to add underscores per length of currentWord
    lettersGuessed: [], //use push to add guessed letters to this array
    countries: ["japan", "northamerica", "india", "china", "bangladesh", "africa", "england", "iceland", "australia", "peru", "canada"],
    currentWord: null,

    // Randomly chooses a choice from the countries array - Does this need to be set as a variable or run as a function???
    randomCountry: function () {
        return this.countries[Math.floor(Math.random() * this.countries.length)]
    },

};
// audio files
var win = new Audio("assets/audio/tada.mp3");
var lost = new Audio("assets/audio/lost.mp3");
// When the window loads...
window.onload = function () {

    // Converts 'randomCountry' to an array and assigns array to 'currentWord'
    currentWord = (game.randomCountry()).split('');

    // Pushes '_' into 'underscores' array x times based on length of 'currentWord' array
    for (i = 0; i < currentWord.length; i++) {
        game.underscores.push("_");
    };

    // Logs 'currentword' and 'underscores' to console and pushes 'wins, losses, underscores and remainingGuesses' to html
    console.log(currentWord);
    document.getElementById("wins").innerHTML = (game.wins);
    document.getElementById("losses").innerHTML = (game.losses);
    document.getElementById("currentWord").innerHTML = (game.underscores.join(" "));
    document.getElementById("guessesRemaining").innerHTML = (game.remainingGuesses);

    // When a key is pressed...
    document.onkeyup = function (event) {

        // Assigns the key pressed to variable keyPress
        var keyPress = event.key;

        // Assigns index of 'keyPress' within 'currentWord' array to 'keyIndex'. If 'keyPress' is not within 'currentWord', 'keyIndex' is assigned a value of -1
        var keyIndex = currentWord.indexOf(keyPress);

        // If keyIndex is -1...
        if (keyIndex === -1) {
            // And remainingGuesses is greater than 0...
            if ((game.remainingGuesses) > 1) {

                // Subtract one from remaining guesses
                game.remainingGuesses--;

                //Pushes incorrect letter guessed to lettersGuessed array
                game.lettersGuessed.push(" " + (keyPress.toUpperCase()));

                document.getElementById("guessesRemaining").innerHTML = (game.remainingGuesses);
                document.getElementById("lettersGuessed").innerHTML = (game.lettersGuessed);
            } 
            else {
                // Else if remaining guesses = 0...

                game.losses++;// Increase losses by 1
                game.remainingGuesses = 10; // Resets guesses
                game.lettersGuessed = []; // Clear the lettersGuessed array
                game.underscores = []; // Clear underscores array
                currentWord = (game.randomCountry()).split('');
                lost.play();

                for (i = 0; i < currentWord.length; i++) {
                    game.underscores.push("_");
                };

                document.getElementById("losses").innerHTML = (game.losses);
                document.getElementById("currentWord").innerHTML = ((game.underscores.join(" ")));
                document.getElementById("guessesRemaining").innerHTML = (game.remainingGuesses);
                document.getElementById("lettersGuessed").innerHTML = (game.lettersGuessed);
            }
        } 
        else if (keyIndex > -1) {
            // If keyIndex is greater than -1, execute while loop...
            while (keyIndex > -1) {

                // Replaces the 'keyIndex' value of the 'underscores' array with the 'keyPress' value
                game.underscores.splice(keyIndex, 1, (keyPress.toUpperCase()));

                // Repeat loop to end of 'currentWord' array...
                keyIndex = currentWord.indexOf(keyPress, keyIndex + 1);

                // Pushes new 'underscores' array to html
                document.getElementById("currentWord").innerHTML = (game.underscores.join(" "));
            };

        };

        //If all letters are guessed, add one to wins and reset all else
        if (((game.underscores).indexOf("_")) === -1) {
            game.wins++; // Add one to wins
            game.remainingGuesses = 10; // Resets guesses
            game.lettersGuessed = []; // Clear the lettersGuessed array
            game.underscores = []; // Clear underscores array
            currentWord = (game.randomCountry()).split('');
            win.play();


            for (i = 0; i < currentWord.length; i++) { // Sets underscores
                game.underscores.push("_");
            };

            document.getElementById("wins").innerHTML = (game.wins);
            document.getElementById("currentWord").innerHTML = ((game.underscores.join(" ")));
            document.getElementById("guessesRemaining").innerHTML = (game.remainingGuesses);
            document.getElementById("lettersGuessed").innerHTML = (game.lettersGuessed);
        };

        //  If spacebar is pressed...
        if (keyPress == " ") {
            game.remainingGuesses = 10; // Resets guesses
            game.lettersGuessed = []; // Clear the lettersGuessed array
            game.underscores = [];
            currentWord = (game.randomCountry()).split('');

            for (i = 0; i < currentWord.length; i++) { // Sets underscores
                game.underscores.push("_");
            };

            console.log(currentWord); // For validation of underscores
            document.getElementById("currentWord").innerHTML = ((game.underscores.join(" ")));
            document.getElementById("guessesRemaining").innerHTML = (game.remainingGuesses);
            document.getElementById("lettersGuessed").innerHTML = (game.lettersGuessed);

        };
    };
};
































