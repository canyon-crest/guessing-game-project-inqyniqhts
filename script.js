let level, answer, score, roundStartTime;
let levelArr = document.getElementsByName("level");
let scoreArr = [];
let gameTimes = [];


const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUp");
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submit");
const userInput = document.getElementById("userName");

guessBtn.disabled = true;
giveUpBtn.disabled = true;

function getTimeString(){
    let d = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let day = d.getDate();
    let ending = "th";
    if(day % 10 == 1 && day !== 11){
        ending = "st";}
    else if(day % 10 == 2 && day !== 12){
        ending = "nd";}
    else if(day % 10 == 3 && day !== 13){
        ending = "rd";}
    return `${months[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()} ${h}:${m}:${s}`;
}

submitBtn.addEventListener("click", ()=>{
    let name1 = userInput.value;
    if(name1 == ""){
        msg.textContent = "Please enter your name, not a space!!!";
        return;
    }
    userName = name1.charAt(0).toUpperCase() + name1.slice(1).toLowerCase();
    msg.textContent = "Hello "+userName+", select a level and press Play :D!";
});
const playBtn = document.getElementById("playBtn");

const guess = document.getElementById("guess");


playBtn.addEventListener("click", play);
function play(){
    score = 0;
    roundStartTime = new Date().getTime();
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
        msg.textContent = `${userName}, enter a valid number from 1 to ${level}`;
        return;
    }
    score++;
    let diff = Math.abs(userGuess - answer);
    let hint = "";
    if(userGuess > answer) hint = "Too high :0";
    else if(userGuess < answer) hint = "Too low :(!";

    if(diff === 0){
        let roundTime = (new Date().getTime() - roundStartTime)/1000;
        msg.textContent = userName+ ",you got it yay! Score:"+ score+". Time: "+roundTime.toFixed(1);
        giveFeedback(score);
        storeGame(roundTime);
        reset();
        return;
    } else if(diff <= 2) hint += " Hot!!!";
    else if(diff <= 5) hint += " Warm : 0";
    else hint += " its Cold";

    msg.textContent = `${userName}, ${hint}`;
}

giveUpBtn.addEventListener("click", ()=>{
    score = level; 
    msg.textContent = `${userName}, you gave up boohoo... The answer was ${answer}. Score: ${score}`;
    let roundTime = (new Date().getTime() - roundStartTime)/1000;
    storeGame(roundTime);
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
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");



function updateScore(){
    scoreArr.sort((a,b)=>a-b);
    let lb = document.getElementsByName("leaderboard");
    for(let i=0; i<lb.length; i++){
        if(scoreArr[i]) lb[i].textContent = scoreArr[i];
    }
    wins.textContent = "Total wins:" + scoreArr.length;
    let sum = scoreArr.reduce((a,b)=>a+b,0);
    avgScore.textContent = `Average Score: ${(sum/scoreArr.length).toFixed(2)}`;
}

const avgTime = document.getElementById("avgTime");
const fastestTime = document.getElementById("fastestTime");

function updateTimeStats(){
    let sum = gameTimes.reduce((a,b)=>a+b,0);
    avgTime.textContent = `Average Time: ${(sum/gameTimes.length).toFixed(1)}s`;
    fastestTime.textContent = `Fastest Game: ${Math.min(...gameTimes).toFixed(1)}s`;
}


function giveFeedback(score){
    let feedback = "";
    if(score <= level/3) feedback = "Excellent!";
    else if(score <= level*2/3) feedback = "OK!";
    else feedback = "Needs improvement and you could solve faster.";
    msg.textContent += ` ${feedback}`;
}
