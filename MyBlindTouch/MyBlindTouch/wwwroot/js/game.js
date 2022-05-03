/*id取得*/
const secid = document.getElementById("sec");//ゲーム開始時のカウントダウンを表示
const gametime = document.getElementById("gametime");//ゲームの残り時間を表示
const question = document.getElementById("question");//問題
const answer = document.getElementById("answer");//解答フォーム：valueで解答を取り出す
const questioncountid = document.getElementById("questioncount");//ゲームの結果を表示:出題数
const answertruecountid = document.getElementById("answertruecount");//ゲームの結果を表示:正答数
const answeraveragetimeid = document.getElementById("answeraveragetime");//ゲームの結果を表示:平均解答時間
const playerlevel = document.getElementById("playerlevel");//ゲームの結果を表示:ステータス

const gameresultdetail = document.getElementById("gameresult-detail");//ゲームの結果詳細を表示
const focusBtn = document.getElementById("focus-button");//解答フォームにフォーカスを充てるためのボタン
const PauseBtn = document.getElementById("pause-button");//一時停止ボタン
const PauseReplayBtn = document.getElementById("pause-replay-button");//一時停止状態から再開するボタン
const ResultDetailBtn = document.getElementById("gameresult-detail-button");//ゲーム終了後に結果の詳細を見るボタン
const DetailToResultBtn = document.getElementById("detail-to-result-button");//詳細から結果画面へ戻る

/*class取得*/ 
const StartCountModal = document.querySelector(".startcount-modal");
const GameTimeModal = document.querySelector(".gametime-modal");
const GamePlayModal = document.querySelector(".gameplay-modal");
const TrueModal = document.querySelector(".true-modal");
const FalseModal = document.querySelector(".false-modal");
const PauseModal = document.querySelector(".pause-modal");
const GameOverModal = document.querySelector(".gameover-modal");
const GameResultModal = document.querySelector(".gameresult-modal");
const GameResultDetailModal = document.querySelector(".gameresult-detail-modal");

/*デフォルト値*/
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

let questionoutputlist = new Array(0);//誤答後に再度出力されたものを含める
let answeroutputlist = new Array(0);//正答、誤答全て含める
let answerjudgelist = new Array(0);//正答、誤答全て含める
let answertimelist = new Array(0);//正答、誤答全て含める

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
        DisplayGamePlayField();
    }
}
//最初のカウントが終わったら問題と入力フォームを表示
function DisplayGamePlayField() {
    GameTimeModal.classList.add("open-modal");
    GamePlayModal.classList.add("open-modal");
    setTimeout(() => { focusBtn.click() }, 50);//50ms後にフォームにフォーカスを充てる
    setTimeout(GamePlay, 100);
    setTimeout(GameTimeWatch,100);
}
//click時に解答フォームにフォーカスをあてる
focusBtn.addEventListener("click", function () {
    answer.focus();
});
//ゲーム中
function GameTimeWatch() {
    gametime.innerText = LastGameTime;//残り時間を表示
    GameTimeTimer = setInterval(GameTimeElapsed, 1000);//ゲームの残り時間の計測
}
function GamePlay() {
    QuizStrOutput();//問題の出力
    AnswerTimeTimer = setInterval(AnswerTimeElapsed, 1);//解答の残り時間の計測
}

function GameTimeElapsed() {
    LastGameTime--;//1000msずつ減らす
    gametime.innerText = LastGameTime;//残り時間を表示
    if (LastGameTime == 0) {
        clearInterval(AnswerTimeTimer);//タイマー停止
        clearInterval(GameTimeTimer);//タイマー停止
        GameOver();
        LastGameTime = GameTime;//プレイ時間のリセット
    }
}

function AnswerTimeElapsed() {
    AnswerTimeMs--;//1msずつ減らす
    if (AnswerTimeMs == 0) {
        clearInterval(AnswerTimeTimer);//タイマー停止
        AnswerFalse();//不正解のアクション
        AnswerTimeMs = AnswerTime * 1000;//解答時間のリセット
        GamePlay();//問題表示、解答時間計測
    }
}
function QuizStrOutput() {
    //jsonから出題する文字列一覧を取得
    //ランダムで出力
    question.value = "question";
    question.innerText = question.value;
}
answer.addEventListener("input", AnswerJudge);//入力時の正誤判定
function AnswerJudge() {
    if (answer.value == question.value)//正解時
    {
        questionoutputlist.push(question.value);
        answerjudgelist.push('o');
        answeroutputlist.push(answer.value);
        answertimelist.push((Math.floor(DefAnsTime - AnswerTimeMs)) / 1000);

        clearTimeout(AnswerTimeTimer);
        AnswerTrue();
        setTimeout(() => { GamePlay(); answer.value = ''; }, 500);
    }
    else if (answer.value != question.value.slice(0, answer.value.length)) {//不正解時
        questionoutputlist.push(question.value);
        answerjudgelist.push('x');
        answeroutputlist.push(answer.value);
        answertimelist.push((Math.floor(DefAnsTime - AnswerTimeMs)) / 1000);
        AnswerFalse();
        setTimeout(() => { answer.value = ''; }, 500);
    }
}
//正解時に〇を表示
function AnswerTrue() {
    TrueModal.classList.add("open-modal");
    setTimeout(() => { TrueModal.classList.remove("open-modal"); }, 500);
}
//不正解時に×を表示
function AnswerFalse() {
    FalseModal.classList.add("open-modal");
    setTimeout(() => { FalseModal.classList.remove("open-modal"); }, 500);
}
//一時停止
PauseBtn.addEventListener("click", function () {
    clearInterval(GameTimeTimer);
    clearInterval(AnswerTimeTimer);
    PauseModal.classList.add("open-modal");
});
//一時停止状態から再開する
PauseReplayBtn.addEventListener("click", function () {
    PauseModal.classList.remove("open-modal");
    setTimeout(() => {
        GameTimeWatch();
        GamePlay();
    }, 50);
    GameTimeWatch();
    GamePlay();
});
//ゲームオーバー時
function GameOver() {
    GameOverModal.classList.add("open-modal");
    clearInterval(GameTimeTimer);
    clearInterval(AnswerTimeTimer);
    setTimeout(GameResult, 2000);
}
//結果の表示
function GameResult() {
    GameTimeModal.classList.remove("open-modal");
    GamePlayModal.classList.remove("open-modal");
    GameOverModal.classList.remove("open-modal");
    GameResultModal.classList.add("open-modal");
    /*
     出題数、正答数、平均解答時間、プレイヤーのレベルを出力
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
        //出題数＝正答した問題＋時間切れの問題
        //平均解答時間＝正答した問題の解答時間
        if (answerjudgelist[i] == 'o') {
            //正答時
            questioncount++;
            answertruecount++;
            answeraveragetimelist.push(answertimelist[i]);
        }
        else {
            //誤答時
            if (answertimelist[i] == DefAnsTime) {
                questioncount++;
                answeraveragetimelist.push(answertimelist[i]);
            }
        }
        i++;
    });
    questioncountid.innerText = "出題数：" + questioncount + "問";
    answertruecountid.innerText = "正答数：" + answertruecount + "問";
    answeraveragetimelist.forEach(function (element) {
        answertimesum += answeraveragetimelist[j];
        j++;
    });
    answeraveragetime = Math.floor((answertimesum / answeraveragetimelist.length) * 1000) / 1000;
    answeraveragetimeid.innerText = "平均解答時間：" + answeraveragetime + "s";
    //全出題に対しパーフェクトはマスター　ミスが10％未満はblindtouch上級者　20%未満はblindtouch中級者　それ以下は初心者
    if (answertruecount / questionoutputlist.length == 1) {
        playerlevel.innerText = "あなたは Blind Touch Master です";
    }
    else if (1 > (answertruecount / questionoutputlist.length) && (answertruecount / questionoutputlist.length) > 0.9) {
        playerlevel.innerText = "あなたは　Blind Touch TopPlayer です";
    }
    else if (0.9 >= (answertruecount / questionoutputlist.length) && (answertruecount / questionoutputlist.length) > 0.8) {
        playerlevel.innerText = "あなたは　Blind Touch Expert　です";
    }
    else {
        playerlevel.innerText = "あなたは　Blind Touch Beginner　です";
    }
}
//結果詳細の表示
ResultDetailBtn.addEventListener("click", function () {
    GameResultModal.classList.remove("open-modal");
    GameResultDetailModal.classList.add("open-modal");
    var i = 0;
   
    questionoutputlist.forEach(function (element) {
        i++;
    });
    gameresultdetail.innerText = html;
});
//詳細から結果画面へ
DetailToResultBtn.addEventListener("click", function () {
    GameResultDetailModal.classList.remove("open-modal");
    setTimeout(() => { GameResultModal.classList.add("open-modal") },1000);
});