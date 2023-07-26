
// start game 

let start = document.querySelector(".splash-screen span")
start.onclick = function () {
    let playerName = prompt("Enter Your Name")
    let userName = document.querySelector(".info .name")
    if (playerName === "") {
        userName.innerHTML = "Unknown"
    }
    else {
        userName.innerHTML = playerName
    }
    document.querySelector(".splash-screen").remove()
    timing()
    randomOrder()
    document.querySelector(".start-game").play()
}
// blocks 

let blocks = document.querySelector(".memory-game-blocks").children
let blocksOfArrary = Array.from(blocks)
let timeCount = document.querySelector(".time")
let btncontinueGame = document.querySelector(".continue span")
let duration=1000
let t = new Date()
let s =59
let m=0
let  tim=0


//  timing 
function timing() {
    startTime()
    tim = setInterval(myTime, 1000)  
}
function myTime() {
  
    t.setMinutes(m, s)
    timeCount.innerHTML = `${t.getMinutes()}:${t.getSeconds()}`
    s--
    if (t.getMinutes() === 0 && t.getSeconds() === 0) {
        clearInterval(tim)
        startTime()
        looseGame(blocksOfArrary)
    }
}

function startTime(){

    timeCount.innerHTML = `1:00`
}





// click on block


blocksOfArrary.forEach(block => {
    let myBlock = block.children[0]

    myBlock.onclick = function () {

        myBlock.classList.add("is-flipped")

        blocksOfFilepped(blocksOfArrary)
    }

});

//  check from two block 

function blocksOfFilepped(blocksOfArrary) {
    let BlockFilepped = blocksOfArrary.filter(function (block) {
        let myBlock = block.children[0]
        return myBlock.classList.contains("is-flipped")
    })
    if (BlockFilepped.length === 2) {
        addPeNone(document.querySelector(".memory-game-blocks"))

        // matched two blocks 
        matchOrNo(BlockFilepped[0].children[0], BlockFilepped[1].children[0])

        //    congratulation message
        congratulation(blocksOfArrary)
    }
}

// matched two blocks 
function matchOrNo(firstBlock, secondBlock) {
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        removeIsFlipped(firstBlock, secondBlock)
        addHasMatched(firstBlock, secondBlock)
        addPeNone(firstBlock)
        addPeNone(secondBlock)
        document.querySelector(".success").play()

        setTimeout(function () {
            removePeNone(document.querySelector(".memory-game-blocks"))
        }, duration)

    } else {
        document.querySelector(".tries").innerHTML = parseInt(document.querySelector(".tries").innerHTML) + 1
        document.querySelector(".fail").play()

        setTimeout(function () {
            removeIsFlipped(firstBlock, secondBlock)

            removePeNone(document.querySelector(".memory-game-blocks"))
        }, duration)
    }

}


// remove class is flipped 
function removeIsFlipped(firstBlock, secondBlock) {

    firstBlock.classList.remove("is-flipped")
    secondBlock.classList.remove("is-flipped")
}

// add claa has matched 
function addHasMatched(firstBlock, secondBlock) {

    firstBlock.classList.add("has-matched")
    secondBlock.classList.add("has-matched")


}

// remove class pe-none 
function removePeNone(element) {
    element.classList.remove("pe-none")

}
// add class pe-none 
function addPeNone(element) {
    element.classList.add("pe-none")

}

// remve class d-none 
function removeDNone(element){
    element.classList.remove("d-none")

}

// cogratulation 
function congratulation() {
    document.querySelector(".continue").firstChild.nodeValue = "Congratulation"
    if (checkBlocks()) {
        clearInterval(tim)
        startTime()
        setTimeout(function () {
            removeDNone(document.querySelector(".continue"))

        }, 1000)
    document.querySelector(".congratulation").play()

        countinueGame()
    }



}

// loose game 
function looseGame() {
    addPeNone(document.querySelector(".memory-game-blocks"))

    document.querySelector(".continue").firstChild.nodeValue = "Game Over"
    document.querySelector(".continue").classList.add("text-bg-danger")
    setTimeout(function () {
        removeDNone(document.querySelector(".continue"))
    }, 1000)
    document.querySelector(".game-over").play()

    countinueGame()

}

// check blocks has class has matched 

function checkBlocks() {
    let Blockmatched = blocksOfArrary.filter(function (block) {
        let myBlock = block.children[0]
        return myBlock.classList.contains("has-matched")
    })
    return Blockmatched.length === blocks.length
}

// on click on button continue 
function countinueGame() {
    btncontinueGame.onclick = function () { 
        blocksOfArrary.forEach(function (block) {
            block.children[0].classList.remove("has-matched")
            block.children[0].classList.remove("pe-none")
        })
        document.querySelector(".continue").classList.add("d-none")
        document.querySelector(".tries").innerHTML = 0
        s=59
        m=0
        startTime()
        timing()
    randomOrder()

    }
}


// random order 
function randomOrder(){
    for(let i=0;i<blocksOfArrary.length;i++){
    blocksOfArrary[i].style.order=Math.floor(Math.random()*blocksOfArrary.length)
    }
    
}
