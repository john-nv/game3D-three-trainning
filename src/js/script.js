import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'
import png_bg from '../asset/img/bg.png'
import { blockBox, textureLoader } from './block/square'

const renderer = new THREE.WebGL1Renderer();

renderer.shadowMap.enabled = true;
// renderer.setClearColor(0xFFEA00)


// cau hinh render de phu hop voi browser
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

// scene quyet dinh goc nhin
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.01, // goc gan nhat
  1000 // goc xa nhat 
)
camera.position.set(0, 2, 5)

// OrbitControls cho phep nguoi dung xoay man hinh
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update()

scene.background = textureLoader.load(png_bg);
const box = blockBox()
scene.add(box)

// hien thi khong gian 3D va huong cua cac doi tuong
const exesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(10, 30)
const gridMaterial = new THREE.LineBasicMaterial({ color: 0x9a3232 });// mau sac 
gridHelper.material = gridMaterial
scene.add(exesHelper)
scene.add(gridHelper)


const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x4f4f4f, side: THREE.DoubleSide })
const plene = new THREE.Mesh(planeGeometry, planeMaterial);
plene.receiveShadow = true;
scene.add(plene)
plene.rotation.x = -0.5 * Math.PI

const gui = new dat.GUI({ autoPlace: true })
gui.domElement.style.position = 'fixed';
gui.domElement.style.bottom = '30px';
gui.domElement.style.left = '0';
const options = {
  sphereColor: '#EA9999',
  wireframe: false,
  speed: 0.04,
  height: 3,
  angle: 0.2,
  penumbra: 0,
  intensity: 1,
}

// -----------------------------------------
// // anh sang xung quanh
// const ambientLight = new THREE.AmbientLight(0xcce090)
// scene.add(ambientLight);
// const directionalLight = new THREE.DirectionalLight(0xFFFFFD, 0.8)
// scene.add(directionalLight);
// directionalLight.position.set(-35, 50, 0)
// directionalLight.castShadow = true; // bong
// // directionalLight.shadow.camera.bottom = -12; // bong
// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper);
// -----------------------------------------

// -----------------------------------------
// anh sang san khau 
const spotLight = new THREE.SpotLight(0xFFFFFD)
scene.add(spotLight)
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)
// -----------------------------------------

// them hieu ung suong mu
// scene.fog = new THREE.Fog(0xFFFFFF, 0, 100);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);  // tang theo cap so nhan may anh

// luoi cau luoi
const sphereGeometry = new THREE.SphereGeometry(1, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: options.sphereColor,
  wireframe: options.wireframe,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(2, 2, 2)
sphere.castShadow = true;

gui.addColor(options, 'sphereColor').onChange(e => {
  sphere.material.color.set(e)
})
gui.add(options, 'wireframe').onChange(e => {
  sphere.material.wireframe = (e)
})
gui.add(options, 'speed', 0, 1);
gui.add(options, 'height', 1, 6);

let step = 0;
gui.add(options, 'speed', 0, 1);

gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

function animate(time) {
  box.rotation.x += 0.02;
  box.rotation.y += 0.02;

  step += options.speed;
  sphere.position.y = options.height * Math.abs(Math.sin(step)) + 1
  // sphere.position = options.height

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update()

  renderer.render(scene, camera)
}

// setAnimationLoop lien tuc cap nhat va ve scene
renderer.setAnimationLoop(animate);