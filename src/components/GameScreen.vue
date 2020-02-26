<template>
  <div id="gameScreen">
    <button v-if="!room.screen" @click="changeScreen('start')">Start</button>
    <StartScreen v-if="room.screen === 'start'" />
    <FightScreen
      v-if="room.screen === 'fight'"
      :stage="stage"
      :hero="hero"
      :monster="room"
      :attackType="attackType"
    />
    <ChestScreen
      v-if="room.screen === 'chest'"
      :stage="stage"
      :hero="hero"
      :relic="room"
    />
    <LoadingScreen v-if="room.screen === 'loading'" />
    <EndScreen v-if="room.screen === 'end'" />
    <GameOverScreen v-if="room.screen === 'gameover'" />
  </div>
  <!-- room.screen -> start, fight, chest, loading, end, gameover -->
</template>

<script>
import StartScreen from "./StartScreen.vue";
import FightScreen from "./FightScreen.vue";
import ChestScreen from "./ChestScreen.vue";
import LoadingScreen from "./LoadingScreen.vue";
import EndScreen from "./EndScreen.vue";
import GameOverScreen from "./GameOverScreen.vue";
import Log from "./Log.vue";
import { eventTrain } from "../main";

export default {
  components: {
    StartScreen,
    FightScreen,
    ChestScreen,
    LoadingScreen,
    EndScreen,
    GameOverScreen
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
    room: {
      type: Object,
      required: true
    },
    attackType: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    changeScreen(param) {
      eventTrain.$emit("changeRoom", param);
    }
  }
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
