const config = {
    type: Phaser.AUTO,
    parent: 'gameContainer',
    width: window.innerWidth, // начальная ширина окна
    height: window.innerHeight, // начальная высота окна
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let isFlipping = false;
let cooldown = false;
const headsGif = document.getElementById('headsGif');
const tailsGif = document.getElementById('tailsGif');

const game = new Phaser.Game(config);

function preload() {
    this.load.audio('coinFlip', 'flip-sound.mp3');
    this.load.image('background', 'background.png');
    
}

function create() {

    let bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;
     // Добавление текста
     let text = this.add.text(20, 20, 'Press [SHIFT] to double flip coin', { font: '16px Arial', fill: '#ffffff' });
    

    this.scale.resize(window.innerWidth, window.innerHeight); // Масштабируем канвас при создании
    window.addEventListener('resize', () => {
        this.scale.resize(window.innerWidth, window.innerHeight); // Изменяем размеры при ресайзе окна
    });

    this.input.on('pointerdown', () => {
        const count = this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT), 50) ? 2 : 1;
        if (!isFlipping && !cooldown) {
            throwCoins.call(this, count); // Использование .call для передачи текущего контекста 'this'
        }
    });
}

function update() {}

function throwCoins(count) {
    if (isFlipping) return;
    isFlipping = true;

    // Воспроизведение звука подбрасывания монеты
    this.sound.play('coinFlip');

    for (let i = 0; i < count; i++) {
        // Убираем задержку, чтобы анимации начинались одновременно
        showResult(Math.random() < 0.5 ? 'heads' : 'tails', i, count);
    }

    setTimeout(() => {
        isFlipping = false;
    }, 3000 + (count - 1) * 100); // Устанавливаем задержку на весь период проигрывания анимаций
}


const headsGif1 = document.getElementById('headsGif1');
const tailsGif1 = document.getElementById('tailsGif1');
const headsGif2 = document.getElementById('headsGif2');
const tailsGif2 = document.getElementById('tailsGif2');

function showResult(result, index, total) {
    let gif;
    if (index === 0) {
        gif = result === 'heads' ? headsGif1 : tailsGif1;
    } else {
        gif = result === 'heads' ? headsGif2 : tailsGif2;
    }
    
    gif.style.display = 'block';
    const shiftX = 100; // Расстояние между монетами
    const baseX = window.innerWidth / 2;
    const posX = baseX + (index - (total - 1) / 2) * shiftX;

    gif.style.left = `${posX}px`;
    gif.style.top = `${window.innerHeight / 2}px`;

    setTimeout(() => { gif.style.display = 'none'; }, 3000);
}

