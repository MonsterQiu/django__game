class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.platform.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $("#settings");
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");

        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$register.hide();

        this.root.$aym.append(this.$settings);

        console.log(this.$settings);

        this.start();
    }

    start() {
        this.getinfo();
    }

    register(){

    }

    login(){

    }
    getinfo() {
        let outer = this;
        $.ajax({
            url: "http://127.0.0.1:8000/settings/getinfo/",
            type: "get",
            data: {
                platform: outer.platform,
            },
            success: (resp)=>{
                console.log(resp);
                if(resp.result == "success"){
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                }else {
                    outer.login();
                }
            }
        })
    }

    hide(){}
    show(){}
}