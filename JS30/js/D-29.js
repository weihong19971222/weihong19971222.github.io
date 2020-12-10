let countdown;
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	clearInterval(countdown);
    // 現在時間與計時終了的時間
    const now = Date.now();
    //Date取得為minsec
    const then = now + seconds * 1000;
    // 計時開始前顯示出初始設定
	displayTimeLeft(seconds);
	displayEndTime(then);
    // 開始計時
	countdown = setInterval(()=>{
		const secondsLeft = Math.floor((then - Date.now()) / 1000);
		// 時間到就清除計時器並返回
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		// 還沒就顯示剩餘秒數
		displayTimeLeft(secondsLeft);
	}, 1000);
}
// 用分 / 秒顯示剩下多久
function displayTimeLeft(seconds){
	const minutes = Math.floor(seconds / 60);
	const reminderSeconds = seconds % 60;
    const display = `${minutes}:${reminderSeconds < 10 ? '0' : '' }${reminderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
}
// 用 時 / 分 顯示何時計時終了
function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour -12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    // parseInt()強制轉換型別
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
// 可以直接利用 document.[表格的 name] 來存取該表格
document.customForm.addEventListener('submit', function(e){
    // 在submit後不要送出
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins *60);
	this.reset();
})