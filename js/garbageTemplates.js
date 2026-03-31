const GARBAGE_TEMPLATES = [
    {
        id: 1,
        name: 'Brawndo Can',
        shape: 'cylinder',
        minWeight: 0.15,
        maxWeight: 0.5,
        rollingAbility: 0.9,
        colors: ['#00ff00', '#39ff14', '#0f0'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 2,
        name: 'Big Ass Fries Container',
        shape: 'box',
        minWeight: 0.2,
        maxWeight: 1.5,
        rollingAbility: 0.3,
        colors: ['#ff0000', '#ffff00', '#ffffff'],
        sizeRange: { min: 0.4, max: 0.8 }
    },
    {
        id: 3,
        name: 'Truck Nutz',
        shape: 'sphere',
        minWeight: 0.5,
        maxWeight: 3,
        rollingAbility: 1.0,
        colors: ['#ff69b4', '#ff1493', '#db7093'],
        sizeRange: { min: 0.3, max: 0.6 }
    },
    {
        id: 4,
        name: 'Starbucks Cup',
        shape: 'cone',
        minWeight: 0.1,
        maxWeight: 0.4,
        rollingAbility: 0.7,
        colors: ['#00704a', '#ffffff'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 5,
        name: 'TV Screen',
        shape: 'box',
        minWeight: 5,
        maxWeight: 20,
        rollingAbility: 0.1,
        colors: ['#000000', '#333333'],
        sizeRange: { min: 1, max: 2 }
    },
    {
        id: 6,
        name: 'Tire',
        shape: 'torus',
        minWeight: 8,
        maxWeight: 25,
        rollingAbility: 0.95,
        colors: ['#000000', '#1a1a1a'],
        sizeRange: { min: 0.8, max: 1.2 }
    },
    {
        id: 7,
        name: 'Plastic Bottle',
        shape: 'cylinder',
        minWeight: 0.1,
        maxWeight: 0.5,
        rollingAbility: 0.85,
        colors: ['#00ffff', '#ffffff', '#add8e6'],
        sizeRange: { min: 0.2, max: 0.4 }
    },
    {
        id: 8,
        name: 'Pizza Box',
        shape: 'box',
        minWeight: 0.3,
        maxWeight: 1,
        rollingAbility: 0.2,
        colors: ['#d2691e', '#ffffff'],
        sizeRange: { min: 0.5, max: 0.8 }
    },
    {
        id: 9,
        name: 'Beer Can',
        shape: 'cylinder',
        minWeight: 0.15,
        maxWeight: 0.4,
        rollingAbility: 0.9,
        colors: ['#ffd700', '#ff0000', '#0000ff'],
        sizeRange: { min: 0.2, max: 0.35 }
    },
    {
        id: 10,
        name: 'Plastic Bag',
        shape: 'sphere',
        minWeight: 0.1,
        maxWeight: 0.3,
        rollingAbility: 0.4,
        colors: ['#ffffff', '#f5f5f5'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 11,
        name: 'Computer Monitor',
        shape: 'box',
        minWeight: 4,
        maxWeight: 15,
        rollingAbility: 0.15,
        colors: ['#2c2c2c', '#4a4a4a'],
        sizeRange: { min: 0.8, max: 1.5 }
    },
    {
        id: 12,
        name: 'Shopping Cart',
        shape: 'box',
        minWeight: 10,
        maxWeight: 20,
        rollingAbility: 0.8,
        colors: ['#c0c0c0', '#808080'],
        sizeRange: { min: 1.2, max: 1.5 }
    },
    {
        id: 13,
        name: 'Foam Cup',
        shape: 'cone',
        minWeight: 0.1,
        maxWeight: 0.2,
        rollingAbility: 0.6,
        colors: ['#ffffff', '#f0f0f0'],
        sizeRange: { min: 0.2, max: 0.4 }
    },
    {
        id: 14,
        name: 'Magazine Stack',
        shape: 'box',
        minWeight: 1,
        maxWeight: 5,
        rollingAbility: 0.2,
        colors: ['#ff00ff', '#ffff00', '#00ffff'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 15,
        name: 'Microwave',
        shape: 'box',
        minWeight: 15,
        maxWeight: 25,
        rollingAbility: 0.1,
        colors: ['#ffffff', '#e0e0e0'],
        sizeRange: { min: 0.8, max: 1.2 }
    },
    {
        id: 16,
        name: 'Basketball',
        shape: 'sphere',
        minWeight: 0.6,
        maxWeight: 0.8,
        rollingAbility: 1.0,
        colors: ['#ff6600', '#000000'],
        sizeRange: { min: 0.3, max: 0.35 }
    },
    {
        id: 17,
        name: 'Traffic Cone',
        shape: 'cone',
        minWeight: 1,
        maxWeight: 3,
        rollingAbility: 0.4,
        colors: ['#ff6600', '#ffffff'],
        sizeRange: { min: 0.5, max: 0.8 }
    },
    {
        id: 18,
        name: 'Paint Bucket',
        shape: 'cylinder',
        minWeight: 5,
        maxWeight: 15,
        rollingAbility: 0.7,
        colors: ['#ff0000', '#0000ff', '#ffff00', '#ffffff'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 19,
        name: 'Cardboard Box',
        shape: 'box',
        minWeight: 0.5,
        maxWeight: 5,
        rollingAbility: 0.3,
        colors: ['#d2691e', '#8b4513'],
        sizeRange: { min: 0.5, max: 1.5 }
    },
    {
        id: 20,
        name: 'Office Chair',
        shape: 'box',
        minWeight: 8,
        maxWeight: 18,
        rollingAbility: 0.85,
        colors: ['#000000', '#808080'],
        sizeRange: { min: 0.8, max: 1.2 }
    },
    {
        id: 21,
        name: 'Bowling Ball',
        shape: 'sphere',
        minWeight: 6,
        maxWeight: 7.2,
        rollingAbility: 1.0,
        colors: ['#000000', '#ff0000', '#0000ff', '#00ff00'],
        sizeRange: { min: 0.3, max: 0.35 }
    },
    {
        id: 22,
        name: 'Laptop',
        shape: 'box',
        minWeight: 1.5,
        maxWeight: 4,
        rollingAbility: 0.2,
        colors: ['#2c2c2c', '#c0c0c0'],
        sizeRange: { min: 0.4, max: 0.5 }
    },
    {
        id: 23,
        name: 'Trash Bin',
        shape: 'cylinder',
        minWeight: 3,
        maxWeight: 10,
        rollingAbility: 0.75,
        colors: ['#228b22', '#0000ff', '#808080'],
        sizeRange: { min: 0.6, max: 1 }
    },
    {
        id: 24,
        name: 'Soda Bottle',
        shape: 'cylinder',
        minWeight: 0.5,
        maxWeight: 2,
        rollingAbility: 0.85,
        colors: ['#8b0000', '#006400', '#ff8c00'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 25,
        name: 'Helmet',
        shape: 'sphere',
        minWeight: 0.8,
        maxWeight: 2,
        rollingAbility: 0.95,
        colors: ['#ff0000', '#0000ff', '#000000', '#ffff00'],
        sizeRange: { min: 0.3, max: 0.4 }
    },
    {
        id: 26,
        name: 'Keyboard',
        shape: 'box',
        minWeight: 0.5,
        maxWeight: 1.5,
        rollingAbility: 0.2,
        colors: ['#000000', '#ffffff'],
        sizeRange: { min: 0.5, max: 0.7 }
    },
    {
        id: 27,
        name: 'Dumbbell',
        shape: 'cylinder',
        minWeight: 5,
        maxWeight: 25,
        rollingAbility: 0.8,
        colors: ['#2c2c2c', '#808080'],
        sizeRange: { min: 0.4, max: 0.8 }
    },
    {
        id: 28,
        name: 'Lamp',
        shape: 'cone',
        minWeight: 1,
        maxWeight: 4,
        rollingAbility: 0.3,
        colors: ['#ffd700', '#ffffff', '#ff0000'],
        sizeRange: { min: 0.5, max: 0.8 }
    },
    {
        id: 29,
        name: 'Book',
        shape: 'box',
        minWeight: 0.3,
        maxWeight: 2,
        rollingAbility: 0.1,
        colors: ['#8b4513', '#ff0000', '#0000ff', '#008000'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 30,
        name: 'Bucket',
        shape: 'cylinder',
        minWeight: 1,
        maxWeight: 5,
        rollingAbility: 0.7,
        colors: ['#ff0000', '#0000ff', '#808080'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 31,
        name: 'Toaster',
        shape: 'box',
        minWeight: 2,
        maxWeight: 5,
        rollingAbility: 0.15,
        colors: ['#c0c0c0', '#2c2c2c'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 32,
        name: 'Fan',
        shape: 'cylinder',
        minWeight: 3,
        maxWeight: 8,
        rollingAbility: 0.6,
        colors: ['#ffffff', '#000000', '#0000ff'],
        sizeRange: { min: 0.5, max: 0.8 }
    },
    {
        id: 33,
        name: 'Shoe',
        shape: 'box',
        minWeight: 0.3,
        maxWeight: 1,
        rollingAbility: 0.4,
        colors: ['#000000', '#ffffff', '#ff0000', '#0000ff'],
        sizeRange: { min: 0.3, max: 0.4 }
    },
    {
        id: 34,
        name: 'Suitcase',
        shape: 'box',
        minWeight: 3,
        maxWeight: 10,
        rollingAbility: 0.75,
        colors: ['#000000', '#8b4513', '#0000ff'],
        sizeRange: { min: 0.7, max: 1.2 }
    },
    {
        id: 35,
        name: 'Guitar',
        shape: 'box',
        minWeight: 2,
        maxWeight: 5,
        rollingAbility: 0.3,
        colors: ['#8b4513', '#000000', '#ff0000'],
        sizeRange: { min: 1, max: 1.5 }
    },
    {
        id: 36,
        name: 'Skateboard',
        shape: 'box',
        minWeight: 2,
        maxWeight: 4,
        rollingAbility: 0.9,
        colors: ['#ff0000', '#0000ff', '#00ff00', '#ffff00'],
        sizeRange: { min: 0.8, max: 1 }
    },
    {
        id: 37,
        name: 'Backpack',
        shape: 'box',
        minWeight: 1,
        maxWeight: 8,
        rollingAbility: 0.3,
        colors: ['#000000', '#0000ff', '#ff0000', '#008000'],
        sizeRange: { min: 0.5, max: 0.8 }
    },
    {
        id: 38,
        name: 'Pot',
        shape: 'cylinder',
        minWeight: 1,
        maxWeight: 5,
        rollingAbility: 0.7,
        colors: ['#c0c0c0', '#2c2c2c'],
        sizeRange: { min: 0.4, max: 0.7 }
    },
    {
        id: 39,
        name: 'Frying Pan',
        shape: 'cylinder',
        minWeight: 1,
        maxWeight: 3,
        rollingAbility: 0.5,
        colors: ['#2c2c2c', '#808080'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 40,
        name: 'Bicycle Wheel',
        shape: 'torus',
        minWeight: 1,
        maxWeight: 3,
        rollingAbility: 1.0,
        colors: ['#000000', '#c0c0c0'],
        sizeRange: { min: 0.6, max: 0.8 }
    },
    {
        id: 41,
        name: 'Cooler',
        shape: 'box',
        minWeight: 5,
        maxWeight: 15,
        rollingAbility: 0.2,
        colors: ['#ff0000', '#0000ff', '#ffffff'],
        sizeRange: { min: 0.6, max: 1 }
    },
    {
        id: 42,
        name: 'Printer',
        shape: 'box',
        minWeight: 5,
        maxWeight: 12,
        rollingAbility: 0.15,
        colors: ['#000000', '#c0c0c0'],
        sizeRange: { min: 0.6, max: 0.9 }
    },
    {
        id: 43,
        name: 'Globe',
        shape: 'sphere',
        minWeight: 0.5,
        maxWeight: 2,
        rollingAbility: 1.0,
        colors: ['#0000ff', '#008000', '#8b4513'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 44,
        name: 'Vase',
        shape: 'cylinder',
        minWeight: 0.5,
        maxWeight: 3,
        rollingAbility: 0.7,
        colors: ['#ffffff', '#0000ff', '#ff0000', '#ffd700'],
        sizeRange: { min: 0.3, max: 0.6 }
    },
    {
        id: 45,
        name: 'Clock',
        shape: 'cylinder',
        minWeight: 0.5,
        maxWeight: 2,
        rollingAbility: 0.8,
        colors: ['#ffffff', '#000000', '#8b4513'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 46,
        name: 'Toolbox',
        shape: 'box',
        minWeight: 5,
        maxWeight: 20,
        rollingAbility: 0.2,
        colors: ['#ff0000', '#2c2c2c', '#808080'],
        sizeRange: { min: 0.6, max: 1 }
    },
    {
        id: 47,
        name: 'Barrel',
        shape: 'cylinder',
        minWeight: 10,
        maxWeight: 25,
        rollingAbility: 0.9,
        colors: ['#8b4513', '#2c2c2c', '#0000ff'],
        sizeRange: { min: 0.8, max: 1.2 }
    },
    {
        id: 48,
        name: 'Cushion',
        shape: 'box',
        minWeight: 0.5,
        maxWeight: 2,
        rollingAbility: 0.2,
        colors: ['#ff0000', '#0000ff', '#008000', '#ffff00'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 49,
        name: 'Radio',
        shape: 'box',
        minWeight: 1,
        maxWeight: 4,
        rollingAbility: 0.2,
        colors: ['#000000', '#c0c0c0'],
        sizeRange: { min: 0.3, max: 0.5 }
    },
    {
        id: 50,
        name: 'Blender',
        shape: 'cylinder',
        minWeight: 2,
        maxWeight: 5,
        rollingAbility: 0.4,
        colors: ['#ffffff', '#ff0000', '#000000'],
        sizeRange: { min: 0.4, max: 0.6 }
    },
    {
        id: 51,
        name: 'Vacuum Cleaner',
        shape: 'cylinder',
        minWeight: 5,
        maxWeight: 15,
        rollingAbility: 0.6,
        colors: ['#ff0000', '#808080', '#0000ff'],
        sizeRange: { min: 0.8, max: 1.2 }
    },
    {
        id: 52,
        name: 'Umbrella',
        shape: 'cone',
        minWeight: 0.3,
        maxWeight: 1,
        rollingAbility: 0.5,
        colors: ['#000000', '#ff0000', '#0000ff', '#008000'],
        sizeRange: { min: 0.6, max: 0.9 }
    },
    {
        id: 53,
        name: 'Propane Tank',
        shape: 'cylinder',
        minWeight: 15,
        maxWeight: 25,
        rollingAbility: 0.85,
        colors: ['#808080', '#c0c0c0'],
        sizeRange: { min: 0.7, max: 1 }
    },
    {
        id: 54,
        name: 'Mattress',
        shape: 'box',
        minWeight: 10,
        maxWeight: 25,
        rollingAbility: 0.1,
        colors: ['#ffffff', '#e0e0e0'],
        sizeRange: { min: 2, max: 2.5 }
    },
    {
        id: 55,
        name: 'Washing Machine',
        shape: 'box',
        minWeight: 20,
        maxWeight: 25,
        rollingAbility: 0.1,
        colors: ['#ffffff', '#c0c0c0'],
        sizeRange: { min: 1, max: 1.5 }
    }
];

const CHAMBER_TEMPLATE = {
    id: 999,
    name: 'Hibernation Chamber',
    shape: 'box',
    weight: 200,
    rollingAbility: 0,
    colors: ['#4a4a4a', '#2c2c2c'],
    size: 2
};
