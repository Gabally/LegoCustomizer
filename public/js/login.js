var app = new Vue({
    el: '#app',
    data: {
      error: null,
      username: null,
      password: null
    },
    methods: {
        submitForm()
        {
            fetch("/api/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
                }).then(response => {
                    if (response.status == 200)
                    {
                        window.location.href = "/admin";
                    }
                    else if (response.status == 401)
                    {
                        this.error = "The username or password is invalid.";
                    }
                    else
                    {
                        this.error = "An unknown error occoured.";
                    }
                }).catch(e => {
                    this.error = "An unknown error occoured.";
                });
        }
    }
});