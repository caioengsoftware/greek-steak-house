<template>
  <div>
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Prato</div>
          <div>Tamanho</div>
          <div>Pão / Carne</div>
          <div>Molhos / Adicionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <!-- Regra 3: aviso se não houver pedidos -->
    <div v-if="listaPedidosRealizados.length === 0" id="sem-pedidos">
      🥙 Nenhum pedido realizado ainda.
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.prato ? pedido.prato.nome : "--" }}</div>
      <div>{{ pedido.tamanho ? pedido.tamanho.descricao : "--" }}</div>
      <div>
        <span>🫓 {{ pedido.tipoPao ? pedido.tipoPao.descricao : "--" }}</span>
        <br />
        <span>🥩 {{ pedido.tipoCarne ? pedido.tipoCarne.descricao : "--" }}</span>
      </div>
      <div>
        <ul>
          <li v-for="(molho, index) in pedido.molhos" :key="'m' + index">
            🫙 {{ molho.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(adicional, index) in pedido.adicionais" :key="'a' + index">
            ➕ {{ adicional.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          @change="atualizarStatusPedido($event, pedido.id)"
          name="status"
          class="status"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <button
          @click="deletarPedido(pedido.id)"
          class="btn-deletar"
          title="Deletar pedido"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaPedidoComponent",
  inject: ["mostrarAlerta"],
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
    };
  },
  methods: {
    async consultarPedidos() {
      try {
        const response = await fetch(`${this.$apiUrl}/pedidos`);
        // Regra 4: atualização em tempo real
        this.listaPedidosRealizados = await response.json();
        this.mostrarAlerta(
          `${this.listaPedidosRealizados.length} pedido(s) carregado(s).`,
          "info"
        );
      } catch (error) {
        this.mostrarAlerta(
          "Erro ao carregar pedidos. Tente novamente.",
          "erro"
        );
        console.error(error);
      }
    },
    async consultarStatusPedido() {
      try {
        const response = await fetch(`${this.$apiUrl}/status_pedido`);
        this.listaStatusPedido = await response.json();
      } catch (error) {
        this.mostrarAlerta(
          "Erro ao carregar status dos pedidos.",
          "erro"
        );
        console.error(error);
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      try {
        const idPedidoAtualizado = event.target.value;
        const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
        await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: atualizacaoJson,
        });
        // Regra 3: alerta verde ao atualizar status
        this.mostrarAlerta("Status do pedido atualizado! ✅", "sucesso");
        // Regra 4: recarrega lista em tempo real
        await this.consultarPedidos();
      } catch (error) {
        this.mostrarAlerta("Erro ao atualizar status.", "erro");
        console.error(error);
      }
    },
    async deletarPedido(idPedido) {
      try {
        await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
          method: "DELETE",
        });
        // Regra 3: alerta verde ao deletar
        this.mostrarAlerta("Pedido removido com sucesso!", "sucesso");
        // Regra 4: atualiza lista em tempo real sem recarregar a página
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (p) => p.id !== idPedido
        );
      } catch (error) {
        this.mostrarAlerta("Erro ao deletar pedido.", "erro");
        console.error(error);
      }
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>

<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #f0c040;
  background-color: #1a1a2e;
  color: #f0c040;
  font-family: "Georgia", serif;
  border-radius: 8px 8px 0 0;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 15%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #f0c040;
  align-items: center;
  transition: background 0.3s;
}

.pedidos-tabela-linha:hover {
  background-color: #fdf6ec;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

#sem-pedidos {
  text-align: center;
  padding: 40px;
  font-size: 20px;
  color: #888;
  font-family: "Georgia", serif;
}

.divider {
  height: 1px;
  background-color: #f0c040;
  margin: 6px 0;
  width: 80%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

ul li {
  font-size: 13px;
  color: #444;
}

.status {
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #f0c040;
  font-size: 12px;
  cursor: pointer;
}

.btn-deletar {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-deletar:hover {
  transform: scale(1.3);
}
</style>