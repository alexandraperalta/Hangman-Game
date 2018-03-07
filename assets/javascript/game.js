//Words to pick from
var words = ["DEMOGORGON", "EXPERIMENT", "PORTAL", "LABORATORY", "GATE", "TELEKINESIS", 
"TELEPATHY", "POLLYWOG", "ELEVEN"];
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
var wins = 0;
var losses = 0;
var loseMessage = "Oh no, you got lost in the upside down!\n";
var winMessage = "Congratulations, you closed the gate!\n";
var game; //game is active/inactive

//create clickable letters
var main = $("body");
var btns1 = main.find("#row1");
var btns2 = main.find("#row2");
for (var i = 0; i < 14; i++) {
    var letterBtn = $("<span>");
    letterBtn.addClass("letter-button letter letter-button-color");
    letterBtn.prop("id", alphabet[i]);
    letterBtn.text(alphabet[i]);
    btns1.append(letterBtn);
}
for (var i = 14; i < alphabet.length; i++) {
    var letterBtn = $("<span>");
    letterBtn.addClass("letter-button letter letter-button-color");
    letterBtn.prop("id", alphabet[i]);
    letterBtn.text(alphabet[i]);
    btns2.append(letterBtn);
}

init();

function init() {
    var music = document.getElementById("music"); 
    music.volume = 0.1;    
    music.play();
    var guessesLeft = 6;
    game = true;
    var guessedLetters = [];
    var chosen = words[Math.floor(Math.random() * words.length)]; //random word from array
    var dashes = []; //dashes 
    for (var i = 0; i < chosen.length; i++) {
        dashes.push("-");
    }
    $('.letter-button').off("click");//needed this because the onclick was firing multiple times as the games were increasing++++++
    $('.letter-button').on('click', function () {
        checkKeyInWord(this.id);
        console.log(this);
    });
    
    $(".letter-button").css('color', 'grey');
    document.getElementById("gameOverMessage").innerText = "";
    document.getElementById("guessesLeft").innerText = guessesLeft;//populate guessesLeft
    document.getElementById("word").innerText = dashes.join("");//populate dashes
    // register user's keys
    document.onkeyup = function (event) {
        //the letter chosen is correct
        if (event.keyCode >= 65 && event.keyCode <= 90 && game === true) {
            var key = event.key.toUpperCase();
            checkKeyInWord(key);
        }
    }

    function checkKeyInWord(key) {
        var indexOfKey = chosen.indexOf(key);
        var letterSpan = $('#' + key);
        //if letter hasn't been guessed yet
        if (guessedLetters.indexOf(key) === -1 && game === true) {
            if (indexOfKey != -1) {
                letterSpan.css('color', 'Chartreuse');
                //loop through word to find all instances of the letter
                for (var i = 0; i < chosen.length; i++) {
                    if (chosen[i] === key)
                        dashes[i] = key;
                }
                document.getElementById("word").innerText = dashes.join("");
                if (dashes.indexOf("-") === -1) {
                    // WIN CONDITION!
                    gameOver(true, winMessage);
                }
            }
            //the letter chosen is incorrect 
            else {
                letterSpan.css('color', 'red');
                if (guessesLeft > 0) {
                    guessesLeft--;
                    document.getElementById("guessesLeft").innerText = guessesLeft;
                    if (guessesLeft === 0) {
                        // LOSE CONDITION!
                        gameOver(false, loseMessage);
                    }
                }
            }
            guessedLetters.push(key);
        }
    }
}
function gameOver(win, message) {
    game = false;
    if (win) {
        wins++;
        document.getElementById("numWins").innerText = wins;
    } else {
        losses++;
        document.getElementById("numLosses").innerText = losses;
    }
    // document.getElementById("displayBoard").innerText = message;
    document.getElementById("gameOverMessage").innerText = message;
    var letterBtn = $("<button>");
    letterBtn.addClass("letter-button letter letter-button-color");
    letterBtn.text("Play Again");
    $("body").find("#gameOverMessage").append(letterBtn);
    letterBtn.css("background-color", "red");
    $("body").find("#gameOverMessage").on("click", ".letter-button", function(){
        init();
    });    
}




