export class AymGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$aym = $('#' + id);
        this.settings = new Settings(this);
        this.menu = new AymMenu(this);

        this.AcWingOS = AcWingOS;
        this.playground = new AymPlayground(this);
        this.$logout_click = $("#logout_click");
        this.$logout_click.click(()=>{
            this.settings.logout_on_remote();
            location.reload();

        });

        this.start();
    }

    start() {
    }
}
