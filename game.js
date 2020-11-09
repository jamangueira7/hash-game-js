var game=[];
var board= [];
var whoPlays=0;
var verify;
var playing=true;
var level=2;
var cpuMove=1;
var whoStarts=1;
var playMoves=0;

function CPUPlaying() {
    if(playing){
        var line, column;
        if(level==1) {
            do {
                line=playRando();
                column=playRando();
            }while (game[line][column] != "");
            game[line][column] = "O";
        }else if(level==2) {
            moveNivelHard("O");
        }else if(level==3) {
            moveNivelHard("X");
        }
        verify=hasWinner();
        if(verify != "") {
            alert(`${WinNameBySymbol(verify)} venceu!`);
            console.log(`------------------------------------------------`);
            console.log(`VENCEDOR: ${WinNameBySymbol(verify)}`);
            playing=false;
        }
        updateBoard();
        whoPlays=0;
        if(playMoves == 9 && verify == ""){
            console.log(`------------------------------------------------`);
            console.log(`JOGO TERMINOU EMPATADO`);
            alert(`Empate!`);
        }
    }
}

function moveNivelHard(piece) {
    var foundMove = false;
    for (var line=0;line<3;line++) {
        if(game[line][0] == piece && game[line][1] == piece && game[line][2] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [${line}][2] - Line check`);
            game[line][2] = "O";
            foundMove = true;
            break
        }else if(game[line][0] == piece && game[line][2] == piece && game[line][1] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [${line}][1] - Line check`);
            game[line][1] = "O";
            foundMove = true;
            break
        }else if(game[line][1] == piece && game[line][2] == piece && game[line][0] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [${line}][0] - Line check`);
            game[line][0] = "O";
            foundMove = true;
            break
        }
    }
    for (var column=0;column<3;column++) {
        if(game[0][column] == piece && game[1][column] == piece && game[2][column] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [2][${column}] - Column check`);
            game[2][column] = "O";
            foundMove = true;
            break
        }else if(game[0][column] == piece && game[2][column] == piece && game[1][column] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [1][${column}] - Column check`);
            game[1][column] = "O";
            foundMove = true;
            break
        }else if(game[2][column] == piece && game[1][column] == piece && game[0][column] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [0][${column}] - Column check`);
            game[0][column] = "O";
            foundMove = true;
            break
        }
    }

    for (var diagonal=0;diagonal<2;diagonal++) {
        var val1 = diagonal == 0 ? 0 : 2;
        var val2 = diagonal == 0 ? 2 : 0;

        if(game[0][val1] == piece && game[1][1] == piece && game[2][val2] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [2][${val2}] - Diagonal check`);
            game[2][val2] = "O";
            foundMove = true;
            break
        }else if(game[0][val1] == piece && game[2][val2] == piece && game[1][1] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [1][1] - Diagonal check`);
            game[1][1] = "O";
            foundMove = true;
            break
        }else if(game[1][1] == piece && game[2][val2] == piece && game[0][val1] == "") {
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [0][${val1}] - Diagonal check`);
            game[0][val1] = "O";
            foundMove = true;
            break
        }
    }

    if(!foundMove){
        if(playMoves<8) {
            do{
                line = playRando();
                column= playRando();
            }while (game[line][column] != "")
            playMoves++;
            console.log(`CPU     - Jogada[${playMoves}] - [${line}][${column}] - Randomic move check`);
            game[line][column] = "O";
        }else{
            for(var lineFor=0;lineFor<3;lineFor++) {
                for(var columnFor=0;columnFor<3;columnFor++) {
                    if(game[lineFor][columnFor] == ""){
                        playMoves++;
                        console.log(`CPU     - Jogada[${playMoves}] - [${lineFor}][${columnFor}] - Last move check`);
                        game[lineFor][columnFor] = "O";
                    }
                }
            }
        }
    }
}

function playRando() {
    return Math.round(Math.random()*2);
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

function play(position1, position2) {
    if(playing && whoPlays == 0){
        if(game[position1][position2] == "") {
            game[position1][position2] = "X";
            whoPlays=1;
            playMoves++;
            console.log(`Jogador - Jogada[${playMoves}] - [${position1}][${position2}]`);
        }
        if(whoPlays==1) {
            verify=hasWinner();
            if(verify != "") {
                alert(`${WinNameBySymbol(verify)} venceu!`);
                playing=false;
                console.log(`------------------------------------------------`);
                console.log(`VENCEDOR: ${WinNameBySymbol(verify)}`);
            }
            updateBoard();
            CPUPlaying();
        }
    }
}

function WinNameBySymbol(name) {
    if(name != ""){
        return name=="X" ? "Jogador" : "CPU"
    }
    return "";
}

function PlayNameByNumber(name) {
    return name==0 ? "Jogador" : "CPU"
}

function changeLevel() {
    level = (level==3) ? 1 : level+1;
    document.getElementById("dvNivel").innerHTML="Nivel: " + level;
    start();
}

function start() {
    playing = true;
    cpuMove=1;
    playMoves=0;
    document.getElementById("dvNivel").innerHTML="Nivel: " + level;
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
    console.log(`NOVO JOGO - Quem inicia é [${PlayNameByNumber(whoStarts==1?0:1)}] - Nivel[${level}]`);
    console.log(`------------------------------------------------`);
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
