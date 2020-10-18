let inputDirection = {x: 0, y: 0}
let lastInputDirection = {x: 0, y: 0}
const up = document.querySelector('#up');
const down = document.querySelector('#down');
const left = document.querySelector('#left');
const right = document.querySelector('#right');

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if(lastInputDirection.y !==0) break
            inputDirection = {x: 0, y: -1}
            break
        case 'ArrowDown':
            if(lastInputDirection.y !==0) break
            inputDirection = {x: 0, y: 1}
            break
        case 'ArrowRight':
            if(lastInputDirection.x !==0) break
            inputDirection = {x: 1, y: 0}
            break
        case 'ArrowLeft':
            if(lastInputDirection.x !==0) break
            inputDirection = {x: -1, y: 0}
            break
    }
})

up.addEventListener('click', () => {
    if(lastInputDirection.y !==0){
        return
    }
    else{
        inputDirection = {x: 0, y: -1}
    }
})

down.addEventListener('click', () => {
    if(lastInputDirection.y !==0){
        return
    }
    else{
        inputDirection = {x: 0, y: 1}
    }
})

left.addEventListener('click', () => {
    if(lastInputDirection.x !==0){
        return
    }
    else{
        inputDirection = {x: -1, y: 0}
    }
})

right.addEventListener('click', () => {
    if(lastInputDirection.x !==0){
        return
    }
    else{
        inputDirection = {x: 1, y: 0}
    }
})


export function getInputDirection(){
    lastInputDirection = inputDirection
    return inputDirection
}