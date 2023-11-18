let main = document.querySelector('.main');
let inventoryModal = document.querySelector('.inventory');
let stevePositionX = 3;
let stevePositionY = 6;
let currentLvl = 0;
let inventoryBlocks = document.querySelectorAll('.inventory_block');
let cross = document.querySelector('.cross');
let number = document.querySelectorAll('.number');
let axe = document.querySelector('.axe');
let pick = document.querySelector('.pick');
let instruments = [axe, pick]
let wooden_instrument = document.querySelector('.wooden_instrument');
let stone_instrument = document.querySelector('.stone_instrument');
let iron_instrument = document.querySelector('.iron_instrument');
let diamond_instrument = document.querySelector('.diamond_instrument');

const inventory = {
    grass: 0,
    woodenAxe: 0,
    ground: 0,
    wood: 0,
    leaf: 0,
    woodenPick: 0
};

const lvl1 =
    [
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "leaf", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "leaf", "leaf", "leaf", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "leaf", "leaf", "wood", "leaf", "leaf", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wood", "empty", "empty", "empty", "empty"],
        ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty", "wood", "empty", "empty", "empty", "empty"],
        ["grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass", "grass"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"],
        ["ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground", "ground"]
    ];

const lvl2 = [
    // ["stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone"],
    // ["stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone"],
    // ["stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "coal", "coal", "stone"],
    // ["stone", "coal", "stone", "stone", "stone", "stone", "stone", "iron", "stone", "stone", "stone", "stone", "coal", "coal", "stone"],
    // ["stone", "stone", "coal", "stone", "stone", "stone", "stone", "iron", "iron", "stone", "stone", "stone", "stone", "stone", "stone"],
    // ["stone", "stone", "stone", "stone", "stone", "iron", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "stone"],
    // ["stone", "iron", "stone", "stone", "iron", "iron", "stone", "stone", "coal", "stone", "stone", "stone", "stone", "stone", "stone"],
    // ["iron", "stone", "stone", "stone", "iron", "stone", "stone", "stone", "coal", "coal", "stone", "iron", "stone", "stone", "stone"],
    // ["stone", "stone", "coal", "coal", "stone", "stone", "stone", "stone", "stone", "stone", "iron", "stone", "stone", "stone", "stone"],
    // ["stone", "coal", "stone", "stone", "stone", "stone", "stone", "stone", "stone", "iron", "stone", "iron", "stone", "stone", "stone"]
];


const lvls = [lvl1, lvl2];
let map = [];

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

const hpMap = {
    grass: 1,
    ground: 2,
    wood: 3,
    leaf: 1,
    stone: 5,
    iron: 12,
    coal: 8
};

const mapElementsLVL2p = {
    //Цифра - вероятность выпадения блока в %
    //в сумме должно быть 100
    stone: 85,
    iron: 5,
    coal: 10
};

const inventoryFill = () => {
    let i = 0
    for (item in inventory) {
        if (inventory[item]) {
            inventoryBlocks[i].classList.add(item);
            number[i].innerHTML = inventory[item];
            i++;
        }
    }
};

const classDelete = () => {
    inventoryBlocks.forEach((item, index, array) => {
        // item.classList.remove(item.classList[1])
        // console.log(item.classList[1])
        ["grass","ground", "wood", "leaf", "woodenAxe", "woodenPick", "stoneAxe", "stonePick", "ironAxe", "ironPick", "diamondAxe", "diamondPick"].forEach(className => {
            if (item.classList.contains(className)) {
                item.classList.remove(className);
            }
        })
        // if (item.classList.contains("grass")) {
        //     item.classList.remove("grass");
        // }
        // else if (item.classList.contains("ground")) {
        //     item.classList.remove("ground");
        // }
        // else if (item.classList.contains("wood")) {
        //     item.classList.remove("wood");
        // }
        // else if(item.classList.contains("leaf")) {
        //     item.classList.remove("leaf");
        // }
        // else if(item.classList.contains("woodenAxe")){
        //     item.classList.remove("woodenAxe");
        // }
        // else if(item.classList.contains("woodenPick")){
        //     item.classList.remove("woodenPick");
        // }
    })
};
const instrumentClassDelete = ()=>{
    instruments.forEach((item, index, array) => {
        if (item.classList.contains("woodenAxe")) {
            item.classList.remove("woodenAxe");
        }
        else if (item.classList.contains("woodenPick")) {
            item.classList.remove("woodenPick");
        }
        else if (item.classList.contains("stoneAxe")) {
            item.classList.remove("stoneAxe");
        }
        else if (item.classList.contains("stonePick")) {
            item.classList.remove("stonePick");
        }
        else if (item.classList.contains("ironAxe")) {
            item.classList.remove("ironAxe");
        }
        else if (item.classList.contains("ironPick")) {
            item.classList.remove("ironPick");
        }
        else if (item.classList.contains("diamondAxe")) {
            item.classList.remove("diamondAxe");
        }
        else if (item.classList.contains("diamondPick")) {
            item.classList.remove("diamondPick");
        }
    })
};

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
            block.addEventListener('click', () => {
                hp++;
                if (hp >= hpMap[item]) {
                    hp = 0;
                    console.log(item);
                    inventory[item] = inventory[item] ? inventory[item] + 1 : 1;
                    console.log(inventory);
                    map[i][j] = 'empty';;
                    fillGame();
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
            console.log(currentLvl);
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
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyE') {
        inventoryModal.classList.add('active');
        inventoryFill();
    }

});
document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
        inventoryModal.classList.remove('active');
        classDelete();
    }
});
cross.addEventListener('click', () => {
    inventoryModal.classList.remove('active')
    classDelete();
});

const getRandomElement = ()=>{
    let k = Math.random();

    if(k < 0.85){
        b = 0;//b = stone
    }
    else if(k > 0.85 && k < 0.95){
        b = 2;//b = coal
    }
    else{
        b = 1;//b = iron
    }
    return mapElements[b];
};

let mapElements = Object.keys(mapElementsLVL2p);

const randomMapFill = (map)=>{
    for(let x = 0; x < 10; x++){
        map[x] = [];
        for(let i = 0; i < 15; i++){
            map[x][i] = [];
            map[x][i].push(getRandomElement());
        }
    }

};

randomMapFill(lvl2);

const stone = ()=>{
    if(inventory['wood'] > 1 && inventory['stone'] > 3){
        inventory['wood'] = inventory['wood'] - 1;
        inventory['stone'] = inventory['stone'] - 3;
        inventoryFill();
    }
};

const iron = ()=>{
    if(inventory['wood'] > 1 && inventory['iron'] > 0){
        inventory['wood'] = inventory['wood'] - 1;
        inventory['iron'] = inventory['iron'] - 1;
        inventoryFill();
    }
};

const instrumentsFill = (axe, pick)=>{
    instrumentClassDelete();
    instruments[0].classList.add(axe)
    instruments[1].classList.add(pick)
}

wooden_instrument.addEventListener('click', ()=>{
    instrumentsFill('woodenAxe', 'woodenPick')
});
stone_instrument.addEventListener('click', ()=>{
    instrumentsFill('stoneAxe', 'stonePick')
});
iron_instrument.addEventListener('click', ()=>{
    instrumentsFill('ironAxe', 'ironPick')
})
diamond_instrument.addEventListener('click', ()=>{
    instrumentsFill('diamondAxe', 'diamondPick')
})

axe.addEventListener('click', ()=>{
    if(inventory['wood'] > 1){
        inventory['wood'] = inventory['wood'] - 2 ;
        inventory['woodenAxe'] += 1;
        classDelete();
        inventoryFill();
    }
});
pick.addEventListener('click', ()=>{
    if(inventory['wood'] > 1){
        inventory['wood'] = inventory['wood'] - 2;
        inventory['woodenPick'] += 1;
        classDelete();
        inventoryFill();
    }
});
