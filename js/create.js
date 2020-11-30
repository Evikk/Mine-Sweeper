'use strict'

function createMode(){
    resetGameStats()
    setLevel()
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.isOn = false
    gGame.createMap.isCreateMode = true
    gGame.createMap.userBoard = initUserMap()
    gGame.createMap.minesRemain = gLevel.MINES
    document.querySelector('.hints').innerHTML = `<p>Click cells to place mines</p>`
    document.querySelector('.hints').classList.add('center-p')
    renderFace()
}

function initUserMap(){
    gNextId = 0
    var board = [];
    for(var i = 0 ; i < gLevel.SIZE ; i++){
        board[i] = []
        for(var j = 0 ; j < gLevel.SIZE ; j++){
            board[i][j] = createCell()
        }
    }
    return board
}


function createMine(elCell, i, j){
    elCell.classList.remove('isShown-false')
    elCell.classList.add('isMine-true')
    gGame.createMap.userBoard[i][j].isMine = !gGame.createMap.userBoard[i][j].isMine
    gGame.createMap.userBoard[i][j].isMine ? gGame.createMap.minesRemain-- : gGame.createMap.minesRemain++
    document.querySelector('.hints').innerHTML = `<p>Mines left to place: ${gGame.createMap.minesRemain}</p>`
    if (gGame.createMap.minesRemain === 0){
        document.querySelector('.hints').innerHTML = `<p>Good Luck!!</p>`
        
        setTimeout(function(){
            resetHints()
            resetBulbs()
            gGame.createMap.isCreateMode = false
            resetFace()
            gBoard = gGame.createMap.userBoard
            setMinesNegsCount(gBoard)
            renderBoard(gBoard)
            gGame.isOn = true
            gGame.firstClick = false
            startTimer()
        },1000)
        
    }
}