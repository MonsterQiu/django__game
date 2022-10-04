export class AymGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$aym = $('#' + id);
        this.settings = new Settings(this);
        this.menu = new AymMenu(this);

        this.AcWingOS = AcWingOS;
        this.playground = new AymPlayground(this);

        this.start();
    }

    start() {

    }

}
