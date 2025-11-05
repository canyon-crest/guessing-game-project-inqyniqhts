let level, answer, score, roundStartTime;
let levelArr = document.getElementsByName("level");
let scoreArr = [];
let gameTimes = [];
let userName = "";

const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const giveUpBtn = document.getElementById("giveUp");
const guess = document.getElementById("guess");
const msg = document.getElementById("msg");
const wins = document.getElementById("wins");
const avgScore = document.getElementById("avgScore");
const avgTime = document.createElement("p");
const fastestTime = document.createElement("p");
const dateEl = document.getElementById("date");
document.body.appendChild(avgTime);
document.body.appendChild(fastestTime);

const submitBtn = document.getElementById("submit");
const userInput = document.getElementById("userName");

guessBtn.disabled = true;
giveUpBtn.disabled = true;

function getTimeString(){
    let d = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let day = d.getDate();
    let suffix = "th";
    if(day % 10 === 1 && day !== 11) suffix = "st";
    else if(day % 10 === 2 && day !== 12) suffix = "nd";
    else if(day % 10 === 3 && day !== 13) suffix = "rd";
    return `${months[d.getMonth()]} ${day}${suffix}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
setInterval(()=>{ dateEl.textContent = getTimeString(); }, 1000);

submitBtn.addEventListener("click", ()=>{
    let name = userInput.value.trim();
    if(name === ""){
        alert("Please enter your name!");
        return;
    }
    userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    msg.textContent = `Hello ${userName}, select a level and press Play!`;
});

playBtn.addEventListener("click", play);
function play(){
    if(userName === ""){
        alert("Enter your name first!");
        return;
    }
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
    
    msg.textContent = `${userName}, guess a number from 1 to ${level}`;
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
    if(userGuess > answer) hint = "Too high!";
    else if(userGuess < answer) hint = "Too low!";
    
    if(diff === 0){
        let roundTime = (new Date().getTime() - roundStartTime)/1000;
        msg.textContent = `${userName}, you got it! Score: ${score}. Time: ${roundTime.toFixed(1)}s`;
        giveFeedback(score);
        storeGame(roundTime);
        reset();
        return;
    } else if(diff <= 2) hint += " 🔥 Hot!";
    else if(diff <= 5) hint += " 🌡️ Warm";
    else hint += " ❄️ Cold";
    
    msg.textContent = `${userName}, ${hint}`;
}

giveUpBtn.addEventListener("click", ()=>{
    score = level; // worst score
    msg.textContent = `${userName}, you gave up! The answer was ${answer}. Score: ${score}`;
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

function updateScore(){
    scoreArr.sort((a,b)=>a-b);
    let lb = document.getElementsByName("leaderboard");
    for(let i=0; i<lb.length; i++){
        if(scoreArr[i]) lb[i].textContent = scoreArr[i];
    }
    wins.textContent = `Total wins: ${scoreArr.length}`;
    let sum = scoreArr.reduce((a,b)=>a+b,0);
    avgScore.textContent = `Average Score: ${(sum/scoreArr.length).toFixed(2)}`;
}

function updateTimeStats(){
    let sum = gameTimes.reduce((a,b)=>a+b,0);
    avgTime.textContent = `Average Time: ${(sum/gameTimes.length).toFixed(1)}s`;
    fastestTime.textContent = `Fastest Game: ${Math.min(...gameTimes).toFixed(1)}s`;
}

function giveFeedback(score){
    let feedback = "";
    if(score <= level/3) feedback = "Excellent!";
    else if(score <= level*2/3) feedback = "OK!";
    else feedback = "Needs improvement!";
    msg.textContent += ` ${feedback}`;
}

playBtn.addEventListener("click", ()=>{
    answer = Math.floor(Math.random()*level)+1;
});