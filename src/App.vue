<template>
  <div>
    <NavBarComponent />
    <BannerComponent />

    <!-- Regra 3: Alerta reativo global com cores -->
    <div v-if="alerta.visivel" :class="['alerta-global', `alerta-${alerta.tipo}`]">
      <span>{{ alerta.mensagem }}</span>
      <button @click="fecharAlerta">✕</button>
    </div>

    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "./components/NavBarComponent.vue";
import BannerComponent from "./components/BannerComponent.vue";

export default {
  name: "App",
  components: {
    NavBarComponent,
    BannerComponent,
  },
  data() {
    return {
      alerta: {
        visivel: false,
        mensagem: "",
        tipo: "info", // erro | aviso | info | sucesso
      },
    };
  },
  methods: {
    mostrarAlerta(mensagem, tipo = "info") {
      this.alerta.mensagem = mensagem;
      this.alerta.tipo = tipo;
      this.alerta.visivel = true;

      // Fecha automaticamente após 4 segundos
      setTimeout(() => {
        this.alerta.visivel = false;
      }, 4000);
    },
    fecharAlerta() {
      this.alerta.visivel = false;
    },
  },
  provide() {
    return {
      mostrarAlerta: this.mostrarAlerta,
    };
  },
};
</script>

<style>
#app {
  font-family: "Georgia", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fdf6ec;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #c0392b;
}

/* ===== Regra 3: Alertas reativos com cores ===== */
.alerta-global {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  margin: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 15px;
  animation: fadeIn 0.3s ease;
}

.alerta-global button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: inherit;
  font-weight: bold;
}

/* 🔴 Erro */
.alerta-erro {
  background-color: #fdecea;
  color: #c0392b;
  border-left: 5px solid #c0392b;
}

/* 🟠 Aviso */
.alerta-aviso {
  background-color: #fff4e5;
  color: #e67e22;
  border-left: 5px solid #e67e22;
}

/* 🔵 Info */
.alerta-info {
  background-color: #e8f4fd;
  color: #2980b9;
  border-left: 5px solid #2980b9;
}

/* 🟢 Sucesso */
.alerta-sucesso {
  background-color: #eafaf1;
  color: #27ae60;
  border-left: 5px solid #27ae60;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>