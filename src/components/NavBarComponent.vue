<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <span id="logo-texto">🥙 Greek Steak House</span>
      </router-link>
      <router-link to="/menu">Menu</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
};
</script>

<style scoped>
#logo-texto {
  font-size: 22px;
  font-weight: bold;
  font-family: "Georgia", serif;
  color: #f0c040;
  letter-spacing: 1px;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
  text-decoration: none;
}

#nav a {
  color: #f0c040;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
  font-family: "Georgia", serif;
  font-size: 16px;
}

#nav a:hover {
  color: white;
  font-size: 18px;
}

#logo-url:hover #logo-texto {
  letter-spacing: 3px;
  transition: letter-spacing 0.4s ease;
}

#nav {
  background-color: #1a1a2e;
  border-bottom: 3px solid #f0c040;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>