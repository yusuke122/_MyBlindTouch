/*�f�t�H���g�l*/
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
/*id�擾*/
const secid = document.getElementById("sec");
const gametime = document.getElementById("gametime");

/*class�擾*/ 
const StartCountModal = document.querySelector(".startcount-modal");
const GameTimeArea = document.querySelector(".GameTimeArea");
const GamePlayArea = document.querySelector(".GamePlayArea");


/*���\�b�h*/
//�ŏ��̃J�E���g�_�E��
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
//�ŏ��̃J�E���g���I���������Ɠ��̓t�H�[����\��
function GamePlay() {
}