import { createRouter, createWebHistory } from "vue-router";
import MenuView from "@/views/MenuView.vue";
import PedidosView from "@/views/PedidosView.vue";
import ConfiguracaoPedidoView from "@/views/ConfiguracaoPedidoView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: MenuView,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
  },
  {
    path: "/pedidos",
    name: "pedidos",
    component: PedidosView,
  },
  {
    path: "/config-pedido",
    name: "config-pedido",
    component: ConfiguracaoPedidoView,
    // Regra 4: redireciona automaticamente se não tiver pedido selecionado
    beforeEnter: (to, from, next) => {
      const pedidoSelecionado = localStorage.getItem("pedidoSelecionado");
      if (!pedidoSelecionado) {
        next({ name: "menu" });
      } else {
        next();
      }
    },
  },
  {
    // Regra 4: qualquer rota inválida volta pro menu
    path: "/:pathMatch(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;