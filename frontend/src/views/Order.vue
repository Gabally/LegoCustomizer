<template>
    <div id="orderform">
        <div id="form">
            <form v-on:submit.prevent="submit">
                <h1>Ordine</h1>
                <div class="field">
                    <label for="email">Email di contatto</label><br>
                    <input type="email" class="textfield" maxlength="320" required id="email" v-model="email"
                        name="email" autofocus placeholder="email@domain.com">
                </div>
                <div class="field">
                    <label for="data">Nome</label><br>
                    <input type="text" class="textfield" maxlength="40" v-model="name" required name="cname"
                        spellcheck="false" placeholder="Name" id="cname">
                </div>
                <div class="field">
                    <label for="data">Telefono</label><br>
                    <input type="tel" class="textfield" required name="phone" maxlength="20" v-model="phone"
                        placeholder="phone" id="Phone">
                </div>
                <div class="field">
                    <label for="data">Note sull'ordine</label><br>
                    <textarea placeholder="Notes" spellcheck="false" name="note" v-model="notes" maxlength="1000"
                        class="textfield" cols="30" required rows="10"></textarea>
                </div>
                <div class="field">
                    <input type="image" v-if="submitStatus == sStats.WAITING || submitStatus == sStats.ERROR"
                        id="buybutton" src="imgs/check-bold.svg" alt="">
                </div>
                <div class="error" v-if="submitStatus == sStats.ERROR">
                    Si è verificato un errore sconosciuto.
                </div>
                <div class="falign" v-if="submitStatus == sStats.LOADING">
                    <div class="loader">
                    </div>
                </div>
                <div class="success" v-if="submitStatus == sStats.SUCCESS">
                    Il tuo ordine è stato inoltrato correttamente &#x2705;.
                    <br>
                    Puoi chiudere la finestra.
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderForm',
    inject: ["axios", "api"],
    data() {
        return {
            email: null,
            name: null,
            phone: null,
            notes: null,
            sStats: {
                WAITING: "W",
                LOADING: "L",
                ERROR: "E",
                SUCCESS: "S"
            },
            submitStatus: "W"
        }
    },
    methods: {
        async submit() {
            try {
                this.submitStatus = this.sStats.LOADING;
                let data = {
                    email: this.email,
                    name: this.name,
                    phone: this.phone,
                    notes: this.notes
                }
                let response = await this.axios.post(this.api.SUBMIT_ORDER, data);
                response.status == 201 ? this.submitStatus = this.sStats.SUCCESS : this.submitStatus = this.sStats.ERROR;
            } catch(e) {
                console.error(e);
                this.submitStatus = this.sStats.ERROR;
            }
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mulish&display=swap');

#orderform {
    font-size: 15pt;
    background: rgba(33, 33, 33, 1);
    font-weight: bold;
    height: 100vh;
}

#form {
    text-align: center;
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue', 'Arial', sans-serif;
    color: #FEFFFF;
    padding: 20px;
    background-color: rgba(33, 33, 33, 1);
}

.field {
    margin-top: 3%;
    margin-bottom: 40px;
    text-align: center;
}

.textfield {
    font-family: 'Mulish', sans-serif;
    margin-top: 10px;
    font-size: 16px;
    background-color: rgba(133, 131, 131, 0.678);
    color: white;
    outline: none;
    border: none;
    padding: 3px;
    border: 1px solid rgb(80, 79, 79);
    border-radius: 3px;
}

#notes {
    resize: none;
    width: 60%;
    font-size: 11pt;
}

.falign {
    display: flex;
    justify-content: center;
}

#cancelbtn {
    width: 60px;
    height: 60px;
    background-color: rgba(238, 55, 55, 0.863);
    border-radius: 10px;
}

#cancelbtn:hover {
    transform: translateY(-1px);
    background-color: rgba(185, 21, 21, 0.863);
}

#cancelbtn:active {
    transform: translateY(2px);
    background-color: rgba(163, 14, 14, 0.863);
}

#buybutton {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    background-color: rgb(28, 170, 28);
}

#buybutton:hover {
    transform: translateY(-1px);
    background-color: rgb(27, 139, 27);
}

#buybutton:active {
    transform: translateY(2px);
    background-color: rgb(14, 122, 14);
}

.error {
    margin: 20px;
    color: red;
    font-weight: bold;
    font-size: 13pt;
}

.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 60px;
    height: 60px;
    -webkit-animation: spin 2s linear infinite;
    /* Safari */
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.success {
    color: green;
    font-weight: bold;
    font-size: 13pt;
    margin: 40px;
}
</style>
    