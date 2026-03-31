class GarbageGenerator {
    constructor() {
        this.idCounter = 0;
    }

    randomFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    randomInRange(min, max) {
        return min + Math.random() * (max - min);
    }

    generateFromTemplate(template) {
        const size = this.randomInRange(template.sizeRange.min, template.sizeRange.max);
        const weight = this.randomInRange(template.minWeight, template.maxWeight);
        const color = this.randomFromArray(template.colors);

        return {
            id: ++this.idCounter,
            templateId: template.id,
            name: template.name,
            shape: template.shape,
            size: size,
            weight: weight,
            rollingAbility: template.rollingAbility,
            color: color,
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
            angularVelocity: { x: 0, y: 0, z: 0 },
            isStatic: false,
            isRolling: false,
            isFalling: false,
            mesh: null
        };
    }

    generateRandom() {
        const template = this.randomFromArray(GARBAGE_TEMPLATES);
        return this.generateFromTemplate(template);
    }

    generateChamber() {
        return {
            id: ++this.idCounter,
            templateId: CHAMBER_TEMPLATE.id,
            name: CHAMBER_TEMPLATE.name,
            shape: CHAMBER_TEMPLATE.shape,
            size: CHAMBER_TEMPLATE.size,
            weight: CHAMBER_TEMPLATE.weight,
            rollingAbility: CHAMBER_TEMPLATE.rollingAbility,
            color: this.randomFromArray(CHAMBER_TEMPLATE.colors),
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
            angularVelocity: { x: 0, y: 0, z: 0 },
            isStatic: false,
            isRolling: false,
            isFalling: false,
            isChamber: true,
            mesh: null
        };
    }

    createMesh(garbage) {
        let geometry;
        const material = new THREE.MeshPhongMaterial({
            color: garbage.color,
            shininess: 30,
            flatShading: false
        });

        switch (garbage.shape) {
            case 'box':
                const aspectX = 1 + Math.random() * 0.5;
                const aspectY = 1 + Math.random() * 0.5;
                const aspectZ = 1 + Math.random() * 0.5;
                geometry = new THREE.BoxGeometry(
                    garbage.size * aspectX,
                    garbage.size * aspectY,
                    garbage.size * aspectZ
                );
                break;

            case 'sphere':
                geometry = new THREE.SphereGeometry(garbage.size / 2, 16, 16);
                break;

            case 'cylinder':
                const heightVariation = 1 + Math.random();
                geometry = new THREE.CylinderGeometry(
                    garbage.size / 2,
                    garbage.size / 2,
                    garbage.size * heightVariation,
                    16
                );
                break;

            case 'cone':
                const coneHeight = garbage.size * (1.5 + Math.random());
                geometry = new THREE.ConeGeometry(
                    garbage.size / 2,
                    coneHeight,
                    16
                );
                break;

            case 'torus':
                geometry = new THREE.TorusGeometry(
                    garbage.size / 2,
                    garbage.size / 6,
                    16,
                    32
                );
                break;

            default:
                geometry = new THREE.BoxGeometry(garbage.size, garbage.size, garbage.size);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData.garbageId = garbage.id;

        return mesh;
    }

    getBoundingBox(garbage) {
        if (!garbage.mesh) return null;

        const box = new THREE.Box3().setFromObject(garbage.mesh);
        const size = new THREE.Vector3();
        box.getSize(size);

        return {
            min: box.min,
            max: box.max,
            size: size,
            center: box.getCenter(new THREE.Vector3())
        };
    }

    getGravityCenter(garbage) {
        if (!garbage.mesh) return { x: garbage.position.x, y: garbage.position.y, z: garbage.position.z };

        let offsetY = 0;

        switch (garbage.shape) {
            case 'cone':
                offsetY = -garbage.size * 0.3;
                break;
            case 'cylinder':
                offsetY = 0;
                break;
            default:
                offsetY = 0;
        }

        return {
            x: garbage.position.x,
            y: garbage.position.y + offsetY,
            z: garbage.position.z
        };
    }
}
