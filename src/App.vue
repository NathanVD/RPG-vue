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
      for (let i = 0; i < 3; i++) {
        this.hero.inventory.push(Items[parseInt(Math.random() * Items.length)]);
      }
      // this.hero.inventory = [Items[0], Items[1], Items[2]]; //Testing
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
      this.room = pick[0];
    }
  },

  mounted: function() {
    eventTrain.$on("changeRoom", param => {
      this.room = { screen: "loading" };
      setTimeout(() => {
        param === "select"
          ? (this.room = { screen: "select" })
          : param === "start"
          ? (this.room = { screen: "start" })
          : param === "gameover"
          ? (this.room = { screen: "gameover" })
          : param === "mimic"
          ? (this.room = this.relics[0])
          : this.dungeon.length > 0
          ? this.pickRoom()
          : (this.room = { screen: "end" });
      }, 100);
    });
    eventTrain.$on("mimic", param => {
      this.room = { screen: "loading" };
      setTimeout(() => {
        this.room = param;
      }, 100);
    });
    eventTrain.$on("selectHero", name => {
      switch (name) {
        case "Sofia":
          this.selectedHero = 5;
          break;
        case "Ivan":
          this.selectedHero = 4;
          break;
        case "Phoenixia":
          this.selectedHero = 3;
          break;
        case "Salamandar":
          this.selectedHero = 2;
          break;
        case "Lina":
          this.selectedHero = 1;
          break;
        case "Pavel":
        default:
          this.selectedHero = 0;
          break;
      }
      this.mkInventory();
      this.generateDungeon();
    });
  }
};
</script>

<style lang="sass">
@import "./assets/font/stylesheet.css"
@import "./animate.css"

#app
  height: 100vh
  background: #979797
  font-family: 'golden_sun', Verdana, Arial, Helvetica, sans-serif
  color: white
  font-size: 0.8rem
</style>
