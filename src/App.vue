<template>
  <div id="app">
    <FightScreen
      :stage="stage"
      :hero="hero"
      :monster="monster"
      :attackType="attackType"
    />
  </div>
</template>

<script>
import FightScreen from "./components/FightScreen.vue";
import Heroes from "./assets/pools/heroes.js";
import Monsters from "./assets/pools/monsters.js";
import Stages from "./assets/pools/stages.js";
import Items from "./assets/pools/items";

export default {
  components: {
    FightScreen
  },
  data() {
    return {
      selectedStage: 4,
      selectedHero: 4,
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
      if (this.selectedHero < 3) {
        return "jump";
      } else {
        return "run";
      }
    }
  },
  methods: {
    mkInventory() {
      for (let i = 0; i < 3; i++) {
        this.hero.inventory.push(Items[parseInt(Math.random() * Items.length)]);
      }
    }
  },
  created: function() {
    this.mkInventory();
  }
};
</script>

<style lang="sass">
@import "../node_modules/bootstrap/scss/bootstrap.scss"
body
  background: #979797
#app
  margin: 5px auto
  background-color: darkblue
  border: 3px solid white
  height: 500px
  width: 1067px
</style>
