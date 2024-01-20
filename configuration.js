const ROW_QUANTITY = 10;
const COLUMN_QUANTITY = 15;

const hpMap = {
    grass: 1,
    ground: 2,
    wood: 3,
    leaf: 1,
    stone: 1,//5
    iron: 1,//12
    coal: 1//8
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

    export {
        ROW_QUANTITY,
        COLUMN_QUANTITY,
        hpMap,
        lvl1,
        tools,
        toolInfo
    }