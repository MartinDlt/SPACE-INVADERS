const absEnemDir = 1;
const absValue = 10;
const playerh = 28;
const playerw = 44;

let player;
let fiender;
let fSkudd = [];
let pImage;
let eImage;
let enemDir = absEnemDir;
let prevDir;

let wave = 1;
let skuddSansynlighet = 0.01;
let value = absValue;
let kol = 12,
    rad = 3;
let maxFiender = kol*rad;
let totFiender;

let exploder;

function preload(){
    exploder = loadSound("explode.mp3");
}

function newEnemies(){
    fiender = [];
    for(let i = 0; i < kol; i++){
        fiender[i] = [];
        for(let j = 0; j < rad; j++){

            fiender[i].push(new Enemy(70*i + 30, 50*j + 20, 44, 32 , 20, eImage)); // Enemy(x, y, w, h, fart, bilde)

        }
    }
}

function newWave(){
    newEnemies();
    enemDir = absEnemDir;
    wave++;
    if(wave % 2 == 0){
        player.liv++;
    }
    skuddSansynlighet *= 1.4 + wave/100;
    value = wave*10;
    /* value *= (wave/10)+1;
    value = round(value - map(wave, 0, 10000000, 0, 1000)); */
}

function setupGame(){

    newEnemies();
    player = new Spiller(20, height - playerh, playerw, playerh, 3, 5, pImage); // Spiller(x, y, w, h, liv, fart, bilde)

}

function reset(){
    setupGame();
    fSkudd = [];
    value = absValue;
    enemDir = absEnemDir;
}

function setup(){
    createCanvas(window.innerWidth, window.innerHeight-100);
    noStroke();
    textAlign(LEFT);
    //rectMode(CENTER);
    //imageMode(CENTER);
    eImage = loadImage("aliens.png")
    pImage = loadImage("ship.png");
    setupGame();

}

function keyPressed(){
    if(keyCode == RIGHT_ARROW){
        player.dir = 1;
    }if(keyCode == LEFT_ARROW){
        player.dir = -1;
    }
    if(keyCode == 32){
        player.skyt();
    }
}

function keyReleased(){
    if(keyIsDown(LEFT_ARROW)){
        player.dir = -1;
    } else if(keyIsDown(RIGHT_ARROW)){
        player.dir = 1;
    }else if(!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW)){
        player.dir = 0;
    }
    
}

function fiendeKant(array2d){

    for(var i = 0; i < array2d.length; i++){
        
        for(var j = 0; j < array2d[i].length; j++){

            if(array2d[i][j].x <= 0 || array2d[i][j].x + array2d[i][j].w >= width){
                return true;
            } 

        }
    }

    return false;

}

function fiendeFlyttNed(array2d){

    for(var i = 0; i < array2d.length; i++){
        
        for(var j = 0; j < array2d[i].length; j++){

                if(array2d[i][j].y > height-80){
                    reset();
                    return true;
                }
                array2d[i][j].y += array2d[i][j].h;
            
        }
    }

}

function fiendeSkutt(array2d,kule){    

    for(var i = 0; i < array2d.length; i++){
        
        for(var j = 0; j < array2d[i].length; j++){

            if(array2d[i][j] == "nil"){
                continue;
            }

            if(kule.kollider(array2d[i][j])){
                //console.warn(array2d[i][j]);
                array2d[i].splice(j, 1);
                exploder.play();            
                return true;
            }
            

            

        }
    }
    return false;
}

function fienderSkyt(array2d, fiendeTall){

    var fiendeSans = map(fiendeTall, 0, maxFiender, 0.05, 0); 
    var antSkudd = 1;

    for(var i = 0; i < array2d.length; i++){

        if(array2d[i].length > 0){

            var index = array2d[i].length - 1;

            var randomNum = random();
            
            if(skuddSansynlighet >= 0.5 + fiendeSans){
             skuddSansynlighet = 0.45 + fiendeSans;
            }else if(randomNum < pow(skuddSansynlighet, antSkudd) + pow(fiendeSans, antSkudd)){
                
                var element = array2d[i][index];
                antSkudd++;
                fSkudd.push( new Skudd(element.x + element.w/2 - 2, element.y + element.h, 4, 14, 6, "ENEMY"));
            
            }

        }

    }

}

function playerSkutt(array, spiller){


    for(var i = 0; i < array.length; i++){
        if(array[i].y + array[i].h < spiller.y){
            continue;
        } else if(array[i].y > spiller.y + spiller.h){
            array.splice(i, 1);
            i--;
            continue;
        }else {

            if(array[i].kollider(spiller)){

                spiller.mistLiv();
                array.splice(i, 1);
                i--;
                continue;

            }

        }
    }


}

function totaleFiender(array2d){
    var sum = 0;

    for(var i = 0; i < array2d.length; i++){
        sum += array2d[i].length;
    }

    return sum;
}

function draw(){
    background(0);
    fill(255);
    text("SCORE: " + player.score, 10, 20);
    text("LIV: " + player.liv, 10, 50);

    totFiender = totaleFiender(fiender);

    player.beveg();
    if(player.x <= 0){
        player.x += 0 - player.x;
    } else if(player.x + player.w > width){
        player.x += width - (player.x + player.w);
    }

    player.update();

    if(player.skudd != "nil"){
        if(fiendeSkutt(fiender, player.skudd)){
            player.score += value;
            player.skudd = "nil";
            player.coolDown = 0;
            player.skytBar = true;
        }
    }


    prevDir = enemDir;
    if(frameCount % 20 == 0){
        for(let f of fiender){
            for(let k = 0; k < f.length; k++){
                if(f[k] != "nil"){
    
                    f[k].update(enemDir);
    
                }
            }    
        }    
    } else {
        for(let f of fiender){
            for(let k = 0; k < f.length; k++){
                if(f[k] != "nil"){
    
                    f[k].show();
    
                }
            }    
        }
    }
    

    playerSkutt(fSkudd, player);
    if(player.dead){
        reset();
    }

    if(totFiender <= 0){
        newWave();
    }

    if(random() < 0.2 && frameCount % 20 == 0){
        fienderSkyt(fiender, totFiender);
    }
    for(let f of fSkudd){
        f.update();
    }

    if(fiendeKant(fiender) && frameCount % 20 == 0){
        if(enemDir < 0){
            enemDir = absEnemDir;
            fiendeFlyttNed(fiender);
        } else if(enemDir > 0){
            enemDir = -absEnemDir;
            fiendeFlyttNed(fiender);
        }
    }

}