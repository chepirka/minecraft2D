let main = document.querySelector('.main')
let inventoryModal = document.querySelector('.inventory')
let stevePositionX = 3;
let stevePositionY = 6;
let inventoryBlocks = document.querySelectorAll('.inventory_block');
let cross = document.querySelector('.cross');

const inventory = {
    grass: 0,
    ground: 0,
    wood: 0,
    leaf: 0
}

let map = [
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

let setHPAtribute = (block, hp, i, j)=>{
    block.setAttribute('hp', hp)
    block.addEventListener('click', ()=>{
        block.setAttribute('hp', block.getAttribute('hp') - 1)
        if(block.getAttribute('hp') <= 0){
            map[i][j] = 'empty'
            fillGame();
        }
    })
}

const hpMap = {
    grass: 1,
    ground: 2,
    wood: 3,
    leaf: 1
};

let inventoryFill = ()=>{
    let i = 0
    for(item in inventory) {
        if (inventory[item]) {
            inventoryBlocks[i].classList.add(item)
            i++
        }
    }
}

const fillGame = function() {
    map[stevePositionY][stevePositionX] = 'Steve';
    main.innerHTML = '';
    map.forEach((mapRow, i)=>{
        let row = document.createElement("div")
        row.classList.add("str")
        main.append(row)
        mapRow.forEach((item, j, arr)=>{
            let block = document.createElement("div")
            let hp = 0;
            block.classList.add("block")
            block.classList.add(item)
            block.addEventListener('click', ()=>{
                hp ++
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

document.addEventListener('keydown', function(event){
    if(event.code === 'KeyA'){
        if(map[stevePositionY][stevePositionX - 1] === "empty"){
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionX = stevePositionX - 1;
            fillGame();
        }
    }
})
document.addEventListener('keydown', function(event){
    if(event.code === 'KeyW'){
        if(map[stevePositionY - 1][stevePositionX] === "empty"){
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = stevePositionY - 1;
            fillGame();
        }
    }
})
document.addEventListener('keydown', function(event){
    if(event.code === 'KeyD'){
        if(map[stevePositionY][stevePositionX + 1] === "empty"){
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionX = stevePositionX + 1;
            fillGame();
        }
    }
})
document.addEventListener('keydown', function(event){
    if(event.code === 'KeyS'){
        if(map[stevePositionY + 1][stevePositionX] === "empty"){
            map[stevePositionY][stevePositionX] = 'empty';
            stevePositionY = stevePositionY + 1;
            fillGame();
        }
    }
})
document.addEventListener('keydown', function(event){
    if(event.code === 'KeyE'){
        inventoryModal.classList.add('active')
        inventoryFill()
    }

})
document.addEventListener('keydown', (e)=>{
    if(e.code == 'Escape'){
        inventoryModal.classList.remove('active')
    }
})
cross.addEventListener('click', ()=>{
    inventoryModal.classList.remove('active')
})

