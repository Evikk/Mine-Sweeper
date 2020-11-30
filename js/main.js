'use strict'

var gBoard = []
var gNextId = 0
var gHealth = 3

var gLevel = {
    SIZE: 4,
    MINES: null
}

var gGame = {
    firstClick: true,
    safeCell: null,
    isHintMode: false,
    hintsUsed : 3,
    currLevel: 'beginner',
    isOn : true,
    shownCount: 0,
    minesMarked: 0,
    secsPassed: 0,
    finalScore: 0,
    safeClicks: 3,
    bulbId: null,
    createMap: { 
        isCreateMode: false,
        minesRemain: null,
        userBoard: []
    },
    boardCopies: []
}

function setLevel() {
    switch (gGame.currLevel) {
        case 'beginner':
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break;
        case 'medium':
            gLevel.SIZE = 8
            gLevel.MINES = 12
            break;
        case 'expert':
            gLevel.SIZE = 12
            gLevel.MINES = 30
            break;

        default:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            break;
    }
}

// initials game from scratch
function initGame(){
    resetGameStats()
    setLevel()
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.isOn = true

}

// game starts after user click cell for the first time
function startGame(){
    gBoard = buildBoard()
    renderBoard(gBoard)
    placeMines()
    setMinesNegsCount(gBoard)
    openNegs(gBoard, gGame.safeCell.i, gGame.safeCell.j)
    renderBoard(gBoard)
    startTimer()
}

