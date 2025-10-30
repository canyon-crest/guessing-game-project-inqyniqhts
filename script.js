// add javascript here
let level, answer, score;
const levelArr = document.getElementsByName("level");

//event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);

function play(){
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