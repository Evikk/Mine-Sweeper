var gMinutes = 0
var gSeconds = 0
var running = 0
var finalTime = null
var elTimer = document.querySelector(".timer")
var timerIntervalId

function startTimer(){
	if(running === 0){
        running = 1
        start()
    }
}

function pauseTimer(){
    running = 0
    clearInterval(timerIntervalId)
}

function resetTimer(){
    running = 0
    clearInterval(timerIntervalId)
	gMinutes = 0
	gSeconds = 0
	document.querySelector(".timer").innerHTML = "00:00"
};


function start(){
    if(running === 1){
        
        timerIntervalId = setInterval(function(){
            gSeconds++;
            var mins = gMinutes;
            if(mins <= 9){
                mins = "0" + mins;
            }
            var secs = gSeconds
            if(secs <= 9){
                secs = "0" + secs;
            }
            if (gSeconds  === 60) {
                secs = "00"
                gMinutes++
                mins = "0"+gMinutes
                gSeconds = 0
            }
            finalTime = `${mins}:${secs}`
            gGame.secsPassed ++
            elTimer.innerHTML = mins + ":" + secs;
        }, 1000);
    }
}

