export class AymGame {
    constructor(id) {
        this.id = id;
        this.$aym = $('#' + id);
        this.menu = new AymMenu(this);
        this.playground = new AymPlayground(this);

        this.start();
    }

    start() {
    }
}
