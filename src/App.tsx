import { useEffect, useState } from 'react';
import {
    setBorders,
    generateRandomKey,
    convertObjToItems,
    getInitialStatus,
    statusByLevel,
    getRandoSpell
} from './utils';
import { PERMANENT_SPELLS } from './constants';
import type { Item } from './constants';
import type { AbilityScores, Status } from './utils';

type InfoBoxes = {
    abilities: Item[];
    randoSpells: Item[];
    permSpells: Item[];
    bootlegSpells: Item[];
    items: Item[];
    level: number;
    newLevel: number;
    status: Status;
    updateStatus: (status: Status) => void;
};

const InfoSpans = ({ name, description, id }: Item & { id?: string }): JSX.Element => {
    return (
        <div id={id}>
            <span id={id} className='key-span'>{name}</span>
            <span>{description}</span>
        </div>
    );
};

const InfoLi = ({ name, description }: Item): JSX.Element => {
    return (
        <li>
            <InfoSpans name={name} description={description} />
        </li>
    );
};

const Info = ({
    className = '',
    title = '',
    items,
    id
}: {
    className?: string;
    title?: string;
    items: Item[];
    id: string;
}): JSX.Element => {
    const listItems = items.map((item) => {
        const { name, description } = item;
        return <InfoLi key={generateRandomKey()} name={name} description={description} />;
    });

    return (
        <div className={className} id={id}>
            <h2>{title}</h2>
            <ul>{listItems}</ul>
        </div>
    );
};

const StatusBar = ({
    id,
    stats,
    level,
    newLevel,
    setNewLevel,
    status,
    updateStatus
}: {
    id: string;
    stats: Item[];
    level: number;
    newLevel: number;
    setNewLevel: (status: React.SetStateAction<number>) => void;
    status: Status;
    updateStatus: (status: Status) => void;
}): JSX.Element => {
    const levelButtonClicked = (e: React.MouseEvent<HTMLButtonElement>): any => {
        const target = e.target as HTMLButtonElement;

        if (target.id.includes('down') && level > 1) {
            setNewLevel(level - 1);
        } else if (target.id.includes('up') && level < 7) {
            setNewLevel(level + 1);
        }
    };

    const attackBonusButtonClicked = (): any => {
        const { attackBonus, hp } = status;

        updateStatus({ ...status, hp: hp + 2, attackBonus: attackBonus + 1, level: newLevel });
    };

    const listItems = stats.map((stat: Item) => {
        const { name, description, uuid } = stat;

        if (name === 'Level') {
            return (
                <li key={generateRandomKey()} id='level-li'>
                    <button onClick={levelButtonClicked} id='level-down' disabled={level !== newLevel}>
                        -
                    </button>
                    <InfoSpans name={name} description={`${newLevel}`} id='level'/>
                    <button onClick={levelButtonClicked} id='level-up' disabled={level !== newLevel}>
                        +
                    </button>
                </li>
            );
        } else if (name === 'Attack Bonus') {
            return (
                <li key={generateRandomKey()} id='attack-bonus-li'>
                    <InfoSpans name={name} description={description}/>
                    {newLevel > level && newLevel % 2 !== 0 && (
                        <button onClick={attackBonusButtonClicked} id='level-up'>
                            +
                        </button>
                    )}
                </li>
            );
        } else {
            return <InfoLi key={generateRandomKey()} name={name} description={description} uuid={uuid} />;
        }
    });

    return (
        <div id={id}>
            <ul>{listItems}</ul>
        </div>
    );
};

const AbilityScoresInfoBox = ({
    newLevel,
    items,
    status,
    updateStatus
}: {
    items: Item[];
    newLevel: number;
    status: Status;
    updateStatus: (status: Status) => void;
}) => {
    const { level, abilityScores, hp } = status;

    const buttonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { id } = e.target as HTMLButtonElement;

        const newAbilityScores = { ...abilityScores };
        newAbilityScores[id as keyof AbilityScores] = abilityScores[id as keyof AbilityScores] + 1;

        updateStatus({ ...status, abilityScores: newAbilityScores, level: newLevel, hp: hp + 2 });
    };

    const listItems = items.map((item) => {
        const { name, description } = item;

        return (
            <li key={generateRandomKey()}>
                <InfoSpans name={name} description={description} id='ability-spans'/>
                {newLevel > level && newLevel % 2 === 0 && (
                    <button onClick={buttonClicked} id={`${name.toLowerCase()}`}>
                        +
                    </button>
                )}
            </li>
        );
    });

    return (
        <div className='info-div' id='ability-scores'>
            <h2>Abilities</h2>
            <ul>{listItems}</ul>
        </div>
    );
};

const RandoSpellInfoBox = ({
    newLevel,
    items,
    status,
    updateStatus
}: {
    items: Item[];
    newLevel: number;
    status: Status;
    updateStatus: (status: Status) => void;
}) => {
    const { level, randoSpells, hp } = status;

    const buttonClicked = () => {
        const newRandoSpells = [...randoSpells, getRandoSpell()];

        updateStatus({ ...status, randoSpells: newRandoSpells, level: newLevel, hp: hp + 2 });
    };

    const listItems = items.map((item) => {
        const { name, description } = item;

        return (
            <li key={generateRandomKey()}>
                <InfoSpans name={name} description={description} />
            </li>
        );
    });

    return (
        <div className='info-div' id='rando-spell'>
            <h2>
                Rando Spells
                {newLevel > level && newLevel % 2 !== 0 && <button onClick={buttonClicked}>+</button>}
            </h2>
            <ul>{listItems}</ul>
        </div>
    );
};

const InfoBoxes = ({
    abilities,
    permSpells = PERMANENT_SPELLS,
    items,
    randoSpells,
    bootlegSpells,
    newLevel,
    status,
    updateStatus
}: InfoBoxes): JSX.Element => {
    return (
        <div id='sections'>
            <AbilityScoresInfoBox
                items={abilities}
                newLevel={newLevel}
                status={status}
                updateStatus={updateStatus}
            ></AbilityScoresInfoBox>
            <Info className='info-div' title='Permanent Spells' id='perm-spells' items={permSpells} />
            <Info className='info-div' title='Items' id='items' items={items} />
            <RandoSpellInfoBox
                items={randoSpells}
                newLevel={newLevel}
                status={status}
                updateStatus={updateStatus}
            ></RandoSpellInfoBox>
            <Info className='info-div' title='Bootleg Spell' id='bootleg-spell' items={bootlegSpells} />
        </div>
    );
};

const App = (): JSX.Element => {
    const [status, setStatus] = useState(getInitialStatus());
    const [newLevel, setNewLevel] = useState(status.level);
    const { hp, defense, attackBonus, abilityScores, randoSpells, permSpells, bootlegSpells, items, level } = status;
    statusByLevel.set(level, status);

    const bailOut = (): void => {
        const initialStatus = getInitialStatus();
        updateStatus(initialStatus);
        setNewLevel(initialStatus.level);
        setBorders();
    };

    const updateStatus = (status: Status): void => {
        setStatus(status);
        statusByLevel.set(status.level, status);
    };

    window.addEventListener('resize', () => {
        setBorders();
    });

    useEffect(() => {
        if (newLevel < level) {
            const levelStatus = statusByLevel.get(newLevel);

            if (levelStatus) {
                updateStatus(levelStatus);
            }
        }

        setBorders();
    });

    return (
        <>
            <h1>A Skate Wizards Generator</h1>
            <button id='roll-btn' onClick={bailOut}>
                Bail out!
            </button>
            <StatusBar
                id='stats-bar'
                stats={convertObjToItems({ level, hp, defense, attackBonus })}
                level={level}
                newLevel={newLevel}
                setNewLevel={setNewLevel}
                status={status}
                updateStatus={updateStatus}
            />
            <InfoBoxes
                level={level}
                newLevel={newLevel}
                abilities={convertObjToItems(abilityScores)}
                items={items}
                randoSpells={randoSpells}
                bootlegSpells={bootlegSpells}
                permSpells={permSpells}
                status={status}
                updateStatus={updateStatus}
            />
        </>
    );
};

export default App;
