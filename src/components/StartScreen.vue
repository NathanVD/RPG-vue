<template>
  <div id="startScreen">
    <div id="opening">
      <img
        v-show="go"
        class="animated fadeIn"
        src="../assets/img/the_lost_age_logo.png"
        alt="logo"
      />
      <button v-show="go" class="start animated fadeIn" @click="start">
        Start
      </button>
    </div>

    <audio loop autoplay>
      <source src="@/assets/soudtrack/Opening.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
import { eventTrain } from "../main";

export default {
  data() {
    return {
      go: false
    };
  },
  methods: {
    start() {
      eventTrain.$emit("changeRoom", "select");
    },
    startBtn() {
      setTimeout(() => {
        this.go = true;
      }, 4500);
    }
  },
  mounted: function() {
    this.startBtn();
  }
};
</script>

<style lang="sass" scoped>
#startScreen
  width: 100%
  height: 100%
  display: flex
  #opening
    width: 100%
    background-position: 0 50%
    animation: intro 5s forwards
    display: flex
    flex-flow: column
    align-items: center
    justify-content: space-evenly
    .start
      all: unset
      cursor: pointer
      text-shadow: 5px 5px black
      font-size: 30px
      font-weight: 800
      animation: blink 2s infinite

.animated
  animation-duration: 2s

@keyframes blink
  0%
    opacity: 0%
  50%
    opacity: 100%
  100%
    opacity: 0%

@keyframes intro
  0%
    background-image: url("../assets/img/backgrounds/start-end/Opening.gif")
    background-position: bottom
  80%
    background-image: url("../assets/img/backgrounds/start-end/Opening.gif")
    background-position: top
  81%
    background: black
  82%
    background-position: 0 60%
  100%
    background: url("../assets/img/backgrounds/start-end/Opening.gif")
    background-position: 0 60%
</style>
