const boxes = document.querySelectorAll(".box");
const gameinfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

// creating a fn to initialise the game
function initGame(){
    currentPlayer ="X";
    gameGrid = ["","","","","","","","",""];

    //UI pr empty krna pdega boxex ko
    boxes.forEach((box, index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        // remove green colour... initialise box with css properties again
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameinfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

function swapTurn()
{
    if(currentPlayer=="X")
    {
        currentPlayer ="O";
    }
    else{
        currentPlayer ="X";
    }
    //UI update
    gameinfo.innerText = `Current Player - ${currentPlayer}`;

}

function checkGameOver()
{
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") 
        && gameGrid[position[0]] == gameGrid[position[1]] 
        && gameGrid[position[1]] == gameGrid[position[2]] )
        {
            //check whether winner is X
            if(gameGrid[position[0]]==="X")
            {
                answer = "X";
            }
            else answer = "O";

            //now we know X/O is winner

            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    
    if(answer!==""){
        gameinfo.innerText = ` Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // tie match
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!=="")
        fillCount++;
    });
    if(fillCount===9){
        gameinfo.innerText = ` Game Tied.!`;
        newGameBtn.classList.add("active");
    }
    // newGameBtn.classList.add("active");
}



function handleClick(index){
    if(gameGrid[index]=== ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap the turn
        swapTurn();
        // check koi jeet toh nhi gya
        checkGameOver();
    }
}

boxes.forEach(
    (box,index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
    })


newGameBtn.addEventListener("click",initGame);

