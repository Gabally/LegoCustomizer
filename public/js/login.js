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
                        this.error = "Lo username o la password sono invalidi,";
                    }
                    else
                    {
                        this.error = "Si è verificato un errore sconosciuto.";
                    }
                }).catch(e => {
                    this.error = "Si è verificato un errore sconosciuto.";
                });
        }
    }
});