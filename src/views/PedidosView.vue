<template>
  <div id="pedidos-view">
    <h1>🥙 Pedidos Realizados</h1>
    <lista-pedido-component-vue />
  </div>
</template>

<script>
import ListaPedidoComponentVue from "@/components/ListaPedidoComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidoComponentVue,
  },
};
</script>

<style scoped>
#pedidos-view {
  max-width: 1100px;
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