import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import urls from "../../api/urls.json"
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
        [urls.READ_ORDERS,
            urls.DELETE_ORDER,
            urls.READ_TORSOS,
            urls.DELETE_TORSO,
            urls.READ_BRICKS,
            urls.DELETE_BRICK,
            urls.READ_NOTIFICATION_EMAILS,
            urls.ADD_NOTIFICATION_EMAILS,
            urls.DELETE_NOTIFICATION_EMAIL,
            urls.UPDATE_PASSWORD
        ].forEach(url => {
            if (error.request.responseURL.includes(url)) {
                router.push({ name: "login" });
            }
        });
    }
    return Promise.reject(error);
  });

const app = createApp(App)

new WaveUI(app, {});  

app.provide("api", urls);
app.provide("axios", axios);
app.use(router)

app.mount('#app')
