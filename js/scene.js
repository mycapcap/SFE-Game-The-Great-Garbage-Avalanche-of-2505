class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = null;
        this.renderer = null;
        this.lights = [];

        this.init();
    }

    init() {
        this.setupRenderer();
        this.setupCamera();
        this.setupLights();
        this.setupEnvironment();

        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xCD853F);
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(20, 15, 20);
        this.camera.lookAt(0, 5, 0);
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffeecc, 0.8);
        directionalLight.position.set(50, 50, 30);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 200;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight2.position.set(-30, 30, -30);
        this.scene.add(directionalLight2);
        this.lights.push(directionalLight2);

        const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 0.4);
        this.scene.add(hemisphereLight);
        this.lights.push(hemisphereLight);
    }

    setupEnvironment() {
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshPhongMaterial({
            color: 0x8B4513,
            shininess: 10
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = true;
        this.scene.add(ground);

        const gridHelper = new THREE.GridHelper(200, 40, 0x000000, 0x8B4513);
        gridHelper.material.opacity = 0.2;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);

        const fog = new THREE.Fog(0xCD853F, 50, 150);
        this.scene.fog = fog;
    }

    addObject(mesh) {
        this.scene.add(mesh);
    }

    removeObject(mesh) {
        this.scene.remove(mesh);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    getCamera() {
        return this.camera;
    }

    getScene() {
        return this.scene;
    }
}
