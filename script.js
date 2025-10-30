// add javascript here
let level, answer, score;
const levelArr = document.getElementsByName("level");

//event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);

function play(){
    score = 0; // sets the score to 0 every new game
    playBtn.disabled= true;
    guessBtn.disabled=false;
    for(let i=0; i<levelArr.length;i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = "Guess a number from 1-"+level;
    answer = Math.floor((Math.random()*level)+1);
    guess.placeholder = answer;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess <1 || userGuess > level){
        msg.textContent = "Enter a valid number from #1-" + level;
        return;
    }
    score++; //add guess and one to score
    if(userGuess > answer){
        msg.textContent = "Too high!"
    }
    else if(userGuess < answer){
        msg.textContent = "Too low!"

    }
    else{
        msg.textContent = "You got it! It took you " + score +" tries to get the answer.";
    }

}

function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder="";
    playBtn.disabled = false;
}