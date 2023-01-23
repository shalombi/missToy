<template>
  <header class="main-header flex items-center justify-between">
    <div class="logo uppercase">
      <h2 v-rainbow>Toys</h2>
    </div>
    <nav class="flex gap-1">
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/toy">Toy</router-link>
      <router-link class="link" to="/about">About</router-link>
      <router-link class="link" to="/chart">Chart</router-link>

    </nav>
  </header>
</template>
