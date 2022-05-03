/*id�擾*/
const secid = document.getElementById("sec");//�Q�[���J�n���̃J�E���g�_�E����\��
const gametime = document.getElementById("gametime");//�Q�[���̎c�莞�Ԃ�\��
const question = document.getElementById("question");//���
const answer = document.getElementById("answer");//�𓚃t�H�[���Fvalue�ŉ𓚂����o��
const questioncountid = document.getElementById("questioncount");//�Q�[���̌��ʂ�\��:�o�萔
const answertruecountid = document.getElementById("answertruecount");//�Q�[���̌��ʂ�\��:������
const answeraveragetimeid = document.getElementById("answeraveragetime");//�Q�[���̌��ʂ�\��:���ω𓚎���
const playerlevel = document.getElementById("playerlevel");//�Q�[���̌��ʂ�\��:�X�e�[�^�X

const gameresultdetail = document.getElementById("gameresult-detail");//�Q�[���̌��ʏڍׂ�\��
const focusBtn = document.getElementById("focus-button");//�𓚃t�H�[���Ƀt�H�[�J�X���[�Ă邽�߂̃{�^��
const PauseBtn = document.getElementById("pause-button");//�ꎞ��~�{�^��
const PauseReplayBtn = document.getElementById("pause-replay-button");//�ꎞ��~��Ԃ���ĊJ����{�^��
const ResultDetailBtn = document.getElementById("gameresult-detail-button");//�Q�[���I����Ɍ��ʂ̏ڍׂ�����{�^��
const DetailToResultBtn = document.getElementById("detail-to-result-button");//�ڍׂ��猋�ʉ�ʂ֖߂�

/*class�擾*/ 
const StartCountModal = document.querySelector(".startcount-modal");
const GameTimeModal = document.querySelector(".gametime-modal");
const GamePlayModal = document.querySelector(".gameplay-modal");
const TrueModal = document.querySelector(".true-modal");
const FalseModal = document.querySelector(".false-modal");
const PauseModal = document.querySelector(".pause-modal");
const GameOverModal = document.querySelector(".gameover-modal");
const GameResultModal = document.querySelector(".gameresult-modal");
const GameResultDetailModal = document.querySelector(".gameresult-detail-modal");

/*�f�t�H���g�l*/
let countsec = 3;
let FirstCountTimer, AnswerTimeTimer, GameTimeTimer;
let GameTime = 30;
let LastGameTime = GameTime;
let AnswerTime = 5;
let AnswerTimeMs = AnswerTime * 1000;
let DefAnsTime = AnswerTimeMs;
let SoundVolume = 50;
let GameSound = "soundon";
let QuizStrOutputList;

let questionoutputlist = new Array(0);//�듚��ɍēx�o�͂��ꂽ���̂��܂߂�
let answeroutputlist = new Array(0);//�����A�듚�S�Ċ܂߂�
let answerjudgelist = new Array(0);//�����A�듚�S�Ċ܂߂�
let answertimelist = new Array(0);//�����A�듚�S�Ċ܂߂�

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
        DisplayGamePlayField();
    }
}
//�ŏ��̃J�E���g���I���������Ɠ��̓t�H�[����\��
function DisplayGamePlayField() {
    GameTimeModal.classList.add("open-modal");
    GamePlayModal.classList.add("open-modal");
    setTimeout(() => { focusBtn.click() }, 50);//50ms��Ƀt�H�[���Ƀt�H�[�J�X���[�Ă�
    setTimeout(GamePlay, 100);
    setTimeout(GameTimeWatch,100);
}
//click���ɉ𓚃t�H�[���Ƀt�H�[�J�X�����Ă�
focusBtn.addEventListener("click", function () {
    answer.focus();
});
//�Q�[����
function GameTimeWatch() {
    gametime.innerText = LastGameTime;//�c�莞�Ԃ�\��
    GameTimeTimer = setInterval(GameTimeElapsed, 1000);//�Q�[���̎c�莞�Ԃ̌v��
}
function GamePlay() {
    QuizStrOutput();//���̏o��
    AnswerTimeTimer = setInterval(AnswerTimeElapsed, 1);//�𓚂̎c�莞�Ԃ̌v��
}

function GameTimeElapsed() {
    LastGameTime--;//1000ms�����炷
    gametime.innerText = LastGameTime;//�c�莞�Ԃ�\��
    if (LastGameTime == 0) {
        clearInterval(AnswerTimeTimer);//�^�C�}�[��~
        clearInterval(GameTimeTimer);//�^�C�}�[��~
        GameOver();
        LastGameTime = GameTime;//�v���C���Ԃ̃��Z�b�g
    }
}

function AnswerTimeElapsed() {
    AnswerTimeMs--;//1ms�����炷
    if (AnswerTimeMs == 0) {
        clearInterval(AnswerTimeTimer);//�^�C�}�[��~
        AnswerFalse();//�s�����̃A�N�V����
        AnswerTimeMs = AnswerTime * 1000;//�𓚎��Ԃ̃��Z�b�g
        GamePlay();//���\���A�𓚎��Ԍv��
    }
}
function QuizStrOutput() {
    //json����o�肷�镶����ꗗ���擾
    //�����_���ŏo��
    question.value = "question";
    question.innerText = question.value;
}
answer.addEventListener("input", AnswerJudge);//���͎��̐��딻��
function AnswerJudge() {
    if (answer.value == question.value)//������
    {
        questionoutputlist.push(question.value);
        answerjudgelist.push('o');
        answeroutputlist.push(answer.value);
        answertimelist.push((Math.floor(DefAnsTime - AnswerTimeMs)) / 1000);

        clearTimeout(AnswerTimeTimer);
        AnswerTrue();
        setTimeout(() => { GamePlay(); answer.value = ''; }, 500);
    }
    else if (answer.value != question.value.slice(0, answer.value.length)) {//�s������
        questionoutputlist.push(question.value);
        answerjudgelist.push('x');
        answeroutputlist.push(answer.value);
        answertimelist.push((Math.floor(DefAnsTime - AnswerTimeMs)) / 1000);
        AnswerFalse();
        setTimeout(() => { answer.value = ''; }, 500);
    }
}
//�������ɁZ��\��
function AnswerTrue() {
    TrueModal.classList.add("open-modal");
    setTimeout(() => { TrueModal.classList.remove("open-modal"); }, 500);
}
//�s�������Ɂ~��\��
function AnswerFalse() {
    FalseModal.classList.add("open-modal");
    setTimeout(() => { FalseModal.classList.remove("open-modal"); }, 500);
}
//�ꎞ��~
PauseBtn.addEventListener("click", function () {
    clearInterval(GameTimeTimer);
    clearInterval(AnswerTimeTimer);
    PauseModal.classList.add("open-modal");
});
//�ꎞ��~��Ԃ���ĊJ����
PauseReplayBtn.addEventListener("click", function () {
    PauseModal.classList.remove("open-modal");
    setTimeout(() => {
        GameTimeWatch();
        GamePlay();
    }, 50);
    GameTimeWatch();
    GamePlay();
});
//�Q�[���I�[�o�[��
function GameOver() {
    GameOverModal.classList.add("open-modal");
    clearInterval(GameTimeTimer);
    clearInterval(AnswerTimeTimer);
    setTimeout(GameResult, 2000);
}
//���ʂ̕\��
function GameResult() {
    GameTimeModal.classList.remove("open-modal");
    GamePlayModal.classList.remove("open-modal");
    GameOverModal.classList.remove("open-modal");
    GameResultModal.classList.add("open-modal");
    /*
     �o�萔�A�������A���ω𓚎��ԁA�v���C���[�̃��x�����o��
     */
    var questioncount = 0;
    var answertruecount = 0;
    var answeraveragetime = 0;
    var answertimesum = 0;
    var answeraveragetimelist = new Array(0);
    var falsequestions = new Array(0);
    var i = 0;
    var j = 0;
    questionoutputlist.forEach(function (element) {
        //�o�萔�������������{���Ԑ؂�̖��
        //���ω𓚎��ԁ������������̉𓚎���
        if (answerjudgelist[i] == 'o') {
            //������
            questioncount++;
            answertruecount++;
            answeraveragetimelist.push(answertimelist[i]);
        }
        else {
            //�듚��
            if (answertimelist[i] == DefAnsTime) {
                questioncount++;
                answeraveragetimelist.push(answertimelist[i]);
            }
        }
        i++;
    });
    questioncountid.innerText = "�o�萔�F" + questioncount + "��";
    answertruecountid.innerText = "�������F" + answertruecount + "��";
    answeraveragetimelist.forEach(function (element) {
        answertimesum += answeraveragetimelist[j];
        j++;
    });
    answeraveragetime = Math.floor((answertimesum / answeraveragetimelist.length) * 1000) / 1000;
    answeraveragetimeid.innerText = "���ω𓚎��ԁF" + answeraveragetime + "s";
    //�S�o��ɑ΂��p�[�t�F�N�g�̓}�X�^�[�@�~�X��10��������blindtouch�㋉�ҁ@20%������blindtouch�����ҁ@����ȉ��͏��S��
    if (answertruecount / questionoutputlist.length == 1) {
        playerlevel.innerText = "���Ȃ��� Blind Touch Master �ł�";
    }
    else if (1 > (answertruecount / questionoutputlist.length) && (answertruecount / questionoutputlist.length) > 0.9) {
        playerlevel.innerText = "���Ȃ��́@Blind Touch TopPlayer �ł�";
    }
    else if (0.9 >= (answertruecount / questionoutputlist.length) && (answertruecount / questionoutputlist.length) > 0.8) {
        playerlevel.innerText = "���Ȃ��́@Blind Touch Expert�@�ł�";
    }
    else {
        playerlevel.innerText = "���Ȃ��́@Blind Touch Beginner�@�ł�";
    }
}
//���ʏڍׂ̕\��
ResultDetailBtn.addEventListener("click", function () {
    GameResultModal.classList.remove("open-modal");
    GameResultDetailModal.classList.add("open-modal");
    var i = 0;
   
    questionoutputlist.forEach(function (element) {
        i++;
    });
    gameresultdetail.innerText = html;
});
//�ڍׂ��猋�ʉ�ʂ�
DetailToResultBtn.addEventListener("click", function () {
    GameResultDetailModal.classList.remove("open-modal");
    setTimeout(() => { GameResultModal.classList.add("open-modal") },1000);
});