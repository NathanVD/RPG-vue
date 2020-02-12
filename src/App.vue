<template>
  <div id="app">
    <GameScreen
      :stage="stage"
      :hero="hero"
      :monster="monster"
      :attackType="attackType"
    />
  </div>
</template>

<script>
import GameScreen from "./components/GameScreen.vue";
import Heroes from "./assets/pools/heroes";
import Monsters from "./assets/pools/monsters";
import Stages from "./assets/pools/stages";
import Items from "./assets/pools/items";

export default {
  components: {
    GameScreen
  },
  data() {
    return {
      selectedStage: 0,
      selectedHero: 3,
      selectedMonster: 9
    };
  },
  computed: {
    hero() {
      return Heroes[this.selectedHero];
    },
    monster() {
      return Monsters[this.selectedMonster];
    },
    stage() {
      return Stages[this.selectedStage];
    },
    attackType() {
      if (this.hero < 3) {
        return "jump";
      } else {
        return "run";
      }
    }
  },
  methods: {
    mkInventory() {
      // for (let i = 0; i < 3; i++) {
      //   this.hero.inventory.push(Items[parseInt(Math.random() * Items.length)]);
      // }
      this.hero.inventory = [Items[0], Items[1], Items[2]]; //Testing
    }
  },
  created: function() {
    this.mkInventory();
  }
};
</script>

<style lang="sass">
@import "../node_modules/bootstrap/scss/bootstrap.scss"
@import "./assets/font/stylesheet.css"

body
  background: #979797
  font-family: 'golden_sun', Verdana, Arial, Helvetica, sans-serif
  font-size: 0.8rem
</style>
