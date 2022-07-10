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
        let tempP = document.createElement('p');
        let tempText = document.createTextNode(myArray[myArray.length-1].mark);
        tempP.appendChild(tempText);
        tempDivDataSet.append(tempP);
        //tempDivDataSet.appendChild(tempText);
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

        const allOmap = allO.map(e=>{
                return e.gridBlock;
        }) //get all o in the objects

        console.log(`Omap: ${allOmap} Xmap: ${allXmap}`)
        for(let i=0; i<tempPossibleWinnersCoord.length; i++){
            let ctrX = 0;
            let ctrO = 0;
            for(let j=0; j<tempPossibleWinnersCoord[1].length; j++){
                if(allXmap.includes((tempPossibleWinnersCoord[i][j]).toString())){//still entered even though its false
                    ctrX++;
                }else if(allOmap.includes((tempPossibleWinnersCoord[i][j]).toString())){
                    ctrO++;
                }
            }
            console.log(`ctrlX = ${ctrX} ${ctrO}`) //its always ctrX = 3 and ctrY = 3 even though the condition above is false
            if(ctrX >=3 || ctrO >=3){
                if(ctrX >=3)
                    return 'Winner X';
                else
                    return 'Winner O';
            }

        }

        return "NO WINNER";
    }
    return {winner};
})();

function toRestart(){
    let toShow = document.querySelector('.toShow');
        toShow.style.display = "none";
        toShow.textContent = "";
        let toHide = document.querySelector('.toHide');
        toHide.style.display = "block";
        myArray = [];
        myPlayers = [];
        filledGridBlockx = [];
        let gridContent = document.querySelector('.grid-content');
        if(gridContent.hasChildNodes()){
            while(gridContent.firstChild){
                gridContent.removeChild(gridContent.firstChild)
            }
        }
        gameBoard.displayGameBoard();
}

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
            let returnWinner = winnerCheck.winner();
                console.log('The return ' + returnWinner);
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
    }
}

document.addEventListener('click', element => {
    
    if(element.target.classList.value==='gameBoardContainer' && myPlayers.length!=0){
            gameLogic(element.target.dataset.indexN, element);
            if(myArray.length==9)
                alert('NO WINNERS ITS A TIE MGA TANga!');
    }else if(element.target.id === 'X' || element.target.id === 'O'){
        //check the display if none, if not then proceed to block
        const toShow = document.querySelector(".toShow")
        if(window.getComputedStyle(toShow).display != 'block'){
            const tempP = document.createElement('p')
            const toHide = document.querySelector('.toHide');
            toHide.style.display = "none";
            tempP.textContent = `YOU ARE PLAYER : ${element.target.id.toUpperCase()}`;
            toShow.append(tempP);
            toShow.style.display = "block";
            console.log(myPlayers);
            assignPlayers(element.target.id.toUpperCase());
            console.log(myPlayers);
        }
    }else if(element.target.classList.value === 'gameBoardContainer' && myPlayers.length===0){
        let modalContainer = document.querySelector('.modal-container');
        modalContainer.style.display = "flex";
        let okayButton = document.querySelector('.ok-button');
        let closeButton = document.querySelector('.close-button');

        okayButton.addEventListener('click',()=>{
            modalContainer.style.display = "none";
        });
        closeButton.addEventListener('click',()=>{
            modalContainer.style.display = "none";
        });

        okayButton.addEventListener('mouseover',()=>{
            okayButton.style.backgroundColor = "rgb(29, 51, 117)";
        });
        closeButton.addEventListener('mouseover',()=>{
            closeButton.style.backgroundColor = "rgb(69, 65, 65)";
        });

        okayButton.addEventListener('mouseleave',()=>{
            okayButton.style.backgroundColor = "royalblue";
        });
        closeButton.addEventListener('mouseleave',()=>{
            closeButton.style.backgroundColor = "#eee";
        });

    }else if(element.target.id === 'gameRestart'){
        toRestart();
    }
})

//start
gameBoard.displayGameBoard();