import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// import Lara from '@/presets/lara';
import 'primevue/resources/themes/lara-light-green/theme.css';
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(PrimeVue);
app.mount('#app')
