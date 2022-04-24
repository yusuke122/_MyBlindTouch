// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function HomeGameStageButtonClick()
{
    alert("game start");
}

function HomeDataButtonClick() {
    alert("Data");
}

function ElementStageOnClick() {
    history.back();
}

function MiddleStageOnClick() {
    window.location.href = 'MiddleStage/Index';
}

function TopStageOnClick() {
    window.location.href = 'TopStage/Index';
}
function audio_change() { //オーディオ有無
	if (audio_status == 1) {
		audio_status = 0;
		document.getElementById('button_audio').src = 'audio_off.gif';
		for (i = 0; i < audio_files.length; i++) {
			audio[i].muted = true;
		}
		audio[0].pause(); //BGM停止
	} else {
		audio_status = 1;
		document.getElementById('button_audio').src = 'audio_on.gif';
		for (i = 0; i < audio_files.length; i++) {
			audio[i].muted = false;
		}
		if (screenstatus == 1) {
			audio[0].play(); //BGM演奏
		}
	}
}
//タッチパネル処理
if ((window.TouchEvent) && (window.innerHeight > window.innerWidth)) {
	window.addEventListener('touchstart', processTouch);
} else {
	//マウスボタン処理
	window.addEventListener('mousedown', processMouse);
}

//エネルギー表示
clearInterval(eng_timerId);
eng_timerId = setInterval(energyHyoji, 199);

//ダメージ表示
clearInterval(damage_timerId);
damage_timerId = setInterval(damageHyoji, 198);
//スコア表示処理
function scoreHyoji() {
	document.getElementById('your_score').textContent = score;
	if (score > best_score) {
		best_score = score;
		document.getElementById('best_score').textContent = best_score;
	}
}

//スコア表示
clearInterval(score_timerId);
score_timerId = setInterval(scoreHyoji, 297);

//発射数、ヒット数、ヒット確率表示
clearInterval(fire_timerId);
fire_timerId = setInterval(fireHyoji, 396);

//マウスカーソルの変更
document.getElementById('canvas2').style.cursor = 'crosshair';
document.getElementById('div_title').style.cursor = 'crosshair';

//トップ画面表示
document.addEventListener('DOMContentLoaded', top_title());


