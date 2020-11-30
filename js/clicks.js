'use strict'

function cellClicked(elCell, ev){
    if (!gGame.createMap.isCreateMode){
        gGame.boardCopies.push(copyBoard(gBoard))
    }
    var coords = elCell.getAttribute('data').split(',')
    var iCoord = coords[0]
    var jCoord = coords[1]
    var clickedCell = gBoard[iCoord][jCoord]

    if (gGame.createMap.isCreateMode){
        createMine(elCell, iCoord, jCoord)
    }
    else if (!gGame.createMap.isCreateMode){
    // If game is not active, create mode or cell is open do nothing
        if (!gGame.isOn || clickedCell.isShown) return


    // If user clicks mouse right-click
        if (ev.button === 2){
            
            // handle cell marking on
            if (!clickedCell.isShown && !gGame.firstClick && !clickedCell.isMarked){
                cellMarked(elCell, iCoord, jCoord)

            }
            
        }
    // If user clicks mouse left-click
        else if (ev.button === 0){

            if (gGame.firstClick){       
                gGame.safeCell = {i: Number(iCoord), j: Number(jCoord), el: elCell}
                gGame.firstClick = false
                gGame.shownCount++
                startGame()
            }
    // Check if hint mode
            else if (gGame.isHintMode){
                var cells = getNegsIds(iCoord, jCoord)
                showHint(cells)
            }

            else if (!gGame.firstClick && !clickedCell.isShown && clickedCell.isMarked) return

            
            else if (!gGame.isHintMode){

                // reveal cell content
                clickedCell.isShown = true

                // handle mine hit and lives
                if (clickedCell.isMine) {
                    gHealth--
                    document.querySelector('.health-num').innerText = gHealth
                    if (gHealth === 0) {
                        elCell.style.backgroundImage = `url(img/mine-red.png)`
                        loseGame()
                    }
                    renderFace()
                }
                
                // If mines around - give cell number of mines around
                else if (clickedCell.isShown && !clickedCell.isMine && clickedCell.minesAroundCount > 0){
                    elCell.innerText = clickedCell.minesAroundCount  
                }  

                // If no mines around - open neighbours recursively
                else if (clickedCell.isShown && !clickedCell.isMine && clickedCell.minesAroundCount === 0){
                    elCell.innerText = ''
                    openNegs(gBoard, Number(iCoord), Number(jCoord))
                    addNumsInOpenCells(gBoard)
                }

                // Update model
                gGame.shownCount++

                // Update UI
                elCell.classList.toggle('isShown-false')

            }
        }
        checkGameOver()
    }
}

function showHint(cells){
    for (var i = 0; i < cells.length; i++){
        var elCell = document.getElementById(cells[i])
        if (elCell.classList.contains('isShown-false')){
            elCell.classList.toggle('isShown-hint')
            elCell.classList.toggle('isShown-false')
        }
    }
    setTimeout(function(){
        for ( i = 0; i < cells.length; i++){
            var elCell = document.getElementById(cells[i])
            var currCoords = elCell.getAttribute('data').split(',')
            var ic = currCoords[0]
            var jc = currCoords[1]
            if (!gBoard[ic][jc].isShown){
                elCell.classList.toggle('isShown-hint')
                elCell.classList.toggle('isShown-false')
            }
            gGame.isHintMode = false
            document.getElementById(`${gGame.bulbId}`).style.display = 'none'
            setTimeout(function(){gGame.bulbId = null},2)
        }
    },1000)
    gGame.hintsUsed--
}

function safeClick(){
    if (!gGame.isOn || gGame.firstClick) return
    var safeCells = []
    for (var i = 0; i < gBoard.length; i++){
        for (var j = 0; j < gBoard.length; j++){
            if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) safeCells.push(gBoard[i][j].id)
        }
    }
    var randCellIdx = getRandomInt(0,safeCells.length-1)
    var cellId = safeCells[randCellIdx]
    document.getElementById(cellId).classList.add('isSafe')
    setTimeout(function(){
        document.getElementById(cellId).classList.remove('isSafe')
    }, 3000)
    gGame.safeClicks--
    if (gGame.safeClicks !== 0) document.querySelector('.safe-btn').innerText = gGame.safeClicks
    else document.querySelector('.safe-btn').remove()
}