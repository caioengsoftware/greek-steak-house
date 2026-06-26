<template>
  <div id="main-banner">
    <div id="banner-conteudo">
      <h1>🥙 Greek Steak House</h1>
      <p>Churrasco Grego Artesanal • Sabor Mediterrâneo Autêntico</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 40%,
    #0f3460 70%,
    #1a1a2e 100%
  );
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  overflow: hidden;
}

/* Efeito decorativo de chamas no fundo */
#main-banner::before {
  content: "🔥🏛️🔥";
  position: absolute;
  font-size: 120px;
  left: 40px;
  opacity: 0.15;
  letter-spacing: 10px;
}

#banner-conteudo {
  background: rgba(26, 26, 46, 0.85);
  padding: 30px 50px;
  border-radius: 100px 0px 0px 100px;
  border-left: 4px solid #f0c040;
}

#main-banner h1 {
  font-size: 38px;
  color: #f0c040;
  font-family: "Georgia", serif;
  margin: 0 0 8px 0;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

#main-banner p {
  font-size: 16px;
  color: #e0e0e0;
  font-family: "Georgia", serif;
  margin: 0;
  letter-spacing: 1px;
}
</style>