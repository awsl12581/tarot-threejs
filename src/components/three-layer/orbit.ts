import {
  ArcCurve, BufferGeometry, CatmullRomCurve3,
  LineDashedMaterial,
  LineLoop,
  Matrix4, Mesh, MeshStandardMaterial,
  Scene,
  Vector3,
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier';

const getOrbit = (scene: Scene, callback: Function, msg ?: TarotMsg) => {
  if (!msg) {
    msg = {
      name: '世界',
      id: 'XXI',
      text: '世界',
    };
  }

  // 参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
  const arc = new ArcCurve(0, 0, 2.7, 0, 2 * Math.PI);
  // getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
  // xz书局
  const pointsXY = arc.getPoints(50);// 分段数50，返回51个顶点
  // 转换为3v点
  const points3 = pointsXY.map((poi) => {
    // 设置旋转矩阵
    const rotation = new Matrix4();
    rotation.makeRotationZ(Math.PI / 6);

    const vector3 = new Vector3(poi.x, 0, poi.y);
    // console.log(vector3);
    // 旋转坐标
    const vector3Rotation = vector3.applyMatrix4(rotation);
    // console.log(vector3Rotation);
    vector3Rotation.setY(vector3Rotation.y + 4);
    return vector3Rotation;
  });

  // 创建圆弧
  const geometry = new BufferGeometry();
  // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  geometry.setFromPoints(pointsXY);
  // 材质对象
  const material = new LineDashedMaterial({
    color: 'aliceblue',
    opacity: 0.9,
    dashSize: 0.03,
    scale: 0.5,
  });
  // 线条模型对象
  const line = new LineLoop(geometry, material);
  line.position.y = 4.12;
  line.rotation.set(Math.PI / 2, Math.PI / 6, 0);
  scene.add(line); // 线条对象添加到场景中

  // 创建轨道
  console.log(points3);
  // const boxGeometry1 = new BoxGeometry(0.1, 0.1, 0.1);
  // const meshBasicMaterial = new MeshBasicMaterial({
  //   color: 'white',
  // });
  // for (const vector3 of points3) {
  //   const mesh1 = new Mesh(boxGeometry1, meshBasicMaterial);
  //   mesh1.position.set(vector3.x, vector3.y, vector3.z);
  //   scene.add(mesh1);
  // }

  let flow: Flow;
  const curve = new CatmullRomCurve3(points3.reverse(), true, 'centripetal');
  const loader = new FontLoader();
  loader.loadAsync('/fonts/LXGW WenKai Screen_Regular.json').then((font) => {
    const geometry = new TextGeometry(`${msg?.name}`, {
      font,
      size: 0.3,
      height: 0.05,
      curveSegments: 15,
    });

    geometry.rotateX(Math.PI * 3 / 4);

    const material = new MeshStandardMaterial({
      color: 0x99ffff,
    });

    const objectToCurve = new Mesh(geometry, material);
    objectToCurve.castShadow = true

    flow = new Flow(objectToCurve);
    flow.updateCurve(0, curve);
    scene.add(flow.object3D);
    callback(flow, objectToCurve);
  });
}

export {
  getOrbit,
};
