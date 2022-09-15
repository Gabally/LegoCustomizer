<template>
    <w-card title="Notification emails" title-class="blue-light5--bg" class="fill-width">
        <w-form @success="addEmail()">
            <w-flex justify-center class="row">
                <w-input v-model="newEmail" type="email" class="mb2" :validators="[validators.isEmail]" label="Add email" label-position="left" outline
                    inner-icon-left="mdi mdi-email">
                </w-input>
                <w-button :loading="isLoading"  style="margin-bottom: 10px;" type="submit" class="ma1" bg-color="primary">
                    <w-icon class="mr1" md>
                        mdi mdi-bell-plus
                    </w-icon>
                </w-button>
            </w-flex>
        </w-form>
        <w-list :items="notificationEmails" color="primary">
            <template #item="{ item }">
                <span>{{ item.email }}</span>
                <div class="spacer"></div>
                <w-button @click="deleteEmail(item.id)" class="ma1" bg-color="warning">
                    <w-icon class="mr1" md>
                        mdi mdi-delete
                    </w-icon>
                </w-button>
            </template>
        </w-list>
    </w-card>
</template>

<script>

export default {
    name: "NotificationEmails",
    inject: ["api", "axios"],
    data() {
        return {
            notificationEmails: [],
            newEmail: "",
            isLoading: false,
            validators: {
                isEmail: (el) => this.validateEmail(el) || "Must be a valid email!"
            }
        }
    },
    async mounted() {
        this.refreshEmails();
    },
    methods: {
        async refreshEmails() {
            let response = await this.axios.get(this.api.READ_NOTIFICATION_EMAILS);
            this.notificationEmails = response.data;
        },
        async addEmail() {
            this.isLoading = true;
            try {
                let response = await this.axios.post(this.api.ADD_NOTIFICATION_EMAILS, {
                    email: this.newEmail
                });
                if (response.status == 200) {
                    this.notificationEmails = response.data;
                    this.newEmail = "";
                }
                else {
                    this.error = "An unknown error occurred";
                }
            } catch (e) {
                this.error = "An unknown error occurred";
            }
            this.isLoading = false;
        },
        async deleteEmail(id) {
            try {
                let response = await this.axios.delete(`${this.api.DELETE_NOTIFICATION_EMAIL}?id=${id}`);
                if (response.status == 200) {
                    this.notificationEmails = response.data;
                    this.newEmail = "";
                }
                else {
                    this.error = "An unknown error occurred";
                }
            } catch (e) {
                this.error = "An unknown error occurred";
            }
        },
        validateEmail(email) {
            const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return res.test(String(email).toLowerCase());
        }
    }
}
</script>