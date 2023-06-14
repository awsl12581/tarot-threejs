import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  Scene,
  TextureLoader,
} from 'three';
import { changeBackgroundColor, getImageUrlByTarotMsg } from '@/utils/utils.ts';

const setTarot = (scene: Scene, tarotMsg?: TarotMsg) => {
  // 创建几何体
  const boxGeometry = new BoxGeometry(3, 6, 0.03);
  // 创建材质包
  const textureLoader = new TextureLoader();
  // 六面材质
  let materialFront: MeshStandardMaterial = new MeshStandardMaterial();

  if (!tarotMsg) {
    materialFront = new MeshStandardMaterial({
      map: textureLoader.load('/tarot/XXI/世界.png'),
      normalMap: textureLoader.load('/tarot/XXI/NormalMap.png'),
      aoMap: textureLoader.load('/tarot/XXI/AmbientOcclusionMap.png'),
    });
  } else {
    materialFront = new MeshStandardMaterial({
      map: textureLoader.load(`/tarot/${tarotMsg.id}/${tarotMsg.name}.png`),
      normalMap: textureLoader.load(`/tarot/${tarotMsg.id}/NormalMap.png`),
      aoMap: textureLoader.load(`/tarot/${tarotMsg.id}/AmbientOcclusionMap.png`),
    });
  }

  const materialBack = new MeshStandardMaterial({
    map: textureLoader.load('/tarot/back/back.png'),
    normalMap: textureLoader.load('/tarot/back/NormalMap.png'),
    aoMap: textureLoader.load('/tarot/back/AmbientOcclusionMap.png'),
  });
  const materialArray = [];
  materialArray.push(new MeshStandardMaterial({ color: 'white' }));
  materialArray.push(new MeshStandardMaterial({ color: 'white' }));
  materialArray.push(new MeshStandardMaterial({ color: 'white' }));
  materialArray.push(new MeshStandardMaterial({ color: 'white' }));
  materialArray.push(materialFront);
  materialArray.push(materialBack);
  const mesh = new Mesh(boxGeometry, materialArray);
  mesh.position.set(0, 4, 0);
  mesh.castShadow = true;
  scene.add(mesh);

  // 计算和更改背景色
  if (tarotMsg) {
    const imageUrlByTarotMsg = getImageUrlByTarotMsg(tarotMsg);
    console.log(imageUrlByTarotMsg);
    changeBackgroundColor(imageUrlByTarotMsg);
  } else {
    changeBackgroundColor('/tarot/XXI/世界.png');
  }
  return mesh;
};

export {
  setTarot,
};
