<template>
<div id="app">
  <div id="nav">
    <router-link to="/vue/home">Home</router-link> |
    <router-link to="/vue/home/about">About</router-link> |
    <router-link to="/vue/home/G2">G2</router-link>
  </div>
  <router-view />
</div>
</template>

<script>
import './App.scss';
</script>
