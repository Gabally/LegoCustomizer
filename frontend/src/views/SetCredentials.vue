<template>
    <w-flex justify-center no-grow class="pa12">
        <w-card title="Initial Configuration" title-class="blue-light5--bg">
            <w-form @success="submitForm">
                <w-input v-model="username" :validators="[validators.required]" label="Username" class="ma3"
                    label-position="left" outline inner-icon-left="mdi mdi-account">
                </w-input>
                <w-input v-model="password" :validators="[validators.required]" label="Password" type="password"
                    class="ma3" label-position="left" outline inner-icon-left="mdi mdi-lock">
                </w-input>
                <w-input :validators="[validators.match]" label="Repeat Password" type="password" class="ma3"
                    label-position="left" outline inner-icon-left="mdi mdi-lock">
                </w-input>
                <w-flex justify-center no-grow>
                    <w-button :loading="isLoading" class="ma3" type="submit" shadow>Submit</w-button>
                    <w-tooltip right>
                        <template #activator="{ on }">
                            <w-icon class="ma2" v-on="on" xl color="primary-light2">
                                mdi mdi-information-outline
                            </w-icon>
                        </template>
                        No account has been setup yet, so you must create one
                    </w-tooltip>
                </w-flex>
                <w-alert v-if="error" :error="true">
                    {{ error }}
                </w-alert>
            </w-form>
        </w-card>
    </w-flex>
</template>

<script>
export default {
    name: "setcredentials",
    inject: ["api", "axios"],
    data() {
        return {
            error: null,
            username: null,
            password: null,
            isLoading: false,
            validators: {
                required: value => !!value || 'This field is required',
                match: value => value == this.password || 'Passwords must match!'
            }
        }
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            try {
                let response = await this.axios.post(this.api.SET_CREDENTIALS, {
                    username: this.username,
                    password: this.password
                });
                if (response.status == 201) {
                    this.$router.push({ name: "login" });
                }
            } catch (err) {
                this.isLoading = false;
                if (err.response && err.response.status == 401) {
                    this.error = "User account already setup, please login";
                    setTimeout(() => {
                        this.$router.push("/login");
                    }, 5000);
                } else {
                    this.error = "An unknown error occurred";
                }
            }
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#loginform {
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    box-shadow: 3px 4px 3px 2px rgba(158, 158, 158, 0.377);
    margin-top: 10px;
}

.error {
    color: red;
    font-weight: bold;
    font-size: 12pt;
}
</style>