var myArray = [];
var myPlayers = [];

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
        /*const gridContent = document.querySelector('.grid-content');
        myArray.forEach((element, index) => {
        let tempDiv = document.createElement('div');
        tempDiv.classList.add('gameBoardContainer');
        tempDiv.dataset.indexN = index;
        //let tempText = document.createTextNode(element.content);
        //tempDiv.appendChild(tempText);
        gridContent.append(tempDiv);
     });*/
    }
    return {displayGameBoard};
 })();

const displayXandO = (() => {
    const displayX = (element) => {
        let tempDivDataSet = document.querySelector(`[data-index-n="${element}"]`);
        let tempText = document.createTextNode(myArray[myArray.length-1].mark);
        tempDivDataSet.appendChild(tempText);
        // let tempDivDataSet = document.querySelector(`[data-index-n="${element}"]`);
        // let tempText = document.createTextNode(myArray[1].content);
        // if(tempDivDataSet.classList[1]===undefined){
        //     tempDivDataSet.classList.add('marked'); 
        //     tempDivDataSet.appendChild(tempText)
        //     console.log("Entered: " + element);
        //     console.log(tempDivDataSet.classList[1]);
        // }
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
    console.log(elementX.target.classList.contains('okFilled'));
    if(myArray.length != 9){
        if(myArray.length === 0){
            const temp = myArrayObj(myPlayers[0].player, myPlayers[0].mark, gridBlock);
            myArray.push(temp);
            //add a function that tells the computer its filled
            gridFilled.okFilled(gridBlock, myPlayers[0].mark);
            //show the mark on gameBoard
            displayXandO.displayX(gridBlock); 
        }else{
            //check the past array mark
            if(myArray[myArray.length-1].mark === myPlayers[0].mark && !(elementX.target.classList.contains('okFilled'))){
                const temp = myArrayObj(myPlayers[1].player, myPlayers[1].mark, gridBlock);
                myArray.push(temp);
                //add a function that tells the computer its filled
                gridFilled.okFilled(gridBlock, myPlayers[1].mark);
                //show the mark on gameBoard
                displayXandO.displayX(gridBlock);
                //check now if grid block is filled with winners
            }else if(myArray[myArray.length-1].mark === myPlayers[1].mark && !(elementX.target.classList.contains('okFilled'))){
                const temp = myArrayObj(myPlayers[0].player, myPlayers[0].mark, gridBlock);
                myArray.push(temp);
                //add a function that tells the computer its filled
                gridFilled.okFilled(gridBlock, myPlayers[0].mark);
                //show the mark on gameBoard
                displayXandO.displayX(gridBlock);
            }
        }
    }//else{
        //array is 9 already
    //}
    // if(myArray[1].hasOwnProperty('content') === false){

    // }
    console.log(myArray);
}

document.addEventListener('click', element => {
    if(element.target.classList.value==='gameBoardContainer' && myPlayers.length!=0){
        gameLogic(element.target.dataset.indexN, element);
        //displayXandO.displayX(element.target.dataset.indexN);
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