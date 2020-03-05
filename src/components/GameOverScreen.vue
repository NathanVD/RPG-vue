<template>
  <div id="endScreen">
    <audio loop autoplay>
      <source src="@/assets/soudtrack/Lost.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
  mounted: function() {
    eventTrain.$emit("logIt", `Game Over.`);
  }
};
</script>

<style lang="sass" scoped>
#endScreen
  width: 100%
  height: 100%
  background: url("../assets/img/gameover.png"),url("../assets/img/backgrounds/start-end/Eclipse.gif")
  background-repeat: no-repeat
  background-position: center
</style>
