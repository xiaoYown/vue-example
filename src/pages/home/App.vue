<script>
import './App.scss';

export default {
  name: 'App',
  render () {
    return <div id="app">
      <div id="nav">
        <router-link to="/vue/home">Home</router-link> |&nbsp;
        <router-link to="/vue/home/about">About</router-link> |&nbsp;
        <router-link to="/vue/home/docs">Docs</router-link>
      </div>
      <router-view />
    </div>;
  }
};
</script>
