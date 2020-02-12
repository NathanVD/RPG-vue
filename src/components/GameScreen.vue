<template>
  <div id="gameScreen">
    <FightScreen
      :stage="stage"
      :hero="hero"
      :monster="monster"
      :attackType="attackType"
    />
    <Log />
  </div>
</template>

<script>
import FightScreen from "./FightScreen.vue";
import Log from "./Log.vue";

export default {
  components: {
    FightScreen,
    Log
  },
  props: {
    stage: {
      type: String,
      required: true
    },
    hero: {
      type: Object,
      required: true
    },
    monster: {
      type: Object,
      required: true
    },
    attackType: {
      type: String,
      required: true
    }
  },
  computed: {}
};
</script>

<style lang="sass" scoped>
#gameScreen
  margin: 2% auto
  background-color: darkblue
  border: 3px solid white
  height: 500px
  width: 1067px
</style>
