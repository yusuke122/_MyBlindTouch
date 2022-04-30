/*デフォルト値*/
var countsec = 3;
let FirstCountTimer;
//const QuizStr=require('./SettingsData.json');
/*
 fetch("./students.json")
.then(response => {
   return response.json();
})
.then(jsondata => console.log(jsondata));
 */ 
let GameTime;
let AnswerTime;
let SoundVolume;
let GameSound;
/*id取得*/
const secid = document.getElementById("sec");
const gametime = document.getElementById("gametime");

/*class取得*/ 
const StartCountModal = document.querySelector(".startcount-modal");
const GameTimeArea = document.querySelector(".GameTimeArea");
const GamePlayArea = document.querySelector(".GamePlayArea");


/*メソッド*/
//最初のカウントダウン
function FirstCountDown() {
    FirstCountTimer = setInterval(FirstCount, 1000);
}
function FirstCount() {
    secid.innerText = String(countsec);
    countsec--;
    if (countsec < 0) {
        secid.innerText = "";
        StartCountModal.classList.remove("open-modal");
        clearInterval(FirstCountTimer);
        GameTimeArea.classList.add("open-modal");
        GamePlayArea.classList.add("open-modal");
        GamePlay();
    }
}
//最初のカウントが終わったら問題と入力フォームを表示
function GamePlay() {
}