'use strict'

function buildBoard() {
    gNextId = 0
    var board = [];
    for(var i = 0 ; i < gLevel.SIZE ; i++){
        board[i] = []
        for(var j = 0 ; j < gLevel.SIZE ; j++){
            board[i][j] = createCell()
        }
    }
    if (gGame.safeCell !== null){
        board[gGame.safeCell.i][gGame.safeCell.j].isShown = true
    }
    return board
}

function renderBoard(board) {
    gNextId = 0
    var strHTML = '<table class="game-table" oncontextmenu="return false;"><tbody>';
    for (var i = 0; i < board.length; i++) {
      strHTML += '<tr>'
      for (var j = 0; j < board.length; j++) {
        var cell = board[i][j]
        var className = `cell ${gGame.currLevel} isMine-${cell.isMine} isShown-${cell.isShown}`
        strHTML += `<td class="${className}" id="${gNextId++}" data="${i},${j}" onmousedown="cellClicked(this,event)"></td>`
      }
      strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    var elGameContainer = document.querySelector('.game-container')
    elGameContainer.innerHTML = strHTML
    addNumsInOpenCells(board)
  }
  
function placeMines(){
    var cells = getNegsIds(gGame.safeCell.i, gGame.safeCell.j)
    var isSafe = true
    var count = 0
    while (count < gLevel.MINES){
        isSafe = true
        var randCell = gBoard[getRandomInt(0, gLevel.SIZE-1)][getRandomInt(0, gLevel.SIZE-1)]
        for (var i = 0; i < cells.length; i++){
            if (randCell.id === cells[i]) isSafe = false
        }
        if (!randCell.isMine && isSafe){
            randCell.isMine = true
            count++
        }
    }
}

