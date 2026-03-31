class PhysicsEngine {
    constructor() {
        this.gravity = 9.81;
        this.friction = 0.3;
        this.restitution = 0.4;
        this.groundLevel = 0;
        this.collisionThreshold = 0.1;
        this.rollingThreshold = 0.05;
        this.supportAngleThreshold = 30;
    }

    update(garbageObjects, deltaTime) {
        const dt = Math.min(deltaTime, 0.033);

        for (let garbage of garbageObjects) {
            if (!garbage.isStatic) {
                this.applyGravity(garbage, dt);
                this.updatePosition(garbage, dt);
                this.checkGroundCollision(garbage);
            }
        }

        for (let i = 0; i < garbageObjects.length; i++) {
            for (let j = i + 1; j < garbageObjects.length; j++) {
                this.checkCollision(garbageObjects[i], garbageObjects[j]);
            }
        }

        for (let garbage of garbageObjects) {
            this.checkSupport(garbage, garbageObjects);
        }

        for (let garbage of garbageObjects) {
            if (garbage.mesh) {
                garbage.mesh.position.set(garbage.position.x, garbage.position.y, garbage.position.z);
                garbage.mesh.rotation.set(garbage.rotation.x, garbage.rotation.y, garbage.rotation.z);
            }
        }
    }

    applyGravity(garbage, dt) {
        if (garbage.isFalling || !this.isSupported(garbage)) {
            garbage.isFalling = true;
            garbage.velocity.y -= this.gravity * dt;
        } else {
            garbage.isFalling = false;
            if (Math.abs(garbage.velocity.y) < 0.1) {
                garbage.velocity.y = 0;
            }
        }

        if (garbage.isRolling) {
            const acceleration = this.gravity * Math.sin(this.rollingThreshold) * garbage.rollingAbility;
            const speed = Math.sqrt(garbage.velocity.x * garbage.velocity.x + garbage.velocity.z * garbage.velocity.z);

            if (speed < 20) {
                garbage.velocity.y -= acceleration * dt;
            }

            garbage.angularVelocity.x += dt * garbage.rollingAbility;
            garbage.angularVelocity.z += dt * garbage.rollingAbility;
        }

        garbage.velocity.x *= (1 - this.friction * dt);
        garbage.velocity.z *= (1 - this.friction * dt);
    }

    updatePosition(garbage, dt) {
        garbage.position.x += garbage.velocity.x * dt;
        garbage.position.y += garbage.velocity.y * dt;
        garbage.position.z += garbage.velocity.z * dt;

        garbage.rotation.x += garbage.angularVelocity.x * dt;
        garbage.rotation.y += garbage.angularVelocity.y * dt;
        garbage.rotation.z += garbage.angularVelocity.z * dt;
    }

    checkGroundCollision(garbage) {
        const halfSize = garbage.size / 2;

        if (garbage.position.y - halfSize < this.groundLevel) {
            garbage.position.y = this.groundLevel + halfSize;
            garbage.velocity.y = -garbage.velocity.y * this.restitution;

            if (Math.abs(garbage.velocity.y) < 0.5) {
                garbage.velocity.y = 0;
                garbage.isFalling = false;
            }

            if (garbage.rollingAbility > 0.5 &&
                (Math.abs(garbage.velocity.x) > 0.1 || Math.abs(garbage.velocity.z) > 0.1)) {
                garbage.isRolling = true;
            } else {
                garbage.isRolling = false;
            }
        }
    }

    checkCollision(garbage1, garbage2) {
        if (!garbage1.mesh || !garbage2.mesh) return;

        const box1 = new THREE.Box3().setFromObject(garbage1.mesh);
        const box2 = new THREE.Box3().setFromObject(garbage2.mesh);

        if (box1.intersectsBox(box2)) {
            const overlap = this.getOverlap(box1, box2);

            if (overlap > this.collisionThreshold) {
                this.resolveCollision(garbage1, garbage2, overlap);

                if (garbage1.isRolling && !garbage2.isStatic) {
                    const impulse = Math.abs(garbage1.velocity.x + garbage1.velocity.z) * 0.3;
                    garbage2.velocity.x += impulse * garbage2.rollingAbility * 0.5;
                    garbage2.velocity.z += impulse * garbage2.rollingAbility * 0.5;

                    if (garbage2.rollingAbility > 0.5) {
                        garbage2.isRolling = true;
                    }
                }

                if (garbage2.isRolling && !garbage1.isStatic) {
                    const impulse = Math.abs(garbage2.velocity.x + garbage2.velocity.z) * 0.3;
                    garbage1.velocity.x += impulse * garbage1.rollingAbility * 0.5;
                    garbage1.velocity.z += impulse * garbage1.rollingAbility * 0.5;

                    if (garbage1.rollingAbility > 0.5) {
                        garbage1.isRolling = true;
                    }
                }
            }
        }
    }

    getOverlap(box1, box2) {
        const center1 = box1.getCenter(new THREE.Vector3());
        const center2 = box2.getCenter(new THREE.Vector3());
        const distance = center1.distanceTo(center2);

        const size1 = box1.getSize(new THREE.Vector3());
        const size2 = box2.getSize(new THREE.Vector3());
        const avgSize = (size1.length() + size2.length()) / 4;

        return Math.max(0, avgSize - distance);
    }

    resolveCollision(garbage1, garbage2, overlap) {
        const dx = garbage2.position.x - garbage1.position.x;
        const dy = garbage2.position.y - garbage1.position.y;
        const dz = garbage2.position.z - garbage1.position.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;

        const nx = dx / distance;
        const ny = dy / distance;
        const nz = dz / distance;

        const totalMass = garbage1.weight + garbage2.weight;
        const ratio1 = garbage2.isStatic ? 1 : garbage2.weight / totalMass;
        const ratio2 = garbage1.isStatic ? 1 : garbage1.weight / totalMass;

        if (!garbage1.isStatic) {
            garbage1.position.x -= nx * overlap * ratio1;
            garbage1.position.y -= ny * overlap * ratio1;
            garbage1.position.z -= nz * overlap * ratio1;
        }

        if (!garbage2.isStatic) {
            garbage2.position.x += nx * overlap * ratio2;
            garbage2.position.y += ny * overlap * ratio2;
            garbage2.position.z += nz * overlap * ratio2;
        }

        const relVelX = garbage2.velocity.x - garbage1.velocity.x;
        const relVelY = garbage2.velocity.y - garbage1.velocity.y;
        const relVelZ = garbage2.velocity.z - garbage1.velocity.z;
        const velAlongNormal = relVelX * nx + relVelY * ny + relVelZ * nz;

        if (velAlongNormal < 0) {
            const impulse = -(1 + this.restitution) * velAlongNormal / (1 / garbage1.weight + 1 / garbage2.weight);

            if (!garbage1.isStatic) {
                garbage1.velocity.x -= impulse * nx / garbage1.weight;
                garbage1.velocity.y -= impulse * ny / garbage1.weight;
                garbage1.velocity.z -= impulse * nz / garbage1.weight;
            }

            if (!garbage2.isStatic) {
                garbage2.velocity.x += impulse * nx / garbage2.weight;
                garbage2.velocity.y += impulse * ny / garbage2.weight;
                garbage2.velocity.z += impulse * nz / garbage2.weight;
            }
        }
    }

    isSupported(garbage) {
        if (garbage.position.y - garbage.size / 2 <= this.groundLevel + 0.1) {
            return true;
        }
        return false;
    }

    checkSupport(garbage, allGarbage) {
        if (garbage.position.y - garbage.size / 2 <= this.groundLevel + 0.1) {
            garbage.isSupported = true;
            return;
        }

        garbage.isSupported = false;

        for (let other of allGarbage) {
            if (other.id === garbage.id || !other.mesh) continue;

            const box1 = new THREE.Box3().setFromObject(garbage.mesh);
            const box2 = new THREE.Box3().setFromObject(other.mesh);

            if (garbage.position.y > other.position.y &&
                Math.abs(garbage.position.y - other.position.y) < (garbage.size + other.size)) {

                const horizontalDist = Math.sqrt(
                    Math.pow(garbage.position.x - other.position.x, 2) +
                    Math.pow(garbage.position.z - other.position.z, 2)
                );

                if (horizontalDist < (garbage.size + other.size) / 2) {
                    garbage.isSupported = true;
                    break;
                }
            }
        }

        if (!garbage.isSupported) {
            garbage.isFalling = true;
        }
    }

    detectAvalanche(garbageObjects, chambers) {
        let movingCount = 0;
        let totalMovement = 0;

        for (let garbage of garbageObjects) {
            const speed = Math.sqrt(
                garbage.velocity.x * garbage.velocity.x +
                garbage.velocity.y * garbage.velocity.y +
                garbage.velocity.z * garbage.velocity.z
            );

            if (speed > 0.5) {
                movingCount++;
                totalMovement += speed;
            }
        }

        const avalancheProgress = Math.min(100, (movingCount / garbageObjects.length) * 100);

        let chambersFreed = 0;
        for (let chamber of chambers) {
            const distFromCenter = Math.sqrt(
                chamber.position.x * chamber.position.x +
                chamber.position.z * chamber.position.z
            );

            if (distFromCenter > 15 && Math.abs(chamber.velocity.x + chamber.velocity.z) > 0.1) {
                chambersFreed++;
            }
        }

        return {
            progress: avalancheProgress,
            movingCount: movingCount,
            totalMovement: totalMovement,
            chambersFreed: chambersFreed,
            isWin: chambersFreed >= 2
        };
    }
}
