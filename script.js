let myArray = [];
let myPlayers = [];
let filledGridBlockx = [];
let tempPossibleWinnersCoord = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//Note: Rule of Thumb: use module = (()=>{})() if only need one, then
//factory = ()=>{} if need multiple times

const gameBoard = (() => {
    const displayGameBoard = () => {
        const gridContent = document.querySelector('.grid-content');
        for(let i=0; i<9; i++){
            let tempDiv = document.createElement('div');
            tempDiv.classList.add('gameBoardContainer');
            tempDiv.dataset.indexN = i;
            gridContent.append(tempDiv);
        }
    }
    return {displayGameBoard};
 })();

const displayXandO = (() => {
    const displayX = (element) => {
        let tempDivDataSet = document.querySelector(`[data-index-n="${element}"]`);
        let tempText = document.createTextNode(myArray[myArray.length-1].mark);
        tempDivDataSet.appendChild(tempText);
    }

    return {displayX};
})();

const players = (player, mark) => {
    return {player, mark};
}

const myArrayObj = (player, mark, gridBlock) => {
    return{player, mark, gridBlock};
}

const gridFilled = (() => {
    const okFilled = (gridCellBlock, mark) => {
        const tempDiv = document.querySelector(`[data-index-n="${gridCellBlock}"]`);
        tempDiv.classList.toggle('okFilled');
        tempDiv.dataset.mark = mark;
    }

    return {okFilled};
})();
    
const winnerCheck = (() => {
    const winner = () => {

        const allX = myArray.filter(e=>{
                if(e.mark==='X')
                    return e;//parseInt(e.gridBlock);
        }) //get objects that has X

        const allXmap = allX.map(e=>{
                return e.gridBlock;
        }) //get all x in the objects

        const allO = myArray.filter(e=>{
                if(e.mark==='O')
                    return e;//parseInt(e.gridBlock);
        }) //get objects that has O

        const allOmap = allX.map(e=>{
                return e.gridBlock;
        }) //get all o in the objects

        for(let i=0; i<tempPossibleWinnersCoord.length; i++){
            let ctrX = 0;
            let ctrO = 0;
            for(let j=0; j<tempPossibleWinnersCoord[1].length; j++){
                if(allXmap.includes((tempPossibleWinnersCoord[i][j])).toString())
                    ctrX++;
                if(allOmap.includes((tempPossibleWinnersCoord[i][j])).toString())
                    ctrO++;
            }
            if(ctrX >=3 || ctrO >=3){
                if(ctrX >=3)
                    return 'Winner X';
                else
                    return 'Winner Y'
            }

        }

        return "NO WINNER"
    }
    return {winner};
})();

function assignPlayers(mark){
    if(mark === 'X'){
        const playersAssign1 = players('player1', mark);
        const playersAssign2 = players('player2', "O");
        myPlayers.push(playersAssign1);
        myPlayers.push(playersAssign2);
    }else{
        const playersAssign1 = players('player1', mark);
        const playersAssign2 = players('player2', "X");
        myPlayers.push(playersAssign1);
        myPlayers.push(playersAssign2);
    }
}

function gameLogic(gridBlock, elementX){
    //console.log(myArray.hasOwnProperty('content'));
    if(myArray.length != 9){
        if(myArray.length === 0){
            const temp = myArrayObj(myPlayers[0].player, myPlayers[0].mark, gridBlock);
            myArray.push(temp);
            //add a function that tells the computer its filled
            gridFilled.okFilled(parseInt(gridBlock), myPlayers[0].mark);
            //show the mark on gameBoard
            displayXandO.displayX(parseInt(gridBlock));
            //push to array the grid cell
            filledGridBlockx.push(parseInt(gridBlock));
        }else{
            //check the past array mark
            if(myArray[myArray.length-1].mark === myPlayers[0].mark && !(elementX.target.classList.contains('okFilled'))){
                const temp = myArrayObj(myPlayers[1].player, myPlayers[1].mark, gridBlock);
                myArray.push(temp);
                //add a function that tells the computer its filled
                gridFilled.okFilled(parseInt(gridBlock), myPlayers[1].mark);
                //show the mark on gameBoard
                displayXandO.displayX(parseInt(gridBlock));
                //push to array the grid cell
                filledGridBlockx.push(parseInt(gridBlock));
                //check now if grid block is filled with winners
                let returnWinner = winnerCheck.winner();
                console.log('The return ' + returnWinner);
                if(returnWinner >= 0){
                    console.log(myArray.filter((element)=>{
                        console.log(typeof(element.gridBlock) + typeof(returnWinner));
                        element.gridBlock===returnWinner
                }));
                }
            }else if(myArray[myArray.length-1].mark === myPlayers[1].mark && !(elementX.target.classList.contains('okFilled'))){
                const temp = myArrayObj(myPlayers[0].player, myPlayers[0].mark, gridBlock);
                myArray.push(temp);
                //add a function that tells the computer its filled
                gridFilled.okFilled(parseInt(gridBlock), myPlayers[0].mark);
                //show the mark on gameBoard
                displayXandO.displayX(parseInt(gridBlock));
                //push to array the grid cell
                filledGridBlockx.push(parseInt(gridBlock));
                //check now if grid block is filled with winners
                let returnWinner = winnerCheck.winner();
                console.log('The return ' + returnWinner);
                if(returnWinner >= 0){
                    console.log(myArray.filter((element)=>{
                        console.log(typeof(element.gridBlock) + typeof(returnWinner));
                        element.gridBlock===returnWinner
                }));
                }
            }
        }
    }//else{
        //array is 9 already
    //}
    // if(myArray[1].hasOwnProperty('content') === false){

    // }
}

document.addEventListener('click', element => {
    if(element.target.classList.value==='gameBoardContainer' && myPlayers.length!=0){
        gameLogic(element.target.dataset.indexN, element);
    }else if(element.target.id === 'X' || element.target.id === 'O'){
        console.log(window.getComputedStyle(element.target).display)
        //check the display if none, if not then proceed to block
        const toShow = document.querySelector(".toShow")
        if(window.getComputedStyle(toShow).display != 'block'){
            const tempP = document.createElement('p')
            tempP.textContent = `YOU ARE ${element.target.id.toUpperCase()}`;
            toShow.append(tempP);
            toShow.style.display = "block";
            console.log(myPlayers);
            assignPlayers(element.target.id.toUpperCase());
            console.log(myPlayers);
        }
    }else if(element.target.classList.value === 'gameBoardContainer' && myPlayers.length===0){
        alert("PLEASE CHOOSE X or O");
    }
})

//start
gameBoard.displayGameBoard();