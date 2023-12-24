import { ITEMS, RANDO_SPELLS, BOOTLEG_SPELLS, STARTING_STATS, PERMANENT_SPELLS } from './constants';
import type { Item } from './constants';

export type AbilityScores = {
    strength: number;
    dexterity: number;
    will: number;
};

export type Status = {
    level: number;
    hp: number;
    defense: number;
    attackBonus: number;
    abilityScores: AbilityScores;
    items: Item[];
    randoSpells: Item[];
    bootlegSpells: Item[];
    permSpells: Item[];
};

export type StatusOptions = Partial<Status>;

export const statusByLevel: Map<number, Status> = new Map();

export const convertObjToItems = (obj: any): Item[] => {
    return Object.entries(obj).map(([key, value]) => {
        return {
            name: normalizePropName(key),
            description: `${value}`
        };
    });
};

const getRandomElement = (arr: unknown[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const getAbilityScores = () => {
    const abilityScores: number[][] = [
        [2, 1, 0],
        [2, 0, 1],
        [1, 2, 0],
        [0, 2, 1],
        [1, 0, 2],
        [0, 1, 2]
    ];

    const abilities = getRandomElement(abilityScores) as number[];

    return {
        strength: abilities[0],
        dexterity: abilities[1],
        will: abilities[2]
    };
};

export const getAbilityScoreAsItems = () => {
    const abilityScores = getAbilityScores();
    return convertObjToItems(abilityScores);
};

export const getItems = (): Item[] => {
    const selectedItems: Item[] = [];

    while (selectedItems.length < 3) {
        const rolledItem = getRandomElement(ITEMS) as Item;

        if (!selectedItems.some((selectedItem) => selectedItem.name === rolledItem.name)) {
            selectedItems.push(rolledItem);
        }
    }

    return selectedItems;
};

export const getRandoSpell = (): Item => {
    const name = RANDO_SPELLS.map((wordList) => getRandomElement(wordList)).join(' ');

    return {
        name
    };
};

export const getBootlegSpell = (): Item => {
    return getRandomElement(BOOTLEG_SPELLS) as Item;
};

const normalizePropName = (str: string): string => {
    if (str.length <= 2) {
        return str.toUpperCase();
    }

    let finalWord = '';

    for (let i = 0; i < str.length; i++) {
        const letter = str.charAt(i);

        if (i === 0) {
            finalWord += letter.toUpperCase();
        } else if (letter === letter.toUpperCase()) {
            finalWord += ` ${letter}`;
        } else {
            finalWord += letter;
        }
    }

    return finalWord;
};

export const getStartingStatsAsItems = () => {
    return convertObjToItems(STARTING_STATS);
};

const isOnTop = (div1?: HTMLDivElement | null, div2?: HTMLDivElement | null): boolean => {
    if (!(div1 && div2)) {
        return false;
    }

    return Math.floor(div1.getBoundingClientRect().bottom) <= Math.floor(div2.getBoundingClientRect().top);
};

const isToTheLeft = (div1: HTMLDivElement | null, div2: HTMLDivElement | null): boolean => {
    if (!(div1 && div2)) {
        return false;
    }

    return Math.floor(div1.getBoundingClientRect().right) <= Math.floor(div2.getBoundingClientRect().left);
};

export const setBorders = () => {
    const divs: (HTMLDivElement | null)[] = [
        'ability-scores',
        'perm-spells',
        'items',
        'rando-spell',
        'bootleg-spell'
    ].map((id) => document.querySelector(`#${id}`));

    divs.forEach((div) => {
        const otherDivs = divs.filter((divEl) => divEl?.id !== div?.id);

        if (div) {
            div.classList.remove('bottom-border');
            div.classList.remove('right-border');

            if (otherDivs.some((otherDiv) => isOnTop(div, otherDiv))) {
                div.classList.add('bottom-border');
            }

            if (otherDivs.some((otherDiv) => isToTheLeft(div, otherDiv))) {
                div.classList.add('right-border');
            }
        }
    });
};

export const getInitialStatus = (): Status => {
    const { hp, defense, attackBonus } = STARTING_STATS;
    const abilityScores = getAbilityScores();
    const randoSpell = getRandoSpell();
    const bootlegSpell = getBootlegSpell();
    const items = getItems();

    return {
        level: 1,
        hp,
        defense,
        attackBonus,
        abilityScores,
        randoSpells: [randoSpell],
        bootlegSpells: [bootlegSpell],
        permSpells: PERMANENT_SPELLS,
        items
    };
};

export const generateRandomKey = (): string => {
    const uuid = crypto.randomUUID();
    return uuid;
};