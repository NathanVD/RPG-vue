<template>
  <div id="log" class="pl-4">
    <p id="logText" class="mb-3"></p>
  </div>
</template>

<script>
import { eventTrain } from "../main";

export default {
  mounted() {
    let log = document.getElementById("log");
    let logText = document.getElementById("logText");
    eventTrain.$on("logIt", contenu => {
      logText.innerHTML += contenu + "<br/>";
      log.scrollTop = log.scrollHeight;
    });
  }
};
</script>

<style lang="sass" scoped>
#log
  margin: 2% auto
  background-color: darkblue
  text-shadow: 2px 2px black
  border: 3px solid white
  height: 100px
  width: 1067px
  overflow-y: scroll
  #logText
    color: white
.heroName
.monsterName
.bossName
  color: #C10E00
.itemName
</style>
