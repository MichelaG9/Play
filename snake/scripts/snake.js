import { getInputDirection } from "./input.js"

export const snake_speed = 5
const snake_body = [{x: 11, y: 11}]
let new_segment = 0

export function update() {

    addSegments()

    const inputDirection = getInputDirection()

    for(let i = snake_body.length -2; i >= 0; i--){
        snake_body[i + 1] = {...snake_body[i]}
    }

    snake_body[0].x += inputDirection.x
    snake_body[0].y += inputDirection.y

}

export function draw(game_board) {
    snake_body.forEach(segment => {
        const snake_brick = document.createElement('div')
        snake_brick.style.gridRowStart = segment.y
        snake_brick.style.gridColumnStart = segment.x
        snake_brick.classList.add('snake')
        game_board.appendChild(snake_brick)
    })
}

export function expandSnake(amount){
    new_segment += amount
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snake_body.some((segment, index) => {
        if(ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getHead(){
    return snake_body[0]
}

export function snakeIntersection(){
    return onSnake(snake_body[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
    for(let i = 0; i < new_segment; i++){
        snake_body.push({...snake_body[snake_body.length - 1]})
    }

    new_segment = 0
}