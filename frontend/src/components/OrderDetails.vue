<template>
    <div id="order-info">
        <w-card :title="title" title-class="blue-light5--bg">
            <p>
            <div class="ma5">
                <span>Date:</span> {{ order.inserted }}
            </div>
            <div class="ma5">
                <span>Email:</span> {{ order.email }}
            </div>
            <div class="ma5">
                <span>Name:</span> {{ order.name }}
            </div>
            <div class="ma5">
                <span>Phone:</span> {{ order.phone }}
            </div>
            <div class="ma5">
                <span>Notes:</span> {{ order.notes }}
            </div>
            </p>
            <w-flex justify-center class="pa5 fill-width">
                <div v-for="img in imagePreviews">
                    <w-flex justify-center align-center class="pa5 fill-width column">
                        <img style="width: 60%" :src="`uploads/${img.preview}`">
                        <w-button @click="downloadFile(img.name, `uploads/${img.file}`)" class="ma1" bg-color="success">Download
                        </w-button>
                    </w-flex>
                </div>
            </w-flex>
            <w-flex justify-center class="pa3 fill-width">
                <w-button @click="$emit('close')" class="ma1" bg-color="primary">Close</w-button>
            </w-flex>
        </w-card>
    </div>
</template>

<script>
export default {
    name: 'OrderDetails',
    inject: ["axios"],
    props: {
        order: Object,
        imagePreviews: Array,
        title: String
    },
    methods: {
        downloadFile(name, url) {
            let link = document.createElement("a");
            link.href = url;
            link.download = name;
            link.click();
        },
    }
}
</script>

<style scoped>
#order-info {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0px;
    top: 0px;
    background: white;
    z-index: 9999999;
}
</style>