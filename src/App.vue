<template>
  <div id="app">
    <FightScreen />
  </div>
</template>

<script>
import FightScreen from "./components/FightScreen.vue";

export default {
  components: {
    FightScreen
  }
};
</script>

<style lang="sass" scoped>
#app
  margin: 5px auto
  background-color: darkblue
  border: 3px solid white
  height: 500px
  width: 1067px
</style>
