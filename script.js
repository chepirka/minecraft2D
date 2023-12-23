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
let material = document.querySelectorAll('.fastCraftWindow__materials_material');
let armor_block = document.querySelector('.armor_block');
let activeTool, draggedTool;

armor_block.addEventListener('dragover', (e)=>{
    e.preventDefault();

})
armor_block.addEventListener('drop', (block)=>{
    activeTool = draggedTool;
    draggedTool = null;
    armorDelete(armor_block)
    armorDelete(steve)
    console.log(activeTool)
    armor_block.classList.add(activeTool)
    steve.classList.add(activeTool)
})

const inventory = {
    grass: 0,
    ground: 0,
    wood: 0,
    leaf: 0,
    coal: 0,
    stone: 0,
    iron: 0,
    diamond: 0,
    woodenAxe: 0,
    woodenPick: 0,
    stoneAxe: 0,
    stonePick: 0,
    ironAxe: 0,
    ironPick: 0,
    diamondAxe: 0,
    diamondPick: 0
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

const lvl2 = [];

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

const tools = ["woodenAxe", "woodenPick", "stoneAxe", "stonePick", "ironAxe", "ironPick", "diamondAxe", "diamondPick"];

const toolInfo = {
    woodenAxe: {
        block: ['wood'],
        damage: 1
    },
    woodenPick: {
        block: ['stone', 'coal'],
        damage: 1
    },
    stoneAxe: {
        block: ['wood'],
        damage: 2
    },
    stonePick: {
        block: ['stone', 'coal', 'iron'],
        damage: 3
    },
    ironAxe: {
        block: ['wood'],
        damage: 3
    },
    ironPick: {
        block: ['stone', 'coal', 'iron', 'diamond'],
        damage: 4
    },
    diamondAxe: {
        block: ['wood'],
        damage: 3
    },
    diamondPick: {
        block: ['stone', 'coal', 'iron', 'diamond'],
        damage: 6
    }
}

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
            tools.forEach((instrumentName) => {
                if(inventoryBlocks[i].classList.contains(instrumentName)){
                    inventoryBlocks[i].setAttribute('draggable', true);
                    inventoryBlocks[i].addEventListener('dragstart', ()=>{
                        draggedTool = instrumentName;
                    })
                }
            })
            number[i].innerHTML = inventory[item];
            i++;
        }
    }
};

const classDelete = (clas) => {
    clas.forEach((item, index, array) => {
        ["grass","ground", "wood", "stone", "iron", "diamond", "leaf"].concat(tools).forEach((className) => {
            if (item.classList.contains(className)) {
                item.classList.remove(className);
                number.forEach((item) => {
                    item.innerHTML = ' '
                })
            }
        })
    })
};
const instrumentClassDelete = ()=>{
    instruments.forEach((item)=>{
        tools.forEach((instrumentName) => {
            if (item.classList.contains(instrumentName)) {
                item.classList.remove(instrumentName);
            }
        })
    })
};
const armorDelete = (elem)=>{
    tools.forEach((instrumentName) => {
        if (elem.classList.contains(instrumentName)) {
            elem.classList.remove(instrumentName);
        }
    })
}

const getActiveToolDmg = (blockType)=>{
    if (toolInfo[activeTool] && toolInfo[activeTool]['block'].includes(blockType)){
        return toolInfo[activeTool]['damage'];
    }
    return 1
}

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

let steve = document.createElement('div')
steve.classList.add('steve_number')

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
                        map[i][j] = 'empty';;
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
        classDelete(inventoryBlocks);
    }
});
cross.addEventListener('click', () => {
    inventoryModal.classList.remove('active')
    classDelete(inventoryBlocks);
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
            map[x][i] = getRandomElement();
        }
    }

};

randomMapFill(lvl2);

const instrumentsFill = (axe, pick)=>{
    instrumentClassDelete();
    classDelete(material);
    instruments[0].classList.add(axe)
    instruments[1].classList.add(pick)
}
const materialsFill = (materiall)=>{
    if(materiall === 'wood'){
        material[0].classList.add('wood')
        material[0].innerHTML = 'x2'
        material[2].classList.add('wood')
        material[2].innerHTML = 'x2'
        material[1].innerHTML = ' '
        material[3].innerHTML = ' '
    }else{
        material[0].classList.add(materiall)
        material[0].innerHTML = 'x3'
        material[1].classList.add('wood')
        material[1].innerHTML = 'x1'
        material[2].classList.add(materiall)
        material[2].innerHTML = 'x3'
        material[3].classList.add('wood')
        material[3].innerHTML = 'x1'
    }
}

wooden_instrument.addEventListener('click', ()=>{
    instrumentsFill('woodenAxe', 'woodenPick')
    materialsFill('wood')
});
stone_instrument.addEventListener('click', ()=>{
    instrumentsFill('stoneAxe', 'stonePick')
    materialsFill('stone')
});
iron_instrument.addEventListener('click', ()=>{
    instrumentsFill('ironAxe', 'ironPick')
    materialsFill('iron')
})
diamond_instrument.addEventListener('click', ()=>{
    instrumentsFill('diamondAxe', 'diamondPick')
    materialsFill('diamond')
})

const mat = (item, instrum)=>{
    if(inventory['wood'] > 0 && inventory[item] > 2){
        inventory['wood'] = inventory['wood'] - 1;
        inventory[item] = inventory[item] - 3;
        inventory[instrum] += 1;
        classDelete(inventoryBlocks);
        inventoryFill();
    }
};

const craft = (instrument)=>{
    if(instrument.classList.contains('woodenAxe')){
        if(inventory['wood'] > 1){
            inventory['wood'] = inventory['wood'] - 2 ;
            inventory['woodenAxe'] += 1;
            classDelete(inventoryBlocks);
            inventoryFill();  
        }
    }else if(instrument.classList.contains('woodenPick')){
        if(inventory['wood'] > 1){
            inventory['wood'] = inventory['wood'] - 2 ;
            inventory['woodenPick'] += 1;
            classDelete(inventoryBlocks);
            inventoryFill(); 
        }
    }else if(instrument.classList.contains('stoneAxe')){
        mat('stone', 'stoneAxe')
    }else if(instrument.classList.contains('stonePick')){
        mat('stone', 'stonePick')
    }else if(instrument.classList.contains('ironAxe')){
        mat('iron', 'ironAxe')
    }else if(instrument.classList.contains('ironPick')){
        mat('iron', 'ironPick')
    }else if(instrument.classList.contains('diamondAxe')){
        mat('diamond', 'diamondAxe')
    }else if(instrument.classList.contains('diamondPick')){
        mat('diamond', 'diamondPick')
    }
}

axe.addEventListener('click', ()=>{
    craft(axe)
});
pick.addEventListener('click', ()=>{
    craft(pick)
});
