document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fullscreenBtn').addEventListener('click', function() {
        const video = document.getElementById('mainVideo');
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    });

    document.getElementById('helpBtn').addEventListener('click', function() {
        alert('ここにヘルプの内容を表示します。');
    });

    const timerBtn = document.getElementById('timerBtn');
    const timerModal = document.getElementById('timerModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const startTimerBtn = document.getElementById('startTimerBtn');
    const stopTimerBtn = document.getElementById('stopTimerBtn');
    const resumeTimerBtn = document.getElementById('resumeTimerBtn');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteUnmuteBtn = document.getElementById('muteUnmuteBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const backToContentsBtn = document.getElementById('backToContentsBtn');
    let timerInterval;
    let pausedTime;
    let blinkInterval;

    timerBtn.addEventListener('click', function() {
        timerModal.classList.toggle('hidden');
        if (timerModal.classList.contains('hidden')) {
            clearInterval(timerInterval);
            clearInterval(blinkInterval);
            document.getElementById('timerDisplay').textContent = '--:--';
            stopTimerBtn.classList.add('hidden');
            resumeTimerBtn.classList.add('hidden');
            startTimerBtn.classList.remove('hidden');
        }
    });
    closeModalBtn.addEventListener('click', function() {
        timerModal.classList.add('hidden');
        clearInterval(timerInterval);
        clearInterval(blinkInterval);
        document.getElementById('timerDisplay').textContent = '--:--';
        stopTimerBtn.classList.add('hidden');
        resumeTimerBtn.classList.add('hidden');
        startTimerBtn.classList.remove('hidden');
    });

    startTimerBtn.addEventListener('click', function() {
        const timerMinutes = document.getElementById('timerMinutes').value || 0; // 分が入力されていない場合は0分とする
        const timerSeconds = document.getElementById('timerSeconds').value;
        
        if (timerSeconds === '') {
            alert('秒数を指定してください。');
            return;
        }

        const timerDisplay = document.getElementById('timerDisplay');
        let timeLeft = parseInt(timerMinutes, 10) * 60 + parseInt(timerSeconds, 10);

        timerDisplay.textContent = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;
        clearInterval(timerInterval);
        clearInterval(blinkInterval);

        timerInterval = setInterval(() => {
            timeLeft -= 1;
            timerDisplay.textContent = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);

                // タイマー終了時に数字の色を白と赤に交互に切り替える
                blinkInterval = setInterval(() => {
                    timerDisplay.style.color = timerDisplay.style.color === 'red' ? 'white' : 'red';
                }, 500);
            }
        }, 1000);

        startTimerBtn.classList.add('hidden');
        stopTimerBtn.classList.remove('hidden');
    });

    stopTimerBtn.addEventListener('click', function() {
        clearInterval(timerInterval);
        clearInterval(blinkInterval);
        pausedTime = document.getElementById('timerDisplay').textContent;
        stopTimerBtn.classList.add('hidden');
        resumeTimerBtn.classList.remove('hidden');
    });

    resumeTimerBtn.addEventListener('click', function() {
        let [minutes, seconds] = pausedTime.split(':');
        let timeLeft = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
        const timerDisplay = document.getElementById('timerDisplay');

        timerInterval = setInterval(() => {
            timeLeft -= 1;
            timerDisplay.textContent = `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);

                // タイマー終了時に数字の色を白と赤に交互に切り替える
                blinkInterval = setInterval(() => {
                    timerDisplay.style.color = timerDisplay.style.color === 'red' ? 'white' : 'red';
                }, 500);
            }
        }, 1000);

        resumeTimerBtn.classList.add('hidden');
        stopTimerBtn.classList.remove('hidden');
    });
    playPauseBtn.addEventListener('click', function() {
        const video = document.getElementById('mainVideo');
        const playPauseImg = document.querySelector('#playPauseBtn img');
        
        if (video.paused) {
            video.play();
            playPauseImg.src = 'btns/under/btn2.png'; // ボタンの画像を「停止」に変更
        } else {
            video.pause();
            playPauseImg.src = 'btns/under/btn1.png'; // ボタンの画像を「再生」に変更
        }
    });

    muteUnmuteBtn.addEventListener('click', function() {
        const video = document.getElementById('mainVideo');
        const muteUnmuteImg = document.querySelector('#muteUnmuteBtn img');
        video.muted = !video.muted;
        muteUnmuteImg.src = video.muted ? 'btns/under/btn3.png' : 'btns/under/btn3.png'; // ボタンの画像を変更
    });

    rewindBtn.addEventListener('click', function() {
        const video = document.getElementById('mainVideo');
        video.currentTime -= 10;
    });

    forwardBtn.addEventListener('click', function() {
        const video = document.getElementById('mainVideo');
        video.currentTime += 10;
    });

    backToContentsBtn.addEventListener('click', function() {
        window.location.href = 'https://https-digibook-tokyo-syoseki-02-content.my.canva.site/english-song-all'; // コンテンツ一覧ページのURLを指定
    });
});
