import {onSnake, expandSnake} from './snake.js'
import {randomGridPosition} from './grid.js'

let food = getRandomPosition()
const expansion_rate = 1

export function update() {
    if(onSnake(food)){
        expandSnake(expansion_rate)
        food = getRandomPosition()
    }
}

export function draw(game_board) {
        const food_element = document.createElement('div')
        food_element.style.gridRowStart = food.y
        food_element.style.gridColumnStart = food.x
        food_element.classList.add('food')
        game_board.appendChild(food_element)
}

function getRandomPosition(){
    let food_position
    while (food_position == null || onSnake(food_position)){
        food_position = randomGridPosition()
    }
    return food_position
}