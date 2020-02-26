<template>
  <div id="app">
    <div>{{ dungeon.length }}</div>
    <div>{{ this.room.screen }}</div>
    <GameScreen
      :stage="stage"
      :hero="hero"
      :room="room"
      :attackType="attackType"
    />
    <Log />
  </div>
</template>

<script>
import GameScreen from "./components/GameScreen.vue";
import Log from "./components/Log.vue";
import Heroes from "./assets/pools/heroes";
import Monsters from "./assets/pools/monsters";
import Relics from "./assets/pools/relics";
import Stages from "./assets/pools/stages";
import Items from "./assets/pools/items";
import { eventTrain } from "./main";

export default {
  components: {
    GameScreen,
    Log
  },
  data() {
    return {
      relics: Relics,
      monsters: Monsters,
      selectedStage: 0,
      selectedHero: 0,
      dungeon: [],
      room: { screen: "" }
    };
  },
  computed: {
    stage() {
      return Stages[this.selectedStage];
    },
    hero() {
      return Heroes[this.selectedHero];
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
      // for (let i = 0; i < 3; i++) {
      //   this.hero.inventory.push(Items[parseInt(Math.random() * Items.length)]);
      // }
      this.hero.inventory = [Items[0], Items[1], Items[2]]; //Testing
    },
    generateDungeon() {
      let pick;
      for (let i = 0; i < 5; i++) {
        pick = parseInt(Math.random() * this.monsters.length);
        this.dungeon.push(this.monsters[pick]);
        this.monsters.splice(pick, 1);
      }
      for (let i = 0; i < parseInt(Math.random() * (3 - 1) + 1); i++) {
        pick = parseInt(Math.random() * this.relics.length);
        this.dungeon.push(this.relics[pick]);
        this.relics.splice(pick, 1);
      }
    },

    pickRoom() {
      let pick;
      pick = parseInt(Math.random() * this.dungeon.length);
      pick = this.dungeon.splice(pick, 1);
      console.log(pick);
      this.room = pick[0];
    }
  },

  created: function() {
    this.mkInventory();
    this.generateDungeon();
  },

  mounted: function() {
    eventTrain.$on("changeRoom", param => {
      this.room = { screen: "loading" };
      setTimeout(() => {
        param === "start"
          ? (this.room = { screen: "start" })
          : param === "gameover"
          ? (this.room = { screen: "gameover" })
          : this.dungeon.length > 0
          ? this.pickRoom()
          : (this.room = { screen: "end" });
      }, 100);
    });
  }
};
</script>

<style lang="sass">
@import "../node_modules/bootstrap/scss/bootstrap.scss"
@import "./assets/font/stylesheet.css"
@import "./animate.css"

body
  background: #979797
  font-family: 'golden_sun', Verdana, Arial, Helvetica, sans-serif
  color: white
  font-size: 0.8rem
</style>
