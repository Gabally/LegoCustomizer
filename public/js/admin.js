var app = new Vue({
    el: '#app',
    data: {
      orders: null,
      orders: [],
      torsoOrders: [],
      order: {},
      torso: {}
    },
    methods: {
        isEmpty(obj) {
            return Object.keys(obj).length === 0;
        },
        fetchOrders()
        {
            fetch("/api/orders", {
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => this.orders = data.orders.sort((a, b) => {
                if (a.id < b.id)
                {
                    return 1;
                }
                if (a.id > b.id)
                {
                    return -1;
                }
                return 0;
            }));
        },
        fetchTorsos()
        {
            fetch("api/ordersminifig", {
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => this.torsoOrders = data.orders.sort((a, b) => {
                if (a.id < b.id)
                {
                    return 1;
                }
                if (a.id > b.id)
                {
                    return -1;
                }
                return 0;
            }));
        },
        viewOrder(id)
        {
            fetch(`/api/order?id=${id}`, {
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => this.order = data.order);
        },
        viewTorso(id)
        {
            fetch(`/api/orderminifig?id=${id}`, {
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => this.torso = data.order);
        },
        deleteOrder(id)
        {
            let cofirmed = confirm("Sei sicuro di voler eliminare l'ordine ?");
            if (cofirmed)
            {
                fetch(`/api/order?id=${id}`, {
                    method: "DELETE",
                    credentials: "same-origin"
                })
                .then(response => {
                    if (response.status === 200)
                    {
                        this.order = {};
                        this.showSnackbar("Ordine eliminato");
                        this.fetchOrders();
                    }
                    else
                    {
                        this.showSnackbar("Si è verificato un errore sconosciuto");
                    }
                }).catch(e => {this.showSnackbar("Si è verificato un errore sconosciuto")});
            }
        },
        deleteTorso(id)
        {
            let cofirmed = confirm("Sei sicuro di voler eliminare l'ordine ?");
            if (cofirmed)
            {
                fetch(`/api/orderminifig?id=${id}`, {
                    method: "DELETE",
                    credentials: "same-origin"
                })
                .then(response => {
                    if (response.status === 200)
                    {
                        this.torso = {};
                        this.showSnackbar("Torso eliminato");
                        this.fetchTorsos();
                    }
                    else
                    {
                        this.showSnackbar("Si è verificato un errore sconosciuto");
                    }
                }).catch(e => {this.showSnackbar("Si è verificato un errore sconosciuto")});
            }
        },
        showSnackbar(text)
        {
            let data = {message: text};
            this.$refs.snackbarContainer.MaterialSnackbar.showSnackbar(data);
        },
        downloadFile(name, url)
        {
            let link = document.createElement("a");
            link.href = url;
            link.download = name;
            link.click();
        }
    },
    mounted: function(){
        this.fetchOrders();
        this.fetchTorsos();
    }
});