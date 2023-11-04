let main = document.querySelector('.main')
let inventoryModal = document.querySelector('.inventory')
let stevePositionX = 3;
let stevePositionY = 6;
let currentLvl = 0;
let inventoryBlocks = document.querySelectorAll('.inventory_block');
let cross = document.querySelector('.cross');
let number = document.querySelectorAll('.number')

const inventory = {
    grass: 0,
    ground: 0,
    wood: 0,
    leaf: 0
}

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
]


const lvls = [lvl1, lvl2];
let map = [];

const setHPAtribute = (block, hp, i, j) => {
    block.setAttribute('hp', hp)
    block.addEventListener('click', () => {
        block.setAttribute('hp', block.getAttribute('hp') - 1)
        if (block.getAttribute('hp') <= 0) {
            map[i][j] = 'empty'
            fillGame();
        }
    })
}

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
    stone: 5,
    iron: 12,
    coal: 8
}

const inventoryFill = () => {
    let i = 0
    for (item in inventory) {
        if (inventory[item]) {
            inventoryBlocks[i].classList.add(item)
            number[i].innerHTML = inventory[item]
            i++
        }
    }
}

const classDelete = () => {
    inventoryBlocks.forEach((item, index, array) => {
        if (item.classList.contains("grass")) {
            item.classList.remove("grass")
        }
        else if (item.classList.contains("ground")) {
            item.classList.remove("ground")
        }
        else if (item.classList.contains("wood")) {
            item.classList.remove("wood")
        }
        else {
            item.classList.remove("leaf")
        }
    })
}

const fillGame = function () {
    map = lvls[currentLvl];
    map[stevePositionY][stevePositionX] = 'Steve';
    main.innerHTML = '';
    map.forEach((mapRow, i) => {
        let row = document.createElement("div")
        row.classList.add("str")
        main.append(row)
        mapRow.forEach((item, j, arr) => {
            let block = document.createElement("div")
            let hp = 0;
            block.classList.add("block")
            block.classList.add(item)
            block.addEventListener('click', () => {
                hp++
                if (hp >= hpMap[item]) {
                    hp = 0
                    console.log(item)
                    inventory[item] = inventory[item] ? inventory[item] + 1 : 1
                    console.log(inventory)
                    map[i][j] = 'empty';
                    fillGame()
                }
            })
            row.append(block)
        })
    })
}
fillGame();

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyA') {
        if (map[stevePositionY][stevePositionX - 1] === "empty") {
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionX = stevePositionX - 1;
            fillGame();
        }
    }
})
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyW') {
        if (map[stevePositionY - 1]?.[stevePositionX] === "empty") {
            console.log(currentLvl)
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = stevePositionY - 1;
            fillGame();
        }
        else if(currentLvl > 0){
            console.log(currentLvl - 1)
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = 9;
            currentLvl = currentLvl - 1;
            fillGame();
        }
    }
})
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyD') {
        if (map[stevePositionY][stevePositionX + 1] === "empty") {
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionX = stevePositionX + 1;
            fillGame();
        }
    }
})
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
            randomMapFill(lvl2);
            fillGame();
        }
    }
})
document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyE') {
        inventoryModal.classList.add('active')
        inventoryFill()
    }

})
document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape') {
        inventoryModal.classList.remove('active')
        classDelete()
    }
})
cross.addEventListener('click', () => {
    inventoryModal.classList.remove('active')
    classDelete()
})
const MathRandom = (arr)=>{
    const max = arr.length;
    let rand = Math.floor(Math.random() * max);
    console.log(arr[rand])
    return arr[rand]
}

let test = Object.keys(mapElementsLVL2p);
let test2 = test.length;

const randomMapFill = (map)=>{
    for(let x = 0; x < 10; x++){
        map[x] = [];
        for(let i = 0; i < 15; i++){
            map[x][i] = [];
            map[x][i].push(MathRandom(test))
        }
    }
}