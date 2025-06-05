# Three.js Coordinate System Reference

## Overview

In **Three.js**, the coordinate system is a standard right-handed 3D Cartesian coordinate system:

* The origin is at **(0, 0, 0)**.
* **+X** goes to the right.
* **+Y** goes up.
* **+Z** comes out of the screen toward the viewer.
* **−Z** goes into the screen (away from the viewer).

## 1. **Origin**

The origin is defined at `(0, 0, 0)` — that's the center point of the scene. By default, objects are created at this origin unless you explicitly move them.

```js
// Creating an object at the origin
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// cube is now at (0, 0, 0) by default
scene.add(cube);
```

## 2. **Light Position**

```js
light.position.set(1, 1, 1);
```

This places the **directional light** at position **(1, 1, 1)**:

* 1 unit to the **right** of the origin (X)
* 1 unit **above** the origin (Y)
* 1 unit **in front of the origin** (Z coming out toward the camera)

However, for a **DirectionalLight**, the position mainly determines the **direction** of the light, not the point it originates from like a point light. The light shines in the direction **opposite** to its position vector — so here, it shines in the direction **(-1, -1, -1)**.

### Light Types and Position Behavior

- **DirectionalLight**: Position determines direction (like sunlight)
- **PointLight**: Position is the actual light source location
- **SpotLight**: Position is the cone's apex location
- **AmbientLight**: No position (illuminates everything equally)

## 3. **Camera Position**

```js
camera.position.z = 5;
```

This places the **camera** at position **(0, 0, 5)**:

* It is 5 units **in front** of the origin, along the **+Z axis**.
* It looks **toward the origin** by default (i.e., in the **-Z direction**).

### Camera Controls

```js
// Setting camera position
camera.position.set(x, y, z);

// Making camera look at a specific point
camera.lookAt(0, 0, 0); // Look at origin
camera.lookAt(new THREE.Vector3(x, y, z)); // Look at specific point
```

## Summary Visualization

```
             Y
             ↑
             |
             |       light (1,1,1)
             |       /
             |      /
             |     /
             O----→ X
            /
           /
          camera (0,0,5)
         (looking toward origin along -Z)
```

## Key Coordinate System Rules

1. **Right-handed system**: If you point your right thumb along +Z (toward you), your fingers curl from +X to +Y
2. **Default camera direction**: Cameras look down the **-Z axis** by default
3. **Object positioning**: Use `.position.set(x, y, z)` or modify `.position.x`, `.position.y`, `.position.z` individually
4. **Rotation**: Follows right-hand rule (positive rotation is counter-clockwise when looking down the axis)

## Common Position Examples

```js
// Moving objects
cube.position.x = 2;        // Move 2 units to the right
cube.position.y = -1;       // Move 1 unit down
cube.position.z = -3;       // Move 3 units away from camera

// Alternative syntax
cube.position.set(2, -1, -3);

// Camera positions for different views
camera.position.set(0, 0, 5);   // Front view
camera.position.set(5, 0, 0);   // Right side view
camera.position.set(0, 5, 0);   // Top view
camera.position.set(5, 5, 5);   // Isometric view
```

## Troubleshooting Common Issues

- **Objects appear black**: Check light position and type
- **Can't see objects**: Verify camera position and direction
- **Objects in wrong position**: Remember Y is up, Z comes toward you
- **Rotation feels backwards**: Three.js uses radians, not degrees (use `THREE.MathUtils.degToRad()`)

## Summary

To summarize:

* The **origin** is `(0, 0, 0)` — where objects are placed by default.
* The **light** at `(1, 1, 1)` creates directional lighting toward `(-1, -1, -1)`.
* The **camera** at `(0, 0, 5)` looks toward `(0, 0, 0)` (the origin).

---
