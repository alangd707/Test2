class Fight {
    constructor () {
        console.log('test')
        this.cnv = null;
        this.ctx = null;
        this.enemy = null;
        this.player = null;
        this.tempEnemyHP = null;
        this.tempPlayerHP = null;
        this.gameOn = false;
    }
    init(enemyid) {
        this.cnv = document.getElementById('gameScreen');
        this.ctx = this.cnv.getContext('2d');
        this.pic = document.getElementById('uni')
        this.enemy = enemyid;
        this.player = player;
        this.tempPlayerHP = this.player.maxHP;
        this.tempEnemyHP = this.enemy.maxHP;
        this.pic.src = this.enemy.imgID;
        this.refreshCanvas();
    }
    refreshCanvas() {
        this.drawCanvasOutline();
        this.drawEnemyPicture();
        this.drawEnemyHp(true);
        this.drawPlayerHp(true);
    }
    drawCanvasOutline() {
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 5;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 300);
        this.ctx.lineTo(800, 300);
        this.ctx.stroke();
    }
    drawEnemyPicture() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(300, 75, 200, 150);
        this.ctx.drawImage(this.pic, 300, 75, 200, 150);
    }
    drawEnemyHp(status) {
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = 'center';
        if (status) {
            this.ctx.fillStyle = 'red';
            this.ctx.fillText(String(this.tempEnemyHP), 400, 265);
        } else {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(350, 235, 100, 40)
        }
    }
    drawPlayerHp(status) {
        if (status) {
            this.ctx.fillStyle = 'gray';
            this.ctx.fillRect(325, 313, 150, 13)
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(325, 313, (window.fight.tempPlayerHP / player.maxHP) * 150, 13);
        } else {
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(325, 313, 150, 13)
        }
    }
    drawBorder() {
        this.ctx.strokeStyle = 'gray'
        this.ctx.strokeRect(300, 75, 200, 150);
    }
    resetBorder() {
        this.ctx.drawImage(this.pic, 300, 75, 200, 150);
    }
    hoverEnemy() {
        this.drawBorder()
        this.hoverOverEnemy = true;
    }
    startFight() { // This method calls the other 2 methods
        console.log('Fight started')
        let playerAttackTimer = setInterval(this.playerAttack, this.player.attackSpeed);
        let enemyAttackTimer = setInterval(this.enemyAttack, this.enemy.attackSpeed)
    }
    playerAttack() { // These 2 methods below are where "this" is undefined
        window.fight.drawEnemyHp(false);
        if ((window.fight.tempEnemyHP - window.fight.player.damage) > 0) {
            window.fight.tempEnemyHP -= window.fight.player.damage;
        }
        else {
            window.fight.tempEnemyHP = 0;
            console.log('Enemy slain!');
        }
        window.fight.drawEnemyHp(true);
    }
    enemyAttack() {
        window.fight.drawPlayerHp(false);
        if ((window.fight.tempPlayerHP - window.fight.enemy.damage) > 0) {
            window.fight.tempPlayerHP -= window.fight.enemy.damage;
        }
        else {
            window.fight.tempPlayerHP = 0;
            console.log('Player killed!');
        }
        window.fight.drawPlayerHp(true);
    }
}

let player = {
    maxHP: 100,
    damage: 5,
    attackSpeed: 800
}
let testDummy = {
    imgID: './assets/testDummy.png',
    maxHP: 100,
    damage: 5,
    attackSpeed: 1200
}