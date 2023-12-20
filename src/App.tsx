import { useEffect, useState } from 'react';
import { getAbilities, getBootlegSpell, getItems, getRandoSpell, getStartingStats, setBorders } from './utils';
import { PERMANENT_SPELLS } from './constants';
import type { Item } from './constants';

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

const InfoBoxes = () => {
    const [abilities] = useState(getAbilities());
    const [items] = useState(getItems());
    const [randoSpell] = useState([getRandoSpell()]);
    const [bootlegSpell] = useState([getBootlegSpell()]);

    return (
        <div id='sections'>
            <Info className='info-div' title='Abilities' id='ability-scores' items={abilities} />
            <Info className='info-div' title='Permamnent Spells' id='perm-spells' items={PERMANENT_SPELLS} />
            <Info className='info-div' title='Items' id='items' items={items} />
            <Info className='info-div' title='Rando Spell' id='rando-spell' items={randoSpell} />
            <Info className='info-div' title='Bootleg Spell' id='bootleg-spell' items={bootlegSpell} />
        </div>
    );
};

const App = () => {
    const [startingStats] = useState(getStartingStats());

    window.addEventListener('resize', () => {
        setBorders();
    })
    
    useEffect(() => {
        setBorders();
    });

    return (
        <>
            <h1>A Skate Wizards Generator</h1>
            <button id='roll-btn'>Bail out!</button>
            <Info id='stats-bar' items={startingStats} />
            <InfoBoxes />
        </>
    );
};

export default App;
