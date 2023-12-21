export type Item = {
    name: string;
    description?: string;
};

export const ITEMS: Item[] = [
    {
        name: 'Staff or Wand',
        description: 'Once a day it doubles the distance, area, size, or effect of a spell you cast.'
    },
    { name: 'Skate Key', description: ' Once a day you can fine-tune your board and receive +1 Health.' },
    { name: 'Smoking Pipe', description: 'Puffing the sacred smoke prior to a roll provides Advantage once per day.' },
    {
        name: 'Shield',
        description: 'Provides +1 Defense when held. PCs may choose to have it shatter in combat to ignore all damage.'
    },
    { name: 'Melee Weapon', description: 'Adds +1 Damage but not to Attack Rolls (i.e. a knife, sword or mace).' },
    { name: 'Ranged Weapon', description: 'Adds +1 Damage but not to Attack Rolls (i.e. a bow or crossbow).' },
    {
        name: 'Lore from Yore',
        description:
            'Retrieved from under a mattress, this stack of old skate mags contain articles and tidbits about various cultures and bygone days.'
    },
    { name: 'Lockpicking Tools', description: "Used by many Skate Wizards to get into the archmage's secret stash." },
    { name: 'Oil Flask', description: 'Viscous lubricant, flammable, and tastes great on salads.' },
    { name: 'Rope', description: 'Made of hemp, obvi.' },
    { name: 'Torch & Tinder', description: 'A beautiful monogrammed matching set received on your last birthday.' },
    {
        name: 'Ball Bearings',
        description: 'A pouchful taken from the prototype of a new mega skate wheel design you’ve been messing with.'
    }
];

export const BOOTLEG_SPELLS: Item[] = [
    {
        name: 'Mattress',
        description:
            'Create a magical cushiony king-sized mattress that minimizes the impact of a fall from three stories or less.'
    },
    { name: 'Wannabe', description: 'Disguise yourself as any creature of your relative dimensions.' },
    { name: 'Trailblaze', description: "Leave a trail of fire in your skate-board's wake for a full minute." },
    {
        name: 'Sweet Jamz',
        description:
            'Create great music that fills the air. All non-Skate Wizards in the vicinity have Disadvantage for five minutes.'
    },
    {
        name: 'High Times',
        description:
            'Transform your skateboard into a cloud you can ride up to two stories above the ground. It lasts five minutes and does not impact movement or speed.'
    },
    {
        name: 'Gleam the Cube',
        description: 'Defy gravity with your board for five minutes, allowing you to skate on walls and ceilings.'
    }
];

export const RANDO_SPELLS = [
    ['Awesome', 'Busted', 'Dope', 'Epic', 'Gnarly', 'Hyped', 'Janky', 'Killer', 'Psyched', 'Rad', 'Sketchy', 'Stoked'],
    [
        'Animating',
        'Attracting',
        'Bewildering',
        'Concealing',
        'Consuming',
        'Crushing',
        'Duplicating',
        'Expanding',
        'Revealing',
        'Sealing',
        'Shielding',
        'Summoning'
    ],
    ['Acid', 'Air', 'Dust', 'Earth', 'Fire', 'Light', 'Reflection', 'Shadow', 'Smoke', 'Sound', 'Spirit', 'Water'],
    ['Armor', 'Boot', 'Bread', 'Bucket', 'Chain', 'Door', 'Hammer', 'Lute', 'Mattress', 'Tower', 'Tree', 'Well']
];

export const PERMANENT_SPELLS: Item[] = [
    { name: 'Ramp', description: 'A magical ramp about the size of a park bench appears below your skateboard.' },
    { name: 'Sidewalk', description: 'A magical sidewalk appears directly below your board.' },
    {
        name: 'Rail',
        description: 'A magical rail about as long and tall as a picnic table appears below your skateboard.'
    }
];

export const STARTING_STATS = {
    HP: 4,
    Defense: 6,
    'Attack Bonus': 0
};
