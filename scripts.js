var step, player1, player2, nums, target, textnums, p1answer, p1total, p1numbers, p2answer, p2total, p2numbers, score, p1score, p2score, round, nRounds, winner;
var xmas_song = new Audio('Love-to-Sing-Chior-Jingle-Bells-Christmas-SongsCarols-k5.mp3');
var winner_song = new Audio('WinnerPL.mp3');

function onLoad() {
    step = 0;
    player1 = 'Player1';
    player2 = 'Player2';
    p1score = 0;
    p2score = 0;
    nRounds = 5;
    var1 = var2 = var3 = var4 = 0;
}

window.onload = onLoad;

function setInstruction(text) {
    document.getElementById("instruction").innerHTML = text;
}

function getInput() {
    var val = document.getElementById("input").value;
    return val;
}

function clearInput() {
    document.getElementById("input").value = "";
}

function setErrorText(text) {
    document.getElementById("error").innerHTML = text ? "ERROR: " + text : "";
}

// https://www.geeksforgeeks.org/find-whether-an-array-is-subset-of-another-array-set-1/
// Return 1 if arr2[] is a subset of arr1[]
function isSubset(arr1, arr2)
{
	let i = 0, j = 0;
    let m = arr1.length, n = arr2.length;

	if (m < n)
		return 0;

	// Sort both the arrays
	arr1.sort((a, b) => a - b);
	arr2.sort((a, b) => a - b);

	// Iterate till they donot exceed their sizes
	while (i < n && j < m)
	{
		
		// If the element is smaller than
		// Move aheaad in the first array
		if (arr1[j] < arr2[i])
			j++;
			
		// If both are equal, then move
		// both of them forward
		else if (arr1[j] == arr2[i])
		{
			j++;
			i++;
		}

		// If we donot have a element smaller
		// or equal to the second array then break
		else if (arr1[j] > arr2[i])
			return 0;
	}
	return (i < n) ? false : true;
}

function game() {
    console.log(`step ${step}`)
    switch (step) {
        case 0:
            setInstruction("Welcome to the game!\n\n" +
            "Rules: make calculation to get closest to target number\n" +
            "Example: if numbers are 2, 3, 5, 7 and target is 24, you can answer (5+7)*2\n");
            xmas_song.play();
            break;
        case 1:
            setInstruction("Enter player1 name (default: Player1)")
            break;
        case 2:
            var input = getInput();
            clearInput();
            if (input)
                player1 = input;
            setInstruction("Enter player2 name (default: Player2)");
            break;
        case 3:
            var input = getInput();
            clearInput();
            if (input)
                player2 = input;
            setInstruction("How many rounds do you want to play? (default: 5)");
            break;
        case 4:
            var input = getInput();
            clearInput();
            if (input)
                nRounds = parseInt(input);
            round = 1;
            setInstruction("Welcome " + player1 + " & " + player2 + " !\n\n" +
            "Are you ready?");
            break;
        case 5:
            xmas_song.pause();
            xmas_song.currentTime = 0;
            winner_song.pause();
            winner_song.currentTime = 0;
            target = Math.floor(Math.random() * 100) + 1;
            nums = [];
            nums.push(Math.floor(Math.random() * 9) + 1);
            nums.push(Math.floor(Math.random() * 9) + 1);
            nums.push(Math.floor(Math.random() * 9) + 1);
            nums.push(Math.floor(Math.random() * 9) + 1);
            
            score = "Round: " + round.toString() + "/" + nRounds.toString() + " | Score: " + player1 + ": " + p1score + " , " + player2 + ": " + p2score + "\n\n"
            textnums = "Target: " + target + "\n\nNumbers: " + nums.join(', ') + "\n\n" 

            setInstruction(score + textnums + player1 + " it's your turn");
            break;
        case 6:
            p1answer = getInput();
            p1total = math.round(math.evaluate(p1answer)*10)/10;
            if (isNaN(p1total)) {
                step = 5;
                setErrorText("Not a valid math expression");
                break;
            }
            else {
                p1numbers = p1answer.match(/\d+/g).map(Number);
                if (!isSubset(nums, p1numbers)) {
                    step = 5;
                    setErrorText("Numbers used are not part of available selection");
                    break;
                }
            }
            clearInput();
            setErrorText();
            setInstruction(score + textnums + player2 + " it's your turn");
            break;
        case 7:
            p2answer = getInput();
            p2total = math.round(math.evaluate(p2answer)*10)/10;
            if (isNaN(p2total)) {
                step = 6;
                setErrorText("Not a valid math expression");
                break;
            }
            else {
                p2numbers = p2answer.match(/\d+/g).map(Number);
                if (!isSubset(nums, p2numbers)) {
                    step = 6;
                    setErrorText("Numbers used are not part of available selection");
                    break;
                }
            }
            clearInput();
            setErrorText();
            setInstruction("Ready for the results?");
            break;
        case 8:
            p1margin = math.abs(target - p1total);
            p2margin = math.abs(target - p2total);
            var result;

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
            } else if (p1margin > p2margin) {
                if (p2margin == 0){
                    result = player2 + " wins with a PERFECT answer !"
                } else {
                    result = player2 + " wins"
                }
                winner_song.play();
                p2score++;
            }
            result = result + "\n\n";
            score = "Round: " + round.toString() + "/" + nRounds.toString() + " | Score: " + player1 + ": " + p1score + " , " + player2 + ": " + p2score + "\n\n"

            var p1proposal = player1 + ": " + p1answer + " = " + p1total + " > diff = " + p1margin + "\n";
            var p2proposal = player2 + ": " + p2answer + " = " + p2total + " > diff = " + p2margin + "\n";

            setInstruction(result + score + textnums + p1proposal + p2proposal);
            round++;
            if (round <= nRounds)
                step = 4;
            break;
        case 9:
            if (p1score > p2score)
                winner = player1 + " is the Winner !";
            else if (p1score < p2score)
                winner = player2 + " is the Winner !";
            else
                winner = "That's a draw !"
            setInstruction("GAME FINISHED\n\n" + winner);
            step = -1;
            break;
        case 10:

    }

    step++;
}