<template>
  <div id="log">
    <p id="logText"></p>
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
  margin: 2% 0
  padding: 10px
  background-color: darkblue
  border: 3px solid white
  height: 100px
  width: 1067px
  overflow-y: scroll
  position: relative
  left: -4px
  #logText
    color: white
</style>
