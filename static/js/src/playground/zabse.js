class AymPlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);

        this.hide();

        this.start();
    }

    get_random_color() {
        let colors = ["blue", "green", "pink", "red", "white", "grey"];
        return colors[Math.floor(Math.random() * 6)];
    }


    start() {
    }

    show() {  // 打开playground界面
        this.$playground.show();
        this.root.$aym.append(this.$playground);
        this.width = this.$playground.width();

        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.055, "#B0E2FF", this.height * 0.15, true));

        for (let i = 0; i < 6; i++) {
            this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.055, this.get_random_color(), this.height * 0.15, false));
        }

    }

    hide() {  // 关闭playground界面
        this.$playground.hide();
    }
}
