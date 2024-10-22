const hour = document.getElementById("hour");
const min = document.getElementById("min");
const sec = document.getElementById("sec");
var intervalSwitch;
let time;


let is_say_left_2 = false
let is_say_left_30 = false
let is_say_left_60 = false
let audio;

function countdown() {
  const now = new Date(); // 現在時刻を取得
  // const tomorrow = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1); // 明日の0:00を取得
  const diff = time.getTime() - now.getTime(); // 時間の差を取得（ミリ秒）

  // ミリ秒から単位を修正
  const calcHour = Math.floor(diff / 1000 / 60 / 60);
  const calcMin = Math.floor(diff / 1000 / 60) % 60;
  const calcSec = Math.floor(diff / 1000) % 60;
  const calcMs = Math.floor((diff % 1000) / 100); // 残りミリ秒を取得（10ミリ秒単位で表示）


  // 取得した時間を表示（2桁表示）
  // hour.innerHTML = calcHour < 10 ? '0' + calcHour : calcHour;
  min.innerHTML = calcMin < 10 ? '0' + calcMin : calcMin;
  sec.innerHTML = calcSec < 10 ? `0${calcSec}.${calcMs}` : `${calcSec}.${calcMs}`;
  if(!is_say_left_60 && diff<60000){
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio("timer_nomal_30.mp3");
    audio.play();
    is_say_left_60 = true;
  }
  if(!is_say_left_30 && diff<30000){
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio("timer_first_30.mp3");
    audio.play();
    is_say_left_30 = true;
  }
  if(!is_say_left_2 && diff<2500){
    audio.pause();
    audio.currentTime = 0;
    audio = new Audio("timer_2.mp3");
    audio.play();
    is_say_left_2 = true;
  }
}

document.getElementById("start").addEventListener("click", function() {
  const now = new Date(); // 現在時刻を取得
  time = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(), now.getMinutes()+2,now.getSeconds());

  countdown();
  audio = new Audio("timer_60.mp3");
  audio.play();
  intervalSwitch = setInterval(countdown,10);
})

document.getElementById("stop").addEventListener("click", function() {
  clearInterval(intervalSwitch);
  audio.pause();
  audio.currentTime = 0;
})