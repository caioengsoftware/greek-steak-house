<template>
  <div id="config-pedido">
    <h1>🥙 Configure seu Pedido</h1>
    <pedido-component-vue :prato="pratoSelecionado" />
  </div>
</template>

<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      pratoSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;

    // Tenta pegar da query da URL primeiro
    if (query.prato) {
      const decodePrato = JSON.parse(decodeURIComponent(query.prato));
      this.pratoSelecionado = decodePrato;

    // Regra 4: fallback do localStorage se vier direto pela URL
    } else {
      const pratoStorage = localStorage.getItem("pedidoSelecionado");
      if (pratoStorage) {
        this.pratoSelecionado = JSON.parse(pratoStorage);
      }
    }
  },
};
</script>

<style scoped>
#config-pedido {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-family: "Georgia", serif;
  color: #1a1a2e;
  font-size: 32px;
  margin: 30px 0;
  border-bottom: 3px solid #f0c040;
  padding-bottom: 10px;
}
</style>