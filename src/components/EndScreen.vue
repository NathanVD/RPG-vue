<template>
  <div id="endScreen">
    <div id="ending">
      <h1>Felicitations</h1>
    </div>
    <audio loop autoplay>
      <source src="@/assets/soudtrack/Ending.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>

<script>
export default {
  mounted: function() {
    eventTrain.$emit("logIt", `Vous avez terminé le jeu en vie, bravo !`);
  }
};
</script>
<style lang="sass" scoped>
#endScreen
  width: 100%
  height: 100%
  display: flex
  justify-content: center
  align-items: center
  background: url("../assets/img/backgrounds/start-end/Iris.gif")
</style>
