<template>
    <w-tabs :items="tabs">
        <template #item-content="{ item }">
            <w-flex v-if="item.title == 'Orders'" justify-center class="pa12 fill-width">
                <w-table :headers="tHeaders" :items="orders" fixed-headers class="fill-width">
                    <template #item-cell.id="{ item, label, header, index }">
                        <w-flex justify-center>
                            <w-button @click="showDetailsOrder(item)" class="ma1" bg-color="primary">
                                <w-icon class="mr1" md>
                                    mdi mdi-script-text
                                </w-icon>
                            </w-button>
                            <w-confirm @confirm="deleteOrder(item.id)" class="ma1" bg-color="warning">
                                <w-icon class="mr1" md>
                                    mdi mdi-delete
                                </w-icon>
                            </w-confirm>
                        </w-flex>
                    </template>
                </w-table>
            </w-flex>
            <w-flex v-if="item.title == 'Torso\'s'" justify-center no-grow class="pa12 fill-width">
                <w-table :headers="tHeaders" :items="torsoOrders" fixed-headers class="fill-width">
                    <template #item-cell.id="{ item, label, header, index }">
                        <w-flex justify-center>
                            <w-button @click="showDetailsTorso(item)" class="ma1" bg-color="primary">
                                <w-icon class="mr1" md>
                                    mdi mdi-script-text
                                </w-icon>
                            </w-button>
                            <w-confirm @confirm="deleteTorso(item.id)" class="ma1" bg-color="warning">
                                <w-icon class="mr1" md>
                                    mdi mdi-delete
                                </w-icon>
                            </w-confirm>
                        </w-flex>
                    </template>
                </w-table>
            </w-flex>
            <w-flex v-if="item.title == 'Bricks'" justify-center no-grow class="pa12 fill-width">
                <w-table :headers="tHeaders" :items="brickOrders" fixed-headers class="fill-width">
                    <template #item-cell.id="{ item, label, header, index }">
                        <w-flex justify-center>
                            <w-button @click="showDetailsBrick(item)" class="ma1" bg-color="primary">
                                <w-icon class="mr1" md>
                                    mdi mdi-script-text
                                </w-icon>
                            </w-button>
                            <w-confirm @confirm="deleteBrick(item.id)" class="ma1" bg-color="warning">
                                <w-icon class="mr1" md>
                                    mdi mdi-delete
                                </w-icon>
                            </w-confirm>
                        </w-flex>
                    </template>
                </w-table>
            </w-flex>
            <w-flex v-if="item.title == 'Options'" justify-center class="pa12 column">
                <notification-emails></notification-emails>
                <change-password></change-password>
            </w-flex>
            <w-alert v-if="error" error plain>{{ error }}</w-alert>
        </template>
    </w-tabs>
    <order-details @close="orderDetails = {}" v-if="!isEmpty(orderDetails)" :order="orderDetails.order"
        :imagePreviews="orderDetails.images" :title="orderDetails.title"></order-details>
</template>

<script>
import moment from "moment";
import NotificationEmails from "@/components/NotificationEmails.vue";
import ChangePassword from "@/components/ChangePassword.vue";
import OrderDetails from "@/components/OrderDetails.vue";

export default {
    name: "admin",
    inject: ["api", "axios"],
    components: {
        NotificationEmails,
        ChangePassword,
        OrderDetails
    },
    data() {
        return {
            error: "",
            tm: 0,
            orders: null,
            orders: [],
            torsoOrders: [],
            brickOrders: [],
            tHeaders: [
                { label: "Inserted", key: "inserted" },
                { label: "e-mail", key: "email" },
                { label: "Name", key: "name" },
                { label: "Phone", key: "phone" },
                { label: "#", key: "id" },
            ],
            orderDetails: {},
            tabs: [
                { title: 'Orders' },
                { title: 'Torso\'s' },
                { title: 'Bricks' },
                { title: 'Options' }
            ]
        }
    },
    async mounted() {
        this.refresh();
    },
    methods: {
        async refresh() {
            try {
                let response = await this.axios.get(this.api.READ_ORDERS);
                this.orders = response.data.map(this.formatDates);
            } catch {
                this.showError("An error occurred while loading the orders");
            }
            try {
                let response = await this.axios.get(this.api.READ_TORSOS);
                this.torsoOrders = response.data.map(this.formatDates);
            } catch {
                this.showError("An error occurred while loading the torso orders");
            }
            try {
                let response = await this.axios.get(this.api.READ_BRICKS);
                this.brickOrders = response.data.map(this.formatDates);
            } catch {
                this.showError("An error occurred while loading the bricks");
            }
        },
        formatDates(e) {
            e["inserted"] = moment(e["inserted"]).format('DD/MM/YYYY');
            return e;
        },
        showError(err) {
            clearTimeout(this.tm);
            this.error += err + ". ";
            this.tm = setTimeout(() => { this.error = "" }, 5000);
        },
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        showDetailsOrder(item) {
            this.orderDetails = {};
            this.orderDetails.title = "Order details"
            this.orderDetails.order = item;
            this.orderDetails.images = [];
        },
        showDetailsTorso(item) {
            this.orderDetails = {};
            this.orderDetails.title = "Torso Order details"
            this.orderDetails.order = item;
            this.orderDetails.images = [
                {
                    preview: item.front,
                    name: `front-torso-${item.name}.png`,
                    file: item.front
                },
                {
                    preview: item.back,
                    name: `back-torso-${item.name}.png`,
                    file: item.back
                }
            ];
        },
        showDetailsBrick(item) {
            this.orderDetails = {};
            this.orderDetails.title = "Brick Order details"
            this.orderDetails.order = item;
            this.orderDetails.images = [
                {
                    preview: item.preview,
                    name: `brick-mask-${item.name}.png`,
                    file: item.mask
                },
            ];
        },
        async deleteOrder(id) {
            try {
                await this.axios.delete(`${this.api.DELETE_ORDER}?id=${id}`);
            } catch {
                this.showError("An error occurred while deleting the order");
            }
            this.refresh();
        },
        async deleteTorso(id) {
            try {
                await this.axios.delete(`${this.api.DELETE_TORSO}?id=${id}`);
            } catch {
                this.showError("An error occurred while deleting the torso");
            }
            this.refresh();
        },
        async deleteBrick(id) {
            try {
                await this.axios.delete(`${this.api.DELETE_BRICK}?id=${id}`);
            } catch {
                this.showError("An error occurred while deleting the brick");
            }
            this.refresh();
        },
    }
}
</script>