import { snake_speed, update as updateSnake, draw as drawSnake, getHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let last_render = 0
let game_over = false
const game_board = document.getElementById('game-board')

function main(currTime) {

    if(game_over){
        if(confirm('Game Over. Press ok to restart')){
            window.location.reload(false)
        }
        return
    }

    window.requestAnimationFrame(main)
    const render_loop = (currTime - last_render) / 1000
    if (render_loop < 1 / snake_speed) return
    last_render = currTime

    update()
    draw()

}

window.requestAnimationFrame(main)



function update() {
    updateSnake()
    updateFood()
    youLose()
}

function draw() {
    game_board.innerHTML = ''
    drawSnake(game_board)
    drawFood(game_board)
}

function youLose(){
    game_over = outsideGrid(getHead()) || snakeIntersection()
}