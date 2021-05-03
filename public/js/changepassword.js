var app = new Vue({
    el: '#app',
    data: {
      error1: null,
      username: null,
      newpassword: null,
      password: null,
      password2: null,
      error2: null
    },
    methods: {
        changeUsername()
        {
            fetch("/api/updateusername", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "same-origin"
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
                }).then(response => {
                    if (response.status == 200)
                    {
                        this.error1 = "";
                        this.username = "";
                        this.password = "";
                        this.showSnackbar("Username changed successfully");
                    }
                    else if (response.status == 401)
                    {
                        this.error1 = "The password is invalid.";
                    }
                    else
                    {
                        this.error1 = "An unknown error occoured.";
                    }
                }).catch(e => {
                    this.error1 = "An unknown error occoured.";
                });
        },
        changePassword()
        {
            fetch("/api/updatepassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    credentials: "same-origin"
                },
                body: JSON.stringify({
                    newpassword: this.newpassword,
                    password: this.password2
                })
                }).then(response => {
                    if (response.status == 200)
                    {
                        this.error2 = "";
                        this.newPassword = "";
                        this.password = "";
                        this.showSnackbar("Password changed successfully");
                    }
                    else if (response.status == 401)
                    {
                        this.error2 = "The password is invalid.";
                    }
                    else
                    {
                        this.error2 = "An unknown error occoured.";
                    }
                }).catch(e => {
                    this.error2 = "An unknown error occoured.";
                });
        },
        showSnackbar(text)
        {
            let data = {message: text};
            this.$refs.snackbarContainer.MaterialSnackbar.showSnackbar(data);
        },
        goback()
        {
            window.location.href= "/admin";
        }
    }
});