/*
$('#date-error').hide();
$('#data').on('change', function() {
    if (new Date(this.value) <=  new Date()){
        $("input[type=date]").val("")
        $('#date-error').show();
        document.getElementById('date-error').innerHTML = "La data deve essere futura";
    } else {
        $('#date-error').hide();
        document.getElementById('date-error').innerHTML = "";
    }  
});
*/
var app = new Vue({
    el: '#app',
    data: {
      error: null,
      email: null,
      note: null,
      date: null
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
        }
    }
});