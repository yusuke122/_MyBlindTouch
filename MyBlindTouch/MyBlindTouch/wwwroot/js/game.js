/*デフォルト値*/
var countsec = 3;
let FirstCountTimer, AnswerTimeTimer, GameTimeTimer;
let GameTime = 30;
let LastGameTime = GameTime;
let AnswerTime = 5;
let AnswerTimeMs = AnswerTime * 1000;
let SoundVolume=50;
let GameSound="soundoff";
/*id取得*/
const secid = document.getElementById("sec");//ゲーム開始時のカウントダウンを表示
const gametime = document.getElementById("gametime");//ゲームの残り時間を表示
const question = document.getElementById("question");//問題
const answer = document.getElementById("answer");//解答フォーム：valueで解答を取り出す
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
        clearTimeout(AnswerTimeTimer);
        AnswerTrue();
        setTimeout(() => { GamePlay(); answer.value = ''; }, 500);
    }
    else if (answer.value != question.value.slice(0, answer.value.length)) {//不正解時
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
    GameOverModal.classList.remove("open-modal");
    GameResultModal.classList.add("open-modal");
}
//結果詳細の表示
ResultDetailBtn.addEventListener("click", function () {
    GameResultDetailModal.classList.add("open-modal");
    //gameAroundTime = pauseToPlay;
});
//詳細から結果画面へ
DetailToResultBtn.addEventListener("click", function () {
    GameResultDetailModal.classList.remove("open-modal");
});