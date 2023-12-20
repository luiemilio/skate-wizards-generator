import { useEffect, useState } from 'react';
import { getAbilities, getBootlegSpell, getItems, getRandoSpell, getStartingStats, setBorders } from './utils';
import { PERMANENT_SPELLS } from './constants';
import type { Item } from './constants';

type InfoBoxes = {
    [key: string]: Item[];
}

const Info = ({ className = '', title = '', items, id }: { className?:string; title?: string; items: Item[]; id: string }) => {
    const listItems = items.map((item) => {
        const { name, description } = item;

        return (
            <li key={Math.random()}>
                <span className='key-span'>{name}</span>
                <span>{description}</span>
            </li>
        );
    });

    return (
        <div className={className} id={id}>
            <h2>{title}</h2>
            <ul>{listItems}</ul>
        </div>
    );
};

const InfoBoxes = ({ abilities, permSpells = PERMANENT_SPELLS, items, randoSpells, bootlegSpells }: InfoBoxes) => {
    return (
        <div id='sections'>
            <Info className='info-div' title='Abilities' id='ability-scores' items={abilities} />
            <Info className='info-div' title='Permanent Spells' id='perm-spells' items={permSpells} />
            <Info className='info-div' title='Items' id='items' items={items} />
            <Info className='info-div' title='Rando Spell' id='rando-spell' items={randoSpells} />
            <Info className='info-div' title='Bootleg Spell' id='bootleg-spell' items={bootlegSpells} />
        </div>
    );
};

const App = () => {
    const [startingStats, setStartingStats] = useState(getStartingStats());
    const [abilities, setAbilities] = useState(getAbilities());
    const [items, setItems] = useState(getItems());
    const [randoSpells, setRandoSpells] = useState([getRandoSpell()]);
    const [bootlegSpells, setBootlegSpells] = useState([getBootlegSpell()]);

    const bailOut = () => {
        setStartingStats(getStartingStats());
        setAbilities(getAbilities());
        setItems(getItems());
        setRandoSpells([getRandoSpell()]);
        setBootlegSpells([getBootlegSpell()]);
        setBorders();
    }
    
    window.addEventListener('resize', () => {
        setBorders();
    })
    
    useEffect(() => {
        setBorders();
    }, []);

    return (
        <>
            <h1>A Skate Wizards Generator</h1>
            <button id='roll-btn' onClick={bailOut}>Bail out!</button>
            <Info id='stats-bar' items={startingStats} />
            <InfoBoxes 
                abilities={abilities}
                items={items}
                randoSpells={randoSpells}
                bootlegSpells={bootlegSpells}
            />
        </>
    );
};

export default App;
