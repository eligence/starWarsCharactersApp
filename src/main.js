import './assets/main.css'

import { createApp, ref } from 'vue'
import App from './App.vue'

const app = createApp(App)

let counter = ref(1)
app.config.globalProperties.$requestCounter = {
    count: counter,
    increment() { counter.value++ },
    reset() { counter.value = 1}
};

let error = ref('')
app.config.globalProperties.$error = {
    msg: error,
    setMessage(msg = '') {
        error.value = msg
    }
};

let showModal = ref(false)
app.config.globalProperties.$showModal = {
    value: showModal,
    set(value) {
        showModal.value = value
    }
};

app.mount('#app')

