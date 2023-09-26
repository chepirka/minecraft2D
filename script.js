let main = document.querySelector('.main')
let inventory = document.querySelector('.inventory')
let stevePositionX = 3;
let stevePositionY = 6;
let inventoryBlock = document.querySelectorAll('.inventory_block')
let cross = document.querySelector('.cross') 

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
            if(item === "grass"){
                block.classList.add("grass")
            }else if(item === "ground"){
                block.classList.add("ground")
            }else if(item === "wood"){
                block.classList.add("wood")
            }else if(item === "leaf"){
                block.classList.add("leaf")
            }else if(item === "Steve"){
                block.classList.add("Steve")
            }
            block.addEventListener('click', ()=>{
                hp ++
                if (hp >= hpMap[item]) {
                    hp = 0
                    console.log(item)
                    inventoryBlock[0].style.background = `url(img/${item}.png) center center / cover no-repeat`;
                    inventoryBlock[0].style.backgroundSize = '70% 90%';
                    inventoryBlock[0].style.backgroundColor = 'rgb(136, 136, 136)'
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
        inventory.classList.add('active')
    }
})
document.addEventListener('keydown', (e)=>{
    if(e.code == 'Escape'){
        inventory.classList.remove('active')
    }
})
cross.addEventListener('click', ()=>{
    inventory.classList.remove('active')
})