<template>
  <div>
    <h1>🥙 Nosso Menu</h1>
    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="prato in listaMenuPratos"
        :key="prato.id"
      >
        <div id="card-linha">
          <div class="foto-prato">
            <img :src="prato.foto" />
            <div class="card-coluna">
              <p id="nome-content">{{ prato.nome }}</p>
              <p id="preco-content">R$ {{ prato.valor }},00</p>
              <p id="descricao-content">{{ prato.descricao }}</p>
              <button @click="selecionarPrato(prato)">🔥 Pedir Agora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  inject: ["mostrarAlerta"],
  data() {
    return {
      listaMenuPratos: [],
    };
  },
  methods: {
    async consultarMenu() {
      try {
        const response = await fetch(`${this.$apiUrl}/menu`);
        const dados = await response.json();
        // Regra 4: atualização em tempo real
        this.listaMenuPratos = dados.burgues;
        if (this.listaMenuPratos.length === 0) {
          this.mostrarAlerta("Nenhum prato disponível no momento.", "aviso");
        } else {
          this.mostrarAlerta(
            `${this.listaMenuPratos.length} pratos carregados com sucesso!`,
            "info"
          );
        }
      } catch (error) {
        this.mostrarAlerta(
          "Erro ao carregar o menu. Tente novamente.",
          "erro"
        );
        console.error(error);
      }
    },
    selecionarPrato(pratoSelecionado) {
      // Regra 4: salva no localStorage para o guard de rota funcionar
      localStorage.setItem(
        "pedidoSelecionado",
        JSON.stringify(pratoSelecionado)
      );
      const param = JSON.stringify(pratoSelecionado);
      const pratoJson = encodeURIComponent(param);
      this.mostrarAlerta(
        `${pratoSelecionado.nome} selecionado! Configure seu pedido.`,
        "info"
      );
      this.$router.push({
        path: "/config-pedido",
        query: { prato: pratoJson },
      });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
h1 {
  font-family: "Georgia", serif;
  color: #1a1a2e;
  font-size: 36px;
  margin: 30px 0;
}

#card-content {
  display: inline-block;
  width: 280px;
  min-height: 500px;
  margin: 20px;
  border: 1px solid #f0c040;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(240, 192, 64, 0.3);
  position: relative;
  background-color: #fff;
  vertical-align: top;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 900px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -20px grey;
}

#nome-content {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px 0;
  font-family: "Georgia", serif;
  color: #1a1a2e;
  white-space: normal;
}

.foto-prato {
  flex-shrink: 0;
}

.foto-prato img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

#preco-content {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #c0392b;
}

#descricao-content {
  font-size: 14px;
  text-align: left;
  color: gray;
  margin: 16px;
  white-space: pre-line;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.card-linha {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.card-coluna {
  flex-grow: 1;
  padding: 15px;
  height: 100%;
}

.card-coluna button {
  padding: 10px;
  width: 100%;
  border-radius: 10px;
  border: none;
  color: white;
  background-color: #c0392b;
  cursor: pointer;
  transition: 0.5s;
  font-size: 15px;
  font-weight: bold;
}

.card-coluna button:hover {
  background-color: #922b21;
  color: #f0c040;
}
</style>