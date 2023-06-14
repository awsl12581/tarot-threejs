import ColorThief from 'colorthief';
import { Material, Mesh, Scene } from 'three';
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier';

const getRandomNum = (Min: number, Max: number): number => {
  const Range = Max - Min;
  const Rand = Math.random();
  return (Min + Math.round(Rand * Range));
};

/**
 * 回调函数
 * @param imageUrl
 * @param callback
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const getThemeColors = (imageUrl: string, callback: Function) => {
  const colorThief = new ColorThief();

  const sourceImage = document.createElement('img');

  sourceImage.addEventListener('load', () => {
    const palette = colorThief.getPalette(sourceImage, 2, 10);
    callback(palette, imageUrl);
  });
  sourceImage.src = imageUrl;
};

const getImageUrlByTarotMsg = (tarotMsg: TarotMsg): string => `/tarot/${tarotMsg.id}/${tarotMsg.name}.png`;

//tarotScene, tarotCard, tarotOrbit, tarotOrbitMesh
const disposeCardMesh = (scene: Scene, mesh: Mesh, tarotOrbit: Flow, tarotOrbitMesh: Mesh) => {
  mesh.clear();
  mesh.geometry.dispose();
  const material = mesh.material as Material[];
  material.forEach((element) => {
    element.dispose();
  });
  scene.remove(mesh);
  if (tarotOrbit) {
    const object = tarotOrbit.object3D;
    object.geometry.dispose();
    scene.remove(tarotOrbit.object3D);
  }
  tarotOrbitMesh.clear();
  tarotOrbitMesh.geometry.dispose();
  scene.remove(tarotOrbitMesh);

};

const changeBackgroundColor = (imageUrlByTarotMsg: string) => {
  getThemeColors(imageUrlByTarotMsg, (colors: unknown[][]) => {
    // eslint-disable-next-line no-console
    console.log(colors);
    // 更改背景渐变色background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)
    document.body.style.backgroundImage = `linear-gradient(120deg,
     rgb(${colors[0][0]},${colors[0][1]},${colors[0][2]}) 0%,
      rgb(${colors[1][0]},${colors[1][1]},${colors[1][2]}) 100%)`;
  });
};

export {
  getRandomNum,
  getThemeColors,
  getImageUrlByTarotMsg,
  disposeCardMesh,
  changeBackgroundColor,
};
