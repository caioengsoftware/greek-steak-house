import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Variável global com a URL da API (mantida da base T-Burguer)
app.config.globalProperties.$apiUrl = process.env.VUE_APP_API_BASE_URL;

// Nome global da lanchonete acessível em todos os componentes
app.config.globalProperties.$nomeLanchonete = "Greek Steak House";

app.use(router).mount("#app");