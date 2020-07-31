console.log('[RafaMedeiros0] Flappy Bird');

const songHit = new Audio()
songHit.src = './effects/hit.wav'

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d')

//video 1: https://www.youtube.com/watch?v=jOAU81jdi-c
//video 2: https://www.youtube.com/watch?v=jOAU81jdi-c
//video 3: https://www.youtube.com/watch?v=ddG60OX7_8A
//https://www.w3schools.com/tags/canvas_fillstyle.asp
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio


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

function isClash(flappyBird,floor) {
  const flappyBirdY = flappyBird.dy + flappyBird.dHeight
  const floorY = floor.dy

  if (flappyBirdY >= floorY) {
    return true
  }
  return false
}

function createFlappyBird() {
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
    jumpHeight: 4.6,
    gravity: 0.25,
    speed: 0,
    update() {
      if (isClash(flappyBird,floor)) {
        console.log('Is clash')
        songHit.play()

        setTimeout(() => {
          changeScreen(screen.start)
        }, 500)
        return
      }
      flappyBird.speed = flappyBird.speed + flappyBird.gravity
      flappyBird.dy = flappyBird.dy + flappyBird.speed
    },
    jump() {
      flappyBird.speed = - flappyBird.jumpHeight
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
  return flappyBird
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

const globals = {}
let activeScreen = {}
function changeScreen(newScreen) {
  activeScreen = newScreen

  
  activeScreen.setup? activeScreen.setup(): null
  
}

const screen = {
  start: {
    setup() {
      globals.flappyBird = createFlappyBird();
    },
    draw() {
      background.draw()
      floor.draw()
      globals.flappyBird.draw()
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
      globals.flappyBird.draw()
    },
    click() {
      globals.flappyBird.jump()
    },
    update() {
      globals.flappyBird.update()
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

// jump flappyBird