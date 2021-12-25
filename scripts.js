var step, player1, player2, var1, var2, var3, var4, target, textnums, p1answer, p1num, p2answer, p2num, score, p1score, p2score;
var xmas_song = new Audio('https://gospelmetrics.com/wp-content/uploads/2021/12/Love-to-Sing-Chior-Jingle-Bells-Christmas-SongsCarols-k5.mp3');
var winner_song = new Audio('WinnerPL.mp3');
function onLoad() {
    step = 0;
    player1 = "";
    player2 = "";
    p1score = 0;
    p2score = 0;
    var1 = var2 = var3 = var4 = 0;
}

window.onload = onLoad;

function setInstruction(text) {
    document.getElementById("instruction").innerHTML = text;
}

function getInput() {
    var val = document.getElementById("input").value;
    document.getElementById("input").value = "";
    return val;
}

function game() {
    console.log(`step ${step}`)
    switch (step) {
        case 0:
            setInstruction("Welcome to the game!");
            xmas_song.play();
            break;
        case 1:
            setInstruction("Enter player1 name")
            break;
        case 2:
            player1 = getInput();
            setInstruction("Enter player2 name");
            break;
        case 3:
            player2 = getInput();
            setInstruction("Welcome " + player1 + " & " + player2 + " !\n\n" +
            "Rules: make calculation to get closest to target number\n" +
            "Example: if numbers are 2, 3, 5, 7 and target is 8, you can answer 3+5\n" +
            "Ready?");
            break;
        case 4:
            xmas_song.pause();
            winner_song.pause();
            target = Math.floor(Math.random() * 100) + 1;
            var1 = Math.floor(Math.random() * 9) + 1;
            var2 = Math.floor(Math.random() * 9) + 1;
            var3 = Math.floor(Math.random() * 9) + 1;
            var4 = Math.floor(Math.random() * 9) + 1;
            
            score = "Score: " + player1 + ": " + p1score + " , " + player2 + ": " + p2score + "\n\n"
            textnums = "Target: " + target + "\n\nNumbers: " + var1 + ", " + var2 + ", " + var3 + ", " + var4 + "\n\n" 

            setInstruction(score + textnums + player1 + " it's your turn");
            break;
        case 5:
            p1answer = getInput();
            p1num = math.evaluate(p1answer);
            setInstruction(score + textnums + player2 + " it's your turn");
            break;
        case 6:
            p2answer = getInput()
            p2num = math.evaluate(p2answer);
            setInstruction("Ready for the results?");
            break;
        case 7:
            p1margin = math.abs(target - p1num);
            p2margin = math.abs(target - p2num);

            if (p1margin == p2margin) {
                if (p1margin == 0){
                    result = "PERFECT answers from both players !"
                } else {
                    result = "That's a draw"
                }
            } else if (p1margin < p2margin) {
                if (p1margin == 0){
                    result = player1 + " wins with a PERFECT answer !"
                } else {
                    result = player1 + " wins"
                }
                winner_song.play();
                p1score++;
            } else if (p2margin > p1margin) {
                if (p2margin == 0){
                    result = player2 + " wins with a PERFECT answer !"
                } else {
                    result = player2 + " wins"
                }
                winner_song.play();
                p2score++;
            }
            result = result + "\n\n";
            score = "Score: " + player1 + ": " + p1score + " , " + player2 + ": " + p2score + "\n\n"

            var p1proposal = player1 + ": " + p1answer + " = " + p1num + " > diff = " + p1margin + "\n";
            var p2proposal = player2 + ": " + p2answer + " = " + p2num + " > diff = " + p2margin + "\n";

            setInstruction(result + score + textnums + p1proposal + p2proposal);
            step = 3;
            break;
    }

    step++;
}