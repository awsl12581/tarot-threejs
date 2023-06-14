import { CylinderGeometry, Mesh, MeshStandardMaterial, Scene, TextureLoader } from 'three';

const setFloor = (scene: Scene) => {
  // 地面
  const floorMat = new MeshStandardMaterial({
    color: 0xa9a9a9, // 材质的颜色
    map: new TextureLoader().load('/texture.png')
  });
  const floorGeometry = new CylinderGeometry(1.7, 2.3, 0.7, 128);
  const floorMesh = new Mesh(floorGeometry, floorMat);
  floorMesh.receiveShadow = true;
  // floorMesh.rotation.x = -Math.PI / 2.0;
  scene.add(floorMesh);
};
export {
  setFloor,
};
