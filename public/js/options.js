var app = new Vue({
    el: '#app',
    data: {
      error1: null,
      username: null,
      newpassword: null,
      password: null,
      password2: null,
      error2: null,
      emails: [],
      emailsPlaceholder: null
    },
    mounted: function(){
        this.fetchNotifyEmails();
    },
    methods: {
        changeUsername()
        {
            fetch("/api/updateusername", {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
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
                        this.showSnackbar("Username cambiato con successo");
                    }
                    else if (response.status == 401)
                    {
                        this.error1 = "La password è invalida.";
                    }
                    else
                    {
                        this.error1 = "Si è verificato un errore sconosciuto.";
                    }
                }).catch(e => {
                    this.error1 = "Si è verificato un errore sconosciuto.";
                });
        },
        changePassword()
        {
            fetch("/api/updatepassword", {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newpassword: this.newpassword,
                    password: this.password2
                })
                }).then(response => {
                    if (response.status == 200)
                    {
                        this.error2 = "";
                        this.newpassword = "";
                        this.password2 = "";
                        this.showSnackbar("Password changed successfully");
                    }
                    else if (response.status == 401)
                    {
                        this.error2 = "La password è invalida.";
                    }
                    else
                    {
                        this.error2 = "Si è verificato un errore sconosciuto.";
                    }
                }).catch(e => {
                    this.error2 = "Si è verificato un errore sconosciuto.";
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
        },
        fetchNotifyEmails()
        {
            this.emailsPlaceholder = "";
            fetch("/api/notifyemails", {
                credentials: "same-origin",
            }).then(response => response.json())
            .then(data => {;
                if (data.emails.length == 0)
                {   
                    this.emailsPlaceholder = "Non è ancora presente alcuna email";
                }
                else
                {
                    this.emailsPlaceholder = "";
                    this.emails = data.emails;
                }
            })
            .catch(e => {
                this.emailsPlaceholder = "Si è verificato un errore sconosciuto.";
            });
        },
        updateServerMailList(cb)
        {
            this.emailsPlaceholder = "";
            fetch("/api/notifyemails", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emails: this.emails
                })
            }).then(response => {
                if (response.status == 200)
                {
                    this.showSnackbar("Email aggiornate con successo");
                }
                else if (response.status == 401)
                {
                    this.showSnackbar("Si è verificato un errore (la tua sessione potrebbe essere scaduta)");
                }
                else
                {
                    this.showSnackbar("Si è verificato un errore sconosciuto");
                }
                cb();
            })
            .catch(e => {
                this.showSnackbar("Si è verificato un errore sconosciuto");
            });
        },
        addNewEmail()
        {
            this.emailsPlaceholder = "";
            this.emails.push(this.$refs.emailInput.value);
            this.$refs.emailInput.value = "";
            this.updateServerMailList(()=>{
                this.fetchNotifyEmails();
            });
        },
        deleteEmail(index)
        {
            this.emails.splice(index, 1);
            this.updateServerMailList(()=>{
                this.fetchNotifyEmails();
            });
        }
    }
});