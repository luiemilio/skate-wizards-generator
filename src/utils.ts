import { ITEMS, RANDO_SPELLS, BOOTLEG_SPELLS, STARTING_STATS } from './constants';
import type { Item } from './constants';

const getRandomElement = (arr: unknown[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const getAbilities = (): Item[] => {
    const abilityScores: number[][] = [
        [2, 1, 0],
        [2, 0, 1],
        [1, 2, 0],
        [0, 2, 1],
        [1, 0, 2],
        [0, 1, 2]
    ];

    const abilities = getRandomElement(abilityScores) as number[];

    return abilities.map((score, idx) => {
        let name: string = '';

        switch (idx) {
            case 0: {
                name = 'Strength'
                break;
            }

            case 1: {
                name = 'Dexterity'
                break;
            }

            case 2: {
                name = 'Will'
                break;
            }
        }

        return {
            name, description: `${score}`
        }
    });
};

export const getItems = (): Item[]  => {
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
    }
};

export const getBootlegSpell = (): Item => {
    return getRandomElement(BOOTLEG_SPELLS) as Item;
};

export const getStartingStats = (): Item[] => {
    return Object.entries(STARTING_STATS).map(([stat, value]) => {
        return {
            name: stat,
            description: `${value}`
        }
    });
}

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
    const divs: (HTMLDivElement | null)[] = ['ability-scores', 'perm-spells', 'items', 'rando-spell', 'bootleg-spell'].map(id => document.querySelector(`#${id}`));

    divs.forEach((div) => {
        const otherDivs = divs.filter(divEl => divEl?.id !== div?.id);

        if (div) {
            div.classList.remove('bottom-border');
            div.classList.remove('right-border');
    
            if (otherDivs.some(otherDiv => isOnTop(div, otherDiv))) {
                div.classList.add('bottom-border');
            }
    
            if (otherDivs.some(otherDiv => isToTheLeft(div, otherDiv))) {
                div.classList.add('right-border');
            }
        }
    });
};

