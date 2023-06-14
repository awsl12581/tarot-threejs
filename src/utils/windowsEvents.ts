// // 禁止滚动条
// document.body.style.overflow = 'hidden';
// document.addEventListener(
//   'touchmove',
//   (e) => {
//     e.preventDefault();
//   },
//   false
// ); // 禁止页面滑动
window.addEventListener('resize', () => {
  console.log('窗口大小发生改变');
  // set the size again if a resize occurs
  const elementById = document.getElementById('app');
  if (elementById) {
    elementById.style.width = String(window.innerWidth);
    // elementById.style.height = String(window.innerHeight);
  }
}, false);
