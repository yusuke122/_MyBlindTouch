/*デフォルト値*/
var countsec = 3;
let FirstCountTimer;
const QuizStr;
let GameTime;
let AnswerTime;
let SoundVolume;
let GameSound;
/*id取得*/
const secid = document.getElementById("sec");
secid.innerText = String(countsec);

/*メソッド*/
//最初のカウントダウン
function FirstCountDown() {
    alert("firstcountdown");
    //FirstCountTimer = setInterval(FirstCount, 1000);
}
function FirstCount() {
    alert(countsec);
    countsec--;
    if (countsec < 0) {
        secid.innerText = "";
        firstcountmodal.classList.remove("open-modal");
        clearInterval(FirstCountTimer);
    }
}
//最初のカウントが終わったら問題と入力フォームを表示
function time() {
    alert("alert");
}