class Player extends AcGameObject {
    constructor(playground, x, y, radius, color, speed, is_me) {
        super();
        this.playground = playground;
        this.ctx = playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.move_length = 0; // 需要移动的距离
        this.is_me = is_me;
        this.eps = 0.1;
        this.cur_skill = null;
        this.friction = 0.9;
        this.spent_time = 0;

        if (this.is_me) {
            this.img = new Image();
            this.img.src = this.playground.root.settings.photo;
        }

    }

    start() {
        if (this.is_me && this.radius > 12) {
            this.add_listening_events();
            console.log(this.x, this.y);
        } else {
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {
        let outer = this;
        this.playground.game_map.$canvas.on("contextmenu", () => {
            return false;
        });
        this.playground.game_map.$canvas.mousedown((e) => {
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if (e.which === 3) {
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
            } else if (e.which === 1) {
                if (outer.cur_skill === "fireball" && this.radius > 11) {
                    outer.shoot_fireball(e.clientX -rect.left, e.clientY - rect.top);
                }
                outer.cur_skill = null;
            }

        });
        $(window).keydown((e) => {
            if (e.which === 81) {
                outer.cur_skill = "fireball";
                return false;
            }
        })
    }

    shoot_fireball(tx, ty) {
        let x = this.x, y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - y, tx - x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1.5;
        let color = "orange";
        new Fireball(this.playground, this, x, y, radius, color, speed, move_length, vx, vy, this.playground.height * 0.01);

    }


    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty) {
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vy = Math.sin(angle);
        this.vx = Math.cos(angle);
    }

    is_attacked(angel, damage) {

        for (let i = 0; i < 10 + Math.random() * 9; i++) {
            let x = this.x;
            let y = this.y;
            let radius = this.radius * (Math.random() * 0.1);
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 10;
            new Particle(this.playground, x, y, vx, vy, radius, color, speed, move_length);

        }


        this.radius -= damage;

        if (this.radius < 10) {
            this.destroy();

            return false;
        }

        this.damage_x = Math.cos(angel);
        this.damage_y = Math.sin(angel);
        this.damage_speed = damage * 150;
        this.speed *= 0.8;
    }

    update() {
        this.spent_time += this.timedelta / 1000;
        let exit = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];

        if (Math.random() < 1 / 300.0 && this.spent_time > 3 && !this.is_me && exit.radius > 11 && this.playground.players.length >= 2) {
            // ai无法排除自己
            let player = exit;
            let tx = player.x + player.speed * this.vx * this.timedelta / 1000 * 0.3;
            let ty = player.y + player.speed * this.vy * this.timedelta / 1000 * 0.3;
            this.shoot_fireball(tx, ty);
        }

        // 被攻击则无法移动
        if (this.damage_speed > this.eps) {
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.friction;
        } else {
            // move_length减为0停下来
            if (this.move_length < this.eps) {
                this.move_length = 0;
                this.vx = this.vy = 0;
                if (!this.is_me) {
                    let tx = Math.random() * this.playground.width;
                    let ty = Math.random() * this.playground.height;
                    this.move_to(tx, ty);
                }
            } else {
                let moved = Math.min(this.speed * this.timedelta / 1000, this.move_length); // 一帧要移动的距离
                this.x += moved * this.vx;
                this.y += moved * this.vy;
                this.move_length -= moved;
            }
        }

        this.render();
    }

    render() {
        if (this.is_me){
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            this.ctx.restore();
        }else {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }


    }

    on_destroy() {
        for (let i = 0; i < this.playground.players.length; i++) {
            if (this.playground.players[i] === this) {
                this.playground.players.splice(i, 1);
            }
        }
    }

}
