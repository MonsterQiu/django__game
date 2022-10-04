class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.platform.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $("#settings");
        this.$logout_click = $("#logout_click");
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

        this.start();
    }

    start() {
        this.getinfo();
        this.add_listening_events();
    }


    add_listening_events() {
        this.add_listening_events_login();
        this.add_listening_events_register();
        this.logout_click();
    }

    logout_click(){
        let outer = this;
        this.$logout_click.click(()=>{
            outer.logout_on_remote();
        });
    }

    add_listening_events_login() {
        let outer = this;
        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });

        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {  // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "http://127.0.0.1:8000/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                    window.location="http://127.0.0.1:8000/menu/";

                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote(){
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$login_error_message.empty();

        $.ajax({
            url:"http://127.0.0.1:8000/settings/register/",
            type:"get",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: (resp)=>{
                console.log(resp);
                if (resp.result === "success") {
                    location.reload();
                    window.location="http://127.0.0.1:8000/menu/";
                }else {
                    outer.$register_error_message.html(resp.result);
                }

            }
        })
    }

    logout_on_remote() {//远程服务器登出
        if (this.platform === "ACAPP") return false;
        $.ajax({
            url: "http://127.0.0.1:8000/settings/logout/",
            type: "get",
            success: (resp)=>{
                console.log(resp);
                if(resp.result === "success"){
                    location.reload();
                    window.location= "http://127.0.0.1:8000/log-in/";
                }
            }
        });
    }


    register() {  // 打开注册界面
        this.$login.hide();
        this.$register.show();
    }

    login() {  // 打开登录界面
        this.$register.hide();
        this.$login.show();
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