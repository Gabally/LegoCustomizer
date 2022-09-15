<template>
    <w-flex justify-center no-grow class="pa12">
        <w-card title="Administration Login" title-class="blue-light5--bg">
            <w-form @success="submitForm">
                <w-input v-model="username" :validators="[validators.required]" label="Username" class="ma3" label-position="left" outline
                    inner-icon-left="mdi mdi-account">
                </w-input>
                <w-input v-model="password" :validators="[validators.required]" label="Password" type="password" class="ma3"
                    label-position="left" outline inner-icon-left="mdi mdi-lock">
                </w-input>
                <w-flex justify-center no-grow>
                    <w-button :loading="isLoading" class="ma3" type="submit" shadow>Submit</w-button>
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
    name: "login",
    inject: ["api", "axios"],
    data() {
        return {
            error: null,
            username: null,
            password: null,
            validators: {
                required: value => !!value || 'This field is required'
            },
            isLoading: false
        }
    },
    async mounted() {
        try {
            let response = await this.axios.get(this.api.CAN_LOGIN);
            console.log(response.data);
            if (response.status == 200 && !response.data) {
                this.$router.push({ name: "setCredentials" });
            }
        } catch {}
    },
    methods: {
        async submitForm() {
            this.isLoading = true;
            try {
                let response = await this.axios.post(this.api.LOGIN, {
                    username: this.username,
                    password: this.password
                });
                if (response.status == 200) {
                    this.$router.push("/admin");
                } else {
                    this.error = "An error occurred";
                }
            } catch (err) {
                this.isLoading = false;
                if (err.response && err.response.status == 401) {
                    this.error = "Wrong credentials";
                } else {
                    this.error = "An unknown error occurred";
                }
            }
            this.isLoading = false;
        }

    }
}
</script>