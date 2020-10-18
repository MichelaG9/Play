const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const grid = document.querySelector('#grid-options');
const options = document.querySelectorAll('.options');
const main = document.querySelector('.main');
const container = document.querySelector('.container');

let user;
let comp;
let comp_choise = document.createElement('div');

options.forEach(opt => {
    choise = document.createElement('div');
    choise.classList.add('fading-element');
    choise.classList.add('d-none');
    choise.innerHTML = opt.innerHTML;
    comp_choise.appendChild(choise);
})

let opt_array = Array.from(comp_choise.children);

function blink(){

    opt_array[0].classList.remove('d-none');
    setTimeout(function(){opt_array[0].classList.add('d-none');} ,300);
    setTimeout(function(){opt_array[1].classList.remove('d-none');} ,300);
    setTimeout(function(){opt_array[1].classList.add('d-none');} ,600);
    setTimeout(function(){opt_array[2].classList.remove('d-none');} ,600);
    setTimeout(function(){opt_array[2].classList.add('d-none');} ,900);

}

function winner(){
    let computer = Math.floor(Math.random() * (2 - 0));
    comp = document.createElement('div');
    comp.classList.add('fading-element');
    comp.innerHTML = opt_array[computer].innerHTML;
    main.appendChild(comp);

    let result;
    if(user.firstChild.alt === "Paper"){
        switch(comp.firstChild.alt){
            case 'Scissor':
                result = 'You lose';
                break;
            case 'Rock':
                result = 'You win';
                break;
            default:
                result = "It's a tie"
        }
    }
    else if(user.firstChild.alt === "Rock"){
        switch(comp.firstChild.alt){
            case 'Paper':
                result = 'You lose';
                break;
            case 'Scissor':
                result = 'You win';
                break;
            default:
                result = "It's a tie"
        }
    }
    else{
        switch(comp.firstChild.alt){
            case 'Rock':
                result = 'You lose';
                break;
            case 'Paper':
                result = 'You win';
                break;
            default:
                result = "It's a tie"
        }
    }

    let final_div = document.createElement('div');
    let print_result = document.createElement('div');
    print_result.innerText = result;
    final_div.classList.add('result');
    final_div.appendChild(print_result);
    container.prepend(final_div);
    let restart = document.createElement('button');
    restart.classList.add('btn');
    restart.classList.add('btn-light');
    restart.setAttribute('type', 'button');
    restart.innerText = 'Restart';
    final_div.appendChild(restart);

    restart.addEventListener('click', () => {
        window.location.reload(false);
    })
}

function result(){
    clearInterval(t);
    setTimeout(winner, 950);
}

options.forEach(opt => {
    opt.addEventListener('click', () => {
        console.log(opt.id);
        let user_choise = opt.innerHTML;
        user = document.createElement('div');
        user.innerHTML = user_choise;
        user.firstChild.classList.add('user-choise');
        main.appendChild(user);
        grid.classList.add('d-none');
        document.querySelector('h3').classList.add('d-none');

        main.appendChild(comp_choise);

        t= setInterval(blink, 900);

        setTimeout(result, 3600);
    })
})