const currentsoundid = document.getElementById("gamesoundrange");
const volumeid = document.getElementById("volumeid");
const settingschange = document.getElementById("settingschange");

const settingschangedbtn = document.getElementById("settings-changed-button");
const loader = document.querySelector(".loader");
//other
/*
settingschangedbtn.addEventListener("click", function () {
    //SettingsChangeModal.classList.remove("open-modal");
});
*/
//sound
// 現在の値をspanに埋め込む関数
const setCurrentValue = (val) => {
    volumeid.innerText = val;
    //music.volume = val / 100; //default=50/100 =>0.5
}

// inputイベント時に値をセットする関数
const soundRangeOnChange = (e) => {
    setCurrentValue(e.target.value);
}
/*
function soundCheckOn() {
    music.play();
}

function soundCheckOff() {
    music.pause();
}
*/
