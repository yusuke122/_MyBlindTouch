/*�f�t�H���g�l*/
var countsec = 3;
let FirstCountTimer;
const QuizStr;
let GameTime;
let AnswerTime;
let SoundVolume;
let GameSound;
/*id�擾*/
const secid = document.getElementById("sec");
secid.innerText = String(countsec);

/*���\�b�h*/
//�ŏ��̃J�E���g�_�E��
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
//�ŏ��̃J�E���g���I���������Ɠ��̓t�H�[����\��
function time() {
    alert("alert");
}