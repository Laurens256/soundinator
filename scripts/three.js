import * as THREE from 'three';

const scene = new THREE.Scene();

// perspectiveCamera is the camera
// 1st att is field of view FOV (value is in degrees)
// 2nd att is aspect ratio: always want to use width of element / by height (otherwise image looks squished)
// 3rd att is near clipping plane
// 4th att is far clipping plane
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create renderer instance in the width and height of our app
const renderer = new THREE.WebGLRenderer();
// For performance intensive apps, you can also give setSize smaller values, like window.innerWidth/2 and window.innerHeight/2
// this will render the app half of the resolution (canvas is 100% widht and height)
renderer.setSize(window.innerWidth, window.innerHeight);
// adding renderer to our html document, which is a <canvas> the renderer uses to display the scene
document.body.appendChild(renderer.domElement);

// adding in the cube
// boxgeometry used to create the cube: object that contains vertices and fill in the faces
const geometry = new THREE.BoxGeometry(1, 1, 1);
// all materials take an object of properties that will be ap: 0x00ff00 is the color attribute which is green
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// mesh is an object that takes a geometry and applies material to it
const cube = new THREE.Mesh(geometry, material);
// when we call scene.add() the thing will be added to the coords (0, 0, 0),
scene.add(cube);

// the above would cause both camera and object to be inside each other if the camera is at (0,0,0) too
// to avoid this, we move the camera on the z axis
camera.position.z = 5;

// this function is to render the scene, otherwise you don't see anything
function animate() {
    // this will create a loop that causes the renderer to draw txhe scene everytime the screen is refreshed
    // requestAnimationFrame pauses when the user navigates to another browser tab (battery and processor saving)
    requestAnimationFrame(animate);
    // will run every frame (normally 60 times per second)
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();
