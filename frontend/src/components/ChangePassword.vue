<template>
    <w-card title="Change password" title-class="blue-light5--bg" style="margin-top: 30px;" class="fill-width">
        <w-form @success="changePassword">
            <w-input v-model="oldPassword" :validators="[validators.validPassword]" type="password" label="Old Password" class="ma3"
                label-position="left" outline inner-icon-left="mdi mdi-lock">
            </w-input>
            <w-input v-model="newPassword" :validators="[validators.validPassword]" label="New Password" type="password" class="ma3"
                label-position="left" outline inner-icon-left="mdi mdi-lock">
            </w-input>
            <w-input :validators="[validators.validPassword,validators.match]" label="Repeat New Password" type="password" class="ma3"
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
</template>

<script>
export default {
    name: "ChangePassword",
    inject: ["api", "axios"],
    data() {
        return {
            isLoading: false,
            oldPassword: "",
            newPassword: "",
            error: "",
            validators: {
                validPassword: (el) => el.length >= 8 || "Password must be at least 8 characters in length",
                match: (el) => el == this.newPassword || "Passwords do not match"
            }
        }
    },
    methods: {
        async changePassword() {
            this.isLoading = true;
            try {
                let response = await this.axios.post(this.api.UPDATE_PASSWORD, {
                    password: this.oldPassword,
                    newPassword: this.newPassword
                });
                if (response.status == 201) {
                    this.$router.push({ name: "login" });
                }
                else {
                    this.error = response.data.error || "An unknown error occurred";
                }
            } catch (e) {
                this.error = "An unknown error occurred";
            }
            this.isLoading = false;

        }
    }
}
</script>