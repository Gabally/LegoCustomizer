var app = new Vue({
    el: '#app',
    data: {
      error: null,
      email: null,
      notes: null,
      date: null,
      sStats: {
        WAITING: "W",
        LOADING: "L",
        ERROR: "E",
        SUCCESS: "S"
      },
      submitStatus: "W"
    },
    methods: {
        verifyDate()
        {
            let date = new Date(this.$refs.datepicker.value);
            if (date <= new Date())
            {
                this.error = "La data deve essere futura.";
                this.$refs.datepicker.value = "";
            }
            else
            {
                this.error = "";
            }
        },
        submitOrder()
        {
            this.submitStatus = this.sStats.LOADING;
            fetch("/api/placeorder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: this.email,
                date: this.date,
                notes: this.notes,
            })
            }).then(response => {
                if (response.status == 201)
                {
                    this.submitStatus = this.sStats.SUCCESS;
                }
                else
                {
                    this.submitStatus = this.sStats.ERROR;
                }
            }).catch(e => {
                this.submitStatus = this.sStats.ERROR;
            });
        }
    }
});