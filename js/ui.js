'use strict'

function renderFace(){
    if (gGame.createMap.isCreateMode){
        setTimeout(function(){
            document.querySelector('.face').style.backgroundImage = `url(img/status-bar/face/god.png)`
            document.querySelector('.face').style.backgroundSize = "180%"
        },801)
        
    }
    document.querySelector('.face').style.backgroundImage = `url(img/status-bar/face/${gHealth}.gif)`
    if (gHealth === 3) document.querySelector('.face').style.backgroundSize = "230%"
    else document.querySelector('.face').style.backgroundSize = "180%"
}

function resetFace(){
    if (gHealth === 'reset') gHealth = 3
    document.querySelector('.health-num').innerText = gHealth
    gHealth = 'reset'
    renderFace()
    setTimeout(function(){
      gHealth = 3
      document.querySelector('.health-num').innerText = gHealth
      renderFace()
    },800)
}

function resetBulbs(){
    for (var i = 1; i < 4; i++){
    document.getElementById(`bulb${i}`).style.display = 'block'
    document.getElementById(`bulb${i}`).style.backgroundImage = `url(img/status-bar/light/false.png)`
    }
}

function resetHints(){
    document.querySelector('.hints').innerHTML = 
            `<div class="bulbs">
                <span class="bulb" id="bulb1" onclick="hintModeSwitch(this)"></span>
                <span class="bulb" id="bulb2" onclick="hintModeSwitch(this)"></span>
                <span class="bulb" id="bulb3" onclick="hintModeSwitch(this)"></span>
            </div>
            <span>HINTS</span>`
            document.querySelector('.hints').classList.remove('center-p')
            document.querySelector('.hints').classList.add('card')
}

function hintModeSwitch(el){
    if (!gGame.isOn) return

    if (gGame.bulbId === null){
        gGame.isHintMode = !gGame.isHintMode
        gGame.bulbId = el.id
        el.style.backgroundImage = `url(img/status-bar/light/${gGame.isHintMode}.png)`
    } else if (gGame.bulbId !== el.id){
        document.getElementById(`${gGame.bulbId}`).style.backgroundImage = `url(img/status-bar/light/false.png)`
        gGame.bulbId = el.id
        el.style.backgroundImage = `url(img/status-bar/light/true.png)`

    } else if (gGame.bulbId === el.id){
        gGame.bulbId = null
        gGame.isHintMode = !gGame.isHintMode
        el.style.backgroundImage = `url(img/status-bar/light/${gGame.isHintMode}.png)`
    }
}

function openWinModal(){
    
    document.querySelector('.game-container').innerHTML +=
    `<div class="popup">
        <button class="close" onclick="initGame()">X</button>
        <h1>You Win!!</h1>
        <div class="content">
            <h2>Your score is ${gGame.finalScore}</h2>
            <h4>Enter your name:</h4>
            <input type="text" id="name"><br>
            <button class="" onclick="submit()">Submit</button>
        </div>
    </div>`

}
function submit(){
    var name = document.getElementById('name').value
    if (name !== "") saveScore(name, gGame.finalScore, gGame.currLevel)
}

function showHighScore(gamesPlayed, level){
    document.querySelector('.popup').remove()
    document.querySelector('.game-container').innerHTML +=
    `<div class="popup">
        <button class="close" onclick="initGame()">X</button>
        <h2>HIGH SCORE</h2>
        <h3>${gGame.currLevel} level</h3>
        <table class="score-table">
            <tbody class="score-body">
                <thead>
                    <td>Rank</td>
                    <td>Name</td>
                    <td>Score</td>
                </thead>
                </tbody>
        </table>
    </div>`
    var scores = []
    for (var i = 0; i < gamesPlayed; i++){
        var level = JSON.parse(localStorage.getItem('game'+i)).level
        var currName = JSON.parse(localStorage.getItem('game'+i)).name
        var currScore = JSON.parse(localStorage.getItem('game'+i)).score
        if (level === gGame.currLevel){
            scores.push({name: currName, score: currScore})
        }
    }

    scores.sort(function (a, b) {
        return b.score - a.score
    })

    for (i = 0; i < 3; i++){
        var name = scores[i].name
        var score = scores[i].score
        document.querySelector('.score-body').innerHTML +=
        `<tr>
            <td>${i+1}</td>
            <td>${name}</td>
            <td>${score}</td>
          </tr>`
    }
}