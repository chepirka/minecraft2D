import { 
    tools, 
    armorDelete 
} from "./instruments.js";
import { 
    steve 
} from "./main.js";

let inventoryBlocks = document.querySelectorAll('.inventory_block');
let inventoryModal = document.querySelector('.inventory');
let cross = document.querySelector('.cross');
let number = document.querySelectorAll('.number');
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

const inventoryFill = () => {
    let i = 0
    for (let item in inventory) {
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

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyE') {
        inventoryModal.classList.add('active');
        inventoryFill();
    }
    if (event.code == 'Escape') {
        inventoryModal.classList.remove('active');
        classDelete(inventoryBlocks);
    }
});

cross.addEventListener('click', () => {
    inventoryModal.classList.remove('active')
    classDelete(inventoryBlocks);
});

export {
    activeTool,
    inventory,
    classDelete,
    inventoryBlocks,
    inventoryFill
}