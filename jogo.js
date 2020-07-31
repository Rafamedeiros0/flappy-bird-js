console.log('[RafaMedeiros0] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d')

//video 1: https://www.youtube.com/watch?v=jOAU81jdi-c
//https://www.w3schools.com/tags/canvas_fillstyle.asp
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage

const floor = {
  image: sprites,
  sx: 0,
  sy: 610,
  sWidth: 224,
  sHeight: 112,
  dx: 0,
  dy: canvas.height - 112,
  dWidth: 224,
  dHeight: 112,
  draw() {
    contexto.drawImage(
      floor.image,
      floor.sx, floor.sy,
      floor.sWidth, floor.sHeight,
      floor.dx, floor.dy,
      floor.dWidth, floor.dHeight
    );
    contexto.drawImage(
      floor.image,
      floor.sx, floor.sy,
      floor.sWidth, floor.sHeight,
      (floor.dx+floor.sWidth), floor.dy,
      floor.dWidth, floor.dHeight
    );
  }
}

const flappyBird = {
  image: sprites,
  sx: 0,
  sy: 0,
  sWidth: 33,
  sHeight: 24,
  dx: 10,
  dy: 50,
  dWidth: 33,
  dHeight: 24,
  gravity: 0.25,
  speed: 0,
  update() {
    flappyBird.speed = flappyBird.speed + flappyBird.gravity
    flappyBird.dy = flappyBird.dy + flappyBird.speed
  },
  draw() {
    contexto.drawImage(
      flappyBird.image,
      flappyBird.sx, flappyBird.sy,
      flappyBird.sWidth, flappyBird.sHeight,
      flappyBird.dx, flappyBird.dy,
      flappyBird.dWidth, flappyBird.dHeight
    );
  }
}

const background = {
  image: sprites,
  sx: 390,
  sy: 0,
  sWidth: 275,
  sHeight: 204,
  dx: 0,
  dy: canvas.height - 204,
  dWidth: 275,
  dHeight: 204,
  draw() {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0,0,canvas.width, canvas.height);

    contexto.drawImage(
      background.image,
      background.sx, background.sy,
      background.sWidth, background.sHeight,
      background.dx, background.dy,
      background.dWidth, background.dHeight
    );
    contexto.drawImage(
      background.image,
      background.sx, background.sy,
      background.sWidth, background.sHeight,
      (background.dx+background.sWidth), background.dy,
      background.dWidth, background.dHeight
    );
  }
}

const messageGetReady = {
  image: sprites,
  sx: 134,
  sy: 0,
  sWidth: 174,
  sHeight: 152,
  dx: (canvas.width/2) - 174/2,
  dy: 50,
  dWidth: 174,
  dHeight: 152,
  draw() {
    contexto.drawImage(
      messageGetReady.image,
      messageGetReady.sx, messageGetReady.sy,
      messageGetReady.sWidth, messageGetReady.sHeight,
      messageGetReady.dx, messageGetReady.dy,
      messageGetReady.dWidth, messageGetReady.dHeight
    );

  }
}

let activeScreen = {}
function changeScreen(newScreen) {
  activeScreen = newScreen
}

const screen = {
  start: {
    draw() {
      background.draw()
      floor.draw()
      flappyBird.draw()
      messageGetReady.draw()
    },
    click() {
      changeScreen(screen.game)
    },
    update() {

    }
  },
  game: {
    draw() {
      background.draw()
      floor.draw()
      flappyBird.draw()
    },
    update() {
      flappyBird.update()
    }
  }
}

function loop() {
  activeScreen.draw();
  activeScreen.update();

  requestAnimationFrame(loop);
}

window.addEventListener('click', () => {
  activeScreen.click ? activeScreen.click(): null
})

changeScreen(screen.start)
loop();
