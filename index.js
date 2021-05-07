let lastPaintTime = 0;
let a = 1;
let b = 19;
let score = 0;
let speed = 10;
let currentDirection = {x:0,y:0};
let villan = {x:19,y:Math.round(8 + (19 - 8) * Math.random())};
let coin = {x : 16, y:Math.round(8 + (19 - 8) * Math.random())};
let mario = {x:19,y:5}
let jumpIndex = 3;
let marioJumpStatus = 0;
let marioJumpIntervalId = null;
let coinHideIntervalId = null;
let brickArray = [

    {x:20,y:0},
    {x:20,y:1},
    {x:20,y:2},
    {x:20,y:3},
    {x:20,y:5},
    {x:20,y:6},
    {x:20,y:7},
    {x:20,y:8},
    {x:20,y:9},
    {x:20,y:10},
    {x:20,y:11},
    {x:20,y:12},
    {x:20,y:13},
    {x:20,y:14},
    {x:20,y:15},
    {x:20,y:16},
    {x:20,y:17},
    {x:20,y:18},
    {x:20,y:19},
    {x:20,y:20}
]


createBoard = (board) =>{
    var hurdleIndex = (Math.round(a + ( b - a ) * Math.random()));
    brickArray.forEach((element, index) => {
        var htmlElement = document.createElement('div');
        htmlElement.style.gridRowStart = element.x;
        htmlElement.style.gridColumnStart= element.y;
        htmlElement.classList.add('brickBody');
        board.appendChild(htmlElement);
    });

    var htmlElement = document.createElement('div');
    htmlElement.style.gridRowStart = villan.x;
    htmlElement.style.gridColumnStart= villan.y;
    htmlElement.classList.add('villan');
    board.appendChild(htmlElement);

    htmlElement = document.createElement('div');
    htmlElement.style.gridRowStart = mario.x;
    htmlElement.style.gridColumnStart= mario.y;
    htmlElement.classList.add('mario');
    board.appendChild(htmlElement);

    htmlElement = document.createElement('div');
    htmlElement.style.gridRowStart = coin.x;
    htmlElement.style.gridColumnStart= coin.y;
    htmlElement.classList.add('coin');
    board.appendChild(htmlElement);


}

jump = () =>{
    
    //up
    if(marioJumpStatus == 1){
        mario.x -= jumpIndex;
        marioJumpStatus++;
        if(marioJumpIntervalId == null){
            marioJumpIntervalId = setInterval(function(){ mario.x += jumpIndex;
                marioJumpStatus++; clearInterval(marioJumpIntervalId); marioJumpIntervalId = null}, 500);
        }
    }

}

getBoard = () =>{
    let board = document.getElementById('gameboard');
    board.innerHTML="";
    return board;
}

updateBoard = () => {
    //udpate the land
    for(var i = brickArray.length - 2 ; i >=0 ; i--){
        brickArray[i+1] = {...brickArray[i]};
    }
    brickArray[0].y += -1;
    if(brickArray[0].y < 0){
        brickArray[0].y = 20;
    }

    //udpate the villan
    villan.y += -1;
    if(villan.y < 0){
        villan.y = 20;
    }

    //coin
    coin.y += -1;
    if(coin.y < 0){
        coin.y = 20;
    }

    jump();
}


hasCollisionHappened = () => {
    if(mario.x == villan.x && mario.y == villan.y){
        return true;
    }
    return false;
}

updateScore = () =>{
    if(mario.x == coin.x && mario.y == coin.y){
        score++;
        coin.y = 0;
        if(coinHideIntervalId == null){
            coinHideIntervalId = setInterval(function(){ 
                coin.y = 19;
                clearInterval(coinHideIntervalId); coinHideIntervalId = null}, 2500);
        }
    }
}

refreshBoard = () => {
    if(hasCollisionHappened()){
        alert('Game Over! Your score is '+score+'.\nLet\'s Play again.');
        score=0;
        villan = {x:19,y:Math.round(8 + (19 - 8) * Math.random())};
        coin = {x : 16, y:Math.round(8 + (19 - 8) * Math.random())};
    }
    //collect coin
    updateScore();
    //else update snake
    updateBoard();
    //clear board
    var board = getBoard();
    //place Snake
    createBoard(board);
}

renderGame = (curentTime) =>{
    window.requestAnimationFrame(renderGame);
    if((curentTime - lastPaintTime) /1000 < (1 / speed)){
        return;
    }
    lastPaintTime = curentTime;
    refreshBoard();
    return;
}


window.requestAnimationFrame(renderGame);

window.addEventListener('keydown', e =>{
    console.log(e);
    switch (e.code) {
        case "Space":
            if(marioJumpStatus == 0 || marioJumpStatus > 2);{
                marioJumpStatus = 1;
                jump();
            }
            break;
        default:
            break;
    }

});



document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                                                                                    
    }else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            if(marioJumpStatus == 0 || marioJumpStatus > 2);{
                marioJumpStatus = 1;
                jump();
            }
        } 
    }  
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
