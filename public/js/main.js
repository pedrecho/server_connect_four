let area = document.getElementById('area');
let cell = document.getElementsByClassName('cell');
const color1 = '#ff0000'
const color1_sel = '#ff7f7f'
const color2 = '#ffff00'
const color2_sel = '#ffff7f'
let player = true;

let winpos = [
    [0, 7, 14, 21],
    [-7, 0, 7, 14],
    [-14, -7, 0, 7],
    [-21, -14, -7, 0],
    [0, 1, 2, 3],
    [-1, 0, 1, 2],
    [-2, -1, 0, 1],
    [-3, -2, -1, 0],
    [0, 6, 12, 18],
    [-6, 0, 6, 12],
    [-12, -6, 0, 6],
    [-18, -12, -6, 0],
    [0, 8,  16, 24],
    [-8, 0, 8, 16],
    [-16, -8, 0, 8],
    [-24, -16, -8, 0]
];

for(let i = 0; i < 42; ++i)
    area.innerHTML = area.innerHTML + '<div class="cell" pos=' + i + '></div>';

for(let i = 0; i < cell.length; ++i)
    cell[i].addEventListener('click', cellClick, false);

area.onmouseover = area.onmouseout = cellOver;

function cellClick(){
    let pos = this.getAttribute('pos')
    console.log(pos);
    pos  = pos % 7 - 7;
    while(pos + 7 < 42 && cell[pos + 7].style.background != hexToRgb(color1) && cell[pos + 7].style.background != hexToRgb(color2))
        pos += 7;
    if(pos >= 0) {
        cell[pos].style.background = playerColor(player);
        if(checkWin(pos)) {
            if (player)
                alert('Red player wins');
            else
                alert('Yellow player wins');
            restart()
        }
        else {
            player = !player;
            if (pos >= 7)
                cell[pos - 7].style.background = playerColorSelection(player);
        }
    }
}

function cellOver(event){
    let color = playerColorSelection(player);
    let pos = event.target.getAttribute('pos')
    if(pos == null)
        return;
    pos = pos % 7 - 7;
    while(pos + 7 < 42 && cell[pos + 7].style.background != hexToRgb(color1) && cell[pos + 7].style.background != hexToRgb(color2))
        pos += 7;
    if(pos > 0) {
        if (event.type == 'mouseover')
            cell[pos].style.background = color;
        if (event.type == 'mouseout')
            cell[pos].style.background = '';
    }
}

function playerColor(player){
    if(player)
        return color1;
    return color2;
}

function playerColorSelection(player){
    if(player)
        return color1_sel;
    return color2_sel;
}



function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result){
        let r= parseInt(result[1], 16);
        let g= parseInt(result[2], 16);
        let b= parseInt(result[3], 16);
        return "rgb("+r+", "+g+", "+b+")";//return 23,14,45 -> reformat if needed
    }
    return null;
}

function checkWin(pos){
    let color = hexToRgb(playerColor(player))
    for (let i = 0; i < winpos.length; ++i){
        try{
            let b = true;
            for (let k = 0; k < 4; ++k){
                if(cell[winpos[i][k] + pos].style.background != color)
                    b = false;
            }
            if(b)
                return true;
        } catch {}
    }
    return false;
}

function restart(){
    for(let i = 0; i < cell.length; ++i)
        cell[i].style.background = '';
    player = true;
}
