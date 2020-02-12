<template>
  <div id="anim">
    <img :src="frame" />
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      frame: require("@/assets/img/Psy_Seal.gif")
    };
  }
};
</script>

<style lang="sass" scoped>
#anim
  position: absolute
  z-index: 10
  bottom: 15%
</style>
