<template>
  <div>
    <form id="pedido-form" @submit="criarPedido($event)">

      <div>
        <p id="nome-prato-content">
          {{ prato && prato.nome ? prato.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="prato && prato.foto ? prato.foto : ''"
        />
      </div>

      <div id="form-pedido">

        <div class="inputs">
          <label>👤 Nome do Cliente *</label>
          <input
            v-model="nomeCliente"
            type="text"
            placeholder="Digite seu nome completo"
            id="nome-cliente"
            required
          />
          <span class="campo-obrigatorio" v-if="erroNome">
            ⚠️ Nome é obrigatório!
          </span>
        </div>

        <div class="inputs">
          <label>📏 Tamanho</label>
          <select v-model="tamanhoSelecionado" id="tamanho">
            <option value="" selected>Selecione o tamanho</option>
            <option
              v-for="tamanho in listaTamanhos"
              :key="tamanho.id"
              :value="tamanho"
            >
              {{ tamanho.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label>🫓 Tipo de Pão</label>
          <select v-model="tipoPaoSelecionado" id="tipo-pao">
            <option value="" selected>Selecione o pão</option>
            <option
              v-for="pao in listaTiposPao"
              :key="pao.id"
              :value="pao"
            >
              {{ pao.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label>🥩 Tipo de Carne</label>
          <select v-model="tipoCarnesSelecionado" id="tipo-carne">
            <option value="" selected>Selecione a carne</option>
            <option
              v-for="carne in listaTiposCarnes"
              :key="carne.id"
              :value="carne"
            >
              {{ carne.descricao }}
            </option>
          </select>
        </div>

        <div class="inputs">
          <label id="opcionais-titulo">🫙 Selecione os Molhos</label>
          <div
            v-for="molho in listaMolhos"
            :key="molho.id"
            class="checkbox-container"
          >
            <input
              type="checkbox"
              :name="molho.nome"
              :value="molho"
              v-model="listaMolhosSelecionados"
            />
            <span>{{ molho.nome }}</span>
          </div>
        </div>

        <div class="inputs">
          <label id="opcionais-titulo">➕ Selecione os Adicionais</label>
          <div
            v-for="adicional in listaAdicionais"
            :key="adicional.id"
            class="checkbox-container"
          >
            <input
              type="checkbox"
              :name="adicional.nome"
              :value="adicional"
              v-model="listaAdicionaisSelecionados"
            />
            <span>{{ adicional.nome }}</span>
          </div>
        </div>

        <div class="inputs">
          <input
            type="submit"
            class="submit-btn"
            value="🔥 Confirmar Pedido"
          />
        </div>

      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PedidoComponent",
  inject: ["mostrarAlerta"],
  props: {
    prato: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaTiposPao: [],
      listaTiposCarnes: [],
      listaMolhos: [],
      listaAdicionais: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      tipoPaoSelecionado: "",
      tipoCarnesSelecionado: "",
      listaMolhosSelecionados: [],
      listaAdicionaisSelecionados: [],
      erroNome: false,
    };
  },
  methods: {
    async getOpcionais() {
      try {
        const response = await fetch(`${this.$apiUrl}/opcionais`);
        const dados = await response.json();
        this.listaTamanhos = dados.tamanhos || [
          { id: 1, descricao: "Pequeno" },
          { id: 2, descricao: "Médio" },
          { id: 3, descricao: "Grande" },
        ];
        this.listaTiposPao = dados.tipos_pao || [
          { id: 1, descricao: "Pão Sírio" },
          { id: 2, descricao: "Pão Pita" },
          { id: 3, descricao: "Folha (sem pão)" },
        ];
        this.listaTiposCarnes = dados.tipos_carnes || [
          { id: 1, descricao: "Frango" },
          { id: 2, descricao: "Cordeiro" },
          { id: 3, descricao: "Misto (Frango + Cordeiro)" },
        ];
        this.listaMolhos = dados.molhos || [
          { id: 1, nome: "Tahine" },
          { id: 2, nome: "Tzatziki" },
          { id: 3, nome: "Homus" },
        ];
        this.listaAdicionais = dados.adicionais || [
          { id: 1, nome: "Queijo" },
          { id: 2, nome: "Bacon" },
          { id: 3, nome: "Ovo" },
        ];
        this.mostrarAlerta("Opções carregadas com sucesso!", "info");
      } catch (error) {
        this.listaTamanhos = [
          { id: 1, descricao: "Pequeno" },
          { id: 2, descricao: "Médio" },
          { id: 3, descricao: "Grande" },
        ];
        this.listaTiposPao = [
          { id: 1, descricao: "Pão Sírio" },
          { id: 2, descricao: "Pão Pita" },
          { id: 3, descricao: "Folha (sem pão)" },
        ];
        this.listaTiposCarnes = [
          { id: 1, descricao: "Frango" },
          { id: 2, descricao: "Cordeiro" },
          { id: 3, descricao: "Misto (Frango + Cordeiro)" },
        ];
        this.listaMolhos = [
          { id: 1, nome: "Tahine" },
          { id: 2, nome: "Tzatziki" },
          { id: 3, nome: "Homus" },
        ];
        this.listaAdicionais = [
          { id: 1, nome: "Queijo" },
          { id: 2, nome: "Bacon" },
          { id: 3, nome: "Ovo" },
        ];
        this.mostrarAlerta("Usando dados locais. API indisponível.", "aviso");
      }
    },
    async criarPedido(e) {
      e.preventDefault();
      if (!this.nomeCliente.trim()) {
        this.erroNome = true;
        this.mostrarAlerta("Nome do cliente é obrigatório!", "erro");
        return;
      }
      if (!this.tamanhoSelecionado || !this.tipoPaoSelecionado || !this.tipoCarnesSelecionado) {
        this.mostrarAlerta("Atenção: preencha tamanho, pão e carne!", "aviso");
        return;
      }
      this.erroNome = false;
      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        tipoPao: this.tipoPaoSelecionado,
        tipoCarne: this.tipoCarnesSelecionado,
        molhos: Array.from(this.listaMolhosSelecionados),
        adicionais: Array.from(this.listaAdicionaisSelecionados),
        prato: this.prato,
        statusId: 5,
      };
      try {
        const req = await fetch(`${this.$apiUrl}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido),
        });
        if (req.ok) {
          this.mostrarAlerta(
            `Pedido de ${this.nomeCliente} confirmado! 🥙🔥`,
            "sucesso"
          );
          localStorage.removeItem("pedidoSelecionado");
          setTimeout(() => {
            this.$router.push({ name: "pedidos" });
          }, 2000);
        } else {
          this.mostrarAlerta("Erro ao enviar pedido. Tente novamente.", "erro");
        }
      } catch (error) {
        this.mostrarAlerta("Erro de conexão. Verifique sua internet.", "erro");
        console.error(error);
      }
    },
  },
  mounted() {
    this.getOpcionais();
  },
};
</script>

<style scoped>
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-prato-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
  font-family: "Georgia", serif;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  display: flex;
  border-left: 4px solid #f0c040;
  font-family: "Georgia", serif;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.campo-obrigatorio {
  color: #c0392b;
  font-size: 13px;
  font-weight: bold;
  margin-top: 4px;
  padding-left: 8px;
}

.submit-btn {
  background-color: #1a1a2e;
  color: #f0c040;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #f0c040;
  color: #1a1a2e;
}
</style>