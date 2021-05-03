var app = new Vue({
    el: '#app',
    data: {
      error: null,
      username: null,
      password: null,
      password2: null
    },
    methods: {
        submitForm()
        {
            if (this.password === this.password2)
            {
                fetch("/api/setcredentials", {
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
                            window.location.reload();
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
    }
});