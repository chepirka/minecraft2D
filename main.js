import {
    getActiveToolDmg 
} from "./instruments.js"; 
import { 
    inventory 
} from "./inventory.js";
import { 
    ROW_QUANTITY,
    COLUMN_QUANTITY,
    hpMap,
    lvl1
} from "./configuration.js";

let main = document.querySelector('.main');
let stevePositionX = 3;
let stevePositionY = 6;

let steve = document.createElement('div')
steve.classList.add('steve_number')

let currentLvl = 0;
let map = [];
const lvls = [lvl1];
const maxMapLvl = 10;

const setHPAtribute = (block, hp, i, j) => {
    block.setAttribute('hp', hp);
    block.addEventListener('click', () => {
        block.setAttribute('hp', block.getAttribute('hp') - 1);
        if (block.getAttribute('hp') <= 0) {
            map[i][j] = 'empty';
            fillGame();
        }
    })
};

const canIBreakBlock = (i, j)=>{
    let py = Math.abs(stevePositionY - i)
    let px = Math.abs(stevePositionX - j)
    if(py === 1 || py === 0){
        if(px === 1 || px === 0){
            return true
        }
        else{
            return false
        }
    }
    else{
        
    }
}

const fillGame = function () {
    map = lvls[currentLvl];
    map[stevePositionY][stevePositionX] = 'Steve';
    main.innerHTML = '';
    map.forEach((mapRow, i) => {
        let row = document.createElement("div");
        row.classList.add("str");
        main.append(row);
        mapRow.forEach((item, j, arr) => {
            let block = document.createElement("div");
            let hp = 0;
            block.classList.add("block");
            block.classList.add(item);
            if(block.classList.contains("Steve")){
                block.append(steve)
            }
            block.addEventListener('click', () => {
                if(canIBreakBlock(i, j)){
                    hp = hp + getActiveToolDmg(item);
                    if (hp >= hpMap[item]) {
                        hp = 0;
                        console.log(item);
                        inventory[item] = inventory[item] ? inventory[item] + 1 : 1;
                        console.log(inventory);
                        map[i][j] = 'empty';
                        fillGame();
                    }
                }
            })
            row.append(block);
        })
    })
};

fillGame();

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyA') {
        if (map[stevePositionY][stevePositionX - 1] === "empty") {
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionX = stevePositionX - 1;
            fillGame();
        }
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        if (map[stevePositionY - 1]?.[stevePositionX] === "empty") {
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = stevePositionY - 1;
            fillGame();
        }
        else if(currentLvl > 0){
            console.log(currentLvl - 1);
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = 9;
            currentLvl = currentLvl - 1;
            fillGame();
        }
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyD') {
        if (map[stevePositionY][stevePositionX + 1] === "empty") {
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionX = stevePositionX + 1;
            fillGame();
        }
    }
});

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyS') {
        if (map[stevePositionY + 1]?.[stevePositionX] === "empty") {
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = stevePositionY + 1;
            fillGame();
        } else if (!map[stevePositionY + 1] && lvls[currentLvl + 1]){
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = 0;
            currentLvl = currentLvl + 1;
            fillGame();
        }
    }
});

const getRandomElement1 = ()=>{
    let k = Math.random();
    let b;

    if(k < 0.85){
        b = 0;//b = stone
    }
    else if(k > 0.85 && k < 0.95){
        b = 1;//b = coal
    }
    else{
        b = 2;//b = iron
    }
    return Object.keys(mapElementsLVL1)[b];
};
const getRandomElement2 = ()=>{
    let k = Math.random();
    let b;

    if(k < 0.6){
        b = 0;//b = stone
    }
    else if(k > 0.6 && k < 0.82){
        b = 1;//b = coal
    }
    else if(k > 0.82 && k < 0.97){
        b = 2;//b = iron
    }
    else{
        b = 3;// b = diamond
    }
    return Object.keys(mapElementsLVL2)[b];
};
const getRandomElement3 = ()=>{
    let k = Math.random();
    let b;

    if(k < 0.55){
        b = 0;//b = stone
    }
    else if(k > 0.55 && k < 0.85){
        b = 1;//b = coal
    }
    else if(k > 0.85 && k < 0.95){
        b = 2;//b = iron
    }
    else{
        b= 3;//b = diamond
    }
    return Object.keys(mapElementsLVL3)[b];
};

const mapElementsLVL1 = {
    //Цифра - вероятность выпадения блока в %
    //в сумме должно быть 100
    stone: 85,
    coal: 10,
    iron: 5

};
const mapElementsLVL2 = {
    //Цифра - вероятность выпадения блока в %
    //в сумме должно быть 100
    stone: 60,
    coal: 22,
    iron: 15,
    diamond: 3
};
const mapElementsLVL3 = {
    //Цифра - вероятность выпадения блока в %
    //в сумме должно быть 100
    stone: 55,
    coal: 30,
    iron: 10,
    diamond: 5
};

const randomMapFill = (map)=>{
    for(let x = 0; x < ROW_QUANTITY; x++){
        map[x] = [];
        for(let i = 0; i < COLUMN_QUANTITY; i++){
            map[x][i] = getRandomElement1();
        }
    }
};
const autoMapFill = ()=>{
    for(let i = 1; i < maxMapLvl; i++){
        const randomLvl = [];
        randomMapFill(randomLvl)
        lvls.push(randomLvl)
        console.log(lvls)
    }
}
autoMapFill()

export{
    steve
}