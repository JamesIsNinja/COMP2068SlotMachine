/**
    File name: slotMachines.ts
    Made by: James White
    Name: Slot Machine 
    Decsription: slotMachine.ts has all the logic for the slotmachine
 */
//Global Variables
var timer = 0;
var stage;
var fruits = "";
var winRatio = 0;
var playersMoney = 500;
var winnings = 0;
var jackpot = 5000;
var turnNumber = 0;
var playerBet = 0;
var wins = 0;
var losses = 0;
var spinOutcome;
//All the slot machine choices variables, images/numbers.
var bell = 0;
var bellImage = new Image();
bellImage.src = "img/Bells.png";
var seven = 0;
var sevenImage = new Image();
sevenImage.src = "img/Seven.png";
var blank = 0;
var blankImage = new Image();
blankImage.src = "img/Blank.png";
var grape = 0;
var grapeImage = new Image();
grapeImage.src = "img/Grapes.png";
var banana = 0;
var bananaImage = new Image();
bananaImage.src = "img/B A N A N A S BANANAS.png";
var orange = 0;
var orangeImage = new Image();
orangeImage.src = "img/Orangees.png";
var cherry = 0;
var cherryImage = new Image();
cherryImage.src = "img/Cherries.png";
var bar = 0;
var barImage = new Image();
barImage.src = "img/Bar.png";

//The Stage
stage = new createjs.Stage(document.getElementById("canvas"));
//SlotMachine Image
var slotMachine = new createjs.Bitmap("img/plmd25mb.png");
//ButtonUnpushed Images
var betMaxUnpushed = new createjs.Bitmap("img/betMaxUnpushed.png");
var betOneUnpushed = new createjs.Bitmap("img/betOneUnPushed.png");
var spinUnpushed = new createjs.Bitmap("img/SPIN.PNG");
var resetUnpushed = new createjs.Bitmap("img/ResetUnpushed.png");
//ButtonPushed Images
var betMaxPushed = new createjs.Bitmap("img/MaxBetPushed.png");
var betOnePushed = new createjs.Bitmap("img/Bet1Pushed.png");
var spinPushed = new createjs.Bitmap("img/SPINPUSHED.png");
var resetPushed = new createjs.Bitmap("img/resetPushed.png");
//Quit button
var quitButton = new createjs.Bitmap("img/quit.png");
//Text for the jackpot, bets, etc.
var jackpotTxt = new createjs.Text(""+ jackpot, "12px Arial", "#FFF");
var playBet = new createjs.Text("Your Bet: " + playerBet, "12px Arial", "#FFF");
var credits = new createjs.Text("Credits: " + playersMoney, "12px Arial", "#FFF");
var winLose = new createjs.Text("Hello", "12px Arial", "#FFF");
//The default wheels
var wheelOne;
var wheelTwo;
var wheelThree;
var wheels = [wheelOne = new createjs.Bitmap(barImage), wheelTwo = new createjs.Bitmap(orangeImage), wheelThree = new createjs.Bitmap(bellImage)];
//Music time
var bgmusic = new Audio('sounds/BGMusic.mp3');
bgmusic.play();
//Function that initializes and sets all the buttons/text
function init() {
    createjs.Ticker.setFPS(60);
    stage.enableMouseOver(20);
    //Add all the children, buttons, slot machine and text
    stage.addChild(slotMachine);
    stage.addChild(quitButton);
    quitButton.x = 274;
    quitButton.y = 632;
    stage.addChild(playBet);
    playBet.x = 142;
    playBet.y = 363;
    stage.addChild(winLose);
    winLose.x = 242;
    winLose.y = 363;
    stage.addChild(credits);
    credits.x = 348;
    credits.y = 363;
    stage.addChild(jackpotTxt);
    jackpotTxt.x = 278;
    jackpotTxt.y = 181;
    stage.addChild(spinUnpushed);
    spinUnpushed.x = 342;
    spinUnpushed.y = 441;
    stage.addChild(spinPushed);
    spinPushed.x = 342;
    spinPushed.y = 441;
    stage.addChild(betOneUnpushed);
    betOneUnpushed.x = 175;
    betOneUnpushed.y = 452;
    stage.addChild(betOnePushed);
    betOnePushed.x = 175;
    betOnePushed.y = 452;
    stage.addChild(betMaxUnpushed);
    betMaxUnpushed.x = 260;
    betMaxUnpushed.y = 452;
    stage.addChild(betMaxPushed);
    betMaxPushed.x = 260;
    betMaxPushed.y = 452;
    stage.addChild(resetUnpushed);
    resetUnpushed.x = 94;
    resetUnpushed.y = 452;
    stage.addChild(resetPushed);
    resetPushed.x = 94;
    resetPushed.y = 452;
    //Set the 'pressed' buttons to invisible, until clicked.
    resetPushed.visible = false;
    betMaxPushed.visible = false;
    betOnePushed.visible = false;
    spinPushed.visible = false;
    //Set a picture for each wheel.
    stage.addChild(wheels[0]);
    wheels[0].x = 143;
    wheels[0].y = 245;
    stage.addChild(wheels[1]);
    wheels[1].x = 243;
    wheels[1].y = 245;
    stage.addChild(wheels[2]);
    wheels[2].x = 343;
    wheels[2].y = 245;
    //The update tick
    createjs.Ticker.addEventListener("tick", handleTick);
    //Click event for resetting
    resetUnpushed.addEventListener("click", resetPush);
    //Click event for betting 1
    betOneUnpushed.addEventListener("click", setOneBet);
    //Click event for betting max (5)
    betMaxUnpushed.addEventListener("click", setMaxBet);
    //Click event for spinning
    spinUnpushed.addEventListener("click", spinWheel);
    //Click event for quitting
    quitButton.addEventListener("click", quitOut);
}
//Function for quitting
function quitOut() {
    window.close();

}
//Function for the reset button
function resetPush() {
    resetPushed.visible = true;
    //Call the reset everything function to reset
    resetEverything();
    resetFruitTally();
    //Delay to show button press, then hide button and update
    setTimeout(function () {
        resetPushed.visible = false;
    }, 300);
    handleTick();
}
//Function to reset all the variables.
function resetEverything() {
    playersMoney = 500;
    winnings = 0;
    jackpot = 5000;
    turnNumber = 0;
    playerBet = 0;
    wins = 0;
    losses = 0;
    winRatio = 0;
    jackpotTxt.text = "" + jackpot;
    credits.text = "Credits: " + playersMoney;
    playBet.text = "Your Bet: " + playerBet;
    winLose.text = "Hello";
}
//Function to set the bet to 1.
function setOneBet() {
    betOnePushed.visible = true;
    playerBet = 1;
    playBet.text = "Your Bet: " + playerBet;
    //Delay to show button press, then hide button and update
    setTimeout(function () {
        betOnePushed.visible = false;
    }, 300);
    handleTick();
}
//Function to set the maxbet
function setMaxBet() {
    betMaxPushed.visible = true;
    playerBet = 5;
    playBet.text = "Your Bet: " + playerBet;
    handleTick();

    setTimeout(function () {
        betMaxPushed.visible = false;
    }, 300);
    handleTick();
}
//Function to update the stage
function handleTick() {
    stage.update();
}
/* Utility function to show Player Stats */
function showPlayerStats() {
    winRatio = wins / turnNumber;
    $("#jackpot").text("Jackpot Amt: " + jackpot);
    $("#playerMoney").text("Player Money: " + playersMoney);
    $("#playerBet").text("Your Bet: " + playerBet);
    $("#playerTurn").text("Turn: " + turnNumber);
    $("#playerWins").text("Wins: " + wins);
    $("#playerLosses").text("Losses: " + losses);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}
//resetsFruit tally
function resetFruitTally() {
    grape = 0;
    banana = 0;
    orange = 0;
    cherry = 0;
    bar = 0;
    bell = 0;
    seven = 0;
    blank = 0;
}
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot Yaaa!!");
        var bgmusic = new Audio('sounds/JACKPOT.mp3');
        bgmusic.play();
        winLose.text = "JACKPOT! Baller! $" + jackpot;
        playersMoney += jackpot;
        jackpot = 1000;
    }
}
    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playersMoney += winnings;
        stage.update();
        winLose.text = "You Won! $" + winnings;
        resetFruitTally();
        checkJackPot();
    }
    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playersMoney -= playerBet;
        winLose.text = "You Lost!";
        resetFruitTally();
        jackpot += +playerBet;
        jackpotTxt.text = "" + jackpot;
        credits.text = "Credits: " + playersMoney;
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    blank++;
                    wheels[spin].image = blankImage;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "Grapes";
                    grape++;
                    wheels[spin].image = grapeImage;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "Banana";
                    banana++;
                    wheels[spin].image = bananaImage;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "Orange";
                    orange++;
                    wheels[spin].image = orangeImage;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "Cherry";
                    cherry++;
                    wheels[spin].image = cherryImage;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "Bar";
                    bar++;
                    wheels[spin].image = barImage;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "Bell";
                    bell++;
                    wheels[spin].image = bellImage;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "Seven";
                    seven++;
                    wheels[spin].image = sevenImage;
                    break;
            }
        }
        return betLine;
    }
    /* This function calculates the player's winnings, if any */
    function determineWinnings() {
        if (blank == 0) {
            if (grape == 3) {
                winnings = playerBet * 10;
            }
            else if (banana == 3) {
                winnings = playerBet * 20;
            }
            else if (orange == 3) {
                winnings = playerBet * 30;
            }
            else if (cherry == 3) {
                winnings = playerBet * 40;
            }
            else if (bar == 3) {
                winnings = playerBet * 50;
            }
            else if (bell == 3) {
                winnings = playerBet * 75;
            }
            else if (seven == 3) {
                winnings = playerBet * 100;
            }
            else if (grape == 2) {
                winnings = playerBet * 2;
            }
            else if (banana == 2) {
                winnings = playerBet * 2;
            }
            else if (orange == 2) {
                winnings = playerBet * 3;
            }
            else if (cherry == 2) {
                winnings = playerBet * 4;
            }
            else if (bar == 2) {
                winnings = playerBet * 5;
            }
            else if (bell == 2) {
                winnings = playerBet * 10;
            }
            else if (seven == 2) {
                winnings = playerBet * 20;
            }
            else if (seven == 1) {
                winnings = playerBet * 5;
            }
            else {
                winnings = playerBet * 1;
            }
            wins++;
            showWinMessage();
        }
        else {
            losses++;
            showLossMessage();
        }

    }
    //Function to spin the wheel, checks for money, and does button 'animation'
    function spinWheel() {
        spinPushed.visible = true;
        handleTick();
        //Make sure the user can even spin! 
        if (playerBet != 0) {
            if (playersMoney == 0) {
                if (confirm("You gots no money left! \nDo you wish to play again?")) {
                    resetEverything();
                    showPlayerStats();
                    //Delay to show button press, then hide button and update
                    setTimeout(function () {
                        spinPushed.visible = false;
                    }, 300);
                }
            }
            else if (playerBet > playersMoney) {
                alert("You don't have enough credits for that bet, chill dude.");
                //Delay to show button press, then hide button and update
                setTimeout(function () {
                    spinPushed.visible = false;
                }, 300);
            }
            else if (playerBet <= playersMoney) {
                spinOutcome = Reels();
                fruits = spinOutcome[0] + " - " + spinOutcome[1] + " - " + spinOutcome[2];
                $("div#result>p").text(fruits);
                determineWinnings();
                turnNumber++;
                showPlayerStats();
                //Delay to show button press, then hide button and update
                setTimeout(function () {
                    spinPushed.visible = false;
                }, 300);
            }
        }
        else {
            alert("Don't forget to add a bet amount! ");
        }
    }

  

    



   

    