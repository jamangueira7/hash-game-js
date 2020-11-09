var game=[];
var board= [];
var whoPlays=0;
var verify;
var playing=true;
var nivel=1;
var cpuMove=1;
var whoStarts=1;

function CPUPlaying() {
    if(playing){
        var line, column;
        if(nivel==1) {
            do {
                line=Math.round(Math.random()*2);
                column=Math.round(Math.random()*2);
            }while (game[line][column] != "");
            game[line][column] = "O";
        }else {

        }
        verify=hasWinner();
        if(verify != "") {
            alert(`${verify} venceu!`);
            playing=false;
        }
        updateBoard();
        whoPlays=0;
    }
}

function hasWinner() {
    var line, column;
    for(line=0;line<3;line++) {
        if(game[line][0] == game[line][1] && game[line][1] == game[line][2]) {
            return game[line][0];
        }
    }
    for(column=0;column<3;column++) {
        if(game[0][column] == game[1][column] && game[1][column] == game[2][column]) {
            return game[1][column];
        }
    }

    if(game[0][0] == game[1][1] && game[1][1] == game[2][2]) {
        return game[0][0];
    }

    if(game[0][2] == game[1][1] && game[1][1] == game[2][0]) {
        return game[0][2];
    }
    return "";
}

function play(position) {
    if(playing && whoPlays == 0){
        switch (position) {
            case 1:
                if(game[0][0] == "") {
                    game[0][0] = "X";
                    whoPlays=1;
                }
                break;
            case 2:
                if(game[0][1] == "") {
                    game[0][1] = "X";
                    whoPlays=1;
                }
                break;
            case 3:
                if(game[0][2] == "") {
                    game[0][2] = "X";
                    whoPlays=1;
                }
                break;
            case 4:
                if(game[1][0] == "") {
                    game[1][0] = "X";
                    whoPlays=1;
                }
                break;
            case 5:
                if(game[1][1] == "") {
                    game[1][1] = "X";
                    whoPlays=1;
                }
                break;
            case 6:
                if(game[1][2] == "") {
                    game[1][2] = "X";
                    whoPlays=1;
                }
                break;
            case 7:
                if(game[2][0] == "") {
                    game[2][0] = "X";
                    whoPlays=1;
                }
                break;
            case 8:
                if(game[2][1] == "") {
                    game[2][1] = "X";
                    whoPlays=1;
                }
                break;
            default:
                //caso 9
                if(game[2][2] == "") {
                    game[2][2] = "X";
                    whoPlays=1;
                }
                break;
        }
        if(whoPlays==1) {
            updateBoard();
            verify=hasWinner();
            if(verify != "") {
                alert(`${verify} venceu!`);
                playing=false;
            }
            CPUPlaying();
        }
    }
}

function start() {
    playing = true;
    cpuMove=1;
    game=[
        ["","",""],
        ["","",""],
        ["","",""]
    ];

    board=[
        [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3")],
        [document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")],
        [document.getElementById("p7"), document.getElementById("p8"), document.getElementById("p9")],
    ];
    updateBoard();
    if (whoStarts==1) {
        whoStarts=0;
        whoPlays=0;
        document.getElementById("dvWhoStart").innerHTML="Quem Inicia: Jogador";
    }else {
        whoStarts=1;
        whoPlays=1;
        CPUPlaying();
        document.getElementById("dvWhoStart").innerHTML="Quem Inicia: CPU";
    }
}

function updateBoard() {
    for(var line=0;line<3;line++) {
        for(var column=0;column<3;column++) {
            if(game[line][column]=="X"){
                board[line][column].innerHTML="X";
                board[line][column].style.cursor="default";
            }else if(game[line][column]=="O"){
                board[line][column].innerHTML="O";
                board[line][column].style.cursor="default";
            }else{
                board[line][column].innerHTML="";
                board[line][column].style.cursor="pointer";
            }
        }
    }
}



window.addEventListener('load', start);
