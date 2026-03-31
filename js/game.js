class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.sceneManager = new SceneManager(this.canvas);
        this.cameraControls = new CameraControls(this.sceneManager.getCamera(), this.canvas);
        this.garbageGenerator = new GarbageGenerator();
        this.physicsEngine = new PhysicsEngine();

        this.garbageObjects = [];
        this.chambers = [];
        this.currentGarbage = null;
        this.isPlacingGarbage = false;
        this.previewMesh = null;

        this.gameStarted = false;
        this.gameEnded = false;
        this.garbagePlaced = 0;

        this.lastTime = performance.now();

        this.setupUI();
    }

    setupUI() {
        document.getElementById('startGame').addEventListener('click', () => this.startGame());
        document.getElementById('restartGame').addEventListener('click', () => this.restartGame());
        document.getElementById('placeDelicate').addEventListener('click', () => this.placeGarbageDelicately());
        document.getElementById('dropGarbage').addEventListener('click', () => this.dropGarbage());
        document.getElementById('newGarbage').addEventListener('click', () => this.generateNewGarbage());
        document.getElementById('resetCamera').addEventListener('click', () => this.cameraControls.reset());

        this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.onCanvasMouseMove(e));
    }

    startGame() {
        document.getElementById('modal').classList.remove('show');
        this.gameStarted = true;
        this.gameEnded = false;

        this.initializeGame();
        this.gameLoop();
    }

    restartGame() {
        this.garbageObjects.forEach(g => {
            if (g.mesh) this.sceneManager.removeObject(g.mesh);
        });
        this.chambers.forEach(c => {
            if (c.mesh) this.sceneManager.removeObject(c.mesh);
        });

        if (this.previewMesh) {
            this.sceneManager.removeObject(this.previewMesh);
            this.previewMesh = null;
        }

        this.garbageObjects = [];
        this.chambers = [];
        this.currentGarbage = null;
        this.garbagePlaced = 0;

        this.startGame();
    }

    initializeGame() {
        this.createInitialGarbagePile();
        this.generateNewGarbage();
    }

    createInitialGarbagePile() {
        const pileRadius = 12;
        const layers = 15;
        let garbageCount = 0;

        for (let layer = 0; layer < layers && garbageCount < 987; layer++) {
            const layerRadius = pileRadius * (1 - layer / layers * 0.5);
            const layerHeight = layer * 1.5;
            const garbageInLayer = Math.floor(20 * (1 - layer / layers * 0.5));

            for (let i = 0; i < garbageInLayer && garbageCount < 987; i++) {
                const angle = (i / garbageInLayer) * Math.PI * 2;
                const radius = layerRadius * (0.5 + Math.random() * 0.5);

                const garbage = this.garbageGenerator.generateRandom();
                garbage.position.x = Math.cos(angle) * radius;
                garbage.position.y = layerHeight + Math.random() * 0.5;
                garbage.position.z = Math.sin(angle) * radius;
                garbage.rotation.x = Math.random() * Math.PI;
                garbage.rotation.y = Math.random() * Math.PI;
                garbage.rotation.z = Math.random() * Math.PI;
                garbage.isStatic = false;

                garbage.mesh = this.garbageGenerator.createMesh(garbage);
                this.sceneManager.addObject(garbage.mesh);
                this.garbageObjects.push(garbage);

                garbageCount++;
            }
        }

        for (let i = 0; i < 2; i++) {
            const chamber = this.garbageGenerator.generateChamber();
            const angle = (i / 2) * Math.PI * 2;
            const radius = pileRadius * 0.3;

            chamber.position.x = Math.cos(angle) * radius;
            chamber.position.y = 4 + Math.random() * 2;
            chamber.position.z = Math.sin(angle) * radius;
            chamber.rotation.y = Math.random() * Math.PI * 2;
            chamber.isStatic = false;

            chamber.mesh = this.garbageGenerator.createMesh(chamber);
            this.sceneManager.addObject(chamber.mesh);
            this.chambers.push(chamber);
        }

        for (let i = 0; i < 50; i++) {
            this.physicsEngine.update([...this.garbageObjects, ...this.chambers], 0.016);
        }

        this.garbageObjects.forEach(g => g.isStatic = true);
        this.chambers.forEach(c => c.isStatic = true);
    }

    generateNewGarbage() {
        if (this.previewMesh) {
            this.sceneManager.removeObject(this.previewMesh);
        }

        this.currentGarbage = this.garbageGenerator.generateRandom();
        this.currentGarbage.position.y = 20;

        this.previewMesh = this.garbageGenerator.createMesh(this.currentGarbage);
        this.previewMesh.material = new THREE.MeshPhongMaterial({
            color: this.currentGarbage.color,
            transparent: true,
            opacity: 0.6
        });
        this.sceneManager.addObject(this.previewMesh);
        this.isPlacingGarbage = true;

        this.updateUI();
    }

    onCanvasMouseMove(event) {
        if (this.isPlacingGarbage && this.previewMesh) {
            const worldPos = this.cameraControls.getMouseWorldPosition(event.clientX, event.clientY);

            if (worldPos) {
                this.previewMesh.position.x = worldPos.x;
                this.previewMesh.position.z = worldPos.z;
            }
        }
    }

    onCanvasClick(event) {
        if (this.isPlacingGarbage && event.button === 0) {
        }
    }

    placeGarbageDelicately() {
        if (!this.isPlacingGarbage || !this.previewMesh) return;

        this.currentGarbage.position.x = this.previewMesh.position.x;
        this.currentGarbage.position.y = this.previewMesh.position.y;
        this.currentGarbage.position.z = this.previewMesh.position.z;
        this.currentGarbage.velocity = { x: 0, y: -1, z: 0 };
        this.currentGarbage.isStatic = false;

        this.sceneManager.removeObject(this.previewMesh);

        this.currentGarbage.mesh = this.garbageGenerator.createMesh(this.currentGarbage);
        this.sceneManager.addObject(this.currentGarbage.mesh);
        this.garbageObjects.push(this.currentGarbage);

        this.garbageObjects.forEach(g => g.isStatic = false);
        this.chambers.forEach(c => c.isStatic = false);

        this.previewMesh = null;
        this.currentGarbage = null;
        this.isPlacingGarbage = false;
        this.garbagePlaced++;

        setTimeout(() => this.generateNewGarbage(), 1000);
    }

    dropGarbage() {
        if (!this.isPlacingGarbage || !this.previewMesh) return;

        this.currentGarbage.position.x = this.previewMesh.position.x;
        this.currentGarbage.position.y = this.previewMesh.position.y + 10;
        this.currentGarbage.position.z = this.previewMesh.position.z;
        this.currentGarbage.velocity = { x: 0, y: 0, z: 0 };
        this.currentGarbage.isStatic = false;
        this.currentGarbage.isFalling = true;

        this.sceneManager.removeObject(this.previewMesh);

        this.currentGarbage.mesh = this.garbageGenerator.createMesh(this.currentGarbage);
        this.sceneManager.addObject(this.currentGarbage.mesh);
        this.garbageObjects.push(this.currentGarbage);

        this.garbageObjects.forEach(g => g.isStatic = false);
        this.chambers.forEach(c => c.isStatic = false);

        this.previewMesh = null;
        this.currentGarbage = null;
        this.isPlacingGarbage = false;
        this.garbagePlaced++;

        setTimeout(() => this.generateNewGarbage(), 1000);
    }

    updateUI() {
        document.getElementById('garbageCount').textContent = this.garbagePlaced;

        if (this.currentGarbage) {
            document.getElementById('currentWeight').textContent = this.currentGarbage.weight.toFixed(2);
        }
    }

    checkWinCondition() {
        const avalancheData = this.physicsEngine.detectAvalanche(this.garbageObjects, this.chambers);

        document.getElementById('avalancheProgress').textContent = Math.floor(avalancheData.progress);

        if (avalancheData.isWin && !this.gameEnded) {
            this.gameEnded = true;
            this.showEndScreen();
        }
    }

    showEndScreen() {
        setTimeout(() => {
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('endScreen').style.display = 'block';
            document.getElementById('endMessage').textContent =
                `After placing ${this.garbagePlaced} pieces of garbage, you created an avalanche big enough to free Rita and Joe!`;
            document.getElementById('modal').classList.add('show');
        }, 2000);
    }

    gameLoop() {
        if (!this.gameStarted) return;

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        if (!this.gameEnded) {
            this.physicsEngine.update([...this.garbageObjects, ...this.chambers], deltaTime);
            this.checkWinCondition();
            this.updateUI();
        }

        this.sceneManager.render();

        requestAnimationFrame(() => this.gameLoop());
    }
}
