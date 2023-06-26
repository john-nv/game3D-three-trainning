import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'
import png_bg from '../../asset/img/bg.png'
import vutru from '../../asset/img/vutru.jpg'

const textureLoader = new THREE.TextureLoader();

export function blockBox() {
  const boxGeometry = new THREE.BoxGeometry();
  const boxMaterial = new THREE.MeshStandardMaterial({
    // color: 0x4d4de8,
    map: textureLoader.load(vutru),
    side: THREE.DoubleSide
  });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.set(0, 3, 0);
  return box;
}

export { textureLoader };
