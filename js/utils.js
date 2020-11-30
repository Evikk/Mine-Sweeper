'use strict'

function createCell() {
    return {
      minesAroundCount: 0, 
      isShown: false, 
      isMine: false, 
      isMarked: false,
      id: gNextId++
    }
  }
  
function addNumsInOpenCells(board){
    for (var i = 0; i < board.length; i++){
        for (var j = 0; j < board.length; j++){
            if (board[i][j].minesAroundCount > 0 && board[i][j].isShown) {
            var elCell = document.getElementById(gBoard[i][j].id)
            if (!gBoard[i][j].isMine) elCell.innerText = board[i][j].minesAroundCount
            }
        }
    }
}
  
function openNegs(board, rowIdx, colIdx){
    if (board[rowIdx][colIdx].minesAroundCount > 0) return;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board.length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            if (board[i][j].isMine) continue
            if (board[i][j].isShown) continue
            board[i][j].isShown = true
            gGame.shownCount++
            document.getElementById(board[i][j].id).classList.remove('isShown-false')
            openNegs(board, i, j)
        }
    }
}
  
function setMinesNegsCount(board){
    for (var i = 0; i < board.length; i++){
        for (var j = 0; j < board.length; j++){
        var cellNegsCount = getCellNegsCount(board, i, j)
        gBoard[i][j].minesAroundCount = cellNegsCount
        }
    }
}


function getCellNegsCount(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (j < 0 || j > board.length - 1) continue
        if (i === rowIdx && j === colIdx) continue
        if (board[i][j].isMine) count++
        }
    }
    return count
    }

function getNegsIds(rowIdx, colIdx) {
    var safeCells = []
    rowIdx = Number(rowIdx)
    colIdx = Number(colIdx)
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
        if (j < 0 || j > gBoard.length - 1) continue
        safeCells.push(gBoard[i][j].id)
        }
    }
    return safeCells
}


function resetGameStats(){
    document.querySelector('.game-container').innerHTML = ''
    gGame.createMap.isCreateMode = false
    resetFace()
    resetHints()
    resetBulbs()
    gGame.isHintMode = false
    gGame.hintsUsed = 3
    gGame.shownCount = 0
    gGame.minesMarked = 0
    gGame.firstClick = true
    gGame.safeCell = null
    gGame.secsPassed = 0
    gGame.finalScore = 0
    gGame.bulbId = null
    gBoard = []
    gNextId = 0
    gGame.safeClicks = 3
    gGame.boardCopies = []
    document.querySelector('.safe-btn').innerText = gGame.safeClicks
    resetTimer()
}   

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function saveScore(name, score, level){
    var details = { name: name, score: score, level: level };
    var i = 0
    while (localStorage.getItem('game'+i) !== null){
        i++
    }
    localStorage.setItem('game'+i, JSON.stringify(details))
    showHighScore(i+1,level)
}

function copyBoard(board) {
    var copyBoard = [];
    for (var i = 0; i < board.length; i++) {
        copyBoard[i] = [];
        for (var j = 0; j < board.length; j++){     
            copyBoard[i][j] = {
                minesAroundCount: board[i][j].minesAroundCount,
                isShown: board[i][j].isShown,
                isMine : board[i][j].isMine,
                isMarked : board[i][j].isMarked,
                id: board[i][j].id
            }
        }
    }
    return copyBoard;
}

