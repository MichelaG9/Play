const game_board = document.querySelector('#game-board');
const body = document.querySelector('body');
const button_right = document.querySelector('#right');
const button_left = document.querySelector('#left');
const space_bar = document.querySelector('#space-bar');
let lastRenderTime = 0;

let player = {x: 7, y: 12}
let player_icon;
let shoot_icon = {x: 0, y: 0}
let aliens_array = [];

function draw(){
        player_icon = document.createElement('div');
        player_icon.classList.add('player');
        player_icon.setAttribute('data-key', `s-${player.x}-${player.y}`);
        player_icon.style.gridRowStart = player.y;
        player_icon.style.gridColumnStart = player.x;
        game_board.appendChild(player_icon);
}

draw()

function draw_aliens(){
    for(let n = 1; n < 4; n++){
        for(let i = 1; i < 13; i++){
            const alien_icon = document.createElement('img');
            alien_icon.setAttribute('src', 'alien.jpg');
            alien_icon.classList.add('alien');
            alien_icon.setAttribute('id', `b-${i}-${n}`);
            alien_icon.style.gridRowStart = n;
            alien_icon.style.gridColumnStart = i;
            game_board.appendChild(alien_icon);
        }
    }
    const aliens = document.querySelectorAll('.alien');
    aliens_array = Array.from(aliens);
}

draw_aliens()

function winner(result){
    const winner_window = document.createElement('div')
    winner_window.classList.add('winner');
    if(result == 'win'){
        winner_window.innerHTML = "YOU WIN";
    }
    else if(result == 'loser'){
        winner_window.innerHTML = "YOU LOSE";
    }

    body.appendChild(winner_window);

    let restart = document.createElement('button');
    restart.classList.add('btn');
    restart.classList.add('btn-light');
    restart.classList.add('mt-5');
    restart.setAttribute('type', 'button');
    restart.innerText = 'Restart';
    winner_window.appendChild(restart);

    restart.addEventListener('click', () => {
        window.location.reload(false);
    })
}

function collision(a, b){
    for(let i = 0; i < b.length; i++){
        if(a == b[i].id ){
            const alien_dead = document.querySelector(`#${b[i].id}`)
            undraw(alien_dead)
            aliens_array.splice(i,1)
            if(aliens_array.length == 0){
                let result = 'win';
                clearInterval(int)
                undraw(game_board)
                winner(result)
            }
            return true
        }
    }

    return false
}

function undraw(remove){
    remove.remove()
}

function shoot(x , y){
    const shoot_draw = document.createElement('div');
    shoot_draw.style.gridRowStart = y;
    shoot_draw.style.gridColumnStart = x;
    shoot_draw.classList.add('shoot');
    shoot_draw.setAttribute('id', `a${y}`);
    shoot_draw.setAttribute('data-key', `b-${x}-${y}`);
    game_board.appendChild(shoot_draw);
}

function shoot_move(x, y){
    let shoot_pos = document.querySelector(`#a${y}`);
    if(y > 0){
        if(collision(shoot_pos.dataset.key, aliens_array)){
            undraw(shoot_pos)
            return
        }
        else{
            setTimeout(function(){
                undraw(shoot_pos)
                y--
                shoot(x, y)
                shoot_move(x, y)
            }, 100)
        }
    }
    else{
        undraw(shoot_pos)
        return
    }

}

function alien_shoot(x = Math.floor(Math.random() * (12 - 1) + 1), y = 1){
    const draw_shoot = document.createElement('div');
    draw_shoot.style.gridRowStart = y;
    draw_shoot.style.gridColumnStart = x;
    draw_shoot.classList.add('alien-shoot');
    draw_shoot.setAttribute('id', `s${y}`);
    draw_shoot.setAttribute('data-key', `s-${x}-${y}`);
    game_board.appendChild(draw_shoot);
    enemy_move(x, y)
}

function enemy_move(x, y){
    let shoot_pos = document.querySelector(`#s${y}`);
    if(y < 13){
        if(shoot_pos.dataset.key == player_icon.dataset.key){
            let result = 'loser';
            clearInterval(int)
            undraw(game_board)
            winner(result)
            return
        }
        else{
            t = setTimeout(function(){
                undraw(shoot_pos)
                y++
                alien_shoot(x, y)
            }, 100)
        }
    }
    else{
        undraw(shoot_pos)
        return
    }
}

int = setInterval(alien_shoot, 3000)

function right(){
    const player_pos = document.querySelector('.player');
    player.x++;
        if(player.x > 12){
            player.x--;
        }
        else{
            undraw(player_pos)
            draw()
        }
}

function left(){
    const player_pos = document.querySelector('.player');
    player.x--;
        if(player.x < 1){
            player.x++;
        }
        else{
            undraw(player_pos)
            draw()
        }
}

function space(){
    let existing_shoot = document.querySelector(`#a${player.y - 1}`)
        if(existing_shoot){
            return
        }
        shoot_icon.x = player.x;
        shoot_icon.y = player.y - 1;

        shoot(shoot_icon.x, shoot_icon.y)
        shoot_move(shoot_icon.x, shoot_icon.y)
}

document.addEventListener('keydown', (e) => {
    if(e.keyCode == 39){
        right()
    }
    else if(e.keyCode == 37){
        left()
    }
    else if(e.keyCode == 32){
        space()
    }

})

button_left.addEventListener('click', () => left())
button_right.addEventListener('click', () => right())
space_bar.addEventListener('click', () => space())
