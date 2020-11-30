'use strict'

function cellMarked(elCell, i, j){
    elCell.classList.toggle('mark')
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) gGame.minesMarked--
    if (gBoard[i][j].isMine && gBoard[i][j].isMarked) gGame.minesMarked++
    
}

function loseGame(){
    pauseTimer()
    showAllMines()
    gGame.isOn = false
}


function showAllMines(){
    var mines = []
    for (var i = 0; i < gLevel.SIZE; i++){
        for (var j = 0; j < gLevel.SIZE; j++){
            if (gBoard[i][j].isMine) mines.push(gBoard[i][j])
        }
    }
    for (var i = 0; i < mines.length; i++) {
        document.getElementById(`${mines[i].id}`).classList.remove('isShown-false')
    }
}

function checkGameOver(){
    var totalCells = gLevel.SIZE*gLevel.SIZE
    if ((totalCells - gGame.minesMarked) === gGame.shownCount || gGame.shownCount === totalCells){
        gGame.isOn = false
        pauseTimer()
        document.querySelector('.face').style.backgroundImage = `url(img/status-bar/face/win-face.png)`
        document.querySelector('.face').style.backgroundSize = "200%"
        gGame.finalScore = (gHealth*100)+(gGame.hintsUsed*80)+(gGame.safeClicks*60)-gGame.secsPassed
        openWinModal()
    }
}

function chooseLevel(level){
    if (level === gGame.currLevel) return
    else gGame.currLevel = level
    initGame()
}

function undoBoard(){
    if (!gGame.boardCopies[0]) return
    var lastCopy = gGame.boardCopies.length - 1
    console.log(gGame.boardCopies[lastCopy])
    gBoard = gGame.boardCopies[lastCopy]
    renderBoard(gBoard)
    gGame.boardCopies.splice(lastCopy)
    if (!gGame.boardCopies[0]) gGame.firstClick = true
}

