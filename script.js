// add javascript here
let level, answer, score;
const levelArr = document.getElementsByName("level");

//event listeners
AnimationPlaybackEvent.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);

function play(){
    playBtn.disabled= true;
    guessBtn.disabled=false;
    for(let i=0; i<levelArr.length;i++){
        levelArr[i].disabled = true;
    }


}