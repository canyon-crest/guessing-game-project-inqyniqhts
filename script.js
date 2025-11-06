let level;
let answer; 
let score; 
let roundStartingTime;
let levelArr = document.getElementsByName("level");
let scoreArr = [];
let gameTimes = [];


let guessBtn = document.getElementById("guessBtn");
let giveUpBtn = document.getElementById("giveUp");
let msg = document.getElementById("msg");
let dateText = document.getElementById("date");

let submitBtn = document.getElementById("submit");
let userInput = document.getElementById("userName");

guessBtn.disabled = true;
giveUpBtn.disabled = true;

function getTimeString() {
    let d = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let day = d.getDate();
    let suffix = "th"; 
    if (day % 10 == 1 && day !== 11) {
        suffix = "st";
    } else if (day % 10 == 2 && day !== 12) {
        suffix = "nd";
    } else if (day % 10 == 3 && day !== 13) {
        suffix = "rd";
    }

    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();

    dateText.textContent = "Current date: "+months[d.getMonth()] +" "+ day+suffix+" "+ d.getFullYear()+" "+h+":"+m+":"+s;
}
getTimeString()
setInterval(getTimeString, 1000);



submitBtn.addEventListener("click", ()=>{
    let name1 = userInput.value;
    if(name1 == ""){
        msg.textContent = "Please enter your name, not a space!!!";
        return;
    }
    userName = name1.charAt(0).toUpperCase() + name1.slice(1).toLowerCase();
    msg.textContent = "Hello "+userName+", select a level and press Play :D!";
});
let playBtn = document.getElementById("playBtn");

let guess = document.getElementById("guess");


playBtn.addEventListener("click", play);
function play(){
    score = 0;
    roundStartingTime = new Date().getTime();
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUpBtn.disabled = false;
    guess.value = "";

    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked) level = parseInt(levelArr[i].value);
        levelArr[i].disabled = true;
    }

    answer = Math.floor(Math.random()*level)+1;
    msg.textContent = userName+", guess a number from 1 to "+ level;
}

guessBtn.addEventListener("click", makeGuess);
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess <1 || userGuess>level){
        msg.textContent = userName+", can you enter a valid number from 1 to "+level+"?";
        return;
    }
    score++;
    let diff = Math.abs(userGuess - answer);
    let hint = "";
    if(userGuess > answer) hint = "Too high :0";
    else if(userGuess < answer) hint = "Too low :(!";

    if(diff == 0){
        let totalRoundTime = (new Date().getTime() - roundStartingTime)/1000;
        msg.textContent = userName+ ", you got it yay! Score:"+ score+". Time: "+totalRoundTime.toFixed(1);
        giveFeedback(score);
        storeGame(totalRoundTime);
        reset();
        return;
    } else if(diff <= 2){
        hint += " Hot!!!";}
    else if(diff <= 5){
        hint += " Warm : 0";}
    else{ 
        hint += " its Cold";}

    msg.textContent = hint;
}

giveUpBtn.addEventListener("click", ()=>{
    score = level; 
    msg.textContent = userName+", you gave up boohoo... The answer was "+answer+". Score: "+score;
    let totalRoundTime = (new Date().getTime() - roundStartTime)/1000;
    storeGame(totalRoundTime);
    reset();
});

function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    playBtn.disabled = false;
    giveUpBtn.disabled = true;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}

function storeGame(time){
    scoreArr.push(score);
    gameTimes.push(time);
    updateScore();
    updateTimeStats();
}
let wins = document.getElementById("wins");
let avgScore = document.getElementById("avgScore");

//lb means leaderboard btw

function updateScore(){
    scoreArr.sort((a,b)=>a-b);
    let lb = document.getElementsByName("leaderboard");
    for(let i=0; i<lb.length; i++){
        if(scoreArr[i]) lb[i].textContent = scoreArr[i];
    }
    wins.textContent = "Total wins:" + scoreArr.length;
    let sum = scoreArr.reduce((a,b)=>a+b,0);
    avgScore.textContent = "Average Score:" + (sum/scoreArr.length).toFixed(2);
}

let avgTime = document.getElementById("avgTime");
let fastestTime = document.getElementById("fastestTime");

function updateTimeStats(){
    let sum = gameTimes.reduce((a,b)=>a+b,0);
    avgTime.textContent = "Your Average Time is: "+(sum/gameTimes.length).toFixed(1);
    fastestTime.textContent = "Fastest Game:"+ Math.min(...gameTimes).toFixed(1);
}


function giveFeedback(score){
    let feedback = "";
    if(score <= level/3) feedback = " . Your feedback: Excellent!";
    else if(score <= level*2/3) feedback = " . Your feedback: OK!";
    else feedback = " . Your feedback: Needs improvement and you could solve faster.";
    msg.textContent += feedback;
}
