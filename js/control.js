class CameraControls {
    constructor(camera, canvas) {
        this.camera = camera;
        this.canvas = canvas;

        this.isMouseDown = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.targetPosition = new THREE.Vector3(0, 5, 0);
        this.cameraDistance = 30;
        this.cameraAngleX = Math.PI / 4;
        this.cameraAngleY = Math.PI / 4;

        this.minDistance = 10;
        this.maxDistance = 80;
        this.rotationSpeed = 0.005;
        this.zoomSpeed = 0.1;

        this.init();
        this.updateCameraPosition();
    }

    init() {
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
        this.canvas.addEventListener('wheel', (e) => this.onWheel(e));

        this.canvas.addEventListener('touchstart', (e) => this.onTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.onTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.onTouchEnd(e));
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }

    onMouseMove(event) {
        if (!this.isMouseDown) return;

        const deltaX = event.clientX - this.lastMouseX;
        const deltaY = event.clientY - this.lastMouseY;

        this.cameraAngleY -= deltaX * this.rotationSpeed;
        this.cameraAngleX -= deltaY * this.rotationSpeed;

        this.cameraAngleX = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, this.cameraAngleX));

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;

        this.updateCameraPosition();
    }

    onMouseUp(event) {
        this.isMouseDown = false;
    }

    onWheel(event) {
        event.preventDefault();

        const delta = event.deltaY;
        this.cameraDistance += delta * this.zoomSpeed;
        this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance));

        this.updateCameraPosition();
    }

    onTouchStart(event) {
        if (event.touches.length === 1) {
            this.isMouseDown = true;
            this.lastMouseX = event.touches[0].clientX;
            this.lastMouseY = event.touches[0].clientY;
        }
    }

    onTouchMove(event) {
        if (event.touches.length === 1 && this.isMouseDown) {
            event.preventDefault();

            const deltaX = event.touches[0].clientX - this.lastMouseX;
            const deltaY = event.touches[0].clientY - this.lastMouseY;

            this.cameraAngleY -= deltaX * this.rotationSpeed;
            this.cameraAngleX -= deltaY * this.rotationSpeed;

            this.cameraAngleX = Math.max(0.1, Math.min(Math.PI / 2 - 0.1, this.cameraAngleX));

            this.lastMouseX = event.touches[0].clientX;
            this.lastMouseY = event.touches[0].clientY;

            this.updateCameraPosition();
        }
    }

    onTouchEnd(event) {
        this.isMouseDown = false;
    }

    updateCameraPosition() {
        const x = this.targetPosition.x + this.cameraDistance * Math.sin(this.cameraAngleX) * Math.cos(this.cameraAngleY);
        const y = this.targetPosition.y + this.cameraDistance * Math.cos(this.cameraAngleX);
        const z = this.targetPosition.z + this.cameraDistance * Math.sin(this.cameraAngleX) * Math.sin(this.cameraAngleY);

        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.targetPosition);
    }

    reset() {
        this.cameraDistance = 30;
        this.cameraAngleX = Math.PI / 4;
        this.cameraAngleY = Math.PI / 4;
        this.targetPosition.set(0, 5, 0);
        this.updateCameraPosition();
    }

    setTarget(x, y, z) {
        this.targetPosition.set(x, y, z);
        this.updateCameraPosition();
    }

    getMouseWorldPosition(mouseX, mouseY) {
        const mouse = new THREE.Vector2();
        mouse.x = (mouseX / window.innerWidth) * 2 - 1;
        mouse.y = -(mouseY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        const planeY = 5;
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -planeY);
        const intersection = new THREE.Vector3();

        raycaster.ray.intersectPlane(plane, intersection);

        return intersection;
    }
}
