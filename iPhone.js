
const delay = 300;
let afterResize;
let currentStyle;

window.onresize = function () {
  document.body.classList.add('is-resizing');
  clearTimeout(afterResize);
  afterResize = setTimeout(() => document.body.classList.remove('is-resizing'), delay);
};

document.getElementById('zoom').addEventListener('click', () => {
  document.body.classList.add('is-resizing');
  setTimeout(() => document.body.classList.remove('is-resizing'), delay);
});


let dimension = 1000;

const styles = ['colourful', 'moody', 'neon', 'abstract', 'grayscale', 'light-leak'];

const generateBtn = document.querySelector('[for="random"]');
const canvas = document.querySelector('.canvas');

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

generateBtn.addEventListener('click', generateOrSave);

function generateOrSave(e) {

  if (e.metaKey) {
    saveGradient(e);
  } else {
    generateGradient();
  }
}

function generateGradient() {

  const newStyle = styles[Math.floor(Math.random() * styles.length)];

  if (currentStyle) canvas.classList.remove(`random--${currentStyle}`);

  currentStyle = newStyle;
  canvas.classList.add(`random--${newStyle}`);

  const shapes = canvas.getElementsByClassName('shape');

  document.body.style.setProperty('--r-h', `${random(0, 360)}deg`);
  document.body.style.setProperty('--r-s', `${random(40, 90)}%`);
  document.body.style.setProperty('--r-l', `${random(55, 90)}%`);

  Object.values(shapes).forEach(shape => {
    shape.style.setProperty('--r-h', `${random(0, 360)}deg`);
    shape.style.setProperty('--r-s', `${random(40, 90)}%`);
    shape.style.setProperty('--r-l', `${random(55, 90)}%`);

    shape.style.setProperty('--w', `${random(0, 30) + 85}%`);
    shape.style.setProperty('--b-r', `${random(20, 60)}%`);
    shape.style.setProperty('--b', `${random(5, 75) / 10}em`);
    shape.style.setProperty('--x', `${random(0, 100) - 50}%`);
    shape.style.setProperty('--y', `${random(0, 100) - 50}%`);
    shape.style.setProperty('--s-x', `${1 + (random(0, 130) - 30) / 100}`);
    shape.style.setProperty('--s-y', `${1 + (random(0, 130) - 30) / 100}`);
    shape.style.setProperty('--r', `${random(0, 720) - 360}deg`);
  });
}


const rgba2hex = rgba => `#${rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/).slice(1).map((n, i) => (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', '')).join('')}`;


function saveGradient(e) {
  const gradient = canvas;
  const rect = gradient.getBoundingClientRect();
  const scale = dimension / rect.width;

  const color = rgba2hex(window.getComputedStyle(gradient, null).getPropertyValue('background-color'));

  console.log(color, scale, rect);

  fetch(`https://api.color.pizza/v1/${color.substring(1)}`).
  then(c => c.json()).
  then(c => {
    domtoimage.toPng(gradient, {
      bgColor: '#ffffff',
      width: rect.width * scale,
      height: rect.height * scale,
      style: {
        'transform': `scale(${scale})`,
        'transform-origin': 'top left' } })

    .then(function (dataUrl) {

      const link = document.createElement('a');
      link.download = `${currentStyle}-${c['paletteTitle'].toLowerCase().replaceAll(' ', '-')}-gradient`;
      link.href = dataUrl;
      link.click();
    });
  });

}