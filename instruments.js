import { activeTool, classDelete, inventory, inventoryBlocks, inventoryFill } from "./inventory.js";

let axe = document.querySelector('.axe');
let pick = document.querySelector('.pick');
let instruments = [axe, pick]
let wooden_instrument = document.querySelector('.wooden_instrument');
let stone_instrument = document.querySelector('.stone_instrument');
let iron_instrument = document.querySelector('.iron_instrument');
let diamond_instrument = document.querySelector('.diamond_instrument');
let material = document.querySelectorAll('.fastCraftWindow__materials_material');

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


export {
    tools,
    getActiveToolDmg,
    armorDelete
}